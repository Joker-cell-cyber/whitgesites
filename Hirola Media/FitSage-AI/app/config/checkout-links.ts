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
  "Essential": {
    "biweekly": "https://checkout.stripe.com/c/pay/cs_test_essential_biweekly",
    "monthly": "https://checkout.stripe.com/c/pay/cs_test_essential_monthly",
    "quarterly": "https://checkout.stripe.com/c/pay/cs_test_essential_quarterly",
    "annual": "https://checkout.stripe.com/c/pay/cs_test_essential_annual",
  },
  "Performance": {
    "biweekly": "https://checkout.stripe.com/c/pay/cs_test_performance_biweekly",
    "monthly": "https://checkout.stripe.com/c/pay/cs_test_performance_monthly",
    "quarterly": "https://checkout.stripe.com/c/pay/cs_test_performance_quarterly",
    "annual": "https://checkout.stripe.com/c/pay/cs_test_performance_annual",
  },
  "Elite": {
    "biweekly": "https://checkout.stripe.com/c/pay/cs_test_elite_biweekly",
    "monthly": "https://checkout.stripe.com/c/pay/cs_test_elite_monthly",
    "quarterly": "https://checkout.stripe.com/c/pay/cs_test_elite_quarterly",
    "annual": "https://checkout.stripe.com/c/pay/cs_test_elite_annual",
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
  // Normaliser la période pour gérer différentes variantes
  let normalizedPeriod = period.toLowerCase().trim();
  
  // Mapper les variantes à leurs valeurs standard
  if (normalizedPeriod === 'trimestriel' || normalizedPeriod === 'trimester') {
    normalizedPeriod = 'quarterly';
  } else if (normalizedPeriod === 'annuel' || normalizedPeriod === 'yearly') {
    normalizedPeriod = 'annual';
  }
  
  console.log('Plan recherché:', plan);
  console.log('Période originale:', period);
  console.log('Période normalisée:', normalizedPeriod);
  
  if (subscriptionCheckoutLinks[plan] && subscriptionCheckoutLinks[plan][normalizedPeriod]) {
    return subscriptionCheckoutLinks[plan][normalizedPeriod];
  }
  
  // Fallback sur monthly si la période n'existe pas
  if (subscriptionCheckoutLinks[plan] && subscriptionCheckoutLinks[plan]['monthly']) {
    console.log('Période non trouvée, fallback sur mensuel');
    return subscriptionCheckoutLinks[plan]['monthly'];
  }
  
  return undefined;
} 