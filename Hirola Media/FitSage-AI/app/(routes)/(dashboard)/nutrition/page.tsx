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
      
      // Appel à l'API avec gestion du timeout et des erreurs réseau
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 50000); // Timeout de 50 secondes (augmenté)
      
      try {
        const response = await fetch('/api/nutrition', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formattedData),
          cache: 'no-store',
          signal: controller.signal
        });
        
        clearTimeout(timeoutId); // Nettoyer le timeout
        
        if (!response.ok) {
          let errorMessage = `Erreur serveur (${response.status})`;
          
          try {
            const errorData = await response.json();
            errorMessage = errorData.error || errorMessage;
          } catch (err) {
            console.error('Erreur lors du parsing de la réponse d\'erreur:', err);
          }
          
          if (response.status === 500) {
            console.error('Erreur 500 détectée, détails:', errorMessage);
            throw new Error('Le serveur a rencontré une erreur interne. Veuillez réessayer plus tard.');
          }
          
          throw new Error(errorMessage);
        }
        
        // Traiter la réponse avec gestion des erreurs
        let responseData;
        try {
          responseData = await response.json();
        } catch (err) {
          console.error('Erreur lors du parsing de la réponse JSON:', err);
          throw new Error('Format de réponse invalide');
        }
        
        if (!responseData.success) {
          throw new Error(responseData.error || 'Erreur inconnue lors de la génération');
        }
        
        // Stocker le plan nutritionnel généré
        setGeneratedPlan(responseData.nutritionProgram);
        
        // Notification de succès
        toast({
          title: "Plan nutritionnel généré avec succès",
          description: "Votre plan nutritionnel personnalisé est prêt !",
          variant: "success",
        });
      } catch (fetchError) {
        // Gérer spécifiquement les erreurs de timeout
        if (fetchError.name === 'AbortError') {
          console.error('Timeout pendant la génération du plan nutritionnel');
          throw new Error('La requête a pris trop de temps. Veuillez réessayer plus tard.');
        }
        throw fetchError;
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
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">Nutrition Personnalisée</h1>
        <p className="text-white">
          Générez un plan nutritionnel complet et personnalisé basé sur vos objectifs et votre profil
        </p>
        <p className="text-sm text-white">
          <span className="font-semibold">Coût :</span> 3 tokens par génération. Tokens disponibles : {stats?.tokensRemaining || 0}
        </p>
      </div>

      {!generatedPlan ? (
        <Card className="bg-black/40 backdrop-blur-sm border border-primary-light/20">
          <CardHeader>
            <CardTitle>Créer un nouveau plan nutritionnel</CardTitle>
            <CardDescription className="text-white">
              Remplissez le formulaire ci-dessous pour générer un plan nutritionnel personnalisé adapté à vos besoins
              <span className="block mt-1 text-primary-light">Coût : 3 tokens par génération. Tokens disponibles : {stats?.tokensRemaining || 0}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-6">
                  {/* Section Données Biométriques */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Données Biométriques</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Âge</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="30" {...field} />
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
                            <FormLabel>Genre</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionnez votre genre" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="homme">Homme</SelectItem>
                                <SelectItem value="femme">Femme</SelectItem>
                                <SelectItem value="autre">Autre</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="weight"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Poids (kg)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="75" {...field} />
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
                            <FormLabel>Taille (cm)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="175" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  {/* Section Activité Physique */}
                  <div className="pt-4">
                    <h3 className="text-lg font-medium mb-4">Activité Physique</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="activityLevel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Niveau d'activité quotidien</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionnez votre niveau d'activité" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
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
                            <FormLabel>Fréquence d'entraînement (jours/semaine)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="3" min="0" max="7" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="trainingDuration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Durée moyenne des entraînements (minutes)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="60" min="0" {...field} />
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
                              <FormLabel>Types d'entraînement</FormLabel>
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
                                      <FormLabel className="font-normal cursor-pointer">
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
                  </div>
                  
                  {/* Section Objectifs */}
                  <div className="pt-4">
                    <h3 className="text-lg font-medium mb-4">Objectifs</h3>
                    <div className="grid grid-cols-1 gap-6">
                      <FormField
                        control={form.control}
                        name="goal"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Objectif principal</FormLabel>
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
                                    <FormLabel className="font-normal cursor-pointer">
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
                  </div>
                  
                  {/* Section Préférences Alimentaires */}
                  <div className="pt-4">
                    <h3 className="text-lg font-medium mb-4">Préférences Alimentaires</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="dietaryPreferences"
                        render={() => (
                          <FormItem>
                            <div className="mb-2">
                              <FormLabel>Préférences alimentaires</FormLabel>
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
                                      <FormLabel className="font-normal cursor-pointer">
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
                              <FormLabel>Aliments à exclure</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Entrez les aliments séparés par des virgules"
                                  className="resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription className="text-white">
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
                              <FormLabel>Nombre de repas par jour</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="3" min="2" max="8" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Section Informations Supplémentaires */}
                  <div className="pt-4">
                    <h3 className="text-lg font-medium mb-4">Informations Supplémentaires</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="allergies"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Allergies</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Entrez vos allergies séparées par des virgules"
                                className="resize-none"
                                {...field}
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
                            <FormLabel>Conditions médicales</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Entrez vos conditions médicales séparées par des virgules"
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription className="text-white">
                              Ex: diabète, hypertension...
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="sleepHours"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Heures de sommeil par nuit</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="7" min="3" max="12" {...field} />
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
                            <FormLabel>Niveau de stress</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionnez votre niveau de stress" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
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
                  </div>
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
      ) : (
        <Card className="bg-black/40 backdrop-blur-sm border border-purple-500/20">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{generatedPlan.title}</CardTitle>
              <div className="flex gap-2">
                <Button onClick={downloadPlan}>
                  Télécharger le plan
                </Button>
                <Button variant="outline" onClick={() => setGeneratedPlan(null)}>
                  Créer un nouveau plan
                </Button>
              </div>
            </div>
            <CardDescription className="text-white">
              {generatedPlan.summary}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Objectifs et métabolisme</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-black/30 rounded-lg">
                  <p className="text-sm text-white">Calories quotidiennes</p>
                  <p className="text-2xl font-bold">{generatedPlan.adjustedCalories} kcal</p>
                </div>
                <div className="p-4 bg-black/30 rounded-lg">
                  <p className="text-sm text-white">Métabolisme de base</p>
                  <p className="text-2xl font-bold">{generatedPlan.basalMetabolicRate} kcal</p>
                </div>
                <div className="p-4 bg-black/30 rounded-lg">
                  <p className="text-sm text-white">Dépense énergétique</p>
                  <p className="text-2xl font-bold">{generatedPlan.totalDailyEnergyExpenditure} kcal</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Distribution des macronutriments</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-black/30 rounded-lg">
                  <p className="text-sm text-white">Protéines</p>
                  <p className="text-2xl font-bold">{generatedPlan.macroDistribution.protein.grams}g</p>
                  <p className="text-xs text-white">{generatedPlan.macroDistribution.protein.percentage}% des calories</p>
                </div>
                <div className="p-4 bg-black/30 rounded-lg">
                  <p className="text-sm text-white">Glucides</p>
                  <p className="text-2xl font-bold">{generatedPlan.macroDistribution.carbs.grams}g</p>
                  <p className="text-xs text-white">{generatedPlan.macroDistribution.carbs.percentage}% des calories</p>
                </div>
                <div className="p-4 bg-black/30 rounded-lg">
                  <p className="text-sm text-white">Lipides</p>
                  <p className="text-2xl font-bold">{generatedPlan.macroDistribution.fats.grams}g</p>
                  <p className="text-xs text-white">{generatedPlan.macroDistribution.fats.percentage}% des calories</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Plans alimentaires journaliers</h3>
              <Tabs defaultValue="training">
                <TabsList>
                  <TabsTrigger value="training">Jour d'entraînement</TabsTrigger>
                  <TabsTrigger value="rest">Jour de repos</TabsTrigger>
                </TabsList>
                
                <TabsContent value="training" className="mt-4 space-y-4">
                  <div className="p-4 bg-black/30 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-medium">Calories totales</p>
                      <p className="font-bold">{generatedPlan.trainingDayPlan.calorieTarget} kcal</p>
                    </div>
                    <p className="text-sm text-white mb-4">{generatedPlan.trainingDayPlan.notes}</p>
                    
                    <div className="space-y-4">
                      {generatedPlan.trainingDayPlan.meals && generatedPlan.trainingDayPlan.meals.length > 0 ? (
                        generatedPlan.trainingDayPlan.meals.map((meal, index) => (
                          <div key={index} className="border border-gray-800 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-medium">{meal.meal.name} <span className="text-white text-sm">({meal.meal.time})</span></h4>
                              <Badge variant="secondary">{meal.calorieTotal} kcal</Badge>
                            </div>
                            <p className="text-sm text-white mb-3">{meal.meal.purpose}</p>
                            
                            <div className="space-y-2">
                              {meal.recommendedFoods && meal.recommendedFoods.map((food, foodIndex) => (
                                <div key={foodIndex} className="flex justify-between items-center text-sm border-b border-gray-800 pb-1 last:border-0">
                                  <div>
                                    <span>{food.name}</span>
                                    <span className="text-white text-xs ml-2">({food.category})</span>
                                  </div>
                                  <span>{meal.portions[food.name] || food.servingSize}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center p-6 border border-dashed border-gray-700 rounded-lg">
                          <p className="text-white">Le plan détaillé des repas n'est pas disponible. Consultez les recommandations alimentaires ci-dessous.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="rest" className="mt-4 space-y-4">
                  <div className="p-4 bg-black/30 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-medium">Calories totales</p>
                      <p className="font-bold">{generatedPlan.restDayPlan.calorieTarget} kcal</p>
                    </div>
                    <p className="text-sm text-white mb-4">{generatedPlan.restDayPlan.notes}</p>
                    
                    <div className="space-y-4">
                      {generatedPlan.restDayPlan.meals && generatedPlan.restDayPlan.meals.length > 0 ? (
                        generatedPlan.restDayPlan.meals.map((meal, index) => (
                          <div key={index} className="border border-gray-800 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-medium">{meal.meal.name} <span className="text-white text-sm">({meal.meal.time})</span></h4>
                              <Badge variant="secondary">{meal.calorieTotal} kcal</Badge>
                            </div>
                            <p className="text-sm text-white mb-3">{meal.meal.purpose}</p>
                            
                            <div className="space-y-2">
                              {meal.recommendedFoods && meal.recommendedFoods.map((food, foodIndex) => (
                                <div key={foodIndex} className="flex justify-between items-center text-sm border-b border-gray-800 pb-1 last:border-0">
                                  <div>
                                    <span>{food.name}</span>
                                    <span className="text-white text-xs ml-2">({food.category})</span>
                                  </div>
                                  <span>{meal.portions[food.name] || food.servingSize}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center p-6 border border-dashed border-gray-700 rounded-lg">
                          <p className="text-white">Le plan détaillé des repas n'est pas disponible. Consultez les recommandations alimentaires ci-dessous.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Aliments recommandés</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-black/30 rounded-lg">
                  <h4 className="font-medium mb-2">Sources de protéines</h4>
                  <ul className="space-y-1 text-sm">
                    {generatedPlan.recommendedFoods?.proteins?.map((food, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{food.name}</span>
                        <span className="text-white">{food.servingSize}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-black/30 rounded-lg">
                  <h4 className="font-medium mb-2">Sources de glucides</h4>
                  <ul className="space-y-1 text-sm">
                    {generatedPlan.recommendedFoods?.carbs?.map((food, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{food.name}</span>
                        <span className="text-white">{food.servingSize}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-black/30 rounded-lg">
                  <h4 className="font-medium mb-2">Sources de lipides</h4>
                  <ul className="space-y-1 text-sm">
                    {generatedPlan.recommendedFoods?.fats?.map((food, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{food.name}</span>
                        <span className="text-white">{food.servingSize}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-black/30 rounded-lg">
                  <h4 className="font-medium mb-2">Légumes</h4>
                  <ul className="space-y-1 text-sm">
                    {generatedPlan.recommendedFoods?.vegetables?.map((food, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{food.name}</span>
                        <span className="text-white">{food.servingSize}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-black/30 rounded-lg">
                  <h4 className="font-medium mb-2">Fruits</h4>
                  <ul className="space-y-1 text-sm">
                    {generatedPlan.recommendedFoods?.fruits?.map((food, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{food.name}</span>
                        <span className="text-white">{food.servingSize}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Plan d'hydratation</h3>
              <div className="p-4 bg-black/30 rounded-lg">
                <p className="font-medium">Consommation d'eau quotidienne: {generatedPlan.hydrationPlan.dailyWaterIntake} litres</p>
                <p className="text-sm text-white mt-2">{generatedPlan.hydrationPlan.timingRecommendations}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Conseils et stratégies</h3>
              <div className="p-4 bg-black/30 rounded-lg">
                <ul className="list-disc list-inside space-y-2">
                  {generatedPlan.nutritionStrategies && Array.isArray(generatedPlan.nutritionStrategies) && generatedPlan.nutritionStrategies.map((strategy, index) => (
                    <li key={index} className="text-sm">
                      {typeof strategy === 'string' 
                        ? strategy 
                        : (strategy.title ? 
                            <div>
                              <span className="font-medium">{strategy.title}:</span> {strategy.description}
                            </div> 
                            : JSON.stringify(strategy))
                      }
                    </li>
                  ))}
                  {generatedPlan.expertTips && generatedPlan.expertTips.map((tip, index) => (
                    <li key={index} className="text-sm">{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 