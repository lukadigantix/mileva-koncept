import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEFAULT_SEGMENT, SEGMENTS } from "./app/i18n/routing";

/**
 * Jezik živi u putanji (`/sr`, `/sr-latn`, `/en`), pa go zahtev bez prefiksa
 * treba negde da se prizemlji. Sve takve putanje idu na podrazumevani jezik.
 *
 * Namerno BEZ pogađanja jezika iz `Accept-Language` zaglavlja: Google savetuje
 * protiv automatskog preusmeravanja po jeziku jer robot najčešće dolazi sa
 * `en-US` i tako bi video samo englesku verziju. Posetilac jezik bira sam, u
 * prekidaču u zaglavlju, a sve tri verzije su povezane `hreflang` oznakama.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = SEGMENTS.some(
    (seg) => pathname === `/${seg}` || pathname.startsWith(`/${seg}/`)
  );
  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_SEGMENT}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Preskače Next-ovu internu statiku i SVE putanje sa ekstenzijom. Ovo drugo
  // je bitno: fascikle u `public/` nose ista imena kao rute (`/smestaj/s1.webp`,
  // `/bazen/bazen.mp4`), pa bi ih preusmerenje odvelo na nepostojeći URL.
  // Istim pravilom ispadaju i `robots.txt`, `sitemap.xml` i OG slika.
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
