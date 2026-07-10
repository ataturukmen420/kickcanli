import type { MetadataRoute } from "next";
import { SITE_URL, LAST_CONTENT_UPDATE } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = LAST_CONTENT_UPDATE ? new Date(LAST_CONTENT_UPDATE) : undefined;
  return [
    { url: SITE_URL, lastModified, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/stats`, lastModified, changeFrequency: "weekly", priority: 0.7 },
  ];
}
