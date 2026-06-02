import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { KickDataProvider } from "@/hooks/use-kick-data";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const inter = Inter({ variable: "--font-sans", subsets: ["latin", "latin-ext"], display: "swap" });
const jetbrains = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://kickcanli.com"),
  title: "ATA TÜRÜKMEN — Kick Canlı Yayın, Klipler & Arşiv",
  description:
    "ATA TÜRÜKMEN'in resmi Kick sayfası. Tayland'dan IRL canlı yayınları izle, en iyi klipleri ve geçmiş yayın arşivini tek yerden keşfet.",
  applicationName: "ATA TÜRÜKMEN",
  authors: [{ name: "ATA TÜRÜKMEN", url: "https://kick.com/ataturukmen" }],
  keywords: [
    "ATA TÜRÜKMEN",
    "ataturukmen",
    "kickcanli",
    "kick canlı",
    "Kick yayın",
    "IRL yayın",
    "Tayland yayıncı",
    "Kick Türkiye",
  ],
  alternates: { canonical: "https://kickcanli.com" },
  openGraph: {
    type: "profile",
    title: "ATA TÜRÜKMEN — Kick Canlı Yayın",
    description:
      "Tayland'dan IRL canlı yayınlar, en iyi klipler ve geçmiş yayın arşivi — tek yerden.",
    url: "https://kickcanli.com",
    siteName: "kickcanli.com",
    locale: "tr_TR",
    images: [{ url: "/generated/og.jpg", width: 1200, height: 630, alt: "ATA TÜRÜKMEN" }],
  },
  twitter: {
    card: "summary_large_image",
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
      "@id": "https://kickcanli.com/#website",
      url: "https://kickcanli.com",
      name: "ATA TÜRÜKMEN — Kick",
      inLanguage: "tr-TR",
      publisher: { "@id": "https://kickcanli.com/#person" },
    },
    {
      "@type": "Person",
      "@id": "https://kickcanli.com/#person",
      name: "ATA TÜRÜKMEN",
      alternateName: "ataturukmen",
      url: "https://kickcanli.com",
      jobTitle: "İçerik Üreticisi ve Canlı Yayıncı",
      sameAs: [
        "https://kick.com/ataturukmen",
        "https://youtube.com/@ataturukmen",
        "https://instagram.com/ataturukmen",
      ],
      knowsAbout: ["Kick yayıncılığı", "IRL yayın", "Tayland yaşamı"],
    },
    {
      "@type": "ProfilePage",
      "@id": "https://kickcanli.com/#profilepage",
      url: "https://kickcanli.com",
      name: "ATA TÜRÜKMEN — Kick Canlı Yayın",
      inLanguage: "tr-TR",
      isPartOf: { "@id": "https://kickcanli.com/#website" },
      about: { "@id": "https://kickcanli.com/#person" },
      mainEntity: { "@id": "https://kickcanli.com/#person" },
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
