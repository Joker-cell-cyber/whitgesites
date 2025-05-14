/**
 * Types pour les fonctionnalités de prédiction
 */

/**
 * Options pour la génération de prédictions
 */
export interface PredictionOptions {
  // Type de prédiction à générer
  predictionType: 'performance' | 'budget' | 'audience' | 'creative';
  
  // Horizon temporel pour les prédictions
  timeHorizon: '1month' | '3months' | '6months' | '12months';
  
  // Plateforme publicitaire concernée
  platform: string;
  
  // Inclure l'analyse de saisonnalité
  includeSeasonality?: boolean;
  
  // Niveau de confiance pour les intervalles (0-1)
  confidenceLevel?: number;
  
  // Générer des recommandations basées sur les prédictions
  includeRecommendations?: boolean;
  
  // Options spécifiques au type de prédiction
  specificOptions?: {
    // Pour les prédictions de budget
    budgetChangePercent?: number;
    
    // Pour les prédictions d'audience
    targetAudience?: string;
    
    // Pour les prédictions de créatifs
    creativeType?: string;
  };
}

/**
 * Métrique prédite avec valeurs actuelle et future
 */
export interface PredictionMetric {
  // Nom de la métrique
  name: string;
  
  // Valeur actuelle (moyenne des données historiques)
  current: number;
  
  // Valeur prédite (à la fin de l'horizon temporel)
  predicted: number;
  
  // Changement en pourcentage
  change: number;
  
  // Limite basse de l'intervalle de confiance
  confidenceLow: number;
  
  // Limite haute de l'intervalle de confiance
  confidenceHigh: number;
}

/**
 * Résultat d'une prédiction
 */
export interface PredictionResult {
  // Identifiant unique de la prédiction
  id: string;
  
  // Titre de la prédiction
  title: string;
  
  // Description détaillée
  description: string;
  
  // Type de prédiction
  predictionType: PredictionOptions['predictionType'];
  
  // Horizon temporel
  timeHorizon: PredictionOptions['timeHorizon'];
  
  // Métriques prédites
  metrics: PredictionMetric[];
  
  // Impact de la saisonnalité (en pourcentage)
  seasonalityImpact?: number;
  
  // Recommandations basées sur les prédictions
  recommendations?: any[];
  
  // Données chronologiques pour les visualisations
  data: {
    // Dates pour l'axe X
    dates: string[];
    
    // Valeurs prédites pour chaque métrique
    values: Record<string, number[]>;
    
    // Intervalles de confiance (optionnel)
    confidence?: Record<string, {
      low: number[];
      high: number[];
    }>;
  };
  
  // Qualité de la prédiction
  quality: {
    // Précision estimée (0-1)
    accuracy: number;
    
    // Niveau de confiance (0-1)
    confidence: number;
    
    // Nombre de points de données utilisés
    dataPoints: number;
  };
}

/**
 * Modèle de saisonnalité
 */
export interface SeasonalityModel {
  // Facteurs hebdomadaires (dimanche=0, lundi=1, ..., samedi=6)
  weekly: number[];
  
  // Facteurs mensuels (janvier=0, février=1, ..., décembre=11)
  yearly: number[];
  
  // Facteurs trimestriels (Q1=0, Q2=1, Q3=2, Q4=3)
  quarterly: number[];
  
  // Événements spéciaux détectés
  specialEvents?: Array<{
    // Nom de l'événement
    name: string;
    
    // Date de début
    startDate: string;
    
    // Date de fin
    endDate: string;
    
    // Impact estimé (multiplicateur)
    impact: number;
  }>;
} 