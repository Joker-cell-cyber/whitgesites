'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, Check } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import { Slider } from '@/app/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Switch } from '@/app/components/ui/switch';
import { Textarea } from '@/app/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Badge } from '@/app/components/ui/badge';
import { useToast } from '@/app/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useStats } from '@/app/context/stats-context';
import OpenAI from 'openai';

// OpenAI client configuration
const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true // Permettre l'utilisation côté client
});

// Schéma de validation pour le formulaire
const nutritionFormSchema = z.object({
  // Données biométriques
  age: z.coerce.number().min(16).max(100),
  gender: z.enum(['homme', 'femme', 'autre']),
  weight: z.coerce.number().min(30).max(250),
  height: z.coerce.number().min(100).max(250),
  bodyFatPercentage: z.coerce.number().min(3).max(50).optional(),
  
  // Niveau d'activité
  activityLevel: z.enum(['sédentaire', 'légèrement_actif', 'modérément_actif', 'très_actif', 'extrêmement_actif']),
  trainingFrequency: z.coerce.number().min(0).max(14),
  trainingDuration: z.coerce.number().min(0).max(240),
  trainingType: z.array(z.string()).min(1),
  
  // Objectifs
  goal: z.enum(['perte_de_poids', 'prise_de_masse', 'maintien', 'performance', 'santé']),
  
  // Préférences alimentaires
  dietaryPreferences: z.array(z.string()),
  excludedFoods: z.string().optional(),
  mealsPerDay: z.coerce.number().min(2).max(8),
  
  // Habitudes actuelles
  sleepHours: z.coerce.number().min(3).max(12),
  stressLevel: z.enum(['faible', 'modéré', 'élevé']),
  
  // Données avancées (facultatif)
  allergies: z.string().optional(),
  medicalConditions: z.string().optional(),
});

// Type du formulaire
type NutritionFormValues = z.infer<typeof nutritionFormSchema>;

export default function NutritionPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('new');
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const { toast } = useToast();
  const router = useRouter();
  const { stats } = useStats();

  // Fonction utilitaire pour sécuriser l'affichage des valeurs dans le JSX
  const safeRender = (value: any): string => {
    if (value === null || value === undefined) {
      return "";
    }
    if (typeof value === 'string') {
      return value;
    }
    if (typeof value === 'number' || typeof value === 'boolean') {
      return value.toString();
    }
    if (typeof value === 'object') {
      try {
        return JSON.stringify(value);
      } catch (e) {
        console.error("Erreur lors de la conversion d'un objet en chaîne:", e);
        return "[Objet complexe]";
      }
    }
    return "";
  };

  // Valeurs par défaut du formulaire
  const defaultValues: Partial<NutritionFormValues> = {
    age: 30,
    gender: 'homme',
    weight: 75,
    height: 175,
    activityLevel: 'modérément_actif',
    trainingFrequency: 3,
    trainingDuration: 60,
    trainingType: ['force'],
    goal: 'perte_de_poids',
    dietaryPreferences: [],
    mealsPerDay: 3,
    sleepHours: 7,
    stressLevel: 'modéré',
  };

  // Initialisation du formulaire
  const form = useForm<NutritionFormValues>({
    resolver: zodResolver(nutritionFormSchema),
    defaultValues,
  });

  // Options des champs select
  const activityLevelOptions = [
    { value: 'sédentaire', label: 'Sédentaire (peu ou pas d\'exercice)' },
    { value: 'légèrement_actif', label: 'Légèrement actif (exercice léger 1-3 jours/semaine)' },
    { value: 'modérément_actif', label: 'Modérément actif (exercice modéré 3-5 jours/semaine)' },
    { value: 'très_actif', label: 'Très actif (exercice intense 6-7 jours/semaine)' },
    { value: 'extrêmement_actif', label: 'Extrêmement actif (exercice intense et travail physique)' },
  ];

  const goalOptions = [
    { value: 'perte_de_poids', label: 'Perte de poids' },
    { value: 'prise_de_masse', label: 'Prise de masse musculaire' },
    { value: 'maintien', label: 'Maintien du poids' },
    { value: 'performance', label: 'Amélioration des performances' },
    { value: 'santé', label: 'Optimisation de la santé' },
  ];

  const trainingTypeOptions = [
    { id: 'force', label: 'Force' },
    { id: 'hypertrophie', label: 'Hypertrophie' },
    { id: 'endurance', label: 'Endurance' },
    { id: 'puissance', label: 'Puissance' },
    { id: 'cardio', label: 'Cardio' },
    { id: 'hiit', label: 'HIIT' },
  ];

  const dietaryPreferencesOptions = [
    { id: 'omnivore', label: 'Omnivore' },
    { id: 'flexitarien', label: 'Flexitarien' },
    { id: 'pescetarien', label: 'Pescetarien' },
    { id: 'végétarien', label: 'Végétarien' },
    { id: 'végétalien', label: 'Végétalien' },
    { id: 'paleo', label: 'Paléo' },
    { id: 'cétogène', label: 'Cétogène' },
    { id: 'méditerranéen', label: 'Méditerranéen' },
  ];

  // Fonction pour télécharger le plan nutritionnel
  const downloadPlan = () => {
    if (!generatedPlan) return;
    
    const fileName = `plan-nutritionnel-${new Date().toISOString().split('T')[0]}.json`;
    const data = JSON.stringify(generatedPlan, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  // Fonction de soumission du formulaire
  async function onSubmit(data: NutritionFormValues) {
    setIsGenerating(true);
    setGeneratedPlan(null);
    
    try {
      // Préparation des données pour l'API
      const formattedData = {
        ...data,
        excludedFoods: data.excludedFoods ? data.excludedFoods.split(',').map(item => item.trim()) : [],
        allergies: data.allergies ? data.allergies.split(',').map(item => item.trim()) : [],
        medicalConditions: data.medicalConditions ? data.medicalConditions.split(',').map(item => item.trim()) : [],
      };
      
      const userProfile = {
        age: formattedData.age,
        gender: formattedData.gender,
        weight: formattedData.weight,
        height: formattedData.height,
        activityLevel: formattedData.activityLevel,
        goal: formattedData.goal,
        trainingFrequency: formattedData.trainingFrequency,
        trainingDuration: formattedData.trainingDuration,
        trainingTypes: formattedData.trainingType,
        dietaryPreferences: formattedData.dietaryPreferences,
        excludedFoods: formattedData.excludedFoods,
        mealsPerDay: formattedData.mealsPerDay,
        sleepHours: formattedData.sleepHours,
        stressLevel: formattedData.stressLevel,
        allergies: formattedData.allergies,
        medicalConditions: formattedData.medicalConditions,
      };

      // Système de prompt pour le plan nutritionnel
      const systemPrompt = `Tu es un expert en nutrition et coaching sportif. Ton rôle est de créer un plan nutritionnel personnalisé basé sur le profil suivant:
      - Âge: ${userProfile.age} ans
      - Genre: ${userProfile.gender}
      - Poids: ${userProfile.weight} kg
      - Taille: ${userProfile.height} cm
      - Niveau d'activité: ${userProfile.activityLevel}
      - Objectif principal: ${userProfile.goal}
      - Fréquence d'entraînement: ${userProfile.trainingFrequency} jours/semaine
      - Durée moyenne des séances: ${userProfile.trainingDuration} minutes
      - Types d'entraînement: ${userProfile.trainingTypes.join(', ')}
      - Préférences alimentaires: ${userProfile.dietaryPreferences.length > 0 ? userProfile.dietaryPreferences.join(', ') : 'Aucune préférence spécifique'}
      - Aliments à exclure: ${userProfile.excludedFoods.length > 0 ? userProfile.excludedFoods.join(', ') : 'Aucun'}
      - Repas par jour: ${userProfile.mealsPerDay}
      - Heures de sommeil: ${userProfile.sleepHours}
      - Niveau de stress: ${userProfile.stressLevel}
      - Allergies: ${userProfile.allergies.length > 0 ? userProfile.allergies.join(', ') : 'Aucune'}
      - Conditions médicales: ${userProfile.medicalConditions.length > 0 ? userProfile.medicalConditions.join(', ') : 'Aucune'}
      
      Génère un plan nutritionnel complet au format JSON avec les éléments suivants:
      - title: Titre du plan
      - summary: Résumé des objectifs et approche
      - basalMetabolicRate: Métabolisme de base (calories)
      - totalDailyEnergyExpenditure: Dépense énergétique totale quotidienne (calories)
      - adjustedCalories: Calories ajustées selon l'objectif
      - macroDistribution: Répartition des macros (protéines, glucides, lipides) en grammes et pourcentages
      - trainingDayPlan: Plan pour les jours d'entraînement avec repas détaillés
      - restDayPlan: Plan pour les jours de repos avec repas détaillés
      - recommendedFoods: Aliments recommandés par catégorie
      - hydrationPlan: Plan d'hydratation
      - nutritionStrategies: Conseils et stratégies nutritionnelles
      - expertTips: Conseils d'expert additionnels
      
      Réponds uniquement avec le JSON sans texte supplémentaire.`;

      // Appel direct à l'API OpenAI
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: "Génère un plan nutritionnel personnalisé pour ce profil." }
        ],
        temperature: 0.7,
        max_tokens: 3000,
      });

      // Traiter la réponse
      const responseContent = completion.choices[0].message.content;
      let nutritionProgram;
      
      try {
        // Extraire le JSON de la réponse
        const jsonMatch = responseContent.match(/```json\n([\s\S]*?)\n```/) || 
                           responseContent.match(/```\n([\s\S]*?)\n```/) || 
                           [null, responseContent];
        
        const jsonContent = jsonMatch[1] || responseContent;
        nutritionProgram = JSON.parse(jsonContent);
        
        // Stocker le plan nutritionnel généré
        setGeneratedPlan(nutritionProgram);
        
        // Notification de succès
        toast({
          title: "Plan nutritionnel généré avec succès",
          description: "Votre plan nutritionnel personnalisé est prêt !",
          variant: "success",
        });
      } catch (parseError) {
        console.error('Erreur lors du parsing de la réponse JSON:', parseError);
        throw new Error('Format de réponse invalide. Veuillez réessayer.');
      }
      
    } catch (error) {
      console.error('Erreur globale:', error);
      // Notification d'erreur
      toast({
        title: "Erreur",
        description: error.message || "Une erreur s'est produite lors de la génération du plan",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-6"
    >
      <Tabs defaultValue="new" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Plan Nutritionnel Personnalisé</h1>
            <p className="text-gray-400">Créez un plan nutritionnel basé sur vos besoins spécifiques</p>
          </div>
          <TabsList className="bg-black/40 backdrop-blur-sm border border-red-500/20">
            <TabsTrigger value="new" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-orange-500 data-[state=active]:text-white">
              Nouveau Plan
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="new" className="space-y-6">
          <Card className="bg-black/40 backdrop-blur-xl border border-red-500/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl text-white">Générateur de Plan Nutritionnel</CardTitle>
                  <CardDescription className="text-gray-400">
                    Remplissez ce formulaire pour générer un plan adapté à vos besoins
                  </CardDescription>
                </div>
                {stats && (
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-red-500/10 text-orange-400 border-red-500/20 px-3 py-1">
                      {stats.tokensRemaining} tokens disponibles
                    </Badge>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Section 1: Données biométriques */}
                    <fieldset className="space-y-4 p-6 rounded-xl bg-black/60 backdrop-blur-sm border border-red-500/20">
                      <legend className="text-lg font-semibold text-white px-2">Données Biométriques</legend>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="age"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Âge</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  min={16}
                                  max={100}
                                  className="border-red-500/20 bg-black/30 text-white"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="gender"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Genre</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="border-red-500/20 bg-black/30 text-white">
                                    <SelectValue placeholder="Sélectionner" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-black/80 border-red-500/20 text-white">
                                  <SelectItem value="homme">Homme</SelectItem>
                                  <SelectItem value="femme">Femme</SelectItem>
                                  <SelectItem value="autre">Autre</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="weight"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Poids (kg)</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  min={30}
                                  max={250}
                                  className="border-red-500/20 bg-black/30 text-white"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="height"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Taille (cm)</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  min={100}
                                  max={250}
                                  className="border-red-500/20 bg-black/30 text-white"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </fieldset>
                    
                    {/* Section 2: Activité Physique */}
                    <fieldset className="space-y-4 p-6 rounded-xl bg-black/60 backdrop-blur-sm border border-red-500/20">
                      <legend className="text-lg font-semibold text-white px-2">Activité Physique</legend>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="activityLevel"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Niveau d'activité quotidien</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="border-red-500/20 bg-black/30 text-white">
                                    <SelectValue placeholder="Sélectionner" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-black/80 border-red-500/20 text-white">
                                  {activityLevelOptions.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="trainingFrequency"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Fréquence d'entraînement (jours/semaine)</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  min="0"
                                  max="7"
                                  className="border-red-500/20 bg-black/30 text-white"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="trainingDuration"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Durée moyenne des entraînements (minutes)</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  min="0"
                                  className="border-red-500/20 bg-black/30 text-white"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="trainingType"
                          render={() => (
                            <FormItem>
                              <div className="mb-2">
                                <FormLabel className="text-white">Types d'entraînement</FormLabel>
                              </div>
                              {trainingTypeOptions.map((item) => (
                                <FormField
                                  key={item.id}
                                  control={form.control}
                                  name="trainingType"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={item.id}
                                        className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-1"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(item.id)}
                                            onCheckedChange={(checked) => {
                                              const current = field.value || [];
                                              const updated = checked
                                                ? [...current, item.id]
                                                : current.filter((value) => value !== item.id);
                                              field.onChange(updated);
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal cursor-pointer text-white">
                                          {item.label}
                                        </FormLabel>
                                      </FormItem>
                                    );
                                  }}
                                />
                              ))}
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </fieldset>
                    
                    {/* Section 3: Objectifs */}
                    <fieldset className="space-y-4 p-6 rounded-xl bg-black/60 backdrop-blur-sm border border-red-500/20">
                      <legend className="text-lg font-semibold text-white px-2">Objectifs</legend>
                      
                      <div className="grid grid-cols-1 gap-6">
                        <FormField
                          control={form.control}
                          name="goal"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel className="text-white">Objectif principal</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
                                >
                                  {goalOptions.map(option => (
                                    <FormItem key={option.value} className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value={option.value} />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer text-white">
                                        {option.label}
                                      </FormLabel>
                                    </FormItem>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </fieldset>
                    
                    {/* Section 4: Préférences Alimentaires */}
                    <fieldset className="space-y-4 p-6 rounded-xl bg-black/60 backdrop-blur-sm border border-red-500/20">
                      <legend className="text-lg font-semibold text-white px-2">Préférences Alimentaires</legend>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="dietaryPreferences"
                          render={() => (
                            <FormItem>
                              <div className="mb-2">
                                <FormLabel className="text-white">Préférences alimentaires</FormLabel>
                              </div>
                              {dietaryPreferencesOptions.map((item) => (
                                <FormField
                                  key={item.id}
                                  control={form.control}
                                  name="dietaryPreferences"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={item.id}
                                        className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-1"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(item.id)}
                                            onCheckedChange={(checked) => {
                                              const current = field.value || [];
                                              const updated = checked
                                                ? [...current, item.id]
                                                : current.filter((value) => value !== item.id);
                                              field.onChange(updated);
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal cursor-pointer text-white">
                                          {item.label}
                                        </FormLabel>
                                      </FormItem>
                                    );
                                  }}
                                />
                              ))}
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="space-y-6">
                          <FormField
                            control={form.control}
                            name="excludedFoods"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Aliments à exclure</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Entrez les aliments séparés par des virgules"
                                    className="resize-none border-red-500/20 bg-black/30 text-white"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription className="text-gray-400">
                                  Ex: gluten, lactose, fruits de mer...
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="mealsPerDay"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Nombre de repas par jour</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    type="number"
                                    min="2"
                                    max="8"
                                    className="border-red-500/20 bg-black/30 text-white"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </fieldset>
                    
                    {/* Section 5: Informations Supplémentaires */}
                    <fieldset className="space-y-4 p-6 rounded-xl bg-black/60 backdrop-blur-sm border border-red-500/20">
                      <legend className="text-lg font-semibold text-white px-2">Informations Supplémentaires</legend>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="allergies"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Allergies</FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  className="resize-none border-red-500/20 bg-black/30 text-white"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="medicalConditions"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Conditions médicales</FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  className="resize-none border-red-500/20 bg-black/30 text-white"
                                />
                              </FormControl>
                              <FormDescription className="text-gray-400">
                                Ex: diabète, hypertension...
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="sleepHours"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Heures de sommeil par nuit</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  min="3"
                                  max="12"
                                  className="border-red-500/20 bg-black/30 text-white"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="stressLevel"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Niveau de stress</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="border-red-500/20 bg-black/30 text-white">
                                    <SelectValue placeholder="Sélectionner" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-black/80 border-red-500/20 text-white">
                                  <SelectItem value="faible">Faible</SelectItem>
                                  <SelectItem value="modéré">Modéré</SelectItem>
                                  <SelectItem value="élevé">Élevé</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </fieldset>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Génération en cours...
                      </>
                    ) : (
                      <>
                        Générer mon plan nutritionnel
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {generatedPlan && (
        <Card className="mt-8 bg-black/40 backdrop-blur-sm border border-green-500/20">
          <CardHeader>
            <CardTitle className="flex items-center text-green-400">
              <Check className="mr-2 h-5 w-5" />
              Plan nutritionnel généré avec succès
            </CardTitle>
            <CardDescription>
              Voici votre plan nutritionnel personnalisé basé sur vos informations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Traitement du plan généré */}
            <div className="space-y-6 text-white">
              {/* En-tête du plan */}
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-green-400">{safeRender(generatedPlan.title)}</h2>
                <p className="text-gray-300">{safeRender(generatedPlan.summary)}</p>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="p-3 bg-black/50 rounded-lg border border-red-500/20">
                    <p className="text-sm text-gray-400">Métabolisme de base</p>
                    <p className="text-xl font-bold">{safeRender(generatedPlan.basalMetabolicRate)} kcal</p>
                  </div>
                  <div className="p-3 bg-black/50 rounded-lg border border-red-500/20">
                    <p className="text-sm text-gray-400">Dépense énergétique totale</p>
                    <p className="text-xl font-bold">{safeRender(generatedPlan.totalDailyEnergyExpenditure)} kcal</p>
                  </div>
                  <div className="p-3 bg-black/50 rounded-lg border border-green-500/20">
                    <p className="text-sm text-gray-400">Calories ajustées</p>
                    <p className="text-xl font-bold">{safeRender(generatedPlan.adjustedCalories)} kcal</p>
                  </div>
                </div>
              </div>

              {/* Macronutriments */}
              <div className="p-4 bg-black/50 rounded-lg border border-red-500/20">
                <h3 className="text-xl font-semibold mb-3">Distribution des macronutriments</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="h-4 bg-green-600 rounded-full mb-2"></div>
                    <p className="font-bold">{generatedPlan.macroDistribution?.protein?.percentage || generatedPlan.macroDistribution?.proteins?.percentage || 0}%</p>
                    <p className="text-sm text-gray-400">Protéines</p>
                    <p className="font-semibold">{generatedPlan.macroDistribution?.protein?.grams || generatedPlan.macroDistribution?.proteins?.grams || 0}g</p>
                  </div>
                  <div className="text-center">
                    <div className="h-4 bg-blue-600 rounded-full mb-2"></div>
                    <p className="font-bold">{generatedPlan.macroDistribution?.carbs?.percentage || generatedPlan.macroDistribution?.carbohydrates?.percentage || 0}%</p>
                    <p className="text-sm text-gray-400">Glucides</p>
                    <p className="font-semibold">{generatedPlan.macroDistribution?.carbs?.grams || generatedPlan.macroDistribution?.carbohydrates?.grams || 0}g</p>
                  </div>
                  <div className="text-center">
                    <div className="h-4 bg-yellow-600 rounded-full mb-2"></div>
                    <p className="font-bold">{generatedPlan.macroDistribution?.fat?.percentage || generatedPlan.macroDistribution?.fats?.percentage || 0}%</p>
                    <p className="text-sm text-gray-400">Lipides</p>
                    <p className="font-semibold">{generatedPlan.macroDistribution?.fat?.grams || generatedPlan.macroDistribution?.fats?.grams || 0}g</p>
                  </div>
                </div>
              </div>

              {/* Programmes alimentaires */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Jour d'entraînement */}
                <div className="p-4 bg-black/50 rounded-lg border border-red-500/20">
                  <h3 className="text-xl font-semibold mb-3">Jour d'entraînement</h3>
                  <div className="space-y-3">
                    {generatedPlan.trainingDayPlan && typeof generatedPlan.trainingDayPlan === 'object' ? (
                      // Si c'est un objet avec des propriétés meal/calories
                      Object.entries(generatedPlan.trainingDayPlan).some(([_, value]) => typeof value === 'object' && value.meal) ? 
                        Object.entries(generatedPlan.trainingDayPlan).map(([mealName, mealInfo]: [string, any]) => (
                          <div key={mealName} className="p-3 bg-black/40 rounded-lg">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium capitalize">{mealName}</h4>
                              <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                                {mealInfo.calories} kcal
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-300 mt-1">
                              {typeof mealInfo.meal === 'string' ? mealInfo.meal : safeRender(mealInfo.meal)}
                            </p>
                          </div>
                        )) : 
                        // Si c'est un objet avec des chaînes de caractères directement
                        Object.entries(generatedPlan.trainingDayPlan).map(([mealName, mealContent]: [string, any]) => (
                          <div key={mealName} className="p-3 bg-black/40 rounded-lg">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium capitalize">{mealName}</h4>
                              {typeof mealContent === 'object' && (
                                <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                                  {mealContent.calories || 0} kcal
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-300 mt-1">
                              {typeof mealContent === 'string' 
                                ? mealContent 
                                : typeof mealContent === 'object'
                                  ? mealContent.food || safeRender(mealContent)
                                  : safeRender(mealContent)}
                            </p>
                          </div>
                        ))
                    ) : (
                      // Si c'est une chaîne de caractères ou autre chose
                      <div className="p-3 bg-black/40 rounded-lg">
                        <p className="text-gray-300">
                          {typeof generatedPlan.trainingDayPlan === 'string' 
                            ? generatedPlan.trainingDayPlan 
                            : typeof generatedPlan.trainingDayPlan === 'object' && Object.keys(generatedPlan.trainingDayPlan).length === 0
                              ? "Aucun détail disponible pour les jours d'entraînement."
                              : "Aucun détail disponible pour les jours d'entraînement."}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Jour de repos */}
                <div className="p-4 bg-black/50 rounded-lg border border-red-500/20">
                  <h3 className="text-xl font-semibold mb-3">Jour de repos</h3>
                  <div className="space-y-3">
                    {generatedPlan.restDayPlan && typeof generatedPlan.restDayPlan === 'object' ? (
                      // Si c'est un objet avec des propriétés meal/calories
                      Object.entries(generatedPlan.restDayPlan).some(([_, value]) => typeof value === 'object' && value.meal) ? 
                        Object.entries(generatedPlan.restDayPlan).map(([mealName, mealInfo]: [string, any]) => (
                          <div key={mealName} className="p-3 bg-black/40 rounded-lg">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium capitalize">{mealName}</h4>
                              <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                                {mealInfo.calories} kcal
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-300 mt-1">
                              {typeof mealInfo.meal === 'string' ? mealInfo.meal : safeRender(mealInfo.meal)}
                            </p>
                          </div>
                        )) : 
                        // Si c'est un objet avec des chaînes de caractères directement
                        Object.entries(generatedPlan.restDayPlan).map(([mealName, mealContent]: [string, any]) => (
                          <div key={mealName} className="p-3 bg-black/40 rounded-lg">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium capitalize">{mealName}</h4>
                              {typeof mealContent === 'object' && (
                                <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                                  {mealContent.calories || 0} kcal
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-300 mt-1">
                              {typeof mealContent === 'string' 
                                ? mealContent 
                                : typeof mealContent === 'object'
                                  ? mealContent.food || safeRender(mealContent)
                                  : safeRender(mealContent)}
                            </p>
                          </div>
                        ))
                    ) : (
                      // Si c'est une chaîne de caractères ou autre chose
                      <div className="p-3 bg-black/40 rounded-lg">
                        <p className="text-gray-300">
                          {typeof generatedPlan.restDayPlan === 'string' 
                            ? generatedPlan.restDayPlan 
                            : typeof generatedPlan.restDayPlan === 'object' && Object.keys(generatedPlan.restDayPlan).length === 0
                              ? "Aucun détail disponible pour les jours de repos."
                              : "Aucun détail disponible pour les jours de repos."}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Aliments recommandés */}
              <div className="p-4 bg-black/50 rounded-lg border border-red-500/20">
                <h3 className="text-xl font-semibold mb-3">Aliments recommandés</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {generatedPlan.recommendedFoods && typeof generatedPlan.recommendedFoods === 'object' ? (
                    // Si c'est un objet avec des tableaux ou des chaînes de caractères
                    Object.entries(generatedPlan.recommendedFoods).map(([category, foods]: [string, any]) => (
                      <div key={category} className="p-3 bg-black/40 rounded-lg">
                        <h4 className="font-medium capitalize mb-2">{category}</h4>
                        <ul className="text-sm space-y-1">
                          {Array.isArray(foods) ? (
                            // Si c'est un tableau
                            foods.map((food, index) => (
                              <li key={index} className="text-gray-300">• {typeof food === 'string' ? food : safeRender(food)}</li>
                            ))
                          ) : typeof foods === 'string' ? (
                            // Si c'est une chaîne de caractères
                            foods.split(',').map((food, index) => (
                              <li key={index} className="text-gray-300">• {typeof food === 'string' ? food : safeRender(food)}</li>
                            ))
                          ) : (
                            <li className="text-gray-300">• Information non disponible</li>
                          )}
                        </ul>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 bg-black/40 rounded-lg col-span-2 md:col-span-5">
                      <p className="text-gray-300">
                        {typeof generatedPlan.recommendedFoods === 'string' 
                          ? generatedPlan.recommendedFoods 
                          : "Aucune recommandation d'aliments disponible."}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Hydratation */}
              <div className="p-4 bg-black/50 rounded-lg border border-blue-500/20">
                <h3 className="text-xl font-semibold mb-3">Plan d'hydratation</h3>
                {typeof generatedPlan.hydrationPlan === 'string' ? (
                  // Si c'est une chaîne de caractères
                  <div className="p-3 bg-black/40 rounded-lg">
                    <p className="text-gray-300">{typeof generatedPlan.hydrationPlan === 'string' ? generatedPlan.hydrationPlan : safeRender(generatedPlan.hydrationPlan)}</p>
                  </div>
                ) : typeof generatedPlan.hydrationPlan === 'object' ? (
                  // Si c'est un objet
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {Object.entries(generatedPlan.hydrationPlan).map(([time, amount]: [string, any]) => (
                      <div key={time} className="p-3 bg-black/40 rounded-lg">
                        <h4 className="font-medium capitalize">{time.replace(/([A-Z])/g, ' $1').trim()}</h4>
                        {Array.isArray(amount) ? (
                          <ul className="space-y-1 mt-2">
                            {amount.map((tip, index) => (
                              <li key={index} className="text-blue-400 text-sm">• {typeof tip === 'string' ? tip : safeRender(tip)}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-blue-400 font-semibold">{typeof amount === 'string' ? amount : safeRender(amount)}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  // Fallback
                  <div className="p-3 bg-black/40 rounded-lg">
                    <p className="text-gray-300">Objectif d'hydratation: 2-3 litres d'eau par jour</p>
                  </div>
                )}
              </div>

              {/* Stratégies nutritionnelles */}
              <div className="p-4 bg-black/50 rounded-lg border border-red-500/20">
                <h3 className="text-xl font-semibold mb-3">Stratégies nutritionnelles</h3>
                {Array.isArray(generatedPlan.nutritionStrategies) ? (
                  // Si c'est un tableau
                  <ul className="space-y-2">
                    {generatedPlan.nutritionStrategies.map((strategy, index) => (
                      <li key={index} className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-red-600 to-orange-500 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                          <span className="text-white font-medium text-xs">{index + 1}</span>
                        </div>
                        <p className="text-gray-300">{typeof strategy === 'string' ? strategy : safeRender(strategy)}</p>
                      </li>
                    ))}
                  </ul>
                ) : typeof generatedPlan.nutritionStrategies === 'string' ? (
                  // Si c'est une chaîne de caractères
                  <div className="bg-black/30 p-4 rounded-lg">
                    <p className="text-gray-300 whitespace-pre-line">{safeRender(generatedPlan.nutritionStrategies)}</p>
                  </div>
                ) : (
                  // Fallback
                  <p className="text-gray-300">Aucune stratégie nutritionnelle spécifique disponible.</p>
                )}
              </div>

              {/* Conseils d'expert */}
              <div className="p-4 bg-black/50 rounded-lg border border-yellow-500/20">
                <h3 className="text-xl font-semibold mb-3">Conseils d'expert</h3>
                {Array.isArray(generatedPlan.expertTips) ? (
                  // Si c'est un tableau
                  <ul className="space-y-3">
                    {generatedPlan.expertTips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-yellow-500 mr-2">💡</span>
                        <p className="text-gray-300">{typeof tip === 'string' ? tip : safeRender(tip)}</p>
                      </li>
                    ))}
                  </ul>
                ) : typeof generatedPlan.expertTips === 'string' ? (
                  // Si c'est une chaîne de caractères
                  <div className="bg-black/30 p-4 rounded-lg">
                    <p className="text-gray-300 whitespace-pre-line">{safeRender(generatedPlan.expertTips)}</p>
                  </div>
                ) : (
                  // Fallback
                  <div className="flex items-start">
                    <span className="text-yellow-500 mr-2">💡</span>
                    <p className="text-gray-300">Consultez un professionnel de la nutrition pour des conseils personnalisés.</p>
                  </div>
                )}
              </div>
            </div>

            <Button onClick={downloadPlan} className="w-full">
              Télécharger mon plan nutritionnel
            </Button>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
} 