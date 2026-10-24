import type { Metadata } from 'next';
import { alternatesPour } from '@/lib/alternates';
import TitreSection from '@/components/TitreSection';
import IntroPage from '@/components/IntroPage';

// Titre et description : ceux du layout racine (inchangés) ; liens canonical et hreflang.
export const metadata: Metadata = { alternates: alternatesPour('/a-propos') };

export default function AProposPage() {
  return (
    <div className="flex flex-col">
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-[#0D1F5C] mb-6">À propos de la division Technologie</h1>
          <p className="text-lg text-[#5A6072] max-w-3xl">
            La division Technologie de XP-NOVA conçoit et dimensionne les équipements techniques et numériques nécessaires aux projets agro-systémiques.
          </p>
          <IntroPage cle="aPropos" lang="fr" />
        </div>
      </section>

      <section className="py-16 px-6 bg-[#F4F5F8]">
        <div className="max-w-6xl mx-auto">
          <TitreSection titre="La division en cinq points" texte="Positionnement, approche, compétences, partenaires et limites : de quoi juger si nous sommes le bon interlocuteur pour votre besoin." />
        </div>
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="p-6 bg-white rounded border border-[#E2E5EC]">
            <h2 className="text-xl font-bold text-[#0D1F5C] mb-3">Notre positionnement</h2>
            <p className="text-[#5A6072]">
              XP-NOVA assure l'ingénierie, les études et les spécifications techniques. La fourniture d'équipements, les travaux d'installation et l'exploitation sont confiés à des prestataires spécialisés sélectionnés selon vos besoins.
            </p>
          </div>

          <div className="p-6 bg-white rounded border border-[#E2E5EC]">
            <h2 className="text-xl font-bold text-[#0D1F5C] mb-3">Notre approche</h2>
            <p className="text-[#5A6072]">
              Nous adoptons une méthode structurée et mesurable, basée sur l'analyse des besoins réels, la conception de solutions adaptées au contexte local, et la validation des performances.
            </p>
          </div>

          <div className="p-6 bg-white rounded border border-[#E2E5EC]">
            <h2 className="text-xl font-bold text-[#0D1F5C] mb-3">Nos compétences</h2>
            <p className="text-[#5A6072]">
              Nos ingénieurs couvrent l'ensemble des domaines techniques : mécanisation, irrigation, transformation, stockage, froid, énergie, manutention et équipements numériques.
            </p>
          </div>

          <div className="p-6 bg-white rounded border border-[#E2E5EC]">
            <h2 className="text-xl font-bold text-[#0D1F5C] mb-3">Nos partenaires</h2>
            <p className="text-[#5A6072]">
              Lorsque les qualifications ou moyens requis ne sont pas disponibles en interne, nous mobilisons des laboratoires, intégrateurs, fournisseurs et entreprises spécialisés selon vos besoins.
            </p>
          </div>

          <div className="p-6 bg-white rounded border border-[#E2E5EC]">
            <h2 className="text-xl font-bold text-[#0D1F5C] mb-3">Nos limites</h2>
            <p className="text-[#5A6072]">
              Nous ne vendons pas d'équipements, ne réalisons pas les installations, n'assurons pas la maintenance et ne délivrons pas de certifications réglementaires. Une vérification technique n'est pas une certification.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
