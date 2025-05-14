'use client';

import { useState, useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Check, Zap, CreditCard, Calendar, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";

type BillingPeriod = 'biweekly' | 'monthly' | 'quarterly' | 'annual';
type TokenFeature = (tokens: number) => string;
type BillingFeature = (period: BillingPeriod) => string;

interface BasePlan {
  id: string;
  name: string;
  description: string;
  cta: string;
  popular: boolean;
  color: string;
  features: any[];
  icon: React.ReactNode;
}

interface TokenPlan extends BasePlan {
  pricePerToken: number;
}

interface SubscriptionPlan extends BasePlan {
  basePrice: number;
  baseTokens: number;
  bonusFeatures?: string[];
}

type Plan = TokenPlan | SubscriptionPlan;

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');
  const [selectedTokens, setSelectedTokens] = useState<number>(50);
  const [showFeatures, setShowFeatures] = useState<Record<string, boolean>>({});
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const toggleFeatures = (planId: string) => {
    setShowFeatures(prev => ({
      ...prev,
      [planId]: !prev[planId]
    }));
  };

  const getPriceMultiplier = (period: BillingPeriod) => {
    switch (period) {
      case 'biweekly': return 0.6;
      case 'monthly': return 1;
      case 'quarterly': return 2.7; // 10% de réduction
      case 'annual': return 9.6; // 20% de réduction
      default: return 1;
    }
  };

  const getTokensForPeriod = (baseTokens: number, period: BillingPeriod) => {
    const multiplier = getPriceMultiplier(period);
    return Math.floor(baseTokens * multiplier);
  };

  const getTotalPrice = (basePrice: number) => {
    const multiplier = getPriceMultiplier(billingPeriod);
    const totalPrice = basePrice * multiplier;
    return totalPrice.toFixed(2);
  };

  const getPeriodLabel = (period: BillingPeriod) => {
    switch (period) {
      case 'biweekly': return '/ 2 semaines';
      case 'monthly': return '/ mois';
      case 'quarterly': return '/ trimestre';
      case 'annual': return '/ an';
      default: return '';
    }
  };

  const getSavingsPercentage = (period: BillingPeriod) => {
    switch (period) {
      case 'quarterly': return 10;
      case 'annual': return 20;
      default: return 0;
    }
  };

  const calculateTokenPrice = (tokens: number) => {
    return (tokens * 0.90).toFixed(2);
  };

  const plans: Plan[] = [
    {
      id: "tokens",
      name: "À la carte",
      description: "Achetez des tokens une fois, utilisez-les quand vous voulez",
      pricePerToken: 0.90,
      cta: "Acheter des tokens",
      popular: false,
      color: "slate",
      icon: <CreditCard className="w-6 h-6" />,
      features: [
        (tokens: number) => `${tokens} tokens disponibles immédiatement`,
        (tokens: number) => `${tokens} × 0.90€ = ${calculateTokenPrice(tokens)}€`,
        "Pas d'engagement",
        "Accès au coach IA",
        "Validité 1 an"
      ]
    } as TokenPlan,
    {
      id: "lite",
      name: "Lite",
      description: "Pour un usage occasionnel",
      basePrice: 19.90,
      baseTokens: 45,
      cta: "S'abonner",
      popular: false,
      color: "blue",
      icon: <Calendar className="w-6 h-6" />,
      features: [
        (period: BillingPeriod) => `${getTokensForPeriod(45, period)} tokens ${period === 'biweekly' ? 'toutes les 2 semaines' : period === 'monthly' ? 'par mois' : period === 'quarterly' ? 'par trimestre' : 'par an'}`,
        (period: BillingPeriod) => `${(19.90 / 45).toFixed(2)}€ par token`,
        "Accès au coach IA",
        "Tokens supplémentaires à 0.75€"
      ]
    },
    {
      id: "basic",
      name: "Basic",
      description: "Pour une utilisation régulière",
      basePrice: 34.90,
      baseTokens: 100,
      cta: "S'abonner",
      popular: true,
      color: "blue",
      icon: <Calendar className="w-6 h-6" />,
      features: [
        (period: BillingPeriod) => `${getTokensForPeriod(100, period)} tokens ${period === 'biweekly' ? 'toutes les 2 semaines' : period === 'monthly' ? 'par mois' : period === 'quarterly' ? 'par trimestre' : 'par an'}`,
        (period: BillingPeriod) => `${(34.90 / 100).toFixed(2)}€ par token`,
        "Accès au coach IA",
        "Tokens supplémentaires à 0.60€"
      ],
      bonusFeatures: [
        "Programme personnalisé",
        "Suivi de progression"
      ]
    },
    {
      id: "advanced",
      name: "Advanced",
      description: "Pour une utilisation intensive",
      basePrice: 49.90,
      baseTokens: 180,
      cta: "S'abonner",
      popular: false,
      color: "purple",
      icon: <Calendar className="w-6 h-6" />,
      features: [
        (period: BillingPeriod) => `${getTokensForPeriod(180, period)} tokens ${period === 'biweekly' ? 'toutes les 2 semaines' : period === 'monthly' ? 'par mois' : period === 'quarterly' ? 'par trimestre' : 'par an'}`,
        (period: BillingPeriod) => `${(49.90 / 180).toFixed(2)}€ par token`,
        "Accès au coach IA",
        "Tokens supplémentaires à 0.45€",
      ]
    },
    {
      id: "pro",
      name: "Pro",
      description: "Pour une utilisation professionnelle",
      basePrice: 69.90,
      baseTokens: 300,
      cta: "S'abonner",
      popular: false,
      color: "purple",
      icon: <Calendar className="w-6 h-6" />,
      features: [
        (period: BillingPeriod) => `${getTokensForPeriod(300, period)} tokens ${period === 'biweekly' ? 'toutes les 2 semaines' : period === 'monthly' ? 'par mois' : period === 'quarterly' ? 'par trimestre' : 'par an'}`,
        (period: BillingPeriod) => `${(69.90 / 300).toFixed(2)}€ par token`,
        "Accès au coach IA",
        "Tokens supplémentaires à 0.35€",
      ]
    } as SubscriptionPlan
  ];

  // Function to generate pre-checkout link
  const getPreCheckoutLink = (plan: Plan, tokens?: number) => {
    if ('pricePerToken' in plan) {
      // Token plan (Pay-as-you-go)
      return `/pre-checkout?plan=${plan.id}&period=one-time&tokens=${selectedTokens}&tokenPrice=0.90`;
    } else {
      // Subscription plan
      const subscriptionPlan = plan as SubscriptionPlan;
      let periodParam = billingPeriod;
      
      // Convert period to format expected by pre-checkout but keep the type compatibility
      let queryParam: string;
      if (periodParam === 'biweekly') {
        queryParam = 'bi-weekly';
      } else if (periodParam === 'annual') {
        queryParam = 'annualy';
      } else {
        queryParam = periodParam;
      }
      
      return `/pre-checkout?plan=${plan.id}&period=${queryParam}`;
    }
  };

  return (
    <section 
      id="pricing" 
      ref={ref}
      className="py-24 relative overflow-hidden bg-gradient-to-b from-fs-slate-900 to-fs-slate-800"
    >
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 fs-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fs-teal-500/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fs-teal-500/30 to-transparent"></div>
      
      {/* Cercles lumineux */}
      <div className="absolute top-1/4 -right-48 w-96 h-96 rounded-full bg-fs-blue-600/5 blur-3xl"></div>
      <div className="absolute bottom-1/3 -left-24 w-72 h-72 rounded-full bg-fs-teal-600/5 blur-3xl"></div>
      
      <div className="container px-6 mx-auto relative z-10">
        {/* En-tête de section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div 
            className="inline-flex items-center px-4 py-2 rounded-full bg-fs-teal-900/60 border border-fs-teal-500/30 backdrop-blur-sm mb-6"
            style={{ 
              opacity: inView ? 1 : 0, 
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease'
            }}
          >
            <Zap className="w-4 h-4 mr-2 text-fs-teal-400" />
            <span className="text-fs-teal-100 text-sm">Plans Flexibles</span>
          </div>
          
          <h2 
            className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight"
            style={{ 
              opacity: inView ? 1 : 0, 
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
              transitionDelay: '0.1s'
            }}
          >
            Choisissez le plan <span className="fs-gradient-text bg-gradient-to-r from-fs-teal-400 to-fs-blue-400 text-transparent bg-clip-text">parfait</span> pour votre transformation
          </h2>
          
          <p 
            className="text-lg text-fs-slate-300"
            style={{ 
              opacity: inView ? 1 : 0, 
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
              transitionDelay: '0.2s'
            }}
          >
            Des formules adaptées à tous les objectifs et niveaux d'expérience, avec des tokens mensuels pour utiliser nos services d'IA.
          </p>
        </div>
        
        {/* Bloc explicatif sur le système de tokens */}
        <div 
          className="max-w-3xl mx-auto mb-12 p-6 rounded-xl bg-fs-slate-800/70 border border-fs-teal-500/20 backdrop-blur-sm"
          style={{ 
            opacity: inView ? 1 : 0, 
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            transitionDelay: '0.25s'
          }}
        >
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-fs-teal-400" />
            Comment fonctionnent les tokens ?
          </h3>
          <p className="text-fs-slate-300 mb-4">
            Les tokens sont notre monnaie virtuelle permettant d'accéder aux différentes fonctionnalités de FitSage AI. Chaque action consomme un nombre spécifique de tokens :
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-fs-teal-500/20 flex items-center justify-center text-fs-teal-400 mr-3">
                1
              </div>
              <div>
                <p className="font-medium text-white">Message au coach IA</p>
                <p className="text-sm text-fs-slate-400">1 token par message</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-fs-teal-500/20 flex items-center justify-center text-fs-teal-400 mr-3">
                3
              </div>
              <div>
                <p className="font-medium text-white">Génération de programme</p>
                <p className="text-sm text-fs-slate-400">3 tokens par plan généré</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sélecteur de période de facturation */}
        <div 
          className="flex justify-center mb-16"
          style={{ 
            opacity: inView ? 1 : 0, 
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            transitionDelay: '0.3s'
          }}
        >
          <div className="inline-flex p-1.5 rounded-xl bg-fs-slate-800/50 border border-fs-slate-700/50 backdrop-blur-sm">
            {[
              { id: 'biweekly', label: 'Bi-hebdo', icon: <CreditCard className="w-4 h-4 mr-2" /> },
              { id: 'monthly', label: 'Mensuel', icon: <CreditCard className="w-4 h-4 mr-2" /> },
              { id: 'quarterly', label: 'Trimestriel', icon: <Calendar className="w-4 h-4 mr-2" /> },
              { id: 'annual', label: 'Annuel', icon: <Zap className="w-4 h-4 mr-2" /> }
            ].map((period) => (
              <button 
                key={period.id}
                onClick={() => setBillingPeriod(period.id as BillingPeriod)}
                className={`relative px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  billingPeriod === period.id
                    ? 'text-white bg-gradient-to-r from-fs-blue-500 to-fs-teal-500 shadow-lg shadow-fs-teal-500/20'
                    : 'text-fs-slate-300 hover:text-white'
                }`}
              >
                <div className="flex items-center">
                  {period.icon}
                  <span>{period.label}</span>
                </div>
                
                {/* Badge économies */}
                {(period.id === 'quarterly' || period.id === 'annual') && (
                  <div className="absolute -top-3 -right-2 px-2 py-0.5 text-xs font-bold rounded-full bg-fs-teal-500 text-white">
                    -{getSavingsPercentage(period.id as BillingPeriod)}%
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Plans d'abonnement avec carrousel horizontal */}
        <div 
          className="flex flex-nowrap gap-6 overflow-x-auto pb-6 px-4 -mx-4 scrollbar-hide mb-16"
          style={{ 
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            transitionDelay: '0.4s'
          }}
        >
          {plans.map((plan, index) => (
            <div 
              key={plan.id}
              className={`relative rounded-2xl border flex-shrink-0 min-w-[280px] max-w-[320px] ${
                plan.popular 
                  ? 'border-fs-teal-500/50 bg-gradient-to-b from-fs-slate-800/90 to-fs-slate-900/90' 
                  : 'border-fs-slate-700/40 bg-fs-slate-800/30'
              } backdrop-blur-sm overflow-hidden transition-transform duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-fs-${plan.color}-500/10`}
              style={{ 
                transitionDelay: `${0.1 * (index + 1)}s`
              }}
            >
              {/* Badge populaire */}
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="relative">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-fs-teal-500 transform rotate-45 translate-x-8 -translate-y-8"></div>
                    <div className="absolute top-[22px] right-[2px] text-xs font-semibold text-white transform rotate-45">Populaire</div>
                  </div>
                </div>
              )}
              
              {/* En-tête du plan */}
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-fs-${plan.color}-900/40 border border-fs-${plan.color}-500/30`}>
                    <div className={`text-fs-${plan.color}-400`}>
                      {plan.icon}
                    </div>
                  </div>
                  <div className={`text-xs font-semibold px-3 py-1 rounded-full bg-fs-${plan.color}-900/30 border border-fs-${plan.color}-500/30 text-fs-${plan.color}-400`}>
                    {plan.name}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-fs-slate-400 mb-6">{plan.description}</p>
                
                {/* Contenu dynamique selon le type de plan */}
                {'pricePerToken' in plan ? (
                  <div className="mb-6">
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-fs-slate-300 font-medium mb-2 block">Nombre de tokens :</label>
                        <select 
                          value={selectedTokens}
                          onChange={(e) => setSelectedTokens(parseInt(e.target.value))}
                          className="w-full bg-fs-slate-900/70 border border-fs-slate-700/50 rounded-lg p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-fs-teal-500"
                        >
                          {[10, 20, 50, 100, 200, 500].map((option) => (
                            <option key={option} value={option} className="bg-fs-slate-900">
                              {option} tokens
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold text-white">{calculateTokenPrice(selectedTokens)}€</span>
                        <span className="ml-2 text-fs-slate-400">/ une fois</span>
                      </div>
                      <p className="text-sm text-fs-slate-300 font-medium">
                        ~{Math.floor(selectedTokens / 10)} discussions avec le coach
                      </p>
                    </div>
                  </div>
                ) : (
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold text-white">{getTotalPrice(plan.basePrice)}€</span>
                  <span className="ml-2 text-fs-slate-400">{getPeriodLabel(billingPeriod)}</span>
                    {(billingPeriod === 'quarterly' || billingPeriod === 'annual') && (
                      <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-fs-teal-900/50 text-fs-teal-300">
                        -{getSavingsPercentage(billingPeriod)}%
                      </span>
                    )}
                  </div>
                )}
                
                <div className="mt-auto">
                  <Link 
                    href={getPreCheckoutLink(plan)}
                    className="flex items-center justify-center w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 text-white bg-gradient-to-r from-fs-teal-500 to-fs-blue-500 hover:from-fs-teal-600 hover:to-fs-blue-600 focus:outline-none focus:ring-2 focus:ring-fs-blue-400 focus:ring-offset-2 focus:ring-offset-fs-blue-50"
                  >
                    {'pricePerToken' in plan ? 'Acheter des tokens' : 'Souscrire maintenant'}
                  </Link>
                </div>
              </div>
              
              {/* Fonctionnalités */}
              <div className="px-8 pb-8">
                <div className="pt-6 border-t border-fs-slate-700/40">
                  <div className="flex items-center mb-4">
                    <span className="text-white font-medium">Fonctionnalités incluses</span>
                    {'baseTokens' in plan && (
                    <span className={`ml-2 text-sm px-2 py-0.5 rounded-full bg-fs-${plan.color}-900/30 text-fs-${plan.color}-400`}>
                      {getTokensForPeriod(plan.baseTokens, billingPeriod)} tokens
                    </span>
                    )}
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className={`w-5 h-5 text-fs-${plan.color}-500 mr-3 flex-shrink-0 mt-0.5`} />
                        <span className="text-fs-slate-300 text-sm">
                          {typeof feature === 'function'
                            ? 'pricePerToken' in plan
                              ? (feature as TokenFeature)(selectedTokens)
                              : (feature as BillingFeature)(billingPeriod)
                            : feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  {'bonusFeatures' in plan && plan.bonusFeatures && (
                    <div>
                      <button
                        onClick={() => toggleFeatures(plan.id)}
                        className="flex items-center text-sm text-fs-slate-400 hover:text-fs-slate-300 mb-3"
                      >
                        {showFeatures[plan.id] ? (
                          <>
                            <ChevronUp className="w-4 h-4 mr-1.5" />
                            <span>Masquer les fonctionnalités communes</span>
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4 mr-1.5" />
                            <span>Voir toutes les fonctionnalités</span>
                          </>
                        )}
                      </button>
                      
                      {showFeatures[plan.id] && (
                        <ul className="space-y-3 mt-3 pt-3 border-t border-fs-slate-700/40">
                          {plan.bonusFeatures.map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <Check className="w-5 h-5 text-fs-slate-500 mr-3 flex-shrink-0 mt-0.5" />
                              <span className="text-fs-slate-400 text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Contrôles de navigation du carrousel */}
        <div className="flex justify-center mb-10 gap-4">
          <button 
            className="p-2 rounded-full bg-fs-slate-800/50 border border-fs-slate-700/50 hover:bg-fs-slate-700/50 transition-colors"
            onClick={() => {
              const container = document.querySelector('.overflow-x-auto');
              if (container) {
                container.scrollBy({ left: -300, behavior: 'smooth' });
              }
            }}
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            className="p-2 rounded-full bg-fs-slate-800/50 border border-fs-slate-700/50 hover:bg-fs-slate-700/50 transition-colors"
            onClick={() => {
              const container = document.querySelector('.overflow-x-auto');
              if (container) {
                container.scrollBy({ left: 300, behavior: 'smooth' });
              }
            }}
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
        
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