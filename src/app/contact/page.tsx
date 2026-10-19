'use client';

import { useState } from 'react';
import { envoyerDemande, type EtatEnvoi } from '@/lib/contact-client';
import { EtatEnvoiPanneau } from '@/components/EtatEnvoi';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    type: '',
    localisation: '',
    filiere: '',
    domaines: '',
    description: '',
    email: '',
    telephone: '',
  });

  const [etat, setEtat] = useState<EtatEnvoi>({ phase: 'repos' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEtat({ phase: 'envoi' });
    setEtat(await envoyerDemande(formData, 'fr'));
  };

  return (
    <div className="flex flex-col">
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-[#0D1F5C] mb-6">Contactez-nous</h1>
          <p className="text-lg text-[#5A6072] max-w-3xl">
            Notre équipe d'ingénieurs est à votre disposition pour vous accompagner dans vos projets techniques.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#F4F5F8]">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[#0D1F5C] mb-2">
                Type de projet *
              </label>
              <select
                required
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full p-3 border border-[#E2E5EC] rounded focus:outline-none focus:border-[#D4A017]"
              >
                <option value="">Sélectionnez...</option>
                <option value="mecanisation">Mécanisation</option>
                <option value="irrigation">Irrigation et eau</option>
                <option value="transformation">Transformation et usines</option>
                <option value="stockage">Stockage, conservation et froid</option>
                <option value="energie">Énergie et utilités</option>
                <option value="manutention">Manutention et logistique</option>
                <option value="numerique">Équipements numériques</option>
                <option value="autre">Autre</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0D1F5C] mb-2">
                Site / Localisation *
              </label>
              <input
                type="text"
                required
                value={formData.localisation}
                onChange={(e) => setFormData({ ...formData, localisation: e.target.value })}
                className="w-full p-3 border border-[#E2E5EC] rounded focus:outline-none focus:border-[#D4A017]"
                placeholder="Ville, région, pays..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0D1F5C] mb-2">
                Filière *
              </label>
              <input
                type="text"
                required
                value={formData.filiere}
                onChange={(e) => setFormData({ ...formData, filiere: e.target.value })}
                className="w-full p-3 border border-[#E2E5EC] rounded focus:outline-none focus:border-[#D4A017]"
                placeholder="Ex: riziculture, transformation cacao, élevage..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0D1F5C] mb-2">
                Domaines concernés
              </label>
              <textarea
                value={formData.domaines}
                onChange={(e) => setFormData({ ...formData, domaines: e.target.value })}
                className="w-full p-3 border border-[#E2E5EC] rounded focus:outline-none focus:border-[#D4A017]"
                rows={3}
                placeholder="Décrivez les domaines techniques concernés..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0D1F5C] mb-2">
                Description du besoin *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-3 border border-[#E2E5EC] rounded focus:outline-none focus:border-[#D4A017]"
                rows={5}
                placeholder="Décrivez votre projet et vos besoins..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0D1F5C] mb-2">
                E-mail *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 border border-[#E2E5EC] rounded focus:outline-none focus:border-[#D4A017]"
                placeholder="votre@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0D1F5C] mb-2">
                Téléphone *
              </label>
              <input
                type="tel"
                required
                value={formData.telephone}
                onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                className="w-full p-3 border border-[#E2E5EC] rounded focus:outline-none focus:border-[#D4A017]"
                placeholder="+237 ..."
              />
            </div>

            <button
              type="submit"
              disabled={etat.phase === 'envoi'}
              className="w-full px-6 py-3 bg-[#D4A017] text-[#0D1F5C] rounded font-semibold hover:bg-[#E9C25A] transition-colors disabled:opacity-60"
            >
              Soumettre ma demande
            </button>

            <EtatEnvoiPanneau etat={etat} lang="fr" />
          </form>

          <div className="mt-12 p-6 bg-white rounded border border-[#E2E5EC]">
            <h2 className="text-xl font-bold text-[#0D1F5C] mb-3">Contact direct</h2>
            <p className="text-[#5A6072] mb-2">
              <strong>E-mail :</strong> hello@xp-nova.com
            </p>
            <p className="text-[#5A6072] mb-2">
              <strong>Téléphone :</strong> +237 670 034 000
            </p>
            <p className="text-[#5A6072]">
              <strong>Adresse :</strong> 134, Rue 1813, Vallée Bastos — B.P. 5603, Nlongkak, Yaoundé, Cameroun
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
