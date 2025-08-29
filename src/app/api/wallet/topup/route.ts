import { NextRequest, NextResponse } from 'next/server';
import { Monei } from '@monei-js/node-sdk';
import { db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export const runtime = 'nodejs'; // ensure Node runtime

const monei = new Monei(process.env.MONEI_API_KEY!);

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

  // try {
  const { searchParams } = new URL(req.url);
  const uid = searchParams.get('uid') || '';
  const amount = parseInt(searchParams.get('amount') || '0', 10);

  return await handlePayment(uid, amount);
  // } catch (e: any) {
  //   console.error(e);
  //   return NextResponse.json(
  //     { error: 'No se pudo procesar GET' },
  //     { status: 500 }
  //   );
  // }
}

async function handlePayment(uid: string, amount: number) {
  if (!uid || !Number.isInteger(amount) || amount <= 0) {
    return NextResponse.json(
      { error: 'Parámetros inválidos' },
      { status: 400 }
    );
  }

  const orderId = `t_${shortHash(uid)}_${Date.now()}`;

  const args = {
    amount,
    currency: 'EUR',
    orderId,
    description: `Top-up monedero Piyango`,
    completeUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/topup/processing`,
    cancelUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/topup`,
    metadata: { uid },
  };


  const payment = await monei.payments.create(args);

  const txRef = doc(db, `users/${uid}/walletTransactions/${payment.id}`);
  await setDoc(txRef, {
    type: 'TOPUP',
    amount,
    paymentId: payment.id,
    status: 'PENDING',
    createdAt: serverTimestamp(),
    idempotencyKey: payment.id,
  });

  return NextResponse.json({
    args,
    redirectUrl: payment.nextAction?.redirectUrl,
  });
}

function shortHash(input: string) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/[^a-zA-Z0-9]/g, '')
    .slice(0, 8);
}
