'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/auth-context';
import { useStats } from '@/app/context/stats-context';
import { getUserProfile } from '@/app/lib/auth-service';
import { calculateTokenCost, wordCountToLength, markdownToHtml, markdownToText } from '@/app/lib/article-utils';
import GenerationForm from '@/app/components/article/generation-form';
import ArticlePreview from '@/app/components/article/article-preview';

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
    let stageProgress = 0;
    
    const interval = setInterval(() => {
      // Incrémenter la progression de l'étape actuelle
      stageProgress += 0.02; // Progression plus lente et régulière
      
      if (stageProgress >= 1) {
        // Passer à l'étape suivante
        stageIndex++;
        stageProgress = 0;
        
        if (stageIndex >= activeStages.length - 1) {
          // Laisser la dernière étape pour la fin réelle
          clearInterval(interval);
          return;
        }
        
        // Mettre à jour l'étape actuelle
        currentStage = stageIndex + 1;
      }
      
      // Calculer la progression globale
      const previousStagesPercentage = activeStages
        .slice(0, stageIndex)
        .reduce((sum, stage) => sum + stage.percentage, 0);
      
      const currentStageContribution = 
        activeStages[stageIndex].percentage * stageProgress;
      
      const totalProgress = previousStagesPercentage + currentStageContribution;
      
      // Limiter la progression à 80% maximum pour laisser la fin à la réponse réelle
      const cappedProgress = Math.min(totalProgress, 0.8);
      
      setStage(currentStage);
      setStageProgress(stageProgress);
    }, 200); // Mise à jour plus fréquente pour une animation plus fluide
    
    return interval;
  };

  // Calculer le nombre d'étapes en fonction du nombre de mots
  const getStageCount = (wordCount: number): number => {
    if (wordCount <= 800) return 5; // Articles courts: 5 étapes
    if (wordCount <= 1500) return 6; // Articles moyens: 6 étapes
    return 7; // Articles longs: 7 étapes
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Générateur d'articles SEO</h1>
        <p className="text-gray-400">Créez des articles optimisés selon les règles SEO de 2025</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* Formulaire de génération */}
      {!generatedContent && (
        <GenerationForm
          onSubmit={handleSubmit}
          isGenerating={isGenerating}
          hasEnoughTokens={hasEnoughTokens}
          tokenBalance={tokenBalance}
          tokenCost={tokenCost}
          isLoadingBalance={isLoadingBalance}
          stage={stage}
          stageProgress={stageProgress}
          calculateTokenCost={calculateAdvancedTokenCost}
        />
      )}

      {/* Aperçu de l'article généré */}
      {generatedContent && (
        <ArticlePreview
          generatedContent={generatedContent}
          htmlContent={htmlContent}
          textContent={textContent}
          generationStats={generationStats}
          generationTime={generationTime}
          wordCountInfo={wordCountInfo}
          wordCountStatus={wordCountStatus}
          articleStructure={articleStructure}
          seoAnalysis={seoAnalysis}
          onRegenerate={handleSubmit}
          onReset={resetForm}
          isGenerating={isGenerating}
        />
      )}
    </div>
  );
} 