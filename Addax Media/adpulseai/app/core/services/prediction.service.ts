/**
 * Service de prédiction pour les analyses prédictives
 */

import { AdvertisingData } from '../types/analytics-types';
import { 
  PredictionOptions, 
  PredictionResult, 
  PredictionMetric,
  SeasonalityModel
} from '../types/prediction-types';
import { SeasonalityService } from './seasonality.service';
import { v4 as uuidv4 } from 'uuid';

export class PredictionService {
  private seasonalityService: SeasonalityService;
  
  constructor() {
    this.seasonalityService = new SeasonalityService();
  }
  
  /**
   * Génère des prédictions basées sur les données historiques et les options spécifiées
   */
  public async generatePredictions(
    data: AdvertisingData[],
    options: PredictionOptions
  ): Promise<PredictionResult[]> {
    // Validation des données
    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new Error('Données publicitaires invalides ou manquantes pour la prédiction');
    }

    if (!options) {
      throw new Error('Options de prédiction manquantes');
    }
    
    try {
      // Analyser la saisonnalité si nécessaire
      let seasonalityModel: SeasonalityModel | undefined;
      if (options.includeSeasonality) {
        seasonalityModel = this.seasonalityService.analyzeSeasonality(data);
      }
      
      // Générer des prédictions selon le type demandé
      switch (options.predictionType) {
        case 'performance':
          return this.predictPerformance(data, options, seasonalityModel);
        
        case 'budget':
          return this.predictBudget(data, options, seasonalityModel);
        
        case 'audience':
          return this.predictAudience(data, options, seasonalityModel);
        
        case 'creative':
          return this.predictCreative(data, options, seasonalityModel);
        
        default:
          throw new Error(`Type de prédiction non supporté: ${options.predictionType}`);
      }
    } catch (error) {
      console.error('Erreur lors de la génération des prédictions:', error);
      throw error instanceof Error 
        ? error 
        : new Error('Erreur lors de la génération des prédictions');
    }
  }
  
  /**
   * Prédit les performances futures (CTR, CPC, CPA, etc.)
   */
  private async predictPerformance(
    data: AdvertisingData[],
    options: PredictionOptions,
    seasonalityModel?: SeasonalityModel
  ): Promise<PredictionResult[]> {
    // Préparation des dates de prédiction
    const { dates, numDays } = this.generateFutureDates(options.timeHorizon);
    
    // Calculer les valeurs actuelles moyennes
    const currentAverages = this.calculateCurrentAverages(data);
    
    // Calculer les tendances actuelles
    const trends = this.calculateTrends(data);
    
    // Prédire les métriques clés
    const predictedMetrics: PredictionMetric[] = [];
    const predictedValues: Record<string, number[]> = {};
    
    // Métriques à prédire
    const metricsToPredict = [
      { name: 'ctr', label: 'Taux de clics (%)' },
      { name: 'cpc', label: 'Coût par clic' },
      { name: 'cpa', label: 'Coût par acquisition' },
      { name: 'conversionRate', label: 'Taux de conversion (%)' }
    ];
    
    // Générer les prédictions pour chaque métrique
    for (const metric of metricsToPredict) {
      const currentValue = currentAverages[metric.name] || 0;
      const trend = trends[metric.name] || 0;
      
      // Appliquer le trend pour prédire la valeur future
      // Simplification: valeur future = valeur actuelle * (1 + trend) ^ (nombre de périodes)
      const trendMultiplier = Math.pow(1 + trend, numDays / 30); // Normaliser sur 30 jours
      let predictedValue = currentValue * trendMultiplier;
      
      // Limiter les valeurs prédites pour éviter des prédictions irréalistes
      if (metric.name === 'ctr' || metric.name === 'conversionRate') {
        predictedValue = Math.min(predictedValue, 100); // Maximum 100%
      }
      predictedValue = Math.max(predictedValue, 0); // Minimum 0
      
      // Calculer le changement en pourcentage
      const change = currentValue > 0 
        ? ((predictedValue - currentValue) / currentValue) * 100 
        : 0;
      
      // Ajouter à la liste des métriques prédites
      predictedMetrics.push({
        name: metric.name,
        current: currentValue,
        predicted: predictedValue,
        change,
        confidenceLow: predictedValue * 0.9, // Simplification: intervalle de confiance à 10%
        confidenceHigh: predictedValue * 1.1 // Simplification: intervalle de confiance à 10%
      });
      
      // Générer la série temporelle des valeurs prédites
      predictedValues[metric.name] = this.generatePredictedTimeSeries(
        currentValue,
        trend,
        numDays,
        seasonalityModel
      );
    }
    
    // Générer des recommandations basées sur les prédictions
    const recommendations = this.generatePerformanceRecommendations(predictedMetrics);
    
    return [{
      id: uuidv4(),
      title: `Prédiction de performance sur ${options.timeHorizon === '1month' ? '1 mois' : 
              options.timeHorizon === '3months' ? '3 mois' : 
              options.timeHorizon === '6months' ? '6 mois' : 
              options.timeHorizon === '12months' ? '12 mois' : options.timeHorizon}`,
      description: `Prédiction des principaux indicateurs de performance pour ${options.platform} sur les ${numDays} prochains jours.`,
      predictionType: options.predictionType,
      timeHorizon: options.timeHorizon,
      metrics: predictedMetrics,
      seasonalityImpact: seasonalityModel ? this.calculateSeasonalityImpact(seasonalityModel) : undefined,
      recommendations,
      data: {
        dates,
        values: predictedValues,
        confidence: {} // Simplification: pas d'intervalle de confiance détaillé pour cet exemple
      },
      quality: {
        accuracy: 0.8, // Valeur fictive pour l'exemple
        confidence: 0.7, // Valeur fictive pour l'exemple
        dataPoints: data.length
      }
    }];
  }
  
  /**
   * Prédit l'impact des changements de budget
   */
  private async predictBudget(
    data: AdvertisingData[],
    options: PredictionOptions,
    seasonalityModel?: SeasonalityModel
  ): Promise<PredictionResult[]> {
    // Simplification pour cet exemple
    // Dans une implémentation réelle, vous auriez une modélisation plus sophistiquée
    // des effets de changement de budget
    
    return this.predictPerformance(data, options, seasonalityModel);
  }
  
  /**
   * Prédit les performances par audience
   */
  private async predictAudience(
    data: AdvertisingData[],
    options: PredictionOptions,
    seasonalityModel?: SeasonalityModel
  ): Promise<PredictionResult[]> {
    // Simplification pour cet exemple
    // Dans une implémentation réelle, vous segmenteriez les données par audience
    // et feriez des prédictions distinctes pour chaque segment
    
    return this.predictPerformance(data, options, seasonalityModel);
  }
  
  /**
   * Prédit les performances des créatifs
   */
  private async predictCreative(
    data: AdvertisingData[],
    options: PredictionOptions,
    seasonalityModel?: SeasonalityModel
  ): Promise<PredictionResult[]> {
    // Simplification pour cet exemple
    // Dans une implémentation réelle, vous analyseriez les performances historiques
    // des différents types de créatifs
    
    return this.predictPerformance(data, options, seasonalityModel);
  }
  
  /**
   * Génère un ensemble de dates futures basé sur l'horizon temporel
   */
  private generateFutureDates(timeHorizon: string): { dates: string[]; numDays: number } {
    let numDays: number;
    
    switch (timeHorizon) {
      case '1month':
        numDays = 30;
        break;
      case '3months':
        numDays = 90;
        break;
      case '6months':
        numDays = 180;
        break;
      case '12months':
        numDays = 365;
        break;
      default:
        numDays = 30; // Par défaut, 1 mois
    }
    
    const dates: string[] = [];
    const today = new Date();
    
    for (let i = 1; i <= numDays; i++) {
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + i);
      dates.push(futureDate.toISOString().split('T')[0]);
    }
    
    return { dates, numDays };
  }
  
  /**
   * Calcule les moyennes actuelles des métriques clés
   */
  private calculateCurrentAverages(data: AdvertisingData[]): Record<string, number> {
    // Calculer les valeurs moyennes actuelles pour les métriques clés
    const totalImpressions = data.reduce((sum, item) => sum + (item.impressions || 0), 0);
    const totalClicks = data.reduce((sum, item) => sum + (item.clicks || 0), 0);
    const totalConversions = data.reduce((sum, item) => sum + (item.conversions || 0), 0);
    const totalSpend = data.reduce((sum, item) => sum + (item.spend || 0), 0);
    
    return {
      ctr: totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0,
      cpc: totalClicks > 0 ? totalSpend / totalClicks : 0,
      cpa: totalConversions > 0 ? totalSpend / totalConversions : 0,
      conversionRate: totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0
    };
  }
  
  /**
   * Calcule les tendances actuelles pour les métriques clés
   */
  private calculateTrends(data: AdvertisingData[]): Record<string, number> {
    // Simplification: calcul de tendance linéaire simple
    // Dans une implémentation réelle, vous utiliseriez des techniques plus sophistiquées
    
    // Regrouper les données par jour
    const groupedByDate: Record<string, AdvertisingData[]> = {};
    
    for (const row of data) {
      if (!row.date) continue;
      
      const date = typeof row.date === 'string' ? row.date : row.date.toString();
      
      if (!groupedByDate[date]) {
        groupedByDate[date] = [];
      }
      
      groupedByDate[date].push(row);
    }
    
    // Trier les dates
    const sortedDates = Object.keys(groupedByDate).sort();
    
    if (sortedDates.length < 2) {
      // Pas assez de données pour calculer une tendance
      return {
        ctr: 0,
        cpc: 0,
        cpa: 0,
        conversionRate: 0
      };
    }
    
    // Calculer les valeurs agrégées pour chaque jour
    const dailyMetrics: Record<string, {
      ctr: number;
      cpc: number;
      cpa: number;
      conversionRate: number;
    }> = {};
    
    for (const date of sortedDates) {
      const rows = groupedByDate[date];
      
      const impressions = rows.reduce((sum, row) => sum + (row.impressions || 0), 0);
      const clicks = rows.reduce((sum, row) => sum + (row.clicks || 0), 0);
      const conversions = rows.reduce((sum, row) => sum + (row.conversions || 0), 0);
      const spend = rows.reduce((sum, row) => sum + (row.spend || 0), 0);
      
      dailyMetrics[date] = {
        ctr: impressions > 0 ? (clicks / impressions) * 100 : 0,
        cpc: clicks > 0 ? spend / clicks : 0,
        cpa: conversions > 0 ? spend / conversions : 0,
        conversionRate: clicks > 0 ? (conversions / clicks) * 100 : 0
      };
    }
    
    // Calculer les tendances pour chaque métrique
    const trends: Record<string, number> = {};
    
    for (const metric of ['ctr', 'cpc', 'cpa', 'conversionRate']) {
      // Extraire les valeurs pour cette métrique
      const values = sortedDates.map(date => dailyMetrics[date][metric as keyof typeof dailyMetrics[string]]);
      
      // Calculer la tendance (pente de la régression linéaire)
      const { slope } = this.calculateLinearTrend(values);
      
      // Normaliser la tendance pour qu'elle représente le changement quotidien moyen en pourcentage
      const averageValue = values.reduce((sum, val) => sum + val, 0) / values.length;
      trends[metric] = averageValue > 0 ? slope / averageValue : 0;
    }
    
    return trends;
  }
  
  /**
   * Calcule une tendance linéaire simple
   */
  private calculateLinearTrend(values: number[]): { slope: number; intercept: number } {
    if (values.length < 2) {
      return { slope: 0, intercept: 0 };
    }
    
    // Générer des indices pour l'axe X (0, 1, 2, ...)
    const x = Array.from({ length: values.length }, (_, i) => i);
    
    // Calculer les moyennes
    const meanX = x.reduce((sum, val) => sum + val, 0) / x.length;
    const meanY = values.reduce((sum, val) => sum + val, 0) / values.length;
    
    // Calculer les sommes nécessaires pour la régression linéaire
    let numerator = 0;
    let denominator = 0;
    
    for (let i = 0; i < values.length; i++) {
      numerator += (x[i] - meanX) * (values[i] - meanY);
      denominator += (x[i] - meanX) * (x[i] - meanX);
    }
    
    // Calculer la pente et l'ordonnée à l'origine
    const slope = denominator !== 0 ? numerator / denominator : 0;
    const intercept = meanY - slope * meanX;
    
    return { slope, intercept };
  }
  
  /**
   * Génère une série temporelle de valeurs prédites
   */
  private generatePredictedTimeSeries(
    currentValue: number,
    trend: number,
    numDays: number,
    seasonalityModel?: SeasonalityModel
  ): number[] {
    const values: number[] = [];
    
    for (let i = 0; i < numDays; i++) {
      // Calculer la valeur de base prédite pour ce jour
      const trendMultiplier = Math.pow(1 + trend, i / 30); // Normaliser sur 30 jours
      let predictedValue = currentValue * trendMultiplier;
      
      // Appliquer l'effet saisonnier si disponible
      if (seasonalityModel) {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + i + 1);
        
        // Appliquer l'effet du jour de la semaine
        const dayOfWeek = futureDate.getDay();
        const weeklyFactor = seasonalityModel.weekly[dayOfWeek];
        
        // Appliquer l'effet du mois
        const month = futureDate.getMonth();
        const yearlyFactor = seasonalityModel.yearly[month];
        
        // Combiner les facteurs saisonniers
        const seasonalFactor = weeklyFactor * yearlyFactor;
        
        // Appliquer à la valeur prédite
        predictedValue *= seasonalFactor;
      }
      
      values.push(predictedValue);
    }
    
    return values;
  }
  
  /**
   * Calcule l'impact global de la saisonnalité
   */
  private calculateSeasonalityImpact(seasonalityModel: SeasonalityModel): number {
    // Calcul simplifié de l'impact de la saisonnalité
    // Mesure l'écart-type des facteurs saisonniers pour estimer leur impact
    
    // Facteurs hebdomadaires
    const weeklyVariance = this.calculateVariance(seasonalityModel.weekly);
    
    // Facteurs annuels
    const yearlyVariance = this.calculateVariance(seasonalityModel.yearly);
    
    // Impact combiné (en pourcentage)
    return Math.sqrt(weeklyVariance + yearlyVariance) * 100;
  }
  
  /**
   * Calcule la variance d'un tableau de nombres
   */
  private calculateVariance(values: number[]): number {
    if (values.length === 0) return 0;
    
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
    return squaredDiffs.reduce((sum, val) => sum + val, 0) / values.length;
  }
  
  /**
   * Génère des recommandations basées sur les prédictions de performance
   */
  private generatePerformanceRecommendations(metrics: PredictionMetric[]): any[] {
    // Version simplifiée temporaire
    return [{
      id: uuidv4(),
      title: 'Recommandation générale',
      description: 'Surveillez régulièrement vos métriques pour ajuster votre stratégie au besoin.',
      priority: 'medium',
      impact: {
        metric: 'general',
        value: 0,
        timeframe: '30 jours'
      },
      riskLevel: 'low',
      action: 'Continuer la stratégie actuelle, envisager des tests A/B pour amélioration incrémentale'
    }];
  }
} 