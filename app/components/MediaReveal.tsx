"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type MediaRevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Initial scale of the inner media (analysis: 1.1 / 1.3 → 1). */
  scaleFrom?: number;
  duration?: number;
  /**
   * When true, adds a continuous scroll-linked parallax drift on the inner
   * media (scrub) on top of the one-shot reveal — the analysis' 7 scrubbed
   * triggers (start "top bottom", end "bottom top", ease "none").
   */
  parallax?: boolean;
  /**
   * Rest overscale for parallax blocks — the headroom that keeps the ±10% drift
   * within the frame. Default 1.2; the Featured columns use 1.3 to match the
   * reference (measured img scale 1.3).
   */
  overscale?: number;
};

/**
 * Image / media reveal (analysis §5): the media enters dark and scales
 * (1.3 → 1) behind a clip-path inset wipe. Larger blocks additionally drift
 * with scroll via a scrubbed parallax.
 *
 * Expects a single child that fills the frame (e.g. a positioned Placeholder).
 */
export default function MediaReveal({
  children,
  className,
  scaleFrom = 1.3,
  duration = 1.2,
  parallax = false,
  overscale = 1.2,
}: MediaRevealProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    const inner = innerRef.current;
    if (!frame || !inner) return;

    // Parallax blocks keep an overscale at rest so the ±10% drift stays within
    // the frame instead of exposing gaps at the edges (ref media block ≈1.2,
    // Featured columns ≈1.3).
    const restScale = parallax ? overscale : 1;

    const ctx = gsap.context(() => {
      // One-shot clip + scale reveal.
      gsap.set(frame, { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(inner, { scale: scaleFrom });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: frame, start: "top bottom" },
      });
      tl.to(frame, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration,
        ease: "expo.out",
      }).to(inner, { scale: restScale, duration, ease: "expo.out" }, 0);

      // Optional continuous parallax drift, within the overscale headroom.
      // Ref: scrubbed y-translate of ±10% of height, ease "none", over the
      // element's full viewport transit (start "top bottom" → end "bottom top").
      if (parallax) {
        gsap.fromTo(
          inner,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: frame,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    }, frame);

    return () => ctx.revert();
  }, [scaleFrom, duration, parallax, overscale]);

  return (
    <div ref={frameRef} className={`media-reveal ${className ?? ""}`}>
      <div ref={innerRef} className="media-inner absolute inset-0">
        {children}
      </div>
    </div>
  );
}
