import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { SentimentCategory, RoutingOutcome, ReviewResponse, DashboardStats } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
}

export function formatRelativeTime(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function getSentimentColor(sentiment: SentimentCategory): string {
  switch (sentiment) {
    case 'positive': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
    case 'neutral': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
    case 'negative': return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
  }
}

export function getRoutingLabel(outcome: RoutingOutcome): string {
  switch (outcome) {
    case 'google_review': return 'Google Review';
    case 'feedback_form': return 'Feedback Form';
    case 'support': return 'Support';
  }
}

export function getRoutingColor(outcome: RoutingOutcome): string {
  switch (outcome) {
    case 'google_review': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    case 'feedback_form': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
    case 'support': return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
  }
}

export function computeStats(responses: ReviewResponse[]): DashboardStats {
  const total = responses.length;
  if (total === 0) {
    return {
      totalReviews: 0,
      avgRating: 0,
      googleConversionRate: 0,
      negativeIntercepted: 0,
      positiveCount: 0,
      neutralCount: 0,
      negativeCount: 0,
      flaggedCount: 0,
    };
  }

  const avgRating = responses.reduce((sum, r) => sum + r.stars, 0) / total;
  const positiveCount = responses.filter(r => r.sentiment === 'positive').length;
  const neutralCount = responses.filter(r => r.sentiment === 'neutral').length;
  const negativeCount = responses.filter(r => r.sentiment === 'negative').length;
  const googleClicked = responses.filter(r => r.googleClicked).length;
  const googleConversionRate = positiveCount > 0 ? (googleClicked / positiveCount) * 100 : 0;
  const flaggedCount = responses.filter(r => r.flagged).length;

  return {
    totalReviews: total,
    avgRating: Math.round(avgRating * 10) / 10,
    googleConversionRate: Math.round(googleConversionRate),
    negativeIntercepted: negativeCount,
    positiveCount,
    neutralCount,
    negativeCount,
    flaggedCount,
  };
}
