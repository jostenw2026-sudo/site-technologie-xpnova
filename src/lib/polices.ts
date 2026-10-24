import localFont from "next/font/local";

// Polices de la charte A, auto-hébergées (mêmes fichiers WOFF2 que le portail) : Arial abandonné.
// Déclarées une seule fois, lues par les deux layouts racine (src/app/(fr)/layout.tsx et
// src/app/(en)/en/layout.tsx) et par src/app/global-not-found.tsx : next/font les dédoublonne.
export const sourceSans = localFont({ src: "../app/fonts/SourceSans3.woff2", weight: "200 900", display: "swap", variable: "--font-source-sans" });
export const playfair = localFont({ src: "../app/fonts/PlayfairDisplay.woff2", weight: "400 900", display: "swap", variable: "--font-playfair" });
