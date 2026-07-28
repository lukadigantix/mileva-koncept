"use client";

import Image from "next/image";
import SplitText from "./SplitText";
import MediaReveal from "./MediaReveal";
import { useLang } from "../i18n/LanguageProvider";

/**
 * Amenities - what the property offers, grouped into a few categories. Follows
 * the MenuBoard idiom: centred header (brand mark + terracotta eyebrow + serif
 * heading), then columns whose titles carry the terracotta hairline, with clean
 * item rows beneath. Closes with a staggered trio of small parallax photos, the
 * same clip/scale + drift treatment as the intro pair.
 *
 * PHOTOS are placeholders - swap the three paths for real detail shots.
 */
const PHOTOS = ["/smestaj/s1.webp", "/smestaj/smestaj.webp", "/smestaj/s3.webp"];

export default function AccommodationAmenities() {
  const { t } = useLang();
  const a = t.accommodation.amenities;

  return (
    <section className="bg-[var(--light)] py-[clamp(6rem,13vw,13rem)]">
      <div className="mx-[var(--gutter)]">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <Image
            src="/logo/mileva-logo-icon.png"
            alt=""
            width={1306}
            height={1453}
            className="mb-[clamp(0.85rem,2vw,1.5rem)] block h-[clamp(30px,4vw,38px)] w-auto"
          />
          <span className="text-[clamp(11px,2.6vw,13px)] uppercase tracking-[0.3em] text-[var(--main)]">
            {a.eyebrow}
          </span>
          <SplitText
            as="h2"
            text={a.heading}
            className="mt-[clamp(0.6rem,1.6vw,1.25rem)] max-w-[22ch] text-[clamp(1.35rem,4.6vw,2rem)] leading-[1.2] tracking-[-0.01em] text-[var(--dark)]"
          />
        </div>

        {/* Categories - three columns on desktop, one on mobile. */}
        <div className="mx-auto mt-[clamp(2.5rem,6vw,6rem)] grid max-w-4xl grid-cols-1 gap-x-[clamp(2.5rem,5vw,5rem)] gap-y-[clamp(2.5rem,5vw,4rem)] md:grid-cols-3">
          {a.sections.map((section) => (
            <div key={section.title}>
              {/* Category title - serif small-caps with a terracotta hairline. */}
              <h3 className="mb-[clamp(1rem,2.5vw,2rem)] flex items-center gap-4 text-[clamp(1rem,3.6vw,1.3rem)] uppercase tracking-[0.14em] text-[var(--dark)]">
                <span className="whitespace-nowrap">{section.title}</span>
                <span className="h-px flex-1 bg-[var(--main)]/40" />
              </h3>

              <ul className="flex flex-col gap-[clamp(0.85rem,1.8vw,1.4rem)]">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="text-[clamp(15px,4vw,17.78px)] leading-snug text-[var(--dark)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Small parallax photos - aligned in a row, same clip/scale + drift
            treatment as the intro pair. */}
        <div className="mx-auto mt-[clamp(3.5rem,8vw,8rem)] grid w-full max-w-4xl grid-cols-3 gap-[var(--space)]">
          {PHOTOS.map((src, i) => (
            <MediaReveal
              key={src}
              className="aspect-[3/4] rounded-[var(--radius2)]"
              scaleFrom={i === 1 ? 1.1 : 1.3}
              parallax
            >
              <Image src={src} alt="" fill sizes="33vw" className="object-cover" />
            </MediaReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
