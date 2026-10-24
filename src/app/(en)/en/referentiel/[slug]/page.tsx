import type { Metadata } from 'next';
import { alternatesPour } from '@/lib/alternates';
import { notFound } from 'next/navigation';
import { PageSousFonction } from '@/components/ReferentielPages';
import { getSousFonction, getSousFonctions, nomTitreSousFonction } from '@/lib/referentiel';

export function generateStaticParams() {
  return getSousFonctions('en').map((sf) => ({ slug: sf.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const res = getSousFonction(slug, 'en');
  if (!res) return {};
  return {
    // Canonical et hreflang : fiche équivalente appariée par code (src/lib/alternates.ts).
    alternates: alternatesPour(`/en/referentiel/${slug}`),
    title: `${nomTitreSousFonction(res.domaine, res.sf, 'en')} — Technology XP-NOVA`,
    description: `${res.domaine.nom}: ${res.sf.equipements.map((e) => e.nom).join(', ')}. ${res.sf.grandeurs}.`,
  };
}

export default async function SousFonctionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getSousFonction(slug, 'en')) notFound();
  return <PageSousFonction slug={slug} lang="en" />;
}
