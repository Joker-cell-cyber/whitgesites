import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/authOptions';
import { generateWorkoutPlan } from '@/app/lib/coach-service';

// Définir la durée maximale pour l'exécution de cette fonction serverless
export const maxDuration = 60; // 60 secondes maximum (limite du plan hobby Vercel)

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const userId = session.user.id || 'test123';
    
    // Extraire les données du corps de la requête
    const body = await request.json();
    const { type, duration, frequency, focusAreas, fitnessLevel, limitations } = body;
    
    // Valider les données d'entrée
    if (!type || !duration || !frequency) {
      return NextResponse.json({ error: 'Données incomplètes' }, { status: 400 });
    }
    
    // Générer le programme d'entraînement
    const workoutPlan = await generateWorkoutPlan(
      userId,
      type,
      duration,
      frequency,
      focusAreas || [],
      fitnessLevel || 'intermédiaire',
      limitations || []
    );
    
    return NextResponse.json({ success: true, workoutPlan });
    
  } catch (error: any) {
    console.error('Erreur lors de la génération du programme:', error);
    return NextResponse.json({ error: error.message || 'Erreur lors de la génération du programme' }, { status: 500 });
  }
} 