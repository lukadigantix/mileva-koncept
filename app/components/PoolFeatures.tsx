"use client";

import Image from "next/image";
import Link from "./LocaleLink";
import SplitText from "./SplitText";
import Reveal from "./Reveal";
import { useLang } from "../i18n/LanguageProvider";
import { useSiteSettings } from "../lib/siteSettings";

/**
 * What awaits at the pool - the amenities as a numbered editorial grid (three
 * columns from lg, two from sm): a terracotta index over a hairline, the name
 * in serif, a muted description beneath - the celebrations-grid numbering
 * married to the site's hairline idiom. Closes with the pool's own phone number
 * and the contact page link, since times and private hire are arranged by phone.
 */
export default function PoolFeatures() {
  const { t } = useLang();
  const c = t.pool.features;
  // Bazen ima svoj broj (PHONES u lib/site.ts) - ovde se zove direktno, bez
  // skretanja na kontakt stranicu.
  const poolPhone = useSiteSettings().phones.find((p) => p.key === "pool");

  return (
    <section className="bg-[var(--bg)] py-[clamp(6rem,13vw,13rem)]">
      <div className="mx-[var(--gutter)] flex flex-col items-center">
        <Image
          src="/logo/mileva-logo-icon.png"
          alt=""
          width={1306}
          height={1453}
          className="mb-[clamp(1rem,2vw,1.5rem)] block h-[38px] w-auto"
        />
        <span className="text-[12px] uppercase tracking-[0.3em] text-[var(--main)]">
          {c.eyebrow}
        </span>
        <SplitText
          as="h2"
          text={c.heading}
          className="mt-[clamp(0.75rem,1.5vw,1.25rem)] text-center text-[clamp(1.35rem,4.4vw,1.7rem)] leading-[1.3] tracking-[-0.01em] text-[var(--dark)]"
        />

        {/* Amenity grid - numbered cells over hairlines, staggered reveal. */}
        <div className="mx-auto mt-[clamp(3rem,6vw,5rem)] grid w-full max-w-5xl grid-cols-1 gap-x-[clamp(2rem,4vw,3.5rem)] gap-y-[clamp(2rem,4.5vw,3.5rem)] text-left sm:grid-cols-2 lg:grid-cols-3">
          {c.items.map((item, i) => (
            <Reveal key={item.name} from={24} delay={(i % 3) * 0.06}>
              <div className="border-t border-[var(--border)] pt-[clamp(1rem,2vw,1.4rem)]">
                <span className="block text-[13px] tabular-nums tracking-[0.3em] text-[var(--main)]">
                  0{i + 1}
                </span>
                <h3 className="mt-[clamp(0.6rem,1.2vw,0.9rem)] text-[clamp(1.05rem,2.2vw,1.25rem)] leading-[1.3] tracking-[-0.01em] text-[var(--dark)]">
                  {item.name}
                </h3>
                <p className="mt-[clamp(0.5rem,1vw,0.75rem)] max-w-[38ch] text-[14.5px] leading-relaxed text-[var(--hint)]">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA - broj bazena za direktan poziv, pa link ka kontakt stranici. */}
        <div className="mt-[clamp(3rem,6vw,5rem)] flex flex-col items-center text-center">
          <p className="max-w-[48ch] text-[17.78px] leading-relaxed text-[var(--dark)]">
            {t.pool.cta.body}
          </p>

          {poolPhone && (
            <a
              href={`tel:${poolPhone.href}`}
              className="mt-[clamp(1.75rem,3.5vw,2.5rem)] flex flex-col items-center"
            >
              <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--main)]">
                {t.contact.phones.pool}
              </span>
              <span className="link-underline mt-[clamp(0.5rem,1vw,0.7rem)] text-[clamp(1.15rem,2.8vw,1.45rem)] leading-none tracking-[-0.01em] text-[var(--dark)]">
                {poolPhone.label}
              </span>
            </a>
          )}

          <Link
            href="/kontakt"
            className="link-underline mt-[clamp(1.5rem,3vw,2rem)] text-[clamp(1rem,1.3vw,1.15rem)] text-[var(--main)]"
          >
            {t.pool.cta.button}
          </Link>
        </div>
      </div>
    </section>
  );
}
