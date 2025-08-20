'use client'

import { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { Loader2Icon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import Link from 'next/link'

export default function ProcessingModule() {
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const router = useRouter()
  const searchParams = useSearchParams()

  const paymentId = searchParams.get('id')
  const orderId = searchParams.get('orderId')

  // Keep polling until payment is final
  useEffect(() => {
    if (!paymentId) return

    let interval: NodeJS.Timeout

    async function fetchPayment() {
      try {
        const res = await fetch(`/api/monei/payment?id=${paymentId}`)
        if (!res.ok) throw new Error('Error fetching payment')
        const data = await res.json()

        setStatus(data.status)
        setMessage(data.message || null)

        // Stop polling if payment is final
        if (
          data.status === 'SUCCEEDED' ||
          data.status === 'FAILED' ||
          data.status === 'CANCELED'
        ) {
          clearInterval(interval)
          setLoading(false)
        }
      } catch (err: any) {
        console.error(err)
        setStatus('ERROR')
        setMessage('Error verificando el pago')
        clearInterval(interval)
        setLoading(false)
      }
    }

    // Start polling every 3 seconds
    interval = setInterval(fetchPayment, 3000)
    fetchPayment() // also call immediately once

    return () => clearInterval(interval)
  }, [paymentId])


  return (
    <>
      <Header />
      <div className="pb-32 bg-gray-50">
        <section className="py-48">
          <div className="max-w-screen-md mx-auto px-6 text-center">
            {loading ? (
              <>
                <h2 className="text-xl font-semibold text-gray-900">
                  Procesando la recarga
                </h2>
                <h2 className="text-gray-600 mb-3">No cierres esta ventana</h2>
                <div className="flex justify-center items-center">
                  <Loader2Icon className="animate-spin h-8 w-8 text-gray-700" />
                </div>
              </>
            ) : status === 'SUCCEEDED' ? (
              <>
                <h2 className="text-xl font-semibold text-green-600">
                  ✅ Recarga completada
                </h2>
                <p className="text-gray-600 mb-8">Tu pago ha sido aprobado.</p>
                <Link href="/competitions" className='mt-8 px-5 py-2 bg-black rounded-md text-white font-semibold text-sm cursor-pointer'>Continuar</Link>
              </>
            ) : status === 'FAILED' || status === 'CANCELED' ? (
              <>
                <h2 className="text-xl font-semibold text-red-600">
                  ❌ Recarga fallida
                </h2>
                <p className="text-gray-600">
                  {message || 'El pago no pudo completarse.'}
                </p>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-gray-900">
                  Estado: {status}
                </h2>
                {message && <p className="text-gray-600">{message}</p>}
              </>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
