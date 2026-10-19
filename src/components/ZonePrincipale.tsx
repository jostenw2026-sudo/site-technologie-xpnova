'use client';

import { usePathname } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

/**
 * Zone principale du layout racine (lot 6 de la recette, 19/10/2026).
 * - Pages françaises : <main>, comme avant.
 * - Pages /en : leur layout pose déjà son propre <main> ; on n'en ajoute pas un
 *   second autour (avant : <main> imbriqué, et <html>/<body> imbriqués dans en/layout).
 * - Aligne l'attribut lang du document sur la langue de la page (le layout racine,
 *   unique, déclare fr). La correction complète (deux layouts racine) est un
 *   chantier de structure à part.
 */
export function ZonePrincipale({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? '/';
  const en = pathname === '/en' || pathname.startsWith('/en/');
  useEffect(() => {
    document.documentElement.lang = en ? 'en' : 'fr';
  }, [en]);
  if (en) return <>{children}</>;
  return <main className="flex-1">{children}</main>;
}
