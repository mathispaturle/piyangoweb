'use client';

import { useEffect, useState } from "react";
import useAuthUser from "@/lib/auth/useUserAuth";
import Header from "../components/Header";
import Footer from "../components/Footer";

type TicketData = {
    raffleId: string;
    raffle: {
        title: string;
        images: string[];
    };
    tickets: string[];
};

export default function TicketsScreen() {
    const { user } = useAuthUser();
    const [activeTab] = useState(0); // si algún día añades "pasados"
    const [activeTickets, setActiveTickets] = useState<TicketData[]>([]);
    const [pastTickets, setPastTickets] = useState<any[]>([]);
    const [activeView, setActiveView] = useState<string>("");
    const [loading, setLoading] = useState(true);

    const fetchTickets = async () => {
        if (!user) {


            return
        };

        try {
            const api_url = `/api/wallet/tickets?uid=${user.uid}`;
            const res = await fetch(api_url);

            const data = await res.json();
            setActiveTickets(data.tickets ?? []);
            setLoading(false);
        } catch (e) {
            console.error("Error fetching tickets:", e);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, [user]);

    return (
        <>
            <Header />

            <div className="min-h-screen bg-gray-50">
                <section className="py-24">
                    <div className="max-w-screen-xl mx-auto px-6">

                        <h2 className="text-3xl font-bold text-gray-900 mb-3">Mis boletos</h2>
                        <p className="text-lg text-gray-600 mb-12">
                            Accede a la lista de todos los boletos que has adquirido en Piyango
                        </p>

                        <hr />

                        {
                            user == null ?
                                <p className="text-lg font-medium italic text-black mt-12">Aún no tienes cuenta, regístrate y reserva boletos primero.</p>

                                :
                                <>
                                    {loading && (
                                        <p className="text-gray-600 mt-12">Cargando boletos...</p>
                                    )}

                                    {!loading && activeTickets.length === 0 && (
                                        <p className="text-gray-600 mt-12">No tienes boletos aún.</p>
                                    )}

                                    {/* LISTA */}
                                    {!loading && activeTickets.length > 0 && (
                                        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {activeTickets.map((data, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-white rounded-xl p-4 flex gap-4 items-start cursor-pointer border border-gray-200 hover:bg-gray-50 transition"
                                                    onClick={() =>
                                                        setActiveView((prev) =>
                                                            prev === data.raffleId ? "" : data.raffleId
                                                        )
                                                    }
                                                >
                                                    <div className="w-20 h-20 min-w-20 rounded-xl overflow-hidden bg-gray-100">
                                                        <img
                                                            src={`https://piyango.es/${data.raffle.images[0]}`}
                                                            alt={data.raffle.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>

                                                    <div className="flex-1">
                                                        <p className="font-semibold text-gray-900">{data.raffle.title}</p>
                                                        <p className="text-gray-600 text-sm">
                                                            {data.tickets.length} boleto(s)
                                                        </p>

                                                        {/* Expand Tickets */}
                                                        {true && (
                                                            <div className="mt-2 flex flex-col gap-1">
                                                                {data.tickets.map((t, i) => (
                                                                    <p
                                                                        key={i}
                                                                        className="text-xs text-gray-500"
                                                                    >
                                                                        Boleto nº {t}
                                                                    </p>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                </>
                        }
                    </div>

                </section >
            </div >

            <Footer />
        </>
    );
}
