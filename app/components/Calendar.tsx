"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  addDays,
  dateIn,
  longDate,
  monthGrid,
  monthLabel,
  monthOf,
  shiftMonth,
  weekdayLabels,
} from "../lib/dates";

/**
 * The booking calendar - our own, built to the house design rather than pulled
 * from a component library, because what it has to communicate is specific: a
 * night that is already taken, a departure day that may still be an arrival, and
 * (on the pool) a day that is open but nearly full.
 *
 * Two months side by side on desktop, one on phones. Weeks start on Monday and
 * every label comes from `Intl` in the page language, so the Cyrillic, Latin and
 * English versions all read naturally without a translated month table.
 *
 * Availability model - a stay is [check-in, check-out), so a *night* is named by
 * the date it begins on. A guest leaving on the 14th frees the 14th for the next
 * arrival, and the calendar shows exactly that: the 14th stays clickable.
 *
 *  - picking an arrival: a day is out if its own night is taken.
 *  - picking a departure: valid up to and including the first taken night after
 *    the arrival - you may leave on the day the next guest arrives, but not stay
 *    through it. Anything past that block is dimmed while the pair is open.
 */

/** free = open · soft = open but tight (few pool spots) · blocked = unavailable. */
export type DayStatus = "free" | "soft" | "blocked";

export type CalendarLabels = {
  /** Accessible name of the grid, e.g. "Kalendar dostupnosti". */
  grid: string;
  prevMonth: string;
  nextMonth: string;
  /** Suffix read out on a taken day, e.g. "zauzeto". */
  blocked: string;
};

type CalendarProps = {
  mode: "single" | "range";
  /** Selected day (single) or arrival (range). "" when nothing is picked. */
  from: string;
  /** Departure, range mode only. "" while the pair is still open. */
  to: string;
  onSelect: (from: string, to: string) => void;
  /** First and last selectable day, inclusive. */
  min: string;
  max: string;
  today: string;
  status: (iso: string) => DayStatus;
  /** BCP-47 tag for month and weekday names. */
  locale: string;
  labels: CalendarLabels;
};

const CELL =
  "flex h-9 w-full items-center justify-center text-[14px] leading-none transition-colors duration-200";

export default function Calendar({
  mode,
  from,
  to,
  onSelect,
  min,
  max,
  today,
  status,
  locale,
  labels,
}: CalendarProps) {
  // The pair is open once an arrival is set and the departure is not - the state
  // that changes what a click means and what the grid dims.
  const pickingEnd = mode === "range" && from !== "" && to === "";

  const [view, setView] = useState(() => monthOf(from || min));
  const [focused, setFocused] = useState(from || min);
  const [hover, setHover] = useState("");
  const dayRefs = useRef(new Map<string, HTMLButtonElement>());
  // Only pull focus for keyboard navigation; a mouse click must not yank it.
  const grabFocus = useRef(false);

  const weekdays = useMemo(() => weekdayLabels(locale), [locale]);
  const months = useMemo(
    () => [view, shiftMonth(view.year, view.month, 1)],
    [view]
  );

  /**
   * While the pair is open, the last day a guest may check out on: the first
   * taken night after the arrival (leaving that morning is fine), or the end of
   * the window when nothing blocks the way.
   */
  const checkoutLimit = useMemo(() => {
    if (!pickingEnd) return max;
    for (let d = addDays(from, 1); d <= max; d = addDays(d, 1)) {
      if (status(d) === "blocked") return d;
    }
    return max;
  }, [pickingEnd, from, max, status]);

  const isDisabled = (iso: string): boolean => {
    if (iso < min || iso > max) return true;
    // Past the arrival we are choosing a departure, so the only limit is the
    // next booking - the day it starts on is still a valid morning to leave.
    if (pickingEnd && iso > from) return iso > checkoutLimit;
    // Otherwise the day would begin a new stay, so its own night must be free.
    return status(iso) === "blocked";
  };

  // The band drawn between the two ends - the live hover preview while the pair
  // is open, the committed range once it is closed.
  const rangeEnd = pickingEnd
    ? hover > from && hover <= checkoutLimit
      ? hover
      : ""
    : to;

  const inRange = (iso: string): boolean =>
    mode === "range" && from !== "" && rangeEnd !== "" && iso > from && iso < rangeEnd;

  const isEnd = (iso: string): boolean =>
    iso !== "" && (iso === from || (mode === "range" && iso === rangeEnd));

  function select(iso: string) {
    if (isDisabled(iso)) return;
    if (mode === "single") return onSelect(iso, "");
    // Departure lands; anything else opens a fresh pair on the clicked day.
    if (pickingEnd && iso > from) return onSelect(from, iso);
    onSelect(iso, "");
  }

  /** Keep the focused day on screen - it drives which two months are shown. */
  function showDay(iso: string) {
    const m = monthOf(iso);
    const first = monthIndex(view);
    const target = monthIndex(m);
    if (target < first) setView(m);
    else if (target > first + 1) setView(shiftMonth(m.year, m.month, -1));
  }

  function move(iso: string) {
    const next = iso < min ? min : iso > max ? max : iso;
    grabFocus.current = true;
    setFocused(next);
    showDay(next);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    const step: Record<string, number> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7,
    };
    if (e.key in step) {
      e.preventDefault();
      return move(addDays(focused, step[e.key]));
    }
    if (e.key === "PageUp" || e.key === "PageDown") {
      e.preventDefault();
      const m = monthOf(focused);
      const { year, month } = shiftMonth(m.year, m.month, e.key === "PageUp" ? -1 : 1);
      // `dateIn` clamps the day, so 31 March minus a month lands on 28/29 Feb.
      return move(dateIn(year, month, Number(focused.slice(8))));
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      select(focused);
    }
  }

  // Move real DOM focus to follow the roving tabindex, and on open so the grid
  // is immediately drivable from the keyboard.
  useEffect(() => {
    if (!grabFocus.current) return;
    grabFocus.current = false;
    dayRefs.current.get(focused)?.focus();
  }, [focused]);

  // On open, put focus on the arrival (or the first bookable day) so the grid is
  // immediately drivable from the keyboard without a stray Tab.
  useEffect(() => {
    dayRefs.current.get(from || min)?.focus();
    // Deliberately once, on mount - the calendar only exists while open.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const viewIndex = monthIndex(view);
  const canGoBack = viewIndex > monthIndex(monthOf(min));
  const canGoForward = viewIndex + 1 < monthIndex(monthOf(max));

  return (
    <div onKeyDown={onKeyDown}>
      {/* Month navigation - hairline circles, terracotta on hover. */}
      <div className="mb-[clamp(0.75rem,1.6vw,1.1rem)] flex items-center justify-between gap-3">
        <NavButton
          label={labels.prevMonth}
          disabled={!canGoBack}
          onClick={() => setView(shiftMonth(view.year, view.month, -1))}
          d="M14 5l-6 6 6 6"
        />
        <div className="flex min-w-0 flex-1 justify-around gap-4">
          {months.map((m, i) => (
            <span
              key={`${m.year}-${m.month}`}
              className={`truncate text-[12px] uppercase tracking-[0.18em] text-[var(--dark)] ${
                i === 1 ? "hidden @min-[30rem]:block" : ""
              }`}
            >
              {monthLabel(m.year, m.month, locale)}
            </span>
          ))}
        </div>
        <NavButton
          label={labels.nextMonth}
          disabled={!canGoForward}
          onClick={() => setView(shiftMonth(view.year, view.month, 1))}
          d="M8 5l6 6-6 6"
        />
      </div>

      {/* One grid per month; the second only has room from `sm` up. */}
      <div
        role="grid"
        aria-label={labels.grid}
        aria-multiselectable={mode === "range" || undefined}
        className="grid gap-[clamp(1rem,2.5vw,2rem)] @min-[30rem]:grid-cols-2"
        onMouseLeave={() => setHover("")}
      >
        {months.map((m, i) => (
          <div key={`${m.year}-${m.month}`} className={i === 1 ? "hidden @min-[30rem]:block" : ""}>
            <div role="row" className="mb-1 grid grid-cols-7">
              {weekdays.map((w, j) => (
                <span
                  key={j}
                  role="columnheader"
                  className="pb-1 text-center text-[10px] uppercase tracking-[0.1em] text-[var(--hint)]"
                >
                  {w}
                </span>
              ))}
            </div>

            {chunk(monthGrid(m.year, m.month), 7).map((week, w) => (
              <div role="row" key={w} className="grid grid-cols-7">
                {week.map((iso, d) => {
                  if (!iso) return <span key={d} role="gridcell" aria-hidden="true" />;

                  const disabled = isDisabled(iso);
                  const dayStatus = status(iso);
                  const end = isEnd(iso);
                  const middle = inRange(iso);
                  // Departure-only: taken as a night, but you may still leave
                  // that morning. Shown open rather than struck through.
                  const departureOnly =
                    pickingEnd && iso === checkoutLimit && dayStatus === "blocked";

                  return (
                    <span
                      key={d}
                      role="gridcell"
                      aria-selected={end || middle || undefined}
                      className={band(iso, from, rangeEnd, middle, end)}
                    >
                      <button
                        type="button"
                        ref={(el) => {
                          if (el) dayRefs.current.set(iso, el);
                          else dayRefs.current.delete(iso);
                        }}
                        tabIndex={iso === focused ? 0 : -1}
                        disabled={disabled}
                        aria-label={
                          disabled && dayStatus === "blocked" && !departureOnly
                            ? `${longDate(iso, locale)} - ${labels.blocked}`
                            : longDate(iso, locale)
                        }
                        aria-current={iso === today ? "date" : undefined}
                        onClick={() => select(iso)}
                        onFocus={() => setFocused(iso)}
                        onMouseEnter={() => setHover(iso)}
                        className={dayClass({
                          disabled,
                          dayStatus,
                          end,
                          middle,
                          departureOnly,
                          isToday: iso === today,
                        })}
                      >
                        {Number(iso.slice(8))}
                      </button>
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
        ))}
      </div>

    </div>
  );
}

/* -------------------------------- Styling -------------------------------- */

/**
 * The continuous band behind a selected range. It lives on the cell, not the
 * day, so neighbouring days touch; the ends are rounded and the middle is
 * square, which is what makes a range read as one shape.
 */
function band(
  iso: string,
  from: string,
  end: string,
  middle: boolean,
  isEnd: boolean
): string {
  const base = "relative flex items-center";
  if (!middle && !(isEnd && from !== "" && end !== "")) return base;
  const tint = "bg-[color-mix(in_srgb,var(--main)_10%,transparent)]";
  if (middle) return `${base} ${tint}`;
  // A one-sided cap: round the outer edge, leave the inner edge flush.
  if (iso === from) return `${base} ${tint} rounded-l-full`;
  return `${base} ${tint} rounded-r-full`;
}

function dayClass(s: {
  disabled: boolean;
  dayStatus: DayStatus;
  end: boolean;
  middle: boolean;
  departureOnly: boolean;
  isToday: boolean;
}): string {
  const parts = [CELL, "rounded-full"];

  if (s.end) {
    // The chosen arrival / departure - the one solid mark in the grid.
    parts.push("bg-[var(--main)] text-[var(--bg)]");
  } else if (s.disabled) {
    parts.push("cursor-not-allowed text-[var(--hint)] opacity-45");
    // A taken night reads as struck out; a day merely out of range just fades.
    if (s.dayStatus === "blocked" && !s.departureOnly) parts.push("line-through");
  } else {
    parts.push(
      "cursor-pointer text-[var(--dark)] hover:bg-[color-mix(in_srgb,var(--main)_18%,transparent)]"
    );
    if (s.middle) parts.push("bg-transparent");
    // Open but tight (pool): terracotta type, no fill - a nudge, not a warning.
    if (s.dayStatus === "soft") parts.push("text-[var(--main)]");
  }

  if (s.isToday && !s.end) parts.push("ring-1 ring-inset ring-[var(--border)]");
  parts.push("focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--main)]");
  return parts.join(" ");
}

function NavButton({
  label,
  disabled,
  onClick,
  d,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  d: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-[var(--dark)] transition-colors duration-300 hover:border-[var(--main)] hover:text-[var(--main)] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-[var(--border)] disabled:hover:text-[var(--dark)]"
    >
      <svg width="16" height="16" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d={d} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

/* -------------------------------- Helpers -------------------------------- */

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

/** Months since year 0 - lets two year/month pairs be compared with `<`. */
function monthIndex(v: { year: number; month: number }): number {
  return v.year * 12 + v.month;
}
