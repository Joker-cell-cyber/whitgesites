'use client';

import { useState } from 'react';
import { 
  TrendingUp, 
  Calendar, 
  FileInput, 
  ChevronDown, 
  RefreshCw,
  Download,
  Upload,
  Target,
  Zap,
  BarChart,
  DollarSign,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { useAuth } from '@/app/context/auth-context';
import { OpenAIService } from '@/app/lib/services/openai-service';
import { API_COSTS } from '@/app/config/tokens';

// Types pour les prédictions
type PredictionType = 'performance' | 'budget' | 'audience';
type TimeHorizon = '1month' | '3months' | '6months' | '12months';

interface PredictionResult {
  title: string;
  description: string;
  metrics: {
    name: string;
    current: number;
    predicted: number;
    change: number;
  }[];
  recommendations: string[];
}

export default function PredictiveAnalyticsPage() {
  const { user } = useAuth();
  const [predictionType, setPredictionType] = useState<PredictionType>('performance');
  const [timeHorizon, setTimeHorizon] = useState<TimeHorizon>('3months');
  const [isLoading, setIsLoading] = useState(false);
  const [hasPredictions, setHasPredictions] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [fileData, setFileData] = useState<any[]>([]);
  const [useAI, setUseAI] = useState(true);
  const [tokenCost, setTokenCost] = useState(0);
  
  // Résultats de prédiction
  const [predictionResults, setPredictionResults] = useState<PredictionResult[]>([]);

  // Gestion du changement de type de prédiction
  const handlePredictionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as PredictionType;
    setPredictionType(newType);
    
    // Mise à jour des coûts en fonction du type de prédiction
    updateTokenCost(newType, timeHorizon, fileData.length);
  };
  
  // Gestion du changement d'horizon temporel
  const handleTimeHorizonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newHorizon = e.target.value as TimeHorizon;
    setTimeHorizon(newHorizon);
    
    // Mise à jour des coûts en fonction de l'horizon temporel
    updateTokenCost(predictionType, newHorizon, fileData.length);
  };
  
  // Mise à jour des coûts estimés en tokens
  const updateTokenCost = (type: PredictionType, horizon: TimeHorizon, dataSize: number) => {
    let cost = API_COSTS.PREDICTION.SHORT_TERM;
    
    // Coût plus élevé pour les prédictions à long terme
    if (horizon === '6months' || horizon === '12months') {
      cost = API_COSTS.PREDICTION.LONG_TERM;
    }
    
    // Ajustement en fonction du volume de données
    if (dataSize > 0) {
      cost += Math.min(Math.floor(dataSize / 100), 5); // Max +5 pour éviter des coûts excessifs
    }
    
    setTokenCost(cost);
  };
  
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
        setErrorMessage("Format non supporté. Veuillez utiliser un fichier CSV.");
        return;
      }
      
      try {
        // Lecture du fichier
        const data = await readFileContent(selectedFile);
        setFileData(data);
        
        // Mise à jour des coûts en fonction du volume de données
        updateTokenCost(predictionType, timeHorizon, data.length);
        
        setSuccessMessage(`Fichier importé avec succès. ${data.length} entrées trouvées.`);
      } catch (error) {
        console.error("Erreur lors de la lecture du fichier:", error);
        setErrorMessage("Le fichier n'a pas pu être traité. Vérifiez son format.");
      }
    }
  };
  
  // Toggle pour l'utilisation de l'IA
  const toggleAI = () => {
    setUseAI(!useAI);
  };

  // Fonction pour générer des prédictions avec l'IA
  const generatePredictions = async () => {
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    try {
      if (useAI && fileData.length > 0) {
        // Utilisation de l'API OpenAI via notre service
        const result = await OpenAIService.generatePredictions(
          fileData,
          predictionType,
          timeHorizon === '1month' ? '1 mois' : 
          timeHorizon === '3months' ? '3 mois' : 
          timeHorizon === '6months' ? '6 mois' : '12 mois'
        );
        
        // Mise en forme des résultats
        setPredictionResults([result]);
        setHasPredictions(true);
        setSuccessMessage("Prédictions générées avec succès par IA!");
      } else {
        // Simuler des résultats différents selon le type de prédiction (code existant)
        setTimeout(() => {
          if (predictionType === 'performance') {
            setPredictionResults([
              {
                title: "Simulation de performance publicitaire",
                description: `Voici nos estimations pour les ${timeHorizon === '1month' ? 'prochains 30 jours' : timeHorizon === '3months' ? 'prochains 90 jours' : timeHorizon === '6months' ? 'prochains 180 jours' : 'prochains 365 jours'}.`,
                metrics: [
                  {
                    name: "CTR moyen",
                    current: 2.4,
                    predicted: 2.9,
                    change: 20.8
                  },
                  {
                    name: "Coût par conversion",
                    current: 12.5,
                    predicted: 10.2,
                    change: -18.4
                  },
                  {
                    name: "Taux de conversion",
                    current: 3.2,
                    predicted: 3.8,
                    change: 18.7
                  }
                ],
                recommendations: [
                  "Augmentez votre budget sur les campagnes Facebook qui montrent un fort potentiel de croissance",
                  "Optimisez vos annonces Google Ads en vous concentrant sur les mots-clés à conversion élevée",
                  "Révisez vos publications sponsorisées sur LinkedIn pour améliorer l'engagement"
                ]
              }
            ]);
          } else if (predictionType === 'budget') {
            setPredictionResults([
              {
                title: "Simulation d'allocation budgétaire",
                description: `Suggestions d'allocation pour les ${timeHorizon === '1month' ? 'prochains 30 jours' : timeHorizon === '3months' ? 'prochains 90 jours' : timeHorizon === '6months' ? 'prochains 180 jours' : 'prochains 365 jours'}.`,
                metrics: [
                  {
                    name: "ROI projeté",
                    current: 210,
                    predicted: 265,
                    change: 26.2
                  },
                  {
                    name: "Coût d'acquisition",
                    current: 28.5,
                    predicted: 23.2,
                    change: -18.6
                  },
                  {
                    name: "Budget mensuel optimal",
                    current: 5000,
                    predicted: 6500,
                    change: 30.0
                  }
                ],
                recommendations: [
                  "Réallouez 30% de votre budget Google Ads vers les campagnes à forte conversion",
                  "Augmentez progressivement le budget Facebook de 15% par mois",
                  "Réduisez les dépenses sur les campagnes à faible performance de 25%",
                  "Testez de nouvelles plateformes comme TikTok avec 10% de votre budget global"
                ]
              }
            ]);
          } else {
            setPredictionResults([
              {
                title: "Simulation d'audience",
                description: `Estimation d'audience pour les ${timeHorizon === '1month' ? 'prochains 30 jours' : timeHorizon === '3months' ? 'prochains 90 jours' : timeHorizon === '6months' ? 'prochains 180 jours' : 'prochains 365 jours'}.`,
                metrics: [
                  {
                    name: "Taille d'audience potentielle",
                    current: 120000,
                    predicted: 185000,
                    change: 54.2
                  },
                  {
                    name: "Taux d'engagement",
                    current: 1.8,
                    predicted: 2.5,
                    change: 38.9
                  },
                  {
                    name: "Coût par mille impressions",
                    current: 7.2,
                    predicted: 6.4,
                    change: -11.1
                  }
                ],
                recommendations: [
                  "Ciblez davantage la tranche démographique 25-34 ans qui montre le plus fort potentiel",
                  "Développez du contenu spécifique pour les utilisateurs mobiles qui représenteront 78% de votre audience",
                  "Enrichissez vos campagnes avec des formats vidéo courts pour maximiser l'engagement",
                  "Explorez de nouveaux segments d'audience dans les secteurs technologie et éducation"
                ]
              }
            ]);
          }
          
          setHasPredictions(true);
          setSuccessMessage("Simulations générées avec succès!");
        }, 1500);
      }
    } catch (error) {
      console.error("Erreur lors de la génération:", error);
      setErrorMessage("Une erreur est survenue lors de la génération des prédictions.");
    } finally {
      setIsLoading(false);
      // Effacer le message de succès après quelques secondes
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
  };

  return (
    <div className="container mx-auto">
      {/* Formulaire de prédiction */}
      <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6 mb-6">
        <h3 className="text-lg font-medium text-white mb-4">Générer des simulations</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Type de simulation
            </label>
            <div className="relative">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-gray-700 text-white"
                value={predictionType}
                onChange={handlePredictionTypeChange}
              >
                <option value="performance">Performance des campagnes</option>
                <option value="budget">Simulation du budget</option>
                <option value="audience">Analyse d'audience</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-400">
              Sélectionnez le type de simulation que vous souhaitez générer.
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Période
            </label>
            <div className="relative">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-gray-700 text-white"
                value={timeHorizon}
                onChange={handleTimeHorizonChange}
              >
                <option value="1month">1 mois</option>
                <option value="3months">3 mois</option>
                <option value="6months">6 mois</option>
                <option value="12months">12 mois</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-400">
              Sur quelle période souhaitez-vous faire votre simulation.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Données à analyser
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-600 rounded-md">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
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
          <p className="mt-1 text-xs text-gray-400">
            Importez vos données publicitaires pour une simulation plus précise. Facultatif: si non fourni, nous utiliserons des données génériques.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <span className="text-sm text-gray-300">Utiliser l'IA pour l'analyse</span>
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
            <span className="text-xs text-gray-400 ml-2">
              {useAI ? `Coût estimé: ${tokenCost} tokens` : 'Mode standard'}
            </span>
          </div>
          
          <button
            onClick={generatePredictions}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Génération en cours...
              </>
            ) : (
              <>
                <TrendingUp className="w-4 h-4" />
                Générer la simulation
              </>
            )}
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            {errorMessage && (
              <div className="text-sm text-red-400">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="text-sm text-green-400">
                {successMessage}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Résultats de prédiction */}
      {isLoading ? (
        <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-12">
          <div className="flex flex-col items-center justify-center">
            <RefreshCw className="w-12 h-12 text-blue-500 animate-spin mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Simulation en cours</h3>
            <p className="text-gray-400 text-center max-w-md">
              Nous générons des simulations basées sur le profil sélectionné. Cela peut prendre quelques instants...
            </p>
          </div>
        </div>
      ) : hasPredictions ? (
        <div className="space-y-6">
          {predictionResults.map((result, index) => (
            <div key={index} className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-white">{result.title}</h3>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-700 rounded-lg">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-6">{result.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {result.metrics.map((metric, i) => (
                    <div key={i} className="bg-gray-900 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm font-medium text-gray-300">{metric.name}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          metric.change > 0 
                            ? 'bg-green-900/30 text-green-300' 
                            : 'bg-red-900/30 text-red-300'
                        }`}>
                          {metric.change > 0 ? '+' : ''}{metric.change}%
                        </span>
                      </div>
                      <div className="flex items-end gap-3">
                        <div>
                          <p className="text-xs text-gray-400">Actuel</p>
                          <p className="text-lg font-bold text-white">
                            {metric.name.includes('Coût') || metric.name.includes('Budget') ? '€' : ''}{metric.current}
                            {metric.name.includes('Taux') || metric.name.includes('CTR') ? '%' : ''}
                          </p>
                        </div>
                        <div className="text-gray-600">→</div>
                        <div>
                          <p className="text-xs text-gray-400">Prédit</p>
                          <p className="text-lg font-bold text-blue-400">
                            {metric.name.includes('Coût') || metric.name.includes('Budget') ? '€' : ''}{metric.predicted}
                            {metric.name.includes('Taux') || metric.name.includes('CTR') ? '%' : ''}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-white mb-4">Suggestions d'amélioration</h4>
                  <ul className="space-y-3">
                    {result.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-900 flex items-center justify-center">
                          <span className="text-blue-400 text-xs font-medium">{i+1}</span>
                        </div>
                        <p className="text-gray-300">{rec}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
} 