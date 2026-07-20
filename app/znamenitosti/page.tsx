import type { Metadata } from "next";
import Navigation from "../components/Navigation";
import LandmarksIntro from "../components/LandmarksIntro";
import LandmarksFeatured from "../components/LandmarksFeatured";
import LandmarksList from "../components/LandmarksList";
import Footer from "../components/Footer";

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
 */
export default function ZnamenitostiPage() {
  return (
    <>
      <Navigation />
      <main>
        <LandmarksIntro />
        <LandmarksFeatured />
        <LandmarksList />
      </main>
      <Footer />
    </>
  );
}
