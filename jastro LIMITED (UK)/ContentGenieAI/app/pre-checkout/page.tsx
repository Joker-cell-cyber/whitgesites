'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/app/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { legalContent as legalContentData } from '@/app/legal-pages/legal';
import { privacyContent } from '@/app/legal-pages/privacy';
import { refundContent } from '@/app/legal-pages/refund';
import { termsContent } from '@/app/legal-pages/terms';
import { ProductManager, ProductDetails } from '@/lib/product-utils';

export default function PreCheckout() {
  const searchParams = useSearchParams();
  const [additionalTokens, setAdditionalTokens] = useState(0);
  const [availableTokenOptions, setAvailableTokenOptions] = useState<number[]>([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isNewsletterAccepted, setIsNewsletterAccepted] = useState(false);
  const [isImmediateChargeAccepted, setIsImmediateChargeAccepted] = useState(false);
  const [isRecurringChargeAccepted, setIsRecurringChargeAccepted] = useState(false);
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const [showSubscriptionConfirmation, setShowSubscriptionConfirmation] = useState(false);
  const [productManager, setProductManager] = useState<ProductManager | null>(null);
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  // Récupérer les paramètres d'URL
  const planParam = searchParams.get('plan');
  const periodParam = searchParams.get('period');
  const tokens = searchParams.get('tokens');
  
  // Déterminer si c'est un achat unique
  const isOneTime = periodParam === 'one-time';

  // Initialiser le ProductManager et charger les détails du produit
  useEffect(() => {
    async function initializeProductManager() {
      try {
        setLoading(true);
        const manager = ProductManager.getInstance();
        await manager.initialize();
        setProductManager(manager);
        
        // Pour les achats one-time (pay-as-you-go), pas besoin de rechercher un abonnement
        if (isOneTime && planParam === 'pay-as-you-go' && tokens) {
          // Créer un objet de détails de produit pour les tokens
          const tokenCount = parseInt(tokens);
          setProductDetails({
            id: manager.getTokenPackId(planParam, tokenCount) || '',
            name: `${tokenCount} TOKEN PACK`,
            price: tokenCount * 0.90, // Prix fixe pour les tokens à la carte
            nextBillingDate: '',      // Pas de prochaine facturation
            includedTokens: tokenCount,
            additionalTokenPrice: 0   // Pas de tokens supplémentaires pour les achats à la carte
          });
        } 
        // Pour les abonnements, récupérer les détails complets
        else if (planParam && periodParam && !isOneTime) {
          const details = manager.getProductDetails(planParam, periodParam);
          if (details) {
            setProductDetails(details);
          } else {
            setError(`Produit non trouvé pour le plan ${planParam} et la période ${periodParam}`);
          }
        } else {
          setError('Paramètres manquants dans l\'URL');
        }
      } catch (error) {
        console.error('Erreur lors de l\'initialisation:', error);
        setError('Une erreur est survenue lors du chargement des données');
      } finally {
        setLoading(false);
      }
    }
    
    initializeProductManager();
  }, [planParam, periodParam, tokens, isOneTime]);

  // Fonction pour traduire la période en français
  const translatePeriod = (period: string): string => {
    switch (period) {
      case 'monthly': return 'mensuelle';
      case 'quarterly': return 'trimestrielle';
      case 'bi-weekly': return 'bi-hebdomadaire';
      case 'biweekly': return 'bi-hebdomadaire';
      case 'annualy': return 'annuelle';
      case 'yearly': return 'annuelle';
      case 'one-time': return 'paiement unique';
      default: return period;
    }
  };

  // Calculer le prix total
  const basePrice = productDetails?.price || 0;
  const additionalTokenPrice = productDetails?.additionalTokenPrice || 0;
  const additionalTokensPrice = additionalTokens * additionalTokenPrice;
  const totalPrice = basePrice + additionalTokensPrice;

  // Soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vérifications des conditions
    if (!isAgeVerified || !isTermsAccepted) {
      alert('Veuillez accepter les conditions requises pour continuer');
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
      
      // 1. Ajouter l'abonnement principal ou le pack de tokens
      if (isOneTime) {
        products.tokenPackId = productDetails.id;
      } else {
        products.subscriptionId = productDetails.id;
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
        localStorage.setItem('checkout_newsletter', isNewsletterAccepted ? '1' : '0');
      }
      
      // 5. Redirection directement vers l'URL de checkout
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Erreur lors de la construction de l\'URL de checkout:', error);
      alert('Une erreur est survenue lors de la préparation de la commande');
    }
  };

  const legalContent = {
    terms: termsContent.content.map(section => `${section.title}\n${section.text}`).join('\n\n'),
    privacy: privacyContent.content.map(section => `${section.title}\n${section.text}`).join('\n\n'),
    refund: refundContent.content.map(section => `${section.title}\n${section.text}`).join('\n\n')
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E3F4F9] to-[#F5FAFC] py-12 flex items-center justify-center">
        <div className="p-8 rounded-xl bg-white shadow-md">
          <h2 className="text-xl font-semibold text-[#0E2D3F] mb-4">Chargement en cours...</h2>
          <div className="w-8 h-8 border-4 border-[#1A7BA4] border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E3F4F9] to-[#F5FAFC] py-12 flex items-center justify-center">
        <div className="p-8 rounded-xl bg-white shadow-md max-w-md">
          <h2 className="text-xl font-semibold text-[#0E2D3F] mb-4">Une erreur est survenue</h2>
          <p className="text-[#667A8A] mb-6">{error}</p>
          <Button onClick={() => window.history.back()} className="w-full bg-[#1A7BA4]">
            Retour à la page précédente
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E3F4F9] to-[#F5FAFC] py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-[#BBE5EF]">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0E2D3F] mb-6 sm:mb-8">Récapitulatif de votre commande</h1>
          
          <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-[#F0F9FC] rounded-lg border border-[#BBE5EF]">
              <div className="mb-3 sm:mb-0">
                <h2 className="text-xl font-semibold text-[#0E2D3F]">{productDetails?.name || planParam}</h2>
                <p className="text-[#667A8A]">
                  {isOneTime 
                    ? "Achat unique"
                    : `Abonnement ${translatePeriod(periodParam || '')}`}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-2xl font-bold text-[#1A7BA4]">{basePrice.toFixed(2)}€</p>
                <p className="text-sm text-[#667A8A]">{productDetails?.includedTokens || 0} tokens inclus</p>
              </div>
            </div>

            {!isOneTime && additionalTokenPrice > 0 && (
              <div className="p-4 bg-[#E3F4F9] rounded-lg border border-[#BBE5EF]">
                <h3 className="text-lg font-medium text-[#0E2D3F] mb-2">Pack de tokens supplémentaires</h3>
                <p className="text-sm text-[#667A8A] mb-4">
                  Les tokens supplémentaires sont à usage unique et seront facturés une seule fois.
                  Ils n'affectent pas votre abonnement.
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Select
                    value={additionalTokens.toString()}
                    onValueChange={(value) => setAdditionalTokens(parseInt(value))}
                  >
                    <SelectTrigger className="w-full sm:w-32 bg-white">
                      <SelectValue placeholder="Tokens" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 overflow-y-auto">
                      <SelectItem value="0">0</SelectItem>
                      {availableTokenOptions.map((option) => (
                        <SelectItem key={option} value={option.toString()}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex-1 text-right">
                    {additionalTokens > 0 && (
                      <div>
                        <p className="text-lg font-semibold text-[#1A7BA4]">{additionalTokensPrice.toFixed(2)}€</p>
                        <p className="text-xs text-[#667A8A]">{additionalTokenPrice.toFixed(2)}€ par token</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            <div className="p-4 bg-white rounded-lg border border-[#BBE5EF]">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-[#0E2D3F]">Total</h3>
                <p className="text-2xl font-bold text-[#1A7BA4]">{totalPrice.toFixed(2)}€</p>
              </div>
              {!isOneTime && productDetails?.nextBillingDate && (
                <p className="text-sm text-[#667A8A] mt-2">
                  Prochaine date de facturation: {productDetails.nextBillingDate}
                </p>
              )}
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-[#0E2D3F]">Vos coordonnées</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-[#0E2D3F] mb-1">Prénom</label>
                  <Input 
                    id="firstName" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Votre prénom" 
                    required 
                    className="bg-white border-[#BBE5EF]" 
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-[#0E2D3F] mb-1">Nom</label>
                  <Input 
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Votre nom" 
                    required 
                    className="bg-white border-[#BBE5EF]" 
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#0E2D3F] mb-1">Email</label>
                <Input 
                  id="email" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre.email@exemple.com" 
                  required 
                  className="bg-white border-[#BBE5EF]" 
                />
              </div>
            </div>
            
            <div className="space-y-4 border-t border-[#BBE5EF] pt-6">
              <h2 className="text-xl font-semibold text-[#0E2D3F]">Conditions de vente</h2>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <Checkbox 
                    id="terms" 
                    checked={isTermsAccepted}
                    onCheckedChange={(checked) => setIsTermsAccepted(checked === true)}
                    className="mt-1"
                  />
                  <label htmlFor="terms" className="ml-3 text-sm text-[#0E2D3F]">
                    J'ai lu et j'accepte les {' '}
                    <button 
                      type="button"
                      onClick={() => setOpenDialog('terms')}
                      className="text-[#1A7BA4] underline"
                    >
                      conditions générales de vente
                    </button>
                    <span className="text-red-500"> *</span>
                  </label>
                </div>
                
                <div className="flex items-start">
                  <Checkbox 
                    id="age" 
                    checked={isAgeVerified}
                    onCheckedChange={(checked) => setIsAgeVerified(checked === true)}
                    className="mt-1"
                  />
                  <label htmlFor="age" className="ml-3 text-sm text-[#0E2D3F]">
                    Je confirme avoir au moins 18 ans
                    <span className="text-red-500"> *</span>
                  </label>
                </div>
                
                <div className="flex items-start">
                  <Checkbox 
                    id="newsletter" 
                    checked={isNewsletterAccepted}
                    onCheckedChange={(checked) => setIsNewsletterAccepted(checked === true)}
                    className="mt-1"
                  />
                  <label htmlFor="newsletter" className="ml-3 text-sm text-[#0E2D3F]">
                    Je souhaite recevoir les actualités et offres commerciales de ContentGenieAI
                  </label>
                </div>
                
                <div className="flex items-start">
                  <Checkbox 
                    id="immediate-charge" 
                    checked={isImmediateChargeAccepted}
                    onCheckedChange={(checked) => setIsImmediateChargeAccepted(checked === true)}
                    className="mt-1"
                  />
                  <label htmlFor="immediate-charge" className="ml-3 text-sm text-[#0E2D3F]">
                    Je comprends et j'accepte que le montant de {totalPrice.toFixed(2)}€ sera débité de mon compte immédiatement
                    <span className="text-red-500"> *</span>
                  </label>
                </div>
                
                {!isOneTime && (
                  <div className="flex items-start">
                    <Checkbox 
                      id="recurring-charge" 
                      checked={isRecurringChargeAccepted}
                      onCheckedChange={(checked) => setIsRecurringChargeAccepted(checked === true)}
                      className="mt-1"
                    />
                    <label htmlFor="recurring-charge" className="ml-3 text-sm text-[#0E2D3F]">
                      Je comprends et j'accepte que mon abonnement se renouvellera automatiquement tous les {translatePeriod(periodParam || '')} 
                      au prix de {basePrice.toFixed(2)}€ jusqu'à annulation
                      <span className="text-red-500"> *</span>
                    </label>
                  </div>
                )}
              </div>
            </div>
            
            <div className="pt-4">
              <Button type="submit" className="w-full bg-[#1A7BA4] hover:bg-[#156A90] text-lg py-6">
                Procéder au paiement - {totalPrice.toFixed(2)}€
              </Button>
              <p className="text-xs text-center text-[#667A8A] mt-2">
                Paiement sécurisé. Vous serez redirigé vers notre plateforme de paiement.
              </p>
            </div>
          </form>
        </div>
      </div>
      
      {/* Dialog pour les conditions générales */}
      <Dialog open={openDialog === 'terms'} onOpenChange={(open) => !open && setOpenDialog(null)}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Conditions Générales de Vente</DialogTitle>
          </DialogHeader>
          <div className="text-sm whitespace-pre-line">
            {legalContent.terms}
          </div>
          <DialogFooter>
            <Button onClick={() => setOpenDialog(null)}>Fermer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialog de confirmation pour les abonnements */}
      <Dialog open={showSubscriptionConfirmation} onOpenChange={setShowSubscriptionConfirmation}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmation d'abonnement</DialogTitle>
            <DialogDescription>
              Vous êtes sur le point de souscrire à un abonnement {translatePeriod(periodParam || '')}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p>Détails de votre abonnement :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{productDetails?.name}</li>
              <li>Prix : {basePrice.toFixed(2)}€ /{periodParam}</li>
              <li>Tokens inclus : {productDetails?.includedTokens}</li>
              {additionalTokens > 0 && (
                <li>Tokens supplémentaires : {additionalTokens} (+{additionalTokensPrice.toFixed(2)}€)</li>
              )}
              <li>Montant total aujourd'hui : {totalPrice.toFixed(2)}€</li>
              <li>Prochain prélèvement : {productDetails?.nextBillingDate}</li>
            </ul>
            
            <p className="text-sm text-[#667A8A]">
              Vous pouvez annuler votre abonnement à tout moment depuis votre espace client.
            </p>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setShowSubscriptionConfirmation(false)}>
              Annuler
            </Button>
            <Button 
              onClick={() => {
                setShowSubscriptionConfirmation(false);
                window.location.href = localStorage.getItem('pendingCheckoutUrl') || '';
              }}
              className="bg-[#1A7BA4]"
            >
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 