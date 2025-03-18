// route.ts

import { getTimeTable } from '@/lib/getTimeTable';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  
    const timeTable = await getTimeTable();

    
  return NextResponse.json({ timeTable })
}