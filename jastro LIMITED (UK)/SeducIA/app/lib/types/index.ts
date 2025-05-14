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
  coachPersonality?: 'Masculin' | 'Féminin';
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
  contentType?: 'MESSAGE' | 'COACHING';
  timestamp: string; // ISO string pour faciliter la sérialisation
}

// Interface pour les statistiques utilisateur
export interface UserStats {
  memberId: string;
  tokenBalance: number;
  tokensUsed: number;
  messagesSent: number;
  totalConversations: number;
  coachingSessionsCompleted: number;
  totalInteractions: number;
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

// Types pour les messages
export interface Message {
  id: string;
  conversationId: string;
  content: string;
  timestamp: string;
  sender: 'user' | 'coach';
  tokensUsed?: number;
  isSystemMessage?: boolean;
}

// Types pour les conversations
export interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  lastMessageAt: string;
  messages: Message[];
  coachPersonality: 'Masculin' | 'Féminin';
}

// Type pour les articles (pour la compatibilité avec auth-service.ts)
export interface Article {
  id: string;
  title: string;
  createdAt: Date;
  tokensUsed: number;
  status: 'published' | 'draft';
} 