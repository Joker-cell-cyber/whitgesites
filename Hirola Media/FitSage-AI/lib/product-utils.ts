/**
 * Gestionnaire de produits et liens de checkout pour FitSage AI
 * Basé sur la documentation technique fournie
 */

export interface ProductDetails {
  id: string;               // ID du produit pour le checkout
  name: string;             // Nom du produit
  price: number;            // Prix de base
  nextBillingDate: string;  // Date de prochaine facturation
  includedTokens: number;   // Nombre de tokens inclus
  additionalTokenPrice: number; // Prix par token supplémentaire
}

interface CheckoutProducts {
  subscriptionId?: string;  // ID du produit d'abonnement
  tokenPackId?: string;     // ID du produit de tokens
}

type BillingPeriod = 'monthly' | 'quarterly' | 'bi-weekly' | 'annualy' | 'one-time';

/**
 * Classe principale pour la gestion des produits et des liens de checkout
 */
export class ProductManager {
  private static instance: ProductManager;
  private products: any[] = [];
  private initialized = false;

  /**
   * Constructeur privé (pattern Singleton)
   */
  private constructor() {}

  /**
   * Obtenir l'instance unique de ProductManager
   */
  public static getInstance(): ProductManager {
    if (!ProductManager.instance) {
      ProductManager.instance = new ProductManager();
    }
    return ProductManager.instance;
  }

  /**
   * Initialiser les données de produits en les chargeant depuis l'API
   */
  public async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      console.log('ProductManager: Chargement des données depuis l\'API...');
      const response = await fetch('/api/products');
      
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des produits');
      }
      
      const data = await response.json();
      this.products = data.products || [];
      this.initialized = true;
      console.log('ProductManager: Données chargées avec succès', this.products.length, 'produits trouvés');
    } catch (error) {
      console.error('ProductManager: Erreur lors de l\'initialisation:', error);
      throw error;
    }
  }

  /**
   * Obtenir l'ID d'un produit d'abonnement
   * @param plan Nom du plan (lite, basic, advanced, pro)
   * @param period Période de facturation (monthly, quarterly, bi-weekly, annualy)
   * @returns ID du produit ou undefined si non trouvé
   */
  public getSubscriptionId(plan: string, period: BillingPeriod): string | undefined {
    if (!this.initialized) {
      console.warn('ProductManager: getSubscriptionId appelé avant initialisation');
    }

    // Vérification des paramètres
    if (!plan || !period) {
      console.error('ProductManager: paramètres manquants', { plan, period });
      return undefined;
    }

    // Normaliser la période
    const normalizedPeriod = this.normalizePeriod(period);
    const planUpper = plan.toUpperCase();
    
    console.log('ProductManager: Recherche de produit avec les critères:', {
      plan: planUpper,
      period: normalizedPeriod
    });
    
    // Afficher les premiers produits pour débogage
    if (this.products.length > 0) {
      console.log('ProductManager: Exemple de produits disponibles:', 
        this.products.slice(0, 5).map(p => ({ 
          id: p.campaign_product_id,
          name: p.product_name,
          plan: p.subscription_plan
        }))
      );
      
      console.log('ProductManager: Total produits chargés:', this.products.length);
    }
    
    // Pour les abonnements, rechercher par le format du nom du produit
    // Format attendu: "PLAN - PERIOD SUBSCRIPTION" (ex: "LITE - MONTHLY SUBSCRIPTION")
    const expectedProductName = `${planUpper} - ${normalizedPeriod} SUBSCRIPTION`;
    
    console.log('ProductManager: Recherche de produit avec le nom:', expectedProductName);
    
    // Rechercher dans les produits chargés depuis l'API (données du CSV)
    const productExact = this.products.find(p => {
      if (!p.product_name) return false;
      
      // Pour les abonnements, se baser uniquement sur le nom du produit
      const nameMatch = p.product_name.toUpperCase().trim() === expectedProductName;
      
      if (nameMatch) {
        console.log('ProductManager: Produit correspondant trouvé:', {
          id: p.campaign_product_id,
          name: p.product_name
        });
      }
      
      return nameMatch;
    });
    
    // Si le produit exact n'est pas trouvé, rechercher avec une approche moins stricte
    if (!productExact) {
      console.log('ProductManager: Aucun produit exact trouvé, recherche plus large');
      
      // Rechercher tous les produits qui contiennent à la fois le plan et la période
      // et qui sont des abonnements (contiennent "SUBSCRIPTION")
      const subscriptionProducts = this.products.filter(p => 
        p.product_name && 
        p.product_name.toUpperCase().includes('SUBSCRIPTION') &&
        p.product_name.toUpperCase().includes(planUpper) &&
        p.product_name.toUpperCase().includes(normalizedPeriod)
      );
      
      if (subscriptionProducts.length > 0) {
        console.log('ProductManager: Produits d\'abonnement trouvés:', 
          subscriptionProducts.map(p => ({ 
            id: p.campaign_product_id,
            name: p.product_name
          }))
        );
        
        // Utiliser le premier produit trouvé
        return subscriptionProducts[0].campaign_product_id;
      } else {
        console.log('ProductManager: Aucun produit d\'abonnement correspondant trouvé');
      }
    }
    
    console.log(`ProductManager: Résultat final de recherche d'abonnement pour plan=${planUpper}, période=${normalizedPeriod}:`, 
      productExact ? {
        id: productExact.campaign_product_id,
        name: productExact.product_name
      } : 'Non trouvé'
    );
    
    // Retourner le campaign_product_id qui sera utilisé dans l'URL de checkout
    return productExact?.campaign_product_id;
  }

  /**
   * Obtenir l'ID d'un produit de tokens
   * @param plan Nom du plan ou "pay-as-you-go" pour achat à la carte
   * @param tokenCount Nombre de tokens
   * @returns ID du produit ou undefined si non trouvé
   */
  public getTokenPackId(plan: string, tokenCount: number): string | undefined {
    if (!this.initialized) {
      console.warn('ProductManager: getTokenPackId appelé avant initialisation');
    }

    console.log('ProductManager: getTokenPackId appelé avec', { plan, tokenCount });
    console.log('ProductManager: Nombre de produits disponibles:', this.products.length);

    // Pour pay-as-you-go, utiliser "à la carte" comme valeur de recherche
    const subscriptionPlan = plan.toLowerCase() === 'pay-as-you-go' || plan.toLowerCase() === 'tokens' 
      ? 'à la carte' 
      : plan;
    
    console.log('ProductManager: Recherche de token pack avec le plan:', subscriptionPlan);

    // Afficher quelques produits pour le débogage
    console.log('ProductManager: Exemples de produits disponibles:', 
      this.products.slice(0, 5).map(p => ({ 
        id: p.campaign_product_id,
        name: p.product_name,
        plan: p.subscription_plan
      }))
    );
    
    // Rechercher le pack de tokens exact
    const product = this.products.find(p => {
      // Vérifier la correspondance du plan
      const planMatch = p.subscription_plan 
        ? p.subscription_plan.toLowerCase() === subscriptionPlan.toLowerCase() 
        : false;
      
      // Vérifier la correspondance du nombre de tokens
      const tokenMatch = p.product_name && p.product_name.includes(`${tokenCount} TOKEN PACK`);
      
      const match = planMatch && tokenMatch;
      
      if (match) {
        console.log('ProductManager: Produit de tokens correspondant trouvé:', {
          id: p.campaign_product_id,
          name: p.product_name,
          plan: p.subscription_plan
        });
      }
      
      return match;
    });

    // Si aucun produit exact n'est trouvé, afficher tous les tokens packs disponibles
    if (!product) {
      console.log('ProductManager: Recherche de tous les packs de tokens disponibles...');
      
      // Tous les token packs disponibles
      const allTokenPacks = this.products.filter(p => 
        p.product_name && p.product_name.includes('TOKEN PACK')
      );
      
      console.log('ProductManager: Nombre total de token packs trouvés:', allTokenPacks.length);
      
      // Packs de tokens pour ce plan spécifique
      const planTokenPacks = this.products.filter(p => 
        p.subscription_plan && 
        p.subscription_plan.toLowerCase() === subscriptionPlan.toLowerCase() &&
        p.product_name && 
        p.product_name.includes('TOKEN PACK')
      );
      
      console.log(`ProductManager: Nombre de token packs pour le plan "${subscriptionPlan}":`, planTokenPacks.length);
      
      if (planTokenPacks.length > 0) {
        console.log('ProductManager: Token packs disponibles pour ce plan:', 
          planTokenPacks.map(p => ({ 
            id: p.campaign_product_id,
            name: p.product_name,
            plan: p.subscription_plan,
            tokens: this.extractTokenCount(p.product_name)
          }))
        );
        
        // Si pas de correspondance exacte, trouver le pack le plus proche
        const closestPack = this.findClosestTokenPack(planTokenPacks, tokenCount);
        if (closestPack) {
          console.log('ProductManager: Utilisation du token pack le plus proche:', {
            id: closestPack.campaign_product_id,
            name: closestPack.product_name,
            plan: closestPack.subscription_plan,
            tokens: this.extractTokenCount(closestPack.product_name)
          });
          
          return closestPack.campaign_product_id;
        }
      }
    }
    
    console.log(`ProductManager: Résultat final de recherche de token pack:`, 
      product ? {
        id: product.campaign_product_id,
        name: product.product_name,
        plan: product.subscription_plan
      } : 'Non trouvé'
    );
    
    // Retourner le campaign_product_id qui sera utilisé dans l'URL de checkout
    return product?.campaign_product_id;
  }

  /**
   * Extraire le nombre de tokens à partir du nom du produit
   * @param productName Nom du produit (ex: "50 TOKEN PACK")
   * @returns Nombre de tokens ou 0 si non trouvé
   */
  private extractTokenCount(productName: string): number {
    if (!productName) return 0;
    
    const match = productName.match(/(\d+) TOKEN PACK/);
    return match ? parseInt(match[1]) : 0;
  }
  
  /**
   * Trouver le pack de tokens dont le nombre est le plus proche de la valeur cible
   * @param tokenPacks Liste des packs de tokens disponibles
   * @param targetCount Nombre de tokens cible
   * @returns Le produit le plus proche ou undefined si la liste est vide
   */
  private findClosestTokenPack(tokenPacks: any[], targetCount: number): any {
    if (!tokenPacks || tokenPacks.length === 0) return undefined;
    
    return tokenPacks.reduce((closest, current) => {
      const closestCount = this.extractTokenCount(closest.product_name);
      const currentCount = this.extractTokenCount(current.product_name);
      
      return Math.abs(currentCount - targetCount) < Math.abs(closestCount - targetCount) 
        ? current
        : closest;
    });
  }

  /**
   * Obtenir les détails complets d'un produit
   * @param plan Nom du plan
   * @param period Période de facturation
   * @returns Détails du produit ou undefined si non trouvé
   */
  public getProductDetails(plan: string, period: BillingPeriod): ProductDetails | undefined {
    if (!this.initialized) {
      console.warn('ProductManager: getProductDetails appelé avant initialisation');
    }

    console.log('ProductManager: getProductDetails appelé avec', { plan, period });

    // Prix de base par plan et période (en euros)
    const basePrices: Record<string, Record<string, number>> = {
      'lite': { monthly: 19.90, biweekly: 11.94, quarterly: 53.73, yearly: 191.04 },
      'basic': { monthly: 34.90, biweekly: 20.94, quarterly: 94.23, yearly: 335.04 },
      'advanced': { monthly: 49.90, biweekly: 29.94, quarterly: 134.73, yearly: 479.04 },
      'pro': { monthly: 69.90, biweekly: 41.94, quarterly: 188.73, yearly: 671.04 }
    };
    
    // Tokens inclus par plan et période
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
      'pay-as-you-go': 0.90,
      'tokens': 0.90
    };

    // Pour les achats à la carte (pay-as-you-go)
    if (plan.toLowerCase() === 'pay-as-you-go' || plan.toLowerCase() === 'tokens') {
      if (period === 'one-time') {
        console.log('ProductManager: Retourne les détails pour un achat à la carte');
        return {
          id: 'pay-as-you-go', // Sera remplacé plus tard par le vrai ID
          name: 'Pay As You Go',
          price: 0.90, // Prix par token
          nextBillingDate: '',
          includedTokens: 0,
          additionalTokenPrice: 0.90
        };
      }
    }

    // Récupérer l'ID du produit
    const subscriptionId = this.getSubscriptionId(plan, period);
    
    // Normaliser le plan et la période pour l'accès aux prix
    const planKey = plan.toLowerCase();
    let periodKey = period.toLowerCase();
    
    // Normaliser la période pour l'accès aux objets de prix
    if (periodKey === 'bi-weekly' || periodKey === 'biweekly') {
      periodKey = 'biweekly';
    } else if (periodKey === 'annualy' || periodKey === 'annual') {
      periodKey = 'yearly';
    }
    
    // Récupérer les valeurs spécifiques pour ce plan et cette période
    const basePrice = basePrices[planKey]?.[periodKey] || 0;
    const tokenCount = includedTokens[planKey]?.[periodKey] || 0;
    const tokenPrice = additionalTokenPrices[planKey] || 0.90;
    
    // Calculer la prochaine date de facturation
    const nextBillingDate = this.calculateNextBillingDate(period);
    
    const result = {
      id: subscriptionId || 'fallback-id', // Utiliser un ID de secours si aucun n'est trouvé
      name: `${plan.toUpperCase()} - ${period.toUpperCase()} SUBSCRIPTION`,
      price: basePrice,
      nextBillingDate,
      includedTokens: tokenCount,
      additionalTokenPrice: tokenPrice
    };
    
    console.log('ProductManager: Détails du produit retournés:', result);
    
    return result;
  }

  /**
   * Calculer la prochaine date de facturation
   * @param period Période de facturation
   * @returns Date formatée en string
   */
  public calculateNextBillingDate(period: BillingPeriod): string {
    const now = new Date();
    let nextDate = new Date(now);
    
    switch (period.toLowerCase()) {
      case 'bi-weekly':
        nextDate.setDate(now.getDate() + 14);
        break;
      case 'monthly':
        nextDate.setMonth(now.getMonth() + 1);
        break;
      case 'quarterly':
        nextDate.setMonth(now.getMonth() + 3);
        break;
      case 'annualy':
      case 'annual':
      case 'yearly':
        nextDate.setFullYear(now.getFullYear() + 1);
        break;
      case 'one-time':
        return ''; // Pas de prochaine facturation
      default:
        nextDate.setMonth(now.getMonth() + 1); // Par défaut mensuel
    }
    
    return nextDate.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  /**
   * Construire l'URL de checkout au format attendu par le système de paiement
   * @param products Objets contenant les IDs des produits (abonnement et/ou tokens)
   * @returns URL complète pour le checkout
   */
  public buildCheckoutUrl(products: CheckoutProducts): string {
    const baseUrl = process.env.NEXT_PUBLIC_CHECKOUT_URL || 'https://payment-securise.fitsageai.com/checkout/j2DKAM3IU5l3jkodDIIdhRjfShJqH9kpwRZyXkYM8XdwtsCKlMI5Sg5pBsg7Bjbr1tIzCfMmXfVzyaYEiFelfVdfqIl';
    
    // Construire le paramètre 'products' selon la syntaxe: campaignProductId:quantity
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

  /**
   * Normaliser une période pour la recherche dans le CSV
   * @param period Période à normaliser
   * @returns Période normalisée
   */
  private normalizePeriod(period: string): string {
    if (!period) return '';
    
    const periodLower = period.toLowerCase();
    
    if (periodLower === 'bi-weekly' || periodLower === 'biweekly') {
      return 'BI-WEEKLY'; // Format pour le CSV
    }
    
    if (periodLower === 'yearly' || periodLower === 'annualy' || periodLower === 'annual') {
      return 'ANNUALY'; // Format pour le CSV
    }
    
    return periodLower.toUpperCase();
  }
}

// Exporter l'instance singleton par défaut
export default ProductManager.getInstance(); 