"use client";

import { createContext, useContext, useEffect, useRef, type RefObject } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LenisContext = createContext<RefObject<Lenis | null> | null>(null);

/** Ref to the active Lenis instance (e.g. to stop/start background scroll). */
export const useLenis = () => useContext(LenisContext);

/**
 * Razmak koji sidro samo traži ispod fiksnog zaglavlja - `scroll-mt-*` na
 * sekciji. Lenis ne čita `scroll-margin-top` (to poštuje samo prirodno
 * skrolovanje pregledača), pa mu ga prosleđujemo kao `offset`. Time CSS ostaje
 * jedini izvor istine: promeni se `scroll-mt` i oba puta do sidra se pomere.
 */
export function anchorOffset(el: Element): number {
  return -(parseFloat(getComputedStyle(el).scrollMarginTop) || 0);
}

/**
 * Smooth scrolling with Lenis, synced to GSAP ScrollTrigger.
 *
 * Mirrors the reference site: Lenis drives the scroll (`<html class="lenis">`,
 * wheelMultiplier / touchMultiplier = 1) and ScrollTrigger is updated from the
 * Lenis scroll loop so scrubbed / triggered animations stay in lock-step.
 * ScrollSmoother is intentionally not used.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      wheelMultiplier: 1,
      touchMultiplier: 1,
      lerp: 0.1,
    });
    lenisRef.current = lenis;

    // Keep ScrollTrigger in sync with Lenis' virtual scroll position.
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP's ticker for a single, consistent RAF loop.
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Recalculate trigger positions once everything (incl. fonts) has settled.
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) {
      document.fonts.ready.then(refresh);
    }
    window.addEventListener("load", refresh);

    /**
     * Sidro iz same adrese (`/restoran#jelovnik` - npr. sa odštampanog QR koda).
     *
     * Pregledač skoči na element čim ga sretne u HTML-u, ali fotografije iznad
     * se tek učitavaju i guraju sadržaj naniže, pa posetilac završi na pogrešnom
     * mestu. Zato skok ponavljamo tek kad se sve slegne, i to kroz Lenis - da se
     * ne otima sa njegovim virtuelnim položajem skrola.
     */
    const hash = decodeURIComponent(window.location.hash.slice(1));
    let anchorTimer = 0;
    const jumpToAnchor = () => {
      const target = hash && document.getElementById(hash);
      if (!target) return;
      ScrollTrigger.refresh();
      lenis.scrollTo(target, { offset: anchorOffset(target), immediate: true });
    };
    if (hash) {
      // `load` je već mogao da prođe (klijentska navigacija), pa i tada merimo.
      if (document.readyState === "complete") anchorTimer = window.setTimeout(jumpToAnchor, 120);
      else window.addEventListener("load", jumpToAnchor, { once: true });
    }

    return () => {
      gsap.ticker.remove(update);
      window.removeEventListener("load", refresh);
      window.removeEventListener("load", jumpToAnchor);
      window.clearTimeout(anchorTimer);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
  );
}
