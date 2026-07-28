"use client";

import Link from "next/link";
import { useLang } from "../i18n/LanguageProvider";
import { useSiteSettings } from "../lib/siteSettings";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

/**
 * Full-screen menu overlay. Two-column layout: big serif links (top-nav +
 * category links + Kontakt) on the left, a compact contact panel on the right.
 * Both fit within the viewport; links reveal with a staggered fade-up.
 */
export default function Sidebar({ open, onClose }: SidebarProps) {
  const { t } = useLang();
  const settings = useSiteSettings();

  // Restoran, Smeštaj, Znamenitosti, Blog, Događaji, Kontakt.
  // Reservations dropped (it lives inside Accommodation); Priroda dropped (its
  // content now lives inside Znamenitosti); Blog is new.
  const [restaurant, accommodation, events] = t.restaurants.categories;
  const links: { label: string; href: string }[] = [
    { label: t.nav.home, href: "/" },
    { label: restaurant, href: "/restoran" },
    { label: accommodation, href: "/smestaj" },
    { label: t.nav.landmarks, href: "/znamenitosti" },
    { label: t.nav.blog, href: "/blog" },
    { label: events, href: "/dogadjaji" },
    { label: t.contact.title, href: "/kontakt" },
  ];

  const reveal = (i: number) =>
    ({
      transitionDelay: open ? `${150 + i * 45}ms` : "0ms",
    }) as const;

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-40 bg-[var(--overlay)] text-[var(--bg)] transition-opacity duration-700 ease-[var(--ease-expo-out)] ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {/* Šumadija - rolling forested hills, a warm terracotta landscape motif
          along the foot of the menu. Purely decorative, sits behind content. */}
      <svg
        aria-hidden
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[26vh] w-full text-[var(--main)]"
      >
        <path
          d="M0 150 C 240 88 430 168 720 128 C 1010 88 1210 162 1440 116"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.12"
        />
        <path
          d="M0 218 C 260 150 450 232 760 190 C 1050 150 1250 224 1440 176"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.2"
        />
        <path
          d="M0 288 C 250 224 500 300 800 256 C 1080 216 1280 286 1440 244"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.32"
        />
      </svg>

      <div className="relative z-10 mx-[var(--gutter)] flex h-full flex-col justify-center gap-[clamp(2rem,4vw,3rem)] overflow-y-auto py-[clamp(72px,11vh,110px)] lg:flex-row lg:items-center lg:justify-between lg:gap-[var(--space)]">
        {/* Links */}
        <nav className="flex flex-col gap-[clamp(0.9rem,min(1.4vw,1.8vh),1.5rem)]">
          {links.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={onClose}
              style={reveal(i)}
              className={`group flex w-fit items-baseline gap-[clamp(0.6rem,1.2vw,1.25rem)] leading-[1.15] transition-all duration-700 ease-[var(--ease-expo-out)] ${
                open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              <span className="text-[12px] tabular-nums tracking-[0.3em] text-[var(--main)] opacity-70">
                0{i + 1}
              </span>
              <span className="text-[clamp(30px,min(4.5vw,6vh),3.75rem)] transition-colors duration-300 group-hover:text-[var(--main)]">
                {link.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Contact panel */}
        <div
          style={reveal(links.length)}
          className={`flex shrink-0 flex-col gap-8 text-[var(--sand)] transition-all duration-700 ease-[var(--ease-expo-out)] lg:max-w-[22rem] lg:gap-10 lg:text-right ${
            open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-2 lg:items-end">
            <span className="mb-1 text-[13px] uppercase tracking-[0.28em] text-[var(--main)] lg:text-[15px]">
              {t.contact.title}
            </span>
            <span className="text-[18px] lg:text-[22px] leading-relaxed">
              {t.contact.address}
            </span>
            <a href={`mailto:${settings.email}`} className="link-underline text-[18px] lg:text-[22px]">
              {settings.email}
            </a>
            <a href={`tel:${settings.phoneHref}`} className="link-underline text-[18px] lg:text-[22px]">
              {settings.phoneLabel}
            </a>
          </div>

          <div className="flex flex-col gap-2 lg:items-end">
            <span className="mb-1 text-[13px] uppercase tracking-[0.28em] text-[var(--main)] lg:text-[15px]">
              {t.contact.follow}
            </span>
            <div className="flex gap-4 text-[18px] lg:text-[22px]">
              {settings.socials.map((s) => (
                <a key={s.label} href={s.href} className="link-underline">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
