'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/app/components/ui/button";
import Link from 'next/link';
import { useAuth } from '@/app/context/auth-context';
import { useStats } from '@/app/context/stats-context';
import { getUserProfile } from '@/app/lib/auth-service';
import { getArticles } from '@/app/lib/auth-service';
import { invalidateStatsCache } from '@/app/lib/server-state';
import { 
  BarChart3, 
  RefreshCw, 
  ChevronRight, 
  ArrowUpRight, 
  PenLine, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle 
} from "lucide-react";

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
      <div className="rounded-xl bg-white shadow p-8 text-center">
        <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-slate-800 mb-4">Une erreur s'est produite</h1>
        <p className="text-slate-600 mb-6">Impossible de charger les données du tableau de bord.</p>
        <Button 
          onClick={() => window.location.reload()} 
          className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-md rounded-lg"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Réessayer
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête du dashboard */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Tableau de bord</h1>
          <p className="text-slate-600">
            Plan <span className="font-medium">{subscriptionPlan}</span> - Gérez vos générations d'articles et vos tokens
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            className="border border-slate-200 text-slate-700 bg-white hover:bg-slate-50"
            onClick={() => refreshStats(true)}
          >
            <RefreshCw className="mr-2 h-4 w-4" /> 
            Actualiser
          </Button>
          <Link href="/generate">
            <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-md rounded-lg">
              <PenLine className="mr-2 h-4 w-4" />
              Nouveau contenu
            </Button>
          </Link>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Tokens restants */}
        <div className="bg-white rounded-xl shadow p-6 transition-all duration-300 hover:shadow-md">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-slate-500 text-sm font-medium">Tokens restants</h3>
            <div className="h-8 w-8 bg-amber-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-amber-600" />
            </div>
          </div>
          {isLoading || !stats ? (
            <div className="h-9 w-24 bg-slate-200 rounded animate-pulse"></div>
          ) : (
            <p className="text-3xl font-bold text-slate-800">{stats.tokenBalance}</p>
          )}
          <div className="mt-4 w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            {!isLoading && stats && (
            <div 
              className="h-full bg-gradient-to-r from-amber-400 to-orange-500" 
              style={{ 
                width: `${Math.max(0, Math.min(100, (stats.tokenBalance / (stats.tokenBalance + stats.tokensUsed || 1)) * 100))}%` 
              }}
            ></div>
            )}
          </div>
          <p className="text-slate-500 text-xs mt-2">
            {!isLoading && stats ? 
              `${Math.round((stats.tokenBalance / (stats.tokenBalance + stats.tokensUsed || 1)) * 100)}% restants` : 
              'Chargement...'}
          </p>
        </div>

        {/* Tokens utilisés */}
        <div className="bg-white rounded-xl shadow p-6 transition-all duration-300 hover:shadow-md">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-slate-500 text-sm font-medium">Tokens utilisés</h3>
            <div className="h-8 w-8 bg-amber-100 rounded-lg flex items-center justify-center">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
          </div>
          {isLoading || !stats ? (
            <div className="h-9 w-24 bg-slate-200 rounded animate-pulse"></div>
          ) : (
            <p className="text-3xl font-bold text-slate-800">{stats.tokensUsed}</p>
          )}
          <p className="text-slate-500 text-sm mt-6">
            {!isLoading && stats ? 
              `Pour ${stats.totalGenerations} générations au total` : 
              'Chargement...'}
          </p>
        </div>

        {/* Générations totales */}
        <div className="bg-white rounded-xl shadow p-6 transition-all duration-300 hover:shadow-md">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-slate-500 text-sm font-medium">Générations totales</h3>
            <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          {isLoading || !stats ? (
            <div className="h-9 w-24 bg-slate-200 rounded animate-pulse"></div>
          ) : (
            <p className="text-3xl font-bold text-slate-800">{stats.totalGenerations}</p>
          )}
          <p className="text-slate-500 text-sm mt-6">
            {!isLoading && stats ? 
              `${stats.articlesGenerated} articles, ${stats.productDescriptionsGenerated} descriptions` : 
              'Chargement...'}
          </p>
        </div>

        {/* Date de facturation */}
        <div className="bg-white rounded-xl shadow p-6 transition-all duration-300 hover:shadow-md">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-slate-500 text-sm font-medium">Prochaine facturation</h3>
            <div className="h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          {isLoading || !stats ? (
            <div className="h-9 w-40 bg-slate-200 rounded animate-pulse"></div>
          ) : (
            <p className="text-xl font-bold text-slate-800">{formatDate(stats.nextBillingDate)}</p>
          )}
          <p className="text-slate-500 text-sm mt-6">
            {!isLoading && stats ? 
              '' : 
              'Chargement...'}
          </p>
        </div>
      </div>

      {/* Section d'actions rapides */}
      <div className="grid grid-cols-1 gap-6">
        {/* Actions rapides */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-xl font-semibold text-slate-800">Actions rapides</h2>
          </div>
          
          <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/generate" className="flex items-center p-4 rounded-xl border border-slate-200 hover:border-amber-200 hover:bg-amber-50/30 transition-colors group">
              <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center mr-4 group-hover:bg-amber-200 transition-colors">
                <PenLine className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-medium text-slate-800 mb-1">Générer un article</h3>
                <p className="text-sm text-slate-500">Créez un article optimisé pour le SEO</p>
              </div>
            </Link>
            
            <Link href="/generate/product-description" className="flex items-center p-4 rounded-xl border border-slate-200 hover:border-orange-200 hover:bg-orange-50/30 transition-colors group">
              <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center mr-4 group-hover:bg-orange-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-slate-800 mb-1">Description produit</h3>
                <p className="text-sm text-slate-500">Créez une description attractive</p>
              </div>
            </Link>
            
            <Link href="/tokens" className="flex items-center p-4 rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50/30 transition-colors group">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-slate-800 mb-1">Acheter des tokens</h3>
                <p className="text-sm text-slate-500">Recharger votre compte de tokens</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 