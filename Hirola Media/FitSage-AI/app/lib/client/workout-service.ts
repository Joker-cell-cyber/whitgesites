'use client';

import { WorkoutPlan } from '../types/coach';

/**
 * Génère un programme d'entraînement personnalisé via l'API
 */
export async function generateWorkoutPlan(
  type: string,
  duration: number,
  frequency: number,
  focusAreas: string[],
  fitnessLevel: string,
  limitations: string[]
): Promise<WorkoutPlan> {
  try {
    const response = await fetch('/api/workout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type,
        duration,
        frequency,
        focusAreas,
        fitnessLevel,
        limitations
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erreur lors de la génération du programme');
    }

    const data = await response.json();
    return data.workoutPlan;
  } catch (error: any) {
    console.error('Erreur lors de la génération du programme d\'entraînement:', error);
    throw error;
  }
}

/**
 * Récupère tous les programmes d'entraînement de l'utilisateur
 */
export async function getUserWorkoutPlans(): Promise<WorkoutPlan[]> {
  try {
    const response = await fetch('/api/workout/user');
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erreur lors de la récupération des programmes');
    }
    
    const data = await response.json();
    return data.workoutPlans;
  } catch (error: any) {
    console.error('Erreur lors de la récupération des programmes:', error);
    return [];
  }
}

/**
 * Récupère un programme d'entraînement spécifique
 */
export async function getWorkoutPlan(planId: string): Promise<WorkoutPlan | null> {
  try {
    const response = await fetch(`/api/workout/${planId}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erreur lors de la récupération du programme');
    }
    
    const data = await response.json();
    return data.workoutPlan;
  } catch (error: any) {
    console.error(`Erreur lors de la récupération du programme ${planId}:`, error);
    return null;
  }
} 