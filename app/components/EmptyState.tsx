"use client";

import Image from "next/image";
import SplitText from "./SplitText";
import CtaLink from "./CtaLink";

/**
 * Prazna sekcija - ono što stoji na mestu sadržaja kada ga u admin panelu još
 * nema (blog bez objava, događaji bez термина…).
 *
 * Isti jezik kao 404 strana: знак бренда, теракота eyebrow између две црте,
 * крупан наслов, ред текста и један линк, затворено линијом шумадијских брда.
 * Razlika je što ovo NIJE ceo ekran nego sekcija - uklapa se tamo gde bi inače
 * stajao sadržaj, a zaglavlje i podnožje stranice ostaju netaknuti.
 */
export default function EmptyState({
  eyebrow,
  title,
  body,
  ctaLabel,
  ctaHref = "/kontakt",
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  body: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** `light` = --light podloga (nastavak sekcije), `bg` = osnovna. */
  tone?: "light" | "bg";
}) {
  const background = tone === "light" ? "bg-[var(--light)]" : "bg-[var(--bg)]";

  return (
    <section
      className={`relative overflow-hidden ${background} py-[clamp(5rem,12vw,10rem)]`}
    >
      <div className="relative z-10 mx-[var(--gutter)] flex flex-col items-center text-center">
        <Image
          src="/logo/mileva-logo-icon.png"
          alt=""
          width={1306}
          height={1453}
          className="mb-[clamp(1.25rem,3vw,2rem)] block h-[clamp(38px,5vw,52px)] w-auto"
        />
        <span className="flex items-center gap-3 text-[13px] uppercase tracking-[0.35em] text-[var(--main)]">
          <span className="h-px w-10 bg-[var(--main)]/60" />
          {eyebrow}
          <span className="h-px w-10 bg-[var(--main)]/60" />
        </span>

        <SplitText
          as="h2"
          text={title}
          className="mt-[clamp(1.25rem,2.5vw,2rem)] max-w-[18ch] text-[clamp(1.8rem,5.5vw,3rem)] leading-[1.08] tracking-[-0.015em] text-[var(--dark)]"
        />

        <p className="mt-[clamp(1.25rem,2.5vw,2rem)] max-w-[46ch] text-[clamp(1rem,2.2vw,1.2rem)] leading-relaxed text-[var(--hint)]">
          {body}
        </p>

        {ctaLabel && (
          <CtaLink
            href={ctaHref}
            className="mt-[clamp(1.75rem,3.5vw,2.5rem)] text-[clamp(1rem,1.8vw,1.25rem)] text-[var(--dark)]"
          >
            {ctaLabel}
          </CtaLink>
        )}
      </div>

      {/* Šumadija hills - the brand's line motif, a soft terracotta baseline. */}
      <svg
        aria-hidden
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[18vh] w-full text-[var(--main)]"
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
