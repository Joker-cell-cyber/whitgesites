/**
 * Service de statistiques utilisateur - Façade pour Redis
 * 
 * Ce module fournit une interface simplifiée pour accéder aux fonctionnalités
 * de Redis pour les statistiques utilisateur.
 */

import {
  getUserStats as getRedisUserStats,
  getTransactionHistory as getRedisTransactionHistory,
  recordGeneration as recordRedisGeneration,
  addTokens as addRedisTokens,
  resetUserStats as resetRedisUserStats
} from './redis-actions';

import { TEST_USER_ID } from './constants';
import type { UserStats, Transaction } from './types/index';

// Alias pour la compatibilité avec le code existant
export const fetchGenerationStats = getUserStats;

/**
 * Récupérer les statistiques d'un utilisateur
 */
export async function getUserStats(userId: string = TEST_USER_ID): Promise<UserStats> {
  // En environnement serveur, accéder directement à Redis
  return await getRedisUserStats(userId);
}

/**
 * Récupérer l'historique des transactions d'un utilisateur
 */
export async function getTransactionHistory(userId: string = TEST_USER_ID): Promise<Transaction[]> {
  // En environnement serveur, accéder directement à Redis
  return await getRedisTransactionHistory(userId);
}

/**
 * Mettre à jour les statistiques utilisateur (version générique)
 */
export async function updateUserStats(
  userId: string = TEST_USER_ID,
  tokenCost: number,
  type: 'MESSAGE' | 'COACHING' = 'MESSAGE',
  description: string = 'Utilisation service'
): Promise<{ success: boolean; message: string; stats: UserStats }> {
  // En environnement serveur, accéder directement à Redis
  return await recordRedisGeneration(userId, tokenCost, type, description);
}

/**
 * Mettre à jour les statistiques utilisateur après un coaching
 */
export async function recordCoachingSession(
  userId: string = TEST_USER_ID,
  tokenCost: number = 5
): Promise<{ success: boolean; message: string; stats: UserStats }> {
  return await updateUserStats(userId, tokenCost, 'COACHING', 'Session de coaching');
}

/**
 * Ajouter des tokens à un utilisateur
 */
export async function addTokens(
  userId: string = TEST_USER_ID,
  amount: number,
  description: string = 'Achat de tokens'
): Promise<{ success: boolean; message: string; stats: UserStats }> {
  // En environnement serveur, accéder directement à Redis
  return await addRedisTokens(userId, amount, description);
}

/**
 * Réinitialiser les statistiques d'un utilisateur
 */
export async function resetStats(
  userId: string = TEST_USER_ID
): Promise<{ success: boolean; message: string; stats: UserStats }> {
  // En environnement serveur, accéder directement à Redis
  return await resetRedisUserStats(userId);
}

/**
 * Invalider le cache des statistiques
 */
export function invalidateStatsCache(userId: string = TEST_USER_ID): void {
  // Cette fonction n'a pas d'effet direct côté serveur
  console.log(`[stats-service] Invalidation du cache des statistiques pour l'utilisateur ${userId}`);
}

// Exporter les types et constantes utiles
export { TEST_USER_ID };
export type { UserStats, Transaction }; 