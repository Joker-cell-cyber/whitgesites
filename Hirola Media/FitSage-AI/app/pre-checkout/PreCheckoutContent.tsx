import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';

// Fonctions utilitaires pour l'affichage
function getPlanDisplayName(plan: string): string {
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
}

function getPeriodDisplayName(period: string): string {
  if (!period) return '';
  
  switch (period.toLowerCase()) {
    case 'monthly':
      return 'Mensuel';
    case 'quarterly':
      return 'Trimestriel';
    case 'annually':
    case 'annualy': // Gestion d'une faute courante
      return 'Annuel';
    case 'bi-weekly':
      return 'Bi-hebdomadaire';
    default:
      return period.charAt(0).toUpperCase() + period.slice(1);
  }
}

export function PreCheckoutContent({ 
  plan, 
  period, 
  productDetails 
}: { 
  plan: string; 
  period: string;
  productDetails: {
    price: number;
    tokens: number;
    checkoutUrl: string;
    isLoading: boolean;
    error: string | null;
  };
}) {
  const router = useRouter();
  
  // États locaux pour le bouton de paiement
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Formater le prix pour l'affichage
  const formattedPrice = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(productDetails.price || 0);
  
  // Formater le nombre de tokens pour l'affichage
  const formattedTokens = productDetails.tokens ? 
    new Intl.NumberFormat('fr-FR').format(productDetails.tokens) : '0';
  
  // Plan traduit pour affichage
  const planDisplay = getPlanDisplayName(plan);
  
  // Période traduite pour affichage
  const periodDisplay = getPeriodDisplayName(period);
  
  // Texte du bouton de paiement
  const buttonText = productDetails.isLoading 
    ? 'Chargement...' 
    : 'Procéder au paiement';

  // Action du bouton de paiement
  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!productDetails.checkoutUrl) {
        throw new Error('URL de paiement non disponible');
      }
      
      console.log('Redirection vers:', productDetails.checkoutUrl);
      router.push(productDetails.checkoutUrl);
    } catch (error) {
      console.error('Erreur lors de la redirection vers la page de paiement:', error);
      setError(error instanceof Error ? error.message : 'Erreur lors de la redirection');
    } finally {
      setIsLoading(false);
    }
  };

  // Vérifier si c'est un achat de tokens (plan "tokens" ou provenant de la route /tokens)
  const isTokenPurchase = plan === 'tokens' || plan === 'À la carte' || period === 'once';

  // Affichage simplifié pour les achats de tokens
  if (isTokenPurchase) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">
            Récapitulatif de commande - Pack de tokens
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Tokens:</span>
            <span className="font-semibold">{formattedTokens}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Prix:</span>
            <span className="font-semibold">{formattedPrice}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Prix unitaire:</span>
            <span className="font-semibold">0,35€ par token</span>
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-500 p-2 rounded-md text-sm">
              {error}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500" 
            onClick={handleCheckout}
            disabled={isLoading || productDetails.isLoading || !productDetails.checkoutUrl}
          >
            {isLoading ? 'Chargement...' : 'Finaliser l\'achat'}
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // Affichage standard pour les abonnements
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">
          Abonnement FitSage AI
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Plan:</span>
          <span className="font-semibold">{planDisplay}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Période:</span>
          <span className="font-semibold">{periodDisplay}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Prix:</span>
          <span className="font-semibold">{formattedPrice}</span>
        </div>
        
        {productDetails.tokens > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Tokens inclus:</span>
            <span className="font-semibold">{formattedTokens}</span>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 text-red-500 p-2 rounded-md text-sm">
            {error}
          </div>
        )}
        
        {productDetails.error && (
          <div className="bg-yellow-50 text-yellow-700 p-2 rounded-md text-sm">
            Erreur de chargement des détails du produit
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleCheckout}
          disabled={isLoading || productDetails.isLoading || !productDetails.checkoutUrl}
        >
          {isLoading ? 'Chargement...' : buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
} 