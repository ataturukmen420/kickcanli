import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ATA TÜRÜKMEN — Kick Canlı Yayın",
    short_name: "ATA TÜRÜKMEN",
    description: "ATA TÜRÜKMEN'in resmi Kick sayfası: canlı yayın, klipler ve arşiv.",
    start_url: "/",
    display: "standalone",
    background_color: "#06060a",
    theme_color: "#06060a",
    lang: "tr",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
