'use client';

import { useEffect, useState } from 'react';

interface ProgressBarProps {
  isGenerating: boolean;
  wordCount: number;
  stage: number;
  stageProgress: number;
}

export default function ProgressBar({
  isGenerating,
  wordCount,
  stage,
  stageProgress
}: ProgressBarProps) {
  const [totalProgress, setTotalProgress] = useState(0);
  const [stageMessage, setStageMessage] = useState('');

  // Calculer le nombre d'étapes en fonction du nombre de mots
  const getStageCount = (wordCount: number): number => {
    if (wordCount <= 800) return 3; // Articles courts: moins d'étapes
    if (wordCount <= 1500) return 5; // Articles moyens: étapes standard
    return 7; // Articles longs: plus d'étapes pour montrer la progression
  };

  // Obtenir le message pour l'étape actuelle
  const getStageMessage = (stage: number, wordCount: number): string => {
    const stageCount = getStageCount(wordCount);
    
    // Messages pour les articles courts (jusqu'à 800 mots)
    if (wordCount <= 800) {
      switch (stage) {
        case 0: return 'En attente...';
        case 1: return 'Analyse du sujet et des mots-clés...';
        case 2: return 'Rédaction de l\'article optimisé SEO...';
        case 3: return 'Finalisation et optimisation SEO...';
        default: return 'Génération en cours...';
      }
    }
    
    // Messages pour les articles moyens (800-1500 mots)
    else if (wordCount <= 1500) {
      switch (stage) {
        case 0: return 'En attente...';
        case 1: return 'Analyse du sujet et des mots-clés...';
        case 2: return 'Recherche d\'informations pertinentes...';
        case 3: return 'Création de la structure SEO optimisée...';
        case 4: return 'Rédaction du contenu avec optimisation SEO...';
        case 5: return 'Finalisation et vérification SEO...';
        default: return 'Génération en cours...';
      }
    }
    
    // Messages pour les articles longs (plus de 1500 mots)
    else {
      switch (stage) {
        case 0: return 'En attente...';
        case 1: return 'Analyse du sujet et des mots-clés...';
        case 2: return 'Recherche d\'informations pertinentes...';
        case 3: return 'Analyse de l\'intention de recherche...';
        case 4: return 'Création de la structure SEO optimisée...';
        case 5: return 'Rédaction du contenu principal avec optimisation SEO...';
        case 6: return 'Ajout de détails et d\'exemples pour améliorer l\'engagement...';
        case 7: return 'Finalisation et vérification SEO avancée...';
        default: return 'Génération en cours...';
      }
    }
  };

  // Calculer la progression totale
  useEffect(() => {
    if (!isGenerating) {
      setTotalProgress(0);
      setStageMessage('');
      return;
    }

    const stageCount = getStageCount(wordCount);
    const stageWeight = 1 / stageCount;
    const currentProgress = ((stage - 1) * stageWeight) + (stageProgress * stageWeight);
    
    setTotalProgress(Math.min(Math.max(currentProgress, 0), 1));
    setStageMessage(getStageMessage(stage, wordCount));
  }, [isGenerating, stage, stageProgress, wordCount]);

  if (!isGenerating) {
    return null;
  }

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-300">{stageMessage}</span>
        <span className="text-sm text-gray-400">{Math.round(totalProgress * 100)}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div 
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${totalProgress * 100}%` }}
        ></div>
      </div>
      
      {/* Indicateurs d'étapes */}
      <div className="relative mt-1">
        <div className="flex justify-between">
          {Array.from({ length: getStageCount(wordCount) }).map((_, index) => {
            const isCompleted = (index + 1) / getStageCount(wordCount) <= totalProgress;
            const isCurrent = index + 1 === stage;
            
            return (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className={`w-2 h-2 rounded-full ${
                    isCompleted 
                      ? 'bg-purple-500' 
                      : isCurrent 
                        ? 'bg-blue-500' 
                        : 'bg-gray-600'
                  }`}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 