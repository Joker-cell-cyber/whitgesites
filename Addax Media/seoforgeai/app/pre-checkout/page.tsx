'use client';

import { useState, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/app/components/ui/dialog";
import { getTokenCheckoutLink, getSubscriptionCheckoutLink, tokenCheckoutLinks, useProductManager } from '@/app/config/checkout-links';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { legalContent as legalContentData } from '@/app/legal-pages/legal';
import { privacyContent } from '@/app/legal-pages/privacy';
import { refundContent } from '@/app/legal-pages/refund';
import { termsContent } from '@/app/legal-pages/terms';
import { ProductManager, BillingPeriod } from '@/lib/product-utils';

function PreCheckoutContent() {
  const searchParams = useSearchParams();
  const [additionalTokens, setAdditionalTokens] = useState(0);
  const [availableTokenOptions, setAvailableTokenOptions] = useState<number[]>([]);
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isPaymentConsented, setIsPaymentConsented] = useState(false);
  const [isRecurringPaymentAccepted, setIsRecurringPaymentAccepted] = useState(false);
  const [isNewsletterAccepted, setIsNewsletterAccepted] = useState(false);
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const [showSubscriptionConfirmation, setShowSubscriptionConfirmation] = useState(false);
  const [pendingCheckoutLink, setPendingCheckoutLink] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isOneTimePayment, setIsOneTimePayment] = useState(false);
  const { productManager, isInitialized } = useProductManager();

  const plan = searchParams.get('plan') || '';
  const period = searchParams.get('period') as BillingPeriod || 'monthly';
  const basePrice = parseFloat(searchParams.get('price') || '0');
  const baseTokens = parseInt(searchParams.get('tokens') || '0');
  const tokenPrice = parseFloat(searchParams.get('tokenPrice') || '0');

  const additionalTokensPrice = additionalTokens * tokenPrice;
  const totalPrice = basePrice + additionalTokensPrice;

  // Calculer la date du prochain débit
  const getNextBillingDate = () => {
    const now = new Date();
    const nextDate = new Date(now);
    
    switch (period) {
      case 'biweekly':
        nextDate.setDate(now.getDate() + 14);
        break;
      case 'monthly':
        nextDate.setMonth(now.getMonth() + 1);
        break;
      case 'quarterly':
        nextDate.setMonth(now.getMonth() + 3);
        break;
      case 'annual':
        nextDate.setFullYear(now.getFullYear() + 1);
        break;
    }
    
    return nextDate.toLocaleDateString('fr-FR');
  };

  useEffect(() => {
    // Récupérer les options de tokens disponibles à partir de tokenCheckoutLinks
    console.log('Plan détecté:', plan, 'Est à la carte:', plan === 'à la carte' || isOneTimePayment);
    console.log('Paramètres de l\'URL:', {
      plan,
      period,
      price: basePrice,
      tokens: baseTokens,
      tokenPrice
    });
    
    const tokenOptions = Object.keys(tokenCheckoutLinks).map(key => parseInt(key)).sort((a, b) => a - b);
    setAvailableTokenOptions(tokenOptions);
  }, [plan, period, basePrice, baseTokens, tokenPrice, isOneTimePayment]);

  useEffect(() => {
    setIsOneTimePayment(
      plan === 'à la carte' || 
      plan.toLowerCase() === 'à la carte' || 
      plan.toLowerCase() === 'a la carte' || 
      period === 'once' || 
      period === 'one-time' ||
      searchParams.get('source') === 'tokens'
    );
    
    console.log('Paramètres détectés:', {
      plan,
      period,
      isOneTime: plan === 'à la carte' || plan.toLowerCase() === 'à la carte' || period === 'once' || period === 'one-time'
    });
  }, [plan, period, searchParams]);

  const getPlanTitle = (planName: string): string => {
    return planName;
  };

  const getPeriodLabel = (period: string) => {
    switch (period) {
      case 'biweekly': return 'toutes les 2 semaines';
      case 'monthly': return 'par mois';
      case 'quarterly': return 'par trimestre';
      case 'annual': return 'par an';
      default: return '';
    }
  };

  const proceedToPayment = () => {
    if (pendingCheckoutLink) {
      window.location.href = pendingCheckoutLink;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('handleSubmit appelé. Validation...');
    console.log('isAgeVerified:', isAgeVerified);
    console.log('isTermsAccepted:', isTermsAccepted);
    console.log('isPaymentConsented:', isPaymentConsented);
    console.log('isRecurringPaymentAccepted:', isRecurringPaymentAccepted);
    
    if (!isAgeVerified || !isTermsAccepted) {
      alert('Veuillez accepter les conditions obligatoires pour continuer.');
      return;
    }
    
    // Vérifier si c'est un abonnement et que la case de consentement récurrent est cochée
    if (plan !== 'à la carte' && !isOneTimePayment && !isRecurringPaymentAccepted) {
      alert('Veuillez accepter les conditions de paiement récurrent pour continuer.');
      return;
    }
    
    // Vérifier si on a besoin des informations personnelles
    if ((plan !== 'à la carte' && !isOneTimePayment) && (!firstName || !lastName || !email)) {
      alert('Veuillez remplir tous les champs obligatoires pour l\'abonnement.');
      return;
    }
    
    // Stocker les informations utilisateur dans localStorage
    if (firstName && lastName && email) {
      localStorage.setItem('userInfo', JSON.stringify({
        firstName,
        lastName,
        email,
        newsletter: isNewsletterAccepted
      }));
    }
    
    // Déterminer le lien de checkout approprié
    let checkoutLink: string | undefined;
    
    console.log("Génération du lien de checkout avec les paramètres:", {
      plan,
      period,
      additionalTokens,
      isOneTimePayment
    });
    
    try {
      if (!isInitialized) {
        console.log("ProductManager n'est pas encore initialisé, initialisation...");
        productManager.initialize();
      }
    
    if (plan.toLowerCase() === 'à la carte' || plan.toLowerCase() === 'a la carte' || plan.toLowerCase() === 'pay-as-you-go' || isOneTimePayment) {
      // Pour les achats à la carte ou uniques
      const tokenCount = searchParams.get('source') === 'tokens' 
        ? parseInt(searchParams.get('tokens') || '0') 
        : baseTokens;
        
        // Obtenir l'ID du produit de tokens
        const tokenPackId = productManager.getTokenPackId('à la carte', tokenCount);
        
        if (!tokenPackId) {
          throw new Error(`Aucun ID produit trouvé pour ${tokenCount} tokens à la carte`);
        }
        
        // Générer l'URL de checkout
        checkoutLink = productManager.buildCheckoutUrl({ tokenPackId });
      console.log("Lien de checkout pour tokens:", checkoutLink);
    } else {
      // Pour les abonnements
        console.log('Génération URL abonnement avec:', plan, period, additionalTokens);
        
        // Obtenir l'ID du produit d'abonnement
        const subscriptionId = productManager.getSubscriptionId(plan, period);
        
        if (!subscriptionId) {
          throw new Error(`Aucun ID produit trouvé pour l'abonnement ${plan} (${period})`);
        }
        
        // Préparer l'objet pour l'URL
        const products: { subscriptionId: string; tokenPackId?: string } = {
          subscriptionId
        };
        
        // Ajouter des tokens supplémentaires si nécessaire
        if (additionalTokens > 0) {
          const tokenPackId = productManager.getTokenPackId(plan, additionalTokens);
          if (tokenPackId) {
            products.tokenPackId = tokenPackId;
          } else {
            console.warn(`Aucun ID produit trouvé pour ${additionalTokens} tokens supplémentaires pour le plan ${plan}`);
          }
        }
        
        // Générer l'URL de checkout
        checkoutLink = productManager.buildCheckoutUrl(products);
        console.log("Lien de checkout pour abonnement:", checkoutLink);
      }
    } catch (error) {
      console.error("Erreur lors de la génération de l'URL avec ProductManager:", error);
      
      // Fallback sur les fonctions existantes en cas d'erreur
      console.log("Utilisation des fonctions de fallback...");
      if (plan.toLowerCase() === 'à la carte' || plan.toLowerCase() === 'a la carte' || plan.toLowerCase() === 'pay-as-you-go' || isOneTimePayment) {
        const tokenCount = searchParams.get('source') === 'tokens' 
          ? parseInt(searchParams.get('tokens') || '0') 
          : baseTokens;
        console.log(`Fallback - Achat à la carte avec ${tokenCount} tokens`);
        checkoutLink = getTokenCheckoutLink(tokenCount);
      } else {
        console.log(`Fallback - Abonnement ${plan} avec période ${period}`);
        checkoutLink = getSubscriptionCheckoutLink(
          plan, 
          period, 
          additionalTokens
        );
      }
    }
    
    // Si on a un lien de checkout, redirection
    if (checkoutLink) {
      try {
        console.log('URL de checkout finale:', checkoutLink);
        window.location.href = checkoutLink;
      } catch (error) {
        console.error('Erreur lors de la redirection vers l\'URL de checkout:', error);
        alert('Une erreur est survenue lors de la préparation du paiement. Veuillez réessayer plus tard.');
      }
    } else {
      // Fallback si aucun lien n'est configuré
      console.error('Aucun lien de checkout valide généré');
      alert('Une erreur est survenue. Veuillez réessayer plus tard.');
    }
  };

  const legalContent = {
    terms: termsContent.content.map(section => `${section.title}\n${section.text}`).join('\n\n'),
    privacy: privacyContent.content.map(section => `${section.title}\n${section.text}`).join('\n\n'),
    refund: refundContent.content.map(section => `${section.title}\n${section.text}`).join('\n\n')
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF7ED] to-white py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-xl border border-[#F97316]/20">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#7C2D12] mb-6 sm:mb-8">Récapitulatif de votre commande</h1>
          
          <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-[#FFEDD5]/60 rounded-lg">
              <div className="mb-3 sm:mb-0">
                <h2 className="text-xl font-semibold text-[#7C2D12]">{getPlanTitle(plan)}</h2>
                <p className="text-[#7C2D12]/80">
                  {plan === "à la carte" 
                    ? "Achat unique"
                    : `Abonnement ${getPeriodLabel(period || '')}`}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-2xl font-bold text-[#7C2D12]">{basePrice}€</p>
                <p className="text-sm text-[#7C2D12]/80">{baseTokens} tokens inclus</p>
              </div>
            </div>

            {tokenPrice > 0 && plan !== "à la carte" && (
              <div className="p-4 bg-[#F97316]/10 rounded-lg">
                <h3 className="text-lg font-medium text-[#7C2D12] mb-2">Pack de tokens supplémentaires</h3>
                <p className="text-sm text-[#7C2D12]/80 mb-4">
                  Les tokens supplémentaires sont à usage unique et seront facturés une seule fois.
                  Ils n'affectent pas votre abonnement mensuel.
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Select
                    value={additionalTokens.toString()}
                    onValueChange={(value) => setAdditionalTokens(parseInt(value))}
                  >
                    <SelectTrigger className="w-full sm:w-32 bg-white border-[#F97316]/50 text-[#7C2D12]">
                      <SelectValue placeholder="Tokens" className="text-[#7C2D12]" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      {availableTokenOptions.map((option) => (
                        <SelectItem key={option} value={option.toString()}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex-1">
                    <div className="text-sm text-[#7C2D12]/80">Prix unitaire: {tokenPrice}€</div>
                    <div className="font-medium text-[#7C2D12]">
                      Total: {additionalTokensPrice.toFixed(2)}€
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="p-4 bg-[#F97316]/5 rounded-lg">
              <div className="flex justify-between items-center border-b border-[#F97316]/10 pb-3 mb-3">
                <span className="text-[#7C2D12]">Sous-total</span>
                <span className="font-medium text-[#7C2D12]">{basePrice}€</span>
                </div>
              
              {additionalTokens > 0 && (
                <div className="flex justify-between items-center border-b border-[#F97316]/10 pb-3 mb-3">
                  <span className="text-[#7C2D12]">Tokens supplémentaires</span>
                  <span className="font-medium text-[#7C2D12]">{additionalTokensPrice.toFixed(2)}€</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="font-semibold text-[#7C2D12]">Total</span>
                <span className="text-xl font-bold text-[#7C2D12]">{totalPrice.toFixed(2)}€</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Afficher les champs d'informations personnelles uniquement pour les abonnements */}
            {(plan !== 'à la carte' && !isOneTimePayment) && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#7C2D12]">Vos informations</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-[#7C2D12] mb-1">
                      Prénom <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="firstName"
                      placeholder="Votre prénom"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="w-full border-[#F97316]/30 focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-[#7C2D12] mb-1">
                      Nom <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="lastName"
                      placeholder="Votre nom"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="w-full border-[#F97316]/30 focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#7C2D12] mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Votre adresse email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border-[#F97316]/30 focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]"
                  />
                </div>
              </div>
            )}

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#7C2D12]">Conditions légales</h3>
                
              <div className="flex items-start space-x-3">
                <Checkbox
                      id="age-verification" 
                  checked={isAgeVerified}
                  onCheckedChange={(checked) => setIsAgeVerified(checked as boolean)}
                  className="mt-1 data-[state=checked]:bg-[#F97316] data-[state=checked]:border-[#F97316]"
                />
                <label htmlFor="age-verification" className="text-sm text-[#7C2D12]">
                  Je certifie avoir au moins 18 ans <span className="text-red-500">*</span>
                </label>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                      id="terms-acceptance" 
                  checked={isTermsAccepted}
                  onCheckedChange={(checked) => setIsTermsAccepted(checked as boolean)}
                  className="mt-1 data-[state=checked]:bg-[#F97316] data-[state=checked]:border-[#F97316]"
                />
                <div className="text-sm text-[#7C2D12]">
                  J'accepte les{" "}
                        <button
                          type="button"
                    onClick={() => setOpenDialog("terms")}
                    className="text-[#F97316] underline hover:text-[#EA580C]"
                        >
                    conditions générales d'utilisation
                  </button>
                  {" "}et la{" "}
                        <button
                          type="button"
                    onClick={() => setOpenDialog("privacy")}
                    className="text-[#F97316] underline hover:text-[#EA580C]"
                        >
                    politique de confidentialité
                  </button>
                  {" "}de SeoForgeAI <span className="text-red-500">*</span>
                </div>
              </div>
              
              {/* Consentement explicite pour les abonnements récurrents */}
              {(plan !== 'à la carte' && !isOneTimePayment) && (
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="recurring-payment-consent"
                    checked={isRecurringPaymentAccepted}
                    onCheckedChange={(checked) => setIsRecurringPaymentAccepted(checked as boolean)}
                    className="mt-1 data-[state=checked]:bg-[#F97316] data-[state=checked]:border-[#F97316]"
                  />
                  <label htmlFor="recurring-payment-consent" className="text-sm text-[#7C2D12]">
                    J'autorise SeoForgeAI à débiter ma carte de <span className="font-semibold">{basePrice}€</span> {getPeriodLabel(period)} 
                    de façon récurrente. Le prochain débit sera effectué le <span className="font-semibold">{getNextBillingDate()}</span>. 
                    Je comprends que je peux annuler mon abonnement à tout moment depuis mon espace client.
                    <span className="text-red-500"> *</span>
                  </label>
                </div>
              )}
              
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="payment-consent"
                  checked={isPaymentConsented}
                  onCheckedChange={(checked) => setIsPaymentConsented(checked as boolean)}
                  className="mt-1 data-[state=checked]:bg-[#F97316] data-[state=checked]:border-[#F97316]"
                />
                <div className="text-sm text-[#7C2D12]">
                  J'ai pris connaissance de la{" "}
                        <button
                          type="button"
                    onClick={() => setOpenDialog("refund")}
                    className="text-[#F97316] underline hover:text-[#EA580C]"
                        >
                    politique de remboursement
                  </button>
                    </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                      id="newsletter-acceptance" 
                  checked={isNewsletterAccepted}
                  onCheckedChange={(checked) => setIsNewsletterAccepted(checked as boolean)}
                  className="mt-1 data-[state=checked]:bg-[#F97316] data-[state=checked]:border-[#F97316]"
                />
                <label htmlFor="newsletter-acceptance" className="text-sm text-[#7C2D12]">
                  Je souhaite recevoir la newsletter et les offres promotionnelles
                </label>
              </div>
            </div>

            <div className="pt-4">
            <Button
              type="submit"
                className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold py-3 rounded-lg"
            >
                Procéder au paiement ({totalPrice.toFixed(2)}€)
            </Button>
              <p className="text-xs text-center text-gray-500 mt-2">
                Des frais de transaction peuvent s'appliquer selon votre mode de paiement.
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Dialogues pour les mentions légales */}
      <Dialog open={openDialog === "terms"} onOpenChange={(open) => !open && setOpenDialog(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Conditions Générales d'Utilisation</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm text-gray-700 whitespace-pre-wrap">
            {legalContent.terms}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(null)}>Fermer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openDialog === "privacy"} onOpenChange={(open) => !open && setOpenDialog(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Politique de Confidentialité</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm text-gray-700 whitespace-pre-wrap">
            {legalContent.privacy}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(null)}>Fermer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={openDialog === "refund"} onOpenChange={(open) => !open && setOpenDialog(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Politique de Remboursement</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm text-gray-700 whitespace-pre-wrap">
            {legalContent.refund}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(null)}>Fermer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogue de confirmation d'abonnement */}
      <Dialog open={showSubscriptionConfirmation} onOpenChange={setShowSubscriptionConfirmation}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmation d'abonnement</DialogTitle>
            <DialogDescription>
              Vous allez souscrire à un abonnement qui sera renouvelé automatiquement.
            </DialogDescription>
          </DialogHeader>
          <div className="text-sm text-gray-700">
            <p>
              En cliquant sur "Continuer", vous acceptez d'être débité de {totalPrice.toFixed(2)}€ {getPeriodLabel(period || '')}.
              Vous pouvez annuler votre abonnement à tout moment depuis votre espace client.
            </p>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setShowSubscriptionConfirmation(false)}
              className="sm:flex-1"
            >
              Annuler
            </Button>
            <Button 
              onClick={proceedToPayment}
              className="bg-[#F97316] hover:bg-[#EA580C] sm:flex-1"
            >
              Continuer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function PreCheckout() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <PreCheckoutContent />
    </Suspense>
  );
} 