'use client';

import { Check } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import { useProductManager } from "@/app/config/checkout-links";
import { useState, useEffect } from "react";

// Plans disponibles avec prix et fonctionnalités
const plans = [
  {
    name: "lite",
    displayName: "Lite",
    id: "tier-lite",
    price: "19,90€",
    period: "monthly", // période par défaut
    description: "Idéal pour débuter avec le SEO et améliorer votre visibilité.",
    tokens: 45,
    features: [
      "45 tokens mensuels inclus",
      "Analyse de base des mots-clés",
      "Génération de titres et méta-descriptions",
      "Rédaction de contenu SEO basique",
      "Support par email",
    ],
    featured: false,
  },
  {
    name: "basic",
    displayName: "Basic",
    id: "tier-basic",
    price: "34,90€",
    period: "monthly", // période par défaut
    description: "Pour les créateurs de contenu et les petites entreprises.",
    tokens: 100,
    features: [
      "100 tokens mensuels inclus",
      "Optimisation complète des mots-clés",
      "Amélioration du contenu existant",
      "Génération d'articles optimisés",
      "Analyse de la concurrence",
      "Support prioritaire",
    ],
    featured: true,
  },
  {
    name: "advanced",
    displayName: "Advanced",
    id: "tier-advanced",
    price: "49,90€",
    period: "monthly", // période par défaut
    description: "Pour les entreprises avec une stratégie SEO exigeante.",
    tokens: 180,
    features: [
      "180 tokens mensuels inclus",
      "Analyse SEO approfondie",
      "Stratégie de contenu complète",
      "Optimisation multilingue",
      "Rapports d'analyse détaillés",
      "Support dédié 7j/7",
      "Formation SEO incluse",
    ],
    featured: false,
  },
  {
    name: "pro",
    displayName: "Pro",
    id: "tier-pro",
    price: "69,90€",
    period: "monthly", // période par défaut
    description: "Pour les professionnels du SEO et les agences marketing.",
    tokens: 300,
    features: [
      "300 tokens mensuels inclus",
      "Stratégie SEO personnalisée",
      "Contenus premium optimisés",
      "Suivi des positions en temps réel",
      "Analyse de la concurrence avancée",
      "Intégration API complète",
      "Account manager dédié",
      "Formation avancée incluse",
    ],
    featured: false,
  },
];

export function Pricing() {
  const { productManager, isInitialized } = useProductManager();
  const [selectedPeriod, setSelectedPeriod] = useState<'monthly' | 'annual'>('monthly');

  const getPeriodLabel = (period: string) => {
    return period === 'monthly' ? 'mois' : 'an';
  };

  const getPeriodPrice = (plan: typeof plans[0], period: 'monthly' | 'annual') => {
    // Prix mensuels (définis dans les plans)
    const monthlyPrices: Record<string, number> = {
      'lite': 19.90,
      'basic': 34.90,
      'advanced': 49.90,
      'pro': 69.90
    };
    
    // Prix annuels (avec ~ 20% de remise)
    const annualPrices: Record<string, number> = {
      'lite': 191.04,
      'basic': 335.04,
      'advanced': 479.04,
      'pro': 671.04
    };
    
    const price = period === 'monthly' ? 
      monthlyPrices[plan.name] : 
      annualPrices[plan.name];
    
    return price.toFixed(2).replace('.', ',') + '€';
  };

  const getTokens = (plan: typeof plans[0], period: 'monthly' | 'annual') => {
    // Tokens mensuels (définis dans les plans)
    const monthlyTokens = plan.tokens;
    
    // Tokens annuels (12 mois)
    const annualTokens = monthlyTokens * 12;
    
    return period === 'monthly' ? monthlyTokens : annualTokens;
  };

  // Construire l'URL pour le plan sélectionné
  const getCheckoutUrl = (plan: string) => {
    return `/pre-checkout?plan=${plan}&period=${selectedPeriod}`;
  };

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-base font-semibold leading-7 text-amber-600">Tarifs</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Choisissez le forfait qui vous convient
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Des solutions adaptées à tous les budgets pour optimiser votre référencement et votre contenu.
          </p>
          
          {/* Sélecteur de période */}
          <div className="mt-8 flex justify-center">
            <div className="relative flex rounded-full bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => setSelectedPeriod('monthly')}
                className={`${
                  selectedPeriod === 'monthly'
                    ? 'bg-white shadow-md'
                    : 'bg-transparent'
                } relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold text-gray-900 transition-all duration-200`}
              >
                Mensuel
              </button>
              <button
                type="button"
                onClick={() => setSelectedPeriod('annual')}
                className={`${
                  selectedPeriod === 'annual'
                    ? 'bg-white shadow-md'
                    : 'bg-transparent'
                } relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold text-gray-900 transition-all duration-200`}
              >
                Annuel <span className="text-xs text-amber-600 ml-1">-20%</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-7xl lg:grid-cols-4">
          {plans.map((plan, planIdx) => (
            <div
              key={plan.id}
              className={`${
                plan.featured
                  ? 'relative bg-white shadow-2xl shadow-amber-200/50 z-10 rounded-xl'
                  : 'relative bg-white shadow-md z-0 sm:rounded-xl'
              } ${
                planIdx === 0 ? 'sm:rounded-r-none' : ''
              } ${
                planIdx === plans.length - 1 ? 'sm:rounded-l-none' : ''
              } p-8 ring-1 ring-gray-900/10`}
            >
              <h3 id={plan.id} className="text-lg font-semibold leading-8 text-gray-900">
                {plan.displayName}
              </h3>
              {plan.featured && (
                <p className="absolute top-0 -translate-y-1/2 transform rounded-full bg-amber-600 px-3 py-1 text-sm font-semibold text-white">
                  Le plus populaire
                </p>
              )}
              <p className="mt-4 text-sm leading-6 text-gray-600">{plan.description}</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">
                  {getPeriodPrice(plan, selectedPeriod)}
                </span>
                <span className="text-sm font-semibold leading-6 text-gray-600">
                  /{getPeriodLabel(selectedPeriod)}
                </span>
              </p>
              <Link
                href={getCheckoutUrl(plan.name)}
                aria-describedby={plan.id}
                className={`${
                  plan.featured
                    ? 'bg-amber-600 text-white hover:bg-amber-500'
                    : 'bg-white text-amber-600 ring-1 ring-inset ring-amber-200 hover:ring-amber-300'
                } mt-6 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600`}
              >
                Commencer
              </Link>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-amber-600" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Section d'information sur les tokens */}
        <div className="mt-16 max-w-5xl mx-auto bg-gradient-to-br from-white to-amber-50 rounded-2xl p-8 border border-amber-100 shadow-xl overflow-hidden relative">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-3/5">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 text-sm font-medium mb-4">
                <svg className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Comment fonctionnent les tokens</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Comprendre notre système de crédits</h3>
              <p className="text-gray-600 mb-6">
                Les tokens sont notre monnaie de génération - chaque création d'article ou de contenu SEO consomme un nombre prédéterminé de tokens, variable selon la longueur et la complexité du contenu demandé. Il faut estimer environ 1 token pour 500 mots. Plus votre abonnement est élevé, moins vous payez par token.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <div className="text-center px-3 py-2 rounded-lg bg-white shadow-sm border border-amber-100">
                  <div className="text-gray-500 text-xs mb-1">Lite</div>
                  <div className="text-amber-600 font-bold">0,75€</div>
                </div>
                <div className="text-center px-3 py-2 rounded-lg bg-white shadow-sm border border-amber-100">
                  <div className="text-gray-500 text-xs mb-1">Basic</div>
                  <div className="text-amber-600 font-bold">0,60€</div>
                </div>
                <div className="text-center px-3 py-2 rounded-lg bg-white shadow-sm border border-amber-100">
                  <div className="text-gray-500 text-xs mb-1">Advanced</div>
                  <div className="text-amber-600 font-bold">0,45€</div>
                </div>
                <div className="text-center px-3 py-2 rounded-lg bg-white shadow-sm border border-amber-100">
                  <div className="text-gray-500 text-xs mb-1">Pro</div>
                  <div className="text-amber-600 font-bold">0,35€</div>
                </div>
              </div>
            </div>
            <div className="md:w-2/5 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-300/20 to-yellow-300/20 rounded-full blur-xl"></div>
                <div className="relative bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full h-32 w-32 flex items-center justify-center">
                  <div className="text-white text-center">
                    <svg className="h-10 w-10 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-bold text-xl">Tokens</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 