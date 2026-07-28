"use client";

// Kontakt podaci, društvene mreže i radno vreme koje admin uređuje kroz
// backend. Root layout ih povuče na serveru (videti buildSiteSettings) i ubaci
// ovde, pa ih Footer i kontakt stranica čitaju kroz useSiteSettings() — bez
// prosleđivanja kroz svaku stranicu. Podrazumevane vrednosti su statični
// placeholderi iz lib/site.ts, tako da sajt izgleda isto i bez backenda.

import { createContext, useContext, type ReactNode } from "react";
import { EMAIL, PHONE_HREF, PHONE_LABEL, SOCIALS } from "./site";
import type { WorkingDay } from "./api";

export type SiteSettings = {
  email: string;
  phoneLabel: string;
  phoneHref: string;
  /** "Ulica, Grad" iz admina; null → lokalizovana adresa iz rečnika. */
  address: string | null;
  socials: { label: string; href: string }[];
  /** Radno vreme iz admina; null → statični tekst iz rečnika. */
  hours: WorkingDay[] | null;
};

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  email: EMAIL,
  phoneLabel: PHONE_LABEL,
  phoneHref: PHONE_HREF,
  address: null,
  socials: SOCIALS,
  hours: null,
};

const SiteSettingsContext = createContext<SiteSettings>(DEFAULT_SITE_SETTINGS);

export function SiteSettingsProvider({
  value,
  children,
}: {
  value: SiteSettings;
  children: ReactNode;
}) {
  return (
    <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>
  );
}

export function useSiteSettings(): SiteSettings {
  return useContext(SiteSettingsContext);
}
