import { NextRequest, NextResponse } from 'next/server';
import { 
  generatePredictions,
  PredictionOptions,
  PredictionResult
} from '@/app/lib/services/ai-prediction-service';
import { AdvertisingData } from '@/app/lib/types/data-types';

// Définir la durée maximale d'exécution (important pour Vercel)
export const maxDuration = 60; // 60 secondes max

export async function POST(request: NextRequest) {
  try {
    // Extraire les données de la requête
    const { data, options } = await request.json() as {
      data: AdvertisingData[],
      options: PredictionOptions
    };

    // Valider les données
    if (!data || !Array.isArray(data) || data.length === 0) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Données publicitaires manquantes ou invalides',
          details: 'Veuillez fournir un tableau de données publicitaires non vide'
        },
        { status: 400 }
      );
    }

    // Valider les options
    if (!options) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Options de prédiction manquantes',
          details: 'Veuillez spécifier les options de prédiction'
        },
        { status: 400 }
      );
    }

    // Vérifier les options requises
    if (!options.predictionType || !options.timeHorizon) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Options de prédiction incomplètes',
          details: 'Le type de prédiction et l\'horizon temporel sont requis'
        },
        { status: 400 }
      );
    }

    // Appeler le service de prédiction
    const predictions: PredictionResult[] = await generatePredictions(data, options);

    // Retourner les résultats
    return NextResponse.json({
      success: true,
      predictions,
      metadata: {
        dataPoints: data.length,
        predictionType: options.predictionType,
        timeHorizon: options.timeHorizon,
        generatedAt: new Date().toISOString()
      }
    });
  } catch (error: any) {
    console.error('Erreur lors de la génération des prédictions:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Une erreur est survenue lors de l\'analyse prédictive', 
        details: error instanceof Error ? error.message : 'Erreur inconnue',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 