"use client";

import Image from "next/image";
import SplitText from "./SplitText";
import MediaReveal from "./MediaReveal";
import { useLang } from "../i18n/LanguageProvider";

/** Real estate + surroundings photos below the list. */
const PHOTOS = [
  "/znamenitosti/z4.webp",
  "/znamenitosti/z5.webp",
  "/znamenitosti/z6.webp",
  "/znamenitosti/z7.webp",
];

/** One row, backend or dictionary: the terracotta label is the distance
    (dictionary) or the category (CMS - the API has no distances). */
export type LandmarkRow = { name: string; desc: string; label: string };

/**
 * Landmarks list - nearby nature spots and cultural sites, each a hairline-
 * divided row: name + short description on the left, distance/category in
 * terracotta on the right. Same centred header treatment as the other text
 * sections. Rows come from the backend CMS when provided (an empty array hides
 * the list but keeps the heading + photos); otherwise from the dictionary.
 */
export default function LandmarksList({ items: cmsItems }: { items?: LandmarkRow[] }) {
  const { t } = useLang();
  const list = t.landmarks.list;
  const rows: LandmarkRow[] =
    cmsItems ??
    list.items.map((it) => ({ name: it.name, desc: it.desc, label: it.distance }));

  return (
    <section className="bg-[var(--light)] py-[clamp(6rem,13vw,13rem)]">
      <div className="mx-[var(--gutter)] flex flex-col items-center">
        <Image
          src="/logo/mileva-logo-icon.png"
          alt=""
          width={1306}
          height={1453}
          className="mb-[clamp(1rem,2vw,1.5rem)] block h-[38px] w-auto"
        />
        <SplitText
          as="h2"
          text={list.heading}
          className="text-center text-[clamp(1.35rem,4.4vw,1.7rem)] leading-[1.3] tracking-[-0.01em] text-[var(--dark)]"
        />

        {rows.length > 0 && (
          <ul className="mx-auto mt-[clamp(2.5rem,5vw,4rem)] w-full max-w-2xl">
            {rows.map((item) => (
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
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* Four parallax photos in a row - same treatment as the smestaj page. */}
        <div className="mx-auto mt-[clamp(3.5rem,8vw,8rem)] grid w-full max-w-5xl grid-cols-2 gap-[var(--space)] md:grid-cols-4">
          {PHOTOS.map((src, i) => (
            <MediaReveal
              key={src}
              className="aspect-[3/4] rounded-[var(--radius2)]"
              scaleFrom={i % 2 === 1 ? 1.1 : 1.3}
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
