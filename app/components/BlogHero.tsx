"use client";

import Image from "next/image";
import SplitText from "./SplitText";
import { useLang } from "../i18n/LanguageProvider";

/**
 * Blog hero - an editorial title header on the light page background (small
 * terracotta eyebrow + a large centred title), followed by a full-bleed
 * cinematic image band. Replaces the dark video hero on /blog.
 *
 * IMAGE is a placeholder from the existing set - swap for a real editorial shot.
 */
const IMAGE = "/pocetna/midhero@3x.webp";

export default function BlogHero() {
  const { t } = useLang();
  const h = t.blog.hero;

  return (
    <section>
      {/* Title block - light bg, clears the fixed nav via top padding. */}
      <div className="mx-[var(--gutter)] flex flex-col items-center pt-[clamp(9rem,17vw,13rem)] pb-[clamp(3rem,6vw,5.5rem)] text-center">
        <Image
          src="/logo/mileva-logo-icon.png"
          alt="Mileva"
          width={1306}
          height={1453}
          priority
          className="mb-[clamp(1.25rem,3vw,2rem)] block h-[clamp(40px,5vw,54px)] w-auto"
        />
        <span className="flex items-center gap-3 text-[clamp(12px,1.5vw,15px)] uppercase tracking-[0.06em] text-[var(--main)]">
          <span className="h-px w-8 bg-[var(--main)]/60" />
          {h.eyebrow}
          <span className="h-px w-8 bg-[var(--main)]/60" />
        </span>
        <SplitText
          as="h1"
          text={h.title}
          className="mt-[clamp(0.75rem,1.6vw,1.25rem)] text-[clamp(2rem,6.5vw,3.75rem)] uppercase leading-[1.05] tracking-[0.06em] text-[var(--dark)]"
        />
        <p className="mt-[clamp(1.25rem,2.5vw,1.75rem)] max-w-[52ch] text-[clamp(1.05rem,2.2vw,1.25rem)] leading-relaxed text-[var(--hint)]">
          {h.lead}
        </p>
      </div>

      {/* Full-bleed cinematic image band. */}
      <div
        data-dark-section
        className="relative h-[clamp(340px,58vh,680px)] w-full overflow-hidden"
      >
        <Image
          src={IMAGE}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/25" />
      </div>
    </section>
  );
}
