'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/app/components/ui/button";
import { useAuth } from '@/app/context/auth-context';

interface Subscription {
  id: string;
  name: string;
  status: 'active' | 'canceled' | 'pending';
  price: number;
  billingCycle: 'monthly' | 'yearly';
  startDate: string;
  nextBillingDate: string;
  features: string[];
  tokenAllowance: number;
}

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCancelling, setIsCancelling] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const loadSubscriptions = async () => {
      try {
        setIsLoading(true);
        
        // Pour cette démo, nous utilisons des données factices
        const mockSubscriptions: Subscription[] = [
          {
            id: 'sub_12345',
            name: 'Plan Enterprise',
            status: 'active',
            price: 49.99,
            billingCycle: 'monthly',
            startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            features: ['Génération d\'articles', 'Descriptions de produits', 'Support prioritaire'],
            tokenAllowance: 5000
          }
        ];
        
        setSubscriptions(mockSubscriptions);
      } catch (error) {
        console.error('Erreur lors du chargement des abonnements:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSubscriptions();
  }, [user?.memberId]);

  const handleCancelSubscription = async (subscriptionId: string) => {
    if (!user?.memberId) return;
    
    if (!confirm('Êtes-vous sûr de vouloir annuler cet abonnement ?')) {
      return;
    }
    
    try {
      setIsCancelling(true);
      
      // Simuler une annulation réussie
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mettre à jour l'état local
      setSubscriptions(prev => 
        prev.map(sub => 
          sub.id === subscriptionId 
            ? { ...sub, status: 'canceled' as const } 
            : sub
        )
      );
      
      alert('Abonnement annulé avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'annulation:', error);
      alert('Erreur lors de l\'annulation de l\'abonnement');
    } finally {
      setIsCancelling(false);
    }
  };

  // Formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="p-8 relative"
      style={{
        background: `radial-gradient(circle at 50% 50%, rgba(244, 114, 182, 0.08) 0%, rgba(255, 255, 255, 1) 70%)`
      }}
    >
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Désabonnement</h1>
      <p className="text-gray-600 mb-6">Gérez vos abonnements et options de renouvellement ci-dessous.</p>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
        </div>
      ) : subscriptions.length === 0 ? (
        <div className="bg-white rounded-xl p-6 border border-pink-100 shadow-md">
          <p className="text-gray-600 text-center">Vous n'avez aucun abonnement actif.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {subscriptions.map(subscription => (
            <div key={subscription.id} className="bg-white rounded-xl p-6 border border-pink-100 shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{subscription.name}</h2>
                  <p className="text-gray-600 mt-1">
                    {subscription.price}€ / {subscription.billingCycle === 'monthly' ? 'mois' : 'an'}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    subscription.status === 'active' 
                      ? 'bg-green-100 text-green-700' 
                      : subscription.status === 'canceled' 
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {subscription.status === 'active' 
                      ? 'Actif' 
                      : subscription.status === 'canceled' 
                        ? 'Annulé'
                        : 'En attente'}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Date de début</h3>
                  <p className="text-gray-800">{formatDate(subscription.startDate)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Prochaine facturation</h3>
                  <p className="text-gray-800">{formatDate(subscription.nextBillingDate)}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Fonctionnalités incluses</h3>
                <ul className="space-y-1">
                  {subscription.features.map((feature, index) => (
                    <li key={index} className="text-gray-800 flex items-center">
                      <svg className="h-4 w-4 text-pink-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-600">Allocation de tokens</h3>
                <p className="text-gray-800">{subscription.tokenAllowance} tokens / {subscription.billingCycle === 'monthly' ? 'mois' : 'an'}</p>
              </div>
              
              {subscription.status === 'active' && (
                <div className="mt-6">
                  <Button 
                    onClick={() => handleCancelSubscription(subscription.id)}
                    variant="outline" 
                    className="border-red-300 hover:bg-red-50 text-red-600"
                    disabled={isCancelling}
                  >
                    {isCancelling ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Annulation en cours...
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Annuler l'abonnement
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 