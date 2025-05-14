/**
 * Types pour les données d'analyse publicitaire
 */

/**
 * Données publicitaires de base
 */
export interface AdvertisingData {
  // Date de la période de rapport (au format YYYY-MM-DD)
  date?: string | Date;
  
  // Dépense publicitaire
  spend?: number;
  
  // Nombre d'impressions
  impressions?: number;
  
  // Nombre de clics
  clicks?: number;
  
  // Nombre de conversions
  conversions?: number;
  
  // Taux de clics (clicks / impressions)
  ctr?: number;
  
  // Coût par clic (spend / clicks)
  cpc?: number;
  
  // Coût par mille impressions (spend / impressions * 1000)
  cpm?: number;
  
  // Coût par acquisition (spend / conversions)
  cpa?: number;
  
  // Taux de conversion (conversions / clicks)
  conversionRate?: number;
  
  // Nom de la campagne
  campaign_name?: string;
  
  // Nom du groupe d'annonces
  adset_name?: string;
  
  // Nom de l'annonce
  ad_name?: string;
  
  // Plateforme (Facebook, Google, etc.)
  platform?: string;
  
  // Placement de l'annonce
  placement?: string;
  
  // Appareil
  device?: string;
  
  // Fréquence (nombre moyen d'expositions par utilisateur)
  frequency?: number;
  
  // Âge de l'audience
  age?: string;
  
  // Genre de l'audience
  gender?: string;
  
  // Pages vues
  landing_page_views?: number;
  
  // Ajouts au panier
  add_to_cart?: number;
  
  // Initiations de paiement
  initiate_checkout?: number;
  
  // Type d'enchère
  bid_type?: string;
  
  // Stratégie d'optimisation du budget
  budget_optimization?: string;
  
  // Montant du budget quotidien/permanent
  budget_amount?: number;
  
  // Valeur de conversion moyenne
  average_conversion_value?: number;
  
  // Retour sur dépense publicitaire (ROAS)
  roas?: number;
  
  // Métadonnées additionnelles (champs spécifiques à la plateforme)
  [key: string]: any;
}

/**
 * Options pour l'analyse des données publicitaires
 */
export interface AnalysisOptions {
  // Type d'analyse à effectuer
  analysisType: 'performance' | 'roi' | 'audience' | 'creative' | 'channel_comparison' | 'custom';
  
  // Métriques à inclure dans l'analyse
  metrics: string[];
  
  // Dimensions pour la segmentation
  dimensions?: string[];
  
  // Plage de dates à analyser
  dateRange?: {
    startDate: string;
    endDate: string;
  };
  
  // Filtres à appliquer
  filters?: Array<{
    field: string;
    operator: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains' | 'not_contains';
    value: string | number | boolean;
  }>;
  
  // Nombre maximal de résultats à retourner
  limit?: number;
  
  // Champ de tri
  sortBy?: string;
  
  // Ordre de tri
  sortOrder?: 'asc' | 'desc';
  
  // Options spécifiques au type d'analyse
  specificOptions?: {
    // Pour l'analyse ROI
    unitEconomics?: {
      averageOrderValue?: number;
      costOfGoodsSold?: number;
      customerLifetimeValue?: number;
      grossMargin?: number;
      otherMarketingExpenses?: number;
    };
    
    // Pour l'analyse d'audience
    audienceSegments?: string[];
    
    // Pour l'analyse de créatifs
    creativeElements?: string[];
  };
}

/**
 * Résultat d'une analyse de données publicitaires
 */
export interface AnalysisResult {
  // Identifiant unique de l'analyse
  id: string;
  
  // Titre de l'analyse
  title: string;
  
  // Description de l'analyse
  description: string;
  
  // Type d'analyse effectuée
  analysisType: AnalysisOptions['analysisType'];
  
  // Date de génération de l'analyse
  generatedAt: string;
  
  // Résumé des insights principaux
  insights: Array<{
    // Titre de l'insight
    title: string;
    
    // Description détaillée
    description: string;
    
    // Importance de l'insight (0-1)
    importance: number;
    
    // Métriques associées
    metrics?: Array<{
      name: string;
      value: number;
      change?: number;
      trend?: 'up' | 'down' | 'stable';
    }>;
  }>;
  
  // Visualisations associées à l'analyse
  visualizations?: Array<{
    // Type de visualisation
    type: 'line' | 'bar' | 'pie' | 'scatter' | 'table' | 'heatmap';
    
    // Titre de la visualisation
    title: string;
    
    // Description de la visualisation
    description?: string;
    
    // Configuration spécifique à la visualisation
    config: any;
    
    // Données pour la visualisation
    data: any;
  }>;
  
  // Données brutes de l'analyse
  data: any;
  
  // Métadonnées de qualité des données
  quality: {
    // Nombre total de points de données analysés
    dataPoints: number;
    
    // Fiabilité des données (0-1)
    reliability: number;
    
    // Pourcentage de données complètes
    completeness: number;
  };
} 