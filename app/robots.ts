import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/seo";

/**
 * robots.txt — sve je otvoreno za indeksiranje; sitemap vodi pretraživače kroz
 * stranice i objave bloga.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
