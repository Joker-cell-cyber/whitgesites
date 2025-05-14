/**
 * Classe utilitaire qui gère les données de produits et prix pour le système de checkout
 */

// Interface pour les détails de produit
export interface ProductDetails {
  id: string;               // ID du produit pour le checkout
  name: string;             // Nom du produit
  price: number;            // Prix de base
  nextBillingDate: string;  // Date de prochaine facturation
  includedTokens: number;   // Nombre de tokens inclus
  additionalTokenPrice: number; // Prix par token supplémentaire
}

// Interface pour les produits dans l'URL de checkout
export interface CheckoutProducts {
  subscriptionId?: string;  // ID de l'abonnement
  tokenPackId?: string;     // ID du pack de tokens
}

export class ProductManager {
  private static instance: ProductManager;
  private products: any[] = [];
  private initialized: boolean = false;

  // Définition des prix de base par plan et période
  private basePrices: Record<string, Record<string, number>> = {
    'lite': { monthly: 19.90, biweekly: 11.94, quarterly: 53.73, yearly: 191.04 },
    'basic': { monthly: 34.90, biweekly: 20.94, quarterly: 94.23, yearly: 335.04 },
    'advanced': { monthly: 49.90, biweekly: 29.94, quarterly: 134.73, yearly: 479.04 },
    'pro': { monthly: 69.90, biweekly: 41.94, quarterly: 188.73, yearly: 671.04 }
  };

  // Définition des tokens inclus par plan et période
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

  private constructor() {
    // Le constructeur est privé pour forcer l'utilisation du pattern singleton
  }

  public static getInstance(): ProductManager {
    if (!ProductManager.instance) {
      ProductManager.instance = new ProductManager();
    }
    return ProductManager.instance;
  }

  public async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error(`Erreur lors du chargement des produits: ${response.statusText}`);
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
    // Normaliser la période
    const normalizedPeriod = this.normalizePeriod(period);
    const planUpper = plan.toUpperCase();
    
    // Rechercher dans les produits chargés depuis l'API (données du CSV)
    const productExact = this.products.find(p => {
      // Vérifier la correspondance du plan
      const planMatch = p.subscription_plan.toUpperCase() === planUpper;
      
      // Vérifier la correspondance de la période dans le nom du produit
      let nameMatch = false;
      if (p.product_name.toUpperCase().includes(normalizedPeriod.toUpperCase())) {
        nameMatch = true;
      }
      
      return planMatch && nameMatch;
    });
    
    // Retourner le campaign_product_id qui sera utilisé dans l'URL de checkout
    return productExact?.campaign_product_id;
  }

  public getTokenPackId(plan: string, tokenCount: number): string | undefined {
    // Pour pay-as-you-go, utiliser "à la carte" comme valeur de recherche
    const subscriptionPlan = plan.toLowerCase() === 'pay-as-you-go' ? 'à la carte' : plan;
    
    const product = this.products.find(p => {
      // Vérifier la correspondance du plan
      const planMatch = p.subscription_plan.toUpperCase() === subscriptionPlan.toUpperCase();
      
      // Vérifier la correspondance du nombre de tokens
      const tokenMatch = p.product_name.includes(`${tokenCount} TOKEN PACK`);
      
      return planMatch && tokenMatch;
    });
    
    // Retourner le campaign_product_id qui sera utilisé dans l'URL de checkout
    return product?.campaign_product_id;
  }

  public getProductDetails(plan: string, period: string, tokenCount: number = 0): ProductDetails | null {
    if (!plan) return null;

    // Pour les achats de tokens uniques (pay-as-you-go)
    if (plan.toLowerCase() === 'pay-as-you-go' || period === 'one-time') {
      const tokenPackId = this.getTokenPackId('pay-as-you-go', tokenCount);
      
      if (!tokenPackId) return null;
      
      return {
        id: tokenPackId,
        name: `${tokenCount} TOKEN PACK`,
        price: tokenCount * this.additionalTokenPrices['pay-as-you-go'],
        nextBillingDate: '', // Pas de prochaine facturation pour les achats uniques
        includedTokens: tokenCount,
        additionalTokenPrice: this.additionalTokenPrices['pay-as-you-go']
      };
    }
    
    // Pour les abonnements
    const subscriptionId = this.getSubscriptionId(plan, period);
    
    if (!subscriptionId) return null;
    
    // Normaliser les clés pour accéder aux prix et tokens
    let planKey = plan.toLowerCase();
    let periodKey = period.toLowerCase();
    
    // Normaliser la période pour accéder aux objets de prix et tokens
    if (periodKey === 'bi-weekly' || periodKey === 'biweekly') {
      periodKey = 'biweekly';
    }
    
    if (periodKey === 'annualy' || periodKey === 'yearly') {
      periodKey = 'yearly';
    }
    
    // Récupérer les informations de prix et tokens
    const basePrice = this.basePrices[planKey]?.[periodKey] || 0;
    const baseTokens = this.includedTokens[planKey]?.[periodKey] || 0;
    const additionalTokenPrice = this.additionalTokenPrices[planKey] || 0;
    
    return {
      id: subscriptionId,
      name: `${plan.toUpperCase()} - ${period.toUpperCase()} SUBSCRIPTION`,
      price: basePrice,
      nextBillingDate: this.calculateNextBillingDate(period),
      includedTokens: baseTokens,
      additionalTokenPrice: additionalTokenPrice
    };
  }

  public buildCheckoutUrl(products: CheckoutProducts): string {
    const baseUrl = process.env.NEXT_PUBLIC_CHECKOUT_URL || 'https://payment-securise.adintellivue.com/checkout/i0wQkV40IdWX1YvAAaI0hbi0CVdfg4maKTA4pQbCpdQcrr3ZxRoqP4Fo3X9efe5XOMEKt8UqLiVbfvL04tCcvPey1Br';
    
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
      return 'bi-weekly'; // Format pour le CSV
    }
    
    if (periodLower === 'yearly' || periodLower === 'annualy') {
      return 'annualy'; // Format pour le CSV
    }
    
    return periodLower;
  }

  private calculateNextBillingDate(period: string): string {
    const now = new Date();
    const nextBillingDate = new Date(now);
    
    switch (period.toLowerCase()) {
      case 'biweekly':
      case 'bi-weekly':
        nextBillingDate.setDate(now.getDate() + 14); // +2 semaines
        break;
      case 'monthly':
        nextBillingDate.setMonth(now.getMonth() + 1); // +1 mois
        break;
      case 'quarterly':
        nextBillingDate.setMonth(now.getMonth() + 3); // +3 mois
        break;
      case 'yearly':
      case 'annualy':
        nextBillingDate.setFullYear(now.getFullYear() + 1); // +1 an
        break;
      default:
        return ''; // Pas de prochaine facturation pour les autres périodes
    }
    
    return nextBillingDate.toISOString().split('T')[0]; // Format YYYY-MM-DD
  }
} 