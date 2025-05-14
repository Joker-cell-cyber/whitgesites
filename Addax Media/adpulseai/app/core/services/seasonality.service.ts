/**
 * Service d'analyse de saisonnalité pour les données publicitaires
 * Permet de déterminer les effets saisonniers sur les performances marketing
 */

import { AdvertisingData } from '../types/analytics-types';
import { SeasonalityModel } from '../types/prediction-types';

export class SeasonalityService {
  /**
   * Analyse la saisonnalité des données publicitaires
   */
  public analyzeSeasonality(data: AdvertisingData[]): SeasonalityModel {
    // Validation des données
    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new Error('Données publicitaires invalides ou manquantes pour l\'analyse de saisonnalité');
    }
    
    try {
      // Extraction des informations de date
      const datesInfo = this.extractDatesInfo(data);
      
      // Analyse des motifs hebdomadaires
      const weeklyPatterns = this.analyzeWeeklyPatterns(data, datesInfo);
      
      // Analyse des motifs mensuels
      const monthlyPatterns = this.analyzeMonthlyPatterns(data, datesInfo);
      
      // Analyse des motifs trimestriels
      const quarterlyPatterns = this.analyzeQuarterlyPatterns(data, datesInfo);
      
      // Détection des événements spéciaux
      const specialEvents = this.detectSpecialEvents(data, datesInfo);
      
      return {
        weekly: weeklyPatterns.seasonalFactors,
        yearly: monthlyPatterns.seasonalFactors,
        quarterly: quarterlyPatterns.seasonalFactors,
        specialEvents: specialEvents.events
      };
    } catch (error) {
      console.error('Erreur lors de l\'analyse de saisonnalité:', error);
      throw error instanceof Error 
        ? error 
        : new Error('Erreur lors de l\'analyse de saisonnalité');
    }
  }
  
  /**
   * Extrait les informations de date des données
   */
  private extractDatesInfo(data: AdvertisingData[]) {
    // Compteur par jour de la semaine (0 = dimanche, 6 = samedi)
    const dayOfWeekCounts = Array(7).fill(0);
    
    // Compteur par mois (0 = janvier, 11 = décembre)
    const monthCounts = Array(12).fill(0);
    
    // Compteur par trimestre (0 = Q1, 3 = Q4)
    const quarterCounts = Array(4).fill(0);
    
    // Données par jour de la semaine, mois et trimestre
    const dataByDayOfWeek: Array<AdvertisingData[]> = Array(7).fill(null).map(() => []);
    const dataByMonth: Array<AdvertisingData[]> = Array(12).fill(null).map(() => []);
    const dataByQuarter: Array<AdvertisingData[]> = Array(4).fill(null).map(() => []);
    
    // Parcourir les données pour extraire les informations de date
    for (const item of data) {
      if (!item.date) continue;
      
      // Convertir en objet Date
      const date = typeof item.date === 'string' 
        ? new Date(item.date) 
        : item.date instanceof Date 
          ? item.date 
          : new Date(String(item.date));
      
      if (isNaN(date.getTime())) continue; // Ignorer les dates invalides
      
      // Jour de la semaine (0-6)
      const dayOfWeek = date.getDay();
      dayOfWeekCounts[dayOfWeek]++;
      dataByDayOfWeek[dayOfWeek].push(item);
      
      // Mois (0-11)
      const month = date.getMonth();
      monthCounts[month]++;
      dataByMonth[month].push(item);
      
      // Trimestre (0-3)
      const quarter = Math.floor(month / 3);
      quarterCounts[quarter]++;
      dataByQuarter[quarter].push(item);
    }
    
    return {
      dayOfWeekCounts,
      monthCounts,
      quarterCounts,
      dataByDayOfWeek,
      dataByMonth,
      dataByQuarter,
      totalItems: data.length
    };
  }
  
  /**
   * Analyse les motifs hebdomadaires
   */
  private analyzeWeeklyPatterns(
    data: AdvertisingData[],
    datesInfo: ReturnType<typeof this.extractDatesInfo>
  ) {
    // Calculer les valeurs moyennes par jour de la semaine
    const ctrByDayOfWeek = Array(7).fill(0);
    const cpcByDayOfWeek = Array(7).fill(0);
    const cpaByDayOfWeek = Array(7).fill(0);
    const conversionRateByDayOfWeek = Array(7).fill(0);
    
    for (let i = 0; i < 7; i++) {
      const dayData = datesInfo.dataByDayOfWeek[i];
      
      if (dayData.length === 0) continue;
      
      // Calculer les totaux pour ce jour
      const totalImpressions = dayData.reduce((sum, item) => sum + (item.impressions || 0), 0);
      const totalClicks = dayData.reduce((sum, item) => sum + (item.clicks || 0), 0);
      const totalConversions = dayData.reduce((sum, item) => sum + (item.conversions || 0), 0);
      const totalSpend = dayData.reduce((sum, item) => sum + (item.spend || 0), 0);
      
      // Calculer les moyennes
      ctrByDayOfWeek[i] = totalImpressions > 0 ? totalClicks / totalImpressions : 0;
      cpcByDayOfWeek[i] = totalClicks > 0 ? totalSpend / totalClicks : 0;
      cpaByDayOfWeek[i] = totalConversions > 0 ? totalSpend / totalConversions : 0;
      conversionRateByDayOfWeek[i] = totalClicks > 0 ? totalConversions / totalClicks : 0;
    }
    
    // Calculer les moyennes globales
    const avgCtr = this.calculateAverage(ctrByDayOfWeek);
    const avgCpc = this.calculateAverage(cpcByDayOfWeek);
    const avgCpa = this.calculateAverage(cpaByDayOfWeek);
    const avgConversionRate = this.calculateAverage(conversionRateByDayOfWeek);
    
    // Calculer les facteurs saisonniers
    const seasonalFactors = Array(7).fill(1);
    
    for (let i = 0; i < 7; i++) {
      if (datesInfo.dataByDayOfWeek[i].length === 0) continue;
      
      // Facteur basé sur CTR
      const ctrFactor = avgCtr > 0 ? ctrByDayOfWeek[i] / avgCtr : 1;
      
      // Facteur basé sur taux de conversion
      const conversionRateFactor = avgConversionRate > 0 
        ? conversionRateByDayOfWeek[i] / avgConversionRate 
        : 1;
      
      // Facteur basé sur CPA (inverse, car un CPA plus bas est meilleur)
      const cpaFactor = (avgCpa > 0 && cpaByDayOfWeek[i] > 0) 
        ? avgCpa / cpaByDayOfWeek[i] 
        : 1;
      
      // Facteur combiné (moyenne des facteurs)
      seasonalFactors[i] = (ctrFactor + conversionRateFactor + cpaFactor) / 3;
    }
    
    return {
      ctrByDayOfWeek,
      cpcByDayOfWeek,
      cpaByDayOfWeek,
      conversionRateByDayOfWeek,
      seasonalFactors
    };
  }
  
  /**
   * Analyse les motifs mensuels
   */
  private analyzeMonthlyPatterns(
    data: AdvertisingData[],
    datesInfo: ReturnType<typeof this.extractDatesInfo>
  ) {
    // Simplification: structure similaire à l'analyse hebdomadaire
    // Dans une implémentation complète, cette méthode serait plus sophistiquée
    // pour tenir compte des effets saisonniers mensuels
    
    // Facteurs saisonniers par défaut (neutre)
    const seasonalFactors = Array(12).fill(1);
    
    return {
      seasonalFactors
    };
  }
  
  /**
   * Analyse les motifs trimestriels
   */
  private analyzeQuarterlyPatterns(
    data: AdvertisingData[],
    datesInfo: ReturnType<typeof this.extractDatesInfo>
  ) {
    // Simplification: structure similaire à l'analyse hebdomadaire
    // Dans une implémentation complète, cette méthode serait plus sophistiquée
    // pour tenir compte des effets saisonniers trimestriels
    
    // Facteurs saisonniers par défaut (neutre)
    const seasonalFactors = Array(4).fill(1);
    
    return {
      seasonalFactors
    };
  }
  
  /**
   * Détecte les événements spéciaux
   */
  private detectSpecialEvents(
    data: AdvertisingData[],
    datesInfo: ReturnType<typeof this.extractDatesInfo>
  ) {
    // Simplification: structure vide pour les événements spéciaux
    // Dans une implémentation complète, cette méthode détecterait
    // les pics et creux anormaux, les jours fériés, etc.
    
    return {
      events: []
    };
  }
  
  /**
   * Calcule la moyenne d'un tableau de nombres
   */
  private calculateAverage(values: number[]): number {
    if (values.length === 0) return 0;
    
    const sum = values.reduce((total, val) => total + val, 0);
    return sum / values.length;
  }
} 