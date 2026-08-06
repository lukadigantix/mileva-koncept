"use client";

import Image from "next/image";
import SplitText from "./SplitText";
import { useLang } from "../i18n/LanguageProvider";

/**
 * Landmarks intro - now the page opener on /znamenitosti (the shared video hero
 * was removed): the full Mileva brand mark, a serif display title and a
 * left-aligned body, on the light page background. Top padding clears the fixed
 * nav so it reads as the introductory section of the page.
 */
export default function LandmarksIntro() {
  const { t } = useLang();
  const intro = t.landmarks.intro;

  return (
    <section className="bg-[var(--bg)] pt-[clamp(9rem,17vw,13rem)] pb-[clamp(6rem,13vw,13rem)]">
      <div className="mx-[var(--gutter)] flex flex-col items-center text-center">
        <Image
          src="/logo/mileva-logo.png"
          alt="Mileva"
          width={4000}
          height={3080}
          priority
          className="mb-[clamp(1rem,2vw,1.5rem)] block h-auto w-[clamp(160px,24vw,280px)] [filter:brightness(0)]"
        />
        {/* The hero eyebrow detail carried across the site - terracotta label
            with a hairline on each side. */}
        <span className="flex items-center gap-3 text-[13px] uppercase tracking-[0.35em] text-[var(--main)]">
          <span className="h-px w-10 bg-[var(--main)]/60" />
          {t.landmarks.hero.eyebrow}
          <span className="h-px w-10 bg-[var(--main)]/60" />
        </span>
        <SplitText
          as="h1"
          text={intro.heading}
          className="mt-[clamp(1.25rem,2.5vw,2rem)] max-w-[26ch] text-[clamp(1.5rem,4.6vw,2.1rem)] leading-[1.25] tracking-[-0.01em] text-[var(--dark)]"
        />
        <SplitText
          as="p"
          text={intro.body}
          className="mt-[clamp(1.75rem,3.5vw,2.75rem)] max-w-[54ch] text-left text-[17.78px] leading-relaxed text-[var(--dark)]"
        />
      </div>
    </section>
  );
}
