'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { Button } from '@/app/components/ui/button';
import { Check, X, TreePine, Leaf, Flower } from 'lucide-react';

// Type pour la période de facturation
type BillingPeriod = 'biweekly' | 'monthly' | 'quarterly' | 'yearly';

// Fonction utilitaire pour calculer les tokens selon la période
const getTokensForPeriod = (baseTokens: number, period: BillingPeriod): number => {
  switch(period) {
    case 'biweekly': return Math.floor(baseTokens * 0.6);
    case 'quarterly': return Math.floor(baseTokens * 2.7);
    case 'yearly': return Math.floor(baseTokens * 9.6);
    default: return baseTokens;
  }
};

const plans = [
  {
    id: 'lite',
    name: 'Lite',
    description: 'Pour débuter avec l\'analyse de données',
    price: 19.90,
    tokens: 45,
    billing: 'monthly',
    icon: <TreePine className="h-6 w-6 text-white" />,
    color: 'bg-gradient-to-r from-[#5F7138] to-[#7A8B4D]',
    buttonClass: 'bg-white text-[#5F7138] shadow-md hover:bg-[#F7EFDE]',
    featureColor: 'text-white',
    features: [
      (period: BillingPeriod) => `${getTokensForPeriod(45, period)} tokens ${period === 'biweekly' ? 'toutes les 2 semaines' : period === 'monthly' ? 'par mois' : period === 'quarterly' ? 'par trimestre' : 'par an'}`,
      (period: BillingPeriod) => `${(19.90 / 45).toFixed(2)}€ par token`,
      "Accès à l'analyseur IA",
      "Tokens supplémentaires à 0.75€"
    ],
    mostPopular: false
  },
  {
    id: 'basic',
    name: 'Basic',
    description: 'Pour une utilisation régulière',
    price: 34.90,
    tokens: 100,
    billing: 'monthly',
    icon: <TreePine className="h-6 w-6 text-white" />,
    color: 'bg-gradient-to-r from-[#5F7138] to-[#7A8B4D]',
    buttonClass: 'bg-white text-[#5F7138] shadow-md hover:bg-[#F7EFDE]',
    featureColor: 'text-white',
    features: [
      (period: BillingPeriod) => `${getTokensForPeriod(100, period)} tokens ${period === 'biweekly' ? 'toutes les 2 semaines' : period === 'monthly' ? 'par mois' : period === 'quarterly' ? 'par trimestre' : 'par an'}`,
      (period: BillingPeriod) => `${(34.90 / 100).toFixed(2)}€ par token`,
      "Accès à l'analyseur IA",
      "Tokens supplémentaires à 0.60€"
    ],
    mostPopular: true
  },
  {
    id: 'advanced',
    name: 'Advanced',
    description: 'Pour une utilisation intensive',
    price: 49.90,
    tokens: 180,
    billing: 'monthly',
    icon: <TreePine className="h-6 w-6 text-white" />,
    color: 'bg-gradient-to-r from-[#5F7138] to-[#7A8B4D]',
    buttonClass: 'bg-white text-[#5F7138] shadow-md hover:bg-[#F7EFDE]',
    featureColor: 'text-white',
    features: [
      (period: BillingPeriod) => `${getTokensForPeriod(180, period)} tokens ${period === 'biweekly' ? 'toutes les 2 semaines' : period === 'monthly' ? 'par mois' : period === 'quarterly' ? 'par trimestre' : 'par an'}`,
      (period: BillingPeriod) => `${(49.90 / 180).toFixed(2)}€ par token`,
      "Accès à l'analyseur IA",
      "Tokens supplémentaires à 0.45€"
    ],
    mostPopular: false
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Pour les professionnels de l\'analyse',
    price: 69.90,
    tokens: 300,
    billing: 'monthly',
    icon: <TreePine className="h-6 w-6 text-white" />,
    color: 'bg-gradient-to-r from-[#5F7138] to-[#7A8B4D]',
    buttonClass: 'bg-white text-[#5F7138] shadow-md hover:bg-[#F7EFDE]',
    featureColor: 'text-white',
    features: [
      (period: BillingPeriod) => `${getTokensForPeriod(300, period)} tokens ${period === 'biweekly' ? 'toutes les 2 semaines' : period === 'monthly' ? 'par mois' : period === 'quarterly' ? 'par trimestre' : 'par an'}`,
      (period: BillingPeriod) => `${(69.90 / 300).toFixed(2)}€ par token`,
      "Accès à l'analyseur IA",
      "Tokens supplémentaires à 0.35€"  
    ],
    mostPopular: false
  },
  {
    id: 'pay-as-you-go',
    name: 'Pay-as-you-go',
    description: 'Achetez uniquement ce dont vous avez besoin',
    price: 0.90, // Prix par token
    tokens: 50, // Valeur par défaut
    billing: 'one-time',
    icon: <TreePine className="h-6 w-6 text-white" />,
    color: 'bg-gradient-to-r from-[#5F7138] to-[#7A8B4D]',
    buttonClass: 'bg-white text-[#5F7138] shadow-md hover:bg-[#F7EFDE]',
    featureColor: 'text-white',
    features: [
      () => 'Pas d\'engagement',
      () => 'Prix unitaire de 0.90€ par token',
      'Paiement à l\'usage',
      'Conservation pendant 1 an',
      'Support par email'
    ],
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
    triggerOnce: false,
    threshold: 0.1
  });
  
  // État pour stocker les références des cartes
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // État pour la période de facturation
  const [billingCycle, setBillingCycle] = useState<BillingPeriod>('monthly');
  
  // État pour la quantité de tokens (pour le plan pay-as-you-go)
  const [selectedTokens, setSelectedTokens] = useState(50);
  
  // État pour l'index de la carte actuellement visible (mobile)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [carouselProps, setCarouselProps] = useState({
    touching: false,
    dragging: false,
    startX: 0,
    currentX: 0
  });
  
  // Calculer le prix en fonction de la période de facturation
  const calculatePrice = (basePrice: number): number => {
    switch (billingCycle) {
      case 'biweekly':
        return basePrice * 0.6; // 60% du prix mensuel
      case 'quarterly':
        return basePrice * 2.7; // 3 mois - 10%
      case 'yearly':
        return basePrice * 9.6; // 12 mois - 20%
      default:
        return basePrice;
    }
  };

  // Faire défiler vers une carte spécifique (mobile)
  const scrollToCard = (index: number) => {
    setCurrentIndex(index);
    const mobileContainer = document.getElementById('plans-carousel-mobile');
    if (mobileContainer) {
      mobileContainer.scrollTo({
        left: index * mobileContainer.offsetWidth,
        behavior: 'smooth'
      });
    }
  };

  // Gérer le swipe sur mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setCarouselProps({
      ...carouselProps,
      touching: true,
      startX: e.touches[0].clientX,
      currentX: e.touches[0].clientX
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (carouselProps.touching) {
      setCarouselProps({
        ...carouselProps,
        dragging: true,
        currentX: e.touches[0].clientX
      });
    }
  };

  const handleTouchEnd = () => {
    setCarouselProps({ ...carouselProps, touching: false, dragging: false });
    
    const delta = touchStartX - carouselProps.currentX;
    const threshold = 50; // Seuil de swipe
    
    if (Math.abs(delta) > threshold) {
      if (delta > 0 && currentIndex < plans.length - 1) {
        // Swipe vers la gauche
        scrollToCard(currentIndex + 1);
      } else if (delta < 0 && currentIndex > 0) {
        // Swipe vers la droite
        scrollToCard(currentIndex - 1);
      }
    }
  };

  // Détecter le défilement sur le carousel mobile
  useEffect(() => {
    const handleMobileScroll = () => {
      const mobileContainer = document.getElementById('plans-carousel-mobile');
      if (mobileContainer) {
        const scrollPosition = mobileContainer.scrollLeft;
        const cardWidth = mobileContainer.offsetWidth;
        const newIndex = Math.round(scrollPosition / cardWidth);
        
        if (newIndex !== currentIndex) {
          setCurrentIndex(newIndex);
        }
      }
    };
    
    const mobileContainer = document.getElementById('plans-carousel-mobile');
    mobileContainer?.addEventListener('scroll', handleMobileScroll);
    
    return () => {
      mobileContainer?.removeEventListener('scroll', handleMobileScroll);
    };
  }, [currentIndex]);

  // Pour le plan pay-as-you-go, on calcule le prix en fonction du nombre de tokens
  const calculatePayAsYouGoPrice = () => {
    return selectedTokens * 0.90;
  };

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

  const getTokenPriceDescription = (planId: string, billing: string) => {
    const tokens = getTokensForPlan(planId, billing);
    const discount = billing === 'quarterly' ? '-10% d\'économie' : 
                     billing === 'yearly' ? '-20% d\'économie' : '';
    
    const pricePerToken = planId === 'lite' ? 0.44 : 
                         planId === 'basic' ? 0.35 :
                         planId === 'advanced' ? 0.28 :
                         planId === 'pro' ? 0.23 : 0.90;
    
    return `${tokens} tokens inclus (${pricePerToken}€/token) ${discount}`.trim();
  };

  // Fonction pour générer l'URL de redirection vers le pré-checkout
  const handleSubscribe = (plan: string) => {
    // Pour le plan pay-as-you-go, on inclut directement les tokens sélectionnés
    if (plan === 'pay-as-you-go') {
      window.location.href = `/pre-checkout?plan=${plan}&period=one-time&tokens=${selectedTokens}`;
      return;
    }
    
    // Pour les autres plans, on redirige vers la page pre-checkout avec les paramètres du plan
    window.location.href = `/pre-checkout?plan=${plan}&period=${
      billingCycle === 'biweekly' ? 'bi-weekly' : 
      billingCycle === 'yearly' ? 'annualy' : 
      billingCycle
    }`;
  };

  // Fonction pour générer des liens vers le pré-checkout
  const generateCheckoutLink = (plan: any) => {
    if (plan.id === 'pay-as-you-go') {
      return `/pre-checkout?plan=${plan.id}&period=one-time&tokens=${selectedTokens}`;
    }
    
    return `/pre-checkout?plan=${plan.id}&period=${
      billingCycle === 'biweekly' ? 'bi-weekly' : 
      billingCycle === 'yearly' ? 'annualy' : 
      billingCycle
    }`;
  };

  // Fonction pour mettre à jour les refs des cartes
  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    cardsRef.current[index] = el;
  };

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden bg-[#F7EFDE]">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute top-20 right-[15%] w-16 h-16 rounded-full bg-[#F0EBE1] border border-[#E8DFC7] shadow-lg opacity-60"
        />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
          className="absolute bottom-40 left-[10%] w-12 h-12 rounded-full bg-[#F7EFDE] border border-[#E8DFC7] shadow-lg opacity-60"
        />
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        <div className="text-center mb-16 md:mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 border border-[#C17A56]/30 rounded-full bg-[#F7EFDE] shadow-sm"
          >
            <span className="text-[#A35E3D] text-sm font-medium flex items-center">
              <Leaf className="h-4 w-4 mr-2 text-[#C17A56]" />
              Offres flexibles
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-[#4F4639] mb-6"
          >
            Choisissez votre <span className="text-[#5F7138]">formule</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-[#7F7259]"
          >
            Des solutions adaptées à tous les besoins, de l'achat ponctuel de tokens aux abonnements mensuels avec tokens inclus.
          </motion.p>
        </div>
        
        {/* Sélecteur de cycle de facturation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-10 flex flex-col items-center justify-center"
        >
          <div className="p-1 bg-[#F0EBE1] rounded-full border border-[#E8DFC7] mb-4 inline-flex">
            {(['biweekly', 'monthly', 'quarterly', 'yearly'] as const).map((cycle) => (
              <button
                key={cycle}
                onClick={() => setBillingCycle(cycle)}
                className={`py-2 px-4 rounded-full text-sm font-medium transition-all duration-200 ${
                  billingCycle === cycle
                    ? 'bg-[#5F7138] text-white shadow-sm'
                    : 'text-[#7F7259] hover:text-[#4F4639]'
                }`}
              >
                {cycle === 'biweekly' && 'Bimensuel'}
                {cycle === 'monthly' && 'Mensuel'}
                {cycle === 'quarterly' && 'Trimestriel'}
                {cycle === 'yearly' && 'Annuel'}
              </button>
            ))}
          </div>
          <p className="text-[#7F7259] text-sm">
            {billingCycle === 'quarterly' && 'Économisez 10% avec la facturation trimestrielle'}
            {billingCycle === 'yearly' && 'Économisez 20% avec la facturation annuelle'}
            {billingCycle === 'biweekly' && 'Facturation bi-hebdomadaire'}
            {billingCycle === 'monthly' && 'Facturation mensuelle'}
          </p>
        </motion.div>
        
        {/* Cartes de prix - desktop */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
          {plans.map((plan, index) => (
        <motion.div
              key={plan.id}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col ${
                plan.mostPopular ? 'ring-2 ring-[#5F7138] transform lg:-translate-y-2' : ''
              }`}
              ref={(el) => setCardRef(el, index)}
              >
                {plan.mostPopular && (
                <div className="bg-[#5F7138] py-1 px-4 text-white text-xs font-medium text-center">
                  Le plus populaire
                  </div>
                )}
                
                <div className={`${plan.color} p-8 ${plan.mostPopular ? 'pt-12' : ''}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      plan.mostPopular ? 'bg-white/20' : 'bg-[#F0EBE1] border border-[#E8DFC7]'
                    }`}>
                      {plan.icon}
                    </div>
                    <div className="text-right">
                      <div className={`${plan.mostPopular ? 'text-white/90' : 'text-[#7F7259]'} text-sm font-medium`}>
                        {plan.id === 'pay-as-you-go' ? 'Paiement unique' : `Prix ${billingCycle === 'biweekly' ? 'bi-hebdomadaire' : billingCycle === 'monthly' ? 'mensuel' : billingCycle === 'quarterly' ? 'trimestriel' : 'annuel'}`}
                      </div>
                      <div className="flex items-end">
                        <span className={`text-4xl font-bold ${plan.mostPopular ? 'text-white' : 'text-[#4F4639]'}`}>
                        {plan.id === 'pay-as-you-go' 
                          ? calculatePayAsYouGoPrice().toFixed(2) 
                          : calculatePrice(plan.price).toFixed(2)}€
                        </span>
                    </div>
                    </div>
                  </div>
                  
                  <h3 className={`text-2xl font-bold ${plan.mostPopular ? 'text-white' : 'text-[#4F4639]'} mb-2`}>
                    {plan.name}
                  </h3>
                  <p className={`${plan.mostPopular ? 'text-white/90' : 'text-[#4F4639]'} text-sm mb-6`}>
                    {plan.description}
                  </p>
                  
                {plan.id === 'pay-as-you-go' ? (
                  <div className="bg-white/80 rounded-lg p-3 mb-4">
                    <div className="text-sm text-[#4F4639] mb-2">Nombre de tokens :</div>
                    <select 
                      className="w-full p-2 rounded border border-[#E8DFC7] bg-white text-[#4F4639]"
                      value={selectedTokens}
                      onChange={(e) => setSelectedTokens(Number(e.target.value))}
                    >
                      {tokenOptions.map(option => (
                        <option key={option.tokens} value={option.tokens}>
                          {option.tokens} tokens ({option.price.toFixed(2)}€)
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className={`text-sm font-medium ${
                    plan.mostPopular ? 'text-white/90' : 'text-[#4F4639]'
                  } mb-6`}>
                    {getTokenPriceDescription(plan.id, billingCycle)}
                  </div>
                )}
                </div>
                
              <div className="p-6 bg-white flex-grow flex flex-col">
                <div className="mb-6 flex-grow">
                  <h4 className="font-medium text-[#4F4639] mb-3">Caractéristiques</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-[#5F7138] mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-[#7F7259]">
                          {typeof feature === 'function' ? feature(billingCycle) : feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Link 
                  href={generateCheckoutLink(plan)}
                  className={`w-full py-3 px-4 rounded-lg text-center font-medium transition-all ${plan.buttonClass}`}
                >
                  {plan.id === 'pay-as-you-go' ? 'Acheter des tokens' : 'Souscrire maintenant'}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Cartes de prix - mobile (carousel) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:hidden w-full mb-8"
        >
          <div 
            id="plans-carousel-mobile"
            className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {plans.map((plan, index) => (
              <div 
                key={plan.id}
                className="w-full flex-shrink-0 snap-center px-4"
                style={{ scrollSnapAlign: 'center' }}
              >
                <div className={`bg-white rounded-2xl shadow-lg overflow-hidden ${
                  plan.mostPopular ? 'ring-2 ring-[#5F7138]' : ''
                }`}>
                  {plan.mostPopular && (
                    <div className="bg-[#5F7138] py-1 px-4 text-white text-xs font-medium text-center">
                      Le plus populaire
                    </div>
                  )}
                  
                  <div className={`${plan.color} p-6`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        plan.mostPopular ? 'bg-white/20' : 'bg-[#F0EBE1] border border-[#E8DFC7]'
                      }`}>
                        {plan.icon}
                      </div>
                      <div className="text-right">
                        <div className={`${plan.mostPopular ? 'text-white/90' : 'text-[#7F7259]'} text-xs font-medium`}>
                          {plan.id === 'pay-as-you-go' ? 'Paiement unique' : `Prix ${billingCycle === 'biweekly' ? 'bi-hebdomadaire' : billingCycle === 'monthly' ? 'mensuel' : billingCycle === 'quarterly' ? 'trimestriel' : 'annuel'}`}
                        </div>
                        <div className="flex items-end">
                          <span className={`text-3xl font-bold ${plan.mostPopular ? 'text-white' : 'text-[#4F4639]'}`}>
                            {plan.id === 'pay-as-you-go' 
                              ? calculatePayAsYouGoPrice().toFixed(2) 
                              : calculatePrice(plan.price).toFixed(2)}€
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className={`text-xl font-bold ${plan.mostPopular ? 'text-white' : 'text-[#4F4639]'} mb-2`}>
                      {plan.name}
                    </h3>
                    <p className={`${plan.mostPopular ? 'text-white/90' : 'text-[#4F4639]'} text-sm mb-4`}>
                      {plan.description}
                    </p>
                    
                    {plan.id === 'pay-as-you-go' ? (
                      <div className="bg-white/80 rounded-lg p-3 mb-4">
                        <div className="text-sm text-[#4F4639] mb-2">Nombre de tokens :</div>
                        <select 
                          className="w-full p-2 rounded border border-[#E8DFC7] bg-white text-[#4F4639]"
                          value={selectedTokens}
                          onChange={(e) => setSelectedTokens(Number(e.target.value))}
                        >
                          {tokenOptions.map(option => (
                            <option key={option.tokens} value={option.tokens}>
                              {option.tokens} tokens ({option.price.toFixed(2)}€)
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <div className={`text-sm font-medium ${
                        plan.mostPopular ? 'text-white/90' : 'text-[#4F4639]'
                      } mb-4`}>
                        {getTokenPriceDescription(plan.id, billingCycle)}
                      </div>
                    )}
                  </div>
                  
                  <div className="p-5 bg-white">
                    <div className="mb-4">
                      <h4 className="font-medium text-[#4F4639] mb-2">Caractéristiques</h4>
                      <ul className="space-y-2">
                        {plan.features.slice(0, 3).map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <Check className="h-4 w-4 text-[#5F7138] mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-xs text-[#7F7259]">
                              {typeof feature === 'function' ? feature(billingCycle) : feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Link 
                      href={generateCheckoutLink(plan)}
                      className={`w-full py-2 px-4 rounded-lg text-center font-medium text-sm transition-all ${plan.buttonClass}`}
                    >
                      {plan.id === 'pay-as-you-go' ? 'Acheter des tokens' : 'Souscrire maintenant'}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {plans.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  currentIndex === index 
                    ? 'bg-[#5F7138] w-4' 
                    : 'bg-[#E8DFC7] hover:bg-[#C17A56]'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 