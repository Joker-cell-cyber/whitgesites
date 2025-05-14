'use client';

import { useState, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/app/components/ui/dialog";
import { getTokenCheckoutLink, getSubscriptionCheckoutLink, tokenCheckoutLinks } from '@/app/config/checkout-links';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { termsContent } from '@/app/legal-pages/terms';
import { privacyContent } from '@/app/legal-pages/privacy';
import { refundContent } from '@/app/legal-pages/refund';
import { Shield, CreditCard, Zap } from 'lucide-react';
import { ProductManager, ProductDetails } from '@/lib/product-utils';

function PreCheckoutContent() {
  const searchParams = useSearchParams();
  
  // États pour gérer le formulaire et les calculs
  const [additionalTokens, setAdditionalTokens] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedAgeVerification, setAcceptedAgeVerification] = useState(false);
  const [acceptedRecurringPayment, setAcceptedRecurringPayment] = useState(false);
  const [acceptedNewsletter, setAcceptedNewsletter] = useState(false);
  const [availableTokenOptions, setAvailableTokenOptions] = useState<number[]>([10, 20, 50, 100, 200, 300, 500]);
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const [showSubscriptionConfirmation, setShowSubscriptionConfirmation] = useState(false);
  const [pendingCheckoutLink, setPendingCheckoutLink] = useState<string | null>(null);
  
  // États pour gérer les produits et les prix
  const [productManager, setProductManager] = useState<ProductManager | null>(null);
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nextBillingDate, setNextBillingDate] = useState<string>('');
  
  // Récupérer les paramètres d'URL
  const planParam = searchParams.get('plan');
  const periodParam = searchParams.get('period');
  const tokens = searchParams.get('tokens');
  
  // Déterminer si c'est un achat unique ou un abonnement
  const isOneTime = periodParam === 'one-time';
  
  // Prix calculés
  const [additionalTokensPrice, setAdditionalTokensPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  
  // Calculer la prochaine date de facturation
  const calculateNextBillingDate = (period: string | null): string => {
    if (!period) return '';
    
    const now = new Date();
    let nextDate = new Date(now);
    
    switch (period.toLowerCase()) {
      case 'monthly':
        nextDate.setMonth(now.getMonth() + 1);
        break;
      case 'quarterly':
        nextDate.setMonth(now.getMonth() + 3);
        break;
      case 'bi-weekly':
      case 'biweekly':
        nextDate.setDate(now.getDate() + 14);
        break;
      case 'annualy':
      case 'yearly':
        nextDate.setFullYear(now.getFullYear() + 1);
        break;
    }
    
    // Format de date français (jour/mois/année)
    return nextDate.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  // Initialiser le ProductManager et charger les détails du produit
  useEffect(() => {
    const initializeProductManager = async () => {
      try {
        if (!planParam || !periodParam) {
          throw new Error('Plan et période requis');
        }
        
        if (isOneTime && !tokens) {
          throw new Error('Nombre de tokens requis pour un achat unique');
        }
        
        // Calculer la prochaine date de facturation
        const billingDate = calculateNextBillingDate(periodParam);
        setNextBillingDate(billingDate);
        
        const manager = ProductManager.getInstance();
        await manager.initialize();
        setProductManager(manager);
        
        if (isOneTime) {
          // Pour les achats de tokens à la carte
          const tokenCount = parseInt(tokens || '0', 10);
          const tokenPackId = manager.getTokenPackId('pro', tokenCount);
          
          if (!tokenPackId) {
            throw new Error(`Pack de tokens non trouvé pour ${tokenCount} tokens`);
          }
          
          const oneTimePrice = tokenCount * 0.35; // Prix fixe pour les tokens pro (0,35€)
          
          setProductDetails({
            id: tokenPackId,
            name: `${tokenCount} TOKEN PACK`,
            price: oneTimePrice,
            nextBillingDate: '',
            includedTokens: tokenCount,
            additionalTokenPrice: 0.35
          });
        } else {
          // Pour les abonnements
          const details = manager.getProductDetails(planParam, periodParam);
          
          if (!details) {
            throw new Error(`Produit non trouvé pour le plan ${planParam} et la période ${periodParam}`);
          }
          
          setProductDetails({
            ...details,
            nextBillingDate: billingDate // Utiliser notre date calculée au lieu de celle du ProductManager
          });
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
        setError(error instanceof Error ? error.message : 'Erreur inconnue');
        setIsLoading(false);
      }
    };
    
    initializeProductManager();
  }, [planParam, periodParam, tokens, isOneTime]);
  
  // Calculer les prix lorsque les tokens supplémentaires changent
  useEffect(() => {
    if (productDetails) {
      const tokenPrice = productDetails.additionalTokenPrice;
      const newAdditionalTokensPrice = additionalTokens * tokenPrice;
      setAdditionalTokensPrice(newAdditionalTokensPrice);
      setTotalPrice(productDetails.price + newAdditionalTokensPrice);
    }
  }, [additionalTokens, productDetails]);
  
  // Obtenir le libellé de la période
  const translatePeriod = (period: string) => {
    switch (period?.toLowerCase()) {
      case 'monthly': return 'mensuelle';
      case 'bi-weekly': return 'bi-hebdomadaire';
      case 'biweekly': return 'bi-hebdomadaire';
      case 'quarterly': return 'trimestrielle';
      case 'yearly': return 'annuelle';
      case 'annualy': return 'annuelle';
      case 'one-time': return 'paiement unique';
      default: return period || '';
    }
  };
  
  // Obtenir le nom du plan à afficher
  const getPlanDisplayName = (planId: string | null) => {
    switch(planId) {
      case 'lite': return 'Lite';
      case 'basic': return 'Basic';
      case 'advanced': return 'Advanced';
      case 'pro': return 'Pro';
      case 'pay-as-you-go': return 'Pay-as-you-go';
      default: return planId || '';
    }
  };
  
  // Contenu des pages légales
  const renderLegalContent = (content: any) => {
    if (!content || !content.content) return null;
    
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{content.title}</h2>
        {content.content.map((section: any, index: number) => (
          <div key={index} className="mb-4">
            <h3 className="text-md font-medium mb-2">{section.title}</h3>
            <p className="text-sm text-gray-300 whitespace-pre-line">{section.text}</p>
          </div>
        ))}
      </div>
    );
  };
  
  // Procéder au paiement
  const proceedToPayment = () => {
    if (pendingCheckoutLink) {
      window.location.href = pendingCheckoutLink;
    }
  };
  
  // Soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vérifications des conditions
    if (!acceptedTerms || !acceptedAgeVerification) {
      alert('Veuillez accepter les conditions requises pour continuer');
      return;
    }
    
    // Vérifier le consentement pour l'abonnement récurrent
    if (!isOneTime && !acceptedRecurringPayment) {
      alert('Veuillez accepter le renouvellement automatique pour continuer');
      return;
    }
    
    if (!productManager || !productDetails) {
      alert('Erreur lors de la préparation de la commande');
      return;
    }
    
    try {
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
        const tokenPackId = productManager.getTokenPackId(planParam || '', additionalTokens);
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
      
      // 5. Pour les abonnements, afficher la confirmation
      if (!isOneTime) {
        setPendingCheckoutLink(checkoutUrl);
        setShowSubscriptionConfirmation(true);
      } else {
        // Pour les achats uniques, rediriger directement
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error('Erreur lors de la construction de l\'URL de checkout:', error);
      alert('Une erreur est survenue lors de la préparation de la commande');
    }
  };
  
  // Si en cours de chargement
  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-adfi-blue-600"></div>
      </div>
    );
  }
  
  // Si erreur
  if (error) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-6">
        <div className="text-red-600 text-xl font-semibold mb-4">Erreur</div>
        <div className="text-center text-adfi-slate-700">{error}</div>
        <Button className="mt-8" onClick={() => window.location.href = '/pricing'}>
          Retour à la page tarifs
        </Button>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-adfi-slate-50 py-24">
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-5"></div>
      <div className="absolute top-40 right-10 w-64 h-64 rounded-full bg-adfi-blue-100/20 blur-3xl"></div>
      <div className="absolute bottom-40 left-10 w-80 h-80 rounded-full bg-adfi-blue-100/30 blur-3xl"></div>
      
      <div className="container max-w-3xl mx-auto px-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl border border-adfi-slate-200 p-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center px-4 py-2 bg-adfi-blue-50 text-adfi-blue-600 rounded-full mb-6">
              <CreditCard className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Récapitulatif de commande</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-adfi-slate-900 mb-4">
              Votre <span className="text-adfi-blue-600">commande</span>
            </h1>
            
            <p className="text-lg text-adfi-slate-600 max-w-xl mx-auto">
              {isOneTime 
                ? "Vérifiez et confirmez l'achat de vos tokens avant de procéder au paiement." 
                : "Vérifiez et confirmez les détails de votre commande avant de procéder au paiement."
              }
            </p>
          </div>
          
          {productDetails && (
            <div className="space-y-6 mb-8">
              {/* Détails du produit */}
              <div className="bg-adfi-slate-50 rounded-xl p-6 border border-adfi-slate-200">
                <h3 className="text-lg font-semibold text-adfi-slate-900 mb-4">
                  {isOneTime ? "Détails de l'achat de tokens" : "Détails du plan"}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {!isOneTime && (
                    <div>
                      <div className="text-sm text-adfi-slate-600 mb-1">Plan</div>
                      <div className="text-adfi-slate-900 font-medium">{getPlanDisplayName(planParam)}</div>
                    </div>
                  )}
                  
                  {!isOneTime && (
                    <div>
                      <div className="text-sm text-adfi-slate-600 mb-1">Facturation</div>
                      <div className="text-adfi-slate-900 font-medium">
                        {translatePeriod(periodParam || '')}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <div className="text-sm text-adfi-slate-600 mb-1">Tokens inclus</div>
                    <div className="text-adfi-slate-900 font-medium">{productDetails.includedTokens} tokens</div>
                  </div>
                  
                  {isOneTime && (
                    <div>
                      <div className="text-sm text-adfi-slate-600 mb-1">Prix unitaire</div>
                      <div className="text-adfi-slate-900 font-medium">0,35€ par token</div>
                    </div>
                  )}
                  
                  {!isOneTime && (
                    <div>
                      <div className="text-sm text-adfi-slate-600 mb-1">Prochaine facturation</div>
                      <div className="text-adfi-slate-900 font-medium">{nextBillingDate}</div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Tokens supplémentaires pour les abonnements - N'afficher que pour les abonnements */}
              {!isOneTime && (
                <div className="bg-adfi-slate-50 rounded-xl p-6 border border-adfi-slate-200">
                  <h3 className="text-lg font-semibold text-adfi-slate-900 mb-4">Tokens supplémentaires (optionnel)</h3>
                  
                  <p className="text-sm text-adfi-slate-600 mb-4">
                    Ajoutez des tokens supplémentaires à votre abonnement pour {productDetails.additionalTokenPrice.toFixed(2)}€ par token.
                  </p>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-adfi-slate-700 mb-1">
                      Quantité de tokens supplémentaires
                    </label>
                    <Select
                      value={additionalTokens.toString()}
                      onValueChange={(value) => setAdditionalTokens(parseInt(value, 10))}
                    >
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Sélectionnez une quantité" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="0" className="text-adfi-slate-800">Aucun token supplémentaire</SelectItem>
                        {availableTokenOptions.map(option => (
                          <SelectItem key={option} value={option.toString()} className="text-adfi-slate-800">
                            {option} tokens ({(option * productDetails.additionalTokenPrice).toFixed(2)}€)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
              
              {/* Récapitulatif des prix */}
              <div className="bg-adfi-blue-50 rounded-xl p-6 border border-adfi-blue-100">
                <h3 className="text-lg font-semibold text-adfi-slate-900 mb-4">Récapitulatif</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-adfi-slate-600">
                      {isOneTime ? `${productDetails.includedTokens} tokens` : `Plan ${planParam === 'pay-as-you-go' ? '(tokens)' : ''}`}
                    </span>
                    <span className="text-adfi-slate-900 font-medium">{productDetails.price.toFixed(2)}€</span>
                  </div>
                  
                  {additionalTokens > 0 && !isOneTime && (
                    <div className="flex justify-between">
                      <span className="text-adfi-slate-600">{additionalTokens} tokens supplémentaires</span>
                      <span className="text-adfi-slate-900 font-medium">{additionalTokensPrice.toFixed(2)}€</span>
                    </div>
                  )}
                </div>
                
                <div className="border-t border-adfi-blue-200 pt-4 mt-4">
                  <div className="flex justify-between">
                    <span className="text-adfi-slate-900 font-semibold">Total</span>
                    <span className="text-adfi-blue-600 font-bold text-lg">{totalPrice.toFixed(2)}€</span>
                  </div>
                  
                  {!isOneTime && (
                    <div className="text-xs text-adfi-slate-500 mt-1 text-right">
                      Facturation {translatePeriod(periodParam || '')}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Formulaire de commande */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white rounded-xl p-6 border border-adfi-slate-200">
                  <h3 className="text-lg font-semibold text-adfi-slate-900 mb-4">Vos informations</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-adfi-slate-700 mb-1">
                        Prénom *
                      </label>
                      <Input
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Votre prénom"
                        required
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-adfi-slate-700 mb-1">
                        Nom *
                      </label>
                      <Input
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Votre nom"
                        required
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-adfi-slate-700 mb-1">
                      Email *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre.email@exemple.com"
                      required
                      className="w-full"
                    />
                  </div>
                </div>
                
                {/* Conditions */}
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Checkbox 
                      id="terms" 
                      className="mt-1" 
                      checked={acceptedTerms}
                      onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
                      required
                    />
                    <div className="ml-3">
                      <label htmlFor="terms" className="text-sm text-adfi-slate-700 cursor-pointer">
                        J'accepte les <button type="button" className="text-adfi-blue-600 underline" onClick={() => setOpenDialog('terms')}>Conditions d'utilisation</button> et la <button type="button" className="text-adfi-blue-600 underline" onClick={() => setOpenDialog('privacy')}>Politique de confidentialité</button> *
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Checkbox 
                      id="age" 
                      className="mt-1" 
                      checked={acceptedAgeVerification}
                      onCheckedChange={(checked) => setAcceptedAgeVerification(checked === true)}
                      required
                    />
                    <div className="ml-3">
                      <label htmlFor="age" className="text-sm text-adfi-slate-700 cursor-pointer">
                        Je certifie avoir au moins 18 ans *
                      </label>
                    </div>
                  </div>
                  
                  {/* Checkbox pour le consentement explicite de l'abonnement automatique */}
                  {!isOneTime && (
                    <div className="flex items-start">
                      <Checkbox 
                        id="recurring" 
                        className="mt-1" 
                        checked={acceptedRecurringPayment}
                        onCheckedChange={(checked) => setAcceptedRecurringPayment(checked === true)}
                        required
                      />
                      <div className="ml-3">
                        <label htmlFor="recurring" className="text-sm text-adfi-slate-700 cursor-pointer">
                          J'accepte explicitement que ma carte soit débitée de {productDetails.price.toFixed(2)}€ automatiquement 
                          {periodParam?.toLowerCase() === 'monthly' && " chaque mois"}
                          {periodParam?.toLowerCase() === 'quarterly' && " chaque trimestre"}
                          {(periodParam?.toLowerCase() === 'yearly' || periodParam?.toLowerCase() === 'annualy') && " chaque année"}
                          {(periodParam?.toLowerCase() === 'bi-weekly' || periodParam?.toLowerCase() === 'biweekly') && " toutes les deux semaines"}
                          {" jusqu'à la résiliation de mon abonnement *"}
                        </label>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-start">
                    <Checkbox 
                      id="newsletter" 
                      className="mt-1" 
                      checked={acceptedNewsletter}
                      onCheckedChange={(checked) => setAcceptedNewsletter(checked === true)}
                    />
                    <div className="ml-3">
                      <label htmlFor="newsletter" className="text-sm text-adfi-slate-700 cursor-pointer">
                        J'accepte de recevoir des informations et offres par email
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button type="submit" className="w-full py-6 text-lg bg-adfi-blue-600 hover:bg-adfi-blue-700">
                    Procéder au paiement
                  </Button>
                  
                  <div className="flex items-center justify-center mt-4 text-xs text-adfi-slate-500">
                    <Shield className="w-3 h-3 mr-1" />
                    <span>Paiement sécurisé</span>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
      
      {/* Dialogs pour les conditions légales */}
      <Dialog open={openDialog === 'terms'} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto custom-scrollbar">
          <DialogHeader>
            <DialogTitle>Conditions d'utilisation</DialogTitle>
          </DialogHeader>
          {renderLegalContent(termsContent)}
        </DialogContent>
      </Dialog>
      
      <Dialog open={openDialog === 'privacy'} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto custom-scrollbar">
          <DialogHeader>
            <DialogTitle>Politique de confidentialité</DialogTitle>
          </DialogHeader>
          {renderLegalContent(privacyContent)}
        </DialogContent>
      </Dialog>
      
      <Dialog open={openDialog === 'refund'} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto custom-scrollbar">
          <DialogHeader>
            <DialogTitle>Politique de remboursement</DialogTitle>
          </DialogHeader>
          {renderLegalContent(refundContent)}
        </DialogContent>
      </Dialog>
      
      {/* Dialog de confirmation d'abonnement */}
      <Dialog open={showSubscriptionConfirmation} onOpenChange={setShowSubscriptionConfirmation}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmation d'abonnement</DialogTitle>
            <DialogDescription>
              Vous êtes sur le point de souscrire à un abonnement avec renouvellement automatique.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            {additionalTokens > 0 && (
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                <p className="text-sm font-medium text-amber-700 mb-1">Achat ponctuel (paiement unique)</p>
                <p className="text-sm text-adfi-slate-600">
                  {additionalTokens} tokens supplémentaires pour {additionalTokensPrice.toFixed(2)}€
                </p>
                <p className="text-xs text-adfi-slate-500 mt-1">
                  Ce montant sera facturé une seule fois aujourd'hui.
                </p>
              </div>
            )}
            
            <div className="bg-adfi-blue-50 p-3 rounded-lg border border-adfi-blue-100">
              <p className="text-sm font-medium text-adfi-blue-700 mb-1">Abonnement récurrent</p>
              <p className="text-sm text-adfi-slate-600">
                {productDetails?.price.toFixed(2)}€ avec renouvellement {translatePeriod(periodParam || '')}
              </p>
              <p className="text-xs text-adfi-slate-500 mt-1">
                Ce montant sera débité automatiquement à partir du {nextBillingDate}.
              </p>
            </div>
            
            <div className="border-t border-adfi-slate-200 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-adfi-slate-700">Total aujourd'hui :</span>
                <span className="text-adfi-blue-600 font-bold">{totalPrice.toFixed(2)}€</span>
              </div>
            </div>
            
            <p className="text-sm text-adfi-slate-600">
              Vous pourrez annuler votre abonnement à tout moment depuis votre espace client.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSubscriptionConfirmation(false)}>
              Annuler
            </Button>
            <Button onClick={proceedToPayment} className="bg-adfi-blue-600 hover:bg-adfi-blue-700">
              Confirmer et payer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function PreCheckout() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-adfi-blue-600"></div>
      </div>
    }>
      <PreCheckoutContent />
    </Suspense>
  );
} 