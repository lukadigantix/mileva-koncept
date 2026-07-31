import type { MetadataRoute } from "next";
import { ROUTES, SITE_URL, languageAlternates } from "./lib/seo";
import { LANGS, localePath } from "./i18n/routing";
import { getBlogPosts } from "./lib/api";

/**
 * sitemap.xml — svaka stranica u sve tri jezičke verzije, uz `alternates` blok
 * koji ih međusobno povezuje (isti `hreflang` skup koji ide i u `<head>`).
 *
 * Objave bloga se čitaju iz CMS-a. Dok ih tamo nema, sitemap nosi samo stranice
 * sajta - upisivanje demo slugova bi Google-u prijavilo adrese koje vraćaju 404.
 */
const abs = (path: string) => `${SITE_URL}${path}`;

/** `hreflang` mapa u obliku koji traži Next-ov sitemap (pune URL adrese). */
function alternates(path: string) {
  const languages = Object.fromEntries(
    Object.entries(languageAlternates(path)).map(([tag, p]) => [tag, abs(p)])
  );
  return { languages };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Samo stvarne objave iz CMS-a - statični demo tekstovi ne smeju u sitemap.
  const posts =
    (await getBlogPosts())?.map((p) => ({
      slug: p.slug,
      lastModified: new Date(p.publishedAt ?? p.createdAt),
    })) ?? [];

  const entries: MetadataRoute.Sitemap = [];

  for (const lang of LANGS) {
    for (const { path } of ROUTES) {
      entries.push({
        url: abs(localePath(lang, path)),
        changeFrequency: path === "/blog" ? "weekly" : "monthly",
        priority: path === "/" ? 1 : 0.8,
        alternates: alternates(path),
      });
    }
    for (const post of posts) {
      const path = `/blog/${post.slug}`;
      entries.push({
        url: abs(localePath(lang, path)),
        lastModified: post.lastModified,
        changeFrequency: "yearly",
        priority: 0.5,
        alternates: alternates(path),
      });
    }
  }

  return entries;
}
