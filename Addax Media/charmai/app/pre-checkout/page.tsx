'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";
import { getTokenCheckoutLink, getSubscriptionCheckoutLink } from '@/app/config/checkout-links';
import { legalContent } from '@/app/legal-pages/legal';
import { privacyContent } from '@/app/legal-pages/privacy';
import { refundContent } from '@/app/legal-pages/refund';
import { termsContent } from '@/app/legal-pages/terms';
import { motion } from 'framer-motion';
import { CreditCard, MessageCircleHeart, Sparkles, ChevronDown, Plus, Minus, Loader2, Heart } from 'lucide-react';
import Link from 'next/link';
import { ProductManager, ProductDetails } from '@/lib/product-utils';

export default function PreCheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 text-purple-500 animate-spin" />
          <p className="text-gray-400">Chargement des informations de paiement...</p>
        </div>
      </div>
    }>
      <PreCheckoutContent />
    </Suspense>
  );
}

function PreCheckoutContent() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get('plan') || 'débutant';
  const periodParam = searchParams.get('period') || 'monthly';
  const tokensParam = searchParams.get('tokens');
  const productIdParam = searchParams.get('productId');
  
  // Vérifier si c'est un achat à la carte (one-time)
  const isOneTime = periodParam === 'one-time' || searchParams.get('source') === 'tokens';
  
  // Vérifier si on vient de la page tokens spécifiquement
  const isFromTokensPage = searchParams.get('source') === 'tokens';
  
  // Normaliser le plan pour s'assurer qu'il correspond au format attendu par ProductManager
  const getNormalizedPlan = (plan: string): string => {
    const planLower = plan.toLowerCase();
    if (planLower === 'débutant' || planLower === 'starter') return 'lite';
    if (planLower === 'intermédiaire' || planLower === 'intermediate') return 'basic';
    if (planLower === 'avancé') return 'advanced';
    if (planLower === 'coach pro' || planLower === 'enterprise') return 'pro';
    return planLower;
  };
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [additionalTokens, setAdditionalTokens] = useState(0);
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isAutomaticBillingAccepted, setIsAutomaticBillingAccepted] = useState(false);
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [productManager, setProductManager] = useState<ProductManager | null>(null);
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showTokenSelector, setShowTokenSelector] = useState(false);

  // Initialiser le gestionnaire de produits et charger les détails du produit
  useEffect(() => {
    async function loadProductDetails() {
      try {
        setLoading(true);
        setError(null);
        
        // Récupérer l'instance de ProductManager
        const manager = ProductManager.getInstance();
        await manager.initialize();
        setProductManager(manager);
        
        // Si on vient de la page tokens, on utilise toujours le plan 'pro' pour avoir le prix à 0.35€
        let effectivePlan = planParam;
        let tokenPriceParam = searchParams.get('tokenPrice');
        let tokenPrice = tokenPriceParam ? parseFloat(tokenPriceParam) : 0.35;
        
        const isPayAsYouGo = planParam?.toLowerCase() === 'pay-as-you-go' || 
                             planParam?.toLowerCase() === 'à la carte' || 
                             planParam?.toLowerCase() === 'a la carte';
        
        // Si c'est un achat à la carte et qu'on n'a pas de prix spécifié, utiliser 0.90€
        if (isPayAsYouGo && !tokenPriceParam && !isFromTokensPage) {
          tokenPrice = 0.90;
        }
        
        if (isFromTokensPage) {
          effectivePlan = 'pro';
        }
        
        // Normaliser le plan pour s'assurer de la compatibilité
        const normalizedPlan = getNormalizedPlan(effectivePlan);
        console.log(`Plan normalisé: ${normalizedPlan} (original: ${planParam}, effectif: ${effectivePlan})`);
        
        // Récupérer les détails du produit
        const tokens = tokensParam ? parseInt(tokensParam, 10) : undefined;
        
        // Si on a un ID de produit fourni et qu'on vient de la page tokens, on l'utilise directement
        if (productIdParam && isFromTokensPage) {
          // Créer un objet ProductDetails avec les informations disponibles
          setProductDetails({
            id: productIdParam,
            name: `${tokens} TOKEN PACK`,
            price: tokens ? tokens * tokenPrice : 0, // tokens * prix pro
            nextBillingDate: '',  // Pas de facturation récurrente
            includedTokens: tokens || 0,
            additionalTokenPrice: tokenPrice  // Prix pro
          });
        } else if (isPayAsYouGo && tokens) {
          // Pour les achats à la carte, utiliser le prix de 0.69€ par token
          setProductDetails({
            id: productIdParam || '',
            name: `${tokens} TOKEN PACK`,
            price: tokens * tokenPrice,
            nextBillingDate: '',
            includedTokens: tokens,
            additionalTokenPrice: tokenPrice
          });
        } else {
          // Cas standard: demander au ProductManager de déterminer les détails
          const details = manager.getProductDetails(normalizedPlan, periodParam, tokens);
          setProductDetails(details);
        }
      } catch (err) {
        console.error('Erreur lors du chargement des détails du produit:', err);
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    }
    
    loadProductDetails();
  }, [planParam, periodParam, tokensParam, isFromTokensPage, productIdParam]);
  
  const handleTokenIncrement = () => {
    if (additionalTokens < 100) {
      setAdditionalTokens(prev => prev + 10);
    } else if (additionalTokens < 500) {
      setAdditionalTokens(prev => prev + 50);
    }
  };

  const handleTokenDecrement = () => {
    if (additionalTokens > 100) {
      setAdditionalTokens(prev => prev - 50);
    } else if (additionalTokens > 0) {
      setAdditionalTokens(prev => prev - 10);
    }
  };
  
  const getTotalPrice = (): string => {
    if (!productDetails) return '0.00';
    
    const additionalTokensPrice = additionalTokens * productDetails.additionalTokenPrice;
    return (productDetails.price + additionalTokensPrice).toFixed(2);
  };
  
  const getPeriodLabel = (period: string): string => {
    switch (period) {
      case 'biweekly': return ' toutes les 2 semaines';
      case 'monthly': return ' par mois';
      case 'quarterly': return ' par trimestre';
      case 'annualy':
      case 'annual': return ' par an';
      default: return '';
    }
  };

  const getPlanTitle = (): string => {
    // Si l'achat vient de la page tokens, montrer "À la carte" même si le plan est différent
    if (searchParams.get('source') === 'tokens') {
      return 'À la carte';
    }
    
    switch (planParam.toLowerCase()) {
      case 'pay-as-you-go':
      case 'à la carte': return 'À la carte';
      case 'lite':
      case 'débutant':
      case 'starter': return 'Lite';
      case 'basic':
      case 'intermédiaire':
      case 'intermediate': return 'Basic';
      case 'advanced':
      case 'avancé': return 'Advanced';
      case 'pro':
      case 'coach pro':
      case 'enterprise': return 'Pro';
      default: return 'Lite';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAgeVerified || !isTermsAccepted) {
      alert('Veuillez accepter les conditions obligatoires pour continuer.');
      return;
    }
    
    // Vérification de l'acceptation des paiements automatiques pour les abonnements
    if (!isOneTime && !isAutomaticBillingAccepted) {
      alert('Veuillez accepter les conditions de prélèvement automatique pour poursuivre votre abonnement.');
      return;
    }
    
    if (!firstName || !lastName || !email) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    
    if (!productManager || !productDetails) {
      alert('Erreur lors de la préparation de la commande.');
      return;
    }
    
    try {
      // Construire l'objet pour l'URL de checkout
      const products: {
        subscriptionId?: string;
        tokenPackId?: string;
      } = {};
      
      // Vérifier si c'est un achat à la carte/one-time
      const isOneTimeOrCart = isOneTime || 
                              planParam?.toLowerCase() === 'à la carte' || 
                              planParam?.toLowerCase() === 'a la carte' || 
                              planParam?.toLowerCase() === 'pay-as-you-go';
      
      // 1. Ajouter l'abonnement principal ou le pack de tokens
      if (!isOneTimeOrCart) {
        products.subscriptionId = productDetails.id;
      } else {
        // Si on a un ID de produit passé en paramètre et qu'on vient de la page tokens, l'utiliser directement
        if (productIdParam && isFromTokensPage) {
          products.tokenPackId = productIdParam;
        } else {
          products.tokenPackId = productDetails.id;
        }
      }
      
      // 2. Ajouter le pack de tokens supplémentaires si nécessaire
      if (additionalTokens > 0 && !isOneTime) {
        // Si on vient de la page tokens, on utilise toujours le plan 'pro' pour les tokens
        const normalizedPlan = isFromTokensPage ? 'pro' : getNormalizedPlan(planParam);
        const tokenPackId = productManager.getTokenPackId(normalizedPlan, additionalTokens);
        if (tokenPackId) {
          products.tokenPackId = tokenPackId;
        } else {
          console.warn(`Token pack id non trouvé pour ${normalizedPlan} avec ${additionalTokens} tokens`);
        }
      }
      
      // 3. Construire l'URL avec uniquement le paramètre products
      const checkoutUrl = productManager.buildCheckoutUrl(products);
      
      // 4. Stocker les informations utilisateur dans le localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('checkout_firstName', firstName);
        localStorage.setItem('checkout_lastName', lastName);
        localStorage.setItem('checkout_email', email);
        localStorage.setItem('checkout_automaticBilling', isAutomaticBillingAccepted ? '1' : '0');
      }
      
      // 5. Redirection vers l'URL de checkout
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Erreur lors de la construction de l\'URL de checkout:', error);
      alert('Une erreur est survenue lors de la préparation de la commande.');
    }
  };
  
  const getNextPaymentDate = (period: string): string => {
    const today = new Date();
    const nextPaymentDate = new Date(today);
    
    switch (period) {
      case 'biweekly':
        nextPaymentDate.setDate(today.getDate() + 14);
        break;
      case 'monthly':
        nextPaymentDate.setMonth(today.getMonth() + 1);
        break;
      case 'quarterly':
        nextPaymentDate.setMonth(today.getMonth() + 3);
        break;
      case 'annual':
      case 'annualy':
        nextPaymentDate.setFullYear(today.getFullYear() + 1);
        break;
    }
    
    return nextPaymentDate.toLocaleDateString('fr-FR');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-purple-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 text-purple-500 animate-spin" />
          <p className="text-gray-400">Chargement des informations de paiement...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-purple-950 flex items-center justify-center">
        <div className="max-w-md mx-auto p-6 bg-gray-900 rounded-lg shadow-xl">
          <h2 className="text-xl font-bold text-red-500 mb-4">Erreur</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <Link href="/pricing" className="block w-full">
            <Button variant="default" className="w-full">
              Retour à la page des tarifs
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  // Préparer le contenu des pages légales
  const legalContents = {
    terms: termsContent.content.map(section => `${section.title}\n${section.text}`).join('\n\n'),
    privacy: privacyContent.content.map(section => `${section.title}\n${section.text}`).join('\n\n'),
    refund: refundContent.content.map(section => `${section.title}\n${section.text}`).join('\n\n')
  };

  const prices: Record<string, { base: number, additional: number }> = {
    'débutant': { base: 0.44, additional: 0.75 },
    'intermédiaire': { base: 0.35, additional: 0.60 },
    'avancé': { base: 0.28, additional: 0.45 },
    'coach pro': { base: 0.23, additional: 0.35 },
    'à la carte': { base: 0.90, additional: 0.90 }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-pink-50"></div>
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-pink-100 rounded-full blur-3xl opacity-70 pointer-events-none"></div>
      <div className="absolute bottom-1/3 -right-64 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-70 pointer-events-none"></div>
      
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
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
              Presque <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-600">terminé</span>
            </h1>
            <p className="text-lg text-gray-600">
              Complétez vos informations pour finaliser votre commande
            </p>
          </motion.div>
          
          <div className="bg-white rounded-xl border border-pink-100 p-6 mb-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Récapitulatif de votre commande</h2>
            
            <div className="flex items-start gap-4 p-4 bg-pink-50 rounded-lg mb-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center">
                {planParam === 'à la carte' || isOneTime ? (
                  <CreditCard className="h-6 w-6 text-white" />
                ) : (
                  <MessageCircleHeart className="h-6 w-6 text-white" />
                )}
              </div>
              
              <div className="flex-grow">
                <h3 className="text-xl font-bold mb-1 text-gray-900">{getPlanTitle()}</h3>
                <div className="flex justify-between items-center mb-3">
                  <div className="text-sm text-gray-600">
                    {planParam === 'à la carte' || isOneTime
                      ? `${searchParams.get('source') === 'tokens' ? searchParams.get('tokens') || productDetails?.includedTokens : productDetails?.includedTokens} tokens` 
                      : `${productDetails?.includedTokens} tokens inclus`
                    }
                  </div>
                  <div className="text-xl font-bold text-pink-600">
                    {searchParams.get('source') === 'tokens' ? searchParams.get('price') || productDetails?.price : productDetails?.price}€{planParam !== 'à la carte' && !isOneTime && getPeriodLabel(periodParam)}
                  </div>
                </div>
                
                {/* Ajouter des informations supplémentaires pour les abonnements */}
                {planParam !== 'à la carte' && !isOneTime && (
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <div className="flex flex-col gap-1">
                      <p className="text-xs text-pink-600 font-medium">
                        Abonnement avec renouvellement automatique
                      </p>
                      <p className="text-xs text-gray-500">
                        Premier prélèvement aujourd'hui, puis le {getNextPaymentDate(periodParam)}
                      </p>
                      <p className="text-xs text-gray-500">
                        Vous pouvez annuler à tout moment depuis votre compte
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Prix par token inclus : {prices[planParam as keyof typeof prices]?.base || 0.44}€
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Information pour les achats à la carte ou uniques */}
                {(planParam === 'à la carte' || isOneTime) && (
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      Achat unique sans renouvellement automatique. {planParam === 'à la carte' && 'Minimum 10 tokens.'} Les tokens sont valables 12 mois.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Option d'achat de tokens supplémentaires */}
            {planParam !== 'à la carte' && !isOneTime && (
              <div className="bg-white border border-pink-100 rounded-lg p-4 mb-6 shadow-sm">
                <button 
                  onClick={() => setShowTokenSelector(!showTokenSelector)}
                  className="flex items-center justify-between w-full"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-gray-900">Ajouter des tokens</h3>
                      <p className="text-sm text-gray-600">
                        {productDetails?.additionalTokenPrice}€ / token supplémentaire <span className="text-pink-600">(achat unique)</span>
                      </p>
                    </div>
                  </div>
                  <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${showTokenSelector ? 'rotate-180' : ''}`} />
                </button>
                
                {showTokenSelector && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-gray-100"
                  >
                    <div className="bg-pink-50 p-3 rounded-lg mb-4 text-xs text-gray-600">
                      <span className="text-pink-600 font-medium block mb-1">Information importante :</span>
                      Les tokens supplémentaires sont facturés une seule fois (achat unique) et ne font pas partie de votre abonnement récurrent.
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-600">Tokens supplémentaires :</span>
                        <span className="text-pink-600 font-bold">{additionalTokens}</span>
                      </div>
                      
                      <div className="flex items-center justify-between mb-3">
                        <button
                          onClick={handleTokenDecrement}
                          disabled={additionalTokens <= 0}
                          className={`p-2 rounded-lg bg-white border border-pink-100 ${additionalTokens <= 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pink-50'}`}
                        >
                          <Minus className="h-4 w-4 text-pink-500" />
                        </button>
                        
                        <div className="w-full mx-3 h-2 bg-gray-100 rounded-full">
                          <div 
                            className="h-2 bg-gradient-to-r from-pink-500 to-red-500 rounded-full" 
                            style={{ width: `${(additionalTokens / 500) * 100}%` }}
                          ></div>
                        </div>
                        
                        <button
                          onClick={handleTokenIncrement}
                          disabled={additionalTokens >= 500}
                          className={`p-2 rounded-lg bg-white border border-pink-100 ${additionalTokens >= 500 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pink-50'}`}
                        >
                          <Plus className="h-4 w-4 text-pink-500" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-5 gap-2">
                        {[10, 20, 50, 100, 200].map(value => (
                          <button
                            key={value}
                            onClick={() => setAdditionalTokens(value)}
                            className={`py-1 px-2 rounded text-sm ${
                              additionalTokens === value
                                ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white'
                                : 'bg-white border border-pink-100 text-gray-600 hover:bg-pink-50'
                            }`}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {additionalTokens > 0 && (
                      <div className="flex justify-between items-center text-sm bg-pink-50 rounded-lg p-3">
                        <span className="text-gray-600">{additionalTokens} tokens × {productDetails?.additionalTokenPrice ?? 0}€</span>
                        <span className="font-bold text-pink-600">{(additionalTokens * (productDetails?.additionalTokenPrice ?? 0)).toFixed(2)}€</span>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            )}

            {/* Coût total */}
            <div className="border-t border-gray-100 pt-4 mt-4">
              {/* Résumé des paiements pour les abonnements */}
              {planParam !== 'à la carte' && !isOneTime && (
                <div className="mb-4 bg-pink-50 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-pink-600 mb-3">Résumé des paiements</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Aujourd'hui</p>
                        <p className="text-xs text-gray-500">Débit immédiat</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{getTotalPrice()}€</p>
                        {additionalTokens > 0 && (
                          <p className="text-xs text-gray-500">
                            Inclut {(additionalTokens * (productDetails?.additionalTokenPrice ?? 0)).toFixed(2)}€ de tokens supplémentaires (achat unique)
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-start pt-2 border-t border-gray-200">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          <span className="text-pink-600">Prochain prélèvement:</span> {getNextPaymentDate(periodParam)}
                        </p>
                        <p className="text-xs text-gray-500">Prélèvement{getPeriodLabel(periodParam)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{productDetails?.price}€</p>
                        <p className="text-xs text-gray-500">Abonnement seul, sans tokens supplémentaires</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between font-bold text-lg">
                <span className="text-gray-900">Total à payer aujourd'hui</span>
                <span className="text-pink-600">{getTotalPrice()}€</span>
              </div>
              
              {planParam !== 'à la carte' && !isOneTime && (
                <div className="text-xs text-gray-500 text-right mt-1">
                  Puis {productDetails?.price}€{getPeriodLabel(periodParam)} pour votre abonnement à partir du <span className="font-semibold">{getNextPaymentDate(periodParam)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Formulaire d'informations personnelles */}
          <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-pink-100 p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Vos informations</h2>
            
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Prénom *</label>
                  <Input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Prénom"
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Nom *</label>
                  <Input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Nom"
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Email *</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@exemple.com"
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent"
                />
              </div>
            </div>

            {/* Checkbox pour les conditions */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="age"
                  checked={isAgeVerified}
                  onCheckedChange={(checked) => setIsAgeVerified(checked as boolean)}
                  className="mt-1"
                />
                <label htmlFor="age" className="text-sm text-gray-600">
                  Je certifie avoir au moins 18 ans.
                </label>
              </div>

              {/* Nouvelle checkbox pour le consentement au débit automatique */}
              {planParam !== 'à la carte' && !isOneTime && (
                <div className="flex items-start gap-3 p-3 bg-pink-50 rounded-lg border border-pink-200">
                  <Checkbox
                    id="automaticBilling"
                    checked={isAutomaticBillingAccepted}
                    onCheckedChange={(checked) => setIsAutomaticBillingAccepted(checked as boolean)}
                    className="mt-1"
                    required
                  />
                  <label htmlFor="automaticBilling" className="text-sm text-gray-700">
                    <span className="font-semibold">Je consens explicitement</span> à être débité de <span className="text-pink-600 font-semibold">{getTotalPrice()}€</span> aujourd'hui, puis de <span className="text-pink-600 font-semibold">{productDetails?.price}€{getPeriodLabel(periodParam)}</span> à partir du <span className="text-pink-600 font-semibold">{getNextPaymentDate(periodParam)}</span> jusqu'à résiliation de mon abonnement.
                  </label>
                </div>
              )}

              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms"
                  checked={isTermsAccepted}
                  onCheckedChange={(checked) => setIsTermsAccepted(checked as boolean)}
                  className="mt-1"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  {planParam !== 'à la carte' && !isOneTime ? (
                    <>
                      J'accepte les{' '}
                      <button type="button" onClick={() => setOpenDialog('terms')} className="text-pink-600 hover:underline">
                        Conditions d'Utilisation
                      </button>
                      ,{' '}
                      <button type="button" onClick={() => setOpenDialog('privacy')} className="text-pink-600 hover:underline">
                        Politique de Confidentialité
                      </button>
                      , et{' '}
                      <button type="button" onClick={() => setOpenDialog('refund')} className="text-pink-600 hover:underline">
                        Politique de Remboursement
                      </button>
                      .
                    </>
                  ) : (
                    <>
                      J'accepte les{' '}
                      <button type="button" onClick={() => setOpenDialog('terms')} className="text-pink-600 hover:underline">
                        Conditions d'Utilisation
                      </button>
                      ,{' '}
                      <button type="button" onClick={() => setOpenDialog('privacy')} className="text-pink-600 hover:underline">
                        Politique de Confidentialité
                      </button>
                      , et{' '}
                      <button type="button" onClick={() => setOpenDialog('refund')} className="text-pink-600 hover:underline">
                        Politique de Remboursement
                      </button>
                      .
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="space-y-4">
              <Button
                type="submit"
                className="w-full py-6 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold shadow-lg text-lg"
                disabled={!isAgeVerified || !isTermsAccepted}
              >
                <CreditCard className="h-5 w-5 mr-2" />
                {planParam !== 'à la carte' && !isOneTime 
                  ? 'Souscrire à l\'abonnement' 
                  : 'Acheter des tokens'}
              </Button>
              
              <Link href="/" className="block text-center text-gray-500 hover:text-pink-600 text-sm">
                Retour à l'accueil
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Modals pour les conditions légales */}
      <Dialog open={!!openDialog} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent className="bg-white border border-pink-100 text-gray-900 max-h-[80vh] overflow-hidden shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              {openDialog === 'terms' && 'Conditions Générales'}
              {openDialog === 'privacy' && 'Politique de Confidentialité'}
              {openDialog === 'refund' && 'Politique de Remboursement'}
            </DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto">
            <p className="text-sm text-gray-600 whitespace-pre-line">
              {openDialog === 'terms' && legalContents.terms}
              {openDialog === 'privacy' && legalContents.privacy}
              {openDialog === 'refund' && legalContents.refund}
            </p>
          </div>
        </DialogContent>
      </Dialog>

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
  );
} 