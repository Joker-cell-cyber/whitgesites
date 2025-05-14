import { NextRequest, NextResponse } from 'next/server';
import { AdvertisingData, Platform } from '@/app/lib/types/data-types';
import { OpenAIService } from '@/app/lib/services/openai-service';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth.config';
import { recordGeneration } from '@/app/lib/server-state';

// Définir un temps maximal pour la fonction (60 secondes pour Vercel)
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { data, basicMetrics } = body;

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

    // Coût en tokens pour l'analyse des créatives
    const tokenCost = 1;

    // Déduire les tokens du solde de l'utilisateur
    const deductionResult = await recordGeneration(
      session.user.id,
      tokenCost,
      'FACEBOOK_ANALYSIS',
      'Analyse des créatives Facebook'
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

    // Appeler le service d'analyse
    try {
      const creativesAnalysis = await OpenAIService.analyzeCreatives(data, basicMetrics);
      
      // Retourner les résultats avec le solde de tokens mis à jour
      return NextResponse.json({
        success: true,
        creativesAnalysis,
        tokenBalance: deductionResult.stats.tokenBalance
      });
    } catch (error) {
      console.error('Erreur lors de l\'analyse des créatives:', error);
      return NextResponse.json(
        { 
          success: false,
          error: 'Erreur lors de l\'analyse des créatives',
          details: error instanceof Error ? error.message : 'Une erreur inattendue est survenue'
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Erreur lors de l\'analyse des créatives:', error);
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