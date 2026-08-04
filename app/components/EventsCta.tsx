"use client";

import SplitText from "./SplitText";
import CtaLink from "./CtaLink";
import { useLang } from "../i18n/LanguageProvider";
import { useSiteSettings } from "../lib/siteSettings";

/**
 * Events closing CTA - a light band inviting the visitor to get in touch (kept
 * light so it doesn't stack dark-on-dark after the activities band). Celebrations
 * have their own phone line, so it is offered here for a direct call, with the
 * contact page link below it (shared CtaLink, hairline underline).
 */
export default function EventsCta() {
  const { t } = useLang();
  const cta = t.events.cta;
  // Proslave i događaji imaju svoj broj (PHONES u lib/site.ts).
  const eventsPhone = useSiteSettings().phones.find((p) => p.key === "events");

  return (
    <section className="bg-[var(--bg)] py-[clamp(6rem,13vw,13rem)]">
      <div className="mx-[var(--gutter)] flex flex-col items-center text-center">
        <span className="text-[12px] uppercase tracking-[0.3em] text-[var(--main)]">
          {cta.eyebrow}
        </span>
        <SplitText
          as="h2"
          text={cta.heading}
          className="mt-[clamp(0.75rem,1.5vw,1.25rem)] max-w-[20ch] text-[clamp(1.6rem,4vw,2.4rem)] leading-[1.15] tracking-[-0.01em] text-[var(--dark)]"
        />
        <p className="mt-[clamp(1.25rem,2.5vw,1.75rem)] max-w-[46ch] text-[17.78px] leading-relaxed text-[var(--dark)]">
          {cta.body}
        </p>
        {eventsPhone && (
          <a
            href={`tel:${eventsPhone.href}`}
            className="mt-[clamp(1.75rem,3.5vw,2.5rem)] flex flex-col items-center"
          >
            <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--main)]">
              {t.contact.phones.events}
            </span>
            <span className="link-underline mt-[clamp(0.5rem,1vw,0.7rem)] text-[clamp(1.15rem,2.8vw,1.45rem)] leading-none tracking-[-0.01em] text-[var(--dark)]">
              {eventsPhone.label}
            </span>
          </a>
        )}

        <CtaLink
          href="/kontakt"
          className="mt-[clamp(1.5rem,3vw,2rem)] text-[clamp(1rem,1.3vw,1.2rem)] text-[var(--dark)]"
        >
          {cta.button}
        </CtaLink>
      </div>
    </section>
  );
}
