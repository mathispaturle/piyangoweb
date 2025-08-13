import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='w-full bg-white border-t border-gray-200 text-left text-sm'>

      <div className='bg-gray-50 py-8 px-4'>
        <div className='max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4'>
          <div>
            <h3 className='font-semibold text-lg'>Piyango</h3>
            <p className='text-gray-600 mt-4 space-y-4'>Tu plataforma de sorteos y competiciones, más justa y con más posibilidades que nunca</p>
          </div>

          <div>
            <h3 className='font-semibold text-lg'>Enlaces rápidos</h3>
            <ul className='text-gray-600 mt-4 space-y-2'>
              <li><Link href={"/rifas"}>Competiciones abiertas</Link></li>
              <li><Link href={"/winners"}>Ganadores</Link></li>
              <li><Link href={"/signup"}>Abrir cuenta</Link></li>
              <li><Link href={"/signup"}>Blog</Link></li>
            </ul>
          </div>
          <div className='md:col-span-2'>
            <h3 className='font-semibold text-lg'>Enlaces útiles</h3>
            <ul className='text-gray-600 grid md:grid-cols-2 space-y-2 mt-4'>
              <li><Link href={"/terms"}>Términos y condiciones</Link></li>
              <li><Link href={"/privacy"}>Política de privacidad</Link></li>
              <li><Link href={"/legal"}>Aviso Legal</Link></li>
              <li><Link href={"/cookies"}>Política de cookies</Link></li>
              <li><Link href={"/refund"}>Política de devolución y reembolsos</Link></li>
              <li><Link href={"/responsible"}>Juego responsable</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className='border-t border-gray-200 py-4 bg-black text-white'>

        <div className='max-w-screen-xl mx-auto text-center space-y-2 px-4'>
          <div className='flex md:flex-row flex-col justify-between items-center gap-4'>
            <p className=''>© 2023 Piyango.  Todos los derechos reservados.</p>
            <p className=''>Hecho con ❤️ por el equipo de Piyango</p>

          </div>
        </div>
      </div>

    </footer>
  )
}