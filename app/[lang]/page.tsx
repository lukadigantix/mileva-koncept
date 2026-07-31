import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import History from "../components/History";
import Profile from "../components/Profile";
import MediaBlock from "../components/MediaBlock";
import Restaurants from "../components/Restaurants";
import Featured from "../components/Featured";
import Footer from "../components/Footer";

/**
 * Home page - header, sidebar, hero, two dynamic media blocks, restaurants,
 * featured and footer.
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
