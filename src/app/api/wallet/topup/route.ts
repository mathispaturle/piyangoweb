import { NextRequest, NextResponse } from 'next/server';
import { Monei } from '@monei-js/node-sdk';
import { auth, db } from '@/lib/firebase'; // auth opcional si validas token; si no, pasa uid desde client (sesión propia)
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(req: NextRequest) {
  try {
    const { uid, amount } = await req.json();

    console.log(uid);
    console.log(amount);

    if (!uid || !Number.isInteger(amount) || amount <= 0) {
      return NextResponse.json(
        { error: 'Parámetros inválidos' },
        { status: 400 }
      );
    }

    const apiKey = process.env.MONEI_API_KEY!;
    const monei = new Monei(apiKey);

    const orderId = `t_${shortHash(uid)}_${Date.now()}`;

    console.log("Order ID:", orderId);

    // Creamos un intento de pago en MONEI (Hosted Payment Page)
    const payment = await monei.payments.create({
      amount: amount, // céntimos
      currency: 'EUR',
      orderId: orderId,
      description: `Top-up monedero Piyango`,
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/monei/webhook`,
      completeUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/topup/processing`,
      cancelUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/topup`,
      customer: { email: undefined },
      metadata: {
        uid: uid,
      },
    });

    // Guarda movimiento PENDING con payment.id
    const txRef = doc(db, `users/${uid}/walletTransactions/${payment.id}`);
    await setDoc(txRef, {
      type: 'TOPUP',
      amount,
      paymentId: payment.id,
      status: 'PENDING',
      createdAt: serverTimestamp(),
      idempotencyKey: payment.id,
    });

    // Devuelve URL de redirección
    const redirectUrl = payment.nextAction?.redirectUrl;
    return NextResponse.json({ redirectUrl });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      { error: 'No se pudo crear el pago' },
      { status: 500 }
    );
  }
}


function shortHash(input:string) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/[^a-zA-Z0-9]/g, '')
    .slice(0, 8);
}