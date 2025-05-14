'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { Button } from '@/app/components/ui/button';

const plans = [
  {
    id: 'pay-as-you-go',
    name: 'À la carte',
    description: 'Achat ponctuel de tokens sans abonnement',
    price: 0,
    tokens: 0,
    billing: 'one-time',
    features: [
      'Achat ponctuel sans abonnement',
      'De 10 à 500 tokens disponibles',
      'Tokens valables 1 an',
      'Analyse Facebook Ads',
      'Rapports d\'analyse'
    ],
    gradientFrom: 'from-orange-400',
    gradientTo: 'to-orange-500',
    mostPopular: false
  },
  {
    id: 'lite',
    name: 'Lite',
    description: 'Parfait pour les petites entreprises',
    price: 19.90,
    tokens: 45,
    billing: 'monthly',
    features: [
      '45 tokens inclus (0,44€/token)',
      'Tokens supplémentaires : 0,75€ par token',
      'Analyse Facebook Ads',
      'Rapports d\'analyse'
    ],
    gradientFrom: 'from-orange-500',
    gradientTo: 'to-orange-600',
    mostPopular: false
  },
  {
    id: 'basic',
    name: 'Basic',
    description: 'Idéal pour les agences en croissance',
    price: 34.90,
    tokens: 100,
    billing: 'monthly',
    features: [
      '100 tokens inclus (0,35€/token)',
      'Tokens supplémentaires : 0,60€ par token',
      'Analyse Facebook Ads',
      'Rapports d\'analyse'
    ],
    gradientFrom: 'from-orange-600',
    gradientTo: 'to-yellow-600',
    mostPopular: false
  },
  {
    id: 'advanced',
    name: 'Advanced',
    description: 'Pour les professionnels confirmés',
    price: 49.90,
    tokens: 180,
    billing: 'monthly',
    features: [
      '180 tokens inclus (0,28€/token)',
      'Tokens supplémentaires : 0,45€ par token',
      'Analyse Facebook Ads',
      'Rapports d\'analyse'
    ],
    gradientFrom: 'from-yellow-500',
    gradientTo: 'to-orange-600',
    mostPopular: true
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Solution complète pour experts',
    price: 69.90,
    tokens: 300,
    billing: 'monthly',
    features: [
      '300 tokens inclus (0,23€/token)',
      'Tokens supplémentaires : 0,35€ par token',
      'Analyse Facebook Ads',
      'Rapports d\'analyse'
    ],
    gradientFrom: 'from-yellow-600',
    gradientTo: 'to-orange-500',
    mostPopular: false
  }
];

const tokenOptions = [
  { tokens: 10, price: 9 },
  { tokens: 20, price: 18 },
  { tokens: 50, price: 45 },
  { tokens: 100, price: 90 },
  { tokens: 200, price: 180 },
  { tokens: 300, price: 270 },
  { tokens: 500, price: 450 }
];

// Réductions pour les tokens supplémentaires selon le plan
const tokenDiscounts = {
  'lite': 0.17, // 0,75€ au lieu de 0,90€
  'basic': 0.33, // 0,60€ au lieu de 0,90€
  'advanced': 0.50, // 0,45€ au lieu de 0,90€
  'pro': 0.61 // 0,35€ au lieu de 0,90€
};

export default function Pricing() {
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });
  
  const [selectedTokens, setSelectedTokens] = useState(10);
  const [billingCycle, setBillingCycle] = useState<'biweekly' | 'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [currentIndex, setCurrentIndex] = useState(0); // Pay-as-you-go plan sélectionné par défaut
  const carouselRef = useRef<HTMLDivElement>(null);

  const calculatePrice = (basePrice: number) => {
    switch (billingCycle) {
      case 'biweekly':
        return basePrice * 0.6; // 60% du prix mensuel pour la période bi-hebdomadaire
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

  const getTokensForPlan = (planId: string, billing: string) => {
    switch (planId) {
      case 'lite':
        return billing === 'biweekly' ? 27 : 
               billing === 'monthly' ? 45 : 
               billing === 'quarterly' ? 121 : 432;
      case 'basic':
        return billing === 'biweekly' ? 60 : 
               billing === 'monthly' ? 100 : 
               billing === 'quarterly' ? 270 : 960;
      case 'advanced':
        return billing === 'biweekly' ? 108 : 
               billing === 'monthly' ? 180 : 
               billing === 'quarterly' ? 486 : 1728;
      case 'pro':
        return billing === 'biweekly' ? 180 : 
               billing === 'monthly' ? 300 : 
               billing === 'quarterly' ? 810 : 2880;
      default:
        return 0;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-orange-50"
    >
      {/* Effet de fond */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5"></div>
      
      {/* Éléments décoratifs */}
      <div className="absolute top-1/3 -left-32 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 -right-32 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl"></div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 border border-orange-500/30 rounded-full backdrop-blur-sm bg-white/60"
          >
            <span className="text-orange-700 text-sm font-medium">
              <span className="mr-2 inline-block w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              Tarification flexible
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500 leading-tight"
          >
            Des plans adaptés à vos besoins
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-xl text-gray-700 max-w-3xl mx-auto"
          >
            Choisissez le plan qui correspond le mieux à vos besoins. Tous nos plans incluent l'accès à notre plateforme d'analyse avancée.
          </motion.p>
        </div>
        
        {/* Sélecteur de cycle de facturation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex flex-wrap justify-center p-1 rounded-xl bg-white/90 backdrop-blur-sm border border-orange-200">
            <button
              onClick={() => setBillingCycle('biweekly')}
              className={`px-6 py-2 m-1 rounded-lg text-sm font-medium transition-colors ${
                billingCycle === 'biweekly'
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-700 hover:text-orange-700'
              }`}
            >
              Bi-hebdomadaire
            </button>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 m-1 rounded-lg text-sm font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-700 hover:text-orange-700'
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setBillingCycle('quarterly')}
              className={`px-6 py-2 m-1 rounded-lg text-sm font-medium transition-colors ${
                billingCycle === 'quarterly'
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-700 hover:text-orange-700'
              }`}
            >
              Trimestriel <span className="text-xs text-orange-500">-10%</span>
            </button>
              <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 m-1 rounded-lg text-sm font-medium transition-colors ${
                billingCycle === 'yearly'
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-700 hover:text-orange-700'
              }`}
            >
              Annuel <span className="text-xs text-orange-500">-20%</span>
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
                    : 'w-2 h-2 bg-gray-300'
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
                    plan.mostPopular
                      ? 'border-orange-500/50 bg-gradient-to-b from-orange-500/10 to-transparent'
                      : 'border-orange-200 bg-white/90'
                  }`}
                >
                  {plan.mostPopular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-600 to-yellow-600 text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
                      Plus populaire
                </div>
              )}
              
                  <div className="p-6 md:p-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-6 h-12">{plan.description}</p>
                    
                    <div className="flex items-baseline mb-8">
                      <span className="text-4xl font-bold text-gray-800">
                        {plan.id === 'pay-as-you-go' ? 'À partir de' : `${calculatePrice(plan.price).toFixed(2)}€`}
                      </span>
                      {plan.id !== 'pay-as-you-go' && (
                        <span className="text-gray-600 ml-2">
                          {billingCycle === 'biweekly' ? '/2 semaines' : 
                           billingCycle === 'monthly' ? '/mois' : 
                           billingCycle === 'quarterly' ? '/trimestre' : 
                           '/an'}
                        </span>
                      )}
                    </div>

                    {plan.id === 'pay-as-you-go' ? (
                      <div className="space-y-4 mb-8">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Tokens</span>
                          <select
                            value={selectedTokens}
                            onChange={(e) => setSelectedTokens(Number(e.target.value))}
                            className="bg-white border border-orange-200 rounded-lg px-3 py-1 text-gray-700"
                          >
                            {tokenOptions.map((option) => (
                              <option 
                                key={option.tokens} 
                                value={option.tokens} 
                                className="bg-white text-gray-700"
                              >
                                {option.tokens} tokens - {option.price}€
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="text-sm text-gray-600">
                          Prix unitaire : 0,90€ par token
                        </div>
                        <div className="text-xs text-orange-600">
                          Validité : 1 an
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4 mb-8">
                        <div className="text-sm text-gray-600 mb-4">
                          {getTokensForPlan(plan.id, billingCycle)} tokens inclus
                        </div>
                        
                        <div className="text-xs text-orange-600">
                          {plan.id === 'lite' && 'Tokens supplémentaires : 0,75€ par token'}
                          {plan.id === 'basic' && 'Tokens supplémentaires : 0,60€ par token'}
                          {plan.id === 'advanced' && 'Tokens supplémentaires : 0,45€ par token'}
                          {plan.id === 'pro' && 'Tokens supplémentaires : 0,35€ par token'}
                        </div>
                      </div>
                    )}

                    <ul className="space-y-4 mb-8 max-h-64 overflow-y-auto custom-scrollbar pr-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-gray-600">
                          <svg className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                
                    <Link 
                      href={plan.id === 'pay-as-you-go' 
                        ? `/pre-checkout?plan=${plan.id}&period=one-time&tokens=${selectedTokens}&tokenPrice=0.90` 
                        : `/pre-checkout?plan=${plan.id}&period=${
                            billingCycle === 'biweekly' ? 'bi-weekly' : 
                            billingCycle === 'yearly' ? 'annualy' : 
                            billingCycle
                          }`}
                      className={`w-full py-3 rounded-xl flex items-center justify-center font-semibold transition-all ${
                        plan.mostPopular
                        ? `bg-gradient-to-r ${plan.gradientFrom} ${plan.gradientTo} text-white shadow-lg shadow-orange-600/20 hover:shadow-xl hover:shadow-orange-600/30`
                        : 'bg-white text-orange-600 border border-orange-500 hover:bg-orange-50'
                      }`}
                    >
                      {plan.id === 'pay-as-you-go' ? 'Acheter des tokens' : 'Souscrire maintenant'}
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
              className={`p-3 rounded-full bg-white/10 backdrop-blur-sm border border-orange-200 text-orange-600 hover:bg-orange-50 transition-colors ${
                currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={currentIndex === 0}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
            
            <div className="text-gray-600 text-sm">
              {currentIndex + 1} / {plans.length}
            </div>
            
          <button 
              onClick={nextCard}
              className={`p-3 rounded-full bg-white/10 backdrop-blur-sm border border-orange-200 text-orange-600 hover:bg-orange-50 transition-colors ${
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

        {/* Section d'information sur les tokens */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="max-w-5xl mx-auto mt-16 bg-gradient-to-br from-white to-orange-50 rounded-2xl p-8 border border-orange-100 shadow-xl overflow-hidden relative"
        >
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-3/5">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-700 text-sm font-medium mb-4">
                <svg className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Comment fonctionnent les tokens</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Comprendre notre système de crédits</h3>
              <p className="text-gray-600 mb-6">
                Les tokens sont notre monnaie d'analyse - chaque génération d'analyse consomme un nombre prédéterminé de tokens, variable selon le type et la complexité de l'analyse demandée. Plus votre abonnement est élevé, moins vous payez par token. Le coût en token varie de 1 à 6 token
             </p>
              
              <div className="flex flex-wrap gap-3">
                <div className="text-center px-3 py-2 rounded-lg bg-white shadow-sm border border-orange-100">
                  <div className="text-gray-500 text-xs mb-1">Lite</div>
                  <div className="text-orange-600 font-bold">0,75€</div>
                </div>
                <div className="text-center px-3 py-2 rounded-lg bg-white shadow-sm border border-orange-100">
                  <div className="text-gray-500 text-xs mb-1">Basic</div>
                  <div className="text-orange-600 font-bold">0,60€</div>
                </div>
                <div className="text-center px-3 py-2 rounded-lg bg-white shadow-sm border border-orange-100">
                  <div className="text-gray-500 text-xs mb-1">Advanced</div>
                  <div className="text-orange-600 font-bold">0,45€</div>
                </div>
                <div className="text-center px-3 py-2 rounded-lg bg-white shadow-sm border border-orange-100">
                  <div className="text-gray-500 text-xs mb-1">Pro</div>
                  <div className="text-orange-600 font-bold">0,35€</div>
                </div>
              </div>
            </div>
            <div className="md:w-2/5 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-300/20 to-yellow-300/20 rounded-full blur-xl"></div>
                <div className="relative bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full h-32 w-32 flex items-center justify-center">
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
        </motion.div>

        {/* Notes de bas de page */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="max-w-3xl mx-auto mt-16 text-center"
        >
          <p className="text-gray-600 text-sm">
            * Les offres bi-hebdomadaires sont facturées tous les 15 jours. Les offres mensuelles sont facturées tous les 30 jours. 
            Les tokens inutilisés sont valables pendant un an. Des frais de paiement peuvent s'appliquer.
          </p>
        </motion.div>
      </div>
    </section>
  );
} 