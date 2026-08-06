"use client";

import Image from "next/image";
import SplitText from "./SplitText";
import { useCms, useLang } from "../i18n/LanguageProvider";

export type BoardSection = {
  title: string;
  items: { name: string; desc: string; price: string }[];
};

type MenuBoardProps = {
  /** Which board to render - the food menu or the drinks card. */
  source: "menuList" | "drinksList";
  /**
   * Sekcije iz digitalnog jelovnika sa backenda. Kad ih ima, zamenjuju sekcije
   * iz rečnika i cene se ispisuju doslovno (admin kuca ceo string, sa valutom).
   *
   * Razlika između `undefined` i `[]` je namerna i nosi različito značenje:
   *   undefined → backend nije odgovorio; pada se na statični rečnik, da sajt
   *               preživi ispad API-ja sa nekim jelovnikom na ekranu
   *   []        → backend JESTE odgovorio i kaže da nema ničega; tabla se tada
   *               uopšte ne iscrtava, umesto da izmisli stavke iz rečnika
   */
  sections?: BoardSection[];
};

/**
 * MenuBoard - a Šumadija-styled à la carte board (food menu or drinks card).
 * A centred header (brand mark + eyebrow + heading + sourcing note), then the
 * courses in two columns on desktop, one on mobile. Each item is a row: name on
 * the left, price on the right, joined by a dotted leader, with a muted
 * description beneath. Prices are in Serbian dinars. The chrome (eyebrow,
 * heading, note) always comes from the dictionary by `source`; the courses come
 * from the backend when `sections` is provided, otherwise from the dictionary.
 */
/**
 * Spaja broj i jedinicu mere neprelomljivim razmakom: „100 g“ ostaje u istom
 * redu umesto da „g“ padne samo u sledeći. Radi i za ćirilične oznake, jer se
 * primenjuje POSLE preslovljavanja.
 */
function keepUnits(text: string): string {
  return text.replace(
    /(\d)\s+(kg|g|dl|ml|l|kom(?:ad)?\.?|кг|г|дл|мл|л|ком(?:ад)?\.?)(?=\s|$|[,./)])/gi,
    "$1\u00A0$2"
  );
}

export default function MenuBoard({ source, sections }: MenuBoardProps) {
  const { t } = useLang();
  const cms = useCms();
  const menu = t.restaurant[source];
  // `undefined` znači "backend nije odgovorio" → rečnik; sve ostalo je odgovor
  // backenda i uzima se doslovno, pa i prazna lista.
  const fromApi = sections !== undefined;
  const courses: BoardSection[] = sections ?? menu.sections;

  // Nema nijedne sekcije sa stavkama - ne iscrtavaj ni zaglavlje. Prazna tabla
  // sa naslovom i prazninom ispod deluje kao greška u prikazu.
  if (courses.length === 0) return null;

  return (
    <section
      id={source === "menuList" ? "jelovnik" : "karta-pica"}
      className="scroll-mt-[clamp(5rem,12vw,7rem)] bg-[var(--bg)] pb-[clamp(4.5rem,13vw,13rem)] text-[var(--dark)]"
    >
      <div className="mx-[var(--gutter)]">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <Image
            src="/logo/mileva-logo-icon.png"
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

        {/* Kategorije u dve kolone na desktopu, jedna na telefonu.

            Namerno CSS kolone, a ne grid: u gridu je visina reda jednaka
            najvišoj kategoriji u njemu, pa kratka kategorija (npr. Čorbaluk sa
            jednom stavkom) ostavlja ogromnu rupu do sledećeg reda. Kolone
            slažu kategorije jednu ispod druge i same ih raspoređuju.
            `break-inside-avoid` čuva da se kategorija ne prelomi na pola. */}
        <div className="mx-auto mt-[clamp(2.5rem,6vw,6rem)] max-w-4xl md:columns-2 md:gap-x-[clamp(2.5rem,5vw,5rem)]">
          {/* Ključ je indeks, ne naziv: jelovnik ume da ima dva jela istog imena
              koja se razlikuju samo po sastavu (npr. dva „Kačamak od crvenog
              kukuruznog brašna“). Sa nazivom kao ključem React bi jedno od njih
              izostavio. Redosled dolazi iz admina i ne preuređuje se ovde. */}
          {courses.map((section, si) => (
            <div
              key={si}
              className="mb-[clamp(2.5rem,5vw,4rem)] break-inside-avoid last:mb-0"
            >
              {/* Course title - serif small-caps with a terracotta hairline. */}
              <h3 className="mb-[clamp(1rem,2.5vw,2rem)] flex items-center gap-4 text-[clamp(1rem,3.6vw,1.3rem)] uppercase tracking-[0.14em]">
                <span className="whitespace-nowrap">{cms.text(section.title)}</span>
                <span className="h-px flex-1 bg-[var(--main)]/40" />
              </h3>

              <ul className="flex flex-col gap-[clamp(1rem,2vw,1.6rem)]">
                {section.items.map((item, ii) => (
                  <li key={ii}>
                    <div className="flex items-baseline gap-3">
                      <span className="text-[clamp(15px,4vw,17.78px)] leading-snug">
                        {keepUnits(cms.text(item.name))}
                      </span>
                      {/* Dotted leader bridging name → price. */}
                      <span
                        aria-hidden
                        className="min-w-6 flex-1 translate-y-[-0.28em] border-b border-dotted border-[var(--border)]"
                      />
                      <span className="whitespace-nowrap text-[clamp(15px,4vw,17.78px)] tabular-nums text-[var(--main)]">
                        {fromApi ? cms.text(item.price) : `${item.price} ${menu.currency}`}
                      </span>
                    </div>
                    {item.desc && (
                      <p className="mt-[0.3rem] max-w-[42ch] text-[clamp(12.5px,3.2vw,14px)] leading-relaxed text-[var(--hint)]">
                        {keepUnits(cms.text(item.desc))}
                      </p>
                    )}
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
