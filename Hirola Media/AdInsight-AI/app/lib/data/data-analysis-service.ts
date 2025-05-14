import { AdvertisingData, AnalysisOptions, AnalysisResult, Platform, VisualizationData } from '../types/data-types';
import OpenAI from 'openai';

// Initialiser le client OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Analyse initiale des données - Première étape
 * Cette fonction effectue une analyse préliminaire rapide des données
 */
export async function analyzeInitialData(
  data: AdvertisingData[],
  options: AnalysisOptions
): Promise<{
  basicMetrics: any;
  dataStructure: any;
  platformDetected: Platform;
}> {
  // Validation des données
  if (!data || !Array.isArray(data) || data.length === 0) {
    throw new Error('Données publicitaires invalides ou manquantes pour l\'analyse initiale');
  }

  if (!options) {
    throw new Error('Options d\'analyse manquantes');
  }

  // Détection automatique de la plateforme
  const platformDetected = detectPlatform(data);
  
  if (!platformDetected) {
    throw new Error('Impossible de détecter la plateforme à partir des données fournies');
  }
  
  // Extraction des métriques de base (calculs simples, pas d'appel API)
  const basicMetrics = calculateBasicMetrics(data, platformDetected);
  
  // Analyse de la structure des données
  const dataStructure = analyzeDataStructure(data);
  
  return {
    basicMetrics,
    dataStructure,
    platformDetected
  };
}

/**
 * Analyse approfondie des données - Deuxième étape
 * Cette fonction utilise l'API OpenAI pour l'analyse avancée
 */
export async function analyzeDataWithAI(
  data: AdvertisingData[],
  options: AnalysisOptions,
  platformDetected: Platform,
  basicMetrics: any
): Promise<{
  insights: string[];
  trends: any[];
  anomalies: any[];
}> {
  // Validation des données
  if (!data || !Array.isArray(data) || data.length === 0) {
    throw new Error('Données publicitaires invalides ou manquantes pour l\'analyse IA');
  }

  if (!platformDetected) {
    throw new Error('Plateforme non spécifiée pour l\'analyse IA');
  }

  if (!basicMetrics) {
    throw new Error('Métriques de base manquantes pour l\'analyse IA');
  }

  try {
    // Enrichir les métriques de base avec les nouvelles mesures
    const enrichedMetrics = {
      ...basicMetrics,
      // Ajouter CPM moyen s'il est disponible
      averageCPM: calculateAverageCPM(data),
      // Ajouter fréquence moyenne s'il est disponible
      averageFrequency: calculateAverageFrequency(data),
      // Ajouter structure de budget et enchères
      budgetStructure: analyzeBudgetStructure(data),
      biddingStrategies: analyzeBiddingStrategies(data),
    };
    
    // Préparer les données pour l'API OpenAI
    const dataForAI = prepareDataForAI(data, enrichedMetrics, platformDetected);
    
    // Analyser avec OpenAI
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Tu es un expert en marketing digital spécialisé dans l'analyse de campagnes publicitaires ${platformDetected}, avec plus de 10 ans d'expérience. 
          Ton rôle est d'analyser en profondeur les données publicitaires et d'identifier des insights actionnables, des tendances significatives et des anomalies pertinentes.
          
          Analyse particulièrement:
          - Les métriques de performance classiques (CTR, CPC, Conversion Rate, CPA)
          - Les données de fréquence et de portée (Frequency, Reach)
          - L'efficacité des différentes stratégies d'enchère utilisées
          - La différence de performance entre les structures de budget (CBO vs ABO)
          - L'évolution du CPM et son impact sur la rentabilité
          
          Pour chaque insight, fournis une analyse factuelle basée sur les données, puis une recommandation concrète. 
          Pour chaque tendance, explique la direction, la magnitude et l'importance de celle-ci. 
          Pour chaque anomalie, précise pourquoi elle est considérée anormale et quel impact elle pourrait avoir.
          
          Assure-toi de:
          1. Être précis et spécifique dans tes analyses (évite les généralités)
          2. Fournir des valeurs numériques et des pourcentages quand c'est pertinent
          3. Contextualiser tes analyses par rapport aux benchmarks de l'industrie quand possible
          4. Proposer des actions concrètes et réalisables
          
          Retourne uniquement un objet JSON avec trois propriétés:
          - insights: array de strings, chaque élément étant un insight détaillé et actionnable
          - trends: array d'objets, chaque objet contenant {title, description, direction, magnitude, significance}
          - anomalies: array d'objets, chaque objet contenant {title, description, impact, suggestedAction}`
        },
        {
          role: "user",
          content: `Voici les données et métriques de base de mes campagnes ${platformDetected}: ${JSON.stringify(dataForAI)}`
        }
      ],
      response_format: { type: "json_object" }
    });

    // Vérifier la réponse
    if (!aiResponse.choices || aiResponse.choices.length === 0 || !aiResponse.choices[0].message.content) {
      throw new Error('Réponse vide ou invalide de l\'API d\'analyse');
    }

    // Extraire et structurer la réponse
    const aiAnalysis = JSON.parse(aiResponse.choices[0].message.content);
    
    // Valider la structure de la réponse
    if (!aiAnalysis || typeof aiAnalysis !== 'object') {
      throw new Error('Format de réponse d\'analyse invalide');
    }
    
    return {
      insights: Array.isArray(aiAnalysis.insights) ? aiAnalysis.insights : [],
      trends: Array.isArray(aiAnalysis.trends) ? aiAnalysis.trends : [],
      anomalies: Array.isArray(aiAnalysis.anomalies) ? aiAnalysis.anomalies : []
    };
  } catch (error) {
    console.error("Erreur lors de l'analyse IA:", error);
    throw new Error(`Erreur lors de l'analyse IA: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
  }
}

/**
 * Génération de visualisations - Troisième étape
 * Cette fonction prépare les structures de données pour les visualisations
 */
export function generateVisualizations(
  data: AdvertisingData[],
  platformDetected: Platform,
  basicMetrics: any,
  trends: any[]
): VisualizationData {
  // Validation des données
  if (!data || !Array.isArray(data) || data.length === 0) {
    throw new Error('Données publicitaires invalides ou manquantes pour les visualisations');
  }

  if (!platformDetected) {
    throw new Error('Plateforme non spécifiée pour les visualisations');
  }
  
  // Préparation des données pour graphiques temporels
  const timeSeriesData = prepareTimeSeriesData(data, platformDetected);
  
  // Préparation des données pour graphiques comparatifs
  const compareData = prepareCompareData(data, platformDetected);
  
  // Préparation des données pour graphiques de distribution
  const distributionData = prepareDistributionData(data, platformDetected);
  
  // Préparation des données pour graphiques d'entonnoir
  const funnelData = prepareFunnelData(data, platformDetected);
  
  return {
    timeSeriesData,
    compareData,
    distributionData,
    funnelData
  };
}

/**
 * Génération de recommandations - Quatrième étape
 * Cette fonction utilise l'API OpenAI pour générer des recommandations
 */
export async function generateRecommendations(
  data: AdvertisingData[],
  platformDetected: Platform,
  basicMetrics: any,
  insights: string[],
  analysisType: 'macro' | 'micro'
): Promise<{
  recommendations: string[];
  actionPlan: {
    shortTerm: string[];
    mediumTerm: string[];
    longTerm: string[];
  };
  budgetRecommendations: any;
}> {
  try {
    // Préparer les données pour l'API OpenAI
    const context = {
      data: summarizeData(data),
      platform: platformDetected,
      metrics: basicMetrics,
      insights: insights,
      analysisType
    };
    
    // Générer des recommandations avec OpenAI
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Tu es un consultant expert en marketing digital spécialisé dans l'optimisation des campagnes ${platformDetected}.
          Sur la base des données et insights fournis, génère des recommandations concrètes et un plan d'action.
          Pour une analyse ${analysisType === 'macro' ? 'macro (stratégie globale)' : 'micro (par canal)'},
          fournis des recommandations très spécifiques, actionnables et stratégiques.
          Retourne uniquement un objet JSON avec: recommendations (array de strings), actionPlan (objet avec shortTerm, mediumTerm, longTerm) et budgetRecommendations (objet).`
        },
        {
          role: "user",
          content: `Voici les données, métriques et insights de mes campagnes ${platformDetected}: ${JSON.stringify(context)}`
        }
      ],
      response_format: { type: "json_object" }
    });
    
    // Extraire et structurer la réponse
    const aiRecommendations = JSON.parse(aiResponse.choices[0].message.content || '{}');
    
    return {
      recommendations: aiRecommendations.recommendations || [],
      actionPlan: aiRecommendations.actionPlan || {
        shortTerm: [],
        mediumTerm: [],
        longTerm: []
      },
      budgetRecommendations: aiRecommendations.budgetRecommendations || {}
    };
  } catch (error) {
    console.error("Erreur lors de la génération des recommandations:", error);
    return {
      recommendations: ["Impossible de générer des recommandations avec l'IA."],
      actionPlan: {
        shortTerm: [],
        mediumTerm: [],
        longTerm: []
      },
      budgetRecommendations: {}
    };
  }
}

/**
 * Finalisation de l'analyse - Combiner tous les résultats
 */
export async function finalizeAnalysis(
  data: AdvertisingData[],
  platformDetected: Platform,
  basicMetrics: any,
  aiInsights: any,
  visualizations: any,
  recommendations: any
): Promise<AnalysisResult> {
  // Calculer les métriques finales
  const finalMetrics = {
    ...basicMetrics,
    roi: calculateROI(data, basicMetrics),
    projections: calculateProjections(data, basicMetrics, aiInsights.trends || [])
  };
  
  // Extraire les insights et autres éléments du résultat AI
  const insights = aiInsights?.insights || [];
  const trends = aiInsights?.trends || [];
  const anomalies = aiInsights?.anomalies || [];
  
  // Extraire les recommandations
  const actionPlan = recommendations?.actionPlan || {
    shortTerm: [],
    mediumTerm: [],
    longTerm: []
  };
  
  const budgetRecommendations = recommendations?.budgetRecommendations || {};
  
  // Générer un ID unique pour cette analyse
  const analysisId = `analysis-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  
  // Extraire les dates min et max des données
  let minDate = '1970-01-01';
  let maxDate = new Date().toISOString().split('T')[0];
  
  if (data.length > 0 && data[0].date) {
    const dates = data
      .map(item => item.date ? new Date(item.date) : null)
      .filter(Boolean) as Date[];
    
    if (dates.length > 0) {
      const sortedDates = [...dates].sort((a, b) => a.getTime() - b.getTime());
      minDate = sortedDates[0].toISOString().split('T')[0];
      maxDate = sortedDates[sortedDates.length - 1].toISOString().split('T')[0];
    }
  }
  
  return {
    id: analysisId,
    metrics: finalMetrics,
    insights,
    trends,
    anomalies,
    recommendations: recommendations?.recommendations || [],
    actionPlan,
    budgetRecommendations,
    visualizations,
    platform: platformDetected,
    timestamp: new Date().toISOString(),
    // Propriétés manquantes pour satisfaire le type AnalysisResult
    analysisType: 'macro',
    dataPoints: data.length,
    dateRange: {
      start: minDate,
      end: maxDate,
      days: Math.floor((new Date(maxDate).getTime() - new Date(minDate).getTime()) / (1000 * 60 * 60 * 24)) + 1
    },
    qualityScore: 0.8,
    confidenceLevel: 'medium'
  };
}

// Fonctions auxiliaires

function detectPlatform(data: AdvertisingData[]): Platform {
  // Nous nous concentrons uniquement sur les données Facebook Ads
  return 'facebook';
}

function calculateBasicMetrics(data: AdvertisingData[], platform: Platform): any {
  // Calculer les métriques de base selon la plateforme
  const metrics: any = {
    totalSpend: 0,
    totalImpressions: 0,
    totalClicks: 0,
    totalConversions: 0,
    ctr: 0,
    cpc: 0,
    conversionRate: 0,
    cpa: 0
  };
  
  // Agrégation des données
  data.forEach(row => {
    metrics.totalSpend += Number(row.spend || 0);
    metrics.totalImpressions += Number(row.impressions || 0);
    metrics.totalClicks += Number(row.clicks || 0);
    metrics.totalConversions += Number(row.conversions || 0);
  });
  
  // Calcul des ratios
  if (metrics.totalImpressions > 0) {
    metrics.ctr = (metrics.totalClicks / metrics.totalImpressions) * 100;
  }
  
  if (metrics.totalClicks > 0) {
    metrics.cpc = metrics.totalSpend / metrics.totalClicks;
    metrics.conversionRate = (metrics.totalConversions / metrics.totalClicks) * 100;
  }
  
  if (metrics.totalConversions > 0) {
    metrics.cpa = metrics.totalSpend / metrics.totalConversions;
  }
  
  return metrics;
}

function analyzeDataStructure(data: AdvertisingData[]): any {
  // Analyser la structure des données pour mieux comprendre le jeu de données
  const structure: any = {
    rowCount: data.length,
    columns: {},
    dateRange: {
      start: null,
      end: null
    }
  };
  
  // Analyser les colonnes
  if (data.length > 0) {
    const sampleRow = data[0];
    for (const key in sampleRow) {
      structure.columns[key] = typeof sampleRow[key];
    }
  }
  
  // Déterminer la plage de dates si disponible
  const dateColumns = Object.keys(structure.columns || {}).filter(col => 
    col.toLowerCase().includes('date') || col.toLowerCase().includes('time')
  );
  
  if (dateColumns.length > 0 && data.length > 0) {
    const dateColumn = dateColumns[0];
    const dates = data
      .map(row => new Date(row[dateColumn]))
      .filter(date => !isNaN(date.getTime()))
      .sort((a, b) => a.getTime() - b.getTime());
    
    if (dates.length > 0) {
      structure.dateRange.start = dates[0].toISOString().split('T')[0];
      structure.dateRange.end = dates[dates.length - 1].toISOString().split('T')[0];
    }
  }
  
  return structure;
}

function prepareDataForAI(data: AdvertisingData[], basicMetrics: any, platform: Platform): any {
  // Préparer un sous-ensemble de données pour l'API OpenAI
  // Limiter le volume pour rester dans les limites de tokens
  
  const sampleData = data.length > 20 ? data.slice(0, 20) : data;
  
  return {
    sampleData,
    metrics: basicMetrics,
    platform,
    dataPoints: data.length
  };
}

function prepareTimeSeriesData(data: AdvertisingData[], platform: Platform): any {
  if (!data || data.length === 0) {
    return { labels: [], datasets: [] };
  }
  
  // Déterminer la colonne de date selon la plateforme
  const dateColumn = platform === 'facebook' ? 'date_start' : 'date';
  
  // Vérifier si la colonne existe
  if (!data[0].hasOwnProperty(dateColumn)) {
    return { labels: [], datasets: [] };
  }
  
  // Interface pour les données agrégées
  interface DailyData {
    spend: number;
    impressions: number;
    clicks: number;
    conversions: number;
  }
  
  // Trier les données par date
  const sortedData = [...data].sort((a, b) => 
    new Date(a[dateColumn]).getTime() - new Date(b[dateColumn]).getTime()
  );
  
  // Agréger les données par jour
  const aggregatedData: Record<string, DailyData> = {};
  sortedData.forEach(row => {
    const date = new Date(row[dateColumn]).toISOString().split('T')[0];
    if (!aggregatedData[date]) {
      aggregatedData[date] = {
        spend: 0,
        impressions: 0,
        clicks: 0,
        conversions: 0
      };
    }
    
    aggregatedData[date].spend += Number(row.spend || 0);
    aggregatedData[date].impressions += Number(row.impressions || 0);
    aggregatedData[date].clicks += Number(row.clicks || 0);
    aggregatedData[date].conversions += Number(row.conversions || 0);
  });
  
  // Formater pour les graphiques
  const labels = Object.keys(aggregatedData);
  
  return {
    labels,
    datasets: [
      {
        label: 'Dépenses',
        data: labels.map(date => aggregatedData[date].spend),
        backgroundColor: ['rgba(255, 99, 132, 0.5)'],
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Clics',
        data: labels.map(date => aggregatedData[date].clicks),
        backgroundColor: ['rgba(54, 162, 235, 0.5)'],
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Conversions',
        data: labels.map(date => aggregatedData[date].conversions),
        backgroundColor: ['rgba(75, 192, 192, 0.5)'],
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }
    ]
  };
}

function prepareCompareData(data: AdvertisingData[], platform: Platform): any {
  // Préparation des données pour comparer les campagnes
  
  // Identifier la colonne de campagne
  const campaignColumn = Object.keys(data[0] || {}).find(key => 
    key.toLowerCase().includes('campaign') || 
    key.toLowerCase().includes('adset') ||
    key.toLowerCase().includes('ad_name')
  );
  
  if (!campaignColumn || data.length === 0) {
    return { labels: [], datasets: [] };
  }
  
  // Interface pour les données agrégées par campagne
  interface CampaignData {
    spend: number;
    impressions: number;
    clicks: number;
    conversions: number;
    ctr?: number;
    cpc?: number;
    cpa?: number;
  }
  
  // Agréger les données par campagne
  const aggregatedData: Record<string, CampaignData> = {};
  data.forEach(row => {
    const campaign = row[campaignColumn];
    if (!campaign) return;
    
    if (!aggregatedData[campaign]) {
      aggregatedData[campaign] = {
        spend: 0,
        impressions: 0,
        clicks: 0,
        conversions: 0
      };
    }
    
    aggregatedData[campaign].spend += Number(row.spend || 0);
    aggregatedData[campaign].impressions += Number(row.impressions || 0);
    aggregatedData[campaign].clicks += Number(row.clicks || 0);
    aggregatedData[campaign].conversions += Number(row.conversions || 0);
  });
  
  // Calculer les métriques dérivées
  Object.keys(aggregatedData).forEach(campaign => {
    const data = aggregatedData[campaign];
    
    // CTR (Click-Through Rate)
    data.ctr = data.impressions ? (data.clicks / data.impressions) * 100 : 0;
    
    // CPC (Cost Per Click)
    data.cpc = data.clicks ? data.spend / data.clicks : 0;
    
    // CPA (Cost Per Acquisition)
    data.cpa = data.conversions ? data.spend / data.conversions : 0;
  });
  
  // Trier les campagnes par dépenses décroissantes
  const sortedCampaigns = Object.keys(aggregatedData).sort(
    (a, b) => aggregatedData[b].spend - aggregatedData[a].spend
  );
  
  // Limiter aux 10 principales campagnes
  const topCampaigns = sortedCampaigns.slice(0, 10);
  
  return {
    labels: topCampaigns,
    datasets: [
      {
        label: 'Dépenses',
        data: topCampaigns.map(campaign => aggregatedData[campaign].spend),
        backgroundColor: ['rgba(255, 99, 132, 0.5)'],
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'CTR (%)',
        data: topCampaigns.map(campaign => aggregatedData[campaign].ctr),
        backgroundColor: ['rgba(54, 162, 235, 0.5)'],
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'CPA (€)',
        data: topCampaigns.map(campaign => aggregatedData[campaign].cpa),
        backgroundColor: ['rgba(75, 192, 192, 0.5)'],
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }
    ]
  };
}

function prepareDistributionData(data: AdvertisingData[], platform: Platform): any {
  if (!data || data.length === 0) {
    return { labels: [], datasets: [] };
  }

  // Déterminer la colonne pour la distribution selon la plateforme
  let distributionColumn: string | undefined;
  
  if (platform === 'facebook') {
    distributionColumn = Object.keys(data[0]).find(key =>
      key.toLowerCase().includes('placement') ||
      key.toLowerCase().includes('device') ||
      key.toLowerCase().includes('age') ||
      key.toLowerCase().includes('gender') ||
      key.toLowerCase().includes('platform_position')
    );
  } else {
    distributionColumn = Object.keys(data[0]).find(key =>
      key.toLowerCase().includes('device') ||
      key.toLowerCase().includes('network') ||
      key.toLowerCase().includes('age') ||
      key.toLowerCase().includes('gender')
    );
  }
  
  if (!distributionColumn) {
    return { labels: [], datasets: [] };
  }
  
  // Agréger les données
  const aggregatedData: Record<string, number> = {};
  data.forEach(row => {
    const category = row[distributionColumn] || 'Non défini';
    if (!aggregatedData[category]) {
      aggregatedData[category] = 0;
    }
    
    aggregatedData[category] += Number(row.spend || 0);
  });
  
  // Trier par valeur
  const sortedCategories = Object.keys(aggregatedData)
    .sort((a, b) => aggregatedData[b] - aggregatedData[a])
    .slice(0, 8); // Limiter pour une meilleure lisibilité
  
  // Calculer "Autres" si nécessaire
  let otherValue = 0;
  Object.keys(aggregatedData).forEach(category => {
    if (!sortedCategories.includes(category)) {
      otherValue += aggregatedData[category];
    }
  });
  
  if (otherValue > 0) {
    sortedCategories.push('Autres');
    aggregatedData['Autres'] = otherValue;
  }
  
  // Formater pour les graphiques
  return {
    labels: sortedCategories,
    datasets: [
      {
        label: 'Dépenses',
        data: sortedCategories.map(category => aggregatedData[category]),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(199, 199, 199, 0.5)',
          'rgba(83, 102, 255, 0.5)',
        ],
      }
    ]
  };
}

function prepareFunnelData(data: AdvertisingData[], platform: Platform): any {
  // Préparation des données pour les graphiques d'entonnoir
  
  if (data.length === 0) {
    return { labels: [], datasets: [] };
  }
  
  // Agréger les totaux
  let totalImpressions = 0;
  let totalClicks = 0;
  let totalLandingPageViews = 0;
  let totalAddToCart = 0;
  let totalInitiateCheckout = 0;
  let totalConversions = 0;
  
  data.forEach(row => {
    totalImpressions += Number(row.impressions || 0);
    totalClicks += Number(row.clicks || 0);
    
    // Colonnes spécifiques à certaines plateformes
    if (platform === 'facebook') {
      totalLandingPageViews += Number(row.landing_page_views || 0);
      totalAddToCart += Number(row.add_to_cart || 0);
      totalInitiateCheckout += Number(row.initiate_checkout || 0);
    }
    
    totalConversions += Number(row.conversions || 0);
  });
  
  // Formater les données selon la plateforme
  if (platform === 'facebook') {
    return {
      labels: ['Impressions', 'Clics', 'Vues page', 'Panier', 'Checkout', 'Conversions'],
      datasets: [
        {
          data: [
            totalImpressions,
            totalClicks,
            totalLandingPageViews,
            totalAddToCart,
            totalInitiateCheckout,
            totalConversions
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)',
          ],
        }
      ]
    };
  } else {
    return {
      labels: ['Impressions', 'Clics', 'Conversions'],
      datasets: [
        {
          data: [
            totalImpressions,
            totalClicks,
            totalConversions
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 159, 64, 0.5)',
          ],
        }
      ]
    };
  }
}

function calculateROI(data: AdvertisingData[], basicMetrics: any, contextData?: any): number {
  // Fonction pour calculer le ROI basé sur les données contextuelles si disponibles
  
  // Utiliser la valeur moyenne de commande (AOV) des données contextuelles si disponible
  const conversionValue = contextData?.aov ? parseFloat(contextData.aov) : 100;
  
  const totalRevenue = basicMetrics.totalConversions * conversionValue;
  const totalCost = basicMetrics.totalSpend;
  
  if (totalCost === 0) return 0;
  
  return ((totalRevenue - totalCost) / totalCost) * 100;
}

function calculateProjections(data: AdvertisingData[], basicMetrics: any, trends: any[]): any {
  // Calculer des projections basées sur les tendances actuelles
  
  const projections = {
    nextMonth: {
      spend: basicMetrics.totalSpend * 1.1, // Supposant une augmentation de 10%
      conversions: 0,
      cpa: 0,
      roi: 0
    },
    optimized: {
      spend: basicMetrics.totalSpend,
      conversions: 0,
      cpa: 0,
      roi: 0
    }
  };
  
  // Projections pour le mois suivant (scénario actuel)
  if (basicMetrics.cpa && basicMetrics.cpa > 0) {
    projections.nextMonth.conversions = projections.nextMonth.spend / basicMetrics.cpa;
    projections.nextMonth.cpa = basicMetrics.cpa;
  }
  
  // Valeur moyenne d'une conversion (à personnaliser)
  const conversionValue = 100;
  
  const nextMonthRevenue = projections.nextMonth.conversions * conversionValue;
  if (projections.nextMonth.spend > 0) {
    projections.nextMonth.roi = ((nextMonthRevenue - projections.nextMonth.spend) / projections.nextMonth.spend) * 100;
  }
  
  // Projections optimisées (avec améliorations suggérées)
  projections.optimized.cpa = basicMetrics.cpa * 0.9; // Supposant une amélioration de 10%
  if (projections.optimized.cpa > 0) {
    projections.optimized.conversions = projections.optimized.spend / projections.optimized.cpa;
  }
  
  const optimizedRevenue = projections.optimized.conversions * conversionValue;
  if (projections.optimized.spend > 0) {
    projections.optimized.roi = ((optimizedRevenue - projections.optimized.spend) / projections.optimized.spend) * 100;
  }
  
  return projections;
}

function summarizeData(data: AdvertisingData[]): any {
  // Créer un résumé des données pour l'API OpenAI
  
  // Limiter la taille des données
  const numRows = Math.min(data.length, 10);
  const sampleData = data.slice(0, numRows);
  
  return {
    sampleRows: sampleData,
    totalRows: data.length
  };
}

/**
 * Calcule le CPM moyen à partir des données publicitaires
 */
function calculateAverageCPM(data: AdvertisingData[]): number {
  // Filtrer les données pour obtenir seulement celles avec cpm ou impressions et spend
  const relevantData = data.filter(item => 
    item.cpm !== undefined || 
    (item.impressions && item.impressions > 0 && item.spend !== undefined)
  );
  
  if (relevantData.length === 0) return 0;
  
  let totalCPM = 0;
  
  relevantData.forEach(item => {
    if (item.cpm !== undefined) {
      totalCPM += Number(item.cpm);
    } else if (item.impressions && item.spend) {
      const cpm = (Number(item.spend) / Number(item.impressions)) * 1000;
      totalCPM += cpm;
    }
  });
  
  return totalCPM / relevantData.length;
}

/**
 * Calcule la fréquence moyenne à partir des données publicitaires
 */
function calculateAverageFrequency(data: AdvertisingData[]): number {
  // Filtrer les données pour obtenir seulement celles avec frequency ou (impressions et reach)
  const relevantData = data.filter(item => 
    item.frequency !== undefined || 
    (item.impressions && item.impressions > 0 && item.reach && Number(item.reach) > 0)
  );
  
  if (relevantData.length === 0) return 0;
  
  let totalFrequency = 0;
  
  relevantData.forEach(item => {
    if (item.frequency !== undefined) {
      totalFrequency += Number(item.frequency);
    } else if (item.impressions && item.reach) {
      const frequency = Number(item.impressions) / Number(item.reach);
      totalFrequency += frequency;
    }
  });
  
  return totalFrequency / relevantData.length;
}

/**
 * Analyse la structure de budget utilisée dans les campagnes (CBO vs ABO)
 */
function analyzeBudgetStructure(data: AdvertisingData[]): {
  cbo: number;
  abo: number;
  averagePerformance: {
    cbo: { ctr: number; cpa: number; roas: number };
    abo: { ctr: number; cpa: number; roas: number };
  }
} {
  // Filtrer les données pour obtenir seulement celles avec des informations de budget
  const budgetData = data.filter(item => 
    (item.campaign_budget_type || item.adset_budget_type || item.budget_type) !== undefined
  );
  
  if (budgetData.length === 0) {
    return {
      cbo: 0,
      abo: 0,
      averagePerformance: {
        cbo: { ctr: 0, cpa: 0, roas: 0 },
        abo: { ctr: 0, cpa: 0, roas: 0 }
      }
    };
  }
  
  // Identifier les campagnes CBO et ABO
  const cboItems = budgetData.filter(item => {
    const budgetType = item.campaign_budget_type || item.budget_type || '';
    return typeof budgetType === 'string' && 
          (budgetType.toLowerCase().includes('campaign') || 
           budgetType.toLowerCase().includes('cbo'));
  });
  
  const aboItems = budgetData.filter(item => {
    const budgetType = item.adset_budget_type || item.budget_type || '';
    return typeof budgetType === 'string' && 
          (budgetType.toLowerCase().includes('adset') || 
           budgetType.toLowerCase().includes('abo'));
  });
  
  // Calculer les performances moyennes pour chaque type
  const cboPerformance = {
    ctr: cboItems.length > 0 ? cboItems.reduce((sum, item) => sum + (Number(item.ctr) || 0), 0) / cboItems.length : 0,
    cpa: cboItems.length > 0 ? cboItems.reduce((sum, item) => sum + (Number(item.cpa) || 0), 0) / cboItems.length : 0,
    roas: cboItems.length > 0 ? cboItems.reduce((sum, item) => sum + (Number(item.roas) || 0), 0) / cboItems.length : 0
  };
  
  const aboPerformance = {
    ctr: aboItems.length > 0 ? aboItems.reduce((sum, item) => sum + (Number(item.ctr) || 0), 0) / aboItems.length : 0,
    cpa: aboItems.length > 0 ? aboItems.reduce((sum, item) => sum + (Number(item.cpa) || 0), 0) / aboItems.length : 0,
    roas: aboItems.length > 0 ? aboItems.reduce((sum, item) => sum + (Number(item.roas) || 0), 0) / aboItems.length : 0
  };
  
  return {
    cbo: cboItems.length,
    abo: aboItems.length,
    averagePerformance: {
      cbo: cboPerformance,
      abo: aboPerformance
    }
  };
}

/**
 * Analyse les stratégies d'enchère utilisées dans les campagnes
 */
function analyzeBiddingStrategies(data: AdvertisingData[]): {
  strategies: { [strategy: string]: number };
  performance: { [strategy: string]: { ctr: number; cpa: number; roas: number } };
} {
  // Filtrer les données avec des informations de stratégie d'enchère
  const biddingData = data.filter(item => item.campaign_bid_strategy !== undefined);
  
  if (biddingData.length === 0) {
    return {
      strategies: {},
      performance: {}
    };
  }
  
  // Compter les occurrences de chaque stratégie
  const strategies: { [strategy: string]: number } = {};
  const strategyItems: { [strategy: string]: AdvertisingData[] } = {};
  
  biddingData.forEach(item => {
    const strategy = String(item.campaign_bid_strategy).toLowerCase();
    if (!strategies[strategy]) {
      strategies[strategy] = 0;
      strategyItems[strategy] = [];
    }
    strategies[strategy]++;
    strategyItems[strategy].push(item);
  });
  
  // Calculer les performances moyennes par stratégie
  const performance: { [strategy: string]: { ctr: number; cpa: number; roas: number } } = {};
  
  Object.keys(strategyItems).forEach(strategy => {
    const items = strategyItems[strategy];
    performance[strategy] = {
      ctr: items.reduce((sum, item) => sum + (Number(item.ctr) || 0), 0) / items.length,
      cpa: items.reduce((sum, item) => sum + (Number(item.cpa) || 0), 0) / items.length,
      roas: items.reduce((sum, item) => sum + (Number(item.roas) || 0), 0) / items.length
    };
  });
  
  return {
    strategies,
    performance
  };
}
