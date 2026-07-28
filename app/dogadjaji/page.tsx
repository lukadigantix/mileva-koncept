import type { Metadata } from "next";
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import EventsCelebrations from "../components/EventsCelebrations";
import EventsActivities from "../components/EventsActivities";
import EventsUpcoming, { type UpcomingEvent } from "../components/EventsUpcoming";
import EventsCta from "../components/EventsCta";
import Footer from "../components/Footer";
import { getPublicEvents, mediaUrl } from "../lib/api";

export const metadata: Metadata = {
  title: "Догађаји - Милева концепт",
  description:
    "Свадбе, крштења, славе и прославе у Милева концепту, Гривац - башта, тераса, базен и домаћа кухиња у срцу Шумадије.",
};

/**
 * Events page. Shares the site chrome (Navigation + Footer) and reuses the home
 * hero shell via `variant="dogadjaji"`, then tells the celebrations story: the
 * celebrations as an editorial feature + grid, the dated programme from the
 * backend CMS (only when something is coming up), the outdoor activities as a
 * joined dark-cards band, and a closing call-to-action pointing to the contact
 * page.
 */
export default async function DogadjajiPage() {
  // Objavljeni događaji iz admina — samo predstojeći (danas i kasnije),
  // najbliži prvi. Kad je kalendar prazan ili backend ne radi, sekcije nema.
  const apiEvents = await getPublicEvents();
  const today = new Date().toISOString().slice(0, 10);
  const upcoming: UpcomingEvent[] = (apiEvents ?? [])
    .filter((e) => (e.endDate ?? e.startDate) >= today)
    .sort((a, b) => a.startDate.localeCompare(b.startDate))
    .map((e) => ({
      slug: e.slug,
      title: e.title,
      excerpt: e.excerpt ?? "",
      descriptionHtml: e.description ?? "",
      image: mediaUrl(e.coverImage) || "/dogadjaji/d1.webp",
      startDate: e.startDate,
      startTime: e.startTime,
      location: e.location,
    }));

  return (
    <>
      <Navigation />
      <main>
        <Hero variant="dogadjaji" />
        <EventsCelebrations />
        {upcoming.length > 0 && <EventsUpcoming events={upcoming} />}
        <EventsActivities />
        <EventsCta />
      </main>
      <Footer />
    </>
  );
}
