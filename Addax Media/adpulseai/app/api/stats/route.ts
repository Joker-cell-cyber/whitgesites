/**
 * Route API pour les statistiques utilisateur
 */
import { NextRequest, NextResponse } from 'next/server';
import { getUserStats, TEST_USER_ID } from '../../lib/stats-service';

export async function GET(request: NextRequest) {
  try {
    // Obtenir l'ID utilisateur depuis la requête ou utiliser l'utilisateur de test
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || TEST_USER_ID;
    
    // Récupérer les statistiques
    const stats = await getUserStats(userId);
    
    // Retourner les données
    return NextResponse.json({ 
      success: true, 
      stats 
    }, { status: 200 });
  } catch (error) {
    console.error('[API] Erreur lors de la récupération des statistiques:', error);
    
    return NextResponse.json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'Erreur inconnue',
      stats: null
    }, { status: 500 });
  }
} 