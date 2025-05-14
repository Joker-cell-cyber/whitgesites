/**
 * Route API pour enregistrer une génération
 */
import { NextRequest, NextResponse } from 'next/server';
import { recordArticleGeneration, recordProductDescriptionGeneration, TEST_USER_ID } from '../../lib/stats-service';

export async function POST(request: NextRequest) {
  try {
    // Lire les données de la requête
    const body = await request.json();
    const userId = body.userId || TEST_USER_ID;
    const tokenCost = body.tokenCost || 3; // Coût par défaut pour les articles
    const isProductDescription = Boolean(body.isProductDescription);
    
    // Enregistrer la génération avec la fonction appropriée selon le type
    const result = isProductDescription 
      ? await recordProductDescriptionGeneration(userId, tokenCost)
      : await recordArticleGeneration(userId, tokenCost);
    
    // Retourner les données
    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch (error) {
    console.error('[API] Erreur lors de l\'enregistrement de la génération:', error);
    
    return NextResponse.json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'Erreur inconnue',
      stats: null
    }, { status: 500 });
  }
} 