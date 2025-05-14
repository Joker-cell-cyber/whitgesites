/**
 * Fonction pour générer les statistiques par défaut d'un nouvel utilisateur
 */

import { UserStats } from "./types";

/**
 * Retourne un objet UserStats avec des valeurs par défaut
 * @returns UserStats
 */
export const getDefaultUserStats = (): UserStats => {
  return {
    tokensRemaining: 0,
    chatMessageCount: 0,
    workoutPlanCount: 0,
    nutritionPlanCount: 0,
    totalSpent: 0,
    totalEarned: 0
  };
};

export default getDefaultUserStats; 