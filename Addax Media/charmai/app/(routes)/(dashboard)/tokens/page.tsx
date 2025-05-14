'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import Link from 'next/link';
import { useAuth } from "@/app/context/auth-context";
import { useStats } from "@/app/context/stats-context";
import { getTokenCheckoutLink, tokenCheckoutLinks } from '@/app/config/checkout-links';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Loader2 } from "lucide-react";

export default function TokensPage() {
  const { user } = useAuth();
  const { stats } = useStats();
  const [selectedTokens, setSelectedTokens] = useState(50);
  const [availableTokenOptions, setAvailableTokenOptions] = useState<number[]>([]);
  const [contactReason, setContactReason] = useState('change_plan');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  // Prix par token du plan Enterprise
  const enterpriseTokenPrice = 0.35;

  // Map des tokens à leurs IDs de produit pour le plan pro (IDs depuis new_temp_cleaned_offres_Charmai_29.csv)
  const tokenToProductId: Record<number, string> = {
    10: '37717',  // Pro tier token pack IDs
    20: '37718',
    30: '37719',
    40: '37720',
    50: '37721',
    100: '37726',
    200: '37736',
    300: '37746',
    500: '37766'
  };

  useEffect(() => {
    // Récupérer les options de tokens disponibles à partir de tokenCheckoutLinks
    const tokenOptions = Object.keys(tokenCheckoutLinks).map(key => parseInt(key)).sort((a, b) => a - b);
    setAvailableTokenOptions(tokenOptions);
    
    // Définir la valeur par défaut sur la première option disponible
    if (tokenOptions.length > 0) {
      setSelectedTokens(tokenOptions[0]);
    }
  }, []);

  // Fonction pour calculer le prix des tokens supplémentaires
  const calculateTokenPrice = (tokens: number) => {
    return (tokens * enterpriseTokenPrice).toFixed(2);
  };

  // Fonction pour acheter des tokens
  const handlePurchaseTokens = async () => {
    try {
      // Obtenir le lien de checkout pour le nombre de tokens sélectionné
      const checkoutLink = getTokenCheckoutLink(selectedTokens);
      
      if (checkoutLink) {
        // Récupérer l'ID du produit token pro correspondant
        const productId = tokenToProductId[selectedTokens];
        
        // Rediriger vers la page de pré-checkout avec les paramètres nécessaires
        // Utiliser le plan "pro" pour avoir le tarif de 0.35€ par token
        window.location.href = `/pre-checkout?plan=pro&period=one-time&price=${calculateTokenPrice(selectedTokens)}&tokens=${selectedTokens}&tokenPrice=${enterpriseTokenPrice}&source=tokens&productId=${productId}`;
      } else {
        // Fallback si aucun lien n'est configuré
        console.error('Aucun lien de checkout configuré pour', selectedTokens, 'tokens');
        setPurchaseSuccess(true);
        setTimeout(() => setPurchaseSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Erreur lors de l\'achat de tokens:', error);
    }
  };

  // Fonction pour envoyer le formulaire de contact via Web3Forms
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');
    
    try {
      const formData = {
        apikey: 'ea8fbdd7-da72-4110-8c71-21022247c62d',
        subject: `Demande de ${contactReason === 'change_plan' ? 'changement de plan' : 
                contactReason === 'change_billing' ? 'modification de facturation' : 
                'support'} - ${user?.email || 'Utilisateur'}`,
        from_name: user ? `${user.firstName} ${user.lastName}`.trim() : 'Utilisateur OneirICrafts',
        email: user?.email || 'non-specifié',
        message: contactMessage,
        raison: contactReason,
      };
      
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setContactSubmitted(true);
        setContactMessage('');
        setTimeout(() => setContactSubmitted(false), 5000);
      } else {
        throw new Error(data.message || 'Une erreur est survenue');
      }
    } catch (error: any) {
      console.error('Erreur lors de l\'envoi du formulaire:', error);
      setErrorMessage(error.message || 'Une erreur est survenue lors de l\'envoi de votre message');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 sm:p-8 relative"
      style={{
        background: `radial-gradient(circle at 50% 50%, rgba(244, 114, 182, 0.08) 0%, rgba(255, 255, 255, 1) 70%)`
      }}
    >
      {/* Formes géométriques décoratives */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Forme 1 - Cercle gradient */}
        <div className="absolute top-1/4 -left-16 w-64 h-64 rounded-full bg-gradient-to-br from-pink-200 to-red-100 opacity-20 blur-3xl"></div>
        
        {/* Forme 2 - Cercle gradient */}
        <div className="absolute bottom-1/4 -right-16 w-96 h-96 rounded-full bg-gradient-to-tl from-pink-200 to-red-100 opacity-20 blur-3xl"></div>
        
        {/* Forme 3 - Rectangle gradient */}
        <div className="absolute top-0 right-1/4 w-32 h-64 rounded-3xl bg-gradient-to-b from-pink-100 to-transparent opacity-20 blur-xl transform rotate-12"></div>
        
        {/* Forme 4 - Rectangle gradient */}
        <div className="absolute bottom-0 left-1/3 w-48 h-32 rounded-3xl bg-gradient-to-r from-red-100 to-transparent opacity-20 blur-xl transform -rotate-6"></div>
        
        {/* Cœurs flottants */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-400 animate-float"
            style={{
              left: `${10 + (i * 25)}%`,
              bottom: `${Math.random() * 40}%`,
              transform: `rotate(${Math.random() * 45}deg) scale(${0.5 + Math.random() * 1})`,
              opacity: 0.1 + Math.random() * 0.2,
              animationDelay: `${i * 1}s`,
              animationDuration: `${Math.random() * 10 + 15}s`
            }}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        ))}
      </div>

      <div className="mb-6 sm:mb-8 relative z-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Acheter des tokens</h1>
        <p className="text-gray-600">Augmentez votre solde de tokens pour continuer à profiter de nos services premium.</p>
      </div>

      {/* Achat de tokens supplémentaires */}
      <div className="mb-6 sm:mb-8 bg-white rounded-xl p-4 sm:p-6 border border-pink-100 shadow-md relative z-10">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Achat de tokens supplémentaires</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="md:col-span-2">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Nombre de tokens souhaités :</label>
                <Select
                  value={selectedTokens.toString()}
                  onValueChange={(value) => setSelectedTokens(parseInt(value))}
                >
                  <SelectTrigger className="w-full bg-gray-50 border-gray-200 focus:border-pink-500 focus:ring-pink-500/20 text-gray-700">
                    <SelectValue placeholder="Sélectionnez un nombre de tokens" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 bg-white border-gray-200">
                    {availableTokenOptions.map((option) => (
                      <SelectItem key={option} value={option.toString()} className="text-gray-700 hover:bg-pink-50">
                        {option} tokens
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">{(selectedTokens * enterpriseTokenPrice).toFixed(2)}€</span>
                <span className="text-gray-500 ml-2">pour {selectedTokens} tokens</span>
              </div>
              <ul className="space-y-2 mt-4">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-pink-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">
                    {selectedTokens} tokens disponibles immédiatement
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-pink-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">
                    {enterpriseTokenPrice}€ par token
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-pink-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">
                    Validité 1 an
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col justify-end mt-4 md:mt-0">
            <Button 
              onClick={handlePurchaseTokens}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-md text-white"
            >
              Acheter des tokens
            </Button>
            {purchaseSuccess && (
              <p className="text-green-600 text-sm mt-2 text-center">
                Achat réussi ! Les tokens ont été ajoutés à votre compte.
            </p>
            )}
          </div>
        </div>
      </div>

      {/* Formulaire de contact avec Web3Forms */}
      <div className="bg-white rounded-xl p-4 sm:p-6 border border-pink-100 shadow-md relative z-10">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Contacter le support</h2>
        <p className="text-gray-600 mb-6">
          Pour changer de plan d'abonnement ou modifier votre période de facturation, veuillez contacter notre équipe.
        </p>
        
        <form onSubmit={handleContactSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 mb-2 block">Raison du contact :</label>
            <Select
              value={contactReason}
              onValueChange={(value) => setContactReason(value)}
            >
              <SelectTrigger className="w-full bg-gray-50 border-gray-200 focus:border-pink-500 focus:ring-pink-500/20 text-gray-700">
                <SelectValue placeholder="Sélectionner une raison" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
                <SelectItem value="change_plan" className="text-gray-700 hover:bg-pink-50">Changer de plan d'abonnement</SelectItem>
                <SelectItem value="change_billing" className="text-gray-700 hover:bg-pink-50">Modifier la période de facturation</SelectItem>
                <SelectItem value="other" className="text-gray-700 hover:bg-pink-50">Autre demande</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-2 block">Votre message :</label>
            <Textarea
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              placeholder="Décrivez votre demande en détail..."
              className="w-full bg-gray-50 border-gray-200 focus:border-pink-500 focus:ring-pink-500/20 rounded-lg p-3 text-gray-700 h-32"
              required
            />
          </div>
          
          <div className="flex justify-center sm:justify-start">
            <Button 
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-md text-white"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                "Envoyer ma demande"
              )}
            </Button>
          </div>
          
          {contactSubmitted && (
            <p className="text-green-600 text-sm">
              Votre message a été envoyé avec succès ! Notre équipe vous contactera dans les plus brefs délais.
            </p>
          )}
          
          {errorMessage && (
            <p className="text-red-500 text-sm">
              {errorMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
} 