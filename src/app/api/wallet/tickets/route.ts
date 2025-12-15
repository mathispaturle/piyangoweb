import { NextRequest, NextResponse } from 'next/server';
import { getUserTickets } from '@/lib/monei/utils';

export const runtime = 'nodejs'; // ensure Node runtime

export async function GET(req: NextRequest) {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*', // or your Expo app domain
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json',
  };

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  const url = new URL(req.url);
  const uid = url.searchParams.get('uid');

  console.log(uid)

  try {
    // Get uid from query parameters

    if (!uid) {
      return new Response(JSON.stringify({ error: 'Missing uid' }), {
        status: 400,
        headers,
      });
    }

    const tickets = await getUserTickets(uid);
    console.log(tickets)

    return new Response(JSON.stringify({ tickets }), { status: 200, headers });
  } catch (e: any) {
    return new Response(
      JSON.stringify({ error: e.message || 'Unknown error' }),
      {
        status: 500,
        headers,
      }
    );
  }
}
