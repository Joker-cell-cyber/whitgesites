import { NextRequest, NextResponse } from 'next/server';
import { generateVisualizations } from '@/app/lib/data/data-analysis-service';
import { AdvertisingData, Platform } from '@/app/lib/types/data-types';

export async function POST(req: NextRequest) {
  try {
    // Extraire les données de la requête
    const body = await req.json();
    const { 
      data, 
      platformDetected,
      basicMetrics,
      trends 
    } = body as {
      data: AdvertisingData[];
      platformDetected: Platform;
      basicMetrics: any;
      trends: any[];
    };
    
    // Vérification des données
    if (!data || !Array.isArray(data) || data.length === 0) {
      return NextResponse.json(
        { error: 'Données manquantes ou invalides' },
        { status: 400 }
      );
    }
    
    // Générer les visualisations
    const visualizationData = generateVisualizations(
      data,
      platformDetected,
      basicMetrics,
      trends
    );
    
    // Retourner les résultats
    return NextResponse.json({
      success: true,
      visualizationData
    });
    
  } catch (error) {
    console.error('Erreur lors de la génération des visualisations:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la génération des visualisations' },
      { status: 500 }
    );
  }
} 