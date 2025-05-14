/**
 * Route API pour ajouter des tokens
 */
import { NextRequest, NextResponse } from 'next/server';
import { addTokens, TEST_USER_ID } from '../../lib/stats-service';

export async function POST(request: NextRequest) {
  try {
    // Lire les données de la requête
    const body = await request.json();
    const userId = body.userId || TEST_USER_ID;
    const amount = Number(body.amount) || 0;
    const description = body.description || 'Achat de tokens';
    
    // Vérifier que le montant est valide
    if (amount <= 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'Le montant doit être supérieur à zéro',
        stats: null
      }, { status: 400 });
    }
    
    // Ajouter les tokens
    const result = await addTokens(userId, amount);
    
    // Retourner les données
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('[API] Erreur lors de l\'ajout de tokens:', error);
    
    return NextResponse.json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'Erreur inconnue',
      stats: null
    }, { status: 500 });
  }
} 