import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageFiliere } from '@/components/FilierePages';
import { getFiliere, getFilieres, nomFiliere } from '@/lib/referentiel';

export function generateStaticParams() {
  return getFilieres('en').map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const f = getFiliere(slug, 'en');
  if (!f) return {};
  return { title: `${f.code} ${nomFiliere(f, 'en')} — Technology reference XP-NOVA`, description: `${f.sousFonctions.length} reference sub-functions mobilised by this value chain.` };
}

export default async function FilierePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getFiliere(slug, 'en')) notFound();
  return <PageFiliere slug={slug} lang="en" />;
}
