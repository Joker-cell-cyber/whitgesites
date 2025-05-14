import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ArrowUp, ArrowDown, Minus, ChevronDown, ChevronUp, Leaf, TrendingUp, Activity, Database } from 'lucide-react';
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
  if (trend > 5) return <ArrowUp className="text-[#5F7138]" />;
  if (trend < -5) return <ArrowDown className="text-[#C17A56]" />;
  return <Minus className="text-[#7F7259]" />;
};

const MetricsDashboard: React.FC<MetricsDashboardProps> = ({ metrics, trends }) => {
  const [showRentabilite, setShowRentabilite] = useState(true);
  const [showPerformance, setShowPerformance] = useState(true);
  const [showVolumes, setShowVolumes] = useState(true);
  
  if (!metrics) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Section Rentabilité */}
      <div className="border border-[#E8DFC7] rounded-lg bg-white shadow-sm">
        <div 
          className="p-4 flex justify-between items-center cursor-pointer hover:bg-[#F8F4E9]" 
          onClick={() => setShowRentabilite(!showRentabilite)}
        >
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#EDF2E4] flex items-center justify-center mr-3">
              <TrendingUp className="h-4 w-4 text-[#5F7138]" />
            </div>
            <h3 className="text-lg font-medium text-[#4F4639]">Rentabilité</h3>
          </div>
          <Button variant="ghost" size="sm" className="p-1 text-[#5F7138] hover:text-[#7F8F55] hover:bg-[#EDF2E4]">
            {showRentabilite ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </Button>
        </div>
        
        {showRentabilite && (
          <div className="p-4 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 border-[#E8DFC7] bg-[#F8F4E9]/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-[#7F7259]">ROAS</h4>
                    <p className="text-2xl font-bold text-[#4F4639]">{roundToTwoDecimals(metrics.roas)}%</p>
                  </div>
                  {trends && getTrendIcon(trends.conversionRate.trend)}
                </div>
              </Card>
              <Card className="p-4 border-[#E8DFC7] bg-[#F8F4E9]/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-[#7F7259]">CPA</h4>
                    <p className="text-2xl font-bold text-[#4F4639]">{roundToTwoDecimals(metrics.avgCPA)}€</p>
                  </div>
                  {trends && getTrendIcon(trends.cpa.trend)}
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Section Performance */}
      <div className="border border-[#E8DFC7] rounded-lg bg-white shadow-sm">
        <div 
          className="p-4 flex justify-between items-center cursor-pointer hover:bg-[#F8F4E9]" 
          onClick={() => setShowPerformance(!showPerformance)}
        >
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#EDF2E4] flex items-center justify-center mr-3">
              <Activity className="h-4 w-4 text-[#5F7138]" />
            </div>
            <h3 className="text-lg font-medium text-[#4F4639]">Performance</h3>
          </div>
          <Button variant="ghost" size="sm" className="p-1 text-[#5F7138] hover:text-[#7F8F55] hover:bg-[#EDF2E4]">
            {showPerformance ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </Button>
        </div>
        
        {showPerformance && (
          <div className="p-4 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4 border-[#E8DFC7] bg-[#F8F4E9]/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-[#7F7259]">CTR</h4>
                    <p className="text-2xl font-bold text-[#4F4639]">{roundToTwoDecimals(metrics.avgCTR)}%</p>
                  </div>
                  {trends && getTrendIcon(trends.ctr.trend)}
                </div>
              </Card>
              <Card className="p-4 border-[#E8DFC7] bg-[#F8F4E9]/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-[#7F7259]">CPM</h4>
                    <p className="text-2xl font-bold text-[#4F4639]">{roundToTwoDecimals(metrics.avgCPM)}€</p>
                  </div>
                  {trends && getTrendIcon(trends.cpm.trend)}
                </div>
              </Card>
              <Card className="p-4 border-[#E8DFC7] bg-[#F8F4E9]/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-[#7F7259]">CPC</h4>
                    <p className="text-2xl font-bold text-[#4F4639]">{roundToTwoDecimals(metrics.avgCPC)}€</p>
                  </div>
                  {trends && getTrendIcon(trends.cpc.trend)}
                </div>
              </Card>
              <Card className="p-4 border-[#E8DFC7] bg-[#F8F4E9]/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-[#7F7259]">Fréquence</h4>
                    <p className="text-2xl font-bold text-[#4F4639]">{roundToTwoDecimals(metrics.avgFrequency)}</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Section Volumes */}
      <div className="border border-[#E8DFC7] rounded-lg bg-white shadow-sm">
        <div 
          className="p-4 flex justify-between items-center cursor-pointer hover:bg-[#F8F4E9]" 
          onClick={() => setShowVolumes(!showVolumes)}
        >
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#EDF2E4] flex items-center justify-center mr-3">
              <Database className="h-4 w-4 text-[#5F7138]" />
            </div>
            <h3 className="text-lg font-medium text-[#4F4639]">Volumes</h3>
          </div>
          <Button variant="ghost" size="sm" className="p-1 text-[#5F7138] hover:text-[#7F8F55] hover:bg-[#EDF2E4]">
            {showVolumes ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </Button>
        </div>
        
        {showVolumes && (
          <div className="p-4 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 border-[#E8DFC7] bg-[#F8F4E9]/50">
                <h4 className="text-sm font-medium text-[#7F7259]">Dépenses totales</h4>
                <p className="text-2xl font-bold text-[#4F4639]">{roundToTwoDecimals(metrics.totalSpend)}€</p>
              </Card>
              <Card className="p-4 border-[#E8DFC7] bg-[#F8F4E9]/50">
                <h4 className="text-sm font-medium text-[#7F7259]">Impressions</h4>
                <p className="text-2xl font-bold text-[#4F4639]">{Math.round(metrics.totalImpressions)}</p>
              </Card>
              <Card className="p-4 border-[#E8DFC7] bg-[#F8F4E9]/50">
                <h4 className="text-sm font-medium text-[#7F7259]">Conversions</h4>
                <p className="text-2xl font-bold text-[#4F4639]">{Math.round(metrics.totalConversions)}</p>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricsDashboard; 