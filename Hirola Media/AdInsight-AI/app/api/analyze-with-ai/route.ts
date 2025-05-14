import { NextRequest, NextResponse } from 'next/server';
import { analyzeDataWithAI } from '@/app/lib/data/data-analysis-service';
import { AdvertisingData, AnalysisOptions, Platform } from '@/app/lib/types/data-types';

export const maxDuration = 60; // Limite de 60 secondes pour Vercel

export async function POST(req: NextRequest) {
  try {
    // Extraire les données de la requête
    const body = await req.json();
    const { 
      data, 
      options, 
      basicMetrics, 
      platformDetected 
    } = body as {
      data: AdvertisingData[];
      options: AnalysisOptions;
      basicMetrics: any;
      platformDetected: Platform;
    };
    
    // Vérification des données
    if (!data || !Array.isArray(data) || data.length === 0) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Données manquantes ou invalides',
          details: 'Veuillez fournir un tableau de données publicitaires non vide'
        },
        { status: 400 }
      );
    }

    // Vérification des options
    if (!options) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Options d\'analyse manquantes',
          details: 'Veuillez spécifier les options d\'analyse'
        },
        { status: 400 }
      );
    }

    // Vérification de la plateforme
    if (!platformDetected) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Plateforme non détectée',
          details: 'Impossible de déterminer la plateforme publicitaire'
        },
        { status: 400 }
      );
    }
    
    // Analyser les données avec l'IA
    const aiAnalysis = await analyzeDataWithAI(
      data,
      options,
      platformDetected,
      basicMetrics
    );
    
    // Retourner les résultats
    return NextResponse.json({
      success: true,
      aiAnalysis
    });
    
  } catch (error) {
    console.error('Erreur lors de l\'analyse IA des données:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Erreur lors de l\'analyse IA des données',
        details: errorMessage,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 