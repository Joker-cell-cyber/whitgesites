import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/authOptions';
import { generateNutritionProgram } from '@/app/lib/nutrition-service';
import { UserNutritionProfile } from '@/app/lib/types/coach/nutrition';
import { TEST_USER_ID } from '@/app/lib/constants';
import { recordNutritionPlanGeneration } from '@/app/lib/stats-service';

// 50 secondes maximum (en dessous de la limite de 60s de Vercel)
export const maxDuration = 50;

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const userId = session.user.id || TEST_USER_ID;
    
    // Extraire les données du corps de la requête
    const profileData = await request.json();
    
    // Valider les données essentielles du profil
    if (!validateProfileData(profileData)) {
      return NextResponse.json({ 
        error: 'Données de profil incomplètes ou invalides' 
      }, { status: 400 });
    }

    // Construire le profil nutritionnel complet
    const nutritionProfile = buildNutritionProfile(profileData);
    
    // Génération avec gestion du timeout
    let nutritionProgram;
    try {
      // Créer un signal d'abandon avec timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 45000); // 45 secondes max
      
      // Générer le programme nutritionnel avec signal d'abandon
      nutritionProgram = await Promise.race([
        generateNutritionProgram(userId, nutritionProfile),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('La génération a pris trop de temps')), 45000)
        )
      ]);
      
      clearTimeout(timeoutId);
    } catch (error) {
      console.error('Erreur timeout lors de la génération:', error);
      return NextResponse.json({ 
        error: 'La requête a pris trop de temps. Veuillez réessayer plus tard.' 
      }, { status: 408 });
    }
    
    // Générer un ID temporaire pour le plan
    nutritionProgram.id = `temp-${Date.now()}`;
    
    // Enregistrer la génération dans les statistiques de l'utilisateur
    await recordNutritionPlanGeneration(userId);
    
    // Assurer que nous retournons un objet JSON valide
    const safeNutritionProgram = JSON.parse(JSON.stringify(nutritionProgram));
    
    // Retourner le programme nutritionnel généré
    return NextResponse.json({ 
      success: true, 
      message: 'Programme nutritionnel généré avec succès',
      nutritionProgram: safeNutritionProgram
    });
    
  } catch (error: any) {
    console.error('Erreur lors de la génération du programme nutritionnel:', error);
    return NextResponse.json({ 
      error: error.message || 'Erreur lors de la génération du programme nutritionnel' 
    }, { status: 500 });
  }
}

/**
 * Valide les données du profil nutritionnel
 */
function validateProfileData(data: any): boolean {
  const requiredFields = ['age', 'gender', 'weight', 'height', 'goal'];
  return requiredFields.every(field => data[field] !== undefined);
}

/**
 * Construit un profil nutritionnel complet à partir des données fournies
 */
function buildNutritionProfile(data: any): UserNutritionProfile {
  return {
    age: data.age,
    gender: data.gender,
    weight: data.weight,
    height: data.height,
    goal: data.goal,
    activityLevel: data.activityLevel || 'modérément_actif',
    trainingFrequency: data.trainingFrequency || 3,
    trainingType: data.trainingType || ['resistance', 'cardio'],
    dietaryPreferences: data.dietaryPreferences || [],
    excludedFoods: data.excludedFoods || [],
    allergies: data.allergies || [],
    medicalConditions: data.medicalConditions || [],
    mealsPerDay: data.mealsPerDay || 3,
    stressLevel: data.stressLevel || 'modéré',
    sleepQuality: data.sleepQuality || 'bonne',
    dailyWaterIntake: data.dailyWaterIntake || 2,
    supplementsUsed: data.supplementsUsed || []
  };
} 