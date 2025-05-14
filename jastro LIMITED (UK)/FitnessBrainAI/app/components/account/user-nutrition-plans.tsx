'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Skeleton } from '@/app/components/ui/skeleton';
import { Download, Eye, Trash2, Share } from 'lucide-react';
import { useToast } from '@/app/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/app/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/app/components/ui/alert-dialog';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { getUserNutritionPlans } from '@/app/lib/client/nutrition-service';
import { NutritionProgram } from '@/app/lib/types/coach/nutrition';

export default function UserNutritionPlans() {
  const [plans, setPlans] = useState<NutritionProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [viewPlan, setViewPlan] = useState<NutritionProgram | null>(null);
  const [deletePlanId, setDeletePlanId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/nutrition/user');
        if (response.ok) {
          const data = await response.json();
          setPlans(Array.isArray(data.nutritionPlans) ? data.nutritionPlans : []);
        } else {
          toast({
            title: "Erreur",
            description: "Impossible de charger vos plans nutritionnels",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error fetching nutrition plans:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [toast]);

  const handleDeletePlan = async () => {
    if (!deletePlanId) return;
    
    try {
      const response = await fetch(`/api/nutrition/${deletePlanId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setPlans(plans.filter(plan => plan.userId !== deletePlanId));
        toast({
          title: "Plan supprimé",
          description: "Le plan nutritionnel a été supprimé avec succès",
        });
      } else {
        toast({
          title: "Erreur",
          description: "Impossible de supprimer le plan nutritionnel",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error deleting nutrition plan:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression",
        variant: "destructive",
      });
    }
    
    setDeletePlanId(null);
  };

  const handleDownload = (plan: NutritionProgram) => {
    // Préparation du contenu pour le téléchargement
    const content = `
${plan.title}
Créé le: ${new Date(plan.createdAt).toLocaleDateString('fr-FR')}

RÉSUMÉ DU PROGRAMME
------------------
${plan.summary}

OBJECTIF: ${plan.goal}
Durée recommandée: ${plan.duration} semaines

MÉTRIQUES MÉTABOLIQUES
---------------------
Métabolisme de base (BMR): ${plan.basalMetabolicRate} calories
Dépense énergétique totale (TDEE): ${plan.totalDailyEnergyExpenditure} calories
Objectif calorique quotidien: ${plan.adjustedCalories} calories

MACRONUTRIMENTS
--------------
Protéines: ${plan.macroDistribution.protein.grams}g (${plan.macroDistribution.protein.percentage}%)
Glucides: ${plan.macroDistribution.carbs.grams}g (${plan.macroDistribution.carbs.percentage}%)
Lipides: ${plan.macroDistribution.fats.grams}g (${plan.macroDistribution.fats.percentage}%)

PLAN JOURNALIER D'ENTRAÎNEMENT
-----------------------------
${plan.trainingDayPlan.meals.map(meal => `
- ${meal.meal.name} (${meal.meal.time}):
  ${meal.recommendedFoods.map(food => `  * ${food.name}: ${food.servingSize}`).join('\n')}
  Total: ${meal.calorieTotal} calories
`).join('\n')}

PLAN JOURNALIER DE REPOS
-----------------------
${plan.restDayPlan.meals.map(meal => `
- ${meal.meal.name} (${meal.meal.time}):
  ${meal.recommendedFoods.map(food => `  * ${food.name}: ${food.servingSize}`).join('\n')}
  Total: ${meal.calorieTotal} calories
`).join('\n')}

HYDRATATION
----------
Apport quotidien recommandé: ${plan.hydrationPlan.dailyWaterIntake} litres
${plan.hydrationPlan.timingRecommendations}

CONSEILS D'EXPERT
---------------
${plan.expertTips.join('\n')}

SUIVI DE PROGRESSION
------------------
Métriques à suivre: ${plan.progressTracking.metrics.join(', ')}
Fréquence recommandée: ${plan.progressTracking.frequencyRecommendation}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${plan.title.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <>
      <Card className="bg-black/40 backdrop-blur-sm border border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-gradient-primary">Mes Plans Nutritionnels</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="weight-loss">Perte de poids</TabsTrigger>
              <TabsTrigger value="muscle-gain">Prise de masse</TabsTrigger>
              <TabsTrigger value="health">Santé & Performance</TabsTrigger>
            </TabsList>
            
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[200px]" />
                      <Skeleton className="h-3 w-[120px]" />
                    </div>
                    <div className="flex space-x-2">
                      <Skeleton className="h-9 w-9 rounded-md" />
                      <Skeleton className="h-9 w-9 rounded-md" />
                    </div>
                  </div>
                ))}
              </div>
            ) : plans.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-400">Aucun plan nutritionnel trouvé</p>
                <p className="text-gray-500 text-sm mt-2">
                  Créez un nouveau plan pour commencer votre voyage nutritionnel
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {plans
                  .filter(plan => {
                    if (activeTab === 'all') return true;
                    if (activeTab === 'weight-loss') return plan.goal.includes('perte');
                    if (activeTab === 'muscle-gain') return plan.goal.includes('masse');
                    if (activeTab === 'health') return plan.goal.includes('santé') || plan.goal.includes('performance');
                    return true;
                  })
                  .map(plan => (
                    <div key={plan.userId + plan.createdAt} className="flex flex-wrap md:flex-nowrap items-center justify-between p-4 border border-gray-700/50 bg-gray-800/30 rounded-lg gap-4">
                      <div className="space-y-1 flex-grow">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-medium text-white">{plan.title}</h3>
                          <span className="text-xs px-2 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full">
                            {plan.goal}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-400">
                          <span>
                            {formatDistanceToNow(new Date(plan.createdAt), { 
                              addSuffix: true, 
                              locale: fr 
                            })}
                          </span>
                          <span>{plan.adjustedCalories} kcal/jour</span>
                          <span>{plan.macroDistribution.protein.grams}g de protéines</span>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-auto">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setViewPlan(plan)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          <span className="hidden sm:inline">Voir</span>
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleDownload(plan)}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          <span className="hidden sm:inline">Télécharger</span>
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => setDeletePlanId(plan.userId)}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          <span className="hidden sm:inline">Supprimer</span>
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </Tabs>
        </CardContent>
      </Card>

      {/* Dialogue de visualisation du plan */}
      <Dialog open={viewPlan !== null} onOpenChange={(open) => !open && setViewPlan(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {viewPlan && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{viewPlan.title}</DialogTitle>
                <DialogDescription>
                  Créé {formatDistanceToNow(new Date(viewPlan.createdAt), { 
                    addSuffix: true, 
                    locale: fr 
                  })}
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-6 space-y-6">
                {/* Résumé du plan */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Résumé</h3>
                  <p className="text-gray-400">{viewPlan.summary}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                      <p className="text-gray-400 text-sm">Objectif</p>
                      <p className="font-semibold">{viewPlan.goal}</p>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                      <p className="text-gray-400 text-sm">Calories</p>
                      <p className="font-semibold">{viewPlan.adjustedCalories} kcal</p>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                      <p className="text-gray-400 text-sm">Durée</p>
                      <p className="font-semibold">{viewPlan.duration} semaines</p>
                    </div>
                  </div>
                </div>
                
                {/* Macronutriments */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Macronutriments</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-900/20 p-3 rounded-lg">
                      <p className="text-gray-300 text-sm">Protéines</p>
                      <p className="font-semibold">{viewPlan.macroDistribution.protein.grams}g ({viewPlan.macroDistribution.protein.percentage}%)</p>
                      <p className="text-gray-400 text-xs">{viewPlan.macroDistribution.protein.gramsPerKg}g/kg de poids corporel</p>
                    </div>
                    <div className="bg-green-900/20 p-3 rounded-lg">
                      <p className="text-gray-300 text-sm">Glucides</p>
                      <p className="font-semibold">{viewPlan.macroDistribution.carbs.grams}g ({viewPlan.macroDistribution.carbs.percentage}%)</p>
                      <p className="text-gray-400 text-xs">Min. {viewPlan.macroDistribution.carbs.fiber.minimum}g de fibres</p>
                    </div>
                    <div className="bg-yellow-900/20 p-3 rounded-lg">
                      <p className="text-gray-300 text-sm">Lipides</p>
                      <p className="font-semibold">{viewPlan.macroDistribution.fats.grams}g ({viewPlan.macroDistribution.fats.percentage}%)</p>
                      <p className="text-gray-400 text-xs">Dont {viewPlan.macroDistribution.fats.essentialFats.omega3}g omega-3</p>
                    </div>
                  </div>
                </div>
                
                {/* Plans journaliers */}
                <div className="space-y-4">
                  <Tabs defaultValue="training">
                    <TabsList>
                      <TabsTrigger value="training">Jour d'entraînement</TabsTrigger>
                      <TabsTrigger value="rest">Jour de repos</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="training" className="mt-4 space-y-4">
                      <h3 className="text-lg font-semibold">Plan alimentaire - Jour d'entraînement</h3>
                      
                      {viewPlan.trainingDayPlan.meals.map((meal, index) => (
                        <div key={index} className="bg-gray-800/30 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">{meal.meal.name} <span className="text-gray-400">({meal.meal.time})</span></h4>
                            <span className="text-sm bg-purple-900/40 px-2 py-1 rounded">
                              {meal.calorieTotal} kcal
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-400 mb-3">{meal.meal.purpose}</p>
                          
                          <div className="space-y-2">
                            {meal.recommendedFoods.map((food, foodIndex) => (
                              <div key={foodIndex} className="flex justify-between items-center text-sm border-b border-gray-700/30 pb-1">
                                <div>
                                  <span className="text-gray-200">{food.name}</span>
                                  <span className="text-gray-500 text-xs ml-2">({food.category})</span>
                                </div>
                                <span className="text-gray-400">{food.servingSize}</span>
                              </div>
                            ))}
                          </div>
                          
                          {meal.notes && (
                            <p className="text-sm text-gray-400 mt-3 italic">{meal.notes}</p>
                          )}
                        </div>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="rest" className="mt-4 space-y-4">
                      <h3 className="text-lg font-semibold">Plan alimentaire - Jour de repos</h3>
                      
                      {viewPlan.restDayPlan.meals.map((meal, index) => (
                        <div key={index} className="bg-gray-800/30 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">{meal.meal.name} <span className="text-gray-400">({meal.meal.time})</span></h4>
                            <span className="text-sm bg-purple-900/40 px-2 py-1 rounded">
                              {meal.calorieTotal} kcal
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-400 mb-3">{meal.meal.purpose}</p>
                          
                          <div className="space-y-2">
                            {meal.recommendedFoods.map((food, foodIndex) => (
                              <div key={foodIndex} className="flex justify-between items-center text-sm border-b border-gray-700/30 pb-1">
                                <div>
                                  <span className="text-gray-200">{food.name}</span>
                                  <span className="text-gray-500 text-xs ml-2">({food.category})</span>
                                </div>
                                <span className="text-gray-400">{food.servingSize}</span>
                              </div>
                            ))}
                          </div>
                          
                          {meal.notes && (
                            <p className="text-sm text-gray-400 mt-3 italic">{meal.notes}</p>
                          )}
                        </div>
                      ))}
                    </TabsContent>
                  </Tabs>
                </div>
                
                {/* Hydratation et Suppléments */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Hydratation</h3>
                    <div className="bg-blue-900/20 p-4 rounded-lg">
                      <p className="font-medium">{viewPlan.hydrationPlan.dailyWaterIntake} litres par jour</p>
                      <p className="text-gray-400 text-sm mt-2">{viewPlan.hydrationPlan.timingRecommendations}</p>
                      {viewPlan.hydrationPlan.electrolytesRecommendation && (
                        <p className="text-gray-400 text-sm mt-2">{viewPlan.hydrationPlan.electrolytesRecommendation}</p>
                      )}
                    </div>
                  </div>
                  
                  {viewPlan.supplementRecommendations && (
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">Suppléments recommandés</h3>
                      <div className="bg-purple-900/20 p-4 rounded-lg">
                        {viewPlan.supplementRecommendations.essential && viewPlan.supplementRecommendations.essential.length > 0 ? (
                          <div className="space-y-2">
                            <p className="font-medium">Essentiels:</p>
                            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                              {viewPlan.supplementRecommendations.essential.map((supp, idx) => (
                                <li key={idx}>
                                  <span className="font-medium">{supp.name}</span> - {supp.dosage}, {supp.timing}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <p className="text-gray-400">Aucun supplément essentiel recommandé</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Conseils d'experts */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Conseils d'expert</h3>
                  <div className="bg-gray-800/30 p-4 rounded-lg">
                    <ul className="list-disc list-inside space-y-2">
                      {viewPlan.expertTips.map((tip, index) => (
                        <li key={index} className="text-gray-300">{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="mt-6">
                <Button variant="outline" onClick={() => handleDownload(viewPlan)}>
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialogue de confirmation de suppression */}
      <AlertDialog open={!!deletePlanId} onOpenChange={(open) => !open && setDeletePlanId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer ce plan ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Le plan nutritionnel sera définitivement supprimé de votre compte.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePlan} className="bg-red-600 hover:bg-red-700">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
} 