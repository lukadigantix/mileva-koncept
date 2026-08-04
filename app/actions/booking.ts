"use server";

import { UNITS, BOOKING_HORIZON_DAYS } from "../lib/units";
import { addDays, isISODate, nightsBetween, todayISO } from "../lib/dates";
import { createBooking, nextBookingCode } from "../lib/bookings";
import { getPublicAccommodations, submitReservation } from "../lib/api";
import type { PublicAccommodation } from "../lib/api";
import { stayPrice } from "../lib/pricing";

/**
 * Booking Server Actions for /smestaj. `quote` is a live price lookup called as
 * the guest picks dates; `book` sends the request to the backend.
 *
 * Two deliberate choices here:
 *
 *  · The guest never picks an apartment. `book` reads the published units from
 *    `/accommodations/public` and files the request against the best fit on its
 *    own - which unit it lands in is the host's business, not the guest's. That
 *    also retired `ACCOMMODATION_ID`: the site no longer needs a UUID pasted
 *    into an env file to be able to book.
 *
 *  · The calendar never closes a date. Every request comes in as `pending` and
 *    is confirmed by phone anyway, so greying out days would turn away guests
 *    the host might still be able to place in another unit.
 */

export type Availability = {
  /** Window the answer covers - the calendar clamps navigation to it. */
  from: string;
  to: string;
  /** Always empty: no date is ever closed to a request. See the note below. */
  blocked: string[];
};

/**
 * The bookable window for the calendar.
 *
 * Nothing is ever marked as taken. The estate has several units and every
 * request arrives as `pending` for the host to confirm by phone, so a date that
 * looks full in one unit may well be free in another - greying it out would
 * turn away a guest the host could still accommodate. `book` decides.
 */
export async function availability(): Promise<Availability> {
  const from = todayISO();
  return { from, to: addDays(from, BOOKING_HORIZON_DAYS), blocked: [] };
}

/**
 * Cena boravka. Računa se po noćima iz cenovnika koji stoji uz jedinicu
 * (`rates`), jer se cena razlikuje po broju osoba i po tome da li noć pada u
 * vikend - videti lib/pricing.ts. Dostupnost se ovde namerno ne proverava:
 * datumi se više ne zatvaraju, a jedina provera koja obavezuje je u `book`.
 */
export type Quote =
  | { ok: false }
  | {
      ok: true;
      nights: number;
      /** Najniža cena noćenja u ovom boravku - za natpis "od …". */
      pricePerNight: number;
      total: number;
      capacity: number;
      /** Podela noći, da forma može da objasni odakle je izašao zbir. */
      weekdayNights: number;
      weekendNights: number;
    };

/** Cenovnik jedinice u koju bi ovakav boravak najverovatnije otišao. */
function pricingUnit(
  units: PublicAccommodation[] | null,
  guests: number
): PublicAccommodation | null {
  if (!units?.length) return null;
  const withRates = units.filter((u) => u.rates?.length);
  if (!withRates.length) return null;
  // Isti redosled kao pri upisu u `book`: prvo one u koje društvo staje.
  return (
    withRates.filter((u) => u.capacity >= guests).sort((a, b) => a.capacity - b.capacity)[0] ??
    withRates.sort((a, b) => b.capacity - a.capacity)[0]
  );
}

export async function quote(
  guests: number,
  checkin: string,
  checkout: string
): Promise<Quote> {
  const nights = nightsBetween(checkin, checkout);
  if (nights <= 0) return { ok: false };

  const units = await getPublicAccommodations();
  const unit = pricingUnit(units, guests);
  const capacity = units?.length
    ? Math.max(...units.map((u) => u.capacity))
    : UNITS[0].capacity;

  const price = unit?.rates ? stayPrice(unit.rates, checkin, checkout, guests) : null;
  // Bez cenovnika u adminu sajt ne izmišlja cenu - forma je onda samo upit.
  if (!price) return { ok: false };

  return {
    ok: true,
    nights: price.nights,
    pricePerNight: price.fromPerNight,
    total: price.total,
    capacity,
    weekdayNights: price.weekdayNights,
    weekendNights: price.weekendNights,
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

  const units = await getPublicAccommodations();

  // Gornja granica je najveća objavljena jedinica, ne jedna fiksna - inače kuća
  // za osmoro sa sajta nikada ne bi mogla da se zatraži.
  const maxGuests = units?.length
    ? Math.max(...units.map((u) => u.capacity))
    : unit.capacity;
  if (guests > maxGuests) {
    return { status: "error", reason: "capacity", capacity: maxGuests };
  }

  const message = String(formData.get("message") ?? "").trim();
  // Short reference the guest can quote on the phone; the backend's own id is a
  // UUID, so this rides along in the note for the admin to search by.
  const code = nextBookingCode();
  const note = [`Kod sa sajta: ${code}`, message].filter(Boolean).join(" · ");

  if (units?.length) {
    // Gost ne bira jedinicu - biramo je ovde, po najboljem poklapanju: prvo one
    // u koje društvo staje, počev od najmanje takve, da par ne zauzme kuću za
    // osmoro. Jedinice u koje ne staju idu na kraj reda umesto da otpadnu, jer
    // je bolje da zahtev stigne domaćinu nego da gost dobije odbijenicu.
    const ordered = [...units].sort((a, b) => {
      const fitsA = a.capacity >= guests;
      const fitsB = b.capacity >= guests;
      if (fitsA !== fitsB) return fitsA ? -1 : 1;
      return fitsA ? a.capacity - b.capacity : b.capacity - a.capacity;
    });

    // Backend odbija preklapanje sa 409, pa redom pokušavamo dok neka jedinica
    // ne primi termin. Tek ako su sve zauzete, gost dobija "nema slobodno".
    let lastReason: "conflict" | "rate" | "invalid" | "offline" = "conflict";
    for (const unitOption of ordered) {
      // Cena se računa po cenovniku jedinice koja termin zaista primi.
      const price = unitOption.rates
        ? stayPrice(unitOption.rates, checkin, checkout, guests)
        : null;
      const sent = await submitReservation({
        type: "accommodation",
        resourceId: unitOption.id,
        guestName: name,
        guestEmail: email,
        guestPhone: phone || undefined,
        guests,
        startDate: checkin,
        endDate: checkout,
        note: `${note} · ${unitOption.title}`,
      });
      if (sent.ok) {
        return { status: "success", code, nights, total: price?.total ?? 0 };
      }

      lastReason = sent.reason;
      // Ograničenje broja zahteva i pad veze važe za sve jedinice - nema svrhe
      // pokušavati dalje.
      if (sent.reason === "rate" || sent.reason === "offline") break;
    }

    if (lastReason === "rate") return { status: "error", reason: "rate" };
    if (lastReason === "conflict") return { status: "error", reason: "unavailable" };
    return { status: "error", reason: "network" };
  }

  // Backend nedostupan ili nijedna jedinica nije objavljena: lokalni (demo) tok,
  // vidljiv samo ovom procesu - gost svejedno ne vidi grešku.
  createBooking({ unit: unitIndex, checkin, checkout, guests, name, email, phone }, code);
  return { status: "success", code, nights, total: nights * unit.pricePerNight };
}
