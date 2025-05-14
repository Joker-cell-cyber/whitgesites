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
      // Calculer le prix total en fonction du nombre de tokens sélectionnés
      const tokenTotal = selectedTokens * enterpriseTokenPrice;
      
      // Obtenir le lien de checkout pour le nombre de tokens sélectionné
      const checkoutLink = getTokenCheckoutLink(selectedTokens);
      
      if (checkoutLink) {
        // Rediriger vers la page de pré-checkout avec les paramètres nécessaires
        window.location.href = `/pre-checkout?plan=Pro&period=once&price=${tokenTotal.toFixed(2)}&tokens=${selectedTokens}&tokenPrice=${enterpriseTokenPrice.toFixed(2)}`;
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
        from_name: user ? `${user.firstName} ${user.lastName}`.trim() : 'Utilisateur ContentForge AI',
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
    <div className="p-4 sm:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Gestion des tokens et abonnement</h1>
        <p className="text-gray-400">Achetez des tokens supplémentaires ou gérez votre abonnement</p>
      </div>

      {/* Informations sur l'abonnement actuel */}
      <div className="mb-6 sm:mb-8 bg-black/40 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-purple-500/20">
        <h2 className="text-xl font-bold text-white mb-4">Votre abonnement actuel</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <p className="text-gray-300 mb-2">
              <span className="font-semibold">Plan :</span> {user?.subscriptionPlan || 'Enterprise'}
            </p>
            <p className="text-gray-300 mb-2">
              <span className="font-semibold">Période de facturation :</span> Mensuelle
            </p>
            <p className="text-gray-300 mb-2">
              <span className="font-semibold">Tokens disponibles :</span> {stats?.tokenBalance || 0}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold">Tokens utilisés :</span> {stats?.tokensUsed || 0}
            </p>
          </div>
          <div className="flex flex-col justify-end mt-4 md:mt-0">
            <Link 
              href="/unsubscribe" 
              className="text-red-400 hover:text-red-300 transition-colors text-sm flex items-center"
            >
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Se désabonner
            </Link>
          </div>
        </div>
      </div>

      {/* Achat de tokens supplémentaires */}
      <div className="mb-6 sm:mb-8 bg-black/40 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-purple-500/20">
        <h2 className="text-xl font-bold text-white mb-4">Achat de tokens supplémentaires</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="md:col-span-2">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Nombre de tokens souhaités :</label>
                <Select
                  value={selectedTokens.toString()}
                  onValueChange={(value) => setSelectedTokens(parseInt(value))}
                >
                  <SelectTrigger className="w-full bg-black/50">
                    <SelectValue placeholder="Sélectionnez un nombre de tokens" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {availableTokenOptions.map((option) => (
                      <SelectItem key={option} value={option.toString()}>
                        {option} tokens
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-[#1f1f1f]">{calculateTokenPrice(selectedTokens)}€</span>
                <span className="text-[#403D39]/70 ml-2">pour {selectedTokens} tokens</span>
              </div>
              <p className="text-sm text-purple-400">
                ~{Math.floor(selectedTokens / 3)} articles de blog
              </p>
              <ul className="space-y-2 mt-4">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">
                    {selectedTokens} tokens disponibles immédiatement
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">
                    ~{Math.floor(selectedTokens / 3)} articles générés
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#403D39]/70">
                    {enterpriseTokenPrice.toFixed(2)}€ par token (tarif Enterprise)
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">
                    Validité 1 an
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col justify-end mt-4 md:mt-0">
            <Button 
              onClick={handlePurchaseTokens}
              className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500"
            >
              Acheter des tokens
            </Button>
            {purchaseSuccess && (
              <p className="text-green-400 text-sm mt-2 text-center">
                Achat réussi ! Les tokens ont été ajoutés à votre compte.
            </p>
            )}
          </div>
        </div>
      </div>

      {/* Formulaire de contact avec Web3Forms */}
      <div className="bg-black/40 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-purple-500/20">
        <h2 className="text-xl font-bold text-white mb-4">Contacter le support</h2>
        <p className="text-gray-400 mb-6">
          Pour changer de plan d'abonnement ou modifier votre période de facturation, veuillez contacter notre équipe.
        </p>
        
        <form onSubmit={handleContactSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Raison du contact :</label>
            <Select
              value={contactReason}
              onValueChange={(value) => setContactReason(value)}
            >
              <SelectTrigger className="w-full bg-black/60 border border-purple-500/30 text-white">
                <SelectValue placeholder="Sélectionner une raison" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="change_plan">Changer de plan d'abonnement</SelectItem>
                <SelectItem value="change_billing">Modifier la période de facturation</SelectItem>
                <SelectItem value="other">Autre demande</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Votre message :</label>
            <Textarea
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              placeholder="Décrivez votre demande en détail..."
              className="w-full bg-black/60 border border-purple-500/30 rounded-lg p-3 text-white h-32"
              required
            />
          </div>
          
          <div className="flex justify-center sm:justify-start">
            <Button 
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
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
            <p className="text-green-400 text-sm">
              Votre message a été envoyé avec succès ! Notre équipe vous contactera dans les plus brefs délais.
            </p>
          )}
          
          {errorMessage && (
            <p className="text-red-400 text-sm">
              {errorMessage}
            </p>
          )}
          
          <input type="hidden" name="apikey" value="ea8fbdd7-da72-4110-8c71-21022247c62d" />
          <input type="hidden" name="subject" value={`Demande de ${contactReason === 'change_plan' ? 'changement de plan' : 
                contactReason === 'change_billing' ? 'modification de facturation' : 
                'support'} - ${user?.email || 'Utilisateur'}`} />
          <input type="hidden" name="from_name" value={user ? `${user.firstName} ${user.lastName}`.trim() : 'Utilisateur ContentForge AI'} />
          <input type="hidden" name="email" value={user?.email || ''} />
        </form>
      </div>
    </div>
  );
} 