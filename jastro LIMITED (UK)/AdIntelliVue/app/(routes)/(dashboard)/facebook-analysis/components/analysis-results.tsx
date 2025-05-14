import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, PieChart, Users, FileText, AlertCircle, ArrowUpRight, ChevronRight, TrendingUp } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface AnalysisResultsProps {
  performanceAnalysis: any;
  creativesAnalysis: any;
  audiencesAnalysis: any;
  recommendations: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function AnalysisResults({
  performanceAnalysis,
  creativesAnalysis,
  audiencesAnalysis,
  recommendations,
  activeTab,
  setActiveTab
}: AnalysisResultsProps) {
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

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Résultats de l'Analyse</CardTitle>
        <CardDescription>
          Consultez les insights de performance détaillés de votre analyse Facebook Ads
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              <span className="sm:inline">Performances</span>
              {performanceAnalysis && (
                <Badge variant="outline" className="bg-green-100 text-green-800 ml-1 md:inline-flex">
                  Complété
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="creatives" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              <span className="sm:inline">Créatives</span>
              {creativesAnalysis && (
                <Badge variant="outline" className="bg-green-100 text-green-800 ml-1 md:inline-flex">
                  Complété
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="audiences" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="sm:inline">Audiences</span>
              {audiencesAnalysis && (
                <Badge variant="outline" className="bg-green-100 text-green-800 ml-1 md:inline-flex">
                  Complété
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="sm:inline">Recommandations</span>
              {recommendations && (
                <Badge variant="outline" className="bg-green-100 text-green-800 ml-1 md:inline-flex">
                  Complété
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
          
          {/* Contenu de l'onglet performances */}
          <TabsContent value="performance">
            {performanceAnalysis ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Insights de Performance</CardTitle>
                    <CardDescription>Recommandations actionnables pour optimiser vos campagnes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-6">
                      {Array.isArray(performanceAnalysis.insights) && 
                        performanceAnalysis.insights.map((insight: any, index: number) => (
                          <li key={index} className="p-6 bg-card/50 rounded-lg border border-border/50 hover:border-primary/20 hover:bg-card/80 transition-all">
                            <div className="flex items-start gap-3">
                              <div className="bg-primary/10 p-2 rounded-full mt-1">
                                <TrendingUp className="h-5 w-5 text-primary" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-lg mb-2 text-primary/90">{insight.title}</h4>
                                <p className="text-sm text-muted-foreground mb-4">{insight.description}</p>
                                
                                {insight.metrics && insight.metrics.length > 0 && (
                                  <div className="mt-3 mb-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {insight.metrics.map((metric: any, mIndex: number) => (
                                      <div key={mIndex} className="bg-background/80 p-3 rounded-md border border-border/30">
                                        <span className="font-medium text-xs uppercase text-muted-foreground block mb-1">{metric.name}</span>
                                        <div className="flex items-center gap-1">
                                          <span className="text-lg font-bold">
                                            {typeof metric.value === 'number' ? metric.value.toFixed(2) : metric.value}
                                          </span>
                                          {metric.change && (
                                            <Badge className={metric.trend === 'up' ? 'bg-green-100 text-green-800' : metric.trend === 'down' ? 'bg-red-100 text-red-800' : 'bg-gray-100'}>
                                              {metric.change > 0 ? '+' : ''}{metric.change.toFixed(1)}%
                                              {metric.trend === 'up' ? ' ↑' : metric.trend === 'down' ? ' ↓' : ''}
                                            </Badge>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                                
                                {insight.actionItems && insight.actionItems.length > 0 && (
                                  <div className="mt-4 bg-primary/5 p-4 rounded-md border border-primary/10">
                                    <h5 className="font-medium text-sm mb-2 flex items-center gap-1">
                                      <ArrowUpRight className="h-4 w-4 text-primary" />
                                      Actions recommandées
                                    </h5>
                                    <ul className="space-y-2">
                                      {insight.actionItems.map((action: string, aIndex: number) => (
                                        <li key={aIndex} className="flex items-start gap-2 text-sm">
                                          <ChevronRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                                          <span>{action}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>En attente</AlertTitle>
                <AlertDescription>
                  L'analyse des performances n'a pas encore été effectuée.
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>
          
          <TabsContent value="creatives">
            {creativesAnalysis ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Analyse par Format</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="bg-card/50">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Images Statiques</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm">
                          <p>{objectToString(creativesAnalysis.formatAnalysis?.staticImages?.performance)}</p>
                          <div className="mt-2">
                            <p className="font-medium">Forces:</p>
                            <ul className="list-disc pl-4 mt-1">
                              {Array.isArray(creativesAnalysis.formatAnalysis?.staticImages?.strengths) && 
                                creativesAnalysis.formatAnalysis.staticImages.strengths.map((strength: string, i: number) => (
                                  <li key={i}>{objectToString(strength)}</li>
                                ))}
                            </ul>
                          </div>
                          <div className="mt-2">
                            <p className="font-medium">Faiblesses:</p>
                            <ul className="list-disc pl-4 mt-1">
                              {Array.isArray(creativesAnalysis.formatAnalysis?.staticImages?.weaknesses) && 
                                creativesAnalysis.formatAnalysis.staticImages.weaknesses.map((weakness: string, i: number) => (
                                  <li key={i}>{objectToString(weakness)}</li>
                                ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-card/50">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Carrousels</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm">
                          <p>{objectToString(creativesAnalysis.formatAnalysis?.carousels?.performance)}</p>
                          <div className="mt-2">
                            <p className="font-medium">Forces:</p>
                            <ul className="list-disc pl-4 mt-1">
                              {Array.isArray(creativesAnalysis.formatAnalysis?.carousels?.strengths) && 
                                creativesAnalysis.formatAnalysis.carousels.strengths.map((strength: string, i: number) => (
                                  <li key={i}>{objectToString(strength)}</li>
                                ))}
                            </ul>
                          </div>
                          <div className="mt-2">
                            <p className="font-medium">Faiblesses:</p>
                            <ul className="list-disc pl-4 mt-1">
                              {Array.isArray(creativesAnalysis.formatAnalysis?.carousels?.weaknesses) && 
                                creativesAnalysis.formatAnalysis.carousels.weaknesses.map((weakness: string, i: number) => (
                                  <li key={i}>{objectToString(weakness)}</li>
                                ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-card/50">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Vidéos</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm">
                          <p>{objectToString(creativesAnalysis.formatAnalysis?.videos?.performance)}</p>
                          <div className="mt-2">
                            <p className="font-medium">Forces:</p>
                            <ul className="list-disc pl-4 mt-1">
                              {Array.isArray(creativesAnalysis.formatAnalysis?.videos?.strengths) && 
                                creativesAnalysis.formatAnalysis.videos.strengths.map((strength: string, i: number) => (
                                  <li key={i}>{objectToString(strength)}</li>
                                ))}
                            </ul>
                          </div>
                          <div className="mt-2">
                            <p className="font-medium">Faiblesses:</p>
                            <ul className="list-disc pl-4 mt-1">
                              {Array.isArray(creativesAnalysis.formatAnalysis?.videos?.weaknesses) && 
                                creativesAnalysis.formatAnalysis.videos.weaknesses.map((weakness: string, i: number) => (
                                  <li key={i}>{objectToString(weakness)}</li>
                                ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Analyse par Style de Message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="bg-card/50">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Messages Émotionnels</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm">
                          <p>{creativesAnalysis.messageStyleAnalysis?.emotional?.performance}</p>
                          <div className="mt-2">
                            <p className="font-medium">Meilleures pratiques:</p>
                            <ul className="list-disc pl-4 mt-1">
                              {creativesAnalysis.messageStyleAnalysis?.emotional?.bestPractices?.map((practice: string, i: number) => (
                                <li key={i}>{practice}</li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-card/50">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Messages Rationnels</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm">
                          <p>{creativesAnalysis.messageStyleAnalysis?.rational?.performance}</p>
                          <div className="mt-2">
                            <p className="font-medium">Meilleures pratiques:</p>
                            <ul className="list-disc pl-4 mt-1">
                              {creativesAnalysis.messageStyleAnalysis?.rational?.bestPractices?.map((practice: string, i: number) => (
                                <li key={i}>{practice}</li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-card/50">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Messages Promotionnels</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm">
                          <p>{creativesAnalysis.messageStyleAnalysis?.promotional?.performance}</p>
                          <div className="mt-2">
                            <p className="font-medium">Meilleures pratiques:</p>
                            <ul className="list-disc pl-4 mt-1">
                              {creativesAnalysis.messageStyleAnalysis?.promotional?.bestPractices?.map((practice: string, i: number) => (
                                <li key={i}>{practice}</li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Éléments Visuels</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {creativesAnalysis.visualElementsAnalysis?.map((element: string, index: number) => (
                        <li key={index} className="text-sm">• {element}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>En attente</AlertTitle>
                <AlertDescription>
                  L'analyse des créatives n'a pas encore été effectuée.
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>
          
          <TabsContent value="audiences">
            {audiencesAnalysis ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Analyse Démographique</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="bg-card/50">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Âge</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm">
                          <div>
                            <p className="font-medium">Segments les plus performants:</p>
                            <ul className="list-disc pl-4 mt-1">
                              {audiencesAnalysis.demographicAnalysis?.age?.bestPerforming?.map((age: string, i: number) => (
                                <li key={i}>{age}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="mt-2">
                            <p className="font-medium">Segments les moins performants:</p>
                            <ul className="list-disc pl-4 mt-1">
                              {audiencesAnalysis.demographicAnalysis?.age?.worstPerforming?.map((age: string, i: number) => (
                                <li key={i}>{age}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="mt-2">
                            <p className="font-medium">Insights:</p>
                            <p>{audiencesAnalysis.demographicAnalysis?.age?.insights}</p>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-card/50">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Genre</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm">
                          <div>
                            <p className="font-medium">Segment le plus performant:</p>
                            <p>{audiencesAnalysis.demographicAnalysis?.gender?.bestPerforming}</p>
                          </div>
                          <div className="mt-2">
                            <p className="font-medium">Insights:</p>
                            <p>{audiencesAnalysis.demographicAnalysis?.gender?.insights}</p>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-card/50">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Localisation</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm">
                          <div>
                            <p className="font-medium">Zones les plus performantes:</p>
                            <ul className="list-disc pl-4 mt-1">
                              {audiencesAnalysis.demographicAnalysis?.location?.bestPerforming?.map((location: string, i: number) => (
                                <li key={i}>{location}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="mt-2">
                            <p className="font-medium">Zones les moins performantes:</p>
                            <ul className="list-disc pl-4 mt-1">
                              {audiencesAnalysis.demographicAnalysis?.location?.worstPerforming?.map((location: string, i: number) => (
                                <li key={i}>{location}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="mt-2">
                            <p className="font-medium">Insights:</p>
                            <p>{audiencesAnalysis.demographicAnalysis?.location?.insights}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Analyse par Type d'Audience</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="bg-card/50">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Audiences d'Intérêt</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm">
                          <p>{objectToString(audiencesAnalysis.audienceTypeAnalysis?.interestAudiences?.performance)}</p>
                          <div className="mt-2">
                            <p className="font-medium">Forces:</p>
                            <ul className="list-disc pl-4 mt-1">
                              {Array.isArray(audiencesAnalysis.audienceTypeAnalysis?.interestAudiences?.strengths) && 
                                audiencesAnalysis.audienceTypeAnalysis.interestAudiences.strengths.map((strength: string, i: number) => (
                                  <li key={i}>{objectToString(strength)}</li>
                                ))}
                            </ul>
                          </div>
                          <div className="mt-2">
                            <p className="font-medium">Faiblesses:</p>
                            <ul className="list-disc pl-4 mt-1">
                              {Array.isArray(audiencesAnalysis.audienceTypeAnalysis?.interestAudiences?.weaknesses) && 
                                audiencesAnalysis.audienceTypeAnalysis.interestAudiences.weaknesses.map((weakness: string, i: number) => (
                                  <li key={i}>{objectToString(weakness)}</li>
                                ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-card/50">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Audiences Similaires</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm">
                          <p>{objectToString(audiencesAnalysis.audienceTypeAnalysis?.lookalikesAudiences?.performance)}</p>
                          <div className="mt-2">
                            <p className="font-medium">Forces:</p>
                            <ul className="list-disc pl-4 mt-1">
                              {Array.isArray(audiencesAnalysis.audienceTypeAnalysis?.lookalikesAudiences?.strengths) && 
                                audiencesAnalysis.audienceTypeAnalysis.lookalikesAudiences.strengths.map((strength: string, i: number) => (
                                  <li key={i}>{objectToString(strength)}</li>
                                ))}
                            </ul>
                          </div>
                          <div className="mt-2">
                            <p className="font-medium">Faiblesses:</p>
                            <ul className="list-disc pl-4 mt-1">
                              {Array.isArray(audiencesAnalysis.audienceTypeAnalysis?.lookalikesAudiences?.weaknesses) && 
                                audiencesAnalysis.audienceTypeAnalysis.lookalikesAudiences.weaknesses.map((weakness: string, i: number) => (
                                  <li key={i}>{objectToString(weakness)}</li>
                                ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-card/50">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Audiences Personnalisées</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm">
                          <p>{objectToString(audiencesAnalysis.audienceTypeAnalysis?.customAudiences?.performance)}</p>
                          <div className="mt-2">
                            <p className="font-medium">Forces:</p>
                            <ul className="list-disc pl-4 mt-1">
                              {Array.isArray(audiencesAnalysis.audienceTypeAnalysis?.customAudiences?.strengths) && 
                                audiencesAnalysis.audienceTypeAnalysis.customAudiences.strengths.map((strength: string, i: number) => (
                                  <li key={i}>{objectToString(strength)}</li>
                                ))}
                            </ul>
                          </div>
                          <div className="mt-2">
                            <p className="font-medium">Faiblesses:</p>
                            <ul className="list-disc pl-4 mt-1">
                              {Array.isArray(audiencesAnalysis.audienceTypeAnalysis?.customAudiences?.weaknesses) && 
                                audiencesAnalysis.audienceTypeAnalysis.customAudiences.weaknesses.map((weakness: string, i: number) => (
                                  <li key={i}>{objectToString(weakness)}</li>
                                ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Segments les Plus Performants</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {audiencesAnalysis.topPerformingSegments?.map((segment: string, index: number) => (
                        <li key={index} className="text-sm">• {segment}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>En attente</AlertTitle>
                <AlertDescription>
                  L'analyse des audiences n'a pas encore été effectuée.
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>
          
          <TabsContent value="recommendations">
            {recommendations ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recommandations Stratégiques</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-2">Recommandations Budgétaires</h4>
                        <ul className="space-y-4">
                          {Array.isArray(recommendations.budgetRecommendations) && 
                            recommendations.budgetRecommendations.map((rec: any, index: number) => (
                              <li key={index} className="p-4 bg-card/50 rounded-lg">
                                <p className="font-medium">{objectToString(rec.recommendation)}</p>
                                <p className="text-sm text-muted-foreground mt-1">{objectToString(rec.rationale)}</p>
                                <p className="text-sm text-muted-foreground mt-1">Impact attendu: {objectToString(rec.expectedImpact)}</p>
                              </li>
                            ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Recommandations Créatives</h4>
                        <ul className="space-y-4">
                          {Array.isArray(recommendations.creativeRecommendations) && 
                            recommendations.creativeRecommendations.map((rec: any, index: number) => (
                              <li key={index} className="p-4 bg-card/50 rounded-lg">
                                <p className="font-medium">{objectToString(rec.recommendation)}</p>
                                <p className="text-sm text-muted-foreground mt-1">{objectToString(rec.rationale)}</p>
                                <p className="text-sm text-muted-foreground mt-1">Impact attendu: {objectToString(rec.expectedImpact)}</p>
                              </li>
                            ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Plan d'Action</h4>
                        <div className="space-y-4">
                          <div>
                            <h5 className="font-medium">Actions Immédiates</h5>
                            <ul className="list-disc pl-4 mt-2">
                              {Array.isArray(recommendations.actionPlan?.immediate) && 
                                recommendations.actionPlan.immediate.map((action: string, index: number) => (
                                  <li key={index}>{objectToString(action)}</li>
                                ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium">Actions Court Terme</h5>
                            <ul className="list-disc pl-4 mt-2">
                              {Array.isArray(recommendations.actionPlan?.shortTerm) && 
                                recommendations.actionPlan.shortTerm.map((action: string, index: number) => (
                                  <li key={index}>{objectToString(action)}</li>
                                ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium">Actions Long Terme</h5>
                            <ul className="list-disc pl-4 mt-2">
                              {Array.isArray(recommendations.actionPlan?.longTerm) && 
                                recommendations.actionPlan.longTerm.map((action: string, index: number) => (
                                  <li key={index}>{objectToString(action)}</li>
                                ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>En attente</AlertTitle>
                <AlertDescription>
                  Les recommandations n'ont pas encore été générées.
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
} 