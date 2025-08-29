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
      return new NextResponse(
        JSON.stringify({ success: false, error: 'Invalid parameters' }),
        { status: 400, headers }
      );
    }

    // Call business logic
    const result = await chargeWalletForTicket(uid, raffleId, ticketAmount);

    // If insufficient funds
    if (!result.success && result.reason === 'INSUFFICIENT_FUNDS') {
      return new NextResponse(
        JSON.stringify({
          success: false,
          reason: 'INSUFFICIENT_FUNDS',
          message: 'Not enough balance to buy tickets',
        }),
        { status: 200, headers }
      );
    }

    // If any other handled business failure
    if (!result.success) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          reason: result.reason || 'UNKNOWN',
          message:
            'message' in result && typeof (result as any).message === 'string'
              ? (result as any).message
              : 'Transaction failed',
        }),
        { status: 200, headers }
      );
    }

    // Success
    return new NextResponse(
      JSON.stringify({
        success: true,
        message: 'Transaction successful',
        response: result,
      }),
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
