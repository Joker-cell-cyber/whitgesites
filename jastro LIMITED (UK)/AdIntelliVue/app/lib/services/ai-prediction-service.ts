/**
 * Service de prédiction d'IA pour l'analyse publicitaire
 * Ce service utilise des modèles d'IA gratuits de Hugging Face pour générer des prédictions
 */

import { AdvertisingData } from '../types/data-types';
import { openai, MODEL } from '../openai';

// Types pour les options de prédiction
export type PredictionType = 'performance' | 'budget' | 'audience';
export type TimeHorizon = '1month' | '3months' | '6months' | '12months';

export interface PredictionOptions {
  predictionType: PredictionType;
  timeHorizon: TimeHorizon;
  contextualData?: any; // Données contextuelles supplémentaires du formulaire
}

// Interface pour les métriques de prédiction
export interface PredictionMetric {
  name: string;
  current: number;
  predicted: number;
  change: number;
}

// Interface pour les résultats de prédiction
export interface PredictionResult {
  title: string;
  description: string;
  metrics: PredictionMetric[];
  recommendations: string[];
}

/**
 * Génère des prédictions basées sur les données publicitaires et les options fournies
 */
export async function generatePredictions(
  data: AdvertisingData[],
  options: PredictionOptions
): Promise<PredictionResult[]> {
  try {
    // Vérification des données
    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new Error('Les données publicitaires sont manquantes ou invalides');
    }

    // Vérification des options
    if (!options || !options.predictionType || !options.timeHorizon) {
      throw new Error('Les options de prédiction sont incomplètes ou invalides');
    }

    // Calculer les métriques de base
    const baseMetrics = calculateBaseMetrics(data);
    
    // Préparer les données pour l'API OpenAI
    const context = {
      data: summarizeDataForPrediction(data),
      baseMetrics,
      predictionType: options.predictionType,
      timeHorizon: options.timeHorizon,
      contextualData: options.contextualData || {}
    };
    
    // Appeler l'API OpenAI pour la prédiction
    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: "system",
          content: `Tu es un expert en analyse prédictive pour le marketing digital spécialisé dans Facebook Ads.
          Ta tâche est de générer des prédictions précises basées sur des données historiques et contextuelle de publicité.
          Pour une prédiction de type '${options.predictionType}' sur un horizon de ${getTimeHorizonText(options.timeHorizon)},
          analyse les données fournies et génère des prédictions réalistes avec des recommandations stratégiques.
          Les prédictions doivent être données sous forme d'un objet JSON contenant:
          - Un titre descriptif de la prédiction
          - Une description générale
          - Un tableau de métriques avec les valeurs actuelles et prédites
          - Une liste de recommandations concrètes basées sur les prédictions`
        },
        {
          role: "user",
          content: `Voici les données historiques et le contexte pour ma prédiction Facebook Ads: ${JSON.stringify(context)}`
        }
      ],
      response_format: { type: "json_object" }
    });
    
    // Vérifier la réponse OpenAI
    if (!response.choices || response.choices.length === 0 || !response.choices[0].message.content) {
      throw new Error('La réponse de l\'API de prédiction est vide ou invalide');
    }
    
    // Analyser la réponse de l'API
    const aiResponse = JSON.parse(response.choices[0].message.content);
    
    // Vérifier la structure de la réponse
    if (!aiResponse || (!aiResponse.metrics && !aiResponse.recommendations)) {
      throw new Error('Le format de la réponse de prédiction est invalide');
    }
    
    // Structurer les résultats
    return [{
      title: aiResponse.title || `Prédiction ${options.predictionType} Facebook Ads`,
      description: aiResponse.description || `Prédiction pour les ${getTimeHorizonText(options.timeHorizon)} basée sur ${data.length} points de données`,
      metrics: aiResponse.metrics || [],
      recommendations: aiResponse.recommendations || []
    }];
    
  } catch (error) {
    console.error("Erreur lors de la génération des prédictions avec OpenAI:", error);
    throw new Error(`Erreur lors de la génération des prédictions: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
  }
}

/**
 * Résume les données pour l'API de prédiction
 */
function summarizeDataForPrediction(data: AdvertisingData[]): any {
  // Limiter le nombre de points de données pour éviter de dépasser les limites de tokens
  const dataPointLimit = 50;
  let summarizedData = data;
  
  if (data.length > dataPointLimit) {
    // Échantillonner les données
    const step = Math.floor(data.length / dataPointLimit);
    summarizedData = data.filter((_, index) => index % step === 0).slice(0, dataPointLimit);
  }
  
  return summarizedData.map(item => ({
    date: item.date,
    spend: Number(item.spend) || 0,
    impressions: Number(item.impressions) || 0,
    clicks: Number(item.clicks) || 0,
    conversions: Number(item.conversions) || 0,
    ctr: item.ctr,
    cpc: item.cpc,
    conversionRate: item.conversionRate,
    cpa: item.cpa
  }));
}

/**
 * Calcule des métriques de base à partir des données publicitaires
 */
function calculateBaseMetrics(data: AdvertisingData[]) {
  // Initialiser les compteurs
  let totalClicks = 0;
  let totalImpressions = 0;
  let totalSpend = 0;
  let totalConversions = 0;
  
  // Calculer les totaux à partir des données
  data.forEach(item => {
    totalClicks += Number(item.clicks) || 0;
    totalImpressions += Number(item.impressions) || 0;
    totalSpend += Number(item.spend) || 0;
    totalConversions += Number(item.conversions) || 0;
  });
  
  // Calculer les métriques dérivées
  const averageCTR = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
  const averageCPC = totalClicks > 0 ? totalSpend / totalClicks : 0;
  const conversionRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;
  const acquisitionCost = totalConversions > 0 ? totalSpend / totalConversions : 0;
  const estimatedROI = totalSpend > 0 ? (totalConversions * 100) / totalSpend * 100 : 0;
  const audienceSize = totalImpressions / 5; // Estimation simplifiée
  const engagementRate = totalImpressions > 0 ? (totalClicks / totalImpressions) * 3 : 0; // Ajusté pour la démonstration
  const cpm = totalImpressions > 0 ? (totalSpend / totalImpressions) * 1000 : 0;
  
  return {
    totalClicks,
    totalImpressions,
    totalSpend,
    totalConversions,
    averageCTR,
    averageCPC,
    conversionRate,
    acquisitionCost,
    estimatedROI,
    audienceSize,
    engagementRate,
    cpm
  };
}

/**
 * Obtient le texte descriptif pour l'horizon temporel
 */
function getTimeHorizonText(timeHorizon: TimeHorizon): string {
  switch (timeHorizon) {
    case '1month':
      return 'prochains 30 jours';
    case '3months':
      return 'prochains 3 mois';
    case '6months':
      return 'prochains 6 mois';
    case '12months':
      return 'prochaine année';
    default:
      return 'période à venir';
  }
} 