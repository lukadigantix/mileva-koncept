import type { Metadata } from "next";
import Navigation from "../components/Navigation";
import LandmarksIntro from "../components/LandmarksIntro";
import LandmarksFeatured, { type FeaturedLandmark } from "../components/LandmarksFeatured";
import LandmarksList, { type LandmarkRow } from "../components/LandmarksList";
import Footer from "../components/Footer";
import { getPublicLandmarks, mediaUrl } from "../lib/api";

/** Kartice bez otpremljene slike dobijaju postojeće fotografije okoline. */
const FALLBACK_IMAGES = [
  "/znamenitosti/z1.webp",
  "/znamenitosti/z2.webp",
  "/znamenitosti/z3.webp",
];

export const metadata: Metadata = {
  title: "Знаменитости - Милева концепт",
  description:
    "Природа и знаменитости око Милеве у Гривцу - језеро Гружа, термални спа Рудник, манастир Жича и више, у срцу Шумадије.",
};

/**
 * Landmarks page. Shares the site chrome (Navigation + Footer) and opens with
 * the editorial LandmarksIntro (its own video-free intro carrying the brand
 * mark + title), then tells the surroundings story: three marquee landmarks as
 * joined dark cards and a list of more nearby places. This is where the former
 * "Priroda" content now lives.
 *
 * The landmarks come from the backend CMS: the first three are the marquee
 * cards, the rest fill the list (the API has no distances, so the terracotta
 * label shows the category instead). With no published landmarks — or the
 * backend down — both sections fall back to the static dictionary content.
 */
export default async function ZnamenitostiPage() {
  const apiLandmarks = await getPublicLandmarks();

  let featured: FeaturedLandmark[] | undefined;
  let rows: LandmarkRow[] | undefined;
  if (apiLandmarks?.length) {
    featured = apiLandmarks.slice(0, 3).map((l, i) => ({
      name: l.title,
      desc: l.description ?? "",
      label: l.category ?? "",
      image: mediaUrl(l.images?.[0]) || FALLBACK_IMAGES[i],
    }));
    rows = apiLandmarks.slice(3).map((l) => ({
      name: l.title,
      desc: l.description ?? "",
      label: l.category ?? "",
    }));
  }

  return (
    <>
      <Navigation />
      <main>
        <LandmarksIntro />
        <LandmarksFeatured items={featured} />
        <LandmarksList items={rows} />
      </main>
      <Footer />
    </>
  );
}
