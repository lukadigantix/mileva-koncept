"use server";

import { headers } from "next/headers";

/**
 * Server Action kontakt forme. Poruka ide na javnu rutu backenda
 * (`POST /api/contact`), koja je upisuje u bazu i šalje mejl na adresu iz
 * podešavanja; ako SMTP nije podešen, poruka svejedno ostaje u admin panelu.
 *
 * Radi na serveru da `API_URL` ostane van browsera — zato se pravi IP posetioca
 * prosleđuje ručno, inače bi backend video samo adresu Next servera i svih pet
 * poruka na sat (njegovo ograničenje) delilo bi se na sve goste.
 */
const API_URL = process.env.API_URL ?? "http://localhost:4000/api";

export type ContactState =
  | { status: "idle" }
  | { status: "error"; reason: "invalid" | "rate" | "failed" }
  | { status: "success" };

/** Backend traži ime, imejl i poruku; ostalo je opciono. */
function isFilled(name: string, email: string, message: string): boolean {
  return Boolean(name && message && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
}

export async function sendMessage(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  // Mamac za botove - polje je sakriveno CSS-om, pa ga popune samo skripte.
  // Prosleđuje se backendu, koji takvu poruku tiho odbaci. U formi se zove
  // `mk_hp` (vidi ContactDetails) da ga autofill ne bi popunio pravom gostu;
  // ka backendu ide pod starim imenom, pa API ugovor ostaje netaknut.
  const website = String(formData.get("mk_hp") ?? "");

  if (!isFilled(name, email, message)) return { status: "error", reason: "invalid" };

  const forwarded = (await headers()).get("x-forwarded-for");

  try {
    const res = await fetch(`${API_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(forwarded ? { "x-forwarded-for": forwarded } : {}),
      },
      body: JSON.stringify({
        name,
        email,
        subject: subject || undefined,
        message,
        website,
      }),
      cache: "no-store",
    });

    if (res.status === 429) return { status: "error", reason: "rate" };

    const body = (await res.json().catch(() => null)) as { success?: boolean } | null;
    if (!res.ok || !body?.success) return { status: "error", reason: "failed" };

    return { status: "success" };
  } catch {
    return { status: "error", reason: "failed" };
  }
}
