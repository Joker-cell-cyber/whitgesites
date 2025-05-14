'use server';

/**
 * Actions serveur pour Redis
 * 
 * Ce fichier contient toutes les fonctions qui interagissent avec Redis.
 * La directive 'use server' en haut du fichier indique que toutes les fonctions
 * exportées sont des actions serveur et ne seront jamais exécutées côté client.
 */

import { Transaction, UserStats, UserStorage } from './types/index';
import { TEST_USER_ID, USER_STATS_PREFIX, USER_TRANSACTIONS_PREFIX } from './constants';
import { withRedis, getRedisClient } from './redis-client';
import { getDefaultUserStats } from './getDefaultUserStats';

// Le client Redis est maintenant géré par le module redis-client

// Données de test pour le développement
const testUsers = [
  {
    id: 'test-user-1',
    email: 'test1@example.com',
    name: 'Test User 1',
    tokensRemaining: 100,
    subscription: 'free',
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  },
  {
    id: 'test-user-2',
    email: 'test2@example.com',
    name: 'Test User 2',
    tokensRemaining: 50,
    subscription: 'pro',
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  },
  {
    id: 'test-user-3',
    email: 'test@test.com',
    name: 'Test User Demo',
    tokensRemaining: 200,
    subscription: 'pro',
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  }
]

/**
 * Initialise les données de test dans Redis
 * Crée un utilisateur de test avec des tokens prédéfinis
 */
export async function initializeTestData(): Promise<{success: boolean, error?: unknown}> {
  return withRedis(async (client) => {
    try {
      // Créer un utilisateur de test
      const testUserId = "test123";
      const testUser = {
        id: testUserId,
        email: "test@test.com",
        name: "Utilisateur Test",
        password: "TEST1234", 
        role: "user",
      };

      console.log("[Upstash] Initialisation des données de test...");
      
      // Stocker l'utilisateur avec le format correct
      await client.hset(`user:${testUserId}`, testUser);
      
      // Initialiser les statistiques pour l'utilisateur test
      const initialStats: UserStats = {
        tokensRemaining: 6980,
        totalEarned: 6980,
        totalSpent: 0,
        articleCount: 0,
        chatMessageCount: 0,
        workoutPlanCount: 0,
        nutritionPlanCount: 0,
        lastUpdated: new Date().toISOString(),
        lastBillingDate: undefined,
        nextBillingDate: undefined
      };
      
      // Stocker avec le préfixe correct
      await client.set(`${USER_STATS_PREFIX}${testUserId}`, JSON.stringify(initialStats));
      
      // Ajouter une transaction de crédit initial
      const initialTransaction: Transaction = {
        id: Math.random().toString(36).substring(2, 15),
        userId: testUserId,
        timestamp: new Date().toISOString(),
        type: 'CREDIT',
        amount: 6980,
        description: 'Crédits initiaux',
        balance: 6980
      };
      
      // Stocker la transaction avec le préfixe correct
      await client.lpush(`${USER_TRANSACTIONS_PREFIX}${testUserId}`, JSON.stringify(initialTransaction));
      
      console.log("[Upstash] Données de test initialisées avec succès");
      return { success: true };
    } catch (error) {
      console.error("[Upstash] Erreur lors de l'initialisation des données de test:", error);
      return { success: false, error };
    }
  });
}

/**
 * Récupère un utilisateur par ID
 */
export async function getUser(userId: string): Promise<UserStorage | null> {
  try {
    const client = await getRedisClient();
    const userData = await client.hgetall(`user:${userId}`);
    
    if (!userData || Object.keys(userData).length === 0) {
      return null;
    }
    
    return userData as unknown as UserStorage;
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'utilisateur ${userId}:`, error);
    return null;
  }
}

/**
 * Met à jour les données d'un utilisateur
 */
export async function updateUser(userId: string, data: Partial<UserStorage>): Promise<boolean> {
  try {
    const client = await getRedisClient();
    await client.hset(`user:${userId}`, data);
    return true;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de l'utilisateur ${userId}:`, error);
    return false;
  }
}

/**
 * Supprime un utilisateur par ID
 */
export async function deleteUser(userId: string): Promise<boolean> {
  try {
    const client = await getRedisClient();
    await client.del(`user:${userId}`);
    return true;
  } catch (error) {
    console.error(`Erreur lors de la suppression de l'utilisateur ${userId}:`, error);
    return false;
  }
}

/**
 * Récupère tous les utilisateurs
 */
export async function getAllUsers(): Promise<UserStorage[]> {
  try {
    const client = await getRedisClient();
    const keys = await client.keys('user:*');
    const users: UserStorage[] = [];
    
    for (const key of keys) {
      try {
        // Avec Upstash, on utilise hgetall (minuscule)
        const userData = await client.hgetall(key);
        if (userData && Object.keys(userData).length > 0) {
          users.push(userData as unknown as UserStorage);
        }
      } catch (err) {
        // Si la clé n'est pas un hash, essayons de la lire comme une string
        try {
          const userData = await client.get(key);
          if (userData) {
            const parsedData = typeof userData === 'string' ? JSON.parse(userData) : userData;
            users.push(parsedData as UserStorage);
          }
        } catch (stringErr) {
          console.error(`Impossible de lire la clé ${key} comme hash ou string:`, stringErr);
        }
      }
    }
    
    return users;
  } catch (error) {
    console.error('Erreur lors de la récupération de tous les utilisateurs:', error);
    return [];
  }
}

// Fonction pour vérifier si nous sommes en environnement de production
function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

// Fonction pour générer un UUID unique
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Traite la facturation mensuelle d'un utilisateur
 * @param userId ID de l'utilisateur
 * @param stats Statistiques actuelles de l'utilisateur
 */
async function processMonthlyBilling(userId: string, stats: UserStats): Promise<void> {
  // Vérifier si la date de facturation est définie et est dépassée
  if (!stats.nextBillingDate) {
    return; // Pas de date de facturation définie, rien à faire
  }
  
  const nextBillingDate = new Date(stats.nextBillingDate);
  const now = new Date();
  
  if (nextBillingDate <= now) {
    console.log(`[Redis] Facturation mensuelle pour ${userId}`);
    
    // Mettre à jour les dates de facturation
    const lastBillingDate = nextBillingDate.toISOString();
    const newNextBillingDate = new Date(nextBillingDate);
    newNextBillingDate.setMonth(newNextBillingDate.getMonth() + 1);
    
    // Mettre à jour les statistiques
    stats.lastBillingDate = lastBillingDate;
    stats.nextBillingDate = newNextBillingDate.toISOString();
    stats.lastUpdated = new Date().toISOString();
    
    // Sauvegarder les statistiques mises à jour
    try {
      const client = await getRedisClient();
      await client.set(`${USER_STATS_PREFIX}${userId}`, JSON.stringify(stats));
    console.log(`[Redis] Facturation mensuelle effectuée pour ${userId}`);
    } catch (error) {
      console.error(`[Redis] Erreur lors de la facturation mensuelle pour ${userId}:`, error);
    }
  }
}

/**
 * Récupérer les statistiques d'un utilisateur
 * @param userId ID de l'utilisateur
 * @returns Statistiques de l'utilisateur
 */
export async function getUserStats(userId: string): Promise<UserStats> {
  try {
    const client = await getRedisClient();
    // Récupérer les statistiques depuis Redis
    const key = `${USER_STATS_PREFIX}${userId}`;
    const statsStr = await client.get(key);
    const stats = statsStr ? (typeof statsStr === 'string' ? JSON.parse(statsStr) : statsStr) : null;

    // Si l'utilisateur n'existe pas encore, initialiser avec les valeurs par défaut
      if (!stats) {
      const defaultStats = { ...getDefaultUserStats() };
      await client.set(key, JSON.stringify(defaultStats));
      return defaultStats;
    }

    return stats;
  } catch (error) {
    console.error(`Erreur lors de la récupération des statistiques pour ${userId}:`, error);
    // En cas d'erreur, retourner les statistiques par défaut
    return getDefaultUserStats();
  }
}

/**
 * Récupérer l'historique des transactions d'un utilisateur
 * @param userId ID de l'utilisateur
 * @returns Liste des transactions
 */
export async function getUserTransactions(userId: string): Promise<Transaction[]> {
  try {
    const client = await getRedisClient();
    const key = `${USER_TRANSACTIONS_PREFIX}${userId}`;
    const transactionsStr = await client.lrange(key, 0, -1);
    
    return transactionsStr.map(txStr => 
      typeof txStr === 'string' ? JSON.parse(txStr) : txStr
    ) as Transaction[];
  } catch (error) {
    console.error(`Erreur lors de la récupération des transactions pour ${userId}:`, error);
    return [];
  }
}

/**
 * Enregistrer une génération de contenu et déduire les tokens
 */
export async function recordGeneration(
  userId: string,
  tokenCost: number,
  contentType: 'ARTICLE' | 'CHAT_MESSAGE' | 'WORKOUT_PLAN' | 'NUTRITION_PLAN',
  description: string
): Promise<{ success: boolean; message: string; stats: UserStats }> {
  try {
    const client = await getRedisClient();
      const statsKey = `${USER_STATS_PREFIX}${userId}`;
      const transactionsKey = `${USER_TRANSACTIONS_PREFIX}${userId}`;
      
      // Récupérer les statistiques actuelles
    const stats = await getUserStats(userId);

    // Vérifier si l'utilisateur a suffisamment de tokens
    if (stats.tokensRemaining < tokenCost) {
        return {
          success: false,
        message: `Solde insuffisant: ${stats.tokensRemaining} tokens disponibles, ${tokenCost} requis.`,
        stats,
      };
    }

    // Mettre à jour les statistiques selon le type de contenu
    const newStats = { ...stats };
    newStats.tokensRemaining -= tokenCost;
    newStats.totalSpent += tokenCost;

    switch (contentType) {
      case 'ARTICLE':
        newStats.articleCount = (newStats.articleCount || 0) + 1;
        break;
      case 'CHAT_MESSAGE':
        newStats.chatMessageCount += 1;
        break;
      case 'WORKOUT_PLAN':
        newStats.workoutPlanCount += 1;
        break;
      case 'NUTRITION_PLAN':
        newStats.nutritionPlanCount += 1;
        break;
    }

    // Créer une transaction pour tracer l'utilisation
      const transaction: Transaction = {
      id: Math.random().toString(36).substring(2, 15),
      userId,
      timestamp: new Date().toISOString(),
        type: 'DEBIT',
        amount: tokenCost,
      contentType,
        description,
      balance: newStats.tokensRemaining
    };

    // Sauvegarder les changements dans Redis
    await client.set(statsKey, JSON.stringify(newStats));
    await client.lpush(transactionsKey, JSON.stringify(transaction));
      
      return {
        success: true,
      message: `${tokenCost} tokens déduits avec succès.`,
      stats: newStats
      };
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de la génération:', error);
    throw new Error("Une erreur s'est produite lors de l'enregistrement de la génération.");
  }
}

/**
 * Ajouter des tokens au compte utilisateur
 */
export async function addTokens(
  userId: string,
  amount: number,
  description: string
): Promise<{ success: boolean; message: string; stats: UserStats }> {
  try {
    const client = await getRedisClient();
      const statsKey = `${USER_STATS_PREFIX}${userId}`;
      const transactionsKey = `${USER_TRANSACTIONS_PREFIX}${userId}`;
      
      // Récupérer les statistiques actuelles
    const stats = await getUserStats(userId);
      
      // Mettre à jour les statistiques
    const newStats = { ...stats };
    newStats.tokensRemaining += amount;
    newStats.totalEarned += amount;
      
    // Créer une transaction pour tracer l'ajout
      const transaction: Transaction = {
      id: Math.random().toString(36).substring(2, 15),
      userId,
      timestamp: new Date().toISOString(),
        type: 'CREDIT',
        amount,
        description,
      balance: newStats.tokensRemaining
    };
    
    // Sauvegarder les changements dans Redis
    await client.set(statsKey, JSON.stringify(newStats));
    await client.lpush(transactionsKey, JSON.stringify(transaction));
      
      return {
        success: true,
      message: `${amount} tokens ajoutés avec succès.`,
      stats: newStats
      };
  } catch (error) {
    console.error('Erreur lors de l\'ajout de tokens:', error);
    throw new Error("Une erreur s'est produite lors de l'ajout de tokens.");
  }
}

/**
 * Réinitialiser les statistiques d'un utilisateur
 */
export async function resetUserStats(userId: string): Promise<{ success: boolean; message: string; stats: UserStats }> {
  try {
    const client = await getRedisClient();
    const key = `${USER_STATS_PREFIX}${userId}`;
    
    // Récupérer les statistiques par défaut
    const defaultStats = getDefaultUserStats();
    
    // Sauvegarder les statistiques réinitialisées
    await client.set(key, JSON.stringify(defaultStats));
      
      return {
        success: true,
      message: 'Statistiques réinitialisées avec succès',
      stats: defaultStats
      };
  } catch (error) {
    console.error(`Erreur lors de la réinitialisation des statistiques pour ${userId}:`, error);
    return {
      success: false,
      message: 'Erreur lors de la réinitialisation des statistiques',
      stats: getDefaultUserStats()
    };
  }
} 