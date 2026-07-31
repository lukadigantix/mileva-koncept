import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";
import { langFromSegment } from "../../i18n/routing";
import Navigation from "../../components/Navigation";
import LandmarksIntro from "../../components/LandmarksIntro";
import LandmarksFeatured from "../../components/LandmarksFeatured";
import LandmarksStories from "../../components/LandmarksStories";
import LandmarksList from "../../components/LandmarksList";
import Footer from "../../components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return pageMetadata(langFromSegment(lang), "znamenitosti", "/znamenitosti");
}

/**
 * Landmarks page. Shares the site chrome (Navigation + Footer) and opens with
 * the editorial LandmarksIntro (its own video-free intro carrying the brand
 * mark + title), then tells the surroundings story: three marquee landmarks as
 * joined dark cards, the long-form stories with their photo clusters, and a
 * list of more distant places. This is where the former "Priroda" content now
 * lives.
 *
 * Sadržaj je NAMERNO statičan — iz rečnika i `public/znamenitosti/`, ne iz
 * admin panela. Borački krš, Gružansko jezero i ostalo se ne menjaju, a tekstovi
 * i fotografije su preuzeti sa sajta Turističke organizacije opštine Knić, pa
 * nema šta da se uređuje iz CMS-a.
 */
export default function ZnamenitostiPage() {
  return (
    <>
      <Navigation />
      <main>
        <LandmarksIntro />
        <LandmarksFeatured />
        <LandmarksStories />
        <LandmarksList />
      </main>
      <Footer />
    </>
  );
}
