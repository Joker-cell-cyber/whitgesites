/**
 * Route API pour réinitialiser les statistiques
 */
import { NextRequest, NextResponse } from 'next/server';
import { resetStats, TEST_USER_ID } from '../../lib/stats-service';

export async function POST(request: NextRequest) {
  try {
    // Lire les données de la requête
    const body = await request.json();
    const userId = body.userId || TEST_USER_ID;
    
    // Réinitialiser les statistiques
    const result = await resetStats(userId);
    
    // Retourner les données
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('[API] Erreur lors de la réinitialisation des statistiques:', error);
    
    return NextResponse.json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'Erreur inconnue',
      stats: null
    }, { status: 500 });
  }
} 