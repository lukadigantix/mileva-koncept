import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import History from "./components/History";
import Profile from "./components/Profile";
import MediaBlock from "./components/MediaBlock";
import Restaurants from "./components/Restaurants";
import Featured from "./components/Featured";
import Footer from "./components/Footer";

/**
 * Akaneya home page - 8 top-level components mirroring the reference document
 * structure (analysis §4): header, sidebar, hero, dynamic ×2, restaurants,
 * featured, footer.
 */
export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <History />
        <Profile />
        <MediaBlock />
        <Restaurants />
        <Featured />
      </main>
      <Footer />
    </>
  );
}
