"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SplitText from "./SplitText";
import Reveal from "./Reveal";
import PostCard from "./PostCard";
import { useLang } from "../i18n/LanguageProvider";
import { POSTS, getPost, formatDate } from "../lib/blog";

/**
 * Blog article - a single post rendered in the active language. Reads like a
 * proper editorial piece: a centred title block with a standfirst, then a
 * full-bleed cinematic hero image (same treatment and height as the blog index
 * hero), then a wide, comfortable reading column with a dropped initial on the
 * lede, section subheadings and pull quotes. Closes with a "more from the blog"
 * trio.
 */
export default function BlogArticle({ slug }: { slug: string }) {
  const { lang, t } = useLang();
  const post = getPost(slug);
  if (!post) notFound();

  const c = post.content[lang];
  const related = POSTS.filter((p) => p.slug !== slug).slice(0, 3);
  // The first paragraph is the lede - it gets the larger type + dropped initial.
  const firstP = c.body.findIndex((b) => b.type === "p");

  return (
    <article>
      {/* Title block - light, centred, clears the fixed nav via top padding. */}
      <header className="mx-auto max-w-3xl px-[var(--gutter)] pt-[clamp(9rem,17vw,13rem)] pb-[clamp(2.5rem,5vw,4rem)] text-center">
        <span className="text-[clamp(11px,2.6vw,13px)] uppercase tracking-[0.3em] text-[var(--main)]">
          {c.category}
        </span>
        <SplitText
          as="h1"
          text={c.title}
          className="mt-[clamp(1rem,2vw,1.75rem)] text-[clamp(1.9rem,5.5vw,3.25rem)] leading-[1.1] tracking-[-0.015em] text-[var(--dark)]"
        />
        <p className="mx-auto mt-[clamp(1rem,2.5vw,1.75rem)] max-w-[54ch] text-[clamp(1.1rem,2.4vw,1.35rem)] leading-relaxed text-[var(--hint)]">
          {c.excerpt}
        </p>
        <p className="mt-[clamp(1.25rem,2.5vw,1.75rem)] text-[13px] uppercase tracking-[0.18em] text-[var(--hint)]">
          {formatDate(post.date, lang)} · {post.readMinutes} {t.blog.minRead}
        </p>
      </header>

      {/* Full-bleed cinematic hero image - same treatment/height as /blog. */}
      <div
        data-dark-section
        className="relative h-[clamp(340px,58vh,680px)] w-full overflow-hidden"
      >
        <Image
          src={post.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/25" />
      </div>

      {/* Body - wide, comfortable editorial reading column. */}
      <div className="mx-auto max-w-3xl px-[var(--gutter)] py-[clamp(4rem,9vw,8rem)]">
        {c.body.map((block, i) => {
          if (block.type === "h2") {
            return (
              <Reveal key={i} className="mt-[clamp(2.75rem,5.5vw,4rem)] first:mt-0">
                <h2 className="text-[clamp(1.5rem,3.6vw,2rem)] leading-[1.25] tracking-[-0.01em] text-[var(--dark)]">
                  {block.text}
                </h2>
              </Reveal>
            );
          }
          if (block.type === "quote") {
            return (
              <Reveal key={i} className="my-[clamp(2.75rem,5.5vw,4rem)]">
                <blockquote className="border-l-2 border-[var(--main)] pl-[clamp(1.5rem,3vw,2.25rem)] text-[clamp(1.4rem,3.4vw,1.9rem)] italic leading-[1.35] tracking-[-0.01em] text-[var(--dark)]">
                  {block.text}
                </blockquote>
              </Reveal>
            );
          }
          const isLede = i === firstP;
          return (
            <Reveal key={i} className="mt-[clamp(1.4rem,2.6vw,1.9rem)] first:mt-0">
              <p
                className={
                  isLede
                    ? "text-[clamp(1.2rem,2.5vw,1.45rem)] leading-[1.7] text-[var(--dark)] first-letter:float-left first-letter:mr-[0.09em] first-letter:mt-[0.04em] first-letter:text-[clamp(3rem,8vw,4.75rem)] first-letter:font-medium first-letter:leading-[0.7] first-letter:text-[var(--main)]"
                    : "text-[clamp(17px,1.4vw,19px)] leading-[1.85] text-[var(--dark)]"
                }
              >
                {block.text}
              </p>
            </Reveal>
          );
        })}

        <div className="mt-[clamp(3rem,6vw,4.5rem)] border-t border-[var(--border)] pt-[clamp(1.75rem,3.5vw,2.5rem)]">
          <Link
            href="/blog"
            className="link-underline text-[15.56px] tracking-[-0.01em] text-[var(--main)]"
          >
            ← {t.blog.backToBlog}
          </Link>
        </div>
      </div>

      {/* More from the blog. */}
      <section className="bg-[var(--light)] py-[clamp(5rem,11vw,12rem)]">
        <div className="mx-[var(--gutter)]">
          <SplitText
            as="h2"
            text={t.blog.related}
            className="mb-[clamp(2.5rem,5vw,4rem)] text-center text-[clamp(1.35rem,4.4vw,1.9rem)] leading-[1.2] tracking-[-0.01em] text-[var(--dark)]"
          />
          <div className="grid grid-cols-1 gap-x-[clamp(1.5rem,3vw,2.5rem)] gap-y-[clamp(2.5rem,5vw,4rem)] sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
