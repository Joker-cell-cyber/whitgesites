/**
 * Configuration des tokens pour Charmai
 * ID des produits basés sur le fichier CSV: new_temp_cleaned_offres_Charmai_29.csv
 */

// Prix fixe par token
export const TOKEN_PRICE = 0.35;

// Options de tokens disponibles avec leurs prix calculés à partir du prix unitaire
export const tokenOptions = [
  { tokens: 10, price: 10 * TOKEN_PRICE },
  { tokens: 20, price: 20 * TOKEN_PRICE },
  { tokens: 30, price: 30 * TOKEN_PRICE },
  { tokens: 40, price: 40 * TOKEN_PRICE },
  { tokens: 50, price: 50 * TOKEN_PRICE },
  { tokens: 100, price: 100 * TOKEN_PRICE },
  { tokens: 200, price: 200 * TOKEN_PRICE },
  { tokens: 300, price: 300 * TOKEN_PRICE },
  { tokens: 500, price: 500 * TOKEN_PRICE }
];

// Map des tokens à leurs IDs de produit pour le plan pro (IDs depuis le fichier CSV)
export const tokenToProductId: Record<number, number> = {
  // Pro tier token pack IDs from new_temp_cleaned_offres_Charmai_29.csv
  10: 37717,
  20: 37718,
  30: 37719,
  40: 37720,
  50: 37721,
  100: 37726,
  200: 37736,
  300: 37746,
  500: 37766
};

// Fonctions utilitaires
export const getTokenOption = (selectedTokens: number) => 
  tokenOptions.find(opt => opt.tokens === selectedTokens) || tokenOptions[tokenOptions.length - 1];

export const getTokenProductId = (selectedTokens: number) => 
  tokenToProductId[selectedTokens] || tokenToProductId[500];

export const formatPrice = (price: number) => price.toFixed(2); 