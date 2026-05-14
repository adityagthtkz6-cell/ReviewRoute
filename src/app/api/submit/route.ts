import { NextRequest, NextResponse } from 'next/server';
import { analyzeSentiment } from '@/lib/sentiment';
import { addResponse, getBusinessConfig } from '@/lib/store';
import { SubmitPayload } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body: SubmitPayload = await req.json();
    const { stars, comment = '', businessId = 'demo', channel = 'web' } = body;

    if (!stars || stars < 1 || stars > 5) {
      return NextResponse.json({ error: 'Invalid star rating (1–5 required)' }, { status: 400 });
    }

    const business = getBusinessConfig(businessId);
    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 });
    }

    const sentimentResult = await analyzeSentiment(
      stars,
      comment,
      business.positiveThreshold,
      business.negativeThreshold
    );

    const saved = addResponse({
      businessId,
      stars,
      comment,
      channel,
      sentiment: sentimentResult.sentiment,
      confidence: sentimentResult.confidence,
      routingOutcome: sentimentResult.routingOutcome,
      flagged: sentimentResult.flagged,
      flagReason: sentimentResult.flagReason,
      googleClicked: false,
      supportSubmitted: false,
    });

    const routingPath =
      sentimentResult.sentiment === 'positive'
        ? `/review/positive?id=${saved.id}&business=${businessId}`
        : sentimentResult.sentiment === 'neutral'
        ? `/review/neutral?id=${saved.id}&business=${businessId}`
        : `/review/negative?id=${saved.id}&business=${businessId}`;

    return NextResponse.json({
      id: saved.id,
      sentiment: sentimentResult.sentiment,
      confidence: sentimentResult.confidence,
      flagged: sentimentResult.flagged,
      routingOutcome: sentimentResult.routingOutcome,
      routingPath,
    });
  } catch (err) {
    console.error('[submit] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
