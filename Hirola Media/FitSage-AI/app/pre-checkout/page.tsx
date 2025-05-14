'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/app/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { useProductDetails } from '@/hooks/use-product-details';
import { Shield, CreditCard, Zap } from 'lucide-react';

// Si vous avez des pages légales, vous pouvez les importer ici
// import { termsContent } from '@/app/legal-pages/terms';
// import { privacyContent } from '@/app/legal-pages/privacy';
// import { refundContent } from '@/app/legal-pages/refund';
// import { legalContent } from '@/app/legal-pages/legal';

// Définir le type BillingPeriod ici puisqu'il n'est pas exporté correctement
type BillingPeriod = 'monthly' | 'quarterly' | 'bi-weekly' | 'annualy' | 'one-time' | 'once' | 'yearly';

export default function PreCheckout() {
  // Extraire les paramètres d'URL pour le plan et la période
  const searchParams = useSearchParams();
  const planParam = searchParams.get('plan') || 'lite';
  const periodParam = searchParams.get('period') as BillingPeriod || 'monthly';
  const tokensParam = searchParams.get('tokens');
  const priceParam = searchParams.get('price'); // Récupérer le prix s'il est fourni
  const tokenPriceParam = searchParams.get('tokenPrice'); // Récupérer le prix par token s'il est fourni
  
  // Valeurs normalisées
  const plan = planParam.toLowerCase();
  const period = periodParam.toLowerCase() as BillingPeriod;
  const tokens = tokensParam ? parseInt(tokensParam) : 0;
  const providedPrice = priceParam ? parseFloat(priceParam) : null;
  const tokenPrice = tokenPriceParam ? parseFloat(tokenPriceParam) : null;
  
  // Déterminer si c'est un achat à la carte (tokens)
  const isTokenPurchase = plan === 'tokens' || planParam === 'À la carte' || period === 'once' || !!tokensParam;
  
  // Si c'est un achat de tokens avec prix fourni, utiliser celui-ci directement
  // sinon utiliser les détails du produit
  const useProvidedDetails = isTokenPurchase && providedPrice !== null && tokens > 0;
  
  // Obtenir les détails du produit
  const productDetails = useProductDetails(plan, period);
  
  console.log('Pre-checkout page with params:', { plan, period, tokens });
  console.log('Product details:', productDetails);
  
  // États du formulaire
  const [additionalTokens, setAdditionalTokens] = useState(0);
  const [availableTokenOptions, setAvailableTokenOptions] = useState<number[]>([10, 20, 50, 100, 200, 300, 500]);
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isNewsletterAccepted, setIsNewsletterAccepted] = useState(false);
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const [showSubscriptionConfirmation, setShowSubscriptionConfirmation] = useState(false);
  const [pendingCheckoutLink, setPendingCheckoutLink] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [additionalTokensPrice, setAdditionalTokensPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(productDetails.price);
  
  // Mettre à jour le prix des tokens supplémentaires quand leur nombre change
  useEffect(() => {    
    // Utiliser le prix par token supplémentaire fourni par le hook
    const tokenPrice = productDetails.additionalTokenPrice;
    
    if (additionalTokens > 0) {
      const tokensCost = additionalTokens * tokenPrice;
      setAdditionalTokensPrice(tokensCost);
      setTotalPrice(productDetails.price + tokensCost);
      console.log(`Prix calculé pour ${additionalTokens} tokens supplémentaires au tarif de ${tokenPrice}€/token:`, tokensCost);
    } else {
      setAdditionalTokensPrice(0);
      setTotalPrice(productDetails.price);
    }
  }, [additionalTokens, productDetails]);
  
  // Obtenir le libellé de la période de facturation
  const getPeriodLabel = (period: string) => {
    const normalizedPeriod = period.toLowerCase().trim();
    
    switch (normalizedPeriod) {
      case 'biweekly':
      case 'bi-weekly': return 'toutes les 2 semaines';
      case 'monthly': return 'par mois';
      case 'quarterly':
      case 'trimester':
      case 'trimestriel': return 'par trimestre';
      case 'yearly': 
      case 'annual':
      case 'annuel':
      case 'annualy': return 'par an';
      default: return 'par mois';
    }
  };
  
  // Calculer la date du prochain débit
  const getNextBillingDate = () => {
    const today = new Date();
    const nextDate = new Date(today);
    
    switch(period) {
      case 'bi-weekly':
        nextDate.setDate(today.getDate() + 14);
        break;
      case 'monthly':
        nextDate.setMonth(today.getMonth() + 1);
        break;
      case 'quarterly':
        nextDate.setMonth(today.getMonth() + 3);
        break;
      case 'annualy':
      case 'yearly':
        nextDate.setFullYear(today.getFullYear() + 1);
        break;
      case 'one-time':
        return ''; // Pas de prochaine facturation
    }
    
    return nextDate.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Obtenir le nom du plan à afficher
  const getPlanName = () => {
    if (!plan) return '';
    
    switch (plan.toLowerCase()) {
      case 'tokens':
      case 'pay-as-you-go':
        return 'À la carte';
      case 'lite':
        return 'Lite';
      case 'basic':
        return 'Basic';
      case 'advanced':
        return 'Advanced';
      case 'pro':
        return 'Pro';
      default:
        return plan.charAt(0).toUpperCase() + plan.slice(1);
    }
  };

  const proceedToPayment = () => {
    if (pendingCheckoutLink) {
      window.location.href = pendingCheckoutLink;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!isAgeVerified || !isTermsAccepted) {
      alert('Veuillez accepter les conditions obligatoires pour continuer.');
      setIsLoading(false);
      return;
    }
    
    // Stocker les informations utilisateur dans le localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('checkout_firstName', firstName);
      localStorage.setItem('checkout_lastName', lastName);
      localStorage.setItem('checkout_email', email);
      localStorage.setItem('checkout_newsletter', isNewsletterAccepted ? '1' : '0');
    }
    
    try {
      // Importer dynamiquement le gestionnaire de produits
      import('@/lib/product-utils').then(async ({ ProductManager }) => {
        // Utiliser getInstance() pour obtenir l'instance du ProductManager
        const productManager = ProductManager.getInstance();
        await productManager.initialize();
        
        // Construire l'objet products pour l'URL de checkout
        const products: {
          subscriptionId?: string;
          tokenPackId?: string;
        } = {};
        
        // 1. Ajouter l'abonnement principal ou le pack de tokens pour achat unique
        if (isTokenPurchase) {
          // Pour les achats à la carte, utiliser l'ID du produit directement
          products.tokenPackId = productDetails.id;
        } else {
          // Pour les abonnements, utiliser l'ID d'abonnement
          products.subscriptionId = productDetails.id;
          
          // 2. Ajouter le pack de tokens supplémentaires si nécessaire
          if (additionalTokens > 0) {
            // Rechercher l'ID du pack de tokens correspondant
            const tokenPackId = await productManager.getTokenPackId(plan, additionalTokens);
            console.log('Token pack ID trouvé:', tokenPackId);
            
            if (tokenPackId) {
              products.tokenPackId = tokenPackId;
            } else {
              console.warn(`Pack de tokens de ${additionalTokens} tokens non trouvé pour le plan ${plan}`);
            }
          }
        }
        
        // 3. Générer l'URL de checkout complète
        const checkoutUrl = productManager.buildCheckoutUrl(products);
        console.log('URL de checkout générée avec les deux produits:', checkoutUrl);
        
        // 4. Redirection ou affichage du dialog
        if (isTokenPurchase) {
          // Pour les achats à la carte, rediriger directement
          window.location.href = checkoutUrl;
        } else {
          // Pour les abonnements, afficher la confirmation
          setPendingCheckoutLink(checkoutUrl);
          setShowSubscriptionConfirmation(true);
        }
        
        setIsLoading(false);
      }).catch(error => {
        console.error('Erreur lors de la génération de l\'URL de checkout:', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
        setIsLoading(false);
      });
    } catch (error) {
      console.error('Erreur lors de la préparation du checkout:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
      setIsLoading(false);
    }
  };

  // Si chargement en cours, afficher un indicateur
  if (productDetails.isLoading && !useProvidedDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des détails du produit...</p>
        </div>
      </div>
    );
  }

  // Si c'est un achat de tokens simplifié avec prix et nombre de tokens fournis
  if (isTokenPurchase && useProvidedDetails) {
    // Créer un récapitulatif simplifié pour l'achat de tokens
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-xl p-4 sm:p-8 shadow-lg border border-gray-200">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-teal-500 rounded-t-xl"></div>
            
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Récapitulatif de commande</h1>
            
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 mb-8">
              <h2 className="text-xl font-semibold mb-4">Pack de tokens</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Nombre de tokens:</span>
                  <span className="font-medium">{tokens.toLocaleString('fr-FR')}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Prix unitaire:</span>
                  <span className="font-medium">{tokenPrice?.toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'})} par token</span>
                </div>
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>{providedPrice?.toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'})}</span>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-6">
              <Button
                className="w-full max-w-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-lg py-6"
                onClick={() => {
                  // Obtenir le lien de checkout pour le nombre de tokens sélectionné
                  import('@/app/config/checkout-links').then(({ getTokenCheckoutLink }) => {
                    const checkoutLink = getTokenCheckoutLink(tokens);
                    if (checkoutLink) {
                      window.location.href = checkoutLink;
                    } else {
                      alert('Erreur lors de la récupération du lien de paiement');
                    }
                  });
                }}
              >
                Procéder au paiement
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Sinon, afficher le formulaire de pré-checkout normal
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-xl p-4 sm:p-8 shadow-lg border border-gray-200">
          {/* Ligne décorative en haut */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-teal-500 rounded-t-xl"></div>
          
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Récapitulatif de votre commande</h1>
          
          <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="mb-3 sm:mb-0">
                <h2 className="text-xl font-semibold text-gray-900">{getPlanName()}</h2>
                <p className="text-gray-500">
                  {isTokenPurchase 
                    ? "Achat unique"
                    : `Abonnement ${getPeriodLabel(period)}`}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-2xl font-bold text-gray-900">{productDetails.price.toFixed(2)}€</p>
                <p className="text-sm text-gray-500">{productDetails.tokens} tokens inclus</p>
              </div>
            </div>

            {!isTokenPurchase && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
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
                    {additionalTokens > 0 
                      ? `${additionalTokensPrice.toFixed(2)}€ (achat unique)`
                      : "Sélectionnez le nombre de tokens supplémentaires à ajouter"
                    }
                  </p>
                </div>
              </div>
            )}

            <div className="border-t border-gray-200 pt-6 space-y-4">
              {additionalTokens > 0 && !isTokenPurchase && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="text-sm font-medium text-blue-800 mb-2">Facturé aujourd'hui</h4>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <div className="mb-2 sm:mb-0">
                      <p className="text-gray-900">Pack de tokens supplémentaires</p>
                      <p className="text-sm text-gray-500">Usage unique</p>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{additionalTokensPrice.toFixed(2)}€</p>
                  </div>
                </div>
              )}

              {!isTokenPurchase && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h4 className="text-sm font-medium text-gray-800 mb-2">Facturé {getPeriodLabel(period)}</h4>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <div className="mb-2 sm:mb-0">
                      <p className="text-gray-900">Abonnement {getPlanName()}</p>
                      <p className="text-sm text-gray-500">{productDetails.tokens} tokens inclus</p>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{productDetails.price.toFixed(2)}€</p>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <div className="mb-2 sm:mb-0">
                    <p className="text-lg text-gray-900">Total à payer aujourd'hui</p>
                    {!isTokenPurchase && additionalTokens > 0 && (
                      <p className="text-sm text-gray-500">
                        Inclut l'abonnement {getPeriodLabel(period)} et {additionalTokens} tokens supplémentaires
                      </p>
                    )}
                    {!isTokenPurchase && additionalTokens === 0 && (
                      <p className="text-sm text-gray-500">
                        Abonnement {getPeriodLabel(period)}
                      </p>
                    )}
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{totalPrice.toFixed(2)}€</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 sm:mb-8 bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h4 className="text-sm font-medium text-gray-800 mb-3">Résumé des paiements</h4>
            <div className="space-y-3 text-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start pb-2 border-b border-gray-200">
                <div className="mb-2 sm:mb-0">
                  <p className="text-gray-900 font-medium">Aujourd'hui</p>
                  <p className="text-gray-500 text-xs mt-1">Débit immédiat</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-gray-900 font-medium">{totalPrice.toFixed(2)}€</p>
                  {additionalTokens > 0 && !isTokenPurchase && (
                    <p className="text-gray-500 text-xs mt-1">
                      Inclut {additionalTokensPrice.toFixed(2)}€ pour {additionalTokens} tokens supplémentaires
                    </p>
                  )}
                </div>
              </div>

              {!isTokenPurchase && (
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                  <div className="mb-2 sm:mb-0">
                    <p className="text-gray-900 font-medium">Prochains débits</p>
                    <p className="text-gray-500 text-xs mt-1">
                      À partir du {getNextBillingDate()}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-gray-900 font-medium">{productDetails.price.toFixed(2)}€</p>
                    <p className="text-gray-500 text-xs mt-1">{getPeriodLabel(period)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isTokenPurchase && (
              <div className="space-y-4 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900">Informations personnelles</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full border-gray-200"
                      placeholder="Votre prénom"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full border-gray-200"
                      placeholder="Votre nom"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-gray-200"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="age"
                  checked={isAgeVerified}
                  onCheckedChange={(checked) => setIsAgeVerified(checked as boolean)}
                  className="border-gray-300 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                />
                <label htmlFor="age" className="text-sm text-gray-600">
                  Je certifie avoir au moins 18 ans.
                </label>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms"
                  checked={isTermsAccepted}
                  onCheckedChange={(checked) => setIsTermsAccepted(checked as boolean)}
                  className="border-gray-300 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  En cochant cette case, j'accepte :{'\n'}
                  • Le débit immédiat de {totalPrice.toFixed(2)}€ {additionalTokens > 0 ? `(dont ${additionalTokensPrice.toFixed(2)}€ pour ${additionalTokens} tokens supplémentaires à usage unique)` : ''}{'\n'}
                  {!isTokenPurchase && `• Le débit automatique de ${productDetails.price.toFixed(2)}€ ${getPeriodLabel(period)} pour mon abonnement ${getPlanName()}`}{'\n'}
                  • Les Conditions Générales d'Utilisation et la Politique de Confidentialité.
                </label>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="newsletter"
                  checked={isNewsletterAccepted}
                  onCheckedChange={(checked) => setIsNewsletterAccepted(checked as boolean)}
                  className="border-gray-300 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                />
                <label htmlFor="newsletter" className="text-sm text-gray-600">
                  J'accepte de recevoir la newsletter et les notifications (optionnel).
                </label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!isAgeVerified || !isTermsAccepted || isLoading}
            >
              {isLoading ? "Chargement..." : "Continuer vers le paiement"}
            </Button>
            
            <div className="flex flex-col space-y-2 pt-4">
              <div className="flex items-center text-sm text-gray-500">
                <Shield className="w-4 h-4 mr-2 text-green-500" />
                <span>Paiement 100% sécurisé</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <CreditCard className="w-4 h-4 mr-2 text-green-500" />
                <span>Nous acceptons Visa, Mastercard</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Zap className="w-4 h-4 mr-2 text-green-500" />
                <span>Accès immédiat après paiement</span>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Pop-up de confirmation pour les abonnements */}
      <Dialog open={showSubscriptionConfirmation} onOpenChange={setShowSubscriptionConfirmation}>
        <DialogContent className="bg-white border border-gray-200 text-gray-900">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">Confirmation d'abonnement</DialogTitle>
            <DialogDescription className="text-gray-600">
              Veuillez confirmer que vous souhaitez souscrire à cet abonnement
            </DialogDescription>
          </DialogHeader>
          
          <div className="my-4 space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-900 font-semibold">Abonnement {getPlanName()}</p>
              <p className="text-gray-600">Facturé {productDetails.price.toFixed(2)}€ {getPeriodLabel(period)}</p>
              <p className="text-gray-600">{productDetails.tokens} tokens inclus par période</p>
            </div>
            
            <p className="text-gray-600 text-sm">
              En confirmant, vous acceptez que votre carte soit débitée automatiquement de {productDetails.price.toFixed(2)}€ {getPeriodLabel(period)} 
              jusqu'à la résiliation de votre abonnement. Vous pourrez annuler à tout moment depuis votre compte.
            </p>
            
            {additionalTokens > 0 && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-gray-900 font-semibold">Achat unique supplémentaire</p>
                <p className="text-gray-600">{additionalTokens} tokens additionnels pour {additionalTokensPrice.toFixed(2)}€</p>
                <p className="text-gray-500 text-xs">Cet achat supplémentaire est à usage unique et ne sera pas renouvelé avec votre abonnement.</p>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              onClick={() => setShowSubscriptionConfirmation(false)} 
              variant="outline" 
              className="border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              Annuler
            </Button>
            <Button 
              onClick={proceedToPayment}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Confirmer l'abonnement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 