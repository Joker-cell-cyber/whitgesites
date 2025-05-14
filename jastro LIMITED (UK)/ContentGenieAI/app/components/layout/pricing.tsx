'use client';

import { useState, useRef, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";
import { tokenCheckoutLinks } from "@/app/config/checkout-links";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";

type BillingPeriod = 'biweekly' | 'monthly' | 'quarterly' | 'annual';
type TokenFeature = (tokens: number) => string;
type BillingFeature = (period: BillingPeriod) => string;
type Feature = string | TokenFeature | BillingFeature;

interface BasePlan {
  name: string;
  id?: string;
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

  const plans: Plan[] = [
    {
      name: "À la carte",
      id: "pay-as-you-go",
      description: "Achetez des tokens une fois, utilisez-les quand vous voulez",
      basePrice: 0,
      pricePerToken: 0.90,
      features: [
        (tokens: number) => `${tokens} tokens disponibles immédiatement`,
        (tokens: number) => `~${Math.floor(tokens / 3)} articles générés`,
        "1 langue",
        "0.90€ par token",
        "Validité 1 an"
      ],
      cta: "Acheter",
      href: "/register",
      popular: false,
      gradient: "from-gray-700 to-gray-900",
      hoverGradient: "from-gray-600 to-gray-800"
    } as TokenPlan,
    {
      name: "Lite",
      id: "lite",
      description: "Idéal pour débuter avec un budget maîtrisé",
      basePrice: 19.90,
      baseTokens: 45,
      features: [
        (period: BillingPeriod) => `${getTokensForPeriod(45, period)} tokens ${period === 'biweekly' ? 'toutes les 2 semaines' : period === 'monthly' ? 'par mois' : period === 'quarterly' ? 'par trimestre' : 'par an'}`,
        (period: BillingPeriod) => `~${Math.floor(getTokensForPeriod(45, period) / 3)} articles ${period === 'biweekly' ? 'toutes les 2 semaines' : period === 'monthly' ? 'par mois' : period === 'quarterly' ? 'par trimestre' : 'par an'}`,
        "2 langues",
        "Générateur d'articles de blog",
        "Tokens supplémentaires à 0.75€"
      ],
      cta: "Je m'abonne",
      href: "/register?plan=lite",
      popular: false,
      gradient: "from-blue-600 to-cyan-600",
      hoverGradient: "from-blue-500 to-cyan-500"
    } as SubscriptionPlan,
    {
      name: "Basic",
      id: "basic",
      description: "Pour une production régulière de contenu",
      basePrice: 34.90,
      baseTokens: 100,
      features: [
        (period: BillingPeriod) => `${getTokensForPeriod(100, period)} tokens ${period === 'biweekly' ? 'toutes les 2 semaines' : period === 'monthly' ? 'par mois' : period === 'quarterly' ? 'par trimestre' : 'par an'}`,
        (period: BillingPeriod) => `~${Math.floor(getTokensForPeriod(100, period) / 3)} articles ${period === 'biweekly' ? 'toutes les 2 semaines' : period === 'monthly' ? 'par mois' : period === 'quarterly' ? 'par trimestre' : 'par an'}`,
        "5 langues",
        "Générateur d'articles de blog",
        "Générateur de descriptions produits",
        "Tokens supplémentaires à 0.60€"
      ],
      cta: "Je m'abonne",
      href: "/register?plan=basic",
      popular: true,
      gradient: "from-violet-600 to-purple-600",
      hoverGradient: "from-violet-500 to-purple-500"
    },
    {
      name: "Advanced",
      id: "advanced",
      description: "Solution complète pour les équipes",
      basePrice: 49.90,
      baseTokens: 180,
      features: [
        (period: BillingPeriod) => `${getTokensForPeriod(180, period)} tokens ${period === 'biweekly' ? 'toutes les 2 semaines' : period === 'monthly' ? 'par mois' : period === 'quarterly' ? 'par trimestre' : 'par an'}`,
        (period: BillingPeriod) => `~${Math.floor(getTokensForPeriod(180, period) / 3)} articles ${period === 'biweekly' ? 'toutes les 2 semaines' : period === 'monthly' ? 'par mois' : period === 'quarterly' ? 'par trimestre' : 'par an'}`,
        "Toutes les langues",
        "Générateur d'articles de blog",
        "Générateur de descriptions produits",
        "Tokens supplémentaires à 0.45€"
      ],
      cta: "Je m'abonne",
      href: "/register?plan=advanced",
      popular: false,
      gradient: "from-purple-600 to-pink-600",
      hoverGradient: "from-purple-500 to-pink-500"
    },
    {
      name: "Pro",
      id: "pro",
      description: "Puissance maximale pour les grandes entreprises",
      basePrice: 69.90,
      baseTokens: 300,
      features: [
        (period: BillingPeriod) => `${getTokensForPeriod(300, period)} tokens ${period === 'biweekly' ? 'toutes les 2 semaines' : period === 'monthly' ? 'par mois' : period === 'quarterly' ? 'par trimestre' : 'par an'}`,
        (period: BillingPeriod) => `~${Math.floor(getTokensForPeriod(300, period) / 3)} articles ${period === 'biweekly' ? 'toutes les 2 semaines' : period === 'monthly' ? 'par mois' : period === 'quarterly' ? 'par trimestre' : 'par an'}`,
        "Toutes les langues",
        "Générateur d'articles de blog",
        "Générateur de descriptions produits",
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

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-gradient-to-br from-[#EBF6FA] to-white relative overflow-hidden" ref={pricingRef}>
      {/* Background elements */}
      <div className="absolute inset-0 onc-water-pattern opacity-20"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1A7BA4] to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1A7BA4] to-transparent"></div>
      
      {/* Éléments décoratifs */}
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-[#BBE5EF]/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-[#D3E9DD]/30 rounded-full blur-3xl"></div>
      
      <div className="container relative z-10 px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16 space-y-4">
          <div className="inline-block px-4 sm:px-6 py-2 border border-[#1A7BA4]/30 rounded-full bg-[#BBE5EF]/20 text-[#14304D] text-sm font-medium mb-4">
            <span className="mr-2 inline-block w-2 h-2 rounded-full bg-[#1A7BA4]"></span>
            Tarification simple
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#14304D] onc-heading">
            Choisissez votre <span className="onc-heading-underline">plan</span>
          </h2>
          <p className="max-w-2xl mx-auto text-[#66768B]">
            Des options flexibles pour tous les besoins. Démarrez gratuitement, puis choisissez le forfait qui correspond à vos besoins.
          </p>
          
          {/* Sélecteur de période de facturation */}
          <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
            {billingOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setBillingPeriod(option.id as BillingPeriod)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  billingPeriod === option.id
                    ? 'bg-[#1A7BA4] text-white'
                    : 'bg-[#E3F4F9] text-[#14304D] hover:bg-[#D5EDF5]'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          {plans.map((plan) => (
            <div 
              key={plan.name} 
              className={`relative px-6 pt-6 pb-8 bg-gradient-to-br ${plan.gradient} hover:${plan.hoverGradient} transition-all duration-300 rounded-xl shadow-lg transform hover:scale-105 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ 
                animationDelay: `${plans.indexOf(plan) * 150}ms`,
                boxShadow: plan.popular ? '0 8px 40px rgba(0, 0, 0, 0.12)' : '0 4px 20px rgba(0, 0, 0, 0.08)' 
              }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-amber-400 to-amber-500 text-white text-sm font-medium rounded-full">
                  Le plus populaire
                </div>
              )}
              
              <div className="mb-5">
                <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-white/80 text-sm h-10">{plan.description}</p>
              </div>
              
              {'pricePerToken' in plan ? (
                // Token Plan (Pay-as-you-go)
                <div className="mb-8">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-white">
                      {calculateTokenPrice(selectedTokens)}€
                    </span>
                  </div>
                  <p className="text-white/80 text-sm mt-1">pour {selectedTokens} tokens</p>
                  
                  <div className="mt-4">
                    <Select
                      value={selectedTokens.toString()}
                      onValueChange={(value) => setSelectedTokens(parseInt(value))}
                    >
                      <SelectTrigger className="w-full bg-white/95 border-none">
                        <SelectValue placeholder="Tokens" />
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
                </div>
              ) : (
                // Subscription Plan
                <div className="mb-8">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-white">
                      {getTotalPrice(plan.basePrice)}€
                    </span>
                    <span className="text-white/80 ml-1 text-sm">
                      {getPeriodLabel(billingPeriod)}
                    </span>
                  </div>
                  {getSavingsPercentage(billingPeriod) > 0 && (
                    <p className="text-white/90 text-sm mt-1">
                      <span className="bg-white/20 px-2 py-0.5 rounded">
                        Économisez {getSavingsPercentage(billingPeriod)}%
                      </span>
                    </p>
                  )}
                </div>
              )}
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => {
                  let featureText: string;
                  
                  if (typeof feature === 'string') {
                    featureText = feature;
                  } else if ('pricePerToken' in plan) {
                    // C'est un TokenPlan avec TokenFeature
                    featureText = (feature as TokenFeature)(selectedTokens);
                  } else {
                    // C'est un SubscriptionPlan avec BillingFeature
                    featureText = (feature as BillingFeature)(billingPeriod);
                  }
                  
                  return (
                    <li key={index} className="flex items-start text-white">
                      <Check className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
                      <span className="text-sm">{featureText}</span>
                    </li>
                  );
                })}
              </ul>
              
              <Link
                href={'pricePerToken' in plan 
                  ? `/pre-checkout?plan=pay-as-you-go&period=one-time&tokens=${selectedTokens}` 
                  : `/pre-checkout?plan=${plan.id || plan.name.toLowerCase()}&period=${
                      billingPeriod === 'biweekly' ? 'bi-weekly' : 
                      billingPeriod === 'annual' ? 'annualy' : 
                      billingPeriod
                    }`}
                className="block w-full py-3 px-4 bg-white/95 hover:bg-white text-center text-[#14304D] font-medium rounded-lg transition-colors"
              >
                {'pricePerToken' in plan ? 'Acheter des tokens' : 'Souscrire maintenant'}
              </Link>
            </div>
          ))}
        </div>
      
      </div>
    </section>
  );
} 