import { NextRequest, NextResponse } from 'next/server';
import { chargeWalletForTicket } from '@/lib/monei/utils';
import axios from 'axios'
import { checkResponseStatus } from '../../common';

export async function GET(req: NextRequest) {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json',
  };

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  try {
    const url = new URL(req.url);
    const uid = url.searchParams.get('uid');
    const raffleId = url.searchParams.get('raffleId');
    const ticketAmountStr = url.searchParams.get('ticketAmount');
    const raffleTitle = url.searchParams.get('raffleTitle');
    const email = url.searchParams.get('email');
    const ticketAmount = ticketAmountStr ? parseInt(ticketAmountStr, 10) : 0;

    if (
      !uid ||
      !raffleId ||
      !Number.isInteger(ticketAmount) ||
      ticketAmount <= 0
    ) {
      return new NextResponse(
        JSON.stringify({ success: false, error: 'Invalid parameters' }),
        { status: 400, headers }
      );
    }

    // Call business logic
    const result: any = await chargeWalletForTicket(uid, raffleId, ticketAmount);
    const status = await checkResponseStatus(result, email, raffleId, raffleTitle)

    // Success
    return new NextResponse(status,
      { status: 200, headers }
    );


  } catch (e: any) {
    console.error('Buy endpoint error:', e);
    return new NextResponse(
      JSON.stringify({
        success: false,
        error: 'SERVER_ERROR',
        details: e.message || 'Unknown error',
      }),
      { status: 500, headers }
    );
  }
}
