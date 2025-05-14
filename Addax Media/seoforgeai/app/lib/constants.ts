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
export const TEST_USER_ID = 'test-user-id';

// Constantes de l'application
export const SITE_NAME = 'SEOForgeAI';
export const SITE_DESCRIPTION = 'Générateur d\'articles SEO et de descriptions produits';

// Constantes de tarification
export const TOKEN_COST_ARTICLE = 3;
export const TOKEN_COST_PRODUCT_DESCRIPTION = 2;

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
  { name: "Tableau de bord", href: "/dashboard", icon: "LayoutDashboard" },
  { name: "Générer", href: "/dashboard/generate", icon: "PenLine" },
];

export const BLOG_CATEGORIES = [
  "Technologie",
  "Marketing",
  "Finance",
  "Santé",
  "Éducation",
  "Voyage",
  "Cuisine",
  "Mode",
  "Sport",
  "Divertissement",
];

export const PRICING_PLANS = [
  {
    name: "À la carte",
    description: "Pour les débutants qui souhaitent essayer notre service",
    price: 0,
    features: [
      "3 articles par mois",
      "Longueur maximale de 500 mots",
      "Assistance par email",
    ],
    cta: "Commencer gratuitement",
    href: "/register",
  },
  {
    name: "Lite",
    description: "Pour les créateurs de contenu réguliers",
    price: 19,
    features: [
      "20 articles par mois",
      "Longueur maximale de 1500 mots",
      "Optimisation SEO avancée",
      "Assistance prioritaire",
    ],
    cta: "S'abonner maintenant",
    href: "/register?plan=lite",
    popular: true,
  },
  {
    name: "Basic",
    description: "Pour les équipes et les entreprises",
    price: 49,
    features: [
      "Articles illimités",
      "Longueur illimitée",
      "Optimisation SEO premium",
      "Assistance dédiée 24/7",
      "API d'accès",
    ],
    cta: "Contacter les ventes",
    href: "/contact",
  },
  {
    name: "Advanced",
    description: "Pour les grandes entreprises",
    price: 99,
    features: [
      "Articles illimités",
      "Longueur illimitée",
      "Optimisation SEO premium",
      "Assistance dédiée 24/7",
      "API d'accès",
      "Formation dédiée",
      "Support prioritaire",
    ],
    cta: "Contacter les ventes",
    href: "/contact",
  },
  {
    name: "Pro",
    description: "Pour les entreprises multinationales",
    price: 199,
    features: [
      "Articles illimités",
      "Longueur illimitée",
      "Optimisation SEO premium",
      "Assistance dédiée 24/7",
      "API d'accès",
      "Formation dédiée",
      "Support VIP",
      "Fonctionnalités exclusives",
      "Intégration personnalisée",
    ],
    cta: "Contacter les ventes",
    href: "/contact",
  },
]; 