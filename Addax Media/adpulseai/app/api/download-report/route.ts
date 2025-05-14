import { NextRequest, NextResponse } from 'next/server';
import { generatePdfReport } from '@/app/lib/reports/report-generator';
import { getAnalysisData } from '@/app/lib/services/analysis-service';

export const maxDuration = 60; // Limite de 60 secondes pour Vercel

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const analysisId = searchParams.get('id');
    
    if (!analysisId) {
      return NextResponse.json(
        { error: 'ID d\'analyse manquant' },
        { status: 400 }
      );
    }
    
    // Récupérer les vraies données d'analyse
    const analysisData = await getAnalysisData(analysisId);
    
    if (!analysisData) {
      return NextResponse.json(
        { error: 'Données d\'analyse non trouvées' },
        { status: 404 }
      );
    }
    
    // Générer le PDF avec les vraies données
    const pdfBuffer = await generatePdfReport(analysisData);
    
    // Configurer la réponse HTTP pour le téléchargement du PDF
    const headers = new Headers();
    headers.append('Content-Disposition', `attachment; filename="Facebook_Ads_Analysis_${analysisId}.pdf"`);
    headers.append('Content-Type', 'application/pdf');
    
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers
    });
    
  } catch (error) {
    console.error('Erreur lors de la génération du rapport PDF:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la génération du rapport PDF' },
      { status: 500 }
    );
  }
} 