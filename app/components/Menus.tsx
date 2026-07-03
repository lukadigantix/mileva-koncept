"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import SplitText from "./SplitText";
import { useLang } from "../i18n/LanguageProvider";

gsap.registerPlugin(ScrollTrigger);

/**
 * Menus — the reference's `.component--menus` three-column section
 * (AKANEYA / MATSUSAKA / MATSUSAKA-ITO RANCH menus). Every value below is
 * transcribed verbatim from the live Akaneya bundle (Marie Akaneya, Paris —
 * wp-content/themes/akaneya, GSAP 3.15 + Lenis 1.2) and its CSS; nothing here
 * is approximated. It is the three-column sibling of `Featured` and reuses the
 * exact same reveal recipe.
 *
 * Three SEPARATE portrait cards. The columns are staggered vertically and the
 * OUTER two drift in opposite directions while the MIDDLE one holds still, so
 * the three titles/images scissor past one another as the section transits the
 * viewport (measured live: col0 +102.5px → −102.5px, col1 0, col2 −102.5px →
 * +102.5px, crossing zero at mid-scroll — i.e. px(128), signs [1, 0, -1]).
 *
 * Reference scale helper:  px(n) = n / 2400 * innerWidth   (5.333vw at n=128).
 *
 * Layout (CSS, `.component--menus`):
 *  - section  : padding-block 7.5rem (133.33px @1920 ≈ 6.944vw).
 *  - `.columns`: flex, 3 cols, gap 0.75rem (13.33px), content width 74.12rem
 *               (≈68.63vw, 1317.76px @1920), centred. Each column is
 *               calc(33.333% - 0.5rem) ⇒ 430px @1920.
 *  - `.image`  : aspect-ratio 0.739 / 1 (source 784×1060), overflow hidden.
 *  Card rhythm (site rem = 17.78px): title mb 2rem → media mb 2rem →
 *  description p mb 1rem + caption p (block mb 1.5rem) → price `.title` mb
 *  1.5rem → `.link --main --underline`.
 *
 * Type (verbatim, expressed as the reference's 1920 px like `Featured`):
 *  - title / price : 24.44px (1.375rem), uppercase, centred, weight 400, black.
 *  - description   : 17.78px (1rem), line-height 1.7, LEFT aligned, black.
 *  - caption small : 15.55px (0.875rem); the source link is `--dark` #2c2a2b.
 *  - "See menu"    : 17.78px, `--main` terracotta, centred, centred hairline.
 *
 * Animations (GSAP, identical recipe to `Featured`):
 *  1. Image clip reveal (once, start "top bottom"):
 *       set image clipPath: inset(px(32)px) (25.6px @1920) → inset(0px),
 *           duration 1.4, ease expo.out;
 *       set img   opacity 0.0001, scale 1.3 → opacity 1, scale 1.1,
 *           duration 4, ease expo.out.
 *  2. Column drift (desktop, scrub, trigger = section, "top bottom" → "bottom
 *     top"):  col y: sign * px(128) → -sign * px(128), sign = [1, 0, -1].
 *  3. Inner-image parallax (desktop, scrub, "top bottom" → "bottom top"):
 *       img yPercent -10 → 10, ease "none".
 *  4. Titles + descriptions use the signature per-word `SplitText` reveal.
 *
 * Placeholder imagery + copy per the brief — swap for real menus/art later.
 */

/** Card imagery, one per recommendation (order matches `daily.items`). */
const IMAGES = ["/pihtije.webp", "/menu2.webp", "/menu3.webp"];

/** Reference scale unit: n / 2400 of the viewport width, in px. */
const px = (n: number) => (n / 2400) * window.innerWidth;

/** Column drift signs — outer columns scissor, middle column holds still. */
const SIGN = [1, 0, -1];

export default function Menus() {
  const { t } = useLang();
  const daily = t.restaurant.daily;

  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const frames = frameRefs.current.filter(Boolean) as HTMLDivElement[];
      const inners = innerRefs.current.filter(Boolean) as HTMLDivElement[];
      const items = itemRefs.current.filter(Boolean) as HTMLDivElement[];

      // 1. Image clip reveal + scale/opacity — fires once on enter, every
      //    breakpoint. Uniform inset (all four sides) shrinking to zero.
      frames.forEach((frame, i) => {
        const inner = inners[i];
        gsap.set(frame, { clipPath: `inset(${px(32)}px)` });
        gsap.set(inner, { opacity: 0.0001, scale: 1.3 });

        ScrollTrigger.create({
          trigger: frame,
          start: "top bottom",
          once: true,
          onEnter: () => {
            gsap.to(frame, {
              clipPath: "inset(0px)",
              duration: 1.4,
              ease: "expo.out",
            });
            gsap.to(inner, {
              opacity: 1,
              scale: 1.1,
              duration: 4,
              ease: "expo.out",
            });
          },
        });
      });

      // Desktop-only: the column stagger drift (2) and the inner-image
      // parallax (3). On mobile the grid collapses to one column, no offset.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        // 2. Opposite-direction column drift for the OUTER columns, scrubbed
        //    linearly across the section ("top bottom" → "bottom top"). Each
        //    outer column runs y: ±px(128) → ∓px(128), crossing y:0 at exactly
        //    progress 0.5. The middle column (sign 0) never moves.
        items.forEach((item, i) => {
          const sign = SIGN[i];
          if (sign === 0) return;
          gsap.fromTo(
            item,
            { y: () => sign * px(128) },
            {
              y: () => -sign * px(128),
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          );
        });

        // 3. Inner-image parallax, scrubbed over each frame's full transit.
        inners.forEach((inner, i) => {
          gsap.fromTo(
            inner,
            { yPercent: -10 },
            {
              yPercent: 10,
              ease: "none",
              scrollTrigger: {
                trigger: frames[i],
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[var(--bg)] py-[max(80px,min(6.944vw,133.33px))] text-black"
    >
      {/* Header — daily recommendation eyebrow + heading. */}
      <div className="mb-[clamp(2.5rem,6vw,6rem)] flex flex-col items-center px-[var(--gutter)] text-center">
        <span className="text-[clamp(11px,2.6vw,13px)] uppercase tracking-[0.3em] text-[var(--main)]">
          {daily.eyebrow}
        </span>
        <SplitText
          as="h2"
          text={daily.heading}
          className="mt-[clamp(0.6rem,1.6vw,1.25rem)] text-[clamp(1.5rem,4.6vw,2.25rem)] leading-[1.2] tracking-[-0.01em]"
        />
      </div>

      {/* .container.--xlarge → .columns : narrow, centred 3-up grid.
          68.63vw (1317.76px @1920) capped, gap 0.75rem (13.33px). Below lg it
          collapses to one full-width column — where the tight reference gutter
          would cram the stacked cards, so mobile gets a generous row gap. */}
      <div className="mx-auto grid w-[86vw] grid-cols-1 gap-[clamp(3rem,9vw,4rem)] lg:w-[min(68.63vw,1318px)] lg:grid-cols-3 lg:gap-[max(10px,min(0.694vw,13.333px))]">
        {daily.items.map((card, i) => (
          <div
            key={IMAGES[i]}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className="flex flex-col"
          >
            {/* .card */}
            {/* .title — dish name. mb 2rem (35.56px). */}
            <SplitText
              as="h3"
              text={card.title}
              stagger={0.03}
              className="mb-[clamp(1.25rem,3vw,35.56px)] text-center text-[clamp(20px,5vw,24.44px)] uppercase leading-[1.3]"
            />

            {/* .media — mb 2rem. `.image` is the clip frame (aspect 0.739). */}
            <div className="mb-[clamp(1.25rem,3vw,35.56px)]">
              <div
                ref={(el) => {
                  frameRefs.current[i] = el;
                }}
                className="relative aspect-[0.739] w-full overflow-hidden"
              >
                {/* inner — carries scale/opacity reveal + yPercent parallax. */}
                <div
                  ref={(el) => {
                    innerRefs.current[i] = el;
                  }}
                  className="absolute inset-0 will-change-transform"
                >
                  <Image
                    src={IMAGES[i]}
                    alt={card.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, 86vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* .wysiwyg — dish description. LEFT aligned. */}
            <div className="text-left">
              <SplitText
                as="p"
                text={card.desc}
                stagger={0.008}
                className="text-[17.78px] leading-[1.7]"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
