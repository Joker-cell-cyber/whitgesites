/**
 * Types pour l'analyse des créatifs publicitaires
 */

export type CreativeType = 'image' | 'video' | 'carousel' | 'collection' | 'stories';
export type CreativeFormat = 'square' | 'landscape' | 'portrait' | 'stories';
export type CreativeEmotion = 'joy' | 'trust' | 'fear' | 'surprise' | 'sadness' | 'disgust' | 'anger' | 'anticipation' | 'neutral';
export type CreativeColor = 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'orange' | 'black' | 'white' | 'multicolor';
export type VisualElement = 'person' | 'product' | 'text' | 'logo' | 'nature' | 'lifestyle' | 'animation';
export type CallToAction = 'shop_now' | 'learn_more' | 'sign_up' | 'download' | 'contact_us' | 'book_now' | 'get_offer' | 'other';

// Métadonnées pour un créatif
export interface CreativeMetadata {
  id: string;
  name: string;
  type: CreativeType;
  format: CreativeFormat;
  primaryMessage: string;
  headline?: string;
  description?: string;
  callToAction: CallToAction;
  targetEmotion: CreativeEmotion[];
  dominantColors: CreativeColor[];
  visualElements: VisualElement[];
  hasPeople: boolean;
  hasText: boolean;
  testHypothesis?: string;
  notes?: string;
}

// Performance d'un créatif
export interface CreativePerformance {
  creativeId: string;
  impressions: number;
  clicks: number;
  ctr: number;
  conversions: number;
  conversionRate: number;
  cpa: number;
  engagement: number;
  engagementRate: number;
  videoWatchTime?: number;
  videoCompletionRate?: number;
}

// Analyse complète d'un créatif
export interface CreativeAnalysis {
  metadata: CreativeMetadata;
  performance: CreativePerformance;
  insights: CreativeInsight[];
  similarCreatives: string[]; // IDs de créatifs similaires
  recommendations: CreativeRecommendation[];
}

// Insight spécifique à un créatif
export interface CreativeInsight {
  id: string;
  title: string;
  description: string;
  relatedElement: 'message' | 'visual' | 'format' | 'emotion' | 'callToAction';
  impact: 'positive' | 'negative' | 'neutral';
  confidence: number; // 0-1
}

// Recommandation pour l'amélioration d'un créatif
export interface CreativeRecommendation {
  id: string;
  title: string;
  description: string;
  elementToModify: 'message' | 'visual' | 'format' | 'callToAction';
  suggestedChange: string;
  expectedImpact: {
    metric: string;
    improvement: number; // pourcentage estimé d'amélioration
  };
  testingApproach: string;
} 