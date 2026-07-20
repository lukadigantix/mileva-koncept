import type { Metadata } from "next";
import Navigation from "../components/Navigation";
import BlogHero from "../components/BlogHero";
import BlogIndex from "../components/BlogIndex";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Блог - Милева концепт",
  description:
    "Приче са имања Милева концепт - храна, природа и живот у срцу Шумадије.",
};

/**
 * Blog index page. Shares the site chrome (Navigation + Footer) and the hero
 * shell via `variant="blog"`, then renders the featured post + grid.
 */
export default function BlogPage() {
  return (
    <>
      <Navigation />
      <main>
        <BlogHero />
        <BlogIndex />
      </main>
      <Footer />
    </>
  );
}
