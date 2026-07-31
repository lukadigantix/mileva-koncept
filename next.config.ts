import type { NextConfig } from "next";

/**
 * Origin backenda (bez `/api`) — odatle stižu slike koje admin panel otprema u
 * `/uploads/…`. Izvodi se iz iste `API_URL` varijable koju koristi `lib/api.ts`,
 * pa dev tunel, staging i produkcija rade bez ručnog dopisivanja hostova ovde.
 */
const API_ORIGIN = (process.env.API_URL ?? "http://localhost:4000/api").replace(
  /\/api\/?$/,
  ""
);

/** `/uploads/**` sa backend origina; neispravan URL u env-u ne obara build. */
function backendImagePattern(): URL[] {
  try {
    return [new URL(`${API_ORIGIN}/uploads/**`)];
  } catch {
    return [];
  }
}

// PRED PUŠTANJE U RAD: obrisati. Seed objave bloga u bazi još nose naslovne
// slike sa picsum.photos; bez ovog unosa optimizator vraća 400 i korice pucaju.
// Kada u adminu stoje prave fotografije, ovaj red više ne treba.
const DEMO_SEED_IMAGES = [new URL("https://picsum.photos/**")];

const nextConfig: NextConfig = {
  // cPanel nema Vercel-ov build — aplikacija se gradi lokalno i na server ide
  // gotov paket. `standalone` u `.next/standalone/` sklopi minimalni Node
  // server sa SAMO onim modulima koje rute stvarno koriste, pa na hostingu ne
  // mora da se vrti `npm install` (koji na deljenom hostingu ume da padne zbog
  // memorije). Fajlovi koje taj server ne kopira sam — `public/` i
  // `.next/static/` — dodaju se u `postbuild` koraku iz package.json.
  output: "standalone",

  // U kućnom direktorijumu stoji nevezan package-lock.json, pa bi Turbopack sam
  // izabrao njega za koren projekta i tražio module izvan repoa.
  turbopack: { root: process.cwd() },

  // Isti razlog i za praćenje zavisnosti (`output file tracing`): bez ovoga bi
  // koren mogao da odluta iznad projekta i u `standalone` uvuče tuđe fajlove.
  outputFileTracingRoot: process.cwd(),

  images: {
    // cPanel deljeni hosting nema `sharp`, a i kad bi ga imao — build se radi na
    // macOS-u, pa bi u `standalone` završile darwin-arm64 binarne datoteke koje
    // na Linux serveru ne rade. Zato optimizator ostaje isključen: `next/image`
    // servira originalne fajlove, a oni su već `.webp` (`public/`) odnosno ono
    // što admin otpremi na backend.
    //
    // VAŽNO: dok je ovo `true`, sve ispod (`formats`, `remotePatterns`) miruje —
    // stoji samo da bi se optimizacija vratila jednom linijom ako sajt ikada
    // pređe na hosting sa `sharp`-om.
    unoptimized: true,

    // Serve AVIF where supported (best compression), WebP as fallback.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [...backendImagePattern(), ...DEMO_SEED_IMAGES],
  },
};

export default nextConfig;
