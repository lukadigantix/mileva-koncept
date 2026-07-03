"use client";

import { createContext, useContext, useEffect, useRef, type RefObject } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LenisContext = createContext<RefObject<Lenis | null> | null>(null);

/** Ref to the active Lenis instance (e.g. to stop/start background scroll). */
export const useLenis = () => useContext(LenisContext);

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

    return () => {
      gsap.ticker.remove(update);
      window.removeEventListener("load", refresh);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
  );
}
