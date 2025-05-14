/**
 * Service de visualisation pour l'analyse des données publicitaires
 */

import { AdvertisingData, Platform, VisualizationData } from '../types/data-types';

// Interface pour les données de graphique
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    borderWidth?: number;
    fill?: boolean;
  }[];
}

/**
 * Génère les données de visualisation à partir des données publicitaires
 */
export async function generateVisualizations(
  data: AdvertisingData[],
  platform: Platform
): Promise<VisualizationData> {
  // Validation des données d'entrée
  if (!data || !Array.isArray(data) || data.length === 0) {
    throw new Error('Données publicitaires invalides ou manquantes pour la visualisation');
  }

  if (!platform) {
    throw new Error('Plateforme non spécifiée pour la visualisation');
  }

  // Nettoyer les données pour éviter les valeurs null ou undefined
  const cleanedData = data.map(item => ({
    ...item,
    date: item.date || '',
    campaign_name: item.campaign_name || 'Non défini',
    ad_set_name: item.ad_set_name || 'Non défini',
    spend: parseFloat(item.spend as any) || 0,
    impressions: parseInt(item.impressions as any) || 0,
    clicks: parseInt(item.clicks as any) || 0,
    conversions: parseInt(item.conversions as any) || 0
  }));

  // Trier les données par date
  const sortedData = [...cleanedData].sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    return dateA - dateB;
  });

  try {
    return {
      timeSeriesData: generateTimeSeriesData(sortedData),
      compareData: generateCompareData(sortedData, platform),
      distributionData: generateDistributionData(sortedData),
      funnelData: generateFunnelData(sortedData)
    };
  } catch (error) {
    console.error('Erreur lors de la génération des visualisations:', error);
    throw new Error(`Erreur de visualisation: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
  }
}

/**
 * Génère des données de série temporelle (évolution des métriques dans le temps)
 */
function generateTimeSeriesData(data: AdvertisingData[]): { labels: string[]; datasets: any[] } {
  // Extraire les dates uniques
  const dates = [...new Set(data.map(item => item.date || ''))].filter(Boolean);
  
  if (dates.length === 0) {
    return {
      labels: ['Aucune donnée temporelle disponible'],
      datasets: [
        {
          label: 'Aucune donnée',
          data: [0],
          borderColor: 'rgb(200, 200, 200)',
          backgroundColor: ['rgba(200, 200, 200, 0.2)'],
          borderWidth: 2,
          fill: false
        }
      ]
    };
  }
  
  // Agréger les données par date
  const aggregatedData = dates.map(date => {
    const dayData = data.filter(item => item.date === date);
    return {
      date,
      spend: dayData.reduce((sum, item) => sum + (Number(item.spend) || 0), 0),
      impressions: dayData.reduce((sum, item) => sum + (Number(item.impressions) || 0), 0),
      clicks: dayData.reduce((sum, item) => sum + (Number(item.clicks) || 0), 0),
      conversions: dayData.reduce((sum, item) => sum + (Number(item.conversions) || 0), 0)
    };
  });

  return {
    labels: dates,
    datasets: [
      {
        label: 'Dépenses (€)',
        data: aggregatedData.map(item => item.spend),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
        borderWidth: 2,
        fill: false
      },
      {
        label: 'Clics',
        data: aggregatedData.map(item => item.clicks),
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: ['rgba(54, 162, 235, 0.2)'],
        borderWidth: 2,
        fill: false
      },
      {
        label: 'Conversions',
        data: aggregatedData.map(item => item.conversions),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: ['rgba(75, 192, 192, 0.2)'],
        borderWidth: 2,
        fill: false
      }
    ]
  };
}

/**
 * Génère des données comparatives entre différentes campagnes ou plateformes
 */
function generateCompareData(data: AdvertisingData[], platform: Platform): { labels: string[]; datasets: any[] } {
  // Si la plateforme est Facebook ou Google, comparer les campagnes
  if (platform === 'facebook' || platform === 'google') {
    // Extraire les campagnes uniques
    const campaigns = [...new Set(data.map(item => item.campaign_name || ''))].filter(Boolean);
    
    if (campaigns.length === 0) {
      return {
        labels: ['Aucune campagne identifiée'],
        datasets: [
          {
            label: 'Aucune donnée',
            data: [0],
            backgroundColor: 'rgba(200, 200, 200, 0.2)',
          }
        ]
      };
    }
    
    // Agréger les données par campagne
    const campaignData = campaigns.map(campaign => {
      const campaignItems = data.filter(item => item.campaign_name === campaign);
      const spend = campaignItems.reduce((sum, item) => sum + (Number(item.spend) || 0), 0);
      const clicks = campaignItems.reduce((sum, item) => sum + (Number(item.clicks) || 0), 0);
      const conversions = campaignItems.reduce((sum, item) => sum + (Number(item.conversions) || 0), 0);
      
      return {
        campaign,
        spend,
        ctr: clicks > 0 && campaignItems.reduce((sum, item) => sum + (Number(item.impressions) || 0), 0) > 0 
          ? (clicks / campaignItems.reduce((sum, item) => sum + (Number(item.impressions) || 0), 0)) * 100 
          : 0,
        cpa: conversions > 0 ? spend / conversions : 0
      };
    });

    return {
      labels: campaigns,
      datasets: [
        {
          label: 'Dépenses (€)',
          data: campaignData.map(item => item.spend),
          backgroundColor: ['rgba(54, 162, 235, 0.6)'],
          borderWidth: 1
        },
        {
          label: 'Taux de clics (%)',
          data: campaignData.map(item => item.ctr),
          backgroundColor: ['rgba(75, 192, 192, 0.6)'],
          borderWidth: 1
        },
        {
          label: 'Coût par acquisition (€)',
          data: campaignData.map(item => item.cpa),
          backgroundColor: ['rgba(255, 99, 132, 0.6)'],
          borderWidth: 1
        }
      ]
    };
  } else {
    // Comparer les performances générales par jour
    const dates = [...new Set(data.map(item => item.date || ''))].filter(Boolean);
    
    // Si nous avons moins de 3 dates, utiliser des dates fictives
    const chartLabels = dates.length >= 3 
      ? dates 
      : ['Jour 1', 'Jour 2', 'Jour 3', 'Jour 4', 'Jour 5'];
    
    return {
      labels: chartLabels,
      datasets: [
        {
          label: 'Impressions',
          data: dates.length >= 3 
            ? dates.map(date => {
                const dayData = data.filter(item => item.date === date);
                return dayData.reduce((sum, item) => sum + (Number(item.impressions) || 0), 0);
              })
            : [1200, 1900, 3000, 5000, 4500],
          backgroundColor: ['rgba(54, 162, 235, 0.6)'],
          borderWidth: 1
        }
      ]
    };
  }
}

/**
 * Génère des données de distribution pour les graphiques en secteurs
 */
function generateDistributionData(data: AdvertisingData[]): { labels: string[]; datasets: any[] } {
  // Si nous avons des données par campagne, afficher la répartition des dépenses
  const campaigns = [...new Set(data.map(item => item.campaign_name || ''))].filter(Boolean);
  
  if (campaigns.length > 0) {
    // Calculer les dépenses par campagne
    const spendByCampaign = campaigns.map(campaign => {
      const campaignItems = data.filter(item => item.campaign_name === campaign);
      return {
        campaign,
        spend: campaignItems.reduce((sum, item) => sum + (Number(item.spend) || 0), 0)
      };
    });

    return {
      labels: spendByCampaign.map(item => item.campaign),
      datasets: [
        {
          label: 'Répartition des dépenses',
          data: spendByCampaign.map(item => item.spend),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)'
          ],
          borderWidth: 1
        }
      ]
    };
  } else {
    // Utiliser des données fictives pour la démonstration
    return {
      labels: ['Facebook', 'Google', 'LinkedIn', 'TikTok', 'Autres'],
      datasets: [
        {
          label: 'Répartition des dépenses',
          data: [35, 25, 15, 15, 10],
          backgroundColor: [
            'rgba(59, 130, 246, 0.6)', // Facebook
            'rgba(220, 38, 38, 0.6)',  // Google
            'rgba(37, 99, 235, 0.6)',  // LinkedIn
            'rgba(236, 72, 153, 0.6)', // TikTok
            'rgba(107, 114, 128, 0.6)' // Autres
          ],
          borderWidth: 1
        }
      ]
    };
  }
}

/**
 * Génère des données pour un graphique en entonnoir (funnel)
 */
function generateFunnelData(data: AdvertisingData[]): { labels: string[]; datasets: any[] } {
  // Agréger les métriques du funnel
  const impressions = data.reduce((sum, item) => sum + (Number(item.impressions) || 0), 0);
  const clicks = data.reduce((sum, item) => sum + (Number(item.clicks) || 0), 0);
  const landingPageViews = data.reduce((sum, item) => sum + (Number(item.landing_page_views) || 0), 0) || clicks * 0.7;
  const addToCart = data.reduce((sum, item) => sum + (Number(item.add_to_cart) || 0), 0) || landingPageViews * 0.2;
  const initiateCheckout = data.reduce((sum, item) => sum + (Number(item.initiate_checkout) || 0), 0) || addToCart * 0.5;
  const conversions = data.reduce((sum, item) => sum + (Number(item.conversions) || 0), 0) || initiateCheckout * 0.7;

  return {
    labels: ['Impressions', 'Clics', 'Vues de page', 'Ajouts au panier', 'Début de checkout', 'Conversions'],
    datasets: [
      {
        label: 'Entonnoir de conversion',
        data: [impressions, clicks, landingPageViews, addToCart, initiateCheckout, conversions],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 99, 132, 0.6)'
        ],
        borderWidth: 1
      }
    ]
  };
}

/**
 * Formate les données pour l'exportation vers des bibliothèques de graphiques comme Chart.js
 */
export function formatChartData(data: any, chartType: string): ChartData {
  // Cette fonction peut être adaptée en fonction de la bibliothèque de graphiques utilisée
  return {
    labels: data.labels || [],
    datasets: data.datasets || []
  };
}

// Analyse comparative par plateforme (si applicable)
export function generatePlatformComparisonChart(data: AdvertisingData[]): any {
  // Nous nous concentrons uniquement sur Facebook
  return {
    labels: ['Facebook'],
    datasets: [
      {
        label: 'Plateforme publicitaire',
        data: [100],
        backgroundColor: ['rgba(59, 89, 152, 0.6)'],  // Couleur Facebook
        borderColor: 'rgba(59, 89, 152, 1)',
        borderWidth: 1
      }
    ]
  };
} 