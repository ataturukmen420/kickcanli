import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://kickcanli.com/sitemap.xml",
    host: "https://kickcanli.com",
  };
}
