/**
 * Service de statistiques utilisateur - Façade pour Redis
 * 
 * Ce module fournit une interface simplifiée pour accéder aux fonctionnalités
 * de Redis pour les statistiques utilisateur.
 */

import {
  getUserStats as getRedisUserStats,
  getUserTransactions as getRedisTransactionHistory,
  recordGeneration as recordRedisGeneration,
  addTokens as addRedisTokens,
  resetUserStats as resetRedisUserStats
} from './redis-actions';

import { TEST_USER_ID, TOKEN_COST_ARTICLE, TOKEN_COST_CHAT_MESSAGE, TOKEN_COST_WORKOUT_PLAN, TOKEN_COST_NUTRITION_PLAN } from './constants';
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
 * Mettre à jour les statistiques après une génération
 * Cette fonction est un alias selon le type de contenu
 */
export async function recordGeneration(
  userId: string = TEST_USER_ID,
  tokenCost: number,
  contentType: 'ARTICLE' | 'CHAT_MESSAGE' | 'WORKOUT_PLAN' | 'NUTRITION_PLAN',
  description: string
): Promise<{ success: boolean; message: string; stats: UserStats }> {
  switch (contentType) {
    case 'ARTICLE':
      return await recordArticleGeneration(userId, tokenCost);
    case 'CHAT_MESSAGE':
      return await recordChatMessageGeneration(userId, tokenCost);
    case 'WORKOUT_PLAN':
      return await recordWorkoutPlanGeneration(userId, tokenCost);
    case 'NUTRITION_PLAN':
      return await recordNutritionPlanGeneration(userId, tokenCost);
    default:
      throw new Error(`Type de contenu non pris en charge: ${contentType}`);
  }
}

/**
 * Enregistrer une génération d'article
 */
export async function recordArticleGeneration(
  userId: string = TEST_USER_ID,
  tokenCost: number = TOKEN_COST_ARTICLE
): Promise<{ success: boolean; message: string; stats: UserStats }> {
  // En environnement serveur, accéder directement à Redis
  return await recordRedisGeneration(userId, tokenCost, 'ARTICLE', 'Génération article fitness');
}

/**
 * Enregistrer une génération de message de chat avec le coach IA
 */
export async function recordChatMessageGeneration(
  userId: string = TEST_USER_ID,
  tokenCost: number = TOKEN_COST_CHAT_MESSAGE
): Promise<{ success: boolean; message: string; stats: UserStats }> {
  // En environnement serveur, accéder directement à Redis
  return await recordRedisGeneration(userId, tokenCost, 'CHAT_MESSAGE', 'Message coach IA');
}

/**
 * Enregistrer une génération de programme d'entraînement
 */
export async function recordWorkoutPlanGeneration(
  userId: string = TEST_USER_ID,
  tokenCost: number = TOKEN_COST_WORKOUT_PLAN
): Promise<{ success: boolean; message: string; stats: UserStats }> {
  // En environnement serveur, accéder directement à Redis
  return await recordRedisGeneration(userId, tokenCost, 'WORKOUT_PLAN', 'Génération programme entraînement');
}

/**
 * Enregistrer une génération de plan nutritionnel
 */
export async function recordNutritionPlanGeneration(
  userId: string = TEST_USER_ID,
  tokenCost: number = TOKEN_COST_NUTRITION_PLAN
): Promise<{ success: boolean; message: string; stats: UserStats }> {
  // En environnement serveur, accéder directement à Redis
  return await recordRedisGeneration(userId, tokenCost, 'NUTRITION_PLAN', 'Génération plan nutritionnel');
}

/**
 * Ajouter des tokens au compte utilisateur
 */
export async function addTokens(
  userId: string = TEST_USER_ID,
  amount: number,
  description: string = "Achat de tokens"
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
 * Invalider le cache des statistiques pour un utilisateur
 * Avec Redis, cette fonction ne fait rien car les données sont 
 * automatiquement synchronisées, mais nous la gardons pour compatibilité
 */
export function invalidateStatsCache(userId: string = TEST_USER_ID): void {
  console.log(`[StatsService] Invalidation du cache pour ${userId} (no-op avec Redis)`);
  // Ne fait rien avec Redis
}

// Exporter les types et constantes utiles
export { TEST_USER_ID };
export type { UserStats, Transaction }; 