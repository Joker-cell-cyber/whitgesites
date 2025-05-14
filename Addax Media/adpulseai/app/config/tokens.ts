/**
 * Configuration pour les tokens et les coûts API
 */

// Coûts approximatifs par opération (en tokens virtuels internes)
export const API_COSTS = {
  // Analyse de données
  ANALYSIS: {
    MACRO: 2,
    MICRO: 4
  },
  
  // Prédictions et projections
  PREDICTION: {
    SHORT_TERM: 3,  // 1-3 mois
    LONG_TERM: 5    // 6-12 mois
  },
  
  // Visualisations
  VISUALIZATION: {
    BASIC: 1,
    CUSTOM: 2
  }
};

// Configuration des limites par type d'abonnement
export const SUBSCRIPTION_LIMITS = {
  "À la carte": {
    tokensPerPurchase: "variable",
    maxDataPoints: 500,
    maxCustomizations: 3,
    aiFeatures: ['basic_analysis', 'simple_predictions']
  },
  "Débutant": {
    tokensPerMonth: 45,
    tokensPerBiweekly: 27,
    tokensPerQuarterly: 121,
    tokensPerYearly: 432,
    extraTokenPrice: 0.75,
    maxDataPoints: 2000,
    maxCustomizations: 5,
    aiFeatures: ['basic_analysis', 'simple_predictions', 'trend_detection']
  },
  "Intermédiaire": {
    tokensPerMonth: 100,
    tokensPerBiweekly: 60,
    tokensPerQuarterly: 270,
    tokensPerYearly: 960,
    extraTokenPrice: 0.60,
    maxDataPoints: 5000,
    maxCustomizations: 10,
    aiFeatures: ['advanced_analysis', 'custom_predictions', 'trend_detection']
  },
  "Avancé": {
    tokensPerMonth: 180,
    tokensPerBiweekly: 108,
    tokensPerQuarterly: 486,
    tokensPerYearly: 1728,
    extraTokenPrice: 0.45,
    maxDataPoints: 20000,
    maxCustomizations: 20,
    aiFeatures: ['advanced_analysis', 'custom_predictions', 'trend_detection', 'audience_insights']
  },
  "Coach Pro": {
    tokensPerMonth: 300,
    tokensPerBiweekly: 180,
    tokensPerQuarterly: 810,
    tokensPerYearly: 2880,
    extraTokenPrice: 0.35,
    maxDataPoints: 50000,
    maxCustomizations: 'unlimited',
    aiFeatures: ['all']
  }
};

// Token rates pour OpenAI
export const OPENAI_TOKEN_RATES = {
  GPT4: {
    input: 0.00001,    // $0.01 per 1K tokens (input)
    output: 0.00003    // $0.03 per 1K tokens (output)
  },
  GPT35Turbo: {
    input: 0.000001,   // $0.001 per 1K tokens (input)
    output: 0.000002   // $0.002 per 1K tokens (output)
  }
};

/**
 * Calcule le coût estimé en USD d'un appel API
 */
export const estimateOpenAICost = (
  inputTokens: number,
  outputTokens: number,
  model: 'GPT4' | 'GPT35Turbo' = 'GPT4'
): number => {
  const rates = OPENAI_TOKEN_RATES[model];
  return (inputTokens * rates.input) + (outputTokens * rates.output);
};

/**
 * Permet d'obtenir un modèle adapté en fonction du budget/priorité
 */
export const getAppropriateModel = (
  importance: 'high' | 'medium' | 'low',
  budgetConstraint: boolean
): string => {
  if (importance === 'high' && !budgetConstraint) {
    return 'gpt-4-turbo';
  } 
  
  if (importance === 'medium' || (importance === 'high' && budgetConstraint)) {
    return 'gpt-3.5-turbo-16k';
  }
  
  return 'gpt-3.5-turbo';
}; 