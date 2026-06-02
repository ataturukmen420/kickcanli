"use client";

import { useKickData } from "@/hooks/use-kick-data";
import { formatCount } from "@/lib/format";
import { KICK_SLUG } from "@/lib/kick";

export function LivePlayer() {
  const { data, live } = useKickData();
  if (!live) return null;

  const { title, viewers, category } = data.live;

  return (
    <section aria-label="Canlı yayın" className="mx-auto w-full max-w-7xl px-4 sm:px-6">
      <div className="gradient-border overflow-hidden rounded-2xl border border-(--kick)/30 bg-black">
        <div className="flex items-center justify-between gap-3 border-b border-(--border) bg-(--surface-1) px-4 py-2.5">
          <span className="inline-flex items-center gap-2 text-sm font-bold text-(--kick)">
            <span className="h-2 w-2 rounded-full bg-(--kick) pulse-ring" aria-hidden="true" />
            CANLI
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-(--text-2)">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 5C5.6 5 1 12 1 12s4.6 7 11 7 11-7 11-7-4.6-7-11-7zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
            </svg>
            {formatCount(viewers)} izleyici
          </span>
        </div>
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={`https://player.kick.com/${KICK_SLUG}?autoplay=true&muted=true`}
            title={title ?? "Canlı yayın"}
            allowFullScreen
            allow="autoplay; fullscreen; picture-in-picture"
            className="absolute inset-0 h-full w-full"
          />
        </div>
        {(title || category) && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 px-4 py-3">
            {title && <h2 className="text-sm font-semibold text-(--text-1)">{title}</h2>}
            {category && (
              <span className="section-label !text-[10px]">{category}</span>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
