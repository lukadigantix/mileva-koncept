/**
 * JSON-LD strukturirani podaci (schema.org).
 *
 * Ovo je ono što Google zaista čita za lokalne rezultate, panel sa desne strane
 * i mapu — meta oznake tu ne pomažu. Objekat je istovremeno restoran i smeštaj,
 * pa se opisuje kao `Restaurant` sa ugniježđenim `LodgingBusiness`; oba dele
 * isti `@id`-jem povezan entitet, da ih Google ne razdvoji u dva biznisa.
 *
 * `sameAs` linkovi ka Instagramu i Facebooku vezuju sajt za naloge koje Google
 * već poznaje — to je jedan od jačih signala da je reč o istom entitetu.
 */

import { BUSINESS, MAP_URL, SOCIALS, type PhoneKey } from "./site";
import type { SitePhone } from "./siteSettings";
import { OG_IMAGE, SITE_NAME, SITE_URL } from "./seo";
import { SEO } from "../i18n/seoContent";
import { LOCALE_TAGS, localePath } from "../i18n/routing";
import type { LangCode } from "../i18n/translations";
import type { WorkingDay } from "./api";

/** schema.org nazivi dana, indeksirani kao `WorkingDay.day` (0 = ponedeljak). */
const SCHEMA_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const address = {
  "@type": "PostalAddress",
  streetAddress: BUSINESS.street,
  addressLocality: BUSINESS.village,
  addressRegion: BUSINESS.region,
  postalCode: BUSINESS.postalCode,
  addressCountry: BUSINESS.country,
};

const geo = {
  "@type": "GeoCoordinates",
  latitude: BUSINESS.latitude,
  longitude: BUSINESS.longitude,
};

/** `contactType` za svaki od tri broja — Google očekuje engleske oznake. */
const CONTACT_TYPES: Record<PhoneKey, string> = {
  main: "reservations",
  pool: "pool",
  events: "events",
};

/** Radno vreme iz admina u schema.org oblik; zatvoreni dani se izostavljaju. */
function openingHours(hours: WorkingDay[] | null) {
  if (!hours?.length) return undefined;
  return hours
    .filter((h) => h.isOpen && SCHEMA_DAYS[h.day])
    .map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${SCHEMA_DAYS[h.day]}`,
      opens: h.openTime,
      closes: h.closeTime,
    }));
}

/**
 * Graf entiteta sajta: organizacija/restoran + smeštaj + sam sajt. Ubacuje se
 * jednom, u root layout, pa važi za sve stranice.
 */
export function siteStructuredData({
  lang,
  hours,
  phones,
  email,
}: {
  lang: LangCode;
  hours: WorkingDay[] | null;
  /** Svi brojevi; prvi je glavni i ide u `telephone`, svi u `contactPoint`. */
  phones: SitePhone[];
  email: string;
}) {
  const businessId = `${SITE_URL}/#business`;
  const homeUrl = `${SITE_URL}${localePath(lang, "/")}`;
  const image = `${SITE_URL}${OG_IMAGE}`;
  const sameAs = SOCIALS.map((s) => s.href).filter((href) => href.startsWith("http"));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Restaurant", "LodgingBusiness"],
        "@id": businessId,
        name: SITE_NAME,
        alternateName: "Mileva Koncept",
        description: SEO[lang].siteDescription,
        url: homeUrl,
        telephone: phones[0].href,
        contactPoint: phones.map((p) => ({
          "@type": "ContactPoint",
          telephone: p.href,
          contactType: CONTACT_TYPES[p.key],
          availableLanguage: ["sr", "en"],
        })),
        email,
        image,
        logo: image,
        address,
        geo,
        hasMap: MAP_URL,
        sameAs,
        priceRange: BUSINESS.priceRange,
        servesCuisine: ["Српска", "Домаћа", "Шумадијска"],
        currenciesAccepted: "RSD, EUR",
        openingHoursSpecification: openingHours(hours),
        amenityFeature: [
          "Базен са сланом водом",
          "Бесплатан приватни паркинг",
          "Бесплатан Wi-Fi",
          "Башта и тераса",
          "Клима уређај",
          "Простор за прославе",
        ].map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
        areaServed: [
          { "@type": "Place", name: "Кнић" },
          { "@type": "Place", name: "Гружа" },
          { "@type": "Place", name: "Крагујевац" },
          { "@type": "Place", name: "Шумадија" },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: homeUrl,
        name: SITE_NAME,
        inLanguage: LOCALE_TAGS[lang],
        publisher: { "@id": businessId },
      },
    ],
  };
}
