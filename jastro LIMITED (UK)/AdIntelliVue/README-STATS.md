# Système de gestion des statistiques

## Approche implémentée

Nous avons implémenté un système de gestion des statistiques qui fonctionne entièrement dans le code de l'application, sans dépendre d'une base de données externe ni du stockage côté client (localStorage ou cookies).

### Caractéristiques principales

1. **Stockage en mémoire** :
   - Les données sont stockées dans une variable globale `USERS_DATA` dans le fichier `checkout-champ.ts`
   - Cette variable agit comme une "base de données en mémoire" qui persiste tant que le serveur est en cours d'exécution
   - Les données sont indexées par l'ID du membre pour un accès rapide

2. **Architecture centralisée** :
   - Toutes les fonctions de manipulation des données passent par le service `checkout-champ.ts`
   - Le service `stats-service.ts` fournit une interface simplifiée pour les statistiques
   - Le contexte React `stats-context.tsx` gère l'état des statistiques dans l'interface utilisateur

3. **Gestion par utilisateur** :
   - Chaque utilisateur a ses propres statistiques
   - Les statistiques sont liées à l'ID du membre, pas à l'appareil ou au navigateur
   - Les mises à jour sont immédiates et cohérentes pour tous les composants

## Fonctionnement technique

### Stockage des données

```typescript
// Stockage global des données utilisateur (simulant une base de données en mémoire)
let USERS_DATA: Record<string, any> = {};

// Initialiser les données de l'utilisateur de test
USERS_DATA[TEST_USER.memberId] = { ...TEST_USER };
```

### Récupération des statistiques

```typescript
export function getGenerationStats(memberId: string = TEST_USER.memberId) {
  // S'assurer que l'utilisateur existe dans notre "base de données"
  if (!USERS_DATA[memberId]) {
    USERS_DATA[memberId] = { ...TEST_USER, memberId };
  }
  
  // Vérifier et mettre à jour les tokens si nécessaire
  checkAndUpdateTokensForBilling(memberId);
  
  return {
    tokenBalance: USERS_DATA[memberId].tokenBalance,
    tokensUsed: USERS_DATA[memberId].tokensUsed,
    articlesGenerated: USERS_DATA[memberId].articlesGenerated,
    productDescriptionsGenerated: USERS_DATA[memberId].productDescriptionsGenerated,
    totalGenerations: USERS_DATA[memberId].articlesGenerated + USERS_DATA[memberId].productDescriptionsGenerated,
    nextBillingDate: getNextBillingDate(),
    lastBillingDate: getLastBillingDate()
  };
}
```

### Enregistrement d'une génération

```typescript
export async function recordGeneration(
  tokenCost: number, 
  isProductDescription: boolean = false,
  memberId: string = TEST_USER.memberId
): Promise<{success: boolean, message: string}> {
  // S'assurer que l'utilisateur existe dans notre "base de données"
  if (!USERS_DATA[memberId]) {
    USERS_DATA[memberId] = { ...TEST_USER, memberId };
  }
  
  // Vérifier si l'utilisateur a suffisamment de tokens
  if (USERS_DATA[memberId].tokenBalance < tokenCost) {
    return {
      success: false,
      message: `Solde de tokens insuffisant. Vous avez besoin de ${tokenCost} tokens pour cette génération.`
    };
  }
  
  // Déduire les tokens
  USERS_DATA[memberId].tokenBalance -= tokenCost;
  USERS_DATA[memberId].tokensUsed += tokenCost;
  
  // Incrémenter le compteur approprié
  if (isProductDescription) {
    USERS_DATA[memberId].productDescriptionsGenerated += 1;
  } else {
    USERS_DATA[memberId].articlesGenerated += 1;
  }
  
  // Simuler un délai de traitement
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return {
    success: true,
    message: `${tokenCost} tokens déduits avec succès. Nouveau solde: ${USERS_DATA[memberId].tokenBalance}`
  };
}
```

## Utilisation dans l'application

### Dans les composants React

```typescript
import { useStats } from '@/app/context/stats-context';

function MyComponent() {
  const { stats, isLoading, refreshStats } = useStats();
  
  // Utiliser stats.tokenBalance, stats.articlesGenerated, etc.
  
  // Rafraîchir les statistiques après une action
  const handleAction = async () => {
    // Effectuer une action...
    await refreshStats();
  };
}
```

### Dans les routes API

```typescript
import { recordGeneration, getGenerationStats } from '@/app/lib/checkout-champ';

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { tokenCost, isProductDescription, memberId } = data;
  
  // Enregistrer la génération
  const result = await recordGeneration(tokenCost, isProductDescription, memberId);
  
  // Récupérer les statistiques mises à jour
  const updatedStats = getGenerationStats(memberId);
  
  // Retourner les statistiques mises à jour
  return NextResponse.json({
    success: true,
    stats: updatedStats
  });
}
```

## Avantages et limites

### Avantages

1. **Simplicité** : Pas besoin de configurer une base de données externe
2. **Performance** : Accès rapide aux données en mémoire
3. **Cohérence** : Les données sont toujours à jour pour tous les composants
4. **Isolation** : Chaque utilisateur a ses propres statistiques

### Limites

1. **Persistance** : Les données sont perdues si le serveur redémarre
2. **Scalabilité** : Ne convient pas pour un grand nombre d'utilisateurs ou de données
3. **Réplication** : Ne fonctionne pas avec plusieurs instances de serveur

## Évolutions possibles

Pour une application en production, il faudrait envisager :

1. **Persistance des données** : Sauvegarder régulièrement les données dans un fichier JSON
2. **Système de cache** : Utiliser un système comme Redis pour partager les données entre instances
3. **Base de données légère** : Migrer vers SQLite pour une persistance sans configuration complexe 