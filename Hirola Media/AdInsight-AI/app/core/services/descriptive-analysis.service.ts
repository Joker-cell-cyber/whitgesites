/**
 * Service d'analyse descriptive des données publicitaires
 * Ce service se concentre uniquement sur l'analyse des données historiques (ce qui s'est passé)
 */

import { 
  AdvertisingData, 
  AnalysisOptions, 
  AnalysisResult,
  Platform,
  Insight,
  Trend,
  Anomaly,
  Recommendation
} from '../models/analytics-types';
import { SeasonalityService } from './seasonality.service';

export class DescriptiveAnalysisService {
  private seasonalityService: SeasonalityService;
  
  constructor() {
    this.seasonalityService = new SeasonalityService();
  }
  
  /**
   * Analyse complète des données avec détection des tendances et anomalies
   */
  public analyzeData(
    data: AdvertisingData[],
    options: AnalysisOptions,
    platformDetected: Platform
  ): {
    basicMetrics: any;
    trends: Trend[];
    anomalies: Anomaly[];
    seasonalityFactors?: any;
  } {
    // Validation des données
    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new Error('Données publicitaires invalides ou manquantes pour l\'analyse');
    }

    if (!options) {
      throw new Error('Options d\'analyse manquantes');
    }

    if (!platformDetected) {
      throw new Error('Plateforme non spécifiée pour l\'analyse');
    }
    
    try {
      // Calculer les métriques de base
      const basicMetrics = this.calculateBasicMetrics(data);
      
      // Analyser les tendances temporelles
      const trends = this.analyzeTrends(data, options);
      
      // Détecter les anomalies
      const anomalies = this.detectAnomalies(data, basicMetrics);
      
      // Analyser la saisonnalité si nécessaire
      let seasonalityFactors = undefined;
      if (options.metrics.includes('seasonality')) {
        seasonalityFactors = this.seasonalityService.analyzeSeasonality(data);
      }
      
      return {
        basicMetrics,
        trends,
        anomalies,
        seasonalityFactors
      };
    } catch (error) {
      console.error('Erreur lors de l\'analyse descriptive:', error);
      throw error instanceof Error 
        ? error 
        : new Error('Erreur lors de l\'analyse des données');
    }
  }
  
  /**
   * Calcule les métriques de base pour l'ensemble des données
   */
  private calculateBasicMetrics(data: AdvertisingData[]): any {
    // Total des dépenses
    const totalSpend = data.reduce((sum, item) => sum + (item.spend || 0), 0);
    
    // Total des impressions
    const totalImpressions = data.reduce((sum, item) => sum + (item.impressions || 0), 0);
    
    // Total des clics
    const totalClicks = data.reduce((sum, item) => sum + (item.clicks || 0), 0);
    
    // Total des conversions
    const totalConversions = data.reduce((sum, item) => sum + (item.conversions || 0), 0);
    
    // CTR moyen global
    const avgCTR = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
    
    // CPC moyen global
    const avgCPC = totalClicks > 0 ? totalSpend / totalClicks : 0;
    
    // CPA moyen global
    const avgCPA = totalConversions > 0 ? totalSpend / totalConversions : 0;
    
    // Taux de conversion moyen global
    const avgConversionRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;
    
    // CPM moyen global
    const avgCPM = totalImpressions > 0 ? (totalSpend / totalImpressions) * 1000 : 0;
    
    // Calcul des statistiques pour chaque métrique numérique
    const spendStats = this.calculateStats(data.map(item => item.spend || 0));
    const ctrStats = this.calculateStats(data.map(item => item.ctr || 0));
    const cpcStats = this.calculateStats(data.map(item => item.cpc || 0));
    const cpaStats = this.calculateStats(data.map(item => item.cpa || 0));
    
    // Nombre de jours uniques
    const uniqueDays = new Set(data.map(item => item.date)).size;
    
    // Nombre de campagnes uniques
    const uniqueCampaigns = new Set(
      data
        .filter(item => item.campaign_name)
        .map(item => item.campaign_name)
    ).size;
    
    // Nombre d'adsets uniques
    const uniqueAdsets = new Set(
      data
        .filter(item => item.adset_name)
        .map(item => item.adset_name)
    ).size;
    
    // Nombre d'annonces uniques
    const uniqueAds = new Set(
      data
        .filter(item => item.ad_name)
        .map(item => item.ad_name)
    ).size;
    
    return {
      totalSpend,
      totalImpressions,
      totalClicks,
      totalConversions,
      avgCTR,
      avgCPC,
      avgCPA,
      avgConversionRate,
      avgCPM,
      spendStats,
      ctrStats,
      cpcStats,
      cpaStats,
      uniqueDays,
      uniqueCampaigns,
      uniqueAdsets,
      uniqueAds,
      // Ajouter CPM moyen s'il est disponible
      averageCPM: this.calculateAverageCPM(data),
      // Ajouter fréquence moyenne s'il est disponible
      averageFrequency: this.calculateAverageFrequency(data),
      // Ajouter structure de budget et enchères
      budgetStructure: this.analyzeBudgetStructure(data),
      biddingStrategies: this.analyzeBiddingStrategies(data),
    };
  }
  
  /**
   * Calcule des statistiques descriptives pour un tableau de valeurs
   */
  private calculateStats(values: number[]): {
    min: number;
    max: number;
    avg: number;
    median: number;
    stdDev: number;
  } {
    if (values.length === 0) {
      return {
        min: 0,
        max: 0,
        avg: 0,
        median: 0,
        stdDev: 0
      };
    }
    
    // Filtrer les valeurs non nulles et non NaN
    const validValues = values.filter(value => 
      value !== null && 
      value !== undefined && 
      !isNaN(value) &&
      isFinite(value)
    );
    
    if (validValues.length === 0) {
      return {
        min: 0,
        max: 0,
        avg: 0,
        median: 0,
        stdDev: 0
      };
    }
    
    // Trier les valeurs pour calculer la médiane
    const sortedValues = [...validValues].sort((a, b) => a - b);
    
    // Minimum
    const min = sortedValues[0];
    
    // Maximum
    const max = sortedValues[sortedValues.length - 1];
    
    // Moyenne
    const avg = validValues.reduce((sum, value) => sum + value, 0) / validValues.length;
    
    // Médiane
    const midIndex = Math.floor(sortedValues.length / 2);
    const median = sortedValues.length % 2 === 0
      ? (sortedValues[midIndex - 1] + sortedValues[midIndex]) / 2
      : sortedValues[midIndex];
    
    // Écart-type
    const variance = validValues.reduce((sum, value) => {
      const diff = value - avg;
      return sum + (diff * diff);
    }, 0) / validValues.length;
    
    const stdDev = Math.sqrt(variance);
    
    return {
      min,
      max,
      avg,
      median,
      stdDev
    };
  }
  
  /**
   * Analyse les tendances dans les données en fonction des options spécifiées
   */
  private analyzeTrends(data: AdvertisingData[], options: AnalysisOptions): Trend[] {
    // Regrouper les données par jour
    const groupedByDate = this.groupDataByDate(data);
    
    // Trier les dates
    const sortedDates = Object.keys(groupedByDate).sort();
    
    if (sortedDates.length < 2) {
      // Pas assez de données pour détecter des tendances
      return [];
    }
    
    // Analyser les tendances pour chaque métrique importante
    const trendMetrics = [
      { name: 'spend', label: 'Dépenses' },
      { name: 'impressions', label: 'Impressions' },
      { name: 'clicks', label: 'Clics' },
      { name: 'conversions', label: 'Conversions' },
      { name: 'ctr', label: 'Taux de clics' },
      { name: 'cpc', label: 'Coût par clic' },
      { name: 'cpa', label: 'Coût par acquisition' }
    ];
    
    const trends: Trend[] = [];
    
    for (const metric of trendMetrics) {
      // Extraire les valeurs de cette métrique pour chaque jour
      const values = sortedDates.map(date => {
        const dailyData = groupedByDate[date];
        
        // Calculer la somme ou la moyenne selon la métrique
        if (['ctr', 'cpc', 'cpa'].includes(metric.name)) {
          // Pour les taux et coûts, calculer la moyenne pondérée
          let totalValue = 0;
          let totalWeight = 0;
          
          for (const row of dailyData) {
            const value = row[metric.name as keyof AdvertisingData];
            let weight = 0;
            
            if (metric.name === 'ctr') {
              weight = row.impressions || 0;
            } else if (metric.name === 'cpc') {
              weight = row.clicks || 0;
            } else if (metric.name === 'cpa') {
              weight = row.conversions || 0;
            }
            
            if (typeof value === 'number' && !isNaN(value) && weight > 0) {
              totalValue += value * weight;
              totalWeight += weight;
            }
          }
          
          return totalWeight > 0 ? totalValue / totalWeight : 0;
        } else {
          // Pour les valeurs absolues, calculer la somme
          return dailyData.reduce((sum, row) => {
            const value = row[metric.name as keyof AdvertisingData];
            return sum + (typeof value === 'number' ? value : 0);
          }, 0);
        }
      });
      
      // Calculer la tendance linéaire
      const { slope, significance } = this.calculateLinearTrend(values);
      
      // Ne garder que les tendances significatives
      if (Math.abs(significance) > 0.3) {
        trends.push({
          id: `trend-${metric.name}`,
          title: `Tendance ${metric.label}`,
          description: this.generateTrendDescription(metric.label, slope, significance),
          direction: slope > 0 ? 'increasing' : slope < 0 ? 'decreasing' : 'stable',
          magnitude: Math.abs(slope),
          significance: Math.abs(significance) > 0.7 ? 'high' : Math.abs(significance) > 0.5 ? 'medium' : 'low',
          data: {
            x: sortedDates,
            y: values
          }
        });
      }
    }
    
    return trends;
  }
  
  /**
   * Génère une description textuelle d'une tendance
   */
  private generateTrendDescription(
    metricLabel: string, 
    slope: number, 
    significance: number
  ): string {
    const direction = slope > 0 ? 'à la hausse' : 'à la baisse';
    const magnitude = Math.abs(significance) > 0.7 
      ? 'forte' 
      : Math.abs(significance) > 0.5 
        ? 'modérée' 
        : 'légère';
    
    return `Tendance ${direction} ${magnitude} pour ${metricLabel} sur la période analysée. Variation moyenne de ${(slope * 100).toFixed(2)}% par jour.`;
  }
  
  /**
   * Regroupe les données par date
   */
  private groupDataByDate(data: AdvertisingData[]): Record<string, AdvertisingData[]> {
    const grouped: Record<string, AdvertisingData[]> = {};
    
    for (const row of data) {
      if (!row.date) continue;
      
      const date = typeof row.date === 'string' ? row.date : row.date.toString();
      
      if (!grouped[date]) {
        grouped[date] = [];
      }
      
      grouped[date].push(row);
    }
    
    return grouped;
  }
  
  /**
   * Calcule une tendance linéaire simple à partir d'une série de valeurs
   */
  private calculateLinearTrend(values: number[]): {
    slope: number;
    intercept: number;
    significance: number;
  } {
    if (values.length < 2) {
      return { slope: 0, intercept: 0, significance: 0 };
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
    
    // Calculer le coefficient de corrélation (R) comme mesure de significativité
    let sumSquaredErrors = 0;
    let sumSquaredTotal = 0;
    
    for (let i = 0; i < values.length; i++) {
      const predicted = slope * x[i] + intercept;
      sumSquaredErrors += (values[i] - predicted) * (values[i] - predicted);
      sumSquaredTotal += (values[i] - meanY) * (values[i] - meanY);
    }
    
    // Coefficient de détermination (R²)
    const rSquared = sumSquaredTotal !== 0 ? 1 - (sumSquaredErrors / sumSquaredTotal) : 0;
    
    // Prendre la racine carrée et garder le signe de la pente
    const significance = Math.sqrt(Math.abs(rSquared)) * (slope > 0 ? 1 : -1);
    
    return {
      slope,
      intercept,
      significance
    };
  }
  
  /**
   * Détecte les anomalies dans les données
   */
  private detectAnomalies(data: AdvertisingData[], basicMetrics: any): Anomaly[] {
    const anomalies: Anomaly[] = [];
    
    // Ajouter un avertissement général sur la fiabilité
    anomalies.push({
      id: 'reliability-warning',
      title: 'Avertissement sur la fiabilité des données',
      description: 'Les anomalies détectées sont basées sur l\'analyse statistique des données historiques. La pertinence peut varier selon la qualité et la quantité des données disponibles.',
      impact: 'neutral',
      magnitude: 1,
      date: new Date().toISOString(),
      metric: 'general',
      value: 0,
      expectedValue: 0,
      deviation: 0,
      suggestedAction: 'Considérer le contexte et les facteurs externes avant de prendre des décisions basées sur ces anomalies.'
    });
    
    // Regrouper les données par jour
    const groupedByDate = this.groupDataByDate(data);
    
    // Métriques à vérifier pour les anomalies avec leurs seuils et contextes
    const metricsToCheck = [
      {
        name: 'ctr',
        label: 'Taux de clics',
        thresholdMultiplier: 2,
        context: 'Les variations de CTR peuvent être influencées par des changements de ciblage, de créatifs ou de contexte marché.',
        minDataPoints: 100
      },
      {
        name: 'cpc',
        label: 'Coût par clic',
        thresholdMultiplier: 2,
        context: 'Les variations de CPC peuvent être dues à la concurrence, aux enchères ou aux changements saisonniers.',
        minDataPoints: 50
      },
      {
        name: 'cpa',
        label: 'Coût par acquisition',
        thresholdMultiplier: 2.5,
        context: 'Les variations de CPA peuvent être liées à la qualité du trafic ou aux changements dans le parcours de conversion.',
        minDataPoints: 30
      },
      {
        name: 'conversionRate',
        label: 'Taux de conversion',
        thresholdMultiplier: 2,
        context: 'Les variations du taux de conversion peuvent être influencées par des facteurs techniques ou commerciaux.',
        minDataPoints: 50
      }
    ];
    
    for (const metric of metricsToCheck) {
      // Extraire toutes les valeurs valides de cette métrique
      const allValues = data
        .map(row => row[metric.name as keyof AdvertisingData])
        .filter(val => typeof val === 'number' && !isNaN(val) && isFinite(val)) as number[];
      
      // Vérifier si nous avons assez de données pour une analyse fiable
      if (allValues.length < metric.minDataPoints) {
        anomalies.push({
          id: `insufficient-data-${metric.name}`,
          title: `Données insuffisantes pour ${metric.label}`,
          description: `L'analyse des anomalies pour ${metric.label} nécessite au moins ${metric.minDataPoints} points de données valides. Actuellement : ${allValues.length} points.`,
          impact: 'neutral',
          magnitude: 0.5,
          date: new Date().toISOString(),
          metric: metric.name,
          value: allValues.length,
          expectedValue: metric.minDataPoints,
          deviation: (allValues.length - metric.minDataPoints) / metric.minDataPoints,
          suggestedAction: 'Collecter plus de données pour une analyse plus fiable.'
        });
        continue;
      }
      
      // Calculer des statistiques pour cette métrique
      const stats = this.calculateStats(allValues);
      
      // Définir des seuils pour les anomalies
      const upperThreshold = stats.avg + (stats.stdDev * metric.thresholdMultiplier);
      const lowerThreshold = stats.avg - (stats.stdDev * metric.thresholdMultiplier);
      
      // Vérifier chaque jour pour des anomalies
      for (const [date, dailyData] of Object.entries(groupedByDate)) {
        const aggregatedValue = this.calculateAggregatedValue(dailyData, metric.name);
        
        // Vérifier si c'est une anomalie
        if (aggregatedValue > upperThreshold || aggregatedValue < lowerThreshold) {
          const isHigh = aggregatedValue > upperThreshold;
          const expectedValue = stats.avg;
          const deviation = (aggregatedValue - expectedValue) / expectedValue;
          
          anomalies.push({
            id: `anomaly-${metric.name}-${date}`,
            title: `${metric.label} anormal le ${date}`,
            description: `${metric.label} ${isHigh ? 'anormalement élevé' : 'anormalement bas'} (${aggregatedValue.toFixed(2)}) par rapport à la moyenne (${expectedValue.toFixed(2)}). ${metric.context}`,
            impact: this.determineImpact(metric.name, isHigh),
            magnitude: Math.abs(deviation),
            date,
            metric: metric.name,
            value: aggregatedValue,
            expectedValue,
            deviation,
            suggestedAction: this.generateAnomalyAction(metric.name, isHigh, deviation)
          });
        }
      }
    }
    
    return this.prioritizeAnomalies(anomalies);
  }
  
  /**
   * Détermine l'impact d'une anomalie
   */
  private determineImpact(metric: string, isHigh: boolean): 'positive' | 'negative' | 'neutral' {
    switch (metric) {
      case 'ctr':
      case 'conversionRate':
        return isHigh ? 'positive' : 'negative';
      case 'cpc':
      case 'cpa':
        return isHigh ? 'negative' : 'positive';
      default:
        return 'neutral';
    }
  }
  
  /**
   * Génère une action suggérée pour une anomalie
   */
  private generateAnomalyAction(metric: string, isHigh: boolean, deviation: number): string {
    const severity = Math.abs(deviation) > 0.5 ? 'urgent' : 'à surveiller';
    
    switch (metric) {
      case 'ctr':
        return isHigh 
          ? `${severity}: Analyser les facteurs de succès (ciblage, créatifs) pour reproduire ces performances. Vérifier la qualité du trafic.`
          : `${severity}: Examiner les changements récents dans les créatifs ou le ciblage. Tester de nouvelles approches créatives.`;
      
      case 'cpc':
        return isHigh 
          ? `${severity}: Examiner la concurrence et les enchères. Optimiser le ciblage et revoir la stratégie d'enchères.`
          : `${severity}: Documenter les facteurs ayant conduit à ce CPC bas pour optimiser les autres campagnes.`;
      
      case 'cpa':
        return isHigh 
          ? `${severity}: Analyser le parcours de conversion et la qualité du trafic. Optimiser le ciblage et les enchères.`
          : `${severity}: Identifier les facteurs de succès pour répliquer ces performances sur d'autres campagnes.`;
      
      case 'conversionRate':
        return isHigh 
          ? `${severity}: Analyser les facteurs de succès pour maintenir cette performance. Vérifier la qualité des conversions.`
          : `${severity}: Examiner le parcours de conversion et les potentiels obstacles techniques ou commerciaux.`;
      
      default:
        return `${severity}: Analyser en détail cette anomalie pour en comprendre les causes et implications.`;
    }
  }
  
  /**
   * Priorise les anomalies selon leur impact et leur magnitude
   */
  private prioritizeAnomalies(anomalies: Anomaly[]): Anomaly[] {
    return anomalies.sort((a, b) => {
      // Les avertissements généraux en premier
      if (a.metric === 'general') return -1;
      if (b.metric === 'general') return 1;
      
      // Ensuite par magnitude et impact
      const impactScore = (anomaly: Anomaly) => {
        if (anomaly.impact === 'negative') return 2;
        if (anomaly.impact === 'positive') return 1;
        return 0;
      };
      
      const scoreA = impactScore(a) * a.magnitude;
      const scoreB = impactScore(b) * b.magnitude;
      
      return scoreB - scoreA;
    });
  }
  
  /**
   * Calcule la valeur agrégée pour une métrique spécifique à partir des données quotidiennes
   */
  private calculateAggregatedValue(dailyData: AdvertisingData[], metricName: string): number {
    if (!dailyData || dailyData.length === 0) return 0;
    
    let sum = 0;
    let count = 0;
    
    dailyData.forEach(item => {
      const value = item[metricName as keyof AdvertisingData];
      if (value !== undefined && typeof value === 'number') {
        sum += value;
        count++;
      } else if (value !== undefined && typeof value === 'string') {
        const numValue = Number(value);
        if (!isNaN(numValue)) {
          sum += numValue;
          count++;
        }
      }
    });
    
    return count > 0 ? sum / count : 0;
  }
  
  /**
   * Calcule le CPM moyen à partir des données publicitaires
   */
  private calculateAverageCPM(data: AdvertisingData[]): number {
    // Filtrer les données pour obtenir seulement celles avec cpm ou impressions et spend
    const relevantData = data.filter(item => 
      item.cpm !== undefined || 
      (item.impressions && item.impressions > 0 && item.spend !== undefined)
    );
    
    if (relevantData.length === 0) return 0;
    
    let totalCPM = 0;
    
    relevantData.forEach(item => {
      if (item.cpm !== undefined) {
        totalCPM += Number(item.cpm);
      } else if (item.impressions && item.spend) {
        const cpm = (Number(item.spend) / Number(item.impressions)) * 1000;
        totalCPM += cpm;
      }
    });
    
    return totalCPM / relevantData.length;
  }
  
  /**
   * Calcule la fréquence moyenne à partir des données publicitaires
   */
  private calculateAverageFrequency(data: AdvertisingData[]): number {
    // Filtrer les données pour obtenir seulement celles avec frequency ou (impressions et reach)
    const relevantData = data.filter(item => 
      item.frequency !== undefined || 
      (item.impressions && item.impressions > 0 && item.reach && Number(item.reach) > 0)
    );
    
    if (relevantData.length === 0) return 0;
    
    let totalFrequency = 0;
    
    relevantData.forEach(item => {
      if (item.frequency !== undefined) {
        totalFrequency += Number(item.frequency);
      } else if (item.impressions && item.reach) {
        const frequency = Number(item.impressions) / Number(item.reach);
        totalFrequency += frequency;
      }
    });
    
    return totalFrequency / relevantData.length;
  }
  
  /**
   * Analyse la structure de budget utilisée dans les campagnes (CBO vs ABO)
   */
  private analyzeBudgetStructure(data: AdvertisingData[]): {
    cbo: number;
    abo: number;
    averagePerformance: {
      cbo: { ctr: number; cpa: number; roas: number };
      abo: { ctr: number; cpa: number; roas: number };
    }
  } {
    // Filtrer les données pour obtenir seulement celles avec des informations de budget
    const budgetData = data.filter(item => 
      (item.campaign_budget_type || item.adset_budget_type || item.budget_type) !== undefined
    );
    
    if (budgetData.length === 0) {
      return {
        cbo: 0,
        abo: 0,
        averagePerformance: {
          cbo: { ctr: 0, cpa: 0, roas: 0 },
          abo: { ctr: 0, cpa: 0, roas: 0 }
        }
      };
    }
    
    // Identifier les campagnes CBO et ABO
    const cboItems = budgetData.filter(item => {
      const budgetType = item.campaign_budget_type || item.budget_type || '';
      return typeof budgetType === 'string' && 
            (budgetType.toLowerCase().includes('campaign') || 
             budgetType.toLowerCase().includes('cbo'));
    });
    
    const aboItems = budgetData.filter(item => {
      const budgetType = item.adset_budget_type || item.budget_type || '';
      return typeof budgetType === 'string' && 
            (budgetType.toLowerCase().includes('adset') || 
             budgetType.toLowerCase().includes('abo'));
    });
    
    // Calculer les performances moyennes pour chaque type
    const cboPerformance = {
      ctr: cboItems.length > 0 ? cboItems.reduce((sum, item) => sum + (Number(item.ctr) || 0), 0) / cboItems.length : 0,
      cpa: cboItems.length > 0 ? cboItems.reduce((sum, item) => sum + (Number(item.cpa) || 0), 0) / cboItems.length : 0,
      roas: cboItems.length > 0 ? cboItems.reduce((sum, item) => sum + (Number(item.roas) || 0), 0) / cboItems.length : 0
    };
    
    const aboPerformance = {
      ctr: aboItems.length > 0 ? aboItems.reduce((sum, item) => sum + (Number(item.ctr) || 0), 0) / aboItems.length : 0,
      cpa: aboItems.length > 0 ? aboItems.reduce((sum, item) => sum + (Number(item.cpa) || 0), 0) / aboItems.length : 0,
      roas: aboItems.length > 0 ? aboItems.reduce((sum, item) => sum + (Number(item.roas) || 0), 0) / aboItems.length : 0
    };
    
    return {
      cbo: cboItems.length,
      abo: aboItems.length,
      averagePerformance: {
        cbo: cboPerformance,
        abo: aboPerformance
      }
    };
  }
  
  /**
   * Analyse les stratégies d'enchère utilisées dans les campagnes
   */
  private analyzeBiddingStrategies(data: AdvertisingData[]): {
    strategies: { [strategy: string]: number };
    performance: { [strategy: string]: { ctr: number; cpa: number; roas: number } };
  } {
    // Filtrer les données avec des informations de stratégie d'enchère
    const biddingData = data.filter(item => item.campaign_bid_strategy !== undefined);
    
    if (biddingData.length === 0) {
      return {
        strategies: {},
        performance: {}
      };
    }
    
    // Compter les occurrences de chaque stratégie
    const strategies: { [strategy: string]: number } = {};
    const strategyItems: { [strategy: string]: AdvertisingData[] } = {};
    
    biddingData.forEach(item => {
      const strategy = String(item.campaign_bid_strategy).toLowerCase();
      if (!strategies[strategy]) {
        strategies[strategy] = 0;
        strategyItems[strategy] = [];
      }
      strategies[strategy]++;
      strategyItems[strategy].push(item);
    });
    
    // Calculer les performances moyennes par stratégie
    const performance: { [strategy: string]: { ctr: number; cpa: number; roas: number } } = {};
    
    Object.keys(strategyItems).forEach(strategy => {
      const items = strategyItems[strategy];
      performance[strategy] = {
        ctr: items.reduce((sum, item) => sum + (Number(item.ctr) || 0), 0) / items.length,
        cpa: items.reduce((sum, item) => sum + (Number(item.cpa) || 0), 0) / items.length,
        roas: items.reduce((sum, item) => sum + (Number(item.roas) || 0), 0) / items.length
      };
    });
    
    return {
      strategies,
      performance
    };
  }
} 