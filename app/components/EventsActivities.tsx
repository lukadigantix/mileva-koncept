"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "./LocaleLink";
import SplitText from "./SplitText";
import Modal from "./Modal";
import { useLang } from "../i18n/LanguageProvider";

/**
 * Activities - the outdoor experiences around the estate (horse riding, routes,
 * quads, picnics), in the same joined dark-cards treatment used across the site
 * (Restaurants / LeisureGallery / LandmarksFeatured): a grayscale image that
 * brightens + eases on hover, with the activity name centred over it. Each card
 * is a button that opens a modal with the full image + long-form text - except
 * the quads card, which navigates to the /kvadovi page (fleet + route map).
 *
 * Real activity photos, matched by content to the items order: horse riding,
 * panoramic routes (hills), quads, picnic & barbecue (the estate terrace).
 */
const IMAGES = [
  "/dogadjaji/d1.webp",
  "/dogadjaji/d4.webp",
  "/dogadjaji/d2.webp",
  "/dogadjaji/d3.webp",
];

/** Per-item page target - a card with a link navigates instead of opening the
    modal. Order matches `activities.items` in the dictionary. */
const PAGE_LINKS: (string | null)[] = [null, null, "/kvadovi", null];

export default function EventsActivities() {
  const { t } = useLang();
  const a = t.events.activities;
  // Index of the activity whose modal is open, or null.
  const [active, setActive] = useState<number | null>(null);
  const activeItem = active === null ? null : a.items[active];

  return (
    <section
      data-dark-section
      className="bg-[var(--overlay)] text-[var(--bg)]"
    >
      {/* Dark header. */}
      <div className="mx-[var(--gutter)] flex flex-col items-center pt-[clamp(6rem,13vw,13rem)] pb-[clamp(3rem,7vw,6rem)] text-center">
        <span className="text-[12px] uppercase tracking-[0.3em] text-[var(--main)]">
          {a.eyebrow}
        </span>
        <SplitText
          as="h2"
          text={a.heading}
          className="mt-[clamp(0.75rem,1.5vw,1.25rem)] max-w-[22ch] text-[clamp(1.6rem,4vw,2.4rem)] leading-[1.15] tracking-[-0.01em]"
        />
        <p className="mt-[clamp(1.25rem,2.5vw,1.75rem)] max-w-[48ch] text-[17.78px] leading-relaxed text-[var(--sand)]">
          {a.body}
        </p>
      </div>

      {/* Joined cards - each opens the detail modal, or navigates when the
          activity has its own page (quads → /kvadovi). */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {a.items.map((item, i) => {
          const cardClass =
            "group relative flex min-h-[50vh] cursor-pointer flex-col items-center justify-center overflow-hidden border-[var(--border2)] px-[var(--space)] py-[var(--space)] text-center lg:min-h-screen lg:border-r lg:last:border-r-0";
          const inner = (
            <>
              {/* Background image - dark, brightens on hover. */}
              <div className="absolute inset-0">
                <div className="relative h-full w-full transition-all duration-700 ease-[var(--ease-expo-out)] can-hover:scale-105 can-hover:opacity-60 can-hover:grayscale group-hover:scale-100 group-hover:opacity-90 group-hover:grayscale-0">
                  <Image
                    src={IMAGES[i]}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black/20 transition-opacity duration-700 can-hover:bg-black/40 group-hover:opacity-20" />
              </div>

              {/* Mileva wordmark + activity name, centred over the photo - same
                  lockup as the restaurant concept cards. The whole card is
                  clickable (pointer cursor), so no separate read-more label. */}
              <div className="relative z-10 flex flex-col items-center">
                <Image
                  src="/logo/mileva-logo-text.png"
                  alt=""
                  width={3266}
                  height={701}
                  className="mb-5 h-[clamp(30px,3.5vw,44px)] w-auto [filter:brightness(0)_invert(1)] drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
                />
                <h3 className="text-[22px] tracking-[0.15em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
                  {item.name}
                </h3>
              </div>
            </>
          );

          const href = PAGE_LINKS[i];
          return href ? (
            <Link key={item.name} href={href} aria-label={item.name} className={cardClass}>
              {inner}
            </Link>
          ) : (
            <button
              key={item.name}
              type="button"
              onClick={() => setActive(i)}
              aria-label={item.name}
              className={cardClass}
            >
              {inner}
            </button>
          );
        })}
      </div>

      {/* Detail modal - full image + long-form copy for the chosen activity. */}
      {activeItem && active !== null && (
        <Modal
          onClose={() => setActive(null)}
          closeLabel={t.aria.close}
          labelledBy="activity-modal-title"
        >
          <div className="flex min-h-0 flex-1 flex-col md:flex-row">
            <div className="relative aspect-[4/3] w-full shrink-0 md:aspect-auto md:w-[45%] md:self-stretch">
              <Image
                src={IMAGES[active]}
                alt={activeItem.name}
                fill
                sizes="(min-width: 768px) 29rem, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain p-[clamp(1.5rem,4vw,3rem)] md:w-[55%]">
              <span className="block text-[11px] uppercase tracking-[0.3em] text-[var(--main)] md:text-[12px]">
                {activeItem.tag}
              </span>
              <h3
                id="activity-modal-title"
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
