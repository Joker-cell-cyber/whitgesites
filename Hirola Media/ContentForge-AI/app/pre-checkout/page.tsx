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
import { Shield, CreditCard, Zap } from 'lucide-react';
import { ProductManager, ProductDetails } from '@/lib/product-utils';

export default function PreCheckout() {
  // État pour le chargement initial
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler un délai de chargement pour afficher le loader
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-ocrf-anthracite-900 to-ocrf-brown-900">
      <main className="flex-1">
        <div className="container px-4 py-10 mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-80">
              <div className="w-16 h-16 border-4 border-t-ocrf-gold-500 border-r-ocrf-gold-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <PreCheckoutContent />
          )}
        </div>
      </main>
    </div>
  );
}

function PreCheckoutContent() {
  const searchParams = useSearchParams();
  const [productManager, setProductManager] = useState<ProductManager | null>(null);
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(null);
  const [additionalTokens, setAdditionalTokens] = useState(0);
  const [availableTokenOptions, setAvailableTokenOptions] = useState<number[]>([]);
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isNewsletterAccepted, setIsNewsletterAccepted] = useState(false);
  const [isSubscriptionAccepted, setIsSubscriptionAccepted] = useState(false);
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const [additionalTokensPrice, setAdditionalTokensPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isOneTime, setIsOneTime] = useState(false);
  
  // Données utilisateur
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  
  // Récupérer les paramètres d'URL
  const planParam = searchParams.get('plan');
  const periodParam = searchParams.get('period');
  const tokens = searchParams.get('tokens');
  const tokenPrice = searchParams.get('tokenPrice');
  const isTokenPage = periodParam === 'once' && tokens !== null;  // Vérifie si on provient de la page /tokens
  
  // Initialiser le ProductManager
  useEffect(() => {
    const initManager = async () => {
      try {
        // Récupérer l'instance du ProductManager
        const manager = ProductManager.getInstance();
        await manager.initialize();
        setProductManager(manager);
        
        // Pour la page tokens, on a juste besoin des informations de base
        if (isTokenPage && tokens) {
          const tokenCount = parseInt(tokens);
          const price = tokenPrice ? parseFloat(tokenPrice) : 0.35; // Prix par défaut à 0.35€ par token
          const totalTokenPrice = tokenCount * price;
          
          setProductDetails({
            id: '',
            name: 'Pack de tokens Pro',
            price: totalTokenPrice,
            nextBillingDate: 'N/A',
            includedTokens: tokenCount,
            additionalTokenPrice: price
          });
          
          setTotalPrice(totalTokenPrice);
          setIsOneTime(true);
          return;
        }
        
        // Pour les achats à la carte depuis la page d'accueil
        if (planParam?.toLowerCase() === 'pay-as-you-go' && tokens) {
          const tokenCount = parseInt(tokens);
          const pricePerToken = tokenPrice ? parseFloat(tokenPrice) : 0.9;
          const finalPrice = totalPrice || tokenCount * pricePerToken;
          
          setProductDetails({
            id: '',
            name: `Pack de ${tokenCount} tokens`,
            price: finalPrice,
            nextBillingDate: 'N/A',
            includedTokens: tokenCount,
            additionalTokenPrice: pricePerToken
          });
          
          setTotalPrice(finalPrice);
          setIsOneTime(true);
          return;
        }
        
        // Vérifier que les paramètres nécessaires sont présents
        if (!planParam || !periodParam) {
          throw new Error('Paramètres manquants dans l\'URL');
        }
        
        // Vérifier si c'est un achat unique (pay-as-you-go)
        const isOneTimePayment = periodParam.toLowerCase() === 'one-time';
        setIsOneTime(isOneTimePayment);
        
        // Vérifier que les tokens sont spécifiés pour un achat unique
        if (isOneTimePayment && !tokens) {
          throw new Error('Nombre de tokens requis pour un achat unique');
        }
        
        // Récupérer les détails du produit
        const details = manager.getProductDetails(planParam, periodParam);
        setProductDetails(details);
        setTotalPrice(details.price);
        
        // Définir les options de tokens disponibles pour les tokens supplémentaires
        setAvailableTokenOptions([10, 20, 50, 100, 200, 300, 500]);
        
      } catch (error) {
        console.error('Erreur lors de l\'initialisation:', error);
        // Gérer l'erreur (redirection, message, etc.)
      }
    };
    
    initManager();
  }, [planParam, periodParam, tokens, tokenPrice, isTokenPage]);
  
  // Mettre à jour le prix des tokens supplémentaires lorsque la sélection change
  useEffect(() => {
    if (productDetails && additionalTokens > 0) {
      const newPrice = additionalTokens * productDetails.additionalTokenPrice;
      setAdditionalTokensPrice(newPrice);
      setTotalPrice(productDetails.price + newPrice);
    } else if (productDetails) {
      setTotalPrice(productDetails.price);
    }
  }, [additionalTokens, productDetails]);
  
  // Valider l'email
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(regex.test(email));
  };
  
  // Traduire la période en format lisible
  const translatePeriod = (period: string): string => {
    if (!period) return '';
    
    const periodLower = period.toLowerCase();
    
    if (periodLower === 'monthly') return 'mensuelle';
    if (periodLower === 'quarterly') return 'trimestrielle';
    if (periodLower === 'bi-weekly') return 'bi-hebdomadaire';
    if (periodLower === 'biweekly') return 'bi-hebdomadaire';
    if (periodLower === 'yearly' || periodLower === 'annual' || periodLower === 'annualy') return 'annuelle';
    if (periodLower === 'one-time') return 'paiement unique';
    
    return periodLower;
  };
  
  // Fonction pour obtenir un ID de token pack de secours basé sur le nombre de tokens
  const getFallbackTokenPackId = (tokenCount: number, plan: string = 'pay-as-you-go'): string => {
    // Normaliser le plan pour éviter les problèmes de casse
    const planLower = plan.toLowerCase();
    
    if (planLower === 'pro') {
      // IDs des produits Pro dans le CSV (0,35€/token)
      if (tokenCount <= 10) return "37967";  // 10 TOKEN PACK
      if (tokenCount <= 20) return "37968";  // 20 TOKEN PACK
      if (tokenCount <= 30) return "37969";  // 30 TOKEN PACK
      if (tokenCount <= 40) return "37970";  // 40 TOKEN PACK
      if (tokenCount <= 50) return "37971";  // 50 TOKEN PACK
      if (tokenCount <= 60) return "37972";  // 60 TOKEN PACK
      if (tokenCount <= 70) return "37973";  // 70 TOKEN PACK
      if (tokenCount <= 80) return "37974";  // 80 TOKEN PACK
      if (tokenCount <= 90) return "37975";  // 90 TOKEN PACK
      if (tokenCount <= 100) return "37976"; // 100 TOKEN PACK
      if (tokenCount <= 150) return "37981"; // 150 TOKEN PACK
      if (tokenCount <= 200) return "37986"; // 200 TOKEN PACK
      if (tokenCount <= 250) return "37991"; // 250 TOKEN PACK
      if (tokenCount <= 300) return "37996"; // 300 TOKEN PACK
      if (tokenCount <= 350) return "38001"; // 350 TOKEN PACK
      if (tokenCount <= 400) return "38006"; // 400 TOKEN PACK
      if (tokenCount <= 450) return "38011"; // 450 TOKEN PACK
      if (tokenCount <= 500) return "38016"; // 500 TOKEN PACK
      return "38016"; // 500 TOKEN PACK par défaut pour Pro
    } 
    else if (planLower === 'advanced') {
      // IDs des produits Advanced dans le CSV (0,45€/token)
      if (tokenCount <= 10) return "37767";  // 10 TOKEN PACK
      if (tokenCount <= 20) return "37768";  // 20 TOKEN PACK
      if (tokenCount <= 30) return "37769";  // 30 TOKEN PACK
      if (tokenCount <= 40) return "37770";  // 40 TOKEN PACK
      if (tokenCount <= 50) return "37771";  // 50 TOKEN PACK
      if (tokenCount <= 60) return "37772";  // 60 TOKEN PACK
      if (tokenCount <= 70) return "37773";  // 70 TOKEN PACK
      if (tokenCount <= 80) return "37774";  // 80 TOKEN PACK
      if (tokenCount <= 90) return "37775";  // 90 TOKEN PACK
      if (tokenCount <= 100) return "37776"; // 100 TOKEN PACK
      if (tokenCount <= 150) return "37781"; // 150 TOKEN PACK
      if (tokenCount <= 200) return "37786"; // 200 TOKEN PACK
      if (tokenCount <= 250) return "37791"; // 250 TOKEN PACK
      if (tokenCount <= 300) return "37796"; // 300 TOKEN PACK
      if (tokenCount <= 350) return "37801"; // 350 TOKEN PACK
      if (tokenCount <= 400) return "37806"; // 400 TOKEN PACK
      if (tokenCount <= 450) return "37811"; // 450 TOKEN PACK
      if (tokenCount <= 500) return "37816"; // 500 TOKEN PACK
      return "37816"; // 500 TOKEN PACK par défaut pour Advanced
    }
    else if (planLower === 'basic') {
      // IDs des produits Basic dans le CSV (0,60€/token)
      if (tokenCount <= 10) return "37817";  // 10 TOKEN PACK
      if (tokenCount <= 20) return "37818";  // 20 TOKEN PACK
      if (tokenCount <= 30) return "37819";  // 30 TOKEN PACK
      if (tokenCount <= 40) return "37820";  // 40 TOKEN PACK
      if (tokenCount <= 50) return "37821";  // 50 TOKEN PACK
      if (tokenCount <= 60) return "37822";  // 60 TOKEN PACK
      if (tokenCount <= 70) return "37823";  // 70 TOKEN PACK
      if (tokenCount <= 80) return "37824";  // 80 TOKEN PACK
      if (tokenCount <= 90) return "37825";  // 90 TOKEN PACK
      if (tokenCount <= 100) return "37826"; // 100 TOKEN PACK
      if (tokenCount <= 150) return "37831"; // 150 TOKEN PACK
      if (tokenCount <= 200) return "37836"; // 200 TOKEN PACK
      if (tokenCount <= 250) return "37841"; // 250 TOKEN PACK
      if (tokenCount <= 300) return "37846"; // 300 TOKEN PACK
      if (tokenCount <= 350) return "37851"; // 350 TOKEN PACK
      if (tokenCount <= 400) return "37856"; // 400 TOKEN PACK
      if (tokenCount <= 450) return "37861"; // 450 TOKEN PACK
      if (tokenCount <= 500) return "37866"; // 500 TOKEN PACK
      return "37866"; // 500 TOKEN PACK par défaut pour Basic
    }
    else if (planLower === 'lite') {
      // IDs des produits Lite dans le CSV (0,75€/token)
      if (tokenCount <= 10) return "37917";  // 10 TOKEN PACK
      if (tokenCount <= 20) return "37918";  // 20 TOKEN PACK
      if (tokenCount <= 30) return "37919";  // 30 TOKEN PACK
      if (tokenCount <= 40) return "37920";  // 40 TOKEN PACK
      if (tokenCount <= 50) return "37921";  // 50 TOKEN PACK
      if (tokenCount <= 60) return "37922";  // 60 TOKEN PACK
      if (tokenCount <= 70) return "37923";  // 70 TOKEN PACK
      if (tokenCount <= 80) return "37924";  // 80 TOKEN PACK
      if (tokenCount <= 90) return "37925";  // 90 TOKEN PACK
      if (tokenCount <= 100) return "37926"; // 100 TOKEN PACK
      if (tokenCount <= 150) return "37931"; // 150 TOKEN PACK
      if (tokenCount <= 200) return "37936"; // 200 TOKEN PACK
      if (tokenCount <= 250) return "37941"; // 250 TOKEN PACK
      if (tokenCount <= 300) return "37946"; // 300 TOKEN PACK
      if (tokenCount <= 350) return "37951"; // 350 TOKEN PACK
      if (tokenCount <= 400) return "37956"; // 400 TOKEN PACK
      if (tokenCount <= 450) return "37961"; // 450 TOKEN PACK
      if (tokenCount <= 500) return "37966"; // 500 TOKEN PACK
      return "37966"; // 500 TOKEN PACK par défaut pour Lite
    }
    else {
      // IDs des produits à la carte dans le CSV (0,90€/token)
      if (tokenCount <= 10) return "37867";  // 10 TOKEN PACK
      if (tokenCount <= 20) return "37868";  // 20 TOKEN PACK
      if (tokenCount <= 30) return "37869";  // 30 TOKEN PACK
      if (tokenCount <= 40) return "37870";  // 40 TOKEN PACK
      if (tokenCount <= 50) return "37871";  // 50 TOKEN PACK
      if (tokenCount <= 60) return "37872";  // 60 TOKEN PACK
      if (tokenCount <= 70) return "37873";  // 70 TOKEN PACK
      if (tokenCount <= 80) return "37874";  // 80 TOKEN PACK
      if (tokenCount <= 90) return "37875";  // 90 TOKEN PACK
      if (tokenCount <= 100) return "37876"; // 100 TOKEN PACK
      if (tokenCount <= 150) return "37881"; // 150 TOKEN PACK
      if (tokenCount <= 200) return "37886"; // 200 TOKEN PACK
      if (tokenCount <= 250) return "37891"; // 250 TOKEN PACK
      if (tokenCount <= 300) return "37896"; // 300 TOKEN PACK
      if (tokenCount <= 350) return "37901"; // 350 TOKEN PACK
      if (tokenCount <= 400) return "37906"; // 400 TOKEN PACK
      if (tokenCount <= 450) return "37911"; // 450 TOKEN PACK
      if (tokenCount <= 500) return "37916"; // 500 TOKEN PACK
      return "37916"; // 500 TOKEN PACK par défaut pour pay-as-you-go
    }
  };
  
  // Gérer la soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vérifier que les conditions sont acceptées
    if (!isTermsAccepted || !isAgeVerified) {
      alert('Veuillez accepter les conditions requises pour continuer');
      return;
    }
    
    // Vérifier que le consentement à l'abonnement est accepté pour les abonnements
    if (!isOneTime && !isSubscriptionAccepted) {
      alert('Veuillez accepter les conditions de l\'abonnement pour continuer');
      return;
    }
    
    // Vérifier que l'email est valide
    if (!isValidEmail) {
      alert('Veuillez entrer un email valide');
      return;
    }
    
    // Vérifier que le ProductManager est initialisé
    if (!productManager || !productDetails) {
      alert('Erreur lors de la préparation de la commande');
      return;
    }
    
    try {
      // Construire l'objet pour l'URL de checkout
      const products: {
        subscriptionId?: string;
        tokenPackId?: string;
      } = {};
      
      // Pour la page tokens, utiliser directement l'ID du CSV
      if (isTokenPage && tokens) {
        const tokenCount = parseInt(tokens);
        console.log("Tentative d'achat pour", tokenCount, "tokens");
        
        try {
          // Utiliser en priorité la méthode getTokenPackIdByPlan si elle existe
          // On passe le plan 'pro' car on vient de la page /tokens
          if (productManager && typeof productManager.getTokenPackIdByPlan === 'function') {
            products.tokenPackId = productManager.getTokenPackIdByPlan(tokenCount, 'pro');
            console.log("ID de produit obtenu via getTokenPackIdByPlan (Pro):", products.tokenPackId);
          } else if (productManager && typeof productManager.getTokenPackIdFromCSV === 'function') {
            // Vérifier si la nouvelle version de getTokenPackIdFromCSV prend une chaîne ou utiliser l'ancienne version si elle prend un booléen
            try {
              products.tokenPackId = productManager.getTokenPackIdFromCSV(tokenCount, 'pro');
            } catch (e) {
              // Essayer l'ancienne signature si la nouvelle échoue
              console.log("Utilisation de l'ancienne version de getTokenPackIdFromCSV");
              // @ts-ignore - On ignore l'erreur de type car on sait que l'ancienne version accepte un booléen
              products.tokenPackId = productManager.getTokenPackIdFromCSV(tokenCount, true);
            }
            console.log("ID de produit obtenu via getTokenPackIdFromCSV (Pro):", products.tokenPackId);
          } else {
            // Fallback sur la fonction locale, avec plan='pro'
            products.tokenPackId = getFallbackTokenPackId(tokenCount, 'pro');
            console.log("ID de produit obtenu via getFallbackTokenPackId (Pro):", products.tokenPackId);
          }
        } catch (error) {
          console.error("Erreur lors de la récupération de l'ID du token pack:", error);
          // Garantie qu'on aura toujours un ID (utiliser l'ID Pro pour 100 tokens)
          products.tokenPackId = "37976"; // Pro 100 TOKEN PACK par défaut
        }
      }
      // Pour les autres cas, suivre la logique habituelle
      else if (!isOneTime) {
        // Pour les abonnements, utiliser l'ID d'abonnement
        const subscriptionId = productManager.getSubscriptionId(planParam || '', periodParam || '');
        if (!subscriptionId) {
          throw new Error(`Produit non trouvé pour le plan ${planParam} et la période ${periodParam}`);
        }
        products.subscriptionId = subscriptionId;
        
        // Ajouter des tokens supplémentaires si nécessaire
        if (additionalTokens > 0) {
          try {
            // Essayer d'utiliser getTokenPackIdByPlan en priorité si disponible
            if (productManager && typeof productManager.getTokenPackIdByPlan === 'function') {
              const tokenPackId = productManager.getTokenPackIdByPlan(additionalTokens, planParam || '');
              if (tokenPackId) {
                products.tokenPackId = tokenPackId;
              } else {
                // Utiliser l'ID de secours si nécessaire
                products.tokenPackId = getFallbackTokenPackId(additionalTokens, planParam || '');
              }
            } else {
              // Fallback sur getTokenPackId ou getFallbackTokenPackId
              const tokenPackId = productManager.getTokenPackId(planParam || '', additionalTokens);
              if (tokenPackId) {
                products.tokenPackId = tokenPackId;
              } else {
                // Utiliser l'ID de secours si nécessaire
                products.tokenPackId = getFallbackTokenPackId(additionalTokens, planParam || '');
              }
            }
          } catch (error) {
            console.error("Erreur avec les tokens supplémentaires:", error);
            products.tokenPackId = getFallbackTokenPackId(additionalTokens, planParam || '');
          }
        }
      } else {
        // Pour les achats uniques (pay-as-you-go), utiliser aussi l'ID direct du CSV
        const tokenCount = parseInt(tokens || '0');
        products.tokenPackId = getFallbackTokenPackId(tokenCount, 'pay-as-you-go');
      }
      
      // Construire l'URL de checkout
      const checkoutUrl = productManager.buildCheckoutUrl(products);
      
      // Stocker les informations utilisateur dans localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('checkout_firstName', firstName);
        localStorage.setItem('checkout_lastName', lastName);
        localStorage.setItem('checkout_email', email);
        localStorage.setItem('checkout_newsletter', isNewsletterAccepted ? '1' : '0');
      }
      
      // Rediriger vers la page de checkout
      window.location.href = checkoutUrl;
      
    } catch (error) {
      console.error('Erreur lors de la construction de l\'URL de checkout:', error);
      alert('Une erreur est survenue lors de la préparation de la commande');
    }
  };
  
  // Afficher le contenu d'une page légale
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
  
  // Si les données ne sont pas encore chargées, afficher un loader
  if (!productDetails || !productManager) {
    return (
      <div className="flex items-center justify-center h-80">
        <div className="w-16 h-16 border-4 border-t-ocrf-gold-500 border-r-ocrf-gold-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  // Version simplifiée pour la page /tokens
  if (isTokenPage) {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-ocrf-gold-300 to-ocrf-copper-400">
            Achat de tokens
          </h1>
          <p className="text-ocrf-brown-100 mt-2">
            Ajoutez des tokens pour générer plus de contenu
          </p>
        </div>
        
        <div className="bg-ocrf-anthracite-800/50 backdrop-blur-sm border border-ocrf-gold-500/10 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-white">Récapitulatif de votre commande</h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-ocrf-brown-200">Pack</p>
              <p className="text-base font-medium text-white">{productDetails.name}</p>
            </div>
            
            <div>
              <p className="text-sm text-ocrf-brown-200">Nombre de tokens</p>
              <p className="text-base font-medium text-white">{productDetails.includedTokens} tokens</p>
            </div>
            
            <div>
              <p className="text-sm text-ocrf-brown-200">Prix par token</p>
              <p className="text-base font-medium text-white">{productDetails.additionalTokenPrice.toFixed(2)}€</p>
            </div>
            
            <div className="border-t border-ocrf-gold-500/10 pt-4 mt-4">
              <div className="flex justify-between mt-4">
                <p className="text-base font-medium text-white">Total</p>
                <p className="text-base font-bold text-ocrf-gold-400">{totalPrice.toFixed(2)}€</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-ocrf-anthracite-800/50 backdrop-blur-sm border border-ocrf-gold-500/10 rounded-xl p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4 pt-4">
              <div className="flex items-start">
                <Checkbox
                  id="terms"
                  checked={isTermsAccepted}
                  onCheckedChange={(checked) => setIsTermsAccepted(checked as boolean)}
                  className="mt-1 bg-ocrf-anthracite-700 border-ocrf-gold-500/20 data-[state=checked]:bg-ocrf-gold-500"
                  required
                />
                <label htmlFor="terms" className="ml-2 text-sm text-ocrf-brown-200">
                  J'accepte les{' '}
                  <button
                    type="button"
                    onClick={() => setOpenDialog('terms')}
                    className="text-ocrf-gold-400 hover:underline"
                  >
                    conditions générales d'utilisation
                  </button>{' '}
                  et la{' '}
                  <button
                    type="button"
                    onClick={() => setOpenDialog('privacy')}
                    className="text-ocrf-gold-400 hover:underline"
                  >
                    politique de confidentialité
                  </button>
                </label>
              </div>
              
              <div className="flex items-start">
                <Checkbox
                  id="age"
                  checked={isAgeVerified}
                  onCheckedChange={(checked) => setIsAgeVerified(checked as boolean)}
                  className="mt-1 bg-ocrf-anthracite-700 border-ocrf-gold-500/20 data-[state=checked]:bg-ocrf-gold-500"
                  required
                />
                <label htmlFor="age" className="ml-2 text-sm text-ocrf-brown-200">
                  Je certifie avoir au moins 18 ans et j'accepte la{' '}
                  <button
                    type="button"
                    onClick={() => setOpenDialog('refund')}
                    className="text-ocrf-gold-400 hover:underline"
                  >
                    politique de remboursement
                  </button>
                </label>
              </div>
            </div>
            
            <div className="pt-6">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-ocrf-gold-400 to-ocrf-copper-500 hover:from-ocrf-gold-300 hover:to-ocrf-copper-400 text-black font-medium py-2 rounded-lg flex items-center justify-center"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Procéder au paiement
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  return (
    <div className="mx-auto max-w-3xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-ocrf-gold-300 to-ocrf-copper-400">
          Finaliser votre commande
        </h1>
        <p className="text-ocrf-brown-100 mt-2">
          {isOneTime ? "Achat de tokens" : "Abonnement"} ContentForge AI
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Récapitulatif de la commande */}
        <div className="md:col-span-1">
          <div className="bg-ocrf-anthracite-800/50 backdrop-blur-sm border border-ocrf-gold-500/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Votre commande</h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-ocrf-brown-200">Plan</p>
                <p className="text-base font-medium text-white">{planParam}</p>
              </div>
              
              {!isOneTime && (
                <div>
                  <p className="text-sm text-ocrf-brown-200">Facturation</p>
                  <p className="text-base font-medium text-white">{translatePeriod(periodParam || '')}</p>
                </div>
              )}
              
              <div>
                <p className="text-sm text-ocrf-brown-200">
                  {isOneTime ? "Nombre de tokens" : "Tokens inclus"}
                </p>
                <p className="text-base font-medium text-white">
                  {isOneTime ? tokens : productDetails.includedTokens} tokens
                </p>
              </div>
              
              {isOneTime && (
                <div>
                  <p className="text-sm text-ocrf-brown-200">Prix par token</p>
                  <p className="text-base font-medium text-white">{productDetails.additionalTokenPrice.toFixed(2)}€</p>
                </div>
              )}
              
              {!isOneTime && additionalTokens > 0 && (
                <div>
                  <p className="text-sm text-ocrf-brown-200">Tokens supplémentaires</p>
                  <p className="text-base font-medium text-white">{additionalTokens} tokens</p>
                </div>
              )}
              
              {!isOneTime && (
                <div>
                  <p className="text-sm text-ocrf-brown-200">Prochain débit</p>
                  <p className="text-base font-medium text-white">{productDetails.nextBillingDate}</p>
                </div>
              )}
              
              <div className="border-t border-ocrf-gold-500/10 pt-4 mt-4">
                <div className="flex justify-between">
                  <p className="text-sm text-ocrf-brown-200">Prix de base</p>
                  <p className="text-sm font-medium text-white">
                    {isOneTime ? 
                      `${productDetails.price.toFixed(2)}€` : 
                      `${productDetails.price.toFixed(2)}€${periodParam ? '/' + translatePeriod(periodParam) : ''}`
                    }
                  </p>
                </div>
                
                {!isOneTime && additionalTokens > 0 && (
                  <div className="flex justify-between mt-2">
                    <p className="text-sm text-ocrf-brown-200">Tokens supplémentaires (paiement unique)</p>
                    <p className="text-sm font-medium text-white">{additionalTokensPrice.toFixed(2)}€</p>
                  </div>
                )}
                
                <div className="flex justify-between mt-4 border-t border-ocrf-gold-500/10 pt-4">
                  <p className="text-base font-medium text-white">
                    {(!isOneTime && additionalTokens > 0) ? "Total aujourd'hui" : "Total"}
                  </p>
                  <p className="text-base font-bold text-ocrf-gold-400">
                    {isOneTime ? 
                      `${totalPrice.toFixed(2)}€` : 
                      `${totalPrice.toFixed(2)}€`
                    }
                  </p>
                </div>
                
                {!isOneTime && additionalTokens > 0 && (
                  <div className="flex justify-between mt-4 border-t border-ocrf-gold-500/10 pt-4">
                    <p className="text-base font-medium text-white">Paiements récurrents</p>
                    <p className="text-base font-medium text-ocrf-gold-400">
                      {`${productDetails.price.toFixed(2)}€${periodParam ? '/' + translatePeriod(periodParam) : ''}`}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Tokens supplémentaires (uniquement pour les abonnements) */}
          {!isOneTime && (
            <div className="mt-6 bg-ocrf-anthracite-800/50 backdrop-blur-sm border border-ocrf-gold-500/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4 text-white">Tokens supplémentaires</h2>
              
              <div className="space-y-4">
                <p className="text-sm text-ocrf-brown-200">
                  Ajoutez des tokens supplémentaires à votre abonnement (paiement unique).
                  <br/>
                  Prix: {productDetails.additionalTokenPrice.toFixed(2)}€ par token.
                  <br/>
                  <span className="text-ocrf-gold-300 font-medium">Ces tokens supplémentaires sont facturés une seule fois avec votre premier paiement.</span>
                </p>
                
                <Select
                  value={additionalTokens.toString()}
                  onValueChange={(value) => setAdditionalTokens(parseInt(value))}
                >
                  <SelectTrigger className="w-full bg-ocrf-anthracite-700 border-ocrf-gold-500/20">
                    <SelectValue placeholder="Sélectionner une quantité" />
                  </SelectTrigger>
                  <SelectContent className="bg-ocrf-anthracite-700 border-ocrf-gold-500/20">
                    <SelectItem value="0">Aucun token supplémentaire</SelectItem>
                    {availableTokenOptions.map((option) => (
                      <SelectItem key={option} value={option.toString()}>
                        {option} tokens - {(option * productDetails.additionalTokenPrice).toFixed(2)}€
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
        
        {/* Informations de paiement */}
        <div className="md:col-span-2">
          <div className="bg-ocrf-anthracite-800/50 backdrop-blur-sm border border-ocrf-gold-500/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Informations personnelles</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm text-ocrf-brown-200 mb-1">
                    Prénom
                  </label>
                  <Input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="bg-ocrf-anthracite-700 border-ocrf-gold-500/20"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm text-ocrf-brown-200 mb-1">
                    Nom
                  </label>
                  <Input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="bg-ocrf-anthracite-700 border-ocrf-gold-500/20"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm text-ocrf-brown-200 mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validateEmail(e.target.value);
                  }}
                  required
                  className={`bg-ocrf-anthracite-700 border-ocrf-gold-500/20 ${
                    !isValidEmail && email ? 'border-red-500' : ''
                  }`}
                />
                {!isValidEmail && email && (
                  <p className="text-red-500 text-xs mt-1">
                    Veuillez entrer une adresse email valide
                  </p>
                )}
              </div>
              
              <div className="space-y-4 pt-4 border-t border-ocrf-gold-500/10">
                <div className="flex items-start">
                  <Checkbox
                    id="terms"
                    checked={isTermsAccepted}
                    onCheckedChange={(checked) => setIsTermsAccepted(checked as boolean)}
                    className="mt-1 bg-ocrf-anthracite-700 border-ocrf-gold-500/20 data-[state=checked]:bg-ocrf-gold-500"
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-ocrf-brown-200">
                    J'accepte les{' '}
                    <button
                      type="button"
                      onClick={() => setOpenDialog('terms')}
                      className="text-ocrf-gold-400 hover:underline"
                    >
                      conditions générales d'utilisation
                    </button>{' '}
                    et la{' '}
                    <button
                      type="button"
                      onClick={() => setOpenDialog('privacy')}
                      className="text-ocrf-gold-400 hover:underline"
                    >
                      politique de confidentialité
                    </button>
                  </label>
                </div>
                
                {/* Condition pour l'abonnement - uniquement pour les abonnements */}
                {!isOneTime && (
                  <div className="flex items-start">
                    <Checkbox
                      id="subscription"
                      checked={isSubscriptionAccepted}
                      onCheckedChange={(checked) => setIsSubscriptionAccepted(checked as boolean)}
                      className="mt-1 bg-ocrf-anthracite-700 border-ocrf-gold-500/20 data-[state=checked]:bg-ocrf-gold-500"
                      required
                    />
                    <label htmlFor="subscription" className="ml-2 text-sm text-ocrf-brown-200">
                      {additionalTokens > 0 ? (
                        <>
                          Je comprends et j'accepte que :
                          <ul className="list-disc pl-5 mt-1 space-y-1">
                            <li>
                              Mon compte sera débité aujourd'hui de <span className="font-semibold text-ocrf-gold-400">{totalPrice.toFixed(2)}€</span>{' '}
                              (abonnement de {productDetails.price.toFixed(2)}€ + {additionalTokensPrice.toFixed(2)}€ de tokens supplémentaires)
                            </li>
                            <li>
                              Les paiements récurrents de <span className="font-semibold text-ocrf-gold-400">{productDetails.price.toFixed(2)}€</span>{' '}
                              seront automatiquement prélevés le{' '}<span className="font-semibold text-ocrf-gold-400">{productDetails?.nextBillingDate}</span>{' '}
                              puis régulièrement selon ma période de facturation{' '}
                              <span className="font-semibold text-ocrf-gold-400">{translatePeriod(periodParam || '')}</span>.
                            </li>
                            <li>
                              L'achat de tokens supplémentaires est un paiement unique non récurrent.
                            </li>
                          </ul>
                        </>
                      ) : (
                        <>
                          Je comprends et j'accepte que mon compte sera débité automatiquement de{' '}
                          <span className="font-semibold text-ocrf-gold-400">{totalPrice.toFixed(2)}€</span>{' '}
                          le{' '}<span className="font-semibold text-ocrf-gold-400">{productDetails?.nextBillingDate}</span>{' '}
                          puis régulièrement selon ma période de facturation{' '}
                          <span className="font-semibold text-ocrf-gold-400">{translatePeriod(periodParam || '')}</span>.
                        </>
                      )}
                    </label>
                  </div>
                )}
                
                <div className="flex items-start">
                  <Checkbox
                    id="age"
                    checked={isAgeVerified}
                    onCheckedChange={(checked) => setIsAgeVerified(checked as boolean)}
                    className="mt-1 bg-ocrf-anthracite-700 border-ocrf-gold-500/20 data-[state=checked]:bg-ocrf-gold-500"
                  />
                  <label htmlFor="age" className="ml-2 text-sm text-ocrf-brown-200">
                    Je certifie avoir au moins 18 ans et j'accepte la{' '}
                    <button
                      type="button"
                      onClick={() => setOpenDialog('refund')}
                      className="text-ocrf-gold-400 hover:underline"
                    >
                      politique de remboursement
                    </button>
                  </label>
                </div>
                
                <div className="flex items-start">
                  <Checkbox
                    id="newsletter"
                    checked={isNewsletterAccepted}
                    onCheckedChange={(checked) => setIsNewsletterAccepted(checked as boolean)}
                    className="mt-1 bg-ocrf-anthracite-700 border-ocrf-gold-500/20 data-[state=checked]:bg-ocrf-gold-500"
                  />
                  <label htmlFor="newsletter" className="ml-2 text-sm text-ocrf-brown-200">
                    Je souhaite recevoir des offres promotionnelles et des conseils d'utilisation
                  </label>
                </div>
              </div>
              
              <div className="pt-6">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-ocrf-copper-500 to-ocrf-gold-500 hover:from-ocrf-copper-600 hover:to-ocrf-gold-600 text-white py-6"
                >
                  Procéder au paiement
                </Button>
                
                <div className="flex items-center justify-center space-x-6 mt-6">
                  <div className="flex items-center text-ocrf-brown-200 text-xs">
                    <Shield className="h-4 w-4 mr-1 text-ocrf-gold-400" />
                    Paiement sécurisé
                  </div>
                  <div className="flex items-center text-ocrf-brown-200 text-xs">
                    <CreditCard className="h-4 w-4 mr-1 text-ocrf-gold-400" />
                    Carte bancaire
                  </div>
                  <div className="flex items-center text-ocrf-brown-200 text-xs">
                    <Zap className="h-4 w-4 mr-1 text-ocrf-gold-400" />
                    Accès immédiat
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Dialogues pour les pages légales */}
      <Dialog open={openDialog === 'terms'} onOpenChange={(open) => !open && setOpenDialog(null)}>
        <DialogContent className="bg-ocrf-anthracite-800 border-ocrf-gold-500/20 max-w-3xl max-h-[80vh] overflow-y-auto custom-scrollbar">
          <DialogHeader>
            <DialogTitle className="text-white">Conditions générales d'utilisation</DialogTitle>
          </DialogHeader>
          {renderLegalContent(termsContent)}
          <DialogFooter>
            <Button 
              onClick={() => setOpenDialog(null)}
              className="bg-ocrf-gold-500 hover:bg-ocrf-gold-600 text-ocrf-anthracite-900"
            >
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={openDialog === 'privacy'} onOpenChange={(open) => !open && setOpenDialog(null)}>
        <DialogContent className="bg-ocrf-anthracite-800 border-ocrf-gold-500/20 max-w-3xl max-h-[80vh] overflow-y-auto custom-scrollbar">
          <DialogHeader>
            <DialogTitle className="text-white">Politique de confidentialité</DialogTitle>
          </DialogHeader>
          {renderLegalContent(privacyContent)}
          <DialogFooter>
            <Button 
              onClick={() => setOpenDialog(null)}
              className="bg-ocrf-gold-500 hover:bg-ocrf-gold-600 text-ocrf-anthracite-900"
            >
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={openDialog === 'refund'} onOpenChange={(open) => !open && setOpenDialog(null)}>
        <DialogContent className="bg-ocrf-anthracite-800 border-ocrf-gold-500/20 max-w-3xl max-h-[80vh] overflow-y-auto custom-scrollbar">
          <DialogHeader>
            <DialogTitle className="text-white">Politique de remboursement</DialogTitle>
          </DialogHeader>
          {renderLegalContent(refundContent)}
          <DialogFooter>
            <Button 
              onClick={() => setOpenDialog(null)}
              className="bg-ocrf-gold-500 hover:bg-ocrf-gold-600 text-ocrf-anthracite-900"
            >
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
