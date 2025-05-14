export interface AudienceSegment {
  id: string;
  name: string;
  type: 'highValue' | 'atRisk' | 'growth';
  metrics: {
    reach: number;
    impressions: number;
    clicks: number;
    ctr: number;
    costPerClick: number;
    spend: number;
    conversions: number;
    conversionRate: number;
    costPerConversion: number;
    engagementRate: number;
    frequency: number;
  };
  characteristics: {
    age?: string[];
    gender?: string[];
    location?: string[];
    interests?: string[];
    devices?: string[];
  };
  score: number;
  recommendations: string[];
} 