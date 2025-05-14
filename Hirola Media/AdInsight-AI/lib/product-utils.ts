import { promises as fs } from 'fs';
import path from 'path';

interface Product {
  campaign_product_id: string;
  product_name: string;
  subscription_plan: string;
}

interface CheckoutProducts {
  subscriptionId?: string;
  tokenPackId?: string;
}

export interface ProductDetails {
  id: string;
  name: string;
  price: number;
  nextBillingDate: string;
  includedTokens: number;
  additionalTokenPrice: number;
}

export class ProductManager {
  private static instance: ProductManager;
  private products: Product[] = [];
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
      this.products = data.products;
      this.initialized = true;
    } catch (error) {
      console.error('Erreur lors de l\'initialisation des produits:', error);
      throw error;
    }
  }

  public getSubscriptionId(plan: string, period: string): string | undefined {
    // Normaliser la période pour gérer les différentes écritures (avec ou sans tiret)
    const normalizedPeriod = this.normalizePeriod(period);
    const planUpper = plan.toUpperCase(); 
    
    console.log(`DEBUG: Recherche pour plan=${plan.toUpperCase()}, période=${period}, normalisée=${normalizedPeriod.toUpperCase()}`);
    
    // Rechercher exactement dans le nom du produit
    const productExact = this.products.find(p => {
      if (!p.subscription_plan) return false;
      const planMatch = p.subscription_plan.toUpperCase() === planUpper;
      
      // Vérifier si le nom du produit contient exactement le plan et la période
      const isBiWeekly = normalizedPeriod.toUpperCase() === 'BIWEEKLY' || normalizedPeriod.toUpperCase() === 'BI-WEEKLY';
      const isYearly = normalizedPeriod.toUpperCase() === 'YEARLY' || normalizedPeriod.toUpperCase() === 'ANNUALY';
      
      // Recherche spécifique dans le nom du produit
      let nameMatch = false;
      if (isBiWeekly && p.product_name.toUpperCase().includes('BI-WEEKLY')) {
        nameMatch = true;
      } else if (isYearly && p.product_name.toUpperCase().includes('ANNUALY')) {
        nameMatch = true;
      } else if (p.product_name.toUpperCase().includes(normalizedPeriod.toUpperCase())) {
        nameMatch = true;
      }
      
      return planMatch && nameMatch;
    });
    
    const resultId = productExact?.campaign_product_id;
    console.log(`Recherche pour plan=${plan}, période=${period}, normalisé=${normalizedPeriod}. Résultat:`, resultId || 'Non trouvé');
    
    return resultId;
  }

  private normalizePeriod(period: string): string {
    if (!period) return '';
    
    const periodLower = period.toLowerCase();
    
    if (periodLower === 'bi-weekly' || periodLower === 'biweekly') {
      return 'bi-weekly'; // On standardise sur bi-weekly car c'est l'orthographe utilisée dans le CSV
    }
    
    if (periodLower === 'yearly' || periodLower === 'annualy') {
      return 'annualy'; // On standardise sur annualy car c'est l'orthographe utilisée dans le CSV
    }
    
    return periodLower;
  }

  public getTokenPackId(plan: string, tokenCount: number): string | undefined {
    // Pour le plan pay-as-you-go, utiliser "à la carte" comme valeur de subscription_plan
    const subscriptionPlan = plan.toLowerCase() === 'pay-as-you-go' ? 'à la carte' : plan;
    
    console.log(`DEBUG: Recherche de token pack pour plan=${plan}, planNormalisé=${subscriptionPlan}, tokenCount=${tokenCount}`);
    
    const product = this.products.find(p => {
      // Vérifier si le produit a un subscription_plan défini
      if (!p.subscription_plan) return false;
      
      // Pour pay-as-you-go, chercher des produits avec subscription_plan "à la carte"
      const planMatch = p.subscription_plan.toUpperCase() === subscriptionPlan.toUpperCase();
      
      // Vérifier si le nom du produit contient le nombre de tokens
      const tokenMatch = p.product_name.includes(`${tokenCount} TOKEN PACK`);
      
      return planMatch && tokenMatch;
    });
    
    console.log(`Résultat recherche token pack:`, product?.campaign_product_id || 'Non trouvé');
    
    return product?.campaign_product_id;
  }

  public getProductDetails(plan: string, period: string): ProductDetails | undefined {
    // Normaliser la période pour la recherche de produit
    const periodForSearch = this.normalizePeriod(period);
    
    // Normaliser la période pour les calculs de prix
    let periodForPricing = period.toLowerCase();
    if (periodForPricing === 'bi-weekly' || periodForPricing === 'biweekly') {
      periodForPricing = 'biweekly';
    } else if (periodForPricing === 'annualy' || periodForPricing === 'yearly') {
      periodForPricing = 'yearly';
    }
    
    console.log(`getProductDetails: période pour recherche=${periodForSearch}, période pour prix=${periodForPricing}`);
    
    // Récupérer l'identifiant de la souscription
    const subscriptionId = this.getSubscriptionId(plan, periodForSearch);
    if (!subscriptionId) return undefined;

    const product = this.products.find(p => p.campaign_product_id === subscriptionId);
    if (!product) return undefined;

    // Calculer la prochaine date de facturation
    const nextBillingDate = this.calculateNextBillingDate(periodForSearch);

    // Récupérer les détails du plan
    const planDetails = this.getPlanDetails(plan, periodForPricing);

    return {
      id: subscriptionId,
      name: product.product_name,
      price: planDetails.price,
      nextBillingDate,
      includedTokens: planDetails.includedTokens,
      additionalTokenPrice: planDetails.additionalTokenPrice
    };
  }

  private getPlanDetails(plan: string, period: string): { price: number; includedTokens: number; additionalTokenPrice: number } {
    // Normaliser la période pour la comparaison avec les clés de l'objet basePrices
    let periodKey = period.toLowerCase();
    
    // Convertir la période au format utilisé dans les objets de prix
    if (periodKey === 'bi-weekly' || periodKey === 'biweekly') {
      periodKey = 'biweekly';
    } else if (periodKey === 'annualy' || periodKey === 'yearly') {
      periodKey = 'yearly';
    }

    console.log(`Récupération des détails du plan: plan=${plan}, période=${period}, clé période=${periodKey}`);
    
    const basePrices: Record<string, Record<string, number>> = {
      'lite': { monthly: 19.90, biweekly: 11.94, quarterly: 53.73, yearly: 191.04 },
      'basic': { monthly: 34.90, biweekly: 20.94, quarterly: 94.23, yearly: 335.04 },
      'advanced': { monthly: 49.90, biweekly: 29.94, quarterly: 134.73, yearly: 479.04 },
      'pro': { monthly: 69.90, biweekly: 41.94, quarterly: 188.73, yearly: 671.04 }
    };

    const includedTokens: Record<string, Record<string, number>> = {
      'lite': { monthly: 45, biweekly: 27, quarterly: 121, yearly: 432 },
      'basic': { monthly: 100, biweekly: 60, quarterly: 270, yearly: 960 },
      'advanced': { monthly: 180, biweekly: 108, quarterly: 486, yearly: 1728 },
      'pro': { monthly: 300, biweekly: 180, quarterly: 810, yearly: 2880 }
    };

    const additionalTokenPrices: Record<string, number> = {
      'lite': 0.75,
      'basic': 0.60,
      'advanced': 0.45,
      'pro': 0.35,
      'pay-as-you-go': 0.90
    };

    const planPrice = basePrices[plan.toLowerCase()]?.[periodKey] || 0;
    const planTokens = includedTokens[plan.toLowerCase()]?.[periodKey] || 0;
    const tokenPrice = additionalTokenPrices[plan.toLowerCase()] || 0;
    
    console.log(`Prix calculés: prix=${planPrice}€, tokens=${planTokens}, prix token=${tokenPrice}€`);

    return {
      price: planPrice,
      includedTokens: planTokens,
      additionalTokenPrice: tokenPrice
    };
  }

  private calculateNextBillingDate(period: string): string {
    const now = new Date();
    let nextDate = new Date();

    switch (period.toLowerCase()) {
      case 'monthly':
        nextDate.setMonth(now.getMonth() + 1);
        break;
      case 'quarterly':
        nextDate.setMonth(now.getMonth() + 3);
        break;
      case 'bi-weekly':
      case 'biweekly':
        nextDate.setDate(now.getDate() + 14);
        break;
      case 'annualy':
      case 'yearly':
        nextDate.setFullYear(now.getFullYear() + 1);
        break;
    }

    return nextDate.toLocaleDateString('fr-FR');
  }

  public buildCheckoutUrl(products: CheckoutProducts): string {
    const baseUrl = process.env.NEXT_PUBLIC_CHECKOUT_URL || 'https://payment-securise.adinisghtai.com/checkout/0wmGeBvEoVOLtTdi5BPOvZe7jZPIbBZI3sYD09lzmLK77hgf0VhXSi0pvyJawVp4lEvcdcfxe6khM3OX8UrMsvEHxRu';
    
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