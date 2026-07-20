import type { Metadata } from "next";
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import RestaurantIntro from "../components/RestaurantIntro";
import RestaurantSlowFood from "../components/RestaurantSlowFood";
import RestaurantConcept from "../components/RestaurantConcept";
import Menus from "../components/Menus";
import MenuBoard from "../components/MenuBoard";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Ресторан - Милева концепт",
  description:
    "Ресторан одмаралишта Милева концепт - ватра, укус и гостопримство у срцу Шумадије.",
};

/**
 * Restaurant page. Shares the site chrome (Navigation + Footer) and reuses the
 * home hero shell via `variant="restaurant"`, which keeps the same looping
 * video but swaps in the restaurant copy + a terracotta eyebrow. The menu and
 * further sections will be built out below the hero from here.
 */
export default function RestoranPage() {
  return (
    <>
      <Navigation />
      <main>
        <Hero variant="restaurant" />
        <RestaurantIntro />
        <RestaurantSlowFood />
        <RestaurantConcept />
        <Menus />
        <MenuBoard source="menuList" />
        <MenuBoard source="drinksList" />
      </main>
      <Footer />
    </>
  );
}
