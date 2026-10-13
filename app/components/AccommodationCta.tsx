"use client";

import Image from "next/image";
import Link from "./LocaleLink";
import SplitText from "./SplitText";
import { useLang } from "../i18n/LanguageProvider";
import { useSiteSettings } from "../lib/siteSettings";

/**
 * Accommodation closing CTA - zatvara stranicu smeštaja umesto forme za
 * rezervaciju (BookingWidget). Onlajn rezervacija je privremeno sklonjena, pa
 * ovde stoji samo poziv na rezervaciju, glavni broj telefona (`main` u PHONES)
 * i link ka kontakt stranici, isto kao zatvaranje na stranicama bazena i
 * događaja. Natpis iznad broja je ovde samo „Smeštaj“ (`cta.phoneLabel`) - isti
 * broj u futeru i na kontaktu i dalje nosi svoj zajednički natpis.
 *
 * Zadržava `id="rezervacija"` jer je to meta dugmeta u herou (Hero.tsx).
 */
export default function AccommodationCta() {
  const { t } = useLang();
  const r = t.accommodation.reservation;
  const phone = useSiteSettings().phones.find((p) => p.key === "main");

  return (
    <section
      id="rezervacija"
      className="scroll-mt-24 bg-[var(--bg)] py-[clamp(6rem,13vw,13rem)]"
    >
      <div className="mx-[var(--gutter)] flex flex-col items-center text-center">
        <Image
          src="/logo/mileva-logo-icon.png"
          alt=""
          width={1306}
          height={1453}
          className="mb-[clamp(1rem,2vw,1.5rem)] block h-[38px] w-auto"
        />
        <span className="text-[12px] uppercase tracking-[0.3em] text-[var(--main)]">
          {r.eyebrow}
        </span>
        <SplitText
          as="h2"
          text={r.heading}
          className="mt-[clamp(0.75rem,1.5vw,1.25rem)] max-w-[24ch] text-[clamp(1.35rem,4.4vw,1.7rem)] leading-[1.3] tracking-[-0.01em] text-[var(--dark)]"
        />
        {/* `whitespace-pre-line` - prelom reda stoji u rečniku (\n), pa svaki
            jezik sam bira gde da prelomi rečenicu. */}
        <p className="mt-[clamp(1.25rem,2.5vw,1.75rem)] max-w-[48ch] whitespace-pre-line text-[17.78px] leading-relaxed text-[var(--dark)]">
          {r.cta.body}
        </p>

        {phone && (
          <a
            href={`tel:${phone.href}`}
            className="mt-[clamp(1.75rem,3.5vw,2.5rem)] flex flex-col items-center"
          >
            <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--main)]">
              {r.cta.phoneLabel}
            </span>
            <span className="link-underline mt-[clamp(0.5rem,1vw,0.7rem)] text-[clamp(1.15rem,2.8vw,1.45rem)] leading-none tracking-[-0.01em] text-[var(--dark)]">
              {phone.label}
            </span>
          </a>
        )}

        <Link
          href="/kontakt"
          className="link-underline mt-[clamp(1.5rem,3vw,2rem)] text-[clamp(1rem,1.3vw,1.15rem)] text-[var(--main)]"
        >
          {r.cta.button}
        </Link>
      </div>
    </section>
  );
}
