/**
 * Gestionnaire de modules d'analyse
 * Permet d'exécuter différents types d'analyses de manière modulaire
 */

import { AdvertisingData } from '../types/analytics-types';
import { AnalysisResult } from '../types/analytics-types';
import { v4 as uuidv4 } from 'uuid';

/**
 * Interface pour un module d'analyse
 */
export interface AnalysisModule {
  id: string;
  name: string;
  description: string;
  category: 'performance' | 'creative' | 'audience' | 'budget' | 'seasonality' | 'predictive';
  icon: string;
  estimatedTime: number; // en secondes
  tokenCost: number;
  execute: (data: AdvertisingData[], options?: any) => Promise<AnalysisResult>;
}

/**
 * Interface pour le stockage des résultats d'analyse
 */
export interface AnalysisResultsStore {
  storeResult: (moduleId: string, result: AnalysisResult) => void;
  getResult: (moduleId: string) => AnalysisResult | null;
  getAllResults: () => Record<string, AnalysisResult>;
  hasResult: (moduleId: string) => boolean;
  clearResults: () => void;
}

/**
 * Implémentation du stockage des résultats basée sur localStorage
 */
export class LocalStorageAnalysisResultsStore implements AnalysisResultsStore {
  private storageKey: string;
  
  constructor(userId: string) {
    this.storageKey = `analysis_results_${userId}`;
  }
  
  public storeResult(moduleId: string, result: AnalysisResult): void {
    const currentResults = this.getAllResults();
    currentResults[moduleId] = result;
    
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.storageKey, JSON.stringify(currentResults));
    }
  }
  
  public getResult(moduleId: string): AnalysisResult | null {
    const results = this.getAllResults();
    return results[moduleId] || null;
  }
  
  public getAllResults(): Record<string, AnalysisResult> {
    if (typeof localStorage === 'undefined') {
      return {};
    }
    
    const storedResults = localStorage.getItem(this.storageKey);
    return storedResults ? JSON.parse(storedResults) : {};
  }
  
  public hasResult(moduleId: string): boolean {
    return this.getResult(moduleId) !== null;
  }
  
  public clearResults(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.storageKey);
    }
  }
}

/**
 * Gestionnaire des modules d'analyse
 */
export class AnalysisModuleManager {
  private modules: AnalysisModule[] = [];
  private resultsStore: AnalysisResultsStore;
  private data: AdvertisingData[] = [];
  
  constructor(resultsStore: AnalysisResultsStore) {
    this.resultsStore = resultsStore;
  }
  
  /**
   * Charge les données à analyser
   */
  public loadData(data: AdvertisingData[]): void {
    this.data = data;
  }
  
  /**
   * Enregistre un module d'analyse
   */
  public registerModule(module: AnalysisModule): void {
    this.modules.push(module);
  }
  
  /**
   * Enregistre plusieurs modules d'analyse
   */
  public registerModules(modules: AnalysisModule[]): void {
    modules.forEach(module => this.registerModule(module));
  }
  
  /**
   * Récupère tous les modules disponibles
   */
  public getModules(): AnalysisModule[] {
    return [...this.modules];
  }
  
  /**
   * Exécute un module d'analyse spécifique
   */
  public async executeModule(moduleId: string, options?: any): Promise<AnalysisResult> {
    const module = this.modules.find(m => m.id === moduleId);
    
    if (!module) {
      throw new Error(`Module d'analyse ${moduleId} non trouvé`);
    }
    
    if (!this.data || this.data.length === 0) {
      throw new Error('Aucune donnée chargée pour l\'analyse');
    }
    
    try {
      // Exécuter le module
      const result = await module.execute(this.data, options);
      
      // Stocker le résultat
      this.resultsStore.storeResult(moduleId, result);
      
      return result;
    } catch (error) {
      console.error(`Erreur lors de l'exécution du module ${module.name}:`, error);
      throw error instanceof Error 
        ? error 
        : new Error(`Erreur lors de l'exécution du module ${module.name}`);
    }
  }
  
  /**
   * Vérifie si un module a déjà été exécuté
   */
  public hasModuleResult(moduleId: string): boolean {
    return this.resultsStore.hasResult(moduleId);
  }
  
  /**
   * Récupère le résultat d'un module
   */
  public getModuleResult(moduleId: string): AnalysisResult | null {
    return this.resultsStore.getResult(moduleId);
  }
  
  /**
   * Récupère tous les résultats
   */
  public getAllResults(): Record<string, AnalysisResult> {
    return this.resultsStore.getAllResults();
  }
  
  /**
   * Générer un rapport global à partir de tous les résultats disponibles
   */
  public generateGlobalReport(): AnalysisResult {
    const results = this.resultsStore.getAllResults();
    const moduleResults = Object.values(results);
    
    if (moduleResults.length === 0) {
      throw new Error('Aucun résultat d\'analyse disponible pour générer un rapport global');
    }
    
    // Combiner les résultats de tous les modules
    const globalInsights = moduleResults.flatMap(result => result.insights || []);
    const globalVisualizations = moduleResults.flatMap(result => result.visualizations || []);
    
    // Créer un rapport global
    return {
      id: uuidv4(),
      title: 'Rapport d\'analyse global',
      description: 'Synthèse de toutes les analyses effectuées',
      analysisType: 'custom',
      generatedAt: new Date().toISOString(),
      insights: globalInsights,
      visualizations: globalVisualizations,
      data: moduleResults.map(result => ({
        moduleId: result.id,
        title: result.title,
        data: result.data
      })),
      quality: {
        dataPoints: Math.max(...moduleResults.map(result => result.quality?.dataPoints || 0)),
        reliability: moduleResults.reduce((sum, result) => sum + (result.quality?.reliability || 0), 0) / moduleResults.length,
        completeness: moduleResults.reduce((sum, result) => sum + (result.quality?.completeness || 0), 0) / moduleResults.length
      }
    };
  }
  
  /**
   * Efface tous les résultats stockés
   */
  public clearResults(): void {
    this.resultsStore.clearResults();
  }
} 