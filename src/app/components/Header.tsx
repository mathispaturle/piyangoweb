'use client'

import { useState } from "react";

import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import useAuthUser from '../../lib/auth/useUserAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useRouter } from 'next/navigation';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { profile } from 'console';

export default function Header() {

  const showBanner = true;

  const [open, setOpen] = useState(false);

  const { user, userData, loading } = useAuthUser();
  const router = useRouter();

  return (
    <>
      {
        showBanner && (
          <div className="bg-black text-white p-2 font-semibold text-center text-sm">
            Nuevos sorteos cada semana! <Link href={"/signup"} className="underline">Únete a Piyango</Link>
          </div>
        )
      }

      <div className='w-full bg-white border-b border-gray-200 top-0 sticky z-20'>
        <div className='max-w-screen-xl mx-auto px-4 py-2 md:py-4 flex justify-between items-center md:grid md:grid-cols-3 gap-4'>
          <div className='hidden md:flex justify-start items-center gap-4 text-sm font-medium'>
            <Link href={"/competitions"}>
              Competiciones abiertas
            </Link>

            {/* <Link href={"/winners"}>
              Ganadores
            </Link> */}

            <Link href={"/tickets"}>
              Mis boletos
            </Link>
          </div>
          <Link href={"/"} className='flex items-center gap-2 relative'>
            <Image
              src="/logo.svg"
              alt="Pyango Logo"
              width={150}
              height={50}
              className="mx-auto"
            />
          </Link>

          {
            user ?
              <div className='flex justify-end items-center gap-4 text-sm font-medium'>
                <div className='flex items-end gap-0 flex-col'>
                  <p className='text-xs text-black font-semibold -mb-0.5'>{((userData?.wallet?.balanceCents ?? 0) / 100).toFixed(2)}€</p>
                  <Link href="/topup" className='text-xs text-main font-medium'>Ingresar</Link>
                </div>


                <DropdownMenu>
                  <DropdownMenuTrigger className='relative outline-0 '>
                    <div className='h-12 w-12 max-w-12 max-h-12 relative rounded-full overflow-hidden bg-main flex justify-center items-center'>
                      <Avatar className="h-full w-full relative flex justify-center items-center">
                        <AvatarImage src={userData?.profile_pic || ""} />
                        <AvatarFallback className="text-white uppercase font-semibold">
                          {userData?.fullname ? userData.fullname.charAt(0) : userData?.email?.charAt(0) || "?"}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className='min-w-48'>
                    <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {/* <DropdownMenuItem onClick={() => { router.push("/tickets") }}>Mis tickets</DropdownMenuItem> */}
                    <DropdownMenuItem onClick={() => { router.push("/profile") }}>Perfil</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => { router.push("/payments") }}>Pagos</DropdownMenuItem>
                    {/* <DropdownMenuItem>Ajustes</DropdownMenuItem> */}

                    {/* <Fragment >
                    </Fragment> */}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              :

              <div className='hidden md:flex justify-end items-center gap-4 text-sm font-medium'>
                <Link href={"/login"}>
                  Acceder
                </Link>

                <Link href={"/signup"} className='bg-main text-white px-4 py-2 rounded hover:bg-main transition-colors font-semibold'>
                  Abrir cuenta
                </Link>
              </div>
          }


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

                  {
                    user ?

                      <>

                      </>

                      : <>
                        <Link href={"/login"} className='text-sm font-medium'>
                          Acceder
                        </Link>
                        <Link href={"/signup"} className='bg-main text-white px-4 text-sm py-2 rounded hover:bg-main transition-colors font-semibold text-center'>
                          Abrir cuenta
                        </Link>
                      </>
                  }


                </div>
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}