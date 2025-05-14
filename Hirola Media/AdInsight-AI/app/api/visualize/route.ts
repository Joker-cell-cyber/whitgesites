import { NextRequest, NextResponse } from 'next/server';
import { generateVisualizations } from '@/app/lib/services/visualization-service';
import { AdvertisingData, Platform } from '@/app/lib/types/data-types';

// Définir la durée maximale d'exécution (important pour Vercel)
export const maxDuration = 30; // 30 secondes max

export async function POST(request: NextRequest) {
  try {
    // Extraire les données de la requête
    const { data, platform } = await request.json() as {
      data: AdvertisingData[],
      platform: Platform
    };

    // Valider les données
    if (!data || !data.length) {
      return NextResponse.json(
        { error: 'Les données sont manquantes ou vides' },
        { status: 400 }
      );
    }

    // Vérifier que la plateforme est valide (si fournie)
    if (!platform || platform !== 'facebook') {
      return NextResponse.json(
        { 
          error: "Paramètre 'platform' invalide. Seule la plateforme 'facebook' est supportée." 
        }, 
        { status: 400 }
      );
    }

    // Générer les visualisations
    const visualizations = await generateVisualizations(data, platform);

    // Retourner les visualisations
    return NextResponse.json({
      success: true,
      visualizations
    });
  } catch (error: any) {
    console.error('Erreur lors de la génération des visualisations:', error);
    
    return NextResponse.json(
      { 
        error: 'Une erreur est survenue lors de la génération des visualisations', 
        details: error.message 
      },
      { status: 500 }
    );
  }
} 