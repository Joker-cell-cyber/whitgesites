export interface ProductDetails {
  id: string;               // ID du produit pour le checkout
  name: string;             // Nom du produit
  price: number;            // Prix de base
  nextBillingDate: string;  // Date de prochaine facturation
  includedTokens: number;   // Nombre de tokens inclus
  additionalTokenPrice: number; // Prix par token supplémentaire
}

interface CheckoutProducts {
  subscriptionId?: string;
  tokenPackId?: string;
}

export class ProductManager {
  private static instance: ProductManager;
  private products: Array<Record<string, string>> = [];
  private initialized = false;

  private constructor() {}

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
        throw new Error('Erreur lors de la récupération des produits');
      }
      
      const data = await response.json();
      this.products = data.products || [];
      this.initialized = true;
    } catch (error) {
      console.error('Erreur lors de l\'initialisation des produits:', error);
      throw error;
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

  private normalizePlan(plan: string): string {
    if (!plan) return '';
    
    const planLower = plan.toLowerCase();
    
    // Mapping des noms de plans français vers les valeurs du CSV
    if (planLower === 'débutant' || planLower === 'lite') return 'lite';
    if (planLower === 'intermédiaire' || planLower === 'basic') return 'basic';
    if (planLower === 'avancé' || planLower === 'advanced') return 'advanced';
    if (planLower === 'coach pro' || planLower === 'pro') return 'pro';
    if (planLower === 'à la carte' || planLower === 'pay-as-you-go') return 'à la carte';
    
    return planLower;
  }

  public getSubscriptionId(plan: string, period: string): string | undefined {
    // Normaliser la période et le plan
    const normalizedPeriod = this.normalizePeriod(period);
    const normalizedPlan = this.normalizePlan(plan).toUpperCase();
    
    // Rechercher dans les produits chargés depuis l'API (données du CSV)
    const productExact = this.products.find(p => {
      // Pour les abonnements, le format est "[PLAN] - [PERIOD] SUBSCRIPTION"
      return p.product_name.includes(`${normalizedPlan} - ${normalizedPeriod.toUpperCase()} SUBSCRIPTION`);
    });
    
    // Retourner le campaign_product_id qui sera utilisé dans l'URL de checkout
    return productExact?.campaign_product_id;
  }

  public getTokenPackId(plan: string, tokenCount: number): string | undefined {
    // Pour pay-as-you-go, utiliser "à la carte" comme valeur de recherche
    const subscriptionPlan = this.normalizePlan(plan);
    
    const product = this.products.find(p => {
      // Vérifier la correspondance du plan
      const planMatch = p.subscription_plan === subscriptionPlan;
      
      // Vérifier la correspondance du nombre de tokens
      const tokenMatch = p.product_name.includes(`${tokenCount} TOKEN PACK`);
      
      return planMatch && tokenMatch;
    });
    
    // Retourner le campaign_product_id qui sera utilisé dans l'URL de checkout
    return product?.campaign_product_id;
  }

  public getProductDetails(plan: string, period: string, tokenCount?: number): ProductDetails | null {
    // Si le plan est à la carte ou pay-as-you-go, c'est un achat de tokens
    const isOneTime = plan.toLowerCase() === 'à la carte' || plan.toLowerCase() === 'pay-as-you-go';
    
    if (isOneTime && tokenCount) {
      const tokenPackId = this.getTokenPackId('à la carte', tokenCount);
      
      if (!tokenPackId) {
        console.error(`Token pack non trouvé pour ${tokenCount} tokens`);
        return null;
      }
      
      return {
        id: tokenPackId,
        name: `${tokenCount} TOKEN PACK`,
        price: tokenCount * 0.90, // Prix fixe de 0.90€ par token à la carte
        nextBillingDate: '',
        includedTokens: tokenCount,
        additionalTokenPrice: 0.90
      };
    } else {
      // C'est un abonnement
      const subscriptionId = this.getSubscriptionId(plan, period);
      
      if (!subscriptionId) {
        console.error(`Abonnement non trouvé pour ${plan} - ${period}`);
        return null;
      }
      
      // Récupérer les informations de prix et tokens en fonction du plan et de la période
      const normalizedPlan = this.normalizePlan(plan);
      let periodKey = period.toLowerCase();
      
      // Normaliser la période pour accéder aux objets de prix
      if (periodKey === 'bi-weekly' || periodKey === 'biweekly') {
        periodKey = 'biweekly';
      }
      
      if (periodKey === 'yearly' || periodKey === 'annualy') {
        periodKey = 'yearly';
      }
      
      // Prix de base pour chaque plan et période
      const basePrices: Record<string, Record<string, number>> = {
        'lite': { monthly: 19.90, biweekly: 11.94, quarterly: 53.73, yearly: 191.04 },
        'basic': { monthly: 34.90, biweekly: 20.94, quarterly: 94.23, yearly: 335.04 },
        'advanced': { monthly: 49.90, biweekly: 29.94, quarterly: 134.73, yearly: 479.04 },
        'pro': { monthly: 69.90, biweekly: 41.94, quarterly: 188.73, yearly: 671.04 }
      };
      
      // Tokens inclus pour chaque plan et période
      const includedTokens: Record<string, Record<string, number>> = {
        'lite': { monthly: 45, biweekly: 27, quarterly: 121, yearly: 432 },
        'basic': { monthly: 100, biweekly: 60, quarterly: 270, yearly: 960 },
        'advanced': { monthly: 180, biweekly: 108, quarterly: 486, yearly: 1728 },
        'pro': { monthly: 300, biweekly: 180, quarterly: 810, yearly: 2880 }
      };
      
      // Prix des tokens supplémentaires par plan
      const additionalTokenPrices: Record<string, number> = {
        'lite': 0.75,
        'basic': 0.60,
        'advanced': 0.45,
        'pro': 0.35,
        'à la carte': 0.90
      };
      
      const planPrice = basePrices[normalizedPlan]?.[periodKey] || 0;
      const planTokens = includedTokens[normalizedPlan]?.[periodKey] || 0;
      const additionalTokenPrice = additionalTokenPrices[normalizedPlan] || 0.75;
      
      return {
        id: subscriptionId,
        name: `${plan.toUpperCase()} - ${period.toUpperCase()} SUBSCRIPTION`,
        price: planPrice,
        nextBillingDate: this.calculateNextBillingDate(period),
        includedTokens: planTokens,
        additionalTokenPrice: additionalTokenPrice
      };
    }
  }

  private calculateNextBillingDate(period: string): string {
    const today = new Date();
    const nextBillingDate = new Date(today);
    
    switch (period.toLowerCase()) {
      case 'biweekly':
      case 'bi-weekly':
        nextBillingDate.setDate(today.getDate() + 14);
        break;
      case 'monthly':
        nextBillingDate.setMonth(today.getMonth() + 1);
        break;
      case 'quarterly':
        nextBillingDate.setMonth(today.getMonth() + 3);
        break;
      case 'yearly':
      case 'annualy':
        nextBillingDate.setFullYear(today.getFullYear() + 1);
        break;
    }
    
    return nextBillingDate.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  public buildCheckoutUrl(products: CheckoutProducts): string {
    const baseUrl = process.env.NEXT_PUBLIC_CHECKOUT_URL || 'https://payment-securise.seduc-ia.com/checkout/J1VeWo5QC9C2HUaOzW8t7dfWDkz9syXUX69RefX8Xsm4HFD44S8RQiCvlogO2B3ibKFdCxz8Ow0SmGXmaOTf4cCIrcJ';
    
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
} 