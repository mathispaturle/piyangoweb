import { NextRequest, NextResponse } from 'next/server';
import { Monei } from '@monei-js/node-sdk';
import { db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export async function GET(req: NextRequest) {
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

  try {
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get('uid') || '';
    const amount = parseInt(searchParams.get('amount') || '0', 10);

    return await handlePayment(uid, amount);
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      { error: 'No se pudo procesar GET' },
      { status: 500 }
    );
  }
}

async function handlePayment(uid: string, amount: number) {
  if (!uid || !Number.isInteger(amount) || amount <= 0) {
    return NextResponse.json(
      { error: 'Parámetros inválidos' },
      { status: 400 }
    );
  }

  const apiKey = process.env.MONEI_API_KEY!;
  const monei = new Monei(apiKey);

  const orderId = `t_${shortHash(uid)}_${Date.now()}`;
  console.log('Order ID:', orderId);

  const payment = await monei.payments.create({
    amount, // céntimos
    currency: 'EUR',
    orderId,
    description: `Top-up monedero Piyango`,
    callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/monei/webhook`,
    completeUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/topup/processing`,
    cancelUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/topup`,
    customer: { email: undefined },
    metadata: { uid },
  });

  const txRef = doc(db, `users/${uid}/walletTransactions/${payment.id}`);
  await setDoc(txRef, {
    type: 'TOPUP',
    amount,
    paymentId: payment.id,
    status: 'PENDING',
    createdAt: serverTimestamp(),
    idempotencyKey: payment.id,
  });

  return NextResponse.json({ redirectUrl: payment.nextAction?.redirectUrl });
}

function shortHash(input: string) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/[^a-zA-Z0-9]/g, '')
    .slice(0, 8);
}
