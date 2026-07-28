"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "../i18n/LanguageProvider";
import { LANGUAGES } from "../i18n/translations";

type HeaderProps = {
  open: boolean;
  overDark: boolean;
  onToggle: () => void;
};

/**
 * Fixed top bar (analysis §0). Left: hamburger + language switcher
 * (Српски ћирилица / latinica / English). Center: AKANEYA wordmark. Right:
 * Reservations / Gift / Menus. Text colour inverts as the page scrolls between
 * dark and light sections.
 */
export default function Header({ open, overDark, onToggle }: HeaderProps) {
  const { lang, setLang, t } = useLang();
  const tone = overDark ? "text-[var(--bg)]" : "text-[var(--dark)]";
  const navLinks: { label: string; href: string }[] = [
    { label: t.nav.accommodation, href: "/smestaj" },
    { label: t.nav.landmarks, href: "/znamenitosti" },
    { label: t.nav.blog, href: "/blog" },
    { label: t.nav.contact, href: "/kontakt" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-[98px] transition-colors duration-500 ease-[var(--ease-expo-out)] ${tone}`}
    >
      <div className="mx-[var(--gutter)] flex h-full items-center justify-between">
        {/* Left cluster: hamburger + languages */}
        <div className="flex items-center gap-[var(--space)]">
          <button
            type="button"
            onClick={onToggle}
            aria-label={open ? t.aria.closeMenu : t.aria.openMenu}
            aria-expanded={open}
            className="flex cursor-pointer flex-col justify-center gap-[5px] py-2"
          >
            <span
              className={`block h-px w-6 bg-current transition-transform duration-500 ease-[var(--ease-expo-out)] ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-current transition-transform duration-500 ease-[var(--ease-expo-out)] ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </button>

          <nav
            aria-label={t.aria.language}
            className="hidden items-center gap-3 md:flex"
          >
            {LANGUAGES.map(({ code, label }) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                aria-current={lang === code}
                className={`cursor-pointer text-[15.56px] tracking-[-0.01em] transition-opacity ${
                  lang === code ? "opacity-100" : "opacity-50 hover:opacity-100"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Center: wordmark. Source art is black; the invert amount animates
            0 → 1 with `overDark` so it flips white over dark sections and back
            to dark over light ones, matching the nav's colour switch. */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <Image
            src="/logo/mileva-logo-text.png"
            alt="Mileva koncept"
            width={3266}
            height={701}
            priority
            style={{
              filter: `brightness(0) invert(${overDark ? 1 : 0})`,
            }}
            className="h-[clamp(18px,1.8vw,26px)] w-auto transition-[filter] duration-500 ease-[var(--ease-expo-out)]"
          />
        </Link>

        {/* Right: primary nav - hidden while the full-screen menu is open,
            since the menu lists these links itself. */}
        <nav
          aria-label={t.aria.primary}
          className={`hidden items-center gap-[var(--space)] transition-opacity duration-300 md:flex ${
            open ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="link-underline text-[15.56px] tracking-[-0.01em]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
