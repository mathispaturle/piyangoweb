
import Link from 'next/link'

export default function RaffleCard({raffle}: {raffle: any}) {

  const image = raffle.images != null ? raffle.images[0] : "/placeholder.webp"

  return (
    <Link key={raffle.id} href={`/raffle/${raffle.id}`}>
    <div

        className="w-full h-60 bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden relative"
    >
      <img
          src={image}
        alt={raffle.title}
          className="h-full w-full object-cover object-top"
      />

        <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 via-transparent to-transparent'>
        </div>
        <h3 className="absolute bottom-4 left-4 text-xl font-semibold text-white">{raffle.title}</h3>
        <h3 className="absolute bottom-4 right-4  font-semibold text-sm text-white bg-main px-2 py-1 rounded-full">€ {parseFloat(raffle.price_ticket).toFixed(2)}</h3>


      </div>
      {/* <div className="p-5">
        <h3 className="text-lg font-semibold">{raffle.title}</h3>
        <div className="flex items-center justify-between text-sm mb-3">
          <span className="font-medium text-pink-600">
            {raffle.price_ticket} €
          </span>
          <span className="text-gray-500">
            {raffle.available_tickets} boletos restantes
          </span>
        </div>
        <Link href={`/raffle/${raffle.id}`} className="w-full bg-main text-white py-2 px-4 rounded-lg hover:bg-main transition font-semibold text-sm cursor-pointer">
          Reservar boleto
        </Link>
      </div> */}
    </Link >
  )
}