import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";
import { langFromSegment } from "../../i18n/routing";
import Navigation from "../../components/Navigation";
import BlogHero from "../../components/BlogHero";
import BlogIndex from "../../components/BlogIndex";
import Footer from "../../components/Footer";
import { getBlogPosts, adaptBlogPost } from "../../lib/api";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return pageMetadata(langFromSegment(lang), "blog", "/blog");
}

/**
 * Blog index page. Shares the site chrome (Navigation + Footer) and the hero
 * shell via `variant="blog"`, then renders the featured post + grid. Posts come
 * from the backend CMS (published only, newest first). Dok ih tamo nema - ili
 * ako backend ne odgovara - `BlogIndex` prikaže praznu sekciju.
 */
export default async function BlogPage() {
  // Bez statične rezerve: prazan admin znači prazan blog, i BlogIndex tada
  // prikaže praznu sekciju umesto demo tekstova.
  const posts = (await getBlogPosts())?.map(adaptBlogPost) ?? [];

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
