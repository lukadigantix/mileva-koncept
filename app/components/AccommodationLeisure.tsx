"use client";

import Image from "next/image";
import SplitText from "./SplitText";
import { useLang } from "../i18n/LanguageProvider";

/**
 * Leisure text - the editorial block below the leisure gallery, telling the
 * pools + celebrations story. Same centred treatment as the other text
 * sections: brand icon, serif display heading, left-aligned body.
 */
export default function AccommodationLeisure() {
  const { t } = useLang();
  const l = t.accommodation.leisure;

  return (
    <section className="bg-[var(--bg)] py-[clamp(6rem,13vw,13rem)]">
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
          text={l.heading}
          className="mt-[clamp(1.25rem,2.5vw,2rem)] max-w-[24ch] text-[clamp(1.35rem,4.4vw,1.7rem)] leading-[1.3] tracking-[-0.01em] text-[var(--dark)]"
        />

        <SplitText
          as="p"
          text={l.body}
          className="mt-[clamp(1.75rem,3.5vw,2.75rem)] max-w-[54ch] text-left text-[17.78px] leading-relaxed text-[var(--dark)]"
        />
      </div>
    </section>
  );
}
