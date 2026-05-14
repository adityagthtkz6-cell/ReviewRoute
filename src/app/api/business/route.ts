import { NextRequest, NextResponse } from 'next/server';
import { getBusinessConfig } from '@/lib/store';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id') || 'demo';

  const business = getBusinessConfig(id);
  if (!business) {
    return NextResponse.json({ error: 'Business not found' }, { status: 404 });
  }

  return NextResponse.json(business);
}
