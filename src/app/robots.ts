import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// AI arama motoru botları açıkça izinli — ChatGPT/Perplexity/Claude/Gemini
// cevaplarında kaynak olarak geçebilmek için (robots.txt tek başına yetmez;
// Vercel Firewall'daki "AI Bots" kuralı da Allow olmalı).
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "meta-externalagent",
  "Amazonbot",
  "Bytespider",
  "CCBot",
  "DuckAssistBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
