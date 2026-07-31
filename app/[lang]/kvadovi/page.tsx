import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";
import { langFromSegment } from "../../i18n/routing";
import Navigation from "../../components/Navigation";
import QuadsIntro from "../../components/QuadsIntro";
import QuadsRental, { type QuadCard } from "../../components/QuadsRental";
import QuadRoutes from "../../components/QuadRoutes";
import Footer from "../../components/Footer";
import { apiUrl, getPublicQuads, getPublicQuadRoutes, mediaUrl } from "../../lib/api";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return pageMetadata(langFromSegment(lang), "kvadovi", "/kvadovi");
}

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

  // GPX se preuzima direktno sa API-ja - apsolutan URL se gradi na serveru,
  // jer klijentska komponenta ne zna adresu backenda.
  const routes = (apiRoutes ?? [])
    .filter((r) => r.coordinates.length > 1)
    .map((r) => ({ ...r, gpxUrl: apiUrl(`/quad-routes/public/${r.id}/gpx`) }));

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
