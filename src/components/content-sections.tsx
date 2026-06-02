"use client";

import { useKickData } from "@/hooks/use-kick-data";
import { KICK_VIDEOS_URL, KICK_CLIPS_URL, displayCategory } from "@/lib/kick";
import { formatDuration, formatDurationMs } from "@/lib/format";
import { MediaCard, MediaCardSkeleton } from "./media-card";

interface SectionShellProps {
  id: string;
  label: string;
  title: string;
  seeAllHref: string;
  seeAllText: string;
  children: React.ReactNode;
}

function SectionShell({ id, label, title, seeAllHref, seeAllText, children }: SectionShellProps) {
  return (
    <section aria-labelledby={`${id}-heading`} className="mx-auto w-full max-w-7xl px-4 sm:px-6">
      <div className="mb-7 flex items-end justify-between">
        <div className="flex flex-col gap-2">
          <span className="section-label">{label}</span>
          <h2 id={`${id}-heading`} className="text-2xl font-black text-(--text-1) tracking-tight">
            {title}
          </h2>
        </div>
        <a
          href={seeAllHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-1 text-sm font-semibold text-(--kick)/70 transition-colors hover:text-(--kick) focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-(--kick) rounded"
        >
          {seeAllText}
        </a>
      </div>
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" role="list">
        {children}
      </ul>
    </section>
  );
}

export function VodSection() {
  const { data, fresh, live } = useKickData();
  const vods = data.vods;
  return (
    <SectionShell
      id="vods"
      label="📺 Geçmiş Yayınlar"
      title={live ? "Tüm Yayınlar" : "Yayın Arşivi"}
      seeAllHref={KICK_VIDEOS_URL}
      seeAllText="Arşivi Gör →"
    >
      {vods.length === 0 && !fresh
        ? Array.from({ length: 4 }).map((_, i) => <MediaCardSkeleton key={i} />)
        : vods.map((v, index) => (
            <MediaCard
              key={v.id}
              badge={!live && index === 0 ? "SON" : "VOD"}
              title={v.title}
              url={v.url}
              thumbnail={v.thumbnail}
              durationLabel={formatDurationMs(v.durationMs)}
              views={v.views}
              createdAt={v.createdAt}
              category={displayCategory(v.category)}
              preview={v.videoUuid ? { type: "vod", uuid: v.videoUuid } : undefined}
            />
          ))}
    </SectionShell>
  );
}

export function ClipSection() {
  const { data, fresh } = useKickData();
  const clips = data.clips;
  return (
    <SectionShell
      id="clips"
      label="✂️ En İyi Anlar"
      title="Klipler"
      seeAllHref={KICK_CLIPS_URL}
      seeAllText="Tüm Klipler →"
    >
      {clips.length === 0 && !fresh
        ? Array.from({ length: 4 }).map((_, i) => <MediaCardSkeleton key={i} />)
        : clips.map((c) => (
            <MediaCard
              key={c.id}
              badge="KLİP"
              title={c.title}
              url={c.url}
              thumbnail={c.thumbnail}
              durationLabel={formatDuration(c.durationSec)}
              views={c.views}
              createdAt={c.createdAt}
              category={displayCategory(c.category)}
              preview={c.videoUrl ? { type: "clip", url: c.videoUrl } : undefined}
            />
          ))}
    </SectionShell>
  );
}
