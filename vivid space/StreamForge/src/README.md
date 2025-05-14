# Architecture StreamPacker

Ce document décrit l'architecture et les meilleures pratiques adoptées dans le développement de StreamPacker.

## Structure du projet

```
src/
├── app/                # Routing et pages (Next.js App Router)
│   ├── layout.tsx      # Layout racine de l'application
│   ├── page.tsx        # Page d'accueil
│   └── ...autres pages
│
├── components/         # Composants React réutilisables
│   ├── layout/         # Composants structurels (Navbar, Footer, etc.)
│   ├── home/           # Composants spécifiques à la page d'accueil
│   ├── ui/             # Composants d'interface utilisateur génériques
│   └── ...autres dossiers spécifiques aux fonctionnalités
│
├── styles/             # Architecture CSS modulaire
│   ├── index.css       # Point d'entrée CSS qui importe tous les modules
│   ├── modules/        # Modules CSS organisés par préoccupation
│   └── README.md       # Documentation détaillée sur l'architecture CSS
│
└── lib/                # Utilitaires, hooks et logique métier
```

## Principes architecturaux

1. **Séparation des préoccupations**
   - Chaque fichier et dossier a une responsabilité unique et clairement définie
   - Les composants sont organisés par fonction et réutilisabilité

2. **Architecture CSS modulaire**
   - La CSS est divisée en modules spécialisés plutôt qu'un seul fichier global
   - Voir `styles/README.md` pour plus de détails sur cette architecture

3. **Approche traditionnelle du layout**
   - Structure de page standard avec NavBar, contenu principal et Footer
   - Séparation claire entre les éléments fixes (UI overlay) et le contenu défilant

4. **Optimisation des performances**
   - Chargement dynamique des composants non-critiques
   - Optimisation des animations avec will-change et accélération GPU

## Conventions de code

1. **TypeScript**
   - Utilisation de types explicites pour les props et les états
   - Interfaces et types définis près de leur utilisation

2. **Composants React**
   - Préférence pour les composants fonctionnels avec hooks
   - Utilisation de 'use client' uniquement lorsque nécessaire

3. **Organisation CSS**
   - Utilisation de TailwindCSS pour les styles de base
   - Classes utilitaires personnalisées pour les effets complexes
   - Préfixage des classes pour indiquer leur fonction (exemple: 'cyber-', 'animate-')

## Meilleures pratiques

1. **Gestion des états**
   - Conserver l'état au niveau le plus bas possible
   - Éviter la propagation excessive des props

2. **Accessibilité**
   - Utiliser des éléments sémantiques appropriés
   - Assurer un contraste suffisant pour le texte

3. **Optimisation**
   - Limiter les re-rendus inutiles
   - Utiliser la mémoïsation pour les calculs coûteux

4. **Documentation**
   - Commenter le code complexe ou non évident
   - Maintenir à jour les fichiers README

## Refactorisation récente

Le code a récemment fait l'objet d'une refactorisation majeure pour:
1. Passer d'un fichier CSS monolithique à une architecture modulaire
2. Résoudre les problèmes de débordement (overflow) et de scrolling
3. Améliorer la structure générale selon les meilleures pratiques

Une copie de sauvegarde de l'ancienne structure est conservée dans `styles/backup/` pour référence. 