"use client";

import { useState } from "react";
import Image from "next/image";
import SplitText from "./SplitText";
import Reveal from "./Reveal";
import MediaReveal from "./MediaReveal";
import Modal from "./Modal";
import { useLang } from "../i18n/LanguageProvider";

/**
 * Celebrations - the kinds of gatherings Mileva hosts, given an editorial
 * hierarchy: the wedding is a large feature (big MediaReveal image + rich copy),
 * the remaining occasions are a three-up grid of portrait cards below. Each card
 * shows a one-line teaser and a "read more" button that opens a modal with the
 * full image + long-form text, so the section stays airy while the detail is a
 * click away.
 *
 * Order: weddings (feature), birthdays & celebrations, theatre performances,
 * exhibitions & symposia.
 */
const IMAGES = [
  "/dogadjaji/d9.webp",
  "/dogadjaji/d10.webp",
  "/dogadjaji/d5.webp",
  "/dogadjaji/d8.webp",
];

// Reusable terracotta highlight chips.
function Chips({ points }: { points: string[] }) {
  return (
    <ul className="mt-[clamp(1.1rem,2.2vw,1.6rem)] flex flex-wrap gap-x-6 gap-y-2.5">
      {points.map((p) => (
        <li
          key={p}
          className="flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-[var(--main)]"
        >
          <span className="h-px w-4 bg-[var(--main)]/50" />
          {p}
        </li>
      ))}
    </ul>
  );
}

// "Read more" trigger - a button styled with the site's hairline-underline idiom
// (grows left → right on hover). A button, not a link, since it opens a modal.
function ReadMore({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative mt-[clamp(1.5rem,3vw,2rem)] inline-flex cursor-pointer items-center self-start leading-none tracking-[-0.01em] text-[clamp(0.95rem,1.2vw,1.05rem)] text-[var(--dark)]"
    >
      {label}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-2 left-0 h-px w-full origin-left scale-x-50 bg-current transition-transform duration-[400ms] ease-[var(--ease-expo-out)] group-hover:scale-x-100"
      />
    </button>
  );
}

export default function EventsCelebrations() {
  const { t } = useLang();
  const c = t.events.celebrations;
  const items = c.items;
  const [feature, ...rest] = items;
  // Index (into `items`) of the occasion whose modal is open, or null.
  const [active, setActive] = useState<number | null>(null);
  const activeItem = active === null ? null : items[active];

  return (
    <section className="bg-[var(--bg)] py-[clamp(6rem,13vw,13rem)]">
      <div className="mx-[var(--gutter)]">
        {/* Header. */}
        <div className="flex flex-col items-center text-center">
          <Image
            src="/logo/mileva-logo-icon.png"
            alt=""
            width={1306}
            height={1453}
            className="mb-[clamp(1rem,2vw,1.5rem)] block h-[38px] w-auto"
          />
          <span className="text-[12px] uppercase tracking-[0.3em] text-[var(--main)]">
            {c.eyebrow}
          </span>
          <SplitText
            as="h2"
            text={c.heading}
            className="mt-[clamp(0.75rem,1.5vw,1.25rem)] text-center text-[clamp(1.35rem,4.4vw,1.7rem)] leading-[1.3] tracking-[-0.01em] text-[var(--dark)]"
          />
          <p className="mx-auto mt-[clamp(1.5rem,3vw,2rem)] max-w-[58ch] text-[17.78px] leading-relaxed text-[var(--dark)]">
            {c.intro}
          </p>
        </div>

        {/* Feature - the wedding, as the section's headline. */}
        <div className="mt-[clamp(3.5rem,7vw,7rem)] grid items-center gap-[clamp(2rem,5vw,4.5rem)] md:grid-cols-2">
          <MediaReveal
            className="aspect-[4/3] rounded-[var(--radius2)]"
            scaleFrom={1.1}
            parallax
          >
            <Image
              src={IMAGES[0]}
              alt={feature.name}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </MediaReveal>

          <Reveal>
            <span className="block text-[13px] tabular-nums tracking-[0.3em] text-[var(--main)]">
              01
            </span>
            <SplitText
              as="h3"
              text={feature.name}
              className="mt-[clamp(0.75rem,1.5vw,1.25rem)] text-[clamp(1.6rem,3.6vw,2.2rem)] leading-[1.15] tracking-[-0.01em] text-[var(--dark)]"
            />
            <p className="mt-[clamp(1.25rem,2.5vw,1.75rem)] max-w-[52ch] text-[clamp(16px,1.5vw,17.78px)] leading-[1.75] text-[var(--dark)]">
              {feature.excerpt}
            </p>
            <Chips points={feature.points} />
            <div className="flex">
              <ReadMore label={t.blog.readMore} onClick={() => setActive(0)} />
            </div>
          </Reveal>
        </div>

        {/* Supporting occasions - a three-up grid of portrait cards. */}
        <div className="mt-[clamp(4rem,8vw,8rem)] grid grid-cols-1 gap-x-[clamp(1.5rem,3vw,2.5rem)] gap-y-[clamp(3.5rem,6vw,5rem)] md:grid-cols-3">
          {rest.map((item, j) => (
            <Reveal key={item.name} from={26} delay={j * 0.05}>
              <button
                type="button"
                onClick={() => setActive(j + 1)}
                aria-label={item.name}
                className="block w-full cursor-pointer text-left"
              >
                <MediaReveal
                  className="aspect-[4/5] rounded-[var(--radius2)]"
                  scaleFrom={j % 2 === 0 ? 1.15 : 1.1}
                  parallax
                >
                  <Image
                    src={IMAGES[j + 1]}
                    alt={item.name}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </MediaReveal>
              </button>
              <span className="mt-[clamp(1.25rem,2.5vw,1.75rem)] block text-[13px] tabular-nums tracking-[0.3em] text-[var(--main)]">
                0{j + 2}
              </span>
              <h3 className="mt-[clamp(0.5rem,1vw,0.85rem)] text-[clamp(1.2rem,2.6vw,1.5rem)] leading-[1.2] tracking-[-0.01em] text-[var(--dark)]">
                {item.name}
              </h3>
              <p className="mt-[clamp(0.85rem,1.8vw,1.25rem)] text-[15.5px] leading-[1.7] text-[var(--dark)]">
                {item.excerpt}
              </p>
              <Chips points={item.points} />
              <div className="flex">
                <ReadMore label={t.blog.readMore} onClick={() => setActive(j + 1)} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Detail modal - full image + long-form copy for the chosen occasion. */}
      {activeItem && active !== null && (
        <Modal
          onClose={() => setActive(null)}
          closeLabel={t.aria.close}
          labelledBy="celebration-modal-title"
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
              <span className="block text-[11px] tabular-nums tracking-[0.3em] text-[var(--main)] md:text-[13px]">
                0{active + 1}
              </span>
              <h3
                id="celebration-modal-title"
                className="mt-[clamp(0.6rem,1.2vw,1rem)] text-[clamp(1.25rem,5.2vw,2.1rem)] leading-[1.2] tracking-[-0.01em] text-[var(--dark)]"
              >
                {activeItem.name}
              </h3>
              <p className="mt-[clamp(1rem,2.2vw,1.6rem)] text-[clamp(13.5px,3.4vw,17px)] leading-[1.75] text-[var(--dark)]">
                {activeItem.desc}
              </p>
              <Chips points={activeItem.points} />
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
