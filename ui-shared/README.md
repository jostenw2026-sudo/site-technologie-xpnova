# @xpnova/ui-shared

Composants partagés de l'écosystème web XP-NOVA.

## Compatibilité

- **Next.js 14+** (App Router)
- **React 18+**
- TypeScript 5+

## Installation

```bash
npm install @xpnova/ui-shared
# ou
yarn add @xpnova/ui-shared
# ou
pnpm add @xpnova/ui-shared
```

## Composants

### UtilityBar

Bandeau utilitaire en haut de page avec liens vers les divisions.

```tsx
import { UtilityBar } from '@xpnova/ui-shared';

<UtilityBar
  divisions={[
    {
      key: 'agrovita',
      name: 'AGROVITA',
      url: 'https://agrovita.xp-nova.com',
      accentColor: '#22C55E', // vert
    },
    {
      key: 'odt',
      name: 'ODT',
      url: 'https://odt.xp-nova.com',
      accentColor: '#00289A', // royal
    },
  ]}
  siteUrl="https://xp-nova.com"
  showEmail={true}
  showPortal={true}
  showLanguageToggle={true}
  currentLang="fr"
  onLanguageChange={(lang) => console.log(lang)}
/>
```

### DivisionBadge

Badge "Une division de XP-NOVA" à afficher sur les sites de division.

```tsx
import { DivisionBadge } from '@xpnova/ui-shared';

<DivisionBadge
  divisionName="AGROVITA"
  parentUrl="https://xp-nova.com"
  showParentLink={true}
/>
```

### SharedNavigation

Navigation principale responsive avec menu mobile.

```tsx
import { SharedNavigation } from '@xpnova/ui-shared';

<SharedNavigation
  items={[
    { label: 'Le Cabinet', href: '/cabinet', active: false },
    { label: 'Notre approche', href: '/cabinet/notre-approche', active: false },
    { label: 'AGROVITA', href: '/agrovita', active: true },
    { label: 'ODT', href: '/odt', active: false },
    { label: 'Nos savoir-faire', href: '/metiers', active: false },
    { label: 'Notre méthode', href: '/methode', active: false },
    { label: 'Références', href: '/references', active: false },
    { label: 'Contact', href: '/contact', active: false },
  ]}
  logoSrc="/brand/logo_xpnova_color.png"
  logoAlt="XP-NOVA"
  logoHref="/"
/>
```

### SharedFooter

Pied de page à 4 colonnes (conforme CDC Portail V1.9).

```tsx
import { SharedFooter } from '@xpnova/ui-shared';

<SharedFooter
  columns={[
    {
      title: 'Le portail',
      links: [
        { label: 'Accueil', href: '/' },
        { label: 'Le Cabinet', href: '/cabinet' },
        { label: 'Notre approche', href: '/cabinet/notre-approche' },
        { label: 'Nos savoir-faire', href: '/metiers' },
        { label: 'Notre méthode', href: '/methode' },
        { label: 'Références', href: '/references' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Le cabinet',
      links: [
        { label: 'Équipe', href: '/equipe' },
        { label: 'Engagements', href: '/engagements' },
        { label: 'Ressources', href: '/ressources' },
        { label: 'Carrières', href: '/carrieres' },
        { label: 'Portail interne', href: '/portail' },
      ],
    },
  ]}
  divisions={[
    {
      name: 'AGROVITA',
      url: 'https://agrovita.xp-nova.com',
      description: 'Agriculture, élevage & agro-industrie',
    },
    {
      name: 'ODT',
      url: 'https://odt.xp-nova.com',
      description: 'Territoires, infrastructures & projets locaux',
    },
  ]}
  companyInfo={{
    signature: 'De l\'idée à l\'impact.',
    address: '134, Rue 1813, Vallée Bastos — B.P. 5603, Nlongkak, Yaoundé, Cameroun',
    phone: '+237 670 034 000',
    email: 'hello@xp-nova.com',
    responsePromise: '48 h',
  }}
  legal={{
    mention: '© XP-NOVA SARL — Bureau d\'Ingénierie Conseil',
    mentionsLegales: '/mentions-legales',
    confidentialite: '/confidentialite',
  }}
/>
```

## Intégration avec Next.js

### Dans un layout Next.js 14/15/16

```tsx
// app/layout.tsx
import { UtilityBar, SharedNavigation, SharedFooter } from '@xpnova/ui-shared';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <UtilityBar divisions={divisions} />
        <SharedNavigation items={navItems} />
        <main>{children}</main>
        <SharedFooter columns={footerColumns} />
      </body>
    </html>
  );
}
```

### Styles personnalisés

Les composants utilisent des styles en ligne pour garantir la compatibilité. Pour personnaliser, vous pouvez :

1. Utiliser les props `className` pour appliquer vos propres classes CSS
2. Surcharger les styles avec CSS-in-JS ou Tailwind
3. Fork les composants si vous avez besoin de modifications profondes

## Palette de couleurs

| Couleur | Usage | Hex |
|---------|-------|-----|
| Navy | Principal | `#0D1F5C` |
| Gold | Accent | `#D4A017` |
| Royal | Accent ODT | `#00289A` |
| Vert | Accent AGROVITA | `#22C55E` |
| Blanc | Fond | `#FFFFFF` |
| Gris clair | Fond secondaire | `#F4F5F8` |
| Gris | Texte secondaire | `#5A6072` |

## Typographie

- **Titres** : Playfair Display (via Next.js font)
- **Corps** : Source Sans 3 (via Next.js font)

## Accessibilité

- Navigation clavier supportée
- Textes alternatifs sur les images
- Contraste WCAG AA
- Skip-link recommandé (à ajouter dans votre layout)

## Développement

```bash
# Installer les dépendances
npm install

# Compiler en mode watch
npm run dev

# Compiler pour production
npm run build
```

## Licence

Propriété de XP-NOVA SARL.
