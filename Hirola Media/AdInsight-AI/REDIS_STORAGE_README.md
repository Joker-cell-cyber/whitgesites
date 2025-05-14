# Système de Tokens avec Redis

Ce document explique comment le système de tokens fonctionne et comment il a été configuré pour utiliser Redis via le Marketplace Vercel.

## Vue d'ensemble

Le système utilise Redis pour stocker les données des utilisateurs de manière persistante et synchronisée entre toutes les instances de l'application. Cela permet d'avoir un système de tokens fiable sans nécessiter de base de données externe.

## Caractéristiques

- Stockage persistant des données entre les déploiements
- Synchronisation en temps réel pour tous les utilisateurs
- Facturation mensuelle automatique
- Historique des transactions
- Pré-initialisation des données pour l'utilisateur de test
- Compatible avec les environnements serverless de Vercel

## Architecture du système

Le système de tokens est organisé en deux modules principaux:

1. **redis-store.ts** : Module de base qui interagit directement avec Redis pour stocker et récupérer les données.
2. **stats-service.ts** : Façade qui simplifie l'utilisation des fonctionnalités de gestion des tokens et statistiques.

## Configuration sur Vercel

L'application utilise déjà une instance Redis configurée via le Marketplace Vercel. La variable d'environnement suivante est configurée:

```
REDIS_URL="redis://default:DwbY9gIDLK5TFaINuI3yOhaWnd3QJfl6@redis-16569.c339.eu-west-3-1.ec2.redns.redis-cloud.com:16569"
```

## Configuration locale

Pour le développement local, vous avez deux options:

### Option 1: Utiliser votre propre instance Redis locale

1. Installez Redis sur votre machine
2. Configurez le fichier `.env.local` avec:
   ```
   REDIS_URL=redis://localhost:6379
   ```
3. Lancez Redis avant de démarrer votre application

### Option 2: Utiliser l'instance Redis de production pour le développement

1. Utilisez la commande `vercel env pull .env.development.local` pour récupérer les variables d'environnement de votre projet Vercel
2. Cette variable contiendra l'URL de connexion à votre instance Redis en production

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
2. Les données sont stockées au format JSON dans Redis
3. Différentes données initiales sont utilisées en environnement de développement et de production pour l'utilisateur de test
4. Toutes les fonctions d'accès aux données sont asynchrones et retournent des promesses
5. Les erreurs de connexion à Redis sont gérées avec des logs appropriés

## Différences avec l'implémentation précédente (Vercel KV)

Le système actuel a été adapté pour utiliser le SDK Redis standard au lieu de `@vercel/kv`. Les principales modifications incluent:

1. Utilisation de `createClient` du package 'redis' au lieu de l'importation de `kv` depuis '@vercel/kv'
2. Gestion explicite de la connexion Redis avec un singleton
3. Sérialisation/désérialisation manuelle des données en JSON pour le stockage Redis
4. Utilisation de la variable d'environnement `REDIS_URL` au lieu des variables KV spécifiques de Vercel

La logique métier et les fonctionnalités restent les mêmes, seule la couche d'accès aux données a été modifiée.

## Dépannage

Si vous rencontrez des problèmes de connexion à Redis:

1. Vérifiez que la variable d'environnement `REDIS_URL` est correctement configurée
2. Assurez-vous que le pare-feu autorise les connexions à Redis
3. Vérifiez les logs pour les erreurs spécifiques
4. Si nécessaire, redémarrez l'application pour réinitialiser la connexion à Redis 