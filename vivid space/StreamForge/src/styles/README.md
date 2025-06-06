# Architecture CSS - Tailwind CSS v4

Ce projet utilise Tailwind CSS v4 avec sa nouvelle syntaxe simplifiée directement dans le fichier `globals.css`. Cette architecture remplace l'ancienne approche modulaire avec de multiples fichiers CSS et le fichier `tailwind.config.js`.

## Structure

```
src/styles/
├── globals.css     # Fichier principal Tailwind v4
├── backup/         # Sauvegarde de l'ancienne architecture (pour référence)
└── README.md       # Cette documentation
```

## Fonctionnalités clés

### Configuration de Tailwind v4

Tailwind CSS v4 utilise une approche simplifiée où toute la configuration se fait dans le fichier CSS principal via `@theme`.

```css
@import "tailwindcss";

/* Plugins */
@plugin "@tailwindcss/forms";
@plugin "@tailwindcss/typography";

/* Theme Configuration */
@theme {
  --color-primary: #6f00ff;
  /* ... autres variables ... */
}
```

### Organisation du code

Le fichier `globals.css` est organisé en sections distinctes:

1. **Variables de thème** (`@theme`) - Définition des couleurs, polices et autres variables
2. **Styles de base** (`@layer base`) - Styles globaux appliqués aux éléments HTML de base
3. **Composants** (`@layer components`) - Classes CSS réutilisables pour les composants
4. **Utilitaires** (`@layer utilities`) - Classes utilitaires pour des ajustements spécifiques

### Classes personnalisées principales

- **Navbar**: `.navbar-container`, `.navbar-logo`, `.nav-links`, `.nav-link`
- **Cartes**: `.card`, `.card-title`, `.card-grid`
- **Mise en page**: `.container`, `.section`, `.section-dark`, `.site-wrapper`
- **Effets visuels**: `.gradient-text`, `.cyber-box`, `.glass-effect`

## Migration depuis l'ancienne architecture

L'ancienne architecture CSS modulaire a été sauvegardée dans le dossier `backup/modules/` et n'est plus utilisée. Cette nouvelle approche offre plusieurs avantages:

- Configuration simplifiée
- Meilleure performance
- Moins de fichiers à gérer
- Cohérence accrue avec le framework Tailwind

## Utilisation dans les composants

Pour les composants qui utilisaient précédemment les classes CSS modulaires, continuer à utiliser les mêmes noms de classes, car elles ont été migrées vers la nouvelle configuration.
