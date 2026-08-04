"use client";

import Image from "next/image";
import SplitText from "./SplitText";
import Reveal from "./Reveal";
import { useLang } from "../i18n/LanguageProvider";

/**
 * Wineries around the estate - the amenity-grid idiom from PoolFeatures, with
 * the distance standing in for the running number: a terracotta line over a
 * hairline, the winery beneath it, its village as a muted meta line, and a note
 * where there is something worth knowing (tasting room, booking ahead).
 *
 * A grid rather than the hairline rows of LandmarksList right above it, so two
 * lists do not sit on top of each other; ordered by distance, nearest first.
 * Rows come from the dictionary - like the rest of this page, deliberately
 * static rather than CMS-driven.
 */
export default function LandmarksWineries() {
  const { t } = useLang();
  const w = t.landmarks.wineries;

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
          {w.eyebrow}
        </span>
        <SplitText
          as="h2"
          text={w.heading}
          className="mt-[clamp(0.75rem,1.5vw,1.25rem)] max-w-[24ch] text-center text-[clamp(1.35rem,4.4vw,1.7rem)] leading-[1.3] tracking-[-0.01em] text-[var(--dark)]"
        />
        <p className="mt-[clamp(1.25rem,2.5vw,1.75rem)] max-w-[52ch] text-center text-[17.78px] leading-relaxed text-[var(--hint)]">
          {w.body}
        </p>

        {/* Jedna kolona na telefonu, dve od sm, tri od lg - poslednji red se
            poravnava levo, kao i u ostalim mrežama na sajtu. */}
        <div className="mx-auto mt-[clamp(3rem,6vw,5rem)] grid w-full max-w-5xl grid-cols-1 gap-x-[clamp(2rem,4vw,3.5rem)] gap-y-[clamp(2rem,4.5vw,3.5rem)] text-left sm:grid-cols-2 lg:grid-cols-3">
          {w.items.map((item, i) => (
            <Reveal key={item.name} from={24} delay={(i % 3) * 0.06}>
              <div className="border-t border-[var(--border)] pt-[clamp(1rem,2vw,1.4rem)]">
                <span className="block text-[13px] tracking-[0.2em] text-[var(--main)]">
                  {item.distance}
                </span>
                <h3 className="mt-[clamp(0.6rem,1.2vw,0.9rem)] text-[clamp(1.05rem,2.2vw,1.25rem)] leading-[1.3] tracking-[-0.01em] text-[var(--dark)]">
                  {item.name}
                </h3>
                <p className="mt-[0.35rem] text-[12px] uppercase tracking-[0.18em] text-[var(--hint)]">
                  {item.place}
                </p>
                {item.desc && (
                  <p className="mt-[clamp(0.5rem,1vw,0.75rem)] max-w-[38ch] text-[14.5px] leading-relaxed text-[var(--hint)]">
                    {item.desc}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
