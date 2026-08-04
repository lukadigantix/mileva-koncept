import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";
import { langFromSegment } from "../../i18n/routing";
import Navigation from "../../components/Navigation";
import LegalDocument from "../../components/LegalDocument";
import Footer from "../../components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return pageMetadata(langFromSegment(lang), "kolacici", "/politika-kolacica");
}

/**
 * Politika kolačića — po Zakonu o elektronskim komunikacijama („Sl. glasnik RS",
 * br. 35/2023) i, za kolačiće koji nose podatak o ličnosti, Zakonu o zaštiti
 * podataka o ličnosti.
 *
 * Sajt nema nijedan kolačić za praćenje, pa nema ni traku za pristanak; sadržaj
 * je u `i18n/legal.ts` (COOKIES) i mora da se izmeni ako se ikada doda
 * analitika, piksel ili ugrađeni sadržaj.
 */
export default function PolitikaKolacicaPage() {
  return (
    <>
      <Navigation />
      <main>
        <LegalDocument doc="cookies" />
      </main>
      <Footer />
    </>
  );
}
