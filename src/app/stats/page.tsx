"use client";

import { useMemo } from "react";
import { useKickData } from "@/hooks/use-kick-data";
import { displayCategory } from "@/lib/kick";
import { formatCount, formatDuration, formatDurationMs } from "@/lib/format";

function StatTile({ value, label, hint }: { value: string; label: string; hint?: string }) {
  return (
    <div className="glass-kick rounded-2xl p-5">
      <div className="text-3xl font-black tabular-nums text-(--kick)">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-widest text-(--text-2)">{label}</div>
      {hint && <div className="mt-1 text-xs text-(--text-3)">{hint}</div>}
    </div>
  );
}

export default function StatsPage() {
  const { data, fresh } = useKickData();

  const stats = useMemo(() => {
    const totalClipViews = data.clips.reduce((s, c) => s + c.views, 0);
    const totalVodViews = data.vods.reduce((s, v) => s + v.views, 0);
    const totalVodMs = data.vods.reduce((s, v) => s + v.durationMs, 0);

    // Yalnızca izin verilen kategoriler (IRL + Just Chatting); oyunlar gizli.
    const catCount = new Map<string, number>();
    const tally = (name: string | null) => {
      const allowed = displayCategory(name);
      if (allowed) catCount.set(allowed, (catCount.get(allowed) ?? 0) + 1);
    };
    for (const v of data.vods) tally(v.category);
    for (const c of data.clips) tally(c.category);
    const categories = [...catCount.entries()].sort((a, b) => b[1] - a[1]);

    const topClips = [...data.clips].sort((a, b) => b.views - a.views).slice(0, 8);

    return { totalClipViews, totalVodViews, totalVodMs, categories, topClips };
  }, [data]);

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-20 pt-10 sm:px-6">
      <div className="mb-8 flex flex-col gap-2">
        <span className="section-label">📊 İstatistikler</span>
        <h1 className="text-3xl font-black tracking-tight text-(--text-1)">Kanal İstatistikleri</h1>
        <p className="max-w-2xl text-sm text-(--text-2)">
          ATA TÜRÜKMEN&apos;in Kick kanalından canlı çekilen güncel veriler.
          {!fresh && " Veriler yükleniyor…"}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <StatTile value={formatCount(data.followers)} label="Takipçi" />
        <StatTile value={String(data.vods.length)} label="Geçmiş Yayın" />
        <StatTile value={String(data.clips.length)} label="Klip" />
        <StatTile value={formatCount(stats.totalClipViews)} label="Klip İzlenme" />
        <StatTile
          value={formatDurationMs(stats.totalVodMs)}
          label="Toplam Yayın Süresi"
          hint={`${formatCount(stats.totalVodViews)} izlenme`}
        />
      </div>

      {stats.categories.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-black text-(--text-1)">Kategoriler</h2>
          <div className="flex flex-wrap gap-2">
            {stats.categories.map(([name, count]) => (
              <span
                key={name}
                className="inline-flex items-center gap-2 rounded-full border border-(--border) bg-(--surface-1) px-4 py-1.5 text-sm text-(--text-1)"
              >
                {name}
                <span className="rounded-full bg-(--kick-dim) px-2 text-xs font-bold text-(--kick)">
                  {count}
                </span>
              </span>
            ))}
          </div>
        </section>
      )}

      <section className="mt-12">
        <h2 className="mb-4 text-xl font-black text-(--text-1)">En Çok İzlenen Klipler</h2>
        <ol className="grid gap-2 sm:grid-cols-2">
          {stats.topClips.map((c, i) => (
            <li key={c.id}>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-(--border) bg-(--surface-1) px-4 py-3 transition-colors hover:border-(--kick)/30"
              >
                <span className="text-sm font-black text-(--kick)/60 tabular-nums">{i + 1}</span>
                <span className="line-clamp-1 flex-1 text-sm font-medium text-(--text-1)">{c.title}</span>
                <span className="shrink-0 text-xs text-(--text-2)">
                  {formatCount(c.views)} · {formatDuration(c.durationSec)}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
