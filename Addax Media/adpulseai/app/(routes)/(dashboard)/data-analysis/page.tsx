'use client';

import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { readCsvFile, detectFileFormat } from '@/app/lib/data/data-import-service';
import { AdvertisingData, AnalysisOptions, AnalysisResult } from '@/app/lib/types/data-types';
import { BarChart3, FileUp, Zap, Settings, Check, AlertTriangle, Upload, FileText, RefreshCw, FileBarChart } from 'lucide-react';
import { OpenAIService } from '@/app/lib/services/openai-service';
import { API_COSTS } from '@/app/config/tokens';

export default function DataAnalysisPage() {
  // États pour l'importation et l'analyse
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [advertisingData, setAdvertisingData] = useState<AdvertisingData[]>([]);
  const [fileName, setFileName] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [analysisOptions, setAnalysisOptions] = useState<AnalysisOptions>({
    analysisType: 'macro',
    includeRecommendations: true,
    includeProjections: true,
    platform: 'facebook'
  });
  const [isAiAnalysis, setIsAiAnalysis] = useState<boolean>(true);
  const [tokenCost, setTokenCost] = useState<number>(0);
  
  // Référence au champ de fichier
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Gérer le changement de fichier
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);
      setAnalysisResult(null);
      
      const file = e.target.files?.[0];
      if (!file) {
        setError("Aucun fichier sélectionné");
        setIsLoading(false);
        return;
      }
      
      setFileName(file.name);
      
      // Déterminer le format du fichier
      const format = detectFileFormat(file.name);
      
      // Lire et traiter le fichier en fonction de son format
      if (format === 'csv') {
        const data = await readCsvFile(file);
        setAdvertisingData(data);
        
        // Calcul du coût en tokens
        const estimatedCost = data.length > 1000 
          ? API_COSTS.ANALYSIS.MICRO 
          : API_COSTS.ANALYSIS.MACRO;
          
        setTokenCost(estimatedCost);
        
        setSuccess(`Fichier ${file.name} importé avec succès. ${data.length} entrées Facebook Ads détectées.`);
        setCurrentStep(2);
      } else {
        setError(`Le format de fichier ${format} n'est pas encore pris en charge. Utilisez CSV exporté de Facebook Ads Manager.`);
      }
    } catch (error) {
      setError(`Erreur lors de l'importation du fichier: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Gérer le changement des options d'analyse
  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      
      if (name === 'includeRecommendations' || name === 'includeProjections') {
      setAnalysisOptions({
        ...analysisOptions,
          [name]: checked
        });
        
        // Mettre à jour le coût estimé des tokens
        let newCost = analysisOptions.analysisType === 'macro' 
          ? API_COSTS.ANALYSIS.MACRO 
          : API_COSTS.ANALYSIS.MICRO;
          
        if (name === 'includeProjections' && checked) {
          newCost += 1;
        }
        
        setTokenCost(newCost);
      } else if (name === 'isAiAnalysis') {
        setIsAiAnalysis(checked);
      }
    } else {
      setAnalysisOptions({
        ...analysisOptions,
        [name]: value
      });
      
      // Mettre à jour le coût si le type d'analyse change
      if (name === 'analysisType') {
        const typeCost = value === 'macro' 
          ? API_COSTS.ANALYSIS.MACRO 
          : API_COSTS.ANALYSIS.MICRO;
          
        setTokenCost(typeCost + (analysisOptions.includeProjections ? 1 : 0));
      }
    }
  };
  
  // Lancer l'analyse
  const handleAnalyze = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      let analysisResult;
      
      if (isAiAnalysis) {
        // Utiliser l'API OpenAI pour une analyse avancée
        analysisResult = await OpenAIService.analyzeAdvertisingData(
          advertisingData,
          analysisOptions
        );
      } else {
        // Analyse basique (fallback)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Calcul de métriques basiques
        let totalSpend = 0;
        let totalImpressions = 0;
        let totalClicks = 0;
        let totalConversions = 0;
        
        advertisingData.forEach(item => {
          totalSpend += item.spend || 0;
          totalImpressions += item.impressions || 0;
          totalClicks += item.clicks || 0;
          totalConversions += item.conversions || 0;
        });
        
        const ctr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
        const cpc = totalClicks > 0 ? totalSpend / totalClicks : 0;
        const conversionRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;
        const cpa = totalConversions > 0 ? totalSpend / totalConversions : 0;
        
        analysisResult = {
          id: `analysis-${Date.now()}`,
          metrics: {
            totalSpend,
            totalImpressions,
            totalClicks,
            totalConversions,
            ctr,
            cpc,
            conversionRate,
            cpa,
            roi: 100 // valeur par défaut
          },
          insights: [
            "Les données montrent des variations de performance selon les périodes",
            "Certaines campagnes ont un meilleur rapport coût/conversion que d'autres",
            "Il existe des opportunités d'optimisation du budget"
          ],
          trends: [],
          anomalies: [],
          recommendations: analysisOptions.includeRecommendations ? [
            "Optimisez vos campagnes en vous concentrant sur les périodes de meilleure performance",
            "Réallouez le budget vers les campagnes à meilleur taux de conversion",
            "Testez différents visuels pour améliorer l'engagement"
          ] : [],
          platform: 'facebook',
          timestamp: new Date().toISOString()
        };
      }
      
      // Assurons-nous que platform est bien de type 'facebook'
      if (analysisResult && typeof analysisResult === 'object') {
        (analysisResult as any).platform = 'facebook';
      }
      
      setAnalysisResult(analysisResult as AnalysisResult);
      setCurrentStep(3);
      
    } catch (error) {
      console.error("Erreur d'analyse:", error);
      setError(`Erreur lors de l'analyse: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Réinitialiser le formulaire
  const handleReset = () => {
    setAdvertisingData([]);
    setFileName('');
    setAnalysisResult(null);
    setError(null);
    setSuccess(null);
    setCurrentStep(1);
    setAnalysisOptions({
      analysisType: 'macro',
      includeRecommendations: true,
      includeProjections: true,
      platform: 'facebook'
    });
    setIsAiAnalysis(true);
    setTokenCost(API_COSTS.ANALYSIS.MACRO);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  return (
    <div className="container mx-auto pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panneau d'importation */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6 mb-6">
            <h2 className="text-lg font-medium text-white mb-4">
              Importer des données Facebook Ads
            </h2>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
                <FileUp className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <p className="text-gray-300 mb-4">
                  Déposez l'export Facebook Ads Manager (CSV) ici, ou
                </p>
            <input
                  type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
                  accept=".csv,.xlsx,.xls"
                  className="hidden"
                  id="file-upload"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Sélectionner un fichier
                </Button>
                
            {fileName && (
                  <div className="mt-4 flex items-center justify-center text-sm">
                    <FileText className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="text-gray-300">{fileName}</span>
                  </div>
            )}
          </div>
              
              {error && (
                <div className="flex items-center p-3 bg-red-900/30 text-red-400 rounded-md text-sm">
                  <AlertTriangle className="h-4 w-4 mr-1.5 flex-shrink-0" />
                  {error}
                </div>
              )}
          
          {success && (
                <div className="flex items-center p-3 bg-green-900/30 text-green-400 rounded-md text-sm">
                  <Check className="h-4 w-4 mr-1.5 flex-shrink-0" />
              {success}
            </div>
          )}
            </div>
          </div>
      </div>
      
        {/* Panneau d'options et résultats */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-6">
      {/* Options d'analyse */}
            <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
              <h2 className="text-lg font-medium text-white mb-4">
                Options d'analyse
              </h2>
              {currentStep >= 2 ? (
                <div className="space-y-6">
                  {/* Option d'analyse IA */}
                  <div className="flex items-center space-x-2 mb-6">
                      <input
                      id="isAiAnalysis"
                        type="checkbox"
                      name="isAiAnalysis"
                      checked={isAiAnalysis}
                        onChange={handleOptionChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                    <label htmlFor="isAiAnalysis" className="text-sm font-medium text-gray-300">
                      Utiliser l'analyse avancée par IA (coût: {tokenCost} tokens)
                    </label>
                </div>
                
                  {/* Type d'analyse */}
                <div>
                    <h3 className="text-lg font-medium mb-3">Type d'analyse</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2">
                        <input
                          id="analysisType-macro"
                          type="radio"
                          name="analysisType"
                          value="macro"
                          checked={analysisOptions.analysisType === 'macro'}
                          onChange={handleOptionChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="analysisType-macro" className="text-sm font-medium text-gray-300">
                          Macro (vue d'ensemble)
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          id="analysisType-micro"
                          type="radio"
                          name="analysisType"
                          value="micro"
                          checked={analysisOptions.analysisType === 'micro'}
                    onChange={handleOptionChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="analysisType-micro" className="text-sm font-medium text-gray-300">
                          Micro (détaillée)
                        </label>
                      </div>
                    </div>
                </div>
                
                  {/* Options supplémentaires */}
                <div>
                    <h3 className="text-lg font-medium mb-3">Options</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          id="includeRecommendations"
                          type="checkbox"
                          name="includeRecommendations"
                          checked={analysisOptions.includeRecommendations}
                          onChange={handleOptionChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="includeRecommendations" className="text-sm font-medium text-gray-300">
                          Inclure des suggestions simples
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          id="includeProjections"
                          type="checkbox"
                          name="includeProjections"
                          checked={analysisOptions.includeProjections}
                          onChange={handleOptionChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="includeProjections" className="text-sm font-medium text-gray-300">
                          Inclure des estimations basiques
                        </label>
                </div>
              </div>
            </div>
            
                  {/* Résumé des options */}
                  <div className="p-4 bg-gray-800 rounded-lg text-sm">
                    L'analyse Facebook sera <span className="text-blue-400">{analysisOptions.analysisType === 'macro' ? 'globale' : 'détaillée'}</span>
                    {analysisOptions.includeRecommendations && <span> et inclura <span className="text-blue-400">des recommandations d'optimisation</span></span>}
                    {analysisOptions.includeProjections && <span> ainsi que <span className="text-blue-400">des projections de performance</span></span>}.
                    <div className="mt-2 text-xs text-gray-400">
                      Coût estimé: <span className="text-blue-400">{tokenCost} tokens</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 text-gray-400">
                  <FileUp className="mx-auto h-8 w-8 mb-2 opacity-50" />
                  <p>Veuillez d'abord importer vos données</p>
                </div>
              )}
              
              {/* Boutons d'action */}
              <div className="mt-6 flex flex-wrap gap-3 justify-end">
              <Button
                variant="outline"
                onClick={handleReset}
                disabled={isLoading}
              >
                  Annuler
                </Button>
                <Button
                  onClick={handleAnalyze}
                  disabled={isLoading || !advertisingData.length}
                >
                  {isLoading ? 
                    <><RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Analyse en cours...</> : 
                    <><BarChart3 className="h-4 w-4 mr-2" /> Lancer l'analyse</>
                  }
              </Button>
              </div>
            </div>

            {/* Résultats d'analyse */}
            {isLoading ? (
              <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-12 flex flex-col items-center justify-center">
                <RefreshCw className="w-10 h-10 text-blue-500 animate-spin mb-4" />
                <p className="text-gray-400 text-center">Analyse en cours...</p>
                <p className="text-xs text-gray-500 mt-4 text-center">
                  {isAiAnalysis ? "Notre IA analyse vos données en profondeur..." : "Calcul des métriques de performance..."}
                </p>
              </div>
            ) : analysisResult ? (
              <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
                <h2 className="text-lg font-medium text-white mb-4 flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Résultats d'analyse Facebook Ads
                </h2>
                <div className="space-y-6">
                  {/* Métriques principales */}
                  <div>
                    <h3 className="text-lg font-medium mb-3">Métriques clés</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="p-3 bg-gray-800 rounded-lg">
                        <p className="text-xs text-gray-400 mb-1">Dépenses</p>
                        <p className="text-xl font-bold">{analysisResult.metrics.totalSpend.toFixed(2)}€</p>
                      </div>
                      <div className="p-3 bg-gray-800 rounded-lg">
                        <p className="text-xs text-gray-400 mb-1">CPA</p>
                        <p className="text-xl font-bold">{analysisResult.metrics.cpa.toFixed(2)}€</p>
                      </div>
                      <div className="p-3 bg-gray-800 rounded-lg">
                        <p className="text-xs text-gray-400 mb-1">CTR</p>
                        <p className="text-xl font-bold">{analysisResult.metrics.ctr.toFixed(2)}%</p>
                      </div>
                      <div className="p-3 bg-gray-800 rounded-lg">
                        <p className="text-xs text-gray-400 mb-1">ROI</p>
                        <p className="text-xl font-bold">{analysisResult.metrics.roi.toFixed(0)}%</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Insights */}
                  <div>
                    <h3 className="text-lg font-medium mb-3">Insights clés</h3>
                    <ul className="space-y-2">
                      {analysisResult.insights.map((insight, index) => (
                        <li key={index} className="p-3 bg-gray-800 rounded-lg text-sm">
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Suggestions d'amélioration */}
                  {analysisResult.recommendations && analysisResult.recommendations.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium mb-3">Suggestions d'amélioration</h3>
                      <ul className="space-y-2">
                        {analysisResult.recommendations.map((rec, index) => (
                          <li key={index} className="p-3 bg-blue-900/20 border border-blue-900/30 rounded-lg text-sm flex items-start">
                            <span className="text-blue-400 mr-2">•</span>
                            {rec}
                          </li>
                        ))}
                      </ul>
        </div>
      )}
      
                  {/* Tendances */}
                  {analysisResult.trends && analysisResult.trends.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium mb-3">Tendances détectées</h3>
                      <ul className="space-y-2">
                        {analysisResult.trends.map((trend, index) => (
                          <li key={index} className="p-3 bg-purple-900/20 border border-purple-900/30 rounded-lg text-sm">
                            {typeof trend === 'string' ? trend : trend.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Anomalies */}
                  {analysisResult.anomalies && analysisResult.anomalies.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium mb-3">Anomalies détectées</h3>
                      <ul className="space-y-2">
                        {analysisResult.anomalies.map((anomaly, index) => (
                          <li key={index} className="p-3 bg-yellow-900/20 border border-yellow-900/30 rounded-lg text-sm">
                            {typeof anomaly === 'string' ? anomaly : anomaly.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Boutons d'action */}
                  <div className="flex flex-wrap gap-3 justify-end">
              <Button
                variant="outline"
                onClick={handleReset}
              >
                Nouvelle analyse
              </Button>
                    <Button>
                      Exporter le rapport
                    </Button>
                  </div>
                </div>
              </div>
            ) : null}
            </div>
        </div>
      </div>
    </div>
  );
} 