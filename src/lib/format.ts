// Görüntüleme/takipçi sayısı: 2542 → "2.5K", 1142 → "1.1K", 309 → "309".
export function formatCount(n: number): string {
  if (!Number.isFinite(n) || n < 0) return "0";
  if (n < 1000) return String(n);
  if (n < 1_000_000) {
    const v = n / 1000;
    return `${trimZero(v)}K`;
  }
  const v = n / 1_000_000;
  return `${trimZero(v)}M`;
}

function trimZero(v: number): string {
  const s = v.toFixed(1);
  return s.endsWith(".0") ? s.slice(0, -2) : s;
}

// Göreli zaman (TR): "az önce", "3 gün önce", "1 hafta önce", "5 ay önce".
export function timeAgoTr(iso: string): string {
  const then = new Date(iso.replace(" ", "T")).getTime();
  if (!Number.isFinite(then)) return "";
  const sec = Math.max(0, Math.floor((Date.now() - then) / 1000));
  const min = Math.floor(sec / 60);
  const hour = Math.floor(min / 60);
  const day = Math.floor(hour / 24);
  const week = Math.floor(day / 7);
  const month = Math.floor(day / 30);
  const year = Math.floor(day / 365);

  if (sec < 60) return "az önce";
  if (min < 60) return `${min} dakika önce`;
  if (hour < 24) return `${hour} saat önce`;
  if (day < 7) return `${day} gün önce`;
  if (week < 5) return `${week} hafta önce`;
  if (month < 12) return `${month} ay önce`;
  return `${year} yıl önce`;
}

// Süre: saniye → "1:39:22" (saat varsa) ya da "9:22".
export function formatDuration(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  if (h > 0) return `${h}:${pad(m)}:${pad(sec)}`;
  return `${m}:${pad(sec)}`;
}

export function formatDurationMs(ms: number): string {
  return formatDuration(Math.floor(ms / 1000));
}

// Saniye → ISO 8601 süre (ör. "PT1H39M22S") — schema.org VideoObject için.
export function toIsoDuration(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  let out = "PT";
  if (h) out += `${h}H`;
  if (m) out += `${m}M`;
  if (sec || (!h && !m)) out += `${sec}S`;
  return out;
}
