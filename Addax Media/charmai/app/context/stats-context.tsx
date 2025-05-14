'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { fetchGenerationStats, invalidateStatsCache } from '@/app/lib/stats-service';
import { UserStats } from '@/app/lib/types/index';
import { useAuth } from './auth-context';

// Types pour le contexte de statistiques
interface StatsContextType {
  stats: UserStats | null;
  isLoading: boolean;
  refreshStats: (force?: boolean) => Promise<void>;
  forceFullRefresh: () => Promise<void>;
  invalidateStatsCache: (memberId?: string) => void;
  error: Error | null;
}

// Création du contexte
const StatsContext = createContext<StatsContextType | undefined>(undefined);

// Provider de statistiques
export function StatsProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const refreshInProgressRef = useRef<boolean>(false);
  const refreshAttemptRef = useRef<number>(0);
  const mountedRef = useRef<boolean>(true);
  const lastRefreshTimeRef = useRef<number>(0);

  // Fonction pour rafraîchir les statistiques
  const refreshStats = useCallback(async (force: boolean = false) => {
    // Vérifier si l'utilisateur est connecté
    if (!user?.memberId) {
      console.log('[stats-context] refreshStats: Aucun utilisateur connecté.');
      setIsLoading(false);
      return;
    }
    
    const now = Date.now();
    const timeSinceLastRefresh = now - lastRefreshTimeRef.current;
    
    // Éviter les appels trop fréquents sauf en cas de force=true
    if (!force && timeSinceLastRefresh < 2000) {
      console.log(`[stats-context] refreshStats: Appel ignoré, dernier appel il y a ${timeSinceLastRefresh}ms`);
      return;
    }
    
    // Éviter les appels simultanés
    if (refreshInProgressRef.current) {
      console.log('[stats-context] refreshStats: Rafraîchissement déjà en cours, requête ignorée.');
      return;
    }
    
    try {
      refreshInProgressRef.current = true;
      setIsLoading(true);
      setError(null);
      
      console.log(`[stats-context] refreshStats: Début du rafraîchissement${force ? ' (forcé)' : ''} pour ${user.memberId}`);
      refreshAttemptRef.current++;
      const currentAttempt = refreshAttemptRef.current;
      
      // Récupérer les statistiques fraîches
      const generationStats = await fetchGenerationStats(user.memberId);
      lastRefreshTimeRef.current = Date.now();
      
      // Vérifier si cette requête est toujours valide (pas une requête obsolète)
      if (currentAttempt !== refreshAttemptRef.current) {
        console.log('[stats-context] refreshStats: Requête obsolète, résultat ignoré.');
        return;
      }
      
      // Mettre à jour l'état si le composant est toujours monté
      if (mountedRef.current) {
        console.log('[stats-context] refreshStats: Statistiques chargées avec succès:', generationStats);
        setStats(generationStats);
      }
    } catch (error) {
      console.error('[stats-context] Erreur lors du chargement des statistiques:', error);
      if (mountedRef.current) {
        setError(error instanceof Error ? error : new Error('Erreur inconnue'));
      }
    } finally {
      if (mountedRef.current) {
        setIsLoading(false);
      }
      refreshInProgressRef.current = false;
    }
  }, [user?.memberId]);

  /**
   * Force un rafraîchissement complet des statistiques avec plusieurs tentatives
   * Utile après une génération d'article ou un achat de tokens
   */
  const forceFullRefresh = useCallback(async () => {
    if (!user?.memberId) {
      console.log("[stats-context] forceFullRefresh: Aucun utilisateur connecté");
      return;
    }
    
    console.log("[stats-context] Forçage d'un rafraîchissement complet des statistiques");
    
    // Étape 1: Invalider le cache des statistiques
    console.log("[stats-context] forceFullRefresh: Invalidation du cache pour", user.memberId);
    invalidateStatsCache(user.memberId);
    
    // Attendre un peu plus longtemps initialement pour s'assurer que le fichier est bien lu
    console.log("[stats-context] forceFullRefresh: Attente initiale pour s'assurer que les changements sont propagés...");
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Récupérer les statistiques actuelles pour comparaison
    const currentStats = await fetchGenerationStats(user.memberId);
    console.log("[stats-context] forceFullRefresh: État actuel des statistiques:", currentStats);
    
    const maxAttempts = 5;
    const waitTimes = [1000, 1500, 2000, 2500, 3000]; // Temps d'attente croissants entre les tentatives
    
    // Fonction pour comparer si deux objets stats sont identiques
    const statsEqual = (a: UserStats, b: UserStats) => {
      return a.tokenBalance === b.tokenBalance &&
             a.tokensUsed === b.tokensUsed &&
             a.messagesSent === b.messagesSent &&
             a.coachingSessionsCompleted === b.coachingSessionsCompleted &&
             a.totalInteractions === b.totalInteractions;
    };
    
    // Essayer plusieurs fois avec des délais croissants
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      console.log(`[stats-context] forceFullRefresh: Tentative ${attempt + 1}/${maxAttempts}, attente de ${waitTimes[attempt]}ms`);
      
      // Invalider le cache à chaque tentative
      invalidateStatsCache(user.memberId);
      
      // Attendre un délai progressif
      await new Promise(resolve => setTimeout(resolve, waitTimes[attempt]));
      
      // Forcer une récupération fraîche
      invalidateStatsCache(user.memberId);
      const freshStats = await fetchGenerationStats(user.memberId);
      
      console.log("[stats-context] forceFullRefresh: Statistiques fraîches reçues:", freshStats);
      
      // Si les statistiques ont changé, succès!
      if (!statsEqual(currentStats, freshStats)) {
        console.log("[stats-context] forceFullRefresh: Les statistiques ont été mises à jour avec succès");
        refreshStats(true);
        return;
      }
      
      console.log("[stats-context] forceFullRefresh: Les statistiques n'ont pas changé, nouvelle tentative...");
      invalidateStatsCache(user.memberId);
    }
    
    // Si toutes les tentatives ont échoué, on essaie une dernière fois avec un délai plus long
    console.log("[stats-context] forceFullRefresh: Impossible de rafraîchir les statistiques après plusieurs tentatives");
    console.log("[stats-context] forceFullRefresh: Tentative finale avec délai prolongé");
    
    invalidateStatsCache(user.memberId);
    await new Promise(resolve => setTimeout(resolve, 3000));
    await refreshStats(true);
    
    console.log("[stats-context] forceFullRefresh: Rafraîchissement complet terminé");
  }, [user?.memberId, refreshStats]);

  // Charger les statistiques au montage ou au changement d'utilisateur
  useEffect(() => {
    mountedRef.current = true;
    
    const initializeStats = async () => {
      if (user?.memberId) {
        console.log('[stats-context] Initialisation des statistiques pour', user.memberId);
        // Charger les statistiques une seule fois au démarrage
        await refreshStats(true);
      } else {
        // Réinitialiser les statistiques si aucun utilisateur
        console.log('[stats-context] Aucun utilisateur connecté, réinitialisation des statistiques');
        setStats(null);
        setIsLoading(false);
      }
    };
    
    initializeStats();
    
    return () => {
      console.log('[stats-context] Nettoyage du contexte de statistiques');
      mountedRef.current = false;
    };
  }, [user?.memberId, refreshStats]);

  // Nettoyage au changement d'utilisateur
  useEffect(() => {
    return () => {
      // Réinitialiser les références à chaque changement d'utilisateur
      refreshInProgressRef.current = false;
      refreshAttemptRef.current = 0;
      lastRefreshTimeRef.current = 0;
    };
  }, [user?.memberId]);

  // Valeur du contexte
  const value = {
    stats,
    isLoading,
    refreshStats,
    forceFullRefresh,
    invalidateStatsCache,
    error
  };

  return (
    <StatsContext.Provider value={value}>
      {children}
    </StatsContext.Provider>
  );
}

// Hook pour utiliser le contexte de statistiques
export function useStats() {
  const context = useContext(StatsContext);
  
  if (context === undefined) {
    throw new Error('useStats doit être utilisé à l\'intérieur d\'un StatsProvider');
  }
  
  return context;
} 