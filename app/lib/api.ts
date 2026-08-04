// Tanki klijent za JAVNE rute Mileva Koncept backend API-ja (Express, :4000).
// Sve funkcije rade na serveru i vraćaju null kada backend nije dostupan ili
// vrati grešku, pa svaka stranica može da padne nazad na svoj statični sadržaj.

import type { Post } from "./blog";

const API_URL = process.env.API_URL ?? "http://localhost:4000/api";

/** Origin backend-a (bez /api) — za slike i statične fajlove (/uploads/…). */
export const API_ORIGIN = API_URL.replace(/\/api\/?$/, "");

/** Pun URL javne API rute — za linkove koji se otvaraju iz browsera (npr. GPX).
    Samo za server komponente: na klijentu env nije dostupan. */
export function apiUrl(path: string): string {
  return `${API_URL}${path}`;
}

/** Pretvara relativnu putanju slike (/uploads/…) u pun URL ka backend-u. */
export function mediaUrl(pathOrUrl: string | null | undefined): string {
  if (!pathOrUrl) return "";
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  return `${API_ORIGIN}${pathOrUrl}`;
}

/** Oblik odgovora backenda: { success, data } ili { success, message }. */
interface ApiEnvelope<T> {
  success: boolean;
  data?: T;
  message?: string;
}

/**
 * GET ka javnoj ruti. Keširano uz vremensku revalidaciju (podrazumevano 60s),
 * pa se izmene iz admin panela pojave na sajtu za najviše minut.
 */
async function get<T>(path: string, revalidate = 60): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, { next: { revalidate } });
    if (!res.ok) return null;
    const body = (await res.json()) as ApiEnvelope<T>;
    if (!body.success) return null;
    return body.data as T;
  } catch {
    return null;
  }
}

/** GET bez keša — za podatke koje ni minut zastarelosti ne sme da pokvari. */
async function getFresh<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
    if (!res.ok) return null;
    const body = (await res.json()) as ApiEnvelope<T>;
    if (!body.success) return null;
    return body.data as T;
  } catch {
    return null;
  }
}

/* ---------------------------- Digitalni meni ------------------------------ */

/**
 * Tipovi menija koje vodi admin panel:
 *   summer / winter — redovni jelovnik po sezoni (meseci se podešavaju u adminu)
 *   weekend         — vikend jelovnik, subotom i nedeljom
 *   drinks          — karta pića, ista tokom cele godine
 */
export type MenuType = "summer" | "winter" | "weekend" | "drinks";

export interface PublicMenuItem {
  id: string;
  categoryId: string;
  title: string;
  description: string | null;
  price: string | null;
  imageUrl: string | null;
  available: boolean;
  sortOrder: number;
}

export interface PublicMenuCategory {
  id: string;
  name: string;
  menuType: MenuType;
  sortOrder: number;
  items: PublicMenuItem[];
}

export interface PublicMenu {
  /** Koji je jelovnik backend izabrao za ovaj trenutak. */
  menuType: MenuType;
  /** Jelovnik: vikend ili sezonski, već prema danu i mesecu. */
  categories: PublicMenuCategory[];
  /** Karta pića — vraća se uvek, nezavisno od izabranog jelovnika. */
  drinks: PublicMenuCategory[];
}

/**
 * Aktuelni meni. Backend sam bira jelovnik prema danu u nedelji (vikend) i
 * mesecu (letnji/zimski), pa sajt ne mora da zna ni koji je dan ni koja sezona.
 */
export function getPublicMenu(): Promise<PublicMenu | null> {
  return get<PublicMenu>("/menu/public");
}

/* ---------------------------------- Blog ---------------------------------- */

export interface PublicBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  /** HTML iz Tiptap editora u admin panelu. */
  content: string | null;
  coverImage: string | null;
  tags: string[] | null;
  author: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  publishedAt: string | null;
  createdAt: string;
}

export function getBlogPosts(): Promise<PublicBlogPost[] | null> {
  return get<PublicBlogPost[]>("/blog/public");
}

export function getBlogPost(slug: string): Promise<PublicBlogPost | null> {
  return get<PublicBlogPost>(`/blog/public/${encodeURIComponent(slug)}`);
}

/* --------------------------- Rentiranje kvadova --------------------------- */

export interface PublicQuad {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  price: string | null;
  status: "available" | "maintenance";
}

export type QuadRouteDifficulty = "lako" | "srednje" | "tesko";

export interface PublicQuadRoute {
  id: string;
  name: string;
  description: string | null;
  /** [[lng, lat], ...] — nacrtano u adminu na mapi. */
  coordinates: [number, number][];
  distanceKm: number;
  difficulty: QuadRouteDifficulty | null;
  corridorMeters: number;
}

/** Javna lista dostupnih kvadova. */
export function getPublicQuads(): Promise<PublicQuad[] | null> {
  return get<PublicQuad[]>("/quads/public");
}

/** Javna lista aktivnih ruta, sa punim koordinatama. */
export function getPublicQuadRoutes(): Promise<PublicQuadRoute[] | null> {
  return get<PublicQuadRoute[]>("/quad-routes/public");
}

/* --------------------------- Footer i radno vreme -------------------------- */

export interface FooterSettings {
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  tiktokUrl: string;
  street: string;
  city: string;
  phone: string;
  email: string;
}

export interface WorkingDay {
  day: number; // 0 = ponedeljak … 6 = nedelja
  isOpen: boolean;
  openTime: string; // "08:00"
  closeTime: string; // "19:00"
}

export function getFooterSettings(): Promise<FooterSettings | null> {
  return get<FooterSettings>("/footer");
}

export function getWorkingHours(): Promise<WorkingDay[] | null> {
  return get<WorkingDay[]>("/working-hours");
}

/* ------------------------------- Rezervacije ------------------------------
   Javne rute (/reservations/public/*) — bez tokena i bez servisnog naloga.
   Backend je jedini vlasnik dostupnosti: on vraća zauzete termine za kalendar
   i on odbija preklapanje pri upisu, istom proverom koja važi i za admin panel.
   -------------------------------------------------------------------------- */

/**
 * Cena jednog noćenja za tačan broj osoba, u evrima — uređuje se u adminu.
 * Vikend je subota i nedelja; videti `lib/pricing.ts`.
 */
export interface RateRow {
  guests: number;
  weekday: number;
  weekend: number;
}

/** Objavljena smeštajna jedinica iz admin panela. */
export interface PublicAccommodation {
  id: string;
  title: string;
  description: string | null;
  rooms: number;
  capacity: number;
  images: string[] | null;
  /** Cenovnik; prazan niz znači da cena za ovu jedinicu nije uneta. */
  rates: RateRow[] | null;
}

/**
 * Javna lista objavljenog smeštaja (`/accommodations/public`).
 *
 * Sajt odavde sam saznaje koje jedinice postoje i u koju da upiše rezervaciju —
 * ranije se jedan UUID ručno upisivao u `ACCOMMODATION_ID`, pa je zaboravljen
 * env obarao ceo tok rezervacije na lokalni demo.
 */
export function getPublicAccommodations(): Promise<PublicAccommodation[] | null> {
  return getFresh<PublicAccommodation[]>("/accommodations/public");
}

/** Zauzet termin, bez ijednog podatka o gostu. `endDate` je dan odlaska. */
export interface BusyRange {
  startDate: string; // ISO YYYY-MM-DD
  endDate: string;
  /** Zauzeto je sve što nije otkazano — i zahtevi koji čekaju potvrdu. */
  status: "pending" | "confirmed";
}

/**
 * Zauzeti termini za jedan resurs. Nikad keširano: kalendar koji za minut
 * kasni ume da ponudi termin koji je upravo otišao, pa gost dobije 409.
 */
export function getBusyRanges(
  resourceId: string,
  from: string,
  to: string
): Promise<BusyRange[] | null> {
  if (!resourceId) return Promise.resolve(null);
  const q = new URLSearchParams({ resourceId, from, to });
  return getFresh<BusyRange[]>(`/reservations/public/zauzeti?${q}`);
}

export interface ReservationRequest {
  type?: "accommodation" | "quad" | "other";
  resourceId: string;
  guestName: string;
  guestEmail?: string;
  guestPhone?: string;
  guests?: number;
  startDate: string;
  endDate: string;
  note?: string;
}

export type ReservationResult =
  | { ok: true; id: string }
  /** conflict = termin je upravo otišao · rate = previše zahteva sa iste IP
      adrese · invalid = backend je odbio podatke · offline = API nedostupan. */
  | { ok: false; reason: "conflict" | "rate" | "invalid" | "offline" };

/**
 * Pošalji zahtev za rezervaciju. Ulazi kao `pending` i bez cene — potvrđuje ga
 * admin. Preklapanje termina backend vraća kao 409, pa je to jedina provera
 * dostupnosti koja se računa; ono što kalendar prikazuje je samo nagoveštaj.
 */
export async function submitReservation(
  input: ReservationRequest
): Promise<ReservationResult> {
  try {
    const res = await fetch(`${API_URL}/reservations/public`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Mamac za botove mora da stigne prazan — forma ga ne prikazuje.
      body: JSON.stringify({ type: "accommodation", website: "", ...input }),
      cache: "no-store",
    });
    if (res.status === 409) return { ok: false, reason: "conflict" };
    if (res.status === 429) return { ok: false, reason: "rate" };
    const body = (await res.json().catch(() => null)) as ApiEnvelope<{
      id: string;
    }> | null;
    if (!res.ok || !body?.success || !body.data) {
      return { ok: false, reason: "invalid" };
    }
    return { ok: true, id: body.data.id };
  } catch {
    return { ok: false, reason: "offline" };
  }
}

/* ------------------------------ Znamenitosti ------------------------------
   Backend ima i /landmarks/public, ali sajt ga NE koristi: znamenitosti Knića
   i Gruže se ne menjaju, pa /znamenitosti živi na statičnom sadržaju iz rečnika
   i fotografijama u public/znamenitosti/.
   -------------------------------------------------------------------------- */

/* -------------------------------- Događaji -------------------------------- */

export interface PublicEvent {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  /** HTML iz Tiptap editora u admin panelu. */
  description: string | null;
  coverImage: string | null;
  startDate: string; // ISO YYYY-MM-DD
  startTime: string | null;
  endDate: string | null;
  location: string | null;
  tags: string[] | null;
}

export function getPublicEvents(): Promise<PublicEvent[] | null> {
  return get<PublicEvent[]>("/events/public");
}

/** Procena minuta čitanja iz HTML tela (~200 reči u minuti). */
function readMinutes(html: string): number {
  const words = html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/**
 * Prevodi API post u oblik koji blog komponente već renderuju. Sadržaj iz
 * admina je jednojezičan, pa sva tri jezika dele isti tekst; telo je jedan
 * "html" blok (Tiptap HTML) umesto strukturiranih blokova.
 */
export function adaptBlogPost(p: PublicBlogPost): Post {
  const locale = {
    category: p.tags?.[0] ?? "Blog",
    title: p.title,
    excerpt: p.excerpt ?? "",
    body: [{ type: "html" as const, html: p.content ?? "" }],
  };
  return {
    slug: p.slug,
    image: mediaUrl(p.coverImage) || "/pocetna/midhero@3x.webp",
    date: p.publishedAt ?? p.createdAt,
    readMinutes: readMinutes(p.content ?? ""),
    content: { "sr-cyrl": locale, "sr-latn": locale, en: locale },
  };
}
