'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Image from "next/image";
import moment from 'moment';

type Raffle = {
  id: string;
  title: string;
  description: string;
  draw_date?: any;
  imageUrl?: string;
  product_characteristics?: Object[]
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
      <div className="bg-black text-white p-2 font-semibold text-center text-sm">
        El sorteo acaba en {timeLeft}
      </div>
      <div className="py-12 max-w-screen-xl mx-auto px-4 flex justify-between items-start gap-16">
        <div className="h-auto w-full flex flex-col gap-4">
          <div className="w-full h-[500px] relative bg-gray-100 rounded-2xl">
            <img
              src={raffle.imageUrl || "/raffle.jpg"}
              alt={raffle.title}
              style={{ objectFit: "contain", objectPosition: "center" }}
              className='h-full w-full'
            />
          </div>
          <p className="text-lg text-gray-600">{raffle.description}</p>
          <p className="text-lg text-gray-600">
            Draw date:{" "}
            {raffle.draw_date
              ? raffle.draw_date.toDate().toLocaleString()
              : "No date set"}
          </p>

          {/* <div className="space-y-2">
            {raffle.product_characteristics?.map(({ key, value }, index) => (
              <div key={index} className="flex justify-between border-b pb-1">
                <span className="font-medium">{key}</span>
                <span className="text-gray-600">{value}</span>
              </div>
            ))}
          </div> */}
        </div>
        <div className="w-1/3 min-w-1/3 max-w-1/3 h-96 sticky top-24 p-8 bg-white border border-neutral-200 rounded-xl">
          <h1 className='text-black font-semibold text-lg'>{raffle.title}</h1>

        </div>
      </div>
      <Footer />
    </>
  );
}
