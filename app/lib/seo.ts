/**
 * Kanonski origin sajta i zajednički metapodaci stranica.
 *
 * `NEXT_PUBLIC_SITE_URL` se postavlja po okruženju (produkcija, preview); bez
 * njega se pada nazad na produkcijski domen, da build nikada ne pukne — Next
 * javlja grešku ako se relativna putanja koristi bez `metadataBase`.
 */
import type { Metadata } from "next";
import { SEO, type PageKey } from "../i18n/seoContent";
import type { LangCode } from "../i18n/translations";
import {
  DEFAULT_LANG,
  LANGS,
  LOCALE_TAGS,
  OG_LOCALES,
  localePath,
} from "../i18n/routing";

const RAW_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://milevakoncept.rs";

/** Bez završne kose crte, da se putanje spajaju bez duplog `/`. */
export const SITE_URL = RAW_SITE_URL.replace(/\/+$/, "");

export const SITE_NAME = "Милева концепт";

/**
 * Deljena OG slika (`app/opengraph-image.jpg`). Konvencija fajla je sama kači
 * na korenski segment, ali stranica koja zada svoj `openGraph` blok zamenjuje
 * ceo nasleđeni objekat — pa i slike. Zato se ovde navodi izričito.
 */
export const OG_IMAGE = "/opengraph-image.jpg";

/** Stranice sajta, redom kojim stoje u navigaciji — izvor za sitemap. */
export const ROUTES: { path: string; key: PageKey }[] = [
  { path: "/", key: "home" },
  { path: "/smestaj", key: "smestaj" },
  { path: "/restoran", key: "restoran" },
  { path: "/bazen", key: "bazen" },
  { path: "/dogadjaji", key: "dogadjaji" },
  { path: "/kvadovi", key: "kvadovi" },
  { path: "/znamenitosti", key: "znamenitosti" },
  { path: "/blog", key: "blog" },
  { path: "/kontakt", key: "kontakt" },
  { path: "/politika-privatnosti", key: "privatnost" },
  { path: "/politika-kolacica", key: "kolacici" },
];

/**
 * `hreflang` blok za jednu putanju: sve tri jezičke verzije plus `x-default`.
 * Ovim Google zna da su `/sr/smestaj`, `/sr-latn/smestaj` i `/en/smestaj` ista
 * stranica na tri jezika, umesto da ih čita kao udvostručen sadržaj.
 */
export function languageAlternates(path: string): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const lang of LANGS) alternates[LOCALE_TAGS[lang]] = localePath(lang, path);
  alternates["x-default"] = localePath(DEFAULT_LANG, path);
  return alternates;
}

/**
 * Metapodaci jedne stranice, na jeziku te rute.
 *
 * Open Graph i Twitter se moraju zadati po stranici — Next spaja `metadata`
 * objekte plitko, pa stranica koja zada samo `title` nasleđuje `openGraph.title`
 * iz layouta i deljeni link bi svuda nosio isti naslov.
 */
export function pageMetadata(lang: LangCode, key: PageKey, path: string): Metadata {
  const { title, description } = SEO[lang].pages[key];
  const canonical = localePath(lang, path);

  return {
    title,
    description,
    keywords: SEO[lang].keywords,
    alternates: { canonical, languages: languageAlternates(path) },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SEO[lang].brand,
      locale: OG_LOCALES[lang],
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
