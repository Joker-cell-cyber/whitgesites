/**
 * Configuration des liens de checkout
 */

import { ProductManager } from '@/lib/product-utils';

// Define BillingPeriod here since it's not exported from product-utils
type BillingPeriod = string;

export const BASE_CHECKOUT_URL = "https://checkout.mysite.com/checkout";

export interface CheckoutProducts {
  subscriptionId?: string;
  tokenPackId?: string;
}

export function buildCheckoutUrl(products: CheckoutProducts): string {
  const productParams: string[] = [];

  if (products.subscriptionId) {
    productParams.push(`${products.subscriptionId}:1`);
  }

  if (products.tokenPackId) {
    productParams.push(`${products.tokenPackId}:1`);
  }

  if (productParams.length === 0) {
    throw new Error('Aucun produit sélectionné');
  }

  return `${BASE_CHECKOUT_URL}?products=${productParams.join(';')}`;
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
    return productManager.buildCheckoutUrl({ tokenPackId });
  } catch (error) {
    console.error('Erreur lors de la génération du lien de checkout pour tokens:', error);
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
    const checkoutProducts: CheckoutProducts = {
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
    return productManager.buildCheckoutUrl(checkoutProducts);
  } catch (error) {
    console.error('Erreur lors de la génération du lien de checkout pour abonnement:', error);
    return undefined;
  }
} 