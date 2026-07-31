"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "./LocaleLink";
import SplitText from "./SplitText";
import MediaReveal from "./MediaReveal";
import PostCard from "./PostCard";
import EmptyState from "./EmptyState";
import { useCms, useLang } from "../i18n/LanguageProvider";
import { formatDate, type Post } from "../lib/blog";

/**
 * Blog index - a large featured (newest) post at the top, then a category-
 * filtered grid of the rest. The active filter is stored by index so it stays
 * valid when the language switches (categories keep the same order per post).
 * Selecting a category hides the featured block and shows all posts in it.
 *
 * Posts come from the backend CMS. Dok ih tamo nema, na njihovo mesto ide
 * `EmptyState` - sajt ide u produkciju sa praznim adminom, pa je prazan blog
 * očekivano stanje, ne greška.
 */
export default function BlogIndex({ posts }: { posts: Post[] }) {
  const { lang, t } = useLang();
  const cms = useCms();
  const [activeIndex, setActiveIndex] = useState(-1); // -1 = all

  // Kuke se pozivaju bezuslovno (pravilo hookova), pa se prazan slučaj
  // proverava tek ispod njih.
  const [featured, ...rest] = posts;
  const f = featured?.content[lang];

  // Unique categories in post order - a stable index across languages.
  const categories = useMemo(() => {
    const seen: string[] = [];
    for (const p of posts) {
      const c = p.content[lang].category;
      if (!seen.includes(c)) seen.push(c);
    }
    return seen;
  }, [posts, lang]);

  const showFeatured = activeIndex === -1;
  const activeCategory = activeIndex === -1 ? null : categories[activeIndex];
  const gridPosts = activeCategory
    ? posts.filter((p) => p.content[lang].category === activeCategory)
    : rest;

  const chip = (i: number) =>
    `cursor-pointer text-[13px] uppercase tracking-[0.2em] transition-colors ${
      activeIndex === i
        ? "text-[var(--main)]"
        : "text-[var(--hint)] hover:text-[var(--dark)]"
    }`;

  // Nema objava - umesto istaknutog posta, filtera i mreže ide prazna sekcija.
  if (!featured || !f) {
    const e = t.blog.empty;
    return (
      <EmptyState eyebrow={e.eyebrow} title={e.title} body={e.body} ctaLabel={e.cta} />
    );
  }

  return (
    <>
      {/* Featured - newest post (hidden while a category filter is active). */}
      {showFeatured && (
        <section className="bg-[var(--bg)] pt-[clamp(4rem,8vw,7rem)] pb-[clamp(4rem,9vw,9rem)]">
          <div className="mx-[var(--gutter)]">
            <span className="mb-[clamp(2rem,4vw,3.5rem)] block text-center text-[clamp(11px,2.6vw,13px)] uppercase tracking-[0.3em] text-[var(--main)]">
              {t.blog.latest}
            </span>

            <Link
              href={`/blog/${featured.slug}`}
              className="group grid items-center gap-[clamp(1.75rem,4vw,3.5rem)] md:grid-cols-2"
            >
              <MediaReveal className="aspect-[4/3] rounded-[var(--radius2)]" parallax>
                <Image
                  src={featured.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </MediaReveal>

              <div>
                <span className="text-[12px] uppercase tracking-[0.3em] text-[var(--main)]">
                  {cms.text(f.category)}
                </span>
                <SplitText
                  as="h2"
                  text={cms.text(f.title)}
                  className="mt-[clamp(0.75rem,1.5vw,1.25rem)] max-w-[20ch] text-[clamp(1.6rem,4vw,2.4rem)] leading-[1.15] tracking-[-0.01em] text-[var(--dark)]"
                />
                <p className="mt-[clamp(1rem,2vw,1.5rem)] max-w-[46ch] text-[17.78px] leading-relaxed text-[var(--dark)]">
                  {cms.text(f.excerpt)}
                </p>
                <span className="mt-[clamp(1rem,2vw,1.5rem)] block text-[13px] tracking-[0.02em] text-[var(--hint)]">
                  {formatDate(featured.date, lang)} · {featured.readMinutes} {t.blog.minRead}
                </span>
                <span className="relative mt-[clamp(1.5rem,3vw,2.25rem)] inline-flex items-center justify-center leading-none tracking-[-0.01em] text-[clamp(1rem,1.3vw,1.15rem)] text-[var(--dark)]">
                  {t.blog.readMore}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-1/2 bottom-[max(-0.794vw,-15.228px)] h-px w-1/2 -translate-x-1/2 bg-current transition-[width] duration-[400ms] ease-[var(--ease-expo-out)] group-hover:w-full"
                  />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Grid - filter bar + posts. */}
      <section className="bg-[var(--light)] py-[clamp(5rem,11vw,12rem)]">
        <div className="mx-[var(--gutter)]">
          <div className="flex flex-col items-center text-center">
            <Image
              src="/logo/mileva-logo-icon.png"
              alt=""
              width={1306}
              height={1453}
              className="mb-[clamp(0.85rem,2vw,1.5rem)] block h-[clamp(30px,4vw,38px)] w-auto"
            />
            <SplitText
              as="h2"
              text={t.blog.heading}
              className="text-[clamp(1.35rem,4.4vw,1.9rem)] leading-[1.2] tracking-[-0.01em] text-[var(--dark)]"
            />
          </div>

          {/* Category filter bar. */}
          <div className="mx-auto mt-[clamp(1.75rem,3.5vw,2.75rem)] mb-[clamp(3rem,6vw,5rem)] flex max-w-3xl flex-wrap items-center justify-center gap-x-[clamp(1.25rem,3vw,2.5rem)] gap-y-3">
            <button type="button" onClick={() => setActiveIndex(-1)} className={chip(-1)}>
              {t.blog.all}
            </button>
            {/* Filtriranje ide po izvornoj vrednosti; preslovljava se samo prikaz. */}
            {categories.map((cat, i) => (
              <button key={cat} type="button" onClick={() => setActiveIndex(i)} className={chip(i)}>
                {cms.text(cat)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-x-[clamp(1.5rem,3vw,2.5rem)] gap-y-[clamp(2.5rem,5vw,4rem)] sm:grid-cols-2 lg:grid-cols-3">
            {gridPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
