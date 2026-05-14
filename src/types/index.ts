export type SentimentCategory = 'positive' | 'neutral' | 'negative';
export type RoutingOutcome = 'google_review' | 'feedback_form' | 'support';
export type Channel = 'web' | 'email' | 'sms';

export interface ReviewResponse {
  id: string;
  businessId: string;
  customerName?: string;
  stars: number;
  comment: string;
  sentiment: SentimentCategory;
  confidence: number;
  routingOutcome: RoutingOutcome;
  flagged: boolean;
  flagReason?: string;
  channel: Channel;
  googleClicked?: boolean;
  supportSubmitted?: boolean;
  createdAt: string;
}

export interface BusinessConfig {
  id: string;
  name: string;
  tagline: string;
  googleReviewUrl: string;
  positiveThreshold: number;
  negativeThreshold: number;
  notificationEmail: string;
  supportEmail: string;
  ctaCopy: string;
  logoColor: string;
}

export interface SentimentResult {
  sentiment: SentimentCategory;
  confidence: number;
  flagged: boolean;
  flagReason?: string;
  routingOutcome: RoutingOutcome;
}

export interface SubmitPayload {
  stars: number;
  comment: string;
  businessId?: string;
  channel?: Channel;
}

export interface DashboardStats {
  totalReviews: number;
  avgRating: number;
  googleConversionRate: number;
  negativeIntercepted: number;
  positiveCount: number;
  neutralCount: number;
  negativeCount: number;
  flaggedCount: number;
}
