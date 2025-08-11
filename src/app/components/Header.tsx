'use client'

import { useEffect, useState } from "react";

import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';


export default function Header() {

  const [open, setOpen] = useState(false);

  return (
    <div className='w-full bg-white border-b border-gray-200 top-0 sticky z-20'>
      <div className='max-w-screen-xl mx-auto px-4 py-2 md:py-4 flex justify-between items-center md:grid md:grid-cols-3 gap-4'>
        <div className='hidden md:flex justify-start items-center gap-4 text-sm font-medium'>
          <Link href={"/competitions"}>
            Competiciones abiertas
          </Link>

          <Link href={"/winners"}>
            Ganadores
          </Link>
        </div>
        <div>
          <Image
            src="/logo.svg"
            alt="Pyango Logo"
            width={150}
            height={50}
            className="mx-auto"
          />
        </div>

        <div className='hidden md:flex justify-end items-center gap-4 text-sm font-medium'>
          <Link href={"/login"}>
            Acceder
          </Link>

          <Link href={"/signup"} className='bg-main text-white px-4 py-2 rounded hover:bg-main transition-colors font-semibold'>
            Abrir cuenta
          </Link>
        </div>

        <div className='w-12 h-12 min-w-12 max-w-12 md:hidden flex justify-center items-center ' onClick={() => setOpen(!open)}>
          <Menu />
        </div>

        {
          open && (
            <div className='absolute top-16 left-0 w-full bg-white border-b border-gray-200 shadow-lg md:hidden'>
              <div className='flex flex-col gap-2 p-4'>
                <Link href={"/competitions"} className='text-sm font-medium'>
                  Competiciones abiertas
                </Link>
                <Link href={"/winners"} className='text-sm font-medium'>
                  Ganadores
                </Link>
                <Link href={"/login"} className='text-sm font-medium'>
                  Acceder
                </Link>
                <Link href={"/signup"} className='bg-main text-white px-4 text-sm py-2 rounded hover:bg-main transition-colors font-semibold text-center'>
                  Abrir cuenta
                </Link>
              </div>
            </div>
          ) 
        }
      </div>
    </div>
  )
}