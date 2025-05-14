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
export const USER_CONVERSATIONS_PREFIX = 'user:conversations:';
export const USER_MESSAGES_PREFIX = 'user:messages:';
export const TEST_USER_ID = 'test-user-id';

// Constantes de l'application
export const SITE_NAME = 'CharmAI';
export const SITE_DESCRIPTION = 'Votre coach de séduction personnel';

// Constantes de tarification
export const TOKEN_COST_COACHING = 5;
export const TOKEN_COST_MESSAGE = 1;

// Constantes pour le coach
export const COACH_PERSONALITIES = ['Masculin', 'Féminin'] as const;

// Constantes de sécurité
export const SECURITY_HEADERS = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': "default-src 'self' https: data:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data: https:; connect-src 'self' https:;",
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

// Navigation pour l'application (anciennement DASHBOARD_NAVIGATION)
export const APP_NAVIGATION = [
  { name: "Chat", href: "/chat", icon: "MessageSquare" },
];

export const PRICING_PLANS = [
  {
    name: "À la carte",
    description: "Pour ceux qui veulent découvrir le coaching de séduction",
    price: 0,
    features: [
      "1 session de coaching",
      "Durée limitée à 15 minutes",
      "Assistance par email",
    ],
    cta: "Essayer gratuitement",
    href: "/register",
  },
  {
    name: "Lite",
    description: "Pour améliorer vos compétences en séduction",
    price: 29,
    features: [
      "5 sessions de coaching par mois",
      "Durée illimitée des sessions",
      "Conseils personnalisés",
      "Assistance prioritaire",
    ],
    cta: "S'abonner maintenant",
    href: "/register?plan=lite",
    popular: true,
  },
  {
    name: "Basic",
    description: "Pour une progression régulière",
    price: 49,
    features: [
      "10 sessions de coaching par mois",
      "Durée illimitée des sessions",
      "Conseils personnalisés",
      "Assistance prioritaire",
      "Accès aux guides de base",
      "Suivi de progression",
    ],
    cta: "S'abonner maintenant",
    href: "/register?plan=basic",
  },
  {
    name: "Advanced",
    description: "Pour une transformation approfondie",
    price: 79,
    features: [
      "20 sessions de coaching par mois",
      "Durée illimitée des sessions",
      "Conseils ultra-personnalisés",
      "Suivi de progression",
      "Assistance dédiée 24/7",
      "Accès à des scénarios avancés",
      "Accès aux guides avancés",
    ],
    cta: "S'abonner maintenant",
    href: "/register?plan=advanced",
  },
  {
    name: "Pro",
    description: "Pour devenir un maître de la séduction",
    price: 149,
    features: [
      "Sessions illimitées",
      "Conseils ultra-personnalisés",
      "Suivi de progression",
      "Assistance dédiée 24/7",
      "Accès à des scénarios avancés",
      "Accès à tous les guides",
      "Coaching privé",
      "Analyse comportementale avancée",
    ],
    cta: "Devenir expert",
    href: "/register?plan=pro",
  },
];