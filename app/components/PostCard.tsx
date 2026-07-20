"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "../i18n/LanguageProvider";
import { formatDate, type Post } from "../lib/blog";

/**
 * Blog post card - image (zooms on hover), category eyebrow, serif title, and a
 * date · reading-time meta line. Used in the blog index grid.
 */
export default function PostCard({ post }: { post: Post }) {
  const { lang, t } = useLang();
  const c = post.content[lang];

  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius2)]">
        <Image
          src={post.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[900ms] ease-[var(--ease-expo-out)] group-hover:scale-[1.05]"
        />
      </div>

      <span className="mt-[clamp(1.25rem,2.5vw,1.75rem)] text-[12px] uppercase tracking-[0.3em] text-[var(--main)]">
        {c.category}
      </span>
      <h3 className="mt-[clamp(0.5rem,1vw,0.85rem)] text-[clamp(1.15rem,2.4vw,1.4rem)] leading-[1.25] tracking-[-0.01em] text-[var(--dark)]">
        {c.title}
      </h3>
      <p className="mt-[clamp(0.6rem,1.2vw,0.9rem)] line-clamp-2 text-[15.5px] leading-relaxed text-[var(--hint)]">
        {c.excerpt}
      </p>
      <span className="mt-[clamp(0.85rem,1.6vw,1.15rem)] text-[13px] tracking-[0.02em] text-[var(--hint)]">
        {formatDate(post.date, lang)} · {post.readMinutes} {t.blog.minRead}
      </span>
    </Link>
  );
}
