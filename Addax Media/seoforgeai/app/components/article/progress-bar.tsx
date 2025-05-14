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
  
  // Fonction pour obtenir le nombre d'étapes total basé sur la longueur de l'article
  const getTotalStages = (): number => {
    if (wordCount <= 500) return 3; // Articles très courts
    if (wordCount <= 1000) return 4; // Articles courts
    if (wordCount <= 2000) return 5; // Articles moyens
    return 7; // Articles longs (>2000 mots)
  };
  
  // Calculer la progression totale basée sur l'étape actuelle et sa progression
  useEffect(() => {
    if (!isGenerating) return;
    
    const totalStages = getTotalStages();
    const stageWeight = 1 / totalStages;
    const previousStagesProgress = (stage - 1) * stageWeight;
    const currentStageProgress = stageProgress * stageWeight;
    
    setTotalProgress(previousStagesProgress + currentStageProgress);
  }, [isGenerating, stage, stageProgress, wordCount]);
  
  // Liste des étapes avec leurs noms
  const stageNames = [
    'Analyse du sujet',
    'Création de la structure',
    'Génération de l\'introduction',
    'Génération du contenu principal',
    'Génération de la conclusion',
    'Optimisation SEO',
    'Finalisation'
  ];
  
  // Filtrer les étapes en fonction du nombre total d'étapes
  const activeStages = stageNames.slice(0, getTotalStages());
  
  if (!isGenerating) {
    return (
      <div className="flex items-center justify-between mb-6 px-4 py-3 bg-teal-50 rounded-lg text-sm text-slate-600">
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>
            Prêt pour la génération de contenu
          </span>
        </div>
        
        <span className="text-teal-600 font-medium">
          {wordCount} mots
        </span>
      </div>
    );
  }
  
  return (
    <div className="mb-6">
      {/* Barre de progression principale */}
      <div className="mb-3">
        <div className="flex justify-between text-sm text-slate-600 mb-1">
          <span>Génération en cours</span>
          <span>{Math.round(totalProgress * 100)}%</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-teal-400 to-emerald-500"
            style={{ width: `${totalProgress * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Étape actuelle */}
      <div className="p-3 rounded-lg bg-teal-50 border border-teal-100">
        <div className="flex items-center text-sm text-slate-700">
          <div className="flex-shrink-0 w-6 h-6 mr-3 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
            {stage}
          </div>
          <span className="font-medium">{activeStages[stage - 1]}</span>
          
          <div className="flex-grow ml-4">
            <div className="h-1.5 bg-teal-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-teal-500"
                style={{ width: `${stageProgress * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Temps estimé */}
      <p className="mt-2 text-xs text-slate-500 text-right">
        Temps estimé : {wordCount <= 800 ? '20-30' : wordCount <= 1500 ? '30-45' : '45-60'} secondes
      </p>
    </div>
  );
} 