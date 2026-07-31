"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { useLang } from "../i18n/LanguageProvider";
import { localePath } from "../i18n/routing";

type LinkProps = ComponentProps<typeof NextLink>;

/**
 * `next/link` koji sam dopisuje jezik u putanju: `/smestaj` postaje `/sr/smestaj`
 * na ćirilici, `/en/smestaj` na engleskom. Spoljni linkovi, sidra i `mailto:` /
 * `tel:` prolaze netaknuti.
 *
 * Zamenjuje `next/link` u svim komponentama sajta, pa `href` po komponentama
 * ostaje kratak i jezik se ne provlači ručno kroz propse.
 */
export default function LocaleLink({ href, ...rest }: LinkProps) {
  const { lang } = useLang();
  const localized = typeof href === "string" ? localePath(lang, href) : href;
  return <NextLink href={localized} {...rest} />;
}
