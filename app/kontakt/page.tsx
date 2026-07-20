import type { Metadata } from "next";
import Navigation from "../components/Navigation";
import ContactHero from "../components/ContactHero";
import ContactDetails from "../components/ContactDetails";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Контакт - Милева концепт",
  description:
    "Јавите се Милева концепту у Гривцу - адреса, телефон, имејл и порука за резервације, прославе и боравак у срцу Шумадије.",
};

/**
 * Contact page. Shares the site chrome (Navigation + Footer), opens with its own
 * dedicated (video-free) ContactHero, then the details + form and a full-bleed
 * location band.
 */
export default function KontaktPage() {
  return (
    <>
      <Navigation />
      <main>
        <ContactHero />
        <ContactDetails />
      </main>
      <Footer />
    </>
  );
}
