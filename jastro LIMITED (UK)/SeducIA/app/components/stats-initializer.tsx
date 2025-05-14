'use client';

import { useEffect } from 'react';
import { invalidateStatsCache } from '@/app/lib/stats-service';
import { useStats } from '@/app/context/stats-context';
import { useAuth } from '@/app/context/auth-context';

/**
 * Composant qui initialise et gère le cache des statistiques
 * - Vide le cache au démarrage de l'application
 * - Écoute les changements de visibilité pour actualiser les statistiques quand l'utilisateur revient sur l'application
 */
export default function StatsInitializer() {
  const { user } = useAuth();
  const { refreshStats } = useStats();

  useEffect(() => {
    // Démarrage de l'application : vider tout le cache
    console.log('[StatsInitializer] Vidage complet du cache des statistiques au démarrage');
    invalidateStatsCache();

    // Fonction pour gérer les changements de visibilité
    const handleVisibilityChange = () => {
      // Si le document devient visible (l'utilisateur revient à l'application)
      if (document.visibilityState === 'visible') {
        console.log('[StatsInitializer] Application redevenue visible, vidage du cache et rafraîchissement des statistiques');
        invalidateStatsCache();
        
        // Si un utilisateur est connecté, rafraîchir ses données
        if (user?.memberId) {
          console.log(`[StatsInitializer] Rafraîchissement forcé des statistiques pour ${user.memberId}`);
          refreshStats(true).catch(err => {
            console.error('[StatsInitializer] Erreur lors du rafraîchissement des statistiques:', err);
          });
        }
      } else {
        console.log('[StatsInitializer] Application en arrière-plan');
      }
    };

    // Ajouter l'écouteur d'événement lors du montage
    console.log('[StatsInitializer] Installation du gestionnaire de changement de visibilité');
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Nettoyer l'écouteur lors du démontage
    return () => {
      console.log('[StatsInitializer] Suppression du gestionnaire de changement de visibilité');
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [user, refreshStats]);

  // Réagir aux changements d'utilisateur
  useEffect(() => {
    if (user?.memberId) {
      console.log(`[StatsInitializer] Utilisateur changé: ${user.memberId}, rafraîchissement des statistiques`);
      refreshStats(true).catch(err => {
        console.error('[StatsInitializer] Erreur lors du rafraîchissement initial des statistiques:', err);
      });
    } else {
      console.log('[StatsInitializer] Aucun utilisateur connecté');
    }
  }, [user?.memberId, refreshStats]);

  // Ce composant ne rend rien visuellement
  return null;
} 