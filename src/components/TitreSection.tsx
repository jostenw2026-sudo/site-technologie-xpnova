// Titre de section + une phrase sur sa fonction (décision DG du 21/10/2026 : chaque
// section de chaque page dit ce qu'elle est et à quoi elle sert).

export default function TitreSection({ titre, texte, clair = false, className = '' }: { titre: string; texte: string; clair?: boolean; className?: string }) {
  return (
    <div className={`mb-8 ${className}`}>
      <h2 className={`text-2xl font-bold mb-2 ${clair ? 'text-white' : 'text-[#0D1F5C]'}`}>{titre}</h2>
      <p className={`max-w-3xl ${clair ? 'text-[#E4E8F3]' : 'text-[#5A6072]'}`}>{texte}</p>
    </div>
  );
}
