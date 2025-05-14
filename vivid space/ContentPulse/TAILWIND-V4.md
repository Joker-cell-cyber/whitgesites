# Configuration Tailwind CSS v4

Ce document explique comment nous avons configuré Tailwind CSS v4 dans notre projet Next.js.

## Principales différences avec Tailwind v3

Tailwind CSS v4 comporte plusieurs changements majeurs par rapport à la v3 :

1. **Configuration simplifiée**: Tout est configuré dans `globals.css` au lieu d'un fichier `tailwind.config.js/mjs` complexe.

2. **Nouvelle syntaxe CSS**: Utilisation de `@import "tailwindcss"` au lieu des directives `@tailwind`.

3. **Variable de thème**: Les couleurs et autres variables sont définies via `@theme {}` directement dans le CSS.

4. **Pas de PostCSS obligatoire**: Tailwind v4 fonctionne sans configuration PostCSS complexe.

## Notre configuration

### 1. Structure des fichiers

```
masterseowriter/
├── public/
│   └── output.css         # CSS compilé par Tailwind, référencé dans _document.tsx
├── src/
│   ├── app/
│   │   └── globals.css     # Fichier source avec configuration Tailwind
│   └── ...
├── build-css.js           # Script Node pour compiler Tailwind
├── package.json           # Scripts npm mis à jour
└── tailwind.config.mjs    # Configuration minimale Tailwind v4
```

### 2. Fichier CSS global (nouvelle approche)

Le fichier `src/app/globals.css` contient maintenant toute la configuration:

```css
@import "tailwindcss";

@theme {
  /* Turquoise color palette */
  --color-turquoise-50: #ebfcfc;
  --color-turquoise-100: #d1f6f5;
  --color-turquoise-200: #9eecea;
  --color-turquoise-300: #68e0db;
  --color-turquoise-400: #2fcbc4;
  --color-turquoise-500: #0db5b4;
  --color-turquoise-600: #089696;
  --color-turquoise-700: #0a7878;
  --color-turquoise-800: #0c5f5f;
  --color-turquoise-900: #0d4b4b;
  
  /* Base colors */
  --color-background: #ffffff;
  --color-foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  @theme {
    --color-background: #0a0a0a;
    --color-foreground: #ededed;
  }
}
```

### 3. Fichier de configuration Tailwind minimal

Le fichier `tailwind.config.mjs` est maintenant très simplifié:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [],
}
```

### 4. Script de compilation

Le processus de compilation reste le même, avec un script Node.js (`build-css.js`) qui compile le CSS Tailwind vers le dossier `public/`:

```js
// build-css.js
const { execSync } = require('child_process');
execSync('npx tailwindcss -i ./src/app/globals.css -o ./public/output.css');
```

### 5. Intégration avec Next.js

Nous utilisons `_document.tsx` pour inclure le CSS compilé:

```jsx
// Dans _document.tsx
<Head>
  <link rel="stylesheet" href="/output.css" />
</Head>
```

## Utilisation

Pour démarrer le projet avec la compilation Tailwind CSS:

```bash
# Démarrer le serveur de développement avec compilation CSS préalable
npm run dev

# Compiler uniquement le CSS
npm run css

# Compiler et surveiller les modifications CSS
npm run css:watch
``` 