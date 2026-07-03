"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useLenis } from "./SmoothScroll";

gsap.registerPlugin(ScrollTrigger);

/**
 * Owns the shared state between the fixed Header and the off-canvas Sidebar:
 *  - `open`: hamburger / sidebar visibility
 *  - `overDark`: whether a dark section (hero, restaurants) currently sits
 *    under the header, which inverts the header's text colour (analysis §0/§5).
 */
export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [overDark, setOverDark] = useState(true); // hero is dark on load
  const lenisRef = useLenis();

  // Freeze background scrolling while the full-screen menu is open. Lenis needs
  // an explicit stop() (it runs its own RAF loop); stop() also sets
  // `.lenis-stopped` → `overflow: hidden`.
  useEffect(() => {
    const lenis = lenisRef?.current;
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
    return () => lenis.start();
  }, [open, lenisRef]);

  // Header theme switch: the header is light whenever any dark section overlaps
  // the header line. Recompute from the triggers' actual active state on every
  // toggle (a counter would drift, since the on-load-active hero never fires an
  // initial increment).
  useEffect(() => {
    const sections = gsap.utils.toArray<HTMLElement>("[data-dark-section]");

    // Pre-declared so onToggle (which can fire synchronously during create)
    // can safely reference it. `ready` ignores those during-create toggles,
    // which would otherwise run against a half-filled array and force the wrong
    // value (leaving the header dark over the dark hero on load).
    const triggers: ScrollTrigger[] = [];
    let ready = false;
    const sync = () => {
      if (ready) setOverDark(triggers.some((tr) => tr.isActive));
    };

    sections.forEach((section) => {
      triggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: "top top+=49",
          end: "bottom top+=49",
          onToggle: sync,
        })
      );
    });

    ready = true;
    // Deferred initial sync (next frame, once triggers have settled) so the
    // header reflects the real scroll position on load / refresh.
    const raf = requestAnimationFrame(() =>
      setOverDark(triggers.some((tr) => tr.isActive))
    );

    return () => {
      cancelAnimationFrame(raf);
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <Header
        open={open}
        overDark={open || overDark}
        onToggle={() => setOpen((v) => !v)}
      />
      <Sidebar open={open} onClose={() => setOpen(false)} />
    </>
  );
}
