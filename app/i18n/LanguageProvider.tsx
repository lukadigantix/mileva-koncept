"use client";

import { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { dictionaries, type Dict, type LangCode } from "./translations";
import { switchLocale } from "./routing";
import { toCyrillic, toCyrillicHtml } from "../lib/translit";

gsap.registerPlugin(ScrollTrigger);

type LanguageContextValue = {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  t: Dict;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

/**
 * Drži aktivni jezik i izlaže odgovarajući rečnik.
 *
 * Jezik više NIJE stanje klijenta — stiže iz `[lang]` segmenta putanje, pa ga
 * server renderuje i Google indeksira. Prekidač jezika zato ne menja stanje
 * nego vodi na istu stranicu pod drugim prefiksom (`/sr/smestaj` →
 * `/en/smestaj`).
 */
export function LanguageProvider({
  lang,
  children,
}: {
  lang: LangCode;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const setLang = useCallback(
    (next: LangCode) => {
      if (next !== lang) router.push(switchLocale(next, pathname));
    },
    [lang, pathname, router]
  );

  useEffect(() => {
    // Dužina teksta menja visine sekcija → preračunaj okidače.
    ScrollTrigger.refresh();
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLang must be used within a LanguageProvider");
  }
  return ctx;
}

/**
 * Sadržaj iz admin panela (meni, blog, događaji, znamenitosti, kvadovi) unosi se
 * srpskom latinicom, pa se na ćiriličnoj verziji sajta preslovljava u ćirilicu.
 * Na latinici i engleskom prolazi nepromenjen — engleski prevod CMS sadržaja
 * čeka da backend dobije smer sr→en (`/api/translate` za sada radi samo en→sr).
 *
 * Koristiti SAMO za tekst iz backenda; rečnik u `translations.ts` je već
 * preveden ručno.
 */
export function useCms() {
  const { lang } = useLang();
  return useMemo(() => {
    const cyr = lang === "sr-cyrl";
    return {
      /** Običan tekst iz admina. */
      text: (s: string | null | undefined): string =>
        !s ? "" : cyr ? toCyrillic(s) : s,
      /** HTML iz Tiptap editora — preslovljava tekst, ne dira tagove. */
      html: (s: string | null | undefined): string =>
        !s ? "" : cyr ? toCyrillicHtml(s) : s,
    };
  }, [lang]);
}
