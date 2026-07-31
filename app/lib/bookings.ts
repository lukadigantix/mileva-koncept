import { addDays, eachNight, nightsBetween, todayISO } from "./dates";

/**
 * Booking store + availability logic. This is an in-memory store (module state,
 * persists for the life of the server process) seeded with a couple of existing
 * reservations so availability checks are demonstrable. Swap the internals for a
 * database when one is available - the exported API can stay the same.
 *
 * Server-only: imported exclusively from Server Actions, never from a client
 * component, so the store never ships to the browser.
 */
export type Booking = {
  code: string;
  unit: number;
  checkin: string;
  checkout: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
};

type Range = { checkin: string; checkout: string };

// Seeded existing reservations per unit index (checkout exclusive), placed
// relative to the day the server starts rather than on fixed dates - otherwise
// the demo data ages into the past and the calendar shows a year with nothing
// taken in it. Replace this whole block with the real reservations once the
// backend exposes them; `bookedNights` and `isAvailable` are the only readers.
const seeded: Record<number, Range[]> = {
  0: [
    { checkin: addDays(todayISO(), 9), checkout: addDays(todayISO(), 13) },
    { checkin: addDays(todayISO(), 27), checkout: addDays(todayISO(), 31) },
  ],
};

const bookings: Booking[] = [];
let counter = 1043;

/** Two date ranges overlap when each starts before the other ends. */
function overlaps(a: Range, b: Range): boolean {
  return a.checkin < b.checkout && b.checkin < a.checkout;
}

/** Every range currently holding `unit` - seeded reservations plus new ones. */
function takenRanges(unit: number): Range[] {
  return [...(seeded[unit] ?? []), ...bookings.filter((b) => b.unit === unit)];
}

/** Is `unit` free for the whole [checkin, checkout) range? */
export function isAvailable(unit: number, checkin: string, checkout: string): boolean {
  if (nightsBetween(checkin, checkout) <= 0) return false;
  const range = { checkin, checkout };
  return !takenRanges(unit).some((r) => overlaps(range, r));
}

/**
 * The occupied *nights* for `unit` inside the window [from, to), as ISO dates.
 * This is what the calendar paints: a night belongs to the date it starts on, so
 * an existing 10 → 14 stay returns 10, 11, 12, 13 and leaves the 14th open as
 * the next guest's arrival day.
 */
export function bookedNights(unit: number, from: string, to: string): string[] {
  const nights = new Set<string>();
  for (const r of takenRanges(unit)) {
    for (const night of eachNight(r.checkin, r.checkout)) {
      if (night >= from && night < to) nights.add(night);
    }
  }
  return [...nights].sort();
}

/**
 * Kratak broj rezervacije koji gost dobija na ekranu. Backend vodi svoje UUID-e,
 * ali njih niko ne diktira preko telefona — ovaj kod ide i u `note`, pa admin po
 * njemu nalazi zahtev u panelu.
 */
export function nextBookingCode(): string {
  return `MIL-${(counter++).toString(36).toUpperCase().padStart(4, "0")}`;
}

/** Record a booking and return its reference code. Caller must check availability first. */
export function createBooking(input: Omit<Booking, "code">, code = nextBookingCode()): string {
  bookings.push({ ...input, code });
  return code;
}

/**
 * Zauzete noći iz termina koje vraća backend (`/reservations/public/zauzeti`).
 *
 * `endDate` je dan odlaska, pa poslednja zauzeta noć počinje dan ranije i sam
 * dan odlaska ostaje slobodan za sledeći dolazak. Ako se ispostavi da backend
 * broji i dan odlaska kao zauzet, dovoljno je ovde obrisati `TURNOVER` granu.
 */
export function nightsFromBusyRanges(
  ranges: { startDate: string; endDate: string }[],
  from: string,
  to: string
): string[] {
  const nights = new Set<string>();
  for (const r of ranges) {
    const until = TURNOVER_DAY_BOOKABLE ? r.endDate : addDays(r.endDate, 1);
    for (const night of eachNight(r.startDate, until)) {
      if (night >= from && night < to) nights.add(night);
    }
  }
  return [...nights].sort();
}

/** Da li dan odlaska sme da bude i dan dolaska sledećeg gosta. */
const TURNOVER_DAY_BOOKABLE = true;

/* --------------------------------------------------------------------------
   Bazen je namerno bez svog store-a. Javna ruta za rezervacije prima samo
   objavljen smeštaj ili dostupan kvad kao `resourceId`, a bazen nije ni jedno
   ni drugo, pa dnevne posete idu preko kontakt forme (`POST /api/contact`) i
   stižu u admin panel kao poruka - umesto u memoriju koju niko ne vidi.
   -------------------------------------------------------------------------- */
