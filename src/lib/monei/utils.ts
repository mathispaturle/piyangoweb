import { db } from '@/lib/firebase';
import { doc, runTransaction, serverTimestamp } from 'firebase/firestore';

export async function chargeWalletForTicket(
  uid: string,
  raffleId: string,
  priceCents: number
) {
  const userRef = doc(db, `users/${uid}`);
  const txRef = doc(
    db,
    `users/${uid}/walletTransactions/${`debit_${raffleId}_${Date.now()}`}`
  );

  await runTransaction(db, async (trx) => {
    const userSnap = await trx.get(userRef);
    const current = userSnap.exists()
      ? userSnap.data().wallet?.balanceCents || 0
      : 0;

    if (current < priceCents) {
      throw new Error('Saldo insuficiente');
    }

    trx.set(txRef, {
      type: 'DEBIT',
      amountCents: -priceCents,
      raffleId,
      status: 'COMPLETED',
      createdAt: serverTimestamp(),
    });

    trx.set(
      userRef,
      {
        wallet: {
          balanceCents: current - priceCents,
          updatedAt: serverTimestamp(),
        },
      },
      { merge: true }
    );
  });
}
