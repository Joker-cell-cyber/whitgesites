import { NextRequest, NextResponse } from 'next/server';
import { analyzeInitialData } from '@/app/lib/data/data-analysis-service';
import { AdvertisingData, AnalysisOptions } from '@/app/lib/types/data-types';

export const maxDuration = 60; // Limite de 60 secondes pour Vercel

export async function POST(req: NextRequest) {
  try {
    // Extraire les données de la requête
    const body = await req.json();
    const { data, options } = body as {
      data: AdvertisingData[];
      options: AnalysisOptions;
    };
    
    // Vérification des données
    if (!data || !Array.isArray(data) || data.length === 0) {
      return NextResponse.json(
        { error: 'Données manquantes ou invalides' },
        { status: 400 }
      );
    }
    
    // Analyser les données (première étape seulement)
    const initialAnalysis = await analyzeInitialData(data, options);
    
    // Retourner les résultats
    return NextResponse.json({
      success: true,
      initialAnalysis
    });
    
  } catch (error) {
    console.error('Erreur lors de l\'analyse des données:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'analyse des données' },
      { status: 500 }
    );
  }
} 