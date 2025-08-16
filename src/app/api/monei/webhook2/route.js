// src/app/api/monei/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Monei, PaymentStatus } from '@monei-js/node-sdk';

const monei = new Monei(process.env.MONEI_API_KEY || '');
export const dynamic = 'force-dynamic';

// Disable body parsing so we can read raw body
export const config = {
  api: {
    bodyParser: false,
  },
};

async function getRawBody(req) {
  const chunks = [];
  const reader = req.body?.getReader();
  if (!reader) return '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }

  const bodyBuffer = Buffer.concat(chunks);
  return bodyBuffer.toString('utf8');
}

// POST handler
export async function POST(req) {
  try {

    const signature = req.headers.get('monei-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    const rawBody = await getRawBody(req);
    console.log(rawBody);
    // const payment = monei.verifySignature(rawBody, signature);

    const payment = monei.verifySignature(rawBody, signature);
    console.log(payment);

    return NextResponse.json({ signature, rawBody }, { status: 200 });
    
  } catch (error) {
    console.error('Invalid webhook signature or error:', error.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }
}
