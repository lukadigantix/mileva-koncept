import type { Metadata } from "next";
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import AccommodationIntro from "../components/AccommodationIntro";
import AccommodationUnits from "../components/AccommodationUnits";
import AccommodationAmenities from "../components/AccommodationAmenities";
import LeisureGallery from "../components/LeisureGallery";
import AccommodationLeisure from "../components/AccommodationLeisure";
import BookingWidget from "../components/BookingWidget";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Смештај - Милева концепт",
  description:
    "Милева Концепт - смештај у Гривцу, у срцу Шумадије: башта, тераса, базен са сланом водом, бесплатан приватни паркинг и Wi-Fi.",
};

/**
 * Accommodation page. Shares the site chrome (Navigation + Footer) and reuses
 * the home hero shell via `variant="smestaj"`, then builds out the stay: an
 * editorial intro, the units as alternating media rows, the amenities list, the
 * leisure text followed by the pools + celebrations gallery, and the booking
 * widget. (Location + nearby landmarks live on the Znamenitosti page.)
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
        <BookingWidget />
      </main>
      <Footer />
    </>
  );
}
