import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF where supported (best compression), WebP as fallback.
    formats: ["image/avif", "image/webp"],
    // Slike sa backend API-ja (/uploads/…) — admin panel ih tamo otprema.
    // picsum.photos je privremeno, za seed/demo podatke iz backenda.
    remotePatterns: [
      { protocol: "http", hostname: "localhost", port: "4000", pathname: "/uploads/**" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
