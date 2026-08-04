"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import Calendar from "./Calendar";
import type { CalendarLabels, DayStatus } from "./Calendar";
import { addDays, shortDate } from "../lib/dates";

/**
 * The booking forms' date inputs: a trigger styled like the other underlined
 * fields, and a popover holding the availability calendar. Two flavours -
 * `DateRangeField` for a stay (arrival + departure) and `DateField` for a single
 * day at the pool - over one shared popover shell.
 *
 * These replace the native `<input type="date">`, which could show a guest a
 * date that is already booked and only reject it on submit. The chosen dates
 * still travel as hidden inputs under the same field names, so the Server
 * Actions are untouched.
 */

export type FieldLabels = CalendarLabels & {
  /** Trigger text before anything is picked. */
  placeholder: string;
  free: string;
  taken: string;
  clear: string;
  done: string;
};

/* ------------------------------ Popover shell ----------------------------- */

/**
 * Popover plumbing: close on an outside pointerdown and on Escape, and hand
 * focus back to the trigger that opened it - the calendar takes focus on open,
 * so without this a keyboard user would be dropped at the top of the document.
 */
function usePopover(open: boolean, setOpen: (open: boolean) => void) {
  const ref = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    trigger.current?.focus();
  }, [setOpen]);

  /** Open, remembering where focus should land again. */
  const openWith = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      trigger.current = e.currentTarget;
      setOpen(true);
    },
    [setOpen]
  );

  useEffect(() => {
    if (!open) return;
    // Outside clicks dismiss without stealing focus back - the guest has
    // already moved somewhere else on the page.
    const onPointerDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.stopPropagation();
      close();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen, close]);

  return { ref, close, openWith };
}

const PANEL =
  "absolute left-0 top-full z-30 mt-3 rounded-[var(--radius2)] border border-[var(--border)] bg-[var(--bg)] p-[clamp(1rem,2vw,1.4rem)] shadow-[var(--shadow)]";

/**
 * Ima li u dozvoljenom opsegu ijedan zatvoren dan. Za smeštaj se datumi više ne
 * zatvaraju (videti actions/booking.ts), pa bi stalna legenda „zauzeto“
 * objašnjavala stanje koje gost nikada ne vidi.
 */
function useHasBlocked({ min, max, status }: SharedProps): boolean {
  return useMemo(() => {
    if (!min || !max) return false;
    for (let d = min; d <= max; d = addDays(d, 1)) {
      if (status(d) === "blocked") return true;
    }
    return false;
  }, [min, max, status]);
}

function Panel({
  labels,
  hasBlocked,
  onClear,
  onDone,
  className,
  children,
}: {
  labels: FieldLabels;
  /** Bez zatvorenih dana legenda ne pominje „zauzeto“. */
  hasBlocked: boolean;
  onClear: () => void;
  onDone: () => void;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`${PANEL} w-[min(37rem,calc(100vw-2.5rem))] ${className ?? ""}`}>
      {/* A container, not a media query: the calendar shows two months when the
          panel has room for them and one when it does not, so the same field
          works in a narrow column and a wide one. */}
      <div className="@container">{children}</div>

      <div className="mt-[clamp(0.9rem,2vw,1.25rem)] flex flex-wrap items-center justify-between gap-x-5 gap-y-3 border-t border-[var(--border)] pt-[clamp(0.75rem,1.6vw,1rem)]">
        {/* Legenda. „Zauzeto" se prikazuje samo ako u prikazu zaista postoji
            zatvoren dan - za smeštaj se datumi više ne zatvaraju (videti
            actions/booking.ts), pa bi stalna oznaka objašnjavala stanje koje
            gost nikada ne vidi. */}
        <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.12em] text-[var(--hint)]">
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--main)]" />
            {labels.free}
          </span>
          {hasBlocked && (
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full border border-[var(--border)]" />
              <span className="line-through">{labels.taken}</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onClear}
            className="link-underline text-[12px] uppercase tracking-[0.14em] text-[var(--hint)] transition-colors duration-300 hover:text-[var(--dark)]"
          >
            {labels.clear}
          </button>
          <button
            type="button"
            onClick={onDone}
            className="rounded-full bg-[var(--main)] px-5 py-2 text-[11px] uppercase tracking-[0.16em] text-[var(--bg)] transition-[filter] duration-300 hover:brightness-95"
          >
            {labels.done}
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- Trigger -------------------------------- */

const TRIGGER =
  "flex w-full items-center justify-between gap-2 border-b py-3 text-left text-[17px] transition-colors duration-300";
const LABEL = "mb-1 block text-[12px] uppercase tracking-[0.2em] text-[var(--main)]";

function Trigger({
  id,
  label,
  value,
  placeholder,
  active,
  onClick,
  expanded,
}: {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  active: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  expanded: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className={LABEL}>
        {label}
      </label>
      <button
        id={id}
        type="button"
        onClick={onClick}
        aria-haspopup="dialog"
        aria-expanded={expanded}
        className={`${TRIGGER} ${
          active ? "border-[var(--main)]" : "border-[var(--border)]"
        } ${value ? "text-[var(--dark)]" : "text-[var(--hint)]"}`}
      >
        <span className="truncate">{value || placeholder}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
          className="shrink-0 text-[var(--main)]"
        >
          <rect x="2.5" y="4" width="15" height="13.5" rx="2" stroke="currentColor" strokeWidth="1.2" />
          <path d="M2.5 8h15M6.5 2.5v3M13.5 2.5v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

/* ------------------------------- Range field ------------------------------ */

type SharedProps = {
  min: string;
  max: string;
  today: string;
  status: (iso: string) => DayStatus;
  locale: string;
  labels: FieldLabels;
  /** Extra classes for the popover panel, e.g. a width cap on wide layouts. */
  panelClassName?: string;
};

export function DateRangeField({
  checkin,
  checkout,
  onChange,
  checkinLabel,
  checkoutLabel,
  gapClassName,
  ...shared
}: SharedProps & {
  checkin: string;
  checkout: string;
  onChange: (checkin: string, checkout: string) => void;
  checkinLabel: string;
  checkoutLabel: string;
  /** Column gap, so the pair lines up with the rest of the form's grid. */
  gapClassName: string;
}) {
  const [open, setOpen] = useState(false);
  const { ref, close, openWith } = usePopover(open, setOpen);
  const hasBlocked = useHasBlocked(shared);

  /**
   * Opening from either trigger drops the departure, so the calendar is always
   * in "pick the other end" mode - the behaviour every booking site has trained
   * guests to expect. Opening from the arrival drops both.
   */
  function openFrom(e: React.MouseEvent<HTMLButtonElement>, end: "checkin" | "checkout") {
    onChange(end === "checkin" ? "" : checkin, "");
    openWith(e);
  }

  return (
    <div ref={ref} className="relative">
      <div className={`grid grid-cols-2 ${gapClassName}`}>
        <Trigger
          id="checkin"
          label={checkinLabel}
          value={shortDate(checkin, shared.locale)}
          placeholder={shared.labels.placeholder}
          active={open}
          expanded={open}
          onClick={(e) => openFrom(e, "checkin")}
        />
        <Trigger
          id="checkout"
          label={checkoutLabel}
          value={shortDate(checkout, shared.locale)}
          placeholder={shared.labels.placeholder}
          active={open}
          expanded={open}
          onClick={(e) => openFrom(e, "checkout")}
        />
      </div>

      {/* The Server Action reads these, not the triggers. */}
      <input type="hidden" name="checkin" value={checkin} />
      <input type="hidden" name="checkout" value={checkout} />

      {open && (
        <Panel
          labels={shared.labels}
          hasBlocked={hasBlocked}
          className={shared.panelClassName}
          onClear={() => onChange("", "")}
          onDone={close}
        >
          <Calendar
            mode="range"
            from={checkin}
            to={checkout}
            onSelect={(a, b) => {
              onChange(a, b);
              // A complete stay is the whole job - step out of the way.
              if (b) close();
            }}
            {...shared}
          />
        </Panel>
      )}
    </div>
  );
}

/* ------------------------------ Single field ------------------------------ */

export function DateField({
  name,
  value,
  onChange,
  label,
  ...shared
}: SharedProps & {
  name: string;
  value: string;
  onChange: (date: string) => void;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const { ref, close, openWith } = usePopover(open, setOpen);
  const hasBlocked = useHasBlocked(shared);

  return (
    <div ref={ref} className="relative">
      <Trigger
        id={name}
        label={label}
        value={shortDate(value, shared.locale)}
        placeholder={shared.labels.placeholder}
        active={open}
        expanded={open}
        onClick={(e) => (open ? close() : openWith(e))}
      />

      <input type="hidden" name={name} value={value} />

      {open && (
        <Panel
          labels={shared.labels}
          hasBlocked={hasBlocked}
          className={shared.panelClassName}
          onClear={() => onChange("")}
          onDone={close}
        >
          <Calendar
            mode="single"
            from={value}
            to=""
            onSelect={(d) => {
              onChange(d);
              close();
            }}
            {...shared}
          />
        </Panel>
      )}
    </div>
  );
}
