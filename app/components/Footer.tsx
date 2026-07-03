"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { useLang } from "../i18n/LanguageProvider";
import { EMAIL, PHONE_HREF, PHONE_LABEL, SOCIALS } from "../lib/site";

/**
 * Footer — editorial and restrained. An oversized e-mail "invitation" anchors
 * the top (with address + phone alongside); a single horizontal nav row and
 * socials sit below; a thin bottom bar carries the brand mark, copyright and
 * legal links.
 */
export default function Footer() {
  const { t } = useLang();

  // Matches the main menu order: Restoran, Smeštaj, Priroda, Znamenitosti,
  // Blog, Događaji, Kontakt (Reservations dropped, Blog added).
  const [restaurant, accommodation, events] = t.restaurants.categories;
  const quickLinks: { label: string; href: string }[] = [
    { label: t.nav.home, href: "/" },
    { label: restaurant, href: "/restoran" },
    { label: accommodation, href: "#" },
    { label: t.nav.nature, href: "#" },
    { label: t.nav.landmarks, href: "#" },
    { label: t.nav.blog, href: "#" },
    { label: events, href: "#" },
    { label: t.contact.title, href: "#" },
  ];

  return (
    <footer className="bg-[var(--overlay)] text-[var(--bg)]">
      <div className="mx-[var(--gutter)] py-[clamp(4rem,8vw,7rem)]">
        {/* Invitation — big e-mail + contact details */}
        <Reveal from={30}>
          <div className="flex flex-col gap-8 border-b border-[var(--border2)] pb-[clamp(2.5rem,5vw,4rem)] lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-4">
              <span className="text-[12px] uppercase tracking-[0.3em] text-[var(--main)]">
                {t.contact.title}
              </span>
              <a
                href={`mailto:${EMAIL}`}
                className="link-underline w-fit text-[clamp(1.9rem,5vw,4rem)] leading-none tracking-[-0.01em]"
              >
                {EMAIL}
              </a>
            </div>

            <div className="flex flex-col gap-1 text-[15.56px] leading-relaxed text-[var(--sand)] lg:text-right">
              <span>{t.contact.address}</span>
              <a href={`tel:${PHONE_HREF}`} className="link-underline w-fit lg:self-end">
                {PHONE_LABEL}
              </a>
            </div>
          </div>
        </Reveal>

        {/* Nav row + socials */}
        <div className="flex flex-col gap-6 border-b border-[var(--border2)] py-[clamp(2rem,4vw,3rem)] lg:flex-row lg:items-center lg:justify-between">
          <nav
            aria-label={t.footer.explore}
            className="flex flex-wrap gap-x-[clamp(1.25rem,2.5vw,2.5rem)] gap-y-3 text-[15.56px] text-[var(--sand)]"
          >
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="link-underline transition-colors hover:text-[var(--bg)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-[clamp(1.25rem,2.5vw,2rem)] text-[15.56px] text-[var(--sand)]">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="link-underline transition-colors hover:text-[var(--bg)]"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar — brand mark + copyright + legal */}
        <div className="flex flex-col items-start justify-between gap-4 pt-[clamp(1.75rem,3vw,2.5rem)] text-[11px] uppercase tracking-[0.12em] sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <Image
              src="/mileva-logo-icon.png"
              alt="Mileva"
              width={1306}
              height={1453}
              className="h-7 w-auto [filter:brightness(0)_invert(1)]"
            />
            <span className="opacity-50">{t.footer.copyright}</span>
          </div>

          <nav
            aria-label={t.aria.legal}
            className="flex flex-wrap items-center gap-[var(--space)]"
          >
            {t.footer.links.map((link) => (
              <a
                key={link}
                href="#"
                className="link-underline opacity-70 hover:opacity-100"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
