import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

type Subscription = {
  plan: string;
  price: number;
  interval: string;
  renewalDate?: string;
  status: 'active' | 'canceled' | 'expired';
};

export function useUserSubscription() {
  const { data: session, status } = useSession();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [tokens, setTokens] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchUserData = async () => {
    if (status !== 'authenticated' || !session?.user) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      // Simuler un appel API pour récupérer les données d'abonnement
      // Dans une application réelle, vous remplaceriez ceci par un appel à votre API
      setTimeout(() => {
        // Données simulées
        setSubscription({
          plan: 'Pro',
          price: 19.99,
          interval: 'mois',
          renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'active'
        });
        
        setTokens(75);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur:', error);
      setIsLoading(false);
    }
  };

  // Fonction pour rafraîchir les données
  const refreshData = () => {
    fetchUserData();
  };

  useEffect(() => {
    if (status !== 'loading') {
      fetchUserData();
    }
  }, [status, session]);

  return {
    subscription,
    tokens,
    isLoading,
    refreshData
  };
}