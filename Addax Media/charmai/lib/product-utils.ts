/**
 * product-utils.ts
 * 
 * Ce module contient la classe ProductManager qui gère la logique de recherche 
 * de produits et de calcul des prix pour le système de checkout.
 */

import { ProductData } from './checkout-products';

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
  private initialized: boolean = false;
  private products: Array<Record<string, string>> = [];
  
  // Types explicites pour éviter les erreurs d'indexation avec des clés dynamiques
  private basePrices: Record<string, Record<string, number>> = {
    'lite': { monthly: 19.90, biweekly: 11.94, quarterly: 53.73, yearly: 191.04 },
    'basic': { monthly: 34.90, biweekly: 20.94, quarterly: 94.23, yearly: 335.04 },
    'advanced': { monthly: 49.90, biweekly: 29.94, quarterly: 134.73, yearly: 479.04 },
    'pro': { monthly: 69.90, biweekly: 41.94, quarterly: 188.73, yearly: 671.04 }
  };
  
  private includedTokens: Record<string, Record<string, number>> = {
    'lite': { monthly: 45, biweekly: 27, quarterly: 121, yearly: 432 },
    'basic': { monthly: 100, biweekly: 60, quarterly: 270, yearly: 960 },
    'advanced': { monthly: 180, biweekly: 108, quarterly: 486, yearly: 1728 },
    'pro': { monthly: 300, biweekly: 180, quarterly: 810, yearly: 2880 }
  };
  
  private additionalTokenPrices: Record<string, number> = {
    'lite': 0.75,
    'basic': 0.60,
    'advanced': 0.45,
    'pro': 0.35,
    'pay-as-you-go': 0.90
  };

  private constructor() {}

  /**
   * Récupère l'instance singleton de ProductManager
   */
  public static getInstance(): ProductManager {
    if (!ProductManager.instance) {
      ProductManager.instance = new ProductManager();
    }
    return ProductManager.instance;
  }

  /**
   * Initialise le gestionnaire de produits en chargeant les données
   * depuis l'API
   */
  public async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    try {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des produits');
      }
      
      const data: ProductData = await response.json();
      
      // Convertir les données au format attendu par les méthodes
      const csvProducts: Array<Record<string, string>> = [];
      
      // Traiter les produits d'abonnement
      Object.entries(data.subscriptionProducts).forEach(([planName, periods]) => {
        Object.entries(periods).forEach(([period, id]) => {
          let periodUpper = period.toUpperCase();
          if (period === 'annual') periodUpper = 'ANNUALY';
          if (period === 'biweekly') periodUpper = 'BI-WEEKLY';
          
          // Convertir les noms de plans français en noms anglais
          let csvPlanName = planName.toUpperCase();
          if (planName === 'Débutant' || planName === 'Lite') csvPlanName = 'LITE';
          if (planName === 'Intermédiaire' || planName === 'Basic') csvPlanName = 'BASIC';
          if (planName === 'Avancé' || planName === 'Advanced') csvPlanName = 'ADVANCED';
          if (planName === 'Coach Pro' || planName === 'Pro') csvPlanName = 'PRO';
          
          csvProducts.push({
            campaign_product_id: id.toString(),
            product_name: `${csvPlanName} - ${periodUpper} SUBSCRIPTION`,
            subscription_plan: csvPlanName
          });
        });
      });
      
      // Traiter les produits de tokens
      Object.entries(data.tokenProducts).forEach(([amount, id]) => {
        csvProducts.push({
          campaign_product_id: id.toString(),
          product_name: `${amount} TOKEN PACK`,
          subscription_plan: 'à la carte'
        });
      });
      
      // Traiter les produits de tokens par plan
      Object.entries(data.subscriptionTokenProducts).forEach(([planName, tokens]) => {
        // Convertir les noms de plans français en noms anglais pour les tokens
        let csvPlanName = planName.toLowerCase();
        if (planName === 'Débutant' || planName === 'Lite') csvPlanName = 'lite';
        if (planName === 'Intermédiaire' || planName === 'Basic') csvPlanName = 'basic';
        if (planName === 'Avancé' || planName === 'Advanced') csvPlanName = 'advanced';
        if (planName === 'Coach Pro' || planName === 'Pro') csvPlanName = 'pro';
        
        Object.entries(tokens).forEach(([amount, id]) => {
          csvProducts.push({
            campaign_product_id: id.toString(),
            product_name: `${amount} TOKEN PACK`,
            subscription_plan: csvPlanName
          });
        });
      });
      
      console.log('Produits chargés après transformation:', csvProducts);
      
      this.products = csvProducts;
      this.initialized = true;
    } catch (error) {
      console.error('Erreur lors de l\'initialisation de ProductManager:', error);
      throw error;
    }
  }

  /**
   * Normalise la période pour la recherche CSV
   * @param period La période (bi-weekly, monthly, quarterly, annualy, etc.)
   * @returns La période normalisée pour la recherche CSV
   */
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

  /**
   * Récupère l'ID d'un produit d'abonnement
   * @param plan Le plan (lite, basic, advanced, pro)
   * @param period La période (monthly, quarterly, bi-weekly, annualy)
   * @returns L'ID du produit d'abonnement ou undefined si non trouvé
   */
  public getSubscriptionId(plan: string, period: string): string | undefined {
    // Normaliser la période
    const normalizedPeriod = this.normalizePeriod(period);
    
    // Normaliser le plan
    let planNormalized = plan.toUpperCase();
    // Convertir les noms alternatifs de plans en leur équivalent standard
    if (planNormalized === 'DÉBUTANT' || planNormalized === 'STARTER') planNormalized = 'LITE';
    if (planNormalized === 'INTERMÉDIAIRE' || planNormalized === 'INTERMEDIATE') planNormalized = 'BASIC';
    if (planNormalized === 'AVANCÉ') planNormalized = 'ADVANCED';
    if (planNormalized === 'COACH PRO' || planNormalized === 'ENTERPRISE') planNormalized = 'PRO';
    
    console.log('Recherche de produit:', { plan, planNormalized, period, normalizedPeriod });
    console.log('Nombre de produits chargés:', this.products.length);
    
    // Logs pour déboguer l'état des produits
    console.log('Plans disponibles:',
      this.products
        .filter(p => !p.product_name.includes('TOKEN'))
        .map(p => ({
          name: p.product_name,
          plan: p.subscription_plan,
          id: p.campaign_product_id
        }))
    );
    
    // Rechercher dans les produits chargés depuis l'API (données du CSV)
    const productExact = this.products.find(p => {
      // Vérifier la correspondance du plan
      const planMatch = p.subscription_plan?.toUpperCase() === planNormalized;
      
      // Vérifier la correspondance de la période dans le nom du produit
      let nameMatch = false;
      
      if (p.product_name.toUpperCase().includes(normalizedPeriod.toUpperCase())) {
        nameMatch = true;
      }
      
      // Log pour chaque produit vérifié
      console.log(`Vérification du produit: ${p.product_name}, Plan: ${p.subscription_plan}`,
        { planMatch, nameMatch, nom: p.product_name.toUpperCase(), periode: normalizedPeriod.toUpperCase() });
      
      return planMatch && nameMatch;
    });
    
    if (!productExact) {
      console.error('Produit non trouvé!', { plan, planNormalized, period, normalizedPeriod });
      
      // Si nous n'avons pas trouvé le produit, essayons de le rechercher en utilisant seulement le nom du produit
      console.log('Tentative de recherche par nom de produit uniquement...');
      
      const productByName = this.products.find(p => 
        p.product_name.toUpperCase().includes(planNormalized) && 
        p.product_name.toUpperCase().includes(normalizedPeriod.toUpperCase())
      );
      
      if (productByName) {
        console.log('Produit trouvé par nom:', productByName);
        return productByName.campaign_product_id;
      }
      
      return undefined;
    }
    
    console.log('Produit trouvé:', productExact);
    
    // Retourner le campaign_product_id qui sera utilisé dans l'URL de checkout
    return productExact.campaign_product_id;
  }

  /**
   * Récupère l'ID d'un pack de tokens
   * @param plan Le plan (lite, basic, advanced, pro, pay-as-you-go)
   * @param tokenCount Le nombre de tokens
   * @returns L'ID du pack de tokens ou undefined si non trouvé
   */
  public getTokenPackId(plan: string, tokenCount: number): string | undefined {
    // Normaliser le plan
    let planNormalized = plan.toLowerCase();
    
    // Convertir les noms alternatifs de plans en leur équivalent standard
    if (planNormalized === 'pay-as-you-go' || planNormalized === 'à la carte') {
      planNormalized = 'à la carte';
    } else if (planNormalized === 'débutant' || planNormalized === 'starter') {
      planNormalized = 'lite';
    } else if (planNormalized === 'intermédiaire' || planNormalized === 'intermediate') {
      planNormalized = 'basic';
    } else if (planNormalized === 'avancé') {
      planNormalized = 'advanced';
    } else if (planNormalized === 'coach pro' || planNormalized === 'enterprise') {
      planNormalized = 'pro';
    }
    
    console.log(`Recherche de token pack:`, { 
      planOriginal: plan, 
      planNormalized, 
      tokenCount, 
      nbProduits: this.products.length 
    });
    
    // Recherche exacte pour les tokens pro spécifiques
    if (planNormalized === 'pro') {
      const exactMatch = this.products.find(p => 
        p.subscription_plan?.toLowerCase() === 'pro' && 
        p.product_name === `${tokenCount} TOKEN PACK`
      );
      
      if (exactMatch) {
        console.log('Token pack PRO trouvé exactement:', exactMatch);
        return exactMatch.campaign_product_id;
      }
    }
    
    // Vérifier d'abord avec le plan normalisé
    const product = this.products.find(p => {
      const planMatch = p.subscription_plan?.toLowerCase() === planNormalized;
      const tokenMatch = p.product_name.includes(`${tokenCount} TOKEN PACK`);
      
      console.log(`Vérification token pack:`, { 
        nom: p.product_name, 
        plan: p.subscription_plan, 
        planMatch, 
        tokenMatch 
      });
      
      return planMatch && tokenMatch;
    });
    
    if (product) {
      console.log('Token pack trouvé:', product);
      return product.campaign_product_id;
    }
    
    // Si on n'a pas trouvé, essayer avec une recherche moins stricte
    console.log('Tentative de recherche alternative pour token pack...');
    
    const alternativeProduct = this.products.find(p => {
      // Recherche moins stricte: vérifier si le nom du produit contient le nombre de tokens
      const tokenMatch = p.product_name.includes(`${tokenCount} TOKEN PACK`);
      
      // Pour pay-as-you-go, permettre aussi "à la carte"
      let planMatch = false;
      if (planNormalized === 'à la carte') {
        planMatch = !p.subscription_plan || p.subscription_plan.toLowerCase() === 'à la carte';
      } else {
        planMatch = p.product_name.toLowerCase().includes(planNormalized);
      }
      
      return tokenMatch && planMatch;
    });
    
    if (alternativeProduct) {
      console.log('Token pack trouvé par méthode alternative:', alternativeProduct);
      return alternativeProduct.campaign_product_id;
    }
    
    console.error('Token pack non trouvé:', { plan, planNormalized, tokenCount });
    return undefined;
  }

  /**
   * Récupère les détails d'un produit d'abonnement
   * @param plan Le plan (lite, basic, advanced, pro)
   * @param period La période (monthly, quarterly, bi-weekly, annualy, one-time)
   * @param tokenCount Le nombre de tokens (pour les achats à la carte)
   * @returns Les détails du produit
   */
  public getProductDetails(plan: string, period: string, tokenCount?: number): ProductDetails {
    const planLower = plan.toLowerCase();
    const periodLower = period.toLowerCase();
    const isOneTime = periodLower === 'one-time';
    
    // Normaliser le plan pour la recherche
    let planNormalized = planLower;
    if (planLower === 'débutant' || planLower === 'starter') planNormalized = 'lite';
    if (planLower === 'intermédiaire' || planLower === 'intermediate') planNormalized = 'basic';
    if (planLower === 'avancé') planNormalized = 'advanced';
    if (planLower === 'coach pro' || planLower === 'enterprise') planNormalized = 'pro';
    
    console.log(`getProductDetails: plan=${planLower}, planNormalized=${planNormalized}, period=${periodLower}, isOneTime=${isOneTime}`);
    
    // Obtenir l'ID du produit depuis le CSV
    let productId: string | undefined;
    
    try {
      if (isOneTime) {
        // Pour les achats one-time, si le plan est pro, on utilise directement ce plan
        // au lieu du 'pay-as-you-go' pour obtenir des tokens à 0.35€ (au lieu de 0.90€)
        const tokenPlan = planNormalized === 'pro' ? 'pro' : 'pay-as-you-go';
        productId = this.getTokenPackId(tokenPlan, tokenCount || 10);
      } else {
        productId = this.getSubscriptionId(planNormalized, periodLower);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du produit:', error);
      // Ne pas lancer d'erreur, on va utiliser les données par défaut
    }
    
    console.log(`ID produit trouvé: ${productId || 'non trouvé'}`);
    
    // Données par défaut
    let price = 0;
    let includedTokens = 0;
    let additionalTokenPrice = this.additionalTokenPrices[planNormalized] || 0.75;
    let name = '';
    
    if (isOneTime) {
      // Achat de tokens à la carte
      name = `${tokenCount} TOKEN PACK`;
      
      // Si on achète des tokens pro, on utilise le prix pro (0.35€)
      // Sinon on utilise le prix standard (0.90€)
      const tokenPrice = planNormalized === 'pro' 
        ? this.additionalTokenPrices['pro'] 
        : this.additionalTokenPrices['pay-as-you-go'];
      
      price = (tokenCount || 10) * tokenPrice;
      includedTokens = tokenCount || 10;
    } else {
      // Abonnement
      // Normaliser la période pour l'accès aux objets de prix
      let periodKey = periodLower;
      if (periodKey === 'bi-weekly' || periodKey === 'biweekly') {
        periodKey = 'biweekly';
      }
      if (periodKey === 'annualy' || periodKey === 'yearly') {
        periodKey = 'yearly';
      }
      
      // Vérifier si le plan et la période existent dans basePrices
      if (this.basePrices[planNormalized] && this.basePrices[planNormalized][periodKey]) {
        price = this.basePrices[planNormalized][periodKey];
      } else {
        console.warn(`Prix par défaut non trouvé pour ${planNormalized}/${periodKey}, utilisation de valeurs par défaut`);
        
        // Utiliser des prix par défaut selon le plan
        const defaultPrices = {
          'lite': 19.90,
          'basic': 34.90,
          'advanced': 49.90,
          'pro': 69.90
        };
        
        price = defaultPrices[planNormalized as keyof typeof defaultPrices] || 19.90;
        
        // Ajuster selon la période
        if (periodKey === 'biweekly') price = price * 0.6;
        if (periodKey === 'quarterly') price = price * 3 * 0.9;
        if (periodKey === 'yearly') price = price * 12 * 0.8;
      }
      
      // Vérifier si le plan et la période existent dans includedTokens
      if (this.includedTokens[planNormalized] && this.includedTokens[planNormalized][periodKey]) {
        includedTokens = this.includedTokens[planNormalized][periodKey];
      } else {
        console.warn(`Tokens inclus non trouvés pour ${planNormalized}/${periodKey}, utilisation de valeurs par défaut`);
        
        // Utiliser des valeurs par défaut pour les tokens inclus
        const defaultTokens = {
          'lite': 45,
          'basic': 100,
          'advanced': 180,
          'pro': 300
        };
        
        includedTokens = defaultTokens[planNormalized as keyof typeof defaultTokens] || 45;
        
        // Ajuster selon la période
        if (periodKey === 'biweekly') includedTokens = Math.floor(includedTokens * 0.6);
        if (periodKey === 'quarterly') includedTokens = Math.floor(includedTokens * 3 * 0.9);
        if (periodKey === 'yearly') includedTokens = Math.floor(includedTokens * 12 * 0.8);
      }
      
      name = `${planNormalized.toUpperCase()} - ${periodLower.toUpperCase()} SUBSCRIPTION`;
    }
    
    // Calculer la prochaine date de facturation (si applicable)
    const nextBillingDate = isOneTime ? '' : this.calculateNextBillingDate(periodLower);
    
    console.log(`Détails du produit:`, {
      id: productId || '',
      name,
      price,
      nextBillingDate,
      includedTokens,
      additionalTokenPrice
    });
    
    return {
      id: productId || '',
      name,
      price,
      nextBillingDate,
      includedTokens,
      additionalTokenPrice
    };
  }

  /**
   * Calcule la prochaine date de facturation
   * @param period La période de facturation
   * @returns La date de prochaine facturation au format local
   */
  private calculateNextBillingDate(period: string): string {
    const today = new Date();
    const nextDate = new Date(today);
    
    switch (period) {
      case 'bi-weekly':
      case 'biweekly':
        nextDate.setDate(today.getDate() + 14);
        break;
      case 'monthly':
        nextDate.setMonth(today.getMonth() + 1);
        break;
      case 'quarterly':
        nextDate.setMonth(today.getMonth() + 3);
        break;
      case 'annualy':
      case 'yearly':
        nextDate.setFullYear(today.getFullYear() + 1);
        break;
    }
    
    return nextDate.toLocaleDateString('fr-FR');
  }

  /**
   * Construit l'URL de checkout au format attendu par le système de paiement
   * @param products Les produits à inclure dans l'URL
   * @returns L'URL de checkout complète
   */
  public buildCheckoutUrl(products: CheckoutProducts): string {
    const baseUrl = process.env.NEXT_PUBLIC_CHECKOUT_URL || 'https://payment-securise.charmaiapp.com/checkout/99UZQ1X79PivG0Me5pzm5XSs8cYMlh4xt3iWYty8jECD5icVD4vbE0bqE8aHg4klbwvx23RafrpBFK71mZ9DiwlIvkt';
    
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