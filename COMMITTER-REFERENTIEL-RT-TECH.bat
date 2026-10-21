@echo off
REM Lot "referentiel RT-TECH v1.0" ecrit le 21/10/2026 - a lancer depuis la racine du depot
cd /d "%~dp0"
git add scripts/generer-rt-tech.py src/content src/lib/referentiel.ts src/components/ReferentielExplorateur.tsx src/components/ReferentielPages.tsx src/app/referentiel src/app/en/referentiel
git add src/app/page.tsx src/app/en/page.tsx src/app/layout.tsx src/app/en/layout.tsx src/app/sitemap.ts src/app/domaines src/app/en/domaines src/app/services src/app/en/services src/app/cycle-de-vie src/app/en/cycle-de-vie src/app/contact src/app/en/contact src/i18n/locales
git commit -m "recette(lot 8) : referentiel RT-TECH v1.0 - 8 domaines, 50 sous-fonctions, 10 services (decisions DG du 21/10/2026)" -m "Nouvelles pages /referentiel et /referentiel/[slug] (FR+EN), T3 renomme Environnements de production controles, TS-10 Assistance a l integration, codes CV1-CV9, contact ?prestation=, sitemap +102 URL. Canal WhatsApp systematique : bouton flottant, lien pied de page, champ et canal prefere dans les formulaires, bouton sur chaque fiche, alerte equipe enrichie. Chapeau pedagogique sur chaque page, six schemas SVG, page FAQ FR+EN (19 questions, JSON-LD). Secret industriel : fiche en deux niveaux, pas de vue tous domaines, marquage. Titre et fonction sur chaque section." -m "Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>" -m "Claude-Session: https://claude.ai/code/session_01R8Kqe7Joeh5dnCXDHdwaar"
git log --oneline -1
pause
