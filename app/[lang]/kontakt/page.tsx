import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";
import { langFromSegment } from "../../i18n/routing";
import Navigation from "../../components/Navigation";
import ContactHero from "../../components/ContactHero";
import ContactDetails from "../../components/ContactDetails";
import Footer from "../../components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return pageMetadata(langFromSegment(lang), "kontakt", "/kontakt");
}

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
