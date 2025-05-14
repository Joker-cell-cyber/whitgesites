'use server';

import { generateUUID } from './utils';
import { UserProfile, Message, WorkoutPlan, NutritionPlan, FitnessArticle, ArticleCategory } from './types/coach';
import { recordGeneration as recordGenerationStats } from './stats-service';
import { TOKEN_COST_CHAT_MESSAGE } from './constants';
import OpenAI from 'openai';
import type { WorkoutDay, Exercise, WorkoutType } from './types/coach';

// Catégories d'articles de fitness
const ARTICLE_CATEGORIES = [
  "Musculation",
  "Cardio",
  "Perte de poids",
  "Prise de masse",
  "Nutrition sportive",
  "Récupération",
  "Suppléments",
  "Entraînement fonctionnel"
];

// Initialiser le client OpenAI avec la clé API
const openai = new OpenAI({
  apiKey: "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",
});

// Modèle à utiliser - GPT-4o mini au lieu de GPT-4o pour réduire les coûts
const MODEL = "gpt-4o-mini";

// Prompts système pour différents contextes
const COACH_SYSTEM_PROMPT = `Tu es un coach de fitness et nutrition professionnel nommé NeuraCoach, spécialisé dans l'aide aux personnes souhaitant améliorer leur condition physique, leur alimentation et leur santé globale. 

Basez vos conseils sur les meilleures pratiques scientifiques et ajustez-les en fonction des informations que l'utilisateur vous a fournies sur son profil (âge, sexe, poids, objectifs, etc.).

Soyez positif, motivant mais réaliste. Ne donnez jamais de conseils qui pourraient être dangereux pour la santé.

Concernant la musculation:
- Adaptez les exercices au niveau de l'utilisateur (débutant, intermédiaire, avancé)
- Mettez l'accent sur la bonne forme plutôt que sur les poids lourds
- Suggérez des progressions adaptées
- Soyez conscient des limites et contre-indications médicales

Concernant la nutrition:
- Donnez des conseils personnalisés basés sur les objectifs (perte de poids, prise de masse, performance)
- Respectez les préférences alimentaires et restrictions mentionnées
- Expliquez le rôle des macronutriments
- Proposez des alternatives pour les allergies/intolérances

Vos réponses doivent être:
- Personnalisées
- Précises mais accessibles
- Structurées et faciles à suivre
- Réalistes et applicables au quotidien

Limitez-vous aux conseils de fitness et nutrition. Précisez que vous n'êtes pas un médecin quand les questions sortent de votre domaine d'expertise.`;

/**
 * Génère un message de bienvenue pour le coach IA
 */
export async function generateWelcomeMessage(): Promise<Message> {
  // Simuler un délai d'API
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    id: generateUUID(),
    role: 'assistant',
    content: `# Bienvenue sur votre coach fitness et nutrition personnel 👋

Je suis votre coach IA spécialisé en fitness et nutrition. Je peux vous aider avec:

- Des programmes d'entraînement personnalisés
- Des conseils nutritionnels basés sur la science
- Des recommandations adaptées à votre profil et vos objectifs
- Des explications sur les techniques d'exercices
- Des conseils pour optimiser votre récupération

**Que puis-je faire pour vous aujourd'hui?**`,
    timestamp: new Date().toISOString()
  };
}

/**
 * Crée une nouvelle conversation avec le coach IA
 */
export async function createConversation(userId: string): Promise<string> {
  // Simuler un délai d'API
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Retourner un ID de conversation
  return generateUUID();
}

/**
 * Envoie un message au coach IA et retourne sa réponse
 */
export async function sendMessageToCoach(
  message: string,
  conversationId?: string,
  userProfile?: UserProfile
): Promise<Message> {
  // Simuler un délai d'API
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // En pratique, ce serait un appel à une API externe
  const response: Message = {
    id: generateUUID(),
    role: 'assistant',
    content: `Merci pour votre message. Voici une réponse personnalisée basée sur votre profil.

Basé sur votre niveau de fitness ${userProfile?.fitnessLevel || 'intermédiaire'} et vos objectifs ${userProfile?.fitnessGoals?.join(', ') || 'de remise en forme'}, je recommande de...

Une étude publiée dans le Journal of Strength and Conditioning Research (2019) montre que...

N'hésitez pas à me poser des questions plus spécifiques sur votre entraînement ou votre alimentation!`,
    timestamp: new Date().toISOString()
  };
  
  return response;
}

/**
 * Génère un programme d'entraînement personnalisé en utilisant l'IA
 */
export async function generateWorkoutPlan(
  userId: string,
  type: string,
  duration: number,
  frequency: number,
  focusAreas: string[],
  fitnessLevel: string,
  limitations: string[],
  userProfile?: any
): Promise<WorkoutPlan> {
  try {
    const tokenCost = 10; // Coût augmenté pour la génération d'un programme IA avancé
    
    // Enregistrer la génération dans les statistiques si possible
    try {
      await recordGenerationStats(userId, tokenCost, 'WORKOUT_PLAN', 'Génération programme entraînement');
    } catch (error) {
      console.log('Erreur enregistrement stats, continuons quand même...');
    }
    
    // Construire un prompt détaillé pour l'IA
    const systemPrompt = `Tu es NeuraCoach, un coach de fitness professionnel avec une expertise en préparation physique de haut niveau, sciences du sport et anatomie fonctionnelle.

Tu dois créer un programme d'entraînement personnalisé détaillé, fondé sur des principes scientifiques et l'anatomie humaine. 

Voici quelques principes clés à utiliser:
- Spécificité: Le programme doit cibler précisément les objectifs de l'utilisateur
- Surcharge progressive: Prévoir une progression adaptée au niveau et aux capacités
- Périodisation: Structurer le programme pour éviter les plateaux et optimiser les gains
- Récupération: Inclure des temps de repos adaptés entre les séances pour les groupes musculaires
- Technique correcte: Décrire précisément l'exécution des mouvements avec points d'attention
- Adaptation physiologique: Considérer les facteurs biologiques individuels

Ta réponse doit être complète, détaillée et structurée. Au lieu de donner des conseils génériques, fonde ton programme sur les données scientifiques les plus récentes en musculation et physiologie de l'exercice.`;

    const userPrompt = `Je souhaite un programme d'entraînement parfaitement adapté à mon profil. Voici mes informations:

Type d'entraînement souhaité: ${type}
Durée du programme: ${duration} semaines
Fréquence: ${frequency} séances par semaine
Niveau: ${fitnessLevel}
Groupes musculaires à cibler: ${focusAreas.join(', ')}
Limitations/contraintes: ${limitations.length > 0 ? limitations.join(', ') : 'Aucune'}

INFORMATIONS PERSONNELLES DÉTAILLÉES:
${userProfile ? `
- Âge: ${userProfile.age || 'Non spécifié'}
- Genre: ${userProfile.gender || 'Non spécifié'}
- Poids: ${userProfile.weight || 'Non spécifié'} kg
- Taille: ${userProfile.height || 'Non spécifié'} cm
- Morphotype: ${userProfile.bodyType || 'Non spécifié'}
- Expérience en musculation: ${userProfile.trainingExperience || 'Non spécifié'}
- Historique de blessures: ${userProfile.injuryHistory?.length > 0 ? userProfile.injuryHistory.join(', ') : 'Aucune'}
- Performances actuelles:
  * Squat: ${userProfile.strengthLevels?.squat || 0} kg
  * Développé couché: ${userProfile.strengthLevels?.bench || 0} kg
  * Soulevé de terre: ${userProfile.strengthLevels?.deadlift || 0} kg
  * Développé épaules: ${userProfile.strengthLevels?.overhead_press || 0} kg
  * Tractions: ${userProfile.strengthLevels?.pullups || 0}
- Accès à l'équipement: ${userProfile.equipmentAccess?.length > 0 ? userProfile.equipmentAccess.join(', ') : 'Non spécifié'}
- Préférences d'entraînement: ${userProfile.trainingPreferences?.length > 0 ? userProfile.trainingPreferences.join(', ') : 'Non spécifié'}
- Objectifs spécifiques: ${userProfile.specificGoals || 'Non spécifié'}
- Durée de séance préférée: ${userProfile.sessionDuration || 60} minutes
` : 'Aucune information supplémentaire disponible'}

J'ai besoin d'un programme scientifiquement fondé et détaillé qui inclut:
1. Un titre pour mon programme
2. Une description générale expliquant la structure et les principes scientifiques utilisés
3. Les jours d'entraînement avec noms spécifiques (ex: "Jour 1: Push - Haut du corps")
4. Pour chaque jour, une liste complète d'exercices avec:
   - Nom de l'exercice
   - Nombre de séries
   - Fourchettes de répétitions ou durée
   - Temps de repos entre les séries
   - Notes techniques pour l'exécution correcte
   - Groupes musculaires ciblés
5. Des variations d'exercices si je dois m'adapter à des contraintes matérielles
6. Des conseils d'échauffement et de récupération
7. Un plan de progression sur la durée du programme (${duration} semaines)

FORMAT DE RÉPONSE:
- Structurer clairement avec des sections et sous-sections
- Pour chaque exercice, utiliser ce format:
  * NOM DE L'EXERCICE (muscles ciblés)
  * Séries: X | Répétitions: Y-Z | Repos: A secondes
  * Notes techniques: [explications détaillées sur l'exécution correcte]`;

    // Appel à l'API OpenAI pour générer le programme
    const aiResponse = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 3500
    });
    
    // Extraire la réponse générée
    const generatedContent = aiResponse.choices[0].message.content || '';
    
    // Parsing du programme généré par l'IA
    const workoutDays = parseWorkoutDaysFromAI(generatedContent, frequency);
    
    // Créer le titre du programme
    const titleMatch = generatedContent.match(/^#\s*(.*?)(?:\n|$)/m);
    const title = titleMatch ? titleMatch[1].trim() : `Programme ${type} de ${duration} semaines`;
    
    // Créer et retourner le plan d'entraînement
    const workoutPlan: WorkoutPlan = {
      id: generateUUID(),
      userId,
      title,
      description: generatedContent,
      type: type as any,
      duration,
      frequency,
      days: [], // On ne garde plus les jours structurés
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tokenCost
    };
    
    return workoutPlan;
    
  } catch (error) {
    console.error('Erreur lors de la génération du programme d\'entraînement:', error);
    throw new Error("Une erreur s'est produite lors de la génération de votre programme d'entraînement.");
  }
}

/**
 * Analyse le contenu généré par l'IA pour en extraire les jours d'entraînement structurés
 */
function parseWorkoutDaysFromAI(content: string, frequency: number): WorkoutDay[] {
  const workoutDays: WorkoutDay[] = [];
  
  // Recherche des sections de jours d'entraînement dans le contenu
  const dayRegex = /(?:jour|day)\s*(\d+)\s*(?::|-)?\s*(.*?)(?:\n|$)/gi;
  let dayMatch;
  
  // Utiliser un ensemble pour suivre les jours déjà traités
  const processedDays = new Set<number>();
  
  while ((dayMatch = dayRegex.exec(content)) !== null) {
    const dayNumber = parseInt(dayMatch[1]);
    
    // Éviter les doublons
    if (processedDays.has(dayNumber)) continue;
    processedDays.add(dayNumber);
    
    // S'assurer que le nombre de jours est cohérent avec la fréquence
    if (dayNumber > frequency) continue;
    
    const dayName = dayMatch[2].trim();
    
    // Trouver les exercices associés à ce jour
    const exercises: Exercise[] = extractExercisesForDay(content, dayNumber, dayMatch[0]);
    
    // Ajouter ce jour au programme
    workoutDays.push({
      day: dayNumber,
      name: dayName || `Jour ${dayNumber}`,
      exercises: exercises.length > 0 ? exercises : generateDefaultExercises(dayNumber),
      notes: extractNotesForDay(content, dayNumber, dayMatch[0])
    });
  }
  
  // Si aucun jour n'a été trouvé ou pas assez, générer des jours par défaut
  if (workoutDays.length < frequency) {
    for (let i = 1; i <= frequency; i++) {
      if (!processedDays.has(i)) {
        workoutDays.push({
          day: i,
          name: `Jour ${i}`,
          exercises: generateDefaultExercises(i),
          notes: "Échauffement nécessaire avant de commencer."
        });
      }
    }
  }
  
  // Trier les jours par numéro
  return workoutDays.sort((a, b) => a.day - b.day);
}

/**
 * Extrait les exercices pour un jour spécifique à partir du contenu généré par l'IA
 */
function extractExercisesForDay(content: string, dayNumber: number, dayHeader: string): Exercise[] {
  const exercises: Exercise[] = [];
  
  // Trouver la section correspondant au jour spécifique
  const dayContent = extractDayContent(content, dayHeader);
  if (!dayContent) return exercises;
  
  // Chercher des patterns d'exercices dans le contenu du jour
  const exerciseRegex = /(?:[\d\.]+\s+)?(?:\*\s+)?([A-Za-zÀ-ÿ\s\(\)\-–]+?)(?:\s+\(([^)]+)\))?[\s:]*(?:\n|$)(?:\s*[•*-]\s*(?:Séries|Series)?\s*:?\s*(\d+)[\s|x]*(?:Répétitions|Reps)?\s*:?\s*([\/\d-–+\s]+))?(?:\s*[•*-]\s*(?:Repos|Rest)?\s*:?\s*(\d+)[–\-\s]*(\d*))?/gim;
  
  let exerciseMatch;
  let position = 0;
  
  while ((exerciseMatch = exerciseRegex.exec(dayContent)) !== null) {
    const exerciseName = exerciseMatch[1].trim();
    
    // Ignorer les lignes qui ne sont probablement pas des exercices
    if (
      exerciseName.toLowerCase().includes('échauffement') ||
      exerciseName.toLowerCase().includes('warm') ||
      exerciseName.toLowerCase().includes('cool') ||
      exerciseName.toLowerCase().includes('étirement') ||
      exerciseName.toLowerCase().includes('stretch') ||
      exerciseName.toLowerCase().includes('note') ||
      exerciseName.toLowerCase().includes('jour') ||
      exerciseName.toLowerCase().includes('day') ||
      exerciseName.length < 3 ||
      /^séance|semaine|week|session$/i.test(exerciseName)
    ) {
      continue;
    }
    
    const muscleGroups = exerciseMatch[2] 
      ? exerciseMatch[2].split(/[,\/&]/).map(m => m.trim()) 
      : inferMuscleGroups(exerciseName);
    
    const sets = exerciseMatch[3] ? parseInt(exerciseMatch[3]) : 3;
    const reps = exerciseMatch[4] ? exerciseMatch[4].trim() : "8-12";
    const restMin = exerciseMatch[5] ? parseInt(exerciseMatch[5]) : 60;
    const restMax = exerciseMatch[6] && exerciseMatch[6].trim() ? parseInt(exerciseMatch[6]) : restMin;
    
    const restTime = restMax > restMin ? `${restMin}-${restMax} sec` : `${restMin} sec`;
    
    // Extraire des notes éventuelles pour cet exercice
    const noteMatch = dayContent.slice(exerciseMatch.index + exerciseMatch[0].length).match(/(?:Notes?|Technique)?\s*:?\s*([^*•\-\n][^\n]+)(?:\n|$)/i);
    const notes = noteMatch ? noteMatch[1].trim() : "Concentrez-vous sur une exécution technique parfaite.";
    
    exercises.push({
      name: exerciseName,
      sets,
      reps,
      restTime,
      notes,
      muscleGroups
    });
    
    position = exerciseMatch.index + exerciseMatch[0].length;
  }
  
  return exercises;
}

/**
 * Extrait le contenu spécifique à un jour d'entraînement
 */
function extractDayContent(content: string, dayHeader: string): string {
  const dayStart = content.indexOf(dayHeader);
  if (dayStart === -1) return '';
  
  // Chercher la prochaine section qui commence par un heading
  const nextSectionRegex = /\n(?:##|jour|day)/i;
  const match = content.slice(dayStart + dayHeader.length).match(nextSectionRegex);
  
  const endPosition = match && match.index !== undefined
    ? dayStart + dayHeader.length + match.index 
    : content.length;
  
  return content.slice(dayStart, endPosition);
}

/**
 * Extrait les notes associées à un jour d'entraînement
 */
function extractNotesForDay(content: string, dayNumber: number, dayHeader: string): string {
  const dayContent = extractDayContent(content, dayHeader);
  
  // Chercher des sections de notes
  const notesRegex = /(?:notes?|conseils?|recommandations?)(?:\s*:|\s*\n)([^#]+?)(?=\n\n|\n#|$)/i;
  const match = dayContent.match(notesRegex);
  
  if (match) {
    return match[1].trim();
  }
  
  return "Échauffez-vous correctement avant chaque séance et restez hydraté pendant l'entraînement.";
}

/**
 * Détermine les groupes musculaires ciblés à partir du nom de l'exercice
 */
function inferMuscleGroups(exerciseName: string): string[] {
  const exerciseLower = exerciseName.toLowerCase();
  
  // Mapping des mots-clés aux groupes musculaires
  const muscleMap: Record<string, string[]> = {
    'squat': ['Quadriceps', 'Fessiers'],
    'presse': ['Quadriceps', 'Fessiers'],
    'leg press': ['Quadriceps', 'Fessiers'],
    'leg extension': ['Quadriceps'],
    'soulevé de terre': ['Dos', 'Fessiers', 'Ischio-jambiers'],
    'deadlift': ['Dos', 'Fessiers', 'Ischio-jambiers'],
    'soulevé': ['Dos', 'Fessiers'],
    'rowing': ['Dos'],
    'row': ['Dos'],
    'traction': ['Dos', 'Biceps'],
    'pull-up': ['Dos', 'Biceps'],
    'chin-up': ['Dos', 'Biceps'],
    'pull down': ['Dos', 'Biceps'],
    'curl': ['Biceps'],
    'biceps': ['Biceps'],
    'triceps': ['Triceps'],
    'extension': ['Triceps'],
    'bench': ['Pectoraux', 'Triceps'],
    'développé': ['Pectoraux', 'Triceps', 'Épaules'],
    'press': ['Pectoraux', 'Triceps', 'Épaules'],
    'pec': ['Pectoraux'],
    'chest': ['Pectoraux'],
    'fly': ['Pectoraux'],
    'butterfly': ['Pectoraux'],
    'shoulder': ['Épaules'],
    'épaule': ['Épaules'],
    'deltoid': ['Épaules'],
    'leg curl': ['Ischio-jambiers'],
    'hamstring': ['Ischio-jambiers'],
    'ischio': ['Ischio-jambiers'],
    'abdo': ['Abdominaux'],
    'abs': ['Abdominaux'],
    'crunch': ['Abdominaux'],
    'plank': ['Abdominaux', 'Core'],
    'hip thrust': ['Fessiers'],
    'glute': ['Fessiers'],
    'fessier': ['Fessiers'],
    'calf': ['Mollets'],
    'mollet': ['Mollets'],
    'shrug': ['Trapèzes'],
    'trap': ['Trapèzes'],
    'pushup': ['Pectoraux', 'Triceps'],
    'push-up': ['Pectoraux', 'Triceps'],
    'pompe': ['Pectoraux', 'Triceps'],
    'dips': ['Pectoraux', 'Triceps'],
    'lunge': ['Quadriceps', 'Fessiers'],
    'fente': ['Quadriceps', 'Fessiers'],
  };
  
  // Recherche des correspondances
  for (const [keyword, muscles] of Object.entries(muscleMap)) {
    if (exerciseLower.includes(keyword)) {
      return muscles;
    }
  }
  
  // Cas par défaut
  return ['Groupe musculaire non spécifié'];
}

/**
 * Génère des exercices par défaut au cas où l'IA n'en fournirait pas
 */
function generateDefaultExercises(dayNumber: number): Exercise[] {
  // Définition des exercices par défaut selon le jour
  const defaultExercises: Record<number, Exercise[]> = {
    1: [ // Jour 1: Haut du corps - Push
      {
        name: "Développé couché avec haltères",
        sets: 4,
        reps: "8-10",
        restTime: "90 sec",
        notes: "Gardez les coudes à 45° par rapport au corps pour protéger vos épaules.",
        muscleGroups: ["Pectoraux", "Triceps", "Épaules"]
      },
      {
        name: "Développé militaire",
        sets: 3,
        reps: "10-12",
        restTime: "60 sec",
        notes: "Gardez le dos bien droit et engagez les abdominaux.",
        muscleGroups: ["Épaules", "Triceps"]
      },
      {
        name: "Extension des triceps à la poulie haute",
        sets: 3,
        reps: "12-15",
        restTime: "60 sec",
        notes: "Gardez les coudes bien serrés contre la tête.",
        muscleGroups: ["Triceps"]
      }
    ],
    2: [ // Jour 2: Bas du corps
      {
        name: "Squat",
        sets: 4,
        reps: "8-10",
        restTime: "120 sec",
        notes: "Descendez jusqu'à ce que vos cuisses soient parallèles au sol.",
        muscleGroups: ["Quadriceps", "Fessiers", "Ischio-jambiers"]
      },
      {
        name: "Soulevé de terre roumain",
        sets: 3,
        reps: "10-12",
        restTime: "90 sec",
        notes: "Gardez le dos droit et les genoux légèrement fléchis.",
        muscleGroups: ["Ischio-jambiers", "Fessiers", "Bas du dos"]
      },
      {
        name: "Extension des jambes",
        sets: 3,
        reps: "12-15",
        restTime: "60 sec",
        notes: "Concentrez-vous sur la contraction du quadriceps.",
        muscleGroups: ["Quadriceps"]
      }
    ],
    3: [ // Jour 3: Haut du corps - Pull
      {
        name: "Rowing haltère",
        sets: 4,
        reps: "8-10",
        restTime: "90 sec",
        notes: "Tirez votre coude vers l'arrière et serrez l'omoplate à la fin du mouvement.",
        muscleGroups: ["Dos", "Biceps"]
      },
      {
        name: "Traction assistée",
        sets: 3,
        reps: "8-10",
        restTime: "90 sec",
        notes: "Tirez avec les coudes, pas avec les bras.",
        muscleGroups: ["Dos", "Biceps"]
      },
      {
        name: "Curl biceps",
        sets: 3,
        reps: "12-15",
        restTime: "60 sec",
        notes: "Évitez de balancer le corps pendant le mouvement.",
        muscleGroups: ["Biceps"]
      }
    ],
    4: [ // Jour 4: Full body
      {
        name: "Squat goblet",
        sets: 3,
        reps: "12-15",
        restTime: "60 sec",
        notes: "Gardez le dos droit et les talons au sol.",
        muscleGroups: ["Quadriceps", "Fessiers"]
      },
      {
        name: "Développé haltères incliné",
        sets: 3,
        reps: "10-12",
        restTime: "60 sec",
        notes: "Contrôlez la descente pour maximiser la tension musculaire.",
        muscleGroups: ["Pectoraux", "Triceps", "Épaules"]
      },
      {
        name: "Rowing barre T",
        sets: 3,
        reps: "10-12",
        restTime: "60 sec",
        notes: "Tirez la barre vers le nombril et serrez les omoplates.",
        muscleGroups: ["Dos", "Biceps"]
      }
    ],
    5: [ // Jour 5: Haut du corps
      {
        name: "Dips",
        sets: 3,
        reps: "8-10",
        restTime: "90 sec",
        notes: "Descendez jusqu'à ce que vos coudes forment un angle de 90°.",
        muscleGroups: ["Pectoraux", "Triceps"]
      },
      {
        name: "Élévations latérales",
        sets: 3,
        reps: "12-15",
        restTime: "60 sec",
        notes: "Gardez une légère flexion des coudes tout au long du mouvement.",
        muscleGroups: ["Épaules"]
      },
      {
        name: "Pullover avec haltère",
        sets: 3,
        reps: "12-15",
        restTime: "60 sec",
        notes: "Étendez bien les bras pour sentir l'étirement dans les dorsaux.",
        muscleGroups: ["Dos", "Pectoraux"]
      }
    ],
    6: [ // Jour 6: Bas du corps
      {
        name: "Fentes avec haltères",
        sets: 3,
        reps: "10-12 par jambe",
        restTime: "60 sec",
        notes: "Gardez le torse droit pendant tout le mouvement.",
        muscleGroups: ["Quadriceps", "Fessiers", "Ischio-jambiers"]
      },
      {
        name: "Hip thrust",
        sets: 3,
        reps: "12-15",
        restTime: "60 sec",
        notes: "Contractez bien les fessiers au sommet du mouvement.",
        muscleGroups: ["Fessiers", "Ischio-jambiers"]
      },
      {
        name: "Élévation des mollets debout",
        sets: 3,
        reps: "15-20",
        restTime: "60 sec",
        notes: "Montez le plus haut possible sur la pointe des pieds.",
        muscleGroups: ["Mollets"]
      }
    ],
    7: [ // Jour 7: Récupération active ou repos
      {
        name: "Marche ou vélo à faible intensité",
        sets: 1,
        reps: "20-30 min",
        restTime: "N/A",
        notes: "Gardez une intensité faible, l'objectif est la récupération active.",
        muscleGroups: ["Système cardiovasculaire"]
      },
      {
        name: "Étirements généraux",
        sets: 1,
        reps: "15-20 min",
        restTime: "N/A",
        notes: "Maintenez chaque étirement 30 secondes sans rebondir.",
        muscleGroups: ["Tous les groupes musculaires"]
      }
    ]
  };
  
  // Si le jour existe dans notre mapping, retourner les exercices correspondants
  if (defaultExercises[dayNumber]) {
    return defaultExercises[dayNumber];
  }
  
  // Sinon retourner les exercices du jour 1 par défaut
  return defaultExercises[1];
}

/**
 * Génère un plan nutritionnel personnalisé
 */
export async function generateNutritionPlan(
  userId: string,
  goal: string,
  calorieTarget: number,
  dietaryPreferences: string[],
  allergies: string[],
  mealCount: number
): Promise<NutritionPlan> {
  try {
    // Simuler un délai d'API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const tokenCost = 5; // Coût fixe pour la génération d'un plan nutritionnel
    
    // Enregistrer la génération dans les statistiques si possible
    try {
      await recordGenerationStats(userId, tokenCost, 'NUTRITION_PLAN', 'Génération plan nutritionnel');
    } catch (error) {
      console.log('Erreur enregistrement stats, continuons quand même...');
    }
    
    // Calculer une répartition de macros basée sur l'objectif
    let protein = 0, carbs = 0, fat = 0;
    
    if (goal.includes('perte de poids')) {
      // Répartition pour perte de poids: 40% protéines, 30% glucides, 30% lipides
      protein = Math.round((calorieTarget * 0.4) / 4); // 4 calories par gramme de protéine
      carbs = Math.round((calorieTarget * 0.3) / 4); // 4 calories par gramme de glucides
      fat = Math.round((calorieTarget * 0.3) / 9); // 9 calories par gramme de lipides
    } else if (goal.includes('prise de masse')) {
      // Répartition pour prise de masse: 30% protéines, 50% glucides, 20% lipides
      protein = Math.round((calorieTarget * 0.3) / 4);
      carbs = Math.round((calorieTarget * 0.5) / 4);
      fat = Math.round((calorieTarget * 0.2) / 9);
    } else {
      // Répartition équilibrée: 30% protéines, 40% glucides, 30% lipides
      protein = Math.round((calorieTarget * 0.3) / 4);
      carbs = Math.round((calorieTarget * 0.4) / 4);
      fat = Math.round((calorieTarget * 0.3) / 9);
    }
    
    // Créer un contenu de plan nutritionnel simulé
    const planContent = `# Plan nutritionnel pour ${goal}

## Objectif
Ce plan est conçu pour vous aider à ${goal}.

## Cibles nutritionnelles
- Calories: ${calorieTarget} kcal par jour
- Protéines: ${protein}g (${Math.round((protein * 4 / calorieTarget) * 100)}% des calories)
- Glucides: ${carbs}g (${Math.round((carbs * 4 / calorieTarget) * 100)}% des calories)
- Lipides: ${fat}g (${Math.round((fat * 9 / calorieTarget) * 100)}% des calories)

## Préférences alimentaires prises en compte
${dietaryPreferences.length > 0 ? dietaryPreferences.join(', ') : 'Aucune préférence spécifiée'}.

## Allergies/Intolérances prises en compte
${allergies.length > 0 ? allergies.join(', ') : 'Aucune allergie spécifiée'}.

## Plan de repas sur 7 jours

${generateMealPlanContent(mealCount, goal, dietaryPreferences)}

## Conseils
- Buvez au moins 2L d'eau par jour
- Privilégiez les aliments entiers et non transformés
- Préparez vos repas à l'avance pour éviter les écarts
- Ajustez les portions en fonction de votre faim et de vos besoins`;

    // Créer des plans de repas simulés pour 7 jours
    const mealPlans = [];
    for (let day = 1; day <= 7; day++) {
      const meals = [];
      let dailyCalories = 0;
      let dailyProtein = 0;
      let dailyCarbs = 0;
      let dailyFat = 0;
      
      for (let meal = 1; meal <= mealCount; meal++) {
        // Calculer des valeurs nutritionnelles approximatives pour chaque repas
        const mealCalories = Math.round(calorieTarget / mealCount);
        const mealProtein = Math.round(protein / mealCount);
        const mealCarbs = Math.round(carbs / mealCount);
        const mealFat = Math.round(fat / mealCount);
        
        dailyCalories += mealCalories;
        dailyProtein += mealProtein;
        dailyCarbs += mealCarbs;
        dailyFat += mealFat;
        
        meals.push({
          name: getMealName(meal, mealCount),
          description: getMealDescription(meal, goal, dietaryPreferences),
          foods: getMealFoods(meal, goal, dietaryPreferences, allergies),
          calories: mealCalories,
          protein: mealProtein,
          carbs: mealCarbs,
          fat: mealFat
        });
      }
      
      mealPlans.push({
        day,
        meals
      });
    }
    
    // Créer et retourner le plan nutritionnel
    const nutritionPlan: NutritionPlan = {
      id: generateUUID(),
      userId,
      title: `Plan nutritionnel pour ${goal}`,
      description: planContent,
      calorieTarget,
      macros: {
        protein,
        carbs,
        fat
      },
      mealPlans,
      notes: "Adapté à vos préférences et objectifs personnels. Ajustez les quantités selon vos besoins.",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tokenCost
    };
    
    return nutritionPlan;
    
  } catch (error) {
    console.error('Erreur lors de la génération du plan nutritionnel:', error);
    throw new Error("Une erreur s'est produite lors de la génération de votre plan nutritionnel.");
  }
}

// Fonctions utilitaires pour générer du contenu simulé

function getDayName(dayNumber: number, type: string, focusAreas: string[]): string {
  if (focusAreas.includes('jambes') && dayNumber === 1) return 'Jour des Jambes';
  if (focusAreas.includes('dos') && dayNumber === 2) return 'Jour du Dos';
  if (focusAreas.includes('poitrine') && dayNumber === 3) return 'Jour de la Poitrine';
  if (focusAreas.includes('bras') && dayNumber === 4) return 'Jour des Bras';
  if (focusAreas.includes('épaules') && dayNumber === 5) return 'Jour des Épaules';
  
  const days = [
    'Push (Pousser)',
    'Pull (Tirer)',
    'Jambes',
    'Haut du Corps',
    'Bas du Corps',
    'Full Body',
    'Cardio & Récupération'
  ];
  
  return days[(dayNumber - 1) % days.length];
}

function generateExercisesForDay(dayNumber: number, type: string, focusAreas: string[]): any[] {
  const exercises = [];
  
  // Nombre d'exercices basé sur le type
  const numExercises = type === 'force' ? 5 : type === 'hypertrophie' ? 8 : 6;
  
  for (let i = 1; i <= numExercises; i++) {
    let exerciseName = '';
    let muscleGroups = [];
    
    if (dayNumber === 1) {
      // Jour 1: Jambes/Push
      exerciseName = ['Squat', 'Presse à cuisses', 'Extension des jambes', 'Curl des ischio-jambiers', 'Fentes', 'Élévation des mollets'][i % 6];
      muscleGroups = ['quadriceps', 'ischio-jambiers', 'fessiers', 'mollets'];
    } else if (dayNumber === 2) {
      // Jour 2: Dos/Pull
      exerciseName = ['Tractions', 'Rowing haltère', 'Tirage vertical', 'Pull-over', 'Rowing T-bar', 'Curl biceps'][i % 6];
      muscleGroups = ['dos', 'trapèzes', 'biceps', 'avant-bras'];
    } else if (dayNumber === 3) {
      // Jour 3: Poitrine/Push
      exerciseName = ['Développé couché', 'Écarté à la poulie', 'Développé incliné', 'Dips', 'Extension des triceps', 'Push-ups'][i % 6];
      muscleGroups = ['pectoraux', 'triceps', 'épaules antérieures'];
    } else {
      // Autres jours: Full body/Mix
      exerciseName = ['Soulevé de terre', 'Développé militaire', 'Rowing', 'Fentes', 'Crunch', 'Planche', 'Mountain climber', 'Burpees'][i % 8];
      muscleGroups = ['full body', 'core'];
    }
    
    exercises.push({
      name: exerciseName,
      sets: type === 'force' ? 5 : type === 'hypertrophie' ? 4 : 3,
      reps: type === 'force' ? '3-5' : type === 'hypertrophie' ? '8-12' : '12-15',
      restTime: type === 'force' ? '3-5 minutes' : type === 'hypertrophie' ? '60-90 secondes' : '30-60 secondes',
      notes: `Concentrez-vous sur la technique. ${type === 'force' ? 'Utilisez des charges lourdes.' : type === 'hypertrophie' ? 'Contraction musculaire maximale.' : 'Gardez un bon rythme.'}`,
      muscleGroups
    });
  }
  
  return exercises;
}

function generateWorkoutDaysContent(frequency: number, type: string, focusAreas: string[]): string {
  let content = '';
  
  for (let i = 1; i <= frequency; i++) {
    content += `### Jour ${i}: ${getDayName(i, type, focusAreas)}\n\n`;
    
    const exercises = generateExercisesForDay(i, type, focusAreas);
    exercises.forEach(exercise => {
      content += `- **${exercise.name}**: ${exercise.sets} séries x ${exercise.reps} répétitions, récupération ${exercise.restTime}\n`;
    });
    
    content += '\n';
  }
  
  return content;
}

function getMealName(mealNumber: number, totalMeals: number): string {
  if (totalMeals <= 3) {
    return ['Petit-déjeuner', 'Déjeuner', 'Dîner'][mealNumber - 1] || `Repas ${mealNumber}`;
  } else {
    if (mealNumber === 1) return 'Petit-déjeuner';
    if (mealNumber === Math.ceil(totalMeals / 2)) return 'Déjeuner';
    if (mealNumber === totalMeals) return 'Dîner';
    return `Collation ${mealNumber < Math.ceil(totalMeals / 2) ? 'matinale' : 'après-midi'}`;
  }
}

function getMealDescription(mealNumber: number, goal: string, preferences: string[]): string {
  const mealType = getMealName(mealNumber, 5);
  
  if (mealType.includes('Petit-déjeuner')) {
    return `Un petit-déjeuner ${goal.includes('perte') ? 'protéiné et léger' : 'complet et énergétique'} pour bien démarrer la journée.`;
  }
  
  if (mealType.includes('Déjeuner')) {
    return `Un déjeuner équilibré riche en ${goal.includes('perte') ? 'protéines et fibres' : 'nutriments essentiels'} pour soutenir votre activité.`;
  }
  
  if (mealType.includes('Dîner')) {
    return `Un dîner ${goal.includes('perte') ? 'léger' : 'reconstituant'} pour favoriser ${goal.includes('perte') ? 'la récupération nocturne' : 'la synthèse musculaire pendant le sommeil'}.`;
  }
  
  return `Une collation pour maintenir votre énergie et ${goal.includes('perte') ? 'éviter les fringales' : 'soutenir votre métabolisme'}.`;
}

function getMealFoods(mealNumber: number, goal: string, preferences: string[], allergies: string[]): string[] {
  const isVegetarian = preferences.some(p => p.toLowerCase().includes('végé'));
  const isVegan = preferences.some(p => p.toLowerCase().includes('vegan'));
  
  // Aliments de base selon les préférences
  let proteins = isVegan ? 
    ['tofu', 'tempeh', 'seitan', 'légumineuses', 'protéines de pois'] :
    isVegetarian ?
    ['œufs', 'fromage blanc', 'tofu', 'légumineuses', 'yaourt grec'] :
    ['poulet', 'œufs', 'thon', 'saumon', 'fromage blanc', 'bœuf maigre'];
  
  let carbs = ['riz complet', 'patate douce', 'quinoa', 'avoine', 'pain complet'];
  let fats = ['avocat', 'huile d\'olive', 'amandes', 'noix', 'graines de chia'];
  let veggies = ['épinards', 'brocoli', 'poivrons', 'tomates', 'concombre'];
  let fruits = ['banane', 'myrtilles', 'pomme', 'fraises', 'oranges'];
  
  // Filtrer les allergènes
  if (allergies.length > 0) {
    const allergyTerms = allergies.map(a => a.toLowerCase());
    
    // Filtrer les protéines
    proteins = proteins.filter(p => !allergyTerms.some(a => p.includes(a)));
    
    // Filtrer les glucides
    carbs = carbs.filter(c => !allergyTerms.some(a => c.includes(a)));
    
    // Filtrer les lipides
    fats = fats.filter(f => !allergyTerms.some(a => f.includes(a)));
    
    // Filtrer les légumes
    veggies = veggies.filter(v => !allergyTerms.some(a => v.includes(a)));
    
    // Filtrer les fruits
    fruits = fruits.filter(f => !allergyTerms.some(a => f.includes(a)));
  }
  
  // Sélectionner des aliments selon le repas
  let foods: string[] = [];
  const mealType = getMealName(mealNumber, 5);
  
  if (mealType.includes('Petit-déjeuner')) {
    foods = [
      `${proteins[Math.floor(Math.random() * proteins.length)]}`,
      `${carbs[Math.floor(Math.random() * carbs.length)]}`,
      `${fruits[Math.floor(Math.random() * fruits.length)]}`
    ];
  } else if (mealType.includes('Déjeuner') || mealType.includes('Dîner')) {
    foods = [
      `${proteins[Math.floor(Math.random() * proteins.length)]}`,
      `${carbs[Math.floor(Math.random() * carbs.length)]}`,
      `${veggies[Math.floor(Math.random() * veggies.length)]}`,
      `${fats[Math.floor(Math.random() * fats.length)]}`
    ];
  } else {
    // Collation
    foods = [
      `${proteins[Math.floor(Math.random() * proteins.length)]}`,
      `${fruits[Math.floor(Math.random() * fruits.length)]}`
    ];
  }
  
  return foods;
}

function generateMealPlanContent(mealCount: number, goal: string, preferences: string[]): string {
  let content = '';
  
  for (let day = 1; day <= 3; day++) {
    content += `### Jour ${day}\n\n`;
    
    for (let meal = 1; meal <= mealCount; meal++) {
      const mealName = getMealName(meal, mealCount);
      content += `#### ${mealName}\n\n`;
      content += `${getMealDescription(meal, goal, preferences)}\n\n`;
      
      const foods = getMealFoods(meal, goal, preferences, []);
      content += '**Aliments suggérés**:\n';
      foods.forEach(food => {
        content += `- ${food}\n`;
      });
      
      content += '\n';
    }
    
    content += '---\n\n';
  }
  
  content += '...\n\n_Voir plan complet pour les autres jours_';
  
  return content;
}

/**
 * Génère un article sur la fitness et la nutrition
 */
export async function generateFitnessArticle(
  userId: string,
  title: string,
  category: string,
  keywords: string[],
  wordCount: number
): Promise<FitnessArticle> {
  try {
    // Vérifier que la catégorie est valide
    if (!ARTICLE_CATEGORIES.includes(category)) {
      throw new Error("Catégorie d'article invalide");
    }
    
    // Simuler un délai d'API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const tokenCost = 3; // Coût fixe pour la génération d'un article
    
    // Enregistrer la génération dans les statistiques si possible
    try {
      await recordGenerationStats(userId, tokenCost, 'ARTICLE', 'Génération article fitness');
    } catch (error) {
      console.log('Erreur enregistrement stats, continuons quand même...');
    }
    
    // Génération de contenu d'article simulé
    const articleContent = `# ${title}

## Introduction

${title} est un sujet essentiel pour toute personne intéressée par le fitness et la nutrition. Dans cet article, nous allons explorer comment optimiser vos résultats en mettant en pratique les dernières recherches scientifiques.

## Les bases

Les fondamentaux de ${keywords[0] || 'la fitness'} comprennent une alimentation équilibrée, un entraînement régulier, et une récupération adéquate. Les études récentes montrent que la cohérence est le facteur le plus important pour atteindre vos objectifs.

## Techniques avancées

Pour aller plus loin dans ${keywords[1] || 'votre progression'}, considérez ces approches scientifiquement validées:

1. **Périodisation de l'entraînement**: Variez l'intensité et le volume pour continuer à progresser
2. **Nutrition ciblée**: Adaptez votre alimentation à vos phases d'entraînement
3. **Récupération optimisée**: Utilisez des techniques comme la compression, le contraste thermique et la méditation

## Comment appliquer ces principes

La clé est d'adapter ces conseils à votre situation personnelle, en tenant compte de votre niveau actuel, vos objectifs et vos contraintes de temps.

## Conclusion

En intégrant ces stratégies basées sur la science dans votre routine, vous pourrez maximiser vos résultats et atteindre vos objectifs plus efficacement.

---

*Cet article a été généré pour la catégorie ${category} avec les mots-clés: ${keywords.join(', ')}.*`;

    // Calculer des statistiques approximatives sur l'article
    const words = articleContent.split(/\s+/).length;
    const readingTime = Math.ceil(words / 200); // Estimation : 200 mots par minute
    
    // Générer un résumé de l'article (simulé)
    const summary = `Découvrez les meilleures pratiques pour optimiser vos résultats en ${keywords[0] || 'fitness'} grâce aux dernières recherches scientifiques. Cet article pratique vous guide à travers les techniques essentielles et avancées pour atteindre vos objectifs plus rapidement.`;
    
    // Créer et retourner l'article
    const fitnessArticle: FitnessArticle = {
      id: generateUUID(),
      userId,
      title,
      summary,
      content: articleContent,
      category: category as ArticleCategory,
      wordCount: words,
      readingTime,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tokenCost
    };
    
    return fitnessArticle;
    
  } catch (error) {
    console.error('Erreur lors de la génération de l\'article:', error);
    throw new Error("Une erreur s'est produite lors de la génération de votre article.");
  }
}

/**
 * Fonction utilitaire pour enregistrer la génération dans les statistiques
 */
async function recordGenerationClient(
  userId: string,
  tokenCost: number,
  contentType: 'CHAT_MESSAGE' | 'WORKOUT_PLAN' | 'NUTRITION_PLAN' | 'ARTICLE',
  description: string
) {
  try {
    const response = await fetch('/api/record-generation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        tokenCost,
        contentType,
        description
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur lors de l\'enregistrement de la génération');
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de la génération:', error);
    throw error;
  }
}

async function recordChatMessageGeneration(userId: string, tokenCost: number = 1) {
  return recordGenerationClient(userId, tokenCost, 'CHAT_MESSAGE', 'Message coach IA');
}

async function recordWorkoutPlanGeneration(userId: string, tokenCost: number = 5) {
  return recordGenerationClient(userId, tokenCost, 'WORKOUT_PLAN', 'Génération programme entraînement');
}

async function recordNutritionPlanGeneration(userId: string, tokenCost: number = 5) {
  return recordGenerationClient(userId, tokenCost, 'NUTRITION_PLAN', 'Génération plan nutritionnel');
}

async function recordArticleGeneration(userId: string, tokenCost: number = 3) {
  return recordGenerationClient(userId, tokenCost, 'ARTICLE', 'Génération article fitness');
} 