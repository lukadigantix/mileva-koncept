"use client";

import { useActionState, useEffect, useMemo, useState, useTransition } from "react";
import Image from "next/image";
import SplitText from "./SplitText";
import { DateRangeField } from "./DateFields";
import type { DayStatus } from "./Calendar";
import { useLang } from "../i18n/LanguageProvider";
import { LOCALE_TAGS } from "../i18n/routing";
import { UNITS, BOOKING_HORIZON_DAYS } from "../lib/units";
import { addDays, eachNight, nightsBetween, todayISO } from "../lib/dates";
import { availability, book, quote } from "../actions/booking";
import type { BookState, Quote } from "../actions/booking";

/**
 * Booking widget - the real reservation flow on /smestaj (anchored #rezervacija,
 * the target of the hero CTA). A full-bleed band: the left half is an image
 * showcase that sells the stay (guest rating, apartment name, facts and the
 * price over the photo), the right half is a compact form. The property is a
 * single apartment, so there is no unit picker. Dates drive the `quote` Server
 * Action for a live price; submitting calls `book`, which re-checks availability
 * server-side and returns a booking code.
 */

const FIELD =
  "w-full bg-transparent border-b border-[var(--border)] py-3 text-[17px] text-[var(--dark)] placeholder-[var(--hint)] outline-none transition-colors duration-300 focus:border-[var(--main)]";
const LABEL = "mb-1 block text-[12px] uppercase tracking-[0.2em] text-[var(--main)]";

// Single bookable apartment - fixed unit index into UNITS.
const UNIT = 0;
const SHOWCASE_IMAGE = "/smestaj/sm1.webp";

export default function BookingWidget() {
  const { lang, t } = useLang();
  const r = t.accommodation.reservation;
  const apartment = t.accommodation.units.items[0];

  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState(2);

  const [q, setQ] = useState<Quote | null>(null);
  const [, startQuote] = useTransition();
  const [state, formAction, pending] = useActionState<BookState, FormData>(book, {
    status: "idle",
  });

  // Earliest selectable day - today in the guest's own calendar. Lazy init runs
  // once, so the value cannot drift mid-session.
  const [today] = useState(todayISO);

  // Nights already taken, read once when the section mounts so the calendar can
  // grey them out before the guest picks anything. An empty set until it lands -
  // the server re-checks on submit either way, so nothing is oversold.
  const [blocked, setBlocked] = useState<Set<string>>(new Set());
  useEffect(() => {
    let active = true;
    availability(UNIT).then((a) => {
      if (active) setBlocked(new Set(a.blocked));
    });
    return () => {
      active = false;
    };
  }, []);

  const dayStatus = useMemo(
    () => (iso: string): DayStatus => (blocked.has(iso) ? "blocked" : "free"),
    [blocked]
  );

  const capacity = UNITS[UNIT].capacity;
  const price = UNITS[UNIT].pricePerNight;
  const nights = nightsBetween(checkin, checkout);
  const validSelection = nights > 0;

  // Live price + availability whenever the dates change. The async fetch runs in
  // a transition; the active flag drops stale responses.
  useEffect(() => {
    if (!validSelection) return;
    let active = true;
    startQuote(async () => {
      const res = await quote(UNIT, checkin, checkout);
      if (active) setQ(res);
    });
    return () => {
      active = false;
    };
  }, [checkin, checkout, validSelection]);

  const money = (n: number) => `${n} ${r.currency}`;
  const withN = (s: string, n: number) => s.replace("{n}", String(n));

  const quoted = validSelection && q?.ok === true ? q : null;
  // Availability comes from the same set the calendar paints with, so the badge
  // and the grid can never contradict each other.
  const soldOut = validSelection && eachNight(checkin, checkout).some((n) => blocked.has(n));
  const overCapacity = guests > capacity;
  const canBook = quoted !== null && !soldOut && !overCapacity && !pending;

  const ERRORS: Record<string, string> = {
    capacity: withN(r.errorCapacity, state.status === "error" ? state.capacity ?? guests : guests),
    dates: r.errorDates,
    unavailable: r.errorUnavailable,
    rate: r.errorRate,
    network: r.errorNetwork,
    invalid: r.errorInvalid,
  };
  const errorText = state.status === "error" ? ERRORS[state.reason] : null;

  return (
    <section
      id="rezervacija"
      className="scroll-mt-24 bg-[var(--light)] pt-[clamp(3rem,6vw,6rem)] pb-[clamp(5rem,10vw,10rem)]"
    >
      {/* Header - icon + heading (swaps to the confirmation title on success). */}
      <div className="mx-[var(--gutter)] flex flex-col items-center text-center">
        <Image
          src="/logo/mileva-logo-icon.png"
          alt=""
          width={1306}
          height={1453}
          className="mb-[clamp(1rem,2vw,1.5rem)] block h-[38px] w-auto"
        />
        <SplitText
          as="h2"
          text={state.status === "success" ? r.successTitle : r.heading}
          className="mt-[clamp(0.75rem,1.5vw,1.25rem)] max-w-[24ch] text-[clamp(1.35rem,4.4vw,1.7rem)] leading-[1.3] tracking-[-0.01em] text-[var(--dark)]"
        />
      </div>

      {state.status === "success" ? (
        /* Confirmation - booking reference + summary. */
        <div className="mx-[var(--gutter)] mt-[clamp(2.5rem,5vw,4rem)] flex flex-col items-center text-center">
          <p className="max-w-[46ch] text-[17.78px] leading-relaxed text-[var(--dark)]">
            {r.successBody}
          </p>
          <div className="mt-[clamp(2rem,4vw,3rem)] inline-flex flex-col items-center rounded-[var(--radius2)] border border-[var(--border)] px-[clamp(2rem,5vw,3.5rem)] py-[clamp(1.5rem,3vw,2rem)]">
            <span className="text-[12px] uppercase tracking-[0.25em] text-[var(--main)]">
              {r.codeLabel}
            </span>
            <span className="mt-2 text-[clamp(1.5rem,4vw,2rem)] tracking-[0.15em] text-[var(--dark)]">
              {state.code}
            </span>
          </div>
          <p className="mt-[clamp(1.25rem,2.5vw,1.75rem)] text-[15px] text-[var(--hint)]">
            {money(state.total)} · {state.nights} {r.nights}
          </p>
        </div>
      ) : (
        /* Full-bleed band - image showcase (left) + form (right). */
        <div className="mt-[clamp(2.5rem,5vw,4rem)] grid w-full lg:grid-cols-2">
          {/* Left - image: rating, apartment, facts, price over the photo. */}
          <div className="relative min-h-[clamp(300px,58vw,420px)] overflow-hidden text-[var(--bg)] lg:min-h-full">
            <Image
              src={SHOWCASE_IMAGE}
              alt={apartment.name}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />

            {/* Apartment, facts + price - anchored to the bottom. */}
            <div className="absolute inset-x-0 bottom-0 p-[clamp(1.5rem,3.5vw,3rem)]">
              <h3 className="text-[clamp(1.5rem,3.2vw,2.1rem)] leading-[1.15] tracking-[-0.01em] drop-shadow-[0_2px_14px_rgba(0,0,0,0.5)]">
                {apartment.name}
              </h3>
              <ul className="mt-[clamp(0.6rem,1.4vw,0.9rem)] flex flex-wrap gap-x-5 gap-y-2">
                {apartment.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-[12.5px] uppercase tracking-[0.14em] text-white/85"
                  >
                    <span className="h-px w-4 bg-[var(--main)]" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-[clamp(0.85rem,2vw,1.4rem)] flex items-baseline gap-2">
                <span className="text-[13px] uppercase tracking-[0.18em] text-white/70">
                  {r.fromLabel}
                </span>
                <span className="text-[clamp(2.2rem,5vw,3rem)] leading-none tracking-[-0.02em] drop-shadow-[0_2px_14px_rgba(0,0,0,0.5)]">
                  {price}
                </span>
                <span className="text-[clamp(1.2rem,2.5vw,1.5rem)] text-[var(--main)]">
                  {r.currency}
                </span>
                <span className="text-[14px] text-white/70">/ {r.perNight}</span>
              </div>
            </div>
          </div>

          {/* Right - compact form. */}
          <div className="flex flex-col justify-center px-[clamp(1.5rem,5vw,4.5rem)] py-[clamp(2rem,4vw,3.25rem)]">
            <form action={formAction} className="flex flex-col gap-[clamp(1.1rem,2.2vw,1.6rem)]">
              <input type="hidden" name="unit" value={UNIT} />

              {/* Trip - dates + guests. The pair of dates shares one calendar,
                  so it spans two of the three columns. */}
              <div className="grid grid-cols-1 gap-[clamp(1.1rem,2.5vw,1.75rem)] sm:grid-cols-3">
                <div className="sm:col-span-2">
                  <DateRangeField
                    checkin={checkin}
                    checkout={checkout}
                    onChange={(a, b) => {
                      setCheckin(a);
                      setCheckout(b);
                    }}
                    checkinLabel={r.checkin}
                    checkoutLabel={r.checkout}
                    gapClassName="gap-[clamp(1.1rem,2.5vw,1.75rem)]"
                    min={today}
                    max={addDays(today, BOOKING_HORIZON_DAYS)}
                    today={today}
                    status={dayStatus}
                    locale={LOCALE_TAGS[lang]}
                    labels={{ ...t.calendar }}
                    // Keep the panel inside the form's half of the band.
                    panelClassName="lg:w-[min(37rem,calc(50vw-5rem))]"
                  />
                </div>
                <div>
                  <label htmlFor="guests" className={LABEL}>
                    {r.guests}
                  </label>
                  <input
                    id="guests"
                    name="guests"
                    type="number"
                    min={1}
                    max={capacity}
                    required
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className={FIELD}
                  />
                </div>
              </div>

              {/* Contact - name, email, phone. */}
              <div className="grid grid-cols-1 gap-[clamp(1.1rem,2.5vw,1.75rem)] sm:grid-cols-3">
                <div>
                  <label htmlFor="name" className={LABEL}>
                    {r.name}
                  </label>
                  <input id="name" name="name" type="text" required className={FIELD} />
                </div>
                <div>
                  <label htmlFor="email" className={LABEL}>
                    {r.email}
                  </label>
                  <input id="email" name="email" type="email" required className={FIELD} />
                </div>
                <div>
                  <label htmlFor="phone" className={LABEL}>
                    {r.phone}
                  </label>
                  <input id="phone" name="phone" type="tel" className={FIELD} />
                </div>
              </div>

              {/* Message. */}
              <div>
                <label htmlFor="message" className={LABEL}>
                  {r.message}
                </label>
                <textarea id="message" name="message" rows={2} className={`${FIELD} resize-none`} />
              </div>

              {/* Live total + availability, then the CTA. */}
              <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
                {quoted ? (
                  <>
                    <span className="text-[clamp(15px,1.8vw,17px)] text-[var(--dark)]">
                      {quoted.nights} {r.nights} ·{" "}
                      <span className="tracking-[0.01em]">{money(quoted.total)}</span>
                    </span>
                    <span
                      className={`text-[12px] uppercase tracking-[0.18em] ${
                        soldOut ? "text-[var(--error)]" : "text-[var(--success)]"
                      }`}
                    >
                      {soldOut ? r.unavailable : r.available}
                    </span>
                  </>
                ) : (
                  <span className="text-[14px] text-[var(--hint)]">{r.selectDates}</span>
                )}
                {overCapacity && (
                  <span className="text-[13px] text-[var(--error)]">
                    {withN(r.errorCapacity, capacity)}
                  </span>
                )}
                {errorText && <span className="text-[13px] text-[var(--error)]">{errorText}</span>}
              </div>

              {/* CTA - solid terracotta, the one strong action on the page. */}
              <button
                type="submit"
                disabled={!canBook}
                className="inline-flex items-center justify-center self-start rounded-full bg-[var(--main)] px-[clamp(2rem,4vw,3rem)] py-[clamp(0.7rem,1.4vw,0.95rem)] text-[clamp(0.7rem,0.9vw,0.8rem)] uppercase tracking-[0.16em] text-[var(--bg)] transition-[filter,opacity] duration-300 hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-35"
              >
                {pending ? "…" : r.book}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
