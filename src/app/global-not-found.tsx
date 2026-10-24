import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { sourceSans, playfair } from "@/lib/polices";
import { Analytics } from "@/components/Analytics";

// Page 404 de tout le site (URL qui ne correspond à aucune route).
// Depuis le passage à deux layouts racine — (fr) et (en)/en, comme le site Formation —
// il n'y a plus de layout unique pour composer une 404 : Next sert ce fichier tel quel
// (experimental.globalNotFound, next.config.ts), en 404 ; Next y pose lui-même
// <meta name="robots" content="noindex">. Bilingue, langue par défaut : français.
// Mêmes textes que la 404 du site Formation.

export const metadata: Metadata = {
  title: "Page introuvable — Page not found — XP-NOVA",
};

export default function GlobalNotFound() {
  return (
    <html lang="fr" className={`${sourceSans.variable} ${playfair.variable}`}>
      <body className="min-h-full flex flex-col">
        <main className="flex-1 py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#3D5A73]">Erreur 404</p>
            <h1 className="text-4xl font-bold text-[#0D1F5C] mt-3 mb-4">Page introuvable</h1>
            <p className="text-lg text-[#5A6072] mb-6">
              La page demandée n’existe pas ou a été déplacée.
            </p>
            <Link href="/" className="inline-block rounded bg-[#0D1F5C] px-5 py-3 font-bold text-white no-underline">
              Retour à l’accueil
            </Link>
            <div lang="en" className="mt-12 border-t border-[#D4A017] pt-8">
              <h2 className="text-2xl font-bold text-[#0D1F5C] mb-3">Page not found</h2>
              <p className="text-[#5A6072] mb-6">The page you requested does not exist or has been moved.</p>
              <Link href="/en" className="inline-block rounded border border-[#0D1F5C] px-5 py-3 font-bold text-[#0D1F5C] no-underline">
                Back to the English home page
              </Link>
            </div>
          </div>
        </main>
        {/* Mesure d'audience GA4, comme sur la 404 de l'ancien layout racine unique. */}
        <Analytics />
      </body>
    </html>
  );
}
