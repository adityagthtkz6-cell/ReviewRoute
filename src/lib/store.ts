import { ReviewResponse, BusinessConfig } from '@/types';
import { generateId } from '@/lib/utils';

export const businessConfigs: BusinessConfig[] = [
  {
    id: 'demo',
    name: 'Coastal Coffee Co.',
    tagline: 'Great coffee, great people',
    googleReviewUrl:
      process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ||
      'https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4',
    positiveThreshold: 4.0,
    negativeThreshold: 3.0,
    notificationEmail: 'owner@coastalcoffee.com',
    supportEmail: 'support@coastalcoffee.com',
    ctaCopy: 'Share your experience on Google',
    logoColor: '#6366f1',
  },
];

const now = Date.now();

export let responses: ReviewResponse[] = [
  {
    id: generateId(),
    businessId: 'demo',
    stars: 5,
    comment: 'Amazing coffee and super friendly staff! Will definitely come back.',
    sentiment: 'positive',
    confidence: 0.96,
    routingOutcome: 'google_review',
    flagged: false,
    channel: 'web',
    googleClicked: true,
    createdAt: new Date(now - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: generateId(),
    businessId: 'demo',
    stars: 2,
    comment: 'Waited 20 minutes for my order and it was cold when it arrived.',
    sentiment: 'negative',
    confidence: 0.91,
    routingOutcome: 'support',
    flagged: false,
    channel: 'email',
    googleClicked: false,
    supportSubmitted: true,
    createdAt: new Date(now - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: generateId(),
    businessId: 'demo',
    stars: 3,
    comment: 'Decent place, nothing special. The menu could use more variety.',
    sentiment: 'neutral',
    confidence: 0.78,
    routingOutcome: 'feedback_form',
    flagged: false,
    channel: 'web',
    googleClicked: false,
    createdAt: new Date(now - 6 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: generateId(),
    businessId: 'demo',
    stars: 5,
    comment: 'Best latte in the city. The barista remembered my order!',
    sentiment: 'positive',
    confidence: 0.98,
    routingOutcome: 'google_review',
    flagged: false,
    channel: 'sms',
    googleClicked: true,
    createdAt: new Date(now - 10 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: generateId(),
    businessId: 'demo',
    stars: 1,
    comment: 'Rude staff and the place was dirty. Never coming back.',
    sentiment: 'negative',
    confidence: 0.97,
    routingOutcome: 'support',
    flagged: false,
    channel: 'web',
    googleClicked: false,
    supportSubmitted: false,
    createdAt: new Date(now - 18 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: generateId(),
    businessId: 'demo',
    stars: 4,
    comment: 'Good coffee, slightly overpriced but the ambiance makes up for it.',
    sentiment: 'positive',
    confidence: 0.82,
    routingOutcome: 'google_review',
    flagged: false,
    channel: 'email',
    googleClicked: false,
    createdAt: new Date(now - 26 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: generateId(),
    businessId: 'demo',
    stars: 5,
    comment: 'My go-to spot every morning. Consistent quality every time.',
    sentiment: 'positive',
    confidence: 0.95,
    routingOutcome: 'google_review',
    flagged: false,
    channel: 'web',
    googleClicked: true,
    createdAt: new Date(now - 30 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: generateId(),
    businessId: 'demo',
    stars: 5,
    comment: 'Terrible service honestly.',
    sentiment: 'positive',
    confidence: 0.45,
    routingOutcome: 'google_review',
    flagged: true,
    flagReason: 'Star rating (5★) conflicts with negative text sentiment',
    channel: 'web',
    googleClicked: false,
    createdAt: new Date(now - 36 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: generateId(),
    businessId: 'demo',
    stars: 3,
    comment: 'It was okay. Not bad, not great.',
    sentiment: 'neutral',
    confidence: 0.88,
    routingOutcome: 'feedback_form',
    flagged: false,
    channel: 'sms',
    googleClicked: false,
    createdAt: new Date(now - 48 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: generateId(),
    businessId: 'demo',
    stars: 4,
    comment: 'Really enjoyable experience overall. Staff was very helpful.',
    sentiment: 'positive',
    confidence: 0.91,
    routingOutcome: 'google_review',
    flagged: false,
    channel: 'web',
    googleClicked: true,
    createdAt: new Date(now - 55 * 60 * 60 * 1000).toISOString(),
  },
];

export function getBusinessConfig(id: string): BusinessConfig | undefined {
  return businessConfigs.find(b => b.id === id);
}

export function addResponse(response: Omit<ReviewResponse, 'id' | 'createdAt'>): ReviewResponse {
  const newResponse: ReviewResponse = {
    ...response,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };
  responses = [newResponse, ...responses];
  return newResponse;
}

export function getResponses(businessId: string): ReviewResponse[] {
  return responses.filter(r => r.businessId === businessId);
}

export function markGoogleClicked(responseId: string): void {
  responses = responses.map(r =>
    r.id === responseId ? { ...r, googleClicked: true } : r
  );
}
