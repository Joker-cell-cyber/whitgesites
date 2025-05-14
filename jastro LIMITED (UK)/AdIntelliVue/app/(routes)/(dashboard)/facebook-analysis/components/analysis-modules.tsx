import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, BarChart, Users, PieChart, FileText, Download, Loader2, AlertTriangle, Coins } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';
import { KPIContextForm, KPIContext } from './kpi-context-form';

interface AnalysisModulesProps {
  // États d'analyse
  dataMetrics: any;
  performanceAnalysis: any;
  creativesAnalysis: any;
  audiencesAnalysis: any;
  recommendations: any;
  
  // États de chargement
  isLoadingPerformance: boolean;
  isLoadingCreatives: boolean;
  isLoadingAudiences: boolean;
  isLoadingRecommendations: boolean;
  isLoadingPdf: boolean;
  
  // États d'erreur
  errorPerformance: string | null;
  errorCreatives: string | null;
  errorAudiences: string | null;
  errorRecommendations: string | null;
  errorPdf: string | null;
  
  // Gestionnaires d'événements
  analyzePerformance: (data?: any) => Promise<void>;
  analyzeCreatives: () => Promise<void>;
  analyzeAudiences: () => Promise<void>;
  generateRecommendations: () => Promise<void>;
  generatePdfReport: () => Promise<void>;
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

export function AnalysisModules({
  dataMetrics,
  performanceAnalysis,
  creativesAnalysis,
  audiencesAnalysis,
  recommendations,
  isLoadingPerformance,
  isLoadingCreatives,
  isLoadingAudiences,
  isLoadingRecommendations,
  isLoadingPdf,
  errorPerformance,
  errorCreatives,
  errorAudiences,
  errorRecommendations,
  errorPdf,
  analyzePerformance,
  analyzeCreatives,
  analyzeAudiences,
  generateRecommendations,
  generatePdfReport
}: AnalysisModulesProps) {
  const [showKpiContext, setShowKpiContext] = useState(false);
  const [kpiContext, setKpiContext] = useState<KPIContext | null>(null);

  const handleKpiContextSubmit = (data: any) => {
    setShowKpiContext(false);
    analyzePerformance(data);
  };

  return (
    <div className="space-y-6">
      {/* Formulaire de contexte KPI */}
      {showKpiContext ? (
        <KPIContextForm
          onSubmit={handleKpiContextSubmit}
          onCancel={() => setShowKpiContext(false)}
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Analyse par Module</CardTitle>
            <CardDescription>
              Analysez vos données Facebook Ads par module pour éviter les timeouts. Effectuez chaque analyse séparément, puis générez le rapport PDF complet.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Module Performance */}
              <Card className="bg-card/50 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart className="h-5 w-5" />
                    Analyse des Performances
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    Analyse des métriques principales, tendances et anomalies.
                  </p>
                  <div className="flex items-center justify-between">
                    {performanceAnalysis ? (
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        Analyse complétée
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                        En attente
                      </Badge>
                    )}
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Coins className="h-3.5 w-3.5 mr-1 text-amber-500" />
                      <span>1 token</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => setShowKpiContext(true)}
                    disabled={isLoadingPerformance || !dataMetrics}
                    className="w-full"
                  >
                    {isLoadingPerformance ? <Spinner className="mr-2" /> : <BarChart className="h-4 w-4 mr-2" />}
                    {performanceAnalysis ? 'Réanalyser' : 'Analyser les Performances'}
                  </Button>
                </CardFooter>
                {errorPerformance && (
                  <div className="px-4 pb-4">
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Erreur</AlertTitle>
                      <AlertDescription>
                        {errorPerformance}
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </Card>
              
              {/* Module Créatives */}
              <Card className="bg-card/50 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Analyse des Créatives
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    Analyse des formats, messages et éléments visuels.
                  </p>
                  <div className="flex items-center justify-between">
                    {creativesAnalysis ? (
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        Analyse complétée
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                        En attente
                      </Badge>
                    )}
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Coins className="h-3.5 w-3.5 mr-1 text-amber-500" />
                      <span>1 token</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={analyzeCreatives}
                    disabled={isLoadingCreatives || !dataMetrics}
                    className="w-full"
                  >
                    {isLoadingCreatives ? <Spinner className="mr-2" /> : <PieChart className="h-4 w-4 mr-2" />}
                    {creativesAnalysis ? 'Réanalyser' : 'Analyser les Créatives'}
                  </Button>
                </CardFooter>
                {errorCreatives && (
                  <div className="px-4 pb-4">
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Erreur</AlertTitle>
                      <AlertDescription>
                        {errorCreatives}
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </Card>
              
              {/* Module Audiences */}
              <Card className="bg-card/50 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Analyse des Audiences
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    Analyse des segments démographiques et des comportements.
                  </p>
                  <div className="flex items-center justify-between">
                    {audiencesAnalysis ? (
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        Analyse complétée
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                        En attente
                      </Badge>
                    )}
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Coins className="h-3.5 w-3.5 mr-1 text-amber-500" />
                      <span>1 token</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={analyzeAudiences}
                    disabled={isLoadingAudiences || !dataMetrics}
                    className="w-full"
                  >
                    {isLoadingAudiences ? <Spinner className="mr-2" /> : <Users className="h-4 w-4 mr-2" />}
                    {audiencesAnalysis ? 'Réanalyser' : 'Analyser les Audiences'}
                  </Button>
                </CardFooter>
                {errorAudiences && (
                  <div className="px-4 pb-4">
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Erreur</AlertTitle>
                      <AlertDescription>
                        {errorAudiences}
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </Card>
              
              {/* Module Recommandations */}
              <Card className="bg-card/50 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Recommandations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    Génération des recommandations stratégiques.
                  </p>
                  <div className="flex items-center justify-between">
                    {recommendations ? (
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        Recommandations générées
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                        En attente
                      </Badge>
                    )}
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Coins className="h-3.5 w-3.5 mr-1 text-amber-500" />
                      <span>3 tokens</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={generateRecommendations}
                    disabled={
                      isLoadingRecommendations || 
                      !performanceAnalysis || 
                      !creativesAnalysis || 
                      !audiencesAnalysis
                    }
                    className="w-full"
                  >
                    {isLoadingRecommendations ? <Spinner className="mr-2" /> : <FileText className="h-4 w-4 mr-2" />}
                    {recommendations ? 'Régénérer' : 'Générer Recommandations'}
                  </Button>
                </CardFooter>
                {errorRecommendations && (
                  <div className="px-4 pb-4">
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Erreur</AlertTitle>
                      <AlertDescription>
                        {errorRecommendations}
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </Card>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 