import { NextRequest, NextResponse } from 'next/server';
import { OpenAIService } from '@/app/lib/services/openai-service';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth.config';
import { recordGeneration } from '@/app/lib/server-state';

// Définir un temps maximal pour la fonction (moins de 60 secondes pour Vercel)
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    // Extraire les données de la requête
    const body = await req.json();
    const { 
      performanceAnalysis,
      creativesAnalysis,
      audiencesAnalysis,
      basicMetrics
    } = body;
    
    // Vérification des données
    if (!performanceAnalysis || !creativesAnalysis || !audiencesAnalysis) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Analyses manquantes ou invalides',
          details: 'Veuillez fournir les analyses de performances, créatives et audiences'
        },
        { status: 400 }
      );
    }

    // Vérification des métriques de base
    if (!basicMetrics) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Métriques de base manquantes',
          details: 'Veuillez fournir les métriques de base pour l\'analyse'
        },
        { status: 400 }
      );
    }
    
    // Récupérer la session utilisateur
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Non authentifié',
          details: 'Vous devez être connecté pour générer des recommandations'
        },
        { status: 401 }
      );
    }

    // Coût en tokens pour la génération de recommandations
    const tokenCost = 3;

    // Déduire les tokens du solde de l'utilisateur
    const deductionResult = await recordGeneration(
      session.user.id,
      tokenCost,
      'FACEBOOK_RECOMMENDATIONS',
      'Recommandations Facebook Ads'
    );

    if (!deductionResult.success) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Solde de tokens insuffisant',
          details: deductionResult.message
        },
        { status: 402 }
      );
    }
    
    // Générer des recommandations avec l'IA
    try {
      const recommendations = await OpenAIService.generateRecommendations(
        performanceAnalysis,
        creativesAnalysis,
        audiencesAnalysis,
        basicMetrics
      );
      
      // Retourner les résultats avec le solde de tokens mis à jour
      return NextResponse.json({
        success: true,
        recommendations,
        tokenBalance: deductionResult.stats.tokenBalance
      });
    } catch (error) {
      console.error('Erreur lors de la génération des recommandations:', error);
      return NextResponse.json(
        { 
          success: false,
          error: 'Erreur lors de la génération des recommandations',
          details: error instanceof Error ? error.message : 'Une erreur inattendue est survenue'
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Erreur lors de la génération des recommandations:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Erreur lors de la génération des recommandations',
        details: errorMessage,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 