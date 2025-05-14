/**
 * Route API pour l'historique des transactions
 */
import { NextRequest, NextResponse } from 'next/server';
import { getTransactionHistory, TEST_USER_ID } from '../../lib/stats-service';

export async function GET(request: NextRequest) {
  try {
    // Obtenir l'ID utilisateur depuis la requête ou utiliser l'utilisateur de test
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || TEST_USER_ID;
    
    // Récupérer l'historique des transactions
    const transactions = await getTransactionHistory(userId);
    
    // Retourner les données
    return NextResponse.json({ 
      success: true, 
      transactions 
    }, { status: 200 });
  } catch (error) {
    console.error('[API] Erreur lors de la récupération des transactions:', error);
    
    return NextResponse.json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'Erreur inconnue',
      transactions: []
    }, { status: 500 });
  }
} 