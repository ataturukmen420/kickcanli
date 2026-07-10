import { INITIAL_KICK_DATA } from "@/lib/snapshot";
import { toIsoDuration, kickDateToIso } from "@/lib/format";
import { SITE_URL } from "@/lib/seo";

// schema.org VideoObject şeması (VOD'lar + klipler) — SEO/rich results için.
// Deploy anındaki anlık veriden üretilir (orijinal sitedeki yapıyla aynı).

const PERSON_ID = `${SITE_URL}/#person`;

export function VideoSchema() {
  const items = [
    ...INITIAL_KICK_DATA.vods.map((v) => ({
      name: v.title,
      thumb: v.thumbnail,
      date: v.createdAt,
      dur: toIsoDuration(Math.floor(v.durationMs / 1000)),
      url: v.url,
      views: v.views,
      kind: "geçmiş canlı yayını" as const,
    })),
    ...INITIAL_KICK_DATA.clips.map((c) => ({
      name: c.title,
      thumb: c.thumbnail,
      date: c.createdAt,
      dur: toIsoDuration(c.durationSec),
      url: c.url,
      views: c.views,
      kind: "öne çıkan klibi" as const,
    })),
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": items.map((v) => ({
      "@type": "VideoObject",
      name: v.name,
      description: `${v.name} — ATA TÜRÜKMEN'in (ataturukmen) Kick kanalındaki ${v.kind}. Kick üzerinden izlenebilir.`,
      inLanguage: "tr",
      ...(v.thumb ? { thumbnailUrl: v.thumb } : {}),
      uploadDate: kickDateToIso(v.date),
      duration: v.dur,
      url: v.url,
      interactionStatistic: {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/WatchAction",
        userInteractionCount: v.views,
      },
      creator: { "@id": PERSON_ID },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
