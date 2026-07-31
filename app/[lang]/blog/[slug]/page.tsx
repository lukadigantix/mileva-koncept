import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navigation from "../../../components/Navigation";
import BlogArticle from "../../../components/BlogArticle";
import Footer from "../../../components/Footer";
import { getBlogPost, getBlogPosts, adaptBlogPost, mediaUrl } from "../../../lib/api";
import type { Post } from "../../../lib/blog";
import { toCyrillic } from "../../../lib/translit";
import { OG_IMAGE, languageAlternates } from "../../../lib/seo";
import { SEO } from "../../../i18n/seoContent";
import { OG_LOCALES, SEGMENTS, langFromSegment, localePath } from "../../../i18n/routing";
import type { LangCode } from "../../../i18n/translations";

/** Pre-render known posts at build time; new CMS slugs render on demand. */
export async function generateStaticParams() {
  const apiPosts = await getBlogPosts();
  const slugs = apiPosts?.map((p) => p.slug) ?? [];
  return SEGMENTS.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

/** CMS post + its related trio; nepoznat slug daje `null` → 404. */
async function resolvePost(
  lang: LangCode,
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
      // Metapodaci prate podrazumevani jezik sajta (ćirilica), pa se latinični
      // CMS tekst preslovljava i ovde.
      meta: articleMetadata({
        lang,
        slug,
        title: toCyrillic(apiPost.metaTitle ?? apiPost.title),
        description: toCyrillic(apiPost.metaDescription ?? apiPost.excerpt ?? ""),
        image: mediaUrl(apiPost.coverImage) || undefined,
        published: apiPost.publishedAt ?? apiPost.createdAt,
      }),
    };
  }

  return null;
}

/** Zajednički metapodaci objave - naslov bez sufiksa (dodaje ga `title.template`
    iz layouta), kanonski link i Open Graph tipa `article` sa naslovnom slikom. */
function articleMetadata({
  lang,
  slug,
  title,
  description,
  image,
  published,
}: {
  lang: LangCode;
  slug: string;
  title: string;
  description: string;
  image?: string;
  published: string;
}): Metadata {
  const path = `/blog/${slug}`;
  const canonical = localePath(lang, path);
  // Naslovna slika objave kad postoji, inače deljena OG slika sajta.
  const images = [image || OG_IMAGE];
  return {
    title,
    description: description || undefined,
    alternates: { canonical, languages: languageAlternates(path) },
    openGraph: {
      title,
      description: description || undefined,
      url: canonical,
      siteName: SEO[lang].brand,
      locale: OG_LOCALES[lang],
      type: "article",
      publishedTime: published,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description || undefined,
      images,
    },
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  return (await resolvePost(langFromSegment(lang), slug))?.meta ?? {};
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const resolved = await resolvePost(langFromSegment(lang), slug);
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
