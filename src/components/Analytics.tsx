"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { GA4_ID, HOTE_MESURE, evenementPourLien, scriptGa4, suivre } from "@/lib/analytics";

/**
 * La balise GA4 du site — une seule, posée par le layout racine pour les deux
 * langues. Rien n'est rendu sans identifiant de mesure. L'hôte de production et
 * l'absence de jeton dans l'URL sont contrôlés par le script à l'exécution.
 *
 * Un `<script>` ordinaire plutôt que `next/script` : il figure dans le HTML
 * rendu, ce qui permet de constater la balise en production (curl, PageSpeed).
 *
 * Navigations douces (App Router) : à chaque changement de chemin, `pageView()`
 * envoie une vue avec une `page_location` épurée (`derniere` évite le doublon
 * avec le premier affichage).
 *
 * Clics sur téléphone, e-mail, WhatsApp, documents et liens sortants : mesurés
 * par délégation, en un seul point — aucun composant n'a à connaître GA4.
 */
export function Analytics() {
  const pathname = usePathname() || "/";

  useEffect(() => {
    if (!GA4_ID || window.location.hostname !== HOTE_MESURE) return;
    if (window.__xpnGa4) {
      window.__xpnGa4.pageView();
      return;
    }
    const s = document.createElement("script");
    s.text = scriptGa4(GA4_ID);
    document.body.appendChild(s);
    s.remove();
  }, [pathname]);

  useEffect(() => {
    if (!GA4_ID) return;
    const surClic = (e: MouseEvent) => {
      const lien = (e.target as Element | null)?.closest?.("a[href]");
      if (!lien) return;
      const ev = evenementPourLien(lien.getAttribute("href") ?? "");
      if (!ev) return;
      const zone = lien.closest("header, footer, nav, main, aside");
      suivre(ev.nom, { ...ev.params, location: zone ? zone.tagName.toLowerCase() : "page" });
    };
    document.addEventListener("click", surClic, { capture: true });
    return () => document.removeEventListener("click", surClic, { capture: true });
  }, []);

  if (!GA4_ID) return null;
  return <script id="ga4-init" dangerouslySetInnerHTML={{ __html: scriptGa4(GA4_ID) }} />;
}
