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
      description: "Achetez des tokens une fois, utilisez-les quand vous voulez",
      basePrice: 0,
      pricePerToken: 0.90,
      features: [
        (tokens: number) => `${tokens} tokens disponibles immédiatement`,
        (tokens: number) => `~${Math.floor(tokens / 3)} articles générés`,
        "1 langue",
        "Optimisation SEO basique",
        "Support par email",
        "0.90€ par token",
        "Validité 1 an"
      ],
      cta: "Acheter",
      href: "/register",
      popular: false,
      gradient: "from-[#FFEDD5] to-[#FED7AA]",
      hoverGradient: "from-[#FFEDD5]/90 to-[#FED7AA]/90"
    } as TokenPlan,
    {
      name: "Lite",
      description: "Idéal pour débuter avec un budget maîtrisé",
      basePrice: 19.90,
      baseTokens: 45,
      features: [
        (period: BillingPeriod) => `${getTokensForPeriod(45, period)} tokens ${period === 'biweekly' ? 'toutes les 2 semaines' : period === 'monthly' ? 'par mois' : period === 'quarterly' ? 'par trimestre' : 'par an'}`,
        (period: BillingPeriod) => `~${Math.floor(getTokensForPeriod(45, period) / 3)} articles ${period === 'biweekly' ? 'toutes les 2 semaines' : period === 'monthly' ? 'par mois' : period === 'quarterly' ? 'par trimestre' : 'par an'}`,
        "2 langues",
        "Optimisation SEO basique",
        "Support par email",
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
      description: "Pour une production régulière de contenu",
      basePrice: 34.90,
      baseTokens: 100,
      features: [
        (period: BillingPeriod) => `${getTokensForPeriod(100, period)} tokens ${period === 'biweekly' ? 'toutes les 2 semaines' : period === 'monthly' ? 'par mois' : period === 'quarterly' ? 'par trimestre' : 'par an'}`,
        (period: BillingPeriod) => `~${Math.floor(getTokensForPeriod(100, period) / 3)} articles ${period === 'biweekly' ? 'toutes les 2 semaines' : period === 'monthly' ? 'par mois' : period === 'quarterly' ? 'par trimestre' : 'par an'}`,
        "5 langues",
        "Optimisation SEO intermédiaire",
        "Support prioritaire",
        "Générateur d'articles de blog",
        "Générateur de descriptions produits",
        "Tokens supplémentaires à 0.60€"
      ],
      cta: "Je m'abonne",
      href: "/register?plan=basic",
      popular: true,
      gradient: "from-purple-600 to-pink-600",
      hoverGradient: "from-purple-500 to-pink-500"
    } as SubscriptionPlan,
    {
      name: "Advanced",
      description: "Solution complète pour les équipes",
      basePrice: 49.90,
      baseTokens: 180,
      features: [
        (period: BillingPeriod) => `${getTokensForPeriod(180, period)} tokens ${period === 'biweekly' ? 'toutes les 2 semaines' : period === 'monthly' ? 'par mois' : period === 'quarterly' ? 'par trimestre' : 'par an'}`,
        (period: BillingPeriod) => `~${Math.floor(getTokensForPeriod(180, period) / 3)} articles ${period === 'biweekly' ? 'toutes les 2 semaines' : period === 'monthly' ? 'par mois' : period === 'quarterly' ? 'par trimestre' : 'par an'}`,
        "Toutes les langues",
        "Optimisation SEO avancée",
        "Service client prioritaire",
        "Générateur d'articles de blog",
        "Générateur de descriptions produits",
        "Tokens supplémentaires à 0.45€"
      ],
      cta: "Je m'abonne",
      href: "/register?plan=advanced",
      popular: false,
      gradient: "from-orange-600 to-red-600",
      hoverGradient: "from-orange-500 to-red-500"
    } as SubscriptionPlan,
    {
      name: "Pro",
      description: "Puissance maximale pour les grandes entreprises",
      basePrice: 69.90,
      baseTokens: 300,
      features: [
        (period: BillingPeriod) => `${getTokensForPeriod(300, period)} tokens ${period === 'biweekly' ? 'toutes les 2 semaines' : period === 'monthly' ? 'par mois' : period === 'quarterly' ? 'par trimestre' : 'par an'}`,
        (period: BillingPeriod) => `~${Math.floor(getTokensForPeriod(300, period) / 3)} articles ${period === 'biweekly' ? 'toutes les 2 semaines' : period === 'monthly' ? 'par mois' : period === 'quarterly' ? 'par trimestre' : 'par an'}`,
        "Toutes les langues",
        "Optimisation SEO avancée",
        "Service client prioritaire",
        "Générateur d'articles de blog",
        "Générateur de descriptions produits",
        "Tokens supplémentaires à 0.35€"
      ],
      cta: "Je m'abonne",
      href: "/contact",
      popular: false,
      gradient: "from-[#7C2D12] to-[#441803]",
      hoverGradient: "from-[#7C2D12]/90 to-[#441803]/90"
    } as SubscriptionPlan
  ];

  const billingOptions = [
    { id: 'biweekly', label: 'Bi-hebdo' },
    { id: 'monthly', label: 'Mensuel' },
    { id: 'quarterly', label: 'Trimestriel' },
    { id: 'annual', label: 'Annuel' }
  ];

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-gradient-to-br from-[#FFF7ED] to-white relative overflow-hidden" ref={pricingRef}>
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F97316] to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F97316] to-transparent"></div>
      
      {/* Éléments décoratifs */}
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-[#FFEDD5]/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-[#FED7AA]/30 rounded-full blur-3xl"></div>
      
      <div className="container relative z-10 px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16 space-y-4">
          <div className="inline-block px-4 sm:px-6 py-2 border border-[#F97316]/30 rounded-full bg-[#FFEDD5]/20 text-[#7C2D12] text-sm font-medium mb-4">
            <span className="mr-2 inline-block w-2 h-2 rounded-full bg-[#F97316]"></span>
            Tarification simple
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#7C2D12]">
            Choisissez votre <span className="underline decoration-[#F97316] decoration-4 underline-offset-8">plan</span>
          </h2>
          <p className="text-lg sm:text-xl text-[#7C2D12]/80 max-w-2xl mx-auto">
            Des options flexibles pour tous les besoins de création de contenu
          </p>
          
          {/* Ligne décorative */}
          <div className="w-24 h-1 bg-gradient-to-r from-[#F97316] to-[#FB923C] mx-auto mt-6 rounded-full"></div>
        </div>
        
        {/* Options de facturation */}
        <div className="flex flex-wrap justify-center mb-8 sm:mb-12">
          <div className="inline-flex p-1 bg-white/60 backdrop-blur-sm border border-[#F97316]/20 rounded-full mb-4 sm:mb-0">
            {billingOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setBillingPeriod(option.id as BillingPeriod)}
                className={`relative px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 ${
                  billingPeriod === option.id
                    ? "text-white"
                    : "text-[#7C2D12]/70 hover:text-[#7C2D12]"
                }`}
              >
                {option.label}
                {billingPeriod === option.id && (
                  <span className="absolute inset-0 bg-gradient-to-r from-[#F97316] to-[#FB923C] rounded-full -z-10"></span>
                )}
              </button>
            ))}
          </div>
          
          {(billingPeriod === 'quarterly' || billingPeriod === 'annual') && (
            <div className="ml-0 sm:ml-4 mt-2 sm:mt-0 bg-gradient-to-r from-[#FB923C] to-[#F97316] text-xs font-bold text-white px-3 py-1 rounded-full flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
              Économisez {getSavingsPercentage(billingPeriod)}%
            </div>
          )}
        </div>
        
        {/* Grille des plans */}
        <div className="flex flex-nowrap gap-4 overflow-x-auto pb-6 px-4 -mx-4 scrollbar-hide">
          {plans.map((plan, index) => (
            <div 
              key={plan.name}
              className={`relative rounded-2xl backdrop-blur-xl p-1 transition-all duration-700 transform flex-shrink-0 w-[280px] ${
                isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-12"
              } hover:scale-105 hover:z-20 group`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${
                plan.name === "À la carte" ? "from-[#FFEDD5] to-[#FED7AA]" :
                plan.name === "Lite" ? "from-blue-600 to-cyan-600" :
                plan.name === "Basic" ? "from-purple-600 to-pink-600" :
                plan.name === "Advanced" ? "from-orange-600 to-red-600" :
                "from-[#7C2D12] to-[#441803]"
              } opacity-80 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              {plan.popular && (
                <div className="absolute -top-5 left-0 right-0 flex justify-center">
                  <div className="bg-gradient-to-r from-[#FB923C] to-[#F97316] text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                    Le plus populaire
                  </div>
                </div>
              )}
              
              <div className="relative rounded-xl bg-white/90 backdrop-blur-sm p-4 sm:p-6 h-full flex flex-col">
                <h3 className="text-xl font-bold text-[#7C2D12] mb-2">{plan.name}</h3>
                <p className="text-sm text-[#7C2D12]/70 mb-4">{plan.description}</p>
                
                <div className="mb-6">
                  {plan.name === "À la carte" ? (
                    <>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm text-[#7C2D12] font-medium mb-2 block">Nombre de tokens souhaités :</label>
                          <Select
                            value={selectedTokens.toString()}
                            onValueChange={(value) => setSelectedTokens(parseInt(value))}
                          >
                            <SelectTrigger className="w-full bg-white border-[#F97316]/50 text-[#7C2D12] font-medium">
                              <SelectValue placeholder="Sélectionnez un nombre de tokens" />
                            </SelectTrigger>
                            <SelectContent className="max-h-60 bg-white border-[#F97316]/50">
                              {availableTokenOptions.map((option) => (
                                <SelectItem key={option} value={option.toString()} className="text-[#7C2D12] font-medium">
                                  {option} tokens
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-baseline">
                          <span className="text-3xl font-bold text-[#7C2D12]">{calculateTokenPrice(selectedTokens)}€</span>
                          <span className="text-[#7C2D12] ml-2 font-medium">pour {selectedTokens} tokens</span>
                        </div>
                        <p className="text-sm text-[#F97316] font-medium">
                          ~{Math.floor(selectedTokens / 3)} articles de blog
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-[#7C2D12]">{getTotalPrice(plan.basePrice)}€</span>
                        <span className="text-[#7C2D12]/70 ml-2">{getPeriodLabel(billingPeriod)}</span>
                      </div>
                      <p className="text-sm text-[#7C2D12]/70 mt-1">
                        {billingPeriod === 'biweekly' && 'Facturé toutes les 2 semaines'}
                        {billingPeriod === 'monthly' && 'Facturé mensuellement'}
                        {billingPeriod === 'quarterly' && 'Facturé tous les 3 mois'}
                        {billingPeriod === 'annual' && 'Facturé annuellement'}
                      </p>
                      <p className="text-sm text-[#F97316] mt-2 font-medium">
                        {'baseTokens' in plan ? `${getTokensForPeriod(plan.baseTokens, billingPeriod)} tokens inclus` : null}
                      </p>
                      {(billingPeriod === 'quarterly' || billingPeriod === 'annual') && (
                        <p className="text-sm text-[#FB923C] mt-1">
                          Économisez {getSavingsPercentage(billingPeriod)}% sur le prix mensuel
                        </p>
                      )}
                    </>
                  )}
                </div>
                
                <ul className="space-y-3 mb-8 flex-grow text-sm">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-[#FB923C] mr-2 flex-shrink-0" />
                      <span className="text-[#7C2D12]/80">
                        {typeof feature === 'function'
                          ? 'pricePerToken' in plan
                            ? (feature as TokenFeature)(selectedTokens)
                            : (feature as BillingFeature)(billingPeriod)
                          : feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Link href={`/pre-checkout?plan=${plan.name}&period=${
                  plan.name === "À la carte" 
                    ? "one-time" 
                    : billingPeriod
                }&price=${
                  plan.name === "À la carte" 
                    ? calculateTokenPrice(selectedTokens)
                    : getTotalPrice(plan.basePrice)
                }&tokens=${
                  plan.name === "À la carte"
                    ? selectedTokens
                    : 'baseTokens' in plan
                      ? getTokensForPeriod(plan.baseTokens, billingPeriod)
                      : 0
                }&tokenPrice=${
                  plan.name === "À la carte"
                    ? 0.90
                    : 'baseTokens' in plan
                      ? plan.features.find(f => typeof f === 'string' && f.includes('Tokens supplémentaires'))?.toString().match(/\d+\.\d+/)?.[0] || '0'
                      : '0'
                }`} className="mt-auto">
                  <Button 
                    className={`w-full ${
                      plan.name === "À la carte" ? "bg-gradient-to-r from-[#FFEDD5] to-[#FED7AA] text-[#7C2D12]" :
                      plan.name === "Lite" ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white" :
                      plan.name === "Basic" ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white" :
                      plan.name === "Advanced" ? "bg-gradient-to-r from-orange-600 to-red-600 text-white" :
                      "bg-gradient-to-r from-[#7C2D12] to-[#441803] text-white"
                    } border-0 hover:shadow-lg transition-shadow`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* Ajout des contrôles de défilement */}
        <div className="flex justify-center mt-6 gap-2">
          <button 
            className="p-2 rounded-full bg-[#F97316]/10 hover:bg-[#F97316]/20 transition-colors"
            onClick={() => {
              const container = document.querySelector('.overflow-x-auto');
              if (container) {
                container.scrollBy({ left: -300, behavior: 'smooth' });
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#F97316]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            className="p-2 rounded-full bg-[#F97316]/10 hover:bg-[#F97316]/20 transition-colors"
            onClick={() => {
              const container = document.querySelector('.overflow-x-auto');
              if (container) {
                container.scrollBy({ left: 300, behavior: 'smooth' });
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#F97316]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="text-center mt-12">
          <p className="text-[#7C2D12]/80">
            Besoin d'une solution personnalisée ? <a href="/contact" className="text-[#F97316] font-medium hover:underline">Contactez-nous</a>.
          </p>
        </div>
      </div>
    </section>
  );
} 