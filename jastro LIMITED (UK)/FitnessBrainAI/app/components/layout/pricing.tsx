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
  id: string;
  name: string;
  description: string;
  basePrice: number;
  cta: string;
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
      id: 'pay-as-you-go',
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
      popular: false,
      gradient: "from-gray-700 to-gray-900",
      hoverGradient: "from-gray-600 to-gray-800"
    } as TokenPlan,
    {
      id: 'lite',
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
      popular: false,
      gradient: "from-blue-600 to-cyan-600",
      hoverGradient: "from-blue-500 to-cyan-500"
    } as SubscriptionPlan,
    {
      id: 'basic',
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
      popular: true,
      gradient: "from-violet-600 to-purple-600",
      hoverGradient: "from-violet-500 to-purple-500"
    },
    {
      id: 'advanced',
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
      popular: false,
      gradient: "from-purple-600 to-pink-600",
      hoverGradient: "from-purple-500 to-pink-500"
    },
    {
      id: 'pro',
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
    <section id="pricing" className="py-16 sm:py-24 bg-black relative overflow-hidden w-full" ref={pricingRef}>
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-5"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
      
      {/* Éléments décoratifs */}
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      
      <div className="container relative z-10 px-4 sm:px-6 mx-auto w-full">
        <div className="text-center mb-10 sm:mb-16 space-y-4">
          <div className="inline-block px-4 sm:px-6 py-2 border border-primary/30 rounded-full backdrop-blur-sm glass-card text-white text-sm font-medium mb-4 animate-fade-in">
            <span className="mr-2 inline-block w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Tarification simple
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            Choisissez votre plan
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Des options flexibles pour tous les besoins d'entraînement
          </p>
          
          {/* Ligne décorative */}
          <div className="w-24 h-1 bg-gradient-primary mx-auto mt-6 rounded-full"></div>
        </div>
        
        {/* Options de facturation */}
        <div className="flex flex-wrap justify-center mb-8 sm:mb-12">
          <div className="inline-flex p-1 glass-card border border-primary/20 rounded-full mb-4 sm:mb-0">
            <Select value={billingPeriod} onValueChange={(value: BillingPeriod) => setBillingPeriod(value)}>
              <SelectTrigger className="w-[180px] bg-neutral-darkest/70 border-primary/50 text-white">
                <SelectValue placeholder="Sélectionner la période" />
              </SelectTrigger>
              <SelectContent className="bg-neutral-darkest border-primary/50 text-white">
                {billingOptions.map((option) => (
                  <SelectItem key={option.id} value={option.id} className="text-white hover:bg-primary/20">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {(billingPeriod === 'quarterly' || billingPeriod === 'annual') && (
            <div className="ml-0 sm:ml-4 mt-2 sm:mt-0 bg-gradient-to-r from-green-400 to-primary text-xs font-bold text-black px-3 py-1 rounded-full flex items-center">
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
              } hover-lift hover:z-20 group`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {plan.name === "À la carte" && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neutral-dark to-neutral-darker opacity-95 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
              {plan.name === "Débutant" && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0D3D6B] to-[#0A2A4A] opacity-95 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
              {plan.name === "Intermédiaire" && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#362F5F] to-[#24225A] opacity-95 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
              {plan.name === "Avancé" && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#3B2D61] to-[#291D4D] opacity-95 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
              {plan.name === "Coach Pro" && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#532D52] to-[#3D1F3D] opacity-95 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
              
              {plan.popular && (
                <div className="absolute -top-5 left-0 right-0 flex justify-center">
                  <div className="bg-gradient-to-r from-primary to-secondary text-black font-bold px-4 py-1 rounded-full shadow-lg">
                    Le plus populaire
                  </div>
                </div>
              )}
              
              <div className="relative rounded-xl bg-[#14304D]/90 backdrop-blur-sm p-4 sm:p-6 h-full flex flex-col shadow-lg">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-white mb-4">{plan.description}</p>
                
                <div className="mb-6">
                  {plan.name === "À la carte" ? (
                    <>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm text-white font-medium mb-2 block">Nombre de tokens souhaités :</label>
                          <Select
                            value={selectedTokens.toString()}
                            onValueChange={(value) => setSelectedTokens(parseInt(value))}
                          >
                            <SelectTrigger className="w-full bg-black/70 border-purple-500/50 text-white">
                              <SelectValue placeholder="Sélectionnez un nombre de tokens" />
                            </SelectTrigger>
                            <SelectContent className="max-h-60 bg-black/90 border-purple-500/50 text-white">
                              {availableTokenOptions.map((option) => (
                                <SelectItem key={option} value={option.toString()} className="text-white hover:bg-purple-500/20">
                                  {option} tokens
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-baseline">
                          <span className="text-3xl font-bold text-white">{calculateTokenPrice(selectedTokens)}€</span>
                          <span className="text-white ml-2">pour {selectedTokens} tokens</span>
                        </div>
                        <p className="text-sm text-white font-medium">
                          ~{Math.floor(selectedTokens / 10)} discussions avec le coach IA
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-white">{getTotalPrice(plan.basePrice)}€</span>
                        <span className="text-white ml-2">{getPeriodLabel(billingPeriod)}</span>
                      </div>
                      <p className="text-sm text-white mt-1">
                        {billingPeriod === 'biweekly' && 'Facturé toutes les 2 semaines'}
                        {billingPeriod === 'monthly' && 'Facturé mensuellement'}
                        {billingPeriod === 'quarterly' && 'Facturé tous les 3 mois'}
                        {billingPeriod === 'annual' && 'Facturé annuellement'}
                      </p>
                      <p className="text-sm text-white font-medium mt-2">
                        {'baseTokens' in plan ? `${getTokensForPeriod(plan.baseTokens, billingPeriod)} tokens inclus` : null}
                      </p>
                      {(billingPeriod === 'quarterly' || billingPeriod === 'annual') && (
                        <p className="text-sm text-white font-bold mt-1">
                          Économisez {getSavingsPercentage(billingPeriod)}% sur le prix mensuel
                        </p>
                      )}
                    </>
                  )}
                </div>
                
                <ul className="space-y-3 mb-8 flex-grow text-sm">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-white mr-2 flex-shrink-0" />
                      <span className="text-white">
                        {typeof feature === 'function'
                          ? 'pricePerToken' in plan
                            ? (feature as TokenFeature)(selectedTokens)
                            : (feature as BillingFeature)(billingPeriod)
                          : feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href={plan.id === 'pay-as-you-go' 
                    ? `/pre-checkout?plan=${plan.id}&period=one-time&tokens=${selectedTokens}` 
                    : `/pre-checkout?plan=${plan.id}&period=${
                        billingPeriod === 'biweekly' ? 'bi-weekly' : 
                        billingPeriod === 'annual' ? 'annualy' : 
                        billingPeriod
                      }`
                  } 
                  className="mt-auto"
                >
                  <Button 
                    className={`w-full font-medium text-black ${plan.name === "À la carte" ? "bg-white hover:bg-gray-200" : "bg-primary hover:bg-primary-dark"}`}
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
            className="p-2 rounded-full bg-primary/20 hover:bg-primary/40 transition-colors"
            onClick={() => {
              const container = document.querySelector('.overflow-x-auto');
              if (container) {
                container.scrollBy({ left: -300, behavior: 'smooth' });
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            className="p-2 rounded-full bg-primary/20 hover:bg-primary/40 transition-colors"
            onClick={() => {
              const container = document.querySelector('.overflow-x-auto');
              if (container) {
                container.scrollBy({ left: 300, behavior: 'smooth' });
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
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

        <div className="mt-10 sm:mt-16 text-center">
          <p className="text-gray-300 max-w-2xl mx-auto">
            Besoin d'une solution personnalisée ? <a href="/contact" className="text-primary hover:text-primary-light font-medium underline transition-colors">Contactez-nous</a>.
          </p>
        </div>
      </div>
    </section>
  );
} 