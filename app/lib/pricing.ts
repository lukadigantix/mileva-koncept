/**
 * Računanje cene boravka iz cenovnika koji stoji uz smeštajnu jedinicu.
 *
 * Cena zavisi od DVE stvari: broja osoba i toga da li noćenje pada u vikend.
 * Vikend je subota i nedelja, a odlučuje dan u kome noćenje POČINJE — gost koji
 * dolazi u petak i odlazi u ponedeljak plaća jednu radnu noć (petak) i dve
 * vikend noći (subota, nedelja).
 *
 * Cenovnik uređuje admin (`rates` na smeštaju); ovde se samo primenjuje.
 * Bezbedno za uvoz i na klijentu i na serveru — čista računica, bez podataka.
 */

import { eachNight } from "./dates";
import type { RateRow } from "./api";

/** Dani u nedelji koji se naplaćuju po vikend ceni: subota (6) i nedelja (0). */
const WEEKEND_DAYS = new Set([0, 6]);

/** Da li noćenje koje počinje ovog dana ide po vikend ceni. */
export function isWeekendNight(iso: string): boolean {
  // Podne u UTC — sprečava da vremenska zona pomeri datum za jedan dan.
  return WEEKEND_DAYS.has(new Date(`${iso}T12:00:00Z`).getUTCDay());
}

/**
 * Red cenovnika za dato društvo: tačan broj osoba ako postoji, inače prvi veći
 * (troje u kućici sa cenama za 2 i 4 plaća cenu za 4). Manje društvo nikada ne
 * pada na cenu za veće od najvećeg reda — tada se uzima najveći.
 */
export function rateFor(rates: RateRow[], guests: number): RateRow | null {
  if (!rates.length) return null;
  const sorted = [...rates].sort((a, b) => a.guests - b.guests);
  return sorted.find((r) => r.guests >= guests) ?? sorted[sorted.length - 1];
}

export type StayPrice = {
  nights: number;
  /** Broj noći po ceni radnog dana, odnosno vikenda. */
  weekdayNights: number;
  weekendNights: number;
  total: number;
  /** Najniža cena noćenja u ovom boravku — za prikaz „od …“. */
  fromPerNight: number;
};

/**
 * Ukupna cena boravka: svaka noć se naplaćuje po svojoj ceni, pa se sabira.
 * `null` znači da cenovnik ne pokriva ovaj slučaj — tada sajt ne prikazuje cenu
 * umesto da izmisli broj.
 */
export function stayPrice(
  rates: RateRow[],
  checkin: string,
  checkout: string,
  guests: number
): StayPrice | null {
  const nights = eachNight(checkin, checkout);
  const rate = rateFor(rates, guests);
  if (!nights.length || !rate) return null;

  let weekdayNights = 0;
  let weekendNights = 0;
  let total = 0;
  for (const night of nights) {
    if (isWeekendNight(night)) {
      weekendNights++;
      total += rate.weekend;
    } else {
      weekdayNights++;
      total += rate.weekday;
    }
  }

  return {
    nights: nights.length,
    weekdayNights,
    weekendNights,
    total,
    fromPerNight: Math.min(rate.weekday, rate.weekend),
  };
}

/** Najniža cena noćenja u celom cenovniku — natpis „od 80 €“ iznad forme. */
export function lowestNightlyRate(rates: RateRow[]): number | null {
  const prices = rates.flatMap((r) => [r.weekday, r.weekend]).filter((p) => p > 0);
  return prices.length ? Math.min(...prices) : null;
}
