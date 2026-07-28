// Tanki klijent za JAVNE rute Mileva Koncept backend API-ja (Express, :4000).
// Sve funkcije rade na serveru i vraćaju null kada backend nije dostupan ili
// vrati grešku, pa svaka stranica može da padne nazad na svoj statični sadržaj.

import type { Post } from "./blog";

const API_URL = process.env.API_URL ?? "http://localhost:4000/api";

/** Origin backend-a (bez /api) — za slike i statične fajlove (/uploads/…). */
export const API_ORIGIN = API_URL.replace(/\/api\/?$/, "");

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

/* ---------------------------- Digitalni meni ------------------------------ */

export type MenuType = "regular" | "weekend";

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
  menuType: MenuType;
  categories: PublicMenuCategory[];
}

/** Aktuelni meni — backend sam bira vikend ili redovni prema danu u nedelji. */
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

/* ------------------------------ Znamenitosti ------------------------------ */

export interface PublicLandmark {
  id: string;
  title: string;
  description: string | null;
  lat: number;
  lng: number;
  category: string | null;
  images: string[] | null;
}

export function getPublicLandmarks(): Promise<PublicLandmark[] | null> {
  return get<PublicLandmark[]>("/landmarks/public");
}

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
    image: mediaUrl(p.coverImage) || "/pocetna/midhero.webp",
    date: p.publishedAt ?? p.createdAt,
    readMinutes: readMinutes(p.content ?? ""),
    content: { "sr-cyrl": locale, "sr-latn": locale, en: locale },
  };
}
