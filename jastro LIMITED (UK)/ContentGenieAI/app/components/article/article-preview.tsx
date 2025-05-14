'use client';

import { useState } from 'react';
import { Button } from "@/app/components/ui/button";
import ExportArticle from './export-article';

interface ArticlePreviewProps {
  generatedContent: string;
  htmlContent: string | null;
  textContent: string | null;
  generationStats: {
    wordCount: number;
    readingTime: number;
    tokensUsed: number;
    requestedWordCount?: number;
    wordCountPercentage?: number;
    seoScore?: number;
  } | null;
  generationTime: number | null;
  wordCountInfo: string | null;
  wordCountStatus: 'success' | 'warning' | 'error' | null;
  articleStructure: { level: number; title: string }[] | null;
  seoAnalysis: {
    keywordDensity: number;
    readabilityScore: number;
    suggestions: string[];
  } | null;
  onRegenerate: (formData: any) => Promise<void>;
  onReset: () => void;
  isGenerating: boolean;
}

export default function ArticlePreview({
  generatedContent,
  htmlContent,
  textContent,
  generationStats,
  generationTime,
  wordCountInfo,
  wordCountStatus,
  articleStructure,
  seoAnalysis,
  onRegenerate,
  onReset,
  isGenerating
}: ArticlePreviewProps) {
  const [selectedFormat, setSelectedFormat] = useState<'markdown' | 'html' | 'text'>('markdown');
  const [lastFormData, setLastFormData] = useState<any>(null);
  const [showSeoDetails, setShowSeoDetails] = useState(false);

  // Extraire le titre de l'article à partir du contenu markdown
  const getArticleTitle = (): string => {
    if (!generatedContent) return 'Article généré';
    
    const lines = generatedContent.split('\n');
    for (const line of lines) {
      if (line.startsWith('# ')) {
        return line.substring(2).trim();
      }
    }
    
    return 'Article généré';
  };

  // Fonction pour régénérer l'article avec les mêmes paramètres
  const handleRegenerate = () => {
    if (lastFormData) {
      onRegenerate(lastFormData);
    }
  };

  // Fonction pour obtenir la couleur en fonction du score SEO
  const getSeoScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  // Fonction pour obtenir la classe de couleur pour la densité de mots-clés
  const getKeywordDensityColor = (density: number): string => {
    if (density >= 1 && density <= 3) return 'text-green-400'; // Idéal
    if ((density > 0.5 && density < 1) || (density > 3 && density <= 4)) return 'text-yellow-400'; // Acceptable
    return 'text-red-400'; // Trop faible ou trop élevé
  };

  // Fonction pour obtenir la classe de couleur pour le score de lisibilité
  const getReadabilityColor = (score: number): string => {
    if (score >= 70) return 'text-green-400'; // Facile à lire
    if (score >= 50) return 'text-yellow-400'; // Modérément difficile
    return 'text-red-400'; // Difficile à lire
  };

  return (
    <div className="mt-6 sm:mt-8 bg-gray-800/50 p-4 sm:p-6 rounded-xl border border-purple-500/20">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-0 mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-white">Article généré</h2>
        <Button 
          onClick={onReset}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-sm sm:text-base"
        >
          Nouveau article
        </Button>
      </div>
      
      {generationStats && (
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-black/30 p-3 sm:p-4 rounded-lg border border-purple-500/20">
            <p className="text-xs sm:text-sm text-gray-400">Mots</p>
            <p className="text-base sm:text-lg font-bold text-white">{generationStats.wordCount}</p>
            {wordCountInfo && (
              <p className={`text-xs mt-1 ${
                wordCountStatus === 'success' ? 'text-green-400' : 
                wordCountStatus === 'warning' ? 'text-yellow-400' : 
                wordCountStatus === 'error' ? 'text-red-400' : 'text-gray-400'
              }`}>
                {wordCountInfo}
                </p>
              )}
          </div>
          
          <div className="bg-black/30 p-3 sm:p-4 rounded-lg border border-purple-500/20">
            <p className="text-xs sm:text-sm text-gray-400">Temps de lecture</p>
            <p className="text-base sm:text-lg font-bold text-white">{generationStats.readingTime} min</p>
          </div>
          
          <div className="bg-black/30 p-3 sm:p-4 rounded-lg border border-purple-500/20">
            <p className="text-xs sm:text-sm text-gray-400">Tokens utilisés</p>
            <p className="text-base sm:text-lg font-bold text-white">{generationStats.tokensUsed}</p>
          </div>
          
          {generationStats.seoScore !== undefined && (
            <div className="bg-black/30 p-3 sm:p-4 rounded-lg border border-purple-500/20">
              <p className="text-xs sm:text-sm text-gray-400">Score SEO</p>
              <p className={`text-base sm:text-lg font-bold ${getSeoScoreColor(generationStats.seoScore)}`}>
                {generationStats.seoScore}/100
              </p>
              <button 
                onClick={() => setShowSeoDetails(!showSeoDetails)}
                className="text-xs text-purple-400 hover:text-purple-300 mt-1"
              >
                {showSeoDetails ? 'Masquer détails' : 'Voir détails'}
              </button>
          </div>
          )}
        </div>
      )}
      
      {generationTime && (
        <p className="text-xs sm:text-sm text-gray-400 mb-4">
          Généré en {(generationTime / 1000).toFixed(1)} secondes
        </p>
      )}
      
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedFormat('markdown')}
          className={`px-3 py-1.5 text-xs sm:text-sm rounded-md ${
            selectedFormat === 'markdown' 
              ? 'bg-purple-600 text-white' 
              : 'bg-black/30 text-gray-300 hover:bg-black/40'
          }`}
        >
          Markdown
        </button>
        <button
          onClick={() => setSelectedFormat('html')}
          className={`px-3 py-1.5 text-xs sm:text-sm rounded-md ${
            selectedFormat === 'html' 
              ? 'bg-purple-600 text-white' 
              : 'bg-black/30 text-gray-300 hover:bg-black/40'
          }`}
        >
          HTML
        </button>
        <button
          onClick={() => setSelectedFormat('text')}
          className={`px-3 py-1.5 text-xs sm:text-sm rounded-md ${
            selectedFormat === 'text' 
              ? 'bg-purple-600 text-white' 
              : 'bg-black/30 text-gray-300 hover:bg-black/40'
          }`}
        >
          Texte brut
        </button>
        
        <div className="ml-auto">
          <ExportArticle 
            markdownContent={generatedContent} 
            htmlContent={htmlContent || ''} 
            textContent={textContent || ''}
            title={getArticleTitle()}
          />
        </div>
      </div>
      
      {/* Analyse SEO */}
      {seoAnalysis && (
        <div className="mb-6 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-white text-sm font-medium flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Analyse SEO
            </h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowSeoDetails(!showSeoDetails)}
              className="text-xs text-indigo-400 hover:text-indigo-300"
            >
              {showSeoDetails ? 'Masquer les détails' : 'Afficher les détails'}
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div className="bg-black/20 p-3 rounded-lg">
              <p className="text-xs text-gray-400 mb-1">Densité de mots-clés</p>
              <p className={`text-lg font-bold ${getKeywordDensityColor(seoAnalysis.keywordDensity)}`}>
                {seoAnalysis.keywordDensity.toFixed(1)}%
              </p>
            </div>
            <div className="bg-black/20 p-3 rounded-lg">
              <p className="text-xs text-gray-400 mb-1">Score de lisibilité</p>
              <p className={`text-lg font-bold ${getReadabilityColor(seoAnalysis.readabilityScore)}`}>
                {seoAnalysis.readabilityScore.toFixed(0)}/100
              </p>
            </div>
          </div>
          
          {showSeoDetails && seoAnalysis.suggestions.length > 0 && (
            <div className="mt-3 bg-black/20 p-3 rounded-lg">
              <p className="text-sm text-white mb-2">Suggestions d'amélioration :</p>
              <ul className="space-y-1">
                {seoAnalysis.suggestions.map((suggestion, index) => (
                  <li key={index} className="text-xs text-gray-300 flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-indigo-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      
      {articleStructure && articleStructure.length > 0 && (
        <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <h3 className="text-white text-sm font-medium mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            Structure de l'article
          </h3>
          <ul className="space-y-1">
            {articleStructure.map((item, index) => (
              <li 
                key={index} 
                className={`text-sm ${
                  item.level === 1 ? 'text-white font-bold' : 
                  item.level === 2 ? 'text-gray-300 font-medium ml-4' : 
                  'text-gray-400 ml-8'
                }`}
              >
                {item.level === 1 ? '# ' : item.level === 2 ? '## ' : '### '}
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 