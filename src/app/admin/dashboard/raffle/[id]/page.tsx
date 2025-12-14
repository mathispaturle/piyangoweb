"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

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
    // 🔥 Force string because Firestore doc() expects a string, not string[]
    const id = Array.isArray(params.id) ? params.id[0] : params.id;

    const [raffle, setRaffle] = React.useState<Raffle | null>(null);
    const [isSaving, setIsSaving] = React.useState(false);

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
            <h1 className="text-2xl font-bold mb-6">Editar Rifa</h1>

            <div className="space-y-4">
                {/* Título */}
                <div>
                    <label className="block font-medium">Título</label>
                    <input
                        type="text"
                        className="w-full border rounded p-2"
                        value={raffle.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                    />
                </div>

                {/* Descripción */}
                <div>
                    <label className="block font-medium">Descripción</label>
                    <textarea
                        className="w-full border rounded p-2"
                        value={raffle.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                    />
                </div>

                {/* Categoría */}
                <div>
                    <label className="block font-medium">Categoría</label>
                    <input
                        type="text"
                        className="w-full border rounded p-2"
                        value={raffle.category ?? ""}
                        onChange={(e) => handleChange("category", e.target.value)}
                    />
                </div>

                {/* Disponible */}
                <div>
                    <label className="block font-medium">Disponible</label>
                    <input
                        type="checkbox"
                        checked={raffle.available ?? false}
                        onChange={(e) => handleChange("available", e.target.checked)}
                    />
                </div>

                {/* Precio */}
                <div>
                    <label className="block font-medium">Precio ticket (€)</label>
                    <input
                        type="number"
                        className="w-full border rounded p-2"
                        value={raffle.price_ticket ?? 0}
                        onChange={(e) => handleChange("price_ticket", parseFloat(e.target.value))}
                    />
                </div>

                {/* Tickets totales y vendidos */}
                <div className="flex gap-4">
                    <div>
                        <label className="block font-medium">Tickets totales</label>
                        <input
                            type="number"
                            className="w-full border rounded p-2"
                            value={raffle.total_tickets}
                            onChange={(e) => handleChange("total_tickets", parseInt(e.target.value))}
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Tickets vendidos</label>
                        <input
                            type="number"
                            className="w-full border rounded p-2"
                            value={raffle.sold_tickets ?? 0}
                            disabled
                            onChange={(e) => handleChange("sold_tickets", parseInt(e.target.value))}
                        />
                    </div>
                </div>

                {/* Fecha sorteo */}
                <div>
                    <label className="block font-medium">Fecha sorteo</label>
                    <input
                        type="datetime-local"
                        className="w-full border rounded p-2"
                        value={raffle.draw_date ? new Date(raffle.draw_date).toISOString().slice(0, 16) : ""}
                        onChange={(e) => handleChange("draw_date", new Date(e.target.value).toISOString())}
                    />
                </div>

                {/* Imagen principal */}
                <div>
                    <label className="block font-medium">Imagen principal URL</label>
                    <input
                        type="text"
                        className="w-full border rounded p-2"
                        value={raffle.imageUrl ?? ""}
                        onChange={(e) => handleChange("imageUrl", e.target.value)}
                    />
                </div>

                {/* Galería de imágenes */}
                <div>
                    <label className="block font-medium">Imágenes (URLs, separadas por coma)</label>
                    <input
                        type="text"
                        className="w-full border rounded p-2"
                        value={raffle.images.join(",")}
                        onChange={(e) => handleChange("images", e.target.value.split(",").map(s => s.trim()))}
                    />
                </div>

                {/* Patrocinador */}
                <h2 className="text-xl font-semibold mt-4">Patrocinador</h2>
                <div>
                    <label className="block font-medium">Nombre</label>
                    <input
                        type="text"
                        className="w-full border rounded p-2"
                        value={raffle.sponsor_name ?? ""}
                        onChange={(e) => handleChange("sponsor_name", e.target.value)}
                    />
                </div>
                <div>
                    <label className="block font-medium">Descripción</label>
                    <textarea
                        className="w-full border rounded p-2"
                        value={raffle.sponsor_description ?? ""}
                        onChange={(e) => handleChange("sponsor_description", e.target.value)}
                    />
                </div>
                <div>
                    <label className="block font-medium">Imagen URL</label>
                    <input
                        type="text"
                        className="w-full border rounded p-2"
                        value={raffle.sponsor_image ?? ""}
                        onChange={(e) => handleChange("sponsor_image", e.target.value)}
                    />
                </div>
                <div>
                    <label className="block font-medium">Dirección de tienda</label>
                    <input
                        type="text"
                        className="w-full border rounded p-2"
                        value={raffle.sponsor_store_direction ?? ""}
                        onChange={(e) => handleChange("sponsor_store_direction", e.target.value)}
                    />
                </div>

                {/* Guardar */}
                <div className="flex justify-end mt-6">
                    <Button onClick={handleSave} disabled={isSaving}>
                        {isSaving ? "Guardando..." : "Guardar cambios"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
