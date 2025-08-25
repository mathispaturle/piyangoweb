import { NextRequest, NextResponse } from 'next/server';
import { Monei } from '@monei-js/node-sdk';
import { auth, db } from '@/lib/firebase'; // auth opcional si validas token; si no, pasa uid desde client (sesión propia)
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

import {chargeWalletForTicket} from '@/lib/monei/utils';

export async function POST(req: NextRequest) {
  try {
    const { uid, raffleId, ticketAmount } = await req.json();

    if (!uid || !Number.isInteger(ticketAmount) || ticketAmount <= 0) {
      return NextResponse.json(
        { error: 'Parámetros inválidos' },
        { status: 400 }
      );
    }

    const response = await chargeWalletForTicket(uid, raffleId, ticketAmount);

    return NextResponse.json(
      { success: true, message: 'Transacción exitosa', response },
      { status: 200 }
    );  

  } catch (e: any) {
    return NextResponse.json(
      { error: 'No se pudo crear el pago', details: e.message || e.toString() },
      { status: 500 }
    );
  }
}