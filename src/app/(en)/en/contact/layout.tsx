import type { Metadata } from 'next';
import { alternatesPour } from '@/lib/alternates';

// La page est un composant client (formulaire) : ses liens canonical et hreflang vivent ici.
// Canonical sans paramètres : couvre aussi les liens du référentiel /en/contact?prestation=…
// Titre et description : traduction de ceux de la page française (tableau de référencement
// validé par la direction le 24/10/2026).
export const metadata: Metadata = {
  alternates: alternatesPour('/en/contact'),
  title: 'Contact — Technology XP-NOVA',
  description:
    'A technical equipment project? Contact the Technology division of XP-NOVA in Yaoundé: form, WhatsApp or phone.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
