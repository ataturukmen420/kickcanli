import type { Metadata } from "next";

// /stats "use client" olduğundan metadata'sı bu layout'tan gelir; kendi
// canonical'ı olmadan kök canonical'ı miras alıp indexten düşüyordu.
export const metadata: Metadata = {
  title: "Kick Kanal İstatistikleri & Takipçi Analizi",
  description:
    "ATA TÜRÜKMEN'in (ataturukmen) Kick kanal istatistikleri: güncel takipçi sayısı, toplam yayın süresi, kategoriler ve en çok izlenen klipler.",
  alternates: { canonical: "/stats" },
  openGraph: {
    type: "website",
    title: "ATA TÜRÜKMEN — Kick Kanal İstatistikleri",
    description:
      "Takipçi sayısı, yayın süresi, kategoriler ve en çok izlenen klipler — ATA TÜRÜKMEN'in Kick kanal analizi.",
    url: "/stats",
    siteName: "kickcanli.com",
    locale: "tr_TR",
    images: [{ url: "/generated/og.jpg", width: 1200, height: 630, alt: "ATA TÜRÜKMEN" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Ataturukmenx",
    creator: "@Ataturukmenx",
    title: "ATA TÜRÜKMEN — Kick Kanal İstatistikleri",
    description: "Takipçi, yayın süresi ve klip istatistikleri.",
    images: ["/generated/og.jpg"],
  },
};

export default function StatsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
