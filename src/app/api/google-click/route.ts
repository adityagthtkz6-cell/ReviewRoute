import { NextRequest, NextResponse } from 'next/server';
import { markGoogleClicked } from '@/lib/store';

export async function POST(req: NextRequest) {
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  markGoogleClicked(id);
  return NextResponse.json({ success: true });
}
