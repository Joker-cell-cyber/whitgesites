import { AdvertisingData, AnalysisOptions, AnalysisResult } from '@/app/lib/types/data-types';
import { OpenAI } from 'openai';

// Configuration pour OpenAI
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const API_URL = 'https://api.openai.com/v1/chat/completions';

/**
 * Service d'intégration avec l'API OpenAI pour diverses fonctionnalités analytiques
 */
export class OpenAIService {
  private static openai: any;

  static {
    // Initialiser OpenAI avec la clé API
    this.openai = new OpenAI({
      apiKey: OPENAI_API_KEY
    });
  }

  /**
   * Analyse des données publicitaires Facebook avec l'IA
   */
  static async analyzeAdvertisingData(
    data: AdvertisingData[],
    options: AnalysisOptions
  ): Promise<AnalysisResult> {
    try {
      // Préparer les données à envoyer à OpenAI
      // Nous limitons à 50 entrées pour éviter de dépasser les limites de tokens
      const sampleData = data.slice(0, 50);
      
      // Calculer quelques statistiques de base pour enrichir le contexte
      const basicStats = this.calculateBasicStats(data);
      
      // Créer un prompt qui explique ce que nous voulons
      const systemPrompt = `Vous êtes un expert en Facebook Ads avec plus de 10 ans d'expérience dans l'optimisation de campagnes publicitaires. Votre mission est d'analyser ces données publicitaires Facebook et de fournir des insights actionables qui permettront d'améliorer le ROAS et les performances globales.

Votre analyse doit être précise, spécifique et directement applicable. Évitez les généralités et concentrez-vous sur ce qui fait la différence dans la performance des campagnes Facebook.

Points essentiels à considérer:
1. Les tendances de CTR et CPC au fil du temps et par type de campagne
2. Les corrélations entre la fréquence d'affichage et les taux de conversion
3. L'efficacité relative des différents formats publicitaires Facebook (statiques, carrousels, vidéos)
4. Le ROAS par type d'audience et ciblage
5. L'influence des paramètres de placement (fil d'actualité, Instagram, Audience Network, etc.)
6. Les seuils de saturation d'audience identifiables`;
      
      const userPrompt = `
CONTEXTE:
Je suis un gestionnaire de campagnes Facebook Ads et j'ai besoin d'une analyse ${options.analysisType === 'macro' ? 'globale' : 'détaillée et granulaire'} de mes performances publicitaires.
${options.includeRecommendations ? 'J\'ai besoin de recommandations d\'optimisation très précises et directement applicables.' : ''} 
${options.includeProjections ? 'Je souhaite également des projections de performance pour les 30 prochains jours.' : ''}

STATISTIQUES DE BASE:
- Dépenses totales: ${basicStats.totalSpend}€
- Impressions: ${basicStats.totalImpressions}
- Clics: ${basicStats.totalClicks}
- Conversions: ${basicStats.totalConversions}
- CTR moyen: ${basicStats.averageCTR}%
- CPC moyen: ${basicStats.averageCPC}€
- Période d'analyse: ${basicStats.dateRange}

DONNÉES DÉTAILLÉES:
${JSON.stringify(sampleData)}

INSTRUCTIONS D'ANALYSE:
1. Analysez d'abord les PERFORMANCES GÉNÉRALES en termes de CTR, CPC, Conversion et ROAS
2. Identifiez les TENDANCES significatives (au moins 3) avec chiffres précis à l'appui
3. Repérez les ANOMALIES qui pourraient signaler des problèmes ou opportunités
4. Pour chaque campagne, évaluez si elle est sous-performante, dans la moyenne, ou surperformante
5. Si applicable, analysez les performances par type de PLACEMENT et FORMAT PUBLICITAIRE
6. ${options.includeRecommendations ? 'Fournissez au moins 5 RECOMMANDATIONS précises et actionnables immédiatement, incluant des % d\'ajustement spécifiques (budgets, enchères) et des modifications créatives concrètes' : ''}
7. ${options.includeProjections ? 'Projetez les performances futures en vous basant sur les tendances historiques, avec des chiffres précis attendus pour chaque métrique clé' : ''}

FORMAT DE RÉPONSE (JSON):
{
  "metrics": {
    "totalSpend": nombre,
    "totalImpressions": nombre,
    "totalClicks": nombre,
    "totalConversions": nombre,
    "ctr": pourcentage,
    "cpc": coût,
    "conversionRate": pourcentage,
    "cpa": coût,
    "roas": multiplicateur,
    "frequency": nombre moyen d'impressions par personne,
    "reachEstimate": estimation du nombre de personnes touchées,
    "engagementRate": pourcentage d'engagement (si disponible)
  },
  "insights": [
    "Analyse détaillée des performances avec données spécifiques: 'Le CTR des carrousels (2.8%) surpasse celui des publicités statiques (1.5%) de 86%'",
    "Analyse des facteurs influençant les conversions, comme 'Les audiences similaires de 3-5% ont un taux de conversion 2.1x supérieur aux audiences d'intérêt'",
    "Analyse complète du ROAS par segment: 'Les campagnes de remarketing génèrent un ROAS de 4.2 contre 1.8 pour les campagnes d'acquisition'"
  ],
  "trends": [
    "Tendance précise avec chiffres: 'Le CPC a augmenté de 0.42€ à 0.68€ (+62%) entre lundi et vendredi, suggérant une compétition accrue en fin de semaine'",
    "Évolution détaillée: 'Les conversions mobiles ont progressé de 24% tandis que les conversions desktop ont chuté de 16% sur la période'"
  ],
  "anomalies": [
    "Anomalie avec explication technique: 'Chute brutale du CTR de 3.2% à 0.8% le 15/04, coïncidant avec le changement d'algorithme de Facebook'",
    "Problème identifié avec précision: 'La campagne X dépense 35% du budget mais ne génère que 12% des conversions, signalant un problème de ciblage'"
  ],
  "recommendations": [
    "Recommandation précise: 'Augmenter de 40% le budget des campagnes de remarketing qui génèrent un ROAS de 4.2, tout en réduisant de 25% celui des campagnes avec ROAS < 1.5'",
    "Action spécifique: 'Réduire la fréquence maximale à 2.0 pour les audiences froides qui montrent une chute de CTR de 62% après la 3ème impression'"
  ],
  "projections": {
    "nextMonth": {
      "spend": dépense projetée,
      "conversions": conversions projetées,
      "cpa": CPA projeté,
      "roas": ROAS projeté
    }
  },
  "actionPlan": {
    "immediate": ["Action immédiate 1", "Action immédiate 2"],
    "shortTerm": ["Action à court terme 1", "Action à court terme 2"],
    "testing": ["Test A/B recommandé 1", "Test A/B recommandé 2"]
  }
}

IMPORTANT: Fournissez une analyse approfondie, précise et directement applicable spécifiquement pour Facebook Ads. Utilisez des pourcentages, chiffres et données concrètes pour chaque insight et recommandation.
      `;

      // Appel à l'API OpenAI
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4-turbo',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.2,  // Réduit pour plus de précision
          max_tokens: 2500   // Augmenté pour plus de détails
        })
      });

      if (!response.ok) {
        throw new Error(`Erreur API OpenAI: ${response.statusText}`);
      }

      const result = await response.json();
      const analysisContent = result.choices[0].message.content;
      
      // Parser le JSON renvoyé par l'IA
      let analysisResult;
      try {
        analysisResult = JSON.parse(analysisContent);
      } catch (e) {
        // Erreur lors du parsing de la réponse de l'IA
        throw new Error("Erreur lors de l'analyse des données: impossible de traiter la réponse de l'IA");
      }
      
      // Construire le résultat final
      return {
        id: `analysis-${Date.now()}`,
        metrics: analysisResult.metrics,
        insights: analysisResult.insights || [],
        trends: analysisResult.trends || [],
        anomalies: analysisResult.anomalies || [],
        recommendations: analysisResult.recommendations || [],
        platform: 'facebook',
        timestamp: new Date().toISOString(),
        analysisType: options.analysisType,
        dataPoints: data.length,
        dateRange: {
          start: this.extractDateRange(data).start,
          end: this.extractDateRange(data).end,
          days: this.extractDateRange(data).days
        },
        qualityScore: 0.8,
        confidenceLevel: 'medium'
      };
    } catch (error) {
      console.error('Erreur lors de l\'analyse OpenAI:', error);
      // Propager l'erreur au lieu d'utiliser un fallback
      throw new Error(`Erreur lors de l'analyse des données: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    }
  }
  
  /**
   * Analyse des performances générales (métriques de base, tendances, anomalies)
   */
  static async analyzePerformance(
    data: AdvertisingData[],
    kpiContext?: any
  ): Promise<any> {
    try {
      console.log('Début de l\'analyse des performances');
      console.log('Données reçues:', JSON.stringify(data, null, 2));
      console.log('Contexte KPI:', JSON.stringify(kpiContext, null, 2));

      // Calculer les métriques de base
      const metrics = this.calculateBasicStats(data);
      console.log('Métriques calculées:', JSON.stringify(metrics, null, 2));

      // Préparer le prompt pour l'analyse
      const prompt = this.preparePerformancePrompt(data, metrics, kpiContext);
      console.log('Prompt préparé:', prompt);

      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Vous êtes un expert en analyse de performances publicitaires Facebook. Fournissez une analyse détaillée et des recommandations actionnables basées sur les données fournies. Concentrez-vous sur l'identification de patterns clairs et de recommandations concrètes. Répondez dans le format JSON exact demandé."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.5,
        max_tokens: 2000,
      });

      console.log('Réponse OpenAI reçue:', completion.choices[0].message.content);

      // Parser la réponse en JSON
      let analysis;
      try {
        analysis = JSON.parse(completion.choices[0].message.content);
      } catch (e) {
        // Si le parsing échoue, structurer manuellement la réponse
        const sections = completion.choices[0].message.content.split('\n\n');
        analysis = {
          insights: this.extractSection(sections, "Tendances principales"),
          data: {
            basicMetrics: metrics,
            trends: {
              ctr: { trend: 'stable', changePercent: 0 },
              cpc: { trend: 'stable', changePercent: 0 },
              cpa: { trend: 'stable', changePercent: 0 },
              conversionRate: { trend: 'stable', changePercent: 0 },
              timeSeries: {
                dates: [],
                metrics: {}
              }
            }
          }
        };
      }

      // S'assurer que la structure des données est correcte
      const formattedAnalysis = {
        id: `analysis-${Date.now()}`,
        title: 'Analyse des performances publicitaires',
        description: 'Analyse complète des indicateurs clés de performance de vos campagnes',
        analysisType: 'performance',
        generatedAt: new Date().toISOString(),
        insights: Array.isArray(analysis.insights) ? analysis.insights : [],
        visualizations: [],
        data: {
          basicMetrics: analysis.data?.basicMetrics || metrics,
          trends: analysis.data?.trends || {
            ctr: { trend: 'stable', changePercent: 0 },
            cpc: { trend: 'stable', changePercent: 0 },
            cpa: { trend: 'stable', changePercent: 0 },
            conversionRate: { trend: 'stable', changePercent: 0 },
            timeSeries: {
              dates: [],
              metrics: {}
            }
          }
        },
        quality: {
          dataPoints: data.length,
          reliability: 0.85,
          completeness: 0.9
        }
      };

      console.log('Analyse structurée:', JSON.stringify(formattedAnalysis, null, 2));
      
      return {
        success: true,
        performanceAnalysis: formattedAnalysis
      };
    } catch (error) {
      console.error('Erreur détaillée lors de l\'analyse des performances:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur lors de l\'analyse des performances'
      };
    }
  }

  private static extractSection(sections: string[], sectionName: string): string[] {
    const section = sections.find(s => s.toLowerCase().includes(sectionName.toLowerCase()));
    if (!section) return [];
    
    // Diviser la section en lignes et nettoyer
    return section
      .split('\n')
      .slice(1) // Ignorer la première ligne (titre de section)
      .map(line => line.trim())
      .filter(line => line.length > 0 && line.startsWith('-'))
      .map(line => line.substring(1).trim()); // Enlever le tiret
  }

  /**
   * Analyse des créatives (formats, messages, visuels)
   */
  static async analyzeCreatives(
    data: AdvertisingData[],
    basicMetrics: any
  ): Promise<any> {
    try {
      // Préparer les données à envoyer à OpenAI
      const sampleData = data.slice(0, 50);
      
      // Créer un prompt qui explique ce que nous voulons
      const systemPrompt = `Vous êtes un expert en Facebook Ads spécialisé dans l'analyse de créatives publicitaires avec plus de 10 ans d'expérience. Votre mission est d'analyser ces données publicitaires Facebook et de fournir une analyse détaillée des performances par type de créative.

Concentrez-vous sur:
1. L'analyse des performances par format publicitaire (image statique, carrousel, vidéo)
2. L'analyse des performances par style de message (émotionnel, rationnel, promotionnel)
3. L'identification des éléments visuels les plus performants
4. Les corrélations entre les types de créatives et les performances`;
      
      const userPrompt = `
CONTEXTE:
Je suis un gestionnaire de campagnes Facebook Ads et j'ai besoin d'une analyse détaillée des performances de mes différentes créatives publicitaires.

STATISTIQUES DE BASE:
- Dépenses totales: ${basicMetrics.totalSpend}€
- Impressions: ${basicMetrics.totalImpressions}
- Clics: ${basicMetrics.totalClicks}
- Conversions: ${basicMetrics.totalConversions}

DONNÉES DÉTAILLÉES:
${JSON.stringify(sampleData)}

FORMAT DE RÉPONSE (JSON):
{
  "formatAnalysis": {
    "staticImages": {
      "performance": "Les images statiques ont un CTR moyen de 2.1% et un taux de conversion de 3.2%",
      "strengths": ["Fort impact initial", "Bons résultats sur mobile"],
      "weaknesses": ["Engagement limité", "Saturation rapide"]
    },
    "carousels": {
      "performance": "Les carrousels ont un CTR moyen de 2.8% et un taux de conversion de 4.1%",
      "strengths": ["Présentation de plusieurs produits", "Storytelling efficace"],
      "weaknesses": ["Complexité de création", "Performances variables selon le secteur"]
    },
    "videos": {
      "performance": "Les vidéos ont un CTR moyen de 3.2% et un taux de conversion de 2.9%",
      "strengths": ["Engagement élevé", "Temps d'attention plus long"],
      "weaknesses": ["Coût de production plus élevé", "Taux de conversion variable"]
    }
  },
  "messageStyleAnalysis": {
    "emotional": {
      "performance": "Les messages émotionnels génèrent un engagement 30% plus élevé",
      "bestPractices": ["Utiliser des histoires personnelles", "Faire appel aux émotions positives"]
    },
    "rational": {
      "performance": "Les messages rationnels ont un taux de conversion 25% supérieur",
      "bestPractices": ["Mettre en avant des données chiffrées", "Souligner les bénéfices concrets"]
    },
    "promotional": {
      "performance": "Les messages promotionnels ont un CTR 15% plus élevé mais un taux de conversion inférieur",
      "bestPractices": ["Limiter dans le temps", "Créer un sentiment d'urgence"]
    }
  },
  "visualElementsAnalysis": [
    "Élément 1: 'Les créatives avec des personnes réelles génèrent 40% plus d'engagement'",
    "Élément 2: 'Les couleurs vives augmentent le CTR de 18% par rapport aux tons neutres'"
  ],
  "topRecommendations": [
    "Recommandation 1: 'Privilégier les carrousels pour les produits à forte valeur'",
    "Recommandation 2: 'Tester plus de vidéos courtes (15-30s) pour augmenter l'engagement'"
  ]
}`;

      // Appel à l'API OpenAI
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4-turbo',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.2,
          max_tokens: 1500
        })
      });

      if (!response.ok) {
        throw new Error(`Erreur API OpenAI: ${response.statusText}`);
      }

      const result = await response.json();
      const analysisContent = result.choices[0].message.content;
      
      // Parser le JSON renvoyé par l'IA
      let creativesAnalysis;
      try {
        creativesAnalysis = JSON.parse(analysisContent);
      } catch (e) {
        throw new Error("Erreur lors de l'analyse des créatives: impossible de traiter la réponse de l'IA");
      }
      
      return creativesAnalysis;
    } catch (error) {
      console.error("Erreur lors de l'analyse des créatives:", error);
      throw new Error(`Erreur lors de l'analyse des créatives: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    }
  }

  /**
   * Analyse des audiences (démographie, comportement, performance)
   */
  static async analyzeAudiences(
    data: AdvertisingData[],
    basicMetrics: any
  ): Promise<any> {
    try {
      // Préparer les données à envoyer à OpenAI
      const sampleData = data.slice(0, 50);
      
      // Créer un prompt qui explique ce que nous voulons
      const systemPrompt = `Vous êtes un expert en Facebook Ads spécialisé dans l'analyse d'audiences publicitaires avec plus de 10 ans d'expérience. Votre mission est d'analyser ces données publicitaires Facebook et de fournir une analyse détaillée des performances par segment d'audience.

Concentrez-vous sur:
1. L'analyse des performances par segment démographique (âge, genre, localisation)
2. L'analyse des performances par type d'audience (intérêt, similaire, personnalisée)
3. L'identification des segments d'audience les plus performants
4. Les opportunités d'optimisation des ciblages`;
      
      const userPrompt = `
CONTEXTE:
Je suis un gestionnaire de campagnes Facebook Ads et j'ai besoin d'une analyse détaillée des performances de mes différentes audiences.

STATISTIQUES DE BASE:
- Dépenses totales: ${basicMetrics.totalSpend}€
- Impressions: ${basicMetrics.totalImpressions}
- Clics: ${basicMetrics.totalClicks}
- Conversions: ${basicMetrics.totalConversions}

DONNÉES DÉTAILLÉES:
${JSON.stringify(sampleData)}

FORMAT DE RÉPONSE (JSON):
{
  "demographicAnalysis": {
    "age": {
      "bestPerforming": ["25-34", "35-44"],
      "worstPerforming": ["65+", "18-24"],
      "insights": "Le groupe 25-34 ans a un ROAS 40% supérieur au groupe 18-24 ans"
    },
    "gender": {
      "bestPerforming": "Femmes (ROAS 2.8 vs 1.9 pour les hommes)",
      "insights": "Les femmes ont un taux de conversion 32% supérieur aux hommes"
    },
    "location": {
      "bestPerforming": ["Paris", "Lyon", "Marseille"],
      "worstPerforming": ["Zones rurales", "Petites villes"],
      "insights": "Les grandes métropoles génèrent un CPA 25% inférieur aux zones rurales"
    }
  },
  "audienceTypeAnalysis": {
    "interestAudiences": {
      "performance": "CTR moyen de 1.8%, taux de conversion de 2.1%",
      "strengths": ["Volume important", "Coût d'acquisition modéré"],
      "weaknesses": ["Faible précision", "Sensibilité aux changements d'algorithme"]
    },
    "lookalikesAudiences": {
      "performance": "CTR moyen de 2.3%, taux de conversion de 3.2%",
      "strengths": ["Bon équilibre volume/pertinence", "Performances stables"],
      "weaknesses": ["Dépendance à la qualité de l'audience source", "Coût plus élevé"]
    },
    "customAudiences": {
      "performance": "CTR moyen de 3.1%, taux de conversion de 4.8%",
      "strengths": ["Haute pertinence", "Excellent ROAS"],
      "weaknesses": ["Volume limité", "Risque de saturation"]
    }
  },
  "topPerformingSegments": [
    "Segment 1: 'Femmes 25-34 ans intéressées par la mode (ROAS 3.6)'",
    "Segment 2: 'Hommes 35-44 ans utilisateurs iOS (Taux de conversion 5.2%)'"
  ],
  "targetingOptimizations": [
    "Optimisation 1: 'Augmenter le budget sur les audiences similaires à 3-5%'",
    "Optimisation 2: 'Créer des segments plus spécifiques pour les 25-34 ans par centre d'intérêt'"
  ]
}`;

      // Appel à l'API OpenAI
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4-turbo',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.2,
          max_tokens: 1500
        })
      });

      if (!response.ok) {
        throw new Error(`Erreur API OpenAI: ${response.statusText}`);
      }

      const result = await response.json();
      const analysisContent = result.choices[0].message.content;
      
      // Parser le JSON renvoyé par l'IA
      let audiencesAnalysis;
      try {
        audiencesAnalysis = JSON.parse(analysisContent);
      } catch (e) {
        throw new Error("Erreur lors de l'analyse des audiences: impossible de traiter la réponse de l'IA");
      }
      
      return audiencesAnalysis;
    } catch (error) {
      console.error("Erreur lors de l'analyse des audiences:", error);
      throw new Error(`Erreur lors de l'analyse des audiences: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    }
  }

  /**
   * Génération de recommandations stratégiques basées sur les analyses précédentes
   */
  static async generateRecommendations(
    performanceAnalysis: any,
    creativesAnalysis: any,
    audiencesAnalysis: any,
    basicMetrics: any
  ): Promise<any> {
    try {
      // Créer un prompt qui explique ce que nous voulons
      const systemPrompt = `Vous êtes un stratège Facebook Ads avec plus de 10 ans d'expérience dans l'optimisation de campagnes publicitaires. Votre mission est de générer des recommandations stratégiques complètes et actionnables basées sur les analyses de performances, de créatives et d'audiences.

Vos recommandations doivent être:
1. Concrètes et directement applicables
2. Priorisées par impact potentiel
3. Organisées par catégorie (budget, ciblage, créatives, etc.)
4. Accompagnées d'estimations de résultats attendus`;
      
      const userPrompt = `
CONTEXTE:
Je suis un gestionnaire de campagnes Facebook Ads et j'ai besoin de recommandations stratégiques pour optimiser mes campagnes.

STATISTIQUES DE BASE:
- Dépenses totales: ${basicMetrics.totalSpend}€
- Impressions: ${basicMetrics.totalImpressions}
- Clics: ${basicMetrics.totalClicks}
- Conversions: ${basicMetrics.totalConversions}
- ROAS actuel: ${basicMetrics.averageROAS}

ANALYSE DES PERFORMANCES:
${JSON.stringify(performanceAnalysis)}

ANALYSE DES CRÉATIVES:
${JSON.stringify(creativesAnalysis)}

ANALYSE DES AUDIENCES:
${JSON.stringify(audiencesAnalysis)}

FORMAT DE RÉPONSE (JSON):
{
  "budgetRecommendations": [
    {
      "recommendation": "Augmenter de 30% le budget des campagnes ciblant les femmes 25-34 ans",
      "rationale": "Ce segment génère un ROAS 80% supérieur à la moyenne",
      "expectedImpact": "Augmentation du ROAS global de 0.4 point"
    },
    {
      "recommendation": "Réduire de 50% le budget des campagnes ciblant les hommes 65+",
      "rationale": "Ce segment a un CPA 120% plus élevé que la moyenne",
      "expectedImpact": "Réduction du CPA global de 15%"
    }
  ],
  "creativeRecommendations": [
    {
      "recommendation": "Augmenter la proportion de carrousels dans le mix créatif (de 20% à 40%)",
      "rationale": "Les carrousels ont un taux de conversion 45% supérieur aux images statiques",
      "expectedImpact": "Augmentation du taux de conversion global de 0.8 point"
    },
    {
      "recommendation": "Tester des messages plus émotionnels pour les audiences froides",
      "rationale": "Les messages émotionnels génèrent un CTR 35% plus élevé sur les nouvelles audiences",
      "expectedImpact": "Augmentation du CTR de 0.5 point"
    }
  ],
  "audienceRecommendations": [
    {
      "recommendation": "Créer des segments plus granulaires pour les 25-34 ans",
      "rationale": "Ce groupe d'âge montre des comportements d'achat très différenciés",
      "expectedImpact": "Amélioration du ROAS de 25% sur ce segment"
    },
    {
      "recommendation": "Étendre les audiences similaires de 1% à 3%",
      "rationale": "Les audiences similaires 1-3% montrent un bon équilibre performance/volume",
      "expectedImpact": "Augmentation du volume de conversions de 40%"
    }
  ],
  "optimizationRecommendations": [
    {
      "recommendation": "Passer à l'optimisation CBO (Campaign Budget Optimization) pour toutes les campagnes",
      "rationale": "Les campagnes CBO montrent un ROAS 20% supérieur aux campagnes ABO",
      "expectedImpact": "Augmentation du ROAS global de 0.3 point"
    },
    {
      "recommendation": "Implémenter une stratégie d'enchères dynamiques basée sur la valeur",
      "rationale": "Les enchères basées sur la valeur optimisent pour le LTV plutôt que la conversion simple",
      "expectedImpact": "Amélioration du ROAS à long terme de 35%"
    }
  ],
  "testingRecommendations": [
    {
      "recommendation": "Test A/B sur la longueur des vidéos (15s vs 30s)",
      "rationale": "Les données actuelles montrent des résultats contradictoires selon les audiences",
      "expectedImpact": "Identification du format optimal pour chaque segment"
    },
    {
      "recommendation": "Test multivarié sur les éléments créatifs (images, titres, descriptions)",
      "rationale": "Identifier les combinaisons les plus performantes",
      "expectedImpact": "Amélioration potentielle du CTR de 25-40%"
    }
  ],
  "actionPlan": {
    "immediate": [
      "Action immédiate 1: Réallocation budgétaire vers les segments performants",
      "Action immédiate 2: Pause des créatives sous-performantes"
    ],
    "shortTerm": [
      "Action court terme 1: Création de nouvelles audiences segmentées",
      "Action court terme 2: Développement de nouvelles créatives basées sur les insights"
    ],
    "longTerm": [
      "Action long terme 1: Refonte de la structure des campagnes",
      "Action long terme 2: Implémentation d'une stratégie d'enchères avancée"
    ]
  }
}`;

      // Appel à l'API OpenAI
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4-turbo',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.2,
          max_tokens: 2000
        })
      });

      if (!response.ok) {
        throw new Error(`Erreur API OpenAI: ${response.statusText}`);
      }

      const result = await response.json();
      const analysisContent = result.choices[0].message.content;
      
      // Parser le JSON renvoyé par l'IA
      let recommendations;
      try {
        recommendations = JSON.parse(analysisContent);
      } catch (e) {
        throw new Error("Erreur lors de la génération des recommandations: impossible de traiter la réponse de l'IA");
      }
      
      return recommendations;
    } catch (error) {
      console.error("Erreur lors de la génération des recommandations:", error);
      throw new Error(`Erreur lors de la génération des recommandations: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    }
  }

  /**
   * Calcule des statistiques de base pour enrichir le contexte du prompt
   */
  private static calculateBasicStats(data: AdvertisingData[]) {
    // Extraction des dates pour déterminer la plage temporelle
    const dates = data.map(item => item.date ? new Date(item.date) : null).filter(Boolean) as Date[];
    const sortedDates = [...dates].sort((a, b) => a.getTime() - b.getTime());
    const startDate = sortedDates[0];
    const endDate = sortedDates[sortedDates.length - 1];
    
    // Calcul des métriques de base
    const totalSpend = data.reduce((sum, item) => sum + (item.spend || 0), 0).toFixed(2);
    const totalImpressions = data.reduce((sum, item) => sum + (item.impressions || 0), 0);
    const totalClicks = data.reduce((sum, item) => sum + (item.clicks || 0), 0);
    const totalConversions = data.reduce((sum, item) => sum + (item.conversions || 0), 0);
    
    // Calcul des métriques dérivées
    const averageCTR = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '0';
    const averageCPC = totalClicks > 0 ? (Number(totalSpend) / totalClicks).toFixed(2) : '0';
    
    // Formatage de la plage de dates
    const dateRange = startDate && endDate 
      ? `${startDate.toLocaleDateString()} à ${endDate.toLocaleDateString()}` 
      : 'Non disponible';
    
    return {
      totalSpend,
      totalImpressions,
      totalClicks,
      totalConversions,
      averageCTR,
      averageCPC,
      dateRange
    };
  }
  
  /**
   * Extrait la plage de dates à partir des données
   */
  private static extractDateRange(data: AdvertisingData[]) {
    // Valeurs par défaut
    let start = '1970-01-01';
    let end = new Date().toISOString().split('T')[0];
    
    // Extraction des dates valides
    const dates = data
      .filter(item => item.date)
      .map(item => new Date(item.date as string))
      .filter(date => !isNaN(date.getTime()));
    
    if (dates.length > 0) {
      // Tri des dates
      dates.sort((a, b) => a.getTime() - b.getTime());
      
      // Format ISO pour les dates
      start = dates[0].toISOString().split('T')[0];
      end = dates[dates.length - 1].toISOString().split('T')[0];
    }
    
    // Calcul du nombre de jours
    const days = Math.floor((new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    return { start, end, days };
  }

  /**
   * Génère des prédictions basées sur des données historiques
   */
  static async generatePredictions(
    data: AdvertisingData[],
    predictionType: string,
    timeHorizon: string
  ): Promise<any> {
    try {
      // Limiter les données pour le prompt
      const sampleData = data.slice(0, 30);
      
      // Statistiques de base pour enrichir le contexte
      const basicStats = this.calculateBasicStats(data);
      
      const systemPrompt = `Vous êtes un expert en Facebook Ads et prédictions publicitaires avec une spécialisation en modélisation prédictive. Votre mission est d'analyser des données historiques Facebook Ads et de générer des prédictions précises basées sur ces données.

Utilisez les principes statistiques et les tendances du marché Facebook pour développer des prédictions fiables. Tenez compte:

1. Des saisonnalités (jours de la semaine, périodes de l'année)
2. Des tendances de coûts sur Facebook Ads (inflation publicitaire, compétition)
3. Des cycles de vie des audiences (saturation, fatigue publicitaire)
4. Des changements d'algorithme récents de Facebook
5. Des facteurs exogènes qui impactent les performances publicitaires Facebook`;
      
      const userPrompt = `
CONTEXTE:
Je suis un gestionnaire de campagnes Facebook Ads et j'ai besoin de prédictions détaillées concernant "${predictionType}" sur un horizon de ${timeHorizon}.

STATISTIQUES DE BASE:
- Dépenses totales: ${basicStats.totalSpend}€
- Impressions: ${basicStats.totalImpressions}
- Clics: ${basicStats.totalClicks}
- Conversions: ${basicStats.totalConversions}
- CTR moyen: ${basicStats.averageCTR}%
- CPC moyen: ${basicStats.averageCPC}€
- Période d'analyse: ${basicStats.dateRange}

DONNÉES HISTORIQUES FACEBOOK ADS:
${JSON.stringify(sampleData)}

INSTRUCTIONS:
1. Analysez attentivement les TENDANCES HISTORIQUES pour chaque métrique clé spécifique à Facebook Ads
2. Identifiez les FACTEURS D'INFLUENCE sur les performances (saisonnalité, saturations d'audience, etc.)
3. Générez des PRÉDICTIONS PRÉCISES avec des chiffres exacts pour chaque métrique principale
4. Pour chaque projection, fournissez un INTERVALLE DE CONFIANCE (meilleur/pire scénario)
5. Proposez des RECOMMANDATIONS CONCRÈTES d'optimisation basées sur ces projections
6. Suggérez des AJUSTEMENTS PRÉVENTIFS pour contrer les tendances négatives prévues
7. Identifiez les OPPORTUNITÉS SPÉCIFIQUES à Facebook pour maximiser les performances futures

FORMAT DE RÉPONSE (JSON):
{
  "title": "Prédiction détaillée: Évolution des performances Facebook Ads pour ${predictionType} sur ${timeHorizon}",
  "description": "Analyse prédictive basée sur les données historiques et les tendances du marché Facebook Ads, incluant une évaluation de l'impact des changements d'algorithme et de la saturation d'audience",
  "confidenceLevel": "Niveau de confiance statistique en pourcentage",
  "metrics": [
    { 
      "name": "CTR Facebook", 
      "current": valeur_actuelle_précise, 
      "predicted": valeur_future_précise, 
      "change": pourcentage_exact,
      "confidence": {
        "min": valeur_minimale_probable,
        "max": valeur_maximale_probable
      },
      "factors": ["Facteur influençant cette métrique 1", "Facteur 2"]
    },
    { 
      "name": "CPC Facebook", 
      "current": valeur_actuelle_précise, 
      "predicted": valeur_future_précise, 
      "change": pourcentage_exact,
      "confidence": {
        "min": valeur_minimale_probable,
        "max": valeur_maximale_probable
      },
      "factors": ["Facteur influençant cette métrique 1", "Facteur 2"]
    },
    { 
      "name": "Taux de conversion Facebook", 
      "current": valeur_actuelle_précise, 
      "predicted": valeur_future_précise, 
      "change": pourcentage_exact,
      "confidence": {
        "min": valeur_minimale_probable,
        "max": valeur_maximale_probable
      },
      "factors": ["Facteur influençant cette métrique 1", "Facteur 2"]
    },
    { 
      "name": "ROAS Facebook", 
      "current": valeur_actuelle_précise, 
      "predicted": valeur_future_précise, 
      "change": pourcentage_exact,
      "confidence": {
        "min": valeur_minimale_probable,
        "max": valeur_maximale_probable
      },
      "factors": ["Facteur influençant cette métrique 1", "Facteur 2"]
    },
    { 
      "name": "CPM Facebook", 
      "current": valeur_actuelle_précise, 
      "predicted": valeur_future_précise, 
      "change": pourcentage_exact,
      "confidence": {
        "min": valeur_minimale_probable,
        "max": valeur_maximale_probable
      },
      "factors": ["Facteur influençant cette métrique 1", "Facteur 2"]
    }
  ],
  "recommendations": [
    "Recommendation 1 ultra-spécifique à Facebook Ads avec pourcentages et valeurs précises",
    "Recommendation 2 ultra-spécifique à Facebook Ads avec pourcentages et valeurs précises",
    "Recommendation 3 ultra-spécifique à Facebook Ads avec pourcentages et valeurs précises"
  ],
  "preventiveActions": [
    "Action préventive 1 pour anticiper les changements prédits",
    "Action préventive 2 pour anticiper les changements prédits"
  ],
  "opportunitiesIdentified": [
    "Opportunité spécifique 1 pour Facebook Ads",
    "Opportunité spécifique 2 pour Facebook Ads"
  ]
}

IMPORTANT: Fournissez des prédictions ultra-précises, avec des chiffres exacts, des pourcentages précis, et des recommandations directement applicables spécifiquement pour Facebook Ads.
      `;

      // Appel à l'API OpenAI
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4-turbo',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.4,
          max_tokens: 1500
        })
      });

      if (!response.ok) {
        throw new Error(`Erreur API OpenAI: ${response.statusText}`);
      }

      const result = await response.json();
      const predictionContent = result.choices[0].message.content;
      
      // Parser le JSON
      try {
        return JSON.parse(predictionContent);
      } catch (e) {
        // Erreur lors du parsing de la réponse de l'IA
        throw new Error("Erreur lors de la génération des prédictions: impossible de traiter la réponse de l'IA");
      }
    } catch (error) {
      console.error('Erreur lors de la génération des prédictions:', error);
      // Propager l'erreur au lieu d'utiliser un fallback
      throw new Error(`Erreur lors de la génération des prédictions: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    }
  }
  
  /**
   * Suggère des visualisations pertinentes en fonction des données
   */
  static async suggestVisualizations(data: AdvertisingData[]): Promise<any> {
    try {
      // Limiter les données pour le prompt
      const sampleData = data.slice(0, 20);
      
      const systemPrompt = `Vous êtes un expert en data visualization et marketing digital. Suggérez les visualisations les plus pertinentes pour ces données publicitaires.`;
      
      const userPrompt = `
      Analysez ces données publicitaires et suggérez 3 visualisations pertinentes qui feraient ressortir des insights intéressants.
      
      Données: ${JSON.stringify(sampleData)}
      
      Format de réponse souhaité (JSON):
      {
        "visualizations": [
          {
            "type": "line|bar|pie|scatter",
            "title": "Titre du graphique",
            "description": "Ce que montre ce graphique",
            "dataMapping": {
              "xAxis": "champ à utiliser pour l'axe X",
              "yAxis": "champ à utiliser pour l'axe Y",
              "groupBy": "champ optionnel pour regrouper (platform, campaign_name, etc.)"
            }
          },
          {...},
          {...}
        ]
      }
      `;

      // Appel à l'API OpenAI
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4-turbo',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.3,
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        throw new Error(`Erreur API OpenAI: ${response.statusText}`);
      }

      const result = await response.json();
      const content = result.choices[0].message.content;
      
      // Parser le JSON
      try {
        return JSON.parse(content);
      } catch (e) {
        return { visualizations: [] };
      }
    } catch (error) {
      console.error('Erreur lors de la suggestion de visualisations:', error);
      return { visualizations: [] };
    }
  }

  private static preparePerformancePrompt(data: AdvertisingData[], metrics: any, kpiContext?: any): string {
    // Limiter le nombre d'entrées à 20 pour réduire la taille des données
    const sampleData = data.slice(0, 20);
    
    // Préparer un résumé des données pour réduire la taille
    const dataSummary = {
      totalEntries: data.length,
      dateRange: {
        start: data[0]?.date,
        end: data[data.length - 1]?.date
      },
      sampleData: sampleData.map(item => ({
        date: item.date,
        spend: item.spend,
        impressions: item.impressions,
        clicks: item.clicks,
        conversions: item.conversions,
        ctr: item.ctr,
        cpc: item.cpc,
        cpa: item.cpa
      }))
    };

    return `Analysez ces données publicitaires Facebook comme un media buyer expérimenté et fournissez des insights actionnables dans le format JSON suivant:

{
  "insights": [
    {
      "title": "Titre de l'insight stratégique",
      "description": "Description détaillée et actionnable de l'insight pour un media buyer, incluant des tactiques concrètes et des recommandations claires",
      "metrics": [
        {
          "name": "Nom de la métrique",
          "value": 123.45,
          "change": 12.3,
          "trend": "up|down|stable"
        }
      ],
      "actionItems": [
        "Action précise et quantifiée à entreprendre",
        "Changement spécifique à implémenter avec % d'ajustement"
      ]
    }
  ],
  "data": {
    "basicMetrics": {
      "totalSpend": 1234.56,
      "totalImpressions": 123456,
      "totalClicks": 1234,
      "totalConversions": 123,
      "avgCTR": 1.23,
      "avgCPC": 1.23,
      "avgCPA": 12.34,
      "avgConversionRate": 1.23,
      "roi": 123.45
    }
  }
}

DONNÉES D'ENTRÉE:
${JSON.stringify(dataSummary, null, 2)}

MÉTRIQUES DE BASE:
${JSON.stringify(metrics, null, 2)}

${kpiContext ? `CONTEXTE KPI:
${JSON.stringify(kpiContext, null, 2)}` : ''}

INSTRUCTIONS:
1. Analysez les performances publicitaires Facebook comme un media buyer expert
2. Générez des insights hautement actionnables avec des recommandations concrètes et chiffrées
3. Chaque insight doit être accompagné d'actions spécifiques à entreprendre avec des pourcentages précis 
4. Incluez des tactiques directement applicables pour optimiser les campagnes
5. Structurez la réponse exactement selon le format JSON fourni
6. Mentionnez des ajustements spécifiques d'enchères, de budget, de ciblage ou de créatifs
7. Analysez les jours/heures de performance optimale et les segments d'audience les plus rentables
8. Identifiez les goulots d'étranglement dans l'entonnoir de conversion

EXEMPLES D'INSIGHTS ACTIONNABLES:
- "Augmentez les enchères de 15-20% entre 18h et 22h le jeudi et vendredi où le ROAS est 2.4x supérieur à la moyenne"
- "Réallouez 35% du budget des campagnes de prospection mobile vers desktop où le CPA est 42% inférieur"
- "Réduisez la fréquence d'affichage à 2.0 pour les audiences similaires où l'efficacité chute de 68% après la 3ème impression"
- "Créez des segments spécifiques pour les utilisateurs iOS 14.5+ qui montrent un pattern de conversion différent (-23% de CVR)"

IMPORTANT:
- Fournissez au moins 5 insights extrêmement actionnables et spécifiques 
- Chaque insight doit inclure des métriques quantifiables et des actions chiffrées
- Concentrez-vous sur ce qu'un media buyer peut réellement implémenter dès aujourd'hui
- Mettez en évidence les opportunités immédiates d'optimisation avec des % précis
- Incluez des recommandations techniques précises (paramètres d'enchères, structures de campagne, etc.)`;
  }
} 