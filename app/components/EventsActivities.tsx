"use client";

import { useState } from "react";
import Image from "next/image";
import SplitText from "./SplitText";
import Modal from "./Modal";
import { useLang } from "../i18n/LanguageProvider";
import { RIDING } from "../lib/site";

/**
 * Activities - the outdoor experiences around the estate (horse riding, routes,
 * quads, picnics), in the same joined dark-cards treatment used across the site
 * (Restaurants / LeisureGallery / LandmarksFeatured): a grayscale image that
 * brightens + eases on hover, with the activity name centred over it. Each card
 * is a button that opens a modal with the full image + long-form text - except
 * the quads card, which is not in the offer yet (see SOON_INDEX). Riding carries
 * a condition riders must know before coming, so it shows on the card itself and
 * again in the modal, above its own booking number (RIDING_INDEX).
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

/** Aktivnost koja još nije u ponudi - kartica nosi oznaku "Uskoro" i nije
    klikabilna (ranije je vodila na /kvadovi). Index prati `activities.items`. */
const SOON_INDEX = 2;

/** Jahanje - jedina aktivnost sa sopstvenim kontaktom, jer je vodi partner
    (videti RIDING u lib/site.ts). Index prati `activities.items`. */
const RIDING_INDEX = 0;

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

      {/* Joined cards - each opens the detail modal, except the "Uskoro" one,
          which is a plain, non-clickable card. */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {a.items.map((item, i) => {
          const isSoon = i === SOON_INDEX;
          const cardClass = `group relative flex min-h-[50vh] flex-col items-center justify-center overflow-hidden border-[var(--border2)] px-[var(--space)] py-[var(--space)] text-center lg:min-h-screen lg:border-r lg:last:border-r-0 ${
            isSoon ? "cursor-default" : "cursor-pointer"
          }`;
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
                {/* Uslov koji gost mora da vidi pre nego što otvori karticu -
                    isti okvir kao oznaka "Uskoro", samo prelomljen u dva reda.

                    Širina je u rem-ima, ne u `ch`: razmaknuta velika slova su
                    znatno šira od `ch` jedinice, pa bi `max-w-[Nch]` prelamao
                    na tri reda. `text-balance` prepušta pregledaču da dva reda
                    izjednači, umesto da prvi natrpa a drugom ostavi jednu reč. */}
                {item.note && (
                  <p className="mt-[clamp(0.9rem,1.5vw,1.25rem)] max-w-[17rem] text-balance border border-[var(--bg)]/45 px-[1.1em] py-[0.7em] text-[13px] uppercase leading-[1.6] tracking-[0.16em] text-[var(--bg)] drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
                    {item.note}
                  </p>
                )}
                {isSoon && (
                  <span className="mt-[clamp(1rem,1.6vw,1.4rem)] border border-[var(--bg)]/45 px-[1.1em] py-[0.6em] text-[11px] uppercase leading-none tracking-[0.3em] text-[var(--bg)] drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
                    {a.soon}
                  </span>
                )}
              </div>
            </>
          );

          return isSoon ? (
            <div key={item.name} className={cardClass}>
              {inner}
            </div>
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

              {/* Uslov za dolazak - istaknut, da se ne izgubi u tekstu. */}
              {activeItem.requirement && (
                <p className="mt-[clamp(1rem,2.2vw,1.6rem)] border-l-2 border-[var(--main)] pl-[clamp(0.9rem,2vw,1.25rem)] text-[clamp(13.5px,3.4vw,16px)] leading-[1.7] text-[var(--dark)]">
                  {activeItem.requirement}
                </p>
              )}

              {/* Jahanje vodi partner, pa ima svoj broj i svoj sajt. */}
              {active === RIDING_INDEX && (
                <div className="mt-[clamp(1.5rem,3vw,2.25rem)] flex flex-col gap-[clamp(0.9rem,2vw,1.25rem)] border-t border-[var(--border)] pt-[clamp(1.25rem,2.5vw,1.75rem)]">
                  <span className="flex flex-col">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--main)]">
                      {a.bookLabel}
                    </span>
                    <a
                      href={`tel:${RIDING.phoneHref}`}
                      className="link-underline mt-[0.4rem] w-fit text-[clamp(1.05rem,2.6vw,1.35rem)] leading-none tracking-[-0.01em] text-[var(--dark)]"
                    >
                      {RIDING.phoneLabel}
                    </a>
                  </span>
                  <a
                    href={RIDING.url}
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline w-fit text-[clamp(13.5px,3.4vw,16px)] text-[var(--main)]"
                  >
                    {a.moreLabel}
                  </a>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
