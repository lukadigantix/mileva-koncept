"use client";

import Image from "next/image";
import type { MouseEvent } from "react";
import SplitText from "./SplitText";
import Parallax from "./Parallax";
import CtaLink from "./CtaLink";
import { useLenis } from "./SmoothScroll";
import { useLang } from "../i18n/LanguageProvider";

type HeroProps = {
  /**
   * "home" (default) uses the site tagline. "restaurant" swaps in the
   * restaurant copy and adds a small terracotta eyebrow above the line so the
   * same hero reads a little differently on the /restoran page.
   */
  variant?: "home" | "restaurant";
};

/**
 * Full-viewport hero (analysis §2). A dark charcoal media fills the screen;
 * over it the brand logo sits in the lower-centre, with the tagline pinned near
 * the bottom of the screen. The same shell serves the home and restaurant
 * pages via `variant`.
 */
export default function Hero({ variant = "home" }: HeroProps) {
  const { t } = useLang();
  const lenis = useLenis();

  const isRestaurant = variant === "restaurant";
  const tagline = isRestaurant ? t.restaurant.hero.tagline : t.hero.tagline;
  const eyebrow = isRestaurant ? t.restaurant.hero.eyebrow : null;

  // Hero CTAs jump to the on-page boards below (menu / drinks). Intercept the
  // anchor so Lenis drives a smooth scroll instead of a native jump.
  const scrollTo = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    if (lenis?.current) {
      lenis.current.scrollTo(target, {
        offset: -20,
        // Longer glide + eased curve (fast-out, soft settle) so the jump to the
        // board feels gentle rather than abrupt.
        duration: 1.9,
        easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };
  const restaurantCtas = [
    { label: t.restaurant.hero.menu, href: "#jelovnik", id: "jelovnik" },
    { label: t.restaurant.drinksList.eyebrow, href: "#karta-pica", id: "karta-pica" },
  ];

  return (
    <section
      data-dark-section
      data-parallax-root
      className="relative h-screen min-h-[640px] overflow-hidden text-[var(--bg)]"
    >
      {/* Background video — loops endlessly, muted, plays inline. Dark veil +
          warm ember tint keep the charcoal mood and text legibility. */}
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          src="/mileva1.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-[var(--secondary)] opacity-40 mix-blend-multiply" />
      </div>

      {isRestaurant ? (
        /* Restaurant: one vertically-centred stack — logo, eyebrow, tagline —
           so the lower half stays free for sections added below later. */
        <div className="absolute inset-0 z-10 translate-y-[6vh]">
          <Parallax
            y={-40}
            className="flex h-full flex-col items-center justify-center px-[var(--space)] text-center"
          >
            <Image
              src="/mileva-logo.png"
              alt="Mileva"
              width={4000}
              height={3080}
              priority
              className="pointer-events-none h-auto w-[min(380px,26vw,30vh)] [filter:brightness(0)_invert(1)]"
            />
            {/* Small positive gap below the logo — no overlap. */}
            <div className="mt-[clamp(0.5rem,1.5vw,1.25rem)] flex flex-col items-center gap-[clamp(0.9rem,2vw,1.4rem)]">
              {eyebrow && (
                <span className="flex items-center gap-3 text-[15px] uppercase tracking-[0.35em] text-[var(--main)]">
                  <span className="h-px w-10 bg-[var(--main)]/60" />
                  {eyebrow}
                  <span className="h-px w-10 bg-[var(--main)]/60" />
                </span>
              )}
              <SplitText
                as="p"
                text={tagline}
                immediate
                delay={0.35}
                className="max-w-[46ch] text-[17.78px] leading-relaxed"
              />
              {/* CTA links (Reservation / Menu) — same shared component as the
                  Featured panel so every CTA link is identical. */}
              <nav className="mt-[clamp(1.5rem,3vw,2.5rem)] flex items-center justify-center gap-[clamp(2rem,4vw,3.5rem)]">
                {restaurantCtas.map(({ label, href, id }) => (
                  <CtaLink
                    key={label}
                    href={href}
                    onClick={scrollTo(id)}
                    className="text-[clamp(1rem,1.3vw,1.2rem)] text-[var(--white)] drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
                  >
                    {label}
                  </CtaLink>
                ))}
              </nav>
            </div>
          </Parallax>
        </div>
      ) : (
        <>
          {/* Home: brand logo in the lower-centre — parallaxes on scroll. The
              source art is black on transparent; brightness(0) invert(1) renders
              it white. Centred via flex so GSAP owns the transform.
              Width is capped by BOTH viewport width (28.8vw) and height (34vh):
              on tall screens 28.8vw/408px wins (unchanged look), on short 13"
              laptops 34vh shrinks the mark so it never collides with the
              bottom-pinned tagline. */}
          <div className="pointer-events-none absolute inset-x-0 top-[54%] z-10 flex justify-center">
            <Parallax y={-60}>
              <Image
                src="/mileva-logo.png"
                alt="Mileva"
                width={4000}
                height={3080}
                priority
                className="h-auto w-[min(408px,28.8vw,34vh)] [filter:brightness(0)_invert(1)]"
              />
            </Parallax>
          </div>

          {/* Home: tagline pinned near the bottom, parallaxing faster for depth. */}
          <div className="absolute inset-x-0 bottom-[clamp(2.5rem,5vw,4.5rem)] z-10 flex justify-center px-[var(--space)]">
            <Parallax y={-110}>
              <SplitText
                as="p"
                text={tagline}
                immediate
                delay={0.35}
                className="max-w-[46ch] text-center text-[17.78px] leading-relaxed"
              />
            </Parallax>
          </div>
        </>
      )}
    </section>
  );
}
