import { estRecette } from "@/lib/sites";

const STYLE_RECETTE = [
  ".bandeau-recette{position:relative;z-index:60;background:#7A1F1F;color:#fff;font:700 13px/1.4 system-ui,sans-serif;letter-spacing:.06em;text-align:center;padding:6px 16px}",
  "a[href^=\"https://xp-nova.com\"],a[href^=\"https://www.xp-nova.com\"],a[href*=\".xp-nova.com\"]{outline:2px dashed #B42318;outline-offset:2px}",
  "a[href^=\"https://xp-nova.com\"]::after,a[href^=\"https://www.xp-nova.com\"]::after,a[href*=\".xp-nova.com\"]::after{content:\" ↗ PROD\";font:700 10px/1 system-ui,sans-serif;color:#fff;background:#B42318;padding:1px 3px;margin-left:4px;border-radius:2px;vertical-align:middle}",
].join("");

/**
 * Bandeau de recette — rendu seulement quand SITE_ENV=recette.
 *
 * En production (variable absente ou autre valeur), le composant ne rend rien :
 * aucun texte de recette n'atteint le site publié. Le texte se règle par
 * RECETTE_BANDEAU_TEXTE ; à défaut, le libellé du CDC-RECETTE v1.1 §5.2.
 *
 * Il signale aussi, par une feuille de style propre à la recette, tout lien qui
 * sort encore vers un site de production (*.xp-nova.com) : un tel lien quitte la
 * recette locale (CDC §5.4).
 */
export default function BandeauRecette() {
  if (!estRecette()) return null;
  const texte = process.env.RECETTE_BANDEAU_TEXTE || "VERSION LOCALE — RECETTE — NON PUBLIÉE";
  return (
    <>
      {/* Feuille injectée telle quelle : un texte enfant de <style> serait échappé
          différemment au serveur et au client (erreur d'hydratation sous React 18). */}
      <style dangerouslySetInnerHTML={{ __html: STYLE_RECETTE }} />
      <div className="bandeau-recette" role="status">
        {texte}
      </div>
    </>
  );
}
