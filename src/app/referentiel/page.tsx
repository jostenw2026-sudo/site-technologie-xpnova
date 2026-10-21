import type { Metadata } from 'next';
import { PageReferentiel } from '@/components/ReferentielPages';

export const metadata: Metadata = {
  title: 'Référentiel des équipements — Technologie XP-NOVA',
  description:
    'Référentiel RT-TECH : 8 domaines, 50 sous-fonctions et 154 équipements types classés par fonction technique, avec les grandeurs à dimensionner, les risques au Cameroun et le cadre normatif.',
};

export default function ReferentielPage() {
  return <PageReferentiel lang="fr" />;
}
