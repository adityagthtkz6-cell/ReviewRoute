import { SentimentCategory, RoutingOutcome, SentimentResult } from '@/types';

function getRoutingOutcome(sentiment: SentimentCategory): RoutingOutcome {
  switch (sentiment) {
    case 'positive': return 'google_review';
    case 'neutral': return 'feedback_form';
    case 'negative': return 'support';
  }
}

function starBasedSentiment(
  stars: number,
  positiveThreshold: number,
  negativeThreshold: number
): SentimentCategory {
  if (stars >= positiveThreshold) return 'positive';
  if (stars < negativeThreshold) return 'negative';
  return 'neutral';
}

const NEGATIVE_KEYWORDS = [
  'terrible', 'awful', 'horrible', 'disgusting', 'worst', 'never', 'bad',
  'rude', 'dirty', 'cold', 'slow', 'wrong', 'broken', 'disappointed', 'waste',
];

const POSITIVE_KEYWORDS = [
  'amazing', 'great', 'excellent', 'fantastic', 'wonderful', 'best', 'love',
  'perfect', 'awesome', 'outstanding', 'delicious', 'friendly', 'recommend',
];

function analyzeTextLocally(text: string): { sentiment: SentimentCategory; confidence: number } {
  if (!text.trim()) return { sentiment: 'neutral', confidence: 0.6 };

  const lower = text.toLowerCase();
  let negScore = NEGATIVE_KEYWORDS.filter(k => lower.includes(k)).length;
  let posScore = POSITIVE_KEYWORDS.filter(k => lower.includes(k)).length;

  if (negScore > posScore) return { sentiment: 'negative', confidence: Math.min(0.5 + negScore * 0.08, 0.85) };
  if (posScore > negScore) return { sentiment: 'positive', confidence: Math.min(0.5 + posScore * 0.08, 0.85) };
  return { sentiment: 'neutral', confidence: 0.65 };
}

export async function analyzeSentiment(
  stars: number,
  comment: string,
  positiveThreshold: number = 4.0,
  negativeThreshold: number = 3.0
): Promise<SentimentResult> {
  const baseSentiment = starBasedSentiment(stars, positiveThreshold, negativeThreshold);

  if (!process.env.OPENAI_API_KEY) {
    const textAnalysis = comment.trim() ? analyzeTextLocally(comment) : null;
    let finalSentiment = baseSentiment;
    let confidence = 0.80;
    let flagged = false;
    let flagReason: string | undefined;

    if (textAnalysis) {
      const sentimentOrder: SentimentCategory[] = ['negative', 'neutral', 'positive'];
      const starIdx = sentimentOrder.indexOf(baseSentiment);
      const textIdx = sentimentOrder.indexOf(textAnalysis.sentiment);
      const divergence = Math.abs(starIdx - textIdx);

      if (divergence >= 2) {
        flagged = true;
        flagReason = `Star rating (${stars}★) conflicts with ${textAnalysis.sentiment} text sentiment`;
        confidence = 0.45;
      } else if (divergence === 1) {
        confidence = 0.68;
      } else {
        confidence = Math.min(0.80 + textAnalysis.confidence * 0.15, 0.97);
      }
    }

    return {
      sentiment: finalSentiment,
      confidence: Math.round(confidence * 100) / 100,
      flagged: flagged || confidence < 0.70,
      flagReason,
      routingOutcome: getRoutingOutcome(finalSentiment),
    };
  }

  try {
    const { default: OpenAI } = await import('openai');
    const client = new OpenAI();

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a sentiment analysis engine for customer reviews. Return valid JSON only.',
        },
        {
          role: 'user',
          content: `Analyze this customer review:
Star rating: ${stars}/5
Comment: "${comment || '(no comment provided)'}"
Positive threshold: ${positiveThreshold}★, Negative threshold: <${negativeThreshold}★

Return JSON with these exact fields:
{
  "sentiment": "positive" | "neutral" | "negative",
  "confidence": 0.0-1.0,
  "textSentiment": "positive" | "neutral" | "negative",
  "conflictDetected": boolean,
  "conflictReason": string | null
}`,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0,
      max_tokens: 200,
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');
    const aiSentiment: SentimentCategory = result.sentiment || baseSentiment;
    const confidence: number = result.confidence ?? 0.75;
    const isLowConfidence = confidence < 0.70;

    return {
      sentiment: aiSentiment,
      confidence: Math.round(confidence * 100) / 100,
      flagged: result.conflictDetected || isLowConfidence,
      flagReason: result.conflictReason || (isLowConfidence ? 'Low confidence classification' : undefined),
      routingOutcome: getRoutingOutcome(aiSentiment),
    };
  } catch {
    const fallback = starBasedSentiment(stars, positiveThreshold, negativeThreshold);
    return {
      sentiment: fallback,
      confidence: 0.72,
      flagged: false,
      routingOutcome: getRoutingOutcome(fallback),
    };
  }
}
