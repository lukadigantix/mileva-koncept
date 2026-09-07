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
import AccommodationCta from "../../components/AccommodationCta";
import Footer from "../../components/Footer";

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
 * editorial intro, the units as alternating media rows, the leisure text
 * followed by the pools + celebrations gallery, the amenities list, and a
 * closing call-to-action. (Location + nearby landmarks live on the Znamenitosti
 * page.)
 *
 * Onlajn rezervacija je privremeno sklonjena: umesto forme stranicu zatvara
 * AccommodationCta sa glavnim brojem telefona. Kad se rezervacije puste u rad,
 * vraća se `BookingWidget` (komponenta je zadržana) - njemu trebaju najveći
 * kapacitet i cenovnik iz `getPublicAccommodations()`, uz `UNITS[0]` kao
 * rezervu kad backend ne odgovara.
 */
export default function SmestajPage() {
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
        <AccommodationCta />
      </main>
      <Footer />
    </>
  );
}
