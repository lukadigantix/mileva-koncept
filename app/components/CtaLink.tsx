"use client";

import type { MouseEventHandler, ReactNode } from "react";
import { useLang } from "../i18n/LanguageProvider";
import { localePath } from "../i18n/routing";

type CtaLinkProps = {
  href: string;
  children: ReactNode;
  /** Size / colour / shadow - set by the caller. */
  className?: string;
  /** Optional click handler (e.g. to intercept in-page anchors for smooth scroll). */
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

/**
 * Shared CTA link used across the site (Featured panel, restaurant hero). The
 * label with a centred 1px hairline beneath that grows from 50% → 100% width on
 * hover (reference `li::after`, `translateX(-50%)`). One component so every CTA
 * link looks and behaves identically.
 */
export default function CtaLink({ href, children, className, onClick }: CtaLinkProps) {
  const { lang } = useLang();
  return (
    <a
      href={localePath(lang, href)}
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center leading-none tracking-[-0.01em] ${className ?? ""}`}
    >
      {children}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 bottom-[max(-0.794vw,-15.228px)] h-px w-1/2 -translate-x-1/2 bg-current transition-[width] duration-[400ms] ease-[var(--ease-expo-out)] group-hover:w-full"
      />
    </a>
  );
}
