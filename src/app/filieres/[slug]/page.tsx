import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageFiliere } from '@/components/FilierePages';
import { getFiliere, getFilieres, nomFiliere } from '@/lib/referentiel';

export function generateStaticParams() {
  return getFilieres('fr').map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const f = getFiliere(slug, 'fr');
  if (!f) return {};
  return { title: `${f.code} ${nomFiliere(f, 'fr')} — Référentiel Technologie XP-NOVA`, description: `${f.sousFonctions.length} sous-fonctions du référentiel mobilisées par cette filière.` };
}

export default async function FilierePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getFiliere(slug, 'fr')) notFound();
  return <PageFiliere slug={slug} lang="fr" />;
}
