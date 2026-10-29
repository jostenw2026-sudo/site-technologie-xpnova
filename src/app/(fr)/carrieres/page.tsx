import type { Metadata } from 'next';
import { alternatesPour } from '@/lib/alternates';
import FormulaireCandidature from '@/components/FormulaireCandidature';
import Illustration from '@/components/Illustration';
import { URL_SITES } from '@/lib/sites';

// Page Carrières de la division (29/10/2026) : profils recherchés, renvoi vers les offres
// du groupe (portail) et formulaire de candidature → /api/candidature → Odoo.
export const metadata: Metadata = {
  alternates: alternatesPour('/carrieres'),
  title: "Carrières — TECHNOLOGIE XP-NOVA",
  description: "Rejoindre la division TECHNOLOGIE d’XP-NOVA : profils recherchés et candidature spontanée. Votre CV rejoint notre base de candidats, avec votre accord.",
};

const PROFILS = [
  { titre: "Ingénieurs en mécanisation et équipements agricoles", desc: "Choix, dimensionnement et spécification du matériel de production et de manutention." },
  { titre: "Ingénieurs hydrauliciens et irrigation", desc: "Pompage, réseaux et irrigation à la parcelle." },
  { titre: "Ingénieurs froid, énergie et utilités", desc: "Chaîne du froid, énergie solaire et hybride, utilités des unités de transformation." },
  { titre: "Ingénieurs électromécaniciens et systèmes numériques", desc: "Automatismes, instrumentation, traçabilité et équipements numériques." },
];

export default function CarrieresPage() {
  return (
    <div className="flex flex-col">
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#8A6300] mb-3">Carrières</p>
          <h1 className="text-4xl font-bold text-[#0D1F5C] mb-6">Rejoindre la division TECHNOLOGIE</h1>
          <p className="text-lg text-[#5A6072] max-w-3xl">{"La division TECHNOLOGIE conçoit et dimensionne les équipements et systèmes techniques des projets de l’agrosystème. Elle recrute au fil de ses missions des ingénieurs et des experts techniques."}</p>
          <Illustration src="/images/illustrations/services.webp" alt="Ingénieur relevant les paramètres d'une unité de décorticage de riz" lang="fr" />
        </div>
      </section>

      <section className="py-16 px-6 bg-[#F4F5F8]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0D1F5C] mb-6">Les profils que nous recherchons</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {PROFILS.map((p) => (
              <div key={p.titre} className="p-6 bg-white rounded border border-[#E2E5EC] border-l-4 border-l-[#D4A017]">
                <h3 className="text-lg font-bold text-[#0D1F5C]">{p.titre}</h3>
                <p className="text-[#5A6072] mt-2">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 p-6 bg-white rounded border border-[#E2E5EC]">
            <p className="font-semibold text-[#0D1F5C] mb-2">Offres du groupe XP-NOVA</p>
            <p className="text-[#5A6072]">
              Les offres ouvertes de toutes les divisions sont publiées sur{' '}
              <a href={`${URL_SITES.portail}/carrieres`} className="font-semibold text-[#0D1F5C] underline">
                la page Carrières d’XP-NOVA
              </a>
              . Pour la division TECHNOLOGIE, envoyez-nous une candidature spontanée ci-dessous.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0D1F5C] mb-4">Postuler</h2>
          <p className="text-[#5A6072] mb-8">
            Joignez votre CV actualisé et présentez dans le message vos compétences et le type de mission qui vous intéresse. Nous accusons réception sous 48 heures ouvrées.
          </p>
          <FormulaireCandidature lang="fr" profils={PROFILS.map((p) => p.titre)} />
        </div>
      </section>
    </div>
  );
}
