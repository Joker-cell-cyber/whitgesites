import { AdvertisingData, Platform } from '../types/data-types';
import Papa from 'papaparse';

/**
 * Lit et parse un fichier CSV en données structurées
 */
export async function readCsvFile(file: File): Promise<AdvertisingData[]> {
  // Validation du fichier
  if (!file) {
    throw new Error('Aucun fichier fourni pour l\'importation');
  }

  // Vérifier le type de fichier
  if (!file.name.toLowerCase().endsWith('.csv')) {
    throw new Error('Format de fichier non supporté. Veuillez importer un fichier CSV.');
  }

  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          // Vérifier que le fichier contient des données
          if (!results.data || !Array.isArray(results.data) || results.data.length === 0) {
            reject(new Error('Le fichier CSV est vide ou ne contient pas de données valides'));
            return;
          }

          console.log(`Nombre total de lignes dans le CSV: ${results.data.length}`);
          console.log('Premières lignes du CSV:', results.data.slice(0, 5));

          // Vérifier les erreurs de parsing
          if (results.errors && results.errors.length > 0) {
            console.warn('Avertissements lors du parsing CSV:', results.errors);
          }

          // Traitement préalable pour s'assurer que les conversions sont des entiers
          const preprocessedData = results.data.map((row: any, index: number) => {
            if (row.conversions !== undefined && row.conversions !== null) {
              const conversionValue = Math.round(Number(row.conversions));
              console.log(`Ligne ${index + 1}: Conversion ${row.conversions} -> ${conversionValue}`);
              row.conversions = conversionValue;
            }
            return row;
          });

          // Normaliser les noms de colonnes pour notre système
          const normalizedData = normalizeColumnNames(preprocessedData);
          console.log('Données après normalisation:', normalizedData.slice(0, 5));

          // Valider les données essentielles
          validateEssentialData(normalizedData);

          // Enrichir les données avec les métriques calculées si nécessaire
          const enrichedData = enrichDataWithCalculatedMetrics(normalizedData);
          
          const totalConversions = enrichedData.reduce((sum, row) => sum + (row.conversions || 0), 0);
          console.log(`Total des conversions après traitement: ${totalConversions}`);
          
          resolve(enrichedData);
        } catch (error) {
          reject(error instanceof Error ? error : new Error('Erreur lors du traitement des données'));
        }
      },
      error: (error) => {
        reject(new Error(`Erreur lors de la lecture du fichier CSV: ${error.message}`));
      },
    });
  });
}

/**
 * Valide que les données essentielles sont présentes
 */
function validateEssentialData(data: AdvertisingData[]): void {
  if (data.length === 0) {
    throw new Error('Aucune donnée à analyser après normalisation');
  }

  // Vérifier les champs essentiels sur au moins 80% des lignes
  const requiredFields = ['date', 'spend', 'impressions', 'clicks'];
  const dataQuality = requiredFields.map(field => {
    const filledCount = data.filter(row => row[field] !== undefined && row[field] !== null && row[field] !== '').length;
    const percentage = (filledCount / data.length) * 100;
    return { field, percentage };
  });

  const lowQualityFields = dataQuality.filter(item => item.percentage < 80);
  
  if (lowQualityFields.length > 0) {
    const fieldsInfo = lowQualityFields.map(f => `${f.field} (${f.percentage.toFixed(1)}%)`).join(', ');
    throw new Error(`Données incomplètes: les champs suivants sont manquants dans une proportion importante: ${fieldsInfo}`);
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
    const filledCount = data.filter(row => row[field] !== undefined && row[field] !== null && row[field] !== '').length;
    const percentage = (filledCount / data.length) * 100;
    return { field, percentage };
  });
  
  const missingRecommendedFields = recommendedFieldsQuality.filter(item => item.percentage < 50);
  
  if (missingRecommendedFields.length > 0) {
    const fieldsInfo = missingRecommendedFields.map(f => f.field).join(', ');
    console.warn(`Recommandation: Pour une analyse plus complète, envisagez d'inclure les champs suivants dans votre importation: ${fieldsInfo}`);
  }
}

/**
 * Enrichir les données avec des métriques calculées si elles sont manquantes
 */
function enrichDataWithCalculatedMetrics(data: AdvertisingData[]): AdvertisingData[] {
  console.log('Début enrichDataWithCalculatedMetrics');
  console.log('Nombre de lignes à traiter:', data.length);
  
  const enrichedData = data.map((row, index) => {
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
    
    // Traitement spécial pour les conversions
    const originalConversion = row.conversions;
    console.log(`Ligne ${index + 1} - Conversion originale:`, originalConversion);
    
    if (originalConversion === undefined || originalConversion === null) {
      console.log(`Ligne ${index + 1} - Pas de conversion`);
      enrichedRow.conversions = 0;
    } else {
      const conversionValue = Math.round(Number(originalConversion));
      console.log(`Ligne ${index + 1} - Conversion convertie:`, conversionValue);
      enrichedRow.conversions = conversionValue;
    }
    
    // Assurer que le revenu est un nombre
    enrichedRow.revenue = typeof row.revenue === 'number'
      ? row.revenue
      : (row.revenue ? parseFloat(String(row.revenue)) : 0);
    
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
    
    // Calculer ROAS si manquant mais revenu disponible
    if (!row.roas && enrichedRow.spend > 0 && enrichedRow.revenue) {
      enrichedRow.roas = (enrichedRow.revenue / enrichedRow.spend) * 100;
    }
    
    // Calculer Fréquence si manquante mais reach disponible
    if (!row.frequency && row.reach && enrichedRow.impressions > 0) {
      enrichedRow.frequency = enrichedRow.impressions / (row.reach as number);
    }
    
    return enrichedRow;
  });
  
  // Calculer le total des conversions
  const totalConversions = enrichedData.reduce((sum, row) => sum + (row.conversions || 0), 0);
  console.log('Total des conversions après enrichissement:', totalConversions);
  
  return enrichedData;
}

/**
 * Normalise les noms de colonnes pour notre système
 * Différentes plateformes utilisent des noms différents pour les mêmes concepts
 */
function normalizeColumnNames(data: any[]): AdvertisingData[] {
  // Mapping des noms de colonnes vers des noms standardisés
  const columnMapping: Record<string, string> = {
    // Facebook
    'date_start': 'date',
    'fb_campaign_name': 'campaign_name',
    'fb_adset_name': 'adset_name',
    'fb_ad_name': 'ad_name',
    'fb_spend': 'spend',
    'fb_impressions': 'impressions',
    'fb_clicks': 'clicks',
    'fb_conversions': 'conversions',
    'conversions': 'conversions',
    'fb_ctr': 'ctr',
    'fb_cpc': 'cpc',
    'fb_cpp': 'cpp',
    'fb_frequency': 'frequency',
    'fb_reach': 'reach',
    'fb_cpm': 'cpm',
    'bid_strategy': 'campaign_bid_strategy',
    'budget_type': 'campaign_budget_type',
    'buying_type': 'campaign_buying_type',
    'objective': 'campaign_objective',
    'optimization_goal': 'campaign_optimization_goal',
    'bid_amount': 'adset_bid_amount',
    'frequency_cap': 'adset_frequency_cap',
    'video_p25_watched_actions': 'video_views_25',
    'video_p50_watched_actions': 'video_views_50',
    'video_p75_watched_actions': 'video_views_75',
    'video_p100_watched_actions': 'video_views_100',
    
    // Google Ads
    'day': 'date',
    'google_campaign': 'campaign_name',
    'ad_group': 'adset_name',
    'headline': 'ad_name',
    'google_cost': 'spend',
    'google_impr': 'impressions',
    'google_clicks': 'clicks',
    'google_conv': 'conversions',
    
    // LinkedIn
    'date_range': 'date',
    'campaign_group_name': 'campaign_name',
    'li_creative_name': 'ad_name',
    'linkedin_spend': 'spend',
    'linkedin_impressions': 'impressions',
    'linkedin_clicks': 'clicks',
    'linkedin_conversions': 'conversions',
    
    // TikTok
    'stat_time_day': 'date',
    'tiktok_campaign': 'campaign_name',
    'tiktok_adgroup': 'adset_name',
    'tiktok_ad': 'ad_name',
    'tiktok_cost': 'spend',
    'tiktok_impressions': 'impressions',
    'tiktok_clicks': 'clicks',
    'tiktok_conversions': 'conversions',
    'tiktok_ctr': 'ctr',
    'tiktok_cpc': 'cpc',
    'video_play_actions': 'video_views',
    'video_watched_2s': 'video_views_2s',
    'video_watched_6s': 'video_views_6s'
  };

  // Créer une carte de correspondance pour la détection heuristique
  const keywordMap: Record<string, string> = {
    'date': 'date',
    'time': 'date',
    'day': 'date',
    'period': 'date',
    'campaign': 'campaign_name',
    'ad_group': 'adset_name',
    'adgroup': 'adset_name',
    'adset': 'adset_name',
    'creative': 'ad_name',
    'ad': 'ad_name',
    'headline': 'ad_name',
    'spend': 'spend',
    'cost': 'spend',
    'impr': 'impressions',
    'impression': 'impressions',
    'click': 'clicks',
    'conv': 'conversions',
    'conversion': 'conversions',
    'purchase': 'conversions',
    'frequency': 'frequency',
    'freq': 'frequency',
    'reach': 'reach',
    'cpm': 'cpm',
    'bid_strategy': 'campaign_bid_strategy',
    'bidding': 'campaign_bid_strategy',
    'budget_type': 'campaign_budget_type',
    'buying_type': 'campaign_buying_type',
    'objective': 'campaign_objective',
    'optimization_goal': 'campaign_optimization_goal',
    'frequency_cap': 'adset_frequency_cap'
  };
  
  // Log des colonnes originales
  console.log('Colonnes originales:', Object.keys(data[0]));
  
  // Vérifier si la colonne 'conversions' existe déjà
  const hasConversionsColumn = data[0] && 'conversions' in data[0];
  console.log('Colonne conversions existante:', hasConversionsColumn);
  
  // Si la colonne existe, afficher les premières valeurs
  if (hasConversionsColumn) {
    console.log('Valeurs des conversions (5 premières lignes):');
    for (let i = 0; i < Math.min(5, data.length); i++) {
      console.log(`Ligne ${i+1}: ${data[i].conversions}`);
    }
    
    // Calculer le total des conversions avant normalisation
    const totalRawConversions = data.reduce((sum, row) => {
      const convValue = row.conversions !== undefined && row.conversions !== null ? 
        Number(row.conversions) : 0;
      return sum + convValue;
    }, 0);
    console.log('Total des conversions avant normalisation:', totalRawConversions);
  }
  
  // Normaliser les données
  const normalizedData = data.map((row, idx) => {
    const normalizedRow: Record<string, any> = {};
    const normalizedKeys = new Map<string, string>();
    
    // Vérifier d'abord si la colonne conversions existe déjà et la copier directement
    if ('conversions' in row) {
      normalizedRow.conversions = row.conversions;
      console.log(`Ligne ${idx+1}: Copie directe de conversion: ${row.conversions}`);
    }
    
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
          // Éviter les faux positifs (ex: "ad_id" ne devrait pas correspondre à "ad_name")
          if (keyword === 'ad' && (lowerCaseKey.includes('id') || lowerCaseKey.includes('adset'))) {
            continue;
          }
          
          // Éviter que "adgroup" ne corresponde à la fois à "adset_name" et "ad_name"
          if (keyword === 'ad' && lowerCaseKey.includes('group')) {
            continue;
          }
          
          normalizedKeys.set(key, normalizedKey);
          break;
        }
      }
    }
    
    // Appliquer les clés normalisées
    for (const [originalKey, normalizedKey] of normalizedKeys.entries()) {
      // Ne pas écraser la valeur de conversions déjà copiée
      if (normalizedKey === 'conversions' && 'conversions' in normalizedRow) {
        continue;
      }
      normalizedRow[normalizedKey] = row[originalKey];
    }
    
    // Conserver les clés originales non mappées
    for (const key of Object.keys(row)) {
      if (!normalizedKeys.has(key) && !(key === 'conversions' && 'conversions' in normalizedRow)) {
        normalizedRow[key] = row[key];
      }
    }
    
    return normalizedRow as AdvertisingData;
  });
  
  // Log des colonnes normalisées
  console.log('Colonnes normalisées:', Object.keys(normalizedData[0]));
  
  // Vérifier les conversions
  console.log('Première ligne - conversions:', normalizedData[0].conversions);
  console.log('Type de conversions:', typeof normalizedData[0].conversions);
  
  // Calculer le total des conversions après normalisation
  const totalNormalizedConversions = normalizedData.reduce((sum, row) => {
    const convValue = row.conversions !== undefined && row.conversions !== null ? 
      Number(row.conversions) : 0;
    return sum + convValue;
  }, 0);
  console.log('Total des conversions après normalisation:', totalNormalizedConversions);
  
  return normalizedData;
}

/**
 * Détecte le format du fichier importé
 */
export function detectFileFormat(fileName: string): string {
  const extension = fileName.split('.').pop()?.toLowerCase() || '';
  
  if (extension === 'csv') return 'csv';
  if (extension === 'xlsx' || extension === 'xls') return 'excel';
  if (extension === 'json') return 'json';
  
  return 'unknown';
}

/**
 * Détecte la plateforme publicitaire à partir des données importées
 */
export function detectPlatform(data: AdvertisingData[]): Platform {
  // Nous nous concentrons uniquement sur les données Facebook Ads
  return 'facebook';
} 