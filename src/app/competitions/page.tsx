"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Clock } from "lucide-react"; 

import Footer from '../components/Footer';
import Header from '../components/Header';
import RaffleCard from '../components/RaffleCard';


export default function Referral() {


  const [raffles, setRaffles] = useState<any>([]);

  useEffect(() => {
    const fetchRaffles = async () => {
      const rafflesRef = collection(db, "raffles");
      const querySnapshot = await getDocs(rafflesRef);

      const rafflesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRaffles(rafflesData);
    };

    fetchRaffles();
  }, []);
  


  return (
    <>
      <Header />

      <div>

        <section className="py-24 bg-gray-50">
          <div className="max-w-screen-xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-3 text-left">
              Nuestros Sorteos Abiertos
            </h2>
            <p className='mb-12 text-left text-lg text-gray-600'>No pierdas tu oportunidad en adquirir uno o más boletos y ganar grande jugando justo y con más probabilidades de ganar</p>

            <hr/>

            {raffles.length === 0 ? (
              <p className="text-center text-gray-500">Cargando rifas...</p>
            ) : (
                <div className="grid gap-8 md:grid-cols-3 items-center mt-4">
                {raffles.map((raffle: any) => (
                  <RaffleCard
                    key={raffle.id}
                    raffle={raffle}
                  />
                ))}
              </div>


            )}

            {/* <div className='flex justify-center items-center mt-8'>
              <button className=" bg-black text-white py-2 px-4 rounded-lg hover:bg-black/90 transition font-semibold text-sm cursor-pointer">
                Ver todos los sorteos
              </button>
            </div> */}
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}