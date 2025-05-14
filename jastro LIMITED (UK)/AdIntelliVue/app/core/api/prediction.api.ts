/**
 * API pour exposer le service de prédiction
 */

import { PredictionService } from '../services/prediction.service';
import { AdvertisingData } from '../types/analytics-types';
import { 
  PredictionOptions, 
  PredictionResult
} from '../types/prediction-types';

/**
 * Classe qui expose les fonctionnalités du service de prédiction via API
 */
export class PredictionAPI {
  private predictionService: PredictionService;
  
  constructor() {
    this.predictionService = new PredictionService();
  }
  
  /**
   * Génère des prédictions basées sur les données historiques et les options spécifiées
   */
  public async generatePredictions(
    data: AdvertisingData[],
    options: PredictionOptions
  ): Promise<{
    success: boolean;
    data?: PredictionResult[];
    error?: string;
    timestamp: string;
  }> {
    try {
      // Validation des données
      if (!data || !Array.isArray(data) || data.length === 0) {
        return {
          success: false,
          error: 'Données publicitaires invalides ou manquantes',
          timestamp: new Date().toISOString()
        };
      }

      if (!options) {
        return {
          success: false,
          error: 'Options de prédiction manquantes',
          timestamp: new Date().toISOString()
        };
      }
      
      // Vérification supplémentaire des options
      if (!options.predictionType) {
        return {
          success: false,
          error: 'Type de prédiction non spécifié',
          timestamp: new Date().toISOString()
        };
      }
      
      if (!options.timeHorizon) {
        return {
          success: false,
          error: 'Horizon temporel non spécifié',
          timestamp: new Date().toISOString()
        };
      }
      
      if (!options.platform) {
        return {
          success: false,
          error: 'Plateforme non spécifiée',
          timestamp: new Date().toISOString()
        };
      }
      
      // Appel au service de prédiction
      const results = await this.predictionService.generatePredictions(data, options);
      
      return {
        success: true,
        data: results,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Erreur lors de la génération des prédictions:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue lors de la génération des prédictions',
        timestamp: new Date().toISOString()
      };
    }
  }
  
  /**
   * Récupère des informations sur les capacités de prédiction disponibles
   */
  public getPredictionCapabilities(): {
    predictionTypes: Array<{
      id: string;
      name: string;
      description: string;
    }>;
    timeHorizons: Array<{
      id: string;
      name: string;
      description: string;
    }>;
    platforms: string[];
    features: {
      seasonalityAnalysis: boolean;
      confidenceIntervals: boolean;
      recommendations: boolean;
    };
  } {
    return {
      predictionTypes: [
        { 
          id: 'performance', 
          name: 'Performance', 
          description: 'Prédiction des métriques clés de performance (CTR, CPC, CPA, taux de conversion)' 
        },
        { 
          id: 'budget', 
          name: 'Budget', 
          description: 'Prédiction de l\'impact des changements de budget sur les performances' 
        },
        { 
          id: 'audience', 
          name: 'Audience', 
          description: 'Prédiction des performances par segment d\'audience' 
        },
        { 
          id: 'creative', 
          name: 'Créatifs', 
          description: 'Prédiction des performances des différents types de créatifs' 
        }
      ],
      timeHorizons: [
        { 
          id: '1month', 
          name: '1 mois', 
          description: 'Prédictions pour les 30 prochains jours' 
        },
        { 
          id: '3months', 
          name: '3 mois', 
          description: 'Prédictions pour les 90 prochains jours' 
        },
        { 
          id: '6months', 
          name: '6 mois', 
          description: 'Prédictions pour les 180 prochains jours' 
        },
        { 
          id: '12months', 
          name: '12 mois', 
          description: 'Prédictions pour les 365 prochains jours' 
        }
      ],
      platforms: ['Facebook', 'Google', 'LinkedIn', 'Twitter', 'TikTok', 'Autres'],
      features: {
        seasonalityAnalysis: true,
        confidenceIntervals: true,
        recommendations: true
      }
    };
  }
} 