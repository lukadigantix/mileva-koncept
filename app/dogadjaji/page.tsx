import type { Metadata } from "next";
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import EventsCelebrations from "../components/EventsCelebrations";
import EventsActivities from "../components/EventsActivities";
import EventsCta from "../components/EventsCta";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Догађаји - Милева концепт",
  description:
    "Свадбе, крштења, славе и прославе у Милева концепту, Гривац - башта, тераса, базен и домаћа кухиња у срцу Шумадије.",
};

/**
 * Events page. Shares the site chrome (Navigation + Footer) and reuses the home
 * hero shell via `variant="dogadjaji"`, then tells the celebrations story: the
 * celebrations as an editorial feature + grid, the outdoor activities as a
 * joined dark-cards band, and a closing call-to-action pointing to the contact
 * page.
 */
export default function DogadjajiPage() {
  return (
    <>
      <Navigation />
      <main>
        <Hero variant="dogadjaji" />
        <EventsCelebrations />
        <EventsActivities />
        <EventsCta />
      </main>
      <Footer />
    </>
  );
}
