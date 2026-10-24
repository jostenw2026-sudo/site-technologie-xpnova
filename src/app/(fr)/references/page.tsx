import type { Metadata } from 'next';
import { alternatesPour } from '@/lib/alternates';
import TitreSection from '@/components/TitreSection';
import IntroPage from '@/components/IntroPage';

// Titre et description : ceux du layout racine (inchangés) ; liens canonical et hreflang.
export const metadata: Metadata = { alternates: alternatesPour('/references') };

export default function ReferencesPage() {
  return (
    <div className="flex flex-col">
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-[#0D1F5C] mb-6">Projets d'ingénierie technique</h1>
          <p className="text-lg text-[#5A6072] max-w-3xl">
            Les références seront publiées une fois documentées : rôle exact de XP-NOVA, client, lieu et période.
          </p>
          <IntroPage cle="references" lang="fr" />
        </div>
      </section>

      <section className="py-16 px-6 bg-[#F4F5F8]">
        <div className="max-w-6xl mx-auto">
          <TitreSection titre="Missions documentées" texte="Rôle exact de XP-NOVA, client, lieu et période pour chaque référence publiée ; rien n'est affiché avant d'être vérifié." />
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="p-6 bg-white rounded border border-[#E2E5EC] mb-8">
            <h2 className="text-xl font-bold text-[#0D1F5C] mb-3">À venir</h2>
            <p className="text-[#5A6072]">
              Les références détaillées seront ajoutées après validation par la Direction générale. Chaque référence mentionnera le rôle exact de XP-NOVA, le client, le lieu, la période et le livrable.
            </p>
          </div>

          <div className="p-6 bg-[#F4F5F8] border-l-4 border-[#D4A017]">
            <h2 className="text-xl font-bold text-[#0D1F5C] mb-3">Note importante</h2>
            <p className="text-[#5A6072]">
              Les références présentées ici reflètent le rôle d'ingénierie de XP-NOVA. Les résultats de performance, les certifications et les impacts opérationnels dépendent des prestataires de fourniture, d'installation et d'exploitation.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
