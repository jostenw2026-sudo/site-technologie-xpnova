import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  cacheComponents: true,
  partialPrefetching: true,
  // Deux layouts racine ((fr) et (en)/en, <html lang> correct au rendu serveur) : la 404
  // des URL inconnues est src/app/global-not-found.tsx (même montage que le site Formation).
  experimental: {
    globalNotFound: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
