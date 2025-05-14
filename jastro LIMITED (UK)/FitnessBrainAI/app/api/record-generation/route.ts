/**
 * Route API pour enregistrer une génération
 */
import { NextRequest, NextResponse } from 'next/server';
import { recordGeneration, invalidateStatsCache } from '@/app/lib/stats-service';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { userId, tokenCost, contentType, description } = data;
    
    // Valider les données
    if (!userId || !tokenCost || !contentType || !description) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Données incomplètes. Tous les champs sont requis." 
        },
        { status: 400 }
      );
    }
    
    // Enregistrer la génération dans Redis
    const result = await recordGeneration(userId, tokenCost, contentType, description);
    
    // Invalider le cache des statistiques
    invalidateStatsCache(userId);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de la génération:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: `Une erreur est survenue: ${error instanceof Error ? error.message : 'Erreur inconnue'}` 
      },
      { status: 500 }
    );
  }
} 