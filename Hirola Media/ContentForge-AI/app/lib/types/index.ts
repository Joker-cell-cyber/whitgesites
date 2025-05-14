/**
 * Types centralisés pour l'application
 */

// Types pour l'authentification
export interface User {
  memberId: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  subscriptionPlan: string;
  tokenBalance: number;
}

// Type pour le contexte d'authentification
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
}

// Type pour la session utilisateur
export interface AuthSession {
  memberId: string;
  isLoggedIn: boolean;
  expiresAt: number; // Timestamp d'expiration
}

// Types pour Redis
export interface Transaction {
  id: string;
  type: 'CREDIT' | 'DEBIT';
  amount: number;
  description: string;
  contentType?: 'ARTICLE' | 'PRODUCT_DESCRIPTION';
  timestamp: string; // ISO string pour faciliter la sérialisation
}

// Interface pour les statistiques utilisateur
export interface UserStats {
  memberId: string;
  tokenBalance: number;
  tokensUsed: number;
  articlesGenerated: number;
  productDescriptionsGenerated: number;
  totalGenerations: number;
  nextBillingDate: string; // ISO string
  lastBillingDate: string; // ISO string
  lastUpdated: string;     // ISO string
  createdAt: string;       // ISO string
}

// Interface pour le stockage complet
export interface UserStorage {
  stats: UserStats;
  transactions: Transaction[];
}

// Types pour les articles
export interface Article {
  id: string;
  title: string;
  createdAt: Date;
  tokensUsed: number;
  status: 'published' | 'draft';
  content?: string;
}

// Types pour les descriptions produits
export interface ProductDescription {
  id: string;
  productName: string;
  createdAt: Date;
  tokensUsed: number;
  status: 'published' | 'draft';
  content?: string;
} 