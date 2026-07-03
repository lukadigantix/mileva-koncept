"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { dictionaries, type Dict, type LangCode } from "./translations";

gsap.registerPlugin(ScrollTrigger);

const STORAGE_KEY = "mileva-lang";

type LanguageContextValue = {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  t: Dict;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

/**
 * Holds the active language and exposes the matching dictionary. Default is
 * Serbian Cyrillic. Switching is instant (client-side) and refreshes
 * ScrollTrigger so scroll positions stay correct after the copy reflows.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("sr-cyrl");

  // Restore the saved language after mount. Reading localStorage here (not in
  // the initial state) keeps the server and first client render identical, so
  // there's no hydration mismatch.
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && saved in dictionaries) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLangState(saved as LangCode);
    }
  }, []);

  const setLang = useCallback((next: LangCode) => {
    setLangState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "en" ? "en" : "sr";
    // Copy length changes section heights → recompute trigger positions.
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
