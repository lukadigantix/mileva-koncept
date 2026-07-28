import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navigation from "../../components/Navigation";
import BlogArticle from "../../components/BlogArticle";
import Footer from "../../components/Footer";
import { getBlogPost, getBlogPosts, adaptBlogPost } from "../../lib/api";
import { POSTS, getPost, type Post } from "../../lib/blog";

/** Pre-render known posts at build time; new CMS slugs render on demand. */
export async function generateStaticParams() {
  const apiPosts = await getBlogPosts();
  const slugs = apiPosts?.length ? apiPosts.map((p) => p.slug) : POSTS.map((p) => p.slug);
  return slugs.map((slug) => ({ slug }));
}

/** CMS post + its related trio, or the static fallback for the same slug. */
async function resolvePost(
  slug: string
): Promise<{ post: Post; related: Post[]; meta: Metadata } | null> {
  const apiPost = await getBlogPost(slug);
  if (apiPost) {
    const apiPosts = await getBlogPosts();
    const related = (apiPosts ?? [])
      .filter((p) => p.slug !== slug)
      .slice(0, 3)
      .map(adaptBlogPost);
    return {
      post: adaptBlogPost(apiPost),
      related,
      meta: {
        title: `${apiPost.metaTitle ?? apiPost.title} - Милева концепт`,
        description: apiPost.metaDescription ?? apiPost.excerpt ?? undefined,
      },
    };
  }

  const staticPost = getPost(slug);
  if (!staticPost) return null;
  const c = staticPost.content["sr-cyrl"];
  return {
    post: staticPost,
    related: POSTS.filter((p) => p.slug !== slug).slice(0, 3),
    meta: { title: `${c.title} - Милева концепт`, description: c.excerpt },
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return (await resolvePost(slug))?.meta ?? {};
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resolved = await resolvePost(slug);
  if (!resolved) notFound();

  return (
    <>
      <Navigation />
      <main>
        <BlogArticle post={resolved.post} related={resolved.related} />
      </main>
      <Footer />
    </>
  );
}
