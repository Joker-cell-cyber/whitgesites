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
  tokensRemaining: number;
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

/**
 * Types de transactions possibles
 */
export type TransactionType = 'CREDIT' | 'DEBIT';

/**
 * Types de contenu pouvant être généré
 */
export type ContentType = 'CHAT_MESSAGE' | 'WORKOUT_PLAN' | 'NUTRITION_PLAN' | 'TOKENS' | 'ARTICLE';

/**
 * Transaction sur le compte utilisateur
 */
export interface Transaction {
  /**
   * Identifiant unique de la transaction
   */
  id: string;
  
  /**
   * ID de l'utilisateur associé à la transaction
   */
  userId?: string;
  
  /**
   * Date et heure de la transaction
   */
  timestamp: string;
  
  /**
   * Type de transaction (CREDIT pour ajout, DEBIT pour dépense)
   */
  type: TransactionType;
  
  /**
   * Montant de la transaction en tokens
   */
  amount: number;
  
  /**
   * Description de la transaction
   */
  description: string;
  
  /**
   * Type de contenu concerné par la transaction
   */
  contentType?: ContentType;
  
  /**
   * Solde après la transaction
   */
  balance: number;
}

/**
 * Statistiques d'un utilisateur
 */
export interface UserStats {
  /**
   * Nombre de tokens restants
   */
  tokensRemaining: number;
  
  /**
   * Nombre total de messages de chat échangés avec le coach IA
   */
  chatMessageCount: number;
  
  /**
   * Nombre total de programmes d'entraînement générés
   */
  workoutPlanCount: number;
  
  /**
   * Nombre total de plans nutritionnels générés
   */
  nutritionPlanCount: number;
  
  /**
   * Nombre total d'articles générés
   */
  articleCount?: number;
  
  /**
   * Montant total dépensé en tokens
   */
  totalSpent: number;
  
  /**
   * Montant total gagné en tokens
   */
  totalEarned: number;
  
  /**
   * Date de la dernière facturation
   */
  lastBillingDate?: string;
  
  /**
   * Date de la prochaine facturation
   */
  nextBillingDate?: string;
  
  /**
   * Date de la dernière mise à jour des statistiques
   */
  lastUpdated?: string;
}

// Stockage utilisateur dans Redis
export interface UserStorage {
  id: string;
  email: string;
  name?: string;
  tokensRemaining?: number;
  subscription?: string;
  createdAt?: string;
  lastLogin?: string;
  stats?: UserStats;
  transactions?: Transaction[];
}

// Type pour les articles générés (pour la compatibilité avec le code existant)
export interface Article {
  id: string;
  title: string;
  createdAt: Date;
  tokensUsed: number;
  status: 'published' | 'draft';
  content?: string;
} 