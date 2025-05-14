/**
 * Module de compatibilité pour la migration vers Redis
 * 
 * Ce module sert de pont entre l'ancien système de stockage et le nouveau système Redis.
 * Il réexporte toutes les fonctions et types depuis redis-actions.ts pour maintenir
 * la compatibilité avec le code existant qui importe depuis server-state.ts
 */

import {
  getUserStats,
  getUserTransactions,
  recordGeneration,
  addTokens,
  resetUserStats,
  initializeTestData
} from './redis-actions';

import { TEST_USER_ID } from './constants';
import type { UserStats, Transaction } from './types/index';

// Alias de compatibilité pour les fonctions
export const getGenerationStats = getUserStats;
export const createUser = (userId: string) => getUserStats(userId);
export const getUser = (userId: string) => getUserStats(userId);
export const addTokensToAccount = addTokens;
export const getTransactionHistory = getUserTransactions;

// Réexporter les fonctions
export {
  getUserStats,
  getUserTransactions,
  recordGeneration,
  addTokens,
  resetUserStats,
  TEST_USER_ID
};

// Réexporter les types avec export type
export type { UserStats, Transaction };

// Fonction d'invalidation du cache pour la compatibilité
export function invalidateStatsCache(userId: string = TEST_USER_ID): void {
  // Cette fonction est maintenant un no-op car Redis gère tout directement
  console.log(`[Redis] Cache invalidation requested for ${userId} (no action needed)`);
}

// Initialiser les données de test au démarrage
// Cette fonction sera appelée une seule fois au démarrage du serveur
const initializeTestDataOnStartup = async () => {
  try {
    console.log('[ServerState] Initialisation des données de test...');
    await initializeTestData();
    console.log('[ServerState] Données de test initialisées');
  } catch (error) {
    console.error('[ServerState] Erreur lors de l\'initialisation des données de test:', error);
  }
};

// Exécuter l'initialisation
initializeTestDataOnStartup(); 