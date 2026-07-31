import type { Metadata } from "next";
import { Noto_Serif_JP } from "next/font/google";
import "../globals.css";
import SmoothScroll from "../components/SmoothScroll";
import PageTransition from "../components/PageTransition";
import { LanguageProvider } from "../i18n/LanguageProvider";
import { getFooterSettings, getWorkingHours } from "../lib/api";
import { EMAIL, PHONE_HREF, PHONE_LABEL, SOCIALS } from "../lib/site";
import { pageMetadata, SITE_NAME, SITE_URL } from "../lib/seo";
import { SEO } from "../i18n/seoContent";
import { LOCALE_TAGS, SEGMENTS, langFromSegment } from "../i18n/routing";
import { siteStructuredData } from "../lib/structuredData";
import { SiteSettingsProvider, type SiteSettings } from "../lib/siteSettings";

/**
 * Single typeface across the whole site - Noto Serif JP, weight 400 only.
 * CJK fonts are large, so we opt out of preload/subset-splitting and let
 * `font-display: swap` handle the FOUT (mirrors the site's Web Font Loader).
 */
const notoSerifJP = Noto_Serif_JP({
  weight: "400",
  display: "swap",
  preload: false,
  variable: "--font-noto-serif-jp",
});

/** Sve tri jezičke verzije se generišu unapred, u build-u. */
export function generateStaticParams() {
  return SEGMENTS.map((lang) => ({ lang }));
}

/**
 * Podrazumevani metapodaci, na jeziku rute. `metadataBase` je obavezan da bi
 * relativne putanje (kanonski linkovi, OG slika iz `app/opengraph-image.jpg`)
 * izrasle u pune URL-ove. Naslovi podstranica se ulivaju u `title.template`,
 * pa svaka nosi „… - Милева концепт" bez ponavljanja u svakom fajlu.
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

  return {
    email: footer?.email || EMAIL,
    phoneLabel: footer?.phone || PHONE_LABEL,
    phoneHref: footer?.phone ? footer.phone.replace(/[^+\d]/g, "") : PHONE_HREF,
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
    hours: settings.hours,
    phone: settings.phoneHref,
    email: settings.email,
  });

  return (
    <html lang={LOCALE_TAGS[lang]} className={notoSerifJP.variable}>
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
