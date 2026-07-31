"use client";

import Image from "next/image";
import { useLang } from "../i18n/LanguageProvider";

/**
 * Pool gallery - four real pool photos as the site's joined dark-cards band
 * (Restaurants / EventsActivities / LandmarksFeatured): grayscale at rest on
 * hover-capable devices, brightening to colour on hover (full colour on touch),
 * the Mileva wordmark + a short caption centred over each. The captions read as
 * a day by the pool: calm morning, lunch by the water, summer afternoon,
 * lantern-lit evening - matching the photo order below.
 */
const IMAGES = [
  "/bazen/bazen1.webp",
  "/bazen/bazen4.webp",
  "/bazen/bazen2.webp",
  "/bazen/bazen3.webp",
];

export default function PoolGallery() {
  const { t } = useLang();
  const labels = t.pool.gallery.labels;

  return (
    <section data-dark-section className="bg-[var(--overlay)] text-[var(--bg)]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {IMAGES.map((src, i) => (
          <div
            key={src}
            className="group relative flex min-h-[50vh] flex-col items-center justify-center overflow-hidden border-[var(--border2)] px-[var(--space)] py-[var(--space)] text-center lg:min-h-screen lg:border-r lg:last:border-r-0"
          >
            {/* Background image - dark, brightens on hover (colour on touch). */}
            <div className="absolute inset-0">
              <div className="relative h-full w-full transition-all duration-700 ease-[var(--ease-expo-out)] can-hover:scale-105 can-hover:opacity-60 can-hover:grayscale group-hover:scale-100 group-hover:opacity-90 group-hover:grayscale-0">
                <Image
                  src={src}
                  alt={labels[i] ?? ""}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-700 can-hover:bg-black/40 group-hover:opacity-20" />
            </div>

            {/* Mileva wordmark only - the photos speak for themselves; the
                dictionary labels stay as alt text. */}
            <div className="relative z-10 flex flex-col items-center">
              <Image
                src="/logo/mileva-logo-text.png"
                alt=""
                width={3266}
                height={701}
                className="h-[clamp(30px,3.5vw,44px)] w-auto [filter:brightness(0)_invert(1)] drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
