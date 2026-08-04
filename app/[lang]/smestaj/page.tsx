import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";
import { langFromSegment } from "../../i18n/routing";
import Navigation from "../../components/Navigation";
import Hero from "../../components/Hero";
import AccommodationIntro from "../../components/AccommodationIntro";
import AccommodationUnits from "../../components/AccommodationUnits";
import AccommodationAmenities from "../../components/AccommodationAmenities";
import LeisureGallery from "../../components/LeisureGallery";
import AccommodationLeisure from "../../components/AccommodationLeisure";
import BookingWidget from "../../components/BookingWidget";
import Footer from "../../components/Footer";
import { getPublicAccommodations } from "../../lib/api";
import type { RateRow } from "../../lib/api";
import { UNITS } from "../../lib/units";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return pageMetadata(langFromSegment(lang), "smestaj", "/smestaj");
}

/**
 * Accommodation page. Shares the site chrome (Navigation + Footer) and reuses
 * the home hero shell via `variant="smestaj"`, then builds out the stay: an
 * editorial intro, the units as alternating media rows, the amenities list, the
 * leisure text followed by the pools + celebrations gallery, and the booking
 * widget. (Location + nearby landmarks live on the Znamenitosti page.)
 *
 * The published units are read here for what the form needs up front: how large
 * a party it may accept (the biggest unit) and the price table, so the figure
 * over the photo can follow the party size before any date is picked. The guest
 * still does not choose a unit - `book` assigns one. Backend unreachable → the
 * single apartment in `lib/units.ts`.
 */
export default async function SmestajPage() {
  const units = await getPublicAccommodations();
  const maxGuests = units?.length
    ? Math.max(...units.map((u) => u.capacity))
    : UNITS[0].capacity;

  // Jedan cenovnik iz svih jedinica: za svaki broj osoba najniža cena koja se
  // za njega može dobiti - to je ono što "od …" i znači. Kod istovetnih kućica
  // ovo je prosto njihov zajednički cenovnik.
  const cheapestByGuests = new Map<number, RateRow>();
  for (const row of units?.flatMap((u) => u.rates ?? []) ?? []) {
    const best = cheapestByGuests.get(row.guests);
    cheapestByGuests.set(
      row.guests,
      best
        ? {
            guests: row.guests,
            weekday: Math.min(best.weekday, row.weekday),
            weekend: Math.min(best.weekend, row.weekend),
          }
        : row
    );
  }
  const rates = [...cheapestByGuests.values()].sort((a, b) => a.guests - b.guests);

  return (
    <>
      <Navigation />
      <main>
        <Hero variant="smestaj" />
        <AccommodationIntro />
        <AccommodationUnits />
        <AccommodationLeisure />
        <LeisureGallery />
        <AccommodationAmenities />
        <BookingWidget maxGuests={maxGuests} rates={rates} />
      </main>
      <Footer />
    </>
  );
}
