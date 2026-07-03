"use client";

import Image from "next/image";
import SplitText from "./SplitText";
import MediaReveal from "./MediaReveal";
import { useLang } from "../i18n/LanguageProvider";

/**
 * Profile section — a centred person block from the reference site: a small
 * kanji eyebrow, the name heading, a large centred portrait, then a bio.
 * (This section was missing from the initial build.)
 */
export default function Profile() {
  const { t } = useLang();

  return (
    <section className="bg-[var(--bg)] pt-[clamp(3rem,6vw,6rem)] pb-[clamp(6rem,12vw,12rem)]">
      <div className="mx-[var(--gutter)]">
        <div className="mb-[clamp(2.5rem,5vw,4rem)] text-center">
          <Image
            src="/mileva-logo-icon.png"
            alt=""
            width={1306}
            height={1453}
            className="mx-auto mb-3 block h-[30px] w-auto"
          />
          <SplitText
            as="h2"
            text={t.profile.name}
            className="text-[24px] uppercase leading-[1.5] tracking-[-0.01em]"
          />
        </div>

        <MediaReveal
          className="mx-auto aspect-[4/3] w-full max-w-4xl rounded-[var(--radius2)]"
          parallax
        >
          <Image
            src="/a1.webp"
            alt={t.profile.name}
            fill
            sizes="(min-width: 768px) 56rem, 100vw"
            className="object-cover object-center"
          />
          {/* Warm colour grade — terracotta multiply + orange soft-light. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[var(--main)] opacity-30 mix-blend-multiply"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[#ff8a3d] opacity-20 mix-blend-soft-light"
          />
        </MediaReveal>

        <SplitText
          as="p"
          text={t.profile.bio}
          className="mx-auto mt-[clamp(2rem,4vw,3rem)] max-w-md text-[17.78px] leading-relaxed text-[var(--dark)]"
        />
      </div>
    </section>
  );
}
