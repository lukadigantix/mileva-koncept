"use client";

import Image from "next/image";
import SplitText from "./SplitText";
import MediaReveal from "./MediaReveal";
import { useLang } from "../i18n/LanguageProvider";

/**
 * Pool intro - the centred editorial block below the /bazen hero, mirroring
 * AccommodationIntro: the brand icon as eyebrow, a large serif display heading,
 * a short body paragraph, then a staggered pair of pool photos. The photos are
 * the existing estate pool shots - swap for dedicated pool imagery when it
 * arrives.
 */
export default function PoolIntro() {
  const { t } = useLang();
  const intro = t.pool.intro;

  return (
    <section className="bg-[var(--bg)] py-[clamp(6rem,13vw,13rem)]">
      <div className="mx-[var(--gutter)] flex flex-col items-center text-center">
        {/* Brand icon above the heading - same mark used across the site. */}
        <Image
          src="/logo/mileva-logo-icon.png"
          alt=""
          width={1306}
          height={1453}
          className="mb-[clamp(1rem,2vw,1.5rem)] block h-[38px] w-auto"
        />

        <SplitText
          as="h2"
          text={intro.heading}
          className="mt-[clamp(1.25rem,2.5vw,2rem)] max-w-[24ch] text-[clamp(1.35rem,4.4vw,1.7rem)] leading-[1.3] tracking-[-0.01em] text-[var(--dark)]"
        />

        <SplitText
          as="p"
          text={intro.body}
          className="mt-[clamp(1.75rem,3.5vw,2.75rem)] max-w-[52ch] text-left text-[17.78px] leading-relaxed text-[var(--dark)]"
        />

        {/* Two pool photos side by side - same treatment as the accommodation /
            restaurant welcome pairs (portrait 3/4, clip/scale reveal, slight
            stagger on the second from md up). */}
        <div className="mx-auto mt-[clamp(3rem,6vw,6rem)] grid w-full max-w-5xl grid-cols-2 gap-[var(--space)]">
          <MediaReveal className="aspect-[3/4] rounded-[var(--radius2)]" parallax>
            <Image
              src="/smestaj/bazeni1.webp"
              alt="Bazen Mileva"
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
              src="/smestaj/bazeni2.webp"
              alt="Bazen Mileva"
              fill
              sizes="50vw"
              className="object-cover"
            />
          </MediaReveal>
        </div>
      </div>
    </section>
  );
}
