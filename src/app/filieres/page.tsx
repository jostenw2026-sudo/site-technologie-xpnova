import type { Metadata } from 'next';
import { PageFilieres } from '@/components/FilierePages';

export const metadata: Metadata = { title: 'Entrer par filière — Référentiel Technologie XP-NOVA', description: "Les 29 filières AGROVITA et les sous-fonctions du référentiel RT-TECH que chacune mobilise." };

export default function FilieresPage() {
  return <PageFilieres lang="fr" />;
}
