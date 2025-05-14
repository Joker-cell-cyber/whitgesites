/**
 * Types pour les prédictions et analyses prédictives
 */

export type PredictionType = 'performance' | 'budget' | 'audience' | 'creative';
export type TimeHorizon = '1month' | '3months' | '6months' | '12months';
export type BudgetScenario = 'increase' | 'decrease' | 'maintain';
export type OptimizationGoal = 'cpa' | 'roas' | 'reach' | 'engagement';

// Options pour les prédictions
export interface PredictionOptions {
  predictionType: PredictionType;
  timeHorizon: TimeHorizon;
  platform: string;
  budgetScenario?: {
    type: BudgetScenario;
    value: number; // Pourcentage ou montant absolu
  };
  optimizationGoal?: OptimizationGoal;
  includeSeasonality: boolean;
  confidenceInterval: boolean;
  contextualData?: any; // Données contextuelles du formulaire d'unit economics
}

// Métriques prédites avec intervalles de confiance
export interface PredictionMetric {
  name: string;
  current: number;
  predicted: number;
  change: number; // En pourcentage
  confidenceLow?: number;
  confidenceHigh?: number;
  confidenceInterval?: number; // En pourcentage
}

// Résultats de prédiction
export interface PredictionResult {
  id: string;
  title: string;
  description: string;
  predictionType: PredictionType; 
  timeHorizon: TimeHorizon;
  metrics: PredictionMetric[];
  seasonalityImpact?: number; // En pourcentage
  recommendations: PredictionRecommendation[];
  data: {
    dates: string[];
    values: {[metric: string]: number[]};
    confidence?: {[metric: string]: [number[], number[]]};
  };
  quality: {
    accuracy: number; // 0-1
    confidence: number; // 0-1
    dataPoints: number;
  };
}

// Recommandation basée sur la prédiction
export interface PredictionRecommendation {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  impact: {
    metric: string;
    value: number;
    timeframe: string;
  };
  riskLevel: 'low' | 'medium' | 'high';
  action: string;
}

// Modèle de saisonnalité
export interface SeasonalityModel {
  weekly: number[]; // 7 facteurs pour les jours de la semaine
  monthly: number[]; // 31 facteurs pour les jours du mois
  quarterly: number[]; // 4 facteurs pour les trimestres
  yearly: number[]; // 12 facteurs pour les mois de l'année
  events: {
    [eventName: string]: {
      startDate: string;
      endDate: string;
      factor: number;
    };
  };
}

// Paramètres d'unit economics pour les prédictions
export interface UnitEconomics {
  grossMargin: number; // En pourcentage
  averageOrderValue: number;
  customerLifetimeValue: number;
  repeatPurchaseRate: number; // En pourcentage
  targetROAS: number;
  targetCPA?: number;
  fixedCosts?: number;
  variableCosts?: number;
} 