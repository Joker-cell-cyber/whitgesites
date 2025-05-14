# Système de Tokens avec Vercel KV

Ce document explique comment le système de tokens fonctionne et comment le configurer correctement pour votre déploiement sur Vercel.

## Vue d'ensemble

Le système utilise Vercel KV (basé sur Redis) pour stocker les données des utilisateurs de manière persistante et synchronisée entre toutes les instances de l'application. Cela permet d'avoir un système de tokens fiable sans nécessiter de base de données externe.

## Caractéristiques

- Stockage persistant des données entre les déploiements
- Synchronisation en temps réel pour tous les utilisateurs
- Facturation mensuelle automatique
- Historique des transactions
- Pré-initialisation des données pour l'utilisateur de test
- Compatible avec les environnements serverless de Vercel

## Configuration sur Vercel

Pour déployer l'application avec Vercel KV, suivez ces étapes:

1. Connectez-vous à votre compte Vercel
2. Depuis le tableau de bord de votre projet, allez dans "Storage"
3. Choisissez "KV Database"
4. Créez une nouvelle instance KV (Plan Hobby gratuit disponible)
5. Suivez les instructions pour lier la base KV à votre projet
6. Vercel configurera automatiquement les variables d'environnement nécessaires

Une fois configuré, Vercel ajoutera automatiquement les variables d'environnement suivantes à votre projet:
- `KV_URL`
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`

## Configuration locale

Pour le développement local, vous avez deux options:

### Option 1: Utiliser une instance Redis locale

1. Installez Redis sur votre machine
2. Configurez le fichier `.env.local` avec:
   ```
   KV_URL=redis://localhost:6379
   KV_REST_API_URL=http://localhost:8079
   KV_REST_API_TOKEN=votre_token_local
   KV_REST_API_READ_ONLY_TOKEN=votre_token_lecture_seule_local
   ```
3. Lancez Redis avant de démarrer votre application

### Option 2: Utiliser l'instance Vercel KV pour le développement

1. Utilisez la commande `vercel env pull .env.local` pour récupérer les variables d'environnement de votre projet Vercel
2. Ces variables contiendront les identifiants réels pour votre instance KV

## Utilisation dans le code

### Récupérer les statistiques d'un utilisateur

```typescript
import { getUserStats } from '@/app/lib/stats-service';

// Dans une fonction asynchrone
const stats = await getUserStats('user-id');
console.log(`Solde de tokens: ${stats.tokenBalance}`);
```

### Enregistrer une génération

```typescript
import { recordArticleGeneration } from '@/app/lib/stats-service';

// Enregistrer une génération d'article (coût: 3 tokens)
const result = await recordArticleGeneration('user-id', 3);
if (result.success) {
  console.log(`Nouveau solde: ${result.stats.tokenBalance}`);
} else {
  console.error(result.message);
}
```

### Ajouter des tokens

```typescript
import { addTokens } from '@/app/lib/stats-service';

// Ajouter 1000 tokens
const result = await addTokens('user-id', 1000, 'Recharge mensuelle');
```

### Réinitialiser les statistiques

```typescript
import { resetStats } from '@/app/lib/stats-service';

// Réinitialiser les statistiques
await resetStats('user-id');
```

## Considérations importantes

1. Le système utilise un utilisateur de test avec l'ID 'test-user-id' qui est pré-initialisé automatiquement
2. En production, utilisez toujours l'instance Vercel KV qui garantit la persistance des données
3. Le système fonctionne de manière totalement transparente avec les fonctions serverless de Vercel
4. Les données sont stockées au format JSON et chiffrées par Vercel KV
5. Des données différentes sont utilisées en développement et en production pour l'utilisateur de test

Pour toute question ou problème, consultez la documentation de Vercel KV: https://vercel.com/docs/storage/vercel-kv 