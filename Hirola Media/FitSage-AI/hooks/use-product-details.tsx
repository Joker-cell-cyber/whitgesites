import { useState, useEffect } from 'react';
import { ProductManager, BillingPeriod, ProductDetails } from '@/lib/product-utils';

/**
 * Hook pour obtenir les détails d'un produit
 * @param plan Le plan choisi (lite, basic, pro, etc.)
 * @param period La période de facturation (monthly, quarterly, etc.)
 * @returns Les détails du produit
 */
export function useProductDetails(plan: string, period: BillingPeriod) {
  const [details, setDetails] = useState<{
    id: string;
    price: number;
    tokens: number;
    additionalTokenPrice: number;
    isLoading: boolean;
    error: string | null;
  }>({
    id: '',
    price: 0,
    tokens: 0,
    additionalTokenPrice: 0,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Afficher les paramètres reçus par le hook
        console.log('useProductDetails: Paramètres reçus:', { plan, period });
        
        if (!plan) {
          throw new Error('Plan non spécifié');
        }
        
        // Initialiser le gestionnaire de produits
        const productManager = new ProductManager();
        await productManager.initialize();
        
        // Récupérer les détails du produit
        const productDetails = productManager.getProductDetails(plan, period);
        console.log('useProductDetails: Détails récupérés:', productDetails);
        
        if (!productDetails) {
          throw new Error(`Détails du produit non trouvés pour plan=${plan}, period=${period}`);
        }
        
        // Mettre à jour l'état avec les détails du produit
        setDetails({
          id: productDetails.id || 'fallback-id',
          price: productDetails.price || 29.99, // Prix par défaut en cas d'absence
          tokens: productDetails.includedTokens || 0,
          additionalTokenPrice: productDetails.additionalTokenPrice || 0.90,
          isLoading: false,
          error: null
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du produit:', error);
        
        // Définir des valeurs par défaut en cas d'erreur
        const defaultPrice = plan === 'tokens' ? 12.99 : 29.99;
        const getDefaultAdditionalTokenPrice = (planName: string): number => {
          const tokenPrices: Record<string, number> = {
            'lite': 0.75,
            'basic': 0.60,
            'advanced': 0.45,
            'pro': 0.35,
            'tokens': 0.90,
            'pay-as-you-go': 0.90
          };
          
          return tokenPrices[planName.toLowerCase()] || 0.90;
        };
        
        setDetails({
          id: 'fallback-id',
          price: defaultPrice,
          tokens: plan === 'tokens' ? 100 : 0,
          additionalTokenPrice: getDefaultAdditionalTokenPrice(plan),
          isLoading: false,
          error: error instanceof Error ? error.message : 'Erreur inconnue'
        });
      }
    };

    fetchProductDetails();
  }, [plan, period]);

  return details;
} 