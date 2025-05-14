'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductManager } from '@/lib/product-utils';
import { ArrowLeft, Info, X } from 'lucide-react';
import Link from 'next/link';
// Import des contenus légaux
import { legalContent } from '@/app/legal-pages/legal';
import { termsContent } from '@/app/legal-pages/terms';
import { refundContent } from '@/app/legal-pages/refund';
import { privacyContent } from '@/app/legal-pages/privacy';

// Composants simples pour afficher le contenu légal
const LegalContentDisplay = () => (
  <div className="legal-content">
    <h1 className="text-2xl font-bold mb-6">{legalContent.title}</h1>
    {legalContent.content.map((section, index) => (
      <div key={index} className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
        <p className="whitespace-pre-line">{section.text}</p>
      </div>
    ))}
  </div>
);

const TermsContentDisplay = () => (
  <div className="legal-content">
    <h1 className="text-2xl font-bold mb-6">{termsContent.title}</h1>
    {termsContent.content.map((section, index) => (
      <div key={index} className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
        <p className="whitespace-pre-line">{section.text}</p>
      </div>
    ))}
  </div>
);

const RefundContentDisplay = () => (
  <div className="legal-content">
    <h1 className="text-2xl font-bold mb-6">{refundContent.title}</h1>
    {refundContent.content.map((section, index) => (
      <div key={index} className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
        <p className="whitespace-pre-line">{section.text}</p>
      </div>
    ))}
  </div>
);

const PrivacyContentDisplay = () => (
  <div className="legal-content">
    <h1 className="text-2xl font-bold mb-6">{privacyContent.title}</h1>
    {privacyContent.content.map((section, index) => (
      <div key={index} className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
        <p className="whitespace-pre-line">{section.text}</p>
      </div>
    ))}
  </div>
);

export default function PreCheckoutPage() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get('plan');
  const periodParam = searchParams.get('period');
  const tokens = searchParams.get('tokens');
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productManager, setProductManager] = useState<ProductManager | null>(null);
  const [productDetails, setProductDetails] = useState<any>(null);
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [additionalTokens, setAdditionalTokens] = useState(0);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedAgeVerification, setAcceptedAgeVerification] = useState(false);
  const [acceptedNewsletter, setAcceptedNewsletter] = useState(false);
  const [acceptedAutoRenewal, setAcceptedAutoRenewal] = useState(false);
  const [showLegalPopup, setShowLegalPopup] = useState(false);
  const [legalPopupContent, setLegalPopupContent] = useState<React.ReactNode | null>(null);
  const [legalPopupTitle, setLegalPopupTitle] = useState('');
  
  const isOneTime = periodParam === 'one-time';
  const plan = planParam || '';
  const period = periodParam || '';
  
  // Calculer les prix
  const basePrice = productDetails?.price || 0;
  const additionalTokensPrice = additionalTokens * (productDetails?.additionalTokenPrice || 0);
  const totalPrice = basePrice + additionalTokensPrice;
  
  useEffect(() => {
    const initialize = async () => {
      try {
        if (!planParam || !periodParam) {
          throw new Error('Plan et période requis');
        }
        
        // Pour les achats one-time de tokens, on doit avoir le paramètre tokens
        if (periodParam === 'one-time' && !tokens) {
          throw new Error('Nombre de tokens requis pour un achat unique');
        }
        
        const manager = ProductManager.getInstance();
        await manager.initialize();
        setProductManager(manager);
        
        const details = manager.getProductDetails(
          planParam,
          periodParam,
          tokens ? parseInt(tokens) : undefined
        );
        
        setProductDetails(details);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de l\'initialisation:', error);
        setError(error instanceof Error ? error.message : 'Erreur inconnue');
        setLoading(false);
      }
    };
    
    initialize();
  }, [planParam, periodParam, tokens]);
  
  const handleTokenChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setAdditionalTokens(value);
    }
  };
  
  const translatePeriod = (periodKey: string): string => {
    const translations: Record<string, string> = {
      'monthly': 'mensuelle',
      'quarterly': 'trimestrielle',
      'bi-weekly': 'bi-hebdomadaire',
      'biweekly': 'bi-hebdomadaire',
      'yearly': 'annuelle',
      'annualy': 'annuelle',
      'annual': 'annuelle',
      'one-time': 'unique'
    };
    
    return translations[periodKey.toLowerCase()] || periodKey;
  };
  
  const getFormattedPlanName = (): string => {
    const planNames: Record<string, string> = {
      'lite': 'LITE',
      'basic': 'BASIC',
      'advanced': 'ADVANCED',
      'pro': 'PRO',
      'pay-as-you-go': 'PAY-AS-YOU-GO'
    };
    
    return planNames[plan.toLowerCase()] || plan;
  };

  const openLegalPopup = (type: 'terms' | 'privacy' | 'refund' | 'legal') => {
    switch (type) {
      case 'terms':
        setLegalPopupContent(<TermsContentDisplay />);
        setLegalPopupTitle('Conditions Générales d\'Utilisation');
        break;
      case 'privacy':
        setLegalPopupContent(<PrivacyContentDisplay />);
        setLegalPopupTitle('Politique de Confidentialité');
        break;
      case 'refund':
        setLegalPopupContent(<RefundContentDisplay />);
        setLegalPopupTitle('Politique de Remboursement');
        break;
      case 'legal':
        setLegalPopupContent(<LegalContentDisplay />);
        setLegalPopupTitle('Mentions Légales');
        break;
    }
    setShowLegalPopup(true);
  };

  const closeLegalPopup = () => {
    setShowLegalPopup(false);
    setLegalPopupContent(null);
  };

  // Générer les options du menu déroulant pour les tokens supplémentaires
  const generateTokenOptions = () => {
    const options = [];
    
    // Ajouter l'option 0
    options.push(<option key="0" value="0">0 token</option>);
    
    // De 10 en 10 jusqu'à 100
    for (let i = 10; i <= 100; i += 10) {
      options.push(<option key={i} value={i}>{i} tokens</option>);
    }
    
    // De 50 en 50 de 150 à 500
    for (let i = 150; i <= 500; i += 50) {
      options.push(<option key={i} value={i}>{i} tokens</option>);
    }
    
    return options;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vérifications des conditions
    if (!acceptedTerms || !acceptedAgeVerification) {
      alert('Veuillez accepter les conditions requises pour continuer');
      return;
    }
    
    // Pour les abonnements récurrents uniquement
    if (periodParam !== 'one-time' && !acceptedAutoRenewal) {
      alert('Veuillez confirmer votre consentement pour l\'abonnement automatique');
      return;
    }
    
    if (!productManager || !productDetails) {
      alert('Erreur lors de la préparation de la commande');
      return;
    }
    
    try {
      // Construire l'URL de checkout
      const products: {
        subscriptionId?: string;
        tokenPackId?: string;
      } = {};
      
      // Pour les abonnements
      if (periodParam !== 'one-time') {
        products.subscriptionId = productDetails.id;
        
        // Ajouter les tokens supplémentaires si nécessaire
        if (additionalTokens > 0) {
          const tokenPackId = productManager.getTokenPackId(planParam || '', additionalTokens);
          if (tokenPackId) {
            products.tokenPackId = tokenPackId;
          }
        }
      } else {
        // Pour les achats one-time
        products.tokenPackId = productDetails.id;
      }
      
      // Construire l'URL finale
      const checkoutUrl = productManager.buildCheckoutUrl(products);
      
      // Stocker les informations utilisateur dans le localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('checkout_firstName', firstName);
        localStorage.setItem('checkout_lastName', lastName);
        localStorage.setItem('checkout_email', email);
        localStorage.setItem('checkout_newsletter', acceptedNewsletter ? '1' : '0');
      }
      
      // Redirection vers le checkout
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Erreur lors de la construction de l\'URL de checkout:', error);
      alert('Une erreur est survenue lors de la préparation de la commande');
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-6 rounded-lg max-w-md text-center">
          <h2 className="text-red-700 font-semibold text-lg mb-2">Erreur</h2>
          <p className="text-red-600">{error}</p>
          <Link href="/#pricing" className="mt-4 inline-flex items-center text-red-700 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-1" /> Retour aux tarifs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Popup légale */}
      {showLegalPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">{legalPopupTitle}</h2>
              <button 
                onClick={closeLegalPopup}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              {legalPopupContent}
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
              <button 
                onClick={closeLegalPopup}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          {/* En-tête */}
          <div className="p-6 md:p-8 border-b border-gray-200">
            <Link href="/#pricing" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
              <ArrowLeft className="h-4 w-4 mr-1" /> Retour aux tarifs
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Finaliser votre commande</h1>
          </div>
          
          {/* Contenu principal */}
          <div className="md:flex">
            {/* Récapitulatif commande */}
            <div className="md:w-2/5 bg-gray-50 p-6 md:p-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Récapitulatif</h2>
              
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Plan:</span>
                  <span className="font-medium">{getFormattedPlanName()}</span>
                </div>
                    
                {!isOneTime && (
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Facturation:</span>
                    <span className="font-medium">{translatePeriod(period)}</span>
                  </div>
                )}
                      
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Tokens inclus:</span>
                  <span className="font-medium">{productDetails?.includedTokens || 0}</span>
                </div>

                {!isOneTime && (
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Prix/token supplémentaire:</span>
                    <span className="font-medium">{productDetails?.additionalTokenPrice.toFixed(2)}€</span>
                  </div>
                )}
                
                {!isOneTime && (
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Prochaine facturation:</span>
                    <span className="font-medium">{productDetails?.nextBillingDate || '-'}</span>
                  </div>
                )}

                <div className="border-t border-gray-200 my-3 pt-3">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Sous-total:</span>
                    <span className="font-medium">{basePrice.toFixed(2)}€</span>
                  </div>
                        
                  {additionalTokens > 0 && (
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">{additionalTokens} tokens supplémentaires:</span>
                      <span className="font-medium">{additionalTokensPrice.toFixed(2)}€</span>
                    </div>
                  )}

                  <div className="flex justify-between font-bold text-lg">
                    <span className="text-gray-800">Total:</span>
                    <span className="text-gray-900">{totalPrice.toFixed(2)}€</span>
                  </div>
                </div>
              </div>
              
              {!isOneTime && (
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5 mr-2" />
                    <p className="text-sm text-blue-700">
                      Votre abonnement se renouvellera automatiquement le {productDetails?.nextBillingDate}. 
                      Vous pouvez annuler à tout moment depuis votre compte.
                    </p>
                  </div>
                </div>
              )}
              
              {isOneTime && (
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5 mr-2" />
                    <p className="text-sm text-green-700">
                      Les tokens achetés sont valables pendant 1 an à compter de la date d'achat.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Formulaire */}
            <div className="md:w-3/5 p-6 md:p-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Vos informations</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4 mb-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      Prénom
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Nom
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  {!isOneTime && (
                    <div>
                      <label htmlFor="additionalTokens" className="block text-sm font-medium text-gray-700 mb-1">
                        Tokens supplémentaires (optionnel)
                      </label>
                      <select
                        id="additionalTokens"
                        value={additionalTokens}
                        onChange={handleTokenChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      >
                        {generateTokenOptions()}
                      </select>
                      <p className="mt-1 text-sm text-gray-500">
                        Vous pouvez ajouter des tokens supplémentaires à votre abonnement.
                        Prix : {productDetails?.additionalTokenPrice.toFixed(2)}€ par token.
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        type="checkbox"
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                      />
                    </div>
                    <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                      J'accepte les <button type="button" onClick={() => openLegalPopup('terms')} className="text-blue-600 hover:underline">conditions générales d'utilisation</button>
                    </label>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="age"
                        type="checkbox"
                        checked={acceptedAgeVerification}
                        onChange={(e) => setAcceptedAgeVerification(e.target.checked)}
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                      />
                    </div>
                    <label htmlFor="age" className="ml-2 text-sm text-gray-600">
                      Je confirme avoir au moins 18 ans
                    </label>
                  </div>

                  {!isOneTime && (
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="autoRenewal"
                          type="checkbox"
                          checked={acceptedAutoRenewal}
                          onChange={(e) => setAcceptedAutoRenewal(e.target.checked)}
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                        />
                      </div>
                      <label htmlFor="autoRenewal" className="ml-2 text-sm text-gray-600">
                        Je consens expressément à l'abonnement automatique pour un montant de {basePrice.toFixed(2)}€ 
                        par {translatePeriod(period)}, renouvelé le {productDetails?.nextBillingDate}. 
                        {additionalTokens > 0 && (
                          <> Les {additionalTokens} tokens supplémentaires (coût unique de {additionalTokensPrice.toFixed(2)}€) ne font pas partie de l'abonnement récurrent.</>
                        )}
                        Je comprends que je peux annuler à tout moment en suivant la procédure décrite dans les <button type="button" onClick={() => openLegalPopup('terms')} className="text-blue-600 hover:underline">conditions</button>.
                      </label>
                    </div>
                  )}

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="newsletter"
                        type="checkbox"
                        checked={acceptedNewsletter}
                        onChange={(e) => setAcceptedNewsletter(e.target.checked)}
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                      />
                    </div>
                    <label htmlFor="newsletter" className="ml-2 text-sm text-gray-600">
                      J'accepte de recevoir des offres et conseils par email (optionnel)
                    </label>
                  </div>

                  <div className="text-xs text-gray-500 mt-2">
                    Vos données personnelles sont protégées selon notre <button type="button" onClick={() => openLegalPopup('privacy')} className="text-blue-600 hover:underline">politique de confidentialité</button>.
                    Pour en savoir plus sur nos politiques de <button type="button" onClick={() => openLegalPopup('refund')} className="text-blue-600 hover:underline">remboursement</button> ou consulter nos <button type="button" onClick={() => openLegalPopup('legal')} className="text-blue-600 hover:underline">mentions légales</button>.
                  </div>
                </div>
              
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  Procéder au paiement
                </button>
                
                <p className="mt-4 text-sm text-center text-gray-500">
                  Vos données de paiement sont sécurisées et traitées sur une page externe.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 