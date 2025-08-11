import Link from 'next/link'
import Image from 'next/image'


export default function Download() {

  return (
    <>
      <div className='w-full grid grid-cols-1 md:grid-cols-2 '>
        <div className='bg-black py-32 flex justify-center items-center flex-col text-white px-4'>
          <h2 className='text-xl md:text-3xl font-bold mb-2'>Descarga la App</h2>
          <p className='text-lg mb-8 text-center'>Lleva la emoción de Piyango contigo vayas donde vayas.</p>
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

        <div className='bg-main py-32 flex justify-center items-center flex-col text-white px-4'>
          <h2 className='text-xl md:text-3xl font-bold mb-2'>Obtén boletos gratis</h2>
          <p className='text-lg mb-8 max-w-lg mx-auto text-center'>Quieres convertirte en embajador de Piyango? Ayúdanos a difundir Piyango y consigue boletos gratis por cada amigo que invites.</p>

            <Link href={'/referral'} className=" bg-black text-white py-2 px-4 rounded-lg hover:bg-black/90 transition font-semibold text-sm cursor-pointer">
              Gana boletos gratis
            </Link>
          </div>
      </div>

    </>
  )
}