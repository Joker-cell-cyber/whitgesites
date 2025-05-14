export interface CreativeInsight {
  id?: string;
  type: 'bestPerforming' | 'underperforming';
  creativeId?: string;
  metrics: {
    impressions: number;
    clicks: number;
    conversions: number;
    spend: number;
    reach: number;
    frequency: number;
    ctr: number;
    cpc: number;
    costPerClick: number;
    conversionRate: number;
    cpa: number;
    costPerConversion: number;
    roas: number;
    engagementRate: number;
    engagement: number;
    shareRate: number;
    commentRate: number;
    saveRate: number;
  };
  characteristics?: {
    type?: string;
    format?: string;
    concept?: string;
    angle?: string;
  };
  score?: number;
  recommendations?: string[];
  insight: string;
} 