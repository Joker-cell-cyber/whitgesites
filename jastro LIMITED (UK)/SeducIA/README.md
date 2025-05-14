# OneirICrafts - Application de génération d'articles avec IA

## Services implémentés

### 1. Service d'authentification (`app/lib/checkout-champ.ts`)

Le système d'authentification utilise l'API Checkout Champ pour gérer les connexions des membres. Pour faciliter les tests, un compte de démonstration est disponible :

- **Email** : `test@test.com`
- **Mot de passe** : `TEST1234`

Ce compte est configuré avec :
- Un plan **Enterprise** en facturation **mensuelle**
- Un solde de **5000 tokens**
- 3 articles de blog déjà créés

### 2. Service de gestion des abonnements (`app/lib/subscription-service.ts`)

Ce service gère les abonnements et les tokens :

- Différents plans d'abonnement (Basic, Pro, Business, Enterprise)
- Différentes périodes de facturation (bimensuel, mensuel, trimestriel, annuel)
- Achat de tokens
- Calcul des prix en fonction de la quantité

### 3. Service de gestion des articles (`app/lib/article-service.ts`)

Ce service gère les articles de blog :

- Récupération de tous les articles
- Récupération d'un article par son ID
- Création d'un nouvel article
- Mise à jour d'un article existant
- Suppression d'un article
- Génération d'un article avec l'IA
- Analyse SEO d'un article
- Optimisation d'un article avec l'IA

### 4. Service de génération d'articles avec IA (`app/lib/ai-service.ts`)

Ce service simule la génération d'articles avec l'IA :

- Génération de titres
- Génération d'extraits
- Génération de contenu complet
- Différentes options de longueur (court, moyen, long)
- Différentes options de ton (formel, décontracté, professionnel)
- Optimisation SEO
- Inclusion d'images

## Structure des fichiers

- `app/lib/checkout-champ.ts` : Service d'authentification
- `app/lib/subscription-service.ts` : Service de gestion des abonnements
- `app/lib/article-service.ts` : Service de gestion des articles
- `app/lib/ai-service.ts` : Service de génération d'articles avec IA
- `app/(routes)/(auth)/login/page.tsx` : Page de connexion
- `app/(routes)/(auth)/logout/page.tsx` : Page de déconnexion
- `app/(routes)/(auth)/register/page.tsx` : Page de redirection pour l'inscription
- `app/components/auth/auth-status.tsx` : Composant qui affiche l'état d'authentification
- `middleware.ts` : Protection des routes qui nécessitent une authentification

## Configuration

1. **ID du club** : L'ID du club est configuré à `7` dans `checkout-champ.ts`.
2. **Authentification** : Les utilisateurs se connectent avec leur adresse email et leur mot de passe.
3. **Stockage de session** : Les informations de session sont stockées dans des cookies sécurisés.
4. **Protection des routes** : Le middleware protège les routes suivantes :
   - `/dashboard/*`
   - `/generate/*`
   - `/articles/*`
   - `/seo/*`
   - `/export/*`
   - `/tokens/*`
   - `/settings/*`

## Fonctionnement

1. L'utilisateur se connecte avec les identifiants de test.
2. L'application simule l'interaction avec l'API Checkout Champ.
3. Les informations de session sont stockées dans des cookies.
4. L'utilisateur peut accéder à toutes les fonctionnalités comme s'il avait un plan Enterprise.
5. Les actions comme la génération d'articles, l'analyse SEO, etc. sont simulées avec des délais réalistes.

## Notes importantes

- Pas de page d'inscription : Les utilisateurs doivent être inscrits via le système Checkout Champ.
- L'ID du club est configuré à `7`.
- Le mot de passe du club n'est pas utilisé dans cette implémentation.
- L'email du membre est utilisé comme `clubUsername` dans l'API.
- Le mot de passe fourni par le membre est utilisé comme `clubPassword` dans l'API.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Déploiement sur Vercel

### Prérequis

- Un compte [Vercel](https://vercel.com)
- Un compte [Redis Cloud](https://redis.com/try-free/) ou [Upstash](https://upstash.com/) pour Redis
- Une clé API [OpenAI](https://platform.openai.com/)

### Configuration des variables d'environnement

Pour déployer l'application sur Vercel, vous devez configurer les variables d'environnement suivantes dans les paramètres de votre projet Vercel :

```
OPENAI_API_KEY=votre_cle_api_openai
TOKENS_REDIS_URL=votre_url_redis
NEXTAUTH_SECRET=votre_secret_nextauth_tres_securise
NEXTAUTH_URL=https://votre-domaine.com
```

### Étapes de déploiement

1. Clonez ce dépôt sur votre machine locale
2. Connectez-vous à Vercel via la CLI ou le tableau de bord
3. Importez le projet dans Vercel
4. Configurez les variables d'environnement dans les paramètres du projet
5. Déployez l'application

### Configuration de Redis

L'application utilise Redis pour stocker les données utilisateur et gérer les tokens. Vous pouvez utiliser Redis Cloud ou Upstash pour obtenir une instance Redis.

1. Créez un compte sur Redis Cloud ou Upstash
2. Créez une nouvelle base de données Redis
3. Copiez l'URL de connexion Redis
4. Ajoutez l'URL de connexion Redis dans les variables d'environnement de Vercel sous le nom `TOKENS_REDIS_URL`

### Système d'authentification

L'application utilise Next-Auth avec JWT pour l'authentification. Pour les tests, vous pouvez utiliser les identifiants suivants :

- **Email** : `test@test.com`
- **Mot de passe** : `TEST1234`

Ce compte est configuré avec :
- Un plan **Enterprise** en facturation **mensuelle**
- Un solde de **5000 tokens**
- 3 articles de blog déjà créés

# Amélioration du système de gestion des statistiques

## Problème initial
Le système utilisait des cookies et localStorage pour stocker les statistiques de génération, ce qui posait plusieurs problèmes :
- Les données étaient liées à l'appareil et non au compte utilisateur
- Les statistiques n'étaient pas cohérentes entre différents appareils
- Les données étaient réinitialisées à chaque nouvelle session

## Solution implémentée
Nous avons modifié le système pour utiliser une approche plus robuste :

1. **Utilisation de localStorage au lieu des cookies** :
   - Permet une persistance des données entre les sessions
   - Offre plus d'espace de stockage que les cookies
   - Reste une solution temporaire en attendant une implémentation complète côté serveur

2. **Création d'un service dédié pour les statistiques** :
   - Nouveau fichier `app/lib/stats-service.ts` qui centralise la gestion des statistiques
   - Fonctions asynchrones pour simuler des appels API
   - Interface claire pour les statistiques de génération

3. **Création d'une API dédiée pour les statistiques** :
   - Nouvelle route API `app/api/update-stats/route.ts` pour mettre à jour les statistiques
   - Permet de centraliser la logique de mise à jour des statistiques

4. **Mise à jour du contexte des statistiques** :
   - Utilisation du nouveau service dans `app/context/stats-context.tsx`
   - Fonction de rafraîchissement asynchrone

## Prochaines étapes
Pour une solution complète et définitive, il faudrait :

1. **Implémenter une base de données** :
   - Stocker les statistiques dans une base de données liée au compte utilisateur
   - Synchroniser les données entre les appareils

2. **Créer une API complète** :
   - Endpoints pour récupérer et mettre à jour les statistiques
   - Authentification pour sécuriser les données

3. **Optimiser les performances** :
   - Mise en cache côté client pour réduire les appels API
   - Mise à jour en temps réel avec WebSockets pour les changements importants

## Comment utiliser le nouveau système
Pour mettre à jour les statistiques après une génération :
```typescript
import { refreshStats } from '@/app/context/stats-context';

// Après une génération réussie
refreshStats();
```

Pour accéder aux statistiques dans un composant :
```typescript
import { useStats } from '@/app/context/stats-context';

function MyComponent() {
  const { stats, isLoading, refreshStats } = useStats();
  
  // Utiliser stats.tokenBalance, stats.articlesGenerated, etc.
}
```

## Améliorations récentes

### Authentification
- Implémentation de Next-Auth pour une gestion sécurisée des sessions
- Utilisation de JWT pour l'authentification
- Protection des routes via middleware
- Validation des entrées utilisateur avec Zod

### Gestion Redis
- Client Redis singleton pour éviter les connexions multiples
- Gestion optimisée des connexions avec reconnexion automatique
- Utilisation de transactions pour garantir l'intégrité des données

### Architecture
- Centralisation des constantes et des types
- Suppression des fichiers et du code redondants
- Amélioration de la structure du projet

### Sécurité
- Ajout d'en-têtes de sécurité HTTP
- Configuration sécurisée des cookies
- Validation des entrées utilisateur

### Déploiement
- Scripts de validation pour vérifier le code avant déploiement
- Documentation des variables d'environnement
- Optimisation pour Vercel
