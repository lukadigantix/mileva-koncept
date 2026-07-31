"use client";

import Image from "next/image";
import { useLang } from "../i18n/LanguageProvider";

/**
 * Featured landmarks - the joined dark cards treatment used elsewhere on the
 * site (grayscale image that brightens + eases on hover), flowing straight out
 * of the intro heading with no separate header. Instead of the Mileva mark, each
 * card carries the landmark name and its category.
 *
 * A poster band, not a text section: the full stories for these three (and the
 * other three around Knić) live in LandmarksStories right below.
 *
 * Real landmark photos, in card order: Borački krš, Gruža lake, Kamenac
 * monastery.
 */
const IMAGES = [
  "/znamenitosti/boracki-krs-1.webp",
  "/znamenitosti/gruzansko-jezero-1.webp",
  "/znamenitosti/manastir-kamenac-1.webp",
];

/** One featured landmark. The corner label is the category - the Knić landmarks
    are all neighbours, so km says nothing. */
type FeaturedLandmark = {
  name: string;
  desc: string;
  label: string;
  image: string;
};

export default function LandmarksFeatured() {
  const { t } = useLang();
  const items: FeaturedLandmark[] = t.landmarks.featured.items.map((it, i) => ({
    name: it.name,
    desc: it.desc,
    label: it.label,
    image: IMAGES[i],
  }));

  return (
    <section data-dark-section className="bg-[var(--overlay)] text-[var(--bg)]">
      <div className="grid grid-cols-1 md:grid-cols-3 md:min-h-screen">
        {items.map((item) => (
          <div
            key={item.name}
            className="group relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden border-[var(--border2)] px-[var(--space)] py-[var(--space)] text-center md:min-h-0 md:border-r md:last:border-r-0"
          >
            {/* Background image - dark, brightens on hover. */}
            <div className="absolute inset-0">
              <div className="relative h-full w-full transition-all duration-700 ease-[var(--ease-expo-out)] can-hover:scale-105 can-hover:opacity-60 can-hover:grayscale group-hover:scale-100 group-hover:opacity-90 group-hover:grayscale-0">
                <Image
                  src={item.image}
                  alt={item.desc}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-700 can-hover:bg-black/40 group-hover:opacity-20" />
            </div>

            {/* Mileva wordmark + landmark name - same lockup as the restaurant
                concept / activity cards. */}
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

            {/* Distance/category - a small white label tucked in the corner. */}
            <span className="absolute bottom-[clamp(1.25rem,3vw,2rem)] left-[clamp(1.25rem,3vw,2rem)] z-10 text-[12px] uppercase tracking-[0.22em] text-white/80 drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
