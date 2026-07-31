"use client";

import Image from "next/image";
import SplitText from "./SplitText";
import MediaReveal from "./MediaReveal";
import { useLang } from "../i18n/LanguageProvider";

/**
 * The saltwater story - why salt instead of chlorine, in the RestaurantSlowFood
 * type treatment (brand icon, centred heading, left-aligned body), closed by a
 * single wide estate photo. Placeholder imagery until dedicated pool shots
 * arrive.
 */
export default function PoolSalt() {
  const { t } = useLang();
  const salt = t.pool.salt;

  return (
    <section className="bg-[var(--light)] py-[clamp(6rem,13vw,13rem)]">
      <div className="mx-[var(--gutter)] flex flex-col items-center text-center">
        <Image
          src="/logo/mileva-logo-icon.png"
          alt=""
          width={1306}
          height={1453}
          className="mb-[clamp(1rem,2vw,1.5rem)] block h-[38px] w-auto"
        />

        <SplitText
          as="h2"
          text={salt.heading}
          className="mt-[clamp(1.25rem,2.5vw,2rem)] max-w-[24ch] text-[clamp(1.35rem,4.4vw,1.7rem)] leading-[1.3] tracking-[-0.01em] text-[var(--dark)]"
        />

        <SplitText
          as="p"
          text={salt.body}
          className="mt-[clamp(1.75rem,3.5vw,2.75rem)] max-w-[52ch] text-left text-[17.78px] leading-relaxed text-[var(--dark)]"
        />

        {/* One wide, calm estate frame under the copy. */}
        <MediaReveal
          className="mx-auto mt-[clamp(3rem,6vw,6rem)] aspect-[21/9] w-full max-w-5xl rounded-[var(--radius2)]"
          parallax
        >
          <Image
            src="/pocetna/half.webp"
            alt=""
            fill
            sizes="(min-width: 1024px) 64rem, 100vw"
            className="object-cover"
          />
        </MediaReveal>
      </div>
    </section>
  );
}
