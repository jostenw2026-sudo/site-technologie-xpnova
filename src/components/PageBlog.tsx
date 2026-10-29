import Link from 'next/link';
import { BLOG_DIVISION, BLOGS_GROUPE } from '@/content/blog';

type Lang = 'fr' | 'en';

const dateLongue = (iso: string, lang: Lang) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString(lang === 'en' ? 'en-GB' : 'fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });

/** Blog de la division TECHNOLOGIE (FR et EN) : ses articles, puis les blogs du groupe. */
export default function PageBlog({ lang }: { lang: Lang }) {
  const en = lang === 'en';
  const articles = [...BLOG_DIVISION].sort((a, b) => b.datePublication.localeCompare(a.datePublication));
  return (
    <div className="flex flex-col">
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#8A6300] mb-3">Blog</p>
          <h1 className="text-4xl font-bold text-[#0D1F5C] mb-6">{en ? "The TECHNOLOGY division blog" : "Le blog de la division TECHNOLOGIE"}</h1>
          <p className="text-lg text-[#5A6072] max-w-3xl">
            {en ? "Analyses and lessons learned on the equipment and technical systems of the agrosystem: mechanisation, irrigation, cold chain, energy." : "Analyses et retours d’expérience sur les équipements et systèmes techniques de l’agrosystème : mécanisation, irrigation, froid, énergie."}
          </p>
        </div>
      </section>

      <section className="py-12 px-6 bg-white border-t border-[#E2E5EC]">
        <div className="max-w-6xl mx-auto">
          {articles.length === 0 ? (
            <p className="text-lg text-[#5A6072] max-w-3xl">
              {en
                ? "The TECHNOLOGY division has not published any article yet. In the meantime, the group's analyses are available below."
                : "La division TECHNOLOGIE n’a pas encore publié d’article. En attendant, les analyses du groupe sont accessibles ci-dessous."}
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {articles.map((a) => (
                <Link
                  key={a.slug}
                  href={a.url ?? `${en ? '/en' : ''}/blog/${a.slug}`}
                  className="block p-6 bg-white rounded border border-[#E2E5EC] hover:shadow-lg transition-shadow"
                >
                  <p className="text-sm text-[#5A6072]">{dateLongue(a.datePublication, lang)}</p>
                  <h2 className="text-xl font-bold text-[#0D1F5C] mt-2">{a.titre[lang]}</h2>
                  <p className="text-[#5A6072] mt-2">{a.chapeau[lang]}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-6 bg-[#F4F5F8]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0D1F5C] mb-6">{en ? 'Other blogs of the group' : 'Les autres blogs du groupe'}</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {BLOGS_GROUPE.map((b) => (
              <a
                key={b.cle}
                href={b.url[lang]}
                target="_blank"
                rel="noopener"
                className="block p-6 bg-white rounded border border-[#E2E5EC] border-l-4 border-l-[#D4A017] hover:shadow-lg transition-shadow"
              >
                <p className="text-sm font-bold tracking-[0.1em] text-[#0D1F5C]">{b.nom}</p>
                <p className="text-[#5A6072] mt-2">{b.texte[lang]}</p>
                <span className="inline-block mt-4 font-semibold text-[#0D1F5C]">
                  {en ? 'Open the blog' : 'Ouvrir le blog'} <span aria-hidden>↗</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
