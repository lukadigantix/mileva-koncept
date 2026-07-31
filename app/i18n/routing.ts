/**
 * Jezici u URL-u.
 *
 * Do sada je jezik živeo samo u memoriji klijenta, pa je Google video isključivo
 * ćiriličnu verziju — latinična i engleska pretraga nisu postojale za sajt.
 * Sada svaki jezik ima svoju putanju (`/sr`, `/sr-latn`, `/en`), pa se sve tri
 * indeksiraju i međusobno povezuju `hreflang` oznakama.
 *
 * Segment u URL-u je namerno mala slova (`sr-latn`), dok `hreflang` nosi pun
 * BCP-47 oblik (`sr-Latn-RS`) koji Google očekuje.
 */

import type { LangCode } from "./translations";

/** URL segment za svaki jezik; ujedno i redosled u prekidaču u zaglavlju. */
export const LOCALE_SEGMENTS = {
  "sr-cyrl": "sr",
  "sr-latn": "sr-latn",
  en: "en",
} as const satisfies Record<LangCode, string>;

export type LocaleSegment = (typeof LOCALE_SEGMENTS)[LangCode];

/** BCP-47 oznake za `hreflang` i `og:locale`. */
export const LOCALE_TAGS = {
  "sr-cyrl": "sr-Cyrl-RS",
  "sr-latn": "sr-Latn-RS",
  en: "en",
} as const satisfies Record<LangCode, string>;

export const OG_LOCALES = {
  "sr-cyrl": "sr_RS",
  "sr-latn": "sr_RS",
  en: "en_US",
} as const satisfies Record<LangCode, string>;

export const LANGS = Object.keys(LOCALE_SEGMENTS) as LangCode[];
export const SEGMENTS = Object.values(LOCALE_SEGMENTS) as LocaleSegment[];

/** Podrazumevani jezik — na njega gleda `x-default` i preusmerenje sa `/`. */
export const DEFAULT_LANG: LangCode = "sr-cyrl";
export const DEFAULT_SEGMENT = LOCALE_SEGMENTS[DEFAULT_LANG];

const SEGMENT_TO_LANG = Object.fromEntries(
  (Object.entries(LOCALE_SEGMENTS) as [LangCode, string][]).map(([lang, seg]) => [seg, lang])
) as Record<string, LangCode>;

/** Segment iz URL-a → jezik; nepoznat segment pada na podrazumevani. */
export function langFromSegment(segment: string | undefined): LangCode {
  return (segment && SEGMENT_TO_LANG[segment]) || DEFAULT_LANG;
}

export function isLocaleSegment(segment: string | undefined): segment is LocaleSegment {
  return Boolean(segment && segment in SEGMENT_TO_LANG);
}

/**
 * Putanja unutar sajta (`/smestaj`) → puna putanja sa jezikom (`/sr/smestaj`).
 * Spoljni linkovi (`http`, `mailto:`, `tel:`, `#`) se ne diraju.
 */
export function localePath(lang: LangCode, path: string): string {
  if (!path.startsWith("/")) return path;
  const seg = LOCALE_SEGMENTS[lang];
  const rest = path === "/" ? "" : path;
  return `/${seg}${rest}`;
}

/** Ista stranica na drugom jeziku — za prekidač jezika i `hreflang` linkove. */
export function switchLocale(lang: LangCode, pathname: string): string {
  const [, maybeSegment, ...rest] = pathname.split("/");
  const bare = isLocaleSegment(maybeSegment) ? `/${rest.join("/")}` : pathname;
  return localePath(lang, bare === "/" ? "/" : bare.replace(/\/$/, "") || "/");
}
