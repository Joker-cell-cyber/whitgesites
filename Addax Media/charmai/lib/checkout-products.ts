/**
 * checkout-products.ts
 * 
 * Ce module fournit des types et des données de fallback pour la génération des liens de checkout.
 */

// Types et interfaces
export interface ProductEntry {
  campaign_product_id: string;
  product_name: string;
  subscription_plan: string;
}

export interface SubscriptionProducts {
  [planName: string]: {
    [billingPeriod: string]: number;
  };
}

export interface TokenProducts {
  [amount: number]: number;
}

export interface SubscriptionTokenProducts {
  [planName: string]: {
    [amount: number]: number;
  };
}

export interface ProductData {
  subscriptionProducts: SubscriptionProducts;
  tokenProducts: TokenProducts;
  subscriptionTokenProducts: SubscriptionTokenProducts;
}

/**
 * Table de correspondance entre les noms de plans dans le CSV et les noms
 * utilisés dans l'interface utilisateur
 */
export const PLAN_NAME_MAPPING = {
  'lite': 'Lite',
  'starter': 'Lite',
  'basic': 'Basic',
  'intermediate': 'Basic',
  'advanced': 'Advanced',
  'pro': 'Pro',
  'enterprise': 'Pro',
};

/**
 * Version pré-chargée des données produits utilisée en développement
 * ou comme fallback si le chargement de l'API échoue
 */
export const fallbackProductData: ProductData = {
  subscriptionProducts: {
    "Débutant": {
      "biweekly": 14194,
      "monthly": 16189,
      "quarterly": 16193,
      "annual": 14190,
    },
    "Intermédiaire": {
      "biweekly": 14195,
      "monthly": 16190,
      "quarterly": 16194,
      "annual": 14191,
    },
    "Avancé": {
      "biweekly": 14196,
      "monthly": 16191,
      "quarterly": 16195,
      "annual": 14192,
    },
    "Coach Pro": {
      "biweekly": 14197,
      "monthly": 16192,
      "quarterly": 16196,
      "annual": 14193,
    },
  },
  tokenProducts: {
    10: 37617,  // À la carte
    20: 37618,
    30: 37619,
    40: 37620,
    50: 37621,
    100: 37626,
    200: 37636,
    300: 37646,
    500: 37666,
  },
  subscriptionTokenProducts: {
    "Débutant": {  // lite
      10: 37667,
      20: 37668,
      50: 37671,
      100: 37676,
      200: 37686,
      300: 37696,
      500: 37716,
    },
    "Intermédiaire": {  // basic
      10: 37567,
      20: 37568,
      50: 37571,
      100: 37576,
      200: 37586,
      300: 37596,
      500: 37616,
    },
    "Avancé": {  // advanced
      10: 37517,
      20: 37518,
      50: 37521,
      100: 37526,
      200: 37536,
      300: 37546,
      500: 37566,
    },
    "Coach Pro": {  // pro
      10: 37717,
      20: 37718,
      50: 37721,
      100: 37726,
      200: 37736,
      300: 37746,
      500: 37766,
    },
  },
};

/**
 * Nom du fichier CSV des produits pour ce projet
 */
export const CSV_FILENAME = 'new_temp_cleaned_offres_Charmai_29.csv';

/**
 * Affiche les données de produits dans la console pour faciliter le débogage
 * @param data Les données de produits à afficher
 */
export function logProductData(data: ProductData): void {
  console.group('Données des produits chargées');
  
  console.group('Abonnements');
  for (const [plan, periods] of Object.entries(data.subscriptionProducts)) {
    console.group(`Plan: ${plan}`);
    for (const [period, id] of Object.entries(periods)) {
      console.log(`Période: ${period}, ID: ${id}`);
    }
    console.groupEnd();
  }
  console.groupEnd();
  
  console.group('Tokens à la carte');
  for (const [amount, id] of Object.entries(data.tokenProducts)) {
    console.log(`${amount} tokens, ID: ${id}`);
  }
  console.groupEnd();
  
  console.group('Tokens supplémentaires par plan');
  for (const [plan, tokens] of Object.entries(data.subscriptionTokenProducts)) {
    console.group(`Plan: ${plan}`);
    for (const [amount, id] of Object.entries(tokens)) {
      console.log(`${amount} tokens, ID: ${id}`);
    }
    console.groupEnd();
  }
  console.groupEnd();
  
  console.groupEnd();
} 