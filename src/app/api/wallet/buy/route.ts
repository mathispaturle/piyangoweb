import { NextRequest, NextResponse } from 'next/server';
import { chargeWalletForTicket } from '@/lib/monei/utils';

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
    const ticketAmount = ticketAmountStr ? parseInt(ticketAmountStr, 10) : 0;

    if (
      !uid ||
      !raffleId ||
      !Number.isInteger(ticketAmount) ||
      ticketAmount <= 0
    ) {
      return new Response(JSON.stringify({ error: 'Invalid parameters' }), {
        status: 400,
        headers,
      });
    }

    const response = await chargeWalletForTicket(uid, raffleId, ticketAmount);

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: 'Transaction successful',
        response,
      }),
      {
        status: 200,
        headers,
      }
    );
  } catch (e: any) {
    return new NextResponse(
      JSON.stringify({
        error: 'Could not create payment',
        details: e.message || 'Unknown error',
      }),
      { status: 500, headers }
    );
  }
}
