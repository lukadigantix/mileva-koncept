import type { Metadata } from "next";
import { Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import PageTransition from "./components/PageTransition";
import { LanguageProvider } from "./i18n/LanguageProvider";
import { getFooterSettings, getWorkingHours } from "./lib/api";
import { EMAIL, PHONE_HREF, PHONE_LABEL, SOCIALS } from "./lib/site";
import { SiteSettingsProvider, type SiteSettings } from "./lib/siteSettings";

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

export const metadata: Metadata = {
  title: "Милева концепт - Гривац",
  description:
    "Где традиција сусреће луксуз, а гостопримство постаје уметност. Ресторан, смештај и мирни дани у срцу Шумадије - Гривац, Кнић, Србија.",
};

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await buildSiteSettings();

  return (
    <html lang="sr" className={notoSerifJP.variable}>
      <body>
        <SmoothScroll>
          <SiteSettingsProvider value={settings}>
            <LanguageProvider>{children}</LanguageProvider>
          </SiteSettingsProvider>
          <PageTransition />
        </SmoothScroll>
      </body>
    </html>
  );
}
