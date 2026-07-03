"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Start offset in percent of own height (analysis: 10 / 20 / 100). */
  from?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  start?: string;
};

/**
 * Generic scroll reveal: block rises into place while fading in.
 * Defaults follow the analysis — 0.8s / expo.out / trigger "top bottom".
 */
export default function Reveal({
  children,
  className,
  from = 20,
  duration = 0.8,
  delay = 0,
  ease = "expo.out",
  start = "top bottom",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: from, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration,
          delay,
          ease,
          scrollTrigger: { trigger: el, start },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [from, duration, delay, ease, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
