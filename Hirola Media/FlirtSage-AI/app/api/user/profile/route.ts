import { NextResponse } from 'next/server';
import { getGenerationStats, getTransactionHistory } from '@/app/lib/server-state';

/**
 * Route GET qui retourne le profil complet de l'utilisateur,
 * y compris les statistiques et l'historique des transactions
 */
export async function GET(request: Request) {
  try {
    // Extraire l'ID membre de la requête - normalement on utiliserait une 
    // authentification appropriée, mais pour cette démonstration on utilise un paramètre
    const { searchParams } = new URL(request.url);
    const memberId = searchParams.get('memberId');
    
    if (!memberId) {
      return NextResponse.json(
        { error: 'Identifiant utilisateur requis' },
        { status: 400 }
      );
    }
    
    // Récupérer les statistiques de l'utilisateur
    const stats = await getGenerationStats(memberId);
    
    // Récupérer l'historique des transactions
    const transactions = await getTransactionHistory(memberId);
    
    // Calculer quelques statistiques supplémentaires pour rendre l'affichage plus riche
    const lastTransactions = transactions.slice(0, 5);
    const monthlyUsage = calculateMonthlyUsage(transactions);
    const projectedUsage = estimateMonthlyTokenConsumption(transactions);
    
    // Retourner les données complètes
    return NextResponse.json({
      success: true,
      profile: {
        memberId,
        status: 'ACTIVE',
        plan: 'Enterprise',
        registrationDate: new Date(new Date().setMonth(new Date().getMonth() - 3)),
        stats,
        lastTransactions,
        monthlyUsage,
        projectedUsage,
        accountLimits: {
          maxTokens: 10000,
          maxGenerationsPerDay: 50,
          maxTokensPerGeneration: 500
        }
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du profil utilisateur' },
      { status: 500 }
    );
  }
}

/**
 * Calcule l'utilisation mensuelle des tokens à partir de l'historique des transactions
 * @param transactions Historique des transactions
 * @returns Utilisation mensuelle
 */
function calculateMonthlyUsage(transactions: any[]) {
  const today = new Date();
  const lastThreeMonths = [0, 1, 2].map(monthsAgo => {
    const date = new Date(today);
    date.setMonth(today.getMonth() - monthsAgo);
    return {
      month: date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }),
      tokensUsed: 0,
      generations: 0
    };
  });
  
  // Calculer les statistiques pour chaque mois
  transactions.forEach(transaction => {
    if (transaction.type === 'DEBIT') {
      const transactionDate = new Date(transaction.timestamp);
      
      for (let i = 0; i < lastThreeMonths.length; i++) {
        const monthDate = new Date(today);
        monthDate.setMonth(today.getMonth() - i);
        
        // Si la transaction est dans ce mois
        if (transactionDate.getMonth() === monthDate.getMonth() && 
            transactionDate.getFullYear() === monthDate.getFullYear()) {
          lastThreeMonths[i].tokensUsed += transaction.amount;
          lastThreeMonths[i].generations += 1;
          break;
        }
      }
    }
  });
  
  return lastThreeMonths;
}

/**
 * Estime la consommation mensuelle de tokens basée sur l'historique
 * @param transactions Historique des transactions
 * @returns Estimation de consommation
 */
function estimateMonthlyTokenConsumption(transactions: any[]) {
  // Filtrer pour obtenir seulement les débits des 30 derniers jours
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const recentDebits = transactions.filter(t => 
    t.type === 'DEBIT' && new Date(t.timestamp) >= thirtyDaysAgo
  );
  
  // Calculer le total des tokens utilisés
  const tokensUsed = recentDebits.reduce((sum, t) => sum + t.amount, 0);
  
  // Calculer le nombre de générations
  const generations = recentDebits.length;
  
  // Calculer la moyenne par génération
  const averagePerGeneration = generations > 0 ? tokensUsed / generations : 0;
  
  // Estimer l'utilisation mensuelle
  const estimatedMonthlyUsage = Math.round(tokensUsed * (30 / Math.min(30, recentDebits.length)));
  
  return {
    last30Days: {
      tokensUsed,
      generations,
      averagePerGeneration: Math.round(averagePerGeneration)
    },
    monthlyEstimate: estimatedMonthlyUsage,
    recommendedPlan: getRecommendedPlan(estimatedMonthlyUsage)
  };
}

/**
 * Détermine le plan recommandé en fonction de la consommation estimée
 * @param estimatedUsage Utilisation estimée
 * @returns Plan recommandé
 */
function getRecommendedPlan(estimatedUsage: number) {
  if (estimatedUsage < 1000) return 'Basic';
  if (estimatedUsage < 3000) return 'Standard';
  if (estimatedUsage < 5000) return 'Premium';
  return 'Enterprise';
} 