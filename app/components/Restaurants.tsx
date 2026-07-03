"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "../i18n/LanguageProvider";

const LOCATIONS: { name: string; image: string; href: string }[] = [
  { name: "MARIE AKANEYA", image: "/restoran.webp", href: "/restoran" },
  { name: "CARLOTA AKANEYA", image: "/smestaj.webp", href: "#" },
  { name: "PILAR AKANEYA", image: "/drvo.webp", href: "#" },
];

/**
 * Restaurants (analysis §5-list / §4 grid). Dark full-viewport section with a
 * three-column grid; each card sits over a dark image that brightens on hover.
 */
export default function Restaurants() {
  const { t } = useLang();

  return (
    <section
      data-dark-section
      className="bg-[var(--overlay)] text-[var(--bg)]"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 md:min-h-screen">
        {LOCATIONS.map((loc, i) => (
          <Link
            key={loc.name}
            href={loc.href}
            className="group relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden border-[var(--border2)] px-[var(--space)] py-[var(--space)] text-center md:min-h-0 md:border-r md:last:border-r-0"
          >
            {/* Background image — dark, brightens on hover */}
            <div className="absolute inset-0">
              <div className="relative h-full w-full scale-105 opacity-60 grayscale transition-all duration-700 ease-[var(--ease-expo-out)] group-hover:scale-100 group-hover:opacity-90 group-hover:grayscale-0">
                <Image
                  src={loc.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 transition-opacity duration-700 group-hover:opacity-20" />
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <Image
                src="/mileva-logo-text.png"
                alt=""
                width={3266}
                height={701}
                className="mb-5 h-[clamp(30px,3.5vw,44px)] w-auto [filter:brightness(0)_invert(1)]"
              />
              <h3 className="text-[22px] tracking-[0.15em]">
                {t.restaurants.categories[i]}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
