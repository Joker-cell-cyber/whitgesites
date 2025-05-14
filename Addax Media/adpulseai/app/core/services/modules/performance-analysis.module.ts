/**
 * Module d'analyse des performances publicitaires
 */

import { AdvertisingData, AnalysisResult } from '../../types/analytics-types';
import { AnalysisModule } from '../analysis-module-manager';
import { v4 as uuidv4 } from 'uuid';

export class PerformanceAnalysisModule implements AnalysisModule {
  id: string = 'performance-analysis';
  name: string = 'Analyse des performances';
  description: string = 'Analyse des indicateurs clés de performance (CTR, CPC, CPA, etc.)';
  category: 'performance' = 'performance';
  icon: string = 'BarChart';
  estimatedTime: number = 10;
  tokenCost: number = 1;
  
  /**
   * Exécute l'analyse des performances
   */
  async execute(data: AdvertisingData[]): Promise<AnalysisResult> {
    return this.analyze(data);
  }
  
  /**
   * Analyse les performances des campagnes publicitaires
   */
  private async analyze(data: AdvertisingData[]): Promise<AnalysisResult> {
    const basicMetrics = this.calculateBasicMetrics(data);
    const trends = this.identifyTrends(data);
    const insights = this.generateInsights(basicMetrics, trends);
    
    return {
      id: uuidv4(),
      title: 'Analyse des performances publicitaires',
      description: 'Analyse des indicateurs clés de performance des campagnes publicitaires',
      analysisType: 'performance',
      generatedAt: new Date().toISOString(),
      insights: insights.map(insight => ({
        title: insight.title,
        description: insight.description,
        importance: insight.importance,
        metrics: insight.metrics?.map((metric: string) => ({
          name: metric,
          value: basicMetrics[metric.toLowerCase()] || 0,
          trend: trends[metric.toLowerCase()]?.trend > 0 ? 'up' : trends[metric.toLowerCase()]?.trend < 0 ? 'down' : 'stable'
        }))
      })),
      data: {
        basicMetrics,
        trends,
        insights
      },
      quality: {
        dataPoints: data.length,
        reliability: 0.8,
        completeness: 0.9
      }
    };
  }
  
  /**
   * Calcule les métriques de base
   */
  private calculateBasicMetrics(data: AdvertisingData[]): any {
    const totalSpend = data.reduce((sum, item) => sum + (item.spend || 0), 0);
    const totalImpressions = data.reduce((sum, item) => sum + (item.impressions || 0), 0);
    const totalClicks = data.reduce((sum, item) => sum + (item.clicks || 0), 0);
    
    // S'assurer que les conversions sont des entiers
    const totalConversions = data.reduce((sum, item) => {
      // Conversion explicite en entier pour assurer l'intégrité des données
      const conversion = item.conversions ? Math.round(Number(item.conversions)) : 0;
      return sum + conversion;
    }, 0);
    
    const metrics = {
      totalSpend,
      totalImpressions,
      totalClicks,
      totalConversions,
      avgCTR: totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0,
      avgCPC: totalClicks > 0 ? totalSpend / totalClicks : 0,
      avgCPA: totalConversions > 0 ? totalSpend / totalConversions : 0,
      avgCPM: totalImpressions > 0 ? (totalSpend / totalImpressions) * 1000 : 0,
      avgFrequency: data.reduce((sum, item) => sum + (item.frequency || 0), 0) / data.length,
      avgConversionRate: totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0,
      roas: 0
    };

    // Calcul du ROAS
    const totalConversionValue = data.reduce((sum, item) => sum + (item.revenue || 0), 0);
    metrics.roas = totalSpend > 0 ? (totalConversionValue / totalSpend) * 100 : 0;

    return metrics;
  }
  
  /**
   * Génère des insights pertinents pour les media buyers
   */
  private generateInsights(basicMetrics: any, trends: any): any[] {
    const insights = [];

    // Rentabilité
    if (basicMetrics.roas > 100) {
      insights.push({
        title: 'Rentabilité excellente',
        description: `ROAS de ${basicMetrics.roas.toFixed(2)}%`,
        importance: 3,
        metrics: ['ROAS', 'CPA']
      });
    } else if (basicMetrics.roas < 100) {
      insights.push({
        title: 'Rentabilité à améliorer',
        description: `ROAS de ${basicMetrics.roas.toFixed(2)}%`,
        importance: 2,
        metrics: ['ROAS', 'CPA']
      });
    }

    // Performance
    if (basicMetrics.avgCTR > 2) {
      insights.push({
        title: 'CTR performant',
        description: `CTR de ${basicMetrics.avgCTR.toFixed(2)}%`,
        importance: 2,
        metrics: ['CTR']
      });
    } else if (basicMetrics.avgCTR < 0.5) {
      insights.push({
        title: 'CTR faible',
        description: `CTR de ${basicMetrics.avgCTR.toFixed(2)}%`,
        importance: 2,
        metrics: ['CTR']
      });
    }

    // Fréquence
    if (basicMetrics.avgFrequency > 3) {
      insights.push({
        title: 'Fréquence élevée',
        description: `Fréquence de ${basicMetrics.avgFrequency.toFixed(2)}`,
        importance: 2,
        metrics: ['Fréquence']
      });
    }

    // CPM
    if (basicMetrics.avgCPM > 20) {
      insights.push({
        title: 'CPM élevé',
        description: `CPM de ${basicMetrics.avgCPM.toFixed(2)}€`,
        importance: 2,
        metrics: ['CPM']
      });
    }

    // Taux de conversion
    if (basicMetrics.avgConversionRate > 2) {
      insights.push({
        title: 'Taux de conversion excellent',
        description: `Taux de conversion de ${basicMetrics.avgConversionRate.toFixed(2)}%`,
        importance: 2,
        metrics: ['Taux de conversion']
      });
    } else if (basicMetrics.avgConversionRate < 0.5) {
      insights.push({
        title: 'Taux de conversion faible',
        description: `Taux de conversion de ${basicMetrics.avgConversionRate.toFixed(2)}%`,
        importance: 2,
        metrics: ['Taux de conversion']
      });
    }

    return insights;
  }
  
  /**
   * Identifie les tendances dans les données
   */
  private identifyTrends(data: AdvertisingData[]): any {
    const sortedData = [...data].sort((a, b) => {
      const dateA = new Date(a.date || '');
      const dateB = new Date(b.date || '');
      return dateA.getTime() - dateB.getTime();
    });

    const midPoint = Math.floor(sortedData.length / 2);
    const firstPeriod = sortedData.slice(0, midPoint);
    const secondPeriod = sortedData.slice(midPoint);

    const calculatePeriodMetrics = (period: AdvertisingData[]) => {
      const totalSpend = period.reduce((sum, item) => sum + (item.spend || 0), 0);
      const totalClicks = period.reduce((sum, item) => sum + (item.clicks || 0), 0);
      const totalImpressions = period.reduce((sum, item) => sum + (item.impressions || 0), 0);
      const totalConversions = period.reduce((sum, item) => sum + (item.conversions || 0), 0);

      return {
        cpc: totalClicks > 0 ? totalSpend / totalClicks : 0,
        cpa: totalConversions > 0 ? totalSpend / totalConversions : 0,
        ctr: totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0,
        conversionRate: totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0,
        cpm: totalImpressions > 0 ? (totalSpend / totalImpressions) * 1000 : 0
      };
    };

    const firstMetrics = calculatePeriodMetrics(firstPeriod);
    const secondMetrics = calculatePeriodMetrics(secondPeriod);

    const calculateVariation = (current: number, previous: number) => {
      if (previous === 0) return 0;
      return ((current - previous) / previous) * 100;
    };

    return {
      cpc: { trend: calculateVariation(secondMetrics.cpc, firstMetrics.cpc) },
      cpa: { trend: calculateVariation(secondMetrics.cpa, firstMetrics.cpa) },
      ctr: { trend: calculateVariation(secondMetrics.ctr, firstMetrics.ctr) },
      conversionRate: { trend: calculateVariation(secondMetrics.conversionRate, firstMetrics.conversionRate) },
      cpm: { trend: calculateVariation(secondMetrics.cpm, firstMetrics.cpm) }
    };
  }
} 