import type { Metadata } from "next";
import Navigation from "../components/Navigation";
import QuadsIntro from "../components/QuadsIntro";
import QuadsRental, { type QuadCard } from "../components/QuadsRental";
import QuadRoutes from "../components/QuadRoutes";
import Footer from "../components/Footer";
import { getPublicQuads, getPublicQuadRoutes, mediaUrl } from "../lib/api";

export const metadata: Metadata = {
  title: "Рентирање квадова - Милева концепт",
  description:
    "Вожња квадова кроз брда и шумске путеве око Милеве - понуда возила и обележене руте на мапи, у срцу Шумадије.",
};

/**
 * Quad rental page - reached from the quads activity card on /dogadjaji.
 * Opens with the video-free brand intro (like /znamenitosti), then the fleet
 * and the marked routes on an interactive map, both fed by the backend admin.
 * Sections simply drop out while the backend has nothing published for them.
 */
export default async function KvadoviPage() {
  const [apiQuads, apiRoutes] = await Promise.all([
    getPublicQuads(),
    getPublicQuadRoutes(),
  ]);

  const quads: QuadCard[] = (apiQuads ?? [])
    .filter((q) => q.status === "available")
    .map((q) => ({
      id: q.id,
      name: q.name,
      desc: q.description ?? "",
      image: mediaUrl(q.imageUrl) || "/dogadjaji/d2.webp",
      price: q.price ?? "",
    }));

  const routes = (apiRoutes ?? []).filter((r) => r.coordinates.length > 1);

  return (
    <>
      <Navigation />
      <main>
        <QuadsIntro />
        {quads.length > 0 && <QuadsRental quads={quads} />}
        {routes.length > 0 && <QuadRoutes routes={routes} />}
      </main>
      <Footer />
    </>
  );
}
