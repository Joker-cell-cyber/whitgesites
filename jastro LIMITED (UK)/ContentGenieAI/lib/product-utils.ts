// Classe utilitaire pour gérer les données de produits et les prix
// Cette classe implémente le pattern singleton pour assurer une instance unique

export interface ProductDetails {
  id: string;               // ID du produit pour le checkout
  name: string;             // Nom du produit
  price: number;            // Prix de base
  nextBillingDate: string;  // Date de prochaine facturation
  includedTokens: number;   // Nombre de tokens inclus
  additionalTokenPrice: number; // Prix par token supplémentaire
}

interface Product {
  campaign_product_id: string;
  product_name: string;
  subscription_plan: string;
}

interface CheckoutProducts {
  subscriptionId?: string;
  tokenPackId?: string;
}

export class ProductManager {
  private static instance: ProductManager;
  private products: Product[] = [];
  private initialized = false;

  // Prix de base par plan et période
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

  private constructor() {
    // Constructeur privé pour empêcher l'instanciation directe
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
        throw new Error(`Erreur lors du chargement des produits: ${response.status}`);
      }
      
      const data = await response.json();
      this.products = data.products;
      this.initialized = true;
    } catch (error) {
      console.error('Erreur lors de l\'initialisation du ProductManager:', error);
      throw error;
    }
  }

  // Normalise la période pour la recherche dans le CSV
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

  // Récupère l'ID d'un abonnement à partir du plan et de la période
  public getSubscriptionId(plan: string, period: string): string | undefined {
    // Normaliser la période
    const normalizedPeriod = this.normalizePeriod(period);
    
    // Normaliser le plan - assurer qu'il correspond aux valeurs du CSV (lite, basic, advanced, pro)
    let planForSearch = plan.toLowerCase();
    
    // Rechercher dans les produits chargés depuis l'API (données du CSV)
    const productExact = this.products.find(p => {
      // Vérifier la correspondance du plan
      const planMatch = p.subscription_plan.toLowerCase() === planForSearch;
      
      // Vérifier la correspondance de la période dans le nom du produit
      let nameMatch = false;
      if (p.product_name.toUpperCase().includes(normalizedPeriod.toUpperCase())) {
        nameMatch = true;
      }
      
      return planMatch && nameMatch;
    });
    
    // Si on ne trouve pas de correspondance exacte, chercher avec moins de critères
    if (!productExact) {
      console.warn(`Aucun produit exact trouvé pour plan=${planForSearch} et période=${normalizedPeriod}, recherche plus large...`);
      // Recherche avec uniquement le nom du plan
      const productByPlan = this.products.find(p => 
        p.subscription_plan.toLowerCase() === planForSearch &&
        p.product_name.toUpperCase().includes('SUBSCRIPTION')
      );
      if (productByPlan) {
        console.info(`Produit trouvé par plan: ${productByPlan.product_name}`);
        return productByPlan.campaign_product_id;
      }
    }
    
    // Retourner le campaign_product_id qui sera utilisé dans l'URL de checkout
    return productExact?.campaign_product_id;
  }

  // Récupère l'ID d'un pack de tokens à partir du plan et du nombre de tokens
  public getTokenPackId(plan: string, tokenCount: number): string | undefined {
    // Pour pay-as-you-go, utiliser "à la carte" comme valeur de recherche
    const subscriptionPlan = plan.toLowerCase() === 'pay-as-you-go' ? 'à la carte' : plan.toLowerCase();
    
    console.log(`Recherche de token pack: plan=${subscriptionPlan}, tokens=${tokenCount}`);
    
    const product = this.products.find(p => {
      // Vérifier la correspondance du plan
      const planMatch = p.subscription_plan.toLowerCase() === subscriptionPlan;
      
      // Vérifier la correspondance du nombre de tokens
      const tokenMatch = p.product_name.includes(`${tokenCount} TOKEN PACK`);
      
      return planMatch && tokenMatch;
    });
    
    // Si on ne trouve pas de correspondance exacte, chercher le token pack le plus proche
    if (!product) {
      console.warn(`Aucun token pack exact trouvé pour plan=${subscriptionPlan} et tokens=${tokenCount}, recherche plus large...`);
      
      // Afficher les token packs disponibles pour ce plan
      const availableTokenPacks = this.products.filter(p => 
        p.subscription_plan.toLowerCase() === subscriptionPlan && 
        p.product_name.includes('TOKEN PACK')
      );
      
      if (availableTokenPacks.length > 0) {
        console.info(`Token packs disponibles pour ${subscriptionPlan}:`, 
          availableTokenPacks.map(p => p.product_name).join(', ')
        );
        
        // Trouver le token pack le plus proche
        const closestPack = availableTokenPacks.reduce((closest, current) => {
          const currentTokens = parseInt(current.product_name.match(/\d+/)?.[0] || '0');
          const closestTokens = parseInt(closest.product_name.match(/\d+/)?.[0] || '0');
          
          return Math.abs(currentTokens - tokenCount) < Math.abs(closestTokens - tokenCount) 
            ? current 
            : closest;
        });
        
        console.info(`Token pack le plus proche: ${closestPack.product_name}`);
        return closestPack.campaign_product_id;
      }
    }
    
    // Retourner le campaign_product_id qui sera utilisé dans l'URL de checkout
    return product?.campaign_product_id;
  }

  // Calcule la prochaine date de facturation en fonction de la période
  public calculateNextBillingDate(period: string): string {
    const today = new Date();
    const nextDate = new Date(today);
    
    switch(period.toLowerCase()) {
      case 'bi-weekly':
      case 'biweekly':
        nextDate.setDate(today.getDate() + 14); // +2 semaines
        break;
      case 'monthly':
        nextDate.setMonth(today.getMonth() + 1); // +1 mois
        break;
      case 'quarterly':
        nextDate.setMonth(today.getMonth() + 3); // +3 mois
        break;
      case 'yearly':
      case 'annualy':
        nextDate.setFullYear(today.getFullYear() + 1); // +1 an
        break;
    }
    
    // Formater la date au format français
    return nextDate.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  // Récupère tous les détails d'un produit
  public getProductDetails(plan: string, period: string): ProductDetails | null {
    if (!this.initialized) {
      throw new Error('ProductManager n\'est pas initialisé');
    }

    try {
      // Récupérer l'ID du produit
      const id = this.getSubscriptionId(plan, period);
      if (!id) {
        throw new Error(`Produit non trouvé pour le plan ${plan} et la période ${period}`);
      }

      // Normaliser la période pour l'accès aux prix
      let periodKey = period.toLowerCase();
      if (periodKey === 'bi-weekly' || periodKey === 'biweekly') {
        periodKey = 'biweekly';
      }
      if (periodKey === 'yearly' || periodKey === 'annualy') {
        periodKey = 'yearly';
      }

      // Récupérer le prix de base
      const planPrice = this.basePrices[plan.toLowerCase()]?.[periodKey] || 0;
      
      // Récupérer le nombre de tokens inclus
      const includedTokenCount = this.includedTokens[plan.toLowerCase()]?.[periodKey] || 0;
      
      // Récupérer le prix par token supplémentaire
      const additionalTokenPrice = this.additionalTokenPrices[plan.toLowerCase()] || 0;
      
      // Récupérer le nom du produit
      const product = this.products.find(p => p.campaign_product_id === id);
      const name = product?.product_name || `${plan.toUpperCase()} - ${period.toUpperCase()} SUBSCRIPTION`;
      
      // Calculer la prochaine date de facturation
      const nextBillingDate = this.calculateNextBillingDate(period);
      
      return {
        id,
        name,
        price: planPrice,
        nextBillingDate,
        includedTokens: includedTokenCount,
        additionalTokenPrice
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des détails du produit:', error);
      return null;
    }
  }

  // Construit l'URL de checkout au format CheckoutChamp
  public buildCheckoutUrl(products: CheckoutProducts): string {
    const baseUrl = process.env.NEXT_PUBLIC_CHECKOUT_URL || 'https://payment-securise.contentgenie-ai.com/checkout/ehKzEITiEWRYJufpc3RH41jdsFu3fevFaUh6iy0c5k4gjsaVudF9ZfSVEVrW8fQ8qkZ92OVakVvRxo5shZLZ7MTpFZW';
    
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