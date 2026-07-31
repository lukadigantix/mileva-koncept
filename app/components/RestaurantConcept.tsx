"use client";

import { useState } from "react";
import Image from "next/image";
import Modal from "./Modal";
import { useLang } from "../i18n/LanguageProvider";

/**
 * Restaurant slow-food concept grid - same treatment as the home page's
 * Restaurants section (dark full-viewport, three columns, Mileva logo-text over
 * a darkened image that brightens on hover). The three cards spell out the
 * slow-food concept and each is a button that opens a modal with the full image
 * + a short text. Images are placeholders until the final art arrives.
 */
const CARDS: string[] = ["/restoran/rest3.webp", "/restoran/rest4.webp", "/restoran/rest5.webp"];

export default function RestaurantConcept() {
  const { t } = useLang();
  const concept = t.restaurant.concept;
  // Index of the concept whose modal is open, or null.
  const [active, setActive] = useState<number | null>(null);
  const activeItem = active === null ? null : concept[active];

  return (
    <section data-dark-section className="bg-[var(--overlay)] text-[var(--bg)]">
      <div className="grid grid-cols-1 md:grid-cols-3 md:min-h-screen">
        {CARDS.map((image, i) => (
          <button
            key={image}
            type="button"
            onClick={() => setActive(i)}
            aria-label={concept[i].name}
            className="group relative flex min-h-[60vh] cursor-pointer flex-col items-center justify-center overflow-hidden border-[var(--border2)] px-[var(--space)] py-[var(--space)] text-center md:min-h-0 md:border-r md:last:border-r-0"
          >
            {/* Background image - dark, brightens on hover */}
            <div className="absolute inset-0">
              <div className="relative h-full w-full transition-all duration-700 ease-[var(--ease-expo-out)] can-hover:scale-105 can-hover:opacity-60 can-hover:grayscale group-hover:scale-100 group-hover:opacity-90 group-hover:grayscale-0">
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-700 can-hover:bg-black/40 group-hover:opacity-20" />
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <Image
                src="/logo/mileva-logo-text.png"
                alt=""
                width={3266}
                height={701}
                className="mb-5 h-[clamp(30px,3.5vw,44px)] w-auto [filter:brightness(0)_invert(1)]"
              />
              <h3 className="text-[22px] tracking-[0.15em]">{concept[i].name}</h3>
            </div>
          </button>
        ))}
      </div>

      {/* Detail modal - full image + short copy for the chosen concept. */}
      {activeItem && active !== null && (
        <Modal
          onClose={() => setActive(null)}
          closeLabel={t.aria.close}
          labelledBy="concept-modal-title"
        >
          <div className="flex min-h-0 flex-1 flex-col md:flex-row">
            <div className="relative aspect-[4/3] w-full shrink-0 md:aspect-auto md:w-[45%] md:self-stretch">
              <Image
                src={CARDS[active]}
                alt={activeItem.name}
                fill
                sizes="(min-width: 768px) 29rem, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain p-[clamp(1.5rem,4vw,3rem)] md:w-[55%]">
              <span className="block text-[11px] uppercase tracking-[0.3em] text-[var(--main)] md:text-[12px]">
                {t.restaurant.slowFood.eyebrow}
              </span>
              <h3
                id="concept-modal-title"
                className="mt-[clamp(0.6rem,1.2vw,1rem)] text-[clamp(1.25rem,5.2vw,2.1rem)] leading-[1.2] tracking-[-0.01em] text-[var(--dark)]"
              >
                {activeItem.name}
              </h3>
              <p className="mt-[clamp(1rem,2.2vw,1.6rem)] text-[clamp(13.5px,3.4vw,17px)] leading-[1.75] text-[var(--dark)]">
                {activeItem.body}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
