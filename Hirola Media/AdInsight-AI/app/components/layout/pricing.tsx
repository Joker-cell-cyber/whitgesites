'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { CheckIcon, Star, CreditCard, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    background: #f1f5f9;
    border-radius: 20px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 20px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
`;

const plans = [
  {
    id: "pay-as-you-go",
    name: "Pay-as-you-go",
    description: "Achetez des tokens une fois, utilisez-les quand vous voulez",
    price: {
      monthly: 9,
      annually: 9,
      biweekly: 9,
      quarterly: 9
    },
    tokensPerCycle: null,
    features: [
      "Achat ponctuel sans abonnement",
      "Validité : 1 an",
      "Analyse Facebook Ads",
      "Rapports d'analyse"
    ],
    popular: false,
    badge: "Flexible",
    ctaText: "Acheter des tokens",
    gradientFrom: "from-adfi-blue-400",
    gradientTo: "to-adfi-blue-500",
    extraTokenPrice: 0.90
  },
  {
    id: "lite",
    name: "Lite",
    description: "Parfait pour les petites entreprises",
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
      "Analyse Facebook Ads",
      "Rapports d'analyse",
      "45 tokens par mois (0,44€/token)",
      "Tokens supplémentaires : 0,75€ par token"
    ],
    popular: false,
    badge: "Populaire",
    ctaText: "Commencer",
    gradientFrom: "from-adfi-blue-500",
    gradientTo: "to-adfi-blue-600"
  },
  {
    id: "basic",
    name: "Basic",
    description: "Pour les entreprises en croissance",
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
      "Analyse Facebook Ads",
      "Rapports d'analyse",
      "100 tokens par mois (0,35€/token)",
      "Tokens supplémentaires : 0,60€ par token"
    ],
    popular: true,
    badge: "Recommandé",
    ctaText: "Choisir",
    gradientFrom: "from-adfi-blue-600",
    gradientTo: "to-cyan-500"
  },
  {
    id: "advanced",
    name: "Advanced",
    description: "Pour les professionnels exigeants",
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
      "Analyse Facebook Ads",
      "Rapports d'analyse",
      "180 tokens par mois (0,28€/token)",
      "Tokens supplémentaires : 0,45€ par token"
    ],
    popular: false,
    badge: "Premium",
    ctaText: "Choisir",
    gradientFrom: "from-cyan-500",
    gradientTo: "to-adfi-blue-600"
  },
  {
    id: "pro",
    name: "Pro",
    description: "Solution complète pour les experts",
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
      "Analyse Facebook Ads",
      "Rapports d'analyse",
      "300 tokens par mois (0,23€/token)",
      "Tokens supplémentaires : 0,35€ par token"
    ],
    popular: false,
    badge: "Expert",
    ctaText: "Choisir",
    gradientFrom: "from-adfi-blue-600",
    gradientTo: "to-adfi-blue-400"
  }
];

const tokenOptions = [
  { tokens: 10, price: 9 },
  { tokens: 20, price: 18 },
  { tokens: 30, price: 27 },
  { tokens: 50, price: 45 },
  { tokens: 100, price: 90 },
  { tokens: 150, price: 135 },
  { tokens: 200, price: 180 },
  { tokens: 300, price: 270 },
  { tokens: 500, price: 450 }
];

// Catégories de fonctionnalités pour le tableau comparatif
const featureCategories = [
  {
    id: "analytics",
    title: "Analyse des données",
    features: [
      { title: "Analyse Facebook Ads", starter: true, pro: true, enterprise: true },
      { title: "Rapports d'analyse", starter: true, pro: true, enterprise: true },
      { title: "Recommandations d'optimisation", starter: "Basique", pro: "Avancé", enterprise: "Premium" },
    ]
  },
  {
    id: "support",
    title: "Support et formation",
    features: [
      { title: "Support par email", starter: true, pro: true, enterprise: true },
      { title: "Support téléphonique", starter: false, pro: true, enterprise: true },
      { title: "Formation personnalisée", starter: false, pro: false, enterprise: true },
    ]
  }
];

export default function Pricing() {
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });
  
  const [selectedTokens, setSelectedTokens] = useState(10);
  const [tokenPrice, setTokenPrice] = useState(9);
  const [billingCycle, setBillingCycle] = useState<'biweekly' | 'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const carouselRef = useRef<HTMLDivElement>(null);

  const calculatePrice = (basePrice: number) => {
    switch (billingCycle) {
      case 'biweekly':
        return basePrice * 0.6; // 60% du prix mensuel
      case 'monthly':
        return basePrice;
      case 'quarterly':
        return basePrice * 2.7; // économie de 10% sur 3 mois
      case 'yearly':
        return basePrice * 9.6; // économie de 20% sur 12 mois
      default:
        return basePrice;
    }
  };

  const getBillingLabel = (cycle: 'biweekly' | 'monthly' | 'quarterly' | 'yearly') => {
    switch (cycle) {
      case 'biweekly':
        return '/2 semaines';
      case 'monthly':
        return '/mois';
      case 'quarterly':
        return '/trimestre';
      case 'yearly':
        return '/an';
      default:
        return '';
    }
  };

  const getDiscountLabel = (cycle: 'biweekly' | 'monthly' | 'quarterly' | 'yearly') => {
    switch (cycle) {
      case 'quarterly':
        return 'Économisez 10%';
      case 'yearly':
        return 'Économisez 20%';
      default:
        return '';
    }
  };

  const getTokensForPlan = (plan: any, cycle: 'biweekly' | 'monthly' | 'quarterly' | 'yearly') => {
    return plan.tokensPerCycle?.[cycle]?.count || 0;
  };

  const getPricePerToken = (plan: any, cycle: 'biweekly' | 'monthly' | 'quarterly' | 'yearly') => {
    return plan.tokensPerCycle?.[cycle]?.pricePerToken || 0;
  };

  const scrollToCard = (index: number) => {
    setCurrentIndex(index);
  };

  const nextCard = () => {
    const newIndex = Math.min(plans.length - 1, currentIndex + 1);
    scrollToCard(newIndex);
  };

  const prevCard = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    scrollToCard(newIndex);
  };

  useEffect(() => {
    const handleTokenSelection = (tokens: number) => {
      setSelectedTokens(tokens);
      const option = tokenOptions.find(opt => opt.tokens === tokens);
      if (option) {
        setTokenPrice(option.price);
      }
    };

    handleTokenSelection(10); // Initial selection
  }, []);

  // Générer l'URL vers pre-checkout avec les paramètres appropriés
  const generateCtaLink = (planId: string) => {
    if (planId === 'pay-as-you-go') {
      return `/pre-checkout?plan=${planId}&period=one-time&tokens=${selectedTokens}`;
    } else {
      // Pour les plans d'abonnement, utiliser le format d'URL attendu par pre-checkout
      return `/pre-checkout?plan=${planId}&period=${
        billingCycle === 'biweekly' ? 'bi-weekly' : 
        billingCycle === 'yearly' ? 'annualy' : 
        billingCycle
      }`;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-adfi-slate-50"
    >
      {/* Effet de fond */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-5"></div>
      
      {/* Éléments décoratifs */}
      <div className="absolute top-40 right-10 w-64 h-64 rounded-full bg-adfi-blue-100/20 blur-3xl"></div>
      <div className="absolute bottom-40 left-10 w-80 h-80 rounded-full bg-adfi-blue-100/30 blur-3xl"></div>

      <div className="container px-4 mx-auto relative z-10">
        {/* Styles CSS pour masquer les barres de défilement */}
        <style jsx global>{hideScrollbarStyle}</style>
        
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 border border-adfi-blue-500/30 rounded-full backdrop-blur-sm bg-white/60"
          >
            <span className="text-adfi-blue-700 text-sm font-medium">
              <span className="mr-2 inline-block w-2 h-2 rounded-full bg-adfi-blue-500 animate-pulse"></span>
              Tarification transparente
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-adfi-blue-600 via-adfi-blue-500 to-cyan-500 mt-4 mb-6"
          >
            Des plans adaptés à vos ambitions
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-xl text-adfi-slate-600 max-w-3xl mx-auto"
          >
            Choisissez le forfait qui convient le mieux à vos besoins et commencez dès aujourd'hui. 
            Tous nos forfaits incluent une analyse complète de vos données Facebook Ads.
          </motion.p>
        </div>
        
        {/* Sélecteur de cycle de facturation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex flex-wrap justify-center p-1 rounded-xl bg-white/90 backdrop-blur-sm border border-adfi-blue-200">
            <button
              onClick={() => setBillingCycle('biweekly')}
              className={`px-6 py-2 m-1 rounded-lg text-sm font-medium transition-colors ${
                billingCycle === 'biweekly'
                  ? 'bg-adfi-blue-600 text-white'
                  : 'text-adfi-slate-700 hover:text-adfi-blue-700'
              }`}
            >
              Bi-hebdomadaire
            </button>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 m-1 rounded-lg text-sm font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-adfi-blue-600 text-white'
                  : 'text-adfi-slate-700 hover:text-adfi-blue-700'
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setBillingCycle('quarterly')}
              className={`px-6 py-2 m-1 rounded-lg text-sm font-medium transition-colors ${
                billingCycle === 'quarterly'
                  ? 'bg-adfi-blue-600 text-white'
                  : 'text-adfi-slate-700 hover:text-adfi-blue-700'
              }`}
            >
              Trimestriel <span className="text-xs text-adfi-blue-500">-10%</span>
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 m-1 rounded-lg text-sm font-medium transition-colors ${
                billingCycle === 'yearly'
                  ? 'bg-adfi-blue-600 text-white'
                  : 'text-adfi-slate-700 hover:text-adfi-blue-700'
              }`}
            >
              Annuel <span className="text-xs text-adfi-blue-500">-20%</span>
            </button>
          </div>
        </motion.div>

        {/* Navigation du carrousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative max-w-7xl mx-auto mb-12"
        >
          <div className="flex justify-center space-x-2">
            {plans.map((plan, index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                className={`${
                  currentIndex === index
                    ? `w-10 h-2 bg-gradient-to-r ${plan.gradientFrom} ${plan.gradientTo}`
                    : 'w-2 h-2 bg-adfi-slate-300'
                } rounded-full transition-all duration-300`}
                aria-label={`Plan ${plan.name}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Carrousel de prix */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative mx-auto max-w-7xl px-4 overflow-hidden"
        >
          <div 
            ref={carouselRef}
            className="flex overflow-x-hidden snap-x snap-mandatory -mx-4 pb-8 hide-scrollbar"
          >
            {plans.map((plan, index) => (
              <div 
                key={plan.id}
                className={`flex-none w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 transition-all duration-500 snap-center ${
                  currentIndex === index ? 'opacity-100 scale-100' : 'opacity-50 scale-95'
                }`}
              >
                <div 
                  className={`h-full rounded-2xl overflow-hidden backdrop-blur-sm border ${
                    plan.popular
                      ? 'border-adfi-blue-500/50 bg-gradient-to-b from-adfi-blue-500/10 to-transparent'
                      : 'border-adfi-blue-200 bg-white/90'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-adfi-blue-600 to-cyan-600 text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
                      Recommandé
                    </div>
                  )}
                  
                  <div className="p-6 md:p-8">
                    <h3 className="text-2xl font-bold text-adfi-slate-900 mb-2">{plan.name}</h3>
                    <p className="text-adfi-slate-600 mb-6 h-12">{plan.description}</p>
                    
                    <div className="flex items-baseline mb-8">
                      <span className="text-4xl font-bold text-adfi-slate-900">
                        {plan.id === 'pay-as-you-go' 
                          ? 'À partir de' 
                          : `${calculatePrice(plan.price.monthly).toFixed(2)}€`}
                      </span>
                      {plan.id !== 'pay-as-you-go' && (
                        <span className="text-adfi-slate-600 ml-2">
                          {getBillingLabel(billingCycle)}
                        </span>
                      )}
                    </div>

                    {plan.id === 'pay-as-you-go' ? (
                      <div className="space-y-4 mb-8">
                        <div className="flex items-center justify-between">
                          <span className="text-adfi-slate-600">Tokens</span>
                          <select
                            value={selectedTokens}
                            onChange={(e) => {
                              const tokens = parseInt(e.target.value);
                              setSelectedTokens(tokens);
                              setTokenPrice(tokens * 0.9);
                            }}
                            className="bg-white border border-adfi-blue-200 rounded-lg px-3 py-1 text-adfi-slate-700"
                          >
                            {tokenOptions.map((option) => (
                              <option 
                                key={option.tokens} 
                                value={option.tokens} 
                                className="bg-white text-adfi-slate-700"
                              >
                                {option.tokens} tokens - {option.price}€
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="text-sm text-adfi-slate-600">
                          Prix unitaire : 0,90€ par token
                        </div>
                        <div className="text-xs text-adfi-blue-600">
                          Validité : 1 an
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4 mb-8">
                        <div className="text-sm text-adfi-slate-600 mb-4">
                          {getTokensForPlan(plan, billingCycle)} tokens inclus
                        </div>
                        
                        <div className="text-xs text-adfi-blue-600">
                          Prix par token : {getPricePerToken(plan, billingCycle).toFixed(2)}€
                        </div>
                        
                        <div className="text-xs text-adfi-blue-600">
                          Tokens supplémentaires : {plan.extraTokenPrice.toFixed(2)}€ par token
                        </div>
                      </div>
                    )}

                    <ul className="space-y-4 mb-8 max-h-64 overflow-y-auto custom-scrollbar pr-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-adfi-slate-600">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-adfi-blue-50 flex items-center justify-center mt-0.5 mr-3">
                            <CheckIcon className="w-3 h-3 text-adfi-blue-600" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                
                    <Link 
                      href={generateCtaLink(plan.id)}
                      className={`w-full py-3 rounded-xl flex items-center justify-center font-semibold transition-all ${
                        plan.popular
                        ? `bg-gradient-to-r ${plan.gradientFrom} ${plan.gradientTo} text-white shadow-lg shadow-adfi-blue-600/20 hover:shadow-xl hover:shadow-adfi-blue-600/30`
                        : 'bg-white text-adfi-blue-600 border border-adfi-blue-500 hover:bg-adfi-blue-50'
                      }`}
                    >
                      {plan.ctaText}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        
          {/* Contrôles de navigation */}
          <div className="flex justify-between items-center mt-8">
            <button 
              onClick={prevCard}
              className={`p-3 rounded-full bg-white/10 backdrop-blur-sm border border-adfi-blue-200 text-adfi-blue-600 hover:bg-adfi-blue-50 transition-colors ${
                currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={currentIndex === 0}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="text-adfi-slate-600 text-sm">
              {currentIndex + 1} / {plans.length}
            </div>
            
            <button 
              onClick={nextCard}
              className={`p-3 rounded-full bg-white/10 backdrop-blur-sm border border-adfi-blue-200 text-adfi-blue-600 hover:bg-adfi-blue-50 transition-colors ${
                currentIndex === plans.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={currentIndex === plans.length - 1}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Notes de bas de page */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="max-w-3xl mx-auto mt-16 text-center"
        >
          <p className="text-adfi-slate-600 text-sm">
            * Les offres bi-hebdomadaires sont facturées tous les 15 jours. Les offres mensuelles sont facturées tous les 30 jours. 
            Les tokens inutilisés sont valables pendant un an. Des frais de paiement peuvent s'appliquer.
          </p>
          
          <Link 
            href="/contact" 
            className="text-adfi-blue-600 font-semibold hover:text-adfi-blue-700 hover:underline inline-flex items-center mt-4"
          >
            Contacter notre équipe commerciale
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>

        {/* Nouvelle section explicative des tokens */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="max-w-4xl mx-auto mt-16 px-4"
        >
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-adfi-blue-200 p-8 shadow-lg">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-adfi-slate-900 mb-2">Comment fonctionnent les tokens ?</h3>
              <p className="text-adfi-slate-600">
                Les tokens sont l'unité de consommation sur AdInsight AI. Ils permettent de réaliser différentes analyses avec une grande flexibilité.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-adfi-slate-900 flex items-center">
                  <Zap className="h-5 w-5 text-adfi-blue-600 mr-2" />
                  Coût des analyses
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-adfi-slate-50 rounded-lg">
                    <span className="text-adfi-slate-700">Analyse basique</span>
                    <span className="font-semibold text-adfi-blue-600">1-2 tokens</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-adfi-slate-50 rounded-lg">
                    <span className="text-adfi-slate-700">Analyse standard</span>
                    <span className="font-semibold text-adfi-blue-600">2-3 tokens</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-adfi-slate-50 rounded-lg">
                    <span className="text-adfi-slate-700">Analyse avancée</span>
                    <span className="font-semibold text-adfi-blue-600">3-4 tokens</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-adfi-slate-50 rounded-lg">
                    <span className="text-adfi-slate-700">Analyse complète</span>
                    <span className="font-semibold text-adfi-blue-600">4-6 tokens</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-adfi-slate-900 flex items-center">
                  <CreditCard className="h-5 w-5 text-adfi-blue-600 mr-2" />
                  Avantages du système
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-adfi-blue-50 flex items-center justify-center mt-0.5 mr-3">
                      <CheckIcon className="w-3 h-3 text-adfi-blue-600" />
                    </div>
                    <span className="text-adfi-slate-700">Paiement à l'usage : utilisez uniquement ce dont vous avez besoin</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-adfi-blue-50 flex items-center justify-center mt-0.5 mr-3">
                      <CheckIcon className="w-3 h-3 text-adfi-blue-600" />
                    </div>
                    <span className="text-adfi-slate-700">Flexibilité : choisissez le niveau de détail de vos analyses</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-adfi-blue-50 flex items-center justify-center mt-0.5 mr-3">
                      <CheckIcon className="w-3 h-3 text-adfi-blue-600" />
                    </div>
                    <span className="text-adfi-slate-700">Options personnalisables : ajoutez des modules d'analyse selon vos besoins</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-adfi-blue-50 flex items-center justify-center mt-0.5 mr-3">
                      <CheckIcon className="w-3 h-3 text-adfi-blue-600" />
                    </div>
                    <span className="text-adfi-slate-700">Validité de 1 an pour tous les tokens achetés</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-4 bg-adfi-blue-50 rounded-xl border border-adfi-blue-100">
              <p className="text-adfi-slate-700 text-sm">
                <strong>Note :</strong> Le coût en tokens varie selon la complexité de l'analyse et les options sélectionnées. Les analyses plus détaillées ou avec des fonctionnalités avancées consommeront plus de tokens, mais fourniront des insights plus approfondis pour optimiser vos campagnes.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 