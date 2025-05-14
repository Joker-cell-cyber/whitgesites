'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Checkbox } from "@/app/components/ui/checkbox";
import SearchIntent from './search-intent';
import ProgressBar from './progress-bar';

interface GenerationFormProps {
  onSubmit: (formData: any) => Promise<void>;
  isGenerating: boolean;
  hasEnoughTokens: boolean;
  tokenBalance: number;
  tokenCost: number;
  isLoadingBalance: boolean;
  stage: number;
  stageProgress: number;
  calculateTokenCost: (wordCount: number, hasAdvancedOptions?: boolean) => number;
}

export default function GenerationForm({
  onSubmit,
  isGenerating,
  hasEnoughTokens,
  tokenBalance,
  tokenCost,
  isLoadingBalance,
  stage,
  stageProgress,
  calculateTokenCost
}: GenerationFormProps) {
  // État initial du formulaire avec tous les nouveaux champs
  const [form, setForm] = useState({
    // Section 1: Paramètres SEO Essentials
    mainKeyword: '',
    topic: '',
    semanticVariations: '',
    searchIntent: 'informational',
    targetAudience: '',
    contentObjective: 'traffic',
    
    // Section 2: Structure & Ton
    tone: 'expert',
    requiredElements: {
      caseStudies: false,
      comparisons: false,
      faq: false,
      historicalAnecdotes: false,
      statistics: false,
      quotes: false,
      examples: false
    },
    wordsToAvoid: '',
    
    // Section 3: Optimisation Technique
    wordCount: 1200,
    linksToInclude: '',
    language: 'fr',
    outputFormat: 'markdown',
  });

  // État local pour le coût en tokens
  const [currentTokenCost, setCurrentTokenCost] = useState(tokenCost);

  // Initialiser le coût en tokens au chargement du composant
  useEffect(() => {
    // Calculer le coût initial en fonction des valeurs par défaut du formulaire
    const hasAdvancedOptions = form.requiredElements && 
      Object.values(form.requiredElements).some(val => val === true);
    const initialCost = calculateTokenCost(form.wordCount, hasAdvancedOptions);
    setCurrentTokenCost(initialCost);
  }, [calculateTokenCost, form.wordCount, form.requiredElements]);

  // Gérer les changements dans les champs de formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let updatedForm;
    
    // Si le champ modifié est mainKeyword, synchroniser avec topic
    if (name === 'mainKeyword') {
      updatedForm = { ...form, [name]: value, topic: value };
    } else {
      updatedForm = { ...form, [name]: value };
    }
    
    setForm(updatedForm);
    
    // Mettre à jour le coût en tokens si la longueur change
    if (name === 'wordCount') {
      updateTokenCost(updatedForm);
    }
  };

  // Gérer les changements dans les cases à cocher
  const handleCheckboxChange = (section: string, name: string, checked: boolean) => {
    const updatedForm = {
      ...form,
      [section]: {
        ...form[section as keyof typeof form] as Record<string, boolean>,
        [name]: checked
      }
    };
    setForm(updatedForm);
    
    // Mettre à jour le coût en tokens si les options avancées changent
    updateTokenCost(updatedForm);
  };

  // Mettre à jour le coût en tokens lorsque la longueur ou les options changent
  const updateTokenCost = (formData: any) => {
    const hasAdvancedOptions = formData.requiredElements && 
      Object.values(formData.requiredElements).some(val => val === true);
    const cost = calculateTokenCost(formData.wordCount, hasAdvancedOptions);
    setCurrentTokenCost(cost);
  };

  // Soumettre le formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  // Options pour les dropdowns
  const contentObjectiveOptions = [
    { value: 'traffic', label: 'Générer du trafic' },
    { value: 'convert', label: 'Convertir' },
    { value: 'educate', label: 'Éduquer' },
    { value: 'brand', label: 'Renforcer la marque' }
  ];

  const toneOptions = [
    { value: 'expert', label: 'Expert mais accessible' },
    { value: 'inspiring', label: 'Inspirant' },
    { value: 'urgency', label: 'Urgence' },
    { value: 'friendly', label: 'Amical' },
    { value: 'formal', label: 'Formel' },
    { value: 'casual', label: 'Décontracté' }
  ];

  const languageOptions = [
    { value: 'fr', label: 'Français' },
    { value: 'en', label: 'Anglais' },
    { value: 'es', label: 'Espagnol' },
    { value: 'de', label: 'Allemand' },
    { value: 'it', label: 'Italien' },
    { value: 'pt', label: 'Portugais' },
    { value: 'nl', label: 'Néerlandais' },
    { value: 'ru', label: 'Russe' },
    { value: 'zh', label: 'Chinois' },
    { value: 'ja', label: 'Japonais' },
    { value: 'ar', label: 'Arabe' },
    { value: 'hi', label: 'Hindi' },
    { value: 'pl', label: 'Polonais' },
    { value: 'sv', label: 'Suédois' },
    { value: 'tr', label: 'Turc' },
    { value: 'ko', label: 'Coréen' },
    { value: 'da', label: 'Danois' },
    { value: 'fi', label: 'Finnois' },
    { value: 'no', label: 'Norvégien' },
    { value: 'cs', label: 'Tchèque' },
    { value: 'hu', label: 'Hongrois' },
    { value: 'ro', label: 'Roumain' },
    { value: 'el', label: 'Grec' },
    { value: 'th', label: 'Thaï' },
    { value: 'vi', label: 'Vietnamien' }
  ];

  const formatOptions = [
    { value: 'markdown', label: 'Markdown' },
    { value: 'html', label: 'HTML' },
    { value: 'text', label: 'Texte brut' }
  ];

  // Éléments obligatoires options
  const requiredElementsOptions = [
    { id: 'caseStudies', label: 'Études de cas' },
    { id: 'comparisons', label: 'Comparatifs' },
    { id: 'faq', label: 'FAQ' },
    { id: 'historicalAnecdotes', label: 'Anecdotes historiques' },
    { id: 'statistics', label: 'Statistiques' },
    { id: 'quotes', label: 'Citations' },
    { id: 'examples', label: 'Exemples concrets' }
  ];

  return (
    <div className="bg-black/40 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-purple-500/20">
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-0">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white">Générateur d'articles SEO 2025</h2>
          <p className="text-gray-400 text-xs sm:text-sm">Optimisez votre contenu selon les dernières règles SEO</p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-xs sm:text-sm text-gray-400">Votre solde</p>
          {isLoadingBalance ? (
            <div className="h-5 sm:h-6 w-16 sm:w-20 bg-gray-700 rounded animate-pulse"></div>
          ) : (
            <p className="text-base sm:text-lg font-bold text-white">{tokenBalance} tokens</p>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Paramètres SEO Essentials */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-semibold text-white">Paramètres SEO</h3>
            <div className="h-px flex-1 bg-purple-500/20 mx-3"></div>
            <span className="text-xs sm:text-sm text-purple-400">Étape 1/3</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="mainKeyword" className="block text-xs sm:text-sm font-medium text-gray-300">
                Mot-clé principal*
              </label>
              <Input
                id="mainKeyword"
                name="mainKeyword"
                value={form.mainKeyword}
                onChange={handleChange}
                placeholder="Ex: marketing digital"
                required
                className="bg-black/30 border-purple-500/30 text-sm"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="topic" className="block text-xs sm:text-sm font-medium text-gray-300">
                Sujet de l'article*
              </label>
              <Input
                id="topic"
                name="topic"
                value={form.topic}
                onChange={handleChange}
                placeholder="Ex: stratégies de marketing digital"
                required
                className="bg-black/30 border-purple-500/30 text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="semanticVariations" className="block text-xs sm:text-sm font-medium text-gray-300">
              Variations sémantiques (séparées par des virgules)
            </label>
            <Input
              id="semanticVariations"
              name="semanticVariations"
              value={form.semanticVariations}
              onChange={handleChange}
              placeholder="Ex: stratégie marketing, marketing en ligne, publicité digitale"
              className="bg-black/30 border-purple-500/30 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="searchIntent" className="block text-xs sm:text-sm font-medium text-gray-300">
                Intention de recherche
              </label>
              <SearchIntent 
                value={form.searchIntent} 
                onChange={(value) => setForm({...form, searchIntent: value})} 
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="targetAudience" className="block text-xs sm:text-sm font-medium text-gray-300">
                Audience cible
              </label>
              <Input
                id="targetAudience"
                name="targetAudience"
                value={form.targetAudience}
                onChange={handleChange}
                placeholder="Ex: entrepreneurs, marketeurs débutants"
                className="bg-black/30 border-purple-500/30 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Objectif du contenu
            </label>
            <select
              name="contentObjective"
              value={form.contentObjective}
              onChange={handleChange}
              className="w-full rounded-md border-purple-500/20 bg-black/40 text-white"
            >
              {contentObjectiveOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Section 2: Structure & Ton */}
        <div className="p-4 bg-blue-900/10 rounded-lg border border-blue-500/20">
          <h3 className="text-white font-medium mb-4">📝 Structure & Ton</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Ton souhaité
              </label>
              <select
                name="tone"
                value={form.tone}
                onChange={handleChange}
                className="w-full rounded-md border-blue-500/20 bg-black/40 text-white"
              >
                {toneOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Éléments obligatoires à inclure
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {requiredElementsOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`element-${option.id}`}
                      checked={form.requiredElements[option.id as keyof typeof form.requiredElements]}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange('requiredElements', option.id, checked as boolean)
                      }
                    />
                    <label 
                      htmlFor={`element-${option.id}`}
                      className="text-sm text-gray-300 cursor-pointer"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Mots ou expressions à éviter
              </label>
              <textarea
                name="wordsToAvoid"
                value={form.wordsToAvoid}
                onChange={handleChange}
                placeholder="Ex: jargon technique, termes trop complexes, etc."
                className="w-full rounded-md border border-blue-500/20 bg-black/40 px-3 py-2 text-sm text-white min-h-[80px]"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Optimisation Technique */}
        <div className="p-4 bg-green-900/10 rounded-lg border border-green-500/20">
          <h3 className="text-white font-medium mb-4">⚙️ Optimisation Technique</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-300">
                  Longueur cible
                </label>
                <span className="text-sm text-gray-400">
                  Coût: <span className={hasEnoughTokens ? 'text-green-400' : 'text-red-400'}>{currentTokenCost} tokens</span>
                </span>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="800"
                  max="2500"
                  step="100"
                  name="wordCount"
                  value={form.wordCount}
                  onChange={(e) => {
                    const newValue = parseInt(e.target.value);
                    setForm({ ...form, wordCount: newValue });
                    updateTokenCost({ ...form, wordCount: newValue });
                  }}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                <span className="text-white font-medium min-w-[100px] text-center">
                  {form.wordCount} mots
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Léger (800)</span>
                <span>Standard (1500)</span>
                <span>Ultra-détaillé (2500)</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Liens à inclure (URLs internes ou externes)
              </label>
              <textarea
                name="linksToInclude"
                value={form.linksToInclude}
                onChange={handleChange}
                placeholder="Ex: https://example.com/page1, https://example.com/page2"
                className="w-full rounded-md border border-green-500/20 bg-black/40 px-3 py-2 text-sm text-white min-h-[80px]"
              />
              <p className="text-xs text-gray-500 mt-1">Séparez les URLs par des virgules ou des sauts de ligne</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Langue
                </label>
                <select
                  name="language"
                  value={form.language}
                  onChange={handleChange}
                  className="w-full rounded-md border-green-500/20 bg-black/40 text-white"
                >
                  {languageOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Format de sortie
                </label>
                <select
                  name="outputFormat"
                  value={form.outputFormat}
                  onChange={handleChange}
                  className="w-full rounded-md border-green-500/20 bg-black/40 text-white"
                >
                  {formatOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-purple-500/20">
          {/* Barre de progression améliorée */}
          <ProgressBar 
            isGenerating={isGenerating}
            wordCount={form.wordCount}
            stage={stage}
            stageProgress={stageProgress}
          />

          <Button
            type="submit"
            className={`w-full ${
              hasEnoughTokens 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                : 'bg-gray-700 cursor-not-allowed'
            }`}
            disabled={isGenerating || !hasEnoughTokens}
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Génération en cours...
              </>
            ) : !hasEnoughTokens ? (
              'Solde insuffisant'
            ) : (
              'Générer l\'article SEO'
            )}
          </Button>
          {!hasEnoughTokens && (
            <p className="text-center text-sm text-red-400 mt-2">
              Vous n'avez pas assez de tokens. <a href="/dashboard/tokens" className="underline">Acheter des tokens</a>
            </p>
          )}
        </div>
      </form>
    </div>
  );
} 