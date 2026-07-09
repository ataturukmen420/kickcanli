import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { KickDataProvider } from "@/hooks/use-kick-data";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { INITIAL_KICK_DATA } from "@/lib/snapshot";
import { SITE_URL, LAST_CONTENT_UPDATE } from "@/lib/seo";

const inter = Inter({ variable: "--font-sans", subsets: ["latin", "latin-ext"], display: "swap" });
const jetbrains = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ATA TÜRÜKMEN — Kick Canlı Yayın, Klipler & Arşiv | ataturukmen",
    template: "%s — ATA TÜRÜKMEN",
  },
  description:
    "ATA TÜRÜKMEN'in (ataturukmen) resmi Kick sayfası. Pattaya, Tayland'dan IRL canlı yayınları izle; en iyi klipler ve geçmiş yayın arşivi tek yerde.",
  applicationName: "ATA TÜRÜKMEN",
  authors: [{ name: "ATA TÜRÜKMEN", url: "https://kick.com/ataturukmen" }],
  keywords: [
    "ATA TÜRÜKMEN",
    "ataturukmen",
    "ata türükmen kick",
    "ataturukmen kick",
    "ata türükmen canlı yayın",
    "kickcanli",
    "kick canlı",
    "Kick yayın",
    "IRL yayın",
    "Tayland yayıncı",
    "Kick Türkiye",
  ],
  openGraph: {
    type: "profile",
    title: "ATA TÜRÜKMEN — Kick Canlı Yayın",
    description:
      "Tayland'dan IRL canlı yayınlar, en iyi klipler ve geçmiş yayın arşivi — tek yerden.",
    url: SITE_URL,
    siteName: "kickcanli.com",
    locale: "tr_TR",
    username: "ataturukmen",
    images: [{ url: "/generated/og.jpg", width: 1200, height: 630, alt: "ATA TÜRÜKMEN" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Ataturukmenx",
    creator: "@Ataturukmenx",
    title: "ATA TÜRÜKMEN — Kick Canlı Yayın",
    description: "Tayland'dan IRL canlı yayınlar, klipler ve arşiv.",
    images: ["/generated/og.jpg"],
  },
  icons: { icon: "/icon.png", apple: "/icon.png" },
};

export const viewport: Viewport = {
  themeColor: "#06060a",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "ATA TÜRÜKMEN — Kick",
      alternateName: "kickcanli",
      inLanguage: "tr-TR",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "ATA TÜRÜKMEN",
      alternateName: ["ataturukmen", "Ata Turukmen", "Ata Türükmen"],
      url: SITE_URL,
      image: INITIAL_KICK_DATA.profilePic ?? `${SITE_URL}/icon.png`,
      description:
        "Ata Türükmen (ataturukmen), Tayland'ın Pattaya şehrinde yaşayan Türk IRL canlı yayıncısı, içerik üreticisi ve girişimcidir. Kick platformundaki ataturukmen kanalında Tayland'dan gezi, günlük yaşam ve sohbet yayınları yapar.",
      jobTitle: "İçerik Üreticisi ve Canlı Yayıncı",
      nationality: { "@type": "Country", name: "Türkiye" },
      homeLocation: { "@type": "Place", name: "Pattaya, Tayland" },
      sameAs: [
        "https://kick.com/ataturukmen",
        "https://youtube.com/@ataturukmen",
        "https://instagram.com/ataturukmenn",
        "https://x.com/Ataturukmenx",
        "https://www.tiktok.com/@ataturukmen",
        "https://linktr.ee/AtaTurukmen",
        "https://ataturukmen.com",
      ],
      knowsAbout: [
        "Kick yayıncılığı",
        "IRL yayın",
        "Canlı yayın",
        "Tayland yaşamı",
        "Pattaya",
        "Seyahat içerikleri",
      ],
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: "ATA TÜRÜKMEN — Kick Canlı Yayın",
      inLanguage: "tr-TR",
      ...(LAST_CONTENT_UPDATE ? { dateModified: LAST_CONTENT_UPDATE } : {}),
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#person` },
      mainEntity: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${inter.variable} ${jetbrains.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: -1,
            backgroundImage: "url('/generated/section.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.55,
            pointerEvents: "none",
          }}
        />
        <KickDataProvider>
          <div className="flex min-h-full flex-col">
            <SiteHeader />
            {children}
            <SiteFooter />
          </div>
        </KickDataProvider>
        <Analytics />
      </body>
    </html>
  );
}
