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
  'business': 'advanced',
  'débutant': 'lite',
  'intermédiaire': 'basic',
  'avancé': 'advanced',
  'expert seo': 'pro',
  'à la carte': 'à la carte'
};

/**
 * Version pré-chargée des données produits utilisée en développement
 * ou comme fallback si le chargement de l'API échoue
 */
export const fallbackProductData: ProductData = {
  subscriptionProducts: {
    "lite": {
      "biweekly": 18208,
      "monthly": 20203,
      "quarterly": 20207,
      "annual": 18204,
    },
    "basic": {
      "biweekly": 18209,
      "monthly": 20204,
      "quarterly": 20208,
      "annual": 18205,
    },
    "advanced": {
      "biweekly": 18210,
      "monthly": 20205,
      "quarterly": 20209,
      "annual": 18206,
    },
    "pro": {
      "biweekly": 18211,
      "monthly": 20206,
      "quarterly": 20210,
      "annual": 18207,
      "once": 40221,
    },
  },
  tokenProducts: {
    // À la carte - Ces IDs correspondent à l'exact token du CSV
    10: 40117,
    20: 40118,
    30: 40119,
    40: 40120,
    50: 40121,
    60: 40122,
    70: 40123,
    80: 40124,
    90: 40125,
    100: 40126,
    110: 40127,
    120: 40128,
    130: 40129,
    140: 40130,
    150: 40131,
    160: 40132,
    170: 40133,
    180: 40134,
    190: 40135,
    200: 40136,
    210: 40137,
    220: 40138,
    230: 40139,
    240: 40140,
    250: 40141,
    260: 40142,
    270: 40143,
    280: 40144,
    290: 40145,
    300: 40146,
    310: 40147,
    320: 40148,
    330: 40149,
    340: 40150,
    350: 40151,
    360: 40152,
    370: 40153,
    380: 40154,
    390: 40155,
    400: 40156,
    410: 40157,
    420: 40158,
    430: 40159,
    440: 40160,
    450: 40161,
    460: 40162,
    470: 40163,
    480: 40164,
    490: 40165,
    500: 40166,
  },
  subscriptionTokenProducts: {
    "lite": {  // lite
      10: 40167,
      20: 40168,
      30: 40169,
      40: 40170,
      50: 40171,
      60: 40172,
      70: 40173,
      80: 40174,
      90: 40175,
      100: 40176,
      110: 40177,
      120: 40178,
      130: 40179,
      140: 40180,
      150: 40181,
      160: 40182,
      170: 40183,
      180: 40184,
      190: 40185,
      200: 40186,
      210: 40187,
      220: 40188,
      230: 40189,
      240: 40190,
      250: 40191,
      260: 40192,
      270: 40193,
      280: 40194,
      290: 40195,
      300: 40196,
      310: 40197,
      320: 40198,
      330: 40199,
      340: 40200,
      350: 40201,
      360: 40202,
      370: 40203,
      380: 40204,
      390: 40205,
      400: 40206,
      410: 40207,
      420: 40208,
      430: 40209,
      440: 40210,
      450: 40211,
      460: 40212,
      470: 40213,
      480: 40214,
      490: 40215,
      500: 40216,
    },
    "basic": {  // basic
      10: 40067,
      20: 40068,
      30: 40069,
      40: 40070,
      50: 40071,
      60: 40072,
      70: 40073,
      80: 40074,
      90: 40075,
      100: 40076,
      110: 40077,
      120: 40078,
      130: 40079,
      140: 40080,
      150: 40081,
      160: 40082,
      170: 40083,
      180: 40084,
      190: 40085,
      200: 40086,
      210: 40087,
      220: 40088,
      230: 40089,
      240: 40090,
      250: 40091,
      260: 40092,
      270: 40093,
      280: 40094,
      290: 40095,
      300: 40096,
      310: 40097,
      320: 40098,
      330: 40099,
      340: 40100,
      350: 40101,
      360: 40102,
      370: 40103,
      380: 40104,
      390: 40105,
      400: 40106,
      410: 40107,
      420: 40108,
      430: 40109,
      440: 40110,
      450: 40111,
      460: 40112,
      470: 40113,
      480: 40114,
      490: 40115,
      500: 40116,
    },
    "advanced": {  // advanced
      10: 40017,
      20: 40018,
      30: 40019,
      40: 40020,
      50: 40021,
      60: 40022,
      70: 40023,
      80: 40024,
      90: 40025,
      100: 40026,
      110: 40027,
      120: 40028,
      130: 40029,
      140: 40030,
      150: 40031,
      160: 40032,
      170: 40033,
      180: 40034,
      190: 40035,
      200: 40036,
      210: 40037,
      220: 40038,
      230: 40039,
      240: 40040,
      250: 40041,
      260: 40042,
      270: 40043,
      280: 40044,
      290: 40045,
      300: 40046,
      310: 40047,
      320: 40048,
      330: 40049,
      340: 40050,
      350: 40051,
      360: 40052,
      370: 40053,
      380: 40054,
      390: 40055,
      400: 40056,
      410: 40057,
      420: 40058,
      430: 40059,
      440: 40060,
      450: 40061,
      460: 40062,
      470: 40063,
      480: 40064,
      490: 40065,
      500: 40066,
    },
    "pro": {  // pro
      10: 40217,
      20: 40218,
      30: 40219,
      40: 40220,
      50: 40221,
      60: 40222,
      70: 40223,
      80: 40224,
      90: 40225,
      100: 40226,
      110: 40227,
      120: 40228,
      130: 40229,
      140: 40230,
      150: 40231,
      160: 40232,
      170: 40233,
      180: 40234,
      190: 40235,
      200: 40236,
      210: 40237,
      220: 40238,
      230: 40239,
      240: 40240,
      250: 40241,
      260: 40242,
      270: 40243,
      280: 40244,
      290: 40245,
      300: 40246,
      310: 40247,
      320: 40248,
      330: 40249,
      340: 40250,
      350: 40251,
      360: 40252,
      370: 40253,
      380: 40254,
      390: 40255,
      400: 40256,
      410: 40257,
      420: 40258,
      430: 40259,
      440: 40260,
      450: 40261,
      460: 40262,
      470: 40263,
      480: 40264,
      490: 40265,
      500: 40266,
    },
  },
};

/**
 * Nom du fichier CSV des produits pour ce projet
 */
export const CSV_FILENAME = 'new_temp_cleaned_offres_seoforgeai_31.csv';

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