"use client";

import Image from "next/image";
import SplitText from "./SplitText";
import { useLang } from "../i18n/LanguageProvider";

/**
 * Restaurant slow-food section - the resort's core kitchen philosophy: slow
 * cooking over open fire, with every ingredient sourced from households within
 * ~20km. Text only for now (imagery may follow), matching the intro's type
 * treatment: terracotta eyebrow, centred heading, left-aligned body.
 */
export default function RestaurantSlowFood() {
  const { t } = useLang();
  const slow = t.restaurant.slowFood;

  return (
    <section className="bg-[var(--bg)] pb-[clamp(6rem,13vw,13rem)]">
      <div className="mx-[var(--gutter)] flex flex-col items-center text-center">
        {/* Brand icon above the heading - same mark as the intro section. */}
        <Image
          src="/logo/mileva-logo-icon.png"
          alt=""
          width={1306}
          height={1453}
          className="mb-[clamp(1rem,2vw,1.5rem)] block h-[38px] w-auto"
        />

        <SplitText
          as="h2"
          text={slow.heading}
          className="mt-[clamp(1.25rem,2.5vw,2rem)] max-w-[24ch] text-[clamp(1.35rem,4.4vw,1.7rem)] leading-[1.3] tracking-[-0.01em] text-[var(--dark)]"
        />

        <SplitText
          as="p"
          text={slow.body}
          className="mt-[clamp(1.75rem,3.5vw,2.75rem)] max-w-[52ch] text-left text-[17.78px] leading-relaxed text-[var(--dark)]"
        />
      </div>
    </section>
  );
}
