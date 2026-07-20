import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF where supported (best compression), WebP as fallback.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
