'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, Check, Salad, Activity, Utensils, Heart, Moon, Clock, BarChart, Droplet } from 'lucide-react';
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
    <div className="container mx-auto py-8 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#A590DC]/10 flex items-center justify-center mr-4">
            <Salad className="h-6 w-6 text-[#A590DC]" />
          </div>
          <div>
            <h1 className="text-2xl font-medium text-[#2A303D]">Plan Nutritionnel Personnalisé</h1>
            <p className="text-[#6C7080]">
              Créez votre plan alimentaire adapté à vos besoins, préférences et objectifs
            </p>
          </div>
        </div>
      </motion.div>

      <Tabs
        defaultValue="new"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-8 bg-[#F5F2FC] p-1 rounded-xl">
          <TabsTrigger 
            value="new" 
            className="rounded-lg data-[state=active]:bg-[#A590DC] data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            Nouveau Plan
          </TabsTrigger>
          <TabsTrigger 
            value="history" 
            className="rounded-lg data-[state=active]:bg-[#A590DC] data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            Historique
          </TabsTrigger>
        </TabsList>

        <TabsContent value="new" className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Section Données Biométriques */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card className="border border-[#E2D9F3] shadow-sm bg-white">
                    <CardHeader className="pb-4 border-b border-[#E2D9F3]">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-[#A590DC]/10 flex items-center justify-center mr-3">
                          <BarChart className="h-4 w-4 text-[#A590DC]" />
                        </div>
                        <CardTitle className="text-lg font-medium text-[#2A303D]">Données Biométriques</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="age"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#2A303D]/80">Âge</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="30"
                                  {...field}
                                  className="bg-[#F8F7FC] border-[#E2D9F3] focus:border-[#A590DC] focus:ring-[#A590DC]/20"
                                />
                              </FormControl>
                              <FormMessage className="text-[#E57373]" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="gender"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#2A303D]/80">Genre</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-[#F8F7FC] border-[#E2D9F3] focus:ring-[#A590DC]/20">
                                    <SelectValue placeholder="Sélectionnez votre genre" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white border-[#E2D9F3]">
                                  <SelectItem value="homme">Homme</SelectItem>
                                  <SelectItem value="femme">Femme</SelectItem>
                                  <SelectItem value="autre">Autre</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage className="text-[#E57373]" />
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
                              <FormLabel className="text-[#2A303D]/80">Poids (kg)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="75"
                                  {...field}
                                  className="bg-[#F8F7FC] border-[#E2D9F3] focus:border-[#A590DC] focus:ring-[#A590DC]/20"
                                />
                              </FormControl>
                              <FormMessage className="text-[#E57373]" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="height"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#2A303D]/80">Taille (cm)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="175"
                                  {...field}
                                  className="bg-[#F8F7FC] border-[#E2D9F3] focus:border-[#A590DC] focus:ring-[#A590DC]/20"
                                />
                              </FormControl>
                              <FormMessage className="text-[#E57373]" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="bodyFatPercentage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#2A303D]/80">Pourcentage de graisse corporelle (optionnel)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="15"
                                {...field}
                                className="bg-[#F8F7FC] border-[#E2D9F3] focus:border-[#A590DC] focus:ring-[#A590DC]/20"
                              />
                            </FormControl>
                            <FormDescription className="text-[#6C7080] text-xs">
                              Laissez vide si vous ne connaissez pas cette valeur
                            </FormDescription>
                            <FormMessage className="text-[#E57373]" />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Section Activité Physique */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="border border-[#E2D9F3] shadow-sm bg-white">
                    <CardHeader className="pb-4 border-b border-[#E2D9F3]">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-[#A590DC]/10 flex items-center justify-center mr-3">
                          <Activity className="h-4 w-4 text-[#A590DC]" />
                        </div>
                        <CardTitle className="text-lg font-medium text-[#2A303D]">Activité Physique</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                      <FormField
                        control={form.control}
                        name="activityLevel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#2A303D]/80">Niveau d'activité général</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-[#F8F7FC] border-[#E2D9F3] focus:ring-[#A590DC]/20">
                                  <SelectValue placeholder="Sélectionnez votre niveau d'activité" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-white border-[#E2D9F3]">
                                {activityLevelOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-[#E57373]" />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="trainingFrequency"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#2A303D]/80">Fréquence d'entraînement (par semaine)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  {...field}
                                  className="bg-[#F8F7FC] border-[#E2D9F3] focus:border-[#A590DC] focus:ring-[#A590DC]/20"
                                />
                              </FormControl>
                              <FormMessage className="text-[#E57373]" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="trainingDuration"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#2A303D]/80">Durée moyenne (minutes)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  {...field}
                                  className="bg-[#F8F7FC] border-[#E2D9F3] focus:border-[#A590DC] focus:ring-[#A590DC]/20"
                                />
                              </FormControl>
                              <FormMessage className="text-[#E57373]" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="trainingType"
                        render={() => (
                          <FormItem>
                            <div className="mb-2">
                              <FormLabel className="text-[#2A303D]/80">Types d'entraînement</FormLabel>
                              <FormDescription className="text-[#6C7080] text-xs">
                                Sélectionnez tous ceux qui s'appliquent
                              </FormDescription>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              {trainingTypeOptions.map((option) => (
                                <FormField
                                  key={option.id}
                                  control={form.control}
                                  name="trainingType"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={option.id}
                                        className="flex flex-row items-center space-x-2 space-y-0 rounded-md bg-[#F8F7FC] p-3"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(option.id)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...field.value, option.id])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) => value !== option.id
                                                    )
                                                  )
                                            }}
                                            className="data-[state=checked]:bg-[#A590DC] data-[state=checked]:border-[#A590DC]"
                                          />
                                        </FormControl>
                                        <FormLabel className="text-[#2A303D]/80 text-sm font-normal cursor-pointer">
                                          {option.label}
                                        </FormLabel>
                                      </FormItem>
                                    )
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage className="text-[#E57373]" />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Objectifs et Préférences */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Card className="border border-[#E2D9F3] shadow-sm bg-white">
                    <CardHeader className="pb-4 border-b border-[#E2D9F3]">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-[#A590DC]/10 flex items-center justify-center mr-3">
                          <Heart className="h-4 w-4 text-[#A590DC]" />
                        </div>
                        <CardTitle className="text-lg font-medium text-[#2A303D]">Objectifs</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                      <FormField
                        control={form.control}
                        name="goal"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-[#2A303D]/80">Objectif principal</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                {goalOptions.map((option) => (
                                  <div key={option.value} className="flex items-center space-x-2 rounded-md bg-[#F8F7FC] p-3">
                                    <RadioGroupItem 
                                      value={option.value} 
                                      id={option.value}
                                      className="border-[#A590DC] text-[#A590DC]"
                                    />
                                    <label htmlFor={option.value} className="text-[#2A303D]/90 text-sm cursor-pointer">
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage className="text-[#E57373]" />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Section Préférences Alimentaires */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Card className="border border-[#E2D9F3] shadow-sm bg-white">
                    <CardHeader className="pb-4 border-b border-[#E2D9F3]">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-[#A590DC]/10 flex items-center justify-center mr-3">
                          <Utensils className="h-4 w-4 text-[#A590DC]" />
                        </div>
                        <CardTitle className="text-lg font-medium text-[#2A303D]">Préférences Alimentaires</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                      <FormField
                        control={form.control}
                        name="dietaryPreferences"
                        render={() => (
                          <FormItem>
                            <div className="mb-2">
                              <FormLabel className="text-[#2A303D]/80">Préférences alimentaires</FormLabel>
                              <FormDescription className="text-[#6C7080] text-xs">
                                Sélectionnez tous ceux qui s'appliquent
                              </FormDescription>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              {dietaryPreferencesOptions.map((option) => (
                                <FormField
                                  key={option.id}
                                  control={form.control}
                                  name="dietaryPreferences"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={option.id}
                                        className="flex flex-row items-center space-x-2 space-y-0 rounded-md bg-[#F8F7FC] p-3"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(option.id)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...field.value, option.id])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) => value !== option.id
                                                    )
                                                  )
                                            }}
                                            className="data-[state=checked]:bg-[#A590DC] data-[state=checked]:border-[#A590DC]"
                                          />
                                        </FormControl>
                                        <FormLabel className="text-[#2A303D]/80 text-sm font-normal cursor-pointer">
                                          {option.label}
                                        </FormLabel>
                                      </FormItem>
                                    )
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage className="text-[#E57373]" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="excludedFoods"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#2A303D]/80">Aliments à exclure</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Ex: lactose, fruits de mer, arachides..."
                                className="bg-[#F8F7FC] border-[#E2D9F3] focus:border-[#A590DC] focus:ring-[#A590DC]/20 min-h-[80px]"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription className="text-[#6C7080] text-xs">
                              Séparés par des virgules
                            </FormDescription>
                            <FormMessage className="text-[#E57373]" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="mealsPerDay"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#2A303D]/80">Nombre de repas par jour</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                className="bg-[#F8F7FC] border-[#E2D9F3] focus:border-[#A590DC] focus:ring-[#A590DC]/20"
                              />
                            </FormControl>
                            <FormMessage className="text-[#E57373]" />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Habitudes et Données Médicales */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Card className="border border-[#E2D9F3] shadow-sm bg-white">
                  <CardHeader className="pb-4 border-b border-[#E2D9F3]">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[#A590DC]/10 flex items-center justify-center mr-3">
                        <Moon className="h-4 w-4 text-[#A590DC]" />
                      </div>
                      <CardTitle className="text-lg font-medium text-[#2A303D]">Habitudes et Santé</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="sleepHours"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#2A303D]/80">Heures de sommeil par nuit</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                className="bg-[#F8F7FC] border-[#E2D9F3] focus:border-[#A590DC] focus:ring-[#A590DC]/20"
                              />
                            </FormControl>
                            <FormMessage className="text-[#E57373]" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="stressLevel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#2A303D]/80">Niveau de stress</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-[#F8F7FC] border-[#E2D9F3] focus:ring-[#A590DC]/20">
                                  <SelectValue placeholder="Niveau de stress" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-white border-[#E2D9F3]">
                                <SelectItem value="faible">Faible</SelectItem>
                                <SelectItem value="modéré">Modéré</SelectItem>
                                <SelectItem value="élevé">Élevé</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-[#E57373]" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="allergies"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#2A303D]/80">Allergies (optionnel)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Ex: arachides, lait, œufs..."
                              className="bg-[#F8F7FC] border-[#E2D9F3] focus:border-[#A590DC] focus:ring-[#A590DC]/20 min-h-[80px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-[#6C7080] text-xs">
                            Séparées par des virgules
                          </FormDescription>
                          <FormMessage className="text-[#E57373]" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="medicalConditions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#2A303D]/80">Conditions médicales (optionnel)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Ex: diabète, hypertension..."
                              className="bg-[#F8F7FC] border-[#E2D9F3] focus:border-[#A590DC] focus:ring-[#A590DC]/20 min-h-[80px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-[#6C7080] text-xs">
                            Séparées par des virgules
                          </FormDescription>
                          <FormMessage className="text-[#E57373]" />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </motion.div>

              {/* Token Cost and Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-col md:flex-row items-center justify-between p-4 rounded-lg bg-[#F5F2FC] border border-[#E2D9F3]"
              >
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center mb-1">
                    <Droplet className="h-4 w-4 text-[#A590DC] mr-2" />
                    <p className="text-[#2A303D] font-medium">Coût: 5 tokens</p>
                  </div>
                  <p className="text-[#6C7080] text-xs">Votre solde: {stats?.tokensRemaining || 0} tokens</p>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isGenerating || (stats?.tokensRemaining || 0) < 5}
                  className="bg-[#A590DC] hover:bg-[#8A72CA] text-white px-6 min-w-[180px]"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Génération en cours...
                    </>
                  ) : (
                    "Générer mon plan"
                  )}
                </Button>
              </motion.div>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="history">
          <div className="py-12 text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 rounded-full bg-[#F5F2FC] flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-[#A590DC]" />
              </div>
              <h3 className="text-lg font-medium text-[#2A303D] mb-2">Historique des plans vide</h3>
              <p className="text-[#6C7080] max-w-md mb-6">
                Vous n'avez pas encore généré de plan nutritionnel. Créez votre premier plan pour qu'il apparaisse ici.
              </p>
              <Button 
                onClick={() => setActiveTab('new')}
                className="bg-[#A590DC] hover:bg-[#8A72CA] text-white"
              >
                Créer un plan
              </Button>
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>

      {generatedPlan && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          <Card className="border border-[#E2D9F3] shadow-sm bg-white">
            <CardHeader className="pb-3 border-b border-[#E2D9F3]">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#A590DC]/10 flex items-center justify-center mr-3">
                    <Check className="h-4 w-4 text-[#A590DC]" />
                  </div>
                  <CardTitle className="text-lg font-medium text-[#2A303D]">
                    Votre Plan Personnalisé
                  </CardTitle>
                </div>
                <Button
                  onClick={downloadPlan}
                  variant="outline"
                  className="text-[#A590DC] border-[#E2D9F3] hover:bg-[#F5F2FC] hover:text-[#8A72CA]"
                >
                  Télécharger
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {/* Le contenu du plan généré sera affiché ici */}
              <div className="prose max-w-none">
                <pre className="rounded-lg bg-[#F8F7FC] p-4 overflow-auto text-[#2A303D] text-sm">
                  {JSON.stringify(generatedPlan, null, 2)}
                </pre>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
} 