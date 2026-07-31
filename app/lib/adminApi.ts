// Server-only klijent za rute backend API-ja koje traže ADMIN token (upis
// rezervacija, čitanje smeštaja). Prijavljuje se kao servisni nalog sajta —
// kredencijali žive isključivo u env varijablama servera (SITE_API_EMAIL /
// SITE_API_PASSWORD iz .env.local) i nikada ne stižu do browsera. Uvoziti SAMO
// iz Server Actions / server komponenti.
//
// Sve funkcije su otporne na kvar: bez podešenog naloga ili sa nedostupnim
// backendom vraćaju false/null, a pozivaoci nastave lokalnim tokom — gost na
// sajtu nikada ne dobije grešku zbog integracije.

import type { Accommodation } from "./adminTypes";

const API_URL = process.env.API_URL ?? "http://localhost:4000/api";
const SERVICE_EMAIL = process.env.SITE_API_EMAIL;
const SERVICE_PASSWORD = process.env.SITE_API_PASSWORD;

/** Keširan access token servisnog naloga (backend ga izdaje na 15 min). */
let cached: { token: string; at: number } | null = null;
const TOKEN_TTL_MS = 10 * 60 * 1000;

async function login(): Promise<string | null> {
  if (!SERVICE_EMAIL || !SERVICE_PASSWORD) return null;
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: SERVICE_EMAIL, password: SERVICE_PASSWORD }),
      cache: "no-store",
    });
    const body = await res.json().catch(() => null);
    if (!res.ok || !body?.success) return null;
    return body.data.accessToken as string;
  } catch {
    return null;
  }
}

async function serviceToken(fresh: boolean): Promise<string | null> {
  if (!fresh && cached && Date.now() - cached.at < TOKEN_TTL_MS) return cached.token;
  const token = await login();
  cached = token ? { token, at: Date.now() } : null;
  return token;
}

/** GET/POST na admin rutu; na 401/403 pokuša još jednom sa svežim tokenom. */
async function serviceFetch(path: string, init?: RequestInit): Promise<Response | null> {
  for (const fresh of [false, true]) {
    const token = await serviceToken(fresh);
    if (!token) return null;
    try {
      const res = await fetch(`${API_URL}${path}`, {
        ...init,
        headers: {
          "Content-Type": "application/json",
          ...(init?.headers ?? {}),
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });
      if (res.status === 401 || res.status === 403) continue;
      return res;
    } catch {
      return null;
    }
  }
  return null;
}

/* ------------------------------ Rezervacije ------------------------------- */

export type SiteReservation = {
  type: "accommodation" | "other";
  resourceName: string;
  guestName: string;
  guestEmail?: string;
  guestPhone?: string;
  guests?: number;
  startDate: string;
  endDate: string;
  price?: string;
  note?: string;
};

/**
 * Upiše rezervaciju sa sajta u admin (status pending — admin je potvrđuje).
 * Vraća true kada je upis prošao.
 */
export async function createSiteReservation(payload: SiteReservation): Promise<boolean> {
  const res = await serviceFetch("/reservations", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (!res) return false;
  const body = await res.json().catch(() => null);
  return Boolean(res.ok && body?.success);
}

/* -------------------------------- Smeštaj --------------------------------- */

/**
 * Objavljene smeštajne jedinice iz admina (ruta je admin-only, pa ide preko
 * servisnog naloga). null → nalog nije podešen ili je backend nedostupan.
 */
export async function fetchPublishedAccommodations(): Promise<Accommodation[] | null> {
  const res = await serviceFetch("/accommodations?status=published");
  if (!res || !res.ok) return null;
  const body = await res.json().catch(() => null);
  return body?.success ? (body.data as Accommodation[]) : null;
}
