"use client";

import Image from "next/image";
import SplitText from "./SplitText";
import MediaReveal from "./MediaReveal";
import { useLang } from "../i18n/LanguageProvider";

/**
 * Dynamic #1 - "HISTORY" (analysis §3). Centered eyebrow 歴史 (terracotta) and
 * heading, a two-column image pair, then a centered body paragraph.
 */
export default function History() {
  const { t } = useLang();

  return (
    <section className="bg-[var(--bg)] pt-[clamp(6rem,12vw,12rem)] pb-[clamp(3rem,6vw,6rem)]">
      <div className="mx-[var(--gutter)]">
        <div className="mb-[clamp(3rem,6vw,6rem)] text-center">
          <Image
            src="/logo/mileva-logo-icon.png"
            alt=""
            width={1306}
            height={1453}
            className="mx-auto mb-3 block h-[30px] w-auto"
          />
          {/* Ref: 24.4px / weight 400 / uppercase / lh ~1.5 - a restrained label,
              not a display heading. */}
          <SplitText
            as="h2"
            text={t.history.heading}
            className="text-[24px] uppercase leading-[1.5] tracking-[-0.01em]"
          />
        </div>

        {/* Two columns at every breakpoint - side by side on mobile too (ref).
            The second image keeps its vertical stagger from md up. */}
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-[var(--space)]">
          <MediaReveal className="aspect-[3/4] rounded-[var(--radius2)]" parallax>
            <Image
              src="/pocetna/zalazak.webp"
              alt="Odmaralište Mileva"
              fill
              sizes="50vw"
              className="object-cover"
            />
          </MediaReveal>
          <MediaReveal
            className="aspect-[3/4] rounded-[var(--radius2)] md:mt-[clamp(2rem,6vw,6rem)]"
            scaleFrom={1.1}
            parallax
          >
            <Image
              src="/pocetna/vidik.webp"
              alt="Odmaralište Mileva"
              fill
              sizes="50vw"
              className="object-cover"
            />
          </MediaReveal>
        </div>

        {/* Ref body copy is a uniform ~17.8px. */}
        <SplitText
          as="p"
          text={t.history.body}
          className="mx-auto mt-[clamp(3rem,6vw,6rem)] max-w-md text-[17.78px] leading-relaxed text-[var(--dark)]"
        />
      </div>
    </section>
  );
}
