import { Timestamp } from "firebase/firestore";

export type WalletTransaction = {
    amount: number;              // +500 (TOPUP) / -200 (DEBIT)
    createdAt: Timestamp;
    status: "PENDING" | "COMPLETED";
    type: "TOPUP" | "DEBIT";
    raffleId?: string;           // SOLO en DEBIT
    tickets?: string[];          // SOLO en DEBIT
    paymentId?: string;          // TOPUP
    idempotencyKey?: string;     // TOPUP
};