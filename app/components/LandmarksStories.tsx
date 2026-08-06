"use client";

import Image from "next/image";
import SplitText from "./SplitText";
import Reveal from "./Reveal";
import MediaReveal from "./MediaReveal";
import { useLang } from "../i18n/LanguageProvider";

/**
 * Fotografije po znamenitosti, redom kojim idu i u rečniku. Prva je krupni
 * kadar, ostale tri su mali niz ispod nje. Izvor: Turistička organizacija
 * opštine Knić (knicturizam.org.rs).
 */
const GALLERIES: string[][] = [
  [
    "/znamenitosti/boracki-krs-1.webp",
    "/znamenitosti/boracki-krs-2.webp",
    "/znamenitosti/boracki-krs-3.webp",
    "/znamenitosti/boracki-krs-4.webp",
  ],
  [
    "/znamenitosti/gruzansko-jezero.webp",
    "/znamenitosti/gruzansko-jezero-2.webp",
    "/znamenitosti/gruzansko-jezero-3.webp",
    "/znamenitosti/gruzansko-jezero-4.webp",
  ],
  [
    "/znamenitosti/manastir-kamenac.webp",
    "/znamenitosti/manastir-kamenac-2.webp",
    "/znamenitosti/manastir-kamenac-3.webp",
    "/znamenitosti/manastir-kamenac-4.webp",
  ],
  [
    "/znamenitosti/crkva-u-borcu-1.webp",
    "/znamenitosti/crkva-u-borcu-2.webp",
    "/znamenitosti/crkva-u-borcu-3.webp",
    "/znamenitosti/crkva-u-borcu-4.webp",
  ],
  [
    "/znamenitosti/gledicke-planine-1.webp",
    "/znamenitosti/gledicke-planine-2.webp",
    "/znamenitosti/gledicke-planine-3.webp",
    "/znamenitosti/gledicke-planine-4.webp",
  ],
  [
    "/znamenitosti/kotlenik-1.webp",
    "/znamenitosti/kotlenik-2.webp",
    "/znamenitosti/kotlenik-3.webp",
    "/znamenitosti/kotlenik-4.webp",
  ],
];

/** Jedna priča: kategorija + mesto + duži tekst. */
type LandmarkStory = {
  name: string;
  label: string;
  place: string;
  body: string;
  images: string[];
};

/**
 * Landmark stories - the long-form half of /znamenitosti: each place gets a
 * photo cluster (one large frame plus a strip of three) beside a column with
 * its category, name, village and the full text. The blocks alternate sides so
 * the page keeps a rhythm instead of a stack, and the section opens with the
 * usual centred header (brand mark, terracotta eyebrow, split heading).
 *
 * Sadržaj je statičan: tekstovi iz rečnika, fotografije iz GALLERIES.
 */
export default function LandmarksStories() {
  const { t } = useLang();
  const c = t.landmarks.stories;

  const stories: LandmarkStory[] = c.items.map((it, i) => ({
    ...it,
    images: GALLERIES[i] ?? [],
  }));

  return (
    <section className="bg-[var(--bg)] py-[clamp(6rem,13vw,13rem)]">
      <div className="mx-[var(--gutter)]">
        {/* Section header - same lockup as the quad routes / restaurant sections. */}
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
          <p className="mt-[clamp(1rem,2vw,1.5rem)] max-w-[46ch] text-[clamp(13px,3.4vw,15px)] leading-relaxed text-[var(--hint)]">
            {c.body}
          </p>
        </div>

        <div className="mx-auto mt-[clamp(3.5rem,8vw,8rem)] flex w-full max-w-6xl flex-col gap-[clamp(4rem,10vw,10rem)]">
          {stories.map((story, i) => {
            const [main, ...rest] = story.images;
            const thumbs = rest.slice(0, 3);
            const name = story.name;
            // Neparne priče idu obrnuto - tekst levo, fotografije desno.
            const flipped = i % 2 === 1;

            return (
              <article
                key={story.name}
                className="grid items-center gap-[clamp(2rem,5vw,4rem)] md:grid-cols-2"
              >
                <div className={flipped ? "md:order-2" : undefined}>
                  {/* Bez `parallax`: taj režim drži sloj na `scale 1.2` u
                      mirovanju, čime trajno odseca po 8.3% gornje i donje
                      ivice. Na Каменцу je tako nestajao krst sa kupole, koji
                      stoji na svega 3% visine fotografije. Uvodni clip/scale
                      reveal ostaje - gubi se samo pomeranje pri skrolovanju. */}
                  {main && (
                    <MediaReveal
                      className="aspect-[4/3] w-full rounded-[var(--radius2)]"
                      scaleFrom={1.15}
                    >
                      <Image
                        src={main}
                        alt={name}
                        fill
                        sizes="(min-width: 768px) 45vw, 100vw"
                        className="object-cover"
                      />
                    </MediaReveal>
                  )}
                  {thumbs.length > 0 && (
                    <div className="mt-[var(--space)] grid grid-cols-3 gap-[var(--space)]">
                      {thumbs.map((src) => (
                        <MediaReveal
                          key={src}
                          className="aspect-square rounded-[var(--radius2)]"
                          scaleFrom={1.1}
                        >
                          <Image
                            src={src}
                            alt=""
                            fill
                            sizes="(min-width: 768px) 15vw, 30vw"
                            className="object-cover"
                          />
                        </MediaReveal>
                      ))}
                    </div>
                  )}
                </div>

                <Reveal from={24} className={flipped ? "md:order-1" : undefined}>
                  <span className="text-[12px] uppercase tracking-[0.3em] text-[var(--main)]">
                    {story.label}
                  </span>
                  <SplitText
                    as="h3"
                    text={name}
                    className="mt-[clamp(0.6rem,1.2vw,1rem)] text-[clamp(1.35rem,4.4vw,1.7rem)] leading-[1.3] tracking-[-0.01em] text-[var(--dark)]"
                  />
                  {story.place && (
                    <span className="mt-2 block text-[13px] tracking-[0.05em] text-[var(--hint)]">
                      {story.place}
                    </span>
                  )}
                  {/* Kratka terakota crta - isti detalj kao hairline uz eyebrow u herou. */}
                  <span className="mt-[clamp(1.25rem,2.5vw,2rem)] block h-px w-12 bg-[var(--main)]/60" />
                  <p className="mt-[clamp(1.25rem,2.5vw,2rem)] max-w-[54ch] text-[17.78px] leading-relaxed text-[var(--dark)]">
                    {story.body}
                  </p>
                </Reveal>
              </article>
            );
          })}
        </div>

        {/* Autorstvo fotografija - snimci su iz galerije TO opštine Knić. */}
        <p className="mt-[clamp(3rem,6vw,5rem)] text-center text-[12px] tracking-[0.05em] text-[var(--hint)]">
          {c.credit}
        </p>
      </div>
    </section>
  );
}
