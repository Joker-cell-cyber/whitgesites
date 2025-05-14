'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { BarChart3, TrendingUp, LineChart, PieChart, HelpCircle, FileUp, Check, Clock, Download, Upload, FileType2, AlertTriangle } from 'lucide-react';
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
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2 text-white">Prédictions Facebook Ads</h1>
      <p className="text-gray-300 mb-8">
        Utilisez notre algorithme prédictif pour anticiper les performances futures de vos campagnes Facebook Ads
      </p>

      <div className="flex justify-center mb-8">
        <Button 
          variant="outline" 
          className="flex items-center border-blue-600 text-blue-500 hover:bg-blue-900/20"
          onClick={() => window.location.href = '/templates/facebook-ads-template.csv'}
        >
          <FileUp className="mr-2 h-4 w-4" />
          Télécharger le template CSV
        </Button>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${activeStep >= 1 ? 'bg-blue-600' : 'bg-gray-700'} text-white font-semibold`}>
              1
            </div>
            <div className={`h-1 flex-1 mx-2 ${activeStep >= 2 ? 'bg-blue-600' : 'bg-gray-700'}`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${activeStep >= 2 ? 'bg-blue-600' : 'bg-gray-700'} text-white font-semibold`}>
              2
            </div>
            <div className={`h-1 flex-1 mx-2 ${activeStep >= 3 ? 'bg-blue-600' : 'bg-gray-700'}`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${activeStep >= 3 ? 'bg-blue-600' : 'bg-gray-700'} text-white font-semibold`}>
              3
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-sm text-gray-400">Import CSV</span>
            <span className="text-sm text-gray-400">Contexte de Prédiction</span>
            <span className="text-sm text-gray-400">Résultats</span>
          </div>
        </div>

        {activeStep === 1 && (
          <Card className="bg-gray-900 border-gray-800 text-gray-100">
            <CardHeader>
              <CardTitle>Importez vos données Facebook Ads</CardTitle>
              <CardDescription className="text-gray-400">
                Téléchargez un CSV exporté depuis Facebook Ads Manager pour commencer l'analyse prédictive
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                    <FileUp className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <a 
                      href="/templates/facebook-ads-template.csv" 
                      download 
                      className="text-blue-400 hover:text-blue-300 flex items-center"
                    >
                      <span>Télécharger le modèle CSV</span>
                      <FileUp className="ml-2 h-4 w-4" />
                    </a>
                    <p className="text-sm text-gray-400">Utilisez ce modèle pour formater correctement vos données</p>
                  </div>
                </div>
                
                <div className="w-full max-w-md p-6 border-2 border-dashed border-gray-700 rounded-lg hover:border-gray-500 transition-colors cursor-pointer">
                  <div className="space-y-3 text-center">
                    <FileUp className="h-12 w-12 mx-auto text-gray-400" />
                    <div>
                      <p className="text-gray-300 font-medium">Glissez votre fichier ici ou</p>
                      <label htmlFor="file-upload" className="cursor-pointer text-blue-500 hover:text-blue-400">
                        parcourir
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept=".csv"
                          onChange={handleFileChange}
                          ref={fileInputRef}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">Pour de meilleures prédictions, importez au moins 60 jours de données</p>
                  </div>
                </div>
                
                {file && (
                  <div className="bg-gray-800 p-3 rounded-md w-full max-w-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FileUp className="h-5 w-5 text-blue-400" />
                        <span className="text-sm text-gray-300 truncate max-w-xs">{file.name}</span>
                      </div>
                      <button
                        className="text-gray-400 hover:text-gray-300"
                        onClick={() => setFile(null)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                disabled={!file || isLoading}
                onClick={handleFileUpload}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Traitement...
                  </>
                ) : (
                  "Continuer"
                )}
              </Button>
            </CardFooter>
          </Card>
        )}

        {activeStep === 2 && (
          <Card className="bg-gray-900 border-gray-800 text-gray-100">
            <CardHeader>
              <CardTitle>Contexte pour l'analyse prédictive</CardTitle>
              <CardDescription className="text-gray-400">
                Fournissez des informations complémentaires pour améliorer la précision des prédictions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 mb-6">
                    <h3 className="text-lg font-medium mb-3">Objectifs de prédiction</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="forecast_period">Période de prévision (jours)</Label>
                        <select 
                          id="forecast_period" 
                          name="forecast_period"
                          className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                          required
                        >
                          <option value="7">7 jours</option>
                          <option value="14">14 jours</option>
                          <option value="30" selected>30 jours</option>
                          <option value="60">60 jours</option>
                          <option value="90">90 jours</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confidence_interval">Intervalle de confiance</Label>
                        <select 
                          id="confidence_interval" 
                          name="confidence_interval"
                          className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                          required
                        >
                          <option value="70">70%</option>
                          <option value="80" selected>80%</option>
                          <option value="90">90%</option>
                          <option value="95">95%</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="primary_metric">Métrique principale à prédire</Label>
                        <select 
                          id="primary_metric" 
                          name="primary_metric"
                          className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                          required
                        >
                          <option value="roas">ROAS</option>
                          <option value="cpa">Coût par acquisition</option>
                          <option value="cpc">Coût par clic</option>
                          <option value="conversion_rate">Taux de conversion</option>
                          <option value="ctr">Taux de clic</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="forecast_budget">Budget prévu (€/jour)</Label>
                        <Input 
                          id="forecast_budget" 
                          name="forecast_budget"
                          placeholder="ex: 100" 
                          className="bg-gray-800 border-gray-700 text-white"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 mb-6">
                    <h3 className="text-lg font-medium mb-3">Facteurs business</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="seasonality">Facteurs saisonniers</Label>
                        <select 
                          id="seasonality" 
                          name="seasonality"
                          className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                        >
                          <option value="">Sélectionnez...</option>
                          <option value="none">Aucun facteur saisonnier</option>
                          <option value="holiday">Période de fêtes/vacances</option>
                          <option value="back_to_school">Rentrée scolaire</option>
                          <option value="summer">Été</option>
                          <option value="winter">Hiver</option>
                          <option value="black_friday">Black Friday / Cyber Monday</option>
                          <option value="sales">Soldes</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="industry_trends">Tendances sectorielles</Label>
                        <select 
                          id="industry_trends" 
                          name="industry_trends"
                          className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                        >
                          <option value="">Sélectionnez...</option>
                          <option value="growing">Secteur en croissance</option>
                          <option value="stable">Secteur stable</option>
                          <option value="declining">Secteur en déclin</option>
                          <option value="competitive">Concurrence accrue</option>
                          <option value="disruption">Perturbation du marché</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="business_changes">Changements business prévus</Label>
                        <select 
                          id="business_changes" 
                          name="business_changes"
                          className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                          multiple
                          size={3}
                        >
                          <option value="new_products">Nouveaux produits</option>
                          <option value="price_changes">Changements de prix</option>
                          <option value="promotion">Promotions spéciales</option>
                          <option value="website_update">Mise à jour du site web</option>
                          <option value="expansion">Expansion géographique</option>
                        </select>
                        <p className="text-xs text-gray-400 mt-1">Utilisez Ctrl/Cmd pour sélectionner plusieurs options</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="conversion_funnel">Optimisations de l'entonnoir de conversion</Label>
                        <Textarea 
                          id="conversion_funnel" 
                          name="conversion_funnel"
                          placeholder="ex: Amélioration du checkout, nouvelles pages de destination..." 
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 mb-6">
                    <h3 className="text-lg font-medium mb-3">Stratégie publicitaire</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="ad_strategy_changes">Changements de stratégie publicitaire prévus</Label>
                        <select 
                          id="ad_strategy_changes" 
                          name="ad_strategy_changes"
                          className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                          multiple
                          size={3}
                        >
                          <option value="new_creatives">Nouveaux créatifs</option>
                          <option value="audience_expansion">Expansion d'audience</option>
                          <option value="retargeting_focus">Accent sur le retargeting</option>
                          <option value="new_campaign_structure">Nouvelle structure de campagne</option>
                          <option value="increased_budget">Augmentation de budget</option>
                          <option value="decreased_budget">Diminution de budget</option>
                          <option value="new_placements">Nouveaux placements</option>
                        </select>
                        <p className="text-xs text-gray-400 mt-1">Utilisez Ctrl/Cmd pour sélectionner plusieurs options</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="competitor_activity">Activité des concurrents</Label>
                        <Textarea 
                          id="competitor_activity" 
                          name="competitor_activity"
                          placeholder="ex: Nouveaux concurrents, augmentation des dépenses publicitaires..." 
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cpm_expectations">Tendance de CPM attendue</Label>
                        <select 
                          id="cpm_expectations" 
                          name="cpm_expectations"
                          className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                        >
                          <option value="">Sélectionnez...</option>
                          <option value="increasing">En hausse significative</option>
                          <option value="slight_increase">Légère hausse</option>
                          <option value="stable">Stable</option>
                          <option value="slight_decrease">Légère baisse</option>
                          <option value="decreasing">En baisse significative</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 mb-6">
                    <h3 className="text-lg font-medium mb-3">Historique et performance</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="account_history">Durée de l'historique du compte</Label>
                        <select 
                          id="account_history" 
                          name="account_history"
                          className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                        >
                          <option value="">Sélectionnez...</option>
                          <option value="0-3">0-3 mois</option>
                          <option value="3-6">3-6 mois</option>
                          <option value="6-12">6-12 mois</option>
                          <option value="1-2">1-2 ans</option>
                          <option value="2+">Plus de 2 ans</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="historical_performance">Performance historique</Label>
                        <select 
                          id="historical_performance" 
                          name="historical_performance"
                          className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                        >
                          <option value="">Sélectionnez...</option>
                          <option value="excellent">Excellente</option>
                          <option value="good">Bonne</option>
                          <option value="average">Moyenne</option>
                          <option value="below_average">En dessous de la moyenne</option>
                          <option value="poor">Faible</option>
                          <option value="fluctuating">Fluctuante</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="recent_changes">Changements récents (30 derniers jours)</Label>
                        <Textarea 
                          id="recent_changes" 
                          name="recent_changes"
                          placeholder="ex: Modifications d'audience, nouveaux tests..." 
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="benchmark_data">Données de référence du secteur</Label>
                        <Textarea 
                          id="benchmark_data" 
                          name="benchmark_data"
                          placeholder="ex: ROAS moyen de 2.5, CPA moyen de 35€..." 
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="additional_notes">Notes supplémentaires pour la prédiction</Label>
                    <Textarea 
                      id="additional_notes" 
                      name="additional_notes"
                      placeholder="Toute autre information pertinente qui pourrait influencer les prédictions..." 
                      className="bg-gray-800 border-gray-700 text-white min-h-[120px]"
                    />
                  </div>
                </div>
                
                <div className="flex justify-between mt-8">
                  <Button 
                    type="button"
                    variant="outline" 
                    onClick={() => setActiveStep(1)}
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    Retour
                  </Button>
                  <Button 
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Génération en cours...
                      </>
                    ) : (
                      "Générer les prédictions"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
        
        {activeStep === 3 && (
          <Card className="bg-gray-900 border-gray-800 text-gray-100">
            <CardHeader>
              <CardTitle>Prédictions générées avec succès</CardTitle>
              <CardDescription className="text-gray-400">
                Référence: {analysisId} - Voici les prédictions pour les {forecastPeriod || 30} prochains jours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-blue-900/20 border border-blue-800 rounded-md p-4 flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-400">Prédictions générées avec succès</h3>
                    <p className="text-sm text-blue-500/70">Analyse basée sur {advertisingData.length} points de données historiques</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dynamicPredictionCards.map((card: PredictionCard, index: number) => (
                    <Card key={index} className="bg-gray-800 border-gray-700 text-gray-100">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-gray-400 text-sm">{card.title}</p>
                            <div className="flex items-baseline mt-1">
                              <h3 className="text-2xl font-bold">{card.value}</h3>
                              <span className={`ml-2 text-sm ${card.color}`}>
                                {card.change.startsWith('+') ? '↑' : '↓'} {card.change}
                              </span>
                            </div>
                          </div>
                          <div className={`p-2 rounded-lg ${card.bgColor}`}>
                            <card.icon className={`h-5 w-5 ${card.color}`} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-medium mb-4">Tendance prédictive</h3>
                  <div className="h-60 bg-gray-900/50 rounded-lg flex items-center justify-center">
                    <p className="text-gray-400">Graphique de prédiction sur {forecastPeriod || 30} jours</p>
                    {/* Ici on mettrait normalement un vrai graphique */}
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                    <span>Aujourd'hui</span>
                    <span>{Math.floor((forecastPeriod || 30) / 2)} jours</span>
                    <span>{forecastPeriod || 30} jours</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Recommandations d'optimisation</h3>
                  
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <h4 className="font-medium text-green-400 mb-2">Budget & Enchères</h4>
                    <ul className="text-sm text-gray-300 space-y-2 list-disc list-inside">
                      {getDynamicRecommendations('budget').map((rec: string, index: number) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <h4 className="font-medium text-yellow-400 mb-2">Audiences & Ciblage</h4>
                    <ul className="text-sm text-gray-300 space-y-2 list-disc list-inside">
                      {getDynamicRecommendations('audience').map((rec: string, index: number) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <h4 className="font-medium text-purple-400 mb-2">Calendrier & Saisonnalité</h4>
                    <ul className="text-sm text-gray-300 space-y-2 list-disc list-inside">
                      {getDynamicRecommendations('calendar').map((rec: string, index: number) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="bg-blue-900/20 border border-blue-800 rounded-md p-5 flex flex-col md:flex-row items-center justify-between">
                  <div className="text-center md:text-left mb-4 md:mb-0">
                    <h3 className="font-medium text-blue-400 mb-1">Télécharger le rapport prédictif</h3>
                    <p className="text-sm text-gray-400">Analyse complète avec scénarios et recommandations détaillées</p>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Télécharger PDF</span>
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setActiveStep(2)}
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                Retour
              </Button>
              <Button 
                onClick={() => {
                  setActiveStep(1);
                  setFile(null);
                  setAnalysisId(null);
                }}
                className="bg-gray-700 hover:bg-gray-600"
              >
                Nouvelle prédiction
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
} 