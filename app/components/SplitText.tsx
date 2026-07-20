"use client";

import { useLayoutEffect, useRef, type ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SplitTextProps = {
  text: string;
  /** Element tag to render, e.g. "h2", "p", "span". */
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  /** Per-word stagger (s). Analysis: 0.005–0.01. */
  stagger?: number;
  delay?: number;
  /**
   * Play on mount instead of on scroll. Use for above-the-fold content (the
   * hero), which must reveal the moment the page opens - a ScrollTrigger keyed
   * to the viewport can misfire there on navigation.
   */
  immediate?: boolean;
};

/**
 * The site's signature text reveal (analysis §5).
 *
 * Each word is a masked box that starts clipped from the bottom and pushed
 * down, then wipes upward into view:
 *   clip-path: inset(0% 0% 100%)  →  inset(0% 0% 0%)
 *   translateY: 0.4em             →  0
 * Duration ~0.8s, ease expo.out, staggered per word, triggered as the block's
 * top crosses the viewport bottom.
 */
export default function SplitText({
  text,
  as = "span",
  className,
  stagger = 0.008,
  delay = 0,
  immediate = false,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const words = el.querySelectorAll<HTMLElement>(".word");

    const ctx = gsap.context(() => {
      // Exact reference tween (app.min.js title/description reveal):
      //   set  word  { y: "100%", clipPath: "inset(0% 0% 100% 0%)" }
      //   to        { y: "0%",   clipPath: "inset(0% 0% 0% 0%)",
      //               ease: "expo.out", duration: 1.4, stagger }
      const from = { yPercent: 100, clipPath: "inset(0% 0% 100% 0%)" };
      const to = {
        yPercent: 0,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.4,
        ease: "expo.out",
        stagger,
        delay,
        // Strip the inline transform/clip once revealed so the resting layout
        // is pure CSS - prevents words overlapping after a re-init.
        clearProps: "transform,clipPath,willChange",
      };

      if (immediate) {
        // Above-the-fold (hero): reveal on mount, no scroll needed.
        gsap.fromTo(words, from, to);
      } else {
        gsap.fromTo(words, from, {
          ...to,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            // Play once so a later ScrollTrigger.refresh() (e.g. on language
            // switch) can't reset the tween mid-way and leave words offset.
            once: true,
          },
        });
      }
    }, el);

    return () => ctx.revert();
    // `text` is included so the reveal re-initialises on language change.
  }, [stagger, delay, text, immediate]);

  const words = text.split(" ");

  const Tag = as as ElementType;

  return (
    <Tag ref={ref} className={className}>
      <span className="split-line">
      {words.map((word, i) => (
        <span key={i} className="word">
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
      </span>
    </Tag>
  );
}
