import { NextRequest, NextResponse } from 'next/server';
import { getResponses } from '@/lib/store';
import { computeStats } from '@/lib/utils';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const businessId = searchParams.get('businessId') || 'demo';
  const sentiment = searchParams.get('sentiment');
  const outcome = searchParams.get('outcome');
  const channel = searchParams.get('channel');

  let data = getResponses(businessId);

  if (sentiment) data = data.filter(r => r.sentiment === sentiment);
  if (outcome) data = data.filter(r => r.routingOutcome === outcome);
  if (channel) data = data.filter(r => r.channel === channel);

  const stats = computeStats(getResponses(businessId));

  return NextResponse.json({ responses: data, stats });
}
