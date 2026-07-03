"use client";

import Image from "next/image";
import SplitText from "./SplitText";
import { useLang } from "../i18n/LanguageProvider";

type MenuBoardProps = {
  /** Which board to render — the food menu or the drinks card. */
  source: "menuList" | "drinksList";
};

/**
 * MenuBoard — a Šumadija-styled à la carte board (food menu or drinks card).
 * A centred header (brand mark + eyebrow + heading + sourcing note), then the
 * courses in two columns on desktop, one on mobile. Each item is a row: name on
 * the left, price on the right, joined by a dotted leader, with a muted
 * description beneath. Prices are in Serbian dinars. Content is picked from the
 * dictionary by `source`, so the food menu and drinks card share this markup.
 */
export default function MenuBoard({ source }: MenuBoardProps) {
  const { t } = useLang();
  const menu = t.restaurant[source];

  return (
    <section
      id={source === "menuList" ? "jelovnik" : "karta-pica"}
      className="scroll-mt-[clamp(5rem,12vw,7rem)] bg-[var(--bg)] pb-[clamp(4.5rem,13vw,13rem)] text-[var(--dark)]"
    >
      <div className="mx-[var(--gutter)]">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <Image
            src="/mileva-logo-icon.png"
            alt=""
            width={1306}
            height={1453}
            className="mb-[clamp(0.85rem,2vw,1.5rem)] block h-[clamp(30px,4vw,38px)] w-auto"
          />
          <span className="text-[clamp(11px,2.6vw,13px)] uppercase tracking-[0.3em] text-[var(--main)]">
            {menu.eyebrow}
          </span>
          <SplitText
            as="h2"
            text={menu.heading}
            className="mt-[clamp(0.6rem,1.6vw,1.25rem)] text-[clamp(1.35rem,4.6vw,2.25rem)] leading-[1.2] tracking-[-0.01em]"
          />
          <p className="mt-[clamp(0.75rem,1.8vw,1.4rem)] max-w-[46ch] text-[clamp(13px,3.4vw,15px)] leading-relaxed text-[var(--hint)]">
            {menu.note}
          </p>
        </div>

        {/* Courses — two columns on desktop, one on mobile. */}
        <div className="mx-auto mt-[clamp(2.5rem,6vw,6rem)] grid max-w-4xl grid-cols-1 gap-x-[clamp(2.5rem,5vw,5rem)] gap-y-[clamp(2.5rem,5vw,4rem)] md:grid-cols-2">
          {menu.sections.map((section) => (
            <div key={section.title}>
              {/* Course title — serif small-caps with a terracotta hairline. */}
              <h3 className="mb-[clamp(1rem,2.5vw,2rem)] flex items-center gap-4 text-[clamp(1rem,3.6vw,1.3rem)] uppercase tracking-[0.14em]">
                <span className="whitespace-nowrap">{section.title}</span>
                <span className="h-px flex-1 bg-[var(--main)]/40" />
              </h3>

              <ul className="flex flex-col gap-[clamp(1rem,2vw,1.6rem)]">
                {section.items.map((item) => (
                  <li key={item.name}>
                    <div className="flex items-baseline gap-3">
                      <span className="text-[clamp(15px,4vw,17.78px)] leading-snug">
                        {item.name}
                      </span>
                      {/* Dotted leader bridging name → price. */}
                      <span
                        aria-hidden
                        className="min-w-6 flex-1 translate-y-[-0.28em] border-b border-dotted border-[var(--border)]"
                      />
                      <span className="whitespace-nowrap text-[clamp(15px,4vw,17.78px)] tabular-nums text-[var(--main)]">
                        {item.price} {menu.currency}
                      </span>
                    </div>
                    <p className="mt-[0.3rem] max-w-[42ch] text-[clamp(12.5px,3.2vw,14px)] leading-relaxed text-[var(--hint)]">
                      {item.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
