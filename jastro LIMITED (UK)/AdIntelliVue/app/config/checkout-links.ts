/**
 * Configuration des liens de checkout pour les différentes options d'achat
 * 
 * Ce fichier contient les liens vers les pages de paiement externes
 * pour les différentes options d'achat (abonnements et tokens à la carte)
 */

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

/**
 * Liens de checkout pour les achats de tokens à la carte
 * Les clés représentent le nombre de tokens
 * Les valeurs sont les liens vers les pages de paiement externes
 */
export const tokenCheckoutLinks: TokenCheckoutLinks = {
  10: "https://checkout.stripe.com/c/pay/cs_test_token_10",
  20: "https://checkout.stripe.com/c/pay/cs_test_token_20",
  50: "https://checkout.stripe.com/c/pay/cs_test_token_50",
  100: "https://checkout.stripe.com/c/pay/cs_test_token_100",
  200: "https://checkout.stripe.com/c/pay/cs_test_token_200",
  300: "https://checkout.stripe.com/c/pay/cs_test_token_300",
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
    "biweekly": "https://checkout.stripe.com/c/pay/cs_test_debutant_biweekly",
    "monthly": "https://checkout.stripe.com/c/pay/cs_test_debutant_monthly",
    "quarterly": "https://checkout.stripe.com/c/pay/cs_test_debutant_quarterly",
    "annual": "https://checkout.stripe.com/c/pay/cs_test_debutant_annual",
  },
  "Intermédiaire": {
    "biweekly": "https://checkout.stripe.com/c/pay/cs_test_intermediaire_biweekly",
    "monthly": "https://checkout.stripe.com/c/pay/cs_test_intermediaire_monthly",
    "quarterly": "https://checkout.stripe.com/c/pay/cs_test_intermediaire_quarterly",
    "annual": "https://checkout.stripe.com/c/pay/cs_test_intermediaire_annual",
  },
  "Avancé": {
    "biweekly": "https://checkout.stripe.com/c/pay/cs_test_avance_biweekly",
    "monthly": "https://checkout.stripe.com/c/pay/cs_test_avance_monthly",
    "quarterly": "https://checkout.stripe.com/c/pay/cs_test_avance_quarterly",
    "annual": "https://checkout.stripe.com/c/pay/cs_test_avance_annual",
  },
  "Coach Pro": {
    "biweekly": "https://checkout.stripe.com/c/pay/cs_test_coachpro_biweekly",
    "monthly": "https://checkout.stripe.com/c/pay/cs_test_coachpro_monthly",
    "quarterly": "https://checkout.stripe.com/c/pay/cs_test_coachpro_quarterly",
    "annual": "https://checkout.stripe.com/c/pay/cs_test_coachpro_annual",
  },
};

/**
 * Fonction pour obtenir le lien de checkout pour un achat de tokens à la carte
 * @param tokenAmount Nombre de tokens à acheter
 * @returns Lien de checkout ou undefined si le montant n'est pas disponible
 */
export function getTokenCheckoutLink(tokenAmount: number): string | undefined {
  // Si le montant exact existe, le retourner
  if (tokenCheckoutLinks[tokenAmount]) {
    return tokenCheckoutLinks[tokenAmount];
  }
  
  // Sinon, trouver le montant le plus proche par défaut (arrondi à la dizaine inférieure)
  const roundedAmount = Math.floor(tokenAmount / 10) * 10;
  return tokenCheckoutLinks[roundedAmount];
}

/**
 * Fonction pour obtenir le lien de checkout pour un abonnement
 * @param plan Nom du plan d'abonnement
 * @param period Période de facturation
 * @returns Lien de checkout ou undefined si la combinaison n'est pas disponible
 */
export function getSubscriptionCheckoutLink(plan: string, period: string): string | undefined {
  if (subscriptionCheckoutLinks[plan] && subscriptionCheckoutLinks[plan][period]) {
    return subscriptionCheckoutLinks[plan][period];
  }
  return undefined;
} 