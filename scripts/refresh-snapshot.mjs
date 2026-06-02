/**
 * Regenerates src/lib/snapshot.ts from Kick public API.
 * Run: node scripts/refresh-snapshot.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";
const SLUG = "ataturukmen";
const CHANNEL_API = `https://kick.com/api/v1/channels/${SLUG}`;
const CLIPS_API = `https://kick.com/api/v2/channels/${SLUG}/clips?sort=view&time=all`;
const KICK_VIDEOS_URL = `https://kick.com/${SLUG}/videos`;
const KICK_CLIPS_URL = `https://kick.com/${SLUG}/clips`;

import { spawnSync } from "node:child_process";

function getJsonCurl(url) {
  const r = spawnSync(
    "curl.exe",
    ["-s", "-A", UA, "-H", "Accept: application/json", "-H", `Referer: https://kick.com/${SLUG}`, url],
    { encoding: "utf8", maxBuffer: 20 * 1024 * 1024 },
  );
  if (r.error || r.status !== 0) throw r.error ?? new Error(`curl failed ${url}`);
  const body = r.stdout?.trim();
  if (!body || body.startsWith("{") === false) throw new Error(`Kick API invalid ${url}`);
  const parsed = JSON.parse(body);
  if (parsed.error) throw new Error(parsed.error);
  return parsed;
}

async function getJson(url) {
  try {
    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": UA,
        Referer: `https://kick.com/${SLUG}`,
      },
    });
    if (res.ok) return res.json();
  } catch {
    /* fallback curl */
  }
  return getJsonCurl(url);
}

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

const ch = await getJson(CHANNEL_API);
const clipsPayload = await getJson(CLIPS_API);

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
// Yenile: node scripts/refresh-snapshot.mjs
import type { KickData } from "./kick";

export const INITIAL_KICK_DATA: KickData = ${JSON.stringify(data, null, 2)};
`;

fs.writeFileSync(path.join(ROOT, "src/lib/snapshot.ts"), out, "utf8");
console.log(
  `snapshot.ts updated — followers ${data.followers}, live ${data.live.isLive}, vods ${data.vods.length}, clips ${data.clips.length}`,
);