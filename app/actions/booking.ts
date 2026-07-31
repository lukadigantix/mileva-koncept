"use server";

import { UNITS, BOOKING_HORIZON_DAYS } from "../lib/units";
import { addDays, isISODate, nightsBetween, todayISO } from "../lib/dates";
import {
  isAvailable,
  bookedNights,
  createBooking,
  nextBookingCode,
  nightsFromBusyRanges,
} from "../lib/bookings";
import { ACCOMMODATION_ID, getBusyRanges, submitReservation } from "../lib/api";

/**
 * Booking Server Actions for /smestaj. `quote` is a live price lookup called as
 * the guest picks dates; `book` sends the request to the backend, which owns
 * availability and rejects an overlap with 409.
 *
 * The backend is the single source of truth once `ACCOMMODATION_ID` is set. It
 * is not something the site can discover on its own - `/accommodations` needs an
 * admin token - so without it both actions fall back to the local demo store,
 * which keeps /smestaj usable but books nothing anyone else can see.
 */

export type Availability = {
  /** Window the answer covers - the calendar clamps navigation to it. */
  from: string;
  to: string;
  /** Nights already taken inside the window (the date each night starts on). */
  blocked: string[];
};

/**
 * Occupied nights for the calendar, from the backend's public busy-ranges
 * route. Read as soon as the booking section mounts, so a guest sees what is
 * free before touching a field rather than discovering it on submit. It is a
 * hint, not a guarantee - `book` is what actually decides.
 */
export async function availability(unitIndex: number): Promise<Availability> {
  const from = todayISO();
  const to = addDays(from, BOOKING_HORIZON_DAYS);
  if (!UNITS[unitIndex]) return { from, to, blocked: [] };

  const ranges = await getBusyRanges(ACCOMMODATION_ID, from, to);
  // A null answer means unconfigured or unreachable - fall back rather than
  // show a wide-open year the backend would then refuse.
  const blocked = ranges
    ? nightsFromBusyRanges(ranges, from, to)
    : bookedNights(unitIndex, from, to);
  return { from, to, blocked };
}

/**
 * Price only. Availability is deliberately not answered here: the client
 * already holds the occupied nights from `availability` and can tell instantly,
 * and asking twice would only invite the two answers to disagree. The one check
 * that binds is the backend's, at `book`.
 */
export type Quote =
  | { ok: false }
  | { ok: true; nights: number; pricePerNight: number; total: number; capacity: number };

export async function quote(
  unitIndex: number,
  checkin: string,
  checkout: string
): Promise<Quote> {
  const unit = UNITS[unitIndex];
  const nights = nightsBetween(checkin, checkout);
  if (!unit || nights <= 0) return { ok: false };
  return {
    ok: true,
    nights,
    pricePerNight: unit.pricePerNight,
    total: nights * unit.pricePerNight,
    capacity: unit.capacity,
  };
}

export type BookState =
  | { status: "idle" }
  | {
      status: "error";
      /** rate = backend je odbio zbog previše zahteva sa iste IP adrese ·
          network = API nije odgovorio, pa se ništa nije upisalo. */
      reason: "invalid" | "dates" | "capacity" | "unavailable" | "rate" | "network";
      capacity?: number;
    }
  | { status: "success"; code: string; nights: number; total: number };

export async function book(_prev: BookState, formData: FormData): Promise<BookState> {
  const unitIndex = Number(formData.get("unit"));
  const checkin = String(formData.get("checkin") ?? "");
  const checkout = String(formData.get("checkout") ?? "");
  const guests = Number(formData.get("guests"));
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();

  const unit = UNITS[unitIndex];
  if (!unit || !checkin || !checkout || !name || !email || !guests) {
    return { status: "error", reason: "invalid" };
  }

  const nights = nightsBetween(checkin, checkout);
  // Malformed dates, a checkout before the arrival, or a stay that starts in the
  // past are all "dates" errors - the calendar prevents them, a raw POST cannot.
  if (!isISODate(checkin) || !isISODate(checkout)) return { status: "error", reason: "dates" };
  if (nights <= 0 || checkin < todayISO()) return { status: "error", reason: "dates" };
  if (guests > unit.capacity) {
    return { status: "error", reason: "capacity", capacity: unit.capacity };
  }
  const total = nights * unit.pricePerNight;
  const message = String(formData.get("message") ?? "").trim();
  // Short reference the guest can quote on the phone; the backend's own id is a
  // UUID, so this rides along in the note for the admin to search by.
  const code = nextBookingCode();
  const note = [`Kod sa sajta: ${code}`, message].filter(Boolean).join(" · ");

  if (ACCOMMODATION_ID) {
    // The backend decides. It runs the same overlap check as the admin panel
    // and answers 409 if the dates went in the meantime, so there is no window
    // between what the calendar showed and what gets written.
    const sent = await submitReservation({
      type: "accommodation",
      resourceId: ACCOMMODATION_ID,
      guestName: name,
      guestEmail: email,
      guestPhone: phone || undefined,
      guests,
      startDate: checkin,
      endDate: checkout,
      note,
    });
    if (!sent.ok) {
      if (sent.reason === "conflict") return { status: "error", reason: "unavailable" };
      if (sent.reason === "rate") return { status: "error", reason: "rate" };
      return { status: "error", reason: "network" };
    }
    return { status: "success", code, nights, total };
  }

  // Bez podešenog ID-ja smeštaja: lokalni (demo) tok, vidljiv samo ovom procesu.
  if (!isAvailable(unitIndex, checkin, checkout)) {
    return { status: "error", reason: "unavailable" };
  }
  createBooking({ unit: unitIndex, checkin, checkout, guests, name, email, phone }, code);
  return { status: "success", code, nights, total };
}
