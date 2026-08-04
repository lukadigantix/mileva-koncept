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
  return pageMetadata(langFromSegment(lang), "privatnost", "/politika-privatnosti");
}

/**
 * Politika privatnosti — obaveštenje o obradi podataka o ličnosti po Zakonu o
 * zaštiti podataka o ličnosti („Sl. glasnik RS", br. 87/2018).
 *
 * Bez heroja i bez slika: pravni tekst treba da se čita, pa stranica deli samo
 * zaglavlje i podnožje sa ostatkom sajta. Sadržaj je u `i18n/legal.ts` (PRIVACY),
 * a sekcija o kolačićima upućuje na zasebnu politiku kolačića.
 */
export default function PolitikaPrivatnostiPage() {
  return (
    <>
      <Navigation />
      <main>
        <LegalDocument doc="privacy" />
      </main>
      <Footer />
    </>
  );
}
