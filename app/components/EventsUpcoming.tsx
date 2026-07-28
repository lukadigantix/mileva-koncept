"use client";

import { useState } from "react";
import Image from "next/image";
import SplitText from "./SplitText";
import Reveal from "./Reveal";
import MediaReveal from "./MediaReveal";
import Modal from "./Modal";
import { useLang } from "../i18n/LanguageProvider";
import { formatDate } from "../lib/blog";

/** One dated event from the backend CMS, image URL already resolved. */
export type UpcomingEvent = {
  slug: string;
  title: string;
  excerpt: string;
  /** Tiptap HTML - rendered in the detail modal via `.article-html`. */
  descriptionHtml: string;
  image: string;
  startDate: string; // ISO YYYY-MM-DD
  startTime: string | null;
  location: string | null;
};

/**
 * Upcoming events - the dated programme from the backend CMS, rendered below
 * the evergreen celebrations story. A centred header, then a three-up grid of
 * cards (image, date · time · location meta, title, teaser); "read more" opens
 * the shared Modal with the cover + the full Tiptap programme. The section is
 * only mounted when there is at least one upcoming event, so the page reads
 * the same as before when the calendar is empty. CMS copy is single-language;
 * only the section chrome and dates localise.
 */
export default function EventsUpcoming({ events }: { events: UpcomingEvent[] }) {
  const { lang, t } = useLang();
  const c = t.events.upcoming;
  const [active, setActive] = useState<number | null>(null);
  const activeEvent = active === null ? null : events[active];

  const meta = (ev: UpcomingEvent) =>
    [formatDate(ev.startDate, lang), ev.startTime, ev.location]
      .filter(Boolean)
      .join(" · ");

  return (
    <section className="bg-[var(--light)] py-[clamp(5rem,11vw,11rem)]">
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
        </div>

        {/* Cards - a three-up grid, matching the celebrations grid rhythm. */}
        <div className="mt-[clamp(3rem,6vw,6rem)] grid grid-cols-1 gap-x-[clamp(1.5rem,3vw,2.5rem)] gap-y-[clamp(3rem,6vw,5rem)] sm:grid-cols-2 lg:grid-cols-3">
          {events.map((ev, i) => (
            <Reveal key={ev.slug} from={26} delay={(i % 3) * 0.05}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={ev.title}
                className="block w-full cursor-pointer text-left"
              >
                <MediaReveal
                  className="aspect-[4/3] rounded-[var(--radius2)]"
                  scaleFrom={i % 2 === 0 ? 1.15 : 1.1}
                  parallax
                >
                  <Image
                    src={ev.image}
                    alt={ev.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </MediaReveal>
              </button>
              <span className="mt-[clamp(1.25rem,2.5vw,1.75rem)] block text-[12px] uppercase tracking-[0.18em] text-[var(--main)]">
                {meta(ev)}
              </span>
              <h3 className="mt-[clamp(0.5rem,1vw,0.85rem)] text-[clamp(1.2rem,2.6vw,1.5rem)] leading-[1.2] tracking-[-0.01em] text-[var(--dark)]">
                {ev.title}
              </h3>
              {ev.excerpt && (
                <p className="mt-[clamp(0.85rem,1.8vw,1.25rem)] text-[15.5px] leading-[1.7] text-[var(--dark)]">
                  {ev.excerpt}
                </p>
              )}
              {ev.descriptionHtml && (
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className="group relative mt-[clamp(1.25rem,2.5vw,1.75rem)] inline-flex cursor-pointer items-center self-start leading-none tracking-[-0.01em] text-[clamp(0.95rem,1.2vw,1.05rem)] text-[var(--dark)]"
                >
                  {t.blog.readMore}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -bottom-2 left-0 h-px w-full origin-left scale-x-50 bg-current transition-transform duration-[400ms] ease-[var(--ease-expo-out)] group-hover:scale-x-100"
                  />
                </button>
              )}
            </Reveal>
          ))}
        </div>
      </div>

      {/* Detail modal - cover + meta + the full programme from the CMS. */}
      {activeEvent && (
        <Modal
          onClose={() => setActive(null)}
          closeLabel={t.aria.close}
          labelledBy="event-modal-title"
        >
          <div className="flex min-h-0 flex-1 flex-col md:flex-row">
            <div className="relative aspect-[4/3] w-full shrink-0 md:aspect-auto md:w-[45%] md:self-stretch">
              <Image
                src={activeEvent.image}
                alt={activeEvent.title}
                fill
                sizes="(min-width: 768px) 29rem, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain p-[clamp(1.5rem,4vw,3rem)] md:w-[55%]">
              <span className="block text-[11px] uppercase tracking-[0.18em] text-[var(--main)] md:text-[12px]">
                {meta(activeEvent)}
              </span>
              <h3
                id="event-modal-title"
                className="mt-[clamp(0.6rem,1.2vw,1rem)] text-[clamp(1.25rem,5.2vw,2.1rem)] leading-[1.2] tracking-[-0.01em] text-[var(--dark)]"
              >
                {activeEvent.title}
              </h3>
              {activeEvent.descriptionHtml ? (
                <div
                  className="article-html mt-[clamp(1rem,2.2vw,1.6rem)] text-[clamp(13.5px,3.4vw,17px)]"
                  dangerouslySetInnerHTML={{ __html: activeEvent.descriptionHtml }}
                />
              ) : (
                <p className="mt-[clamp(1rem,2.2vw,1.6rem)] text-[clamp(13.5px,3.4vw,17px)] leading-[1.75] text-[var(--dark)]">
                  {activeEvent.excerpt}
                </p>
              )}
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
