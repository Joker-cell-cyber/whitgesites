/**
 * Module d'analyse des créatifs publicitaires
 */

import { AdvertisingData, AnalysisResult } from '../../types/analytics-types';
import { AnalysisModule } from '../analysis-module-manager';
import { v4 as uuidv4 } from 'uuid';
import { CreativeMetrics } from '../../types/creative-metrics';
import { CreativeInsight } from '../../types/creative-insight';

export class CreativeAnalysisModule implements AnalysisModule {
  id: string = 'creative-analysis';
  name: string = 'Analyse des créatifs';
  description: string = 'Analyse les performances des différents types de créatifs et formats publicitaires';
  category: 'creative' = 'creative';
  icon: string = 'Image';
  estimatedTime: number = 25; // secondes
  tokenCost: number = 3;
  
  /**
   * Exécute l'analyse des créatifs
   */
  public async execute(data: AdvertisingData[], options?: any): Promise<AnalysisResult> {
    // Validation des données
    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new Error('Données publicitaires invalides ou manquantes pour l\'analyse des créatifs');
    }
    
    try {
      // Analyser les performances par type de créatif
      const creativePerformance = this.analyzeCreatives(data);
      
      // Identifier les tendances par format
      const formatTrends = this.identifyFormatTrends(data);
      
      // Générer des insights
      const insights = this.generateInsights(creativePerformance, formatTrends);
      
      // Préparer les visualisations
      const visualizations = this.prepareVisualizations(creativePerformance, formatTrends);
      
      return {
        id: uuidv4(),
        title: 'Analyse des créatifs publicitaires',
        description: 'Analyse complète des performances par type de créatif et format publicitaire',
        analysisType: 'creative',
        generatedAt: new Date().toISOString(),
        insights,
        visualizations,
        data: {
          creativePerformance,
          formatTrends
        },
        quality: {
          dataPoints: data.length,
          reliability: 0.8,
          completeness: this.calculateDataCompleteness(data)
        }
      };
    } catch (error) {
      console.error('Erreur lors de l\'analyse des créatifs:', error);
      throw error instanceof Error 
        ? error 
        : new Error('Erreur lors de l\'analyse des créatifs');
    }
  }
  
  /**
   * Analyse les performances par type de créatif
   */
  private analyzeCreatives(data: AdvertisingData[]): any {
    const creativeAnalysis = {
      performance: {
        byType: {} as Record<string, CreativeMetrics>,
        byFormat: {} as Record<string, CreativeMetrics>,
        byConcept: {} as Record<string, CreativeMetrics>,
        byAngle: {} as Record<string, CreativeMetrics>
      },
      insights: {
        bestPerforming: [] as CreativeInsight[],
        underperforming: [] as CreativeInsight[],
        recommendations: [] as string[]
      },
      patterns: {
        successfulElements: [] as string[],
        commonIssues: [] as string[],
        optimizationOpportunities: [] as string[]
      }
    };

    // Analyse par type de créatif
    data.forEach(item => {
      const type = item.creative_type || 'unknown';
      if (!creativeAnalysis.performance.byType[type]) {
        creativeAnalysis.performance.byType[type] = this.initializeMetrics();
      }
      this.updateMetrics(creativeAnalysis.performance.byType[type], item);
    });

    // Analyse par format
    data.forEach(item => {
      const format = item.creative_format || 'unknown';
      if (!creativeAnalysis.performance.byFormat[format]) {
        creativeAnalysis.performance.byFormat[format] = this.initializeMetrics();
      }
      this.updateMetrics(creativeAnalysis.performance.byFormat[format], item);
    });

    // Analyse par concept
    data.forEach(item => {
      const concept = item.creative_concept || 'unknown';
      if (!creativeAnalysis.performance.byConcept[concept]) {
        creativeAnalysis.performance.byConcept[concept] = this.initializeMetrics();
      }
      this.updateMetrics(creativeAnalysis.performance.byConcept[concept], item);
    });

    // Analyse par angle
    data.forEach(item => {
      const angle = item.creative_angle || 'unknown';
      if (!creativeAnalysis.performance.byAngle[angle]) {
        creativeAnalysis.performance.byAngle[angle] = this.initializeMetrics();
      }
      this.updateMetrics(creativeAnalysis.performance.byAngle[angle], item);
    });

    // Analyse des textes
    const textAnalysis = this.analyzeCreativeTexts(data);
    creativeAnalysis.patterns.successfulElements = textAnalysis.successfulElements;
    creativeAnalysis.patterns.commonIssues = textAnalysis.commonIssues;

    // Génération des insights
    creativeAnalysis.insights = this.generateCreativeInsights(creativeAnalysis.performance);

    // Génération des recommandations
    creativeAnalysis.insights.recommendations = this.generateCreativeRecommendations(creativeAnalysis);

    return creativeAnalysis;
  }

  private analyzeCreativeTexts(data: AdvertisingData[]): { successfulElements: string[], commonIssues: string[] } {
    const successfulElements: string[] = [];
    const commonIssues: string[] = [];

    // Analyse des textes performants
    const highPerformingCreatives = data.filter(item => 
      (item.ctr || 0) > 2 && (item.conversion_rate || 0) > 1
    );

    // Analyse des textes sous-performants
    const underperformingCreatives = data.filter(item => 
      (item.ctr || 0) < 0.5 && (item.conversion_rate || 0) < 0.5
    );

    // Analyse des patterns dans les textes performants
    highPerformingCreatives.forEach(item => {
      if (item.creative_primary_text) {
        // Analyse des mots-clés positifs
        const positiveKeywords = this.extractPositiveKeywords(item.creative_primary_text);
        successfulElements.push(...positiveKeywords);
      }
    });

    // Analyse des patterns dans les textes sous-performants
    underperformingCreatives.forEach(item => {
      if (item.creative_primary_text) {
        // Analyse des problèmes communs
        const issues = this.identifyCommonIssues(item.creative_primary_text);
        commonIssues.push(...issues);
      }
    });

    return {
      successfulElements: [...new Set(successfulElements)],
      commonIssues: [...new Set(commonIssues)]
    };
  }

  private extractPositiveKeywords(text: string): string[] {
    const keywords: string[] = [];
    // Analyse des mots-clés positifs
    const positivePatterns = [
      /(gratuit|offer|exclusif|limité|urgent|nouveau|meilleur|unique)/gi,
      /(\d+%|réduction|rabais|promotion)/gi,
      /(garantie|satisfaction|remboursement)/gi,
      /(action|découvrir|essayer|commander)/gi
    ];

    positivePatterns.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) {
        keywords.push(...matches);
      }
    });

    return keywords;
  }

  private identifyCommonIssues(text: string): string[] {
    const issues: string[] = [];
    // Analyse des problèmes communs
    const issuePatterns = [
      /(trop long|trop court)/gi,
      /(vague|imprécis|confus)/gi,
      /(agressif|pression|urgent)/gi,
      /(grammaire|orthographe)/gi
    ];

    issuePatterns.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) {
        issues.push(...matches);
      }
    });

    return issues;
  }

  private generateCreativeInsights(performance: any): { bestPerforming: CreativeInsight[], underperforming: CreativeInsight[], recommendations: string[] } {
    const insights = {
      bestPerforming: [] as CreativeInsight[],
      underperforming: [] as CreativeInsight[],
      recommendations: [] as string[]
    };

    // Analyse des meilleurs créatifs par type
    Object.entries(performance.byType).forEach(([type, metrics]: [string, any]) => {
      if (metrics.ctr > 2 && metrics.conversionRate > 1) {
        insights.bestPerforming.push({
          type: 'bestPerforming' as const,
          metrics,
          insight: `Les créatifs de type ${type} montrent une excellente performance avec un CTR de ${metrics.ctr.toFixed(2)}% et un taux de conversion de ${metrics.conversionRate.toFixed(2)}%`
        });
      }
    });

    // Analyse des créatifs sous-performants
    Object.entries(performance.byType).forEach(([type, metrics]: [string, any]) => {
      if (metrics.ctr < 0.5 && metrics.conversionRate < 0.5) {
        insights.underperforming.push({
          type: 'underperforming' as const,
          metrics,
          insight: `Les créatifs de type ${type} montrent une performance faible avec un CTR de ${metrics.ctr.toFixed(2)}% et un taux de conversion de ${metrics.conversionRate.toFixed(2)}%`
        });
      }
    });

    return insights;
  }

  private generateCreativeRecommendations(analysis: any): string[] {
    const recommendations: string[] = [];

    // Recommandations basées sur les performances
    Object.entries(analysis.performance.byType).forEach(([type, metrics]: [string, any]) => {
      if (metrics.ctr > 2 && metrics.conversionRate > 1) {
        recommendations.push(`Augmentez l'utilisation des créatifs de type ${type} qui montrent d'excellentes performances`);
      }
    });

    // Recommandations basées sur les patterns
    if (analysis.patterns.successfulElements.length > 0) {
      recommendations.push(`Intégrez plus souvent les éléments suivants dans vos créatifs : ${analysis.patterns.successfulElements.join(', ')}`);
    }

    if (analysis.patterns.commonIssues.length > 0) {
      recommendations.push(`Évitez les problèmes suivants dans vos créatifs : ${analysis.patterns.commonIssues.join(', ')}`);
    }

    return recommendations;
  }
  
  /**
   * Identifie les tendances par format publicitaire
   */
  private identifyFormatTrends(data: AdvertisingData[]): any {
    // Extraire et regrouper par format (taille, ratio, etc.)
    const formatData: Record<string, {
      count: number;
      totalSpend: number;
      totalImpressions: number;
      totalClicks: number;
      totalConversions: number;
      ctr: number;
      cpc: number;
      cpa: number;
      conversionRate: number;
    }> = {};
    
    // Essayer de déterminer le format à partir des données disponibles
    for (const item of data) {
      let format = 'unknown';
      
      // Utiliser directement le format s'il est disponible
      if (item.ad_format) {
        format = String(item.ad_format).toLowerCase();
      } 
      // Utiliser la position si disponible
      else if (item.placement) {
        format = String(item.placement).toLowerCase();
      }
      // Essayer de le déduire des données disponibles
      else {
        // Formats courants pour Facebook
        const fbFormats = ['feed', 'stories', 'right_column', 'marketplace', 'search', 'video_feeds', 'instant_article', 'instream'];
        const itemStr = JSON.stringify(item).toLowerCase();
        
        for (const fmt of fbFormats) {
          if (itemStr.includes(fmt)) {
            format = fmt;
            break;
          }
        }
      }
      
      if (!formatData[format]) {
        formatData[format] = {
          count: 0,
          totalSpend: 0,
          totalImpressions: 0,
          totalClicks: 0,
          totalConversions: 0,
          ctr: 0,
          cpc: 0,
          cpa: 0,
          conversionRate: 0
        };
      }
      
      formatData[format].count++;
      formatData[format].totalSpend += item.spend || 0;
      formatData[format].totalImpressions += item.impressions || 0;
      formatData[format].totalClicks += item.clicks || 0;
      formatData[format].totalConversions += item.conversions || 0;
    }
    
    // Calculer les métriques dérivées
    for (const format in formatData) {
      const stats = formatData[format];
      stats.ctr = stats.totalImpressions > 0 ? (stats.totalClicks / stats.totalImpressions) * 100 : 0;
      stats.cpc = stats.totalClicks > 0 ? stats.totalSpend / stats.totalClicks : 0;
      stats.cpa = stats.totalConversions > 0 ? stats.totalSpend / stats.totalConversions : 0;
      stats.conversionRate = stats.totalClicks > 0 ? (stats.totalConversions / stats.totalClicks) * 100 : 0;
    }
    
    // Tendances par appareil si disponible
    const devicePerformance: Record<string, {
      count: number;
      ctr: number;
      cpc: number;
      cpa: number;
      conversionRate: number;
    }> = {};
    
    // Regrouper par appareil
    for (const item of data) {
      if (!item.device) continue;
      
      const device = String(item.device).toLowerCase();
      
      if (!devicePerformance[device]) {
        devicePerformance[device] = {
          count: 0,
          ctr: 0,
          cpc: 0,
          cpa: 0,
          conversionRate: 0
        };
      }
      
      devicePerformance[device].count++;
      if (item.ctr) devicePerformance[device].ctr += item.ctr;
      if (item.cpc) devicePerformance[device].cpc += item.cpc;
      if (item.cpa) devicePerformance[device].cpa += item.cpa;
      if (item.conversionRate) devicePerformance[device].conversionRate += item.conversionRate;
    }
    
    // Calculer les moyennes
    for (const device in devicePerformance) {
      const stats = devicePerformance[device];
      if (stats.count > 0) {
        stats.ctr /= stats.count;
        stats.cpc /= stats.count;
        stats.cpa /= stats.count;
        stats.conversionRate /= stats.count;
      }
    }
    
    return {
      formatData,
      devicePerformance
    };
  }
  
  /**
   * Génère des insights basés sur l'analyse des créatifs
   */
  private generateInsights(creativePerformance: any, formatTrends: any): any[] {
    const insights = [];
    
    // Insight sur le meilleur type de créatif pour le CTR
    if (creativePerformance.ranking.ctr.length > 0) {
      const bestCtrType = creativePerformance.ranking.ctr[0];
      const bestCtrValue = creativePerformance.performance[bestCtrType].ctr;
      
      insights.push({
        title: `Les créatifs de type "${bestCtrType}" génèrent le meilleur taux de clic`,
        description: `Les annonces de type "${bestCtrType}" ont un CTR moyen de ${bestCtrValue.toFixed(2)}%, ce qui est supérieur aux autres types de créatifs.`,
        importance: 0.8,
        metrics: [{
          name: 'CTR',
          value: bestCtrValue,
          trend: 'up'
        }]
      });
    }
    
    // Insight sur le meilleur type de créatif pour le taux de conversion
    if (creativePerformance.ranking.conversionRate.length > 0) {
      const bestConvType = creativePerformance.ranking.conversionRate[0];
      const bestConvValue = creativePerformance.performance[bestConvType].conversionRate;
      
      insights.push({
        title: `Les créatifs de type "${bestConvType}" convertissent mieux`,
        description: `Les annonces de type "${bestConvType}" ont un taux de conversion moyen de ${bestConvValue.toFixed(2)}%, ce qui est supérieur aux autres types de créatifs.`,
        importance: 0.9,
        metrics: [{
          name: 'Taux de conversion',
          value: bestConvValue,
          trend: 'up'
        }]
      });
    }
    
    // Insight sur le format le plus économique
    const formatEntries = Object.entries(formatTrends.formatData);
    if (formatEntries.length > 0) {
      // Trouver le format avec le meilleur CPA (coût par acquisition)
      const bestCpaFormat = formatEntries
        .filter(([_, stats]) => (stats as any).totalConversions > 0)
        .sort(([, a], [, b]) => (a as any).cpa - (b as any).cpa)[0];
      
      if (bestCpaFormat) {
        const [formatName, stats] = bestCpaFormat;
        insights.push({
          title: `Le format "${formatName}" offre le meilleur coût par acquisition`,
          description: `Les annonces au format "${formatName}" ont un CPA moyen de ${(stats as any).cpa.toFixed(2)}€, ce qui est inférieur aux autres formats.`,
          importance: 0.85,
          metrics: [{
            name: 'CPA',
            value: (stats as any).cpa,
            trend: 'down'
          }]
        });
      }
    }
    
    // Insight sur la performance par appareil
    const deviceEntries = Object.entries(formatTrends.devicePerformance);
    if (deviceEntries.length > 0) {
      // Trouver l'appareil avec le meilleur taux de conversion
      const bestConvDevice = deviceEntries
        .sort(([, a], [, b]) => (b as any).conversionRate - (a as any).conversionRate)[0];
      
      if (bestConvDevice) {
        const [deviceName, stats] = bestConvDevice;
        insights.push({
          title: `Les appareils "${deviceName}" convertissent mieux`,
          description: `Les annonces vues sur des appareils "${deviceName}" ont un taux de conversion moyen de ${(stats as any).conversionRate.toFixed(2)}%, ce qui est supérieur aux autres appareils.`,
          importance: 0.75,
          metrics: [{
            name: 'Taux de conversion',
            value: (stats as any).conversionRate,
            trend: 'up'
          }]
        });
      }
    }
    
    // Insight général sur les créatifs
    insights.push({
      title: 'Répartition des types de créatifs',
      description: `Vos campagnes utilisent ${Object.keys(creativePerformance.performance).length} types de créatifs différents, avec une prédominance ${this.getMostCommonCreativeType(creativePerformance.performance)}.`,
      importance: 0.7,
      metrics: []
    });
    
    return insights;
  }
  
  /**
   * Trouve le type de créatif le plus courant
   */
  private getMostCommonCreativeType(performance: Record<string, { count: number; [key: string]: any }>): string {
    let maxCount = 0;
    let mostCommonType = 'inconnu';
    
    for (const [type, stats] of Object.entries(performance)) {
      if (stats.count > maxCount) {
        maxCount = stats.count;
        mostCommonType = type;
      }
    }
    
    return `des créatifs de type "${mostCommonType}" (${maxCount} annonces)`;
  }
  
  /**
   * Prépare les visualisations pour l'affichage
   */
  private prepareVisualizations(creativePerformance: any, formatTrends: any): any[] {
    const visualizations = [];
    
    // Graphique de comparaison des CTR par type de créatif
    const ctrByType = {
      labels: Object.keys(creativePerformance.performance),
      values: Object.values(creativePerformance.performance).map((stats: any) => stats.ctr)
    };
    
    visualizations.push({
      type: 'bar',
      title: 'Taux de clic (CTR) par type de créatif',
      description: 'Ce graphique compare le taux de clic moyen de chaque type de créatif',
      config: {
        xAxis: {
          label: 'Type de créatif'
        },
        yAxis: {
          label: 'CTR (%)'
        },
        colors: ['#4e79a7']
      },
      data: {
        labels: ctrByType.labels,
        datasets: [{
          name: 'CTR (%)',
          data: ctrByType.values
        }]
      }
    });
    
    // Graphique de comparaison des taux de conversion par type de créatif
    const convRateByType = {
      labels: Object.keys(creativePerformance.performance),
      values: Object.values(creativePerformance.performance).map((stats: any) => stats.conversionRate)
    };
    
    visualizations.push({
      type: 'bar',
      title: 'Taux de conversion par type de créatif',
      description: 'Ce graphique compare le taux de conversion moyen de chaque type de créatif',
      config: {
        xAxis: {
          label: 'Type de créatif'
        },
        yAxis: {
          label: 'Taux de conversion (%)'
        },
        colors: ['#f28e2c']
      },
      data: {
        labels: convRateByType.labels,
        datasets: [{
          name: 'Taux de conversion (%)',
          data: convRateByType.values
        }]
      }
    });
    
    // Graphique de comparaison des coûts par type de créatif
    visualizations.push({
      type: 'bar',
      title: 'Coûts par type de créatif',
      description: 'Ce graphique compare le coût par clic (CPC) et le coût par acquisition (CPA) de chaque type de créatif',
      config: {
        xAxis: {
          label: 'Type de créatif'
        },
        yAxis: {
          label: 'Coût (€)'
        },
        series: [
          { name: 'CPC (€)', color: '#e15759' },
          { name: 'CPA (€)', color: '#76b7b2' }
        ]
      },
      data: {
        labels: Object.keys(creativePerformance.performance),
        datasets: [
          {
            name: 'CPC (€)',
            data: Object.values(creativePerformance.performance).map((stats: any) => stats.cpc)
          },
          {
            name: 'CPA (€)',
            data: Object.values(creativePerformance.performance).map((stats: any) => stats.cpa)
          }
        ]
      }
    });
    
    // Graphique de répartition des formats
    const formatData = formatTrends.formatData;
    visualizations.push({
      type: 'pie',
      title: 'Répartition des formats publicitaires',
      description: 'Ce graphique montre la répartition des dépenses par format publicitaire',
      config: {
        colors: ['#4e79a7', '#f28e2c', '#e15759', '#76b7b2', '#59a14f', '#af7aa1']
      },
      data: {
        labels: Object.keys(formatData),
        datasets: [{
          name: 'Dépenses',
          data: Object.values(formatData).map((stats: any) => stats.totalSpend)
        }]
      }
    });
    
    return visualizations;
  }
  
  /**
   * Extrait les données relatives aux créatifs
   */
  private extractCreativeData(data: AdvertisingData[]): AdvertisingData[] {
    // Extraire seulement les données qui contiennent des informations sur les créatifs
    return data.filter(item => {
      // Vérifier si l'élément contient des informations sur les créatifs
      const hasCreativeInfo = item.creative_type || 
                             item.ad_format || 
                             item.ad_name || 
                             item.placement;
      
      return hasCreativeInfo;
    });
  }
  
  /**
   * Calcule la complétude des données
   */
  private calculateDataCompleteness(data: AdvertisingData[]): number {
    // Champs utiles pour l'analyse des créatifs
    const creativeFields = ['creative_type', 'ad_format', 'ad_name', 'placement', 'device'];
    const performanceFields = ['impressions', 'clicks', 'conversions', 'spend'];
    
    const allFields = [...creativeFields, ...performanceFields];
    let completeness = 0;
    
    for (const item of data) {
      let itemCompleteness = 0;
      
      // Vérifier au moins un champ créatif
      let hasAnyCreativeField = false;
      for (const field of creativeFields) {
        if (item[field] !== undefined && item[field] !== null) {
          hasAnyCreativeField = true;
          break;
        }
      }
      
      if (hasAnyCreativeField) {
        itemCompleteness++;
      }
      
      // Vérifier les champs de performance
      for (const field of performanceFields) {
        if (item[field] !== undefined && item[field] !== null) {
          itemCompleteness++;
        }
      }
      
      completeness += itemCompleteness / (performanceFields.length + 1); // +1 pour le flag de champ créatif
    }
    
    return data.length > 0 ? completeness / data.length : 0;
  }

  private initializeMetrics(): CreativeMetrics {
    return {
      impressions: 0,
      clicks: 0,
      conversions: 0,
      spend: 0,
      reach: 0,
      frequency: 0,
      ctr: 0,
      cpc: 0,
      costPerClick: 0,
      conversionRate: 0,
      cpa: 0,
      costPerConversion: 0,
      roas: 0,
      engagementRate: 0,
      engagement: 0,
      shareRate: 0,
      commentRate: 0,
      saveRate: 0,
      revenue: 0
    };
  }

  private updateMetrics(metrics: CreativeMetrics, data: any): void {
    metrics.impressions += data.impressions || 0;
    metrics.clicks += data.clicks || 0;
    
    // S'assurer que les conversions sont des entiers
    const conversion = data.conversions ? Math.round(Number(data.conversions)) : 0;
    metrics.conversions += conversion;
    
    metrics.spend += data.spend || 0;
    metrics.revenue += data.revenue || 0;
    metrics.reach += data.reach || 0;
    metrics.frequency += data.frequency || 0;
    metrics.engagement += data.engagement || 0;
    metrics.shareRate += data.shareRate || 0;
    metrics.commentRate += data.commentRate || 0;
    metrics.saveRate += data.saveRate || 0;

    // Calcul des métriques dérivées
    metrics.ctr = metrics.impressions > 0 ? (metrics.clicks / metrics.impressions) * 100 : 0;
    metrics.cpc = metrics.clicks > 0 ? metrics.spend / metrics.clicks : 0;
    metrics.conversionRate = metrics.clicks > 0 ? (metrics.conversions / metrics.clicks) * 100 : 0;
    metrics.cpa = metrics.conversions > 0 ? metrics.spend / metrics.conversions : 0;
    
    // Calcul du ROAS avec revenu réel
    metrics.roas = metrics.spend > 0 ? (metrics.revenue / metrics.spend) * 100 : 0;
    
    metrics.engagementRate = metrics.reach > 0 ? (metrics.engagement / metrics.reach) * 100 : 0;
  }
} 