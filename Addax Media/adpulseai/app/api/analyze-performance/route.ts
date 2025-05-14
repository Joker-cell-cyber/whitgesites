import { NextRequest, NextResponse } from 'next/server';
import { OpenAIService } from '@/app/lib/services/openai-service';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth.config';
import { recordGeneration } from '@/app/lib/server-state';

// Définir un temps maximal pour la fonction (60 secondes pour Vercel)
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { data, kpiContext } = body;

    if (!data || !Array.isArray(data)) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Données invalides',
          details: 'Les données fournies ne sont pas dans le format attendu'
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
          details: 'Vous devez être connecté pour effectuer cette analyse'
        },
        { status: 401 }
      );
    }

    // Coût en tokens pour l'analyse des performances
    const tokenCost = 1;

    // Déduire les tokens du solde de l'utilisateur
    const deductionResult = await recordGeneration(
      session.user.id,
      tokenCost,
      'FACEBOOK_ANALYSIS',
      'Analyse de performances Facebook'
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

    const result = await OpenAIService.analyzePerformance(data, kpiContext);

    if (!result.success) {
      return NextResponse.json(
        { 
          success: false,
          error: result.error,
          details: 'Une erreur est survenue lors de l\'analyse des performances'
        },
        { status: 500 }
      );
    }

    // Ajouter le nouveau solde de tokens à la réponse
    return NextResponse.json({
      ...result,
      tokenBalance: deductionResult.stats.tokenBalance
    });

  } catch (error) {
    console.error('Erreur lors de l\'analyse des performances:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Erreur serveur',
        details: error instanceof Error ? error.message : 'Une erreur inattendue est survenue'
      },
      { status: 500 }
    );
  }
} 