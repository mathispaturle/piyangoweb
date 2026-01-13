'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Image from "next/image";
import moment from 'moment';
import { Check, CheckCheck, CheckCircle, Cross, Loader, Megaphone, Minus, Plus, X } from 'lucide-react';
import ImageSlider from '../../components/ImageSlider';
import useAuthUser from '@/lib/auth/useUserAuth';

import Link from 'next/link';
import { Raffle } from "@/types/raffle";
import axios from "axios";
import { useRouter } from "next/navigation";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react"
import { Button } from "@/components/ui/button";

export default function RafflePage() {

  const params = useParams();
  const { id } = params as { id?: string | string[] };
  const { user, userData, loading } = useAuthUser();

  const [raffle, setRaffle] = useState<Raffle | null>(null);
  const [loadingRaffle, setLoadingRaffle] = useState(true);
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [ballotsNum, setBallotsNum] = useState<number>(0);

  const [errorReserve, setErrorReserve] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [loadingbutton, setLoadingbutton] = useState<boolean>(false)
  const [showSelectBallots, setShowSelectBallots] = useState<boolean>(false)
  const [needsRecharge, setNeedsRecharge] = useState<boolean>(false)

  const router = useRouter()


  useEffect(() => {
    if (!id || Array.isArray(id)) return; // ensure we have a single string id

    const fetchRaffle = async () => {
      try {
        const raffleRef = doc(db, "raffles", id);
        const raffleSnap = await getDoc(raffleRef);

        if (raffleSnap.exists()) {
          setRaffle({ id: raffleSnap.id, ...raffleSnap.data() } as Raffle);

          const r = raffleSnap.data()
          console.log(r.description)

        } else {
          console.error("No such raffle!");
        }
      } catch (error) {
        console.error("Error fetching raffle:", error);
      } finally {
        setLoadingRaffle(false);
      }
    };

    fetchRaffle();
  }, [id]);

  useEffect(() => {

    checkBalanceIsOk((raffle?.price_ticket ?? 0))

    if ((raffle?.total_tickets ?? 0) - (raffle?.sold_tickets ?? 0) > 0) {
      setBallotsNum(1)
    }

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
  if (loadingRaffle) return <p className="text-center py-12">loadingRaffle...</p>;
  if (!raffle) return <p className="text-center py-12">Raffle not found</p>;

  const purchaseTickets = async () => {

    if (loadingbutton) {
      return
    }

    if (needsRecharge) {
      router.push(`/topup?r=${raffle.id}`)
      return
    }

    setErrorReserve(false)
    setLoadingbutton(true)

    if (!user) {
      if (typeof window !== 'undefined') {

      }
      setLoadingbutton(false)
      return;
    }

    try {
      const res = await axios.get("/api/wallet/buy", {
        params: {
          uid: user.uid,
          raffleId: raffle.id,
          ticketAmount: ballotsNum,
          email: user.email,
          raffleTitle: raffle.title
        },
        // Optional: if you need to override CORS (rare when calling internal API)
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (!res.data.success) {
        // Display error
        setErrorReserve(true)
        setLoadingbutton(false)
        return
      }

      setSuccess(true)
      setLoadingbutton(false)

      return res.data;
    } catch (error: any) {
      console.error("Buy request failed:", error);
      return {
        success: false,
        error: "REQUEST_FAILED",
        details: error.message,
      };
    }
  }

  const precheckBalance = (e: any) => {
    e.stopPropagation();
    if (!user) {
      router.push(`/signup?r=${raffle.id}`)
      return
    }

    setShowSelectBallots(true)
  }

  const checkBalanceIsOk = (num: number) => {
    if (num > (userData?.wallet?.balanceCents ?? 0) / 100) {
      setNeedsRecharge(true)
    } else {
      setNeedsRecharge(false)
    }
  }


  return (
    <>
      <Header />
      {/* <div className="bg-black text-white p-2 font-semibold text-center text-sm">
        El sorteo acaba en {timeLeft}
      </div> */}
      <div className="py-12 max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start gap-16">
        <div className="h-auto w-full flex flex-col">
          <ImageSlider images={raffle.images} />
          {/* <div className="w-full h-[500px] relative bg-gray-100 rounded-2xl overflow-hidden">
            <img
              src={raffle.imageUrl || "/raffle.jpg"}
              alt={raffle.title}
              style={{ objectFit: "cover", objectPosition: "center" }}
              className='h-full w-full'
            />
          </div> */}
          <p className="font-semibold text-main mt-4">{raffle.category}</p>
          <p className="text-3xl text-black font-semibold">{raffle.title}</p>
          <p className="text-sm text-gray-600">Reference: {raffle.id}</p>


          <p className="font-semibold mt-8">Descripción</p>
          <p className="text-lg text-gray-600 mt-2 max-w-2xl whitespace-break-spaces">{raffle.description}</p>



          {
            raffle.available != false &&
            <>
              <hr className='my-8' />

              <div className="flex justify-start items-stretch gap-4">
                <div className="p-4 flex flex-col border border-gray-100 rounded-md bg-white">
                  <p className="text-sm text-gray-600">Tickets totales</p>
                  <p className="text-semibold">{raffle.total_tickets}</p>
                </div>

                <div className="p-4 flex flex-col border border-gray-100 rounded-md  bg-white">
                  <p className="text-sm text-gray-600">Tickets restantes</p>
                  <p className="text-semibold">{raffle.total_tickets - (raffle.sold_tickets ?? 0)}</p>
                </div>
              </div>

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
            </>
          }
          <hr className='my-8' />

          <p className="font-semibold">Características</p>

          <div className="space-y-2 mt-2">
            {raffle.product_characteristics &&
              Object.entries(raffle.product_characteristics).map(([key, value], index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4">
                  <span className="font-medium w-32">{key}</span>
                  <span className="text-gray-600 col-span-3">{String(value)}</span>
                </div>
              ))}


          </div>
          <p className="text-sm text-gray-600">Las imágenes podrían no coincidir con el premio final.</p>


        </div>
        <div className="w-full md:w-1/3 md:min-w-1/3 md:max-w-1/3 fixed bottom-2 left-2 right-2 md:sticky md:top-24 p-4 rounded-xl bg-black text-white flex flex-col justify-between md:flex-col items-stretch md:items-start">

          <div className="flex justify-between items-center">
            <div>
              <p className='text-sm'>Precio por boleto</p>
              <p className='font-extrabold text-3xl'>€ {raffle.price_ticket?.toFixed(2)}</p>
            </div>
            <div className="md:hidden mt-4 w-48">
              <div className="flex justify-between items-center">
                <p className="text-sm text-white/70">Número de boletos</p>
                <p className="text-sm font-medium">{ballotsNum.toFixed(2)}</p>
              </div>


              <div className="flex justify-between items-center">
                <p className="text-sm text-white/70">Total</p>
                <p className="text-sm font-medium">{(ballotsNum * (raffle.price_ticket ?? 0)).toFixed(2)} €</p>
              </div>
            </div>
          </div>


          {
            raffle.available == false ?
              <div className='bg-main rounded-lg text-center text-white md:w-full px-4 py-2 md:mt-4 font-semibold text-lg'>Próximamente</div>
              :
              <>
                <div onClick={precheckBalance} className={`${ballotsNum == 0 ? 'bg-main/40 text-white/40' : 'bg-main text-white'} cursor-pointer flex justify-center items-center gap-2 mt-4 w-fullbg-main rounded-lg text-center md:w-full px-4 py-2 md:mt-4 font-semibold text-lg  disabled:cursor-not-allowed`}>


                  <div className="flex justify-center items-center gap-3">
                    <p className="text-center">
                      Reservar boletos
                    </p>
                  </div>
                </div>


              </>
          }

        </div>
      </div>

      {
        success &&
        <>
          <div className="absolute top-0 bottom-0 right-0 left-0 bg-black/40 z-50 flex justify-center items-center">
            <div className="w-96 h-auto p-8 bg-white rounded-lg flex justify-center items-center flex-col text-center">
              <CheckCircle size={64} className="text-main" />

              <p className="mt-8 font-medium text-xl">¡Tu boleto ha sido reservado!</p>
              <p className="">Accede a tus boletos para consultar los número</p>

              <div className="mt-4">
                <Link href="/tickets" className="bg-main text-sm text-white px-4 py-2 rounded hover:bg-main transition-colors font-semibold">Mis boletos</Link>
              </div>
            </div>
          </div>
        </>
      }

      {/* SELECT BALLOTS POPUP */}
      {showSelectBallots && (
        <div
          className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center "
          onClick={() => setShowSelectBallots(false)}
        >
          <div
            className="bg-white rounded-xl min-w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <p className="font-semibold">Reserva de boletos</p>
              <button onClick={() => setShowSelectBallots(false)}>
                <X />
              </button>
            </div>

            <div className="p-6 flex items-center justify-between">
              <button
                onClick={() => {
                  checkBalanceIsOk(Math.max(1, ballotsNum - 1) * (raffle.price_ticket ?? 0))
                  setBallotsNum(Math.max(1, ballotsNum - 1))
                }}
                className="h-8 w-8 bg-white rounded-full flex justify-center items-center text-black active:scale-95 transition-all duration-200"
              >
                <Minus />
              </button>

              <span className="text-xl font-semibold">{ballotsNum}</span>

              <button
                onClick={() => {
                  checkBalanceIsOk((ballotsNum + 1) * (raffle.price_ticket ?? 0))
                  setBallotsNum(ballotsNum + 1)
                }}
                className="h-8 w-8 bg-white rounded-full flex justify-center items-center text-black active:scale-95 transition-all duration-200"
              >
                <Plus />
              </button>
            </div>

            <div className="p-4">
              <Button className={`w-full ${loadingbutton ? 'opacity-80' : ''}`} onClick={purchaseTickets}>
                {needsRecharge ? <>Recargar monedero</> : <>Confirmar reserva</>}
                {
                  loadingbutton &&
                  <Loader className="animate-spin" />
                }
              </Button>
            </div>

            {
              errorReserve &&
              <div className="mt-4 mx-4">

                <Alert variant="destructive" >
                  <AlertCircleIcon />
                  <AlertTitle>No ha sido posible reservar el boleto.</AlertTitle>
                  <AlertDescription>
                    <p>Por favor asegúrate de tener suficiente saldo para poder reservar el boleto.</p>
                    <ul className="list-inside list-disc text-sm">
                      <li>Revisa tu cuenta</li>
                      <li>Recarga tu monedero virtual</li>
                      <li>Reserva tu boleto</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </div>

            }

            <div className="hidden md:block mt-4 py-4 border-t border-t-neutral-200 w-full px-4">
              <div className="flex justify-between items-center">
                <p className="text-sm">Número de boletos</p>
                <p className="text-sm font-medium">{ballotsNum.toFixed(2)}</p>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm">Precio por boleto</p>
                <p className="text-sm font-medium">{(raffle.price_ticket ?? 0).toFixed(2)} €</p>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm">Total</p>
                <p className="text-sm font-medium">{(ballotsNum * (raffle.price_ticket ?? 0)).toFixed(2)} €</p>
              </div>
            </div>
          </div>
        </div>
      )}


      <Footer />
    </>
  );
}
