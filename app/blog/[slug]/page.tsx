import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navigation from "../../components/Navigation";
import BlogArticle from "../../components/BlogArticle";
import Footer from "../../components/Footer";
import { POSTS, getPost } from "../../lib/blog";

/** Pre-render every post at build time. */
export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  // Default (Serbian Cyrillic) copy for metadata.
  const c = post.content["sr-cyrl"];
  return {
    title: `${c.title} - Милева концепт`,
    description: c.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getPost(slug)) notFound();

  return (
    <>
      <Navigation />
      <main>
        <BlogArticle slug={slug} />
      </main>
      <Footer />
    </>
  );
}
