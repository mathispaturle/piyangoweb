'use client'

import { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { Loader2, Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { setTimeout } from 'timers';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';


export default function TopupPage() {

  const [topup, setTopup] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(false);
  const [uid, setUid] = useState<string | null>(null);

  const router = useRouter()

  // Detectar si ya hay sesión activa
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      }
    });
    return () => unsubscribe();
  }, [router]);


  return (
    <>
      <Header />
      <div className='pb-32 bg-gray-50'>
        <section className="py-48  ">
          <div className="max-w-screen-md mx-auto px-6">
            <h2 className="text-xl font-semibold text-gray-900 text-center">
              Boleto comprado con éxito
            </h2>
            <p className="text-gray-600 mb-3 text-center">
              Se ha procesado correctamente tu recarga de {topup}€.
            </p>

          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}