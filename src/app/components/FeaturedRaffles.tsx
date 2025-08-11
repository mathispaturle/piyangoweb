// components/FeaturedRaffles.js
"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Clock } from "lucide-react";

export default function FeaturedRaffles() {
  const [raffles, setRaffles] = useState<any>([]);

  useEffect(() => {
    const fetchRaffles = async () => {
      const rafflesRef = collection(db, "raffles");
      const q = query(rafflesRef, where("featured", "==", true));
      const querySnapshot = await getDocs(q);

      const rafflesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRaffles(rafflesData);
    };

    fetchRaffles();
  }, []);

  return (
    <section className="py-32 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">
          Nuestros Sorteos Destacados
        </h2>
        <p className='mb-12 text-center max-w-screen-sm mx-auto text-lg text-gray-600'>Añadimos nuevos sorteos cada semana, no pierdas tu oportunidad única</p>

        {raffles.length === 0 ? (
          <p className="text-center text-gray-500">Cargando rifas...</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            {raffles.map((raffle: any) => (
              <div
                key={raffle.id}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <img
                  src={raffle.imageUrl}
                  alt={raffle.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-lg font-semibold">{raffle.title}</h3>
                  {/* <p className="text-sm text-gray-500 mb-3">
                    {raffle.description}
                  </p> */}
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="font-medium text-pink-600">
                      {raffle.price_ticket} €
                    </span>
                    <span className="text-gray-500">
                      {raffle.available_tickets} boletos restantes
                    </span>
                  </div>
                  {/* <div className="flex items-center text-gray-500 text-xs mb-4">
                    <Clock className="w-4 h-4 mr-1" />
                    {new Date(raffle.drawDate.seconds * 1000).toLocaleDateString("es-ES")}
                  </div> */}
                  <button className="w-full bg-main text-white py-2 px-4 rounded-lg hover:bg-main transition font-semibold text-sm cursor-pointer">
                    Reservar boleto
                  </button>
                </div>
              </div>
            ))}
          </div>


        )}

        <div className='flex justify-center items-center mt-8'>
          <button className=" bg-black text-white py-2 px-4 rounded-lg hover:bg-black/90 transition font-semibold text-sm cursor-pointer">
            Ver todos los sorteos
          </button>
        </div>
      </div>
    </section>
  );
}
