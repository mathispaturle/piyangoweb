import { NextRequest, NextResponse } from 'next/server';
import { Monei } from '@monei-js/node-sdk';
import { auth, db } from '@/lib/firebase'; // auth opcional si validas token; si no, pasa uid desde client (sesión propia)
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

import {chargeWalletForTicket, getUserTickets} from '@/lib/monei/utils';

export async function POST(req: NextRequest) {
  try {
    const { uid } = await req.json();

    if (!uid) {
      return NextResponse.json(
        { error: 'Parámetros inválidos' },
        { status: 400 }
      );
    }

    const response = await getUserTickets(uid);

    return NextResponse.json({ response }, { status: 200 });  

  } catch (e: any) {
    return NextResponse.json(
      { error: 'No se pudo crear el pago', details: e.message || e.toString() },
      { status: 500 }
    );
  }
}