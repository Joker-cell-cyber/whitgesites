// Types pour la génération de plans nutritionnels professionnels

export interface UserNutritionProfile {
  // Données biométriques
  age: number;
  gender: 'homme' | 'femme' | 'autre';
  weight: number; // kg
  height: number; // cm
  bodyFatPercentage?: number; // pourcentage
  
  // Niveau d'activité
  activityLevel: 'sédentaire' | 'légèrement_actif' | 'modérément_actif' | 'très_actif' | 'extrêmement_actif';
  trainingFrequency: number; // nombre de séances par semaine
  trainingDuration: number; // durée moyenne d'une séance en minutes
  trainingType: string[]; // types d'entraînement (force, hypertrophie, endurance, etc.)
  
  // Objectifs
  goal: 'perte_de_poids' | 'prise_de_masse' | 'maintien' | 'performance' | 'santé';
  targetWeight?: number; // poids cible en kg
  weeklyWeightChange?: number; // changement de poids visé par semaine en kg
  
  // Préférences alimentaires
  dietaryPreferences: string[]; // végétarien, végétalien, omnivore, etc.
  excludedFoods: string[]; // aliments à exclure
  favoriteProteinSources: string[]; // sources de protéines préférées
  favoriteCarbSources: string[]; // sources de glucides préférées
  favoriteFatSources: string[]; // sources de lipides préférées
  
  // Restrictions médicales
  allergies: string[]; // allergies alimentaires
  medicalConditions: string[]; // conditions médicales (diabète, hypertension, etc.)
  
  // Habitudes actuelles
  currentCalorieIntake?: number; // apport calorique actuel
  mealsPerDay: number; // nombre de repas par jour
  snacksPerDay: number; // nombre de collations par jour
  waterIntake?: number; // litres par jour
  
  // Données avancées (facultatif)
  restingMetabolicRate?: number; // métabolisme de base calculé
  dailyEnergyExpenditure?: number; // dépense énergétique totale calculée
  macroPreferences?: {
    proteinPercentage?: number;
    carbPercentage?: number;
    fatPercentage?: number;
  };
  
  // Informations supplémentaires
  supplements: string[]; // suppléments actuellement utilisés
  sleepHours: number; // heures de sommeil par nuit
  stressLevel: 'faible' | 'modéré' | 'élevé'; // niveau de stress
  nutritionKnowledge: 'débutant' | 'intermédiaire' | 'avancé'; // niveau de connaissance en nutrition
}

export interface MacronutrientDistribution {
  // Protéines
  protein: {
    grams: number;
    gramsPerKg: number;
    calories: number;
    percentage: number;
  };
  
  // Glucides
  carbs: {
    grams: number;
    calories: number;
    percentage: number;
    fiber: {
      minimum: number;
      optimal: number;
    };
  };
  
  // Lipides
  fats: {
    grams: number;
    calories: number;
    percentage: number;
    essentialFats: {
      omega3: number; // grammes
      omega6: number; // grammes
      ratioRecommendation: string;
    };
  };
}

export interface MealTiming {
  name: string; // Petit-déjeuner, déjeuner, etc.
  time: string; // Heure suggérée
  caloriePercentage: number; // Pourcentage des calories quotidiennes
  macroDistribution: {
    proteinPercentage: number;
    carbPercentage: number;
    fatPercentage: number;
  };
  purpose: string; // Objectif de ce repas
  notes: string; // Notes supplémentaires
  preworkout?: boolean; // Si c'est un repas pré-entraînement
  postworkout?: boolean; // Si c'est un repas post-entraînement
}

export interface FoodItem {
  name: string; // Nom de l'aliment
  category: string; // Catégorie (viande, légumes, etc.)
  servingSize: string; // Taille d'une portion
  calories: number; // Calories par portion
  protein: number; // Protéines par portion (g)
  carbs: number; // Glucides par portion (g)
  fat: number; // Lipides par portion (g)
  fiber?: number; // Fibres par portion (g)
  glycemicIndex?: number; // Indice glycémique
  glycemicLoad?: number; // Charge glycémique
  nutritionalBenefits: string[]; // Avantages nutritionnels
  micronutrients?: Record<string, string>; // Micronutriments notables
  substitutes?: string[]; // Substituts possibles
}

export interface NutritionPlanDay {
  dayType: 'repos' | 'entraînement' | 'entraînement_intense';
  calorieTarget: number;
  macroTargets: MacronutrientDistribution;
  meals: {
    meal: MealTiming;
    recommendedFoods: FoodItem[];
    portions: Record<string, string>; // Aliment -> Portion recommandée
    calorieTotal: number;
    macroTotals: {
      protein: number;
      carbs: number;
      fat: number;
    };
    notes?: string;
  }[];
  hydrationPlan: string;
  supplementPlan?: {
    name: string;
    timing: string;
    dosage: string;
    purpose: string;
  }[];
  notes?: string;
}

export interface NutritionProgram {
  userId: string;
  createdAt: string;
  
  // Résumé
  title: string;
  summary: string;
  goal: string;
  duration: number; // en semaines
  
  // Calculs métaboliques
  basalMetabolicRate: number; // BMR calculé
  totalDailyEnergyExpenditure: number; // TDEE calculé
  adjustedCalories: number; // calories ajustées en fonction de l'objectif
  
  // Distribution des macros
  macroDistribution: MacronutrientDistribution;
  
  // Plans quotidiens
  trainingDayPlan: NutritionPlanDay;
  restDayPlan: NutritionPlanDay;
  
  // Recommandations alimentaires générales
  recommendedFoods: {
    proteins: FoodItem[];
    carbs: FoodItem[];
    fats: FoodItem[];
    vegetables: FoodItem[];
    fruits: FoodItem[];
  };
  
  // Plan d'hydratation
  hydrationPlan: {
    dailyWaterIntake: number; // en litres
    timingRecommendations: string;
    electrolytesRecommendation?: string;
  };
  
  // Recommandations de suppléments
  supplementRecommendations?: {
    essential: {
      name: string;
      dosage: string;
      timing: string;
      benefits: string[];
    }[];
    optional: {
      name: string;
      dosage: string;
      timing: string;
      benefits: string[];
      recommendedFor: string[];
    }[];
  };
  
  // Stratégies nutritionnelles
  nutritionStrategies: {
    title: string;
    description: string;
    scientificBasis: string;
    applicationTips: string[];
  }[];
  
  // Stratégies d'adaptation
  adjustmentStrategies: {
    scenario: string;
    recommendation: string;
    explanation: string;
  }[];
  
  // Références scientifiques
  scientificReferences: {
    topic: string;
    citations: string[];
  }[];
  
  // Notes générales et conseils
  generalNotes: string[];
  expertTips: string[];
  
  // Suivi de progression
  progressTracking: {
    metrics: string[];
    frequencyRecommendation: string;
    adjustmentTriggers: string[];
  };
} 