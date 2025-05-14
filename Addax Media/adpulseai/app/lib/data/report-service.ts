'use server';

/**
 * Service de génération de rapports publicitaires
 * 
 * Ce service gère la création, la génération et l'exportation de rapports
 * à partir des données d'analyse publicitaire.
 */

import OpenAI from 'openai';
import { AnalysisResult, Report, ExportOptions } from '../types/data-types';

// Initialiser le client OpenAI
const openai = new OpenAI({
  apiKey: "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",
});

/**
 * Génère un rapport basé sur les résultats d'analyse
 * @param analysisResult Résultats de l'analyse
 * @param title Titre du rapport
 * @param exportOptions Options d'exportation
 * @returns Rapport généré
 */
export async function generateReport(
  analysisResult: AnalysisResult,
  title: string,
  exportOptions: ExportOptions
): Promise<Report> {
  try {
    // Générer un ID unique pour le rapport
    const reportId = `report-${Date.now()}`;
    
    // Préparer les données du rapport
    const reportData = {
      id: reportId,
      title,
      createdAt: new Date().toISOString(),
      analysisId: analysisResult.id,
      format: exportOptions.format,
    };
    
    // Dans une implémentation réelle, vous généreriez ici le rapport
    // dans le format demandé (PDF, CSV, JSON)
    
    return reportData;
  } catch (error) {
    console.error("Erreur lors de la génération du rapport:", error);
    throw new Error("Une erreur est survenue lors de la génération du rapport.");
  }
}

/**
 * Génère un rapport détaillé au format markdown (qui peut être converti en PDF)
 * @param analysisResult Résultats de l'analyse
 * @param title Titre du rapport
 * @returns Contenu du rapport en markdown
 */
export async function generateMarkdownReport(
  analysisResult: AnalysisResult,
  title: string
): Promise<string> {
  try {
    // Construire le prompt pour l'IA
    const prompt = `
      Utilise les résultats d'analyse suivants pour générer un rapport détaillé au format markdown:
      
      ${JSON.stringify(analysisResult, null, 2)}
      
      Le titre du rapport est: "${title}"
      
      Le rapport doit inclure:
      - Un résumé exécutif
      - Les principales tendances identifiées
      - Des graphiques (décrits en markdown)
      - Des recommandations actionnables
      - Une conclusion
      
      Utilise un format professionnel et structuré.
    `;

    // Appeler l'API OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Tu es un expert en analyse de données publicitaires. Tu dois générer un rapport professionnel, détaillé et stratégique au format markdown."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.5,
      max_tokens: 4000,
    });

    return completion.choices[0].message.content || "Impossible de générer le rapport.";
  } catch (error) {
    console.error("Erreur lors de la génération du rapport markdown:", error);
    throw new Error("Une erreur est survenue lors de la génération du rapport markdown.");
  }
}

/**
 * Génère une version JSON du rapport
 * @param analysisResult Résultats de l'analyse
 * @returns Données JSON du rapport
 */
export function generateJsonReport(analysisResult: AnalysisResult): string {
  return JSON.stringify(analysisResult, null, 2);
}

/**
 * Génère une version CSV du rapport
 * (Version simplifiée pour l'exemple)
 * @param analysisResult Résultats de l'analyse
 * @returns Données CSV du rapport
 */
export function generateCsvReport(analysisResult: AnalysisResult): string {
  // Dans une implémentation réelle, vous utiliseriez une librairie comme papaparse
  // pour convertir les données en CSV
  
  // Exemple simplifié pour illustration:
  let csv = "metric,value\n";
  
  if (analysisResult.metrics) {
    Object.entries(analysisResult.metrics).forEach(([key, value]) => {
      csv += `${key},${value}\n`;
    });
  }
  
  return csv;
} 