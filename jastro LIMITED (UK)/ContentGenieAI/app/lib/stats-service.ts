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
 * Mettre à jour les statistiques après une génération
 * Cette fonction est un alias de recordArticleGeneration ou recordProductDescriptionGeneration
 * selon le paramètre isProductDescription
 */
export async function updateStatsAfterGeneration(
  userId: string = TEST_USER_ID,
  tokenCost: number,
  isProductDescription: boolean = false
): Promise<{ success: boolean; message: string; stats: UserStats }> {
  return isProductDescription 
    ? await recordProductDescriptionGeneration(userId, tokenCost)
    : await recordArticleGeneration(userId, tokenCost);
}

/**
 * Enregistrer une génération d'article
 */
export async function recordArticleGeneration(
  userId: string = TEST_USER_ID,
  tokenCost: number = 3
): Promise<{ success: boolean; message: string; stats: UserStats }> {
  // En environnement serveur, accéder directement à Redis
  return await recordRedisGeneration(userId, tokenCost, 'ARTICLE', 'Génération article');
}

/**
 * Enregistrer une génération de description de produit
 */
export async function recordProductDescriptionGeneration(
  userId: string = TEST_USER_ID,
  tokenCost: number = 2
): Promise<{ success: boolean; message: string; stats: UserStats }> {
  // En environnement serveur, accéder directement à Redis
  return await recordRedisGeneration(userId, tokenCost, 'PRODUCT_DESCRIPTION', 'Génération description produit');
}

/**
 * Ajouter des tokens au compte utilisateur
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