'use client';

import { useEffect, useState } from "react";
import Image from 'next/image';

import Link from 'next/link';
const images = ["/images/1.jpg", "/images/2.jpg", "/images/3.jpg"];


export default function Hero () {

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='w-full flex items-stretch justify-stretch relative'>
      <div className='relative max-w-screen-xl p-4 mx-auto w-full text-white  grid md:grid-cols-2 items-center'>
        <div className='py-40 md:py-8 items-center'>
          <h1 className='text-4xl md:text-6xl font-bold '>Rediseñamos la suerte</h1>
          <p className='text-2xl mt-3'>Participa y gana de manera justa y con más posibilidades que nunca.</p>

          <div className='flex justify-start items-center gap-4 mt-6'>
            <Link href={"/"} className='relative'>
              <Image
                src="/appstore.png"
                alt="Pyango Logo"
                width={170}
                height={100}
                className="mx-auto"
              />
            </Link>

            <Link href={"/"} className='relative'>
              <Image
                src="/googleplay.png"
                alt="Pyango Logo"
                width={170}
                height={100}
                className="mx-auto"
              />
            </Link>

          </div>
        </div>

        <div className='hidden md:block py-8'>
          <div className='relative w-full h-full aspect-square'>

            <div className='p-6 md:p-32 w-full h-full'>
              <div className='relative w-full h-full bg-white'>
                <Image
                  src="/qr_black.svg"
                  alt="Pyango Logo"
                  fill
                  style={{ objectFit: 'contain', objectPosition: 'center' }}
                  className="mx-auto w-full h-full"
                />
              </div>

            </div>

            {/* Top left */}
            <div className='absolute top-0 left-0 border-t-2 border-l-2 border-t-white border-l-white h-12 w-12'></div>

            {/* Top right */}
            <div className='absolute top-0 right-0 border-t-2 border-r-2 border-t-white border-r-white h-12 w-12'></div>

            {/* Bottom left */}
            <div className='absolute bottom-0 left-0 border-b-2 border-l-2 border-b-white border-l-white h-12 w-12'></div>

            {/* Bottom right */}
            <div className='absolute bottom-0 right-0 border-b-2 border-r-2 border-b-white border-r-white h-12 w-12'></div>
            <div className='absolute bottom-0 right-0 left-0 flex justify-center'>
              <p className='font-semibold text-xl'>Escanear para descargar</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 bottom-0 left-0 right-0 -z-10">
        {images.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={`Slide ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentImage ? "opacity-100" : "opacity-0"
              }`}
          />
        ))}
      </div>

      <div className="absolute top-0 bottom-0 left-0 right-0 -z-10 bg-black opacity-70"></div>

    </div>
  )
}