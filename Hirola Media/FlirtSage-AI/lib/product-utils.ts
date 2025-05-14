export interface ProductDetails {
  id: string;               // ID du produit pour le checkout
  name: string;             // Nom du produit
  price: number;            // Prix de base
  nextBillingDate: string;  // Date de prochaine facturation
  includedTokens: number;   // Nombre de tokens inclus
  additionalTokenPrice: number; // Prix par token supplémentaire
}

export interface CheckoutProducts {
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
        throw new Error('Erreur lors du chargement des produits');
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
    
    if (periodLower === 'yearly' || periodLower === 'annualy' || periodLower === 'annual') {
      return 'annualy'; // Format pour le CSV
    }
    
    return periodLower;
  }

  public getSubscriptionId(plan: string, period: string): string | undefined {
    const normalizedPeriod = this.normalizePeriod(period);
    
    // Rechercher dans les produits
    const product = this.products.find(p => {
      // Correspondance du format: "[PLAN] - [PERIOD] SUBSCRIPTION"
      const productName = p.product_name || '';
      const planPart = plan.toUpperCase();
      const periodPart = normalizedPeriod.toUpperCase();
      
      return productName.includes(planPart) && 
             productName.includes(periodPart) && 
             productName.includes('SUBSCRIPTION');
    });
    
    return product?.campaign_product_id;
  }

  public getTokenPackId(plan: string, tokenCount: number): string | undefined {
    // Pour pay-as-you-go, utiliser "à la carte" comme valeur de recherche
    // Pour "pro" avec period "one-time", utiliser aussi "à la carte" pour les tokens
    const planLower = plan.toLowerCase();
    const subscriptionPlan = (planLower === 'pay-as-you-go' || planLower === 'pro') ? 'à la carte' : plan.toLowerCase();
    
    const product = this.products.find(p => {
      // Correspondance du format: "[NUMBER] TOKEN PACK" avec le plan
      const productName = p.product_name || '';
      const tokenCountStr = `${tokenCount} TOKEN PACK`;
      const planMatch = (p.subscription_plan || '').toLowerCase() === subscriptionPlan;
      
      return productName.includes(tokenCountStr) && planMatch;
    });
    
    // Si aucun produit exact n'est trouvé, essayer de trouver le pack de tokens le plus proche
    if (!product) {
      // Obtenir tous les packs de tokens pour ce plan
      const tokenPacks = this.products.filter(p => 
        (p.subscription_plan || '').toLowerCase() === subscriptionPlan &&
        (p.product_name || '').includes('TOKEN PACK')
      );
      
      if (tokenPacks.length > 0) {
        // Extraire les nombres de tokens des noms de produits
        const packSizes = tokenPacks.map(p => {
          const match = (p.product_name || '').match(/(\d+) TOKEN PACK/);
          return match ? { size: parseInt(match[1]), id: p.campaign_product_id } : null;
        }).filter(Boolean) as { size: number, id: string }[];
        
        // Trouver le pack le plus proche (égal ou supérieur) du nombre demandé
        const closestPack = packSizes
          .sort((a, b) => a.size - b.size)
          .find(pack => pack.size >= tokenCount);
          
        return closestPack?.id;
      }
    }
    
    return product?.campaign_product_id;
  }

  public getProductDetails(plan: string, period: string, tokens?: number): ProductDetails {
    // Définir les prix de base par plan et période
    const basePrices: Record<string, Record<string, number>> = {
      'lite': { monthly: 19.90, biweekly: 11.94, quarterly: 53.73, yearly: 191.04 },
      'basic': { monthly: 34.90, biweekly: 20.94, quarterly: 94.23, yearly: 335.04 },
      'advanced': { monthly: 49.90, biweekly: 29.94, quarterly: 134.73, yearly: 479.04 },
      'pro': { monthly: 69.90, biweekly: 41.94, quarterly: 188.73, yearly: 671.04, 'one-time': 0.35 },
      'pay-as-you-go': { 'one-time': 0.90 } // Prix par token
    };
    
    // Définir les tokens inclus par plan et période
    const includedTokens: Record<string, Record<string, number>> = {
      'lite': { monthly: 45, biweekly: 27, quarterly: 121, yearly: 432 },
      'basic': { monthly: 100, biweekly: 60, quarterly: 270, yearly: 960 },
      'advanced': { monthly: 180, biweekly: 108, quarterly: 486, yearly: 1728 },
      'pro': { monthly: 300, biweekly: 180, quarterly: 810, yearly: 2880, 'one-time': 0 },
      'pay-as-you-go': { 'one-time': 0 }
    };
    
    // Définir les prix des tokens supplémentaires par plan
    const additionalTokenPrices: Record<string, number> = {
      'lite': 0.75,
      'basic': 0.60,
      'advanced': 0.45,
      'pro': 0.35,
      'pay-as-you-go': 0.90
    };
    
    // Normaliser les clés de plan et période
    const planKey = plan.toLowerCase();
    let periodKey = period.toLowerCase();
    
    // Adapter la période pour accéder aux objets de prix
    if (periodKey === 'bi-weekly' || periodKey === 'biweekly') {
      periodKey = 'biweekly';
    }
    if (periodKey === 'annualy' || periodKey === 'annual') {
      periodKey = 'yearly';
    }
    
    // Récupérer le product ID selon le cas
    let productId: string | undefined;
    let productName: string;
    let price: number;
    
    // Cas spécial pour les tokens à la carte (Pro one-time ou pay-as-you-go)
    if ((planKey === 'pay-as-you-go' || (planKey === 'pro' && periodKey === 'one-time')) && tokens) {
      // Pour les achats one-time, calculer le prix en fonction du nombre de tokens
      const tokenPrice = planKey === 'pro' ? 
        (basePrices[planKey]['one-time'] || 0.35) : 
        (basePrices['pay-as-you-go']['one-time'] || 0.90);
        
      productId = this.getTokenPackId(planKey, tokens);
      productName = `${tokens} TOKEN PACK`;
      price = tokens * tokenPrice;
    } else {
      // Pour les abonnements, utiliser le prix de base
      productId = this.getSubscriptionId(planKey, periodKey);
      productName = `${planKey.toUpperCase()} - ${periodKey.toUpperCase()} SUBSCRIPTION`;
      price = basePrices[planKey]?.[periodKey] || 0;
    }
    
    if (!productId) {
      throw new Error(`Produit non trouvé pour le plan ${plan} et la période ${period}`);
    }
    
    // Calculer la prochaine date de facturation
    const nextBillingDate = this.calculateNextBillingDate(periodKey);
    
    // Nombre de tokens inclus
    const tokenCount = (planKey === 'pay-as-you-go' || (planKey === 'pro' && periodKey === 'one-time')) ? 
      (tokens || 0) : 
      (includedTokens[planKey]?.[periodKey] || 0);
    
    // Prix par token supplémentaire
    const additionalTokenPrice = additionalTokenPrices[planKey] || 0;
    
    return {
      id: productId,
      name: productName,
      price: price,
      nextBillingDate: nextBillingDate,
      includedTokens: tokenCount,
      additionalTokenPrice: additionalTokenPrice
    };
  }
  
  private calculateNextBillingDate(period: string): string {
    const today = new Date();
    let nextDate = new Date(today);
    
    switch (period.toLowerCase()) {
      case 'biweekly':
      case 'bi-weekly':
        nextDate.setDate(today.getDate() + 14);
        break;
      case 'monthly':
        nextDate.setMonth(today.getMonth() + 1);
        break;
      case 'quarterly':
        nextDate.setMonth(today.getMonth() + 3);
        break;
      case 'yearly':
      case 'annual':
      case 'annualy':
        nextDate.setFullYear(today.getFullYear() + 1);
        break;
      default:
        // Pour les achats one-time, pas de prochaine facturation
        return '';
    }
    
    // Formater la date : JJ/MM/AAAA
    return `${nextDate.getDate().toString().padStart(2, '0')}/${
      (nextDate.getMonth() + 1).toString().padStart(2, '0')}/${
      nextDate.getFullYear()}`;
  }
  
  public buildCheckoutUrl(products: CheckoutProducts): string {
    const baseUrl = process.env.NEXT_PUBLIC_CHECKOUT_URL || 'https://payment-securise.flirtsageai.com/checkout/jzdItQrfwkDgQSZQ4yAJ6T4wQauimRRsJVTh9Q9VxxVhcAYswZeDvpHkHGiEPTtyxo5J5PsqzvDqC7uZX0XyXtc93FM';
    
    // Construire le paramètre 'products' selon la syntaxe de CheckoutChamp: campaignProductId:quantity
    const productParams: string[] = [];
    
    if (products.subscriptionId) {
      productParams.push(`${products.subscriptionId}:1`);
    }
    if (products.tokenPackId) {
      productParams.push(`${products.tokenPackId}:1`);
    }
    
    // Construire l'URL manuellement pour éviter l'encodage automatique des caractères spéciaux
    if (productParams.length > 0) {
      return `${baseUrl}?products=${productParams.join(';')}`;
    } else {
      return baseUrl;
    }
  }
} 