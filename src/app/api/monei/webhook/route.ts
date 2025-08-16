import { NextRequest, NextResponse } from 'next/server';
import { Monei, PaymentStatus } from '@monei-js/node-sdk';
import { db } from '@/lib/firebase';
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';


// Disable body parsing so we can read raw body
export const config = {
  api: {
    bodyParser: false,
  },
};

async function getRawBody(req: NextRequest): Promise<string> {
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

export async function POST(req: NextRequest) {
  const signature = req.headers.get('monei-signature') || '';

  try {
    const monei = new Monei(process.env.MONEI_API_KEY!);

    const rawBody = await getRawBody(req);

    const payload = monei.verifySignature(rawBody, signature);

    if (!payload || typeof payload === 'boolean') {
      throw new Error('Invalid webhook signature');
    }

    // @ts-ignore
    const payment = payload.object;
    const status = payment.status as PaymentStatus;
    const paymentId = payment.id as string;
    const orderId = payment.orderId || '';

    const [, uid] = orderId.split('_');

    if (!uid) {
      console.warn('Webhook received for unknown user, ignoring');
      return NextResponse.json({ ok: true });
    }

    const txRef = doc(db, `users/${uid}/walletTransactions/${paymentId}`);
    const userRef = doc(db, `users/${uid}`);

    if (
      status === PaymentStatus.SUCCEEDED ||
      status === PaymentStatus.AUTHORIZED
      // || status === PaymentStatus.COMPLETED
    ) {
      await runTransaction(db, async (trx) => {
        const txSnap = await trx.get(txRef);

        if (txSnap.exists() && txSnap.data().status === 'COMPLETED') {
          return; // already processed
        }

        const userSnap = await trx.get(userRef);
        const currentBalance = userSnap.exists()
          ? userSnap.data().wallet?.balanceCents || 0
          : 0;

        const amountCents = txSnap.exists()
          ? txSnap.data().amountCents
          : payment.amount;

        trx.set(
          txRef,
          {
            type: 'TOPUP',
            amountCents,
            paymentId,
            status: 'COMPLETED',
            createdAt: txSnap.exists()
              ? txSnap.data().createdAt
              : serverTimestamp(),
            completedAt: serverTimestamp(),
            idempotencyKey: paymentId,
          },
          { merge: true }
        );

        trx.set(
          userRef,
          {
            wallet: {
              balanceCents: currentBalance + amountCents,
              updatedAt: serverTimestamp(),
            },
          },
          { merge: true }
        );
      });
    } else if (
      status === PaymentStatus.CANCELED ||
      status === PaymentStatus.FAILED ||
      status === PaymentStatus.EXPIRED
    ) {
      await setDoc(
        txRef,
        {
          status: 'FAILED',
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('Monei webhook error:', err);
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 400 }
    );
  }
}
