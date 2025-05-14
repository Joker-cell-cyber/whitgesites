/**
 * Module d'analyse d'audience publicitaire
 */

import { AdvertisingData, AnalysisResult } from '../../types/analytics-types';
import { AnalysisModule } from '../analysis-module-manager';
import { v4 as uuidv4 } from 'uuid';
import { AudienceMetrics } from '../../types/audience-metrics';
import { AudienceSegment } from '../../types/audience-segment';

export class AudienceAnalysisModule implements AnalysisModule {
  id: string = 'audience-analysis';
  name: string = 'Analyse d\'audience';
  description: string = 'Analyse les performances des annonces par segments d\'audience (âge, genre, localisation, etc.)';
  category: 'audience' = 'audience';
  icon: string = 'Users';
  estimatedTime: number = 20; // secondes
  tokenCost: number = 2;
  
  /**
   * Exécute l'analyse d'audience
   */
  public async execute(data: AdvertisingData[], options?: any): Promise<AnalysisResult> {
    // Validation des données
    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new Error('Données publicitaires invalides ou manquantes pour l\'analyse d\'audience');
    }
    
    try {
      // Analyser les données par segment démographique
      const demographicAnalysis = this.analyzeDemographics(data);
      
      // Analyser les données par appareil
      const deviceAnalysis = this.analyzeDevices(data);
      
      // Identifier les segments les plus performants
      const topSegments = this.identifyTopSegments(demographicAnalysis, deviceAnalysis);
      
      // Générer des insights
      const insights = this.generateInsights(demographicAnalysis, deviceAnalysis, topSegments, data);
      
      // Préparer les visualisations
      const visualizations = this.prepareVisualizations(demographicAnalysis, deviceAnalysis);
      
      return {
        id: uuidv4(),
        title: 'Analyse des audiences publicitaires',
        description: 'Analyse complète des performances publicitaires par segment d\'audience',
        analysisType: 'audience',
        generatedAt: new Date().toISOString(),
        insights,
        visualizations,
        data: {
          demographicAnalysis,
          deviceAnalysis,
          topSegments
        },
        quality: {
          dataPoints: data.length,
          reliability: this.calculateReliability(data),
          completeness: this.calculateDataCompleteness(data)
        }
      };
    } catch (error) {
      console.error('Erreur lors de l\'analyse d\'audience:', error);
      throw error instanceof Error 
        ? error 
        : new Error('Erreur lors de l\'analyse d\'audience');
    }
  }
  
  /**
   * Analyse les performances par segment démographique (âge, genre)
   */
  private analyzeDemographics(data: AdvertisingData[]): any {
    // Initialiser les résultats
    const ageGroups: Record<string, {
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
    
    const genderGroups: Record<string, {
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
    
    // Age groups mapping
    const ageGroupsMap: Record<string, string> = {
      '13-17': '13-17',
      '18-24': '18-24',
      '25-34': '25-34',
      '35-44': '35-44',
      '45-54': '45-54',
      '55-64': '55-64',
      '65+': '65+',
      'unknown': 'Inconnu'
    };
    
    // Gender mapping
    const genderMap: Record<string, string> = {
      'male': 'Homme',
      'female': 'Femme',
      'unknown': 'Inconnu'
    };
    
    // Initialiser les groupes d'âge connus
    for (const ageGroup of Object.values(ageGroupsMap)) {
      ageGroups[ageGroup] = {
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
    
    // Initialiser les groupes de genre connus
    for (const gender of Object.values(genderMap)) {
      genderGroups[gender] = {
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
    
    // Agréger les données par groupe d'âge et genre
    for (const item of data) {
      // Déterminer le groupe d'âge
      let ageGroup = 'Inconnu';
      if (item.age) {
        const age = String(item.age).toLowerCase();
        ageGroup = ageGroupsMap[age] || 'Inconnu';
      }
      
      // Déterminer le genre
      let gender = 'Inconnu';
      if (item.gender) {
        const genderValue = String(item.gender).toLowerCase();
        gender = genderMap[genderValue] || 'Inconnu';
      }
      
      // Agréger pour le groupe d'âge
      ageGroups[ageGroup].count++;
      ageGroups[ageGroup].totalSpend += item.spend || 0;
      ageGroups[ageGroup].totalImpressions += item.impressions || 0;
      ageGroups[ageGroup].totalClicks += item.clicks || 0;
      ageGroups[ageGroup].totalConversions += item.conversions || 0;
      
      // Agréger pour le genre
      genderGroups[gender].count++;
      genderGroups[gender].totalSpend += item.spend || 0;
      genderGroups[gender].totalImpressions += item.impressions || 0;
      genderGroups[gender].totalClicks += item.clicks || 0;
      genderGroups[gender].totalConversions += item.conversions || 0;
    }
    
    // Calculer les métriques dérivées pour les groupes d'âge
    for (const ageGroup in ageGroups) {
      const stats = ageGroups[ageGroup];
      if (stats.totalImpressions > 0) {
        stats.ctr = (stats.totalClicks / stats.totalImpressions) * 100;
      }
      if (stats.totalClicks > 0) {
        stats.cpc = stats.totalSpend / stats.totalClicks;
        stats.conversionRate = (stats.totalConversions / stats.totalClicks) * 100;
      }
      if (stats.totalConversions > 0) {
        stats.cpa = stats.totalSpend / stats.totalConversions;
      }
    }
    
    // Calculer les métriques dérivées pour les genres
    for (const gender in genderGroups) {
      const stats = genderGroups[gender];
      if (stats.totalImpressions > 0) {
        stats.ctr = (stats.totalClicks / stats.totalImpressions) * 100;
      }
      if (stats.totalClicks > 0) {
        stats.cpc = stats.totalSpend / stats.totalClicks;
        stats.conversionRate = (stats.totalConversions / stats.totalClicks) * 100;
      }
      if (stats.totalConversions > 0) {
        stats.cpa = stats.totalSpend / stats.totalConversions;
      }
    }
    
    // Calculer les classements par performance
    const ageRankings = {
      ctr: Object.entries(ageGroups)
        .filter(([_, stats]) => stats.totalImpressions > 0 && stats.count > 0)
        .sort(([, a], [, b]) => b.ctr - a.ctr)
        .map(([group]) => group),
      conversionRate: Object.entries(ageGroups)
        .filter(([_, stats]) => stats.totalClicks > 0 && stats.count > 0)
        .sort(([, a], [, b]) => b.conversionRate - a.conversionRate)
        .map(([group]) => group),
      cpa: Object.entries(ageGroups)
        .filter(([_, stats]) => stats.totalConversions > 0 && stats.count > 0)
        .sort(([, a], [, b]) => a.cpa - b.cpa)
        .map(([group]) => group)
    };
    
    const genderRankings = {
      ctr: Object.entries(genderGroups)
        .filter(([_, stats]) => stats.totalImpressions > 0 && stats.count > 0)
        .sort(([, a], [, b]) => b.ctr - a.ctr)
        .map(([group]) => group),
      conversionRate: Object.entries(genderGroups)
        .filter(([_, stats]) => stats.totalClicks > 0 && stats.count > 0)
        .sort(([, a], [, b]) => b.conversionRate - a.conversionRate)
        .map(([group]) => group),
      cpa: Object.entries(genderGroups)
        .filter(([_, stats]) => stats.totalConversions > 0 && stats.count > 0)
        .sort(([, a], [, b]) => a.cpa - b.cpa)
        .map(([group]) => group)
    };
    
    return {
      ageGroups,
      genderGroups,
      ageRankings,
      genderRankings
    };
  }
  
  /**
   * Analyse les performances par appareil
   */
  private analyzeDevices(data: AdvertisingData[]): any {
    // Initialiser les résultats
    const devices: Record<string, {
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
    
    // Liste des types d'appareils courants
    const knownDevices = [
      'desktop', 'mobile', 'tablet', 'smartphone', 
      'feature_phone', 'console', 'tv', 'unknown'
    ];
    
    // Initialiser les appareils connus
    for (const device of knownDevices) {
      devices[device] = {
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
    
    // Agréger les données par appareil
    for (const item of data) {
      if (!item.device) continue;
      
      // Normaliser le type d'appareil
      let deviceType = String(item.device).toLowerCase();
      
      // Faire correspondre à un type connu si possible
      let matchedDevice = false;
      for (const knownDevice of knownDevices) {
        if (deviceType.includes(knownDevice)) {
          deviceType = knownDevice;
          matchedDevice = true;
          break;
        }
      }
      
      // Si aucune correspondance, utiliser 'unknown'
      if (!matchedDevice) {
        deviceType = 'unknown';
      }
      
      // Agréger pour l'appareil
      if (!devices[deviceType]) {
        devices[deviceType] = {
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
      
      devices[deviceType].count++;
      devices[deviceType].totalSpend += item.spend || 0;
      devices[deviceType].totalImpressions += item.impressions || 0;
      devices[deviceType].totalClicks += item.clicks || 0;
      devices[deviceType].totalConversions += item.conversions || 0;
    }
    
    // Calculer les métriques dérivées
    for (const device in devices) {
      const stats = devices[device];
      if (stats.totalImpressions > 0) {
        stats.ctr = (stats.totalClicks / stats.totalImpressions) * 100;
      }
      if (stats.totalClicks > 0) {
        stats.cpc = stats.totalSpend / stats.totalClicks;
        stats.conversionRate = (stats.totalConversions / stats.totalClicks) * 100;
      }
      if (stats.totalConversions > 0) {
        stats.cpa = stats.totalSpend / stats.totalConversions;
      }
    }
    
    // Calculer les classements par performance
    const deviceRankings = {
      ctr: Object.entries(devices)
        .filter(([_, stats]) => stats.totalImpressions > 0 && stats.count > 0)
        .sort(([, a], [, b]) => b.ctr - a.ctr)
        .map(([device]) => device),
      conversionRate: Object.entries(devices)
        .filter(([_, stats]) => stats.totalClicks > 0 && stats.count > 0)
        .sort(([, a], [, b]) => b.conversionRate - a.conversionRate)
        .map(([device]) => device),
      cpa: Object.entries(devices)
        .filter(([_, stats]) => stats.totalConversions > 0 && stats.count > 0)
        .sort(([, a], [, b]) => a.cpa - b.cpa)
        .map(([device]) => device)
    };
    
    return {
      devices,
      deviceRankings
    };
  }
  
  /**
   * Identifie les segments les plus performants
   */
  private identifyTopSegments(demographicAnalysis: any, deviceAnalysis: any): any {
    // Top segments for CTR
    const topCtrSegments = [];
    
    // Age groups with highest CTR
    if (demographicAnalysis.ageRankings.ctr.length > 0) {
      const topAgeGroup = demographicAnalysis.ageRankings.ctr[0];
      if (demographicAnalysis.ageGroups[topAgeGroup].count > 0) {
        topCtrSegments.push({
          type: 'age',
          segment: topAgeGroup,
          metric: 'ctr',
          value: demographicAnalysis.ageGroups[topAgeGroup].ctr,
          count: demographicAnalysis.ageGroups[topAgeGroup].count
        });
      }
    }
    
    // Gender with highest CTR
    if (demographicAnalysis.genderRankings.ctr.length > 0) {
      const topGender = demographicAnalysis.genderRankings.ctr[0];
      if (demographicAnalysis.genderGroups[topGender].count > 0) {
        topCtrSegments.push({
          type: 'gender',
          segment: topGender,
          metric: 'ctr',
          value: demographicAnalysis.genderGroups[topGender].ctr,
          count: demographicAnalysis.genderGroups[topGender].count
        });
      }
    }
    
    // Device with highest CTR
    if (deviceAnalysis.deviceRankings.ctr.length > 0) {
      const topDevice = deviceAnalysis.deviceRankings.ctr[0];
      if (deviceAnalysis.devices[topDevice].count > 0) {
        topCtrSegments.push({
          type: 'device',
          segment: topDevice,
          metric: 'ctr',
          value: deviceAnalysis.devices[topDevice].ctr,
          count: deviceAnalysis.devices[topDevice].count
        });
      }
    }
    
    // Top segments for Conversion Rate
    const topConversionSegments = [];
    
    // Age groups with highest conversion rate
    if (demographicAnalysis.ageRankings.conversionRate.length > 0) {
      const topAgeGroup = demographicAnalysis.ageRankings.conversionRate[0];
      if (demographicAnalysis.ageGroups[topAgeGroup].count > 0) {
        topConversionSegments.push({
          type: 'age',
          segment: topAgeGroup,
          metric: 'conversionRate',
          value: demographicAnalysis.ageGroups[topAgeGroup].conversionRate,
          count: demographicAnalysis.ageGroups[topAgeGroup].count
        });
      }
    }
    
    // Gender with highest conversion rate
    if (demographicAnalysis.genderRankings.conversionRate.length > 0) {
      const topGender = demographicAnalysis.genderRankings.conversionRate[0];
      if (demographicAnalysis.genderGroups[topGender].count > 0) {
        topConversionSegments.push({
          type: 'gender',
          segment: topGender,
          metric: 'conversionRate',
          value: demographicAnalysis.genderGroups[topGender].conversionRate,
          count: demographicAnalysis.genderGroups[topGender].count
        });
      }
    }
    
    // Device with highest conversion rate
    if (deviceAnalysis.deviceRankings.conversionRate.length > 0) {
      const topDevice = deviceAnalysis.deviceRankings.conversionRate[0];
      if (deviceAnalysis.devices[topDevice].count > 0) {
        topConversionSegments.push({
          type: 'device',
          segment: topDevice,
          metric: 'conversionRate',
          value: deviceAnalysis.devices[topDevice].conversionRate,
          count: deviceAnalysis.devices[topDevice].count
        });
      }
    }
    
    // Top segments for Cost Efficiency (CPA)
    const topCostEfficiencySegments = [];
    
    // Age groups with lowest CPA
    if (demographicAnalysis.ageRankings.cpa.length > 0) {
      const topAgeGroup = demographicAnalysis.ageRankings.cpa[0];
      if (demographicAnalysis.ageGroups[topAgeGroup].count > 0) {
        topCostEfficiencySegments.push({
          type: 'age',
          segment: topAgeGroup,
          metric: 'cpa',
          value: demographicAnalysis.ageGroups[topAgeGroup].cpa,
          count: demographicAnalysis.ageGroups[topAgeGroup].count
        });
      }
    }
    
    // Gender with lowest CPA
    if (demographicAnalysis.genderRankings.cpa.length > 0) {
      const topGender = demographicAnalysis.genderRankings.cpa[0];
      if (demographicAnalysis.genderGroups[topGender].count > 0) {
        topCostEfficiencySegments.push({
          type: 'gender',
          segment: topGender,
          metric: 'cpa',
          value: demographicAnalysis.genderGroups[topGender].cpa,
          count: demographicAnalysis.genderGroups[topGender].count
        });
      }
    }
    
    // Device with lowest CPA
    if (deviceAnalysis.deviceRankings.cpa.length > 0) {
      const topDevice = deviceAnalysis.deviceRankings.cpa[0];
      if (deviceAnalysis.devices[topDevice].count > 0) {
        topCostEfficiencySegments.push({
          type: 'device',
          segment: topDevice,
          metric: 'cpa',
          value: deviceAnalysis.devices[topDevice].cpa,
          count: deviceAnalysis.devices[topDevice].count
        });
      }
    }
    
    return {
      topCtrSegments,
      topConversionSegments,
      topCostEfficiencySegments
    };
  }
  
  /**
   * Génère des insights sur l'audience
   */
  private generateInsights(demographicAnalysis: any, deviceAnalysis: any, topSegments: any, data: AdvertisingData[]): any[] {
    const insights = [];
    
    // Insight sur le groupe d'âge le plus performant en termes de taux de conversion
    if (topSegments.topConversionSegments.length > 0) {
      const bestAgeSegment = topSegments.topConversionSegments.find(
        (segment: any) => segment.type === 'age'
      );
      
      if (bestAgeSegment) {
        insights.push({
          title: `Les ${bestAgeSegment.segment} ont le meilleur taux de conversion`,
          description: `Le groupe d'âge ${bestAgeSegment.segment} a un taux de conversion de ${bestAgeSegment.value.toFixed(2)}%, ce qui est supérieur aux autres tranches d'âge.`,
          importance: 0.9,
          metrics: [{
            name: 'Taux de conversion',
            value: bestAgeSegment.value,
            trend: 'up'
          }]
        });
      }
    }
    
    // Insight sur le genre le plus performant en termes de taux de conversion
    if (topSegments.topConversionSegments.length > 0) {
      const bestGenderSegment = topSegments.topConversionSegments.find(
        (segment: any) => segment.type === 'gender'
      );
      
      if (bestGenderSegment) {
        insights.push({
          title: `Les ${bestGenderSegment.segment}s ont un meilleur taux de conversion`,
          description: `Les annonces ciblant les ${bestGenderSegment.segment}s ont un taux de conversion de ${bestGenderSegment.value.toFixed(2)}%, ce qui est supérieur à la moyenne.`,
          importance: 0.85,
          metrics: [{
            name: 'Taux de conversion',
            value: bestGenderSegment.value,
            trend: 'up'
          }]
        });
      }
    }
    
    // Insight sur l'appareil le plus performant
    if (topSegments.topConversionSegments.length > 0) {
      const bestDeviceSegment = topSegments.topConversionSegments.find(
        (segment: any) => segment.type === 'device'
      );
      
      if (bestDeviceSegment) {
        insights.push({
          title: `Les appareils ${bestDeviceSegment.segment} convertissent mieux`,
          description: `Les annonces vues sur des appareils ${bestDeviceSegment.segment} ont un taux de conversion de ${bestDeviceSegment.value.toFixed(2)}%, ce qui est supérieur aux autres appareils.`,
          importance: 0.8,
          metrics: [{
            name: 'Taux de conversion',
            value: bestDeviceSegment.value,
            trend: 'up'
          }]
        });
      }
    }
    
    // Insight sur le segment avec le meilleur rapport coût-efficacité
    if (topSegments.topCostEfficiencySegments.length > 0) {
      const mostEfficientSegment = topSegments.topCostEfficiencySegments.reduce(
        (best: any, current: any) => {
          if (!best || current.value < best.value) {
            return current;
          }
          return best;
        },
        null
      );
      
      if (mostEfficientSegment) {
        let segmentName = '';
        switch (mostEfficientSegment.type) {
          case 'age':
            segmentName = `le groupe d'âge ${mostEfficientSegment.segment}`;
            break;
          case 'gender':
            segmentName = `les ${mostEfficientSegment.segment}s`;
            break;
          case 'device':
            segmentName = `les appareils ${mostEfficientSegment.segment}`;
            break;
        }
        
        insights.push({
          title: `${segmentName.charAt(0).toUpperCase() + segmentName.slice(1)} offre le meilleur coût par acquisition`,
          description: `Les annonces ciblant ${segmentName} ont un CPA moyen de ${mostEfficientSegment.value.toFixed(2)}€, ce qui représente le meilleur rapport coût-efficacité.`,
          importance: 0.95,
          metrics: [{
            name: 'CPA',
            value: mostEfficientSegment.value,
            trend: 'down'
          }]
        });
      }
    }
    
    // Insight sur la répartition des tranches d'âge
    const ageDistribution = Object.entries(demographicAnalysis.ageGroups)
      .map(([age, stats]: [string, any]) => ({
        age,
        count: stats.count,
        percentage: stats.count / data.reduce((sum: number, _) => sum + 1, 0) * 100
      }))
      .filter(item => item.count > 0)
      .sort((a, b) => b.count - a.count);
    
    if (ageDistribution.length > 0) {
      const topAgeGroup = ageDistribution[0];
      
      insights.push({
        title: 'Répartition des audiences par âge',
        description: `La tranche d'âge ${topAgeGroup.age} est la plus représentée dans vos données, constituant ${topAgeGroup.percentage.toFixed(1)}% des impressions.`,
        importance: 0.7,
        metrics: []
      });
    }
    
    return insights;
  }
  
  /**
   * Prépare les visualisations pour l'affichage
   */
  private prepareVisualizations(demographicAnalysis: any, deviceAnalysis: any): any[] {
    const visualizations = [];
    
    // Graphique de CTR par groupe d'âge
    const ctrByAge = {
      labels: Object.keys(demographicAnalysis.ageGroups),
      values: Object.values(demographicAnalysis.ageGroups).map((stats: any) => stats.ctr)
    };
    
    visualizations.push({
      type: 'bar',
      title: 'Taux de clic (CTR) par tranche d\'âge',
      description: 'Ce graphique compare le taux de clic moyen pour chaque tranche d\'âge',
      config: {
        xAxis: {
          label: 'Tranche d\'âge'
        },
        yAxis: {
          label: 'CTR (%)'
        },
        colors: ['#4e79a7']
      },
      data: {
        labels: ctrByAge.labels,
        datasets: [{
          name: 'CTR (%)',
          data: ctrByAge.values
        }]
      }
    });
    
    // Graphique de taux de conversion par groupe d'âge
    const convRateByAge = {
      labels: Object.keys(demographicAnalysis.ageGroups),
      values: Object.values(demographicAnalysis.ageGroups).map((stats: any) => stats.conversionRate)
    };
    
    visualizations.push({
      type: 'bar',
      title: 'Taux de conversion par tranche d\'âge',
      description: 'Ce graphique compare le taux de conversion moyen pour chaque tranche d\'âge',
      config: {
        xAxis: {
          label: 'Tranche d\'âge'
        },
        yAxis: {
          label: 'Taux de conversion (%)'
        },
        colors: ['#f28e2c']
      },
      data: {
        labels: convRateByAge.labels,
        datasets: [{
          name: 'Taux de conversion (%)',
          data: convRateByAge.values
        }]
      }
    });
    
    // Graphique de CPA par genre
    const cpaByGender = {
      labels: Object.keys(demographicAnalysis.genderGroups),
      values: Object.values(demographicAnalysis.genderGroups).map((stats: any) => stats.cpa)
    };
    
    visualizations.push({
      type: 'bar',
      title: 'Coût par acquisition (CPA) par genre',
      description: 'Ce graphique compare le coût par acquisition pour chaque genre',
      config: {
        xAxis: {
          label: 'Genre'
        },
        yAxis: {
          label: 'CPA (€)'
        },
        colors: ['#e15759']
      },
      data: {
        labels: cpaByGender.labels,
        datasets: [{
          name: 'CPA (€)',
          data: cpaByGender.values
        }]
      }
    });
    
    // Graphique de répartition des impressions par appareil
    const impressionsByDevice = {
      labels: Object.keys(deviceAnalysis.devices),
      values: Object.values(deviceAnalysis.devices).map((stats: any) => stats.totalImpressions)
    };
    
    visualizations.push({
      type: 'pie',
      title: 'Répartition des impressions par appareil',
      description: 'Ce graphique montre la répartition des impressions par type d\'appareil',
      config: {
        colors: ['#4e79a7', '#f28e2c', '#e15759', '#76b7b2', '#59a14f', '#af7aa1']
      },
      data: {
        labels: impressionsByDevice.labels,
        datasets: [{
          name: 'Impressions',
          data: impressionsByDevice.values
        }]
      }
    });
    
    // Graphique comparatif des métriques de performance par appareil
    visualizations.push({
      type: 'bar',
      title: 'Performance par type d\'appareil',
      description: 'Ce graphique compare le taux de clic et le taux de conversion pour chaque type d\'appareil',
      config: {
        xAxis: {
          label: 'Type d\'appareil'
        },
        yAxis: {
          label: 'Taux (%)'
        },
        series: [
          { name: 'CTR (%)', color: '#4e79a7' },
          { name: 'Taux de conversion (%)', color: '#f28e2c' }
        ]
      },
      data: {
        labels: Object.keys(deviceAnalysis.devices),
        datasets: [
          {
            name: 'CTR (%)',
            data: Object.values(deviceAnalysis.devices).map((stats: any) => stats.ctr)
          },
          {
            name: 'Taux de conversion (%)',
            data: Object.values(deviceAnalysis.devices).map((stats: any) => stats.conversionRate)
          }
        ]
      }
    });
    
    return visualizations;
  }
  
  /**
   * Calcule la fiabilité de l'analyse
   */
  private calculateReliability(data: AdvertisingData[]): number {
    // Compter les entrées avec des données démographiques
    let entriesWithDemographics = 0;
    let entriesWithDevice = 0;
    
    for (const item of data) {
      if (item.age || item.gender) {
        entriesWithDemographics++;
      }
      
      if (item.device) {
        entriesWithDevice++;
      }
    }
    
    // Calculer les ratios de couverture
    const demographicCoverage = data.length > 0 ? entriesWithDemographics / data.length : 0;
    const deviceCoverage = data.length > 0 ? entriesWithDevice / data.length : 0;
    
    // La fiabilité globale est une moyenne pondérée des couvertures
    return (0.6 * demographicCoverage + 0.4 * deviceCoverage);
  }
  
  /**
   * Calcule la complétude des données
   */
  private calculateDataCompleteness(data: AdvertisingData[]): number {
    // Champs utiles pour l'analyse d'audience
    const audienceFields = ['age', 'gender', 'device'];
    const performanceFields = ['impressions', 'clicks', 'conversions', 'spend'];
    
    const allFields = [...audienceFields, ...performanceFields];
    let completeness = 0;
    
    for (const item of data) {
      let fieldsPresent = 0;
      
      for (const field of allFields) {
        if (item[field] !== undefined && item[field] !== null) {
          fieldsPresent++;
        }
      }
      
      completeness += fieldsPresent / allFields.length;
    }
    
    return data.length > 0 ? completeness / data.length : 0;
  }

  private analyzeAudiences(data: AdvertisingData[]): any {
    const audienceAnalysis = {
      demographics: {
        age: {} as Record<string, AudienceMetrics>,
        gender: {} as Record<string, AudienceMetrics>,
        location: {} as Record<string, AudienceMetrics>
      },
      behavior: {
        interests: [] as AudienceMetrics[],
        engagement: {} as Record<string, AudienceMetrics>,
        conversion: {} as Record<string, AudienceMetrics>
      },
      segments: {
        highValue: [] as AudienceSegment[],
        atRisk: [] as AudienceSegment[],
        growth: [] as AudienceSegment[]
      }
    };

    // Analyse démographique
    data.forEach(item => {
      // Analyse par âge
      if (item.age_range) {
        if (!audienceAnalysis.demographics.age[item.age_range]) {
          audienceAnalysis.demographics.age[item.age_range] = this.initializeAudienceMetrics();
        }
        this.updateAudienceMetrics(audienceAnalysis.demographics.age[item.age_range], item);
      }

      // Analyse par genre
      if (item.gender) {
        if (!audienceAnalysis.demographics.gender[item.gender]) {
          audienceAnalysis.demographics.gender[item.gender] = this.initializeAudienceMetrics();
        }
        this.updateAudienceMetrics(audienceAnalysis.demographics.gender[item.gender], item);
      }

      // Analyse par localisation
      if (item.country) {
        if (!audienceAnalysis.demographics.location[item.country]) {
          audienceAnalysis.demographics.location[item.country] = this.initializeAudienceMetrics();
        }
        this.updateAudienceMetrics(audienceAnalysis.demographics.location[item.country], item);
      }
    });

    // Analyse comportementale
    this.analyzeBehavioralData(data, audienceAnalysis);

    // Segmentation des audiences
    this.segmentAudiences(audienceAnalysis);

    return audienceAnalysis;
  }

  private analyzeBehavioralData(data: AdvertisingData[], analysis: any): void {
    // Analyse des intérêts
    const interestMetrics: Record<string, AudienceMetrics> = {};
    data.forEach(item => {
      if (item.interests) {
        const interests = item.interests.split(',').map((i: string) => i.trim());
        interests.forEach((interest: string) => {
          if (!interestMetrics[interest]) {
            interestMetrics[interest] = this.initializeAudienceMetrics();
          }
          this.updateAudienceMetrics(interestMetrics[interest], item);
        });
      }
    });

    // Conversion en tableau trié par performance
    analysis.behavior.interests = Object.entries(interestMetrics)
      .map(([interest, metrics]) => ({
        name: interest,
        ...metrics
      }))
      .sort((a, b) => b.conversionRate - a.conversionRate);

    // Analyse de l'engagement
    data.forEach(item => {
      if (item.engagement_type) {
        if (!analysis.behavior.engagement[item.engagement_type]) {
          analysis.behavior.engagement[item.engagement_type] = this.initializeAudienceMetrics();
        }
        this.updateAudienceMetrics(analysis.behavior.engagement[item.engagement_type], item);
      }
    });

    // Analyse des conversions
    data.forEach(item => {
      if (item.conversion_type) {
        if (!analysis.behavior.conversion[item.conversion_type]) {
          analysis.behavior.conversion[item.conversion_type] = this.initializeAudienceMetrics();
        }
        this.updateAudienceMetrics(analysis.behavior.conversion[item.conversion_type], item);
      }
    });
  }

  private segmentAudiences(analysis: any): void {
    // Segmentation par valeur
    Object.entries(analysis.demographics.age).forEach(([age, metrics]: [string, any]) => {
      if (metrics.conversionRate > 2 && metrics.roas > 2) {
        analysis.segments.highValue.push({
          type: 'age',
          value: age,
          metrics,
          insight: `Segment d'âge ${age} montrant une excellente performance avec un ROAS de ${metrics.roas.toFixed(2)}`
        });
      }
    });

    // Segmentation à risque
    Object.entries(analysis.demographics.age).forEach(([age, metrics]: [string, any]) => {
      if (metrics.conversionRate < 0.5 && metrics.roas < 1) {
        analysis.segments.atRisk.push({
          type: 'age',
          value: age,
          metrics,
          insight: `Segment d'âge ${age} nécessitant une attention particulière avec un ROAS de ${metrics.roas.toFixed(2)}`
        });
      }
    });

    // Segmentation croissance
    Object.entries(analysis.demographics.age).forEach(([age, metrics]: [string, any]) => {
      if (metrics.conversionRate > 1 && metrics.roas > 1.5) {
        analysis.segments.growth.push({
          type: 'age',
          value: age,
          metrics,
          insight: `Segment d'âge ${age} avec un potentiel de croissance (ROAS: ${metrics.roas.toFixed(2)})`
        });
      }
    });
  }

  private initializeAudienceMetrics(): AudienceMetrics {
    return {
      reach: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      spend: 0,
      ctr: 0,
      cpc: 0,
      costPerClick: 0,
      conversionRate: 0,
      cpa: 0,
      costPerConversion: 0,
      roas: 0,
      engagementRate: 0,
      frequency: 0,
      revenue: 0
    };
  }

  private updateAudienceMetrics(metrics: AudienceMetrics, data: AdvertisingData): void {
    metrics.impressions += data.impressions || 0;
    metrics.clicks += data.clicks || 0;
    
    // S'assurer que les conversions sont des entiers
    const conversion = data.conversions ? Math.round(Number(data.conversions)) : 0;
    metrics.conversions += conversion;
    
    metrics.spend += data.spend || 0;
    metrics.revenue += data.revenue || 0;
    
    // Calcul des métriques dérivées
    metrics.ctr = metrics.impressions > 0 ? (metrics.clicks / metrics.impressions) * 100 : 0;
    metrics.cpc = metrics.clicks > 0 ? metrics.spend / metrics.clicks : 0;
    metrics.conversionRate = metrics.clicks > 0 ? (metrics.conversions / metrics.clicks) * 100 : 0;
    metrics.cpa = metrics.conversions > 0 ? metrics.spend / metrics.conversions : 0;
    
    // Calcul du ROAS avec revenu réel
    metrics.roas = metrics.spend > 0 ? (metrics.revenue / metrics.spend) * 100 : 0;
  }
} 