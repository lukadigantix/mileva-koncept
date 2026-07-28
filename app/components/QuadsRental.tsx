"use client";

import Image from "next/image";
import SplitText from "./SplitText";
import Reveal from "./Reveal";
import MediaReveal from "./MediaReveal";
import { useLang } from "../i18n/LanguageProvider";

/** One quad from the backend, image URL already resolved. */
export type QuadCard = {
  id: string;
  name: string;
  desc: string;
  image: string;
  price: string;
};

/**
 * Quad rental fleet - the available quads from the backend admin, as a three-up
 * grid of cards in the site's card idiom (MediaReveal image, serif name, muted
 * description, terracotta price line). Content is single-language CMS copy;
 * only the section chrome localises.
 */
export default function QuadsRental({ quads }: { quads: QuadCard[] }) {
  const { t } = useLang();
  const c = t.quads.rental;

  return (
    <section className="bg-[var(--light)] py-[clamp(5rem,11vw,11rem)]">
      <div className="mx-[var(--gutter)]">
        <div className="flex flex-col items-center text-center">
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
        </div>

        <div className="mt-[clamp(3rem,6vw,6rem)] grid grid-cols-1 gap-x-[clamp(1.5rem,3vw,2.5rem)] gap-y-[clamp(2.5rem,5vw,4rem)] sm:grid-cols-2 lg:grid-cols-3">
          {quads.map((quad, i) => (
            <Reveal key={quad.id} from={26} delay={(i % 3) * 0.05}>
              <MediaReveal
                className="aspect-[4/3] rounded-[var(--radius2)]"
                scaleFrom={i % 2 === 0 ? 1.15 : 1.1}
                parallax
              >
                <Image
                  src={quad.image}
                  alt={quad.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </MediaReveal>
              <h3 className="mt-[clamp(1.25rem,2.5vw,1.75rem)] text-[clamp(1.2rem,2.6vw,1.5rem)] leading-[1.2] tracking-[-0.01em] text-[var(--dark)]">
                {quad.name}
              </h3>
              {quad.desc && (
                <p className="mt-[clamp(0.6rem,1.2vw,0.9rem)] text-[15.5px] leading-[1.7] text-[var(--hint)]">
                  {quad.desc}
                </p>
              )}
              {quad.price && (
                <span className="mt-[clamp(0.85rem,1.6vw,1.15rem)] block text-[15.5px] tracking-[0.02em] text-[var(--main)]">
                  {quad.price}
                </span>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
