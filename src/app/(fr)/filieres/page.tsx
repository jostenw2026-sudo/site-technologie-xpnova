import type { Metadata } from 'next';
import { alternatesPour } from '@/lib/alternates';
import { PageFilieres } from '@/components/FilierePages';

export const metadata: Metadata = { alternates: alternatesPour('/filieres'), title: 'Entrer par filière — Référentiel TECHNOLOGIE XP-NOVA', description: "Les 29 filières AGROVITA et les sous-fonctions du référentiel RT-TECH que chacune mobilise." };

export default function FilieresPage() {
  return <PageFilieres lang="fr" />;
}
