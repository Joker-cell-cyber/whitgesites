import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ArrowUp, ArrowDown, Minus, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MetricsDashboardProps {
  metrics: {
    totalSpend: number;
    totalImpressions: number;
    totalClicks: number;
    totalConversions: number;
    avgCTR: number;
    avgCPC: number;
    avgCPA: number;
    avgCPM: number;
    avgFrequency: number;
    avgConversionRate: number;
    roas: number;
  };
  trends?: {
    ctr: { trend: number };
    cpc: { trend: number };
    cpa: { trend: number };
    cpm: { trend: number };
    conversionRate: { trend: number };
  };
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

// Fonction pour arrondir les nombres à 2 décimales
const roundToTwoDecimals = (num: number): number => {
  return Math.round(num * 100) / 100;
};

const getTrendIcon = (trend: number) => {
  if (trend > 5) return <ArrowUp className="text-green-500" />;
  if (trend < -5) return <ArrowDown className="text-red-500" />;
  return <Minus className="text-gray-500" />;
};

const MetricsDashboard: React.FC<MetricsDashboardProps> = ({ metrics, trends }) => {
  const [showRentabilite, setShowRentabilite] = useState(false);
  const [showPerformance, setShowPerformance] = useState(false);
  const [showVolumes, setShowVolumes] = useState(false);
  
  if (!metrics) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Section Rentabilité */}
      <div className="border border-gray-200/20 rounded-lg">
        <div 
          className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-800/30" 
          onClick={() => setShowRentabilite(!showRentabilite)}
        >
          <h3 className="text-lg font-semibold">Rentabilité</h3>
          <Button variant="ghost" size="sm" className="p-1">
            {showRentabilite ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </Button>
        </div>
        
        {showRentabilite && (
          <div className="p-4 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-400">ROAS</h4>
                    <p className="text-2xl font-bold">{roundToTwoDecimals(metrics.roas)}%</p>
                  </div>
                  {trends && getTrendIcon(trends.conversionRate.trend)}
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-400">CPA</h4>
                    <p className="text-2xl font-bold">{roundToTwoDecimals(metrics.avgCPA)}€</p>
                  </div>
                  {trends && getTrendIcon(trends.cpa.trend)}
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Section Performance */}
      <div className="border border-gray-200/20 rounded-lg">
        <div 
          className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-800/30" 
          onClick={() => setShowPerformance(!showPerformance)}
        >
          <h3 className="text-lg font-semibold">Performance</h3>
          <Button variant="ghost" size="sm" className="p-1">
            {showPerformance ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </Button>
        </div>
        
        {showPerformance && (
          <div className="p-4 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-400">CTR</h4>
                    <p className="text-2xl font-bold">{roundToTwoDecimals(metrics.avgCTR)}%</p>
                  </div>
                  {trends && getTrendIcon(trends.ctr.trend)}
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-400">CPM</h4>
                    <p className="text-2xl font-bold">{roundToTwoDecimals(metrics.avgCPM)}€</p>
                  </div>
                  {trends && getTrendIcon(trends.cpm.trend)}
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-400">CPC</h4>
                    <p className="text-2xl font-bold">{roundToTwoDecimals(metrics.avgCPC)}€</p>
                  </div>
                  {trends && getTrendIcon(trends.cpc.trend)}
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-400">Fréquence</h4>
                    <p className="text-2xl font-bold">{roundToTwoDecimals(metrics.avgFrequency)}</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Section Volumes */}
      <div className="border border-gray-200/20 rounded-lg">
        <div 
          className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-800/30" 
          onClick={() => setShowVolumes(!showVolumes)}
        >
          <h3 className="text-lg font-semibold">Volumes</h3>
          <Button variant="ghost" size="sm" className="p-1">
            {showVolumes ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </Button>
        </div>
        
        {showVolumes && (
          <div className="p-4 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4">
                <h4 className="text-sm font-medium text-gray-400">Dépenses totales</h4>
                <p className="text-2xl font-bold">{roundToTwoDecimals(metrics.totalSpend)}€</p>
              </Card>
              <Card className="p-4">
                <h4 className="text-sm font-medium text-gray-400">Impressions</h4>
                <p className="text-2xl font-bold">{Math.round(metrics.totalImpressions)}</p>
              </Card>
              <Card className="p-4">
                <h4 className="text-sm font-medium text-gray-400">Conversions</h4>
                <p className="text-2xl font-bold">{Math.round(metrics.totalConversions)}</p>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricsDashboard; 