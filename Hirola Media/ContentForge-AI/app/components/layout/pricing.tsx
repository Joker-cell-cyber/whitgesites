'use client';

import React, { useState, useRef, useEffect } from "react";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from "next/link";
import { CheckIcon } from 'lucide-react';
import { Button } from "@/app/components/ui/button";
import { tokenCheckoutLinks } from "@/app/config/checkout-links";

// CSS pour masquer la barre de défilement
const hideScrollbarStyle = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .custom-scrollbar::-webkit-scrollbar {
    width: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #403D39;
    border-radius: 20px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #D76A32;
    border-radius: 20px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #E5753E;
  }
  
  /* Styles pour le curseur personnalisé */
  .custom-range-slider::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: linear-gradient(to right, #E5753E, #DFC255);
    cursor: pointer;
  }
  .custom-range-slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: linear-gradient(to right, #E5753E, #DFC255);
    cursor: pointer;
    border: none;
  }
`;

type BillingPeriod = 'biweekly' | 'monthly' | 'quarterly' | 'annual';

const plans = [
  {
    id: "lite",
    name: "Lite",
    description: "Idéal pour débuter avec un budget maîtrisé",
    price: {
      monthly: 19.90,
      annually: 191.04,
      biweekly: 11.94,
      quarterly: 53.73
    },
    tokensPerCycle: {
      biweekly: { count: 27, pricePerToken: 0.44 },
      monthly: { count: 45, pricePerToken: 0.44 },
      quarterly: { count: 121, pricePerToken: 0.44 },
      yearly: { count: 432, pricePerToken: 0.44 }
    },
    extraTokenPrice: 0.75,
    features: [
      "45 tokens par mois (0,44€/token)",
      "2 langues",
      "Générateur d'articles de blog",
      "Tokens supplémentaires : 0,75€ par token"
    ],
    popular: false,
    badge: "Débutant",
    ctaText: "Je m'abonne",
    gradientFrom: "from-ocrf-copper-400",
    gradientTo: "to-ocrf-copper-600"
  },
  {
    id: "basic",
    name: "Basic",
    description: "Pour une production régulière de contenu",
    price: {
      monthly: 34.90,
      annually: 335.04,
      biweekly: 20.94,
      quarterly: 94.23
    },
    tokensPerCycle: {
      biweekly: { count: 60, pricePerToken: 0.35 },
      monthly: { count: 100, pricePerToken: 0.35 },
      quarterly: { count: 270, pricePerToken: 0.35 },
      yearly: { count: 960, pricePerToken: 0.35 }
    },
    extraTokenPrice: 0.60,
    features: [
      "100 tokens par mois (0,35€/token)",
      "5 langues",
      "Générateur d'articles de blog",
      "Générateur de descriptions produits",
      "Optimisation SEO intermédiaire",
      "Tokens supplémentaires : 0,60€ par token"
    ],
    popular: true,
    badge: "Recommandé",
    ctaText: "Je m'abonne",
    gradientFrom: "from-ocrf-gold-400",
    gradientTo: "to-ocrf-copper-500"
  },
  {
    id: "advanced",
    name: "Advanced",
    description: "Solution complète pour les équipes",
    price: {
      monthly: 49.90,
      annually: 479.04,
      biweekly: 29.94,
      quarterly: 134.73
    },
    tokensPerCycle: {
      biweekly: { count: 108, pricePerToken: 0.28 },
      monthly: { count: 180, pricePerToken: 0.28 },
      quarterly: { count: 486, pricePerToken: 0.28 },
      yearly: { count: 1728, pricePerToken: 0.28 }
    },
    extraTokenPrice: 0.45,
    features: [
      "180 tokens par mois (0,28€/token)",
      "Toutes les langues",
      "Générateur d'articles de blog",
      "Générateur de descriptions produits",
      "Tokens supplémentaires : 0,45€ par token"
    ],
    popular: false,
    badge: "Premium",
    ctaText: "Je m'abonne",
    gradientFrom: "from-ocrf-copper-500",
    gradientTo: "to-ocrf-gold-500"
  },
  {
    id: "pro",
    name: "Pro",
    description: "Puissance maximale pour les grandes entreprises",
    price: {
      monthly: 69.90,
      annually: 671.04,
      biweekly: 41.94,
      quarterly: 188.73
    },
    tokensPerCycle: {
      biweekly: { count: 180, pricePerToken: 0.23 },
      monthly: { count: 300, pricePerToken: 0.23 },
      quarterly: { count: 810, pricePerToken: 0.23 },
      yearly: { count: 2880, pricePerToken: 0.23 }
    },
    extraTokenPrice: 0.35,
    features: [
      "300 tokens par mois (0,23€/token)",
      "Toutes les langues",
      "Générateur d'articles de blog",
      "Générateur de descriptions produits",
      "Tokens supplémentaires : 0,35€ par token"
    ],
    popular: false,
    badge: "Entreprise",
    ctaText: "Je m'abonne",
    gradientFrom: "from-ocrf-gold-600",
    gradientTo: "to-ocrf-brown-600"
  }
];

const tokenOptions = [
  { tokens: 10, price: 9 },
  { tokens: 20, price: 18 },
  { tokens: 30, price: 27 },
  { tokens: 40, price: 36 },
  { tokens: 50, price: 45 },
  { tokens: 60, price: 54 },
  { tokens: 70, price: 63 },
  { tokens: 80, price: 72 },
  { tokens: 90, price: 81 },
  { tokens: 100, price: 90 },
  { tokens: 150, price: 135 },
  { tokens: 200, price: 180 },
  { tokens: 250, price: 225 },
  { tokens: 300, price: 270 },
  { tokens: 350, price: 315 },
  { tokens: 400, price: 360 },
  { tokens: 450, price: 405 },
  { tokens: 500, price: 450 }
];

export default function Pricing() {
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });
  
  const [selectedTokens, setSelectedTokens] = useState(10);
  const [tokenPrice, setTokenPrice] = useState(9);
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Récupérer les options de tokens disponibles à partir de tokenCheckoutLinks
    const tokenOptions = Object.keys(tokenCheckoutLinks).map(key => parseInt(key)).sort((a, b) => a - b);
    if (tokenOptions.length > 0) {
      setSelectedTokens(tokenOptions[0]);
      setTokenPrice(tokenOptions[0] * 0.9);
    }
  }, []);

  const calculatePrice = (basePrice: number) => {
    switch (billingPeriod) {
      case 'biweekly':
        return basePrice * 0.6; // 60% du prix mensuel
      case 'monthly':
        return basePrice;
      case 'quarterly':
        return basePrice * 2.7; // économie de 10% sur 3 mois
      case 'annual':
        return basePrice * 9.6; // économie de 20% sur 12 mois
      default:
        return basePrice;
    }
  };

  const getBillingLabel = (cycle: BillingPeriod) => {
    switch (cycle) {
      case 'biweekly':
        return '/2 semaines';
      case 'monthly':
        return '/mois';
      case 'quarterly':
        return '/trimestre';
      case 'annual':
        return '/an';
      default:
        return '/mois';
    }
  };

  const getDiscountLabel = (cycle: BillingPeriod) => {
    switch (cycle) {
      case 'quarterly':
        return 'Économisez 10%';
      case 'annual':
        return 'Économisez 20%';
      default:
        return '';
    }
  };

  const getTokensForPlan = (plan: any, cycle: BillingPeriod) => {
    if (!plan.tokensPerCycle) return 0;
    if (cycle === 'annual') {
      return plan.tokensPerCycle.yearly?.count || 0;
    }
    return plan.tokensPerCycle[cycle]?.count || 0;
  };

  const getPricePerToken = (plan: any, cycle: BillingPeriod) => {
    if (!plan.tokensPerCycle) return 0;
    if (cycle === 'annual') {
      return plan.tokensPerCycle.yearly?.pricePerToken || 0;
    }
    return plan.tokensPerCycle[cycle]?.pricePerToken || 0;
  };

  const scrollToCard = (index: number) => {
    setCurrentIndex(index);
  };

  const nextCard = () => {
    if (currentIndex < plans.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      const scrollAmount = (currentIndex * carouselRef.current.clientWidth) / plans.length;
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  const generateCtaLink = (planId: string) => {
    const planData = plans.find(p => p.id === planId);
    
    if (!planData) return "";
    
    // Pour les abonnements, utiliser la structure d'URL pour pre-checkout
    // avec les paramètres plan & period conformes au format attendu par CheckoutChamp
    let periodParam;
    switch (billingPeriod) {
      case 'monthly':
        periodParam = 'monthly';
        break;
      case 'quarterly':
        periodParam = 'quarterly';
        break;
      case 'annual':
        periodParam = 'yearly'; // 'annual' transformé en 'yearly'
        break;
      case 'biweekly':
        periodParam = 'bi-weekly'; // 'biweekly' transformé en 'bi-weekly'
        break;
      default:
        periodParam = 'monthly';
    }
    
    return `/pre-checkout?plan=${planId}&period=${periodParam}`;
  };

  const generateALaCarteLink = (tokens: number, price: number) => {
    // Pour les achats à la carte, utiliser la structure d'URL pour pre-checkout
    // avec les paramètres plan, period, tokens et tokenPrice
    // Le prix par token pour les achats à la carte est de 0.90€
    return `/pre-checkout?plan=pay-as-you-go&period=one-time&tokens=${tokens}&tokenPrice=0.90&price=${price.toFixed(2)}`;
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: hideScrollbarStyle }}></style>
      <section 
        ref={sectionRef} 
        className="relative py-24 bg-gradient-to-b from-ocrf-anthracite-900 to-ocrf-brown-900 overflow-hidden"
        id="pricing"
      >
        {/* Éléments décoratifs */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 8 }).map((_, index) => (
            <div 
              key={index}
              className="absolute w-1 h-32 bg-gradient-to-b from-ocrf-gold-500/0 via-ocrf-gold-500/10 to-ocrf-gold-500/0"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 45}deg)`,
                opacity: Math.random() * 0.5 + 0.1
              }}
            />
          ))}
        </div>
        
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-ocrf-copper-500/10 text-ocrf-copper-500 text-sm font-medium mb-4">
              Tarifs
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-ocrf-gold-300 to-ocrf-copper-400 mb-4">
              Des solutions adaptées à vos besoins
            </h2>
            
            <p className="text-ocrf-brown-100 max-w-2xl mx-auto">
              Choisissez l'offre qui correspond le mieux à vos objectifs et à votre budget.
            </p>
          </div>
          
          {/* Sélecteur de période de facturation */}
          <div className="max-w-xl mx-auto mb-12">
            <div className="p-1 flex justify-center bg-ocrf-anthracite-800/50 backdrop-blur-sm border border-ocrf-gold-500/10 rounded-xl">
              {(['biweekly', 'monthly', 'quarterly', 'annual'] as BillingPeriod[]).map((period) => (
                <button
                  key={period}
                  onClick={() => setBillingPeriod(period)}
                  className={`relative flex-1 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                    billingPeriod === period 
                      ? 'text-ocrf-anthracite-900 bg-gradient-to-r from-ocrf-copper-400 to-ocrf-gold-500 shadow-lg'
                      : 'text-ocrf-brown-200 hover:text-ocrf-gold-100'
                  }`}
                >
                  {billingPeriod === period && (
                    <motion.div
                      layoutId="billingPeriodIndicator"
                      className="absolute inset-0 rounded-lg"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <span className="relative z-10">
                    {period === 'biweekly' && '2 semaines'}
                    {period === 'monthly' && 'Mensuel'}
                    {period === 'quarterly' && 'Trimestriel'}
                    {period === 'annual' && 'Annuel'}
                    {period !== 'monthly' && period !== 'biweekly' && (
                      <span className="ml-1 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-ocrf-gold-300/20 text-ocrf-gold-100">
                        {getDiscountLabel(period)}
                      </span>
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Plans de tarification - Affichage Desktop */}
          <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 mx-auto max-w-6xl place-items-center">
            {plans.map((plan, index) => (
              <div 
                key={plan.id}
                className={`relative flex flex-col rounded-xl backdrop-blur-sm border transition-all duration-300 ${
                  plan.popular 
                    ? 'bg-gradient-to-b from-ocrf-gold-500/10 to-ocrf-copper-500/10 border-ocrf-gold-500/30 shadow-xl shadow-ocrf-gold-500/5 scale-105 z-10' 
                    : 'bg-ocrf-anthracite-800/40 border-ocrf-gold-500/10 hover:shadow-lg hover:shadow-ocrf-gold-500/5 hover:border-ocrf-gold-500/20'
                }`}
              >
                {/* Badge Populaire */}
                {plan.popular && (
                  <div className="absolute -top-4 inset-x-0 mx-auto w-32 px-3 py-1 rounded-full bg-gradient-to-r from-ocrf-gold-400 to-ocrf-copper-500 text-ocrf-anthracite-900 text-xs font-semibold text-center">
                    {plan.badge}
                  </div>
                )}
                  
                {/* En-tête du plan */}
                <div className="p-6 text-center border-b border-ocrf-gold-500/10">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-ocrf-brown-200 mb-4">
                    {plan.description}
                  </p>
                  
                  {/* Prix */}
                  <div className="flex flex-col items-center justify-center space-y-1">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-white">{calculatePrice(plan.price.monthly).toFixed(2)}€</span>
                      <span className="ml-1 text-sm text-ocrf-brown-200">{getBillingLabel(billingPeriod)}</span>
                    </div>

                    {/* Tokens par cycle pour les plans d'abonnement */}
                    {plan.tokensPerCycle && (
                      <div className="text-xs text-ocrf-gold-300">
                        {getTokensForPlan(plan, billingPeriod)} tokens ({getPricePerToken(plan, billingPeriod)}€/token)
                      </div>
                    )}
                  </div>
                </div>
                        
                {/* Caractéristiques */}
                <div className="flex-1 p-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-ocrf-gold-400 flex-shrink-0 mr-2" />
                        <span className="text-sm text-ocrf-brown-200">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                        
                {/* Bouton CTA */}
                <div className="p-6 mt-auto">
                  <Link
                    href={generateCtaLink(plan.id)}
                    className={`block w-full py-3 px-4 rounded-lg text-center font-medium transition-all duration-200 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-ocrf-copper-500 to-ocrf-gold-500 hover:from-ocrf-copper-600 hover:to-ocrf-gold-600 text-white shadow-lg shadow-ocrf-copper-500/20 hover:shadow-ocrf-copper-500/30' 
                        : 'bg-ocrf-anthracite-700 border border-ocrf-gold-500/20 hover:bg-ocrf-anthracite-600 text-ocrf-gold-100'
                    }`}
                  >
                    {plan.ctaText}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Plans de tarification - Affichage Mobile (Carousel) */}
          <div className="lg:hidden relative">
            <div 
              ref={carouselRef}
              className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 pb-8"
              style={{ scrollBehavior: 'smooth' }}
            >
              {plans.map((plan, index) => (
                <div 
                  key={plan.id}
                  className={`flex-shrink-0 w-full snap-center max-w-sm mx-auto relative flex flex-col rounded-xl backdrop-blur-sm border transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-b from-ocrf-gold-500/10 to-ocrf-copper-500/10 border-ocrf-gold-500/30 shadow-xl shadow-ocrf-gold-500/5' 
                      : 'bg-ocrf-anthracite-800/40 border-ocrf-gold-500/10'
                  }`}
                >
                  {/* Badge Populaire */}
                  {plan.popular && (
                    <div className="absolute -top-4 inset-x-0 mx-auto w-32 px-3 py-1 rounded-full bg-gradient-to-r from-ocrf-gold-400 to-ocrf-copper-500 text-ocrf-anthracite-900 text-xs font-semibold text-center">
                      {plan.badge}
                    </div>
                  )}

                  {/* En-tête du plan */}
                  <div className="p-6 text-center border-b border-ocrf-gold-500/10">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-ocrf-brown-200 mb-4">
                      {plan.description}
                    </p>
                      
                    {/* Prix */}
                    <div className="flex flex-col items-center justify-center space-y-1">
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-white">{calculatePrice(plan.price.monthly).toFixed(2)}€</span>
                        <span className="ml-1 text-sm text-ocrf-brown-200">{getBillingLabel(billingPeriod)}</span>
                      </div>

                      {/* Tokens par cycle pour les plans d'abonnement */}
                      {plan.tokensPerCycle && (
                        <div className="text-xs text-ocrf-gold-300">
                          {getTokensForPlan(plan, billingPeriod)} tokens ({getPricePerToken(plan, billingPeriod)}€/token)
                        </div>
                      )}
                    </div>
                  </div>
                
                  {/* Caractéristiques */}
                  <div className="flex-1 p-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start">
                          <CheckIcon className="h-5 w-5 text-ocrf-gold-400 flex-shrink-0 mr-2" />
                          <span className="text-sm text-ocrf-brown-200">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                
                  {/* Bouton CTA */}
                  <div className="p-6 mt-auto">
                    <Link 
                      href={generateCtaLink(plan.id)}
                      className={`block w-full py-3 px-4 rounded-lg text-center font-medium transition-all duration-200 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-ocrf-copper-500 to-ocrf-gold-500 hover:from-ocrf-copper-600 hover:to-ocrf-gold-600 text-white shadow-lg shadow-ocrf-copper-500/20 hover:shadow-ocrf-copper-500/30' 
                          : 'bg-ocrf-anthracite-700 border border-ocrf-gold-500/20 hover:bg-ocrf-anthracite-600 text-ocrf-gold-100'
                      }`}
                    >
                      {plan.ctaText}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
        
            {/* Indicateurs de pagination et boutons de navigation */}
            <div className="flex items-center justify-center mt-8 space-x-2 px-4">
              {plans.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => scrollToCard(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === index ? 'bg-ocrf-gold-400 w-5' : 'bg-ocrf-brown-600 hover:bg-ocrf-brown-500'
                  }`}
                  aria-label={`Voir le plan ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Section achat de tokens à la carte */}
          <div className="mt-16 max-w-4xl mx-auto px-4">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Achat de tokens à la carte</h3>
              <p className="text-ocrf-brown-200">Besoin de tokens sans engagement ? Choisissez la quantité qui vous convient.</p>
            </div>
            
            <div className="bg-ocrf-anthracite-800/40 backdrop-blur-sm border border-ocrf-gold-500/10 rounded-xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                <div className="flex-1">
                  <div className="mb-6">
                    <label htmlFor="tokenSelect" className="block text-sm font-medium text-ocrf-brown-200 mb-3">
                      Nombre de tokens :
                    </label>
                    <select
                      id="tokenSelect"
                      value={selectedTokens}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        setSelectedTokens(value);
                        const option = tokenOptions.find(opt => opt.tokens === value);
                        if (option) setTokenPrice(option.price);
                      }}
                      className="w-full py-3 px-4 bg-ocrf-anthracite-700 border border-ocrf-gold-500/20 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-ocrf-gold-500/50 focus:border-ocrf-gold-500/50 cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23DFC255' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 1rem center',
                        backgroundSize: '1.5em 1.5em',
                        paddingRight: '3rem'
                      }}
                    >
                      {tokenOptions.map((option) => (
                        <option 
                          key={option.tokens} 
                          value={option.tokens}
                          className="bg-ocrf-anthracite-800 text-white"
                        >
                          Pack de {option.tokens} tokens ({(option.price / option.tokens).toFixed(2)}€/token)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                    <div className="p-3 bg-ocrf-anthracite-700/50 rounded-lg border border-ocrf-gold-500/10">
                      <div className="text-xs text-ocrf-brown-300">Prix unitaire</div>
                      <div className="text-ocrf-gold-300 font-semibold">{(tokenPrice / selectedTokens).toFixed(2)}€ / token</div>
                    </div>
                    <div className="p-3 bg-ocrf-anthracite-700/50 rounded-lg border border-ocrf-gold-500/10">
                      <div className="text-xs text-ocrf-brown-300">Quantité</div>
                      <div className="text-ocrf-gold-300 font-semibold">{selectedTokens} tokens</div>
                    </div>
                    <div className="p-3 bg-ocrf-anthracite-700/50 rounded-lg border border-ocrf-gold-500/10">
                      <div className="text-xs text-ocrf-brown-300">Validité</div>
                      <div className="text-ocrf-gold-300 font-semibold">12 mois</div>
                    </div>
                    <div className="p-3 bg-ocrf-anthracite-700/50 rounded-lg border border-ocrf-gold-500/10">
                      <div className="text-xs text-ocrf-brown-300">TVA incluse</div>
                      <div className="text-ocrf-gold-300 font-semibold">20%</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex-shrink-0 flex flex-col items-center md:items-end space-y-4 p-6 rounded-xl bg-gradient-to-br from-ocrf-anthracite-700 to-ocrf-anthracite-800 border border-ocrf-gold-500/10">
                  <div className="text-center md:text-right">
                    <div className="text-sm text-ocrf-brown-200">Prix total :</div>
                    <div className="text-3xl font-bold text-white">{tokenPrice.toFixed(2)}€</div>
                    <div className="text-xs text-ocrf-gold-300">{(tokenPrice / selectedTokens).toFixed(2)}€ par token</div>
                  </div>
              
                  <Link
                    href={generateALaCarteLink(selectedTokens, tokenPrice)}
                    className="py-3 px-6 rounded-lg bg-gradient-to-r from-ocrf-copper-500 to-ocrf-gold-500 hover:from-ocrf-copper-600 hover:to-ocrf-gold-600 text-white font-medium transition-all duration-200 shadow-lg shadow-ocrf-copper-500/20 hover:shadow-ocrf-copper-500/30"
                  >
                    Acheter maintenant
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Information sur le fonctionnement des tokens */}
          <div className="mt-12 max-w-4xl mx-auto px-4">
            <div className="bg-ocrf-anthracite-800/40 backdrop-blur-sm border border-ocrf-gold-500/10 rounded-xl p-6 md:p-8">
              <h3 className="text-xl font-bold text-white mb-4">Comment fonctionnent les tokens ?</h3>
              <p className="text-ocrf-brown-200 mb-4">
                Notre système de tokens est conçu pour être simple et transparent :
              </p>
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 flex-shrink-0 rounded-full bg-gradient-to-r from-ocrf-copper-500 to-ocrf-gold-500 flex items-center justify-center text-ocrf-anthracite-900 font-bold">1</div>
                <div>
                  <p className="text-ocrf-gold-100"><strong>Consommation équitable</strong> : Environ <span className="text-ocrf-gold-300">1 token pour chaque 500 mots analysés</span> lors de la création de contenu SEO.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 flex-shrink-0 rounded-full bg-gradient-to-r from-ocrf-copper-500 to-ocrf-gold-500 flex items-center justify-center text-ocrf-anthracite-900 font-bold">2</div>
                <div>
                  <p className="text-ocrf-gold-100"><strong>Flexibilité maximale</strong> : Utilisez vos tokens comme vous le souhaitez, sur n'importe quel type de contenu proposé par notre plateforme.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 flex-shrink-0 rounded-full bg-gradient-to-r from-ocrf-copper-500 to-ocrf-gold-500 flex items-center justify-center text-ocrf-anthracite-900 font-bold">3</div>
                <div>
                  <p className="text-ocrf-gold-100"><strong>Transparence totale</strong> : Avant chaque génération, vous verrez le nombre exact de tokens nécessaires pour votre projet.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Note informative */}
          <div className="mt-12 text-center">
            <p className="text-ocrf-brown-300 text-sm max-w-2xl mx-auto">
              Tous nos prix sont indiqués TTC. Vous pouvez annuler votre abonnement à tout moment. Les tokens achetés sont valables pendant 12 mois.
            </p>
          </div>
        </div>
      </section>
    </>
  );
} 