import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/authOptions';
import { WorkoutPlan } from '@/app/lib/types/coach';

export async function GET(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const userId = session.user.id || 'test123';
    
    // Pour l'instant, retournons un tableau vide
    // Dans une implémentation réelle, vous récupéreriez les programmes depuis votre base de données
    const workoutPlans: WorkoutPlan[] = [];
    
    return NextResponse.json({ workoutPlans });
    
  } catch (error: any) {
    console.error('Erreur lors de la récupération des programmes:', error);
    return NextResponse.json({ error: error.message || 'Erreur serveur' }, { status: 500 });
  }
} 