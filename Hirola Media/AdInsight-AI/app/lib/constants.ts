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
export const SITE_NAME = 'AdInsight AI';
export const SITE_DESCRIPTION = 'Analyse avancée de données publicitaires avec IA';

// Constantes de tarification
export const TOKEN_COST_ANALYSIS = 2;
export const TOKEN_COST_REPORT = 1;

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
  { name: "Analyse Facebook", href: "/facebook-analysis", icon: "BarChart2" },
  { name: "Tokens", href: "/tokens", icon: "Coins" },
  { name: "Abonnements", href: "/subscriptions", icon: "CreditCard" },
  { name: "Paramètres", href: "/settings", icon: "Settings" }
];

export const ANALYSIS_TYPES = [
  "Performance globale",
  "Analyse par campagne",
  "Analyse par plateforme",
  "Analyse par période",
  "ROI et efficacité",
  "Tendances et prévisions",
  "Optimisation du budget",
  "Analyse concurrentielle",
];

export const ADVERTISING_PLATFORMS = [
  "Facebook Ads",
  "Google Ads",
  "LinkedIn Ads",
  "Instagram Ads",
  "Twitter Ads",
  "TikTok Ads",
  "Pinterest Ads",
  "Snapchat Ads",
  "Amazon Ads",
  "Microsoft Advertising",
  "Autre"
];

export const PRICING_PLANS = [
  {
    name: "À la carte",
    description: "Pour les débutants qui souhaitent essayer notre service",
    price: 0,
    features: [
      "3 analyses par mois",
      "Rapport basique",
      "Assistance par email",
    ],
    cta: "Commencer gratuitement",
    href: "/register",
  },
  {
    name: "Lite",
    description: "Pour les professionnels du marketing",
    price: 19,
    features: [
      "20 analyses par mois",
      "Rapport détaillé",
      "Comparaison de périodes",
      "Assistance prioritaire",
    ],
    cta: "S'abonner maintenant",
    href: "/register?plan=lite",
    popular: true,
  },
  {
    name: "Basic",
    description: "Pour les agences et les entreprises",
    price: 49,
    features: [
      "Analyses illimitées",
      "Rapports avancés",
      "Prévisions IA",
      "Assistance dédiée 24/7",
    ],
    cta: "Contacter les ventes",
    href: "/contact",
  },
  {
    name: "Advanced",
    description: "Pour les grandes entreprises",
    price: 99,
    features: [
      "Analyses illimitées",
      "Rapports avancés",
      "Prévisions IA",
      "Assistance dédiée 24/7",
      "API personnalisée",
      "Formation dédiée",
    ],
    cta: "Contacter les ventes",
    href: "/contact",
  },
  {
    name: "Pro",
    description: "Pour les entreprises multinationales",
    price: 199,
    features: [
      "Analyses illimitées",
      "Rapports avancés",
      "Prévisions IA",
      "Assistance dédiée 24/7",
      "API personnalisée",
      "Formation dédiée",
      "Support VIP",
      "Fonctionnalités exclusives",
    ],
    cta: "Contacter les ventes",
    href: "/contact",
  },
]; 