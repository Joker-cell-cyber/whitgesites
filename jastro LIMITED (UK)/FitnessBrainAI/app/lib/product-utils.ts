export interface ProductDetails {
  id: string;
  name: string;
  price: number;
  nextBillingDate: string;
  includedTokens: number;
  additionalTokenPrice: number;
}

export interface CheckoutProducts {
  subscriptionId?: string;
  tokenPackId?: string;
}

export class ProductManager {
  private static instance: ProductManager;
  private products: any[] = [];
  private initialized = false;

  // Tarifs de base par plan et période
  private basePrices: Record<string, Record<string, number>> = {
    'lite': { monthly: 19.90, biweekly: 11.94, quarterly: 53.73, yearly: 191.04 },
    'basic': { monthly: 34.90, biweekly: 20.94, quarterly: 94.23, yearly: 335.04 },
    'advanced': { monthly: 49.90, biweekly: 29.94, quarterly: 134.73, yearly: 479.04 },
    'pro': { monthly: 69.90, biweekly: 41.94, quarterly: 188.73, yearly: 671.04 }
  };

  // Tokens inclus par plan et période
  private includedTokens: Record<string, Record<string, number>> = {
    'lite': { monthly: 45, biweekly: 27, quarterly: 121, yearly: 432 },
    'basic': { monthly: 100, biweekly: 60, quarterly: 270, yearly: 960 },
    'advanced': { monthly: 180, biweekly: 108, quarterly: 486, yearly: 1728 },
    'pro': { monthly: 300, biweekly: 180, quarterly: 810, yearly: 2880 }
  };

  // Prix des tokens supplémentaires par plan
  private additionalTokenPrices: Record<string, number> = {
    'lite': 0.75,
    'basic': 0.60,
    'advanced': 0.45,
    'pro': 0.35,
    'pay-as-you-go': 0.90
  };

  private constructor() {}

  public static getInstance(): ProductManager {
    if (!ProductManager.instance) {
      ProductManager.instance = new ProductManager();
    }
    return ProductManager.instance;
  }

  public async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    try {
      const response = await fetch('/api/products');
      
      if (!response.ok) {
        throw new Error(`Erreur lors de la récupération des produits: ${response.status}`);
      }
      
      const data = await response.json();
      this.products = data.products || [];
      this.initialized = true;
    } catch (error) {
      console.error('Erreur lors de l\'initialisation du ProductManager:', error);
      throw error;
    }
  }

  public getSubscriptionId(plan: string, period: string): string | undefined {
    if (!this.initialized) {
      console.warn('ProductManager n\'est pas initialisé. Appelez initialize() d\'abord.');
      return undefined;
    }

    // Normaliser la période
    const normalizedPeriod = this.normalizePeriod(period);
    
    // Normaliser le plan pour qu'il corresponde au fichier CSV
    const planLower = plan.toLowerCase();
    
    // Rechercher dans les produits chargés depuis l'API (données du CSV)
    const productExact = this.products.find(p => {
      // Vérifier la correspondance du plan dans subscription_plan
      const planMatch = p.subscription_plan && 
                      p.subscription_plan.toLowerCase() === planLower;
      
      // Vérifier la correspondance de la période dans le nom du produit
      const nameMatch = p.product_name.toUpperCase().includes(normalizedPeriod.toUpperCase());
      
      return planMatch && nameMatch;
    });
    
    // Si on ne trouve pas de correspondance exacte, on essaie une recherche plus souple
    if (!productExact) {
      console.log(`Recherche alternative pour plan=${plan}, period=${period}`);
      const productAlternative = this.products.find(p => 
        p.product_name.toUpperCase().includes(`${planLower.toUpperCase()}`) && 
        p.product_name.toUpperCase().includes(normalizedPeriod.toUpperCase())
      );
      return productAlternative?.campaign_product_id;
    }
    
    // Retourner le campaign_product_id qui sera utilisé dans l'URL de checkout
    return productExact?.campaign_product_id;
  }

  public getTokenPackId(plan: string, tokenCount: number): string | undefined {
    if (!this.initialized) {
      console.warn('ProductManager n\'est pas initialisé. Appelez initialize() d\'abord.');
      return undefined;
    }

    // Pour pay-as-you-go, utiliser "à la carte" comme valeur de recherche
    const subscriptionPlan = plan.toLowerCase() === 'pay-as-you-go' ? 'à la carte' : plan;
    
    const product = this.products.find(p => {
      // Vérifier la correspondance du plan
      const planMatch = p.subscription_plan && 
                       p.subscription_plan.toUpperCase() === subscriptionPlan.toUpperCase();
      
      // Vérifier la correspondance du nombre de tokens
      const tokenMatch = p.product_name.includes(`${tokenCount} TOKEN PACK`);
      
      return planMatch && tokenMatch;
    });
    
    // Retourner le campaign_product_id qui sera utilisé dans l'URL de checkout
    return product?.campaign_product_id;
  }

  public getProductDetails(plan: string, period: string): ProductDetails | undefined {
    if (!this.initialized) {
      console.warn('ProductManager n\'est pas initialisé. Appelez initialize() d\'abord.');
      return undefined;
    }

    // Plan à la carte est traité différemment
    const isOneTime = period.toLowerCase() === 'one-time';
    
    if (isOneTime) {
      // Pour les achats à la carte, retourner des détails spécifiques
      return {
        id: plan, // Sera remplacé plus tard par le vrai ID
        name: `TOKEN PACK - ${plan}`, // Sera formaté correctement
        price: 0, // Sera calculé en fonction du nombre de tokens
        nextBillingDate: '', // Pas de prochaine facturation pour one-time
        includedTokens: 0, // Sera défini plus tard
        additionalTokenPrice: this.additionalTokenPrices['pay-as-you-go'] || 0.90
      };
    }

    // Normaliser la période pour l'accès aux objets de prix
    let periodKey = period.toLowerCase();
    if (periodKey === 'bi-weekly' || periodKey === 'biweekly') {
      periodKey = 'biweekly';
    }
    if (periodKey === 'yearly' || periodKey === 'annualy') {
      periodKey = 'yearly';
    }

    // Trouver l'ID de l'abonnement
    const subscriptionId = this.getSubscriptionId(plan, period);
    
    if (!subscriptionId) {
      console.warn(`Produit non trouvé pour le plan ${plan} et la période ${period}`);
      return undefined;
    }

    // Obtenir les détails de prix et tokens
    const planPrice = this.basePrices[plan.toLowerCase()]?.[periodKey] || 0;
    const planTokens = this.includedTokens[plan.toLowerCase()]?.[periodKey] || 0;
    const additionalTokenPrice = this.additionalTokenPrices[plan.toLowerCase()] || 0;

    // Calculer la prochaine date de facturation
    const nextBillingDate = this.calculateNextBillingDate(period);

    return {
      id: subscriptionId,
      name: `${plan.toLowerCase()} - ${period.toUpperCase()} SUBSCRIPTION`,
      price: planPrice,
      nextBillingDate,
      includedTokens: planTokens,
      additionalTokenPrice
    };
  }

  public calculateNextBillingDate(period: string): string {
    const today = new Date();
    let nextDate = new Date(today);
    
    const periodLower = period.toLowerCase();
    
    if (periodLower === 'bi-weekly' || periodLower === 'biweekly') {
      nextDate.setDate(today.getDate() + 14);
    } else if (periodLower === 'monthly') {
      nextDate.setMonth(today.getMonth() + 1);
    } else if (periodLower === 'quarterly') {
      nextDate.setMonth(today.getMonth() + 3);
    } else if (periodLower === 'yearly' || periodLower === 'annualy') {
      nextDate.setFullYear(today.getFullYear() + 1);
    }
    
    return nextDate.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  public buildCheckoutUrl(products: CheckoutProducts): string {
    const baseUrl = process.env.NEXT_PUBLIC_CHECKOUT_URL || 'https://payment-securise.fitnessbrainai.com/checkout/r7i1IyLe7Rdj68X8KEhjt9xZubJJpcSDfiCx283lWO4YqRIx47Kxo0X5dVW6b7CqSf3lqlZHcjMYKX9QU3DDxyEw2qf';
    
    // Construire le paramètre 'products' selon la syntaxe de CheckoutChamp: campaignProductId:quantity
    const productParams: string[] = [];
    
    // Ajouter l'abonnement s'il existe (avec quantité 1)
    if (products.subscriptionId) {
      productParams.push(`${products.subscriptionId}:1`);
    }
    
    // Ajouter le pack de tokens s'il existe (avec quantité 1)
    if (products.tokenPackId) {
      productParams.push(`${products.tokenPackId}:1`);
    }
    
    // Construire l'URL manuellement pour éviter l'encodage automatique des caractères spéciaux
    // qui transformerait : en %3A et ; en %3B
    if (productParams.length > 0) {
      return `${baseUrl}?products=${productParams.join(';')}`;
    } else {
      return baseUrl;
    }
  }

  private normalizePeriod(period: string): string {
    if (!period) return '';
    
    const periodLower = period.toLowerCase();
    
    if (periodLower === 'bi-weekly' || periodLower === 'biweekly') {
      return 'BI-WEEKLY'; // Format pour le CSV
    }
    
    if (periodLower === 'yearly' || periodLower === 'annualy' || periodLower === 'annual') {
      return 'ANNUALY'; // Format pour le CSV
    }
    
    if (periodLower === 'monthly') {
      return 'MONTHLY'; // Format pour le CSV
    }
    
    if (periodLower === 'quarterly') {
      return 'QUARTERLY'; // Format pour le CSV
    }
    
    return periodLower.toUpperCase(); // Par défaut, convertir en majuscules
  }
} 