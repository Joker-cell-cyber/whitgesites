/**
 * Types pour l'analyse de données Facebook Ads
 */

// Types pour les données publicitaires
export type Platform = 'facebook';
export type AnalysisType = 'macro' | 'micro' | 'campaign' | 'creative' | 'audience' | 'placement' | 'complete';

// Structure pour les données Facebook Ads (Modèle enrichi)
export interface AdvertisingData {
  [key: string]: any;
  // Informations temporelles
  date?: string;
  timestamp?: string;
  year?: number;
  month?: number;
  day?: number;
  day_of_week?: number;
  hour?: number;
  
  // Structure des campagnes
  account_id?: string;
  account_name?: string;
  campaign_id?: string;
  campaign_name?: string;
  campaign_objective?: string;
  campaign_buying_type?: string;
  campaign_bid_strategy?: string;
  campaign_start_date?: string;
  campaign_end_date?: string;
  campaign_budget?: number;
  campaign_budget_type?: string;
  campaign_status?: string;
  campaign_optimization_goal?: string;
  
  // Structure des ensembles d'annonces
  adset_id?: string;
  adset_name?: string;
  adset_start_date?: string;
  adset_end_date?: string;
  adset_budget?: number;
  adset_budget_type?: string;
  adset_status?: string;
  
  // Structure des annonces
  ad_id?: string;
  ad_name?: string;
  ad_status?: string;
  
  // Informations créatives
  creative_id?: string;
  creative_name?: string;
  creative_type?: string;
  creative_format?: 'image' | 'video' | 'carousel' | 'collection' | 'slideshow' | 'stories' | 'messenger' | 'text';
  creative_asset_url?: string;
  creative_headline?: string;
  creative_primary_text?: string;
  creative_description?: string;
  creative_call_to_action?: string;
  creative_link_url?: string;
  creative_image_hash?: string;
  creative_video_id?: string;
  creative_url_parameters?: string;
  creative_version?: string;
  
  // Métriques de base
  spend?: number;
  impressions?: number;
  reach?: number;
  frequency?: number;
  
  // Métriques d'engagement
  clicks?: number;
  unique_clicks?: number;
  link_clicks?: number;
  unique_link_clicks?: number;
  outbound_clicks?: number;
  unique_outbound_clicks?: number;
  post_engagement?: number;
  post_reactions?: number;
  post_comments?: number;
  post_shares?: number;
  video_views?: number;
  video_p25_watched?: number;
  video_p50_watched?: number;
  video_p75_watched?: number;
  video_p100_watched?: number;
  video_avg_watch_time?: number;
  video_30s_views?: number;
  
  // Métriques calculées
  cpm?: number;
  cpc?: number;
  ctr?: number;
  cpp?: number;
  cost_per_link_click?: number;
  cost_per_outbound_click?: number;
  cost_per_unique_click?: number;
  cost_per_unique_link_click?: number;
  cost_per_video_view?: number;
  
  // Métriques de conversion
  conversions?: number;
  landing_page_views?: number;
  add_to_cart?: number;
  initiate_checkout?: number;
  purchase?: number;
  leads_generated?: number;
  complete_registration?: number;
  mobile_app_installs?: number;
  
  // Métriques de conversion calculées
  cost_per_result?: number;
  cost_per_lead?: number;
  cost_per_purchase?: number;
  conversion_rate?: number;
  cpa?: number;
  purchase_value?: number;
  roas?: number;
  
  // Métriques de qualité
  quality_ranking?: string;
  engagement_rate_ranking?: string;
  conversion_rate_ranking?: string;
  
  // Informations de ciblage
  target_audience_type?: string;
  target_lookalike_percentage?: number;
  target_interest_categories?: string;
  target_custom_audience_type?: string;
  target_custom_audience_days?: number;
  target_age_min?: number;
  target_age_max?: number;
  target_gender?: string;
  target_languages?: string;
  target_placements?: string;
  target_device_platforms?: string;
  target_publisher_platforms?: string;
  
  // Informations démographiques et de placement
  placement?: string;
  placement_position?: string;
  device_platform?: string;
  device?: string;
  platform?: Platform;
  country?: string;
  region?: string;
  age_range?: string;
  gender?: string;
  
  // Métriques d'attribution
  attribution_setting?: string;
  attribution_windows?: string;
  
  // Métriques avancées
  relevance_score?: number;
  estimated_ad_recall_rate?: number;
  first_time_impression_ratio?: number;
  positive_feedback?: number;
  negative_feedback?: number;
  messaging_replies?: number;
  messaging_conversations?: number;
  
  // Méta-informations
  meta_tags?: string[];
  date_generated?: string;
  source_file?: string;
  data_source?: string;
}

// Type pour une campagne publicitaire
export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed' | 'archived' | 'deleted';
  objective: string;
  buying_type: string;
  bid_strategy: string;
  spend: number;
  budget: number;
  budget_type: string;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
  cpm: number;
  frequency: number;
  reach: number;
  conversionRate: number;
  costPerConversion: number;
  roas?: number;
  quality_metrics?: {
    relevance_score?: number;
    quality_ranking?: string;
    engagement_rate_ranking?: string;
    conversion_rate_ranking?: string;
  };
  startDate: string;
  endDate: string;
  platform: string;
  adSets?: AdSet[];
  targeting?: Targeting;
  objectives: string[];
  optimization_goal: string;
  attribution_setting: string;
  attribution_windows: string[];
}

// Type pour un ensemble d'annonces
export interface AdSet {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed' | 'archived' | 'deleted';
  spend: number;
  budget: number;
  budget_type: string;
  impressions: number;
  clicks: number;
  conversions: number;
  frequency: number;
  reach: number;
  ctr: number;
  cpc: number;
  conversionRate: number;
  targeting: Targeting;
  optimization_goal: string;
  bid_amount?: number;
  bid_strategy?: string;
  start_date: string;
  end_date: string;
  ads: Ad[];
}

// Type pour une annonce
export interface Ad {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed' | 'archived' | 'deleted';
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
  conversionRate: number;
  frequency: number;
  reach: number;
  adCreative: Creative;
  quality_ranking?: string;
  engagement_rate_ranking?: string;
  conversion_rate_ranking?: string;
  placements: string[];
  performance_by_placement?: Record<string, {
    impressions: number;
    clicks: number;
    ctr: number;
    conversions: number;
  }>;
}

// Type pour les créatifs
export interface Creative {
  id: string;
  name: string;
  format: 'image' | 'video' | 'carousel' | 'collection' | 'slideshow' | 'stories' | 'messenger' | 'text';
  headline?: string;
  primary_text?: string;
  description?: string;
  call_to_action?: string;
  link_url?: string;
  asset_url?: string;
  link_parameters?: string;
  image_hash?: string;
  video_id?: string;
  carousel_cards?: CarouselCard[];
  technical_specs?: {
    width?: number;
    height?: number;
    aspect_ratio?: string;
    duration?: number;
    file_type?: string;
    file_size?: number;
  };
  version?: string;
  creation_date?: string;
}

// Type pour une carte de carousel
export interface CarouselCard {
  id: string;
  position: number;
  headline?: string;
  description?: string;
  image_hash?: string;
  image_url?: string;
  video_id?: string;
  link_url?: string;
  call_to_action?: string;
  performance?: {
    clicks?: number;
    impressions?: number;
    ctr?: number;
    conversions?: number;
  };
}

// Type pour le ciblage
export interface Targeting {
  demographics?: {
    ageRange?: [number, number] | string[];
    gender?: ('male' | 'female' | 'all')[] | string[];
    locations?: {
      type: 'country' | 'region' | 'city' | 'zip';
      values: string[];
    }[];
    languages?: string[];
    education?: string[];
    work?: string[];
    relationship_status?: string[];
    life_events?: string[];
    industries?: string[];
    income?: string[];
    home_ownership?: string[];
    home_type?: string[];
    generations?: string[];
    family_statuses?: string[];
  };
  interests?: {
    category: string;
    name: string;
    id: string;
  }[];
  behaviors?: {
    category: string;
    name: string;
    id: string;
  }[];
  custom_audiences?: {
    id: string;
    name: string;
    type: 'website' | 'app' | 'customer_list' | 'engagement' | 'lookalike';
    description?: string;
    size?: number;
    retention_days?: number;
    lookalike_percentage?: number;
    source_audience_id?: string;
  }[];
  excluded_audiences?: {
    id: string;
    name: string;
    type: string;
  }[];
  connections?: string[];
  friends_of_connections?: boolean;
  device_platforms?: ('desktop' | 'mobile' | 'all')[];
  mobile_devices?: string[];
  platforms?: ('facebook' | 'instagram' | 'audience_network' | 'messenger')[];
  placements?: {
    platform: string;
    position: string;
    device_types?: string[];
  }[];
  publisher_platforms?: ('facebook' | 'instagram' | 'audience_network' | 'messenger')[];
  targeting_optimization?: string;
  excluded_publisher_categories?: string[];
  excluded_publisher_list_ids?: string[];
  brand_safety_content_filter_levels?: string[];
}

// Options pour l'analyse
export interface AnalysisOptions {
  platform?: Platform;
  dateRange?: {
    start: string;
    end: string;
  };
  analysisType: AnalysisType;
  includeRecommendations: boolean;
  includeProjections: boolean;
  includeBenchmarks?: boolean;
  includeCreativeAnalysis?: boolean;
  includeAudienceInsights?: boolean;
  includePlacementAnalysis?: boolean;
  compareWithPreviousPeriod?: boolean;
  groupBy?: 'day' | 'week' | 'month' | 'campaign' | 'adset' | 'ad' | 'creative' | 'placement' | 'audience';
  focusMetrics?: string[];
  fileType?: string;
  metaTagsFilter?: string[];
  campaignsFilter?: string[];
  minSpend?: number;
  predictHorizon?: '7d' | '14d' | '30d' | '60d' | '90d';
  confidenceLevel?: 'high' | 'medium' | 'low';
  includeCostProjections?: boolean;
  deviceFilter?: string[];
  placementFilter?: string[];
  demographicFilter?: string[];
}

// Structure du résultat d'analyse
export interface AnalysisResult {
  id: string;
  metrics: {
    totalSpend: number;
    totalImpressions: number;
    totalClicks: number;
    totalConversions: number;
    totalReach?: number;
    averageFrequency?: number;
    ctr: number;
    cpc: number;
    cpm?: number;
    conversionRate: number;
    cpa: number;
    roi: number;
    roas?: number;
    costPerOutboundClick?: number;
    costPerVideoView?: number;
    videoCompletionRate?: number;
    engagementRate?: number;
    clickThroughConversionRate?: number;
    returnOnAdSpend?: number;
    costPerMille?: number;
    costPerThousandReached?: number;
    qualityScoreAverage?: number;
    relevanceScoreAverage?: number;
    projections?: PerformanceProjection;
    [key: string]: any;
  };
  insights: string[];
  trends: PerformanceTrend[];
  anomalies: PerformanceAnomaly[];
  recommendations: string[];
  actionPlan?: {
    immediate: string[];
    shortTerm: string[];
    mediumTerm: string[];
    longTerm: string[];
    testing: string[];
  };
  budgetRecommendations?: BudgetRecommendation[];
  creativeInsights?: CreativeInsight[];
  audienceInsights?: AudienceInsight[];
  placementInsights?: PlacementInsight[];
  competitiveBenchmarks?: CompetitiveBenchmark[];
  abtestRecommendations?: ABTestRecommendation[];
  visualizations?: VisualizationData;
  platform: Platform;
  analysisType: AnalysisType;
  dataPoints: number;
  dateRange: {
    start: string;
    end: string;
    days: number;
  };
  timestamp: string;
  qualityScore: number;
  confidenceLevel: 'high' | 'medium' | 'low';
}

// Types pour les projections
export interface PerformanceProjection {
  nextPeriod: {
    spend: number;
    impressions: number;
    clicks: number;
    conversions: number;
    ctr: number;
    cpc: number;
    cpa: number;
    roas: number;
  };
  confidence: number;
  factors: string[];
  scenarioAnalysis: {
    optimistic: any;
    expected: any;
    conservative: any;
  };
  seasonalityImpact: any;
  budgetScalingProjections: {
    increaseByTenPercent: any;
    increaseByTwentyPercent: any;
    increaseByFiftyPercent: any;
    decreaseByTenPercent: any;
    decreaseByTwentyPercent: any;
  };
}

// Types pour les tendances
export interface PerformanceTrend {
  metric: string;
  values: number[];
  dates: string[];
  change: number;
  changePercentage: number;
  direction: 'increasing' | 'decreasing' | 'stable';
  significance: 'high' | 'medium' | 'low';
  seasonalityAdjusted: boolean;
  description: string;
  visualizationType: 'line' | 'bar' | 'scatter';
}

// Types pour les anomalies
export interface PerformanceAnomaly {
  metric: string;
  date: string;
  expectedValue: number;
  actualValue: number;
  deviation: number;
  deviationPercentage: number;
  significance: 'high' | 'medium' | 'low';
  possibleCauses: string[];
  recommendedActions: string[];
  description: string;
  impactEstimate: {
    spend: number;
    conversions: number;
  };
}

// Types pour les recommandations budgétaires
export interface BudgetRecommendation {
  campaignId?: string;
  campaignName?: string;
  currentBudget: number;
  recommendedBudget: number;
  changePercentage: number;
  expectedImpact: {
    conversions: number;
    cpa: number;
    roas: number;
  };
  confidence: number;
  reasoning: string;
  implementationDifficulty: 'easy' | 'medium' | 'hard';
  priority: 'high' | 'medium' | 'low';
  timeHorizon: 'immediate' | 'short' | 'medium' | 'long';
}

// Types pour les insights créatifs
export interface CreativeInsight {
  type: 'image' | 'video' | 'carousel' | 'text' | 'format' | 'element' | 'color';
  finding: string;
  performance: {
    metric: string;
    value: number;
    benchmark: number;
    improvement: number;
  };
  examples: string[];
  recommendations: string[];
  abTestIdea?: string;
  confidence: number;
}

// Types pour les insights d'audience
export interface AudienceInsight {
  segment: string;
  type: 'demographic' | 'interest' | 'behavior' | 'lookalike' | 'custom';
  performance: {
    ctr?: number;
    cpc?: number;
    conversionRate?: number;
    cpa?: number;
    roas?: number;
  };
  benchmarkComparison: number;
  volumeEstimate: number;
  competitionLevel: 'high' | 'medium' | 'low';
  saturationLevel: 'high' | 'medium' | 'low';
  frequencyRecommendation: number;
  growthOpportunity: 'high' | 'medium' | 'low';
  recommendedActions: string[];
}

// Types pour les insights de placement
export interface PlacementInsight {
  placement: string;
  platform: string;
  position: string;
  device?: string;
  performance: {
    impressions: number;
    clicks: number;
    ctr: number;
    conversions: number;
    cpa: number;
    roas: number;
  };
  efficiency: number;
  recommendedBidModifier: number;
  creativesRecommendations: string[];
  bestTimeOfDay?: number[];
  bestDayOfWeek?: number[];
  competitionLevel: 'high' | 'medium' | 'low';
  recommendedActions: string[];
}

// Types pour les benchmarks compétitifs
export interface CompetitiveBenchmark {
  metric: string;
  industry: string;
  benchmarkValue: number;
  yourValue: number;
  difference: number;
  percentileBucket: string;
  trend: 'improving' | 'steady' | 'declining';
  seasonalityAdjusted: boolean;
}

// Types pour les recommandations de test A/B
export interface ABTestRecommendation {
  testType: 'creative' | 'audience' | 'placement' | 'objective' | 'bidding';
  hypothesis: string;
  control: string;
  variations: string[];
  expectedImpact: {
    metric: string;
    improvement: number;
  };
  recommendedBudget: number;
  recommendedDuration: number;
  confidence: number;
  complexity: 'simple' | 'medium' | 'complex';
  priorityScore: number;
}

// Types pour la visualisation
export interface VisualizationData {
  timeSeriesData: {
    labels: string[];
    datasets: any[];
  };
  compareData: {
    labels: string[];
    datasets: any[];
  };
  distributionData: {
    labels: string[];
    datasets: any[];
  };
  funnelData: {
    labels: string[];
    datasets: any[];
  };
  creativeComparisonData?: {
    labels: string[];
    datasets: any[];
  };
  audienceComparisonData?: {
    labels: string[];
    datasets: any[];
  };
  placementComparisonData?: {
    labels: string[];
    datasets: any[];
  };
  anomalyDetectionData?: {
    labels: string[];
    datasets: any[];
  };
  regressionAnalysisData?: {
    labels: string[];
    datasets: any[];
  };
  predictiveModelData?: {
    labels: string[];
    datasets: any[];
  };
  heatmapData?: {
    labels: {
      x: string[];
      y: string[];
    };
    data: number[][];
  };
}

// Type pour le stockage temporaire des analyses
export interface AnalysisSession {
  uploadedData: AdvertisingData[];
  options: AnalysisOptions;
  initialAnalysis?: {
    basicMetrics: any;
    dataStructure: any;
    platformDetected: Platform;
    dataQualityScore: number;
    fieldsIdentified: string[];
    missingFields: string[];
    dateRange: {
      start: string;
      end: string;
      days: number;
    };
    outliers: any[];
  };
  aiAnalysis?: {
    insights: string[];
    trends: PerformanceTrend[];
    anomalies: PerformanceAnomaly[];
    creativeInsights?: CreativeInsight[];
    audienceInsights?: AudienceInsight[];
    placementInsights?: PlacementInsight[];
  };
  visualizationData?: VisualizationData;
  recommendations?: {
    recommendations: string[];
    actionPlan: {
      immediate: string[];
      shortTerm: string[];
      mediumTerm: string[];
      longTerm: string[];
      testing: string[];
    };
    budgetRecommendations: BudgetRecommendation[];
    abtestRecommendations?: ABTestRecommendation[];
  };
  projections?: PerformanceProjection;
  finalResult?: AnalysisResult;
  processSteps?: {
    dataImport: 'pending' | 'processing' | 'completed' | 'error';
    dataPreprocessing: 'pending' | 'processing' | 'completed' | 'error';
    aiAnalysis: 'pending' | 'processing' | 'completed' | 'error';
    visualization: 'pending' | 'processing' | 'completed' | 'error';
    recommendations: 'pending' | 'processing' | 'completed' | 'error';
    projections: 'pending' | 'processing' | 'completed' | 'error';
    finalReport: 'pending' | 'processing' | 'completed' | 'error';
  };
  errors?: {
    step: string;
    message: string;
    timestamp: string;
    details?: any;
  }[];
  analysisStartTime?: string;
  analysisEndTime?: string;
  analysisDuration?: number;
}

// Type pour un rapport
export interface Report {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt?: string;
  analysisId: string;
  format: 'pdf' | 'csv' | 'json' | 'xlsx' | 'pptx' | 'html';
  downloadUrl?: string;
  size?: number;
  pages?: number;
  thumbnail?: string;
  isTemplate?: boolean;
  templateId?: string;
  isAutoGenerated?: boolean;
  scheduledReportId?: string;
  tags?: string[];
  sharedWith?: string[];
  publicAccessToken?: string;
  isPublic?: boolean;
  viewCount?: number;
  downloadCount?: number;
}

// Formats d'importation supportés
export type ImportFormat = 'csv' | 'json' | 'xlsx' | 'xml' | 'api' | 'manual';

// Options d'exportation
export interface ExportOptions {
  format: 'pdf' | 'csv' | 'json' | 'xlsx' | 'pptx' | 'html';
  includeCharts: boolean;
  includeRawData: boolean;
  includeSummary: boolean;
  includeRecommendations: boolean;
  includeProjections?: boolean;
  includeAnomalies?: boolean;
  includeCreativeInsights?: boolean;
  includeAudienceInsights?: boolean;
  includePlacementInsights?: boolean;
  includeCompetitiveBenchmarks?: boolean;
  includeBudgetRecommendations?: boolean;
  includeTestingRecommendations?: boolean;
  template?: string;
  customBranding?: {
    logo?: string;
    primaryColor?: string;
    secondaryColor?: string;
    font?: string;
    companyName?: string;
    contactInfo?: string;
  };
  emailRecipients?: string[];
  scheduleFrequency?: 'once' | 'daily' | 'weekly' | 'monthly';
  scheduleTime?: string;
  password?: string;
  watermark?: boolean;
}

// Type pour les configurations des templates d'importation
export interface ImportTemplate {
  id: string;
  name: string;
  description: string;
  format: ImportFormat;
  example: string;
  requiredFields: string[];
  optionalFields: string[];
  fieldMappings: {
    [csvField: string]: keyof AdvertisingData;
  };
  previewImage?: string;
  instructions: string;
  createdAt: string;
  updatedAt?: string;
  source: 'facebook' | 'system' | 'custom';
  version: string;
  isDefault: boolean;
  columnDelimiter?: string;
  hasHeaderRow?: boolean;
  dateFormat?: string;
  popularity?: number;
} 