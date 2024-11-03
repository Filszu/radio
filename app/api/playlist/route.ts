// api/playlist/route.ts

import { getPlayList } from '@/lib/getPlayList';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Extract hostId and date from the URL query parameters
  const hostId = req.nextUrl.searchParams.get('hostId');
  const date = req.nextUrl.searchParams.get('date');

  // Validate the extracted values
  if (!hostId || !date) {
    return NextResponse.json({ error: 'hostId and date are required' }, { status: 400 });
  }

  // Convert hostId to a number for the getPlayList function
  const playlist = await getPlayList({ hostId: Number(hostId), date });

  return NextResponse.json({ playlist });
}
