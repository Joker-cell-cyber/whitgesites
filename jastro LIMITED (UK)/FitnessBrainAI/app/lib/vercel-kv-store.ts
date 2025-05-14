/**
 * Module de stockage persistant basé sur Vercel KV
 * 
 * Ce module permet de stocker et récupérer des données utilisateur de manière
 * persistante et synchronisée entre tous les utilisateurs, en utilisant
 * uniquement Vercel KV (basé sur Redis).
 */

import { kv } from '@vercel/kv';

// Interface pour une transaction
export interface Transaction {
  id: string;
  type: 'CREDIT' | 'DEBIT';
  amount: number;
  description: string;
  contentType?: 'ARTICLE' | 'PRODUCT_DESCRIPTION';
  timestamp: string; // ISO string pour faciliter la sérialisation
}

// Interface pour les statistiques utilisateur
export interface UserStats {
  memberId: string;
  tokenBalance: number;
  tokensUsed: number;
  articlesGenerated: number;
  productDescriptionsGenerated: number;
  totalGenerations: number;
  nextBillingDate: string; // ISO string
  lastBillingDate: string; // ISO string
  lastUpdated: string;     // ISO string
  createdAt: string;       // ISO string
}

// Interface pour le stockage complet
export interface UserStorage {
  stats: UserStats;
  transactions: Transaction[];
}

// ID de l'utilisateur de test
export const TEST_USER_ID = 'test-user-id';

// Préfixes pour les clés Vercel KV
const USER_STATS_PREFIX = 'user:stats:';
const USER_TRANSACTIONS_PREFIX = 'user:transactions:';

// Données initiales pour l'utilisateur de test
const INITIAL_TEST_USER: UserStorage = {
  stats: {
    memberId: TEST_USER_ID,
    tokenBalance: 5000,
    tokensUsed: 0,
    articlesGenerated: 0,
    productDescriptionsGenerated: 0,
    totalGenerations: 0,
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
    tokenBalance: 4991, // 5000 - 9 tokens
    tokensUsed: 9,
    articlesGenerated: 3,
    productDescriptionsGenerated: 2,
    totalGenerations: 5,
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
      id: "article-1",
      type: 'DEBIT',
      amount: 3,
      description: 'Génération article',
      contentType: 'ARTICLE',
      timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "article-2",
      type: 'DEBIT',
      amount: 3,
      description: 'Génération article',
      contentType: 'ARTICLE',
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "product-1",
      type: 'DEBIT',
      amount: 2,
      description: 'Génération description produit',
      contentType: 'PRODUCT_DESCRIPTION',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "article-3",
      type: 'DEBIT',
      amount: 3,
      description: 'Génération article',
      contentType: 'ARTICLE',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "product-2",
      type: 'DEBIT',
      amount: 2,
      description: 'Génération description produit',
      contentType: 'PRODUCT_DESCRIPTION',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
    }
  ]
};

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
 * Récupérer les statistiques d'un utilisateur depuis Vercel KV
 * Initialise les données pour l'utilisateur de test s'il n'existe pas
 */
export async function getUserStats(userId: string = TEST_USER_ID): Promise<UserStats> {
  const key = `${USER_STATS_PREFIX}${userId}`;
  
  try {
    // Essayer de récupérer les stats depuis KV
    let stats = await kv.get<UserStats>(key);
    
    // Si l'utilisateur n'existe pas encore, l'initialiser
    if (!stats) {
      console.log(`[KVStore] Utilisateur ${userId} non trouvé, initialisation...`);
      
      if (userId === TEST_USER_ID) {
        // Utiliser les données de démo ou initiales selon l'environnement
        const initialData = isProduction() ? DEMO_TEST_USER : INITIAL_TEST_USER;
        stats = initialData.stats;
        
        // Sauvegarder les stats
        await kv.set(key, stats);
        
        // Sauvegarder les transactions initiales
        await kv.set(`${USER_TRANSACTIONS_PREFIX}${userId}`, initialData.transactions);
        
        console.log(`[KVStore] Utilisateur de test initialisé avec ${stats.tokenBalance} tokens`);
      } else {
        // Pour les autres utilisateurs, créer un nouveau compte
        stats = {
          memberId: userId,
          tokenBalance: 5000, // Solde initial
          tokensUsed: 0,
          articlesGenerated: 0,
          productDescriptionsGenerated: 0,
          totalGenerations: 0,
          nextBillingDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 5).toISOString(),
          lastBillingDate: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 5).toISOString(),
          lastUpdated: new Date().toISOString(),
          createdAt: new Date().toISOString()
        };
        
        // Sauvegarder les stats
        await kv.set(key, stats);
        
        // Créer une transaction initiale
        const initialTransaction: Transaction = {
          id: generateUUID(),
          type: 'CREDIT',
          amount: 5000,
          description: 'Initialisation du compte',
          timestamp: new Date().toISOString()
        };
        
        // Sauvegarder la transaction
        await kv.set(`${USER_TRANSACTIONS_PREFIX}${userId}`, [initialTransaction]);
        
        console.log(`[KVStore] Nouvel utilisateur créé: ${userId}`);
      }
    }
    
    // Vérifier si une facturation mensuelle doit être effectuée
    await processMonthlyBilling(userId, stats);
    
    // Récupérer les stats à jour après facturation éventuelle
    stats = await kv.get<UserStats>(key) || stats;
    
    console.log(`[KVStore] Statistiques récupérées pour ${userId}`);
    console.log(`[KVStore] Solde: ${stats.tokenBalance}, Utilisés: ${stats.tokensUsed}`);
    
    return {
      ...stats,
      // Convertir les dates pour l'API
      nextBillingDate: stats.nextBillingDate,
      lastBillingDate: stats.lastBillingDate
    };
  } catch (error) {
    console.error(`[KVStore] Erreur lors de la récupération des stats pour ${userId}:`, error);
    throw new Error(`Impossible de récupérer les statistiques: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
  }
}

/**
 * Récupérer l'historique des transactions d'un utilisateur
 */
export async function getTransactionHistory(userId: string = TEST_USER_ID): Promise<Transaction[]> {
  const key = `${USER_TRANSACTIONS_PREFIX}${userId}`;
  
  try {
    // Récupérer les transactions depuis KV
    const transactions = await kv.get<Transaction[]>(key);
    
    // Si aucune transaction n'existe, retourner un tableau vide
    if (!transactions) {
      return [];
    }
    
    // Trier par date décroissante
    return transactions.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  } catch (error) {
    console.error(`[KVStore] Erreur lors de la récupération des transactions pour ${userId}:`, error);
    return [];
  }
}

/**
 * Enregistrer une génération et mettre à jour les statistiques
 */
export async function recordGeneration(
  userId: string = TEST_USER_ID,
  tokenCost: number,
  isProductDescription: boolean = false
): Promise<{ success: boolean; message: string; stats: UserStats }> {
  const statsKey = `${USER_STATS_PREFIX}${userId}`;
  const transactionsKey = `${USER_TRANSACTIONS_PREFIX}${userId}`;
  
  try {
    // Récupérer les stats actuelles
    const stats = await getUserStats(userId);
    
    // Vérifier le solde
    if (stats.tokenBalance < tokenCost) {
      console.log(`[KVStore] Solde insuffisant pour ${userId}. Besoin: ${tokenCost}, Disponible: ${stats.tokenBalance}`);
      return {
        success: false,
        message: `Solde insuffisant. Besoin de ${tokenCost} tokens, solde actuel: ${stats.tokenBalance}`,
        stats
      };
    }
    
    // Mettre à jour les statistiques
    const oldBalance = stats.tokenBalance;
    stats.tokenBalance -= tokenCost;
    stats.tokensUsed += tokenCost;
    
    if (isProductDescription) {
      stats.productDescriptionsGenerated += 1;
    } else {
      stats.articlesGenerated += 1;
    }
    
    stats.totalGenerations += 1;
    stats.lastUpdated = new Date().toISOString();
    
    // Créer une nouvelle transaction
    const newTransaction: Transaction = {
      id: generateUUID(),
      type: 'DEBIT',
      amount: tokenCost,
      description: isProductDescription ? 'Génération description produit' : 'Génération article',
      contentType: isProductDescription ? 'PRODUCT_DESCRIPTION' : 'ARTICLE',
      timestamp: new Date().toISOString()
    };
    
    // Récupérer les transactions actuelles
    const transactions = await getTransactionHistory(userId);
    
    // Ajouter la nouvelle transaction
    transactions.unshift(newTransaction);
    
    // Sauvegarder les mises à jour
    await kv.set(statsKey, stats);
    await kv.set(transactionsKey, transactions);
    
    console.log(`[KVStore] Génération enregistrée pour ${userId}`);
    console.log(`[KVStore] Ancien solde: ${oldBalance}, Nouveau solde: ${stats.tokenBalance}`);
    
    return {
      success: true,
      message: 'Génération enregistrée avec succès',
      stats
    };
  } catch (error) {
    console.error(`[KVStore] Erreur lors de l'enregistrement de la génération pour ${userId}:`, error);
    return {
      success: false,
      message: `Erreur lors de l'enregistrement: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
      stats: await getUserStats(userId)
    };
  }
}

/**
 * Ajouter des tokens au compte utilisateur
 */
export async function addTokensToAccount(
  userId: string = TEST_USER_ID,
  amount: number,
  description: string = 'Achat de tokens'
): Promise<{ success: boolean; message: string; stats: UserStats }> {
  const statsKey = `${USER_STATS_PREFIX}${userId}`;
  const transactionsKey = `${USER_TRANSACTIONS_PREFIX}${userId}`;
  
  try {
    // Récupérer les stats actuelles
    const stats = await getUserStats(userId);
    
    // Mettre à jour le solde
    const oldBalance = stats.tokenBalance;
    stats.tokenBalance += amount;
    stats.lastUpdated = new Date().toISOString();
    
    // Créer une nouvelle transaction
    const newTransaction: Transaction = {
      id: generateUUID(),
      type: 'CREDIT',
      amount,
      description,
      timestamp: new Date().toISOString()
    };
    
    // Récupérer les transactions actuelles
    const transactions = await getTransactionHistory(userId);
    
    // Ajouter la nouvelle transaction
    transactions.unshift(newTransaction);
    
    // Sauvegarder les mises à jour
    await kv.set(statsKey, stats);
    await kv.set(transactionsKey, transactions);
    
    console.log(`[KVStore] Tokens ajoutés pour ${userId}: ${amount}. Nouveau solde: ${stats.tokenBalance}`);
    
    return {
      success: true,
      message: `${amount} tokens ajoutés avec succès. Ancien solde: ${oldBalance}, Nouveau solde: ${stats.tokenBalance}`,
      stats
    };
  } catch (error) {
    console.error(`[KVStore] Erreur lors de l'ajout de tokens pour ${userId}:`, error);
    return {
      success: false,
      message: `Erreur lors de l'ajout de tokens: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
      stats: await getUserStats(userId)
    };
  }
}

/**
 * Réinitialiser les statistiques d'un utilisateur
 */
export async function resetUserStats(userId: string = TEST_USER_ID): Promise<{ success: boolean; message: string; stats: UserStats }> {
  try {
    // Utiliser les données appropriées selon l'environnement
    const initialData = isProduction() ? DEMO_TEST_USER : INITIAL_TEST_USER;
    
    // Sauvegarder les données initiales
    await kv.set(`${USER_STATS_PREFIX}${userId}`, initialData.stats);
    await kv.set(`${USER_TRANSACTIONS_PREFIX}${userId}`, initialData.transactions);
    
    console.log(`[KVStore] Statistiques réinitialisées pour ${userId}`);
    
    return {
      success: true,
      message: 'Statistiques réinitialisées avec succès',
      stats: await getUserStats(userId)
    };
  } catch (error) {
    console.error(`[KVStore] Erreur lors de la réinitialisation des stats pour ${userId}:`, error);
    return {
      success: false,
      message: `Erreur lors de la réinitialisation: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
      stats: await getUserStats(userId)
    };
  }
}

/**
 * Vérifier si une facturation mensuelle doit être effectuée
 */
async function processMonthlyBilling(userId: string, stats: UserStats): Promise<void> {
  const statsKey = `${USER_STATS_PREFIX}${userId}`;
  const transactionsKey = `${USER_TRANSACTIONS_PREFIX}${userId}`;
  
  try {
    // Convertir les dates
    const nextBillingDate = new Date(stats.nextBillingDate);
    const today = new Date();
    
    // Si nous sommes après la date de facturation
    if (today > nextBillingDate) {
      console.log(`[KVStore] Traitement de la facturation pour ${userId}`);
      let modified = false;
      
      // Récupérer les transactions actuelles
      const transactions = await getTransactionHistory(userId);
      
      // Calculer combien de mois se sont écoulés
      let currentDate = new Date(nextBillingDate);
      
      while (currentDate < today) {
        // Copier la date actuelle comme dernière date de facturation
        stats.lastBillingDate = currentDate.toISOString();
        
        // Avancer d'un mois en conservant le jour 5
        const nextMonth = currentDate.getMonth() + 1;
        const nextYear = currentDate.getFullYear() + Math.floor(nextMonth / 12);
        const adjustedMonth = nextMonth % 12;
        
        // Créer la nouvelle date de facturation (toujours le 5 du mois)
        currentDate = new Date(nextYear, adjustedMonth, 5);
        
        // Mettre à jour la prochaine date de facturation
        stats.nextBillingDate = currentDate.toISOString();
        
        // Ajouter les tokens mensuels (300)
        stats.tokenBalance += 300;
        
        // Créer une transaction de facturation
        const billingTransaction: Transaction = {
          id: generateUUID(),
          type: 'CREDIT',
          amount: 300,
          description: `Facturation mensuelle du ${new Date(stats.lastBillingDate).toLocaleDateString('fr-FR')}`,
          timestamp: new Date().toISOString()
        };
        
        // Ajouter la transaction
        transactions.unshift(billingTransaction);
        
        console.log(`[KVStore] Facturation du ${new Date(stats.lastBillingDate).toLocaleDateString('fr-FR')} pour ${userId}: 300 tokens ajoutés`);
        modified = true;
      }
      
      // Si des modifications ont été effectuées, sauvegarder
      if (modified) {
        stats.lastUpdated = new Date().toISOString();
        await kv.set(statsKey, stats);
        await kv.set(transactionsKey, transactions);
        console.log(`[KVStore] Facturation complétée pour ${userId}. Nouveau solde: ${stats.tokenBalance}`);
      }
    }
  } catch (error) {
    console.error(`[KVStore] Erreur lors du traitement de la facturation pour ${userId}:`, error);
  }
} 