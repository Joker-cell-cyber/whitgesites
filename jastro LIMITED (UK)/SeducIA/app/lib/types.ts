/**
 * Types partagés pour l'application
 */

export interface Article {
  id: string;
  title: string;
  content?: string;
  excerpt?: string;
  status: 'draft' | 'published';
  category?: string;
  tags?: string[];
  seoScore?: number;
  readingTime?: number;
  wordCount?: number;
  tokensUsed?: number;
  slug?: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt?: Date;
  publishedAt?: Date;
  author?: string;
} 