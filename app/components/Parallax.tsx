"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ParallaxProps = {
  children: React.ReactNode;
  className?: string;
  /** Scroll-linked drift, in % of own height (negative = upward). */
  y?: number;
  /**
   * Symmetric scrub override: drift from `from`% to `to`% across the trigger
   * range. When both are set they take precedence over `y` - used for the
   * Featured columns, which drift in opposite directions (left +8.4 → −8.4,
   * right −8.4 → +8.4) as the section transits the viewport.
   */
  from?: number;
  to?: number;
  /** ScrollTrigger start / end (default "top top" / "bottom top"). */
  start?: string;
  end?: string;
  /** Fade to 0 across the drift. */
  fade?: boolean;
};

/**
 * Scroll-scrubbed drift (analysis §5 - ease "none"). Ties to the nearest
 * `[data-parallax-root]` so an element moves relative to its whole section
 * rather than just its own transit - used for the hero kanji + tagline and the
 * Featured section's opposite-drifting columns.
 */
export default function Parallax({
  children,
  className,
  y = -40,
  from,
  to,
  start = "top top",
  end = "bottom top",
  fade = false,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const symmetric = from !== undefined && to !== undefined;

    const ctx = gsap.context(() => {
      const scrollTrigger = {
        trigger: el.closest("[data-parallax-root]") ?? el,
        start,
        end,
        scrub: true,
      };

      if (symmetric) {
        gsap.fromTo(
          el,
          { yPercent: from },
          { yPercent: to, ease: "none", scrollTrigger }
        );
      } else {
        gsap.to(el, {
          yPercent: y,
          ...(fade ? { opacity: 0 } : {}),
          ease: "none",
          scrollTrigger,
        });
      }
    }, el);

    return () => ctx.revert();
  }, [y, from, to, start, end, fade]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
