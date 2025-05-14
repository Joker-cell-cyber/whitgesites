import { NextResponse } from 'next/server';
import { getTransactionHistory } from '@/app/lib/server-state';

/**
 * Route GET qui retourne l'historique des transactions de l'utilisateur avec pagination
 */
export async function GET(request: Request) {
  try {
    // Extraire les paramètres de la requête
    const { searchParams } = new URL(request.url);
    const memberId = searchParams.get('memberId');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const filter = searchParams.get('filter'); // 'all', 'credit', 'debit'
    
    if (!memberId) {
      return NextResponse.json(
        { error: 'Identifiant utilisateur requis' },
        { status: 400 }
      );
    }
    
    // Récupérer l'historique complet des transactions
    let transactions = await getTransactionHistory(memberId);
    
    // Appliquer le filtre si spécifié
    if (filter === 'credit') {
      transactions = transactions.filter(t => t.type === 'CREDIT');
    } else if (filter === 'debit') {
      transactions = transactions.filter(t => t.type === 'DEBIT');
    }
    
    // Calculer le nombre total de pages
    const totalTransactions = transactions.length;
    const totalPages = Math.ceil(totalTransactions / limit);
    
    // Valider la page demandée
    const validPage = Math.min(Math.max(1, page), Math.max(1, totalPages));
    
    // Extraire la sous-liste correspondant à la page demandée
    const startIndex = (validPage - 1) * limit;
    const endIndex = Math.min(startIndex + limit, totalTransactions);
    const paginatedTransactions = transactions.slice(startIndex, endIndex);
    
    // Calculer les statistiques pour la période affichée
    const periodCredits = paginatedTransactions
      .filter(t => t.type === 'CREDIT')
      .reduce((sum, t) => sum + t.amount, 0);
      
    const periodDebits = paginatedTransactions
      .filter(t => t.type === 'DEBIT')
      .reduce((sum, t) => sum + t.amount, 0);
    
    // Pour renvoyer des données plus riches, calculer quelques statistiques
    const enrichedTransactions = paginatedTransactions.map(transaction => {
      // Pour simuler une réelle application financière, ajouter des champs supplémentaires
      return {
        ...transaction,
        formattedDate: new Date(transaction.timestamp).toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: 'long', 
          year: 'numeric'
        }),
        formattedTime: new Date(transaction.timestamp).toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        status: 'completed', // Une vraie application aurait différents statuts
        category: transaction.contentType ? 
          (transaction.contentType === 'CHAT_MESSAGE' ? 'Message coach IA' : 
           transaction.contentType === 'WORKOUT_PLAN' ? 'Programme d\'entraînement' : 
           transaction.contentType === 'NUTRITION_PLAN' ? 'Plan nutritionnel' : 'Utilisation tokens') : 
          (transaction.type === 'CREDIT' ? 'Recharge tokens' : 'Utilisation tokens')
      };
    });
    
    // Structurer la réponse avec les métadonnées de pagination
    return NextResponse.json({
      success: true,
      pagination: {
        page: validPage,
        limit,
        totalTransactions,
        totalPages,
        hasMore: validPage < totalPages
      },
      periodStats: {
        totalTransactions: paginatedTransactions.length,
        totalCredits: periodCredits,
        totalDebits: periodDebits,
        netChange: periodCredits - periodDebits
      },
      transactions: enrichedTransactions
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des transactions:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des transactions' },
      { status: 500 }
    );
  }
} 