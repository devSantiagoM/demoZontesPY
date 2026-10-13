import type { NextConfig } from "next";

// Exportación estática: `npm run build` genera `out/`, lista para Vercel, Netlify o cualquier hosting estático.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
