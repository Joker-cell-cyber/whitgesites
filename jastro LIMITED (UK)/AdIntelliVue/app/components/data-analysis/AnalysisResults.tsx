'use client';

import { AnalysisResult } from "@/app/lib/types/data-types";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/app/lib/format-utils";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Copy, Download, FileText } from "lucide-react";
import { useState } from "react";
import React from 'react';

interface AnalysisResultsProps {
  result: AnalysisResult;
}

// Fonction utilitaire pour vérifier si une valeur est un objet
const isObject = (value: any): boolean => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};

// Fonction utilitaire pour convertir un objet en chaîne de caractères
const objectToString = (obj: any): string => {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  if (Array.isArray(obj)) return obj.join(', ');
  if (isObject(obj)) return JSON.stringify(obj);
  return String(obj);
};

export default function AnalysisResults({ result }: AnalysisResultsProps) {
  const router = useRouter();
  const [copySuccess, setCopySuccess] = useState(false);
  
  // Fonction pour copier les insights
  const copyToClipboard = () => {
    const textToCopy = result.insights.join('\n\n');
    navigator.clipboard.writeText(textToCopy).then(
      () => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      },
      () => {
        alert("Impossible de copier le texte");
      }
    );
  };
  
  // Générer un rapport (navigation vers la page de rapports)
  const generateReport = () => {
    router.push(`/dashboard/reports?analysisId=${result.id}`);
  };
  
  if (!result) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Résultats de l'analyse</h2>
          <p className="text-sm text-gray-400">
            {formatDate(result.timestamp, true)}
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" onClick={copyToClipboard}>
            <Copy className="h-4 w-4 mr-2" />
            {copySuccess ? "Copié!" : "Copier"}
          </Button>
          <Button size="sm" variant="outline" onClick={generateReport}>
            <FileText className="h-4 w-4 mr-2" />
            Rapport
          </Button>
          <Button size="sm" variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Métriques clés */}
        <Card className="p-4">
          <h3 className="text-xl font-semibold mb-3">Métriques clés</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-800 rounded-lg">
              <p className="text-xs text-gray-400 mb-1">Dépenses</p>
              <p className="text-xl font-bold">{objectToString(result.metrics?.totalSpend)}€</p>
            </div>
            <div className="p-3 bg-gray-800 rounded-lg">
              <p className="text-xs text-gray-400 mb-1">CPA</p>
              <p className="text-xl font-bold">{objectToString(result.metrics?.cpa)}€</p>
            </div>
            <div className="p-3 bg-gray-800 rounded-lg">
              <p className="text-xs text-gray-400 mb-1">CTR</p>
              <p className="text-xl font-bold">{objectToString(result.metrics?.ctr)}%</p>
            </div>
            <div className="p-3 bg-gray-800 rounded-lg">
              <p className="text-xs text-gray-400 mb-1">ROI</p>
              <p className="text-xl font-bold">{objectToString(result.metrics?.roi)}%</p>
            </div>
          </div>
        </Card>
        
        {/* Insights */}
        <Card className="p-4">
          <h3 className="text-xl font-semibold mb-3">Insights clés</h3>
          <ul className="space-y-2">
            {Array.isArray(result.insights) && result.insights.map((insight, index) => (
              <li key={index} className="p-3 bg-gray-800 rounded-lg text-sm">
                {objectToString(insight)}
              </li>
            ))}
          </ul>
        </Card>
        
        {/* Anomalies (si disponibles) */}
        {result.anomalies && result.anomalies.length > 0 && (
          <Card className="p-4">
            <h3 className="text-xl font-semibold mb-3">Anomalies détectées</h3>
            <ul className="space-y-2">
              {result.anomalies.map((anomaly, index) => (
                <li key={index} className="p-3 bg-red-900/20 border border-red-900/30 rounded-lg text-sm">
                  {typeof anomaly === 'string' ? anomaly : anomaly.description}
                </li>
              ))}
            </ul>
          </Card>
        )}
        
        {/* Recommandations */}
        {result.recommendations && result.recommendations.length > 0 && (
          <Card className="p-4">
            <h3 className="text-xl font-semibold mb-3">Recommandations</h3>
            <ul className="space-y-2">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="p-3 bg-blue-900/20 border border-blue-900/30 rounded-lg text-sm flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  {rec}
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>
    </div>
  );
} 