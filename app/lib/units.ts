/**
 * Bookable unit inventory - price per night (EUR) and sleeping capacity. The
 * array order matches `translations.accommodation.units.items`, so a unit is
 * referenced everywhere by its index. Safe to import on client + server (pure
 * data, no secrets).
 *
 * The property is a single apartment (per the Booking.com / listing data): one
 * air-conditioned ~60 m² unit that sleeps up to 4 (bedroom + living room with a
 * sofa bed). Price approximated from the public "from ~$145/night" rate.
 */
export type Unit = { pricePerNight: number; capacity: number };

/**
 * How far ahead a stay can be booked. Bounds both the calendar the guest
 * navigates and the availability window the server answers with.
 */
export const BOOKING_HORIZON_DAYS = 400;

export const UNITS: Unit[] = [
  { pricePerNight: 135, capacity: 4 }, // 0 - Apartman Mileva (ceo objekat)
];
