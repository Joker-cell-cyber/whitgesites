'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/auth-context';
import { useStats } from '@/app/context/stats-context';
import { getUserProfile } from '@/app/lib/auth-service';
import { calculateTokenCost, wordCountToLength, markdownToHtml, markdownToText } from '@/app/lib/article-utils';
import GenerationForm from '@/app/components/article/generation-form';
import ArticlePreview from '@/app/components/article/article-preview';

// Styles spécifiques à la page de génération pour éviter les conflits CSS
const pageStyles = `
  .generate-page input, 
  .generate-page textarea, 
  .generate-page select, 
  .generate-page option {
    color: black !important;
  }
  
  .generate-page select option {
    background-color: white !important;
    color: black !important;
  }
`;

export default function GeneratePage() {
  const { user } = useAuth();
  const { stats, refreshStats, forceFullRefresh } = useStats();
  
  // États pour la génération
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tokenBalance, setTokenBalance] = useState<number>(0);
  const [isLoadingBalance, setIsLoadingBalance] = useState(true);
  const [stage, setStage] = useState(0);
  const [stageProgress, setStageProgress] = useState(0);
  const [lastFormData, setLastFormData] = useState<any>(null);
  
  // États pour les résultats
  const [generationTime, setGenerationTime] = useState<number | null>(null);
  const [generationStats, setGenerationStats] = useState<{
    wordCount: number;
    readingTime: number;
    tokensUsed: number;
    requestedWordCount?: number;
    wordCountPercentage?: number;
    seoScore?: number;
  } | null>(null);
  const [wordCountInfo, setWordCountInfo] = useState<string | null>(null);
  const [wordCountStatus, setWordCountStatus] = useState<'success' | 'warning' | 'error' | null>(null);
  const [articleStructure, setArticleStructure] = useState<{ level: number; title: string }[] | null>(null);
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [textContent, setTextContent] = useState<string | null>(null);
  const [seoAnalysis, setSeoAnalysis] = useState<{
    keywordDensity: number;
    readabilityScore: number;
    suggestions: string[];
  } | null>(null);

  // Fonction pour réinitialiser le formulaire et l'état
  const resetForm = () => {
    setGeneratedContent(null);
    setError(null);
    setStage(0);
    setStageProgress(0);
    setGenerationTime(null);
    setGenerationStats(null);
    setWordCountInfo(null);
    setWordCountStatus(null);
    setArticleStructure(null);
    setHtmlContent(null);
    setTextContent(null);
    setLastFormData(null);
    setSeoAnalysis(null);
  };

  // Charger le solde de tokens
  useEffect(() => {
    if (stats) {
      setTokenBalance(stats.tokenBalance);
      setIsLoadingBalance(false);
    }
  }, [stats]);

  // Calculer le coût en tokens en fonction de la longueur et des options avancées
  const calculateAdvancedTokenCost = (wordCount: number, hasAdvancedOptions: boolean = false) => {
    // Base: 1 token pour 500 mots
    let cost = Math.ceil(wordCount / 500);
    
    // Ajouter un coût supplémentaire pour les options avancées
    if (hasAdvancedOptions) {
      // +1 token pour les articles de plus de 1500 mots avec options avancées
      if (wordCount > 1500) cost += 1;
      
      // +1 token pour les articles ultra-détaillés (2000+ mots)
      if (wordCount > 2000) cost += 1;
    }
    
    return cost;
  };

  // Calculer le coût en tokens (valeur par défaut)
  const [tokenCost, setTokenCost] = useState(calculateAdvancedTokenCost(1200));
  const hasEnoughTokens = tokenBalance >= tokenCost;

  // Gérer la soumission du formulaire
  const handleSubmit = async (formData: any) => {
    // Vérifier si l'utilisateur a assez de tokens
    const advancedOptions = formData.requiredElements && 
      Object.values(formData.requiredElements).some(val => val === true);
    const actualTokenCost = calculateAdvancedTokenCost(formData.wordCount, advancedOptions);
    
    // Mettre à jour le coût en tokens
    setTokenCost(actualTokenCost);
    
    if (tokenBalance < actualTokenCost) {
      setError('Solde de tokens insuffisant. Veuillez acheter plus de tokens.');
      return;
    }
    
    setIsGenerating(true);
    setError(null);
    setStage(1);
    setStageProgress(0.2);
    setHtmlContent(null);
    setTextContent(null);
    setLastFormData(formData);
    setSeoAnalysis(null);

    try {
      // Simuler la progression
      const progressInterval = simulateGenerationProgress(formData.wordCount);
      
      // Préparer les données pour l'API
      const apiData = {
        ...formData,
        memberId: user?.memberId,
        length: wordCountToLength(formData.wordCount),
        // Convertir les objets de cases à cocher en tableaux pour l'API
        requiredElements: Object.entries(formData.requiredElements)
          .filter(([_, value]) => value === true)
          .map(([key]) => key)
      };
      
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la génération de l\'article');
      }

      // Arrêter la simulation de progression
      clearInterval(progressInterval);
      
      // Marquer comme terminé
      setStage(getStageCount(formData.wordCount));
      setStageProgress(1);
      
      const data = await response.json();
      
      if (data.success) {
        // Mettre à jour le solde de tokens
        if (data.newTokenBalance !== undefined) {
          console.log(`[generate-page] Nouveau solde de tokens reçu de l'API: ${data.newTokenBalance}, ancien solde: ${tokenBalance}`);
          setTokenBalance(data.newTokenBalance);
        }
        
        // Rafraîchir les statistiques après une génération réussie (forcer le rafraîchissement)
        console.log('[generate-page] Forçage du rafraîchissement des statistiques après génération d\'article');
        try {
          await forceFullRefresh();
          console.log('[generate-page] Rafraîchissement des statistiques réussi');
        } catch (refreshError) {
          console.error('[generate-page] Erreur lors du rafraîchissement des statistiques:', refreshError);
        }
        
        // Mettre à jour le contenu généré
        setGeneratedContent(data.content);
        
        // Convertir le markdown en HTML et texte si nécessaire
        const html = data.htmlContent || markdownToHtml(data.content);
        const text = data.textContent || markdownToText(data.content);
        
        setHtmlContent(html);
        setTextContent(text);
        setGenerationTime(data.generationTime);
        
        // Mettre à jour les statistiques de génération
        setGenerationStats({
          wordCount: data.article.wordCount,
          readingTime: data.article.readingTime,
          tokensUsed: data.article.tokensUsed,
          requestedWordCount: data.requestedWordCount,
          wordCountPercentage: data.wordCountPercentage,
          seoScore: data.seoScore || 0
        });
        
        setWordCountInfo(data.wordCountInfo || null);
        setWordCountStatus(data.wordCountStatus || null);
        setArticleStructure(data.structure || null);
        
        // Ajouter l'analyse SEO
        if (data.seoAnalysis) {
          setSeoAnalysis({
            keywordDensity: data.seoAnalysis.keywordDensity || 0,
            readabilityScore: data.seoAnalysis.readabilityScore || 0,
            suggestions: data.seoAnalysis.suggestions || []
          });
        }
      } else {
        setError(data.error || 'Une erreur est survenue');
      }
    } catch (err) {
      setStage(0);
      setStageProgress(0);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsGenerating(false);
    }
  };

  // Simuler la progression de la génération
  const simulateGenerationProgress = (wordCount: number) => {
    let currentStage = 1;
    let progress = 0.05; // Commencer à 5% pour une progression plus graduelle
    const stageCount = getStageCount(wordCount);
    
    // Calculer la durée estimée en fonction du nombre de mots
    // Plus l'article est long, plus la génération prend du temps
    const estimatedDuration = wordCount <= 800 ? 20000 : // 20 secondes pour les articles courts
                             wordCount <= 1500 ? 35000 : // 35 secondes pour les articles moyens
                             50000; // 50 secondes pour les articles longs
    
    // Définir les étapes de progression avec des pourcentages différents pour chaque étape
    const stages = [
      { name: "Analyse du sujet", percentage: 0.10 },
      { name: "Création de la structure", percentage: 0.15 },
      { name: "Génération de l'introduction", percentage: 0.10 },
      { name: "Génération du contenu principal", percentage: 0.40 },
      { name: "Génération de la conclusion", percentage: 0.15 },
      { name: "Optimisation SEO", percentage: 0.05 },
      { name: "Finalisation", percentage: 0.05 }
    ];
    
    // Limiter le nombre d'étapes en fonction de stageCount
    const activeStages = stages.slice(0, stageCount);
    
    // Recalculer les pourcentages pour qu'ils totalisent 100%
    const totalPercentage = activeStages.reduce((sum, stage) => sum + stage.percentage, 0);
    activeStages.forEach(stage => {
      stage.percentage = stage.percentage / totalPercentage;
    });
    
    // Calculer les durées pour chaque étape
    const stageDurations = activeStages.map(stage => 
      Math.floor(estimatedDuration * stage.percentage)
    );
    
    let stageIndex = 0;
    let stageStartTime = Date.now();
    
    // Fonction récursive pour passer à l'étape suivante
    const moveToNextStage = () => {
      currentStage++;
      stageIndex++;
      stageStartTime = Date.now();
      
      if (currentStage <= stageCount) {
        setStage(currentStage);
        setStageProgress(0);
      }
    };
    
    // Créer l'intervalle pour mettre à jour la progression
    const progressInterval = setInterval(() => {
      if (stageIndex >= activeStages.length) {
        clearInterval(progressInterval);
          return;
      }
      
      const currentTime = Date.now();
      const stageElapsed = currentTime - stageStartTime;
      const stageDuration = stageDurations[stageIndex];
      
      // Calculer la progression de l'étape actuelle
      let stageProgressValue = Math.min(stageElapsed / stageDuration, 1);
      
      // Mettre à jour la progression
      setStageProgress(stageProgressValue);
      
      // Si l'étape est terminée, passer à la suivante
      if (stageProgressValue >= 1 && stageIndex < activeStages.length - 1) {
        moveToNextStage();
      }
    }, 100); // Mettre à jour tous les 100ms
    
    return progressInterval;
  };

  // Obtenir le nombre d'étapes en fonction de la longueur de l'article
  const getStageCount = (wordCount: number): number => {
    if (wordCount <= 500) return 3; // Articles très courts
    if (wordCount <= 1000) return 4; // Articles courts
    if (wordCount <= 2000) return 5; // Articles moyens
    return 7; // Articles longs (>2000 mots)
  };

  return (
    <div className="space-y-6 generate-page">
      <style jsx global>{pageStyles}</style>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Générer un article</h1>
          <p className="text-slate-600">Créez un article optimisé pour le SEO</p>
        </div>
      </div>

      {/* Afficher le formulaire si aucun contenu n'a été généré */}
      {!generatedContent ? (
        <div>
          {/* Solde et coût des tokens */}
          <div className="mb-6 p-6 bg-white rounded-xl shadow">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-lg text-slate-800 font-semibold mb-1">Solde de tokens</h2>
                <p className="text-slate-600">
                  {isLoadingBalance 
                    ? "Chargement du solde..." 
                    : `Vous avez actuellement ${tokenBalance} tokens`}
                </p>
              </div>
              
              <div className="bg-slate-100 px-5 py-3 rounded-lg border border-slate-200 text-center">
                <p className="text-sm text-slate-500">Coût estimé</p>
                <p className={`text-xl font-bold ${hasEnoughTokens ? 'text-teal-600' : 'text-red-600'}`}>
                  {tokenCost} tokens
                </p>
              </div>
            </div>
          </div>
      
          {/* Message d'erreur */}
      {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </p>
        </div>
      )}

      {/* Formulaire de génération */}
          <div className="bg-white rounded-xl shadow p-6">
        <GenerationForm
          onSubmit={handleSubmit}
          isGenerating={isGenerating}
              tokenCost={tokenCost}
              calculateTokenCost={calculateAdvancedTokenCost}
          hasEnoughTokens={hasEnoughTokens}
          tokenBalance={tokenBalance}
          isLoadingBalance={isLoadingBalance}
          stage={stage}
          stageProgress={stageProgress}
            />
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Stats de génération */}
          {generationStats && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-xl shadow p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-slate-500 text-sm font-medium">Mots générés</h3>
                  <div className="h-8 w-8 bg-teal-100 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 3v4M8 3v4M3 11h18" />
                    </svg>
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-800">{generationStats.wordCount}</p>
                {generationStats.requestedWordCount && (
                  <div className="mt-4">
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          wordCountStatus === 'success' ? 'bg-emerald-500' :
                          wordCountStatus === 'warning' ? 'bg-amber-500' :
                          wordCountStatus === 'error' ? 'bg-red-500' :
                          'bg-teal-500'
                        }`}
                        style={{ width: `${Math.min(100, (generationStats.wordCount / generationStats.requestedWordCount) * 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                      {wordCountInfo || `${Math.round((generationStats.wordCount / generationStats.requestedWordCount) * 100)}% du nombre demandé`}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="bg-white rounded-xl shadow p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-slate-500 text-sm font-medium">Temps de lecture</h3>
                  <div className="h-8 w-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-800">{generationStats.readingTime} min</p>
              </div>
              
              <div className="bg-white rounded-xl shadow p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-slate-500 text-sm font-medium">Tokens utilisés</h3>
                  <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-800">{generationStats.tokensUsed}</p>
                <p className="text-sm text-slate-500 mt-4">Nouveau solde: {tokenBalance}</p>
              </div>
            </div>
          )}
          
          {/* Aperçu de l'article */}
          <div className="bg-white rounded-xl shadow p-6">
        <ArticlePreview
          generatedContent={generatedContent}
          htmlContent={htmlContent}
              textContent={generatedContent}
          generationStats={generationStats}
          generationTime={generationTime}
              wordCountInfo={null}
              wordCountStatus={null}
          articleStructure={articleStructure}
          seoAnalysis={seoAnalysis}
          onRegenerate={handleSubmit}
          onReset={resetForm}
          isGenerating={isGenerating}
        />
          </div>
        </div>
      )}
      
      {/* Indicateur de progression de la génération */}
      {isGenerating && (
        <div className="fixed inset-0 bg-slate-900/80 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
            <h2 className="text-xl font-bold text-slate-800 mb-6 text-center">Génération en cours</h2>
            
            {/* Étapes de progression */}
            <div className="space-y-4 mb-8">
              {Array.from({ length: getStageCount(lastFormData?.wordCount || 1200) }).map((_, index) => {
                const isActive = index + 1 === stage;
                const isCompleted = index + 1 < stage;
                
                return (
                  <div key={index} className="flex items-center">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      isCompleted ? 'bg-teal-500 text-white' :
                      isActive ? 'bg-teal-100 text-teal-600 border border-teal-300' :
                      'bg-slate-100 text-slate-400'
                    }`}>
                      {isCompleted ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="ml-4 flex-grow">
                      <p className={`font-medium ${
                        isActive ? 'text-teal-600' :
                        isCompleted ? 'text-slate-800' :
                        'text-slate-400'
                      }`}>
                        {index === 0 && "Analyse du sujet"}
                        {index === 1 && "Création de la structure"}
                        {index === 2 && "Génération de l'introduction"}
                        {index === 3 && "Génération du contenu principal"}
                        {index === 4 && "Génération de la conclusion"}
                        {index === 5 && "Optimisation SEO"}
                        {index === 6 && "Finalisation"}
                      </p>
                      
                      {isActive && (
                        <div className="mt-2 w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-teal-400 to-emerald-500"
                            style={{ width: `${stageProgress * 100}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <p className="text-center text-slate-500 text-sm">
              Cette opération peut prendre jusqu'à {lastFormData?.wordCount <= 800 ? '30' : lastFormData?.wordCount <= 1500 ? '45' : '60'} secondes selon la complexité...
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 