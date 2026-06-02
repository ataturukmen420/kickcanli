// ─────────────────────────────────────────────────────────────
// Kick veri katmanı — TARAYICIDAN canlı çekilir.
// Kick'in Cloudflare'i datacenter IP'lerini (Vercel sunucusu) 403'ler;
// ziyaretçinin tarayıcısı (residential IP) ise geçer ve API CORS açıktır
// (access-control-allow-origin origin'i yansıtır). Bu yüzden veriyi
// client-side fetch ediyoruz → her ziyarette/poll'da gerçek-zamanlı.
// ─────────────────────────────────────────────────────────────

export const KICK_SLUG = "ataturukmen";
export const KICK_PROFILE_URL = `https://kick.com/${KICK_SLUG}`;
export const KICK_VIDEOS_URL = `${KICK_PROFILE_URL}/videos`;
export const KICK_CLIPS_URL = `${KICK_PROFILE_URL}/clips`;

// Yalnızca bu kategoriler gösterilir (marka: IRL + sohbet). Oyun kategorileri
// (ör. "Call of Duty: Warzone") gizlenir.
const ALLOWED_CATEGORIES = ["irl", "just chatting"];

/** İzin verilen kategoriyse adını, değilse null döndürür. */
export function displayCategory(name: string | null): string | null {
  if (!name) return null;
  return ALLOWED_CATEGORIES.includes(name.trim().toLowerCase()) ? name : null;
}

const CHANNEL_API = `https://kick.com/api/v1/channels/${KICK_SLUG}`;
const CLIPS_API = `https://kick.com/api/v2/channels/${KICK_SLUG}/clips?sort=view&time=all`;

const FETCH_TIMEOUT_MS = 9000;

/** Kick Cloudflare — datacenter IP ve boş UA'yı bloklar; tarayıcı benzeri header şart. */
const KICK_FETCH_HEADERS: HeadersInit = {
  Accept: "application/json",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  Referer: KICK_PROFILE_URL,
};

// ─── Ham API tipleri (kısmi) ─────────────────────────────────
interface RawCategory {
  name?: string;
  slug?: string;
}

interface RawThumbnail {
  url?: string;
  src?: string;
}

interface RawLivestream {
  id: number;
  slug: string | null;
  session_title: string | null;
  is_live: boolean;
  viewer_count: number;
  thumbnail: RawThumbnail | string | null;
  created_at: string | null;
  categories?: RawCategory[];
}

interface RawVod {
  id: number;
  slug: string;
  session_title: string | null;
  duration: number; // ms
  created_at: string;
  start_time?: string;
  views?: number;
  viewer_count?: number;
  thumbnail?: RawThumbnail | string | null;
  categories?: RawCategory[];
  video?: { uuid?: string | null; views?: number } | null;
}

interface RawChannel {
  followersCount?: number;
  followers_count?: number;
  playback_url?: string | null;
  livestream: RawLivestream | null;
  previous_livestreams?: RawVod[];
  recent_categories?: RawCategory[];
  user?: { username?: string; profile_pic?: string; bio?: string };
}

interface RawClip {
  id: string;
  title: string | null;
  duration: number; // saniye
  view_count?: number;
  views?: number;
  created_at: string;
  thumbnail_url?: string | null;
  video_url?: string | null;
  clip_url?: string | null;
  category?: RawCategory | null;
}

// ─── Temiz view-model tipleri ────────────────────────────────
export interface LiveStatus {
  isLive: boolean;
  title: string | null;
  viewers: number;
  category: string | null;
  startedAt: string | null;
}

export interface VodCard {
  id: number;
  title: string;
  url: string;
  thumbnail: string | null;
  durationMs: number;
  views: number;
  createdAt: string;
  category: string | null;
  /** Hover önizleme için VOD video UUID'si (source m3u8 buradan çözülür). */
  videoUuid: string | null;
}

export interface ClipCard {
  id: string;
  title: string;
  url: string;
  thumbnail: string | null;
  durationSec: number;
  views: number;
  createdAt: string;
  category: string | null;
  /** Hover önizleme için klip HLS m3u8 URL'si. */
  videoUrl: string | null;
}

export interface KickData {
  followers: number;
  profilePic: string | null;
  bio: string | null;
  live: LiveStatus;
  vods: VodCard[];
  clips: ClipCard[];
}

// ─── Yardımcılar ─────────────────────────────────────────────
function thumbUrl(t: RawThumbnail | string | null | undefined): string | null {
  if (!t) return null;
  if (typeof t === "string") return t;
  return t.src ?? t.url ?? null;
}

function vodUrl(v: RawVod): string {
  const uuid = v.video?.uuid;
  return uuid ? `${KICK_VIDEOS_URL}/${uuid}` : KICK_VIDEOS_URL;
}

async function getJson<T>(url: string): Promise<T> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: KICK_FETCH_HEADERS,
      credentials: "omit",
      cache: "no-store",
      signal: ctrl.signal,
    });
    if (!res.ok) throw new Error(`Kick API ${res.status}`);
    return (await res.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}

// ─── Normalizasyon ───────────────────────────────────────────
function normalizeLive(ls: RawLivestream | null): LiveStatus {
  if (!ls || !ls.is_live) {
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

function normalizeVods(raw: RawVod[] | undefined): VodCard[] {
  if (!raw) return [];
  return raw.map((v) => ({
    id: v.id,
    title: v.session_title?.trim() || "Yayın",
    url: vodUrl(v),
    thumbnail: thumbUrl(v.thumbnail),
    durationMs: v.duration ?? 0,
    views: v.video?.views ?? v.views ?? v.viewer_count ?? 0,
    createdAt: v.created_at,
    category: v.categories?.[0]?.name ?? null,
    videoUuid: v.video?.uuid ?? null,
  }));
}

function normalizeClips(raw: RawClip[]): ClipCard[] {
  return raw.map((c) => ({
    id: c.id,
    title: c.title?.trim() || "Klip",
    url: `${KICK_CLIPS_URL}/${c.id}`,
    thumbnail: c.thumbnail_url ?? null,
    durationSec: c.duration ?? 0,
    views: c.view_count ?? c.views ?? 0,
    createdAt: c.created_at,
    category: c.category?.name ?? null,
    videoUrl: c.video_url ?? c.clip_url ?? null,
  }));
}

// ─── Public fetch'ler ────────────────────────────────────────
/** Kanal verisi: takipçi, canlı durum, geçmiş yayınlar (VOD). */
export async function fetchChannel(): Promise<Omit<KickData, "clips">> {
  const ch = await getJson<RawChannel>(CHANNEL_API);
  const vods = normalizeVods(ch.previous_livestreams).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  return {
    followers: ch.followersCount ?? ch.followers_count ?? 0,
    profilePic: ch.user?.profile_pic ?? null,
    bio: ch.user?.bio ?? null,
    live: normalizeLive(ch.livestream),
    vods,
  };
}

/** En çok izlenen klipler. */
export async function fetchClips(limit = 12): Promise<ClipCard[]> {
  const data = await getJson<{ clips?: RawClip[] }>(CLIPS_API);
  const clips = normalizeClips(data.clips ?? []);
  return clips.sort((a, b) => b.views - a.views).slice(0, limit);
}

// VOD source m3u8'leri uuid başına bir kez çözülür (hover önizleme için).
const vodSourceCache = new Map<string, string | null>();

/** VOD video UUID'sinden oynatılabilir HLS master m3u8 URL'sini döndürür. */
export async function getVodSource(uuid: string): Promise<string | null> {
  if (vodSourceCache.has(uuid)) return vodSourceCache.get(uuid) ?? null;
  try {
    const data = await getJson<{ source?: string | null }>(
      `https://kick.com/api/v1/video/${uuid}`,
    );
    const src = data.source ?? null;
    vodSourceCache.set(uuid, src);
    return src;
  } catch {
    vodSourceCache.set(uuid, null);
    return null;
  }
}
