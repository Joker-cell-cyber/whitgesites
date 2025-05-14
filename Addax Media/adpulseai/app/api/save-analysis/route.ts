import { NextRequest, NextResponse } from 'next/server';
import { AnalysisResult } from '@/app/lib/types/data-types';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/auth.config';
import { db } from '@/app/lib/db';

export const maxDuration = 60; // Limite de 60 secondes pour Vercel

export async function POST(req: NextRequest) {
  try {
    // Vérifier l'authentification de l'utilisateur
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Vous devez être connecté pour effectuer cette action' },
        { status: 401 }
      );
    }

    // Extraire les données de la requête
    const { analysis } = await req.json() as { analysis: AnalysisResult };
    
    // Vérification des données
    if (!analysis || !analysis.id) {
      return NextResponse.json(
        { error: 'Données manquantes ou invalides' },
        { status: 400 }
      );
    }
    
    // Sauvegarder l'analyse dans la base de données
    const savedAnalysis = await db.analysis.create({
      data: {
        id: analysis.id,
        userId: session.user.id,
        title: `Analyse ${analysis.platform} - ${new Date(analysis.timestamp).toLocaleDateString()}`,
        platform: analysis.platform,
        data: JSON.stringify(analysis),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    });
    
    // Retourner le résultat
    return NextResponse.json({
      success: true,
      analysisId: savedAnalysis.id
    });
    
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de l\'analyse:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la sauvegarde de l\'analyse' },
      { status: 500 }
    );
  }
} 