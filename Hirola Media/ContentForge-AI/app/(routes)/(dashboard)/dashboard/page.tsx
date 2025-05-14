'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/app/components/ui/button";
import Link from 'next/link';
import { useAuth } from '@/app/context/auth-context';
import { useStats } from '@/app/context/stats-context';
import { getUserProfile } from '@/app/lib/auth-service';
import { getArticles } from '@/app/lib/auth-service';
import { invalidateStatsCache } from '@/app/lib/server-state';

interface GenerationStats {
  tokenBalance: number;
  tokensUsed: number;
  articlesGenerated: number;
  productDescriptionsGenerated: number;
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

  // Fonction pour formater la date
  const formatDate = (date: Date | string | null) => {
    if (!date) return 'Non disponible';
    
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('fr-FR', options);
  };

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

  // Si une erreur s'est produite, afficher un message d'erreur
  if (hasError) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Une erreur s'est produite</h1>
        <p className="text-gray-400 mb-6">Impossible de charger les données du tableau de bord.</p>
        <Button 
          onClick={() => window.location.reload()} 
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
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
        <h1 className="text-3xl font-bold text-[#1f1f1f] mb-2">Tableau de bord</h1>
        <p className="text-[#403D39]/70">
          Plan {subscriptionPlan} - Gérez vos générations d'articles et vos tokens
        </p>
          </div>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Tokens restants */}
        <div className="bg-white backdrop-blur-xl rounded-none p-6 border border-[#DDDDDD] shadow-md">
          <h3 className="text-[#403D39]/70 text-sm mb-2 uppercase tracking-wider">Tokens restants</h3>
          {isLoading || !stats ? (
            <div className="h-8 w-24 bg-[#F0F0F0] rounded-none animate-pulse"></div>
          ) : (
            <p className="text-3xl font-bold text-[#1f1f1f]">{stats.tokenBalance}</p>
          )}
          <div className="mt-4 w-full h-2 bg-[#F0F0F0] rounded-none overflow-hidden">
            {!isLoading && stats && (
            <div 
              className="h-full bg-gradient-to-r from-[#BF9B30] to-[#D4B254]" 
                style={{ 
                  width: `${Math.max(0, Math.min(100, (stats.tokenBalance / (stats.tokenBalance + stats.tokensUsed || 1)) * 100))}%` 
                }}
            ></div>
            )}
          </div>
          <p className="text-[#403D39]/70 text-xs mt-2 uppercase tracking-wider">
            {!isLoading && stats ? 
              `${Math.round((stats.tokenBalance / (stats.tokenBalance + stats.tokensUsed || 1)) * 100)}% restants` : 
              'Chargement...'}
          </p>
        </div>

        {/* Tokens utilisés */}
        <div className="bg-white backdrop-blur-xl rounded-none p-6 border border-[#DDDDDD] shadow-md">
          <h3 className="text-[#403D39]/70 text-sm mb-2 uppercase tracking-wider">Tokens utilisés</h3>
          {isLoading || !stats ? (
            <div className="h-8 w-24 bg-[#F0F0F0] rounded-none animate-pulse"></div>
          ) : (
            <p className="text-3xl font-bold text-[#1f1f1f]">{stats.tokensUsed}</p>
          )}
          <p className="text-[#403D39]/70 text-xs mt-6 uppercase tracking-wider">
            {!isLoading && stats ? 
              `Pour ${stats.totalGenerations} générations au total` : 
              'Chargement...'}
          </p>
        </div>

        {/* Générations totales */}
        <div className="bg-white backdrop-blur-xl rounded-none p-6 border border-[#DDDDDD] shadow-md">
          <h3 className="text-[#403D39]/70 text-sm mb-2 uppercase tracking-wider">Générations totales</h3>
          {isLoading || !stats ? (
            <div className="h-8 w-24 bg-[#F0F0F0] rounded-none animate-pulse"></div>
          ) : (
            <p className="text-3xl font-bold text-[#1f1f1f]">{stats.totalGenerations}</p>
          )}
          <p className="text-[#403D39]/70 text-xs mt-6 uppercase tracking-wider">
            {!isLoading && stats ? 
              `${stats.articlesGenerated} articles, ${stats.productDescriptionsGenerated} descriptions` : 
              'Chargement...'}
          </p>
        </div>

        {/* Prochaine facturation */}
        <div className="bg-white backdrop-blur-xl rounded-none p-6 border border-[#DDDDDD] shadow-md">
          <h3 className="text-[#403D39]/70 text-sm mb-2 uppercase tracking-wider">Prochaine facturation</h3>
          {isLoading || !stats ? (
            <div className="h-8 w-24 bg-[#F0F0F0] rounded-none animate-pulse"></div>
          ) : (
            <p className="text-3xl font-bold text-[#1f1f1f]">{formatDate(stats.nextBillingDate)}</p>
          )}
          <p className="text-[#403D39]/70 text-xs mt-6 uppercase tracking-wider">
            Dernière facturation: {!isLoading && stats ? formatDate(stats.lastBillingDate) : 'Chargement...'}
          </p>
        </div>
      </div>

      {/* Actions rapides et achats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Actions rapides */}
        <div className="md:col-span-2 bg-white backdrop-blur-xl rounded-none p-6 border border-[#DDDDDD] shadow-md">
          <h2 className="text-xl font-bold text-[#1f1f1f] mb-6 uppercase tracking-wider">Actions rapides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/generate">
              <Button className="w-full h-12 bg-[#BF9B30] hover:bg-[#D4B254] border-0 uppercase tracking-wider">
                Générer un article
              </Button>
            </Link>
            <Link href="/generate/product-description">
              <Button variant="outline" className="w-full h-12 border-[#BF9B30] text-[#BF9B30] hover:bg-[#BF9B30]/5 uppercase tracking-wider">
                Générer une description
              </Button>
            </Link>
          </div>
        </div>

        {/* Acheter des tokens */}
        <div className="bg-white backdrop-blur-xl rounded-none p-6 border border-[#DDDDDD] shadow-md">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#1f1f1f] mb-2 uppercase tracking-wider">Acheter des tokens</h2>
            <p className="text-[#403D39]/70 mb-6">Augmentez votre capacité de génération d'articles avec nos différents forfaits de tokens.</p>
          </div>
          <Link href="/tokens">
            <Button className="w-full h-12 bg-[#C87137] hover:bg-[#D48247] border-0 uppercase tracking-wider">
              Obtenir plus de tokens
            </Button>
          </Link>
        </div>
      </div>

      {/* Informations sur le plan */}
      <div className="bg-white backdrop-blur-xl rounded-none p-6 border border-[#DDDDDD] shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#1f1f1f] uppercase tracking-wider">Informations sur votre plan</h2>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <div className="h-16 bg-[#F0F0F0] rounded-none animate-pulse"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-[#1f1f1f] mb-2 uppercase tracking-wider">Plan {subscriptionPlan}</h3>
              <p className="text-[#403D39]/70 mb-4">
                Votre plan vous donne accès à toutes les fonctionnalités premium de notre plateforme.
              </p>
              <p className="text-[#403D39]/70">
                <span className="text-[#BF9B30]">+300 tokens</span> sont ajoutés automatiquement à votre compte le 5 de chaque mois.
              </p>
            </div>
            <div className="bg-gradient-to-r from-[#BF9B30]/5 to-[#C87137]/5 rounded-none p-4 border border-[#BF9B30]/20">
              <h4 className="text-[#1f1f1f] font-medium mb-2 uppercase tracking-wider">Prochaine facturation</h4>
              <p className="text-[#403D39]/70 mb-2">
                Date: <span className="text-[#1f1f1f]">{stats ? formatDate(stats.nextBillingDate) : 'Chargement...'}</span>
              </p>
              <p className="text-[#403D39]/70">
                Tokens à recevoir: <span className="text-[#1f1f1f]">300</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 