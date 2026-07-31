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

/** Kategorije čije ime sadrži "pić" idu na kartu pića, ostale u jelovnik —
    backend vodi JEDAN digitalni meni, a sajt ga prikazuje kao dva borda. */
function isDrinkCategory(name: string): boolean {
  const n = name.toLowerCase();
  return n.includes("pić") || n.includes("пић");
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
  const menu = await getPublicMenu();
  const categories = menu?.categories ?? [];
  const foodSections = toBoardSections(categories.filter((c) => !isDrinkCategory(c.name)));
  const drinkSections = toBoardSections(categories.filter((c) => isDrinkCategory(c.name)));

  return (
    <>
      <Navigation />
      <main>
        <Hero variant="restaurant" />
        <RestaurantIntro />
        <RestaurantSlowFood />
        <RestaurantConcept />
        <Menus />
        <MenuBoard source="menuList" sections={foodSections.length ? foodSections : undefined} />
        <MenuBoard source="drinksList" sections={drinkSections.length ? drinkSections : undefined} />
      </main>
      <Footer />
    </>
  );
}
