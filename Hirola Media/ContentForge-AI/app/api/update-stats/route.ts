import { NextRequest, NextResponse } from 'next/server';
import { recordGeneration, getGenerationStats } from '@/app/lib/server-state';

export async function POST(request: NextRequest) {
  try {
    // Récupérer les données de la requête
    const data = await request.json();
    const { tokenCost, isProductDescription, memberId } = data;
    
    // Valider les données
    if (tokenCost === undefined) {
      return NextResponse.json(
        { error: 'Le coût en tokens est requis' },
        { status: 400 }
      );
    }
    
    // Déterminer le type de contenu et la description
    const contentType = isProductDescription ? 'PRODUCT_DESCRIPTION' : 'ARTICLE';
    const description = isProductDescription ? 'Génération description produit' : 'Génération article';
    
    // Enregistrer la génération
    const result = await recordGeneration(
      memberId, 
      tokenCost, 
      contentType, 
      description
    );
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.message },
        { status: 400 }
      );
    }
    
    // Récupérer les statistiques mises à jour
    const updatedStats = await getGenerationStats(memberId);
    
    // Retourner les statistiques mises à jour
    return NextResponse.json({
      success: true,
      message: result.message,
      stats: updatedStats
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour des statistiques:', error);
    
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour des statistiques' },
      { status: 500 }
    );
  }
} 