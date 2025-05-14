/**
 * Classe utilitaire pour la gestion des produits et la génération des liens de checkout
 * 
 * Cette classe suit le pattern Singleton et fournit des méthodes pour:
 * - Charger les données de produits depuis l'API
 * - Trouver les identifiants de produits par plan et période
 * - Générer les détails d'un produit
 * - Construire les URLs de checkout
 */

import { ProductData, fallbackProductData, PLAN_NAME_MAPPING } from './checkout-products';

/**
 * Interface pour les informations détaillées d'un produit
 */
export interface ProductDetails {
  id: string;
  name: string;
  price: number;
  nextBillingDate: string;
  includedTokens: number;
  additionalTokenPrice: number;
}

/**
 * Interface pour les produits à inclure dans l'URL de checkout
 */
interface CheckoutProducts {
  subscriptionId?: string;
  tokenPackId?: string;
}

/**
 * Types pour les périodes de facturation
 */
export type BillingPeriod = 'biweekly' | 'monthly' | 'quarterly' | 'annual';

/**
 * Classe principale pour la gestion des produits et des liens de checkout
 */
export class ProductManager {
  private static instance: ProductManager;
  private productData: ProductData = fallbackProductData;
  private initialized = false;
  private baseUrl = process.env.NEXT_PUBLIC_CHECKOUT_URL || 'https://payment-securise.fitneuralcoach.com/checkout/QglbKwSAH5OXYuekrX9RmxtUvYS8lB7HpMqYHHfrrWbJ4KYuMxRIaREG5mEDeazTZhXkOtO8KRtoKZ4W5HZLxYsshhV';

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
      
      this.productData = await response.json();
      this.initialized = true;
      console.log('ProductManager: Données chargées avec succès');
    } catch (error) {
      console.error('ProductManager: Erreur lors de l\'initialisation:', error);
      console.warn('ProductManager: Utilisation des données de fallback');
      this.productData = fallbackProductData;
      this.initialized = true;
    }
  }

  /**
   * Obtenir l'ID d'un produit d'abonnement
   * @param plan Nom du plan (lite, basic, advanced, pro)
   * @param period Période de facturation (monthly, quarterly, bi-weekly, annual)
   * @returns ID du produit ou undefined si non trouvé
   */
  public getSubscriptionId(plan: string, period: BillingPeriod): string | undefined {
    if (!this.initialized) {
      console.warn('ProductManager: getSubscriptionId appelé avant initialisation');
    }

    // Vérifier qu'on a bien un plan et une période
    if (!plan || !period) {
      console.error('ProductManager: plan ou période manquante', { plan, period });
      return undefined;
    }

    // Normaliser le plan selon le mapping
    const normalizedPlan = this.normalizePlanName(plan);
    if (!normalizedPlan) {
      console.error('ProductManager: plan non reconnu', plan);
      return undefined;
    }

    // Normaliser la période pour la recherche
    const normalizedPeriod = this.normalizePeriod(period);
    
    console.log(`ProductManager: Recherche d'abonnement pour plan=${normalizedPlan}, période=${normalizedPeriod}`);
    
    // Vérifier la disponibilité du plan dans les données
    if (!this.productData.subscriptionProducts[normalizedPlan]) {
      console.error(`ProductManager: Plan non trouvé dans les données`, normalizedPlan);
      return undefined;
    }
    
    // Vérifier la disponibilité de la période pour ce plan
    if (!this.productData.subscriptionProducts[normalizedPlan][normalizedPeriod]) {
      console.error(`ProductManager: Période non trouvée pour ce plan`, { plan: normalizedPlan, period: normalizedPeriod });
      return undefined;
    }
    
    // Récupérer l'ID du produit
    const productId = this.productData.subscriptionProducts[normalizedPlan][normalizedPeriod];
    console.log(`ProductManager: ID produit trouvé pour ${normalizedPlan}/${normalizedPeriod}:`, productId);
    
    return productId?.toString();
  }

  /**
   * Obtenir l'ID d'un produit de tokens
   * @param plan Nom du plan ou "à la carte" pour pay-as-you-go
   * @param tokenCount Nombre de tokens
   * @returns ID du produit ou undefined si non trouvé
   */
  public getTokenPackId(plan: string, tokenCount: number): string | undefined {
    if (!this.initialized) {
      console.warn('ProductManager: getTokenPackId appelé avant initialisation');
    }

    // Vérifier qu'on a bien une quantité de tokens
    if (!tokenCount || tokenCount <= 0) {
      console.error('ProductManager: quantité de tokens invalide', tokenCount);
      return undefined;
    }

    let productId: number | undefined;

    // Pour les achats à la carte
    if (plan.toLowerCase() === 'pay-as-you-go' || plan.toLowerCase() === 'à la carte') {
      console.log(`ProductManager: Recherche de tokens à la carte, quantité=${tokenCount}`);
      productId = this.productData.tokenProducts[tokenCount];
      
      // Si la quantité exacte n'est pas disponible, trouver la plus proche
      if (!productId) {
        const availableAmounts = Object.keys(this.productData.tokenProducts).map(k => parseInt(k));
        if (availableAmounts.length > 0) {
          const closestAmount = availableAmounts.reduce((prev, curr) => {
            return (Math.abs(curr - tokenCount) < Math.abs(prev - tokenCount)) ? curr : prev;
          });
          productId = this.productData.tokenProducts[closestAmount];
          console.log(`ProductManager: Quantité exacte non trouvée, utilisation de la plus proche: ${closestAmount}`);
        }
      }
    } 
    // Pour les tokens supplémentaires d'un plan
    else {
      // Normaliser le plan selon le mapping
      const normalizedPlan = this.normalizePlanName(plan);
      if (!normalizedPlan) {
        console.error('ProductManager: plan non reconnu pour tokens supplémentaires', plan);
        return undefined;
      }
      
      console.log(`ProductManager: Recherche de tokens supplémentaires pour plan=${normalizedPlan}, quantité=${tokenCount}`);
      
      // Vérifier la disponibilité du plan dans les données
      if (!this.productData.subscriptionTokenProducts[normalizedPlan]) {
        console.error(`ProductManager: Plan non trouvé dans les données de tokens`, normalizedPlan);
        return undefined;
      }
      
      productId = this.productData.subscriptionTokenProducts[normalizedPlan][tokenCount];
      
      // Si la quantité exacte n'est pas disponible, trouver la plus proche
      if (!productId) {
        const availableAmounts = Object.keys(this.productData.subscriptionTokenProducts[normalizedPlan]).map(k => parseInt(k));
        if (availableAmounts.length > 0) {
          const closestAmount = availableAmounts.reduce((prev, curr) => {
            return (Math.abs(curr - tokenCount) < Math.abs(prev - tokenCount)) ? curr : prev;
          });
          productId = this.productData.subscriptionTokenProducts[normalizedPlan][closestAmount];
          console.log(`ProductManager: Quantité exacte non trouvée, utilisation de la plus proche: ${closestAmount}`);
        }
      }
    }
    
    console.log(`ProductManager: ID produit de tokens trouvé:`, productId);
    return productId?.toString();
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

    // Normaliser le plan et la période
    const normalizedPlan = this.normalizePlanName(plan);
    if (!normalizedPlan) return undefined;
    
    const normalizedPeriod = this.normalizePeriod(period);
    
    // Récupérer l'ID du produit
    const subscriptionId = this.getSubscriptionId(normalizedPlan, period);
    if (!subscriptionId) return undefined;
    
    // Prix de base par plan et période (en euros)
    const basePrices: Record<string, Record<string, number>> = {
      'lite': { monthly: 19.90, biweekly: 11.94, quarterly: 53.73, annual: 191.04 },
      'basic': { monthly: 34.90, biweekly: 20.94, quarterly: 94.23, annual: 335.04 },
      'advanced': { monthly: 49.90, biweekly: 29.94, quarterly: 134.73, annual: 479.04 },
      'pro': { monthly: 69.90, biweekly: 41.94, quarterly: 188.73, annual: 671.04 }
    };
    
    // Tokens inclus par plan et période
    const includedTokens: Record<string, Record<string, number>> = {
      'lite': { monthly: 45, biweekly: 27, quarterly: 121, annual: 432 },
      'basic': { monthly: 100, biweekly: 60, quarterly: 270, annual: 960 },
      'advanced': { monthly: 180, biweekly: 108, quarterly: 486, annual: 1728 },
      'pro': { monthly: 300, biweekly: 180, quarterly: 810, annual: 2880 }
    };
    
    // Prix des tokens supplémentaires par plan
    const additionalTokenPrices: Record<string, number> = {
      'lite': 0.75,
      'basic': 0.60,
      'advanced': 0.45,
      'pro': 0.35,
      'à la carte': 0.90
    };
    
    // Récupérer les valeurs spécifiques pour ce plan et cette période
    const basePrice = basePrices[normalizedPlan]?.[normalizedPeriod] || 0;
    const tokensIncluded = includedTokens[normalizedPlan]?.[normalizedPeriod] || 0;
    const tokenPrice = additionalTokenPrices[normalizedPlan] || 0;
    
    // Calculer la prochaine date de facturation
    const nextBillingDate = this.calculateNextBillingDate(period);
    
    console.log(`ProductManager: Détails produit générés pour ${normalizedPlan}/${normalizedPeriod}:`, {
      id: subscriptionId,
      price: basePrice,
      tokens: tokensIncluded,
      tokenPrice: tokenPrice
    });
    
    return {
      id: subscriptionId,
      name: `${normalizedPlan} - ${this.getPeriodDisplayName(period)}`,
      price: basePrice,
      nextBillingDate,
      includedTokens: tokensIncluded,
      additionalTokenPrice: tokenPrice
    };
  }

  /**
   * Construire une URL de checkout
   * @param products Produits à inclure dans l'URL
   * @returns URL de checkout complète
   */
  public buildCheckoutUrl(products: CheckoutProducts): string {
    // Construire le paramètre 'products' selon la syntaxe requise: campaignProductId:quantity
    const productParams: string[] = [];
    
    // Ajouter l'abonnement s'il existe (avec quantité 1)
    if (products.subscriptionId) {
      productParams.push(`${products.subscriptionId}:1`);
    }
    
    // Ajouter le pack de tokens s'il existe (avec quantité 1)
    if (products.tokenPackId) {
      productParams.push(`${products.tokenPackId}:1`);
    }
    
    // Construire l'URL manuellement pour éviter l'encodage des caractères spéciaux
    // (important: les : et ; ne doivent pas être encodés en %3A et %3B)
    if (productParams.length > 0) {
      const url = `${this.baseUrl}?products=${productParams.join(';')}`;
      console.log(`ProductManager: URL de checkout générée:`, url);
      return url;
    } else {
      console.error('ProductManager: Aucun produit spécifié pour l\'URL de checkout');
      return this.baseUrl;
    }
  }

  /**
   * Normaliser un nom de plan pour correspondre aux standards
   * @param plan Nom du plan (peut être en français ou anglais, avec variantes)
   * @returns Nom du plan normalisé ou undefined si non reconnu
   */
  private normalizePlanName(plan: string): string | undefined {
    if (!plan) return undefined;
    
    const planLower = plan.toLowerCase();
    
    // Mapping direct des noms de plans standardisés
    const planMapping: {[key: string]: string} = {
      // Noms standards (en anglais)
      'lite': 'lite',
      'basic': 'basic',
      'advanced': 'advanced',
      'pro': 'pro',
      
      // Variantes françaises
      'débutant': 'lite',
      'intermédiaire': 'basic',
      'avancé': 'advanced',
      'avance': 'advanced',
      'coach pro': 'pro',
      
      // Autres variantes possibles
      'starter': 'lite',
      'beginner': 'lite',
      'intermediate': 'basic',
      'professional': 'pro'
    };
    
    // Vérifier si le plan est directement dans le mapping
    if (planMapping[planLower]) {
      return planMapping[planLower];
    }
    
    // Recherche partielle pour les noms composés ou avec variations
    for (const [key, value] of Object.entries(planMapping)) {
      if (planLower.includes(key)) {
        return value;
      }
    }
    
    // Si c'est un plan à la carte
    if (planLower === 'à la carte' || planLower === 'a la carte' || planLower === 'pay-as-you-go') {
      return 'à la carte';
    }
    
    // Si on arrive ici, aucune correspondance n'a été trouvée
    console.warn(`ProductManager: Nom de plan non reconnu: ${plan}`);
    return undefined;
  }

  /**
   * Normaliser une période pour correspondre au format attendu dans les données
   * @param period Période (peut avoir différentes écritures)
   * @returns Période normalisée
   */
  private normalizePeriod(period: BillingPeriod): string {
    if (!period) return 'monthly';
    
    const periodLower = period.toLowerCase();
    
    if (periodLower === 'bi-weekly' || periodLower === 'biweekly') {
      return 'biweekly'; // Pour l'accès aux prix
    }
    
    if (periodLower === 'yearly' || periodLower === 'annualy' || periodLower === 'annual') {
      return 'annual'; // Pour l'accès aux prix
    }
    
    return periodLower;
  }

  /**
   * Obtenir le nom d'affichage d'une période
   * @param period Période
   * @returns Nom d'affichage de la période
   */
  private getPeriodDisplayName(period: BillingPeriod): string {
    switch (period.toLowerCase()) {
      case 'biweekly':
      case 'bi-weekly':
        return 'Bi-hebdomadaire';
      case 'monthly':
        return 'Mensuel';
      case 'quarterly':
        return 'Trimestriel';
      case 'annual':
      case 'annualy':
      case 'yearly':
        return 'Annuel';
      default:
        return period;
    }
  }

  /**
   * Calculer la prochaine date de facturation
   * @param period Période de facturation
   * @returns Date formatée en français
   */
  private calculateNextBillingDate(period: BillingPeriod): string {
    const now = new Date();
    let nextDate = new Date(now);
    
    switch (period.toLowerCase()) {
      case 'biweekly':
      case 'bi-weekly':
        nextDate.setDate(now.getDate() + 14);
        break;
      case 'monthly':
        nextDate.setMonth(now.getMonth() + 1);
        break;
      case 'quarterly':
        nextDate.setMonth(now.getMonth() + 3);
        break;
      case 'annual':
      case 'annualy':
      case 'yearly':
        nextDate.setFullYear(now.getFullYear() + 1);
        break;
    }
    
    return nextDate.toLocaleDateString('fr-FR');
  }
}