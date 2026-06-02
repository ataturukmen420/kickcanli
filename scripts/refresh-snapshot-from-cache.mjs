import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SLUG = "ataturukmen";
const KICK_VIDEOS_URL = `https://kick.com/${SLUG}/videos`;
const KICK_CLIPS_URL = `https://kick.com/${SLUG}/clips`;

const chPath = path.join(ROOT, "tmp-channel.json");
const clipsPath = path.join(ROOT, "tmp-clips.json");
if (!fs.existsSync(chPath)) {
  console.error("Missing tmp-channel.json — run fetch-kick-api.ps1 first");
  process.exit(1);
}

const ch = JSON.parse(fs.readFileSync(chPath, "utf8"));
const clipsPayload = JSON.parse(
  fs.readFileSync(clipsPath, "utf8"),
);

function thumbUrl(t) {
  if (!t) return null;
  if (typeof t === "string") return t;
  return t.src ?? t.url ?? null;
}

function vodUrl(v) {
  const uuid = v.video?.uuid;
  return uuid ? `${KICK_VIDEOS_URL}/${uuid}` : KICK_VIDEOS_URL;
}

function normalizeLive(ls) {
  if (!ls?.is_live) {
    return { isLive: false, title: null, viewers: 0, category: null, startedAt: null };
  }
  return {
    isLive: true,
    title: ls.session_title ?? null,
    viewers: ls.viewer_count ?? 0,
    category: ls.categories?.[0]?.name ?? null,
    startedAt: ls.created_at ?? null,
  };
}

function normalizeVods(raw) {
  return (raw ?? [])
    .map((v) => ({
      id: v.id,
      title: v.session_title?.trim() || "Yayın",
      url: vodUrl(v),
      thumbnail: thumbUrl(v.thumbnail),
      durationMs: v.duration ?? 0,
      views: v.video?.views ?? v.views ?? v.viewer_count ?? 0,
      createdAt: v.created_at,
      category: v.categories?.[0]?.name ?? null,
      videoUuid: v.video?.uuid ?? null,
    }))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

function normalizeClips(raw) {
  return (raw ?? [])
    .map((c) => ({
      id: c.id,
      title: c.title?.trim() || "Klip",
      url: `${KICK_CLIPS_URL}/${c.id}`,
      thumbnail: c.thumbnail_url ?? null,
      durationSec: c.duration ?? 0,
      views: c.view_count ?? c.views ?? 0,
      createdAt: c.created_at,
      category: c.category?.name ?? null,
      videoUrl: c.video_url ?? c.clip_url ?? null,
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 12);
}

const data = {
  followers: ch.followersCount ?? ch.followers_count ?? 0,
  profilePic: ch.user?.profile_pic ?? null,
  bio: ch.user?.bio ?? null,
  live: normalizeLive(ch.livestream),
  vods: normalizeVods(ch.previous_livestreams),
  clips: normalizeClips(clipsPayload.clips),
};

const generated = new Date().toISOString().slice(0, 10);
const out = `// ⚠️ Otomatik üretildi — ${generated} Kick API taraması.
// İlk-paint, SEO (JSON-LD) ve client fetch başarısız olursa fallback için.
// Yenile: powershell scripts/fetch-kick-api.ps1 && node scripts/refresh-snapshot-from-cache.mjs
import type { KickData } from "./kick";

export const INITIAL_KICK_DATA: KickData = ${JSON.stringify(data, null, 2)};
`;

fs.writeFileSync(path.join(ROOT, "src/lib/snapshot.ts"), out, "utf8");
console.log(
  `OK — followers ${data.followers}, live ${data.live.isLive}, vods ${data.vods.length}, clips ${data.clips.length}`,
);
if (data.vods[0]) console.log(`Latest VOD: ${data.vods[0].title}`);