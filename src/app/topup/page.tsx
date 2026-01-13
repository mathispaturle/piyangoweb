'use client'

import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation'
import { setTimeout } from 'timers';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../lib/firebase';


export default function TopupPage() {

  const [topup, setTopup] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(false);
  const [uid, setUid] = useState<string | null>(null);

  const router = useRouter()
  const searchParams = useSearchParams()

  const raffleId = searchParams.get('r') ?? null
  // Detectar si ya hay sesión activa
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      }
    });
    return () => unsubscribe();
  }, [router]);

  // const handleTopup = async () => {
  //   setLoading(true);

  //   try {

  //     const response = await fetch("/api/topup", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         amount: topup 
  //       })
  //     });

  //     const data = await response.json();
  //     router.push(data.payment.nextAction.redirectUrl);
  //   }
  //   catch (error) {
  //     console.error("Error during topup:", error);
  //     alert("Un error ha ocurrido durante la recarga. Por favor, inténtalo de nuevo más tarde.");
  //   }
  //   finally {
  //     setLoading(false);
  //   }
  // }

  const handleTopup = async () => {
    try {
      setLoading(true);

      const url = "/api/wallet/topup" + (uid ? `?uid=${uid}&amount=${topup * 100}&r=${raffleId}` : '');

      const res = await fetch(url, {
        method: "GET",
      });
      const data = await res.json();


      if (data.redirectUrl) {
        window.location.href = data.redirectUrl; // MONEI Hosted Page
      } else {
        alert("No se pudo iniciar el pago");
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <Header />
      <div className='pb-32 bg-gray-50'>

        <section className="py-24  ">
          <div className="max-w-screen-md mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-3 text-left">
              Recarga tu monedero Piyango
            </h2>
            <p className='mb-6 text-left text-lg text-gray-600'>Recarga tu monedero Piynago para poder adquirir boletos y participar en nuestras competiciones.</p>

            <hr />

            <div className='mt-6'>
              <div>
                <p className='font-medium text-gray-500'>Elige la cantidad a recargar</p>
                <div className='mt-3 flex md:flex-row flex-col justify-start items-center gap-2'>
                  <button onClick={() => { setTopup(5) }} className={`w-full px-12 py-8 cursor-pointer font-semibold text-xl border ${topup == 5 ? 'border-main outline outline-main' : 'border-neutral-200'} whitespace-nowrap rounded-2xl`}>
                    5 €
                  </button>
                  <button onClick={() => { setTopup(10) }} className={`w-full px-12 py-8 cursor-pointer font-semibold text-xl border ${topup == 10 ? 'border-main outline outline-main' : 'border-neutral-200'} whitespace-nowrap rounded-2xl`}>
                    10 €
                  </button>
                  <button onClick={() => { setTopup(15) }} className={`w-full px-12 py-8 cursor-pointer font-semibold text-xl border ${topup == 15 ? 'border-main outline outline-main' : 'border-neutral-200'} whitespace-nowrap rounded-2xl`}>
                    15 €
                  </button>
                  <button onClick={() => { setTopup(20) }} className={`w-full px-12 py-8 cursor-pointer font-semibold text-xl border ${topup == 20 ? 'border-main outline outline-main' : 'border-neutral-200'} whitespace-nowrap rounded-2xl`}>
                    20 €
                  </button>
                  <button onClick={() => { setTopup(25) }} className={`w-full px-12 py-8 cursor-pointer font-semibold text-xl border ${topup == 25 ? 'border-main outline outline-main' : 'border-neutral-200'} whitespace-nowrap rounded-2xl`}>
                    25 €
                  </button>
                </div>
              </div>
              <button onClick={handleTopup} className='mt-6 px-8 py-2 cursor-pointer bg-main text-white font-semibold rounded-lg hover:bg-main/90 transition-colors flex justify-center items-center gap-2 disabled:opacity-50' disabled={loading || !uid}>
                Continuar
                {
                  loading && <Loader2 className='animate-spin' />
                }
              </button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}