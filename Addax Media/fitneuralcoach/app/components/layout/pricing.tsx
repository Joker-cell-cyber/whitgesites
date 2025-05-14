'use client';

import { useState, useRef, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";
import { tokenCheckoutLinks } from "@/app/config/checkout-links";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { ProductManager, BillingPeriod } from "@/lib/product-utils";

type TokenFeature = (tokens: number) => string;
type BillingFeature = (period: BillingPeriod) => string;
type Feature = string | TokenFeature | BillingFeature;

interface BasePlan {
  name: string;
  description: string;
  basePrice: number;
  cta: string;
  href: string;
  popular: boolean;
  gradient: string;
  hoverGradient: string;
}

interface TokenPlan extends BasePlan {
  pricePerToken: number;
  features: (string | TokenFeature)[];
}

interface SubscriptionPlan extends BasePlan {
  baseTokens: number;
  features: (string | BillingFeature)[];
}

type Plan = TokenPlan | SubscriptionPlan;

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');
  const [selectedTokens, setSelectedTokens] = useState(10);
  const [availableTokenOptions, setAvailableTokenOptions] = useState<number[]>([]);
  const pricingRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (pricingRef.current) {
      observer.observe(pricingRef.current);
    }
    
    // Récupérer les options de tokens disponibles à partir de tokenCheckoutLinks
    const tokenOptions = Object.keys(tokenCheckoutLinks).map(key => parseInt(key)).sort((a, b) => a - b);
    setAvailableTokenOptions(tokenOptions);
    
    // Définir la valeur par défaut sur la première option disponible
    if (tokenOptions.length > 0) {
      setSelectedTokens(tokenOptions[0]);
    }
    
    return () => {
      if (pricingRef.current) {
        observer.unobserve(pricingRef.current);
      }
    };
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
    // Prix de base : 9€ pour 10 tokens (0.90€ par token)
    return Math.ceil(tokens * 0.90);
  };
  
  // Fonction pour traduire le nom du plan en français pour l'affichage
  const getPlanDisplayName = (planName: string) => {
    // Retourner directement le nom du plan sans traduction
    return planName;
  };

  const plans: Plan[] = [
    {
      name: "À la carte",
      description: "Achetez des tokens une fois, utilisez-les quand vous voulez",
      basePrice: 0,
      pricePerToken: 0.90,
      features: [
        (tokens: number) => `${tokens} tokens disponibles immédiatement`,
        (tokens: number) => `${tokens} × 0.90€ = ${calculateTokenPrice(tokens)}€`,
        "Pas d'engagement",
        "Accès au coach IA",
        "Validité 1 an"
      ],
      cta: "Acheter",
      href: "/register",
      popular: false,
      gradient: "from-gray-700 to-gray-900",
      hoverGradient: "from-gray-600 to-gray-800"
    } as TokenPlan,
    {
      name: "lite",
      description: "Idéal pour un usage occasionnel",
      basePrice: 19.90,
      baseTokens: 45,
      features: [
        (period: BillingPeriod) => `${getTokensForPeriod(45, period)} tokens ${period === 'biweekly' ? 'toutes les 2 semaines' : period === 'monthly' ? 'par mois' : period === 'quarterly' ? 'par trimestre' : 'par an'}`,
        (period: BillingPeriod) => `${(19.90 / 45).toFixed(2)}€ par token`,
        "Accès au coach IA",
        "Tokens supplémentaires à 0.75€"
      ],
      cta: "Je m'abonne",
      href: "/register?plan=lite",
      popular: false,
      gradient: "from-blue-600 to-cyan-600",
      hoverGradient: "from-blue-500 to-cyan-500"
    } as SubscriptionPlan,
    {
      name: "basic",
      description: "Pour une utilisation régulière",
      basePrice: 34.90,
      baseTokens: 100,
      features: [
        (period: BillingPeriod) => `${getTokensForPeriod(100, period)} tokens ${period === 'biweekly' ? 'toutes les 2 semaines' : period === 'monthly' ? 'par mois' : period === 'quarterly' ? 'par trimestre' : 'par an'}`,
        (period: BillingPeriod) => `${(34.90 / 100).toFixed(2)}€ par token`,
        "Accès au coach IA",
        "Tokens supplémentaires à 0.60€"
      ],
      cta: "Je m'abonne",
      href: "/register?plan=basic",
      popular: true,
      gradient: "from-violet-600 to-purple-600",
      hoverGradient: "from-violet-500 to-purple-500"
    },
    {
      name: "advanced",
      description: "Pour une utilisation intensive",
      basePrice: 49.90,
      baseTokens: 180,
      features: [
        (period: BillingPeriod) => `${getTokensForPeriod(180, period)} tokens ${period === 'biweekly' ? 'toutes les 2 semaines' : period === 'monthly' ? 'par mois' : period === 'quarterly' ? 'par trimestre' : 'par an'}`,
        (period: BillingPeriod) => `${(49.90 / 180).toFixed(2)}€ par token`,
        "Accès au coach IA",
        "Tokens supplémentaires à 0.45€"
      ],
      cta: "Je m'abonne",
      href: "/register?plan=advanced",
      popular: false,
      gradient: "from-purple-600 to-pink-600",
      hoverGradient: "from-purple-500 to-pink-500"
    },
    {
      name: "pro",
      description: "Pour une utilisation professionnelle",
      basePrice: 69.90,
      baseTokens: 300,
      features: [
        (period: BillingPeriod) => `${getTokensForPeriod(300, period)} tokens ${period === 'biweekly' ? 'toutes les 2 semaines' : period === 'monthly' ? 'par mois' : period === 'quarterly' ? 'par trimestre' : 'par an'}`,
        (period: BillingPeriod) => `${(69.90 / 300).toFixed(2)}€ par token`,
        "Accès au coach IA",
        "Tokens supplémentaires à 0.35€"
      ],
      cta: "Je m'abonne",
      href: "/register?plan=pro",
      popular: false,
      gradient: "from-pink-600 to-rose-600",
      hoverGradient: "from-pink-500 to-rose-500"
    }
  ];

  const billingOptions = [
    { id: 'biweekly', label: 'Bi-hebdo' },
    { id: 'monthly', label: 'Mensuel' },
    { id: 'quarterly', label: 'Trimestriel' },
    { id: 'annual', label: 'Annuel' }
  ];

  const renderTokenPlanCTA = (plan: TokenPlan) => {
    return (
      <Link
        href={`/pre-checkout?plan=à la carte&period=one-time&tokens=${selectedTokens}&price=${calculateTokenPrice(selectedTokens)}&source=tokens`}
        className={`inline-flex justify-center items-center w-full px-5 py-3 text-sm font-medium rounded-lg transition-all shadow-md bg-gradient-to-r ${plan.gradient} hover:${plan.hoverGradient} text-white`}
      >
        {plan.cta} {calculateTokenPrice(selectedTokens)}€
      </Link>
    );
  };

  const renderSubscriptionPlanCTA = (plan: SubscriptionPlan) => {
    const price = parseFloat(getTotalPrice(plan.basePrice));
    const tokens = getTokensForPeriod(plan.baseTokens, billingPeriod);
    const additionalTokenPrice = plan.name === "lite" ? 0.75 : 
                                plan.name === "basic" ? 0.60 : 
                                plan.name === "advanced" ? 0.45 : 0.35;
    
    return (
      <Link
        href={`/pre-checkout?plan=${plan.name}&period=${billingPeriod}&price=${price}&tokens=${tokens}&tokenPrice=${additionalTokenPrice}`}
        className={`inline-flex justify-center items-center w-full px-5 py-3 text-sm font-medium rounded-lg transition-all shadow-md bg-gradient-to-r ${plan.gradient} hover:${plan.hoverGradient} text-white`}
      >
        {plan.cta} {getTotalPrice(plan.basePrice)}€
      </Link>
    );
  };

  return (
    <section id="pricing" className="py-20 bg-white relative" ref={pricingRef}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-orange-50 border border-orange-100 mb-4">
            <span className="text-orange-600 text-sm font-medium">
              Tarification adaptée à vos besoins
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choisissez la formule qui vous convient
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Des offres flexibles pour tous les objectifs et tous les budgets
          </p>
          
          {/* Plan de facturation */}
          <div className="max-w-sm mx-auto bg-gray-50 p-1 rounded-lg border border-gray-200 inline-flex mb-12">
            {(['biweekly', 'monthly', 'quarterly', 'annual'] as BillingPeriod[]).map((period) => (
              <button
                key={period}
                className={`px-4 py-2 rounded-md flex-1 text-sm font-medium transition-all duration-200 ${
                  billingPeriod === period
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setBillingPeriod(period)}
              >
                {period === 'biweekly' 
                  ? '2 semaines'
                  : period === 'monthly' 
                    ? 'Mensuel'
                    : period === 'quarterly'
                      ? 'Trimestriel'
                      : 'Annuel'}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {plans.map((plan) => {
            const isTokenPlan = 'pricePerToken' in plan;
            const displayName = plan.name === "À la carte" ? plan.name : getPlanDisplayName(plan.name);
            
            return (
              <div 
                key={plan.name}
                className={`relative rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                  plan.popular ? 'ring-2 ring-violet-500 shadow-lg' : 'ring-1 ring-gray-200 shadow'
                } bg-white`}
              >
                {/* Badge "populaire" */}
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-violet-600 to-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                    Populaire
                  </div>
                )}
                
                {/* En-tête du plan */}
                <div className={`h-2 w-full bg-gradient-to-r ${plan.gradient}`} />
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{displayName}</h3>
                  <p className="text-sm text-gray-500 mb-4">{plan.description}</p>
                  
                  {/* Prix */}
                  <div className="mb-6">
                    {isTokenPlan ? (
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-gray-900">{calculateTokenPrice(selectedTokens)}€</span>
                        <span className="text-gray-500 ml-1">paiement unique</span>
                      </div>
                    ) : (
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-gray-900">{getTotalPrice(plan.basePrice)}€</span>
                        <span className="text-gray-500 ml-1">{getPeriodLabel(billingPeriod)}</span>
                      </div>
                    )}
                    
                    {/* Économies (pour les plans d'abonnement) */}
                    {!isTokenPlan && (billingPeriod === 'quarterly' || billingPeriod === 'annual') && (
                      <p className="text-sm text-green-600 mt-1">
                        <span className="font-semibold">{getSavingsPercentage(billingPeriod)}% d'économie</span> vs mensuel
                      </p>
                    )}
                  </div>
                  
                  {/* Sélecteur de tokens (pour le plan à la carte) */}
                  {isTokenPlan && (
                    <div className="mb-6">
                      <label htmlFor="tokenAmount" className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre de tokens
                      </label>
                      <Select
                        value={selectedTokens.toString()}
                        onValueChange={(value) => setSelectedTokens(parseInt(value))}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableTokenOptions.map((option) => (
                            <SelectItem key={option} value={option.toString()}>
                              {option} tokens
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  {/* Caractéristiques */}
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => {
                      let featureText: string;
                      
                      if (typeof feature === 'function') {
                        if (isTokenPlan) {
                          featureText = (feature as TokenFeature)(selectedTokens);
                        } else {
                          featureText = (feature as BillingFeature)(billingPeriod);
                        }
                      } else {
                        featureText = feature as string;
                      }
                      
                      return (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 shrink-0 mr-2" />
                          <span className="text-sm text-gray-600">{featureText}</span>
                        </li>
                      );
                    })}
                  </ul>
                  
                  {/* Appel à l'action */}
                  {isTokenPlan 
                    ? renderTokenPlanCTA(plan as TokenPlan)
                    : renderSubscriptionPlanCTA(plan as SubscriptionPlan)
                  }
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Section d'information sur les tokens */}
      <div className="container mx-auto px-4 sm:px-6 mt-16">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-white to-violet-50 rounded-2xl p-8 border border-violet-100 shadow-xl overflow-hidden relative">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-3/5">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 text-sm font-medium mb-4">
                <svg className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Comment fonctionnent les tokens</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Comprendre notre système de crédits</h3>
              <p className="text-gray-600 mb-6">
                Les tokens sont notre monnaie de génération - chaque création d'un programme d'entraînement ou d'un plan nutritionnel consomme un certain nombre de tokens, variable selon la complexité et la personnalisation demandée. Plus votre abonnement est élevé, moins vous payez par token. Un message au coach coûte 1 token et la création d'un programme d'entraînement ou d'un plan nutritionnel coûte environ 3 tokens.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <div className="text-center px-3 py-2 rounded-lg bg-white shadow-sm border border-violet-100">
                  <div className="text-gray-500 text-xs mb-1">Lite</div>
                  <div className="text-violet-600 font-bold">0,75€</div>
                </div>
                <div className="text-center px-3 py-2 rounded-lg bg-white shadow-sm border border-violet-100">
                  <div className="text-gray-500 text-xs mb-1">Basic</div>
                  <div className="text-violet-600 font-bold">0,60€</div>
                </div>
                <div className="text-center px-3 py-2 rounded-lg bg-white shadow-sm border border-violet-100">
                  <div className="text-gray-500 text-xs mb-1">Advanced</div>
                  <div className="text-violet-600 font-bold">0,45€</div>
                </div>
                <div className="text-center px-3 py-2 rounded-lg bg-white shadow-sm border border-violet-100">
                  <div className="text-gray-500 text-xs mb-1">Pro</div>
                  <div className="text-violet-600 font-bold">0,35€</div>
                </div>
              </div>
            </div>
            <div className="md:w-2/5 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-300/20 to-purple-300/20 rounded-full blur-xl"></div>
                <div className="relative bg-gradient-to-r from-violet-500 to-purple-500 rounded-full h-32 w-32 flex items-center justify-center">
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
    </section>
  );
} 