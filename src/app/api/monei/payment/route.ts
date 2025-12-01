// src/app/api/monei/payment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Monei } from '@monei-js/node-sdk';

const monei = new Monei(process.env.MONEI_API_KEY || '');

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json(
        { error: 'Missing payment ID' },
        { status: 400 }
      );
    }

    // Fetch payment from MONEI
    const payment = await monei.payments.get(id);

    return NextResponse.json({
      id: payment.id,
      status: payment.status,
      amount: payment.amount,
      currency: payment.currency,
      customer: {
        name: "Mathis Paturle",
        email: "mathispaturle@gmail.com",
        phone: "+34662942334"
      },
      description: "Topup payment for Piyango"
      // message: payment.message,
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: 'Error fetching payment' },
      { status: 500 }
    );
  }
}
