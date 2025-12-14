"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import {
    doc,
    getDoc,
    collection,
    getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";

type User = {
    fullname: string;
    email: string;
    phone?: string;
};

import { useRouter } from "next/navigation";
type WalletTransaction = {
    id: string;
    amount: number;
    createdAt: any;
    status: string;
    type: "TOPUP" | "DEBIT";
    raffleId?: string;
    tickets?: string[];
    paymentId?: string;
};

export default function AdminUserDetailPage() {
    const params = useParams();
    const userId = Array.isArray(params.id) ? params.id[0] : params.id;

    const [user, setUser] = React.useState<User | null>(null);
    const [debits, setDebits] = React.useState<any[]>([]);
    const [topups, setTopups] = React.useState<WalletTransaction[]>([]);

    const router = useRouter();

    /* -----------------------------
       LOAD USER
    ------------------------------ */
    React.useEffect(() => {
        if (!userId) return;

        const load = async () => {
            // user
            const userSnap = await getDoc(doc(db, "users", userId));
            if (userSnap.exists()) {
                setUser(userSnap.data() as User);
            }

            // wallet transactions
            const txSnap = await getDocs(
                collection(db, "users", userId, "walletTransactions")
            );

            const allTx = txSnap.docs.map((d) => ({
                id: d.id,
                ...d.data(),
            })) as WalletTransaction[];

            // TOPUPS
            setTopups(allTx.filter((t) => t.type === "TOPUP"));

            // DEBITS (resolve raffle)
            const debitsWithRaffle = await Promise.all(
                allTx
                    .filter((t) => t.type === "DEBIT")
                    .map(async (tx) => {
                        let raffleTitle = "-";
                        if (tx.raffleId) {
                            const raffleSnap = await getDoc(
                                doc(db, "raffles", tx.raffleId)
                            );
                            raffleTitle = raffleSnap.exists()
                                ? raffleSnap.data().title
                                : "Rifa eliminada";
                        }

                        return {
                            ...tx,
                            raffleTitle,
                        };
                    })
            );

            setDebits(debitsWithRaffle);
        };

        load();
    }, [userId]);

    if (!user) return <p>Cargando usuario...</p>;

    return (
        <div className="p-6 space-y-10">
            {/* USER INFO */}
            <div>
                <Button onClick={() => { router.back() }} variant={'secondary'} size={'sm'}>Volver al dashboard</Button>
                <h1 className="text-2xl font-bold mb-2">{user.fullname}</h1>
                <p className="text-muted-foreground">{user.email}</p>
                <p className="text-muted-foreground">{user.phone}</p>
            </div>

            {/* DEBITS */}
            <div>
                <h2 className="text-xl font-semibold mb-3">Compras (Débitos)</h2>
                <table className="w-full border rounded">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 text-left">Fecha</th>
                            <th className="p-2 text-left">Producto</th>
                            <th className="p-2 text-left">Tickets</th>
                            <th className="p-2 text-left">Importe</th>
                            <th className="p-2 text-left">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {debits.map((d) => (
                            <tr key={d.id} className="border-t">
                                <td className="p-2">
                                    {d.createdAt?.toDate().toLocaleString()}
                                </td>
                                <td className="p-2">{d.raffleTitle}</td>
                                <td className="p-2">{d.tickets?.join(", ")}</td>
                                <td className="p-2 font-medium text-red-600">
                                    {(d.amount / 100).toLocaleString("de-DE", { minimumFractionDigits: 2 })} €
                                </td>
                                <td className="p-2">{d.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* TOPUPS */}
            <div>
                <h2 className="text-xl font-semibold mb-3">Recargas</h2>
                <table className="w-full border rounded">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 text-left">Fecha</th>
                            <th className="p-2 text-left">Importe</th>
                            <th className="p-2 text-left">Estado</th>
                            <th className="p-2 text-left">Payment ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topups.map((t) => (
                            <tr key={t.id} className="border-t">
                                <td className="p-2">
                                    {t.createdAt?.toDate().toLocaleString()}
                                </td>
                                <td className="p-2 text-green-600 font-medium">
                                    +{(t.amount / 100).toLocaleString("de-DE", { minimumFractionDigits: 2 })} €
                                </td>
                                <td className="p-2">{t.status}</td>
                                <td className="p-2 text-xs">{t.paymentId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
