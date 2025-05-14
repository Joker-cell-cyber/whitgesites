'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";
import { ProductManager, ProductDetails } from '@/lib/product-utils';
import { motion } from 'framer-motion';
import { CreditCard, MessageCircleHeart, Sparkles, ChevronDown, Plus, Minus, Loader2, Flame, X } from 'lucide-react';
import Link from 'next/link';
import { useLegal } from '@/app/context/legal-context';
import { termsContent } from '../legal-pages/terms';
import { privacyContent } from '../legal-pages/privacy';

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
  // Utiliser le hook pour accéder aux contenus légaux
  const { getLegalTextContent } = useLegal();
  
  const searchParams = useSearchParams();
  const planParam = searchParams.get('plan');
  const periodParam = searchParams.get('period');
  const tokens = searchParams.get('tokens');
  
  // État pour les valeurs du formulaire
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [additionalTokens, setAdditionalTokens] = useState(0);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedAgeVerification, setAcceptedAgeVerification] = useState(false);
  const [acceptedNewsletter, setAcceptedNewsletter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // État pour les modales légales
  const [openTermsModal, setOpenTermsModal] = useState(false);
  const [openPrivacyModal, setOpenPrivacyModal] = useState(false);
  
  // État pour le ProductManager et les détails du produit
  const [productManager, setProductManager] = useState<ProductManager | null>(null);
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // Déterminer si c'est un achat unique ou un abonnement
  const isOneTime = periodParam === 'one-time';
  const plan = planParam || 'lite';
  const period = periodParam || 'monthly';
  
  // Initialiser le ProductManager
  useEffect(() => {
    const initializeProductManager = async () => {
      try {
        setIsInitializing(true);
        const manager = ProductManager.getInstance();
        await manager.initialize();
        setProductManager(manager);
        
        // Charger les détails du produit
        let details;
        if (isOneTime && tokens) {
          details = manager.getProductDetails('pay-as-you-go', 'one-time', parseInt(tokens));
        } else {
          details = manager.getProductDetails(plan, period);
        }
        
        if (!details) {
          throw new Error('Produit non trouvé');
        }
        
        setProductDetails(details);
      } catch (error) {
        console.error('Erreur lors de l\'initialisation:', error);
        setErrorMessage('Impossible de charger les détails du produit. Veuillez réessayer.');
      } finally {
        setIsInitializing(false);
      }
    };
    
    initializeProductManager();
  }, [plan, period, isOneTime, tokens]);

  // Gestionnaires pour les tokens supplémentaires
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
  
  // Calculer le prix total
  const getTotalPrice = (): string => {
    if (!productDetails) return '0.00';
    
    const additionalTokensPrice = additionalTokens * productDetails.additionalTokenPrice;
    const totalPrice = productDetails.price + additionalTokensPrice;
    
    return totalPrice.toFixed(2);
  };

  // Calculer le prix des tokens supplémentaires
  const getAdditionalTokensPrice = (): string => {
    if (!productDetails) return '0.00';
    
    return (additionalTokens * productDetails.additionalTokenPrice).toFixed(2);
  };
  
  // Fonction pour traduire la période en français
  const translatePeriod = (period: string): string => {
    switch (period.toLowerCase()) {
      case 'monthly': return 'mensuel';
      case 'bi-weekly': return 'bi-hebdomadaire';
      case 'quarterly': return 'trimestriel';
      case 'annualy': return 'annuel';
      case 'one-time': return 'paiement unique';
      default: return period;
    }
  };
  
  // Fonction pour traduire le plan en français
  const translatePlan = (plan: string): string => {
    switch (plan.toLowerCase()) {
      case 'lite': return 'Lite';
      case 'basic': return 'Basic';
      case 'advanced': return 'Advanced';
      case 'pro': return 'Pro';
      case 'pay-as-you-go': return 'À la carte';
      default: return plan;
    }
  };

  // Gestionnaire de soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vérifications des conditions
    if (!acceptedTerms || !acceptedAgeVerification) {
      setErrorMessage('Veuillez accepter les conditions requises pour continuer');
      return;
    }

    if (!productManager || !productDetails) {
      setErrorMessage('Erreur lors de la préparation de la commande');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Construire l'URL de checkout selon le format CheckoutChamp
      const products: {
        subscriptionId?: string;
        tokenPackId?: string;
      } = {};
      
      // 1. Ajouter l'abonnement principal
      if (!isOneTime) {
        products.subscriptionId = productDetails.id;
      } else {
        products.tokenPackId = productDetails.id;
      }
      
      // 2. Ajouter le pack de tokens supplémentaires si nécessaire
      if (additionalTokens > 0 && !isOneTime) {
        // Récupérer l'ID du produit pour les tokens supplémentaires
        const tokenPackId = productManager.getTokenPackId(plan, additionalTokens);
        if (tokenPackId) {
          products.tokenPackId = tokenPackId;
        }
      }
      
      // 3. Construire l'URL avec uniquement le paramètre products
      const checkoutUrl = productManager.buildCheckoutUrl(products);
      
      // 4. Stocker les informations utilisateur dans le localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('checkout_firstName', firstName);
        localStorage.setItem('checkout_lastName', lastName);
        localStorage.setItem('checkout_email', email);
        localStorage.setItem('checkout_newsletter', acceptedNewsletter ? '1' : '0');
      }
      
      // 5. Redirection directement vers l'URL de checkout
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Erreur lors de la construction de l\'URL de checkout:', error);
      setErrorMessage('Une erreur est survenue lors de la préparation de la commande');
      setIsLoading(false);
    }
  };
  
  // Si toujours en cours d'initialisation, afficher un loader
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 text-purple-500 animate-spin" />
          <p className="text-gray-400">Chargement des informations de paiement...</p>
        </div>
      </div>
    );
  }
  
  // Si erreur, afficher un message
  if (errorMessage && !productDetails) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="bg-gray-900 rounded-xl p-8 max-w-md w-full">
          <h2 className="text-xl font-bold text-white mb-4">Erreur</h2>
          <p className="text-gray-300 mb-6">{errorMessage}</p>
          <Link href="/#pricing">
            <Button className="w-full">Retour à la page des tarifs</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Modale pour les termes et conditions */}
      <Dialog open={openTermsModal} onOpenChange={setOpenTermsModal}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-white text-[#45301C]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex justify-between items-center text-[#45301C]">
              {termsContent.title}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setOpenTermsModal(false)}
                className="h-8 w-8 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
            <p className="text-[#45301C]/70">Dernière mise à jour: {termsContent.lastUpdated}</p>
          </DialogHeader>
          <div className="space-y-6 mt-4 text-[#45301C]/80">
            {termsContent.content.map((section, index) => (
              <div key={index} className="space-y-3">
                <h3 className="text-lg font-semibold text-[#45301C]">{section.title}</h3>
                {section.text.split('\n\n').map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-sm">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Modale pour la politique de confidentialité */}
      <Dialog open={openPrivacyModal} onOpenChange={setOpenPrivacyModal}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-white text-[#45301C]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex justify-between items-center text-[#45301C]">
              {privacyContent.title}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setOpenPrivacyModal(false)}
                className="h-8 w-8 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
            <p className="text-[#45301C]/70">Dernière mise à jour: {privacyContent.lastUpdated}</p>
          </DialogHeader>
          <div className="space-y-6 mt-4 text-[#45301C]/80">
            {privacyContent.content.map((section, index) => (
              <div key={index} className="space-y-3">
                <h3 className="text-lg font-semibold text-[#45301C]">{section.title}</h3>
                {section.text.split('\n\n').map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-sm">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <div className="min-h-screen yfc-gradient-bg relative overflow-hidden py-12 px-4">
        {/* Éléments décoratifs */}
        <div className="absolute inset-0 yfc-pattern-bg opacity-50"></div>
        <div className="absolute -top-40 right-0 w-96 h-96 rounded-full bg-[#FFA728]/40 blur-3xl"></div>
        <div className="absolute -bottom-40 left-0 w-96 h-96 rounded-full bg-[#FF5C3E]/40 blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <Link href="/#pricing" className="inline-flex items-center text-[#45301C]/80 hover:text-[#45301C] mb-8">
            <ChevronDown className="h-4 w-4 mr-1 transform rotate-90" />
            Retour aux tarifs
          </Link>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
              {/* Résumé de commande */}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-[#45301C] mb-6">Résumé de votre commande</h1>
                
                <div className="bg-[#FFF0E8] border border-[#FF5C3E]/10 rounded-lg p-6 mb-6">
                  <div className="flex items-center mb-4">
                    {isOneTime ? (
                      <CreditCard className="h-5 w-5 text-[#FF5C3E] mr-3" />
                    ) : (
                      <MessageCircleHeart className="h-5 w-5 text-[#FF5C3E] mr-3" />
                    )}
                    
                    <h2 className="text-lg font-semibold text-[#45301C]">
                      {translatePlan(plan)} - {translatePeriod(period)}
                    </h2>
                  </div>
                  
                  <div className="border-t border-[#FF5C3E]/10 pt-4 mt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-[#45301C]/80">Abonnement</span>
                      <span className="text-[#45301C] font-medium">{productDetails?.price.toFixed(2)}€</span>
                    </div>
                    
                    <div className="flex justify-between mb-2">
                      <span className="text-[#45301C]/80">Tokens inclus</span>
                      <span className="text-[#45301C] font-medium">{productDetails?.includedTokens}</span>
                    </div>
                    
                    {!isOneTime && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[#45301C]/80">Tokens supplémentaires</span>
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={handleTokenDecrement}
                              className="bg-white text-[#FF5C3E] p-1 rounded-full hover:bg-[#FF5C3E]/10 border border-[#FF5C3E]/20"
                              disabled={additionalTokens <= 0}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            
                            <span className="text-[#45301C] font-medium w-10 text-center">{additionalTokens}</span>
                            
                            <button 
                              onClick={handleTokenIncrement}
                              className="bg-white text-[#FF5C3E] p-1 rounded-full hover:bg-[#FF5C3E]/10 border border-[#FF5C3E]/20"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        
                        {additionalTokens > 0 && (
                          <div className="flex justify-between mb-2 text-sm">
                            <span className="text-[#45301C]/70">
                              Prix par token supplémentaire
                            </span>
                            <span className="text-[#45301C]/80">
                              {productDetails?.additionalTokenPrice.toFixed(2)}€
                            </span>
                          </div>
                        )}
                        
                        {additionalTokens > 0 && (
                          <div className="flex justify-between mb-4">
                            <span className="text-[#45301C]/80">Coût des tokens supplémentaires</span>
                            <span className="text-[#45301C] font-medium">
                              {getAdditionalTokensPrice()}€
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {!isOneTime && productDetails?.nextBillingDate && (
                      <div className="flex justify-between mb-4 text-sm">
                        <span className="text-[#45301C]/70">Prochaine facturation</span>
                        <span className="text-[#45301C]/80">{productDetails.nextBillingDate}</span>
                      </div>
                    )}
                    
                    <div className="border-t border-[#FF5C3E]/10 pt-4 mt-2">
                      <div className="flex justify-between">
                        <span className="text-lg font-medium text-[#45301C]">Total</span>
                        <span className="text-lg font-bold text-[#FF5C3E]">{getTotalPrice()}€</span>
                      </div>
                      
                      {!isOneTime && (
                        <div className="text-sm text-[#45301C]/70 mt-1 text-right">
                          {translatePeriod(period)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Formulaire */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#45301C] mb-6">Vos informations</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-[#45301C]/80 mb-1">
                        Prénom
                      </label>
                      <Input
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="bg-white border-[#45301C]/20 text-[#45301C] focus-visible:ring-[#FF5C3E]"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-[#45301C]/80 mb-1">
                        Nom
                      </label>
                      <Input
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="bg-white border-[#45301C]/20 text-[#45301C] focus-visible:ring-[#FF5C3E]"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#45301C]/80 mb-1">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-white border-[#45301C]/20 text-[#45301C] focus-visible:ring-[#FF5C3E]"
                    />
                  </div>
                  
                  <div className="pt-4 space-y-4">
                    <div className="flex items-start">
                      <Checkbox
                        id="terms"
                        checked={acceptedTerms}
                        onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
                        className="mr-3 mt-1 data-[state=checked]:bg-[#FF5C3E] data-[state=checked]:border-[#FF5C3E]"
                      />
                      <label htmlFor="terms" className="text-sm text-[#45301C]/80">
                        J'accepte les{" "}
                        <button
                          type="button"
                          onClick={() => setOpenTermsModal(true)}
                          className="text-[#FF5C3E] hover:underline"
                        >
                          termes et conditions
                        </button>{" "}
                        et la{" "}
                        <button
                          type="button"
                          onClick={() => setOpenPrivacyModal(true)}
                          className="text-[#FF5C3E] hover:underline"
                        >
                          politique de confidentialité
                        </button>
                      </label>
                    </div>
                    
                    <div className="flex items-start">
                      <Checkbox
                        id="age"
                        checked={acceptedAgeVerification}
                        onCheckedChange={(checked) => setAcceptedAgeVerification(checked === true)}
                        className="mr-3 mt-1 data-[state=checked]:bg-[#FF5C3E] data-[state=checked]:border-[#FF5C3E]"
                      />
                      <label htmlFor="age" className="text-sm text-[#45301C]/80">
                        Je confirme avoir au moins 18 ans
                      </label>
                    </div>
                    
                    {!isOneTime && (
                      <div className="flex items-start">
                        <Checkbox
                          id="chargeConfirmation"
                          checked={true}
                          disabled
                          className="mr-3 mt-1 data-[state=checked]:bg-[#FF5C3E] data-[state=checked]:border-[#FF5C3E]"
                        />
                        <label htmlFor="chargeConfirmation" className="text-sm text-[#45301C]/80">
                          Je comprends que mon compte sera débité immédiatement de <strong className="text-[#45301C]">{productDetails?.price.toFixed(2)}€</strong> pour l'abonnement
                          {additionalTokens > 0 && (
                            <> et de <strong className="text-[#45301C]">{getAdditionalTokensPrice()}€</strong> pour les tokens supplémentaires</>
                          )}, soit un total de <strong className="text-[#FF5C3E]">{getTotalPrice()}€</strong>, 
                          puis tous les {translatePeriod(period)} pour l'abonnement jusqu'à annulation
                        </label>
                      </div>
                    )}
                    
                    <div className="flex items-start">
                      <Checkbox
                        id="newsletter"
                        checked={acceptedNewsletter}
                        onCheckedChange={(checked) => setAcceptedNewsletter(checked === true)}
                        className="mr-3 mt-1 data-[state=checked]:bg-[#FF5C3E] data-[state=checked]:border-[#FF5C3E]"
                      />
                      <label htmlFor="newsletter" className="text-sm text-[#45301C]/80">
                        Je souhaite recevoir les actualités et offres par email
                      </label>
                    </div>
                  </div>
                  
                  {errorMessage && (
                    <div className="bg-red-50 text-red-700 border border-red-200 p-3 rounded-lg text-sm">
                      {errorMessage}
                    </div>
                  )}
                  
                  <Button
                    type="submit"
                    className="w-full py-6 bg-[#FF5C3E] hover:bg-[#E83A20] text-white mt-4 shadow-md shadow-[#FF5C3E]/20"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Traitement en cours...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-5 w-5 mr-2" />
                        Continuer vers le paiement
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 