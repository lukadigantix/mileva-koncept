"use server";

import { UNITS } from "../lib/units";
import { nightsBetween } from "../lib/dates";
import { isAvailable, createBooking } from "../lib/bookings";

/**
 * Booking Server Actions for /smestaj. `quote` is a live price + availability
 * lookup called as the guest picks a unit and dates; `book` performs the
 * mutation, re-checking availability server-side before recording the booking.
 */

export type Quote =
  | { ok: false }
  | {
      ok: true;
      nights: number;
      pricePerNight: number;
      total: number;
      capacity: number;
      available: boolean;
    };

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
    available: isAvailable(unitIndex, checkin, checkout),
  };
}

export type BookState =
  | { status: "idle" }
  | { status: "error"; reason: "invalid" | "dates" | "capacity" | "unavailable"; capacity?: number }
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
  if (nights <= 0) return { status: "error", reason: "dates" };
  if (guests > unit.capacity) {
    return { status: "error", reason: "capacity", capacity: unit.capacity };
  }
  // Re-check availability at commit time - the source of truth, not the client.
  if (!isAvailable(unitIndex, checkin, checkout)) {
    return { status: "error", reason: "unavailable" };
  }

  const code = createBooking({ unit: unitIndex, checkin, checkout, guests, name, email, phone });
  return { status: "success", code, nights, total: nights * unit.pricePerNight };
}
