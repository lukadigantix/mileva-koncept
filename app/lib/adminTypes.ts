/**
 * Tipovi entiteta koje admin uređuje, u obliku u kom ih backend vraća.
 * Odvojeni od adminApi.ts (koji je server-only) da bi tipovi bili bezbedni za
 * uvoz i u klijentskim komponentama.
 */

export interface SpecItem {
  key: string;
  value: string;
}

export interface Accommodation {
  id: string;
  title: string;
  description: string | null;
  rooms: number;
  capacity: number;
  status: "draft" | "published";
  images: string[] | null;
  specifications: SpecItem[] | null;
  amenities: string[] | null;
}
