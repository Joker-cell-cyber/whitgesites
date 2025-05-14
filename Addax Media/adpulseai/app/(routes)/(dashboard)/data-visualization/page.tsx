'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  Upload, 
  Download, 
  ChevronDown, 
  RefreshCw,
  Share2,
  FileUp,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { useAuth } from '@/app/context/auth-context';
import { OpenAIService } from '@/app/lib/services/openai-service';
import { API_COSTS } from '@/app/config/tokens';

// Types pour les données
type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string[];
    borderColor?: string;
    borderWidth?: number;
    fill?: boolean;
  }[];
};

type VisualizationSuggestion = {
  type: string;
  title: string;
  description: string;
  dataMapping: {
    xAxis: string;
    yAxis: string;
    groupBy?: string;
  };
};

export default function DataVisualizationPage() {
  const { user } = useAuth();
  const [selectedPlatform, setSelectedPlatform] = useState('facebook');
  const [selectedTimeframe, setSelectedTimeframe] = useState('30days');
  const [selectedChart, setSelectedChart] = useState('performance');
  const [isLoading, setIsLoading] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileData, setFileData] = useState<any[]>([]);
  const [useAI, setUseAI] = useState(true);
  const [tokenCost, setTokenCost] = useState(API_COSTS.VISUALIZATION.BASIC);
  const [visualizationSuggestions, setVisualizationSuggestions] = useState<VisualizationSuggestion[]>([]);

  // Données d'exemple pour les graphiques
  const [performanceData, setPerformanceData] = useState<ChartData>({
    labels: ['Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Impressions',
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        backgroundColor: ['rgba(59, 130, 246, 0.2)'],
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2,
        fill: true
      }
    ]
  });

  const [conversionData, setConversionData] = useState<ChartData>({
    labels: ['Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Taux de conversion (%)',
        data: [2.1, 2.3, 2.5, 3.2, 3.5, 4.1],
        backgroundColor: ['rgba(16, 185, 129, 0.2)'],
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 2
      }
    ]
  });

  const [platformData, setPlatformData] = useState<ChartData>({
    labels: ['Facebook'],
    datasets: [
      {
        label: 'Plateforme',
        data: [100],
        backgroundColor: ['rgba(59, 89, 152, 0.6)'],  // Couleur Facebook
        borderColor: 'rgba(59, 89, 152, 1)',
        borderWidth: 1
      }
    ]
  });
  
  // Fonction pour lire le contenu du fichier CSV
  const readFileContent = async (file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const text = event.target?.result as string;
          const rows = text.split('\n');
          const headers = rows[0].split(',').map(h => h.trim());
          
          const data = [];
          for (let i = 1; i < rows.length; i++) {
            if (rows[i].trim() === '') continue;
            
            const values = rows[i].split(',').map(v => v.trim());
            const rowData: any = {};
            
            headers.forEach((header, index) => {
              // Conversion des valeurs numériques
              const value = values[index];
              rowData[header] = !isNaN(Number(value)) ? Number(value) : value;
            });
            
            data.push(rowData);
          }
          
          resolve(data);
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => {
        reject(new Error("Erreur lors de la lecture du fichier"));
      };
      
      reader.readAsText(file);
    });
  };

  // Gestion du changement de fichier
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Vérification du format de fichier
      if (!selectedFile.name.endsWith('.csv')) {
        console.error("Format non supporté. Veuillez utiliser un fichier CSV.");
        return;
      }
      
      try {
        setIsLoading(true);
        // Lecture du fichier
        const data = await readFileContent(selectedFile);
        setFileData(data);
        
        // Mise à jour des coûts en fonction du volume de données
        const cost = data.length > 500 
          ? API_COSTS.VISUALIZATION.CUSTOM 
          : API_COSTS.VISUALIZATION.BASIC;
          
        setTokenCost(cost);
        
        console.log(`Fichier importé avec succès. ${data.length} entrées trouvées.`);
        
        // Si l'IA est activée, demander des suggestions de visualisation
        if (useAI && data.length > 0) {
          try {
            const suggestions = await OpenAIService.suggestVisualizations(data);
            setVisualizationSuggestions(suggestions.visualizations || []);
            
            if (suggestions.visualizations && suggestions.visualizations.length > 0) {
              console.log("L'IA a généré des suggestions de visualisation!");
            }
          } catch (error) {
            console.error("Erreur lors de la génération des suggestions:", error);
          }
        }
        
        setHasData(true);
      } catch (error) {
        console.error("Erreur lors de la lecture du fichier:", error);
        console.error("Le fichier n'a pas pu être traité. Vérifiez son format.");
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  // Toggle pour l'utilisation de l'IA
  const toggleAI = () => {
    setUseAI(!useAI);
  };

  const generateData = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      // Si nous avons des données de fichier et que l'IA est activée
      if (fileData.length > 0 && useAI) {
        // Filtrer les données en fonction de la plateforme et de la période
        let filteredData = [...fileData];
        
        if (selectedPlatform !== 'all') {
          filteredData = filteredData.filter(item => 
            item.platform && item.platform.toLowerCase() === selectedPlatform.toLowerCase()
          );
        }
        
        // Filtrer par période (simulation - dans une implémentation réelle, vous filtreriez par date)
        // Ici, nous utilisons simplement les données telles quelles
        
        // Utiliser les données importées pour générer les visualisations
        if (filteredData.length > 0) {
          // Extraire les labels communs (dates ou périodes)
          const labels = [...new Set(filteredData.map(item => item.date || item.period || 'Inconnu'))];
          
          // Créer les datasets en fonction des données
          // Performance (impressions)
          const impressionsData = labels.map(label => {
            const matchingItems = filteredData.filter(item => (item.date || item.period) === label);
            return matchingItems.reduce((sum, item) => sum + (item.impressions || 0), 0);
          });
          
          setPerformanceData({
            labels,
            datasets: [
              {
                label: 'Impressions',
                data: impressionsData,
                backgroundColor: ['rgba(59, 130, 246, 0.2)'],
                borderColor: 'rgb(59, 130, 246)',
                borderWidth: 2,
                fill: true
              }
            ]
          });
          
          // Taux de conversion
          const clicksData = labels.map(label => {
            const matchingItems = filteredData.filter(item => (item.date || item.period) === label);
            return matchingItems.reduce((sum, item) => sum + (item.clicks || 0), 0);
          });
          
          const conversionRates = labels.map((label, index) => {
            const clicks = clicksData[index];
            const impressions = impressionsData[index];
            return impressions > 0 ? (clicks / impressions) * 100 : 0;
          });
          
          setConversionData({
            labels,
            datasets: [
              {
                label: 'Taux de conversion (%)',
                data: conversionRates.map(rate => parseFloat(rate.toFixed(2))),
                backgroundColor: ['rgba(16, 185, 129, 0.2)'],
                borderColor: 'rgb(16, 185, 129)',
                borderWidth: 2
              }
            ]
          });
          
          // Répartition par plateforme
          if (selectedPlatform === 'all') {
            const platforms = [...new Set(filteredData.map(item => item.platform || 'Inconnu'))];
            const platformSpend = platforms.map(platform => {
              const platformItems = filteredData.filter(item => item.platform === platform);
              return platformItems.reduce((sum, item) => sum + (item.spend || 0), 0);
            });
            
            setPlatformData({
              labels: platforms,
              datasets: [
                {
                  label: 'Dépenses publicitaires',
                  data: platformSpend,
                  backgroundColor: [
                    'rgba(59, 130, 246, 0.6)',
                    'rgba(16, 185, 129, 0.6)',
                    'rgba(14, 165, 233, 0.6)',
                    'rgba(217, 70, 239, 0.6)',
                    'rgba(249, 115, 22, 0.6)'
                  ].slice(0, platforms.length),
                  borderWidth: 1
                }
              ]
            });
          }
        }
      } else {
        // Générer des données simulées (code existant)
        setTimeout(() => {
          // Simulation d'appel API pour générer des données basées sur les filtres
          // Dans une implémentation réelle, vous feriez un appel à votre API ici
          
          // Générer des données aléatoires en fonction des paramètres sélectionnés
          const months = ['Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'];
          let dataLabels = [];
          
          // Ajuster les labels en fonction de la période sélectionnée
          if (selectedTimeframe === '7days') {
            dataLabels = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
          } else if (selectedTimeframe === '30days') {
            dataLabels = Array.from({length: 4}, (_, i) => `Sem ${i+1}`);
          } else if (selectedTimeframe === '90days') {
            dataLabels = ['Jan', 'Fév', 'Mars'];
          } else {
            dataLabels = months;
          }
          
          // Mettre à jour les données de performance
          setPerformanceData({
            labels: dataLabels,
            datasets: [
              {
                label: 'Impressions',
                data: Array.from({length: dataLabels.length}, () => Math.floor(Math.random() * 40000) + 10000),
                backgroundColor: ['rgba(59, 130, 246, 0.2)'],
                borderColor: 'rgb(59, 130, 246)',
                borderWidth: 2,
                fill: true
              }
            ]
          });
          
          // Mettre à jour les données de conversion
          setConversionData({
            labels: dataLabels,
            datasets: [
              {
                label: 'Taux de conversion (%)',
                data: Array.from({length: dataLabels.length}, () => parseFloat((Math.random() * 5 + 1).toFixed(1))),
                backgroundColor: ['rgba(16, 185, 129, 0.2)'],
                borderColor: 'rgb(16, 185, 129)',
                borderWidth: 2
              }
            ]
          });
          
          // Mettre à jour les données de répartition par plateforme
          const platforms = selectedPlatform === 'all' 
            ? ['Facebook', 'Google', 'LinkedIn', 'Instagram', 'TikTok']
            : [selectedPlatform];
            
          setPlatformData({
            labels: platforms,
            datasets: [
              {
                label: 'Dépenses publicitaires',
                data: Array.from({length: platforms.length}, () => Math.floor(Math.random() * 5000) + 1000),
                backgroundColor: [
                  'rgba(59, 130, 246, 0.6)',
                  'rgba(16, 185, 129, 0.6)',
                  'rgba(14, 165, 233, 0.6)',
                  'rgba(217, 70, 239, 0.6)',
                  'rgba(249, 115, 22, 0.6)'
                ].slice(0, platforms.length),
                borderWidth: 1
              }
            ]
          });
        }, 1000);
      }
      
      setHasData(true);
    } catch (error) {
      console.error("Erreur lors de la génération des visualisations:", error);
      setErrorMessage("Une erreur est survenue lors de la génération des visualisations.");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  // Simulation d'affichage des composants de graphique
  const renderChart = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center p-12">
          <RefreshCw className="w-8 h-8 text-blue-500 animate-spin mb-4" />
          <p className="text-gray-400">Génération des visualisations en cours...</p>
        </div>
      );
    }
    
    if (!hasData) {
      return (
        <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-700 rounded-lg">
          <div className="bg-gray-800 p-4 rounded-full mb-4">
            <BarChart className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">Aucune visualisation disponible</h3>
          <p className="text-gray-400 mb-4 text-center max-w-md">
            Importez vos données ou sélectionnez une plateforme et une période, puis cliquez sur "Générer les graphiques" pour commencer.
          </p>
          
          <div className="mt-1 mb-6 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-600 rounded-md w-full max-w-md">
            <div className="space-y-1 text-center">
              <FileUp className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-400">
                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-blue-400 hover:text-blue-300 focus-within:outline-none">
                  <span>Importer un fichier</span>
                  <input 
                    id="file-upload" 
                    name="file-upload" 
                    type="file" 
                    className="sr-only" 
                    onChange={handleFileChange}
                    accept=".csv"
                  />
                </label>
                <p className="pl-1">ou glissez-déposez ici</p>
              </div>
              <p className="text-xs text-gray-400">
                Format CSV recommandé (max. 10MB)
              </p>
              {file && (
                <p className="text-sm text-green-400 font-medium">
                  {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>
          </div>
          
          <button
            onClick={generateData}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center gap-2"
          >
            <BarChart className="w-4 h-4" />
            Générer les graphiques
          </button>
        </div>
      );
    }

    // Affichage du graphique sélectionné
    return (
      <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-white">
            {selectedChart === 'performance' && 'Performance des campagnes'}
            {selectedChart === 'conversion' && 'Taux de conversion'}
            {selectedChart === 'platform' && 'Répartition des dépenses par plateforme'}
          </h3>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-700 rounded-lg">
              <Download className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-700 rounded-lg">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="h-96 w-full">
          {/* Ici, vous inséreriez vos composants de graphique réels */}
          {/* Par exemple, avec Chart.js, Recharts ou autre bibliothèque */}
          <div className="h-full w-full flex items-center justify-center bg-gray-900 rounded-lg">
            {selectedChart === 'performance' && (
              <div className="text-center">
                <LineChart className="w-12 h-12 mx-auto text-blue-500 mb-4" />
                <p className="text-gray-400">Graphique des impressions/clics</p>
                <p className="text-sm text-gray-500 mt-2">
                  Labels: {performanceData.labels.join(', ')}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Données: {performanceData.datasets[0].data.join(', ')}
                </p>
              </div>
            )}
            
            {selectedChart === 'conversion' && (
              <div className="text-center">
                <BarChart className="w-12 h-12 mx-auto text-green-500 mb-4" />
                <p className="text-gray-400">Graphique des taux de conversion</p>
                <p className="text-sm text-gray-500 mt-2">
                  Labels: {conversionData.labels.join(', ')}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Données: {conversionData.datasets[0].data.join(', ')}
                </p>
              </div>
            )}
            
            {selectedChart === 'platform' && (
              <div className="text-center">
                <PieChart className="w-12 h-12 mx-auto text-purple-500 mb-4" />
                <p className="text-gray-400">Graphique de répartition par plateforme</p>
                <p className="text-sm text-gray-500 mt-2">
                  Labels: {platformData.labels.join(', ')}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Données: {platformData.datasets[0].data.join(', ')}
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Suggestions de visualisations par l'IA */}
        {useAI && visualizationSuggestions.length > 0 && (
          <div className="mt-6 border-t border-gray-700 pt-4">
            <h4 className="text-md font-medium text-white mb-3">Suggestions de l'IA</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {visualizationSuggestions.map((suggestion, index) => (
                <div key={index} className="p-3 bg-gray-900 rounded-lg border border-gray-700">
                  <div className="flex items-start gap-2">
                    {suggestion.type === 'line' && <LineChart className="w-4 h-4 text-blue-400 mt-0.5" />}
                    {suggestion.type === 'bar' && <BarChart className="w-4 h-4 text-green-400 mt-0.5" />}
                    {suggestion.type === 'pie' && <PieChart className="w-4 h-4 text-purple-400 mt-0.5" />}
                    <div>
                      <h5 className="text-sm font-medium text-white">{suggestion.title}</h5>
                      <p className="text-xs text-gray-400 mt-1">{suggestion.description}</p>
                      <div className="mt-2 text-xs text-gray-500">
                        <span className="text-gray-400">X:</span> {suggestion.dataMapping.xAxis}
                        {' • '}
                        <span className="text-gray-400">Y:</span> {suggestion.dataMapping.yAxis}
                        {suggestion.dataMapping.groupBy && (
                          <>
                            {' • '}
                            <span className="text-gray-400">Groupé par:</span> {suggestion.dataMapping.groupBy}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto">
      {/* Filtres */}
      <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-end">
          <div className="flex-1">
            <label htmlFor="platform" className="block text-sm font-medium text-gray-300 mb-1">
              Plateforme
            </label>
            <div className="relative">
              <select
                id="platform"
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-gray-700 text-white"
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
              >
                <option value="facebook">Facebook</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <label htmlFor="timeframe" className="block text-sm font-medium text-gray-300 mb-1">
              Période
            </label>
            <div className="relative">
              <select
                id="timeframe"
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-gray-700 text-white"
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
              >
                <option value="7days">7 jours</option>
                <option value="30days">30 jours</option>
                <option value="90days">90 jours</option>
                <option value="year">12 mois</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 mb-2 md:mb-0">
            <span className="text-sm text-gray-300">IA</span>
            <button 
              onClick={toggleAI}
              className="text-gray-400 hover:text-gray-300 transition-colors"
            >
              {useAI ? (
                <ToggleRight className="w-6 h-6 text-blue-400" />
              ) : (
                <ToggleLeft className="w-6 h-6" />
              )}
            </button>
          </div>
          
          <div className="flex-1 md:flex-initial">
            <button
              onClick={generateData}
              className="w-full md:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center gap-2 justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <BarChart className="w-4 h-4" />
              )}
              Générer les graphiques
            </button>
          </div>
        </div>
        
        {/* Section pour importer un fichier */}
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-300">Importer des données</h3>
            {file && (
              <span className="text-xs text-green-400">
                {file.name} • {fileData.length} entrées
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <input
              id="file-upload-inline"
              name="file-upload-inline"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".csv"
            />
            <button
              onClick={() => document.getElementById('file-upload-inline')?.click()}
              className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              Importer CSV
            </button>
            {useAI && (
              <span className="text-xs text-gray-400">
                {tokenCost > 0 ? `Coût estimé: ${tokenCost} tokens` : ''}
              </span>
            )}
          </div>
        </div>
        
        {errorMessage && (
          <div className="mt-4 text-sm text-red-400">
            {errorMessage}
          </div>
        )}
      </div>

      {/* Types de graphiques */}
      {hasData && (
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setSelectedChart('performance')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              selectedChart === 'performance'
                ? 'bg-blue-900/30 text-blue-400'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
            }`}
          >
            <LineChart className="w-4 h-4" />
            Performance
          </button>
          
          <button
            onClick={() => setSelectedChart('conversion')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              selectedChart === 'conversion'
                ? 'bg-blue-900/30 text-blue-400'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
            }`}
          >
            <BarChart className="w-4 h-4" />
            Conversion
          </button>
          
          <button
            onClick={() => setSelectedChart('platform')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              selectedChart === 'platform'
                ? 'bg-blue-900/30 text-blue-400'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
            }`}
          >
            <PieChart className="w-4 h-4" />
            Plateformes
          </button>
        </div>
      )}

      {/* Contenu principal */}
      <div>
        {renderChart()}
      </div>
    </div>
  );
} 