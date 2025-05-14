'use client';

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/app/components/ui/button";
import { Check, MessageCircleHeart, CreditCard, Clock, Star, ChevronLeft, ChevronRight, Plus, Minus, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

type BillingPeriod = 'biweekly' | 'monthly' | 'quarterly' | 'yearly';

interface Plan {
  id: string;
  name: string;
  description: string;
  mostPopular: boolean;
  gradientFrom: string;
  gradientTo: string;
  features: string[];
  badge?: string;
  monthlyCostInfo?: string;
  lowestCost?: boolean;
  includesAI?: boolean;
}

export default function Pricing() {
  const [period, setPeriod] = useState<string>('monthly');
  const [selectedTokens, setSelectedTokens] = useState<number>(50);
  
  const handlePeriodChange = (newPeriod: string) => {
    setPeriod(newPeriod);
  };
  
  const handleTokenIncrement = () => {
    if (selectedTokens < 100) {
      setSelectedTokens(prev => prev + 10);
    } else if (selectedTokens < 500) {
      setSelectedTokens(prev => prev + 50);
    }
  };

  const handleTokenDecrement = () => {
    if (selectedTokens > 100) {
      setSelectedTokens(prev => prev - 50);
    } else if (selectedTokens > 10) {
      setSelectedTokens(prev => prev - 10);
    }
  };

  const getFormattedPrice = (plan: string, planPeriod: string) => {
    const basePrices: Record<string, Record<string, number>> = {
      'lite': { monthly: 19.90, biweekly: 11.94, quarterly: 53.73, yearly: 191.04 },
      'basic': { monthly: 34.90, biweekly: 20.94, quarterly: 94.23, yearly: 335.04 },
      'advanced': { monthly: 49.90, biweekly: 29.94, quarterly: 134.73, yearly: 479.04 },
      'pro': { monthly: 69.90, biweekly: 41.94, quarterly: 188.73, yearly: 671.04 },
      'pay-as-you-go': { 'one-time': 0.90 } // Prix par token
    };
    
    // Normalisation de la période pour l'accès à l'objet de prix
    let periodKey = planPeriod.toLowerCase();
    if (periodKey === 'bi-weekly' || periodKey === 'biweekly') {
      periodKey = 'biweekly';
    }
    if (periodKey === 'annualy' || periodKey === 'annual' || periodKey === 'yearly') {
      periodKey = 'yearly';
    }
    
    const price = basePrices[plan.toLowerCase()]?.[periodKey] || 0;
    return price.toFixed(2);
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

  const translatePeriod = (periodKey: string): string => {
    const translations: Record<string, string> = {
      'monthly': 'Mensuel',
      'quarterly': 'Trimestriel',
      'bi-weekly': 'Bi-hebdomadaire',
      'biweekly': 'Bi-hebdomadaire',
      'yearly': 'Annuel',
      'annualy': 'Annuel',
      'annual': 'Annuel',
      'one-time': 'Paiement unique'
    };
    
    return translations[periodKey.toLowerCase()] || periodKey;
  };
  
  const plans: Plan[] = [
    {
      id: 'lite',
      name: "LITE",
      description: "Pour commencer à améliorer votre approche",
      mostPopular: false,
      gradientFrom: "from-orange-400",
      gradientTo: "to-orange-500",
      features: [
        "45 tokens inclus par mois",
        "Assistance par chat",
        "Coach virtuel personnalisé",
      ],
    },
    {
      id: 'basic',
      name: "BASIC",
      description: "Pour une approche plus confiante",
      mostPopular: true,
      gradientFrom: "from-pink-500",
      gradientTo: "to-rose-500",
      features: [
        "100 tokens inclus par mois",
        "Assistance par chat",
        "Coach virtuel personnalisé",
      ],
      badge: "Populaire"
    },
    {
      id: 'advanced',
      name: "ADVANCED",
      description: "Pour les utilisateurs sérieux",
      mostPopular: false,
      gradientFrom: "from-purple-500",
      gradientTo: "to-indigo-500",
      features: [
        "180 tokens inclus par mois",
        "Assistance par chat",
        "Coach virtuel personnalisé",
      ],
    },
    {
      id: 'pro',
      name: "PRO",
      description: "Pour une transformation complète",
      mostPopular: false,
      gradientFrom: "from-blue-400",
      gradientTo: "to-blue-600",
      features: [
        "300 tokens inclus par mois",
        "Assistance par chat",
        "Coach virtuel personnalisé",
      ],
    },
    {
      id: 'pay-as-you-go',
      name: "PAY-AS-YOU-GO",
      description: "Payez uniquement ce que vous utilisez",
      mostPopular: false,
      gradientFrom: "from-emerald-400",
      gradientTo: "to-teal-500",
      features: [
        "Achetez des tokens à utiliser quand vous voulez",
        "Pas d'engagement",
        "Validité des tokens : 1 an",
        "Accès à toutes les fonctionnalités",
      ],
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-white to-yfc-cream-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/subtle-pattern.svg')] bg-repeat opacity-5"></div>
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-yfc-gold-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 -right-64 w-96 h-96 bg-yfc-cream-200/40 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-yfc-gold-100 to-yfc-cream-200 text-yfc-gold-800 text-sm font-medium mb-4 backdrop-blur-sm"
          >
            <Clock className="inline-block mr-1 h-3.5 w-3.5" />
            Tarifs
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Choisissez le plan qui vous convient
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg text-gray-600"
          >
            Des options flexibles pour tous vos besoins en séduction, avec des tokens adaptés à votre utilisation.
          </motion.p>
          
          {/* Explication du système de tokens */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-6 max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-yfc-cream-200"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-yfc-gold-500" />
              Comment fonctionnent les tokens ?
            </h3>
            <p className="text-gray-600 mb-3">
              Les tokens sont la monnaie d'échange sur FlirtSage AI. Ils vous permettent d'interagir avec votre coach virtuel de séduction.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start">
                <MessageCircleHeart className="h-5 w-5 text-yfc-gold-500 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-gray-900">1 token = 1 message</span>
                  <p className="text-gray-500">Chaque message que vous envoyez au coach coûte 1 token.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-yfc-gold-500 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-gray-900">Validité des tokens</span>
                  <p className="text-gray-500">Vos tokens sont valables pendant 1 an à partir de leur date d'achat.</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Sélecteur de période */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex p-1.5 bg-gray-100 rounded-full shadow-inner">
              <button
                onClick={() => handlePeriodChange('bi-weekly')}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  period === 'bi-weekly' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Bi-hebdo
              </button>
              <button
                onClick={() => handlePeriodChange('monthly')}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  period === 'monthly' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Mensuel
              </button>
              <button
                onClick={() => handlePeriodChange('quarterly')}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  period === 'quarterly' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Trimestriel
              </button>
              <button
                onClick={() => handlePeriodChange('annualy')}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  period === 'annualy' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Annuel
              </button>
            </div>
          </div>
        </div>
        
        {/* Affichage des forfaits en grille */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mt-8">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`relative rounded-2xl p-6 bg-white border border-gray-100 shadow-xl shadow-gray-100/10 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-200/20 hover:-translate-y-1 flex flex-col h-full`}
            >
              {plan.mostPopular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1 text-xs font-semibold rounded-bl-lg rounded-tr-lg">
                  Plus populaire
                </div>
              )}
              
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-md">
                  {plan.badge}
                </div>
              )}
              
              <div className={`p-3 rounded-full inline-flex mb-6 bg-gradient-to-r ${plan.gradientFrom} ${plan.gradientTo} bg-opacity-10`}>
                {plan.id === 'pay-as-you-go' ? (
                  <CreditCard className="h-6 w-6 text-white" />
                ) : (
                  <MessageCircleHeart className="h-6 w-6 text-white" />
                )}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-6 text-sm flex-grow">{plan.description}</p>
              
              {plan.id === 'pay-as-you-go' ? (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">Nombre de tokens :</span>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={handleTokenDecrement}
                        className="bg-gray-100 rounded-full p-1 hover:bg-gray-200 transition-colors"
                      >
                        <Minus className="h-4 w-4 text-gray-600" />
                      </button>
                      <span className="font-medium">{selectedTokens}</span>
                      <button 
                        onClick={handleTokenIncrement}
                        className="bg-gray-100 rounded-full p-1 hover:bg-gray-200 transition-colors"
                      >
                        <Plus className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-end justify-center gap-1.5">
                      <span className="text-3xl font-bold">{(selectedTokens * getTokenExtraPrice(plan.id)).toFixed(2)}€</span>
                      <span className="text-gray-500 text-sm mb-1">au total</span>
                    </div>
                    <div className="text-center text-sm text-gray-500 mt-1">
                      {getTokenExtraPrice(plan.id)}€ par token
                    </div>
                  </div>
                </>
              ) : (
                <div className="mb-6">
                  <div className="flex items-end justify-center gap-1.5">
                    <span className="text-3xl font-bold">{getFormattedPrice(plan.id, period)}€</span>
                    <span className="text-gray-500 text-sm mb-1">
                      {period === 'monthly' ? '/ mois' : 
                       period === 'quarterly' ? '/ trimestre' : 
                       period === 'bi-weekly' ? '/ 2 semaines' : 
                       '/ an'}
                    </span>
                  </div>
                  {(period === 'quarterly' || period === 'annualy') && (
                    <div className="text-center text-sm text-green-600 font-medium mt-1">
                      {period === 'quarterly' ? 'Économisez 10%' : 'Économisez 20%'}
                    </div>
                  )}
                </div>
              )}
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-auto">
                <Link 
                  href={plan.id === 'pay-as-you-go' 
                    ? `/pre-checkout?plan=${plan.id}&period=one-time&tokens=${selectedTokens}&tokenPrice=0.90` 
                    : `/pre-checkout?plan=${plan.id}&period=${period}`}
                  className={`w-full inline-flex justify-center items-center px-5 py-3 rounded-xl transition-all text-white font-medium bg-gradient-to-r ${plan.gradientFrom} ${plan.gradientTo} hover:shadow-lg hover:shadow-${plan.gradientFrom.replace('from-', '')}/30`}
                >
                  {plan.id === 'pay-as-you-go' ? 'Acheter des tokens' : 'Souscrire maintenant'}
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10 text-gray-600 max-w-2xl mx-auto">
          <p className="text-sm">
            Tous les abonnements sont facturés en euros et se renouvellent automatiquement. 
            Vous pouvez annuler à tout moment depuis votre compte.
          </p>
        </div>
      </div>
    </section>
  );
} 