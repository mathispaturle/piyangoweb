import { db } from '@/lib/firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  runTransaction,
  serverTimestamp,
  where,
} from 'firebase/firestore';


export type ChargeWalletResult = {
  success: boolean;
  reason?: string; // only if failed
  message?: string; // optional error message
  newBalance?: number; // only if success
  tickets?: string[];
  totalCost?: number;
};

export async function chargeWalletForTicket(
  uid: string,
  raffleId: string,
  tickets: number
) {
  const userRef = doc(db, `users/${uid}`);
  const txRef = doc(
    db,
    `users/${uid}/walletTransactions/debit_${raffleId}_${Date.now()}`
  );
  const raffleRef = doc(db, `raffles/${raffleId}`);

  try {
    const result = await runTransaction(db, async (trx) => {
      // Get user balance
      const userSnap = await trx.get(userRef);
      const current = userSnap.exists()
        ? userSnap.data().wallet?.balanceCents || 0
        : 0;

      // Get raffle info
      const raffleSnap = await trx.get(raffleRef);
      if (!raffleSnap.exists()) {
        return { success: false, reason: 'RAFFLE_NOT_FOUND' };
      }

      const raffleData = raffleSnap.data();
      const ticketPrice = raffleData.price_ticket * 100; // euros → cents
      const totalTickets = raffleData.total_tickets;
      let soldTickets = raffleData.sold_tickets || 0;

      if (!ticketPrice) {
        return { success: false, reason: 'TICKET_PRICE_NOT_SET' };
      }

      const totalCost = tickets * ticketPrice;

      if (current < totalCost) {
        return { success: false, reason: 'INSUFFICIENT_FUNDS' };
      }

      if (soldTickets + tickets > totalTickets) {
        return { success: false, reason: 'NOT_ENOUGH_TICKETS' };
      }

      // Assign ticket numbers
      const assignedTickets: string[] = [];
      for (let i = 1; i <= tickets; i++) {
        const ticketNumber = soldTickets + i;
        assignedTickets.push(ticketNumber.toString().padStart(5, '0'));
      }

      // Save transaction
      trx.set(txRef, {
        type: 'DEBIT',
        amount: -totalCost,
        tickets: assignedTickets,
        raffleId,
        status: 'COMPLETED',
        createdAt: serverTimestamp(),
      });

      // Update user wallet
      trx.set(
        userRef,
        {
          wallet: {
            balanceCents: current - totalCost,
            updatedAt: serverTimestamp(),
          },
        },
        { merge: true }
      );

      // Update raffle sold tickets count
      trx.update(raffleRef, {
        sold_tickets: soldTickets + tickets,
        updatedAt: serverTimestamp(),
      });

      return {
        success: true,
        newBalance: current - totalCost,
        tickets: assignedTickets,
        totalCost,
      };
    });

    return result;
  } catch (err: any) {
    console.error('chargeWalletForTicket error:', err);
    return {
      success: false,
      reason: 'TRANSACTION_ERROR',
      message: err.message || 'Unknown Firestore error',
    };
  }
}

export async function getUserTickets(uid: string) {
  const txRef = collection(db, `users/${uid}/walletTransactions`);
  const q = query(
    txRef,
    where('status', '==', 'COMPLETED'),
    where('type', '==', 'DEBIT')
  );
  const txSnap = await getDocs(q);

  // Group tickets by raffleId
  const grouped: Record<string, string[]> = {};
  txSnap.forEach((docSnap) => {
    const data = docSnap.data();
    if (!data.raffleId || !data.tickets) return;
    if (!grouped[data.raffleId]) grouped[data.raffleId] = [];
    grouped[data.raffleId].push(...data.tickets);
  });

  // Fetch raffle details
  const results: {
    raffleId: string;
    raffle: any;
    tickets: string[];
  }[] = [];

  for (const raffleId of Object.keys(grouped)) {
    const raffleDoc = await getDoc(doc(db, `raffles/${raffleId}`));
    results.push({
      raffleId,
      raffle: raffleDoc.exists() ? raffleDoc.data() : null,
      tickets: grouped[raffleId],
    });
  }

  return results;
}