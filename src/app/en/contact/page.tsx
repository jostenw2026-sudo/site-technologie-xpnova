'use client';

import { useState } from 'react';
import { envoyerDemande, type EtatEnvoi } from '@/lib/contact-client';
import { EtatEnvoiPanneau } from '@/components/EtatEnvoi';
import { Metadata } from 'next';

export default function ContactPageEN() {
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
    setEtat(await envoyerDemande(formData, 'en'));
  };

  return (
    <div className="flex flex-col">
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-[#0D1F5C] mb-6">Contact us</h1>
          <p className="text-lg text-[#5A6072] max-w-3xl">
            Our team of engineers is available to support you in your technical projects.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#F4F5F8]">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[#0D1F5C] mb-2">
                Project type *
              </label>
              <select
                required
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full p-3 border border-[#E2E5EC] rounded focus:outline-none focus:border-[#D4A017]"
              >
                <option value="">Select...</option>
                <option value="mecanisation">Mechanization</option>
                <option value="irrigation">Irrigation and water</option>
                <option value="transformation">Processing and plants</option>
                <option value="stockage">Storage, preservation and cold</option>
                <option value="energie">Energy and utilities</option>
                <option value="manutention">Handling and logistics</option>
                <option value="numerique">Digital equipment</option>
                <option value="autre">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0D1F5C] mb-2">
                Site / Location *
              </label>
              <input
                type="text"
                required
                value={formData.localisation}
                onChange={(e) => setFormData({ ...formData, localisation: e.target.value })}
                className="w-full p-3 border border-[#E2E5EC] rounded focus:outline-none focus:border-[#D4A017]"
                placeholder="City, region, country..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0D1F5C] mb-2">
                Value chain *
              </label>
              <input
                type="text"
                required
                value={formData.filiere}
                onChange={(e) => setFormData({ ...formData, filiere: e.target.value })}
                className="w-full p-3 border border-[#E2E5EC] rounded focus:outline-none focus:border-[#D4A017]"
                placeholder="E.g.: rice farming, cocoa processing, livestock..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0D1F5C] mb-2">
                Domains concerned
              </label>
              <textarea
                value={formData.domaines}
                onChange={(e) => setFormData({ ...formData, domaines: e.target.value })}
                className="w-full p-3 border border-[#E2E5EC] rounded focus:outline-none focus:border-[#D4A017]"
                rows={3}
                placeholder="Describe the technical domains concerned..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0D1F5C] mb-2">
                Description of the need *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-3 border border-[#E2E5EC] rounded focus:outline-none focus:border-[#D4A017]"
                rows={5}
                placeholder="Describe your project and your needs..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0D1F5C] mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 border border-[#E2E5EC] rounded focus:outline-none focus:border-[#D4A017]"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0D1F5C] mb-2">
                Phone *
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
              Submit my request
            </button>

            <EtatEnvoiPanneau etat={etat} lang="en" />
          </form>

          <div className="mt-12 p-6 bg-white rounded border border-[#E2E5EC]">
            <h2 className="text-xl font-bold text-[#0D1F5C] mb-3">Direct contact</h2>
            <p className="text-[#5A6072] mb-2">
              <strong>Email:</strong> hello@xp-nova.com
            </p>
            <p className="text-[#5A6072] mb-2">
              <strong>Phone:</strong> +237 670 034 000
            </p>
            <p className="text-[#5A6072]">
              <strong>Address:</strong> 134, Rue 1813, Vallée Bastos — B.P. 5603, Nlongkak, Yaoundé, Cameroon
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
