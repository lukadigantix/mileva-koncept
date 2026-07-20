"use client";

import Image from "next/image";
import SplitText from "./SplitText";
import { EMAIL } from "../lib/site";
import { useLang } from "../i18n/LanguageProvider";

/**
 * Contact hero - a dedicated, video-free opener unique to the contact page. A
 * warm typographic statement on the light page background (eyebrow + oversized
 * invitation + tagline + the estate's e-mail as a large link), closed by the
 * brand's Šumadija hills line motif - the same rolling-hills art used in the
 * menu overlay, not seen on any other hero. Replaces the shared video hero here
 * so the contact page reads as its own thing.
 */
export default function ContactHero() {
  const { t } = useLang();
  const c = t.contact.page;

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[var(--bg)] pt-[clamp(6rem,14vh,9rem)] pb-[clamp(5rem,12vh,8rem)]">
      <div className="relative z-10 mx-[var(--gutter)] flex flex-col items-center text-center">
        <Image
          src="/mileva-logo-icon.png"
          alt="Mileva"
          width={1306}
          height={1453}
          priority
          className="mb-[clamp(1.5rem,3.5vw,2.5rem)] block h-[clamp(42px,5.5vw,58px)] w-auto"
        />
        <span className="flex items-center gap-3 text-[13px] uppercase tracking-[0.35em] text-[var(--main)]">
          <span className="h-px w-10 bg-[var(--main)]/60" />
          {t.contact.title}
          <span className="h-px w-10 bg-[var(--main)]/60" />
        </span>

        <SplitText
          as="h1"
          text={c.eyebrow}
          className="mt-[clamp(1.25rem,2.5vw,2rem)] max-w-[16ch] text-[clamp(2.4rem,7vw,4.5rem)] leading-[1.02] tracking-[-0.015em] text-[var(--dark)]"
        />

        <p className="mt-[clamp(1.5rem,3vw,2.25rem)] max-w-[46ch] text-[clamp(1.05rem,2.4vw,1.3rem)] leading-relaxed text-[var(--hint)]">
          {c.tagline}
        </p>

        <a
          href={`mailto:${EMAIL}`}
          className="link-underline mt-[clamp(2rem,4vw,3rem)] w-fit text-[clamp(1.15rem,3vw,2rem)] leading-none tracking-[-0.01em] text-[var(--dark)]"
        >
          {EMAIL}
        </a>
      </div>

      {/* Šumadija hills - the brand's line motif, a soft terracotta baseline. */}
      <svg
        aria-hidden
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[22vh] w-full text-[var(--main)]"
      >
        <path
          d="M0 150 C 240 88 430 168 720 128 C 1010 88 1210 162 1440 116"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.1"
        />
        <path
          d="M0 218 C 260 150 450 232 760 190 C 1050 150 1250 224 1440 176"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.16"
        />
        <path
          d="M0 288 C 250 224 500 300 800 256 C 1080 216 1280 286 1440 244"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.24"
        />
      </svg>
    </section>
  );
}
