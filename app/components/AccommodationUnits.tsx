"use client";

import Image from "next/image";
import SplitText from "./SplitText";
import Reveal from "./Reveal";
import MediaReveal from "./MediaReveal";
import { useLang } from "../i18n/LanguageProvider";

/**
 * Accommodation spaces - the rooms of the (single) apartment presented as
 * alternating media rows (image / editorial text, sides swapping each row).
 * Reuses the site's motion vocabulary: MediaReveal clip/scale for the photo,
 * SplitText word-mask for the name + copy, and the terracotta hairline eyebrow
 * (here as feature chips). Kept flat and unpinned, in keeping with the
 * reference's small type scale. Booking of the whole apartment lives separately
 * in the reservation widget (accommodation.units).
 */
// Real apartment photos, matched to the spaces in order: bedroom, living room,
// kitchen & dining, terrace & garden.
const IMAGES = [
  "/smestaj/sm2.webp",
  "/smestaj/sm1.webp",
  "/smestaj/sm3.webp",
  "/smestaj/sm4.webp",
];

export default function AccommodationUnits() {
  const { t } = useLang();
  const units = t.accommodation.spaces;

  return (
    <section className="bg-[var(--bg)] pb-[clamp(6rem,13vw,13rem)]">
      <div className="mx-[var(--gutter)]">
        {/* Section header - icon + heading, matching the other sections. */}
        <div className="flex flex-col items-center text-center">
          <Image
            src="/logo/mileva-logo-icon.png"
            alt=""
            width={1306}
            height={1453}
            className="mb-[clamp(1rem,2vw,1.5rem)] block h-[38px] w-auto"
          />
          <SplitText
            as="h2"
            text={units.heading}
            className="mt-[clamp(0.75rem,1.5vw,1.25rem)] max-w-[24ch] text-[clamp(1.35rem,4.4vw,1.7rem)] leading-[1.3] tracking-[-0.01em] text-[var(--dark)]"
          />
        </div>

        <div className="mt-[clamp(3.5rem,7vw,7rem)] flex flex-col gap-[clamp(4rem,9vw,9rem)]">
          {units.items.map((unit, i) => {
            const flipped = i % 2 === 1;
            return (
              <div
                key={unit.name}
                className="grid items-center gap-[clamp(2rem,5vw,4.5rem)] md:grid-cols-2"
              >
                {/* Photo - flips to the opposite column on odd rows. */}
                <MediaReveal
                  className={`aspect-[4/3] rounded-[var(--radius2)] ${
                    flipped ? "md:order-2" : ""
                  }`}
                  scaleFrom={1.1}
                  parallax
                >
                  <Image
                    src={IMAGES[i]}
                    alt={unit.name}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </MediaReveal>

                {/* Editorial text. */}
                <Reveal className={flipped ? "md:order-1" : ""}>
                  <span className="block text-[13px] tracking-[0.3em] text-[var(--main)]">
                    0{i + 1}
                  </span>
                  <SplitText
                    as="h3"
                    text={unit.name}
                    className="mt-[clamp(0.75rem,1.5vw,1.25rem)] text-[clamp(1.2rem,3vw,1.5rem)] leading-[1.3] tracking-[-0.01em] text-[var(--dark)]"
                  />
                  <SplitText
                    as="p"
                    text={unit.desc}
                    className="mt-[clamp(1rem,2vw,1.5rem)] max-w-[46ch] text-[17.78px] leading-relaxed text-[var(--dark)]"
                  />
                  {/* Amenity chips - terracotta hairline label, same idiom as
                      the hero eyebrow. */}
                  <ul className="mt-[clamp(1.5rem,3vw,2.25rem)] flex flex-wrap gap-x-8 gap-y-3">
                    {unit.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-[13px] uppercase tracking-[0.2em] text-[var(--main)]"
                      >
                        <span className="h-px w-6 bg-[var(--main)]/50" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
