export interface UserProfile {
  userId: string;
  age?: number;
  gender?: 'homme' | 'femme' | 'autre';
  height?: number; // en cm
  weight?: number; // en kg
  activityLevel?: 'sédentaire' | 'légèrement actif' | 'modérément actif' | 'très actif' | 'extrêmement actif';
  fitnessGoals?: string[];
  dietaryPreferences?: string[];
  medicalConditions?: string[];
  fitnessLevel?: 'débutant' | 'intermédiaire' | 'avancé';
  workoutFrequency?: number; // jours par semaine
  workoutDuration?: number; // minutes par séance
  createdAt: string;
  updatedAt: string;
}

export type MessageRole = 'system' | 'user' | 'assistant';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  userId: string;
  title: string;
  messages: Message[];
  tokenCost: number;
  createdAt: string;
  updatedAt: string;
}

export type WorkoutType = 'force' | 'hypertrophie' | 'endurance' | 'fonctionnel' | 'cardio' | 'récupération';

export interface Exercise {
  name: string;
  sets?: number;
  reps?: string;
  duration?: string;
  restTime?: string;
  notes?: string;
  muscleGroups: string[];
}

export interface WorkoutDay {
  day: number;
  name: string;
  exercises: Exercise[];
  notes?: string;
}

export interface WorkoutPlan {
  id: string;
  userId: string;
  title: string;
  description: string;
  type: WorkoutType;
  duration: number; // en semaines
  frequency: number; // jours par semaine
  days?: WorkoutDay[]; // Optionnel car on utilise maintenant uniquement le format markdown
  createdAt: string;
  updatedAt: string;
  tokenCost: number;
}

export interface NutritionPlan {
  id: string;
  userId: string;
  title: string;
  description: string;
  calorieTarget: number;
  macros: {
    protein: number; // en grammes
    carbs: number; // en grammes
    fat: number; // en grammes
  };
  mealPlans: {
    day: number;
    meals: {
      name: string;
      description: string;
      foods: string[];
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
    }[];
  }[];
  notes: string;
  createdAt: string;
  updatedAt: string;
  tokenCost: number;
}

export type ArticleCategory = 
  | 'Musculation' 
  | 'Nutrition' 
  | 'Perte de poids' 
  | 'Prise de masse' 
  | 'Suppléments' 
  | 'Cardio' 
  | 'Récupération' 
  | 'Étirements' 
  | 'Entraînement fonctionnel' 
  | 'Bien-être mental';

export interface FitnessArticle {
  id: string;
  userId: string;
  title: string;
  summary: string;
  content: string;
  category: ArticleCategory;
  wordCount: number;
  readingTime: number; // en minutes
  createdAt: string;
  updatedAt: string;
  tokenCost: number;
} 