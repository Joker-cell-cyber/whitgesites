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
  "Starter": {
    "biweekly": "https://checkout.stripe.com/c/pay/cs_test_starter_biweekly",
    "monthly": "https://checkout.stripe.com/c/pay/cs_test_starter_monthly",
    "quarterly": "https://checkout.stripe.com/c/pay/cs_test_starter_quarterly",
    "annual": "https://checkout.stripe.com/c/pay/cs_test_starter_annual",
  },
  "Pro": {
    "biweekly": "https://checkout.stripe.com/c/pay/cs_test_pro_biweekly",
    "monthly": "https://checkout.stripe.com/c/pay/cs_test_pro_monthly",
    "quarterly": "https://checkout.stripe.com/c/pay/cs_test_pro_quarterly",
    "annual": "https://checkout.stripe.com/c/pay/cs_test_pro_annual",
  },
  "Business": {
    "biweekly": "https://checkout.stripe.com/c/pay/cs_test_business_biweekly",
    "monthly": "https://checkout.stripe.com/c/pay/cs_test_business_monthly",
    "quarterly": "https://checkout.stripe.com/c/pay/cs_test_business_quarterly",
    "annual": "https://checkout.stripe.com/c/pay/cs_test_business_annual",
  },
  "Enterprise": {
    "biweekly": "https://checkout.stripe.com/c/pay/cs_test_enterprise_biweekly",
    "monthly": "https://checkout.stripe.com/c/pay/cs_test_enterprise_monthly",
    "quarterly": "https://checkout.stripe.com/c/pay/cs_test_enterprise_quarterly",
    "annual": "https://checkout.stripe.com/c/pay/cs_test_enterprise_annual",
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