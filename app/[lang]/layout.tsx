import type { Metadata } from "next";
import { Source_Serif_4 } from "next/font/google";
import "../globals.css";
import SmoothScroll from "../components/SmoothScroll";
import PageTransition from "../components/PageTransition";
import { LanguageProvider } from "../i18n/LanguageProvider";
import { getFooterSettings, getWorkingHours } from "../lib/api";
import { EMAIL, PHONES, RESTAURANT_WORKING_DAYS, SOCIALS } from "../lib/site";
import { pageMetadata, SITE_NAME, SITE_URL } from "../lib/seo";
import { SEO } from "../i18n/seoContent";
import { LOCALE_TAGS, SEGMENTS, langFromSegment } from "../i18n/routing";
import { siteStructuredData } from "../lib/structuredData";
import { SiteSettingsProvider, type SiteSettings } from "../lib/siteSettings";

/**
 * Jedinstven font kroz ceo sajt - Source Serif 4.
 *
 * Ranije je ovde stajao Noto Serif JP. On nosi rusku ćirilicu, ali nijedno
 * srpsko slovo (Ђ Ј Љ Њ Ћ Џ i mala), pa su ona propadala na Georgia iz
 * rezervnog niza i u istoj reči su se videla dva različita fonta - a ćirilica
 * je podrazumevani jezik sajta.
 *
 * Source Serif je izabran jer NIJE promena izgleda: Noto Serif JP je Source
 * Han Serif, čija je proporcionalna latinica i ćirilica izvedena upravo iz
 * Source Serif. Crtež ostaje isti, samo sada ima i srpska slova. (Noto Serif,
 * uprkos imenu, je druga porodica po crtežu - osetno teža.)
 *
 * `latin-ext` nosi č/ć/ž/š/đ za srpsku latinicu, `cyrillic` ćirilične glifove.
 * Težine su one koje CSS stvarno koristi (400 svuda, 500 za h1), plus kurziv -
 * bez njih bi ih pregledač lažirao algoritamskim košenjem i podebljavanjem.
 */
const sourceSerif = Source_Serif_4({
  weight: ["400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
  variable: "--font-source-serif",
});

/** Sve tri jezičke verzije se generišu unapred, u build-u. */
export function generateStaticParams() {
  return SEGMENTS.map((lang) => ({ lang }));
}

/**
 * Podrazumevani metapodaci, na jeziku rute. `metadataBase` je obavezan da bi
 * relativne putanje (kanonski linkovi, OG slika iz `app/opengraph-image.jpg`)
 * izrasle u pune URL-ove. Naslovi podstranica se ulivaju u `title.template`,
 * pa svaka nosi „… - Милева Концепт" bez ponavljanja u svakom fajlu.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const base = pageMetadata(langFromSegment(lang), "home", "/");
  return {
    ...base,
    metadataBase: new URL(SITE_URL),
    title: {
      default: SEO[langFromSegment(lang)].siteTitle,
      template: `%s - ${SEO[langFromSegment(lang)].brand}`,
    },
    applicationName: SITE_NAME,
  };
}


/** Kontakt podaci i radno vreme iz admina; prazna polja → statični placeholderi.
    Podrazumevane vrednosti se grade iz lib/site.ts ovde, na serveru — vrednosti
    iz "use client" modula (siteSettings) nisu upotrebljive u server komponenti. */
async function buildSiteSettings(): Promise<SiteSettings> {
  const [footer, hours] = await Promise.all([getFooterSettings(), getWorkingHours()]);

  const socials = [
    { label: "Instagram", href: footer?.instagramUrl ?? "" },
    { label: "Facebook", href: footer?.facebookUrl ?? "" },
    { label: "Twitter", href: footer?.twitterUrl ?? "" },
    { label: "TikTok", href: footer?.tiktokUrl ?? "" },
  ].filter((s) => s.href);

  // Admin ima jedno polje za telefon, pa njime može da prepiše samo glavni
  // broj; brojevi za bazen i proslave su statični (lib/site.ts).
  const phones = PHONES.map((p) =>
    p.key === "main" && footer?.phone
      ? { ...p, label: footer.phone, href: footer.phone.replace(/[^+\d]/g, "") }
      : { ...p },
  );

  return {
    email: footer?.email || EMAIL,
    phones,
    phoneLabel: phones[0].label,
    phoneHref: phones[0].href,
    address: footer?.street && footer.city ? `${footer.street}, ${footer.city}` : null,
    socials: socials.length ? socials : SOCIALS,
    hours: hours?.length ? hours : null,
  };
}

// Tip je napisan izričito, a ne preko Next-ovog globalnog `LayoutProps<…>` —
// taj se generiše tek pri build-u, pa bi `tsc` na svežem kloniranju pao.
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang: segment } = await params;
  const lang = langFromSegment(segment);
  const settings = await buildSiteSettings();
  const jsonLd = siteStructuredData({
    lang,
    // Bez radnog vremena iz admina, u JSON-LD ide statični raspored restorana.
    hours: settings.hours ?? RESTAURANT_WORKING_DAYS,
    phones: settings.phones,
    email: settings.email,
  });

  return (
    <html lang={LOCALE_TAGS[lang]} className={sourceSerif.variable}>
      <body>
        {/* Strukturirani podaci o objektu - jednom za ceo sajt. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>
          <SiteSettingsProvider value={settings}>
            <LanguageProvider lang={lang}>{children}</LanguageProvider>
          </SiteSettingsProvider>
          <PageTransition />
        </SmoothScroll>
      </body>
    </html>
  );
}
