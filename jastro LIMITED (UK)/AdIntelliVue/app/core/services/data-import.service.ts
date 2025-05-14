/**
 * Service d'importation et de normalisation des données publicitaires
 */

import { AdvertisingData, Platform } from '../models/analytics-types';

export class DataImportService {
  /**
   * Importe et analyse un fichier CSV de données publicitaires
   */
  async importFromCSV(file: File): Promise<{
    data: AdvertisingData[];
    platformDetected: Platform;
  }> {
    try {
      // Vérifier que le fichier est un CSV valide
      if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
        throw new Error('Le fichier doit être au format CSV');
      }

      // Lire le contenu du fichier
      const csvContent = await this.readFileContent(file);
      
      // Parser le CSV
      const parsedData = await this.parseCSV(csvContent);
      
      // Normaliser les noms de colonnes
      const normalizedData = this.normalizeColumnNames(parsedData);
      
      // Valider les données essentielles
      this.validateEssentialData(normalizedData);
      
      // Enrichir les données avec les métriques calculées
      const enrichedData = this.enrichDataWithCalculatedMetrics(normalizedData);
      
      // Détecter la plateforme
      const platformDetected = this.detectPlatform(enrichedData);
      
      return {
        data: enrichedData,
        platformDetected
      };
    } catch (error) {
      console.error('Erreur lors de l\'importation CSV:', error);
      throw error instanceof Error 
        ? error 
        : new Error('Erreur lors de l\'importation des données');
    }
  }

  /**
   * Lit le contenu d'un fichier
   */
  private async readFileContent(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        resolve(content);
      };
      reader.onerror = (e) => {
        reject(new Error('Erreur lors de la lecture du fichier'));
      };
      reader.readAsText(file);
    });
  }

  /**
   * Parse le contenu CSV en tableau d'objets
   */
  private async parseCSV(csvContent: string): Promise<any[]> {
    // Note: Dans une implémentation réelle, vous utiliseriez 
    // une bibliothèque comme PapaParse ou un équivalent
    // Pour simplifier, nous simulons le parsing ici
    
    return new Promise((resolve) => {
      // Simuler un appel à une bibliothèque de parsing CSV
      // Dans la réalité, vous utiliseriez:
      // Papa.parse(csvContent, {
      //   header: true,
      //   dynamicTyping: true,
      //   skipEmptyLines: true,
      //   complete: (results) => { resolve(results.data); }
      // });

      // Pour l'exemple, simulons un tableau de données
      const lines = csvContent.split('\n');
      const headers = lines[0].split(',').map(h => h.trim());
      
      const data = [];
      for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim() === '') continue;
        
        const values = lines[i].split(',').map(v => v.trim());
        const row: Record<string, any> = {};
        
        headers.forEach((header, index) => {
          // Convertir les nombres si possible
          const value = values[index];
          const numValue = parseFloat(value);
          row[header] = isNaN(numValue) ? value : numValue;
        });
        
        data.push(row);
      }
      
      resolve(data);
    });
  }

  /**
   * Normalise les noms de colonnes pour notre système
   */
  private normalizeColumnNames(data: any[]): AdvertisingData[] {
    // Mapping des noms de colonnes vers des noms standardisés
    const columnMapping: Record<string, string> = {
      // Facebook
      'date_start': 'date',
      'fb_campaign_name': 'campaign_name',
      'fb_adset_name': 'adset_name',
      'fb_ad_name': 'ad_name',
      'fb_spend': 'spend',
      // ... autres mappings
    };

    // Créer une carte de correspondance pour la détection heuristique
    const keywordMap: Record<string, string> = {
      'date': 'date',
      'campaign': 'campaign_name',
      'adset': 'adset_name',
      'ad': 'ad_name',
      'spend': 'spend',
      // ... autres mappings
    };

    // Normaliser les données
    return data.map(row => {
      const normalizedRow: Record<string, any> = {};
      const normalizedKeys = new Map<string, string>();
      
      // Parcourir toutes les clés de la ligne
      for (const key of Object.keys(row)) {
        const lowerCaseKey = key.toLowerCase();
        
        // Vérifier d'abord les correspondances exactes
        if (columnMapping[key]) {
          normalizedKeys.set(key, columnMapping[key]);
          continue;
        }
        
        // Sinon, essayer de détecter par mots-clés
        for (const [keyword, normalizedKey] of Object.entries(keywordMap)) {
          if (lowerCaseKey.includes(keyword)) {
            normalizedKeys.set(key, normalizedKey);
            break;
          }
        }
      }
      
      // Appliquer les clés normalisées
      for (const [originalKey, normalizedKey] of normalizedKeys.entries()) {
        normalizedRow[normalizedKey] = row[originalKey];
      }
      
      // Conserver les clés originales non mappées
      for (const key of Object.keys(row)) {
        if (!normalizedKeys.has(key)) {
          normalizedRow[key] = row[key];
        }
      }
      
      return normalizedRow as AdvertisingData;
    });
  }

  /**
   * Valide que les données essentielles sont présentes
   */
  private validateEssentialData(data: AdvertisingData[]): void {
    if (data.length === 0) {
      throw new Error('Aucune donnée à analyser après normalisation');
    }

    // Vérifier les champs essentiels sur au moins 80% des lignes
    const requiredFields = ['date', 'spend', 'impressions', 'clicks'];
    const dataQuality = requiredFields.map(field => {
      const filledCount = data.filter(row => 
        row[field] !== undefined && 
        row[field] !== null && 
        row[field] !== ''
      ).length;
      const percentage = (filledCount / data.length) * 100;
      return { field, percentage };
    });

    const lowQualityFields = dataQuality.filter(item => item.percentage < 80);
    
    if (lowQualityFields.length > 0) {
      const fieldsInfo = lowQualityFields
        .map(f => `${f.field} (${f.percentage.toFixed(1)}%)`)
        .join(', ');
      throw new Error(
        `Données incomplètes: les champs suivants sont manquants dans une proportion importante: ${fieldsInfo}`
      );
    }
    
    // Vérifier les champs importants recommandés
    const recommendedFields = [
      'conversions', 
      'frequency', 
      'reach', 
      'cpm',
      'campaign_bid_strategy',
      'campaign_budget_type'
    ];
    
    const recommendedFieldsQuality = recommendedFields.map(field => {
      const filledCount = data.filter(row => 
        row[field] !== undefined && 
        row[field] !== null && 
        row[field] !== ''
      ).length;
      const percentage = (filledCount / data.length) * 100;
      return { field, percentage };
    });
    
    const missingRecommendedFields = recommendedFieldsQuality.filter(item => item.percentage < 50);
    
    if (missingRecommendedFields.length > 0) {
      const fieldsInfo = missingRecommendedFields.map(f => f.field).join(', ');
      console.warn(
        `Recommandation: Pour une analyse plus complète, envisagez d'inclure les champs suivants dans votre importation: ${fieldsInfo}`
      );
    }
  }

  /**
   * Enrichit les données avec des métriques calculées si elles sont manquantes
   */
  private enrichDataWithCalculatedMetrics(data: AdvertisingData[]): AdvertisingData[] {
    return data.map(row => {
      const enrichedRow = { ...row };
      
      // Assurer que les valeurs numériques sont des nombres
      enrichedRow.spend = typeof row.spend === 'number' 
        ? row.spend 
        : (row.spend ? parseFloat(String(row.spend)) : 0);
      
      enrichedRow.impressions = typeof row.impressions === 'number' 
        ? row.impressions 
        : (row.impressions ? parseInt(String(row.impressions)) : 0);
      
      enrichedRow.clicks = typeof row.clicks === 'number' 
        ? row.clicks 
        : (row.clicks ? parseInt(String(row.clicks)) : 0);
      
      // S'assurer que les conversions sont des entiers
      enrichedRow.conversions = typeof row.conversions === 'number' 
        ? Math.round(row.conversions)  // Arrondir à l'entier le plus proche
        : (row.conversions ? Math.round(parseFloat(String(row.conversions))) : 0);
      
      // Calculer CTR si manquant
      if (!row.ctr && enrichedRow.impressions > 0) {
        enrichedRow.ctr = (enrichedRow.clicks / enrichedRow.impressions) * 100;
      }
      
      // Calculer CPC si manquant
      if (!row.cpc && enrichedRow.clicks > 0) {
        enrichedRow.cpc = enrichedRow.spend / enrichedRow.clicks;
      }
      
      // Calculer CPA si manquant
      if (!row.cpa && enrichedRow.conversions > 0) {
        enrichedRow.cpa = enrichedRow.spend / enrichedRow.conversions;
      }
      
      // Calculer taux de conversion si manquant
      if (!row.conversionRate && enrichedRow.clicks > 0) {
        enrichedRow.conversionRate = (enrichedRow.conversions / enrichedRow.clicks) * 100;
      }
      
      // Calculer CPM si manquant
      if (!row.cpm && enrichedRow.impressions > 0) {
        enrichedRow.cpm = (enrichedRow.spend / enrichedRow.impressions) * 1000;
      }
      
      // Calculer Fréquence si manquante mais reach disponible
      if (!row.frequency && row.reach && enrichedRow.impressions > 0) {
        enrichedRow.frequency = enrichedRow.impressions / (row.reach as number);
      }
      
      return enrichedRow;
    });
  }

  /**
   * Détecte la plateforme à partir des données
   */
  private detectPlatform(data: AdvertisingData[]): Platform {
    // Simplification pour l'exemple
    // Dans une implémentation réelle, vous auriez une logique plus sophistiquée
    
    // Vérifier si les noms de colonnes contiennent des indices spécifiques à Facebook
    const hasFacebookHints = data.some(row => 
      row.campaign_name?.toLowerCase().includes('fb') ||
      row.adset_name?.toLowerCase().includes('fb') ||
      Object.keys(row).some(key => key.toLowerCase().includes('facebook'))
    );
    
    if (hasFacebookHints) return 'facebook';
    
    // Par défaut, retourner Facebook pour cet exemple
    return 'facebook';
  }
} 