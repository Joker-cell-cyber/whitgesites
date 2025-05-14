'use client';

import { useState, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Loader2 } from 'lucide-react';
import { ProductManager, ProductDetails } from '@/lib/product-utils';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import LegalModal, { LegalDocumentType } from '@/app/components/ui/legal-modal';

function PreCheckoutContent() {
  const searchParams = useSearchParams();
  const [productManager, setProductManager] = useState<ProductManager | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // États du formulaire
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [additionalTokens, setAdditionalTokens] = useState(0);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedNewsletter, setAcceptedNewsletter] = useState(false);
  const [acceptedAgeVerification, setAcceptedAgeVerification] = useState(false);

  // État pour les modales légales
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [currentLegalDocument, setCurrentLegalDocument] = useState<LegalDocumentType>('terms');

  const [productDetails, setProductDetails] = useState<ProductDetails | null>(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [plan, setPlan] = useState<string | null>(null);
  const [period, setPeriod] = useState<string | null>(null);

  // Options de tokens pour le dropdown
  const tokenOptions = [
    { value: 0, label: '0 tokens supplémentaires' },
    { value: 10, label: '10 tokens' },
    { value: 20, label: '20 tokens' },
    { value: 30, label: '30 tokens' },
    { value: 40, label: '40 tokens' },
    { value: 50, label: '50 tokens' },
    { value: 60, label: '60 tokens' },
    { value: 70, label: '70 tokens' },
    { value: 80, label: '80 tokens' },
    { value: 90, label: '90 tokens' },
    { value: 100, label: '100 tokens' },
    { value: 150, label: '150 tokens' },
    { value: 200, label: '200 tokens' },
    { value: 250, label: '250 tokens' },
    { value: 300, label: '300 tokens' },
    { value: 350, label: '350 tokens' },
    { value: 400, label: '400 tokens' },
    { value: 450, label: '450 tokens' },
    { value: 500, label: '500 tokens' }
  ];

  // Ouvrir la modale avec le document légal approprié
  const openLegalModal = (documentType: LegalDocumentType) => {
    setCurrentLegalDocument(documentType);
    setLegalModalOpen(true);
  };

  useEffect(() => {
    const initializeProducts = async () => {
      try {
        const manager = ProductManager.getInstance();
        await manager.initialize();
        setProductManager(manager);

        // Récupérer les paramètres de l'URL
        const planParam = searchParams.get('plan');
        const periodParam = searchParams.get('period');
        const tokens = searchParams.get('tokens');

        setPlan(planParam);
        setPeriod(periodParam);
        console.log('Paramètres reçus:', { plan: planParam, period: periodParam, tokens });

        if (!planParam || !periodParam) {
          console.error('Paramètres manquants:', { plan: planParam, period: periodParam });
          throw new Error('Plan et période requis');
        }

        // Vérifier si c'est un achat one-time de tokens
        const isOneTime = periodParam.toLowerCase() === 'one-time';
        
        // Cas spécial pour les achats one-time
        if (isOneTime) {
          if (!tokens) {
            throw new Error('Nombre de tokens requis pour un achat unique');
          }
          
          // Pour one-time, chercher directement le token pack
          const tokenPackId = manager.getTokenPackId(planParam, parseInt(tokens));
          console.log('ID du token pack trouvé (one-time):', tokenPackId);
          
          if (!tokenPackId) {
            throw new Error(`Produit non trouvé pour le plan ${planParam} et ${tokens} tokens`);
          }
          
          // Obtenir le prix du token depuis les paramètres d'URL ou utiliser la valeur par défaut
          const tokenPriceParam = searchParams.get('tokenPrice');
          const isPayAsYouGo = planParam?.toLowerCase() === 'pay-as-you-go' || 
                               planParam?.toLowerCase() === 'à la carte' || 
                               planParam?.toLowerCase() === 'a la carte';
          
          // Utiliser 0.90€ par token pour les plans à la carte, sinon utiliser le prix de l'URL ou 0.35€ par défaut
          const tokenPrice = tokenPriceParam ? parseFloat(tokenPriceParam) : 
                            (isPayAsYouGo ? 0.90 : 0.35);
          
          const tokenCount = parseInt(tokens);
          const totalPrice = tokenCount * tokenPrice;
          
          // Créer un objet ProductDetails simulé pour l'affichage
          setProductDetails({
            id: tokenPackId,
            name: `${tokens} TOKEN PACK`,
            price: totalPrice,
            nextBillingDate: 'N/A', // Pas de facturation récurrente
            includedTokens: tokenCount,
            additionalTokenPrice: tokenPrice
          });
          
          // Construire l'URL de checkout
          const url = manager.buildCheckoutUrl({ tokenPackId });
          console.log('URL de checkout générée (one-time):', url);
          setCheckoutUrl(url);
          setLoading(false);
          return; // Sortir tôt pour éviter la logique d'abonnement
        }
        
        // Normaliser la période pour correspondre au format dans le CSV pour la recherche
        // et au format pour les données de prix (biweekly au lieu de bi-weekly)
        let normalizedPeriodForSearch = periodParam;
        let normalizedPeriodForPricing = periodParam;
        
        if (periodParam.toLowerCase() === 'biweekly' || periodParam.toLowerCase() === 'bi-weekly') {
          normalizedPeriodForSearch = 'bi-weekly'; // Pour la recherche dans le CSV (nom du produit)
          normalizedPeriodForPricing = 'biweekly'; // Pour les calculs de prix (clé d'objet)
        } else if (periodParam.toLowerCase() === 'yearly' || periodParam.toLowerCase() === 'annualy') {
          normalizedPeriodForSearch = 'annualy'; // Pour la recherche dans le CSV
          normalizedPeriodForPricing = 'yearly'; // Pour les calculs de prix
        }
        
        console.log(`Période avant normalisation: ${periodParam}, pour recherche: ${normalizedPeriodForSearch}, pour prix: ${normalizedPeriodForPricing}`);

        // Récupérer l'ID du produit avec la période normalisée pour la recherche
        const subscriptionId = periodParam === 'one-time' 
          ? manager.getTokenPackId(planParam, parseInt(tokens || '0'))
          : manager.getSubscriptionId(planParam, normalizedPeriodForSearch);

        console.log('ID de souscription/token pack trouvé:', subscriptionId);

        if (!subscriptionId) {
          throw new Error(`Produit non trouvé pour le plan ${planParam} et la période ${periodParam}`);
        }

        // Récupérer les détails du produit avec la période adaptée pour les prix
        // Note: nous utilisons normalizedPeriodForPricing pour obtenir les prix corrects
        const details = manager.getProductDetails(planParam, normalizedPeriodForPricing);
        if (!details) {
          throw new Error(`Détails du produit non trouvés pour le plan ${planParam} et la période ${periodParam}`);
        }
        setProductDetails(details);

        // Ne pas construire l'URL de checkout immédiatement, elle sera construite lors de la soumission du formulaire
        // avec les tokens supplémentaires éventuels
        setCheckoutUrl(null); // Réinitialiser
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors de l\'initialisation:', err);
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        setLoading(false);
      }
    };

    initializeProducts();
  }, [searchParams]);

  // Calculer le prix total quand les tokens supplémentaires changent
  useEffect(() => {
    if (productDetails) {
      const basePrice = productDetails.price;
      const additionalTokensPrice = additionalTokens * productDetails.additionalTokenPrice;
      setTotalPrice(basePrice + additionalTokensPrice);
    }
  }, [productDetails, additionalTokens]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
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
      
      // 1. Vérifier si c'est un achat à la carte/one-time
      const isOneTimeOrCart = period === 'one-time' || 
                             plan?.toLowerCase() === 'à la carte' || 
                             plan?.toLowerCase() === 'a la carte' || 
                             plan?.toLowerCase() === 'pay-as-you-go';
      
      // 2. Ajouter l'abonnement principal ou le pack de tokens
      if (!isOneTimeOrCart) {
        products.subscriptionId = productDetails.id;
      } else {
        products.tokenPackId = productDetails.id;
      }
      
      // 3. Ajouter le pack de tokens supplémentaires si nécessaire
      if (additionalTokens > 0 && period !== 'one-time') {
        // Récupérer l'ID du produit pour les tokens supplémentaires
        const tokenPackId = productManager.getTokenPackId(plan || '', additionalTokens);
        if (tokenPackId) {
          products.tokenPackId = tokenPackId;
        } else {
          console.error(`Token pack non trouvé pour ${additionalTokens} tokens`);
        }
      }
      
      // 4. Construire l'URL avec uniquement le paramètre products
      // La méthode buildCheckoutUrl construit désormais l'URL sans encodage des caractères spéciaux
      const checkoutUrl = productManager.buildCheckoutUrl(products);
      console.log('URL de checkout générée lors de la soumission:', checkoutUrl);
      
      // 5. Stocker les informations utilisateur dans le localStorage ou cookies si nécessaire
      if (typeof window !== 'undefined') {
        localStorage.setItem('checkout_firstName', firstName);
        localStorage.setItem('checkout_lastName', lastName);
        localStorage.setItem('checkout_email', email);
        localStorage.setItem('checkout_newsletter', acceptedNewsletter ? '1' : '0');
      }
      
      // 6. Redirection directement vers l'URL de checkout
      // Utiliser l'URL telle quelle, sans manipulation supplémentaire pour éviter tout encodage
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Erreur lors de la construction de l\'URL de checkout:', error);
      alert('Une erreur est survenue lors de la préparation de la commande');
    }
  };

  const translatePeriod = (period: string | null): string => {
    if (!period) return '';
    
    const periodLower = period.toLowerCase();
    
    switch (periodLower) {
      case 'monthly': return 'mensuelle';
      case 'quarterly': return 'trimestrielle';
      case 'biweekly':
      case 'bi-weekly': return 'bi-hebdomadaire';
      case 'yearly': 
      case 'annualy': return 'annuelle';
      default: return period;
    }
  };

  if (loading) {
  return (
      <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 text-orange-500 animate-spin" />
          <p className="text-gray-700">Chargement des informations de paiement...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-red-500">{error}</p>
          <Button onClick={() => window.history.back()} 
            className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600">
            Retour
          </Button>
                </div>
              </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 relative overflow-hidden">
      {/* Effet de fond */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5"></div>
      
      {/* Éléments décoratifs */}
      <div className="absolute top-1/3 -left-32 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 -right-32 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-orange-100">
            <h1 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500">
              Finaliser votre commande
            </h1>
            
            {productDetails && (
              <div className="bg-white rounded-lg p-6 mb-8 border border-orange-200 shadow-sm bg-orange-50/50">
                <h2 className="text-2xl font-bold mb-4 text-orange-700">Récapitulatif de la commande</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-800 font-medium">Plan sélectionné</span>
                    <span className="font-semibold text-gray-900">{productDetails.name}</span>
                        </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-800 font-medium">Prix de base</span>
                    <span className="font-semibold text-gray-900">{productDetails.price.toFixed(2)} €</span>
                    </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-800 font-medium">Tokens inclus</span>
                    <span className="font-semibold text-gray-900">{productDetails.includedTokens}</span>
                  </div>
                  {period !== 'one-time' && additionalTokens > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-800 font-medium">Tokens supplémentaires</span>
                      <span className="font-semibold text-gray-900">{additionalTokens} tokens (+{(additionalTokens * productDetails.additionalTokenPrice).toFixed(2)} €)</span>
                </div>
              )}
                  {period !== 'one-time' && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-800 font-medium">Prix des tokens supplémentaires</span>
                      <span className="font-semibold text-gray-900">{productDetails.additionalTokenPrice.toFixed(2)} €/token</span>
                    </div>
                  )}
                  {period !== 'one-time' && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-800 font-medium">Prochaine facturation</span>
                      <span className="font-semibold text-gray-900">{productDetails.nextBillingDate}</span>
                  </div>
                )}
                  {period === 'one-time' && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-800 font-medium">Prix unitaire</span>
                      <span className="font-semibold text-gray-900">{productDetails.additionalTokenPrice.toFixed(2)} €/token</span>
                      </div>
                  )}
                  <div className="border-t border-orange-200 pt-4 mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-800 font-medium">À payer aujourd'hui</span>
                      <span className="font-semibold text-gray-900">{totalPrice.toFixed(2)} €</span>
                    </div>
                    {period !== 'one-time' && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-800 font-medium">Prochain débit automatique</span>
                        <span className="font-semibold text-gray-900">{productDetails?.price.toFixed(2)} €</span>
                  </div>
                )}
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-lg font-bold text-gray-800">Total</span>
                      <span className="text-xl font-bold text-orange-600">{totalPrice.toFixed(2)} €</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-800">Prénom</label>
                  <Input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="border-orange-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    placeholder="Votre prénom"
                  />
            </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-800">Nom</label>
                  <Input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="border-orange-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    placeholder="Votre nom"
                  />
                </div>
                    </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-800">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-orange-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  placeholder="votre@email.com"
                />
                    </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-800">Tokens supplémentaires</label>
                {period !== 'one-time' ? (
                  <Select 
                    onValueChange={(value) => setAdditionalTokens(parseInt(value))} 
                    defaultValue="0"
                  >
                    <SelectTrigger className="border-orange-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500">
                      <SelectValue placeholder="Choisir le nombre de tokens" />
                    </SelectTrigger>
                    <SelectContent>
                      {tokenOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value.toString()}>
                          {option.label} {option.value > 0 && `(+${(option.value * (productDetails?.additionalTokenPrice || 0)).toFixed(2)} €)`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="p-3 border rounded-md border-orange-200 bg-orange-50 text-gray-700">
                    Vous avez sélectionné {productDetails?.includedTokens} tokens
                  </div>
                )}
                <p className="text-xs text-gray-600 mt-1">
                  {period !== 'one-time' 
                    ? "Ajoutez des tokens pour analyser davantage de campagnes" 
                    : "Les tokens sont valables pendant un an après l'achat"}
                </p>
            </div>

              <div className="space-y-4 pt-4 border-t border-orange-100">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="age"
                    checked={acceptedAgeVerification}
                    onCheckedChange={(checked) => setAcceptedAgeVerification(checked as boolean)}
                    className="text-orange-500 focus:ring-orange-500 border-orange-200 mt-1"
                  />
                  <label htmlFor="age" className="text-sm text-gray-800">
                    Je certifie avoir au moins 18 ans.
                  </label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={acceptedTerms}
                    onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                    className="text-orange-500 focus:ring-orange-500 border-orange-200 mt-1"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-800">
                    <span>En cochant cette case, j'accepte :</span>
                    <ul className="list-disc ml-5 mt-1 space-y-1">
                      <li>Le débit immédiat de {totalPrice.toFixed(2)} €</li>
                      {period !== 'one-time' ? (
                        <li>Le débit automatique de {productDetails?.price.toFixed(2)} € tous les {translatePeriod(period)} pour mon abonnement {plan} (période de facturation : {translatePeriod(period)})</li>
                      ) : (
                        <li>Que cet achat est unique et qu'il n'y aura pas de facturation récurrente</li>
                      )}
                      <li>
                        Les <button type="button" onClick={() => openLegalModal('terms')} className="text-orange-600 hover:text-orange-700 underline">Conditions Générales</button>, 
                        {' '}<button type="button" onClick={() => openLegalModal('privacy')} className="text-orange-600 hover:text-orange-700 underline">Politique de Confidentialité</button>, 
                        et <button type="button" onClick={() => openLegalModal('refund')} className="text-orange-600 hover:text-orange-700 underline">Politique de Remboursement</button>
                      </li>
                    </ul>
                  </label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="newsletter"
                    checked={acceptedNewsletter}
                    onCheckedChange={(checked) => setAcceptedNewsletter(checked as boolean)}
                    className="text-orange-500 focus:ring-orange-500 border-orange-200 mt-1"
                  />
                  <label htmlFor="newsletter" className="text-sm text-gray-800">
                    J'accepte de recevoir la newsletter et les notifications (optionnel).
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full mt-8 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white py-6 text-lg font-semibold rounded-xl"
              >
                Procéder au paiement
              </Button>
            </form>
          </div>
        </motion.div>
            </div>
            
      {/* Modales pour les documents légaux */}
      <LegalModal 
        open={legalModalOpen}
        onOpenChange={setLegalModalOpen}
        documentType={currentLegalDocument}
      />
    </div>
  );
}

export default function PreCheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 text-orange-500 animate-spin" />
          <p className="text-gray-700">Chargement...</p>
        </div>
      </div>
    }>
      <PreCheckoutContent />
    </Suspense>
  );
} 