"use client";

import { useCallback, useEffect, useRef, useState, type SyntheticEvent } from "react";
import { formatCount, timeAgoTr } from "@/lib/format";
import { getVodSource } from "@/lib/kick";
import type Hls from "hls.js";

export type PreviewSource =
  | { type: "clip"; url: string }
  | { type: "vod"; uuid: string };

export interface MediaCardProps {
  title: string;
  url: string;
  thumbnail: string | null;
  durationLabel: string;
  views: number;
  createdAt: string;
  category: string | null;
  badge: "VOD" | "KLİP" | "SON";
  preview?: PreviewSource;
}

const PREVIEW_DELAY_MS = 200; // hover gecikmesi — hızlı geçişlerde yüklenmesin
const PREVIEW_MAX_SEC = 28; // fragman uzunluğu

// hls.js yalnızca ilk hover'da, dinamik yüklenir (başlangıç paketini şişirmez).
let HlsCtor: (typeof import("hls.js"))["default"] | null = null;
let hlsPreloadStarted = false;
async function loadHls() {
  if (HlsCtor) return HlsCtor;
  try {
    HlsCtor = (await import("hls.js")).default;
  } catch {
    HlsCtor = null;
  }
  return HlsCtor;
}

const PlayIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="black" aria-hidden="true">
    <path d="M5 3l14 9-14 9V3z" />
  </svg>
);

const EyeIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 5C5.6 5 1 12 1 12s4.6 7 11 7 11-7 11-7-4.6-7-11-7zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
  </svg>
);

const MutedIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M11 5L6 9H2v6h4l5 4V5zm5.5 7l2.5-2.5-1-1L15 11l-2.5-2.5-1 1L14 12l-2.5 2.5 1 1L15 13l2.5 2.5 1-1L16.5 12z" />
  </svg>
);

export function MediaCard({
  title,
  url,
  thumbnail,
  durationLabel,
  views,
  createdAt,
  category,
  badge,
  preview,
}: MediaCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const timerRef = useRef<number | null>(null);
  const hoveringRef = useRef(false);
  const startAtRef = useRef(0);
  const [phase, setPhase] = useState<"idle" | "loading" | "playing">("idle");

  // hls.js'i sayfa boştayken bir kez önceden yükle — ilk hover anında hazır olsun.
  useEffect(() => {
    if (!preview || hlsPreloadStarted) return;
    hlsPreloadStarted = true;
    const ric = (window as unknown as { requestIdleCallback?: (cb: () => void) => void })
      .requestIdleCallback;
    if (ric) ric(() => void loadHls());
    else window.setTimeout(() => void loadHls(), 1500);
  }, [preview]);

  // Bileşen kaybolunca (data yenileme kartı düşürürse vb.) hls/timer'ı temizle.
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (hlsRef.current) hlsRef.current.destroy();
    };
  }, []);

  const teardown = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.removeAttribute("src");
      try {
        v.load();
      } catch {
        /* yoksay */
      }
    }
    startAtRef.current = 0;
    setPhase("idle");
  }, []);

  const begin = useCallback(async () => {
    if (!preview) return;
    const v = videoRef.current;
    if (!v) return;
    // React'in muted-attribute davranışını garantiye al: muted olmadan autoplay bloklanır.
    v.muted = true;
    v.defaultMuted = true;
    setPhase("loading");

    const src = preview.type === "clip" ? preview.url : await getVodSource(preview.uuid);
    if (!hoveringRef.current) return; // bu sırada ayrıldıysa iptal
    if (!src) {
      setPhase("idle");
      return;
    }

    // hls.js'i tercih et (Chrome/Edge/Firefox). canPlayType Chrome'da "maybe"
    // döndürdüğü için native HLS yalnızca gerçek fallback olarak (Safari) kullanılır.
    const Lib = await loadHls();
    if (!hoveringRef.current) return;
    if (Lib && Lib.isSupported()) {
      const hls = new Lib({ maxBufferLength: 20, maxMaxBufferLength: 30 });
      hlsRef.current = hls;
      // Kanonik sıra: önce attachMedia, MEDIA_ATTACHED'da loadSource — segment
      // yüklemesinin başlaması için bu sıra şart (capLevelToPlayerSize de kaldırıldı).
      hls.on(Lib.Events.MEDIA_ATTACHED, () => hls.loadSource(src));
      hls.on(Lib.Events.MANIFEST_PARSED, () => {
        if (hoveringRef.current) void v.play().catch(() => {});
      });
      hls.attachMedia(v);
    } else if (v.canPlayType("application/vnd.apple.mpegurl")) {
      v.src = src; // Safari: yerel HLS
    } else {
      setPhase("idle");
    }
  }, [preview]);

  const handleReady = useCallback(
    (e: SyntheticEvent<HTMLVideoElement>) => {
      const v = e.currentTarget;
      if (!hoveringRef.current) return;
      // VOD ise açılış ekranını atla, içeriğe yakın bir noktadan başlat (bir kez).
      if (
        preview?.type === "vod" &&
        startAtRef.current === 0 &&
        Number.isFinite(v.duration) &&
        v.duration > 120
      ) {
        startAtRef.current = Math.max(
          0,
          Math.min(v.duration * 0.12, v.duration - PREVIEW_MAX_SEC - 2),
        );
        try {
          v.currentTime = startAtRef.current;
        } catch {
          /* yoksay */
        }
      }
      void v.play().catch(() => {});
    },
    [preview],
  );

  // Video gerçekten oynamaya (kare üretmeye) başladığında görünür yap.
  const handlePlaying = useCallback(() => {
    if (hoveringRef.current) setPhase("playing");
  }, []);

  const handleTimeUpdate = useCallback((e: SyntheticEvent<HTMLVideoElement>) => {
    const v = e.currentTarget;
    if (v.currentTime - startAtRef.current >= PREVIEW_MAX_SEC) {
      v.currentTime = startAtRef.current; // fragmanı döngüye al
    }
  }, []);

  const onEnter = useCallback(() => {
    if (!preview || typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return; // dokunmatik cihaz
    hoveringRef.current = true;
    timerRef.current = window.setTimeout(begin, PREVIEW_DELAY_MS);
  }, [preview, begin]);

  const onLeave = useCallback(() => {
    hoveringRef.current = false;
    teardown();
  }, [teardown]);

  return (
    <li>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${title} – ${durationLabel}`}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        className="clip-card holo-shimmer group block overflow-hidden rounded-2xl border border-(--border) bg-(--surface-2) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--kick)"
      >
        <div className="relative aspect-video overflow-hidden bg-(--surface-3)">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbnail ?? "/generated/section.webp"}
            alt={title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
          />

          {preview && (
            <video
              ref={videoRef}
              muted
              playsInline
              loop
              preload="auto"
              aria-hidden="true"
              tabIndex={-1}
              onLoadedMetadata={handleReady}
              onLoadedData={handleReady}
              onPlaying={handlePlaying}
              onTimeUpdate={handleTimeUpdate}
              className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                phase === "playing" ? "opacity-100" : "opacity-0"
              }`}
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <span className="absolute left-2.5 top-2.5 section-label">{badge}</span>

          {phase === "playing" && (
            <span className="pointer-events-none absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-md bg-black/70 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
              <MutedIcon />
              Önizleme
            </span>
          )}

          <span className="absolute bottom-2 right-2.5 rounded-lg bg-black/80 px-2 py-0.5 text-xs font-mono text-white">
            {durationLabel}
          </span>

          {phase === "loading" && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-(--kick)/30 border-t-(--kick)" />
            </div>
          )}

          {phase !== "playing" && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
              <div
                className="rounded-full p-4 shadow-2xl transition-transform duration-200 group-hover:scale-110"
                style={{ background: "var(--kick)", boxShadow: "0 0 30px var(--kick-glow)" }}
              >
                <PlayIcon />
              </div>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-(--text-1) mb-2">
            {title}
          </h3>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-(--text-2)">
            <span className="flex items-center gap-1">
              <EyeIcon />
              {formatCount(views)}
            </span>
            <span aria-hidden="true">·</span>
            <span suppressHydrationWarning>{timeAgoTr(createdAt)}</span>
            {category && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-(--kick)/70 truncate max-w-[100px]">{category}</span>
              </>
            )}
          </div>
        </div>
      </a>
    </li>
  );
}

export function MediaCardSkeleton() {
  return (
    <li>
      <div className="block overflow-hidden rounded-2xl border border-(--border) bg-(--surface-2)">
        <div className="aspect-video animate-pulse bg-(--surface-3)" />
        <div className="p-4">
          <div className="mb-2 h-4 w-3/4 animate-pulse rounded bg-(--surface-3)" />
          <div className="h-3 w-1/2 animate-pulse rounded bg-(--surface-3)" />
        </div>
      </div>
    </li>
  );
}
