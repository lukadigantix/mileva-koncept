import type { Metadata } from "next";
import Navigation from "../components/Navigation";
import BlogHero from "../components/BlogHero";
import BlogIndex from "../components/BlogIndex";
import Footer from "../components/Footer";
import { getBlogPosts, adaptBlogPost } from "../lib/api";
import { POSTS } from "../lib/blog";

export const metadata: Metadata = {
  title: "Блог - Милева концепт",
  description:
    "Приче са имања Милева концепт - храна, природа и живот у срцу Шумадије.",
};

/**
 * Blog index page. Shares the site chrome (Navigation + Footer) and the hero
 * shell via `variant="blog"`, then renders the featured post + grid. Posts come
 * from the backend CMS (published only, newest first); the static set is the
 * fallback while the backend is unreachable or empty.
 */
export default async function BlogPage() {
  const apiPosts = await getBlogPosts();
  const posts = apiPosts?.length ? apiPosts.map(adaptBlogPost) : POSTS;

  return (
    <>
      <Navigation />
      <main>
        <BlogHero />
        <BlogIndex posts={posts} />
      </main>
      <Footer />
    </>
  );
}
