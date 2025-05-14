'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/app/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { termsContent } from '@/app/legal-pages/terms';
import { privacyContent } from '@/app/legal-pages/privacy';
import { refundContent } from '@/app/legal-pages/refund';
import { legalContent } from '@/app/legal-pages/legal';
import { ProductManager, ProductDetails } from '@/app/lib/product-utils';

export default function PreCheckout() {
  const searchParams = useSearchParams();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [additionalTokens, setAdditionalTokens] = useState(0);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [acceptedAgeVerification, setAcceptedAgeVerification] = useState(false);
  const [acceptedRefundPolicy, setAcceptedRefundPolicy] = useState(false);
  const [acceptedNewsletter, setAcceptedNewsletter] = useState(false);
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [productManager, setProductManager] = useState<ProductManager | null>(null);

  const planParam = searchParams.get('plan');
  const periodParam = searchParams.get('period');
  const tokensParam = searchParams.get('tokens');

  const isOneTime = periodParam === 'one-time';
  const tokenCount = isOneTime ? parseInt(tokensParam || '0') : 0;

  useEffect(() => {
    const initializeProductManager = async () => {
      try {
        setLoading(true);
        const manager = ProductManager.getInstance();
        await manager.initialize();
        setProductManager(manager);
        
        if (!planParam || !periodParam) {
          throw new Error('Plan et période requis');
        }
        
        if (isOneTime && !tokensParam) {
          throw new Error('Nombre de tokens requis pour un achat unique');
        }
        
        const details = manager.getProductDetails(planParam, periodParam);
        
        if (!details) {
          throw new Error(`Produit non trouvé pour le plan ${planParam} et la période ${periodParam}`);
        }
        
        // Si c'est un achat unique (pay-as-you-go), définir les détails spécifiques
        if (isOneTime && tokensParam) {
          const tokenPackId = manager.getTokenPackId('pay-as-you-go', parseInt(tokensParam));
          if (!tokenPackId) {
            throw new Error(`Pack de tokens non trouvé pour ${tokensParam} tokens`);
          }
          details.id = tokenPackId;
          details.name = `${tokensParam} TOKEN PACK`;
          details.includedTokens = parseInt(tokensParam);
          details.price = parseFloat(tokensParam) * details.additionalTokenPrice;
        }
        
        setProductDetails(details);
      } catch (error) {
        console.error('Erreur lors de l\'initialisation:', error);
        setError((error as Error).message);
      } finally {
        setLoading(false);
    }
    };

    initializeProductManager();
  }, [planParam, periodParam, tokensParam, isOneTime]);

  const translatePeriod = (period: string): string => {
    switch (period.toLowerCase()) {
      case 'bi-weekly':
      case 'biweekly':
        return 'bi-hebdomadaire';
      case 'monthly':
        return 'mensuelle';
      case 'quarterly':
        return 'trimestrielle';
      case 'annualy':
      case 'yearly':
        return 'annuelle';
      case 'one-time':
        return 'paiement unique';
      default:
        return period;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vérifications des conditions
    if (!acceptedTerms || !acceptedAgeVerification) {
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
      if (periodParam !== 'one-time') {
        products.subscriptionId = productDetails.id;
      } else {
        products.tokenPackId = productDetails.id;
      }
      
      // 2. Ajouter le pack de tokens supplémentaires si nécessaire
      if (additionalTokens > 0 && periodParam !== 'one-time') {
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
      
      // 5. Redirection directement vers l'URL de checkout
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Erreur lors de la construction de l\'URL de checkout:', error);
      alert('Une erreur est survenue lors de la préparation de la commande');
      }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F7FC] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto"></div>
          <p className="mt-4 text-[#6C7080]">Chargement...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F8F7FC] flex items-center justify-center">
        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-red-300 max-w-md mx-auto text-center">
          <h1 className="text-2xl font-medium text-red-600 mb-4">Erreur</h1>
          <p className="text-[#6C7080] mb-6">{error}</p>
          <Button onClick={() => window.history.back()} className="bg-[#A590DC] hover:bg-[#8A69D4]">
            Retour
          </Button>
        </div>
      </div>
    );
  }

  if (!productDetails) {
    return (
      <div className="min-h-screen bg-[#F8F7FC] flex items-center justify-center">
        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-[#E2D9F3] max-w-md mx-auto text-center">
          <h1 className="text-2xl font-medium text-[#2A303D] mb-4">Produit non trouvé</h1>
          <p className="text-[#6C7080] mb-6">Le produit demandé n'est pas disponible.</p>
          <Button onClick={() => window.history.back()} className="bg-[#A590DC] hover:bg-[#8A69D4]">
            Retour
          </Button>
        </div>
      </div>
    );
  }

  // Calculer le prix des tokens supplémentaires
  const additionalTokensPrice = additionalTokens * productDetails.additionalTokenPrice;
      
  // Calculer le prix total
  const totalPrice = productDetails.price + additionalTokensPrice;

  // Fonction pour obtenir le nom d'affichage du plan
  const getPlanDisplayName = (planId: string): string => {
    if (!planId) return '';
    
    switch (planId.toLowerCase()) {
      case 'lite': return 'lite';
      case 'basic': return 'basic';
      case 'advanced': return 'advanced';
      case 'pro': return 'pro';
      case 'pay-as-you-go': return 'À la carte';
      default: return planId;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7FC] py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-[#E2D9F3]">
          <h1 className="text-2xl sm:text-3xl font-medium text-[#2A303D] mb-6 sm:mb-8">Récapitulatif de votre commande</h1>
          
          <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-[#F5F2FC] rounded-lg">
              <div className="mb-3 sm:mb-0">
                <h2 className="text-xl font-medium text-[#2A303D]">{getPlanDisplayName(planParam || '')}</h2>
                <p className="text-[#6C7080]">
                  {isOneTime 
                    ? "Achat unique"
                    : `Abonnement ${translatePeriod(periodParam || '')}`}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-2xl font-medium text-[#A590DC]">{productDetails.price.toFixed(2)}€</p>
                <p className="text-sm text-[#6C7080]">{productDetails.includedTokens} tokens inclus</p>
                {!isOneTime && productDetails.nextBillingDate && (
                  <p className="text-xs text-[#6C7080]">Prochain paiement le {productDetails.nextBillingDate}</p>
                )}
              </div>
            </div>

            {productDetails.additionalTokenPrice > 0 && !isOneTime && (
              <div className="p-4 bg-purple-500/10 rounded-lg">
                <h3 className="text-lg font-medium text-[#2A303D] mb-2">Pack de tokens supplémentaires</h3>
                <p className="text-sm text-[#6C7080] mb-4">
                  Les tokens supplémentaires sont à usage unique et seront facturés une seule fois.
                  Ils n'affectent pas votre abonnement.
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Select
                    value={additionalTokens.toString()}
                    onValueChange={(value) => setAdditionalTokens(parseInt(value))}
                  >
                    <SelectTrigger className="w-full sm:w-32 bg-white border-purple-500/50">
                      <SelectValue placeholder="Tokens" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 overflow-y-auto">
                      <SelectItem value="0">0</SelectItem>
                      {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((option) => (
                        <SelectItem key={option} value={option.toString()} className="text-[#2A303D]">
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-[#6C7080] font-medium">
                    {additionalTokensPrice.toFixed(2)}€ (achat unique)
                  </p>
                </div>
              </div>
            )}

            <div className="p-4 bg-[#F2FAFC] rounded-lg">
              <h3 className="text-lg font-medium text-[#2A303D] mb-2">Total</h3>
              <div className="flex justify-between items-center">
                <p className="text-[#6C7080]">Prix total</p>
                <p className="text-2xl font-medium text-[#2A303D]">{totalPrice.toFixed(2)}€</p>
              </div>
              {!isOneTime && (
                <p className="text-xs text-[#6C7080] mt-2">
                  Dont {productDetails.price.toFixed(2)}€ facturé {translatePeriod(periodParam || '')}
                  {additionalTokens > 0 && ` et ${additionalTokensPrice.toFixed(2)}€ facturé une fois`}
                </p>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-medium text-[#2A303D]">Vos informations</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-[#6C7080] mb-1">
                    Prénom
                  </label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-white border-[#E2D9F3]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-[#6C7080] mb-1">
                    Nom
                  </label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-white border-[#E2D9F3]"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#6C7080] mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white border-[#E2D9F3]"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <h2 className="text-xl font-medium text-[#2A303D]">Conditions</h2>
              
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="legalDocs" 
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => {
                    setAcceptedTerms(checked as boolean);
                    setAcceptedPrivacy(checked as boolean);
                    setAcceptedRefundPolicy(checked as boolean);
                  }}
                  className="mt-1"
                  required
                />
                <div>
                  <label htmlFor="legalDocs" className="text-sm text-[#6C7080] font-medium cursor-pointer">
                    J'accepte les <button type="button" onClick={() => setOpenDialog('terms')} className="text-[#A590DC] hover:underline">conditions générales</button>, la <button type="button" onClick={() => setOpenDialog('privacy')} className="text-[#A590DC] hover:underline">politique de confidentialité</button> et la <button type="button" onClick={() => setOpenDialog('refund')} className="text-[#A590DC] hover:underline">politique de remboursement</button>*
                  </label>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="ageVerification" 
                  checked={acceptedAgeVerification}
                  onCheckedChange={(checked) => setAcceptedAgeVerification(checked as boolean)}
                  className="mt-1"
                  required
                />
                <div>
                  <label htmlFor="ageVerification" className="text-sm text-[#6C7080] font-medium cursor-pointer">
                    Je confirme avoir plus de 18 ans*
                  </label>
                </div>
              </div>

              {!isOneTime && (
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="subscriptionConsent" 
                    checked={acceptedPrivacy}
                    onCheckedChange={(checked) => setAcceptedPrivacy(checked as boolean)}
                    className="mt-1"
                    required
                  />
                  <div>
                    <label htmlFor="subscriptionConsent" className="text-sm text-[#6C7080] font-medium cursor-pointer">
                      J'accepte explicitement d'être débité automatiquement de <span className="font-medium">{productDetails.price.toFixed(2)}€</span> {translatePeriod(periodParam || '')} jusqu'à la résiliation de mon abonnement. Le prochain paiement sera prélevé le <span className="font-medium">{productDetails.nextBillingDate}</span>*
                    </label>
                  </div>
                </div>
              )}
              
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="newsletter"
                  checked={acceptedNewsletter}
                  onCheckedChange={(checked) => setAcceptedNewsletter(checked as boolean)}
                  className="mt-1"
                />
                <div>
                  <label htmlFor="newsletter" className="text-sm text-[#6C7080] font-medium cursor-pointer">
                    Je souhaite recevoir la newsletter et les informations du service FitnessBrainAI (facultatif)
                  </label>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full bg-[#A590DC] hover:bg-[#8A69D4] text-white py-3 rounded-lg">
              Valider et procéder au paiement
            </Button>
            
            <p className="text-xs text-[#6C7080] text-center">
              * Champs obligatoires
            </p>
          </form>
        </div>
      </div>

      {/* Dialogs pour les conditions */}
      <Dialog open={openDialog === 'terms'} onOpenChange={(open) => !open && setOpenDialog(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{termsContent.title}</DialogTitle>
          </DialogHeader>
          <div className="prose prose-sm max-w-none">
            {termsContent.content.map((section, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
                <div dangerouslySetInnerHTML={{ __html: section.text.replace(/\n/g, '<br>') }}></div>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button onClick={() => setOpenDialog(null)}>Fermer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={openDialog === 'privacy'} onOpenChange={(open) => !open && setOpenDialog(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{privacyContent.title}</DialogTitle>
          </DialogHeader>
          <div className="prose prose-sm max-w-none">
            {privacyContent.content.map((section, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
                <div dangerouslySetInnerHTML={{ __html: section.text.replace(/\n/g, '<br>') }}></div>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button onClick={() => setOpenDialog(null)}>Fermer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openDialog === 'refund'} onOpenChange={(open) => !open && setOpenDialog(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{refundContent.title}</DialogTitle>
          </DialogHeader>
          <div className="prose prose-sm max-w-none">
            {refundContent.content.map((section, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
                <div dangerouslySetInnerHTML={{ __html: section.text.replace(/\n/g, '<br>') }}></div>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button onClick={() => setOpenDialog(null)}>Fermer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 