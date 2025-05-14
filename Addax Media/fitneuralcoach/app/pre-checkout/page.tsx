'use client';

import { useState, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/app/components/ui/dialog";
import { getTokenCheckoutLink, getSubscriptionCheckoutLink, tokenCheckoutLinks, useProductManager } from '@/app/config/checkout-links';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { termsContent } from '@/app/legal-pages/terms';
import { privacyContent } from '@/app/legal-pages/privacy';
import { refundContent } from '@/app/legal-pages/refund';
import { legalContent } from '@/app/legal-pages/legal';
import { ProductManager } from '@/lib/product-utils';

function PreCheckoutContent() {
  const searchParams = useSearchParams();
  const [additionalTokens, setAdditionalTokens] = useState(0);
  const [availableTokenOptions, setAvailableTokenOptions] = useState<number[]>([]);
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isNewsletterAccepted, setIsNewsletterAccepted] = useState(false);
  const [isBillingAccepted, setIsBillingAccepted] = useState(false);
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const [showSubscriptionConfirmation, setShowSubscriptionConfirmation] = useState(false);
  const [pendingCheckoutLink, setPendingCheckoutLink] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isOneTimePayment, setIsOneTimePayment] = useState(searchParams.get('plan') === 'à la carte' || searchParams.get('period') === 'one-time');
  const { productManager, isInitialized } = useProductManager();

  const planParam = searchParams.get('plan');
  const period = searchParams.get('period');
  const basePrice = parseFloat(searchParams.get('price') || '0');
  const baseTokens = parseInt(searchParams.get('tokens') || '0');
  const tokenPrice = parseFloat(searchParams.get('tokenPrice') || '0');
  const productId = searchParams.get('productId');

  // Normalisation du nom du plan pour le traitement interne
  const getNormalizedPlan = (plan: string | null): string => {
    if (!plan) return '';
    // Conversion en minuscule et suppression des accents pour la comparaison
    const planLower = plan.toLowerCase();
    
    // Retourner directement le plan s'il est déjà normalisé
    if (planLower === 'lite' || planLower === 'basic' || 
        planLower === 'advanced' || planLower === 'pro' || 
        planLower === 'à la carte') {
      return planLower;
    }
    
    // Convertir les noms de plans français en noms normalisés
    if (planLower === 'débutant') return 'lite';
    if (planLower === 'intermédiaire') return 'basic';
    if (planLower === 'avancé') return 'advanced';
    if (planLower === 'coach pro') return 'pro';
    
    return plan; // Retourner le plan original si aucune correspondance n'est trouvée
  };
  
  const plan = getNormalizedPlan(planParam);
  
  // Obtenir le titre du plan pour l'affichage
  const getPlanTitle = (planName: string): string => {
    // Retourner directement le nom du plan sans traduction
    return planName;
  };

  const additionalTokensPrice = additionalTokens * tokenPrice;
  const totalPrice = basePrice + additionalTokensPrice;

  useEffect(() => {
    // Récupérer les options de tokens disponibles à partir de tokenCheckoutLinks
    const tokenOptions = Object.keys(tokenCheckoutLinks).map(key => parseInt(key)).sort((a, b) => a - b);
    setAvailableTokenOptions(tokenOptions);
  }, []);

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
    
    if (!isAgeVerified || !isTermsAccepted) {
      alert('Veuillez accepter les conditions obligatoires pour continuer.');
      return;
    }
    
    if ((plan !== 'à la carte' && !isOneTimePayment) && (!firstName || !lastName || !email)) {
      alert('Veuillez remplir tous les champs obligatoires pour l\'abonnement.');
      return;
    }
    
    // Stocker les informations utilisateur dans le localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('checkout_firstName', firstName);
      localStorage.setItem('checkout_lastName', lastName);
      localStorage.setItem('checkout_email', email);
      localStorage.setItem('checkout_newsletter', isNewsletterAccepted ? '1' : '0');
    }
    
    // Déterminer le lien de checkout approprié
    let checkoutLink: string | undefined;
    
    console.log("Génération du lien de checkout avec les paramètres:", {
      plan,
      period,
      additionalTokens,
      isNewsletterAccepted,
      productId
    });
    
    if (plan === 'à la carte' || isOneTimePayment) {
      // Pour les achats à la carte ou uniques
      
      // Si on a un ID de produit passé depuis la page tokens, l'utiliser directement (pro tokens)
      if (productId && searchParams.get('source') === 'tokens') {
        // Utiliser directement le productId avec le ProductManager
        checkoutLink = productManager.buildCheckoutUrl({ 
          tokenPackId: productId 
        });
      } else {
        // Comportement standard pour les achats à la carte
        const tokenCount = searchParams.get('source') === 'tokens' 
          ? parseInt(searchParams.get('tokens') || '0') 
          : baseTokens;
          
        checkoutLink = getTokenCheckoutLink(tokenCount);
      }
      
      console.log("Lien de checkout pour tokens:", checkoutLink);
    } else {
      // Pour les abonnements
      if (period) {
        checkoutLink = getSubscriptionCheckoutLink(
          plan || '', 
          period as 'monthly' | 'quarterly' | 'annual' | 'biweekly', // Conversion explicite en BillingPeriod
          additionalTokens  // Passer les tokens supplémentaires directement à la fonction
        );
        console.log("Lien de checkout pour abonnement:", checkoutLink);
      } else {
        console.error("Période manquante pour l'abonnement");
      }
    }
    
    // Si on a un lien de checkout, redirection
    if (checkoutLink) {
      // Stocker les informations dans localStorage avant la redirection
      if (firstName) localStorage.setItem('checkout_firstName', firstName);
      if (lastName) localStorage.setItem('checkout_lastName', lastName);
      if (email) localStorage.setItem('checkout_email', email);
      localStorage.setItem('checkout_newsletter', isNewsletterAccepted ? '1' : '0');
      
      // Rediriger directement vers l'URL de checkout
      window.location.href = checkoutLink;
    } else {
      // Fallback si aucun lien n'est configuré
      alert('Une erreur est survenue. Veuillez réessayer plus tard.');
    }
  };

  // Calculer la date du prochain débit en fonction de la période
  const getNextBillingDate = () => {
    const today = new Date();
    const nextDate = new Date(today);
    
    switch(period) {
      case 'biweekly':
        nextDate.setDate(today.getDate() + 14);
        break;
      case 'monthly':
        nextDate.setMonth(today.getMonth() + 1);
        break;
      case 'quarterly':
        nextDate.setMonth(today.getMonth() + 3);
        break;
      case 'annual':
        nextDate.setFullYear(today.getFullYear() + 1);
        break;
    }
    
    return nextDate.toLocaleDateString('fr-FR');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-xl p-4 sm:p-8 shadow-lg border border-gray-200">
          {/* Ligne décorative en haut */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-t-xl"></div>
          
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Récapitulatif de votre commande</h1>
          
          <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="mb-3 sm:mb-0">
                <h2 className="text-xl font-semibold text-gray-900">{getPlanTitle(plan)}</h2>
                <p className="text-gray-500">
                  {plan === "à la carte" 
                    ? "Achat unique"
                    : `Abonnement ${getPeriodLabel(period || '')}`}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-2xl font-bold text-gray-900">{basePrice}€</p>
                <p className="text-sm text-gray-500">{baseTokens} tokens inclus</p>
              </div>
            </div>

            {tokenPrice > 0 && plan !== "à la carte" && (
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Pack de tokens supplémentaires</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Les tokens supplémentaires sont à usage unique et seront facturés une seule fois.
                  Ils n'affectent pas votre abonnement mensuel.
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Select
                    value={additionalTokens.toString()}
                    onValueChange={(value) => setAdditionalTokens(parseInt(value))}
                  >
                    <SelectTrigger className="w-full sm:w-32 bg-white border-gray-200 text-gray-900">
                      <SelectValue placeholder="Tokens" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 overflow-y-auto bg-white">
                      <SelectItem value="0" className="text-gray-900">0</SelectItem>
                      {availableTokenOptions.map((option) => (
                        <SelectItem key={option} value={option.toString()} className="text-gray-900">
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-gray-700">
                    {additionalTokensPrice.toFixed(2)}€ (achat unique)
                  </p>
                </div>
              </div>
            )}

            <div className="border-t border-gray-200 pt-6 space-y-4">
              {additionalTokens > 0 && plan !== "à la carte" && (
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                  <h4 className="text-sm font-medium text-orange-800 mb-2">Facturé aujourd'hui</h4>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <div className="mb-2 sm:mb-0">
                      <p className="text-gray-900">Pack de tokens supplémentaires</p>
                      <p className="text-sm text-gray-500">Usage unique</p>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{additionalTokensPrice.toFixed(2)}€</p>
                  </div>
                </div>
              )}

              {plan !== "à la carte" && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Facturé {getPeriodLabel(period || '')}</h4>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <div className="mb-2 sm:mb-0">
                      <p className="text-gray-900">Abonnement {getPlanTitle(plan)}</p>
                      <p className="text-sm text-gray-500">{baseTokens} tokens inclus</p>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{basePrice}€</p>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <div className="mb-2 sm:mb-0">
                    <p className="text-lg font-bold text-gray-900">Total à payer aujourd'hui</p>
                    {plan !== "à la carte" && additionalTokens > 0 && (
                      <p className="text-sm text-gray-500">
                        Inclut l'abonnement {getPeriodLabel(period || '')} et les tokens supplémentaires
                      </p>
                    )}
                    {plan !== "à la carte" && additionalTokens === 0 && (
                      <p className="text-sm text-gray-500">
                        Abonnement {getPeriodLabel(period || '')}
                      </p>
                    )}
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{
                    (plan === "à la carte" || additionalTokens === 0) 
                      ? basePrice
                      : (basePrice + additionalTokensPrice)
                  }€</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {plan !== "à la carte" && !isOneTimePayment && (
              <div className="space-y-4 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900">Vos informations</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      Prénom *
                    </label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="mt-1 border-gray-300"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Nom *
                    </label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="mt-1 border-gray-300"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 border-gray-300"
                  />
                </div>
              </div>
            )}

            <div className="space-y-4 border-t border-gray-200 pt-6">
              <div className="flex items-start">
                <div className="flex items-center h-5 mt-1">
                  <Checkbox 
                    id="ageVerification" 
                    checked={isAgeVerified} 
                    onCheckedChange={(checked) => setIsAgeVerified(checked === true)}
                    className="border-gray-300 text-red-600 focus:ring-red-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="ageVerification" className="font-medium text-gray-900">
                    Je confirme avoir plus de 18 ans
                  </label>
                  <p className="text-gray-500">Requis pour utiliser nos services.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5 mt-1">
                  <Checkbox 
                    id="termsAgreement" 
                    checked={isTermsAccepted} 
                    onCheckedChange={(checked) => setIsTermsAccepted(checked === true)}
                    className="border-gray-300 text-red-600 focus:ring-red-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="termsAgreement" className="font-medium text-gray-900">
                    J'accepte les conditions générales
                  </label>
                  <p className="text-gray-500">
                    <button 
                      type="button"
                      onClick={() => setOpenDialog('terms')}
                      className="text-red-600 underline hover:text-red-800"
                    >
                      Conditions d'utilisation
                    </button>, 
                    <button 
                      type="button"
                      onClick={() => setOpenDialog('privacy')}
                      className="text-red-600 underline hover:text-red-800 ml-1"
                    >
                      Politique de confidentialité
                    </button>, 
                    <button 
                      type="button"
                      onClick={() => setOpenDialog('refund')}
                      className="text-red-600 underline hover:text-red-800 ml-1"
                    >
                      Politique de remboursement
                    </button> et 
                    <button 
                      type="button"
                      onClick={() => setOpenDialog('legal')}
                      className="text-red-600 underline hover:text-red-800 ml-1"
                    >
                      Mentions légales
                    </button>.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5 mt-1">
                  <Checkbox 
                    id="newsletter" 
                    checked={isNewsletterAccepted} 
                    onCheckedChange={(checked) => setIsNewsletterAccepted(checked === true)}
                    className="border-gray-300 text-red-600 focus:ring-red-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="newsletter" className="font-medium text-gray-900">
                    Je souhaite recevoir la newsletter
                  </label>
                  <p className="text-gray-500">Recevez des conseils personnalisés et suivez nos actualités.</p>
                </div>
              </div>

              {/* Accord de facturation - seulement pour les abonnements */}
              {plan !== "à la carte" && (
                <div className="flex items-start">
                  <div className="flex items-center h-5 mt-1">
                    <Checkbox 
                      id="billingAccept" 
                      checked={isBillingAccepted} 
                      onCheckedChange={(checked) => setIsBillingAccepted(checked === true)}
                      className="border-gray-300 text-red-600 focus:ring-red-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="billingAccept" className="font-medium text-gray-900">
                      J'accepte les modalités de facturation
                    </label>
                    <p className="text-gray-500">
                      Je consens au débit immédiat de {(plan === "à la carte" || additionalTokens === 0) ? basePrice : (basePrice + additionalTokensPrice)}€ aujourd'hui
                      {additionalTokens > 0 && ` (dont ${additionalTokensPrice.toFixed(2)}€ pour les tokens supplémentaires)`}.
                      <br />
                      Je comprends que mon abonnement sera ensuite renouvelé automatiquement tous les{' '}
                      {period === 'biweekly' ? '14 jours' : 
                       period === 'monthly' ? 'mois' : 
                       period === 'quarterly' ? '3 mois' : 'ans'} 
                      {' '}pour {basePrice}€, 
                      à compter du {getNextBillingDate()}, jusqu'à ce que je résilie mon abonnement.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full py-3 text-base font-medium rounded-lg bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white"
              >
                Procéder au paiement
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Pop-up de confirmation pour les abonnements */}
      <Dialog open={showSubscriptionConfirmation} onOpenChange={setShowSubscriptionConfirmation}>
        <DialogContent className="bg-white border border-gray-200 text-gray-900 max-w-lg">
          {/* Ligne décorative en haut */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-t-xl"></div>
          
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">Confirmation d'abonnement</DialogTitle>
            <DialogDescription className="text-gray-600">
              Veuillez confirmer que vous souhaitez souscrire à cet abonnement
            </DialogDescription>
          </DialogHeader>
          
          <div className="my-4 space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-gray-900 font-semibold">Abonnement {getPlanTitle(plan)}</p>
              <p className="text-gray-600">Facturé {basePrice}€ {getPeriodLabel(period || '')}</p>
              <p className="text-gray-600">{baseTokens} tokens inclus par période</p>
            </div>
            
            <p className="text-gray-700 text-sm">
              En confirmant, vous acceptez que votre carte soit débitée automatiquement 
              de {basePrice}€ {getPeriodLabel(period || '')} 
              à partir du <span className="font-semibold">{getNextBillingDate()}</span>,
              jusqu'à la résiliation de votre abonnement. Vous pourrez annuler à tout moment 
              depuis votre compte.
            </p>
            
            {additionalTokens > 0 && (
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                <p className="text-gray-900 font-semibold">Achat unique supplémentaire</p>
                <p className="text-gray-600">{additionalTokens} tokens additionnels pour {additionalTokensPrice.toFixed(2)}€</p>
                <p className="text-gray-500 text-xs">Cet achat supplémentaire est à usage unique et ne sera pas renouvelé avec votre abonnement.</p>
              </div>
            )}

            <div className="p-4 bg-red-50 rounded-lg border border-red-100">
              <p className="text-gray-900 font-semibold">Total à payer aujourd'hui: {(basePrice + (additionalTokens > 0 ? additionalTokensPrice : 0)).toFixed(2)}€</p>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              onClick={() => setShowSubscriptionConfirmation(false)} 
              variant="outline" 
              className="border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Annuler
            </Button>
            <Button 
              onClick={proceedToPayment}
              className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white"
            >
              Confirmer l'abonnement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modals pour les conditions légales */}
      <Dialog open={!!openDialog} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent className="bg-white border border-gray-200 text-gray-900 max-w-4xl max-h-[80vh] overflow-hidden">
          {/* Ligne décorative en haut */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-t-xl"></div>
          
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              {openDialog === 'terms' && termsContent.title}
              {openDialog === 'privacy' && privacyContent.title}
              {openDialog === 'refund' && refundContent.title}
              {openDialog === 'legal' && legalContent.title}
            </DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto p-2">
            {openDialog === 'terms' && (
              <div className="space-y-6">
                {termsContent.content.map((section, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-900 border-l-4 border-orange-500 pl-3">{section.title}</h3>
                    <p className="text-gray-700 whitespace-pre-line">{section.text}</p>
                  </div>
                ))}
              </div>
            )}
            {openDialog === 'privacy' && (
              <div className="space-y-6">
                {privacyContent.content.map((section, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-900 border-l-4 border-orange-500 pl-3">{section.title}</h3>
                    <p className="text-gray-700 whitespace-pre-line">{section.text}</p>
                  </div>
                ))}
              </div>
            )}
            {openDialog === 'refund' && (
              <div className="space-y-6">
                {refundContent.content.map((section, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-900 border-l-4 border-orange-500 pl-3">{section.title}</h3>
                    <p className="text-gray-700 whitespace-pre-line">{section.text}</p>
                  </div>
                ))}
              </div>
            )}
            {openDialog === 'legal' && (
              <div className="space-y-6">
                {legalContent.content.map((section, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-900 border-l-4 border-orange-500 pl-3">{section.title}</h3>
                    <p className="text-gray-700 whitespace-pre-line">{section.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function PreCheckout() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-gray-200 relative">
          {/* Ligne décorative en haut */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-t-xl"></div>
          
          <svg className="mx-auto mb-4 w-20 h-20" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f1f1" strokeWidth="8" />
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="url(#loading-gradient)" 
              strokeWidth="8" 
              strokeLinecap="round" 
              strokeDasharray="283" 
              strokeDashoffset="100" 
              className="animate-[dash_1.5s_ease-in-out_infinite]"
            />
            <defs>
              <linearGradient id="loading-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
            </defs>
          </svg>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Préparation de votre commande</h1>
          <p className="text-gray-600">Merci de patienter quelques instants...</p>
        </div>
      </div>
    }>
      <PreCheckoutContent />
    </Suspense>
  );
} 