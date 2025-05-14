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
  'lite': 'lite',
  'starter': 'lite',
  'basic': 'basic',
  'intermediate': 'basic',
  'advanced': 'advanced',
  'pro': 'pro',
  'enterprise': 'pro',
  'débutant': 'lite',
  'intermédiaire': 'basic',
  'avancé': 'advanced',
  'coach pro': 'pro',
  'à la carte': 'à la carte'
};

/**
 * Version pré-chargée des données produits utilisée en développement
 * ou comme fallback si le chargement de l'API échoue
 */
export const fallbackProductData: ProductData = {
  subscriptionProducts: {
    "lite": {
      "biweekly": 16201,
      "monthly": 18196,
      "quarterly": 18200,
      "annual": 16197,
    },
    "basic": {
      "biweekly": 16202,
      "monthly": 18197,
      "quarterly": 18201,
      "annual": 16198,
    },
    "advanced": {
      "biweekly": 16203,
      "monthly": 18198,
      "quarterly": 18202,
      "annual": 16199,
    },
    "pro": {
      "biweekly": 16204,
      "monthly": 18199,
      "quarterly": 18203,
      "annual": 16200,
    },
  },
  tokenProducts: {
    10: 38617,  // À la carte
    20: 38618,
    30: 38619,
    40: 38620,
    50: 38621,
    100: 38626,
    200: 38636,
    300: 38646,
    500: 38666,
  },
  subscriptionTokenProducts: {
    "lite": {  // lite
      10: 38667,
      20: 38668,
      50: 38671,
      100: 38676,
      200: 38686,
      300: 38696,
      500: 38716,
    },
    "basic": {  // basic
      10: 38567,
      20: 38568,
      50: 38571,
      100: 38576,
      200: 38586,
      300: 38596,
      500: 38616,
    },
    "advanced": {  // advanced
      10: 38517,
      20: 38518,
      50: 38521,
      100: 38526,
      200: 38536,
      300: 38546,
      500: 38566,
    },
    "pro": {  // pro
      10: 38717,
      20: 38718,
      50: 38721,
      100: 38726,
      200: 38736,
      300: 38746,
      500: 38766,
    },
  },
};

/**
 * Nom du fichier CSV des produits pour ce projet
 */
export const CSV_FILENAME = 'new_temp_cleaned_offres_fitneuralcoach_30.csv';

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