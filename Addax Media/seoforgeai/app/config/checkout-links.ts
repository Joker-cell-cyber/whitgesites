/**
 * Configuration des liens de checkout pour les différentes options d'achat
 * 
 * Ce fichier contient les liens vers les pages de paiement externes
 * pour les différentes options d'achat (abonnements et tokens à la carte)
 */

import { useState, useEffect } from 'react';
import { ProductData, fallbackProductData, PLAN_NAME_MAPPING } from '@/lib/checkout-products';
import { ProductManager, BillingPeriod } from '@/lib/product-utils';

// Interface pour les liens de checkout des tokens à la carte
export interface TokenCheckoutLinks {
  [tokenAmount: number]: string;
}

// Interface pour les liens de checkout des abonnements
export interface SubscriptionCheckoutLinks {
  [plan: string]: {
    [period: string]: string;
  };
}

// URL de base pour le checkout
export const BASE_CHECKOUT_URL = 'https://checkout.mysite.com/checkout';

// Types
export type PlanName = 'lite' | 'basic' | 'advanced' | 'pro';

/**
 * Liens de checkout pour les achats de tokens à la carte
 * Les clés représentent le nombre de tokens
 * Les valeurs sont les liens vers les pages de paiement externes
 */
export const tokenCheckoutLinks: Record<number, string> = {
  10: `${BASE_CHECKOUT_URL}?products=40117:1`,
  20: `${BASE_CHECKOUT_URL}?products=40118:1`,
  30: `${BASE_CHECKOUT_URL}?products=40119:1`,
  40: `${BASE_CHECKOUT_URL}?products=40120:1`,
  50: `${BASE_CHECKOUT_URL}?products=40121:1`,
  60: `${BASE_CHECKOUT_URL}?products=40122:1`, 
  70: `${BASE_CHECKOUT_URL}?products=40123:1`,
  80: `${BASE_CHECKOUT_URL}?products=40124:1`,
  90: `${BASE_CHECKOUT_URL}?products=40125:1`,
  100: `${BASE_CHECKOUT_URL}?products=40126:1`,
  150: `${BASE_CHECKOUT_URL}?products=40131:1`,
  200: `${BASE_CHECKOUT_URL}?products=40136:1`,
  250: `${BASE_CHECKOUT_URL}?products=40141:1`,
  300: `${BASE_CHECKOUT_URL}?products=40146:1`,
  350: `${BASE_CHECKOUT_URL}?products=40151:1`,
  400: `${BASE_CHECKOUT_URL}?products=40156:1`,
  450: `${BASE_CHECKOUT_URL}?products=40161:1`,
  500: `${BASE_CHECKOUT_URL}?products=40166:1`,
};

/**
 * Liens de checkout pour les abonnements
 * Premier niveau: nom du plan
 * Deuxième niveau: période de facturation
 * Valeur: lien vers la page de paiement externe
 */
export const subscriptionCheckoutLinks: Record<string, Record<string, string>> = {
  "lite": {
    "biweekly": `${BASE_CHECKOUT_URL}?products=18208:1`,
    "monthly": `${BASE_CHECKOUT_URL}?products=20203:1`,
    "quarterly": `${BASE_CHECKOUT_URL}?products=20207:1`,
    "annual": `${BASE_CHECKOUT_URL}?products=18204:1`,
  },
  "basic": {
    "biweekly": `${BASE_CHECKOUT_URL}?products=18209:1`,
    "monthly": `${BASE_CHECKOUT_URL}?products=20204:1`,
    "quarterly": `${BASE_CHECKOUT_URL}?products=20208:1`,
    "annual": `${BASE_CHECKOUT_URL}?products=18205:1`,
  },
  "advanced": {
    "biweekly": `${BASE_CHECKOUT_URL}?products=18210:1`,
    "monthly": `${BASE_CHECKOUT_URL}?products=20205:1`,
    "quarterly": `${BASE_CHECKOUT_URL}?products=20209:1`,
    "annual": `${BASE_CHECKOUT_URL}?products=18206:1`,
  },
  "pro": {
    "biweekly": `${BASE_CHECKOUT_URL}?products=18211:1`,
    "monthly": `${BASE_CHECKOUT_URL}?products=20206:1`,
    "quarterly": `${BASE_CHECKOUT_URL}?products=20210:1`,
    "annual": `${BASE_CHECKOUT_URL}?products=18207:1`,
  }
};

/**
 * Hook personnalisé pour initialiser et utiliser le ProductManager
 */
export function useProductManager() {
  const [isInitialized, setIsInitialized] = useState(false);
  const productManager = ProductManager.getInstance();

  useEffect(() => {
    async function initializeManager() {
      try {
        await productManager.initialize();
        setIsInitialized(true);
      } catch (error) {
        console.error('Erreur lors de l\'initialisation du ProductManager:', error);
      }
    }

    if (!isInitialized) {
      initializeManager();
    }
  }, [isInitialized]);

  return { productManager, isInitialized };
}

/**
 * Hook personnalisé pour charger les données de produits
 * depuis l'API et les mettre à disposition dans les composants
 */
export function useProductData(): { productData: ProductData; isLoading: boolean } {
  const [data, setData] = useState<ProductData>(fallbackProductData);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProductData() {
      try {
        const response = await fetch('/api/products');
        
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Erreur lors du chargement des données produits:', error);
        // Garder les données de fallback en cas d'erreur
      } finally {
        setIsLoading(false);
      }
    }

    fetchProductData();
  }, []);

  return { productData: data, isLoading };
}

/**
 * Fonction pour obtenir le lien de checkout pour un achat de tokens à la carte
 * @param tokenAmount Nombre de tokens à acheter
 * @returns Lien de checkout ou undefined si le montant n'est pas disponible
 */
export function getTokenCheckoutLink(tokenAmount: number): string | undefined {
  console.log('getTokenCheckoutLink appelé avec:', tokenAmount);
  
  try {
    // Utiliser ProductManager pour obtenir l'URL de checkout
    const productManager = ProductManager.getInstance();
    
    // Obtenir l'ID du produit pour ces tokens
    const tokenPackId = productManager.getTokenPackId('à la carte', tokenAmount);
    
    if (!tokenPackId) {
      console.error('Impossible de trouver un ID de produit pour ce montant de tokens:', tokenAmount);
      return undefined;
    }
    
    // Construire l'URL avec l'ID obtenu
    const url = productManager.buildCheckoutUrl({ tokenPackId });
    return url;
  } catch (error) {
    console.error('Erreur lors de la génération du lien de checkout pour tokens:', error);
    
    // Fallback sur les liens statiques si ProductManager échoue
    if (tokenCheckoutLinks[tokenAmount]) {
      return tokenCheckoutLinks[tokenAmount];
    }
    
    // Rechercher l'option la plus proche
    const availableAmounts = Object.keys(tokenCheckoutLinks).map(k => parseInt(k));
    if (availableAmounts.length > 0) {
      const closestAmount = availableAmounts.reduce((prev, curr) => {
        return (Math.abs(curr - tokenAmount) < Math.abs(prev - tokenAmount)) ? curr : prev;
      });
      return tokenCheckoutLinks[closestAmount];
    }
    
    return undefined;
  }
}

/**
 * Fonction pour obtenir le lien de checkout pour un abonnement
 * @param plan Nom du plan d'abonnement
 * @param period Période de facturation
 * @param additionalTokens Nombre de tokens supplémentaires (optionnel)
 * @returns Lien de checkout ou undefined si la combinaison n'est pas disponible
 */
export function getSubscriptionCheckoutLink(
  plan: string, 
  period: BillingPeriod,
  additionalTokens: number = 0
): string | undefined {
  console.log('getSubscriptionCheckoutLink appelé avec:', { plan, period, additionalTokens });
  
  // Si c'est un plan à la carte, redirectionner vers getTokenCheckoutLink
  if (plan === 'À la carte' || plan.toLowerCase() === 'à la carte' || plan.toLowerCase() === 'a la carte' || plan.toLowerCase() === 'pay-as-you-go') {
    console.log('Redirection vers getTokenCheckoutLink pour plan à la carte');
    return getTokenCheckoutLink(additionalTokens > 0 ? additionalTokens : 50); // Valeur par défaut : 50 tokens
  }
  
  try {
    // Utiliser ProductManager pour obtenir l'URL de checkout
    const productManager = ProductManager.getInstance();
    
    // Obtenir l'ID du produit d'abonnement
    const subscriptionId = productManager.getSubscriptionId(plan, period);
    
    if (!subscriptionId) {
      console.error('Impossible de trouver un ID de produit pour cet abonnement:', { plan, period });
      return undefined;
    }
    
    // Préparer l'objet de checkout
    const checkoutProducts: { subscriptionId: string; tokenPackId?: string } = {
      subscriptionId
    };
    
    // Ajouter des tokens supplémentaires si nécessaire
    if (additionalTokens > 0) {
      const tokenPackId = productManager.getTokenPackId(plan, additionalTokens);
      if (tokenPackId) {
        checkoutProducts.tokenPackId = tokenPackId;
      } else {
        console.warn('Impossible de trouver un ID pour les tokens supplémentaires:', additionalTokens);
      }
    }
    
    // Construire l'URL avec les IDs obtenus
    const url = productManager.buildCheckoutUrl(checkoutProducts);
    return url;
  } catch (error) {
    console.error('Erreur lors de la génération du lien de checkout pour abonnement:', error);
    
    // Fallback sur les liens statiques si ProductManager échoue
    const normalizedPlan = plan.toLowerCase();
    
    // Normaliser la période pour la recherche dans les liens statiques
    let periodKey: string;
    switch (period) {
      case 'biweekly': periodKey = 'biweekly'; break;
      case 'quarterly': periodKey = 'quarterly'; break;
      case 'annual': periodKey = 'annual'; break;
      default: periodKey = 'monthly';
    }
    
    // Vérifier si on a un lien statique pour cette combinaison
    if (subscriptionCheckoutLinks[normalizedPlan] && subscriptionCheckoutLinks[normalizedPlan][periodKey]) {
      return subscriptionCheckoutLinks[normalizedPlan][periodKey];
    }
    
    return undefined;
  }
} 