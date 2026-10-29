import BoutonWhatsApp from '@/components/BoutonWhatsApp';
import type { Metadata } from "next";
import { UtilityBar } from "@/components/shared/UtilityBar";
import { DivisionBadge } from "@/components/shared/DivisionBadge";
import { SharedNavigation } from "@/components/shared/SharedNavigation";
import Footer from "@/components/Footer";
import "../globals.css";
import { URL_SITES } from "@/lib/sites";
import BandeauRecette from "@/components/BandeauRecette";
import { Analytics } from "@/components/Analytics";
import { JsonLd, organisationLd } from "@/components/JsonLd";
import { URL_PRODUCTION } from "@/lib/indexation";
import { PAIRES_FICHES } from "@/lib/alternates";
import { sourceSans, playfair } from "@/lib/polices";

// Layout racine des pages françaises (groupe (fr), sans effet sur les URL).
// Les pages anglaises ont le leur : src/app/(en)/en/layout.tsx, <html lang="en">
// (deux layouts racine, comme le site Formation : lang correct dès le rendu serveur).

// Indexation : gérée par src/proxy.ts (en-tête X-Robots-Tag hors production).

export const metadata: Metadata = {
  metadataBase: new URL(URL_PRODUCTION),
  title: "TECHNOLOGIE — Ingénierie des équipements et systèmes techniques — XP-NOVA",
  description: "Ingénierie mécanisation, irrigation, transformation, stockage, froid, énergie, manutention et équipements numériques pour projets agro-systémiques au Cameroun et en Afrique centrale.",
  // Partage social. og:title et og:description : ceux de la page, repris par Next ;
  // url « ./ » : l'adresse de la page (= sa canonical) ; image : opengraph-image.tsx
  // de ce dossier. Aucune page ne doit redéfinir openGraph : l'objet entier serait
  // remplacé, image comprise.
  openGraph: { type: "website", url: "./", locale: "fr_FR", alternateLocale: "en_GB" },
};

const divisions = [
  {
    key: 'agrovita',
    name: 'AGROVITA',
    url: URL_SITES.agrovita,
    accentColor: '#2E7D32',
  },
  {
    key: 'odt',
    name: 'ODT',
    url: URL_SITES.odt,
    accentColor: '#0E4C5A',
  },
  {
    key: 'technologie',
    name: 'TECHNOLOGIE',
    url: URL_SITES.technologie,
    accentColor: '#3D5A73',
  },
  {
    key: 'formation',
    name: 'FORMATION',
    url: URL_SITES.formation,
    accentColor: '#B4470F',
  },
];

const navItems = [
  { label: 'Accueil', href: '/' },
  { label: 'Domaines', href: '/domaines' },
  { label: 'Services', href: '/services' },
  { label: 'Référentiel', href: '/referentiel' },
  { label: 'Cycle de vie', href: '/cycle-de-vie' },
  { label: 'Références', href: '/references' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'À propos', href: '/a-propos' },
  { label: 'Contact', href: '/contact' },
];

export default function FrenchRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${sourceSans.variable} ${playfair.variable}`}>
      <body className="min-h-full flex flex-col">
        {/* Données structurées : la division, rattachée à l'organisation du groupe */}
        <JsonLd data={organisationLd('fr')} />
        {/* Recette locale : bandeau rendu seulement si SITE_ENV=recette */}
        <BandeauRecette />
        {/* Barre du groupe + navigation : un seul bloc collant (demande du DG, 20/10/2026) */}
        <div className="sticky top-0 z-50">
          <UtilityBar divisions={divisions} siteUrl={URL_SITES.portail} currentKey="technologie" fiches={PAIRES_FICHES} />
          <SharedNavigation
            items={navItems}
            logoSrc="/brand/logo_xpnova_color.png"
            logoAlt="XP-NOVA"
            logoHref="/"
          />
        </div>
        <DivisionBadge divisionName="TECHNOLOGIE" />
        <main className="flex-1">{children}</main>
        <BoutonWhatsApp lang="fr" />
        <Footer />
        {/* Mesure d'audience GA4 (FR) : inactive sans NEXT_PUBLIC_GA_MEASUREMENT_ID, hors production. */}
        <Analytics />
      </body>
    </html>
  );
}
