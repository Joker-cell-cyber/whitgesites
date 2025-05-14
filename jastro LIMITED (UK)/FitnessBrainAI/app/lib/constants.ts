/**
 * Constantes globales de l'application
 */

// Constantes d'authentification
export const AUTH_TOKEN_NAME = 'auth-token';
export const AUTH_SESSION_KEY = 'auth-session';
export const SESSION_EXPIRY_DAYS = 7;

// Constantes Redis
export const USER_STATS_PREFIX = 'user:stats:';
export const USER_TRANSACTIONS_PREFIX = 'user:transactions:';
export const TEST_USER_ID = 'test123';

// Constantes de l'application
export const SITE_NAME = 'FitnessBrainAI';
export const SITE_DESCRIPTION = 'Plateforme complète de musculation avec programmes personnalisés, articles spécialisés et coach IA disponible 24/7';

// Constantes de tarification
export const TOKEN_COST_ARTICLE = 15;
export const TOKEN_COST_CHAT_MESSAGE = 1;
export const TOKEN_COST_WORKOUT_PLAN = 25;
export const TOKEN_COST_NUTRITION_PLAN = 25;

// Constantes de sécurité
export const SECURITY_HEADERS = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:;",
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-XSS-Protection': '1; mode=block',
  'X-DNS-Prefetch-Control': 'on'
};

export const NAVIGATION = [
  { name: "Accueil", href: "/" },
  { name: "Fonctionnalités", href: "/#features" },
  { name: "Tarifs", href: "/#pricing" },
  { name: "FAQ", href: "/#faq" },
];

export const DASHBOARD_NAVIGATION = [
  { name: "Coach IA", href: "/coach", icon: "MessageCircle" },
  { name: "Programmes", href: "/programs", icon: "Dumbbell" },
  { name: "Nutrition", href: "/nutrition", icon: "Apple" },
  { name: "Articles", href: "/articles", icon: "BookText" },
  { name: "Tokens", href: "/tokens", icon: "Coins" },
  { name: "Profil", href: "/profile", icon: "User" },
];

export const WORKOUT_CATEGORIES = [
  "Musculation",
  "Perte de poids",
  "Prise de masse",
  "Cardio",
  "HIIT",
  "Endurance",
  "Renforcement",
  "Étirements",
  "Corps complet",
  "Haut du corps",
  "Bas du corps",
  "Core",
  "Fonctionnel",
  "Mobilité",
];

export const NUTRITION_CATEGORIES = [
  { id: 'balanced', label: 'Équilibré' },
  { id: 'weight-loss', label: 'Perte de poids' },
  { id: 'muscle-gain', label: 'Prise de masse' },
  { id: 'keto', label: 'Keto' },
  { id: 'paleo', label: 'Paléo' },
  { id: 'vegan', label: 'Végétalien' },
  { id: 'vegetarian', label: 'Végétarien' },
  { id: 'low-carb', label: 'Faible en glucides' }
];

export const PRICING_PLANS = [
  {
    name: "Lite",
    description: "30 tokens par mois",
    price: 9.99,
    features: [
      "30 tokens par mois",
      "0.33€ par token",
      "Accès au coach IA",
      "Assistance par email",
    ],
    cta: "Commencer maintenant",
    href: "/register?plan=lite",
  },
  {
    name: "Basic",
    description: "100 tokens par mois",
    price: 19.99,
    features: [
      "100 tokens par mois",
      "0.20€ par token",
      "Accès au coach IA",
      "Assistance prioritaire",
    ],
    cta: "S'abonner maintenant",
    href: "/register?plan=basic",
    popular: true,
  },
  {
    name: "Advanced",
    description: "200 tokens par mois",
    price: 29.99,
    features: [
      "200 tokens par mois",
      "0.15€ par token",
      "Accès au coach IA",
      "Assistance prioritaire",
    ],
    cta: "Devenir avancé",
    href: "/register?plan=advanced",
  },
  {
    name: "Pro",
    description: "500 tokens par mois",
    price: 49.99,
    features: [
      "500 tokens par mois",
      "0.10€ par token",
      "Accès au coach IA",
      "Assistance dédiée",
    ],
    cta: "Contacter les ventes",
    href: "/contact",
  },
  {
    name: "À la carte",
    description: "Achetez des tokens sans abonnement",
    price: 0,
    tokenPricing: true,
    features: [
      "Pas d'engagement mensuel",
      "Tokens valables 1 an",
      "0.90€ par token",
      "Achat à partir de 10 tokens",
    ],
    cta: "Acheter des tokens",
    href: "/tokens/purchase",
  },
];

// URL du service IA pour la génération d'articles
export const AI_ENDPOINT = '/api/ai-service';

// Évaluations pour les articles générés
export const articleRatings = [
  { value: 1, label: 'Faible' },
  { value: 2, label: 'Moyen' },
  { value: 3, label: 'Bon' },
  { value: 4, label: 'Très Bon' },
  { value: 5, label: 'Excellent' }
];

// Seuil minimal de tokens pour générer du contenu
export const MIN_TOKENS_REQUIRED = 5;

/**
 * Statistiques utilisateur par défaut
 */
export const DEFAULT_USER_STATS = {
  tokensRemaining: 0,
  chatMessageCount: 0,
  workoutPlanCount: 0,
  nutritionPlanCount: 0,
  totalSpent: 0,
  totalEarned: 0
};

// Palette de couleurs pour le branding
export const BRAND_COLORS = {
  primary: {
    light: '#3BFFBA',
    DEFAULT: '#00F5A0',
    dark: '#00D485'
  },
  secondary: {
    light: '#36A7FF',
    DEFAULT: '#0095FF',
    dark: '#0077D4'
  },
  accent: {
    light: '#FF47B9',
    DEFAULT: '#FF00A8',
    dark: '#CC0086'
  },
  neutral: {
    darkest: '#0A0C10',
    darker: '#121620',
    dark: '#1E2532',
    medium: '#334155',
    light: '#94A3B8'
  }
}; 