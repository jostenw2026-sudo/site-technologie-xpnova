import type { Metadata } from "next";
import { UtilityBar } from "@/components/shared/UtilityBar";
import { DivisionBadge } from "@/components/shared/DivisionBadge";
import { SharedNavigation } from "@/components/shared/SharedNavigation";
import Footer from "@/components/Footer";
import "../globals.css";
import { URL_SITES } from "@/lib/sites";

// Indexation : gérée par src/proxy.ts (en-tête X-Robots-Tag hors production).

export const metadata: Metadata = {
  title: "Technology — Equipment & Technical Systems Engineering — XP-NOVA",
  description: "Engineering for mechanization, irrigation, processing, storage, cold chain, energy, handling and digital equipment for agro-systemic projects in Cameroon and Central Africa.",
};

const divisions = [
  {
    key: 'agrovita',
    name: 'AGROVITA',
    url: URL_SITES.agrovita,
    accentColor: '#22C55E',
  },
  {
    key: 'odt',
    name: 'ODT',
    url: URL_SITES.odt,
    accentColor: '#00289A',
  },
  {
    key: 'technologie',
    name: 'Technology',
    url: URL_SITES.technologie,
    accentColor: '#D4A017',
  },
  {
    key: 'formation',
    name: 'Training',
    url: URL_SITES.formation,
    accentColor: '#F97316',
  },
];

const navItems = [
  { label: 'Home', href: '/en' },
  { label: 'Domains', href: '/en/domaines' },
  { label: 'Services', href: '/en/services' },
  { label: 'Life Cycle', href: '/en/cycle-de-vie' },
  { label: 'References', href: '/en/references' },
  { label: 'About', href: '/en/a-propos' },
  { label: 'Contact', href: '/en/contact' },
];

export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        {/* Bandeau + navigation collés en haut de l'écran au scroll */}
        <div className="sticky top-0 z-50">
          <UtilityBar
            divisions={divisions}
            siteUrl={URL_SITES.portail}
            currentKey="technologie"
            currentLang="en"
          />
          <SharedNavigation
            items={navItems}
            logoSrc="/brand/logo_xpnova_color.png"
            logoAlt="XP-NOVA"
            logoHref="/en"
          />
        </div>
        <DivisionBadge divisionName="Technology" />
        <main className="flex-1">{children}</main>
        <Footer lang="en" />
      </body>
    </html>
  );
}
