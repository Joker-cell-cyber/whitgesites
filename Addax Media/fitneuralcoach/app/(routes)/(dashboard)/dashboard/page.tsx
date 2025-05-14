'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/app/components/ui/button";
import Link from 'next/link';
import { useAuth } from '@/app/context/auth-context';
import { useStats } from '@/app/context/stats-context';
import { getUserProfile } from '@/app/lib/auth-service';
import { getArticles } from '@/app/lib/auth-service';
import { invalidateStatsCache } from '@/app/lib/server-state';
import { formatDate } from '@/app/lib/utils';
import { Card } from '@/app/components/ui/card';
import { useRouter } from 'next/navigation';

interface GenerationStats {
  tokensRemaining: number;
  totalSpent: number;
  workoutPlanCount: number;
  nutritionPlanCount: number;
  chatMessageCount: number;
  totalGenerations: number;
  nextBillingDate: Date;
  lastBillingDate: Date;
}

interface Article {
  id: string;
  title: string;
  date: string;
  tokens?: number;
  status: 'published' | 'draft';
}

export default function DashboardPage() {
  const { user } = useAuth();
  const { stats, isLoading: isLoadingStats, refreshStats } = useStats();
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [subscriptionPlan, setSubscriptionPlan] = useState('');
  const [hasError, setHasError] = useState(false);
  const router = useRouter();

  // Fonction pour charger le profil utilisateur
  const loadUserProfile = useCallback(async () => {
    if (!user?.memberId) return null;
    
    try {
      return await getUserProfile(user.memberId);
    } catch (error) {
      console.error('Erreur lors du chargement du profil:', error);
      return null;
    }
  }, [user?.memberId]);

  // Fonction pour charger les articles
  const loadArticles = useCallback(async () => {
    try {
      return await getArticles();
    } catch (error) {
      console.error('Erreur lors du chargement des articles:', error);
      return [];
    }
  }, []);

  // Charger les données de l'utilisateur
  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      try {
        if (!user?.memberId) {
          console.warn('Tentative de chargement des données sans ID de membre');
          if (isMounted) setIsLoading(false);
          return;
        }
        
        setIsLoading(true);
        setHasError(false);
        
        // Charger le profil utilisateur
        const profile = await loadUserProfile();
        if (profile && isMounted) {
          setSubscriptionPlan(profile.subscriptionPlan || 'Basic');
        }
        
        // Charger les articles avec un délai minimal
        const articles = await loadArticles();
        
        if (isMounted) {
        // Mettre à jour les articles récents
        const recentArticlesData = articles.slice(0, 5).map(article => ({
          id: article.id,
          title: article.title,
          date: article.createdAt.toISOString().split('T')[0],
          tokens: article.tokensUsed,
          status: article.status as 'published' | 'draft'
        }));
        
        setRecentArticles(recentArticlesData);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        if (isMounted) {
        setIsLoading(false);
          setHasError(true);
        }
      }
    };
    
    loadData();
    
    // Nettoyer l'effet
    return () => {
      isMounted = false;
    };
  }, [user?.memberId, loadUserProfile, loadArticles]);

  // Rafraîchir les statistiques uniquement au chargement de la page
  useEffect(() => {
    // Rafraîchir les statistiques au chargement initial seulement
    refreshStats(true);
    
    // Rafraîchir les statistiques quand la page devient visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        refreshStats(true);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [refreshStats]);

  // Ajouter cette fonction au début du composant DashboardPage
  useEffect(() => {
    // Vérifier si nous avons un paramètre auth dans l'URL
    const params = new URLSearchParams(window.location.search);
    const authToken = params.get('auth');
    
    if (authToken) {
      // Définir le token d'authentification
      try {
        // Importer de manière dynamique pour éviter les erreurs de SSR
        import('@/app/lib/auth-utils').then(({ createAuthSession, setAuthSession }) => {
          const session = createAuthSession(authToken);
          setAuthSession(session);
          
          // Nettoyer l'URL pour des raisons de sécurité
          const cleanUrl = new URL(window.location.href);
          cleanUrl.searchParams.delete('auth');
          window.history.replaceState({}, document.title, cleanUrl.toString());
        });
      } catch (error) {
        console.error('Erreur lors de la définition de la session:', error);
      }
    }
  }, []);

  // Redirection vers /coach
  useEffect(() => {
    router.replace('/coach');
  }, [router]);

  // Si une erreur s'est produite, afficher un message d'erreur
  if (hasError) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Une erreur s'est produite</h1>
        <p className="text-gray-400 mb-6">Impossible de charger les données du tableau de bord.</p>
        <Button 
          onClick={() => window.location.reload()} 
          className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
        >
          Réessayer
        </Button>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* En-tête du dashboard */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
        <h1 className="text-3xl font-bold text-white mb-2">Tableau de bord</h1>
        <p className="text-gray-400">
          Plan {subscriptionPlan} - Gérez vos générations d'articles et vos tokens
        </p>
          </div>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Tokens restants */}
        <div className="bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-red-500/20">
          <h3 className="text-gray-400 text-sm mb-2">Tokens restants</h3>
          {isLoading || !stats ? (
            <div className="h-8 w-24 bg-gray-700 rounded animate-pulse"></div>
          ) : (
            <p className="text-3xl font-bold text-white">{stats.tokensRemaining}</p>
          )}
          <div className="mt-4 w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            {!isLoading && stats && (
              <div
                className="h-full bg-gradient-to-r from-red-500 to-orange-400"
                style={{
                  width: `${(stats.tokensRemaining / (stats.tokensRemaining + stats.totalSpent)) * 100}%`,
                }}
              ></div>
            )}
          </div>
          <p className="text-gray-400 text-xs mt-2">
            {!isLoading && stats ? 
              `${Math.round((stats.tokensRemaining / (stats.tokensRemaining + stats.totalSpent)) * 100)}% restants` : 
              'Chargement...'}
          </p>
        </div>

        {/* Tokens utilisés */}
        <div className="bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-red-500/20">
          <h3 className="text-gray-400 text-sm mb-2">Tokens utilisés</h3>
          {isLoading || !stats ? (
            <div className="h-8 w-24 bg-gray-700 rounded animate-pulse"></div>
          ) : (
            <p className="text-3xl font-bold text-white">{stats.totalSpent}</p>
          )}
          <p className="text-gray-400 text-xs mt-6">
            {!isLoading && stats ?
              `Total des tokens dépensés` : 
              'Chargement...'}
          </p>
        </div>

        {/* Générations totales */}
        <div className="bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-red-500/20">
          <h3 className="text-gray-400 text-sm mb-2">Générations totales</h3>
          {isLoading || !stats ? (
            <div className="h-8 w-24 bg-gray-700 rounded animate-pulse"></div>
          ) : (
            <p className="text-3xl font-bold text-white">
              {
               (stats.chatMessageCount || 0) + 
               (stats.workoutPlanCount || 0) + 
               (stats.nutritionPlanCount || 0)
              }
            </p>
          )}
          <p className="text-gray-400 text-xs mt-6">
            {!isLoading && stats ?
              `Tous types confondus` : 
              'Chargement...'}
          </p>
        </div>

        {/* Prochain achat */}
        <div className="bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-red-500/20">
          <h3 className="text-gray-400 text-sm mb-2">Prochain achat</h3>
          {isLoading || !stats ? (
            <div className="h-8 w-24 bg-gray-700 rounded animate-pulse"></div>
          ) : (
            <p className="text-3xl font-bold text-white">Maintenant</p>
          )}
          <p className="text-gray-400 text-xs mt-6">
            Achetez des tokens quand vous en avez besoin
          </p>
        </div>
      </div>

      {/* Statistiques de génération */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
        <div className="p-4 bg-black/40 backdrop-blur-xl rounded-lg border border-red-500/20">
          <h4 className="text-gray-400 text-xs">Articles</h4>
          <p className="text-2xl font-semibold mt-1">
            {isLoading || !stats ? (
              <span className="h-8 w-12 bg-gray-700 rounded animate-pulse block"></span>
            ) : (
              0 // Valeur par défaut puisque articleCount n'existe pas dans le type UserStats
            )}
          </p>
        </div>

        <div className="p-4 bg-black/40 backdrop-blur-xl rounded-lg border border-red-500/20">
          <h4 className="text-gray-400 text-xs">Messages coach</h4>
          <p className="text-2xl font-semibold mt-1">
            {isLoading || !stats ? (
              <span className="h-8 w-12 bg-gray-700 rounded animate-pulse block"></span>
            ) : (
              stats.chatMessageCount
            )}
          </p>
        </div>

        <div className="p-4 bg-black/40 backdrop-blur-xl rounded-lg border border-red-500/20">
          <h4 className="text-gray-400 text-xs">Programmes</h4>
          <p className="text-2xl font-semibold mt-1">
            {isLoading || !stats ? (
              <span className="h-8 w-12 bg-gray-700 rounded animate-pulse block"></span>
            ) : (
              stats.workoutPlanCount
            )}
          </p>
        </div>

        <div className="p-4 bg-black/40 backdrop-blur-xl rounded-lg border border-red-500/20">
          <h4 className="text-gray-400 text-xs">Plans nutrition</h4>
          <p className="text-2xl font-semibold mt-1">
            {isLoading || !stats ? (
              <span className="h-8 w-12 bg-gray-700 rounded animate-pulse block"></span>
            ) : (
              stats.nutritionPlanCount
            )}
          </p>
        </div>
      </div>
      
      {/* Graphique d'activité */}
      <div className="mt-6 bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-red-500/20 space-y-3">
        {/* Actions rapides et achats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Carte pour le plan */}
          <div className="bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-red-500/20">
            <h3 className="text-gray-400 text-sm mb-2">Plan Actuel</h3>
            <p className="text-2xl font-bold text-white mb-2">
              {user?.subscriptionPlan || 'Freemium'}
            </p>
            <Button className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600" asChild>
              <a href="/dashboard/plans">Gérer mon abonnement</a>
            </Button>
          </div>

          {/* Carte pour les tokens */}
          <div className="bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-red-500/20">
            <h3 className="text-gray-400 text-sm mb-2">Recharge de tokens</h3>
            <div className="text-gray-400 mb-4">
              <p>Besoin de plus de tokens?</p>
            </div>
            <Button className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600" asChild>
              <a href="/dashboard/tokens">Acheter des tokens</a>
            </Button>
          </div>

          {/* Utiliser le coach IA */}
          <div className="bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-red-500/20">
            <h3 className="text-gray-400 text-sm mb-2">Coach IA</h3>
            <div className="text-gray-400 mb-4">
              <p>Posez des questions sur votre entraînement</p>
            </div>
            <Button className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600" asChild>
              <a href="/coach">Parler au coach</a>
            </Button>
          </div>
        </div>

        {/* Informations sur le plan */}
        <div className="bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-red-500/20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Informations sur votre plan</h2>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              <div className="h-16 bg-gray-700 rounded animate-pulse"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Plan {subscriptionPlan}</h3>
                <p className="text-gray-400 mb-4">
                  Votre plan vous donne accès à toutes les fonctionnalités premium de notre plateforme.
                </p>
                <p className="text-gray-400">
                  <span className="text-orange-400">+300 tokens</span> sont ajoutés automatiquement à votre compte chaque mois.
                </p>
              </div>
              <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg p-4 border border-red-500/20">
                <h4 className="text-white font-medium mb-2">Avantages de votre plan</h4>
                <p className="text-gray-400 mb-2">
                  Tokens mensuels: <span className="text-white">300</span>
                </p>
                <p className="text-gray-400">
                  Utilisez-les pour vos séances avec le coach IA et pour générer vos programmes personnalisés.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold text-white mb-4">Dernière activité</h2>
        
        {/* Liste des transactions récentes */}
        <div className="bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-red-500/20">
          <h3 className="text-lg font-medium text-white mb-4">Transactions récentes</h3>
          
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="animate-pulse flex justify-between">
                  <div className="w-1/2 h-6 bg-gray-700 rounded"></div>
                  <div className="w-1/4 h-6 bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {/* Transactions mockées - à remplacer par les vraies transactions */}
              <div className="flex justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-gray-300">Achat de tokens</span>
                </div>
                <span className="text-green-500">+100 tokens</span>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="text-gray-300">Génération d'article</span>
                </div>
                <span className="text-red-500">-15 tokens</span>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="text-gray-300">Conversation coach IA</span>
                </div>
                <span className="text-red-500">-5 tokens</span>
              </div>
            </div>
          )}
          
          <div className="mt-4">
            <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
              Afficher toutes les transactions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 