'use client';

import { useState, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/app/components/ui/dialog";
import { ProductManager, ProductDetails } from '@/lib/product-utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { termsContent } from '../legal-pages/terms';
import { privacyContent } from '../legal-pages/privacy';
import { refundContent } from '../legal-pages/refund';
import { legalContent } from '../legal-pages/legal';
import { motion } from 'framer-motion';
import { TreePine, Leaf } from '@/components/icons';

function PreCheckoutContent() {
  const searchParams = useSearchParams();
  
  // State pour les informations utilisateur
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedAgeVerification, setAcceptedAgeVerification] = useState(false);
  const [acceptedNewsletter, setAcceptedNewsletter] = useState(false);
  const [acceptedRecurringPayment, setAcceptedRecurringPayment] = useState(false);
  
  // State pour le checkout
  const [additionalTokens, setAdditionalTokens] = useState(0);
  const [availableTokenOptions, setAvailableTokenOptions] = useState<number[]>([10, 20, 50, 100, 200, 300, 500]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  
  // State pour les détails du produit
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(null);
  const [additionalTokensPrice, setAdditionalTokensPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productManager, setProductManager] = useState<ProductManager | null>(null);
  const [nextBillingDate, setNextBillingDate] = useState<Date | null>(null);
  
  // Récupération des paramètres de l'URL
  const plan = searchParams.get('plan');
  const period = searchParams.get('period') || 'monthly';
  const tokens = searchParams.get('tokens');
  
  // Détermine si c'est un achat one-time ou un abonnement
  const isOneTime = period === 'one-time' || plan === 'pay-as-you-go';

  // Initialisation du ProductManager et chargement des détails du produit
  useEffect(() => {
    const initializeProductManager = async () => {
      try {
        setIsLoading(true);
        
        // Créer une instance de ProductManager
        const manager = ProductManager.getInstance();
        setProductManager(manager);
        
        // Initialiser le ProductManager (charger les données depuis l'API)
        await manager.initialize();
        
        // Si c'est un achat one-time, on récupère les détails du produit avec les tokens spécifiés
        if ((period === 'one-time' || plan === 'pay-as-you-go') && tokens) {
          const tokenCount = parseInt(tokens);
          const details = manager.getProductDetails('pay-as-you-go', 'one-time', tokenCount);
          setProductDetails(details);
          if (details) {
            setTotalPrice(details.price);
          }
        } 
        // Sinon, on récupère les détails de l'abonnement
        else if (plan && period) {
          const details = manager.getProductDetails(plan, period);
          setProductDetails(details);
          if (details) {
            setTotalPrice(details.price);
            if (details.nextBillingDate) {
              setNextBillingDate(new Date(details.nextBillingDate));
            }
          }
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur lors de l\'initialisation:', error);
        setError('Une erreur est survenue lors du chargement des détails du produit.');
        setIsLoading(false);
      }
    };
    
    initializeProductManager();
  }, [plan, period, tokens]);

  // Mise à jour du prix lorsque les tokens supplémentaires changent
  useEffect(() => {
    if (productDetails && period !== 'one-time' && plan !== 'pay-as-you-go') {
      const additionalTokensPrice = additionalTokens * productDetails.additionalTokenPrice;
      setAdditionalTokensPrice(additionalTokensPrice);
      setTotalPrice(productDetails.price + additionalTokensPrice);
    }
  }, [additionalTokens, productDetails, period, plan]);

  // Formatage de la date pour l'affichage
  const formatDate = (date: Date | null) => {
    if (!date) return '';
    
    // Formater en français (JJ/MM/AAAA)
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  // Traduction de la période pour l'affichage
  const translatePeriod = (period: string): string => {
    switch (period.toLowerCase()) {
      case 'monthly': return 'mensuelle';
      case 'bi-weekly': case 'biweekly': return 'bi-hebdomadaire';
      case 'quarterly': return 'trimestrielle';
      case 'annualy': case 'yearly': return 'annuelle';
      case 'one-time': return 'unique';
      default: return period;
    }
  };

  // Fonction pour obtenir le libellé de la période
  const getPeriodLabel = (period: string) => {
    switch (period.toLowerCase()) {
      case 'biweekly': case 'bi-weekly': return 'toutes les 2 semaines';
      case 'monthly': return 'par mois';
      case 'quarterly': return 'par trimestre';
      case 'yearly': case 'annualy': return 'par an';
      default: return '';
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
            <p className="text-sm text-[#4F4639] whitespace-pre-line">{section.text}</p>
          </div>
        ))}
      </div>
    );
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vérification des consentements obligatoires
    if (!acceptedAgeVerification || !acceptedTerms) {
      alert('Veuillez accepter les conditions générales et confirmer votre âge pour continuer.');
      return;
    }
    
    // Vérification du consentement à l'abonnement automatique pour les abonnements récurrents
    if (!isOneTime && !acceptedRecurringPayment) {
      alert('Veuillez accepter les conditions d\'abonnement automatique pour continuer.');
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
      if (period === 'one-time' || plan === 'pay-as-you-go') {
        products.tokenPackId = productDetails.id;
      } else {
        products.subscriptionId = productDetails.id;
      }
      
      // 2. Ajouter le pack de tokens supplémentaires si nécessaire
      if (additionalTokens > 0 && plan !== 'pay-as-you-go' && period !== 'one-time') {
        // Récupérer l'ID du produit pour les tokens supplémentaires
        const tokenPackId = productManager.getTokenPackId(plan || '', additionalTokens);
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
        localStorage.setItem('checkout_company', company);
        localStorage.setItem('checkout_newsletter', acceptedNewsletter ? '1' : '0');
      }
      
      // 5. Redirection directement vers l'URL de checkout
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Erreur lors de la construction de l\'URL de checkout:', error);
      alert('Une erreur est survenue lors de la préparation de la commande');
    }
  };

  if (isLoading) {
  return (
      <div className="bg-[#F7EFDE] min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="inline-block w-12 h-12 border-4 border-[#5F7138]/20 border-t-[#5F7138] rounded-full animate-spin mb-4"></div>
              <h2 className="text-xl font-medium text-[#4F4639]">Chargement en cours...</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !productDetails) {
    return (
      <div className="bg-[#F7EFDE] min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 shadow-md border border-[#E8DFC7] max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-[#4F4639] mb-4">Une erreur est survenue</h1>
            <p className="text-[#7F7259] mb-6">{error || "Impossible de charger les détails du produit."}</p>
            <Button 
              onClick={() => window.history.back()}
              className="bg-[#5F7138] hover:bg-[#7A8B4D] text-white"
            >
              Retour
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F7EFDE] min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-md border border-[#E8DFC7]">
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-2 border border-[#C17A56]/30 rounded-full bg-[#F7EFDE] shadow-sm mb-4"
            >
              <span className="text-[#A35E3D] text-sm font-medium flex items-center">
                <Leaf className="h-4 w-4 mr-2 text-[#C17A56]" />
                Récapitulatif de votre commande
              </span>
            </motion.div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#4F4639]">Finalisez votre commande</h1>
          </div>
          
          <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-[#F8F4E9]/70 rounded-lg border border-[#E8DFC7]">
              <div className="mb-3 sm:mb-0">
                <h2 className="text-xl font-semibold text-[#4F4639]">{plan}</h2>
                <p className="text-[#7F7259]">
                  {isOneTime
                    ? "Paiement unique"
                    : `Abonnement ${translatePeriod(period)}`}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-2xl font-bold text-[#5F7138]">{productDetails.price.toFixed(2)}€</p>
                <p className="text-sm text-[#7F7259]">{productDetails.includedTokens} tokens inclus</p>
              </div>
            </div>

            {/* Sélection de tokens supplémentaires (uniquement pour les abonnements) */}
            {!isOneTime && (
              <div className="p-4 bg-[#F8F4E9]/70 rounded-lg border border-[#E8DFC7]">
                <h3 className="text-lg font-medium text-[#4F4639] mb-3">Tokens supplémentaires</h3>
                <p className="text-sm text-[#7F7259] mb-4">
                  Besoin de plus de tokens ? Ajoutez-en dès maintenant à votre commande.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-grow">
                  <Select
                    value={additionalTokens.toString()}
                      onValueChange={(value) => setAdditionalTokens(parseInt(value))}
                  >
                      <SelectTrigger className="w-full bg-[#F0EBE1] border-[#E8DFC7] text-[#4F4639] hover:bg-[#E8DFC7] focus:ring-[#5F7138]">
                        <SelectValue placeholder="Sélectionnez une quantité" />
                    </SelectTrigger>
                      <SelectContent className="bg-[#F8F4E9] border-[#E8DFC7]">
                        <SelectItem value="0" className="text-[#4F4639] hover:bg-[#E8DFC7] focus:bg-[#E8DFC7]">Aucun token supplémentaire</SelectItem>
                        {availableTokenOptions.map(option => (
                        <SelectItem key={option} value={option.toString()} className="text-[#4F4639] hover:bg-[#E8DFC7] focus:bg-[#E8DFC7]">
                            {option} tokens ({(option * productDetails.additionalTokenPrice).toFixed(2)}€)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-sm text-[#7F7259]">Prix unitaire : <span className="font-medium">{productDetails.additionalTokenPrice.toFixed(2)}€</span></p>
                  </div>
                </div>
                
                {additionalTokens > 0 && (
                  <div className="mt-4 p-3 bg-[#5F7138]/10 rounded-lg text-[#5F7138] text-sm">
                    <div className="flex justify-between">
                      <span>Tokens supplémentaires ({additionalTokens})</span>
                      <span className="font-medium">{additionalTokensPrice.toFixed(2)}€</span>
                    </div>
                  </div>
                )}
                </div>
              )}

            {/* Récapitulatif du total */}
            <div className="p-4 bg-[#5F7138]/10 rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-[#4F4639]">Total</h3>
                <p className="text-2xl font-bold text-[#5F7138]">{totalPrice.toFixed(2)}€</p>
              </div>
              
              {!isOneTime && (
                <p className="text-sm text-[#7F7259] mt-1">
                  Facturation {translatePeriod(period)} - Prochain paiement le {formatDate(nextBillingDate)}
                      </p>
                    )}
                  </div>
            
            {/* Formulaire utilisateur */}
            <div className="p-4 bg-white rounded-lg border border-[#E8DFC7]">
              <h3 className="text-lg font-medium text-[#4F4639] mb-4">Vos informations</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm text-[#7F7259] mb-1">Prénom</label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-[#F8F4E9] border-[#E8DFC7]"
                    placeholder="Votre prénom"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm text-[#7F7259] mb-1">Nom</label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-[#F8F4E9] border-[#E8DFC7]"
                    placeholder="Votre nom"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm text-[#7F7259] mb-1">Email</label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[#F8F4E9] border-[#E8DFC7]"
                    placeholder="Votre email"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm text-[#7F7259] mb-1">Entreprise (optionnel)</label>
                  <Input
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="bg-[#F8F4E9] border-[#E8DFC7]"
                    placeholder="Nom de votre entreprise"
                  />
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="age"
                  checked={acceptedAgeVerification}
                  onCheckedChange={(checked) => setAcceptedAgeVerification(checked as boolean)}
                  className="mt-1"
                />
                <label htmlFor="age" className="text-sm text-[#7F7259]">
                  Je confirme avoir plus de 18 ans
                </label>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                  className="mt-1"
                />
                <label htmlFor="terms" className="text-sm text-[#7F7259]">
                  J'accepte les <button type="button" onClick={() => setOpenDialog('terms')} className="text-[#5F7138] hover:underline">conditions générales</button>,
                  la <button type="button" onClick={() => setOpenDialog('privacy')} className="text-[#5F7138] hover:underline">politique de confidentialité</button>,
                  la <button type="button" onClick={() => setOpenDialog('refund')} className="text-[#5F7138] hover:underline">politique de remboursement</button> et les
                  <button type="button" onClick={() => setOpenDialog('legal')} className="text-[#5F7138] hover:underline"> mentions légales</button>
                </label>
              </div>

              {/* Consentement à l'abonnement automatique - uniquement pour les abonnements */}
              {!isOneTime && (
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="recurring-payment"
                    checked={acceptedRecurringPayment}
                    onCheckedChange={(checked) => setAcceptedRecurringPayment(checked as boolean)}
                    className="mt-1"
                  />
                  <label htmlFor="recurring-payment" className="text-sm text-[#7F7259]">
                    Je consens explicitement à être débité automatiquement de <span className="font-medium text-[#5F7138]">{productDetails.price.toFixed(2)}€</span> {getPeriodLabel(period)} pour mon abonnement {plan}. 
                    {nextBillingDate && (
                      <span> La prochaine facturation interviendra le <span className="font-medium text-[#5F7138]">{formatDate(nextBillingDate)}</span>.</span>
                    )}
                  </label>
                </div>
              )}

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="newsletter"
                  checked={acceptedNewsletter}
                  onCheckedChange={(checked) => setAcceptedNewsletter(checked as boolean)}
                  className="mt-1"
                />
                <label htmlFor="newsletter" className="text-sm text-[#7F7259]">
                  Je souhaite recevoir la newsletter et les offres promotionnelles
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8DFC7]">
            <Button
              type="submit"
                className="w-full bg-[#5F7138] hover:bg-[#7A8B4D] text-white"
                disabled={!acceptedTerms || !acceptedAgeVerification || (!isOneTime && !acceptedRecurringPayment)}
              >
                {isOneTime
                  ? `Payer ${totalPrice.toFixed(2)}€`
                  : `Souscrire pour ${totalPrice.toFixed(2)}€ ${getPeriodLabel(period)}`
                }
            </Button>
              <p className="text-xs text-center text-[#7F7259] mt-2">
                Paiement sécurisé via notre partenaire. Aucune donnée bancaire n'est stockée sur notre site.
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Dialogues pour les mentions légales */}
      <Dialog open={openDialog === 'terms'} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto custom-scrollbar">
          <DialogHeader>
            <DialogTitle>Conditions Générales d'Utilisation</DialogTitle>
          </DialogHeader>
            {renderLegalContent(termsContent)}
          <DialogFooter>
            <Button onClick={() => setOpenDialog(null)}>Fermer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openDialog === 'privacy'} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto custom-scrollbar">
          <DialogHeader>
            <DialogTitle>Politique de Confidentialité</DialogTitle>
          </DialogHeader>
            {renderLegalContent(privacyContent)}
          <DialogFooter>
            <Button onClick={() => setOpenDialog(null)}>Fermer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openDialog === 'refund'} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto custom-scrollbar">
          <DialogHeader>
            <DialogTitle>Politique de Remboursement</DialogTitle>
          </DialogHeader>
            {renderLegalContent(refundContent)}
          <DialogFooter>
            <Button onClick={() => setOpenDialog(null)}>Fermer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openDialog === 'legal'} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto custom-scrollbar">
          <DialogHeader>
            <DialogTitle>Mentions Légales</DialogTitle>
          </DialogHeader>
            {renderLegalContent(legalContent)}
          <DialogFooter>
            <Button onClick={() => setOpenDialog(null)}>Fermer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function PreCheckout() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F7EFDE] py-12 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#4F4639] mb-4">Chargement...</h1>
          <div className="w-16 h-16 mx-auto rounded-full border-4 border-[#5F7138]/20 border-t-[#5F7138] animate-spin"></div>
        </div>
      </div>
    }>
      <PreCheckoutContent />
    </Suspense>
  );
} 