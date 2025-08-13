// app/referral/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Footer from '@/app/components/Footer'
import Header from '@/app/components/Header'
import Clipboard from './clipboard'
import { db, auth } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import Link from 'next/link'
import { onAuthStateChanged } from 'firebase/auth'
import Image from 'next/image'


export default function ReferralPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [referralCode, setReferralCode] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null)
        setReferralCode(null)
        setLoading(false)
        return
      }

      // Si está logueado
      setUser(currentUser)

      // Obtenemos referralCode desde Firestore
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid))
      if (userDoc.exists()) {
        setReferralCode(userDoc.data().referralCode || null)
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // Redirigir al login si no hay usuario (pero solo después de cargar estado)
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [loading, user, router])

  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Cargando...</p>
      </main>
    )
  }

  return (
    <>
      <Header />
      <main className="px-5 mt-16 pb-8 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className="col-span-2">
            <div className="flex flex-col gap-y-4 md:flex-row md:justify-between md:items-center">
              <h1 className="text-gray-900 font-semibold text-4xl">
                Consigue <span className="text-huehot">1€</span> en tu monedero por cada amigo que invites y compre un boleto
              </h1>
            </div>
            <p className="mt-4 text-gray-900 text-lg font-light">
              Envía tu enlace de invitación y acumula saldo para comprar boletos.
              <a href={`/terms`} target="_blank" className="underline cursor-pointer ml-1">
                Aplican términos y condiciones
              </a>
            </p>

          

            {!referralCode && (
              <div className="mt-8">
                <Link
                  href={`/signup`}
                  className="py-4 px-6 border border-gray-900 rounded-md text-lg font-semibold transition-all duration-200 hover:bg-gray-50"
                >
                  Crear cuenta
                </Link>
              </div>
            )}

            {referralCode && (
              <>
                <div className="border border-gray-300 rounded-md py-3 px-5 mt-8 shadow-lg flex justify-between items-center">
                  <p className="text-gray-600">
                    {`https://piyango.es/register?r=${referralCode}`}
                  </p>
                  <Clipboard refer_code={referralCode} />
                </div>
                {/* <p className="text-gray-900 font-semibold text-sm mt-4">Compartir</p> */}
              </>
            )}
          </div>

          <div className='relative mt-8 md:mt-0'>
            <Image 

            src="/referral.svg"
            alt="Referral Image"
            width={500} 
            height={500}
            />
          </div>
        </div>

        {/* Pasos */}
        <div className="my-16">
          <hr className="w-full" />
          <h2 className="text-gray-900 font-semibold text-3xl mt-16">Es facilísimo</h2>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-16">
            <div>
              <div className="h-12 w-12 flex justify-center items-center border-2 border-gray-900 rounded-full">
                <p className="font-bold text-gray-900 text-xl">1</p>
              </div>
              <h3 className="text-gray-900 font-semibold text-xl mt-4">Invita a un amigo</h3>
              <p className="mt-2 text-gray-600 font-light">
                Comparte tu enlace de invitación para que cree su cuenta y compre un boleto.
              </p>
            </div>
            <div>
              <div className="h-12 w-12 flex justify-center items-center border-2 border-gray-900 rounded-full">
                <p className="font-bold text-gray-900 text-xl">2</p>
              </div>
              <h3 className="text-gray-900 font-semibold text-xl mt-4">Haz un seguimiento</h3>
              <p className="mt-2 text-gray-600 font-light">
                Sabrás cuándo tu amigo se registre y compre su primer boleto.
              </p>
            </div>
            <div>
              <div className="h-12 w-12 flex justify-center items-center border-2 border-gray-900 rounded-full">
                <p className="font-bold text-gray-900 text-xl">3</p>
              </div>
              <h3 className="text-gray-900 font-semibold text-xl mt-4">Recibe tu saldo</h3>
              <p className="mt-2 text-gray-600 font-light">
                Recibirás tu euro en el monedero virtual, que podrás usar para comprar boletos.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
