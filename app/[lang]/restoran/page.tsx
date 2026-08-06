import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";
import { langFromSegment } from "../../i18n/routing";
import Navigation from "../../components/Navigation";
import Hero from "../../components/Hero";
import RestaurantIntro from "../../components/RestaurantIntro";
import RestaurantSlowFood from "../../components/RestaurantSlowFood";
import RestaurantConcept from "../../components/RestaurantConcept";
import Menus from "../../components/Menus";
import MenuBoard, { type BoardSection } from "../../components/MenuBoard";
import Footer from "../../components/Footer";
import { getPublicMenu, type PublicMenuCategory } from "../../lib/api";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return pageMetadata(langFromSegment(lang), "restoran", "/restoran");
}

function toBoardSections(categories: PublicMenuCategory[]): BoardSection[] {
  return categories
    .map((c) => ({
      title: c.name,
      items: c.items
        .filter((i) => i.available)
        .map((i) => ({ name: i.title, desc: i.description ?? "", price: i.price ?? "" })),
    }))
    .filter((s) => s.items.length > 0);
}

/**
 * Restaurant page. Shares the site chrome (Navigation + Footer) and reuses the
 * home hero shell via `variant="restaurant"`, which keeps the same looping
 * video but swaps in the restaurant copy + a terracotta eyebrow. The menu and
 * further sections will be built out below the hero from here.
 *
 * The à la carte boards pull the digital menu from the backend (the endpoint
 * itself serves the weekend menu on weekends); when the API is unreachable the
 * boards fall back to the static dictionary content.
 */
export default async function RestoranPage() {
  // Backend vraća jelovnik i kartu pića razdvojeno: koji je jelovnik na redu
  // (vikend / letnji / zimski) odlučuje on, prema danu i mesecu.
  const menu = await getPublicMenu();
  // `null` znači da backend nije odgovorio - tada tablama ne prosleđujemo ništa
  // pa one padaju na statični rečnik. Ako je odgovorio, prosleđujemo tačno ono
  // što je rekao, pa i praznu listu: tabla se tada ne prikazuje umesto da
  // izmisli stavke i cene kojih u adminu nema.
  const foodSections = menu ? toBoardSections(menu.categories) : undefined;
  const drinkSections = menu ? toBoardSections(menu.drinks) : undefined;

  return (
    <>
      <Navigation />
      <main>
        <Hero
          variant="restaurant"
          hasMenu={foodSections?.length !== 0}
          hasDrinks={drinkSections?.length !== 0}
        />
        <RestaurantIntro />
        <RestaurantSlowFood />
        <RestaurantConcept />
        <Menus />
        <MenuBoard source="menuList" sections={foodSections} />
        <MenuBoard source="drinksList" sections={drinkSections} />
      </main>
      <Footer />
    </>
  );
}
