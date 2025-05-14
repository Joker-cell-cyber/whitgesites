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
    <div className="bg-white rounded-xl p-6">
      <div className="mb-6 flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-0">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Générateur d'articles SEO 2025</h2>
          <p className="text-slate-500 text-sm">Optimisez votre contenu selon les dernières règles SEO</p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-sm text-slate-500">Votre solde</p>
          {isLoadingBalance ? (
            <div className="h-6 w-20 bg-slate-200 rounded animate-pulse"></div>
          ) : (
            <p className="text-lg font-bold text-slate-800">{tokenBalance} tokens</p>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Paramètres SEO Essentials */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-800">Paramètres SEO</h3>
            <div className="h-px flex-1 bg-slate-200 mx-3"></div>
            <span className="text-sm text-teal-600">Étape 1/3</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="mainKeyword" className="block text-sm font-medium text-slate-700">
                Mot-clé principal*
              </label>
              <Input
                id="mainKeyword"
                name="mainKeyword"
                value={form.mainKeyword}
                onChange={handleChange}
                placeholder="Ex: marketing digital"
                required
                className="bg-white border-slate-300 text-sm focus:border-teal-500 focus:ring-teal-500 text-black"
                style={{ color: "black !important" }}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="topic" className="block text-sm font-medium text-slate-700">
                Sujet de l'article*
              </label>
              <Input
                id="topic"
                name="topic"
                value={form.topic}
                onChange={handleChange}
                placeholder="Ex: stratégies de marketing digital"
                required
                className="bg-white border-slate-300 text-sm focus:border-teal-500 focus:ring-teal-500 text-black"
                style={{ color: "black !important" }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="semanticVariations" className="block text-sm font-medium text-slate-700">
              Variations sémantiques (séparées par des virgules)
            </label>
            <Input
              id="semanticVariations"
              name="semanticVariations"
              value={form.semanticVariations}
              onChange={handleChange}
              placeholder="Ex: publicité en ligne, référencement SEO, réseaux sociaux"
              className="bg-white border-slate-300 text-sm focus:border-teal-500 focus:ring-teal-500 text-black"
              style={{ color: "black !important" }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="searchIntent" className="block text-sm font-medium text-slate-700">
                Intention de recherche
              </label>
              <SearchIntent
                value={form.searchIntent}
                onChange={(value) => setForm({ ...form, searchIntent: value })}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="targetAudience" className="block text-sm font-medium text-slate-700">
                Audience cible
              </label>
              <Input
                id="targetAudience"
                name="targetAudience"
                value={form.targetAudience}
                onChange={handleChange}
                placeholder="Ex: professionnels du marketing"
                className="bg-white border-slate-300 text-sm focus:border-teal-500 focus:ring-teal-500 text-black"
                style={{ color: "black !important" }}
              />
            </div>
          </div>
        </div>

        {/* Section 2: Structure & Ton */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-800">Structure & Ton</h3>
            <div className="h-px flex-1 bg-slate-200 mx-3"></div>
            <span className="text-sm text-teal-600">Étape 2/3</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="contentObjective" className="block text-sm font-medium text-slate-700">
                Objectif du contenu
              </label>
              <div className="relative">
                <select
                  id="contentObjective"
                  name="contentObjective"
                  value={form.contentObjective}
                  onChange={handleChange}
                  className="block w-full rounded-md border-slate-300 bg-white py-2 pl-3 pr-10 text-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 text-black"
                  style={{ color: "black !important" }}
                >
                  {contentObjectiveOptions.map(option => (
                    <option key={option.value} value={option.value} style={{color: 'black'}}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="tone" className="block text-sm font-medium text-slate-700">
                Ton de l'article
              </label>
              <div className="relative">
                <select
                  id="tone"
                  name="tone"
                  value={form.tone}
                  onChange={handleChange}
                  className="block w-full rounded-md border-slate-300 bg-white py-2 pl-3 pr-10 text-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 text-black"
                  style={{ color: "black !important" }}
                >
                  {toneOptions.map(option => (
                    <option key={option.value} value={option.value} style={{color: 'black'}}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              Éléments à inclure
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {requiredElementsOptions.map(option => (
                <div key={option.id} className="flex items-center">
                  <Checkbox
                    id={`requiredElements-${option.id}`}
                    checked={form.requiredElements[option.id as keyof typeof form.requiredElements]}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange('requiredElements', option.id, checked as boolean)
                    }
                    className="border-slate-300 text-teal-600 focus:ring-teal-500"
                  />
                  <label 
                    htmlFor={`requiredElements-${option.id}`}
                    className="ml-2 text-sm text-slate-600"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="wordsToAvoid" className="block text-sm font-medium text-slate-700">
              Mots ou expressions à éviter
            </label>
            <Input
              id="wordsToAvoid"
              name="wordsToAvoid"
              value={form.wordsToAvoid}
              onChange={handleChange}
              placeholder="Ex: contentieux, problèmes juridiques"
              className="bg-white border-slate-300 text-sm focus:border-teal-500 focus:ring-teal-500 text-black"
              style={{ color: "black !important" }}
            />
          </div>
        </div>

        {/* Section 3: Optimisation Technique */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-800">Optimisation Technique</h3>
            <div className="h-px flex-1 bg-slate-200 mx-3"></div>
            <span className="text-sm text-teal-600">Étape 3/3</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="wordCount" className="block text-sm font-medium text-slate-700">
                Nombre de mots
              </label>
              <div className="relative mt-1 rounded-md">
                <Input
                  type="number"
                  id="wordCount"
                  name="wordCount"
                  value={form.wordCount}
                  onChange={handleChange}
                  min="300"
                  max="3000"
                  step="100"
                  className="bg-white border-slate-300 text-sm focus:border-teal-500 focus:ring-teal-500 text-black"
                  style={{ color: "black !important" }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Entre 300 et 3000 mots
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="language" className="block text-sm font-medium text-slate-700">
                Langue
              </label>
              <div className="relative">
                <select
                  id="language"
                  name="language"
                  value={form.language}
                  onChange={handleChange}
                  className="block w-full rounded-md border-slate-300 bg-white py-2 pl-3 pr-10 text-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 text-black"
                  style={{ color: "black !important" }}
                >
                  {languageOptions.map(option => (
                    <option key={option.value} value={option.value} style={{color: 'black'}}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="outputFormat" className="block text-sm font-medium text-slate-700">
                Format de sortie
              </label>
              <div className="relative">
                <select
                  id="outputFormat"
                  name="outputFormat"
                  value={form.outputFormat}
                  onChange={handleChange}
                  className="block w-full rounded-md border-slate-300 bg-white py-2 pl-3 pr-10 text-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 text-black"
                  style={{ color: "black !important" }}
                >
                  {formatOptions.map(option => (
                    <option key={option.value} value={option.value} style={{color: 'black'}}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="linksToInclude" className="block text-sm font-medium text-slate-700">
              Liens à inclure (1 par ligne)
            </label>
            <textarea
              id="linksToInclude"
              name="linksToInclude"
              value={form.linksToInclude}
              onChange={handleChange}
              rows={3}
              placeholder="Ex: https://example.com/page"
              className="block w-full rounded-md border-slate-300 bg-white text-sm focus:border-teal-500 focus:ring-teal-500 text-black"
              style={{ color: "black !important" }}
            ></textarea>
          </div>
        </div>

        {/* Prix et soumission */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center bg-slate-50 px-4 py-3 rounded-lg border border-slate-200">
            <div className="mr-4">
              <p className="text-sm text-slate-500">Coût</p>
              <p className={`text-xl font-bold ${hasEnoughTokens ? 'text-teal-600' : 'text-red-600'}`}>
                {currentTokenCost} tokens
              </p>
            </div>
            
            {!hasEnoughTokens && (
              <div className="text-sm text-red-600">
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Solde insuffisant
                </span>
              </div>
            )}
          </div>
        
          <Button
            type="submit"
            disabled={isGenerating || !hasEnoughTokens || !form.mainKeyword || !form.topic}
            className={`w-full sm:w-auto px-8 py-3 text-white font-medium rounded-lg ${
              isGenerating || !hasEnoughTokens || !form.mainKeyword || !form.topic 
                ? 'bg-slate-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 shadow-md'
            }`}
          >
            {isGenerating ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Génération en cours...
              </span>
            ) : (
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Générer l'article
              </span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
} 