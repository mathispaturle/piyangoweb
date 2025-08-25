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

  await runTransaction(db, async (trx) => {
    // Get user balance
    const userSnap = await trx.get(userRef);
    const current = userSnap.exists()
      ? userSnap.data().wallet?.balanceCents || 0
      : 0;

    // Get raffle info
    const raffleSnap = await trx.get(raffleRef);
    if (!raffleSnap.exists()) {
      throw new Error('Raffle not found');
    }

    const raffleData = raffleSnap.data();
    const ticketPrice = raffleData.price_ticket * 100; // stored in euros, convert to cents
    const totalTickets = raffleData.total_tickets; // fixed supply (e.g. 500)
    let soldTickets = raffleData.sold_tickets || 0; // how many already sold

    if (!ticketPrice) {
      throw new Error('Ticket price not set');
    }

    const totalCost = tickets * ticketPrice;
    if (current < totalCost) {
      throw new Error('Saldo insuficiente');
    }

    // Check if enough tickets remain
    if (soldTickets + tickets > totalTickets) {
      throw new Error('Not enough tickets available');
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
  });
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