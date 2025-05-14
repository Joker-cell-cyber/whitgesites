'use server';

import OpenAI from 'openai';
import { 
  UserNutritionProfile, 
  MacronutrientDistribution, 
  NutritionProgram, 
  NutritionPlanDay,
  FoodItem
} from './types/coach/nutrition';
import { generateUUID } from './utils';

// Initialisation de l'API OpenAI
const openai = new OpenAI({
  apiKey: "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",
});

// Modèle à utiliser
const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const NUTRITION_TOKEN_COST = 50;

/**
 * Génère un plan nutritionnel complet basé sur le profil de l'utilisateur
 */
export async function generateNutritionProgram(
  userId: string,
  profile: UserNutritionProfile
): Promise<NutritionProgram> {
  try {
    // 1. Calculer les métriques métaboliques
    const metabolicMetrics = calculateMetabolicMetrics(profile);
    
    // 2. Générer la distribution des macronutriments
    const macroDistribution = await generateMacroDistribution(userId, profile, metabolicMetrics);
    
    // 3. Générer les plans quotidiens (jour d'entraînement et jour de repos)
    // Version optimisée: génération en parallèle des plans quotidiens
    const [trainingDayPlan, restDayPlan, foodRecommendations] = await Promise.all([
      generateDailyPlan(userId, profile, macroDistribution, 'entraînement'),
      generateDailyPlan(userId, profile, macroDistribution, 'repos'),
      generateFoodRecommendations(userId, profile)
    ]);
    
    // 4. Génération simplifiée pour les parties non critiques
    // Au lieu de faire des appels séparés à OpenAI, utiliser des valeurs par défaut
    const defaultStrategies = generateDefaultStrategies(profile);
    const defaultSupplementRecommendations = generateDefaultSupplements(profile);
    
    // 5. Générer un résumé basique sans appel à l'API
    const simpleSummary = `Programme nutritionnel personnalisé pour ${getGoalText(profile.goal)} avec ${metabolicMetrics.adjustedCalories} calories quotidiennes. Distribution des macronutriments: ${macroDistribution.protein.percentage}% de protéines, ${macroDistribution.carbs.percentage}% de glucides et ${macroDistribution.fats.percentage}% de lipides.`;
    
    // 6. Compléter le programme nutritionnel avec toutes les données
    const nutritionProgram: NutritionProgram = {
      userId,
      createdAt: new Date().toISOString(),
      
      // Données de base
      title: `Programme nutritionnel pour ${getGoalText(profile.goal)}`,
      summary: simpleSummary,
      goal: getGoalText(profile.goal),
      duration: 12, // 12 semaines par défaut
      
      // Métriques métaboliques
      basalMetabolicRate: metabolicMetrics.bmr,
      totalDailyEnergyExpenditure: metabolicMetrics.tdee,
      adjustedCalories: metabolicMetrics.adjustedCalories,
      
      // Distribution des macros
      macroDistribution,
      
      // Plans quotidiens
      trainingDayPlan,
      restDayPlan,
      
      // Recommandations alimentaires
      recommendedFoods: foodRecommendations,
      
      // Plan d'hydratation
      hydrationPlan: {
        dailyWaterIntake: calculateWaterIntake(profile),
        timingRecommendations: "Boire régulièrement tout au long de la journée, avec un apport légèrement plus important le matin et avant/pendant/après l'entraînement.",
        electrolytesRecommendation: "Ajouter une pincée de sel de mer et du jus de citron si vous vous entraînez intensément ou par temps chaud."
      },
      
      // Recommandations de suppléments
      supplementRecommendations: defaultSupplementRecommendations,
      
      // Stratégies nutritionnelles
      nutritionStrategies: defaultStrategies.nutritionStrategies,
      
      // Stratégies d'adaptation
      adjustmentStrategies: generateAdjustmentStrategies(profile),
      
      // Références scientifiques
      scientificReferences: defaultStrategies.scientificReferences,
      
      // Notes et conseils
      generalNotes: defaultStrategies.generalNotes,
      expertTips: defaultStrategies.expertTips,
      
      // Suivi de progression
      progressTracking: {
        metrics: [
          "Poids corporel (hebdomadaire)",
          "Mesures corporelles (mensuel)",
          "Photos de progression (mensuel)",
          "Journal alimentaire (quotidien)",
          "Niveau d'énergie (quotidien)",
          "Qualité du sommeil (quotidien)",
          "Performance à l'entraînement (par séance)"
        ],
        frequencyRecommendation: "Évaluation hebdomadaire des progrès, ajustements mensuels du plan si nécessaire",
        adjustmentTriggers: [
          "Stagnation du poids pendant plus de 2 semaines",
          "Baisse significative d'énergie",
          "Faim excessive ou prolongée",
          "Mauvaise récupération entre les entraînements"
        ]
      }
    };
    
    return nutritionProgram;
  } catch (error) {
    console.error("Erreur lors de la génération du programme nutritionnel:", error);
    throw error;
  }
}

/**
 * Génère des stratégies nutritionnelles par défaut basées sur le profil
 */
function generateDefaultStrategies(profile: UserNutritionProfile) {
  const goalBased = {
    'perte_de_poids': {
      nutritionStrategies: [
        {
          title: "Déficit calorique modéré",
          description: "Maintenir un déficit calorique de 300-500 kcal par jour pour une perte de poids durable.",
          scientificBasis: "Un déficit modéré permet de préserver la masse musculaire tout en favorisant la perte de graisse.",
          applicationTips: ["Pesez vos aliments", "Tenez un journal alimentaire", "Ajustez progressivement"]
        },
        {
          title: "Timing protéique",
          description: "Répartir la consommation de protéines de manière égale sur tous les repas.",
          scientificBasis: "Favorise la synthèse des protéines musculaires et améliore la satiété.",
          applicationTips: ["20-30g de protéines par repas", "Privilégier des sources complètes"]
        }
      ],
      generalNotes: [
        "Privilégiez les aliments à faible densité calorique et riches en nutriments",
        "Limitez les aliments transformés et riches en sucres ajoutés",
        "Assurez une hydratation adéquate pour optimiser le métabolisme"
      ],
      expertTips: [
        "Commencez vos repas par des légumes pour augmenter la satiété",
        "Préparez vos repas à l'avance pour éviter les choix impulsifs"
      ],
    },
    'maintien': {
      nutritionStrategies: [
        {
          title: "Équilibre énergétique",
          description: "Maintenir un équilibre entre les calories consommées et dépensées.",
          scientificBasis: "L'équilibre calorique est essentiel pour maintenir un poids stable.",
          applicationTips: ["Pesez-vous régulièrement", "Ajustez selon les fluctuations"]
        },
        {
          title: "Alimentation intuitive",
          description: "Développer une meilleure connexion avec les signaux de faim et de satiété.",
          scientificBasis: "Favorise une relation saine avec l'alimentation.",
          applicationTips: ["Mangez lentement", "Écoutez votre corps"]
        }
      ],
      generalNotes: [
        "Visez une alimentation équilibrée et variée",
        "Maintenez une routine alimentaire régulière",
        "Soyez attentif aux signaux de votre corps"
      ],
      expertTips: [
        "Incorporez une grande variété d'aliments pour assurer un apport optimal en micronutriments",
        "Ajustez votre alimentation en fonction de votre niveau d'activité quotidien"
      ],
    },
    'prise_de_masse': {
      nutritionStrategies: [
        {
          title: "Surplus calorique contrôlé",
          description: "Maintenir un surplus calorique de 300-500 kcal par jour pour favoriser la prise de masse.",
          scientificBasis: "Un surplus modéré optimise la prise de masse musculaire tout en limitant la prise de graisse.",
          applicationTips: ["Augmentez progressivement les calories", "Surveillez la composition corporelle"]
        },
        {
          title: "Nutrition péri-entraînement",
          description: "Optimiser l'apport en nutriments avant, pendant et après l'entraînement.",
          scientificBasis: "Maximise la synthèse protéique et la récupération musculaire.",
          applicationTips: ["Consommez des protéines et glucides avant/après l'entraînement", "Restez hydraté"]
        }
      ],
      generalNotes: [
        "Privilégiez les aliments nutritifs et caloriquement denses",
        "Augmentez progressivement vos apports caloriques",
        "Assurez-vous de consommer suffisamment de protéines de qualité"
      ],
      expertTips: [
        "Consommez un repas riche en protéines et glucides dans les 30-60 minutes après l'entraînement",
        "Utilisez des smoothies pour augmenter facilement vos apports caloriques et nutritionnels"
      ],
    }
  };

  // Références scientifiques génériques
  const scientificReferences = [
    {
      topic: "Métabolisme et balance énergétique",
      citations: [
        "Hall KD, et al. Energy balance and its components: implications for body weight regulation. Am J Clin Nutr. 2012;95(4):989-994.",
        "Jequier E, et al. Regulation of body weight: biological and behavioral mechanisms. Obes Res. 2002;10 Suppl 2:208S-212S."
      ]
    },
    {
      topic: "Protéines et composition corporelle",
      citations: [
        "Phillips SM, et al. Protein requirements and supplementation in strength sports. Nutrition. 2004;20(7-8):689-695.",
        "Helms ER, et al. A systematic review of dietary protein during caloric restriction in resistance trained lean athletes: a case for higher intakes. Int J Sport Nutr Exerc Metab. 2014;24(2):127-138."
      ]
    }
  ];

  // Sélectionner les stratégies en fonction de l'objectif
  const goal = profile.goal || 'maintien';
  const strategies = goalBased[goal] || goalBased['maintien'];

  return {
    nutritionStrategies: strategies.nutritionStrategies,
    generalNotes: strategies.generalNotes,
    expertTips: strategies.expertTips,
    scientificReferences: scientificReferences
  };
}

/**
 * Génère des recommandations de suppléments par défaut
 */
function generateDefaultSupplements(profile: UserNutritionProfile) {
  const essential = [
    {
      name: "Protéine en poudre (whey ou végétale)",
      dosage: "20-30g par portion",
      timing: "Post-entraînement ou entre les repas",
      benefits: ["Facilite l'atteinte des besoins en protéines", "Pratique", "Favorise la récupération musculaire"]
    },
    {
      name: "Vitamine D",
      dosage: "1000-2000 UI par jour",
      timing: "Avec un repas contenant des graisses",
      benefits: ["Santé osseuse", "Fonction immunitaire", "Régulation hormonale"]
    }
  ];

  const optional = [
    {
      name: "Créatine monohydrate",
      dosage: "3-5g par jour",
      timing: "N'importe quel moment de la journée",
      benefits: ["Augmente la force", "Améliore la performance", "Favorise la récupération"],
      recommendedFor: ["Prise de masse", "Performance", "Force"]
    },
    {
      name: "Oméga-3 (EPA/DHA)",
      dosage: "1-3g par jour",
      timing: "Avec les repas",
      benefits: ["Anti-inflammatoire", "Santé cardiovasculaire", "Fonction cognitive"],
      recommendedFor: ["Santé générale", "Récupération", "Inflammation"]
    }
  ];

  return {
    essential,
    optional
  };
}

/**
 * Calcule les métriques métaboliques de base
 */
function calculateMetabolicMetrics(profile: UserNutritionProfile) {
  // Calculer le BMR (Basal Metabolic Rate) avec l'équation de Mifflin-St Jeor
  let bmr = 0;
  if (profile.gender === 'homme') {
    bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5;
  } else {
    bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age - 161;
  }
  
  // Facteur d'activité
  const activityFactors = {
    'sédentaire': 1.2,
    'légèrement_actif': 1.375,
    'modérément_actif': 1.55,
    'très_actif': 1.725,
    'extrêmement_actif': 1.9
  };
  
  const activityFactor = activityFactors[profile.activityLevel] || 1.55;
  
  // TDEE (Total Daily Energy Expenditure)
  const tdee = Math.round(bmr * activityFactor);
  
  // Ajuster les calories en fonction de l'objectif
  let adjustedCalories = tdee;
  
  if (profile.goal === 'perte_de_poids') {
    // Déficit calorique - entre 15-25% selon le niveau d'activité et les besoins
    const deficitPercentage = profile.stressLevel === 'élevé' ? 0.15 : 0.2;
    adjustedCalories = Math.round(tdee * (1 - deficitPercentage));
  } else if (profile.goal === 'prise_de_masse') {
    // Surplus calorique - entre 10-20% selon le niveau d'entraînement
    const surplusPercentage = profile.trainingFrequency > 3 ? 0.15 : 0.1;
    adjustedCalories = Math.round(tdee * (1 + surplusPercentage));
  }
  
    return {
    bmr: Math.round(bmr),
    tdee,
    adjustedCalories
  };
}

/**
 * Génère la distribution des macronutriments optimale
 */
async function generateMacroDistribution(
  userId: string,
  profile: UserNutritionProfile,
  metabolicMetrics: { bmr: number; tdee: number; adjustedCalories: number }
): Promise<MacronutrientDistribution> {
  try {
    // Optimiser les macros en fonction de l'objectif et du profil
    let proteinPerKg = 0;
    let carbPercentage = 0;
    let fatPercentage = 0;
    
    // Adapter les protéines selon l'objectif et le niveau d'activité
    if (profile.goal === 'prise_de_masse') {
      proteinPerKg = 1.6 + (profile.trainingFrequency * 0.1); // 1.6 à 2.3 g/kg selon fréquence
    } else if (profile.goal === 'perte_de_poids') {
      proteinPerKg = 2.0 + (profile.trainingFrequency * 0.1); // 2.0 à 2.7 g/kg pour préserver la masse
    } else {
      proteinPerKg = 1.4 + (profile.trainingFrequency * 0.1); // 1.4 à 2.1 g/kg pour maintien
    }
    
    // Plafonner à des valeurs raisonnables
    proteinPerKg = Math.min(proteinPerKg, 2.8);
    
    // Calculer les grammes totaux de protéines
    const proteinGrams = Math.round(proteinPerKg * profile.weight);
    const proteinCalories = proteinGrams * 4;
    const proteinPercentage = Math.round((proteinCalories / metabolicMetrics.adjustedCalories) * 100);
    
    // Répartir le reste entre lipides et glucides selon l'objectif
    if (profile.goal === 'perte_de_poids') {
      fatPercentage = 30; // Plus de graisses pour la satiété
      carbPercentage = 100 - proteinPercentage - fatPercentage;
    } else if (profile.goal === 'prise_de_masse') {
      carbPercentage = 50; // Plus de glucides pour l'énergie
      fatPercentage = 100 - proteinPercentage - carbPercentage;
    } else {
      // Équilibré pour le maintien
      fatPercentage = 25;
      carbPercentage = 100 - proteinPercentage - fatPercentage;
    }
    
    // Ajuster si nécessaire pour éviter les valeurs négatives
    if (carbPercentage < 20) {
      carbPercentage = 20;
      fatPercentage = 100 - proteinPercentage - carbPercentage;
    }
    
    if (fatPercentage < 15) {
      fatPercentage = 15;
      carbPercentage = 100 - proteinPercentage - fatPercentage;
    }
    
    // Calculer les grammes et calories
    const carbGrams = Math.round((carbPercentage / 100) * metabolicMetrics.adjustedCalories / 4);
    const fatGrams = Math.round((fatPercentage / 100) * metabolicMetrics.adjustedCalories / 9);
    
    const carbCalories = carbGrams * 4;
    const fatCalories = fatGrams * 9;
    
    // Calculer les besoins en fibres (11-14g par 1000kcal)
    const minFiber = Math.round(11 * (metabolicMetrics.adjustedCalories / 1000));
    const optimalFiber = Math.round(14 * (metabolicMetrics.adjustedCalories / 1000));
    
    // Recommandations pour les acides gras essentiels
    const omega3 = Math.round(profile.weight * 0.02); // ~20mg/kg de poids corporel
    const omega6 = omega3 * 4; // Ratio omega-6:omega-3 de 4:1
    
    // Construire et retourner la distribution complète des macronutriments
    const macroDistribution: MacronutrientDistribution = {
      protein: {
        grams: proteinGrams,
        gramsPerKg: parseFloat(proteinPerKg.toFixed(1)),
        calories: proteinCalories,
        percentage: proteinPercentage
      },
      carbs: {
        grams: carbGrams,
        calories: carbCalories,
        percentage: carbPercentage,
        fiber: {
          minimum: minFiber,
          optimal: optimalFiber
        }
      },
      fats: {
        grams: fatGrams,
        calories: fatCalories,
        percentage: fatPercentage,
        essentialFats: {
          omega3: omega3,
          omega6: omega6,
          ratioRecommendation: "Viser un ratio oméga-6:oméga-3 de 4:1 ou moins"
        }
      }
    };
    
    return macroDistribution;
  } catch (error) {
    console.error("Erreur lors de la génération de la distribution des macros:", error);
    
    // En cas d'erreur, retourner une distribution par défaut
    const defaultProteinPercentage = 30;
    const defaultCarbPercentage = 40;
    const defaultFatPercentage = 30;
    
    const defaultProteinGrams = Math.round((defaultProteinPercentage / 100) * metabolicMetrics.adjustedCalories / 4);
    const defaultCarbGrams = Math.round((defaultCarbPercentage / 100) * metabolicMetrics.adjustedCalories / 4);
    const defaultFatGrams = Math.round((defaultFatPercentage / 100) * metabolicMetrics.adjustedCalories / 9);
    
    return {
      protein: {
        grams: defaultProteinGrams,
        gramsPerKg: parseFloat((defaultProteinGrams / profile.weight).toFixed(1)),
        calories: defaultProteinGrams * 4,
        percentage: defaultProteinPercentage
      },
      carbs: {
        grams: defaultCarbGrams,
        calories: defaultCarbGrams * 4,
        percentage: defaultCarbPercentage,
        fiber: {
          minimum: Math.round(11 * (metabolicMetrics.adjustedCalories / 1000)),
          optimal: Math.round(14 * (metabolicMetrics.adjustedCalories / 1000))
        }
      },
      fats: {
        grams: defaultFatGrams,
        calories: defaultFatGrams * 9,
        percentage: defaultFatPercentage,
        essentialFats: {
          omega3: Math.round(profile.weight * 0.02),
          omega6: Math.round(profile.weight * 0.08),
          ratioRecommendation: "Viser un ratio oméga-6:oméga-3 de 4:1 ou moins"
        }
      }
    };
  }
}

/**
 * Génère un plan nutritionnel quotidien (jour d'entraînement ou de repos)
 */
async function generateDailyPlan(
  userId: string,
  profile: UserNutritionProfile,
  macroDistribution: MacronutrientDistribution,
  dayType: 'entraînement' | 'repos' | 'entraînement_intense'
): Promise<NutritionPlanDay> {
  try {
    // Calculer l'ajustement de calories en fonction du type de journée
    let adjustedCalories = profile.calculatedCalories || 2000;
    if (dayType === 'entraînement') {
      adjustedCalories = Math.round(adjustedCalories * 1.1); // +10% pour les jours d'entraînement
    } else if (dayType === 'entraînement_intense') {
      adjustedCalories = Math.round(adjustedCalories * 1.2); // +20% pour les jours d'entraînement intense
    } else if (dayType === 'repos') {
      adjustedCalories = Math.round(adjustedCalories * 0.95); // -5% pour les jours de repos
    }
    
    // Note explicative sur l'ajustement calorique
    let calorieNote = '';
    if (profile.goal === 'perte_de_poids') {
      calorieNote = "Déficit calorique léger pour favoriser la perte de graisse tout en préservant la masse musculaire.";
    } else if (profile.goal === 'prise_de_masse') {
      calorieNote = "Surplus calorique modéré pour favoriser la construction musculaire.";
    } else {
      calorieNote = "Apport calorique équilibré pour maintenir le poids et favoriser la performance.";
    }
    
    // Initialiser le plan quotidien
    const dailyPlan: NutritionPlanDay = {
      dayType: dayType as any,
      calorieTarget: adjustedCalories,
      macroTargets: macroDistribution,
      meals: [],
      hydrationPlan: generateHydrationPlan(profile, dayType),
      notes: `${calorieNote} Ce plan est optimisé pour une journée de ${dayType}.`
    };
    
    // Génération standard directement sans tenter l'approche IA
    console.log("Génération d'un plan standard pour un jour de", dayType);
    
    // Déterminer le nombre de repas par jour
    const mealsPerDay = profile.mealsPerDay || 3;
    
    // Distribution des calories par repas
    const mealDistribution = getMealDistribution(mealsPerDay, dayType);
    
    // Générer chaque repas
    for (let i = 0; i < mealsPerDay; i++) {
      const mealInfo = getMealInfo(i, mealsPerDay, dayType);
      const mealCalories = Math.round(adjustedCalories * mealDistribution[i]);
      
      // Distribution des macros pour ce repas (peut varier selon le type de repas)
      const mealMacroDistribution = adjustMealMacros(macroDistribution, mealInfo.type, dayType);
      
      // Calculer les grammes de macronutriments pour ce repas
      const mealProtein = Math.round((mealCalories * mealMacroDistribution.protein.percentage / 100) / 4);
      const mealCarbs = Math.round((mealCalories * mealMacroDistribution.carbs.percentage / 100) / 4);
      const mealFat = Math.round((mealCalories * mealMacroDistribution.fats.percentage / 100) / 9);
      
      // Générer les aliments recommandés pour ce repas
      const recommendedFoods = generateMealFoods(profile, mealInfo.type, mealProtein, mealCarbs, mealFat);
      
      // Calculer les portions pour chaque aliment
      const portions: Record<string, string> = {};
      recommendedFoods.forEach(food => {
        portions[food.name] = calculateFoodPortion(food, mealInfo.type, mealProtein, mealCarbs, mealFat);
      });
      
      // Ajouter le repas au plan quotidien
      dailyPlan.meals.push({
        meal: {
          name: mealInfo.name,
          time: mealInfo.time,
          caloriePercentage: Math.round(mealDistribution[i] * 100),
          macroDistribution: {
            proteinPercentage: mealMacroDistribution.protein.percentage,
            carbPercentage: mealMacroDistribution.carbs.percentage,
            fatPercentage: mealMacroDistribution.fats.percentage
          },
          purpose: mealInfo.purpose,
          notes: mealInfo.notes,
          preworkout: mealInfo.type === 'pre-workout',
          postworkout: mealInfo.type === 'post-workout'
        },
        recommendedFoods,
        portions,
        calorieTotal: mealCalories,
        macroTotals: {
          protein: mealProtein,
          carbs: mealCarbs,
          fat: mealFat
        },
        notes: mealInfo.notes
      });
    }
    
    return dailyPlan;
  } catch (error) {
    console.error(`Erreur lors de la génération du plan pour un jour de ${dayType}:`, error);
    
    // Retourner un plan de base en cas d'erreur
    return {
      dayType: dayType as any,
      calorieTarget: 0,
      macroTargets: macroDistribution,
      meals: [],
      hydrationPlan: "Boire environ 2-3 litres d'eau par jour",
      notes: "Plan par défaut généré suite à une erreur"
    };
  }
}

/**
 * Génère un plan d'hydratation personnalisé
 */
function generateHydrationPlan(profile: UserNutritionProfile, dayType: string): string {
  const baseIntake = (profile.weight * 0.033).toFixed(1);
  
  if (dayType === 'entraînement' || dayType === 'entraînement_intense') {
    return `Boire environ ${baseIntake}-${(parseFloat(baseIntake) + 0.5).toFixed(1)} litres d'eau par jour. Augmenter de 500ml avant, pendant et après l'entraînement. Considérer une boisson électrolytique pour les entraînements de plus d'une heure.`;
  } else {
    return `Boire environ ${baseIntake} litres d'eau par jour, répartis tout au long de la journée. Privilégier un grand verre d'eau au réveil pour réhydrater l'organisme.`;
  }
}

/**
 * Distribution des calories entre les repas de la journée
 */
function getMealDistribution(mealsPerDay: number, dayType: string): number[] {
  // Distribution par défaut pour 3 repas: petit-déjeuner 25%, déjeuner 40%, dîner 35%
  if (mealsPerDay === 3) {
    return [0.25, 0.40, 0.35];
  }
  // Distribution pour 4 repas: petit-déjeuner 20%, déjeuner 30%, collation 15%, dîner 35%
  else if (mealsPerDay === 4) {
    return [0.20, 0.30, 0.15, 0.35];
  }
  // Distribution pour 5 repas: petit-déjeuner 20%, collation 10%, déjeuner 30%, collation 10%, dîner 30%
  else if (mealsPerDay === 5) {
    return [0.20, 0.10, 0.30, 0.10, 0.30];
  }
  // Distribution pour 6 repas: répartition plus équilibrée
  else if (mealsPerDay === 6) {
    return [0.15, 0.15, 0.20, 0.15, 0.15, 0.20];
  }
  // Distribution équitable par défaut
  else {
    return Array(mealsPerDay).fill(1 / mealsPerDay);
  }
}

/**
 * Informations sur le repas en fonction de sa position dans la journée
 */
function getMealInfo(index: number, mealsPerDay: number, dayType: string): {
  name: string;
  time: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'pre-workout' | 'post-workout';
  purpose: string;
  notes: string;
} {
  // Petit-déjeuner
  if (index === 0) {
    return {
      name: 'Petit-déjeuner',
      time: '7h00 - 8h00',
      type: 'breakfast',
      purpose: 'Fournir de l\'énergie pour la matinée et lancer le métabolisme',
      notes: 'Privilégiez les protéines et les glucides complexes'
    };
  }
  
  // Dernier repas de la journée (dîner)
  if (index === mealsPerDay - 1) {
    return {
      name: 'Dîner',
      time: '19h00 - 20h00',
      type: 'dinner',
      purpose: 'Récupération musculaire et satiété pour la nuit',
      notes: 'Équilibrez protéines et légumes, modérez les glucides'
    };
  }
  
  // Repas du milieu de journée pour 3+ repas (déjeuner)
  if (mealsPerDay >= 3 && index === Math.floor(mealsPerDay / 2)) {
    return {
      name: 'Déjeuner',
      time: '12h00 - 13h00',
      type: dayType === 'entraînement' ? 'pre-workout' : 'lunch',
      purpose: dayType === 'entraînement' ? 'Fournir de l\'énergie pour l\'entraînement à venir' : 'Apport nutritionnel principal de la journée',
      notes: dayType === 'entraînement' ? 'Privilégiez les glucides complexes et protéines' : 'Repas équilibré avec tous les macronutriments'
    };
  }
  
  // Post-workout pour les jours d'entraînement (si ce n'est pas le déjeuner ou le dîner)
  if (dayType === 'entraînement' && index === Math.floor(mealsPerDay / 2) + 1) {
    return {
      name: 'Repas post-entraînement',
      time: '16h00 - 17h00',
      type: 'post-workout',
      purpose: 'Récupération et reconstruction musculaire',
      notes: 'Riche en protéines et glucides rapides'
    };
  }
  
  // Collations pour les repas restants
  return {
    name: `Collation ${index}`,
    time: index < Math.floor(mealsPerDay / 2) ? '10h00 - 11h00' : '16h00 - 17h00',
    type: 'snack',
    purpose: 'Maintenir l\'énergie entre les repas principaux',
    notes: 'Combinaison de protéines et glucides ou lipides pour la satiété'
  };
}

/**
 * Ajuste la distribution des macronutriments selon le type de repas
 */
function adjustMealMacros(
  baseMacros: MacronutrientDistribution,
  mealType: string,
  dayType: string
): MacronutrientDistribution {
  // Copie de la distribution de base
  const adjustedMacros = { ...baseMacros };
  
  // Ajustements pour les différents types de repas
  switch (mealType) {
    case 'breakfast':
      // Plus de protéines et de lipides, moins de glucides au petit-déjeuner
      adjustedMacros.protein.percentage = Math.min(baseMacros.protein.percentage + 5, 40);
      adjustedMacros.fats.percentage = Math.min(baseMacros.fats.percentage + 5, 40);
      adjustedMacros.carbs.percentage = 100 - adjustedMacros.protein.percentage - adjustedMacros.fats.percentage;
      break;
      
    case 'pre-workout':
      // Plus de glucides avant l'entraînement
      adjustedMacros.carbs.percentage = Math.min(baseMacros.carbs.percentage + 10, 60);
      adjustedMacros.fats.percentage = Math.max(baseMacros.fats.percentage - 5, 15);
      adjustedMacros.protein.percentage = 100 - adjustedMacros.carbs.percentage - adjustedMacros.fats.percentage;
      break;
      
    case 'post-workout':
      // Plus de protéines et de glucides après l'entraînement
      adjustedMacros.protein.percentage = Math.min(baseMacros.protein.percentage + 5, 40);
      adjustedMacros.carbs.percentage = Math.min(baseMacros.carbs.percentage + 5, 55);
      adjustedMacros.fats.percentage = 100 - adjustedMacros.protein.percentage - adjustedMacros.carbs.percentage;
      break;
      
    case 'dinner':
      // Plus de protéines et de lipides, moins de glucides au dîner
      adjustedMacros.protein.percentage = Math.min(baseMacros.protein.percentage + 5, 40);
      adjustedMacros.carbs.percentage = Math.max(baseMacros.carbs.percentage - 10, 20);
      adjustedMacros.fats.percentage = 100 - adjustedMacros.protein.percentage - adjustedMacros.carbs.percentage;
      break;
      
    default:
      // Pas d'ajustement pour les autres types de repas
      break;
  }
  
  // Recalculer les grammes en fonction des pourcentages ajustés
  // Dans une implémentation complète, nous ferions ce calcul en fonction des calories du repas
  
  return adjustedMacros;
}

/**
 * Génère les aliments recommandés pour un repas spécifique
 */
function generateMealFoods(
  profile: UserNutritionProfile,
  mealType: string,
  targetProtein: number,
  targetCarbs: number,
  targetFat: number
): FoodItem[] {
  // Liste des aliments recommandés pour ce repas
  const foods: FoodItem[] = [];
  
  // Sélectionner les aliments en fonction du type de repas
  switch (mealType) {
    case 'breakfast':
      // Aliments pour le petit-déjeuner
      foods.push(
        { name: 'Oeufs', category: 'Protéine', calories: 155, protein: 13, carbs: 1, fat: 11, servingSize: '2 œufs' },
        { name: 'Flocons d\'avoine', category: 'Glucide', calories: 150, protein: 5, carbs: 27, fat: 3, servingSize: '40g' },
        { name: 'Lait d\'amande', category: 'Boisson', calories: 30, protein: 1, carbs: 1, fat: 2, servingSize: '200ml' },
        { name: 'Baies', category: 'Fruit', calories: 70, protein: 1, carbs: 17, fat: 0, servingSize: '100g' },
        { name: 'Beurre d\'amande', category: 'Lipide', calories: 100, protein: 3, carbs: 3, fat: 9, servingSize: '15g' }
      );
      break;
      
    case 'lunch':
    case 'dinner':
      // Aliments pour déjeuner/dîner
      foods.push(
        { name: 'Poulet', category: 'Protéine', calories: 165, protein: 31, carbs: 0, fat: 3.6, servingSize: '100g' },
        { name: 'Riz brun', category: 'Glucide', calories: 112, protein: 2.6, carbs: 23, fat: 0.9, servingSize: '100g cuit' },
        { name: 'Brocoli', category: 'Légume', calories: 55, protein: 3.7, carbs: 11, fat: 0.6, servingSize: '100g' },
        { name: 'Huile d\'olive', category: 'Lipide', calories: 119, protein: 0, carbs: 0, fat: 13.5, servingSize: '1 cuillère à soupe' },
        { name: 'Avocat', category: 'Lipide', calories: 160, protein: 2, carbs: 8, fat: 15, servingSize: '1/2 avocat' }
      );
      break;
      
    case 'pre-workout':
      // Aliments avant l'entraînement
      foods.push(
        { name: 'Patate douce', category: 'Glucide', calories: 86, protein: 1.6, carbs: 20, fat: 0.1, servingSize: '100g' },
        { name: 'Blanc de poulet', category: 'Protéine', calories: 120, protein: 26, carbs: 0, fat: 1, servingSize: '100g' },
        { name: 'Riz blanc', category: 'Glucide', calories: 130, protein: 2.7, carbs: 28, fat: 0.3, servingSize: '100g cuit' },
        { name: 'Épinards', category: 'Légume', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, servingSize: '100g' }
      );
      break;
      
    case 'post-workout':
      // Aliments après l'entraînement
      foods.push(
        { name: 'Whey protéine', category: 'Supplément', calories: 120, protein: 24, carbs: 3, fat: 2, servingSize: '30g' },
        { name: 'Banane', category: 'Fruit', calories: 105, protein: 1.3, carbs: 27, fat: 0.4, servingSize: '1 moyenne' },
        { name: 'Yaourt grec', category: 'Protéine', calories: 100, protein: 10, carbs: 3, fat: 5, servingSize: '100g' }
      );
      break;
      
    case 'snack':
      // Aliments pour collation
      foods.push(
        { name: 'Yaourt grec', category: 'Protéine', calories: 100, protein: 10, carbs: 3, fat: 5, servingSize: '100g' },
        { name: 'Pomme', category: 'Fruit', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, servingSize: '1 moyenne' },
        { name: 'Amandes', category: 'Lipide', calories: 161, protein: 6, carbs: 6, fat: 14, servingSize: '25g' },
        { name: 'Fromage cottage', category: 'Protéine', calories: 98, protein: 11, carbs: 3, fat: 4, servingSize: '100g' }
      );
      break;
  }
  
  return foods;
}

/**
 * Calcule les portions d'aliments en fonction des objectifs de macronutriments
 */
function calculateFoodPortion(
  food: FoodItem,
  mealType: string,
  targetProtein: number,
  targetCarbs: number,
  targetFat: number
): string {
  // Dans une implémentation complète, nous calculerions les portions exactes
  // Pour le prototype, nous retournons la portion standard
  return food.servingSize;
}

/**
 * Génère des recommandations alimentaires personnalisées
 */
async function generateFoodRecommendations(
  userId: string,
  profile: UserNutritionProfile
): Promise<{
  proteins: FoodItem[];
  carbs: FoodItem[];
  fats: FoodItem[];
  vegetables: FoodItem[];
  fruits: FoodItem[];
}> {
  // Génération de recommandations alimentaires basées sur le profil
  
  // Sources de protéines
  const proteins: FoodItem[] = [
    { name: 'Poulet', category: 'Viande', calories: 165, protein: 31, carbs: 0, fat: 3.6, servingSize: '100g' },
    { name: 'Thon', category: 'Poisson', calories: 132, protein: 28, carbs: 0, fat: 1, servingSize: '100g' },
    { name: 'Œufs', category: 'Œuf', calories: 155, protein: 13, carbs: 1, fat: 11, servingSize: '2 œufs' },
    { name: 'Yaourt grec', category: 'Produit laitier', calories: 100, protein: 10, carbs: 3, fat: 5, servingSize: '100g' },
    { name: 'Tofu', category: 'Végétal', calories: 83, protein: 10, carbs: 2, fat: 4, servingSize: '100g' },
    { name: 'Lentilles', category: 'Légumineuse', calories: 116, protein: 9, carbs: 20, fat: 0.4, servingSize: '100g cuites' }
  ];
  
  // Sources de glucides
  const carbs: FoodItem[] = [
    { name: 'Riz brun', category: 'Céréale', calories: 112, protein: 2.6, carbs: 23, fat: 0.9, servingSize: '100g cuit' },
    { name: 'Patate douce', category: 'Féculent', calories: 86, protein: 1.6, carbs: 20, fat: 0.1, servingSize: '100g' },
    { name: 'Flocons d\'avoine', category: 'Céréale', calories: 379, protein: 13, carbs: 67, fat: 7, servingSize: '100g' },
    { name: 'Quinoa', category: 'Céréale', calories: 120, protein: 4, carbs: 21, fat: 2, servingSize: '100g cuit' },
    { name: 'Pain complet', category: 'Pain', calories: 265, protein: 13, carbs: 41, fat: 4, servingSize: '100g' }
  ];
  
  // Sources de lipides
  const fats: FoodItem[] = [
    { name: 'Avocat', category: 'Fruit', calories: 160, protein: 2, carbs: 8, fat: 15, servingSize: '1/2 avocat' },
    { name: 'Huile d\'olive', category: 'Huile', calories: 119, protein: 0, carbs: 0, fat: 13.5, servingSize: '1 cuillère à soupe' },
    { name: 'Amandes', category: 'Fruit à coque', calories: 634, protein: 21, carbs: 21, fat: 55, servingSize: '100g' },
    { name: 'Saumon', category: 'Poisson', calories: 208, protein: 20, carbs: 0, fat: 13, servingSize: '100g' },
    { name: 'Fromage', category: 'Produit laitier', calories: 402, protein: 25, carbs: 1, fat: 33, servingSize: '100g' }
  ];
  
  // Légumes
  const vegetables: FoodItem[] = [
    { name: 'Brocoli', category: 'Légume', calories: 55, protein: 3.7, carbs: 11, fat: 0.6, servingSize: '100g' },
    { name: 'Épinards', category: 'Légume-feuille', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, servingSize: '100g' },
    { name: 'Poivron', category: 'Légume', calories: 20, protein: 1, carbs: 5, fat: 0, servingSize: '100g' },
    { name: 'Concombre', category: 'Légume', calories: 15, protein: 0.7, carbs: 3.6, fat: 0.1, servingSize: '100g' },
    { name: 'Tomate', category: 'Légume', calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, servingSize: '100g' }
  ];
  
  // Fruits
  const fruits: FoodItem[] = [
    { name: 'Banane', category: 'Fruit', calories: 105, protein: 1.3, carbs: 27, fat: 0.4, servingSize: '1 moyenne' },
    { name: 'Pomme', category: 'Fruit', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, servingSize: '1 moyenne' },
    { name: 'Baies', category: 'Fruit', calories: 70, protein: 1, carbs: 17, fat: 0, servingSize: '100g' },
    { name: 'Orange', category: 'Agrume', calories: 62, protein: 1.2, carbs: 15, fat: 0.2, servingSize: '1 moyenne' },
    { name: 'Kiwi', category: 'Fruit', calories: 61, protein: 1.1, carbs: 15, fat: 0.5, servingSize: '1 moyen' }
  ];
  
  return {
    proteins,
    carbs,
    fats,
    vegetables,
    fruits
  };
}

/**
 * Génère un résumé du programme nutritionnel
 */
async function generateProgramSummary(
  userId: string,
  profile: UserNutritionProfile,
  metrics: { bmr: number; tdee: number; adjustedCalories: number },
  macros: MacronutrientDistribution
): Promise<string> {
  try {
    // Instructions pour l'IA
    const systemInstruction = `Tu es un coach nutritionnel expert. Génère un résumé concis et motivant (3-4 phrases) 
      pour un programme nutritionnel personnalisé. Utilise un ton encourageant et professionnel.`;
    
    // Données pour le prompt
    const promptData = {
      profil: {
        age: profile.age,
        genre: profile.gender,
        poids: profile.weight,
        taille: profile.height,
        niveau_activite: profile.activityLevel,
        frequence_entrainement: profile.trainingFrequency,
        type_entrainement: profile.trainingType,
        objectif: getGoalText(profile.goal),
        preferences_alimentaires: profile.dietaryPreferences,
        repas_par_jour: profile.mealsPerDay,
      },
      metriques: {
        metabolisme_basal: metrics.bmr,
        depense_energetique: metrics.tdee,
        calories_ajustees: metrics.adjustedCalories,
      },
      macronutriments: {
        proteines: `${macros.protein.percentage}% (${macros.protein.grams}g)`,
        glucides: `${macros.carbs.percentage}% (${macros.carbs.grams}g)`,
        lipides: `${macros.fats.percentage}% (${macros.fats.grams}g)`,
      }
    };
    
    // Création du prompt
    const prompt = `Génère un résumé motivant pour un programme nutritionnel personnalisé basé sur ces données:
      ${JSON.stringify(promptData, null, 2)}`;
    
    // Appel à l'API OpenAI
    const response = await callOpenAI(prompt, systemInstruction, 0.7, 300);
    
    try {
      // Tenter d'extraire le résumé du JSON
      const jsonResponse = JSON.parse(response || '{}');
      return jsonResponse.resume || jsonResponse.summary || 
        `Programme nutritionnel personnalisé pour ${getGoalText(profile.goal)} avec ${metrics.adjustedCalories} calories et une répartition équilibrée des macronutriments pour optimiser vos résultats.`;
    } catch (parseError) {
      // Si la réponse n'est pas un JSON valide, utiliser la réponse brute
      return response || 
        `Programme nutritionnel personnalisé pour ${getGoalText(profile.goal)} avec ${metrics.adjustedCalories} calories quotidiennes. Distribution des macronutriments: ${macros.protein.percentage}% de protéines, ${macros.carbs.percentage}% de glucides et ${macros.fats.percentage}% de lipides.`;
    }
  } catch (error) {
    console.error("Erreur lors de la génération du résumé:", error);
    // Fallback en cas d'erreur
    return `Programme nutritionnel personnalisé pour ${getGoalText(profile.goal)} avec ${metrics.adjustedCalories} calories quotidiennes. Distribution des macronutriments: ${macros.protein.percentage}% de protéines, ${macros.carbs.percentage}% de glucides et ${macros.fats.percentage}% de lipides.`;
  }
}

/**
 * Génère des recommandations de suppléments personnalisées
 */
async function generateSupplementRecommendations(
  userId: string,
  profile: UserNutritionProfile
): Promise<{
  essential: Array<{name: string, dosage: string, timing: string, purpose: string}>;
  optional: Array<{name: string, dosage: string, timing: string, purpose: string}>;
}> {
  try {
    // Instructions pour l'IA
    const systemInstruction = `Tu es un expert en nutrition sportive. Génère des recommandations de suppléments 
      personnalisées pour le profil d'utilisateur fourni. Divise tes recommandations en deux catégories: 
      les suppléments essentiels et les suppléments optionnels. Pour chaque supplément, indique le nom, 
      le dosage recommandé, le moment de prise optimal et son objectif. Fournis ta réponse sous forme 
      d'objet JSON avec le format suivant:
      {
        "essential": [
          {"name": "Nom du supplément", "dosage": "Dosage recommandé", "timing": "Moment de prise", "purpose": "Objectif"}
        ],
        "optional": [
          {"name": "Nom du supplément", "dosage": "Dosage recommandé", "timing": "Moment de prise", "purpose": "Objectif"}
        ]
      }`;
    
    // Données pour le prompt
    const promptData = {
      profil: {
        age: profile.age,
        genre: profile.gender,
        poids: profile.weight,
        taille: profile.height,
        niveau_activite: profile.activityLevel,
        frequence_entrainement: profile.trainingFrequency,
        type_entrainement: profile.trainingType,
        objectif: getGoalText(profile.goal),
        preferences_alimentaires: profile.dietaryPreferences,
        allergies: profile.allergies,
        conditions_medicales: profile.medicalConditions
      }
    };
    
    // Création du prompt
    const prompt = `Génère des recommandations de suppléments personnalisées pour ce profil:
      ${JSON.stringify(promptData, null, 2)}
      
      Concentre-toi sur les suppléments les plus scientifiquement validés et pertinents pour l'objectif de l'utilisateur.
      Limite-toi à 3-4 suppléments essentiels et 2-3 suppléments optionnels au maximum.
      Recommande uniquement des suppléments sûrs et dont l'efficacité est soutenue par la recherche.
      Prends en compte les conditions médicales et allergies dans tes recommandations.`;
    
    // Appel à l'API OpenAI
    const response = await callOpenAI(prompt, systemInstruction, 0.7, 600);
    
    try {
      // Tenter d'extraire les recommandations du JSON
      const jsonResponse = JSON.parse(response || '{}');
      if (Array.isArray(jsonResponse.essential) && Array.isArray(jsonResponse.optional)) {
        // Assurons-nous que chaque élément a les propriétés requises
        const validateSupplements = (supplements: any[]) => {
          return supplements.filter(s => 
            s && typeof s === 'object' && 
            s.name && s.dosage && s.timing && s.purpose
          );
        };
        
        return {
          essential: validateSupplements(jsonResponse.essential),
          optional: validateSupplements(jsonResponse.optional)
        };
      }
    } catch (parseError) {
      console.error("Erreur lors du parsing de la réponse:", parseError);
    }
    
    // Recommandations par défaut en cas d'erreur ou de réponse incorrecte
    return {
      essential: [
        {
          name: "Protéine en poudre (Whey)",
          dosage: "20-30g par portion",
          timing: "Après l'entraînement ou comme collation",
          purpose: "Récupération musculaire et apport en protéines de haute qualité"
        },
        {
          name: "Créatine monohydrate",
          dosage: "3-5g par jour",
          timing: "À tout moment de la journée, quotidiennement",
          purpose: "Amélioration de la force, puissance et récupération musculaire"
        },
      ],
      optional: [
        {
          name: "Vitamine D",
          dosage: "1000-2000 UI par jour",
          timing: "Avec un repas contenant des graisses",
          purpose: "Santé osseuse, fonction immunitaire et hormonale"
        },
        {
          name: "Oméga-3 (EPA/DHA)",
          dosage: "1-3g par jour",
          timing: "Avec les repas",
          purpose: "Réduction de l'inflammation et santé cardiovasculaire"
        }
      ]
    };
  } catch (error) {
    console.error("Erreur lors de la génération des recommandations de suppléments:", error);
    
    // Recommandations par défaut en cas d'erreur
    return {
      essential: [
        {
          name: "Protéine en poudre (Whey)",
          dosage: "20-30g par portion",
          timing: "Après l'entraînement ou comme collation",
          purpose: "Récupération musculaire et apport en protéines de haute qualité"
        }
      ],
      optional: [
        {
          name: "Multivitamines",
          dosage: "1 comprimé par jour",
          timing: "Avec un repas",
          purpose: "Combler les lacunes nutritionnelles potentielles"
        }
      ]
    };
  }
}

/**
 * Génère des stratégies nutritionnelles personnalisées
 */
async function generateNutritionStrategies(
  userId: string,
  profile: UserNutritionProfile
): Promise<string[]> {
  try {
    // Instructions pour l'IA
    const systemInstruction = `Tu es un coach nutritionnel expert. Génère 5 stratégies nutritionnelles pratiques 
      et personnalisées pour aider l'utilisateur à atteindre son objectif. Chaque stratégie doit être concise 
      (1-2 phrases) et directement applicable. Fournis tes réponses sous forme de liste dans un objet JSON avec 
      une propriété "strategies" contenant un tableau de strings.`;
    
    // Données pour le prompt
    const promptData = {
      profil: {
        age: profile.age,
        genre: profile.gender,
        poids: profile.weight,
        taille: profile.height,
        niveau_activite: profile.activityLevel,
        frequence_entrainement: profile.trainingFrequency,
        type_entrainement: profile.trainingType,
        objectif: getGoalText(profile.goal),
        preferences_alimentaires: profile.dietaryPreferences,
        repas_par_jour: profile.mealsPerDay,
        aliments_exclus: profile.excludedFoods,
        conditions_medicales: profile.medicalConditions,
        allergies: profile.allergies
      }
    };
    
    // Création du prompt
    const prompt = `Génère 5 stratégies nutritionnelles personnalisées et pratiques pour ce profil:
      ${JSON.stringify(promptData, null, 2)}`;
    
    // Appel à l'API OpenAI
    const response = await callOpenAI(prompt, systemInstruction, 0.7, 500);
    
    try {
      // Tenter d'extraire les stratégies du JSON
      const jsonResponse = JSON.parse(response || '{}');
      if (Array.isArray(jsonResponse.strategies) && jsonResponse.strategies.length > 0) {
        return jsonResponse.strategies;
      }
    } catch (parseError) {
      console.error("Erreur lors du parsing de la réponse:", parseError);
    }
    
    // Stratégies par défaut en cas d'erreur ou de réponse incorrecte
    return [
      "Priorisez les aliments complets et non transformés pour maximiser l'apport en nutriments.",
      "Planifiez vos repas à l'avance pour éviter les choix alimentaires impulsifs ou non optimaux.",
      "Hydratez-vous adéquatement tout au long de la journée, en particulier avant les repas.",
      "Adaptez votre consommation de glucides en fonction de votre niveau d'activité quotidien.",
      "Assurez-vous d'avoir une source de protéines de qualité à chaque repas principal."
    ];
  } catch (error) {
    console.error("Erreur lors de la génération des stratégies nutritionnelles:", error);
    
    // Stratégies par défaut en cas d'erreur
    return [
      "Priorisez les aliments complets et non transformés pour maximiser l'apport en nutriments.",
      "Planifiez vos repas à l'avance pour éviter les choix alimentaires impulsifs ou non optimaux.",
      "Hydratez-vous adéquatement tout au long de la journée, en particulier avant les repas.",
      "Adaptez votre consommation de glucides en fonction de votre niveau d'activité quotidien.",
      "Assurez-vous d'avoir une source de protéines de qualité à chaque repas principal."
    ];
  }
}

/**
 * Génère des stratégies d'ajustement du plan nutritionnel
 */
function generateAdjustmentStrategies(profile: UserNutritionProfile) {
  // Stratégies d'ajustement basées sur l'objectif
  return [];
}

/**
 * Génère des références scientifiques pour appuyer les recommandations
 */
async function generateScientificReferences(
  userId: string,
  profile: UserNutritionProfile
) {
  // Dans l'implémentation réelle, nous ferions appel à OpenAI
  // Pour le prototype, nous retournons des références génériques
  
  return [];
}

/**
 * Génère des notes générales pour le programme nutritionnel
 */
async function generateGeneralNotes(
  userId: string,
  profile: UserNutritionProfile
) {
  // Dans l'implémentation réelle, nous ferions appel à OpenAI
  // Pour le prototype, nous retournons des notes génériques
  
  return [];
}

/**
 * Génère des conseils d'expert pour le programme nutritionnel
 */
async function generateExpertTips(
  userId: string,
  profile: UserNutritionProfile
): Promise<string[]> {
  try {
    // Instructions pour l'IA
    const systemInstruction = `Tu es un coach nutritionnel expert. Génère 5 conseils d'expert pratiques et basés 
      sur la science pour aider l'utilisateur à maximiser les résultats de son programme nutritionnel. Chaque conseil 
      doit être spécifique, actionnable et concis (1-2 phrases maximum). Fournis tes réponses sous forme de liste 
      dans un objet JSON avec une propriété "tips" contenant un tableau de strings.`;
    
    // Données pour le prompt
    const promptData = {
      profil: {
        age: profile.age,
        genre: profile.gender,
        poids: profile.weight,
        taille: profile.height,
        niveau_activite: profile.activityLevel,
        frequence_entrainement: profile.trainingFrequency,
        type_entrainement: profile.trainingType,
        objectif: getGoalText(profile.goal),
        preferences_alimentaires: profile.dietaryPreferences,
        repas_par_jour: profile.mealsPerDay,
        niveau_stress: profile.stressLevel,
        heures_sommeil: profile.sleepHours
      }
    };
    
    // Création du prompt
    const prompt = `Génère 5 conseils d'expert nutritionnel spécifiques et pratiques pour ce profil:
      ${JSON.stringify(promptData, null, 2)}`;
    
    // Appel à l'API OpenAI
    const response = await callOpenAI(prompt, systemInstruction, 0.7, 500);
    
    try {
      // Tenter d'extraire les conseils du JSON
      const jsonResponse = JSON.parse(response || '{}');
      if (Array.isArray(jsonResponse.tips) && jsonResponse.tips.length > 0) {
        return jsonResponse.tips;
      }
    } catch (parseError) {
      console.error("Erreur lors du parsing de la réponse:", parseError);
    }
    
    // Conseils par défaut en cas d'erreur ou de réponse incorrecte
    return [
      "Consommez vos protéines en premier lors des repas pour favoriser la satiété et stabiliser la glycémie.",
      "Privilégiez les aliments riches en fibres pour améliorer la digestion et prolonger la sensation de satiété.",
      "Ajoutez des épices et des herbes pour rehausser la saveur des plats sans ajouter de calories.",
      "Optez pour des sources de glucides à index glycémique bas avant l'entraînement pour une énergie soutenue.",
      "Incluez des aliments fermentés régulièrement pour améliorer votre santé intestinale et votre immunité."
    ];
  } catch (error) {
    console.error("Erreur lors de la génération des conseils d'expert:", error);
    
    // Conseils par défaut en cas d'erreur
    return [
      "Consommez vos protéines en premier lors des repas pour favoriser la satiété et stabiliser la glycémie.",
      "Privilégiez les aliments riches en fibres pour améliorer la digestion et prolonger la sensation de satiété.",
      "Ajoutez des épices et des herbes pour rehausser la saveur des plats sans ajouter de calories.",
      "Optez pour des sources de glucides à index glycémique bas avant l'entraînement pour une énergie soutenue.",
      "Incluez des aliments fermentés régulièrement pour améliorer votre santé intestinale et votre immunité."
    ];
  }
}

/**
 * Calcule la recommandation d'eau quotidienne
 */
function calculateWaterIntake(profile: UserNutritionProfile): number {
  // Base: 0,03L par kg de poids corporel
  let baseIntake = profile.weight * 0.03;
  
  // Ajuster selon le niveau d'activité
  if (profile.activityLevel === 'très_actif' || profile.activityLevel === 'extrêmement_actif') {
    baseIntake += 0.5; // +0,5L
  } else if (profile.activityLevel === 'modérément_actif') {
    baseIntake += 0.25; // +0,25L
  }
  
  // Arrondir à 1 décimale
  return Math.round(baseIntake * 10) / 10;
}

/**
 * Obtient le texte descriptif de l'objectif
 */
function getGoalText(goal: string): string {
  switch (goal) {
    case 'perte_de_poids':
      return 'perte de poids';
    case 'prise_de_masse':
      return 'prise de masse musculaire';
    case 'performance':
      return 'optimisation de la performance';
    case 'santé':
      return 'amélioration de la santé';
    case 'maintien':
      return 'maintien du poids';
    default:
      return goal;
  }
}

/**
 * Appel à l'API OpenAI avec timeout
 */
async function callOpenAI(
  prompt: string,
  systemInstruction: string,
  temperature = 0.3,
  maxTokens = 1500
) {
  try {
    // Créer un contrôleur d'abandon pour gérer le timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20 secondes max
    
    const completion = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        { role: "system", content: systemInstruction },
        { role: "user", content: prompt }
      ],
      temperature,
      max_tokens: maxTokens,
      response_format: { type: "json_object" },
      signal: controller.signal as any
    });
    
    clearTimeout(timeoutId);
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Erreur lors de l'appel à OpenAI:", error);
    if (error.name === 'AbortError') {
      throw new Error("La requête a pris trop de temps. Veuillez réessayer plus tard.");
    }
    throw error;
  }
} 