'use client';

import { NutritionPlan } from '../types/coach';

/**
 * Génère un plan nutritionnel personnalisé via l'API
 */
export async function generateNutritionPlan(
  goal: string,
  calorieTarget: number,
  dietaryPreferences: string[],
  allergies: string[],
  mealCount: number
): Promise<NutritionPlan> {
  try {
    const response = await fetch('/api/nutrition', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        goal,
        calorieTarget,
        dietaryPreferences,
        allergies,
        mealCount
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erreur lors de la génération du plan nutritionnel');
    }

    const data = await response.json();
    return data.nutritionPlan;
  } catch (error: any) {
    console.error('Erreur lors de la génération du plan nutritionnel:', error);
    throw error;
  }
}

/**
 * Récupère tous les plans nutritionnels de l'utilisateur
 */
export async function getUserNutritionPlans(): Promise<NutritionPlan[]> {
  try {
    const response = await fetch('/api/nutrition/user');
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erreur lors de la récupération des plans');
    }
    
    const data = await response.json();
    return data.nutritionPlans;
  } catch (error: any) {
    console.error('Erreur lors de la récupération des plans:', error);
    return [];
  }
}

/**
 * Récupère un plan nutritionnel spécifique
 */
export async function getNutritionPlan(planId: string): Promise<NutritionPlan | null> {
  try {
    const response = await fetch(`/api/nutrition/${planId}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erreur lors de la récupération du plan');
    }
    
    const data = await response.json();
    return data.nutritionPlan;
  } catch (error: any) {
    console.error(`Erreur lors de la récupération du plan ${planId}:`, error);
    return null;
  }
} 