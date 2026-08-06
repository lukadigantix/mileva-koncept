"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "./SplitText";
import CtaLink from "./CtaLink";
import { useLang } from "../i18n/LanguageProvider";

gsap.registerPlugin(ScrollTrigger);

/**
 * Featured - the two-panel section (Reservations / Gift / Menus).
 *
 * Two SEPARATE portrait photos, one per column - not one split image. The two
 * columns are staggered and drift in OPPOSITE directions, so they scissor past
 * one another as the section transits the viewport.
 *
 * Reference scale helper:  px(n) = n / 2400 * innerWidth   (5.333vw at n=128).
 *
 * Layout (CSS, `.component--featured`):
 *  - `.columns` : flex, 2 cols, gap max(10px, min(0.661vw, 11.111px)).
 *  - `.box` : height max(818px, min(54.101vw, 908.88px))  (mobile: 420/27.778vw/466).
 *  NOTE: the reference seats the right column ~120px lower with a constant
 *  padding-top. We deliberately drop that here - a constant offset can never
 *  cancel, so the split image could never truly connect. Instead the columns'
 *  vertical stagger comes ONLY from the scrubbed drift (below), which is zero
 *  at mid-scroll, so the two halves line up perfectly at the midpoint.
 *
 * Animations (GSAP, gsap = l.Ay, ScrollTrigger = w.A):
 *  1. Column drift (scrub, trigger = section, start "top bottom" → end
 *     "bottom top"):  left  y: px(128) → px(-128);  right  y: px(-128) → px(128).
 *     Both reach y:0 at progress 0.5 - the panels converge there and the split
 *     image reads as one continuous photo, then part again toward the end.
 *  2. Image clip reveal (once, start "top bottom"):
 *       set  image  clipPath: inset(px(32)px)  (25.6px @1920)  → to inset(0px),
 *            duration 1.4, ease expo.out;
 *       set  img    opacity 0.0001, scale 1.3   → to opacity 1, scale 1.1,
 *            duration 4, ease expo.out.
 *  3. Image inner parallax (desktop, scrub, start "top bottom" → "bottom top"):
 *       img  yPercent -10 → 10, ease "none".
 *
 * Right-panel links: three stacked items, gap max(90px, min(5.952vw, 99.999px)).
 * Underline is `li::after` - border-bottom 1px, bottom max(-0.794vw, -15.228px),
 * width 50% at rest, 100% on hover, transition all .4s var(--expoOut),
 * translateX(-50%): it grows symmetrically FROM THE CENTRE (not left-to-right).
 *
 * Imagery: svaka kartica nosi svoju sliku (vidi PANELS). Leva ima sopstvenu
 * fotografiju preko celog okvira; desna je zadržala izvorni "split" tretman,
 * opisan ovde jer njegova matematika i dalje važi za nju:
 *
 * ORIGINALNI EFEKAT: ONE photo (half.webp) split across both panels. Each panel's inner
 * layer paints the same image sized to the FULL combined width of both columns
 * plus the gutter - `background-size: calc(200% + var(--fgap)) auto` - and
 * windows onto its half with `background-position` (left column → left center,
 * right column → right center). A background only paints within its own box, so
 * each 1-column panel shows exactly its half of the shared image. All the
 * existing transforms (clip reveal, scale/opacity, ±y parallax, opposite column
 * drift) stay on these same layers, so the two halves parallax at slightly
 * different rates - the intended split effect.
 */

const PANELS = [
  {
    // Leva kartica nosi SVOJU fotografiju preko celog okvira (`cover`).
    //
    // `cover` popunjava tačno svoj boks, a sloj se uz to pomera ±10% visine
    // (parallax). Zato je boks razvučen 15% preko okvira na svaku stranu
    // (`bleed`) - to je zaliha koju taj pomeraj troši. Bez nje bi se pri kraju
    // drifta videla praznina uz gornju ili donju ivicu.
    image: "/bazen/bazen6.webp",
    size: "cover",
    pos: "center",
    bleed: true,
  },
  {
    // Desna kartica je nepromenjena: i dalje pokazuje svoju polovinu zajedničke
    // `half.webp` - širina je postavljena na oba stupca plus gutter, a
    // `right center` je pomera na desnu polovinu (vidi opis efekta gore).
    // Visina joj je `auto`, pa je slika osetno viša od okvira i sama nosi
    // zalihu za parallax - njoj `bleed` ne treba.
    image: "/pocetna/half.webp",
    size: "calc(200% + var(--fgap)) auto",
    pos: "right center",
    bleed: false,
  },
] as const;

/** Reference scale unit: n / 2400 of the viewport width, in px. */
const px = (n: number) => (n / 2400) * window.innerWidth;

export default function Featured() {
  const { t } = useLang();
  const ctaLinks: { label: string; href: string }[] = [
    { label: t.nav.pool, href: "/bazen" },
    { label: t.nav.blog, href: "/blog" },
    { label: t.nav.landmarks, href: "/znamenitosti" },
  ];

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

      // 2. Image clip reveal + scale/opacity - fires once on enter, every
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

      // Desktop-only: the column stagger drift (1) and the inner-image
      // parallax (3). On mobile the grid collapses to one column, no offset.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        // 1. Opposite-direction column drift, scrubbed linearly across the
        //    section (start "top bottom" → end "bottom top"). Each column runs
        //    y: ±px(128) → ∓px(128), so both cross y:0 at EXACTLY progress 0.5.
        //    That is the only thing offsetting the two columns vertically (the
        //    right column no longer has a structural padding-top), so the two
        //    halves are maximally offset at the start, slide together, and line
        //    up into one continuous image at the midpoint of the scroll - then
        //    part again toward the end.
        const sign = [1, -1];
        items.forEach((item, i) => {
          gsap.fromTo(
            item,
            { y: () => sign[i] * px(128) },
            {
              y: () => -sign[i] * px(128),
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

        // 3. Inner-image parallax, scrubbed over the frame's full transit.
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
      className="bg-[var(--bg)] py-[clamp(6rem,12vw,12rem)]"
      // --fgap is the column gutter, shared by BOTH the grid gap and the
      // split-image maths (background-size), so the two halves always meet.
      style={{ ["--fgap" as string]: "max(10px,min(0.661vw,11.111px))" } as React.CSSProperties}
    >
      {/* .columns - flex/grid, 2 cols, gap max(10px, min(0.661vw, 11.111px)).
          data-dark-section: while the tall dark photo panels sit under the
          fixed header, the nav flips to its light tone (scoped to the columns,
          not the section, so the cream padding above/below stays dark-on-light). */}
      <div
        data-dark-section
        className="mx-[clamp(20px,7.4vw,180px)] grid grid-cols-1 gap-[var(--fgap)] lg:grid-cols-2"
      >
        {PANELS.map((panel, i) => {
          const isRight = i === 1;
          return (
            <div
              key={panel.pos}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
            >
              {/* .box - height max(818px, min(54.101vw, 908.88px)) desktop,
                  max(420px, min(27.778vw, 466.662px)) mobile. */}
              <div className="relative h-[max(420px,min(27.778vw,466.662px))] w-full overflow-hidden lg:h-[max(818px,min(54.101vw,908.88px))]">
                {/* .image - the clip frame (clip-path inset lives here). */}
                <div
                  ref={(el) => {
                    frameRefs.current[i] = el;
                  }}
                  className="absolute inset-0 overflow-hidden"
                >
                  {/* inner - carries scale/opacity reveal + yPercent parallax.
                      Pozadinu (slika, veličina, težište) nosi sam panel, jer
                      leva i desna kartica više ne dele istu fotografiju. */}
                  <div
                    ref={(el) => {
                      innerRefs.current[i] = el;
                    }}
                    className={`absolute bg-no-repeat will-change-transform ${
                      panel.bleed ? "-inset-[15%]" : "inset-0"
                    }`}
                    style={{
                      backgroundImage: `url(${panel.image})`,
                      backgroundSize: panel.size,
                      backgroundPosition: panel.pos,
                    }}
                  />
                </div>

                {/* Legibility wash over the photo (white content sits above). */}
                <div className="absolute inset-0 bg-black/30" />

                {/* Dodatni fade radi čitljivosti. Sadržaj oba panela je
                    centriran, pa se zatamnjenje koncentriše u sredini i gasi ka
                    ivicama - tekst dobija podlogu, a fotografija ostaje otvorena
                    tamo gde preko nje ništa ne stoji. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.2)_35%,transparent_75%)]"
                />

                {/* .center - absolute, centred content. */}
                {isRight ? (
                  <nav
                    aria-label="Featured"
                    className="absolute inset-0 flex flex-col items-center justify-center gap-[max(90px,min(5.952vw,99.999px))] text-[var(--white)]"
                  >
                    {ctaLinks.map((link) => (
                      <CtaLink
                        key={link.label}
                        href={link.href}
                        className="text-[clamp(1.5rem,1.9vw,2rem)] text-[var(--white)] drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
                      >
                        {link.label}
                      </CtaLink>
                    ))}
                  </nav>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center p-[clamp(1.5rem,4vw,3.5rem)]">
                    <SplitText
                      as="p"
                      text={t.featured.paragraph}
                      stagger={0.01}
                      className="w-4/5 max-w-[26ch] text-center text-[17.78px] leading-relaxed text-[var(--white)] [text-shadow:0_1px_12px_rgba(0,0,0,0.55)]"
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
