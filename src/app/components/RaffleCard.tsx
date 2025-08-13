
import Link from 'next/link'

export default function RaffleCard({raffle}: {raffle: any}) {

  return (
    <div
      key={raffle.id}
      className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
    >
      <img
        src={raffle.imageUrl}
        alt={raffle.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <h3 className="text-lg font-semibold">{raffle.title}</h3>
        {/* <p className="text-sm text-gray-500 mb-3">
                    {raffle.description}
                  </p> */}
        <div className="flex items-center justify-between text-sm mb-3">
          <span className="font-medium text-pink-600">
            {raffle.price_ticket} €
          </span>
          <span className="text-gray-500">
            {raffle.available_tickets} boletos restantes
          </span>
        </div>
        {/* <div className="flex items-center text-gray-500 text-xs mb-4">
                    <Clock className="w-4 h-4 mr-1" />
                    {new Date(raffle.drawDate.seconds * 1000).toLocaleDateString("es-ES")}
                  </div> */}
        <Link href={`/raffle/${raffle.id}`} className="w-full bg-main text-white py-2 px-4 rounded-lg hover:bg-main transition font-semibold text-sm cursor-pointer">
          Reservar boleto
        </Link>
      </div>
    </div>
  )
}