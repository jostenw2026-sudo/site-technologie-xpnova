import type { Metadata } from 'next';
import { alternatesPour } from '@/lib/alternates';

// La page est un composant client (formulaire) : ses liens canonical et hreflang vivent ici.
// Canonical sans paramètres : couvre aussi les liens du référentiel /en/contact?prestation=…
// Titre et description : ceux du layout racine (inchangés).
export const metadata: Metadata = { alternates: alternatesPour('/en/contact') };

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
