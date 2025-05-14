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
export type PlanName = 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Coach Pro';

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
 * Normalise un nom de plan pour le transformer en nom standard utilisé par l'API
 * @param planName Nom du plan qui peut être anglais ou français
 * @returns Nom du plan normalisé
 */
function normalizePlanName(planName: string): PlanName | undefined {
  if (!planName) return undefined;
  
  // Si le nom est déjà un des noms standards, le retourner directement
  // Vérifier avec une comparaison insensible à la casse
  const standardNames = Object.values(PLAN_NAME_MAPPING) as PlanName[];
  for (const standardName of standardNames) {
    if (planName.toLowerCase() === standardName.toLowerCase()) {
      console.log(`Normalisation du nom de plan: ${planName} -> ${standardName} (casse corrigée)`);
      return standardName;
    }
  }
  
  // Vérifier dans la table de mapping
  const normalized = PLAN_NAME_MAPPING[planName.toLowerCase()];
  if (normalized) {
    console.log(`Normalisation du nom de plan: ${planName} -> ${normalized}`);
    return normalized;
  }
  
  // Essayer de faire une correspondance partielle
  const lowerPlanName = planName.toLowerCase();
  for (const [key, value] of Object.entries(PLAN_NAME_MAPPING)) {
    if (lowerPlanName.includes(key.toLowerCase())) {
      console.log(`Normalisation partielle du nom de plan: ${planName} -> ${value}`);
      return value as PlanName;
    }
  }
  
  // Si on arrive ici, c'est qu'on n'a pas trouvé de correspondance
  console.log(`Normalisation du nom de plan: ${planName} -> non trouvé`);
  return undefined;
}

/**
 * Liens de checkout pour les achats de tokens à la carte
 * Les clés représentent le nombre de tokens
 * Les valeurs sont les liens vers les pages de paiement externes
 */
export const tokenCheckoutLinks: TokenCheckoutLinks = {
  10: "https://checkout.stripe.com/c/pay/cs_test_token_10",
  20: "https://checkout.stripe.com/c/pay/cs_test_token_20",
  30: "https://checkout.stripe.com/c/pay/cs_test_token_30",
  40: "https://checkout.stripe.com/c/pay/cs_test_token_40",
  50: "https://checkout.stripe.com/c/pay/cs_test_token_50",
  60: "https://checkout.stripe.com/c/pay/cs_test_token_60",
  70: "https://checkout.stripe.com/c/pay/cs_test_token_70",
  80: "https://checkout.stripe.com/c/pay/cs_test_token_80",
  90: "https://checkout.stripe.com/c/pay/cs_test_token_90",
  100: "https://checkout.stripe.com/c/pay/cs_test_token_100",
  150: "https://checkout.stripe.com/c/pay/cs_test_token_150",
  200: "https://checkout.stripe.com/c/pay/cs_test_token_200",
  250: "https://checkout.stripe.com/c/pay/cs_test_token_250",
  300: "https://checkout.stripe.com/c/pay/cs_test_token_300",
  350: "https://checkout.stripe.com/c/pay/cs_test_token_350",
  400: "https://checkout.stripe.com/c/pay/cs_test_token_400",
  450: "https://checkout.stripe.com/c/pay/cs_test_token_450",
  500: "https://checkout.stripe.com/c/pay/cs_test_token_500",
};

/**
 * Liens de checkout pour les abonnements
 * Premier niveau: nom du plan
 * Deuxième niveau: période de facturation
 * Valeur: lien vers la page de paiement externe
 */
export const subscriptionCheckoutLinks: SubscriptionCheckoutLinks = {
  "Débutant": {
    "monthly": "https://checkout.stripe.com/c/pay/cs_test_debutant_monthly",
    "annual": "https://checkout.stripe.com/c/pay/cs_test_debutant_annual",
  },
  "Intermédiaire": {
    "monthly": "https://checkout.stripe.com/c/pay/cs_test_intermediaire_monthly",
    "annual": "https://checkout.stripe.com/c/pay/cs_test_intermediaire_annual",
  },
  "Avancé": {
    "monthly": "https://checkout.stripe.com/c/pay/cs_test_avance_monthly",
    "annual": "https://checkout.stripe.com/c/pay/cs_test_avance_annual",
  },
  "Professionnel": {
    "monthly": "https://checkout.stripe.com/c/pay/cs_test_professionnel_monthly",
    "annual": "https://checkout.stripe.com/c/pay/cs_test_professionnel_annual",
  },
};

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
    const normalizedPlan = normalizePlanName(plan);
    if (!normalizedPlan) return undefined;
    
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