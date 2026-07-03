import type { Metadata } from "next";
import { Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import PageTransition from "./components/PageTransition";
import { LanguageProvider } from "./i18n/LanguageProvider";

/**
 * Single typeface across the whole site — Noto Serif JP, weight 400 only.
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
  title: "Akaneya — Sumibiyaki",
  description:
    "Fire, tradition, and the most exclusive wagyū transport us to a small sumibiyaki in Kyoto. Akaneya — Madrid · Barcelona · Paris.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr" className={notoSerifJP.variable}>
      <body>
        <SmoothScroll>
          <LanguageProvider>{children}</LanguageProvider>
          <PageTransition />
        </SmoothScroll>
      </body>
    </html>
  );
}
