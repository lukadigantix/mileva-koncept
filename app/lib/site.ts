/**
 * Shared, language-independent contact details.
 *
 * Ove vrednosti su podrazumevane — kad su odgovarajuća polja popunjena u admin
 * panelu (footer podešavanja), layout ih prepiše. Zato ovde treba da stoji ono
 * što je tačno i bez backenda.
 */

/** Telefon i adresa potvrđeni sa vlasnikom 2026-07-31. Mejl je i dalje
    pretpostavka po domenu — zameniti kad se potvrdi. */
export const EMAIL = "info@milevakoncept.rs";
export const PHONE_LABEL = "+381 66 651 01 01";
export const PHONE_HREF = "+381666510101";

/** Zvanični nalozi (provereni u browseru 2026-07-31). Facebook stranica je
    zavedena pod „Mileva Kocept" — slovna greška je na njihovoj strani. */
export const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/mileva_koncept/" },
  { label: "Facebook", href: "https://www.facebook.com/people/Mileva-Kocept/61576673416029/" },
];

/**
 * Podaci o objektu za strukturirane podatke (JSON-LD). Google ih koristi za
 * lokalne rezultate i mapu, pa moraju da se poklapaju sa Google Business
 * profilom kad ovaj bude napravljen.
 *
 * Koordinate su centar sela Grivac (Wikipedia) — zameniti tačnim položajem
 * imanja sa Google mape čim bude poznat.
 */
export const BUSINESS = {
  street: "Васе Пелагића 18",
  village: "Гривац",
  municipality: "Кнић",
  region: "Шумадијски округ",
  postalCode: "34205",
  country: "RS",
  latitude: 43.99917,
  longitude: 20.71361,
  /** Polazna cena noćenja iz javnog oglasa — potvrditi pre puštanja u rad. */
  priceRange: "€€",
} as const;
