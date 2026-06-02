"use client";

import { useKickData } from "@/hooks/use-kick-data";
import { formatCount, formatDurationMs, timeAgoTr } from "@/lib/format";
import { displayCategory } from "@/lib/kick";

export function StreamEndedBanner() {
  const { data, live, fresh } = useKickData();
  if (live) return null;

  const latest = data.vods[0];
  if (!latest) return null;

  const category = displayCategory(latest.category);

  return (
    <section
      aria-label="Son yayın özeti"
      className="mx-auto w-full max-w-7xl px-4 sm:px-6"
    >
      <div className="gradient-border overflow-hidden rounded-2xl border border-(--border) bg-(--surface-1)/80 backdrop-blur-sm">
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex flex-col gap-2">
            <span className="section-label">Yayın bitti</span>
            <h2 className="text-xl font-black text-(--text-1) sm:text-2xl">
              Son yayın arşive eklendi
            </h2>
            <p className="max-w-xl text-sm text-(--text-2)">
              Şu an çevrimdışıyız. En son yayını aşağıdan izleyebilir veya Kick profilinden
              bildirim açarak bir sonraki yayına yetişebilirsin.
              {!fresh && (
                <span className="block mt-1 text-(--text-3)">Veriler güncelleniyor…</span>
              )}
            </p>
          </div>
          <a
            href={latest.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group shrink-0 overflow-hidden rounded-xl border border-(--border) bg-(--surface-2) transition-colors hover:border-(--kick)/40 sm:max-w-xs"
          >
            <div className="relative aspect-video w-full sm:w-72">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={latest.thumbnail ?? "/generated/section.webp"}
                alt={latest.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute left-2 top-2 section-label">SON YAYIN</span>
              <span className="absolute bottom-2 right-2 rounded-md bg-black/80 px-2 py-0.5 font-mono text-xs text-white">
                {formatDurationMs(latest.durationMs)}
              </span>
            </div>
            <div className="p-3">
              <p className="line-clamp-2 text-sm font-semibold text-(--text-1)">{latest.title}</p>
              <p className="mt-1 text-xs text-(--text-2)">
                {formatCount(latest.views)} izlenme
                <span aria-hidden="true"> · </span>
                <span suppressHydrationWarning>{timeAgoTr(latest.createdAt)}</span>
                {category && (
                  <>
                    <span aria-hidden="true"> · </span>
                    <span className="text-(--kick)/70">{category}</span>
                  </>
                )}
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}