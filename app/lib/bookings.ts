import { nightsBetween } from "./dates";

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

// Seeded existing reservations per unit index (checkout exclusive). ISO
// `YYYY-MM-DD` strings compare correctly with `<`, so no Date parsing needed.
const seeded: Record<number, Range[]> = {
  0: [{ checkin: "2026-07-10", checkout: "2026-07-14" }],
  2: [{ checkin: "2026-08-01", checkout: "2026-08-05" }],
};

const bookings: Booking[] = [];
let counter = 1043;

/** Two date ranges overlap when each starts before the other ends. */
function overlaps(a: Range, b: Range): boolean {
  return a.checkin < b.checkout && b.checkin < a.checkout;
}

/** Is `unit` free for the whole [checkin, checkout) range? */
export function isAvailable(unit: number, checkin: string, checkout: string): boolean {
  if (nightsBetween(checkin, checkout) <= 0) return false;
  const range = { checkin, checkout };
  const taken = [
    ...(seeded[unit] ?? []),
    ...bookings.filter((b) => b.unit === unit),
  ];
  return !taken.some((r) => overlaps(range, r));
}

/** Record a booking and return its reference code. Caller must check availability first. */
export function createBooking(input: Omit<Booking, "code">): string {
  const code = `MIL-${(counter++).toString(36).toUpperCase().padStart(4, "0")}`;
  bookings.push({ ...input, code });
  return code;
}
