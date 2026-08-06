"use client";

import { useActionState } from "react";
import Image from "next/image";
import SplitText from "./SplitText";
import Reveal from "./Reveal";
import { useCms, useLang } from "../i18n/LanguageProvider";
import { useSiteSettings } from "../lib/siteSettings";
import { MAP_URL, OPENING_HOURS } from "../lib/site";
import { sendMessage, type ContactState } from "../actions/contact";
import type { WorkingDay } from "../lib/api";

/**
 * Contact body - one centred editorial column on the page background (no
 * separate coloured panels): an invitation header, the estate's details as
 * hairline rows, then a message form, all in the same rhythm as the rest of the
 * site. Reuses the field/label idiom (see BookingWidget). Submitting posts to
 * the backend's public contact route through a Server Action, then swaps the
 * form for a thank-you note. A full-bleed location band closes the page.
 */

const FIELD =
  "w-full bg-transparent border-b border-[var(--border)] py-3 text-[17px] text-[var(--dark)] placeholder-[var(--hint)] outline-none transition-colors duration-300 focus:border-[var(--main)]";
const LABEL = "mb-1 block text-[12px] uppercase tracking-[0.2em] text-[var(--main)]";

// Google Maps link na imanje - i za red sa adresom i za "Локација" baner.
const MAP_HREF = MAP_URL;

/** "08:00" → "08"; keeps non-zero minutes ("08:30") - matches the site's style. */
const fmtTime = (time: string) => time.replace(/:00$/, "");

/**
 * Collapses the admin's per-day working hours into display lines, joining
 * consecutive days with the same schedule: "Ponedeljak - Petak · 08-19",
 * "Nedelja · zatvoreno".
 */
function hoursLines(hours: WorkingDay[], days: string[], closed: string): string[] {
  const sorted = [...hours].sort((a, b) => a.day - b.day);
  const same = (a: WorkingDay, b: WorkingDay) =>
    a.isOpen === b.isOpen && a.openTime === b.openTime && a.closeTime === b.closeTime;

  const lines: string[] = [];
  for (let i = 0; i < sorted.length; ) {
    let j = i;
    while (j + 1 < sorted.length && same(sorted[j + 1], sorted[i])) j++;
    const label =
      i === j ? days[sorted[i].day] : `${days[sorted[i].day]} - ${days[sorted[j].day]}`;
    const time = sorted[i].isOpen
      ? `${fmtTime(sorted[i].openTime)}-${fmtTime(sorted[i].closeTime)}`
      : closed;
    lines.push(`${label}  ·  ${time}`);
    i = j + 1;
  }
  return lines;
}

export default function ContactDetails() {
  const { t, lang } = useLang();
  const cms = useCms();
  // Ćirilica ima duže gornje i donje produžetke (Ш, Ђ, р, ј) od latinice, pa se
  // u pretesnom proredu naslova sudaraju - na ćirilici ga malo olabavimo.
  const headingLeading = lang === "sr-cyrl" ? "leading-[1.25]" : "leading-[1.1]";
  const s = useSiteSettings();
  const c = t.contact.page;
  const [state, formAction, pending] = useActionState<ContactState, FormData>(sendMessage, {
    status: "idle",
  });
  const sent = state.status === "success";
  const error =
    state.status === "error"
      ? state.reason === "rate"
        ? c.errorRate
        : c.errorBody
      : null;

  // Svaki red nosi listu vrednosti - telefon ih ima tri, svaki sa oznakom čemu
  // služi (restoran/apartmani, bazen, proslave).
  const details: {
    label: string;
    items: { text: string; href: string; note?: string }[];
  }[] = [
    {
      label: c.addressLabel,
      items: [
        { text: s.address ? cms.text(s.address) : t.contact.address, href: MAP_HREF },
      ],
    },
    {
      label: c.phoneLabel,
      items: s.phones.map((p) => ({
        text: p.label,
        href: `tel:${p.href}`,
        note: t.contact.phones[p.key],
      })),
    },
    { label: c.emailLabel, items: [{ text: s.email, href: `mailto:${s.email}` }] },
  ];

  // Radno vreme po objektu. Restoran i bazen rade različito, pa se prikazuju
  // odvojeno; admin panel ima samo jedan raspored i njime prepisuje restoran.
  const venueHours = OPENING_HOURS.map((v) => ({
    key: v.key,
    lines:
      v.key === "restaurant" && s.hours
        ? hoursLines(s.hours, c.days, c.closed)
        : [`${c.days[v.from]} - ${c.days[v.to]}  ·  ${fmtTime(v.open)}-${fmtTime(v.close)}`],
  }));

  return (
    <>
      <section className="bg-[var(--bg)] py-[clamp(6rem,13vw,13rem)]">
        <div className="mx-auto max-w-2xl px-[var(--gutter)]">
          {/* Invitation header. */}
          <Reveal from={30}>
            <div className="flex flex-col items-center text-center">
              <Image
                src="/logo/mileva-logo-icon.png"
                alt=""
                width={1306}
                height={1453}
                className="mb-[clamp(1rem,2vw,1.5rem)] block h-[38px] w-auto"
              />
              <span className="text-[12px] uppercase tracking-[0.3em] text-[var(--main)]">
                {c.detailsLabel}
              </span>
              <SplitText
                as="h2"
                text={c.introHeading}
                className="mt-[clamp(0.75rem,1.5vw,1.25rem)] max-w-[20ch] text-[clamp(1.6rem,4vw,2.4rem)] leading-[1.15] tracking-[-0.01em] text-[var(--dark)]"
              />
              <p className="mt-[clamp(1.25rem,2.5vw,1.75rem)] max-w-[48ch] text-[17.78px] leading-relaxed text-[var(--dark)]">
                {c.introBody}
              </p>
            </div>
          </Reveal>

          {/* Details - hairline rows, full width, centred column. */}
          <Reveal from={24} delay={0.05}>
            <dl className="mt-[clamp(2.5rem,5vw,4rem)] flex flex-col">
              {details.map((d) => (
                <div
                  key={d.label}
                  className="flex flex-col gap-1 border-t border-[var(--border)] py-[clamp(1rem,2vw,1.4rem)] sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <dt className="text-[12px] uppercase tracking-[0.2em] text-[var(--main)]">
                    {d.label}
                  </dt>
                  <dd className="flex flex-col gap-[0.6rem] sm:items-end">
                    {d.items.map((item) => (
                      <span key={item.href} className="flex flex-col sm:items-end">
                        {item.note && (
                          <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--hint)]">
                            {item.note}
                          </span>
                        )}
                        <a
                          href={item.href}
                          className="link-underline w-fit text-[17px] text-[var(--dark)]"
                          {...(item.href.startsWith("http")
                            ? { target: "_blank", rel: "noreferrer" }
                            : {})}
                        >
                          {item.text}
                        </a>
                      </span>
                    ))}
                  </dd>
                </div>
              ))}

              {/* Hours. */}
              <div className="flex flex-col gap-1 border-t border-[var(--border)] py-[clamp(1rem,2vw,1.4rem)] sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <dt className="text-[12px] uppercase tracking-[0.2em] text-[var(--main)]">
                  {c.hoursLabel}
                </dt>
                <dd className="flex flex-col gap-[0.6rem] text-[17px] text-[var(--dark)] sm:items-end sm:text-right">
                  {venueHours.map((v) => (
                    <span key={v.key} className="flex flex-col sm:items-end">
                      <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--hint)]">
                        {t.contact.venues[v.key]}
                      </span>
                      {v.lines.map((h) => (
                        <span key={h}>{h}</span>
                      ))}
                    </span>
                  ))}
                </dd>
              </div>

              {/* Socials. */}
              <div className="flex flex-col gap-1 border-y border-[var(--border)] py-[clamp(1rem,2vw,1.4rem)] sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <dt className="text-[12px] uppercase tracking-[0.2em] text-[var(--main)]">
                  {c.followLabel}
                </dt>
                <dd className="flex gap-5 text-[17px] text-[var(--dark)]">
                  {s.socials.map((social) => (
                    <a key={social.label} href={social.href} className="link-underline">
                      {social.label}
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
          </Reveal>

          {/* Message form - same background, no panel. */}
          <Reveal from={24} delay={0.1}>
            <div className="mt-[clamp(3.5rem,7vw,6rem)] flex flex-col items-center text-center">
              <SplitText
                as="h3"
                text={sent ? c.successTitle : c.formHeading}
                className="text-[clamp(1.35rem,4.4vw,1.7rem)] leading-[1.3] tracking-[-0.01em] text-[var(--dark)]"
              />
              {!sent && (
                <span className="mt-[clamp(0.6rem,1.5vw,1rem)] text-[13px] text-[var(--hint)]">
                  {c.formNote}
                </span>
              )}
            </div>

            {sent ? (
              <p className="mt-[clamp(1.5rem,3vw,2rem)] text-center text-[17.78px] leading-relaxed text-[var(--dark)]">
                {c.successBody}
              </p>
            ) : (
              <form
                action={formAction}
                className="mx-auto mt-[clamp(2rem,4vw,3rem)] flex max-w-xl flex-col gap-[clamp(1.5rem,3vw,2rem)]"
              >
                {/* Mamac za botove - sakriven od ljudi i čitača ekrana; backend
                    tiho odbaci poruku ako stigne popunjen.

                    Polje se NE sme zvati `website`, `url`, `company` i slično:
                    menadžeri lozinki i Chrome autofill takva imena prepoznaju i
                    popune ih i kad su nevidljiva. Tada zamka opali na pravom
                    gostu - on vidi zahvalnicu, a poruka se tiho baci. Otud
                    besmisleno ime, na koje nijedna heuristika ne reaguje. */}
                <input
                  type="text"
                  name="mk_hp"
                  tabIndex={-1}
                  autoComplete="off"
                  data-1p-ignore
                  data-lpignore="true"
                  data-form-type="other"
                  aria-hidden
                  className="pointer-events-none absolute h-0 w-0 opacity-0"
                />
                <div>
                  <label htmlFor="c-name" className={LABEL}>
                    {c.name}
                  </label>
                  <input
                    id="c-name"
                    name="name"
                    type="text"
                    required
                    placeholder={c.namePlaceholder}
                    className={FIELD}
                  />
                </div>
                <div>
                  <label htmlFor="c-email" className={LABEL}>
                    {c.email}
                  </label>
                  <input
                    id="c-email"
                    name="email"
                    type="email"
                    required
                    placeholder={c.emailPlaceholder}
                    className={FIELD}
                  />
                </div>
                <div>
                  <label htmlFor="c-subject" className={LABEL}>
                    {c.subject}
                  </label>
                  <input
                    id="c-subject"
                    name="subject"
                    type="text"
                    placeholder={c.subjectPlaceholder}
                    className={FIELD}
                  />
                </div>
                <div>
                  <label htmlFor="c-message" className={LABEL}>
                    {c.message}
                  </label>
                  <textarea
                    id="c-message"
                    name="message"
                    rows={4}
                    required
                    placeholder={c.messagePlaceholder}
                    className={`${FIELD} resize-none`}
                  />
                </div>

                {error && (
                  <p
                    role="alert"
                    className="text-center text-[14px] leading-relaxed text-[var(--main)]"
                  >
                    {error}
                  </p>
                )}

                <div className="mt-[clamp(0.5rem,1vw,1rem)] flex justify-center">
                  <button
                    type="submit"
                    disabled={pending}
                    className="group relative inline-flex items-center justify-center text-[clamp(1rem,1.3vw,1.2rem)] leading-none tracking-[-0.01em] text-[var(--dark)] transition-opacity duration-300 disabled:cursor-default disabled:opacity-50"
                  >
                    {pending ? c.sending : c.send}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute left-1/2 bottom-[-0.9rem] h-px w-1/2 -translate-x-1/2 bg-current transition-[width] duration-[400ms] ease-[var(--ease-expo-out)] group-hover:w-full"
                    />
                  </button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* Location band - full-bleed image linking out to maps. */}
      <a
        href={MAP_HREF}
        target="_blank"
        rel="noreferrer"
        data-dark-section
        className="group relative flex h-[clamp(340px,52vh,600px)] w-full items-end overflow-hidden"
      >
        <Image
          src="/kontakt/mileva-panorama.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-expo-out)] group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/45" />
        <div className="relative z-10 mx-[var(--gutter)] pb-[clamp(2.5rem,6vw,5rem)] text-[var(--bg)]">
          <span className="text-[12px] uppercase tracking-[0.3em] text-[var(--bg)]">
            {c.mapLabel}
          </span>
          <p
            className={`mt-[clamp(0.6rem,1.5vw,1rem)] max-w-[22ch] text-[clamp(1.6rem,4vw,2.6rem)] tracking-[-0.01em] ${headingLeading}`}
          >
            {c.mapHeading}
          </p>
          <span className="relative mt-[clamp(1.25rem,2.5vw,1.75rem)] inline-flex items-center leading-none text-[clamp(1rem,1.3vw,1.15rem)]">
            {c.directions}
            <span
              aria-hidden
              className="pointer-events-none absolute left-0 bottom-[-0.6rem] h-px w-full bg-current transition-[width] duration-[400ms] ease-[var(--ease-expo-out)] group-hover:w-1/2"
            />
          </span>
        </div>
      </a>
    </>
  );
}
