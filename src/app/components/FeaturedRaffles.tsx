// components/FeaturedRaffles.js
"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Clock } from "lucide-react";
import RaffleCard from './RaffleCard';

import Link from 'next/link';

export default function FeaturedRaffles() {
  const [raffles, setRaffles] = useState<any>([]);

  useEffect(() => {
    const fetchRaffles = async () => {
      try {
        const rafflesRef = collection(db, "raffles");

        const q = query(
          rafflesRef,
          orderBy("sortOrder", "asc")
        );

        const querySnapshot = await getDocs(q);

        const rafflesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setRaffles(rafflesData);
      } catch (error) {
        console.error("Error fetching raffles:", error);
      }
    };

    fetchRaffles();
  }, []);

  return (
    <section className="py-32 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">
          Nuestros Sorteos Destacados
        </h2>
        <p className='mb-12 text-center max-w-screen-sm mx-auto text-lg text-gray-600'>Añadimos nuevos sorteos cada semana, no pierdas tu oportunidad única</p>

        {raffles.length === 0 ? (
          <p className="text-center text-gray-500">Cargando rifas...</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            {raffles.map((raffle: any) => (
              <RaffleCard
                key={raffle.id}
                raffle={raffle}
              />
            ))}
          </div>


        )}

        <div className='flex justify-center items-center mt-8'>
          <Link href="/competitions" className=" bg-black text-white py-2 px-4 rounded-lg hover:bg-black/90 transition font-semibold text-sm cursor-pointer">
            Ver todos los sorteos
          </Link>
        </div>
      </div>
    </section>
  );
}
