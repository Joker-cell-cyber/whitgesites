/**
 * Classe utilitaire pour la gestion des produits, prix et tokens
 * Implémente le pattern singleton pour avoir une seule instance
 */

// Interface pour les détails du produit
export interface ProductDetails {
  id: string;               // ID du produit pour le checkout
  name: string;             // Nom du produit
  price: number;            // Prix de base
  nextBillingDate: string;  // Date de prochaine facturation
  includedTokens: number;   // Nombre de tokens inclus
  additionalTokenPrice: number; // Prix par token supplémentaire
}

// Interface pour les produits dans le panier
export interface CheckoutProducts {
  subscriptionId?: string;  // ID de l'abonnement
  tokenPackId?: string;     // ID du pack de tokens
}

export class ProductManager {
  private static instance: ProductManager;
  private products: any[] = [];
  private initialized: boolean = false;

  // Données de prix pour chaque plan selon la période
  private basePrices: Record<string, Record<string, number>> = {
    'lite': { monthly: 19.90, biweekly: 11.94, quarterly: 53.73, yearly: 191.04 },
    'basic': { monthly: 34.90, biweekly: 20.94, quarterly: 94.23, yearly: 335.04 },
    'advanced': { monthly: 49.90, biweekly: 29.94, quarterly: 134.73, yearly: 479.04 },
    'pro': { monthly: 69.90, biweekly: 41.94, quarterly: 188.73, yearly: 671.04 }
  };

  // Tokens inclus pour chaque plan selon la période
  private includedTokens: Record<string, Record<string, number>> = {
    'lite': { monthly: 45, biweekly: 27, quarterly: 121, yearly: 432 },
    'basic': { monthly: 100, biweekly: 60, quarterly: 270, yearly: 960 },
    'advanced': { monthly: 180, biweekly: 108, quarterly: 486, yearly: 1728 },
    'pro': { monthly: 300, biweekly: 180, quarterly: 810, yearly: 2880 }
  };

  // Prix des tokens supplémentaires pour chaque plan
  private additionalTokenPrices: Record<string, number> = {
    'lite': 0.75,
    'basic': 0.60,
    'advanced': 0.45,
    'pro': 0.35,
    'pay-as-you-go': 0.90
  };

  // Constructeur privé pour le pattern singleton
  private constructor() {}

  // Méthode pour obtenir l'instance unique
  public static getInstance(): ProductManager {
    if (!ProductManager.instance) {
      ProductManager.instance = new ProductManager();
    }
    return ProductManager.instance;
  }

  // Initialisation avec les données de produits
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
      console.error('Erreur lors de l\'initialisation du ProductManager:', error);
      throw error;
    }
  }

  // Obtenir l'ID de produit pour un abonnement
  public getSubscriptionId(plan: string, period: string): string | undefined {
    // Normaliser la période pour la recherche dans le CSV
    const normalizedPeriod = this.normalizePeriod(period);
    const planUpper = plan.toUpperCase();
    
    // Rechercher dans les produits chargés depuis l'API
    const product = this.products.find(p => {
      // Vérifie que c'est un abonnement en cherchant "SUBSCRIPTION" dans le nom
      const isSubscription = p.product_name.includes('SUBSCRIPTION');
      
      // Vérifie que le plan correspond
      const planMatch = p.product_name.includes(planUpper);
      
      // Vérifie que la période correspond
      const periodMatch = p.product_name.includes(normalizedPeriod.toUpperCase());
      
      return isSubscription && planMatch && periodMatch;
    });
    
    return product?.campaign_product_id;
  }

  // Obtenir l'ID de produit pour un pack de tokens
  public getTokenPackId(plan: string, tokenCount: number): string | undefined {
    try {
    // Pour pay-as-you-go, utiliser "à la carte" comme valeur de recherche
    const subscriptionPlan = plan.toLowerCase() === 'pay-as-you-go' ? 'à la carte' : plan.toLowerCase();
    
      // Solution de repli: si on ne trouve pas exactement le bon produit,
      // on peut retourner un ID de produit directement
      if (plan.toLowerCase() === 'pro' && tokenCount > 0) {
        // Trouver un produit directement par le nom qui contient le nombre de tokens requis
        const directProduct = this.products.find(p => 
          p.product_name && p.product_name.includes(`${tokenCount} TOKEN PACK`) && 
          p.product_name.includes("PRO")
        );
        
        if (directProduct?.campaign_product_id) {
          return directProduct.campaign_product_id;
        }
        
        // Si on ne trouve pas le produit exact, essayer de trouver un produit similaire
        // par exemple, si on demande 50 tokens, on peut retourner 60 tokens
        const closestProduct = this.products.find(p => 
          p.product_name && p.product_name.includes("TOKEN PACK") && 
          p.product_name.includes("PRO")
        );
        
        if (closestProduct?.campaign_product_id) {
          return closestProduct.campaign_product_id;
        }
      }
      
      // Méthode originale avec vérification supplémentaire pour p.subscription_plan
      const product = this.products.find(p => {
        // Vérifier la correspondance du plan, en s'assurant que p.subscription_plan existe
        const planMatch = p.subscription_plan && typeof p.subscription_plan.toLowerCase === 'function' && 
                          p.subscription_plan.toLowerCase() === subscriptionPlan;
      
      // Vérifier la correspondance du nombre de tokens
        const tokenMatch = p.product_name && p.product_name.includes(`${tokenCount} TOKEN PACK`);
      
      return planMatch && tokenMatch;
    });
    
      if (product?.campaign_product_id) {
        return product.campaign_product_id;
      }
      
      // Si aucune des méthodes précédentes n'a fonctionné, utiliser l'approche directe par le CSV
      return this.getTokenPackIdFromCSV(tokenCount);
      
    } catch (error) {
      console.error("Erreur lors de la récupération du token pack:", error);
      // Fallback vers la méthode directe par le CSV
      return this.getTokenPackIdFromCSV(tokenCount);
    }
  }
  
  // Obtenir l'ID du pack de tokens directement depuis la structure du CSV
  public getTokenPackIdFromCSV(tokenCount: number, planOrIsPro: boolean | string = false): string {
    // Compatibilité avec l'ancienne version qui prend un booléen
    if (typeof planOrIsPro === 'boolean') {
      return planOrIsPro ? this.getProTokenPackId(tokenCount) : this.getPayAsYouGoTokenPackId(tokenCount);
    }
    
    // Nouvelle version qui prend une chaîne pour le plan
    const planLower = (planOrIsPro as string).toLowerCase();
    
    // Sélectionner la méthode appropriée en fonction du plan
    if (planLower === 'pro') {
      return this.getProTokenPackId(tokenCount);
    } else if (planLower === 'advanced') {
      return this.getAdvancedTokenPackId(tokenCount);
    } else if (planLower === 'basic') {
      return this.getBasicTokenPackId(tokenCount);
    } else if (planLower === 'lite') {
      return this.getLiteTokenPackId(tokenCount);
    } else {
      // Par défaut, utiliser les tokens à la carte (pay-as-you-go)
      return this.getPayAsYouGoTokenPackId(tokenCount);
    }
  }
  
  // Obtenir l'ID du pack de tokens en fonction du plan d'abonnement
  public getTokenPackIdByPlan(tokenCount: number, plan: string): string {
    // Normaliser le plan pour éviter les problèmes de casse
    const planLower = plan.toLowerCase();
    
    // Sélectionner la méthode appropriée en fonction du plan
    if (planLower === 'pro') {
      return this.getProTokenPackId(tokenCount);
    } else if (planLower === 'advanced') {
      return this.getAdvancedTokenPackId(tokenCount);
    } else if (planLower === 'basic') {
      return this.getBasicTokenPackId(tokenCount);
    } else if (planLower === 'lite') {
      return this.getLiteTokenPackId(tokenCount);
    } else {
      // Par défaut, utiliser les tokens à la carte (pay-as-you-go)
      return this.getPayAsYouGoTokenPackId(tokenCount);
    }
  }
  
  // Obtenir l'ID pour un pack de tokens Pro (prix à 0.35€ par token)
  private getProTokenPackId(tokenCount: number): string {
    // Ces IDs correspondent aux ID des produits Pro dans le CSV
    if (tokenCount <= 10) return "37967";  // 10 TOKEN PACK
    if (tokenCount <= 20) return "37968";  // 20 TOKEN PACK
    if (tokenCount <= 30) return "37969";  // 30 TOKEN PACK
    if (tokenCount <= 40) return "37970";  // 40 TOKEN PACK
    if (tokenCount <= 50) return "37971";  // 50 TOKEN PACK
    if (tokenCount <= 60) return "37972";  // 60 TOKEN PACK
    if (tokenCount <= 70) return "37973";  // 70 TOKEN PACK
    if (tokenCount <= 80) return "37974";  // 80 TOKEN PACK
    if (tokenCount <= 90) return "37975";  // 90 TOKEN PACK
    if (tokenCount <= 100) return "37976"; // 100 TOKEN PACK
    if (tokenCount <= 110) return "37977"; // 110 TOKEN PACK
    if (tokenCount <= 120) return "37978"; // 120 TOKEN PACK
    if (tokenCount <= 130) return "37979"; // 130 TOKEN PACK
    if (tokenCount <= 140) return "37980"; // 140 TOKEN PACK
    if (tokenCount <= 150) return "37981"; // 150 TOKEN PACK
    if (tokenCount <= 160) return "37982"; // 160 TOKEN PACK
    if (tokenCount <= 170) return "37983"; // 170 TOKEN PACK
    if (tokenCount <= 180) return "37984"; // 180 TOKEN PACK
    if (tokenCount <= 190) return "37985"; // 190 TOKEN PACK
    if (tokenCount <= 200) return "37986"; // 200 TOKEN PACK
    if (tokenCount <= 250) return "37991"; // 250 TOKEN PACK
    if (tokenCount <= 300) return "37996"; // 300 TOKEN PACK
    if (tokenCount <= 350) return "38001"; // 350 TOKEN PACK
    if (tokenCount <= 400) return "38006"; // 400 TOKEN PACK
    if (tokenCount <= 450) return "38011"; // 450 TOKEN PACK
    if (tokenCount <= 500) return "38016"; // 500 TOKEN PACK
    
    return "38016"; // 500 TOKEN PACK par défaut
  }
  
  // Obtenir l'ID pour un pack de tokens Advanced (prix à 0.45€ par token)
  private getAdvancedTokenPackId(tokenCount: number): string {
    // Ces IDs correspondent aux ID des produits Advanced dans le CSV
    if (tokenCount <= 10) return "37767";  // 10 TOKEN PACK
    if (tokenCount <= 20) return "37768";  // 20 TOKEN PACK
    if (tokenCount <= 30) return "37769";  // 30 TOKEN PACK
    if (tokenCount <= 40) return "37770";  // 40 TOKEN PACK
    if (tokenCount <= 50) return "37771";  // 50 TOKEN PACK
    if (tokenCount <= 60) return "37772";  // 60 TOKEN PACK
    if (tokenCount <= 70) return "37773";  // 70 TOKEN PACK
    if (tokenCount <= 80) return "37774";  // 80 TOKEN PACK
    if (tokenCount <= 90) return "37775";  // 90 TOKEN PACK
    if (tokenCount <= 100) return "37776"; // 100 TOKEN PACK
    if (tokenCount <= 110) return "37777"; // 110 TOKEN PACK
    if (tokenCount <= 120) return "37778"; // 120 TOKEN PACK
    if (tokenCount <= 130) return "37779"; // 130 TOKEN PACK
    if (tokenCount <= 140) return "37780"; // 140 TOKEN PACK
    if (tokenCount <= 150) return "37781"; // 150 TOKEN PACK
    if (tokenCount <= 160) return "37782"; // 160 TOKEN PACK
    if (tokenCount <= 170) return "37783"; // 170 TOKEN PACK
    if (tokenCount <= 180) return "37784"; // 180 TOKEN PACK
    if (tokenCount <= 190) return "37785"; // 190 TOKEN PACK
    if (tokenCount <= 200) return "37786"; // 200 TOKEN PACK
    if (tokenCount <= 250) return "37791"; // 250 TOKEN PACK
    if (tokenCount <= 300) return "37796"; // 300 TOKEN PACK
    if (tokenCount <= 350) return "37801"; // 350 TOKEN PACK
    if (tokenCount <= 400) return "37806"; // 400 TOKEN PACK
    if (tokenCount <= 450) return "37811"; // 450 TOKEN PACK
    if (tokenCount <= 500) return "37816"; // 500 TOKEN PACK
    
    return "37816"; // 500 TOKEN PACK par défaut
  }
  
  // Obtenir l'ID pour un pack de tokens Basic (prix à 0.60€ par token)
  private getBasicTokenPackId(tokenCount: number): string {
    // Ces IDs correspondent aux ID des produits Basic dans le CSV
    if (tokenCount <= 10) return "37817";  // 10 TOKEN PACK
    if (tokenCount <= 20) return "37818";  // 20 TOKEN PACK
    if (tokenCount <= 30) return "37819";  // 30 TOKEN PACK
    if (tokenCount <= 40) return "37820";  // 40 TOKEN PACK
    if (tokenCount <= 50) return "37821";  // 50 TOKEN PACK
    if (tokenCount <= 60) return "37822";  // 60 TOKEN PACK
    if (tokenCount <= 70) return "37823";  // 70 TOKEN PACK
    if (tokenCount <= 80) return "37824";  // 80 TOKEN PACK
    if (tokenCount <= 90) return "37825";  // 90 TOKEN PACK
    if (tokenCount <= 100) return "37826"; // 100 TOKEN PACK
    if (tokenCount <= 110) return "37827"; // 110 TOKEN PACK
    if (tokenCount <= 120) return "37828"; // 120 TOKEN PACK
    if (tokenCount <= 130) return "37829"; // 130 TOKEN PACK
    if (tokenCount <= 140) return "37830"; // 140 TOKEN PACK
    if (tokenCount <= 150) return "37831"; // 150 TOKEN PACK
    if (tokenCount <= 160) return "37832"; // 160 TOKEN PACK
    if (tokenCount <= 170) return "37833"; // 170 TOKEN PACK
    if (tokenCount <= 180) return "37834"; // 180 TOKEN PACK
    if (tokenCount <= 190) return "37835"; // 190 TOKEN PACK
    if (tokenCount <= 200) return "37836"; // 200 TOKEN PACK
    if (tokenCount <= 250) return "37841"; // 250 TOKEN PACK
    if (tokenCount <= 300) return "37846"; // 300 TOKEN PACK
    if (tokenCount <= 350) return "37851"; // 350 TOKEN PACK
    if (tokenCount <= 400) return "37856"; // 400 TOKEN PACK
    if (tokenCount <= 450) return "37861"; // 450 TOKEN PACK
    if (tokenCount <= 500) return "37866"; // 500 TOKEN PACK
    
    return "37866"; // 500 TOKEN PACK par défaut
  }
  
  // Obtenir l'ID pour un pack de tokens Lite (prix à 0.75€ par token)
  private getLiteTokenPackId(tokenCount: number): string {
    // Ces IDs correspondent aux ID des produits Lite dans le CSV
    if (tokenCount <= 10) return "37917";  // 10 TOKEN PACK
    if (tokenCount <= 20) return "37918";  // 20 TOKEN PACK
    if (tokenCount <= 30) return "37919";  // 30 TOKEN PACK
    if (tokenCount <= 40) return "37920";  // 40 TOKEN PACK
    if (tokenCount <= 50) return "37921";  // 50 TOKEN PACK
    if (tokenCount <= 60) return "37922";  // 60 TOKEN PACK
    if (tokenCount <= 70) return "37923";  // 70 TOKEN PACK
    if (tokenCount <= 80) return "37924";  // 80 TOKEN PACK
    if (tokenCount <= 90) return "37925";  // 90 TOKEN PACK
    if (tokenCount <= 100) return "37926"; // 100 TOKEN PACK
    if (tokenCount <= 110) return "37927"; // 110 TOKEN PACK
    if (tokenCount <= 120) return "37928"; // 120 TOKEN PACK
    if (tokenCount <= 130) return "37929"; // 130 TOKEN PACK
    if (tokenCount <= 140) return "37930"; // 140 TOKEN PACK
    if (tokenCount <= 150) return "37931"; // 150 TOKEN PACK
    if (tokenCount <= 160) return "37932"; // 160 TOKEN PACK
    if (tokenCount <= 170) return "37933"; // 170 TOKEN PACK
    if (tokenCount <= 180) return "37934"; // 180 TOKEN PACK
    if (tokenCount <= 190) return "37935"; // 190 TOKEN PACK
    if (tokenCount <= 200) return "37936"; // 200 TOKEN PACK
    if (tokenCount <= 250) return "37941"; // 250 TOKEN PACK
    if (tokenCount <= 300) return "37946"; // 300 TOKEN PACK
    if (tokenCount <= 350) return "37951"; // 350 TOKEN PACK
    if (tokenCount <= 400) return "37956"; // 400 TOKEN PACK
    if (tokenCount <= 450) return "37961"; // 450 TOKEN PACK
    if (tokenCount <= 500) return "37966"; // 500 TOKEN PACK
    
    return "37966"; // 500 TOKEN PACK par défaut
  }
  
  // Obtenir l'ID pour un pack de tokens À La Carte (prix à 0.90€ par token)
  private getPayAsYouGoTokenPackId(tokenCount: number): string {
    // Ces IDs correspondent aux ID des produits À La Carte dans le CSV
    if (tokenCount <= 10) return "37867";  // 10 TOKEN PACK
    if (tokenCount <= 20) return "37868";  // 20 TOKEN PACK
    if (tokenCount <= 30) return "37869";  // 30 TOKEN PACK
    if (tokenCount <= 40) return "37870";  // 40 TOKEN PACK
    if (tokenCount <= 50) return "37871";  // 50 TOKEN PACK
    if (tokenCount <= 60) return "37872";  // 60 TOKEN PACK
    if (tokenCount <= 70) return "37873";  // 70 TOKEN PACK
    if (tokenCount <= 80) return "37874";  // 80 TOKEN PACK
    if (tokenCount <= 90) return "37875";  // 90 TOKEN PACK
    if (tokenCount <= 100) return "37876"; // 100 TOKEN PACK
    if (tokenCount <= 110) return "37877"; // 110 TOKEN PACK
    if (tokenCount <= 120) return "37878"; // 120 TOKEN PACK
    if (tokenCount <= 130) return "37879"; // 130 TOKEN PACK
    if (tokenCount <= 140) return "37880"; // 140 TOKEN PACK
    if (tokenCount <= 150) return "37881"; // 150 TOKEN PACK
    if (tokenCount <= 160) return "37882"; // 160 TOKEN PACK
    if (tokenCount <= 170) return "37883"; // 170 TOKEN PACK
    if (tokenCount <= 180) return "37884"; // 180 TOKEN PACK
    if (tokenCount <= 190) return "37885"; // 190 TOKEN PACK
    if (tokenCount <= 200) return "37886"; // 200 TOKEN PACK
    if (tokenCount <= 250) return "37891"; // 250 TOKEN PACK
    if (tokenCount <= 300) return "37896"; // 300 TOKEN PACK
    if (tokenCount <= 350) return "37901"; // 350 TOKEN PACK
    if (tokenCount <= 400) return "37906"; // 400 TOKEN PACK
    if (tokenCount <= 450) return "37911"; // 450 TOKEN PACK
    if (tokenCount <= 500) return "37916"; // 500 TOKEN PACK
    
    return "37916"; // 500 TOKEN PACK par défaut
  }

  // Obtenir les détails complets d'un produit
  public getProductDetails(plan: string, period: string): ProductDetails {
    const normPlan = plan.toLowerCase();
    let periodKey = period.toLowerCase();
    
    // Normaliser la période pour accéder aux objets de prix
    if (periodKey === 'bi-weekly' || periodKey === 'biweekly') {
      periodKey = 'biweekly';
    }
    if (periodKey === 'annual' || periodKey === 'annualy' || periodKey === 'yearly') {
      periodKey = 'yearly';
    }
    
    // Obtenir l'ID du produit
    const id = this.getSubscriptionId(plan, period);
    
    // Obtenir le nom formaté du produit
    const name = this.formatProductName(plan, period);
    
    // Obtenir le prix de base selon le plan et la période
    const price = this.basePrices[normPlan]?.[periodKey] || 0;
    
    // Calculer la prochaine date de facturation
    const nextBillingDate = this.calculateNextBillingDate(period);
    
    // Obtenir le nombre de tokens inclus
    const includedTokens = this.includedTokens[normPlan]?.[periodKey] || 0;
    
    // Obtenir le prix par token supplémentaire
    const additionalTokenPrice = this.additionalTokenPrices[normPlan] || 0.90;
    
    return {
      id: id || '',
      name,
      price,
      nextBillingDate,
      includedTokens,
      additionalTokenPrice
    };
  }

  // Calculer la prochaine date de facturation
  private calculateNextBillingDate(period: string): string {
    const now = new Date();
    let nextDate = new Date(now);
    
    const periodLower = period.toLowerCase();
    
    if (periodLower === 'bi-weekly' || periodLower === 'biweekly') {
      nextDate.setDate(now.getDate() + 14);
    } else if (periodLower === 'monthly') {
      nextDate.setMonth(now.getMonth() + 1);
    } else if (periodLower === 'quarterly') {
      nextDate.setMonth(now.getMonth() + 3);
    } else if (periodLower === 'annual' || periodLower === 'annualy' || periodLower === 'yearly') {
      nextDate.setFullYear(now.getFullYear() + 1);
    } else if (periodLower === 'one-time') {
      // Pour les achats uniques, pas de prochaine facturation
      return 'N/A';
    }
    
    return nextDate.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  // Normaliser le format de la période pour la recherche dans le CSV
  private normalizePeriod(period: string): string {
    if (!period) return '';
    
    const periodLower = period.toLowerCase();
    
    if (periodLower === 'bi-weekly' || periodLower === 'biweekly') {
      return 'BI-WEEKLY'; // Format pour le CSV
    }
    
    if (periodLower === 'yearly' || periodLower === 'annual' || periodLower === 'annualy') {
      return 'ANNUALY'; // Format pour le CSV
    }
    
    if (periodLower === 'monthly') {
      return 'MONTHLY';
    }
    
    if (periodLower === 'quarterly') {
      return 'QUARTERLY';
    }
    
    return periodLower.toUpperCase();
  }

  // Formater le nom du produit
  private formatProductName(plan: string, period: string): string {
    const planUpper = plan.toUpperCase();
    const periodUpper = this.normalizePeriod(period);
    
    if (period.toLowerCase() === 'one-time') {
      return `${planUpper} - ONE TIME PURCHASE`;
    }
    
    return `${planUpper} - ${periodUpper} SUBSCRIPTION`;
  }

  // Construire l'URL de checkout
  public buildCheckoutUrl(products: CheckoutProducts): string {
    const baseUrl = process.env.NEXT_PUBLIC_CHECKOUT_URL || 'https://payment-securise.content-forge-ai.com/checkout/ecE16MoSFaB3Yj6ZPR1s7dOz8I5GImVl8I2d3sRrJ2qspBfABF0mqYr6HhPfqODkJ5vKlrEeyl6KkhZQhpqdoUIcGHg';
    
    // Construire le paramètre 'products' selon la syntaxe requise: campaignProductId:quantity
    const productParams: string[] = [];
    
    if (products.subscriptionId) {
      productParams.push(`${products.subscriptionId}:1`);
    }
    
    if (products.tokenPackId) {
      productParams.push(`${products.tokenPackId}:1`);
    }
    
    // Construire l'URL manuellement pour éviter l'encodage des caractères spéciaux
    if (productParams.length > 0) {
      return `${baseUrl}?products=${productParams.join(';')}`;
    } else {
      return baseUrl;
    }
  }
}
