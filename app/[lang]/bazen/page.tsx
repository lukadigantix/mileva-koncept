import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";
import { langFromSegment } from "../../i18n/routing";
import Navigation from "../../components/Navigation";
import Hero from "../../components/Hero";
import PoolIntro from "../../components/PoolIntro";
import PoolSalt from "../../components/PoolSalt";
import PoolGallery from "../../components/PoolGallery";
import PoolFeatures from "../../components/PoolFeatures";
import Footer from "../../components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return pageMetadata(langFromSegment(lang), "bazen", "/bazen");
}

/**
 * Pool page. Shares the site chrome (Navigation + Footer) and reuses the home
 * hero shell via `variant="bazen"` (the estate promo clip with the pool copy),
 * then tells the saltwater story: the editorial intro with the pool pair, the
 * why-salt-water band, and the amenity list closing with the contact CTA.
 * Static content for now - imagery is reused from the estate set until real
 * pool photography arrives.
 *
 * There is no booking form here on purpose. The backend's public reservation
 * route only accepts a published accommodation or an available quad, and the
 * pool is neither, so day visits go through the contact page rather than into a
 * store nobody in the admin panel can see.
 */
export default function BazenPage() {
  return (
    <>
      <Navigation />
      <main>
        <Hero variant="bazen" />
        <PoolIntro />
        <PoolSalt />
        <PoolGallery />
        <PoolFeatures />
      </main>
      <Footer />
    </>
  );
}
