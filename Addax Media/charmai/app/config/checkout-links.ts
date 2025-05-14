/**
 * Configuration des liens de checkout pour les différentes options d'achat
 * 
 * Ce fichier contient la logique pour construire les URLs de checkout
 * pour les différentes options d'achat (abonnements et tokens à la carte)
 * en utilisant les IDs de produits du système CheckoutChamp.
 */

import { useState, useEffect } from 'react';
import { ProductData, fallbackProductData, logProductData, PLAN_NAME_MAPPING } from '@/lib/checkout-products';

// URL de base pour le checkout - selon la documentation
const BASE_CHECKOUT_URL = "https://checkout.mysite.com/checkout";

// Types et interfaces
type BillingPeriod = "biweekly" | "monthly" | "quarterly" | "annual";
type PlanName = "Débutant" | "Intermédiaire" | "Avancé" | "Coach Pro";
type TokenAmount = number;

// Valeur initiale avec les données de fallback
let productData: ProductData = fallbackProductData;

// Expose les principales valeurs de token pour la rétrocompatibilité
export const tokenCheckoutLinks = Object.entries(fallbackProductData.tokenProducts).reduce((acc, [amount, id]) => {
  acc[Number(amount)] = `${BASE_CHECKOUT_URL}?products=${id}:1`;
  return acc;
}, {} as Record<number, string>);

/**
 * Hook pour charger les données produits depuis l'API
 * @returns Les données produits chargées et un indicateur de chargement
 */
export function useProductData(): { productData: ProductData; isLoading: boolean } {
  const [data, setData] = useState<ProductData>(fallbackProductData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProductData() {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des données produits');
        }
        const fetchedData = await response.json();
        setData(fetchedData);
        // Mettre à jour la variable globale
        productData = fetchedData;
        console.log('Données produits chargées depuis l\'API et variable globale mise à jour');
        logProductData(fetchedData);
      } catch (error) {
        console.warn('Erreur lors du chargement des données produits:', error);
        console.warn('Utilisation des données de fallback');
        // S'assurer que la variable globale est mise à jour même en cas d'erreur
        productData = fallbackProductData;
        logProductData(fallbackProductData);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProductData();
  }, []);

  return { productData: data, isLoading };
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
  
  // Vérifier dans la table de mapping avec une méthode sûre
  const planLower = planName.toLowerCase();
  const entries = Object.entries(PLAN_NAME_MAPPING);
  for (const [key, value] of entries) {
    if (key === planLower) {
      console.log(`Normalisation du nom de plan: ${planName} -> ${value}`);
      return value as PlanName;
    }
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
 * Fonction pour obtenir le lien de checkout pour un achat de tokens à la carte
 * @param tokenAmount Nombre de tokens à acheter
 * @returns Lien de checkout ou undefined si le montant n'est pas disponible
 */
export function getTokenCheckoutLink(tokenAmount: number): string | undefined {
  console.log('getTokenCheckoutLink appelé avec:', tokenAmount);
  console.log('Données produits disponibles:', productData.tokenProducts);
  
  // Trouver l'ID de produit correspondant au nombre de tokens
  let productId = productData.tokenProducts[tokenAmount];
  console.log('ID produit trouvé:', productId);
  
  // Si le montant exact n'existe pas, trouver le montant le plus proche
  if (!productId) {
    // Les quantités disponibles
    const availableAmounts = Object.keys(productData.tokenProducts).map(k => parseInt(k));
    console.log('Montants disponibles:', availableAmounts);
    
    if (availableAmounts.length === 0) return undefined;
    
    // Trouver la quantité la plus proche
    const closestAmount = availableAmounts.reduce((prev, curr) => {
      return (Math.abs(curr - tokenAmount) < Math.abs(prev - tokenAmount)) ? curr : prev;
    });
    
    console.log('Montant le plus proche:', closestAmount);
    productId = productData.tokenProducts[closestAmount];
    console.log('ID produit le plus proche:', productId);
  }
  
  if (!productId) return undefined;
  
  // Construire l'URL avec le paramètre products
  const url = `${BASE_CHECKOUT_URL}?products=${productId}:1`;
  console.log('URL générée:', url);
  return url;
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
  console.log('Données produits disponibles:', {
    plans: productData.subscriptionProducts,
    tokenPacks: productData.subscriptionTokenProducts
  });
  
  // Si c'est un plan à la carte, redirectionner vers getTokenCheckoutLink
  if (plan === 'À la carte' || plan.toLowerCase() === 'à la carte' || plan.toLowerCase() === 'a la carte' || plan.toLowerCase() === 'pay-as-you-go') {
    console.log('Redirection vers getTokenCheckoutLink pour plan à la carte');
    return getTokenCheckoutLink(additionalTokens > 0 ? additionalTokens : 50); // Valeur par défaut : 50 tokens
  }
  
  // Normaliser le nom du plan (supporte les noms anglais et français)
  const normalizedPlan = normalizePlanName(plan);
  console.log(`Nom du plan normalisé: ${normalizedPlan || 'non reconnu'}`);
  
  // Vérifier si le plan et la période existent
  if (!normalizedPlan || !productData.subscriptionProducts[normalizedPlan] || !productData.subscriptionProducts[normalizedPlan][period]) {
    console.log('Plan ou période non trouvé');
    return undefined;
  }
  
  // Récupérer l'ID du produit d'abonnement
  const subscriptionProductId = productData.subscriptionProducts[normalizedPlan][period];
  console.log('ID produit abonnement:', subscriptionProductId);
  
  // Construire la base de l'URL avec le produit principal
  let products = `${subscriptionProductId}:1`;
  
  // Ajouter des tokens supplémentaires si nécessaire
  if (additionalTokens > 0) {
    console.log('Ajout de tokens supplémentaires:', additionalTokens);
    
    // Vérifier si nous avons des packs de tokens pour ce plan
    if (productData.subscriptionTokenProducts[normalizedPlan]) {
      // Trouver l'ID du pack de tokens approprié
      let tokenPackId;
      
      // Chercher l'ID exact ou le plus proche
      if (productData.subscriptionTokenProducts[normalizedPlan][additionalTokens]) {
        tokenPackId = productData.subscriptionTokenProducts[normalizedPlan][additionalTokens];
        console.log('ID pack de tokens exact trouvé:', tokenPackId);
      } else {
        // Les quantités disponibles
        const availableAmounts = Object.keys(productData.subscriptionTokenProducts[normalizedPlan]).map(k => parseInt(k));
        console.log('Montants de tokens disponibles:', availableAmounts);
        
        if (availableAmounts.length === 0) {
          // Aucun pack disponible, on continue avec juste l'abonnement
          console.log('Aucun pack de tokens disponible pour ce plan');
        } else {
          // Trouver la quantité la plus proche
          const closestAmount = availableAmounts.reduce((prev, curr) => {
            return (Math.abs(curr - additionalTokens) < Math.abs(prev - additionalTokens)) ? curr : prev;
          });
          
          console.log('Montant de tokens le plus proche:', closestAmount);
          tokenPackId = productData.subscriptionTokenProducts[normalizedPlan][closestAmount];
          console.log('ID pack de tokens le plus proche:', tokenPackId);
        }
      }
      
      if (tokenPackId) {
        // Ajouter le pack de tokens à la chaîne de produits avec un point-virgule (;) comme séparateur
        products += `;${tokenPackId}:1`;
        console.log('Chaîne de produits avec tokens supplémentaires:', products);
      }
    } else {
      console.log('Aucun pack de tokens disponible pour ce plan:', normalizedPlan);
    }
  }
  
  // Construire l'URL finale avec tous les produits
  const checkoutUrl = `${BASE_CHECKOUT_URL}?products=${products}`;
  console.log('URL finale générée:', checkoutUrl);
  return checkoutUrl;
} 