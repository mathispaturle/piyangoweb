// src/app/api/monei/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Monei, PaymentStatus } from '@monei-js/node-sdk';

const monei = new Monei(process.env.MONEI_API_KEY || '');

// Disable body parsing so we can read raw body
export const config = {
  api: {
    bodyParser: false,
  },
};

// Convert ReadableStream to string (for signature validation)
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
    const payment = monei.verifySignature(rawBody, signature);

    console.log(
      `Webhook received for Payment ID: ${payment.id}, Status: ${payment.status}`
    );

    switch (payment.status) {
      case PaymentStatus.SUCCEEDED:
        console.log(`✅ Payment ${payment.id} succeeded. Fulfilling order...`);
        // TODO: update DB, send confirmation email, etc.
        break;
      case PaymentStatus.FAILED:
        console.log(`❌ Payment ${payment.id} failed. Notifying customer...`);
        break;
      case PaymentStatus.AUTHORIZED:
        console.log(`🟡 Payment ${payment.id} authorized. Capture if needed.`);
        break;
      case PaymentStatus.CANCELED:
        console.log(`🚫 Payment ${payment.id} was canceled.`);
        break;
      default:
        console.log(
          `ℹ️ Unhandled payment status: ${payment.status} for Payment ${payment.id}`
        );
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('Invalid webhook signature or error:', error.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }
}
