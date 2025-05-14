'use client';

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/app/components/ui/button";
import { Check, MessageCircleHeart, CreditCard, Clock, Star, ChevronLeft, ChevronRight, Plus, Minus, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

type BillingPeriod = 'biweekly' | 'monthly' | 'quarterly' | 'annual';

interface BasePlan {
  name: string;
  description: string;
  cta: string;
  popular: boolean;
  gradient: string;
  hoverGradient: string;
  icon: React.ReactNode;
}

interface TokenPlan extends BasePlan {
  pricePerToken: number;
  features: string[];
}

interface SubscriptionPlan extends BasePlan {
  basePrice: number;
  features: string[];
  messagesPerDay: number;
  tokenDiscount: number; // Pourcentage de réduction sur les tokens supplémentaires
}

type Plan = TokenPlan | SubscriptionPlan;

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');
  const [animateCards, setAnimateCards] = useState(false);
  const [tokenCount, setTokenCount] = useState<number>(50);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Animation des cartes lors du chargement
    setAnimateCards(true);
  }, []);

  const getPriceMultiplier = (period: BillingPeriod) => {
    switch (period) {
      case 'biweekly': return 0.6; // Prix plus élevé car plus court terme
      case 'monthly': return 1;
      case 'quarterly': return 2.7; // 10% de réduction
      case 'annual': return 9.6; // 20% de réduction
      default: return 1;
    }
  };

  const formatPrice = (basePrice: number, period: BillingPeriod): string => {
    const multiplier = getPriceMultiplier(period);
    const totalPrice = basePrice * multiplier;
    return totalPrice.toFixed(2);
  };

  const getPeriodLabel = (period: BillingPeriod): string => {
    switch (period) {
      case 'biweekly': return '/ 2 semaines';
      case 'monthly': return '/ mois';
      case 'quarterly': return '/ trimestre';
      case 'annual': return '/ an';
      default: return '';
    }
  };

  const getSavingsLabel = (period: BillingPeriod): string => {
    switch (period) {
      case 'quarterly': return '-10%';
      case 'annual': return '-20%';
      default: return '';
    }
  };

  const formatTokenPrice = (count: number, basePrice: number): string => {
    return (count * basePrice).toFixed(2);
  };

  const handleTokenIncrement = () => {
    if (tokenCount < 100) {
      setTokenCount(prev => prev + 10);
    } else if (tokenCount < 500) {
      setTokenCount(prev => prev + 50);
    }
  };

  const handleTokenDecrement = () => {
    if (tokenCount > 100) {
      setTokenCount(prev => prev - 50);
    } else if (tokenCount > 10) {
      setTokenCount(prev => prev - 10);
    }
  };

  const scrollToNext = () => {
    if (currentIndex < plans.length - 1) {
      setCurrentIndex(currentIndex + 1);
      if (containerRef.current) {
        const card = containerRef.current.children[currentIndex + 1] as HTMLElement;
        containerRef.current.scrollTo({
          left: card.offsetLeft - 20,
          behavior: 'smooth'
        });
      }
    }
  };

  const scrollToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      if (containerRef.current) {
        const card = containerRef.current.children[currentIndex - 1] as HTMLElement;
        containerRef.current.scrollTo({
          left: card.offsetLeft - 20,
          behavior: 'smooth'
        });
      }
    }
  };

  const getTokenExtraPrice = (plan: string): number => {
    const extraPrices: Record<string, number> = {
      'lite': 0.75,
      'basic': 0.60,
      'advanced': 0.45,
      'pro': 0.35,
      'pay-as-you-go': 0.90
    };
    
    return extraPrices[plan.toLowerCase()] || 0.75;
  };

  // Convertir le type BillingPeriod en format pour l'URL de pre-checkout
  const getPeriodParam = (period: BillingPeriod): string => {
    switch (period) {
      case 'biweekly': return 'bi-weekly';
      case 'monthly': return 'monthly';
      case 'quarterly': return 'quarterly';
      case 'annual': return 'annualy';
      default: return 'monthly';
    }
  };

  // Convertir le nom du plan en ID pour l'URL de pre-checkout
  const getPlanParam = (planName: string): string => {
    switch (planName.toLowerCase()) {
      case 'à la carte': return 'pay-as-you-go';
      case 'lite': return 'lite';
      case 'basic': return 'basic';
      case 'advanced': return 'advanced';
      case 'pro': return 'pro';
      default: return planName.toLowerCase();
    }
  };

  const plans: Plan[] = [
    {
      name: "À la carte",
      description: "Payez uniquement ce que vous utilisez",
      pricePerToken: 0.90,
      features: [
        "Achetez des tokens à utiliser quand vous voulez",
        "Pas d'engagement",
        "Achat minimum : 10 tokens",
        "Validité des tokens : 1 an"
      ],
      cta: "Acheter des tokens",
      popular: false,
      gradient: "from-[#664D45] to-[#2D1811]",
      hoverGradient: "from-[#664D45] to-[#2D1811]/80",
      icon: <CreditCard className="h-5 w-5" />
    } as TokenPlan,
    {
      name: "Lite",
      description: "Idéal pour débuter votre expérience",
      basePrice: 19.90,
      features: [
        "45 tokens inclus par mois",
        "Prix par token inclus : 0,44€",
        "Coach masculin ou féminin"
                  ],
      cta: "Choisir ce plan",
      popular: false,
      gradient: "from-[#FF5C3E]/90 to-[#FF5C3E]",
      hoverGradient: "from-[#FF5C3E] to-[#FF5C3E]/80",
      messagesPerDay: 45,
      tokenDiscount: 0,
      icon: <MessageCircleHeart className="h-5 w-5" />
    } as SubscriptionPlan,
    {
      name: "Basic",
      description: "Pour améliorer votre approche",
      basePrice: 34.90,
      features: [
        "100 tokens inclus par mois",
        "Prix par token inclus : 0,35€",
        "Coach masculin ou féminin"
            ],
      cta: "Choisir ce plan",
      popular: true,
      gradient: "from-[#FF5C3E] to-[#FFA728]",
      hoverGradient: "from-[#F05538] to-[#F5961F]",
      messagesPerDay: 100,
      tokenDiscount: 0,
      icon: <MessageCircleHeart className="h-5 w-5" />
    } as SubscriptionPlan,
    {
      name: "Advanced",
      description: "Pour les utilisateurs réguliers",
      basePrice: 49.90,
      features: [
        "180 tokens inclus par mois",
        "Prix par token inclus : 0,28€",
        "Coach masculin et féminin"
      ],
      cta: "Choisir ce plan",
      popular: false,
      gradient: "from-purple-600 to-indigo-600",
      hoverGradient: "from-purple-500 to-indigo-500",
      messagesPerDay: 180,
      tokenDiscount: 0,
      icon: <Star className="h-5 w-5" />
    } as SubscriptionPlan,
    {
      name: "Pro",
      description: "Pour une transformation complète",
      basePrice: 69.90,
      features: [
        "300 tokens inclus par mois",
        "Prix par token inclus : 0,23€",
        "Coach masculin et féminin"
      ],
      cta: "Devenir Pro",
      popular: false,
      gradient: "from-indigo-600 to-blue-600",
      hoverGradient: "from-indigo-500 to-blue-500",
      messagesPerDay: 300,
      tokenDiscount: 0,
      icon: <Star className="h-5 w-5" />
    } as SubscriptionPlan
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 bg-[url('/love-pattern.svg')] bg-repeat opacity-5"></div>
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-slate-950 to-transparent"></div>
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 -right-64 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-400 text-sm font-medium mb-4 backdrop-blur-sm"
          >
            <Clock className="inline-block mr-1 h-3.5 w-3.5" />
            Tarifs
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-pink-100 to-white"
          >
            Transformez votre vie amoureuse dès maintenant
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Découvrez nos différentes offres et choisissez celle qui vous conviendra le mieux pour commencer votre expérience de coaching en séduction
          </motion.p>
        </div>
        
        {/* Sélecteur de période de facturation */}
        <div className="flex justify-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-slate-800/50 backdrop-blur-md rounded-xl p-1.5 w-full max-w-xl flex flex-wrap justify-center border border-slate-700/50 shadow-lg"
          >
            <button
              onClick={() => setBillingPeriod('biweekly')}
              className={`py-2 px-4 rounded-lg transition-all duration-300 m-1 text-sm ${
                billingPeriod === 'biweekly'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/20'
                  : 'text-gray-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              Bi-hebdomadaire
            </button>
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`py-2 px-4 rounded-lg transition-all duration-300 m-1 text-sm ${
                billingPeriod === 'monthly'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/20'
                  : 'text-gray-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setBillingPeriod('quarterly')}
              className={`py-2 px-4 rounded-lg transition-all duration-300 m-1 text-sm ${
                billingPeriod === 'quarterly'
                  ? 'bg-gradient-to-r from-[#FF5C3E] to-[#FFA728] text-white shadow-md shadow-[#FF5C3E]/20'
                  : 'text-gray-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              Trimestriel <span className="ml-1 text-xs bg-[#FF5C3E]/30 px-1.5 py-0.5 rounded">-10%</span>
            </button>
              <button
              onClick={() => setBillingPeriod('annual')}
              className={`py-2 px-4 rounded-lg transition-all duration-300 m-1 text-sm ${
                billingPeriod === 'annual'
                  ? 'bg-gradient-to-r from-[#FF5C3E] to-[#FFA728] text-white shadow-md shadow-[#FF5C3E]/20'
                  : 'text-gray-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              Annuel <span className="ml-1 text-xs bg-[#FFA728]/30 text-[#FFA728] px-1.5 py-0.5 rounded">-20%</span>
              </button>
          </motion.div>
        </div>
        
        {/* Navigation des cartes */}
        <div className="relative max-w-6xl mx-auto mb-6">
          <button 
            onClick={scrollToPrev}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-slate-800/70 backdrop-blur-md p-2 rounded-full border border-slate-600/50 text-white ${
              currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pink-500/30 hover:border-pink-400/50'
            }`}
            aria-label="Forfait précédent"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button 
            onClick={scrollToNext}
            disabled={currentIndex === plans.length - 1}
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-slate-800/70 backdrop-blur-md p-2 rounded-full border border-slate-600/50 text-white ${
              currentIndex === plans.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pink-500/30 hover:border-pink-400/50'
            }`}
            aria-label="Forfait suivant"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Grille des tarifs - version scrollable avec navigation */}
          <div 
            ref={containerRef}
            className="flex space-x-4 pb-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            style={{ scrollBehavior: 'smooth' }}
          >
          {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: animateCards ? 1 : 0, 
                  y: animateCards ? 0 : 20 
                }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`relative rounded-xl border snap-center flex-shrink-0 ${
                  plan.popular 
                    ? 'border-[#FF5C3E] shadow-lg shadow-[#FF5C3E]/10' 
                    : 'border-slate-700/50'
                } bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md overflow-hidden flex flex-col w-[320px] min-h-[620px]`}
              >
                {/* Badge populaire */}
              {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-gradient-to-r from-[#FF5C3E] to-[#FFA728] text-white text-xs font-bold px-4 py-1 rounded-bl-xl">
                      POPULAIRE
                  </div>
                </div>
              )}
              
                <div className="p-6 flex-grow">
                  <div className={`inline-flex items-center justify-center p-2 rounded-lg bg-gradient-to-br ${plan.gradient} mb-4`}>
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                    {'pricePerToken' in plan ? (
                        <div>
                        <div className="flex items-baseline justify-between mb-4">
                          <span className="text-4xl font-bold text-white">
                            {plan.pricePerToken.toFixed(2)}€
                          </span>
                          <span className="text-gray-400">/ crédit</span>
                        </div>
                        
                        {/* Sélecteur de tokens */}
                        <div className="bg-slate-800/70 rounded-lg p-4 mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-300">Nombre de tokens:</span>
                            <span className="text-white font-bold">{tokenCount}</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <button
                              onClick={handleTokenDecrement}
                              disabled={tokenCount <= 10}
                              className={`p-1.5 rounded-lg bg-slate-700 ${tokenCount <= 10 ? 'opacity-50' : 'hover:bg-pink-500/30'}`}
                            >
                              <Minus className="h-4 w-4 text-white" />
                            </button>
                            
                            <div className="w-full mx-2 h-2 bg-slate-700 rounded-full">
                              <div 
                                className="h-2 bg-gradient-to-r from-[#FF5C3E] to-[#FFA728] rounded-full" 
                                style={{ width: `${(tokenCount / 500) * 100}%` }}
                              ></div>
                            </div>
                            
                            <button
                              onClick={handleTokenIncrement}
                              disabled={tokenCount >= 500}
                              className={`p-1.5 rounded-lg bg-slate-700 ${tokenCount >= 500 ? 'opacity-50' : 'hover:bg-pink-500/30'}`}
                            >
                              <Plus className="h-4 w-4 text-white" />
                            </button>
                          </div>
                          
                          <div className="text-right mt-2">
                            <span className="text-[#FF5C3E] font-bold">
                              Total: {formatTokenPrice(tokenCount, plan.pricePerToken)}€
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-baseline justify-between">
                          <span className="text-4xl font-bold text-white">
                            {formatPrice(plan.basePrice, billingPeriod)}€
                          </span>
                          <span className="text-gray-400">{getPeriodLabel(billingPeriod)}</span>
                      </div>
                        
                        {!('pricePerToken' in plan) && billingPeriod !== 'monthly' && (
                          <p className="text-sm text-gray-500 mt-1">
                        {billingPeriod === 'biweekly' && 'Facturé toutes les 2 semaines'}
                        {billingPeriod === 'quarterly' && 'Facturé tous les 3 mois'}
                        {billingPeriod === 'annual' && 'Facturé annuellement'}
                      {(billingPeriod === 'quarterly' || billingPeriod === 'annual') && (
                              <span className="ml-2 text-green-400">
                                {getSavingsLabel(billingPeriod)} sur le prix mensuel
                              </span>
                            )}
                        </p>
                      )}
                        
                        {/* Tokens supplémentaires pour les abonnements */}
                        <div className="mt-4 pt-3 border-t border-slate-700/50">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="h-4 w-4 text-[#FF5C3E]" />
                            <span className="text-sm text-gray-300">Tokens supplémentaires:</span>
                          </div>
                          <div className="text-[#FF5C3E] font-medium">
                            {getTokenExtraPrice(plan.name)}€ / token supplémentaire
                          </div>
                        </div>
                      </div>
                  )}
                </div>
                
                  <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-[#FF5C3E] mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                  <div className="mt-auto p-6 pt-0">
                    {/* Modifier ici pour utiliser les liens vers pre-checkout avec les paramètres corrects */}
                    <Link 
                      href={
                        'pricePerToken' in plan 
                          ? `/pre-checkout?plan=${getPlanParam(plan.name)}&period=one-time&tokens=${tokenCount}` 
                          : `/pre-checkout?plan=${getPlanParam(plan.name)}&period=${getPeriodParam(billingPeriod)}`
                      }
                      className={`w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg text-base font-medium text-black bg-white hover:bg-white/90 transition-colors duration-200`}
                    >
                      {plan.cta}
                    </Link>
                  </div>
                </div>
              </motion.div>
          ))}
          </div>
        </div>
        
        {/* Indicateurs de navigation */}
        <div className="flex justify-center mt-6">
          <div className="flex space-x-2">
            {plans.map((_, index) => (
          <button 
                key={index} 
            onClick={() => {
                  setCurrentIndex(index);
                  if (containerRef.current) {
                    const card = containerRef.current.children[index] as HTMLElement;
                    containerRef.current.scrollTo({
                      left: card.offsetLeft - 20,
                      behavior: 'smooth'
                    });
                  }
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-[#FF5C3E] w-6' : 'bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Voir le forfait ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
        
        {/* Style pour masquer la scrollbar mais permettre le défilement */}
        <style jsx global>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
    </section>
  );
} 