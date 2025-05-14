'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import type { AuthContextType, User } from '@/app/lib/types/index';

// Création du contexte d'authentification
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};

// Propriétés du provider
interface AuthProviderProps {
  children: React.ReactNode;
}

// Provider du contexte d'authentification
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Mettre à jour l'utilisateur lorsque la session change
  useEffect(() => {
    if (status === 'loading') {
      setIsLoading(true);
      return;
    }

    if (session?.user) {
      setUser({
        memberId: session.user.id as string,
        firstName: session.user.name?.split(' ')[0] || 'Utilisateur',
        lastName: session.user.name?.split(' ')[1] || '',
        email: session.user.email || '',
        status: (session.user as any).status || 'active',
        subscriptionPlan: (session.user as any).subscriptionPlan || 'Free',
        tokenBalance: (session.user as any).tokenBalance || 0
      });
      setIsLoading(false);
      setError(null);
    } else {
      setUser(null);
      setIsLoading(false);
    }
  }, [session, status]);

  // Fonction de connexion
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password
      });

      if (result?.error) {
        setError(result.error);
        setIsLoading(false);
        return { success: false, message: result.error };
      }

      // Redirection gérée par useEffect
      return { success: true, message: 'Connexion réussie' };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur de connexion';
      setError(errorMessage);
      setIsLoading(false);
      return { success: false, message: errorMessage };
    }
  };

  // Fonction de déconnexion
  const logout = async () => {
    try {
      await signOut({ redirect: false });
      router.push('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  // Valeur du contexte
  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext; 