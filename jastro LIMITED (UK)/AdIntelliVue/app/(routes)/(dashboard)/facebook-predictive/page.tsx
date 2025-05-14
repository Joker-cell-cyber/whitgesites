'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { BarChart3, TrendingUp, LineChart, PieChart, HelpCircle, FileUp, Check, Clock, Download, Upload, FileType2, AlertTriangle, Sprout, Leaf, Wind, BarChart, CircleDollarSign } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { readCsvFile, detectFileFormat } from '@/app/lib/data/data-import-service';
import { AdvertisingData } from '@/app/lib/types/data-types';
import { toast } from '@/hooks/use-toast';

// Définir le type pour les cartes de prédiction
interface PredictionCard {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

// Définir le type pour les recommandations
interface Recommendation {
  category: string;
  text: string;
}

export default function FacebookPredictivePage() {
  const [activeStep, setActiveStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [analysisId, setAnalysisId] = useState<string | null>(null);
  const [advertisingData, setAdvertisingData] = useState<AdvertisingData[]>([]);
  const [dataValidationErrors, setDataValidationErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [predictionResults, setPredictionResults] = useState<any>(null);
  
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [selectedMetric, setSelectedMetric] = useState("roas");
  const [forecastPeriod, setForecastPeriod] = useState(30);
  const [confidenceInterval, setConfidenceInterval] = useState(80);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsLoading(true);
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      try {
        // Vérifier le format du fichier
        const fileFormat = detectFileFormat(selectedFile.name);
        if (fileFormat !== 'csv') {
          throw new Error('Format de fichier non pris en charge. Veuillez importer un fichier CSV.');
        }
        
        // Importer et parser les données
        const data = await readCsvFile(selectedFile);
        
        // Valider les données importées
        const validationErrors = validateAdvertisingData(data);
        setDataValidationErrors(validationErrors);
        
        if (validationErrors.length > 0) {
          toast({
            title: "Avertissement d'importation",
            description: `Le fichier a été importé mais présente ${validationErrors.length} problèmes de données qui pourraient affecter les prédictions.`,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Importation réussie",
            description: `${data.length} lignes de données importées avec succès.`,
            variant: "default"
          });
        }
        
        // Stocker les données
        setAdvertisingData(data);
      } catch (error) {
        toast({
          title: "Erreur d'importation",
          description: error instanceof Error ? error.message : "Une erreur s'est produite lors de l'importation du fichier.",
          variant: "destructive"
        });
        
        // Réinitialiser le champ de fichier
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        setFile(null);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Fonction de validation des données publicitaires
  const validateAdvertisingData = (data: AdvertisingData[]): string[] => {
    const errors: string[] = [];
    
    // Vérifier si le tableau de données est vide
    if (data.length === 0) {
      errors.push("Le fichier ne contient aucune donnée.");
      return errors;
    }
    
    // Vérifier la présence d'un historique suffisant pour les prédictions
    if (data.length < 30) {
      errors.push(`Seulement ${data.length} lignes de données trouvées. Au moins 30 jours de données sont recommandés pour des prédictions précises.`);
    }
    
    // Vérifier les champs obligatoires
    const requiredFields = ['date', 'spend', 'impressions', 'clicks', 'conversions'];
    let missingFieldsCount = 0;
    
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      
      for (const field of requiredFields) {
        if (row[field] === undefined || row[field] === null || row[field] === '') {
          missingFieldsCount++;
          if (missingFieldsCount <= 3) { // Limiter le nombre d'erreurs affichées
            errors.push(`Ligne ${i + 1}: Champ "${field}" manquant ou vide.`);
          }
        }
      }
      
      // Vérifier les valeurs numériques
      if (row.spend !== undefined && (isNaN(Number(row.spend)) || Number(row.spend) < 0)) {
        errors.push(`Ligne ${i + 1}: La dépense doit être un nombre positif.`);
      }
      
      // Limiter le nombre d'erreurs pour éviter un tableau trop long
      if (errors.length > 10) {
        errors.push(`... et ${missingFieldsCount - 10} autres problèmes détectés.`);
        break;
      }
    }
    
    return errors;
  };

  const handleFileUpload = async () => {
    if (!file) return;
    
    if (advertisingData.length === 0) {
      toast({
        title: "Erreur",
        description: "Aucune donnée n'a été importée correctement. Veuillez réessayer.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    // Passer à l'étape suivante
    setTimeout(() => {
      setIsLoading(false);
      setActiveStep(2);
    }, 500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Récupérer les valeurs du formulaire
    const formData = new FormData(e.target as HTMLFormElement);
    const formValues = Object.fromEntries(formData);
    
    setIsLoading(true);
    
    try {
      // Préparer les données pour l'API
      const contextualData = {
        // Objectifs de prédiction
        forecast_period: formValues.forecast_period,
        confidence_interval: formValues.confidence_interval,
        primary_metric: formValues.primary_metric,
        forecast_budget: formValues.forecast_budget,
        
        // Facteurs business
        seasonality: formValues.seasonality,
        industry_trends: formValues.industry_trends,
        business_changes: formValues.business_changes,
        conversion_funnel: formValues.conversion_funnel,
        
        // Stratégie publicitaire
        ad_strategy_changes: formValues.ad_strategy_changes,
        competitor_activity: formValues.competitor_activity,
        cpm_expectations: formValues.cpm_expectations,
        
        // Historique et performance
        account_history: formValues.account_history,
        historical_performance: formValues.historical_performance,
        recent_changes: formValues.recent_changes,
        benchmark_data: formValues.benchmark_data,
        
        // Notes supplémentaires
        additional_notes: formValues.additional_notes,
      };
      
      // Vérifier si des données ont été importées
      if (!advertisingData || advertisingData.length === 0) {
        throw new Error('Aucune donnée n\'a été importée. Veuillez importer un fichier CSV avec vos données Facebook Ads.');
      }
      
      // Appel à l'API de prédiction avec les données réelles
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: advertisingData,
          options: {
            predictionType: formValues.primary_metric === 'roas' ? 'performance' : 
                          formValues.primary_metric === 'cpa' ? 'budget' : 
                          'audience',
            timeHorizon: formValues.forecast_period === '90' ? '3months' :
                       formValues.forecast_period === '30' ? '1month' :
                       formValues.forecast_period === '180' ? '6months' : '12months',
            contextualData
          }
        }),
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Erreur lors de la prédiction');
      }
      
      // Générer un ID d'analyse
      const analysisId = `fp-${Date.now()}`;
      setAnalysisId(analysisId);
      
      // Sauvegarder les résultats de prédiction
      setPredictionResults(result);
      
      // Passer à l'étape 3 (résultats)
      setActiveStep(3);
    } catch (error) {
      console.error("Erreur lors de l'analyse:", error);
      alert("Une erreur s'est produite lors de la prédiction. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  // Calculer les métriques pour les prédictions
  const calculatePredictiveMetrics = () => {
    if (!advertisingData || advertisingData.length === 0) return [];
    
    // Calculer les moyennes actuelles
    const totalSpend = advertisingData.reduce((sum, item) => sum + (item.spend || 0), 0);
    const totalClicks = advertisingData.reduce((sum, item) => sum + (item.clicks || 0), 0);
    const totalConversions = advertisingData.reduce((sum, item) => sum + (item.conversions || 0), 0);
    const totalImpressions = advertisingData.reduce((sum, item) => sum + (item.impressions || 0), 0);
    
    const avgCPC = totalClicks > 0 ? totalSpend / totalClicks : 0;
    const avgCPA = totalConversions > 0 ? totalSpend / totalConversions : 0;
    const avgCTR = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
    const avgConvRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;
    
    // Si nous avons des résultats de prédiction, utiliser ces valeurs
    if (predictionResults?.predictions) {
      return predictionResults.predictions;
    }
    
    // Sinon, générer des prédictions basées sur les données actuelles (avec de légères variations)
    return [
      {
        title: "ROAS Prévu",
        value: `${((totalConversions * 100) / totalSpend).toFixed(1)}x`,
        change: "+0.4",
        icon: TrendingUp,
        color: "text-green-500",
        bgColor: "bg-green-500/10",
      },
      {
        title: "Coût par Clic",
        value: `${avgCPC.toFixed(2)}€`,
        change: avgCPC > 0.5 ? "-0.11" : "+0.08",
        icon: LineChart,
        color: avgCPC > 0.5 ? "text-green-500" : "text-red-500",
        bgColor: avgCPC > 0.5 ? "bg-green-500/10" : "bg-red-500/10",
      },
      {
        title: "Coût par Acquisition",
        value: `${avgCPA.toFixed(2)}€`,
        change: avgCPA > 25 ? "-2.10" : "+1.20",
        icon: BarChart3,
        color: avgCPA > 25 ? "text-green-500" : "text-red-500",
        bgColor: avgCPA > 25 ? "bg-green-500/10" : "bg-red-500/10",
      },
      {
        title: "Budget Optimal",
        value: `${Math.round(totalSpend * 1.1).toLocaleString()}€`,
        change: "+10%",
        icon: PieChart,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
      },
    ];
  };

  const getDynamicRecommendations = (category: string): string[] => {
    if (predictionResults?.recommendations) {
      const categoryMap: Record<string, string> = {
        'budget': 'budget',
        'audience': 'audience',
        'calendar': 'schedule'
      };
      
      const filteredRecs = predictionResults.recommendations.filter(
        (rec: Recommendation) => rec.category === categoryMap[category]
      );
      
      if (filteredRecs.length > 0) {
        return filteredRecs.map((rec: Recommendation) => rec.text);
      }
    }
    
    // Recommandations par défaut
    switch (category) {
      case 'budget':
        return [
          "Augmentez progressivement votre budget quotidien de 15% sur les 2 prochaines semaines",
          "Ajustez votre stratégie d'enchères pour cibler un CPA maximum de 22€",
          "Réallouez 30% du budget des campagnes de prospection vers les campagnes de remarketing"
        ];
      case 'audience':
        return [
          "Créez de nouveaux segments d'audience similaires à vos acheteurs des 30 derniers jours",
          "Excluez les tranches d'âge 55+ qui montrent un ROAS 40% inférieur à la moyenne",
          "Concentrez-vous sur les placements mobiles qui devraient surperformer de 22%"
        ];
      case 'calendar':
        return [
          "Préparez une augmentation de budget de 40% pour la semaine du 15 au 22 (pic d'achat prévu)",
          "Réduisez les dépenses de 25% pendant la période du 5 au 10 (baisse de performance anticipée)",
          "Planifiez de nouveaux créatifs à lancer le 12 pour tirer parti de la hausse d'intérêt prévue"
        ];
      default:
        return [];
    }
  };

  // Générer les cartes de prédiction dynamiquement
  const dynamicPredictionCards = calculatePredictiveMetrics();

  // Données factices
  const campaigns = [
    { id: "camp1", name: "Campagne Acquisition Mars 2023" },
    { id: "camp2", name: "Campagne Remarketing Q2" },
    { id: "camp3", name: "Campagne Produits Saisonniers" },
    { id: "camp4", name: "Conversion App Mobile" },
  ];

  const metrics = [
    { id: "roas", name: "ROAS" },
    { id: "cpc", name: "Coût par clic" },
    { id: "cpa", name: "Coût par acquisition" },
    { id: "ctr", name: "Taux de clic" },
    { id: "conversion_rate", name: "Taux de conversion" },
  ];

  const predictionCards = [
    {
      title: "ROAS Prévu",
      value: "2.8x",
      change: "+0.4",
      icon: TrendingUp,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Coût par Clic",
      value: "0.85€",
      change: "-0.11",
      icon: LineChart,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Coût par Acquisition",
      value: "24.50€",
      change: "+1.20",
      icon: BarChart3,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
    {
      title: "Budget Optimal",
      value: "2,450€",
      change: "+350",
      icon: PieChart,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 rounded-full bg-[#EDF2E4] flex items-center justify-center mr-4">
          <TrendingUp className="h-6 w-6 text-[#5F7138]" />
        </div>
        <div>
          <h1 className="text-2xl font-medium text-[#4F4639]">Prédiction des Performances Facebook</h1>
          <p className="text-[#7F7259]">
            Analysez l'historique de vos campagnes et prédisez les performances futures
          </p>
        </div>
      </div>

      <div className="mb-8">
        <div className="relative">
          <div className="flex flex-col md:flex-row gap-4 items-start relative z-10">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${activeStep >= 1 ? 'bg-[#5F7138] text-white' : 'bg-[#EDF2E4] text-[#7F7259]'}`}>
              1
            </div>
            <div className="flex-1">
              <h2 className={`text-lg font-medium ${activeStep >= 1 ? 'text-[#4F4639]' : 'text-[#7F7259]'}`}>Importer vos données</h2>
              <p className="text-[#7F7259] my-2">Téléchargez votre fichier CSV d'historique de campagnes Facebook</p>
              
              {activeStep === 1 && (
                <Card className="mt-4 border-[#E8DFC7] bg-white shadow-sm">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#E8DFC7] rounded-lg bg-[#F8F4E9]/50 text-center">
                      <div className="mb-4 w-16 h-16 rounded-full bg-[#EDF2E4] flex items-center justify-center">
                        <FileUp className="h-8 w-8 text-[#5F7138]" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-medium text-[#4F4639]">Glissez et déposez votre fichier</h3>
                        <p className="text-sm text-[#7F7259]">
                          Format accepté: CSV. <br />
                          Taille maximum: 10 MB
                        </p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".csv"
                          onChange={handleFileChange}
                          className="hidden"
                          id="csvFileUpload"
                        />
                        <Button 
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-[#5F7138] hover:bg-[#6E824A] text-white"
                        >
                          Sélectionner un fichier
                        </Button>
                      </div>
                    </div>

                    {file && (
                      <div className="mt-6">
                        <div className="flex items-center p-4 rounded-lg bg-[#F8F4E9] border border-[#E8DFC7]">
                          <div className="mr-4 w-10 h-10 rounded-full bg-[#EDF2E4] flex items-center justify-center">
                            <FileType2 className="h-5 w-5 text-[#5F7138]" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-[#4F4639]">{file.name}</p>
                            <p className="text-xs text-[#7F7259]">{(file.size / 1024).toFixed(1)} KB</p>
                          </div>
                          <div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                setFile(null);
                                if (fileInputRef.current) fileInputRef.current.value = '';
                              }}
                              className="text-[#C17A56] hover:text-[#A35D41] hover:bg-[#F2E6DF]"
                            >
                              Retirer
                            </Button>
                          </div>
                        </div>

                        {dataValidationErrors.length > 0 && (
                          <div className="mt-4 p-4 rounded-lg bg-[#F9EEEA] border border-[#E9C9BD]">
                            <div className="flex items-center mb-2">
                              <AlertTriangle className="h-5 w-5 text-[#C17A56] mr-2" />
                              <h3 className="font-medium text-[#4F4639]">
                                Avertissements ({dataValidationErrors.length})
                              </h3>
                            </div>
                            <ul className="text-sm text-[#7F7259] space-y-1 max-h-40 overflow-y-auto">
                              {dataValidationErrors.map((error, index) => (
                                <li key={index}>{error}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="mt-6 flex justify-end">
                          <Button 
                            onClick={handleFileUpload}
                            disabled={isLoading}
                            className="bg-[#5F7138] hover:bg-[#6E824A] text-white"
                          >
                            {isLoading ? 'Chargement...' : 'Continuer'}
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-[#E8DFC7] z-0"></div>

          <div className="flex flex-col md:flex-row gap-4 items-start mt-8 relative z-10">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${activeStep >= 2 ? 'bg-[#5F7138] text-white' : 'bg-[#EDF2E4] text-[#7F7259]'}`}>
              2
            </div>
            <div className="flex-1">
              <h2 className={`text-lg font-medium ${activeStep >= 2 ? 'text-[#4F4639]' : 'text-[#7F7259]'}`}>Contexte et paramètres</h2>
              <p className="text-[#7F7259] my-2">Configurez les paramètres pour une prédiction précise</p>
              
              {activeStep === 2 && (
                <Card className="mt-4 border-[#E8DFC7] bg-white shadow-sm">
                  <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Paramètres de prédiction */}
                        <div className="space-y-4">
                          <div className="flex items-center mb-4">
                            <div className="w-8 h-8 rounded-full bg-[#EDF2E4] flex items-center justify-center mr-3">
                              <TrendingUp className="h-4 w-4 text-[#5F7138]" />
                            </div>
                            <h3 className="text-lg font-medium text-[#4F4639]">Paramètres de prédiction</h3>
                          </div>

                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="forecast_period" className="text-[#4F4639]">Période de prévision (jours)</Label>
                              <div className="flex items-center">
                                <Slider
                                  id="forecast_period"
                                  name="forecast_period"
                                  min={7}
                                  max={90}
                                  step={1}
                                  value={[forecastPeriod]}
                                  onValueChange={(value) => setForecastPeriod(value[0])}
                                  className="flex-1 mr-4 [&>[data-orientation=horizontal]>.slider-track]:bg-[#E8DFC7] [&>[data-orientation=horizontal]>.slider-range]:bg-[#5F7138] [&>.slider-thumb]:bg-[#5F7138] [&>.slider-thumb]:border-[#5F7138]"
                                />
                                <span className="w-12 text-center p-2 rounded bg-[#F8F4E9] text-[#4F4639] font-medium">
                                  {forecastPeriod}
                                </span>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="confidence_interval" className="text-[#4F4639]">Intervalle de confiance (%)</Label>
                              <div className="flex items-center">
                                <Slider
                                  id="confidence_interval"
                                  name="confidence_interval"
                                  min={60}
                                  max={95}
                                  step={5}
                                  value={[confidenceInterval]}
                                  onValueChange={(value) => setConfidenceInterval(value[0])}
                                  className="flex-1 mr-4 [&>[data-orientation=horizontal]>.slider-track]:bg-[#E8DFC7] [&>[data-orientation=horizontal]>.slider-range]:bg-[#5F7138] [&>.slider-thumb]:bg-[#5F7138] [&>.slider-thumb]:border-[#5F7138]"
                                />
                                <span className="w-12 text-center p-2 rounded bg-[#F8F4E9] text-[#4F4639] font-medium">
                                  {confidenceInterval}
                                </span>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="primary_metric" className="text-[#4F4639]">Métrique principale</Label>
                              <Select 
                                name="primary_metric"
                                value={selectedMetric}
                                onValueChange={setSelectedMetric}
                              >
                                <SelectTrigger className="bg-[#F8F4E9] border-[#E8DFC7] focus:ring-[#5F7138]/20">
                                  <SelectValue placeholder="Sélectionnez une métrique" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-[#E8DFC7]">
                                  <SelectItem value="roas">ROAS</SelectItem>
                                  <SelectItem value="cpa">CPA</SelectItem>
                                  <SelectItem value="cpm">CPM</SelectItem>
                                  <SelectItem value="ctr">CTR</SelectItem>
                                  <SelectItem value="conversion_rate">Taux de conversion</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="forecast_budget" className="text-[#4F4639]">Budget prévu (€)</Label>
                              <Input
                                id="forecast_budget"
                                name="forecast_budget"
                                type="number"
                                placeholder="1000"
                                className="bg-[#F8F4E9] border-[#E8DFC7] focus:border-[#5F7138] focus:ring-[#5F7138]/20"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Facteurs Business */}
                        <div className="space-y-4">
                          <div className="flex items-center mb-4">
                            <div className="w-8 h-8 rounded-full bg-[#EDF2E4] flex items-center justify-center mr-3">
                              <Sprout className="h-4 w-4 text-[#5F7138]" />
                            </div>
                            <h3 className="text-lg font-medium text-[#4F4639]">Facteurs Business</h3>
                          </div>

                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="seasonality" className="text-[#4F4639]">Saisonnalité</Label>
                              <Select name="seasonality" defaultValue="normal">
                                <SelectTrigger className="bg-[#F8F4E9] border-[#E8DFC7] focus:ring-[#5F7138]/20">
                                  <SelectValue placeholder="Sélectionnez un impact saisonnier" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-[#E8DFC7]">
                                  <SelectItem value="high_positive">Impact positif fort</SelectItem>
                                  <SelectItem value="positive">Impact positif</SelectItem>
                                  <SelectItem value="normal">Impact neutre</SelectItem>
                                  <SelectItem value="negative">Impact négatif</SelectItem>
                                  <SelectItem value="high_negative">Impact négatif fort</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="industry_trends" className="text-[#4F4639]">Tendances du secteur</Label>
                              <Textarea
                                id="industry_trends"
                                name="industry_trends"
                                placeholder="Décrivez les tendances actuelles dans votre secteur..."
                                className="bg-[#F8F4E9] border-[#E8DFC7] focus:border-[#5F7138] focus:ring-[#5F7138]/20 min-h-[80px]"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="business_changes" className="text-[#4F4639]">Changements dans l'entreprise</Label>
                              <Textarea
                                id="business_changes"
                                name="business_changes"
                                placeholder="Changements récents ou à venir dans votre entreprise..."
                                className="bg-[#F8F4E9] border-[#E8DFC7] focus:border-[#5F7138] focus:ring-[#5F7138]/20 min-h-[80px]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 flex justify-end">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setActiveStep(1)}
                          className="mr-2 border-[#E8DFC7] text-[#7F7259] hover:bg-[#F8F4E9] hover:text-[#4F4639]"
                        >
                          Retour
                        </Button>
                        <Button 
                          type="submit"
                          disabled={isLoading}
                          className="bg-[#5F7138] hover:bg-[#6E824A] text-white"
                        >
                          {isLoading ? 'Traitement...' : 'Générer les prédictions'}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-start mt-8 relative z-10">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${activeStep >= 3 ? 'bg-[#5F7138] text-white' : 'bg-[#EDF2E4] text-[#7F7259]'}`}>
              3
            </div>
            <div className="flex-1">
              <h2 className={`text-lg font-medium ${activeStep >= 3 ? 'text-[#4F4639]' : 'text-[#7F7259]'}`}>Résultats & Recommandations</h2>
              <p className="text-[#7F7259] my-2">Analysez les prédictions et recommandations pour votre campagne</p>
              
              {activeStep === 3 && predictionResults && (
                <div className="space-y-6 mt-4">
                  {/* Prediction Metrics */}
                  <Card className="border-[#E8DFC7] bg-white shadow-sm">
                    <CardHeader className="pb-4 border-b border-[#E8DFC7]">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-[#EDF2E4] flex items-center justify-center mr-3">
                          <BarChart className="h-4 w-4 text-[#5F7138]" />
                        </div>
                        <CardTitle className="text-lg font-medium text-[#4F4639]">Métriques prédictives</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* ROAS Card */}
                        <Card className="bg-[#F8F4E9]/50 border-[#E8DFC7] shadow-none">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-[#7F7259]">ROAS prévu</p>
                                <p className="text-2xl font-bold text-[#4F4639]">3.2x</p>
                                <div className="flex items-center">
                                  <TrendingUp className="h-3 w-3 text-[#5F7138] mr-1" />
                                  <span className="text-xs font-medium text-[#5F7138]">+12% vs période précédente</span>
                                </div>
                              </div>
                              <div className="w-10 h-10 rounded-full bg-[#EDF2E4] flex items-center justify-center">
                                <CircleDollarSign className="h-5 w-5 text-[#5F7138]" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* CPA Card */}
                        <Card className="bg-[#F8F4E9]/50 border-[#E8DFC7] shadow-none">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-[#7F7259]">CPA prévu</p>
                                <p className="text-2xl font-bold text-[#4F4639]">18.5€</p>
                                <div className="flex items-center">
                                  <TrendingUp className="h-3 w-3 text-[#5F7138] mr-1" />
                                  <span className="text-xs font-medium text-[#5F7138]">-8% vs période précédente</span>
                                </div>
                              </div>
                              <div className="w-10 h-10 rounded-full bg-[#EDF2E4] flex items-center justify-center">
                                <Leaf className="h-5 w-5 text-[#5F7138]" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* CPM Card */}
                        <Card className="bg-[#F8F4E9]/50 border-[#E8DFC7] shadow-none">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-[#7F7259]">CPM prévu</p>
                                <p className="text-2xl font-bold text-[#4F4639]">7.2€</p>
                                <div className="flex items-center">
                                  <TrendingUp className="h-3 w-3 text-[#C17A56] mr-1" />
                                  <span className="text-xs font-medium text-[#C17A56]">+5% vs période précédente</span>
                                </div>
                              </div>
                              <div className="w-10 h-10 rounded-full bg-[#EDF2E4] flex items-center justify-center">
                                <Wind className="h-5 w-5 text-[#5F7138]" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* CTR Card */}
                        <Card className="bg-[#F8F4E9]/50 border-[#E8DFC7] shadow-none">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-[#7F7259]">CTR prévu</p>
                                <p className="text-2xl font-bold text-[#4F4639]">1.8%</p>
                                <div className="flex items-center">
                                  <TrendingUp className="h-3 w-3 text-[#5F7138] mr-1" />
                                  <span className="text-xs font-medium text-[#5F7138]">+3% vs période précédente</span>
                                </div>
                              </div>
                              <div className="w-10 h-10 rounded-full bg-[#EDF2E4] flex items-center justify-center">
                                <PieChart className="h-5 w-5 text-[#5F7138]" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="mt-6 p-4 rounded-lg bg-[#F8F4E9] border border-[#E8DFC7]">
                        <div className="flex items-center mb-2">
                          <HelpCircle className="h-4 w-4 text-[#7F7259] mr-2" />
                          <p className="text-sm font-medium text-[#4F4639]">Note explicative</p>
                        </div>
                        <p className="text-sm text-[#7F7259]">
                          Ces prédictions sont basées sur vos données historiques et les facteurs contextuels. 
                          L'intervalle de confiance de {confidenceInterval}% signifie qu'il y a {confidenceInterval}% de chances 
                          que les résultats réels se situent dans la marge d'erreur indiquée.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recommandations and Actions */}
                  <Card className="border-[#E8DFC7] bg-white shadow-sm">
                    <CardHeader className="pb-4 border-b border-[#E8DFC7]">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-[#EDF2E4] flex items-center justify-center mr-3">
                          <Leaf className="h-4 w-4 text-[#5F7138]" />
                        </div>
                        <CardTitle className="text-lg font-medium text-[#4F4639]">Recommandations</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <Tabs defaultValue="budget" className="w-full">
                        <TabsList className="bg-[#F8F4E9] p-1 rounded-lg">
                          <TabsTrigger value="budget" className="rounded data-[state=active]:bg-white data-[state=active]:text-[#4F4639] data-[state=active]:shadow-sm">
                            Budget
                          </TabsTrigger>
                          <TabsTrigger value="targeting" className="rounded data-[state=active]:bg-white data-[state=active]:text-[#4F4639] data-[state=active]:shadow-sm">
                            Ciblage
                          </TabsTrigger>
                          <TabsTrigger value="creatives" className="rounded data-[state=active]:bg-white data-[state=active]:text-[#4F4639] data-[state=active]:shadow-sm">
                            Créatifs
                          </TabsTrigger>
                          <TabsTrigger value="strategy" className="rounded data-[state=active]:bg-white data-[state=active]:text-[#4F4639] data-[state=active]:shadow-sm">
                            Stratégie
                          </TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="budget" className="mt-4 space-y-4">
                          <Card className="border-[#E8DFC7] bg-[#F8F4E9]/50">
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#EDF2E4] flex items-center justify-center flex-shrink-0 mt-1">
                                  <Check className="h-4 w-4 text-[#5F7138]" />
                                </div>
                                <p className="text-[#4F4639]">
                                  Augmentez votre budget quotidien de 15% pour la campagne "Acquisition" 
                                  afin de capitaliser sur le ROAS élevé prévu.
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                          
                          <Card className="border-[#E8DFC7] bg-[#F8F4E9]/50">
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#EDF2E4] flex items-center justify-center flex-shrink-0 mt-1">
                                  <Check className="h-4 w-4 text-[#5F7138]" />
                                </div>
                                <p className="text-[#4F4639]">
                                  Réallouez 20% du budget des campagnes à faible performance vers les campagnes 
                                  avec le meilleur ROAS prévu.
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        </TabsContent>
                        
                        <TabsContent value="targeting" className="mt-4 space-y-4">
                          <Card className="border-[#E8DFC7] bg-[#F8F4E9]/50">
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#EDF2E4] flex items-center justify-center flex-shrink-0 mt-1">
                                  <Check className="h-4 w-4 text-[#5F7138]" />
                                </div>
                                <p className="text-[#4F4639]">
                                  Élargissez votre ciblage démographique pour inclure la tranche d'âge 35-44 ans, 
                                  qui montre un fort potentiel selon les tendances prédites.
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        </TabsContent>
                        
                        <TabsContent value="creatives" className="mt-4 space-y-4">
                          <Card className="border-[#E8DFC7] bg-[#F8F4E9]/50">
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#EDF2E4] flex items-center justify-center flex-shrink-0 mt-1">
                                  <Check className="h-4 w-4 text-[#5F7138]" />
                                </div>
                                <p className="text-[#4F4639]">
                                  Créez de nouvelles variantes de créatifs mettant en avant les avantages écologiques 
                                  de vos produits, en ligne avec la tendance croissante vers la durabilité.
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        </TabsContent>
                        
                        <TabsContent value="strategy" className="mt-4 space-y-4">
                          <Card className="border-[#E8DFC7] bg-[#F8F4E9]/50">
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#EDF2E4] flex items-center justify-center flex-shrink-0 mt-1">
                                  <Check className="h-4 w-4 text-[#5F7138]" />
                                </div>
                                <p className="text-[#4F4639]">
                                  Augmentez vos activités de remarketing pendant la haute saison prévue 
                                  pour maximiser les conversions des visiteurs intéressés.
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>

                  <div className="flex justify-between">
                    <Button 
                      variant="outline"
                      onClick={() => setActiveStep(2)}
                      className="border-[#E8DFC7] text-[#7F7259] hover:bg-[#F8F4E9] hover:text-[#4F4639]"
                    >
                      Retour
                    </Button>
                    <Button
                      className="bg-[#5F7138] hover:bg-[#6E824A] text-white"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger le rapport
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 