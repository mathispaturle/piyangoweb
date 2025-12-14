"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import {
    doc,
    getDoc,
    updateDoc,
    collection,
    getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

export type Raffle = {
    id: string;
    title: string;
    available?: boolean;
    description: string;
    draw_date?: string;
    imageUrl?: string;
    product_characteristics?: Record<string, any>[];
    images: string[];
    category?: string;
    sponsor_image?: string;
    sponsor_name?: string;
    sponsor_description?: string;
    sponsor_store_direction?: string;
    price_ticket?: number;
    total_tickets: number;
    sold_tickets?: number;
    sort_order?: number;
};

export default function EditRafflePage() {
    const params = useParams();
    const router = useRouter();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;

    const [raffle, setRaffle] = React.useState<Raffle | null>(null);
    const [isSaving, setIsSaving] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    // 🔥 NUEVO: compradores
    const [buyers, setBuyers] = React.useState<any[]>([]);

    /* -----------------------------
        LOAD RAFFLE
    ------------------------------ */
    React.useEffect(() => {
        if (!id) return;
        const loadRaffle = async () => {
            try {
                const ref = doc(db, "raffles", id);
                const snap = await getDoc(ref);
                if (snap.exists()) {
                    setRaffle({ id: snap.id, ...snap.data() } as Raffle);
                } else {
                    toast.error("Rifa no encontrada");
                }
            } catch (err) {
                console.error(err);
                toast.error("Error cargando la rifa");
            }
        };
        loadRaffle();
    }, [id]);

    /* -----------------------------
        LOAD BUYERS (DEBITS)
    ------------------------------ */
    React.useEffect(() => {
        if (!id) return;

        const loadBuyers = async () => {
            const usersSnap = await getDocs(collection(db, "users"));
            const rows: any[] = [];

            for (const userDoc of usersSnap.docs) {
                const user = userDoc.data();
                const txSnap = await getDocs(
                    collection(db, "users", userDoc.id, "walletTransactions")
                );

                txSnap.docs.forEach((tx) => {
                    const data = tx.data();
                    if (
                        data.type === "DEBIT" &&
                        data.raffleId === id &&
                        data.status === "COMPLETED"
                    ) {
                        rows.push({
                            userId: userDoc.id,
                            fullname: user.fullname,
                            email: user.email,
                            tickets: data.tickets ?? [],
                            amount: data.amount,
                            createdAt: data.createdAt,
                        });
                    }
                });
            }

            setBuyers(rows);
            setLoading(false)

        };

        setLoading(true)
        loadBuyers();
    }, [id]);

    if (!raffle) return <p>Cargando...</p>;

    /* -----------------------------
        HANDLE CHANGE
    ------------------------------ */
    const handleChange = (key: keyof Raffle, value: any) => {
        setRaffle({ ...raffle, [key]: value });
    };

    const handleSave = async () => {
        try {
            setIsSaving(true);
            const ref = doc(db, "raffles", id!);
            await updateDoc(ref, raffle);
            toast.success("Rifa actualizada");
            router.back();
        } catch (err) {
            console.error(err);
            toast.error("Error guardando la rifa");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">

            {/* -----------------------------
          BOLETOS VENDIDOS
      ------------------------------ */}
            <div className="mt-12">
                <Button onClick={() => { router.back() }} variant={'secondary'} size={'sm'}>Volver al dashboard</Button>

                <h2 className="text-xl font-semibold mb-4 mt-4">
                    Boletos vendidos ({buyers.length})
                </h2>

                <table className="w-full border rounded">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 text-left">Usuario</th>
                            <th className="p-2 text-left">Email</th>
                            <th className="p-2 text-left">Tickets</th>
                            <th className="p-2 text-left">Importe</th>
                            <th className="p-2 text-left">Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {buyers.map((b, idx) => (
                            <tr key={idx} className="border-t">
                                <td className="p-2">{b.fullname}</td>
                                <td className="p-2">{b.email}</td>
                                <td className="p-2 font-mono">
                                    {b.tickets.join(", ")}
                                </td>
                                <td className="p-2 text-red-600">
                                    {(b.amount / 100).toLocaleString("de-DE", { minimumFractionDigits: 2 })} €
                                </td>
                                <td className="p-2">
                                    {b.createdAt?.toDate().toLocaleString()}
                                </td>
                            </tr>
                        ))}
                        {buyers.length === 0 && (
                            <>
                                {
                                    loading ?
                                        <tr>
                                            <td colSpan={5} className="p-4 text-center text-muted-foreground">
                                                <Loader className="animate-spin" />
                                            </td>
                                        </tr>
                                        :
                                        <tr>
                                            <td colSpan={5} className="p-4 text-center text-muted-foreground">
                                                No hay boletos vendidos todavía
                                            </td>
                                        </tr>
                                }
                            </>

                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
