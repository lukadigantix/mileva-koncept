"use client";

import SplitText from "./SplitText";
import CtaLink from "./CtaLink";
import { useLang } from "../i18n/LanguageProvider";

/**
 * Events closing CTA - a light band inviting the visitor to get in touch (kept
 * light so it doesn't stack dark-on-dark after the activities band). The CTA
 * reuses the shared CtaLink (hairline underline) and points to the contact page.
 */
export default function EventsCta() {
  const { t } = useLang();
  const cta = t.events.cta;

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
        <CtaLink
          href="/kontakt"
          className="mt-[clamp(2rem,4vw,3rem)] text-[clamp(1rem,1.3vw,1.2rem)] text-[var(--dark)]"
        >
          {cta.button}
        </CtaLink>
      </div>
    </section>
  );
}
