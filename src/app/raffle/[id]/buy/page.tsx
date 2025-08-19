'use client'

import { useParams } from 'next/navigation';
import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';

import { Raffle } from '@/types/raffle';


export default function RafflePage() {

    const params = useParams();
    const { id } = params as { id?: string | string[] };

    
  return (
    <>
      <Header />

      <div className='max-w-screen-md mx-auto px-6 py-12'>
        <h1 className='text-2xl font-bold mb-4'>Detalles del Raffle</h1>
        <p className='mb-2'>ID del Raffle: {id}</p>
        <p className='mb-2'>Aquí irían los detalles del raffle con ID: {id}</p>
        {/* Aquí podrías agregar más detalles del raffle, como descripción, fecha, imágenes, etc. */}
        <div className='bg-gray-100 p-4 rounded-lg'>          
          <p>{id}</p>
          </div>
      </div>


      <Footer />
    </>
  )

}