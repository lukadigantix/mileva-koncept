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
  // U kućnom direktorijumu stoji nevezan package-lock.json, pa bi Turbopack sam
  // izabrao njega za koren projekta i tražio module izvan repoa.
  turbopack: { root: process.cwd() },
  images: {
    // Serve AVIF where supported (best compression), WebP as fallback.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [...backendImagePattern(), ...DEMO_SEED_IMAGES],
  },
};

export default nextConfig;
