// src/app/api/monei/payment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Monei } from '@monei-js/node-sdk';
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Raffle } from '@/types/raffle';

const monei = new Monei(process.env.MONEI_API_KEY || '');

export async function GET(req: NextRequest) {
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

    // Calculate and retrieve the raffle price and multiply by amount
    const rDoc = doc(db, "raffles", raffleId)
    const docSnap = await getDoc(rDoc)

    const data: Raffle = docSnap.data() as Raffle
    var amount = (data.price_ticket ?? 1) * 100 * ticketAmount
    const response = await handlePayment(uid, amount, raffleId, raffleTitle)

    return NextResponse.json(
      response
    )

  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: 'Error fetching payment' },
      { status: 500 }
    );
  }
}


async function handlePayment(uid: string, amount: number, rid: string, raffleTitle: string | null) {
  if (!uid || !Number.isInteger(amount) || amount <= 0) {
    return NextResponse.json(
      { error: 'Parámetros inválidos' },
      { status: 400 }
    );
  }

  const orderId = `t_${shortHash(uid)}_${Date.now()}`;

  const txRef = doc(db, `users/${uid}/walletTransactions/${orderId}`);

  await setDoc(txRef, {
    type: 'DIRECT_PURCHASE',
    amount,
    status: 'PENDING',
    createdAt: serverTimestamp(),
  });

  const args = {
    amount,
    currency: 'EUR',
    orderId,
    description: `Boleto piyango para ${raffleTitle}`,
    completeUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/buy/processing?r=${rid}`,
    cancelUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/raffle/${rid}`,
    metadata: { uid },
  };


  const payment = await monei.payments.create(args);

  await setDoc(txRef, {
    paymentId: payment.id,
    idempotencyKey: payment.id,
  }, { merge: true });

  return {
    args,
    redirectUrl: payment.nextAction?.redirectUrl,
  };
}

const shortHash = (input: string) => {
  return Buffer.from(input)
    .toString('base64')
    .replace(/[^a-zA-Z0-9]/g, '')
    .slice(0, 8);
}