import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    return NextResponse.json({ hello: 'world' }, { status: 200 });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      { error: 'No se pudo crear el pago' },
      { status: 500 }
    );
  }
}