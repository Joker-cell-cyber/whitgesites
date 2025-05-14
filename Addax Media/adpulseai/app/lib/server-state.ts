/**
 * Module de compatibilité pour la migration vers Redis
 * 
 * Ce module sert de pont entre l'ancien système de stockage et le nouveau système Redis.
 * Il réexporte toutes les fonctions et types depuis redis-actions.ts pour maintenir
 * la compatibilité avec le code existant qui importe depuis server-state.ts
 */

import {
  getUserStats,
  getTransactionHistory,
  recordGeneration,
  addTokens,
  resetUserStats
} from './redis-actions';

import { TEST_USER_ID } from './constants';
import type { UserStats, Transaction } from './types/index';

// Alias de compatibilité pour les fonctions
export const getGenerationStats = getUserStats;
export const createUser = (userId: string) => getUserStats(userId);
export const getUser = (userId: string) => getUserStats(userId);
export const addTokensToAccount = addTokens;

// Réexporter les fonctions
export {
  getUserStats,
  getTransactionHistory,
  recordGeneration,
  addTokens,
  resetUserStats,
  TEST_USER_ID
};

// Réexporter les types avec export type
export type { UserStats, Transaction };

// Fonction d'invalidation du cache pour la compatibilité
export function invalidateStatsCache(userId: string = TEST_USER_ID): void {
  console.log(`[Compatibilité] Invalidation du cache pour ${userId}`);
  // Cette fonction ne fait rien car Redis gère déjà la synchronisation
} 