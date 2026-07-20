"use client";

import Image from "next/image";
import { useLang } from "../i18n/LanguageProvider";

/**
 * Featured landmarks - the joined dark cards treatment used elsewhere on the
 * site (grayscale image that brightens + eases on hover), flowing straight out
 * of the intro heading with no separate header. Instead of the Mileva mark, each
 * card carries the landmark name and its distance.
 *
 * Real landmark photos, in card order: Gruža lake, Šumarice (Kragujevac),
 * Morava airport.
 */
const IMAGES = [
  "/znamenitosti/z1.webp",
  "/znamenitosti/z2.webp",
  "/znamenitosti/z3.webp",
];

export default function LandmarksFeatured() {
  const { t } = useLang();
  const items = t.landmarks.featured.items;

  return (
    <>
      <section data-dark-section className="bg-[var(--overlay)] text-[var(--bg)]">
        <div className="grid grid-cols-1 md:grid-cols-3 md:min-h-screen">
          {items.map((item, i) => (
            <div
              key={item.name}
              className="group relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden border-[var(--border2)] px-[var(--space)] py-[var(--space)] text-center md:min-h-0 md:border-r md:last:border-r-0"
            >
              {/* Background image - dark, brightens on hover. */}
              <div className="absolute inset-0">
                <div className="relative h-full w-full scale-105 opacity-60 grayscale transition-all duration-700 ease-[var(--ease-expo-out)] group-hover:scale-100 group-hover:opacity-90 group-hover:grayscale-0">
                  <Image
                    src={IMAGES[i]}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black/40 transition-opacity duration-700 group-hover:opacity-20" />
              </div>

              {/* Mileva wordmark + landmark name - same lockup as the restaurant
                  concept / activity cards. */}
              <div className="relative z-10 flex flex-col items-center">
                <Image
                  src="/mileva-logo-text.png"
                  alt=""
                  width={3266}
                  height={701}
                  className="mb-5 h-[clamp(30px,3.5vw,44px)] w-auto [filter:brightness(0)_invert(1)] drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
                />
                <h3 className="text-[22px] tracking-[0.15em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
                  {item.name}
                </h3>
              </div>

              {/* Distance - a small white label tucked in the corner. */}
              <span className="absolute bottom-[clamp(1.25rem,3vw,2rem)] left-[clamp(1.25rem,3vw,2rem)] z-10 text-[12px] uppercase tracking-[0.22em] text-white/80 drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
                {item.distance}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Short descriptions for the featured landmarks - the same hairline-row
          idiom as the "nearby" list, kept below the cards so the joined-cards
          concept above stays untouched. */}
      <section className="bg-[var(--bg)] py-[clamp(4rem,9vw,8rem)]">
        <div className="mx-[var(--gutter)] flex flex-col items-center">
          <span className="text-[12px] uppercase tracking-[0.3em] text-[var(--main)]">
            {t.landmarks.featured.eyebrow}
          </span>
          <ul className="mx-auto mt-[clamp(2rem,4vw,3rem)] w-full max-w-2xl">
            {items.map((item) => (
              <li
                key={item.name}
                className="flex items-baseline justify-between gap-6 border-b border-[var(--border)] py-[clamp(1rem,2.2vw,1.5rem)]"
              >
                <div className="text-left">
                  <span className="text-[clamp(16px,4vw,18px)] text-[var(--dark)]">
                    {item.name}
                  </span>
                  <p className="mt-1 max-w-[46ch] text-[14px] leading-relaxed text-[var(--hint)]">
                    {item.desc}
                  </p>
                </div>
                <span className="shrink-0 tracking-[0.05em] text-[var(--main)]">
                  {item.distance}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
