# Polices du site (next/font/local)

Sous-ensembles WOFF2 de Source Sans 3 et Playfair Display, identiques sur les sites du
groupe (xp-nova.com, odt, technologie, ingenierie-formation). Chargés et préchargés par
`next/font/local` dans le layout racine.

Révision du 24/10/2026 : 157 Ko → 84 Ko pour les deux fichiers. Le jeu de caractères est
limité à ce que les sites utilisent réellement : latin de base et Latin-1 (tous les accents
français), Œ œ, ponctuation et espaces typographiques, exposants et indices, €, flèches,
quelques symboles (≈ ≠ ≤ ≥ − ✓ ✕), ligatures. Les axes de graisse variables sont conservés
(Source Sans 3 : 200–900 ; Playfair Display : 400–900). Un caractère hors de cet ensemble
(cyrillique, vietnamien…) s'affiche dans la police système, sans erreur.

Régénérer depuis les TTF d'origine (dépôt portail-xp-nova, `public/fonts/`), avec
`pip install fonttools brotli` :

```bash
U="U+0000-00FF,U+0131,U+0152-0153,U+02B3,U+02C6,U+02DA,U+02DC,U+0300-036F,U+1D49,U+2000-206F,U+2070-209F,U+20AC,U+2190-21FF,U+2212,U+2248,U+2260,U+2264-2265,U+2713-2715,U+FB00-FB06,U+FEFF,U+FFFD"
for f in SourceSans3 PlayfairDisplay; do
  pyftsubset public/fonts/$f.ttf --unicodes="$U" \
    --layout-features='kern,liga,clig,calt,ccmp,locl,mark,mkmk,lnum,pnum,tnum,onum,frac,sups,subs,ordn' \
    --flavor=woff2 --output-file=src/app/fonts/$f.woff2
done
```
