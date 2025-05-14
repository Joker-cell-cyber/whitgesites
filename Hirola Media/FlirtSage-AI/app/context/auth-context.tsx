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
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const router = useRouter();

  // Effet pour indiquer que le composant est monté côté client
  useEffect(() => {
    setIsMounted(true);
    
    // Timeout de sécurité: forcer isLoading à false après un temps raisonnable
    const forceLoadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(forceLoadingTimeout);
  }, []);

  // Effet pour gérer isLoading indépendamment du statut de la session
  useEffect(() => {
    if (status !== 'loading' && isLoading) {
      // Délai très court pour gérer la transition
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [status, isLoading]);

  // Mettre à jour l'utilisateur lorsque la session change
  useEffect(() => {
    if (!isMounted) return; // Ne pas exécuter avant le montage complet
    
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
        tokenBalance: (session.user as any).tokenBalance || 0,
        coachPersonality: (session.user as any).coachPersonality || 'Masculin'
      });
    } else {
      setUser(null);
    }
    
    // Délai très court car l'état a déjà changé
    setIsLoading(false);
    setError(null);
  }, [session, status, isMounted]);

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
      setIsLoading(true);
      await signOut({ redirect: false });
      router.push('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Valeur du contexte
  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading: status === 'loading' || isLoading,
    error,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext; 