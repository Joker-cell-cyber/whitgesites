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
import { withRedis } from './redis-client';

// Données initiales pour l'utilisateur de test
const INITIAL_TEST_USER: UserStorage = {
  stats: {
    memberId: TEST_USER_ID,
    tokenBalance: 5000,
    tokensUsed: 0,
    messagesSent: 0,
    totalConversations: 0,
    coachingSessionsCompleted: 0,
    totalInteractions: 0,
    nextBillingDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 5).toISOString(),
    lastBillingDate: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 5).toISOString(),
    lastUpdated: new Date().toISOString(),
    createdAt: new Date().toISOString()
  },
  transactions: [{
    id: "initial-transaction-id",
    type: 'CREDIT',
    amount: 5000,
    description: 'Initialisation du compte',
    timestamp: new Date().toISOString()
  }]
};

// Données initiales avec un historique simulé pour la démo
const DEMO_TEST_USER: UserStorage = {
  stats: {
    memberId: TEST_USER_ID,
    tokenBalance: 4990, // 5000 - 10 tokens
    tokensUsed: 10,
    messagesSent: 5,
    totalConversations: 1,
    coachingSessionsCompleted: 1,
    totalInteractions: 6,
    nextBillingDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 5).toISOString(),
    lastBillingDate: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 5).toISOString(),
    lastUpdated: new Date().toISOString(),
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 7 jours avant
  },
  transactions: [
    {
      id: "initial-credit",
      type: 'CREDIT',
      amount: 5000,
      description: 'Initialisation du compte',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "coaching-session-1",
      type: 'DEBIT',
      amount: 5,
      description: 'Session de coaching',
      contentType: 'COACHING',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "message-1",
      type: 'DEBIT',
      amount: 1,
      description: 'Message envoyé',
      contentType: 'MESSAGE',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "message-2",
      type: 'DEBIT',
      amount: 1,
      description: 'Message envoyé',
      contentType: 'MESSAGE',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "message-3",
      type: 'DEBIT',
      amount: 1,
      description: 'Message envoyé',
      contentType: 'MESSAGE',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "message-4",
      type: 'DEBIT',
      amount: 1,
      description: 'Message envoyé',
      contentType: 'MESSAGE',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "message-5",
      type: 'DEBIT',
      amount: 1,
      description: 'Message envoyé',
      contentType: 'MESSAGE',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
    }
  ]
};

// Fonction pour obtenir les statistiques par défaut pour un utilisateur
function getDefaultUserStats(userId: string): UserStats {
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  // Déterminer la prochaine date de facturation (le 5 du mois)
  let nextBillingMonth, nextBillingYear;
  let lastBillingMonth, lastBillingYear;
  
  if (currentDay < 5) {
    // Si nous sommes avant le 5 du mois, la prochaine facturation est le 5 du mois courant
    nextBillingMonth = currentMonth;
    nextBillingYear = currentYear;
    // La dernière facturation était le 5 du mois précédent
    lastBillingMonth = currentMonth - 1;
    lastBillingYear = currentYear;
  } else {
    // Si nous sommes après le 5 du mois, la prochaine facturation est le 5 du mois suivant
    nextBillingMonth = currentMonth + 1;
    nextBillingYear = currentYear;
    // La dernière facturation était le 5 du mois courant
    lastBillingMonth = currentMonth;
    lastBillingYear = currentYear;
  }
  
  // Ajuster l'année si nécessaire
  if (lastBillingMonth < 0) {
    lastBillingMonth = 11; // Décembre
    lastBillingYear = currentYear - 1;
  }
  
  // Créer les dates de facturation
  const nextBillingDate = new Date(nextBillingYear, nextBillingMonth, 5);
  const lastBillingDate = new Date(lastBillingYear, lastBillingMonth, 5);
  
  return {
    memberId: userId,
    tokenBalance: 5000,
    tokensUsed: 0,
    messagesSent: 0,
    totalConversations: 0,
    coachingSessionsCompleted: 0,
    totalInteractions: 0,
    nextBillingDate: nextBillingDate.toISOString(),
    lastBillingDate: lastBillingDate.toISOString(),
    lastUpdated: today.toISOString(),
    createdAt: today.toISOString()
  };
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
 * Traite la facturation mensuelle si nécessaire
 * @param userId ID de l'utilisateur
 * @param stats Statistiques actuelles de l'utilisateur
 * @param redisClient Client Redis
 */
async function processMonthlyBilling(userId: string, stats: UserStats, redisClient: any): Promise<void> {
  // Vérifier si la date de facturation est dépassée
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
    await redisClient.set(`${USER_STATS_PREFIX}${userId}`, JSON.stringify(stats));
    
    console.log(`[Redis] Facturation mensuelle effectuée pour ${userId}`);
  }
}

/**
 * Récupérer les statistiques d'un utilisateur depuis Redis
 * Initialise les données pour l'utilisateur de test s'il n'existe pas
 */
export async function getUserStats(userId: string = TEST_USER_ID): Promise<UserStats> {
  const key = `${USER_STATS_PREFIX}${userId}`;
  
  try {
    return await withRedis(async (redisClient) => {
      // Essayer de récupérer les stats depuis Redis
      let statsData = await redisClient.get(key);
      let stats: UserStats | null = statsData ? JSON.parse(statsData) : null;
      
      // Si l'utilisateur n'existe pas encore, l'initialiser
      if (!stats) {
        console.log(`[Redis] Utilisateur ${userId} non trouvé, initialisation...`);
        
        if (userId === TEST_USER_ID) {
          // Utiliser les données de démo ou initiales selon l'environnement
          const initialData = isProduction() ? DEMO_TEST_USER : INITIAL_TEST_USER;
          stats = initialData.stats;
          
          // Sauvegarder les stats
          await redisClient.set(key, JSON.stringify(stats));
          
          // Sauvegarder les transactions initiales
          await redisClient.set(`${USER_TRANSACTIONS_PREFIX}${userId}`, JSON.stringify(initialData.transactions));
          
          console.log(`[Redis] Utilisateur de test initialisé avec ${stats.tokenBalance} tokens`);
        } else {
          // Pour les autres utilisateurs, créer un nouveau compte
          stats = getDefaultUserStats(userId);
          
          // Sauvegarder les stats
          await redisClient.set(key, JSON.stringify(stats));
          
          // Créer une transaction initiale
          const initialTransaction: Transaction = {
            id: generateUUID(),
            type: 'CREDIT',
            amount: 5000,
            description: 'Initialisation du compte',
            timestamp: new Date().toISOString()
          };
          
          // Sauvegarder la transaction
          await redisClient.set(`${USER_TRANSACTIONS_PREFIX}${userId}`, JSON.stringify([initialTransaction]));
          
          console.log(`[Redis] Nouvel utilisateur créé: ${userId}`);
        }
      }
      
      // Vérifier si une facturation mensuelle doit être effectuée
      await processMonthlyBilling(userId, stats, redisClient);
      
      // Récupérer les stats à jour après facturation éventuelle
      statsData = await redisClient.get(key);
      stats = statsData ? JSON.parse(statsData) : stats;
      
      // Vérifier si stats existe avant d'accéder à ses propriétés
      if (!stats) {
        console.log(`[Redis] Aucune statistique trouvée pour ${userId}, initialisation avec les valeurs par défaut`);
        stats = getDefaultUserStats(userId);
      }
      
      console.log(`[Redis] Statistiques récupérées pour ${userId}`);
      console.log(`[Redis] Solde: ${stats.tokenBalance}, Utilisés: ${stats.tokensUsed}`);
      
      return {
        ...stats,
        // Convertir les dates pour l'API
        nextBillingDate: stats.nextBillingDate,
        lastBillingDate: stats.lastBillingDate
      };
    });
  } catch (error) {
    console.error(`[Redis] Erreur lors de la récupération des stats pour ${userId}:`, error);
    
    // En cas d'erreur, retourner des données de test
    const initialData = isProduction() ? DEMO_TEST_USER : INITIAL_TEST_USER;
    return initialData.stats;
  }
}

/**
 * Récupérer l'historique des transactions d'un utilisateur
 */
export async function getTransactionHistory(userId: string = TEST_USER_ID): Promise<Transaction[]> {
  const key = `${USER_TRANSACTIONS_PREFIX}${userId}`;
  
  try {
    return await withRedis(async (redisClient) => {
      // Récupérer les transactions depuis Redis
      const transactionsData = await redisClient.get(key);
      const transactions: Transaction[] = transactionsData ? JSON.parse(transactionsData) : [];
      
      // Trier par date décroissante
      return transactions.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    });
  } catch (error) {
    console.error(`[Redis] Erreur lors de la récupération des transactions pour ${userId}:`, error);
    
    // En cas d'erreur, retourner des données de test
    const initialData = isProduction() ? DEMO_TEST_USER : INITIAL_TEST_USER;
    return initialData.transactions;
  }
}

/**
 * Enregistrer une génération et déduire les tokens
 */
export async function recordGeneration(
  userId: string,
  tokenCost: number,
  contentType: 'MESSAGE' | 'COACHING',
  description: string
): Promise<{ success: boolean; message: string; stats: UserStats }> {
  try {
    return await withRedis(async (redisClient) => {
      const statsKey = `${USER_STATS_PREFIX}${userId}`;
      const transactionsKey = `${USER_TRANSACTIONS_PREFIX}${userId}`;
      
      // Récupérer les statistiques actuelles
      const statsData = await redisClient.get(statsKey);
      if (!statsData) {
        throw new Error(`Utilisateur ${userId} non trouvé`);
      }
      
      const stats: UserStats = JSON.parse(statsData);
      
      // Vérifier le solde
      if (stats.tokenBalance < tokenCost) {
        console.log(`[Redis] Solde insuffisant pour ${userId}. Besoin: ${tokenCost}, Disponible: ${stats.tokenBalance}`);
        return {
          success: false,
          message: `Solde insuffisant. Vous avez besoin de ${tokenCost} tokens, mais vous n'en avez que ${stats.tokenBalance}.`,
          stats
        };
      }
      
      // Mettre à jour les statistiques
      stats.tokenBalance -= tokenCost;
      stats.tokensUsed += tokenCost;
      stats.totalInteractions = (stats.totalInteractions || 0) + 1;
      
      if (contentType === 'MESSAGE') {
        stats.messagesSent = (stats.messagesSent || 0) + 1;
      } else if (contentType === 'COACHING') {
        stats.coachingSessionsCompleted = (stats.coachingSessionsCompleted || 0) + 1;
      }
      
      stats.lastUpdated = new Date().toISOString();
      
      // Créer une transaction
      const transaction: Transaction = {
        id: generateUUID(),
        type: 'DEBIT',
        amount: tokenCost,
        description,
        contentType,
        timestamp: new Date().toISOString()
      };
      
      // Récupérer les transactions actuelles
      const transactionsData = await redisClient.get(transactionsKey);
      const transactions: Transaction[] = transactionsData ? JSON.parse(transactionsData) : [];
      
      // Ajouter la nouvelle transaction
      transactions.unshift(transaction);
      
      // Sauvegarder les données mises à jour
      await redisClient.set(statsKey, JSON.stringify(stats));
      await redisClient.set(transactionsKey, JSON.stringify(transactions));
      
      console.log(`[Redis] Génération enregistrée pour ${userId}`);
      console.log(`[Redis] Nouveau solde: ${stats.tokenBalance}, Utilisés: ${stats.tokensUsed}`);
      
      return {
        success: true,
        message: `Génération réussie. ${tokenCost} tokens déduits.`,
        stats
      };
    }, true); // Fermer la connexion après l'opération
  } catch (error) {
    console.error(`[Redis] Erreur lors de l'enregistrement de la génération pour ${userId}:`, error);
    return {
      success: false,
      message: `Une erreur est survenue: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
      stats: await getUserStats(userId)
    };
  }
}

/**
 * Ajouter des tokens au compte utilisateur
 */
export async function addTokens(
  userId: string,
  amount: number,
  description: string = "Achat de tokens"
): Promise<{ success: boolean; message: string; stats: UserStats }> {
  try {
    return await withRedis(async (redisClient) => {
      const statsKey = `${USER_STATS_PREFIX}${userId}`;
      const transactionsKey = `${USER_TRANSACTIONS_PREFIX}${userId}`;
      
      // Récupérer les statistiques actuelles
      const statsData = await redisClient.get(statsKey);
      if (!statsData) {
        throw new Error(`Utilisateur ${userId} non trouvé`);
      }
      
      const stats: UserStats = JSON.parse(statsData);
      
      // Mettre à jour les statistiques
      stats.tokenBalance += amount;
      stats.lastUpdated = new Date().toISOString();
      
      // Créer une transaction
      const transaction: Transaction = {
        id: generateUUID(),
        type: 'CREDIT',
        amount,
        description,
        timestamp: new Date().toISOString()
      };
      
      // Récupérer les transactions actuelles
      const transactionsData = await redisClient.get(transactionsKey);
      const transactions: Transaction[] = transactionsData ? JSON.parse(transactionsData) : [];
      
      // Ajouter la nouvelle transaction
      transactions.unshift(transaction);
      
      // Sauvegarder les données mises à jour
      await redisClient.set(statsKey, JSON.stringify(stats));
      await redisClient.set(transactionsKey, JSON.stringify(transactions));
      
      console.log(`[Redis] Tokens ajoutés pour ${userId}: ${amount}. Nouveau solde: ${stats.tokenBalance}`);
      
      return {
        success: true,
        message: `${amount} tokens ajoutés à votre compte.`,
        stats
      };
    }, true); // Fermer la connexion après l'opération
  } catch (error) {
    console.error('[Redis] Erreur lors de l\'ajout de tokens:', error);
    
    return {
      success: false,
      message: `Une erreur est survenue: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
      stats: await getUserStats(userId)
    };
  }
}

/**
 * Réinitialiser les statistiques utilisateur (pour les tests)
 */
export async function resetUserStats(userId: string = TEST_USER_ID): Promise<{ success: boolean; message: string; stats: UserStats }> {
  try {
    return await withRedis(async (redisClient) => {
      // Utiliser les données appropriées selon l'environnement
      const initialData = isProduction() ? DEMO_TEST_USER : INITIAL_TEST_USER;
      
      // Sauvegarder les statistiques
      await redisClient.set(`${USER_STATS_PREFIX}${userId}`, JSON.stringify(initialData.stats));
      
      // Sauvegarder les transactions
      await redisClient.set(`${USER_TRANSACTIONS_PREFIX}${userId}`, JSON.stringify(initialData.transactions));
      
      console.log(`[Redis] Statistiques réinitialisées pour ${userId}`);
      
      return {
        success: true,
        message: 'Statistiques réinitialisées avec succès.',
        stats: initialData.stats
      };
    }, true); // Fermer la connexion après l'opération
  } catch (error) {
    console.error(`[Redis] Erreur lors de la réinitialisation des statistiques pour ${userId}:`, error);
    return {
      success: false,
      message: `Une erreur est survenue: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
      stats: await getUserStats(userId)
    };
  }
} 