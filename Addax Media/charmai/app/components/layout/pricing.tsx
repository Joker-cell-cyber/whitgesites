'use client';

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/app/components/ui/button";
import { Check, MessageCircleHeart, CreditCard, Clock, Star, ChevronLeft, ChevronRight, Plus, Minus, Sparkles, Heart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

// Définir les types pour les différents plans
interface BasePlan {
  id: string;          // Identifiant unique du plan (doit correspondre aux valeurs attendues)
  name: string;        // Nom d'affichage du plan
  popular: boolean;    // Si le plan est mis en avant
  description: string; // Description courte du plan
  price: number;       // Prix du plan (pour les abonnements, c'est le prix mensuel par défaut)
  gradient: string;    // Classes CSS pour le dégradé de couleur
  hoverGradient: string; // Classes CSS pour le dégradé au survol
  icon: React.ReactNode; // Icône du plan
  features: string[];    // Liste des fonctionnalités incluses
}

interface TokenPlan extends BasePlan {
  tokens: number;        // Nombre de tokens inclus
  pricePerToken: number; // Prix par token
}

interface SubscriptionPlan extends BasePlan {
  messagesPerDay: number; // Nombre de messages quotidiens
  tokenDiscount: number;  // Réduction sur les tokens additionnels
}

type Plan = TokenPlan | SubscriptionPlan;

const isTokenPlan = (plan: Plan): plan is TokenPlan => 'pricePerToken' in plan;

// Fonction de normalisation des noms de plans pour les URLs
const getNormalizedPlanName = (plan: string): string => {
  switch (plan.toLowerCase()) {
    case 'débutant': return 'lite';
    case 'intermédiaire': return 'basic';
    case 'avancé': return 'advanced';
    case 'coach pro': return 'pro';
    default: return plan.toLowerCase();
  }
};

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<{ name: string; value: string }>({ 
    name: 'Mensuel', 
    value: 'monthly' 
  });
  const [animateCards, setAnimateCards] = useState(false);
  const [tokenCount, setTokenCount] = useState<number>(50);
  const [payAsYouGoTokens, setPayAsYouGoTokens] = useState<number>(10);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    // Animation des cartes lors du chargement
    setAnimateCards(true);
  }, []);

  // Fonction pour formater le prix selon la période de facturation
  const formatPrice = (basePrice: number, period: string): number => {
    switch (period) {
      case 'biweekly':
        return basePrice * 0.6;
      case 'quarterly':
        return basePrice * 3 * 0.9;
      case 'annualy':
      case 'annual':
        return basePrice * 12 * 0.8;
      default:
        return basePrice;
    }
  };

  // Formatter le prix des tokens
  const formatTokenPrice = (tokens: number, pricePerToken: number): string => {
    return (tokens * pricePerToken).toFixed(2);
  };

  // Composant pour afficher le CTA des plans de tokens
  const renderTokenPlanCTA = (plan: TokenPlan) => {
    return (
      <div className="mt-6">
        <button
          onClick={() => {
            if (showModal) return;
            
            // Normaliser le nom du plan pour l'URL
            const normalizedPlan = getNormalizedPlanName(plan.id);
            
            // Rediriger vers la page de pré-checkout
            window.location.href = `/pre-checkout?plan=${normalizedPlan}&period=one-time&tokens=${plan.tokens}&tokenPrice=${plan.pricePerToken}&source=tokens`;
          }}
          className={`w-full py-3 px-4 rounded-md font-medium text-sm transition-all duration-300 ${
            plan.popular
              ? "bg-gradient-to-r from-purple-500 to-violet-500 text-white hover:from-purple-600 hover:to-violet-600"
              : "bg-black text-white border border-gray-600 hover:bg-gray-900"
          }`}
        >
          Acheter {plan.tokens} tokens
        </button>
      </div>
    );
  };

  // Composant pour afficher le CTA des plans d'abonnement
  const renderSubscriptionPlanCTA = (plan: SubscriptionPlan) => {
    return (
      <div className="mt-6">
        <button
          onClick={() => {
            if (showModal) return;
            
            // Normaliser le nom du plan pour l'URL
            const normalizedPlan = getNormalizedPlanName(plan.id);
            
            // Convertir la période pour le format d'URL
            let periodParam = billingPeriod.value;
            if (periodParam === 'biweekly') periodParam = 'bi-weekly';
            if (periodParam === 'annual') periodParam = 'annualy';
            
            // Rediriger vers la page de pré-checkout
            window.location.href = `/pre-checkout?plan=${normalizedPlan}&period=${periodParam}`;
          }}
          className={`w-full py-3 px-4 rounded-md font-medium text-sm transition-all duration-300 ${
            plan.popular
              ? "bg-gradient-to-r from-purple-500 to-violet-500 text-white hover:from-purple-600 hover:to-violet-600"
              : "bg-black text-white border border-gray-600 hover:bg-gray-900"
          }`}
        >
          Commencer
        </button>
      </div>
    );
  };

  // Définir les plans disponibles
  const plans: Plan[] = [
    {
      id: 'pay-as-you-go',    // ID normalisé pour l'URL
      name: 'Pay-as-you-go',  // Nom d'affichage
      popular: false,
      description: "Idéal pour une utilisation occasionnelle",
      price: 0,
      tokens: payAsYouGoTokens,  // Use the state variable instead of a fixed value
      pricePerToken: 0.90,
      gradient: "from-purple-500 to-violet-500",
      hoverGradient: "from-purple-600 to-violet-600",
      icon: <CreditCard className="h-5 w-5" />,
      features: [
        "Paiement à l'usage",
        "Pas d'engagement",
        "Tokens valables 1 an",
        "Support par email"
      ]
    } as TokenPlan,
    {
      id: 'lite',             // ID normalisé pour l'URL
      name: 'Lite',           // Nom d'affichage
      popular: false,
      description: "Pour démarrer et tester le service",
      price: 19.90,
      messagesPerDay: 45,
      tokenDiscount: 0.75,
      gradient: "from-blue-400 to-cyan-400",
      hoverGradient: "from-blue-500 to-cyan-500",
      icon: <MessageCircleHeart className="h-5 w-5" />,
      features: [
        "45 tokens inclus par mois",
        "Accès aux fonctionnalités de base",
        "Support par email",
        "Tokens additionnels à 0,75€"
      ]
    } as SubscriptionPlan,
    {
      id: 'basic',            // ID normalisé pour l'URL
      name: 'Basic',          // Nom d'affichage
      popular: true,
      description: "Idéal pour une utilisation régulière",
      price: 34.90,
      messagesPerDay: 100,
      tokenDiscount: 0.60,
      gradient: "from-amber-400 to-orange-400",
      hoverGradient: "from-amber-500 to-orange-500",
      icon: <Heart className="h-5 w-5" />,
      features: [
        "100 tokens inclus par mois",
        "Accès à toutes les fonctionnalités",
        "Support prioritaire",
        "Tokens additionnels à 0,60€"
      ]
    } as SubscriptionPlan,
    {
      id: 'advanced',         // ID normalisé pour l'URL
      name: 'Advanced',       // Nom d'affichage
      popular: false,
      description: "Pour les utilisateurs intensifs",
      price: 49.90,
      messagesPerDay: 180,
      tokenDiscount: 0.45,
      gradient: "from-emerald-400 to-teal-400",
      hoverGradient: "from-emerald-500 to-teal-500",
      icon: <Sparkles className="h-5 w-5" />,
      features: [
        "180 tokens inclus par mois",
        "Accès prioritaire aux nouvelles fonctionnalités",
        "Support premium",
        "Tokens additionnels à 0,45€"
      ]
    } as SubscriptionPlan,
    {
      id: 'pro',              // ID normalisé pour l'URL
      name: 'Pro',            // Nom d'affichage
      popular: false,
      description: "Pour les professionnels",
      price: 69.90,
      messagesPerDay: 300,
      tokenDiscount: 0.35,
      gradient: "from-rose-400 to-red-400",
      hoverGradient: "from-rose-500 to-red-500",
      icon: <Sparkles className="h-5 w-5" />,
      features: [
        "300 tokens inclus par mois",
        "Accès à toutes les fonctionnalités premium",
        "Support dédié",
        "Tokens additionnels à 0,35€"
      ]
    } as SubscriptionPlan
  ];

  return (
    <section id="pricing" className="py-20 bg-white relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-pink-50"></div>
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-pink-100 rounded-full blur-3xl opacity-70"></div>
      <div className="absolute bottom-1/3 -right-64 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-70"></div>
      
      {/* Cœurs flottants décoratifs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-heart"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.05 + Math.random() * 0.05,
              transform: `scale(${0.5 + Math.random() * 0.5})`,
              animationDuration: `${15 + Math.random() * 20}s`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          >
            <Heart
              size={Math.random() > 0.5 ? 24 : 16}
              className="text-pink-400 fill-current"
            />
          </div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-100 to-red-100 text-pink-700 text-sm font-medium mb-4"
          >
            <Heart className="inline-block mr-1 h-3.5 w-3.5 fill-pink-500" />
            Tarifs
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-6 text-gray-900"
          >
            Transformez votre vie <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-600">amoureuse</span> dès maintenant
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Choisissez le forfait qui vous convient et commencez votre parcours de séduction aujourd'hui
          </motion.p>
        </div>
        
        {/* Sélecteur de période de facturation */}
        <div className="flex justify-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl p-1.5 w-full max-w-xl flex flex-wrap justify-center border border-pink-100 shadow-lg"
          >
            <button
              onClick={() => setBillingPeriod({ name: 'Bimensuel', value: 'biweekly' })}
              className={`py-2 px-4 rounded-lg transition-all duration-300 m-1 text-sm ${
                billingPeriod.value === 'biweekly'
                  ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
              }`}
            >
              Bi-hebdomadaire
            </button>
            <button
              onClick={() => setBillingPeriod({ name: 'Mensuel', value: 'monthly' })}
              className={`py-2 px-4 rounded-lg transition-all duration-300 m-1 text-sm ${
                billingPeriod.value === 'monthly'
                  ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setBillingPeriod({ name: 'Trimestriel', value: 'quarterly' })}
              className={`py-2 px-4 rounded-lg transition-all duration-300 m-1 text-sm ${
                billingPeriod.value === 'quarterly'
                  ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
              }`}
            >
              Trimestriel <span className="ml-1 text-xs bg-pink-100 text-pink-700 px-1.5 py-0.5 rounded">-10%</span>
            </button>
            <button
              onClick={() => setBillingPeriod({ name: 'Annuel', value: 'annualy' })}
              className={`py-2 px-4 rounded-lg transition-all duration-300 m-1 text-sm ${
                billingPeriod.value === 'annualy'
                  ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
              }`}
            >
              Annuel <span className="ml-1 text-xs bg-pink-100 text-pink-700 px-1.5 py-0.5 rounded">-20%</span>
            </button>
          </motion.div>
        </div>
        
        {/* Navigation des cartes */}
        <div className="relative max-w-6xl mx-auto mb-6">
          <button 
            onClick={() => {
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
            }}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-white p-2 rounded-full border border-pink-100 text-pink-500 ${
              currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pink-50 hover:border-pink-300'
            }`}
            aria-label="Forfait précédent"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button 
            onClick={() => {
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
            }}
            disabled={currentIndex === plans.length - 1}
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-white p-2 rounded-full border border-pink-100 text-pink-500 ${
              currentIndex === plans.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pink-50 hover:border-pink-300'
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
                    ? 'border-pink-400 shadow-lg shadow-pink-500/10' 
                    : 'border-gray-200'
                } bg-white overflow-hidden flex flex-col w-[320px] min-h-[620px] hover:shadow-xl transition-shadow duration-300`}
              >
                {/* Badge populaire */}
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl">
                      POPULAIRE
                    </div>
                  </div>
                )}
              
                <div className="p-6 flex-grow">
                  <div className={`inline-flex items-center justify-center p-2 rounded-lg bg-gradient-to-br ${plan.gradient} mb-4`}>
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                
                  <div className="mb-6">
                    {'pricePerToken' in plan ? (
                      <div>
                        <div className="flex items-baseline justify-between mb-4">
                          <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-600">
                            {plan.pricePerToken.toFixed(2)}€
                          </span>
                          <span className="text-gray-500">/ crédit</span>
                        </div>
                        
                        {/* Sélecteur de tokens */}
                        <div className="bg-pink-50 rounded-lg p-4 mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-700">Nombre de tokens:</span>
                            <span className="text-pink-600 font-bold">{plan.tokens}</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <button
                              onClick={() => {
                                if ('pricePerToken' in plan && plan.tokens > 10) {
                                  // Only modify payAsYouGoTokens if this is the pay-as-you-go plan
                                  if (plan.id === 'pay-as-you-go') {
                                    setPayAsYouGoTokens(prev => Math.max(10, prev - 10));
                                  }
                                }
                              }}
                              disabled={plan.tokens <= 10}
                              className={`p-1.5 rounded-lg bg-white border border-pink-100 ${plan.tokens <= 10 ? 'opacity-50' : 'hover:bg-pink-100'}`}
                            >
                              <Minus className="h-4 w-4 text-pink-500" />
                            </button>
                            
                            <div className="w-full mx-2 h-2 bg-white rounded-full">
                              <div 
                                className="h-2 bg-gradient-to-r from-pink-500 to-red-500 rounded-full" 
                                style={{ width: `${(plan.tokens / 500) * 100}%` }}
                              ></div>
                            </div>
                            
                            <button
                              onClick={() => {
                                if ('pricePerToken' in plan && plan.tokens < 500) {
                                  // Only modify payAsYouGoTokens if this is the pay-as-you-go plan
                                  if (plan.id === 'pay-as-you-go') {
                                    setPayAsYouGoTokens(prev => Math.min(500, prev + 10));
                                  }
                                }
                              }}
                              disabled={plan.tokens >= 500}
                              className={`p-1.5 rounded-lg bg-white border border-pink-100 ${plan.tokens >= 500 ? 'opacity-50' : 'hover:bg-pink-100'}`}
                            >
                              <Plus className="h-4 w-4 text-pink-500" />
                            </button>
                          </div>
                          
                          <div className="text-right mt-2">
                            <span className="text-pink-600 font-bold">
                              Total: {formatTokenPrice(plan.tokens, plan.pricePerToken)}€
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-baseline justify-between">
                          <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-600">
                            {formatPrice(plan.price, billingPeriod.value).toFixed(2).replace('.', ',')}€
                          </span>
                          <span className="text-gray-500">{billingPeriod.name.toLowerCase()}</span>
                        </div>
                        
                        {!('pricePerToken' in plan) && billingPeriod.value !== 'monthly' && (
                          <p className="text-sm text-gray-500 mt-1">
                            {billingPeriod.value === 'biweekly' && 'Facturé toutes les 2 semaines'}
                            {billingPeriod.value === 'quarterly' && 'Facturé tous les 3 mois'}
                            {billingPeriod.value === 'annualy' && 'Facturé annuellement'}
                            {(billingPeriod.value === 'quarterly' || billingPeriod.value === 'annualy') && (
                              <span className="ml-2 text-pink-500">
                                {billingPeriod.value === 'quarterly' ? '-10%' : '-20%'} sur le prix mensuel
                              </span>
                            )}
                          </p>
                        )}
                        
                        {/* Tokens supplémentaires pour les abonnements */}
                        <div className="mt-4 pt-3 border-t border-gray-100">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="h-4 w-4 text-pink-500" />
                            <span className="text-sm text-gray-700">Tokens supplémentaires:</span>
                          </div>
                          <div className="text-pink-600 font-medium">
                            {plan.tokenDiscount.toFixed(2)}€ / token supplémentaire
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-pink-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="p-6 bg-gradient-to-t from-pink-50 to-white border-t border-pink-100">
                  {isTokenPlan(plan) ? renderTokenPlanCTA(plan) : renderSubscriptionPlanCTA(plan as SubscriptionPlan)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section d'information sur les tokens */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 bg-gradient-to-br from-white to-pink-50 rounded-2xl p-8 border border-pink-100 shadow-xl overflow-hidden relative max-w-5xl mx-auto"
        >
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-3/5">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-pink-100 to-red-100 text-pink-700 text-sm font-medium mb-4">
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                <span>Comment fonctionnent les tokens</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Comprendre notre système de crédits</h3>
              <p className="text-gray-600 mb-6">
                Les tokens sont notre monnaie de conversation - chaque message que vous échangez avec votre coach consomme un token. Plus votre abonnement est élevé, moins vous payez par token.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <div className="text-center px-3 py-2 rounded-lg bg-white shadow-sm border border-pink-100">
                  <div className="text-gray-500 text-xs mb-1">Débutant</div>
                  <div className="text-pink-600 font-bold">0,75€</div>
                </div>
                <div className="text-center px-3 py-2 rounded-lg bg-white shadow-sm border border-pink-100">
                  <div className="text-gray-500 text-xs mb-1">Intermédiaire</div>
                  <div className="text-pink-600 font-bold">0,60€</div>
                </div>
                <div className="text-center px-3 py-2 rounded-lg bg-white shadow-sm border border-pink-100">
                  <div className="text-gray-500 text-xs mb-1">Avancé</div>
                  <div className="text-pink-600 font-bold">0,45€</div>
                </div>
                <div className="text-center px-3 py-2 rounded-lg bg-white shadow-sm border border-pink-100">
                  <div className="text-gray-500 text-xs mb-1">Coach Pro</div>
                  <div className="text-pink-600 font-bold">0,35€</div>
                </div>
              </div>
            </div>
            <div className="md:w-2/5 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-300/20 to-red-300/20 rounded-full blur-xl"></div>
                <div className="relative bg-gradient-to-r from-pink-500 to-red-500 rounded-full h-32 w-32 flex items-center justify-center">
                  <div className="text-white text-center">
                    <Sparkles className="h-10 w-10 mx-auto mb-1" />
                    <span className="font-bold text-xl">Tokens</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Style pour l'animation des cœurs flottants */}
        <style jsx>{`
          @keyframes float-heart {
            0% { transform: translateY(0) rotate(0); }
            50% { transform: translateY(-30px) rotate(10deg); }
            100% { transform: translateY(0) rotate(0); }
          }
          .animate-float-heart {
            animation: float-heart 15s ease-in-out infinite;
          }
        `}</style>
      </div>
    </section>
  );
} 