import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://kickcanli.com", changeFrequency: "daily", priority: 1 },
    { url: "https://kickcanli.com/stats", changeFrequency: "weekly", priority: 0.7 },
  ];
}
