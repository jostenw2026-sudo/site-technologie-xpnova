import type { Metadata } from 'next';
import { alternatesPour } from '@/lib/alternates';
import { notFound } from 'next/navigation';
import { PageSousFonction } from '@/components/ReferentielPages';
import { descriptionSousFonction, getSousFonction, getSousFonctions, titreSousFonction } from '@/lib/referentiel';

export function generateStaticParams() {
  return getSousFonctions('fr').map((sf) => ({ slug: sf.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const res = getSousFonction(slug, 'fr');
  if (!res) return {};
  return {
    // Canonical et hreflang : fiche équivalente appariée par code (src/lib/alternates.ts).
    alternates: alternatesPour(`/referentiel/${slug}`),
    title: titreSousFonction(res.domaine, res.sf, 'fr'),
    description: descriptionSousFonction(res.domaine, res.sf, 'fr'),
  };
}

export default async function SousFonctionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getSousFonction(slug, 'fr')) notFound();
  return <PageSousFonction slug={slug} lang="fr" />;
}
