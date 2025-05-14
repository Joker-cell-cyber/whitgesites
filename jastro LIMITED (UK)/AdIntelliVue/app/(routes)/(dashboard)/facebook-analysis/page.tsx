'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, FileUp, FileType2, Check, Download, AlertTriangle, FileText, BarChart3 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { readCsvFile, detectFileFormat } from '@/app/lib/data/data-import-service';
import { AdvertisingData } from '@/app/lib/types/data-types';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { CheckCircleIcon, XIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Importation des nouveaux composants
import { AnalysisModules } from './components/analysis-modules';
import { AnalysisResults } from './components/analysis-results';
import MetricsDashboard from './components/metrics-dashboard';

export default function FacebookAnalysisPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [analysisId, setAnalysisId] = useState<string | null>(null);
  const [advertisingData, setAdvertisingData] = useState<AdvertisingData[]>([]);
  const [dataValidationErrors, setDataValidationErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dataMetrics, setDataMetrics] = useState<any>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState('performance');
  
  // Ajout des états manquants
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  
  // États pour les analyses individuelles
  const [performanceAnalysis, setPerformanceAnalysis] = useState<any>(null);
  const [creativesAnalysis, setCreativesAnalysis] = useState<any>(null);
  const [audiencesAnalysis, setAudiencesAnalysis] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any>(null);
  
  // États pour les indicateurs de chargement et d'erreur par module
  const [isLoadingPerformance, setIsLoadingPerformance] = useState(false);
  const [isLoadingCreatives, setIsLoadingCreatives] = useState(false);
  const [isLoadingAudiences, setIsLoadingAudiences] = useState(false);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);
  
  const [errorPerformance, setErrorPerformance] = useState<string | null>(null);
  const [errorCreatives, setErrorCreatives] = useState<string | null>(null);
  const [errorAudiences, setErrorAudiences] = useState<string | null>(null);
  const [errorRecommendations, setErrorRecommendations] = useState<string | null>(null);
  const [errorPdf, setErrorPdf] = useState<string | null>(null);

  // Gestionnaire de changement de fichier
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
            description: `Le fichier a été importé mais présente ${validationErrors.length} problèmes de données qui pourraient affecter l'analyse.`,
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
        
        // Passer à l'étape suivante sans calculer automatiquement les métriques
        setActiveStep(2);
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
    
    // Vérifier les champs obligatoires
    const requiredFields = ['date', 'spend', 'impressions', 'clicks'];
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
      
      if (row.impressions !== undefined && (isNaN(Number(row.impressions)) || Number(row.impressions) < 0)) {
        errors.push(`Ligne ${i + 1}: Les impressions doivent être un nombre positif.`);
      }
      
      if (row.clicks !== undefined && (isNaN(Number(row.clicks)) || Number(row.clicks) < 0)) {
        errors.push(`Ligne ${i + 1}: Les clics doivent être un nombre positif.`);
      }
      
      // Limiter le nombre d'erreurs pour éviter un tableau trop long
      if (errors.length > 10) {
        errors.push(`... et ${missingFieldsCount - 10} autres problèmes détectés.`);
        break;
      }
    }
    
    return errors;
  };

  // Nouvelle fonction pour analyser les performances
  const analyzePerformance = async (kpiContext?: any) => {
    try {
      setIsLoadingPerformance(true);
      setErrorPerformance(null);

      const response = await fetch('/api/analyze-performance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: advertisingData,
          kpiContext: kpiContext
        }),
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Erreur lors de l\'analyse des performances');
      }
      
      setPerformanceAnalysis(result.performanceAnalysis);
      
      // Mettre à jour le solde de tokens si disponible
      if (result.tokenBalance !== undefined) {
        // Vous devriez notifier l'utilisateur du nouveau solde ici
        // et/ou mettre à jour l'état global du solde de tokens si vous en avez un
        toast({
          title: "Tokens déduits",
          description: `1 token a été déduit pour cette analyse. Solde actuel: ${result.tokenBalance} tokens`,
          variant: "default"
        });
      }
      
      toast({
        title: "Analyse terminée",
        description: "L'analyse des performances a été réalisée avec succès",
        variant: "default"
      });
      
    } catch (error) {
      console.error('Erreur lors de l\'analyse des performances:', error);
      setErrorPerformance(error instanceof Error ? error.message : 'Erreur inconnue');
      toast({
        title: "Erreur d'analyse",
        description: error instanceof Error ? error.message : 'Erreur lors de l\'analyse des performances',
        variant: "destructive"
      });
    } finally {
      setIsLoadingPerformance(false);
    }
  };

  // Nouvelle fonction pour analyser les créatives
  const analyzeCreatives = async () => {
    try {
      setIsLoadingCreatives(true);
      setErrorCreatives(null);

      const response = await fetch('/api/analyze-creatives', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: advertisingData,
          basicMetrics: dataMetrics
        }),
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Erreur lors de l\'analyse des créatives');
      }
      
      setCreativesAnalysis(result.creativesAnalysis);
      
      // Mettre à jour le solde de tokens si disponible
      if (result.tokenBalance !== undefined) {
        toast({
          title: "Tokens déduits",
          description: `1 token a été déduit pour cette analyse. Solde actuel: ${result.tokenBalance} tokens`,
          variant: "default"
        });
      }
      
      toast({
        title: "Analyse terminée",
        description: "L'analyse des créatives a été réalisée avec succès",
        variant: "default"
      });
      
    } catch (error) {
      console.error('Erreur lors de l\'analyse des créatives:', error);
      setErrorCreatives(error instanceof Error ? error.message : 'Erreur inconnue');
      toast({
        title: "Erreur d'analyse",
        description: error instanceof Error ? error.message : 'Erreur lors de l\'analyse des créatives',
        variant: "destructive"
      });
    } finally {
      setIsLoadingCreatives(false);
    }
  };

  // Nouvelle fonction pour analyser les audiences
  const analyzeAudiences = async () => {
    try {
      setIsLoadingAudiences(true);
      setErrorAudiences(null);

      const response = await fetch('/api/analyze-audiences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: advertisingData,
          basicMetrics: dataMetrics
        }),
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Erreur lors de l\'analyse des audiences');
      }
      
      setAudiencesAnalysis(result.audiencesAnalysis);
      
      // Mettre à jour le solde de tokens si disponible
      if (result.tokenBalance !== undefined) {
        toast({
          title: "Tokens déduits",
          description: `1 token a été déduit pour cette analyse. Solde actuel: ${result.tokenBalance} tokens`,
          variant: "default"
        });
      }
      
      toast({
        title: "Analyse terminée",
        description: "L'analyse des audiences a été réalisée avec succès",
        variant: "default"
      });
      
    } catch (error) {
      console.error('Erreur lors de l\'analyse des audiences:', error);
      setErrorAudiences(error instanceof Error ? error.message : 'Erreur inconnue');
      toast({
        title: "Erreur d'analyse",
        description: error instanceof Error ? error.message : 'Erreur lors de l\'analyse des audiences',
        variant: "destructive"
      });
    } finally {
      setIsLoadingAudiences(false);
    }
  };

  // Nouvelle fonction pour générer des recommandations
  const generateRecommendations = async () => {
    try {
      // Vérifier que toutes les analyses sont disponibles
      if (!performanceAnalysis || !creativesAnalysis || !audiencesAnalysis) {
        throw new Error('Veuillez d\'abord effectuer toutes les analyses (performances, créatives, audiences)');
      }
      
      setIsLoadingRecommendations(true);
      setErrorRecommendations(null);

      const response = await fetch('/api/generate-recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          performanceAnalysis,
          creativesAnalysis,
          audiencesAnalysis,
          basicMetrics: dataMetrics
        }),
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Erreur lors de la génération des recommandations');
      }
      
      setRecommendations(result.recommendations);
      
      // Mettre à jour le solde de tokens si disponible
      if (result.tokenBalance !== undefined) {
        toast({
          title: "Tokens déduits",
          description: `2 tokens ont été déduits pour ces recommandations. Solde actuel: ${result.tokenBalance} tokens`,
          variant: "default"
        });
      }
      
      toast({
        title: "Recommandations générées",
        description: "Les recommandations ont été générées avec succès",
        variant: "default"
      });
      
    } catch (error) {
      console.error('Erreur lors de la génération des recommandations:', error);
      setErrorRecommendations(error instanceof Error ? error.message : 'Erreur inconnue');
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : 'Erreur lors de la génération des recommandations',
        variant: "destructive"
      });
    } finally {
      setIsLoadingRecommendations(false);
    }
  };

  const generatePdfReport = async () => {
    try {
      setIsLoadingPdf(true);
      setErrorPdf(null);
      
      const response = await fetch('/api/generate-full-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          performanceAnalysis,
          creativesAnalysis,
          audiencesAnalysis,
          recommendations,
          metrics: dataMetrics
        }),
      });
      
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Échec de la génération du rapport PDF');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'facebook-ads-analysis-report.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      setErrorPdf(error instanceof Error ? error.message : 'Erreur inconnue');
    } finally {
      setIsLoadingPdf(false);
    }
  };

  // Gestionnaires de glisser-déposer
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // Simuler un changement de fichier
      const fileChangeEvent = {
        target: {
          files: e.dataTransfer.files
        }
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      
      handleFileChange(fileChangeEvent);
    }
  };

  // Ajout d'une fonction pour calculer les métriques manuellement
  const calculateMetrics = () => {
    if (!advertisingData || advertisingData.length === 0) {
      toast({
        title: "Erreur",
        description: "Aucune donnée disponible pour calculer les métriques",
        variant: "destructive"
      });
      return;
    }
    
    console.log("------------ ANALYSE DES CONVERSIONS ------------");
    console.log(`Nombre total de lignes dans advertisingData: ${advertisingData.length}`);
    
    // Afficher toutes les données pour le débogage
    advertisingData.forEach((item, index) => {
      console.log(`Ligne ${index + 1}: conversion = ${item.conversions}, type = ${typeof item.conversions}`);
    });
    
    // Calculer les métriques de base
    const totalSpend = advertisingData.reduce((sum, item) => sum + (item.spend || 0), 0);
    const totalImpressions = advertisingData.reduce((sum, item) => sum + (item.impressions || 0), 0);
    const totalClicks = advertisingData.reduce((sum, item) => sum + (item.clicks || 0), 0);
    
    // Calculer d'abord le total brut de conversions (sans arrondi)
    const rawConversions = advertisingData.reduce((sum, item) => {
      return sum + (item.conversions || 0);
    }, 0);
    console.log(`Total brut des conversions (sans arrondi): ${rawConversions}`);
    
    // S'assurer que les conversions sont des entiers
    let runningTotal = 0;
    const totalConversions = advertisingData.reduce((sum, item, index) => {
      // Conversion explicite en entier pour assurer l'intégrité des données
      const conversion = item.conversions ? Math.round(Number(item.conversions)) : 0;
      runningTotal += conversion;
      console.log(`Ligne ${index + 1}: Conversion ${item.conversions} → ${conversion}, Total cumulé: ${runningTotal}`);
      return sum + conversion;
    }, 0);
    
    console.log(`Total final des conversions (après arrondi): ${totalConversions}`);
    
    // Vérification supplémentaire - somme manuelle des conversions
    let manualSum = 0;
    advertisingData.forEach(item => {
      if (item.conversions) {
        manualSum += Math.round(Number(item.conversions));
      }
    });
    console.log(`Somme manuelle des conversions: ${manualSum}`);
    
    // Calcul du revenu total
    const totalRevenue = advertisingData.reduce((sum, item) => sum + (item.revenue || 0), 0);
    
    const basicMetrics = {
      totalSpend,
      totalImpressions,
      totalClicks,
      totalConversions,
      avgCTR: totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0,
      avgCPC: totalClicks > 0 ? totalSpend / totalClicks : 0,
      avgCPA: totalConversions > 0 ? totalSpend / totalConversions : 0,
      avgCPM: (totalSpend / totalImpressions) * 1000,
      avgFrequency: advertisingData.reduce((sum, item) => sum + (item.frequency || 0), 0) / advertisingData.length,
      avgConversionRate: totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0,
      roas: totalSpend > 0 ? (totalRevenue / totalSpend) * 100 : 0
    };
    
    setDataMetrics(basicMetrics);
    
    toast({
      title: "Métriques calculées",
      description: "Les métriques de base ont été calculées avec succès",
      variant: "default"
    });
    
    // Passer à l'étape d'analyse
    setActiveStep(3);
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Analyse Facebook Ads</CardTitle>
          <CardDescription>
            Importez vos données Facebook Ads pour obtenir des insights et recommandations d'optimisation
          </CardDescription>
        </CardHeader>
      </Card>

        {activeStep === 1 && (
        <Card>
            <CardHeader>
            <CardTitle>Étape 1: Importation des données</CardTitle>
            <CardDescription>
              Importez vos données depuis Facebook Ads Manager (format CSV)
              </CardDescription>
            </CardHeader>
            <CardContent>
                  <div
                    className={cn(
                "border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors",
                isDragging ? "border-primary bg-primary/10" : "border-border",
                isLoading && "opacity-50 cursor-not-allowed"
                    )}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
              onClick={() => !isLoading && fileInputRef.current?.click()}
            >
                        <input
                type="file"
                      ref={fileInputRef}
                className="hidden"
                          accept=".csv"
                          onChange={handleFileChange}
                disabled={isLoading}
              />
              <div className="flex flex-col items-center justify-center space-y-4">
                {isLoading ? (
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                ) : (
                  <>
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Upload className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-lg font-medium mb-1">Glissez-déposez votre fichier CSV ici</p>
                      <p className="text-sm text-muted-foreground">ou cliquez pour sélectionner un fichier</p>
                    </div>
                    <p className="text-xs text-muted-foreground max-w-sm">
                      Veuillez exporter vos données depuis Facebook Ads Manager et les importer ici.
                      Assurez-vous que votre fichier contient les colonnes requises.
                    </p>
                  </>
                )}
                      </div>
                    </div>
            
            {file && (
              <div className="mt-4 p-3 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-secondary p-2 rounded">
                    <FileType2 className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(2)} KB • {file.type || 'text/csv'}
                    </p>
                  </div>
                  <div>
                    {dataValidationErrors.length === 0 ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                    ) : (
                      <div className="relative">
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                        <Badge className="absolute -top-2 -right-2 bg-amber-500 text-white h-4 w-4 flex items-center justify-center p-0 text-[10px]">
                          {dataValidationErrors.length}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
                </div>
            )}
            
            {dataValidationErrors.length > 0 && (
              <div className="mt-4 p-3 border border-amber-200 bg-amber-50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">Problèmes détectés dans les données</p>
                    <ul className="mt-2 text-xs text-amber-700 space-y-1">
                      {dataValidationErrors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
            </CardContent>
          </Card>
        )}
      
      {activeStep === 2 && (
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Préparation de l'analyse</CardTitle>
              <CardDescription>
                Votre fichier CSV a été importé avec succès. Vous pouvez maintenant calculer les métriques et passer à l'analyse.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted/20 p-4 rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Informations sur les données importées</h3>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li><span className="font-medium">Nom du fichier:</span> {file?.name}</li>
                    <li><span className="font-medium">Nombre de lignes:</span> {advertisingData.length}</li>
                    {dataValidationErrors.length > 0 && (
                      <li className="text-amber-500">
                        <AlertTriangle className="h-4 w-4 inline mr-1" />
                        {dataValidationErrors.length} problèmes détectés dans les données
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setActiveStep(1)}>
                  Retour
                </Button>
                <Button onClick={calculateMetrics}>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Calculer les métriques et continuer
                </Button>
              </div>
            </CardFooter>
          </Card>
          
          {dataValidationErrors.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Problèmes détectés</h3>
              <Alert variant="warning">
                <AlertTriangle className="h-5 w-5" />
                <AlertTitle>Avertissements de validation</AlertTitle>
                <AlertDescription>
                  Les problèmes suivants pourraient affecter la qualité de votre analyse:
                </AlertDescription>
              </Alert>
              <div className="max-h-60 overflow-y-auto space-y-2">
                {dataValidationErrors.map((error, index) => (
                  <p key={index} className="text-sm p-2 bg-muted/20 rounded-md">{error}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      {activeStep === 3 && (
        <>
          {/* Tableau de bord des métriques */}
          <div className="mb-8">
            <MetricsDashboard metrics={dataMetrics} />
          </div>
          
          {/* Section des modules d'analyse */}
          <AnalysisModules
            dataMetrics={dataMetrics}
            performanceAnalysis={performanceAnalysis}
            creativesAnalysis={creativesAnalysis}
            audiencesAnalysis={audiencesAnalysis}
            recommendations={recommendations}
            isLoadingPerformance={isLoadingPerformance}
            isLoadingCreatives={isLoadingCreatives}
            isLoadingAudiences={isLoadingAudiences}
            isLoadingRecommendations={isLoadingRecommendations}
            isLoadingPdf={isLoadingPdf}
            errorPerformance={errorPerformance}
            errorCreatives={errorCreatives}
            errorAudiences={errorAudiences}
            errorRecommendations={errorRecommendations}
            errorPdf={errorPdf}
            analyzePerformance={analyzePerformance}
            analyzeCreatives={analyzeCreatives}
            analyzeAudiences={analyzeAudiences}
            generateRecommendations={generateRecommendations}
            generatePdfReport={generatePdfReport}
          />
          
          {/* Affichage des résultats d'analyse */}
          {(performanceAnalysis || creativesAnalysis || audiencesAnalysis || recommendations) && (
            <AnalysisResults
              performanceAnalysis={performanceAnalysis}
              creativesAnalysis={creativesAnalysis}
              audiencesAnalysis={audiencesAnalysis}
              recommendations={recommendations}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          )}
        </>
      )}
    </div>
  );
} 