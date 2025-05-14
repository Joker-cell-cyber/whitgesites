import { NextRequest, NextResponse } from 'next/server';
import { finalizeAnalysis } from '@/app/lib/data/data-analysis-service';
import { AdvertisingData, Platform } from '@/app/lib/types/data-types';

export const maxDuration = 60; // Limite de 60 secondes pour Vercel

export async function POST(req: NextRequest) {
  try {
    // Extraire les données de la requête
    const body = await req.json();
    const { 
      data,
      platformDetected,
      basicMetrics,
      aiInsights,
      visualizations,
      recommendations
    } = body as {
      data: AdvertisingData[];
      platformDetected: Platform;
      basicMetrics: any;
      aiInsights: any;
      visualizations: any;
      recommendations: any;
    };
    
    // Vérification des données
    if (!data || !Array.isArray(data) || data.length === 0) {
      return NextResponse.json(
        { error: 'Données manquantes ou invalides' },
        { status: 400 }
      );
    }
    
    // Finaliser l'analyse en combinant tous les résultats
    const finalResults = await finalizeAnalysis(
      data,
      platformDetected,
      basicMetrics,
      aiInsights,
      visualizations,
      recommendations
    );
    
    // Retourner les résultats finaux
    return NextResponse.json({
      success: true,
      finalAnalysis: finalResults
    });
    
  } catch (error) {
    console.error('Erreur lors de la finalisation de l\'analyse:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la finalisation de l\'analyse' },
      { status: 500 }
    );
  }
} 