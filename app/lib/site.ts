/**
 * Shared, language-independent contact details.
 *
 * Ove vrednosti su podrazumevane — kad su odgovarajuća polja popunjena u admin
 * panelu (footer podešavanja), layout ih prepiše. Zato ovde treba da stoji ono
 * što je tačno i bez backenda.
 */

/** Telefoni i adresa potvrđeni sa vlasnikom. Mejl je i dalje pretpostavka po
    domenu — zameniti kad se potvrdi. */
export const EMAIL = "info@milevakoncept.rs";

/**
 * Tri broja po nameni — svaki se javlja zasebno, pa se svuda prikazuju sa
 * oznakom čemu služe (natpisi su u rečniku, `contact.phones`).
 *
 * `main` je glavni broj: ide u strukturirane podatke (JSON-LD) i njega admin
 * panel može da prepiše kroz footer podešavanja; ostala dva su statična.
 */
export const PHONES = [
  { key: "main", label: "+381 66 651 01 01", href: "+381666510101" },
  { key: "pool", label: "+381 66 650 55 13", href: "+381666505513" },
  { key: "events", label: "+381 64 14 02 446", href: "+381641402446" },
] as const;

export type PhoneKey = (typeof PHONES)[number]["key"];

export const PHONE_LABEL = PHONES[0].label;
export const PHONE_HREF = PHONES[0].href;

/**
 * Kontakt za jahanje konja.
 *
 * Jahanje vodi partner (Horse Glogovac), pa ovaj broj NAMERNO nije u `PHONES` —
 * ne sme da se pojavi u futeru, meniju ni na kontakt stranici kao broj Mileve.
 * Stoji samo uz tu aktivnost, na stranici Događaji.
 */
export const RIDING = {
  phoneLabel: "+381 64 025 49 74",
  phoneHref: "+381640254974",
  /** Link je očišćen od utm/fbclid parametara iz deljene adrese. */
  url: "https://horseglogovacation.com/",
};

/**
 * Radno vreme po objektu — restoran i bazen rade po različitom rasporedu, pa se
 * svuda prikazuju odvojeno (natpisi su u rečniku, `contact.venues`).
 *
 * `from`/`to` su indeksi dana kao u backendu: 0 = ponedeljak … 6 = nedelja.
 * Restoran je glavni raspored — njega admin panel može da prepiše kroz radno
 * vreme i on ide u strukturirane podatke; bazen je statičan.
 */
export const OPENING_HOURS = [
  // Restoran radi utorak-nedelja 09-23; ponedeljak je neradan dan, pa se u
  // statičnoj liniji jednostavno ne pominje.
  { key: "restaurant", from: 1, to: 6, open: "09:00", close: "23:00" },
  { key: "pool", from: 1, to: 6, open: "10:00", close: "19:00" },
] as const;

export type VenueKey = (typeof OPENING_HOURS)[number]["key"];

/** Statični raspored restorana u obliku koji vraća backend — fallback za JSON-LD
    kad admin nije uneo svoje radno vreme. */
export const RESTAURANT_WORKING_DAYS = Array.from(
  { length: OPENING_HOURS[0].to - OPENING_HOURS[0].from + 1 },
  (_, i) => ({
    day: OPENING_HOURS[0].from + i,
    isOpen: true,
    openTime: OPENING_HOURS[0].open,
    closeTime: OPENING_HOURS[0].close,
  }),
);

/**
 * Podaci pravnog lica za politiku privatnosti (identitet rukovaoca, čl. 23
 * Zakona o zaštiti podataka o ličnosti).
 *
 * POPUNITI iz APR izvoda — dok su prazni, ti redovi se jednostavno ne
 * prikazuju, pa stranica ostaje ispravna i bez njih.
 */
export const LEGAL_ENTITY = {
  /** Pun poslovni naziv iz APR-a, npr. "Mileva Koncept d.o.o. Grivac". */
  name: "",
  /** PIB (9 cifara). */
  pib: "",
  /** Matični broj (8 cifara). */
  registrationNumber: "",
};

/** Potpis autora sajta u dnu futera. Naziv agencije se ne prevodi, pa stoji
    ovde a ne u rečniku — kao i nazivi društvenih mreža. */
export const CREDIT = {
  prefix: "Design & Developed by",
  name: "ZeroBlynk",
  href: "https://zeroblynk.com",
};

/** Zvanični nalozi (provereni u browseru 2026-07-31). Facebook stranica je
    zavedena pod „Mileva Kocept" — slovna greška je na njihovoj strani. */
export const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/mileva_koncept/" },
  { label: "Facebook", href: "https://www.facebook.com/people/Mileva-Kocept/61576673416029/" },
];

/** Google Maps link na zapis objekta („Милева Концепт"). Koristi se za red sa
    adresom, „Локација" baner i `hasMap` u strukturiranim podacima. */
export const MAP_URL = "https://maps.app.goo.gl/ydjWmS2D9Jb2qhX8A";

/**
 * Podaci o objektu za strukturirane podatke (JSON-LD). Google ih koristi za
 * lokalne rezultate i mapu, pa moraju da se poklapaju sa Google Business
 * profilom.
 *
 * Koordinate su tačan položaj imanja, očitan sa Google zapisa iz MAP_URL.
 */
export const BUSINESS = {
  street: "Васе Пелагића 18",
  village: "Гривац",
  municipality: "Кнић",
  region: "Шумадијски округ",
  postalCode: "34205",
  country: "RS",
  latitude: 44.0058353,
  longitude: 20.7040103,
  /** Polazna cena noćenja iz javnog oglasa — potvrditi pre puštanja u rad. */
  priceRange: "€€",
} as const;
