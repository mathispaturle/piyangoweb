// pages/api/monei-webhook.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Monei } from '@monei-js/node-sdk';

export const config = {
  api: { bodyParser: false },
};

const monei = new Monei(process.env.MONEI_API_KEY!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  const rawBody = Buffer.concat(chunks).toString('utf8');

  const signature = req.headers['monei-signature'] as string;

  const isValid = monei.verifySignature(rawBody, signature);

  if (!isValid) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  const payment = JSON.parse(rawBody);

  console.log(`Webhook received: ${payment.id} - ${payment.status}`);

  if (payment.status === 'SUCCEEDED') {
    // ✅ Add to user's wallet in Firebase
  }

  return res.status(200).json({ received: true });
}

// import { NextRequest, NextResponse } from 'next/server';
// import { Monei, PaymentStatus } from '@monei-js/node-sdk';
// import { db } from '@/lib/firebase';
// import {
//   doc,
//   getDoc,
//   runTransaction,
//   serverTimestamp,
//   setDoc,
//   updateDoc,
// } from 'firebase/firestore';

// export const dynamic = 'force-dynamic'; // evitar cache
// export const runtime = 'nodejs'; // asegurar Node runtime (no edge)

// export async function POST(req: NextRequest) {
//   const raw = await req.text(); // RAW body para firma
//   const signature = req.headers.get('monei-signature') || '';

//   try {
//     const monei = new Monei(process.env.MONEI_API_KEY!);
//     const isValid = monei.verifySignature(raw, signature);
//     if (!isValid) {
//       return NextResponse.json(
//         { ok: false, error: 'Invalid signature' },
//         { status: 400 }
//       );
//     }

//     // Now safely parse the payload from the raw body
//     const payload = JSON.parse(raw);
//     const payment = payload.object; // Payment
//     const status = payment.status as PaymentStatus;
//     const paymentId = payment.id as string;

//     // Extraer uid del orderId si lo codificaste (topup_uid_timestamp)
//     const [_, uid] = (payment.orderId || '').split('_'); // "topup_{uid}_{ts}"

//     if (!uid) return NextResponse.json({ ok: true }); // ignora si no reconoces

//     // Idempotencia: usar paymentId como docId de transacción
//     const txRef = doc(db, `users/${uid}/walletTransactions/${paymentId}`);
//     const userRef = doc(db, `users/${uid}`);

//     if (
//       status === 'SUCCEEDED' || status === 'AUTHORIZED'
//     ) {
//       await runTransaction(db, async (trx) => {
//         const txSnap = await trx.get(txRef);
//         if (txSnap.exists() && txSnap.data().status === 'COMPLETED') {
//           return; // ya procesado
//         }

//         const userSnap = await trx.get(userRef);
//         const current = userSnap.exists()
//           ? userSnap.data().wallet?.balanceCents || 0
//           : 0;
//         const amountCents = txSnap.exists()
//           ? txSnap.data().amountCents
//           : payment.amount;

//         // actualizar saldo e historial
//         trx.set(
//           txRef,
//           {
//             type: 'TOPUP',
//             amountCents,
//             paymentId,
//             status: 'COMPLETED',
//             createdAt: txSnap.exists()
//               ? txSnap.data().createdAt
//               : serverTimestamp(),
//             completedAt: serverTimestamp(),
//             idempotencyKey: paymentId,
//           },
//           { merge: true }
//         );

//         trx.set(
//           userRef,
//           {
//             wallet: {
//               balanceCents: current + amountCents,
//               updatedAt: serverTimestamp(),
//             },
//           },
//           { merge: true }
//         );
//       });
//     } else if (
//       status === 'CANCELED' ||
//       status === 'FAILED' ||
//       status === 'EXPIRED'
//     ) {
//       await setDoc(
//         txRef,
//         {
//           status: 'FAILED',
//           updatedAt: serverTimestamp(),
//         },
//         { merge: true }
//       );
//     }

//     return NextResponse.json({ ok: true });
//   } catch (err) {
//     console.error('Webhook error', err);
//     return NextResponse.json({ ok: false }, { status: 400 });
//   }
// }
