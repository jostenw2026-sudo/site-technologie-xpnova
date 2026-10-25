'use client';

import TitreSection from '@/components/TitreSection';
import { SchemaDemande } from '@/components/Schemas';
import IntroPage from '@/components/IntroPage';
import { useEffect, useState } from 'react';
import { envoyerDemande, type EtatEnvoi } from '@/lib/contact-client';
import { EtatEnvoiPanneau } from '@/components/EtatEnvoi';
import { IconeWhatsApp } from '@/components/BoutonWhatsApp';
import { lienWhatsapp, MESSAGES, NUMERO_WHATSAPP_AFFICHE } from '@/lib/whatsapp-public';
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
    prestation: '',
    whatsapp: '',
    canal: '',
  });

  // Lien « Demander une expertise » du référentiel : /contact?prestation=T2.2·TS-04
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('prestation');
    const fiche = params.get('fiche') === 'complete';
    if (code) setFormData((d) => ({ ...d, prestation: code, ...(fiche ? { description: 'Request for the full technical sheet (after file opening) — ' + code + '.\n' } : {}) }));
  }, []);

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
          <IntroPage cle="contact" lang="en">
            <SchemaDemande lang="en" />
          </IntroPage>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#F4F5F8]">
        <div className="max-w-3xl mx-auto">
          <TitreSection titre="Describe your need" texte="The fields useful for the first reply within 48 hours; the service code appears if you come from a reference sheet." />
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 p-5 bg-white rounded border border-[#E2E5EC] flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-sm text-[#5A6072] flex-1">Prefer WhatsApp? Write to us directly, an expert replies within 48 working hours.</p>
            <a
              href={lienWhatsapp(formData.prestation ? MESSAGES['en'].prestation(formData.prestation) : MESSAGES['en'].defaut)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] text-white rounded font-semibold hover:bg-[#1ebe5b] transition-colors"
            >
              <IconeWhatsApp />
              Write directly on WhatsApp
            </a>
          </div>

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
                <option value="serres">Controlled production environments</option>
                <option value="transformation">Processing and plants</option>
                <option value="stockage">Storage, preservation and cold</option>
                <option value="energie">Energy and utilities</option>
                <option value="manutention">Handling and logistics</option>
                <option value="numerique">Digital equipment</option>
                <option value="autre">Other</option>
              </select>
            </div>

            {formData.prestation && (
              <div>
                <label className="block text-sm font-semibold text-[#0D1F5C] mb-2">Service code (RT-TECH reference)</label>
                <input
                  type="text"
                  value={formData.prestation}
                  onChange={(e) => setFormData({ ...formData, prestation: e.target.value })}
                  className="w-full p-3 border border-[#D4A017] rounded bg-[#FFF8E6] focus:outline-none focus:border-[#D4A017]"
                />
                <p className="mt-1 text-xs text-[#5A6072]">Pre-filled from the reference sheet; editable.</p>
              </div>
            )}

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

            <div>
              <label className="block text-sm font-semibold text-[#0D1F5C] mb-2">WhatsApp number</label>
              <input
                type="tel"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full p-3 border border-[#E2E5EC] rounded focus:outline-none focus:border-[#D4A017]"
                placeholder="+237 ..."
              />
              <p className="mt-1 text-xs text-[#5A6072]">Leave blank if it is the same as the phone.</p>
            </div>

            <label className="flex items-center gap-3 text-sm text-[#0D1F5C]">
              <input
                type="checkbox"
                checked={formData.canal === 'whatsapp'}
                onChange={(e) => setFormData({ ...formData, canal: e.target.checked ? 'whatsapp' : '' })}
                className="h-4 w-4 accent-[#D4A017]"
              />
              I prefer to be contacted via WhatsApp
            </label>

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
              <strong>Phone:</strong> +237 6700 34 000
            </p>
            <p className="text-[#5A6072] mb-2">
              <strong>WhatsApp:</strong>{' '}
              <a href={lienWhatsapp(MESSAGES['en'].defaut)} target="_blank" rel="noopener noreferrer" className="text-[#0D1F5C] underline">
                {NUMERO_WHATSAPP_AFFICHE}
              </a>
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
