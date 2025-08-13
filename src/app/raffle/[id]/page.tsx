'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Image from "next/image";
import moment from 'moment';
import { Megaphone } from 'lucide-react';

type Raffle = {
  id: string;
  title: string;
  description: string;
  draw_date?: any;
  imageUrl?: string;
  product_characteristics?: Object[]
  category?: string;
  sponsor_image?: string;
  sponsor_name?: string;
  sponsor_description?: string;
  sponsor_store_direction?: string;
  price_ticket?: number;
};

export default function Raffle() {
  const params = useParams();
  const { id } = params as { id?: string | string[] };

  const [raffle, setRaffle] = useState<Raffle | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    if (!id || Array.isArray(id)) return; // ensure we have a single string id

    const fetchRaffle = async () => {
      try {
        const raffleRef = doc(db, "raffles", id);
        const raffleSnap = await getDoc(raffleRef);

        if (raffleSnap.exists()) {
          setRaffle({ id: raffleSnap.id, ...raffleSnap.data() } as Raffle);
        } else {
          console.error("No such raffle!");
        }
      } catch (error) {
        console.error("Error fetching raffle:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRaffle();
  }, [id]);

  useEffect(() => {
    if (!raffle?.draw_date) return;

    const endTime = moment(raffle.draw_date.seconds * 1000); // Firebase Timestamp → Moment object

    const timer = setInterval(() => {
      const now = moment();
      const diff = endTime.diff(now);

      if (diff <= 0) {
        setTimeLeft("¡El sorteo ha finalizado!");
        clearInterval(timer);
        return;
      }

      const duration = moment.duration(diff);

      // Format like "2d 5h 30m 15s" or just hours/mins/secs if < 1 day
      if (duration.asDays() >= 1) {
        setTimeLeft(
          `${Math.floor(duration.asDays())}d ${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`
        );
      } else {
        setTimeLeft(
          `${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`
        );
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [raffle?.draw_date]);
  if (loading) return <p className="text-center py-12">Loading...</p>;
  if (!raffle) return <p className="text-center py-12">Raffle not found</p>;


  return (
    <>
      <Header />
      {/* <div className="bg-black text-white p-2 font-semibold text-center text-sm">
        El sorteo acaba en {timeLeft}
      </div> */}
      <div className="py-12 max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start gap-16">
        <div className="h-auto w-full flex flex-col">
          <div className="w-full h-[500px] relative bg-gray-100 rounded-2xl overflow-hidden">
            <img
              src={raffle.imageUrl || "/raffle.jpg"}
              alt={raffle.title}
              style={{ objectFit: "cover", objectPosition: "center" }}
              className='h-full w-full'
            />
          </div>
          <p className="font-semibold text-main mt-4">{raffle.category}</p>
          <p className="text-3xl text-black font-semibold">{raffle.title}</p>
          <p className="text-sm text-gray-600">Reference: {raffle.id}</p>


          <p className="font-semibold mt-8">Descripción</p>
          <p className="text-lg text-gray-600 mt-2 max-w-2xl">{raffle.description}</p>

          <hr className='my-8' />

          <p className="font-semibold">Rifa patrocinada por</p>

          <div className='mt-4 flex items-center gap-4'>
            <div className='w-12 h-12 rounded-full overflow-hidden bg-gray-100 text-black flex items-center justify-center'>
              <Megaphone className='w-6 h-6' />
            </div>
            <div>
              <p className="text-lg text-gray-800 font-semibold">{raffle.sponsor_name}</p>
              <p className="text-sm text-gray-600">{raffle.sponsor_store_direction}</p>
            </div>
          </div>

          <hr className='my-8' />

          <p className="font-semibold">Características</p>

          <div className="space-y-2 mt-2">
            {raffle.product_characteristics &&
              Object.entries(raffle.product_characteristics).map(([key, value], index) => (
                <div key={index} className="flex justify-start">
                  <span className="font-medium w-32">{key}</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
          </div>

        </div>
        <div className="md:w-1/3 md:min-w-1/3 md:max-w-1/3 fixed bottom-2 left-2 right-2 md:sticky md:top-24 p-4 rounded-xl bg-black text-white flex justify-between md:flex-col items-center md:items-start">

          <div>
            <p className='text-sm'>Precio por boleto</p>
            <p className='font-extrabold text-3xl'>€ {raffle.price_ticket?.toFixed(2)}</p>
          </div>

          <button className='bg-main rounded-lg text-center text-white md:w-full px-4 py-2 md:mt-4 font-semibold text-lg'>Comprar boletos</button>
        </div>
      </div>
      <Footer />
    </>
  );
}
