// src/app/api/wallet/tickets/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getUserTickets } from '@/lib/monei/utils';

export async function POST(req: NextRequest) {
  const { uid } = await req.json();
  if (!uid) return NextResponse.json({ error: 'Missing uid' }, { status: 400 });

  const response = await getUserTickets(uid);
  return NextResponse.json({ response });
}
