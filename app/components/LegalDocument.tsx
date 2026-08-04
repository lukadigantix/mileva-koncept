"use client";

import Image from "next/image";
import Link from "./LocaleLink";
import Reveal from "./Reveal";
import SplitText from "./SplitText";
import { useLang } from "../i18n/LanguageProvider";
import { COOKIES, PRIVACY } from "../i18n/legal";
import { SEO } from "../i18n/seoContent";
import { EMAIL, LEGAL_ENTITY, PHONES } from "../lib/site";

/**
 * Pravni dokument (politika privatnosti ili politika kolačića) - jedna centrirana
 * editorijalna kolona na osnovnoj podlozi, u istom ritmu kao kontakt stranica:
 * znak brenda, terakota eyebrow, krupan naslov i datum, pa indeks sekcija i tekst.
 *
 * Sadržaj stiže iz `i18n/legal.ts`, a podaci rukovaoca (adresa, imejl, telefon,
 * PIB) iz `lib/site.ts` - da se adresa ne bi prepisivala po jezicima i razišla
 * sa onom u futeru. Redovi za PIB i matični broj se prikazuju tek kad se popune.
 */
const DOCS = { privacy: PRIVACY, cookies: COOKIES };

export default function LegalDocument({ doc: kind }: { doc: keyof typeof DOCS }) {
  const { t, lang } = useLang();
  const doc = DOCS[kind][lang];
  const c = doc.controller;
  // Ćirilica ima duže gornje i donje produžetke, pa joj u naslovu treba vazduha.
  const headingLeading = lang === "sr-cyrl" ? "leading-[1.15]" : "leading-[1.02]";

  // Podaci rukovaoca; prazni redovi (PIB, matični broj) ispadaju sami.
  const controllerRows = [
    { label: c.labels.name, value: LEGAL_ENTITY.name || SEO[lang].brand },
    { label: c.labels.address, value: t.contact.address },
    { label: c.labels.email, value: EMAIL, href: `mailto:${EMAIL}` },
    { label: c.labels.phone, value: PHONES[0].label, href: `tel:${PHONES[0].href}` },
    { label: c.labels.pib, value: LEGAL_ENTITY.pib },
    { label: c.labels.reg, value: LEGAL_ENTITY.registrationNumber },
  ].filter((row) => row.value);

  const allSections = [{ id: c.id, heading: c.heading }, ...doc.sections];

  const paragraph = "mt-[clamp(0.9rem,1.8vw,1.25rem)] text-[17px] leading-[1.8] text-[var(--dark)]";

  return (
    <section className="bg-[var(--bg)] pt-[clamp(7rem,15vh,10rem)] pb-[clamp(5rem,11vw,9rem)]">
      <div className="mx-auto max-w-3xl px-[var(--gutter)]">
        {/* Zaglavlje dokumenta. */}
        <Reveal from={30}>
          <div className="flex flex-col items-center text-center">
            <Image
              src="/logo/mileva-logo-icon.png"
              alt=""
              width={1306}
              height={1453}
              className="mb-[clamp(1.25rem,3vw,2rem)] block h-[clamp(38px,5vw,52px)] w-auto"
            />
            <span className="text-[12px] uppercase tracking-[0.3em] text-[var(--main)]">
              {doc.eyebrow}
            </span>
            <SplitText
              as="h1"
              text={doc.title}
              className={`mt-[clamp(0.75rem,1.5vw,1.25rem)] text-[clamp(2rem,6vw,3.4rem)] tracking-[-0.015em] text-[var(--dark)] ${headingLeading}`}
            />
            <p className="mt-[clamp(1rem,2vw,1.5rem)] text-[13px] uppercase tracking-[0.18em] text-[var(--hint)]">
              {doc.updated}
            </p>
          </div>
        </Reveal>

        {/* Uvod. */}
        <Reveal from={24} delay={0.05}>
          <div className="mt-[clamp(2.5rem,5vw,4rem)]">
            {doc.intro.map((p, i) => (
              <p key={i} className={paragraph}>
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        {/* Indeks sekcija - dokument je dug, pa se skače pravo na traženo. */}
        <Reveal from={24} delay={0.1}>
          <nav
            aria-label={doc.contentsLabel}
            className="mt-[clamp(2.5rem,5vw,4rem)] border-y border-[var(--border)] py-[clamp(1.5rem,3vw,2.25rem)]"
          >
            <span className="text-[12px] uppercase tracking-[0.2em] text-[var(--main)]">
              {doc.contentsLabel}
            </span>
            <ol className="mt-[clamp(0.9rem,1.8vw,1.25rem)] flex flex-col gap-2">
              {allSections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="link-underline text-[16px] text-[var(--dark)]">
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </Reveal>

        {/* 1. Rukovalac - tekst iz rečnika + podaci iz lib/site.ts. */}
        <Reveal from={24}>
          <section id={c.id} className="mt-[clamp(3rem,6vw,4.5rem)] scroll-mt-[6rem]">
            <h2 className="text-[clamp(1.3rem,3vw,1.75rem)] leading-[1.25] tracking-[-0.01em] text-[var(--dark)]">
              {c.heading}
            </h2>
            {c.body.map((p, i) => (
              <p key={i} className={paragraph}>
                {p}
              </p>
            ))}

            <dl className="mt-[clamp(1.25rem,2.5vw,1.75rem)] flex flex-col">
              {controllerRows.map((row) => (
                <div
                  key={row.label}
                  className="flex flex-col gap-1 border-t border-[var(--border)] py-[clamp(0.7rem,1.4vw,1rem)] sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <dt className="text-[12px] uppercase tracking-[0.2em] text-[var(--main)]">
                    {row.label}
                  </dt>
                  <dd className="text-[17px] text-[var(--dark)] sm:text-right">
                    {row.href ? (
                      <a href={row.href} className="link-underline">
                        {row.value}
                      </a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            {c.after.map((p, i) => (
              <p key={i} className={paragraph}>
                {p}
              </p>
            ))}
          </section>
        </Reveal>

        {/* Ostale sekcije. */}
        {doc.sections.map((s) => (
          <Reveal key={s.id} from={24}>
            <section id={s.id} className="mt-[clamp(3rem,6vw,4.5rem)] scroll-mt-[6rem]">
              <h2 className="text-[clamp(1.3rem,3vw,1.75rem)] leading-[1.25] tracking-[-0.01em] text-[var(--dark)]">
                {s.heading}
              </h2>

              {s.body?.map((p, i) => (
                <p key={i} className={paragraph}>
                  {p}
                </p>
              ))}

              {s.list && (
                <ul className="mt-[clamp(0.9rem,1.8vw,1.25rem)] flex flex-col gap-[clamp(0.6rem,1.2vw,0.9rem)]">
                  {s.list.map((item, i) => (
                    <li
                      key={i}
                      className="border-l border-[var(--border)] pl-[clamp(1rem,2vw,1.5rem)] text-[17px] leading-[1.8] text-[var(--dark)]"
                    >
                      {item.term && (
                        <span className="text-[var(--main)]">{item.term} - </span>
                      )}
                      {item.text}
                    </li>
                  ))}
                </ul>
              )}

              {s.after?.map((p, i) => (
                <p key={i} className={paragraph}>
                  {p}
                </p>
              ))}

              {s.link && (
                <Link
                  href={s.link.href}
                  className="link-underline mt-[clamp(1rem,2vw,1.4rem)] inline-block text-[17px] text-[var(--main)]"
                >
                  {s.link.label}
                </Link>
              )}
            </section>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
