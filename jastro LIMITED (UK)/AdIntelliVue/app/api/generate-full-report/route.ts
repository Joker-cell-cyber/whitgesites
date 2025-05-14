import { NextRequest, NextResponse } from 'next/server';
import { generatePdfReport } from '@/app/lib/reports/report-generator';

// Définir un temps maximal pour la fonction (moins de 60 secondes pour Vercel)
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    // Extraire les données de la requête
    const body = await req.json();
    const { 
      analysisId,
      performanceAnalysis,
      creativesAnalysis,
      audiencesAnalysis,
      recommendations,
      basicMetrics,
      contextData
    } = body;
    
    // Vérification des données
    if (!analysisId) {
      return NextResponse.json(
        { 
          success: false,
          error: 'ID d\'analyse manquant',
          details: 'Veuillez fournir un ID d\'analyse valide'
        },
        { status: 400 }
      );
    }
    
    if (!performanceAnalysis || !creativesAnalysis || !audiencesAnalysis || !recommendations) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Données d\'analyse manquantes ou invalides',
          details: 'Veuillez fournir toutes les analyses requises pour générer le rapport'
        },
        { status: 400 }
      );
    }

    // Préparer les données pour le rapport PDF
    const analysisSummary = {
      id: analysisId,
      timestamp: new Date().toISOString(),
      platform: 'facebook',
      metrics: basicMetrics,
      period: {
        start: performanceAnalysis.timeAnalysis?.startDate || "N/A",
        end: performanceAnalysis.timeAnalysis?.endDate || "N/A",
      },
      insights: [
        ...performanceAnalysis.performanceInsights || [],
        ...creativesAnalysis.visualElementsAnalysis || [],
        ...audiencesAnalysis.topPerformingSegments || []
      ],
      campaignComparison: {
        bestCampaign: {
          name: "Meilleure campagne",
          metrics: {
            spend: basicMetrics.totalSpend * 0.3, // Exemple
            conversions: basicMetrics.totalConversions * 0.4, // Exemple
            cpa: basicMetrics.averageCPA * 0.7, // Exemple
            roas: basicMetrics.averageROAS * 1.5, // Exemple
            conversionRate: basicMetrics.averageConversionRate * 1.3 // Exemple
          },
          analysis: "Cette campagne surperforme grâce à un ciblage précis et des créatives optimisées."
        },
        worstCampaign: {
          name: "Campagne sous-performante",
          metrics: {
            spend: basicMetrics.totalSpend * 0.2, // Exemple
            conversions: basicMetrics.totalConversions * 0.1, // Exemple
            cpa: basicMetrics.averageCPA * 1.8, // Exemple
            roas: basicMetrics.averageROAS * 0.5, // Exemple
            conversionRate: basicMetrics.averageConversionRate * 0.6 // Exemple
          },
          analysis: "Cette campagne sous-performe en raison d'un ciblage trop large et de créatives peu engageantes."
        }
      },
      segmentAnalysis: {
        title: "Analyse des segments d'audience",
        content: audiencesAnalysis.demographicAnalysis?.age?.insights || "Analyse des segments d'audience non disponible."
      },
      trendAnalysis: {
        title: "Analyse des tendances",
        content: performanceAnalysis.trends?.join(" ") || "Analyse des tendances non disponible."
      },
      recommendations: [
        ...(recommendations.budgetRecommendations || []).map((r: any) => r.recommendation),
        ...(recommendations.creativeRecommendations || []).map((r: any) => r.recommendation),
        ...(recommendations.audienceRecommendations || []).map((r: any) => r.recommendation),
        ...(recommendations.optimizationRecommendations || []).map((r: any) => r.recommendation)
      ],
      actionPlan: {
        shortTerm: recommendations.actionPlan?.immediate || [],
        mediumTerm: recommendations.actionPlan?.shortTerm || [],
        longTerm: recommendations.actionPlan?.longTerm || []
      }
    };
    
    // Générer le PDF
    const pdfBuffer = await generatePdfReport(analysisSummary);
    
    // Configurer la réponse avec le PDF
    const response = new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="facebook-ads-analysis-${analysisId}.pdf"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    });
    
    return response;
    
  } catch (error) {
    console.error('Erreur lors de la génération du rapport PDF:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Erreur lors de la génération du rapport PDF',
        details: errorMessage,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 