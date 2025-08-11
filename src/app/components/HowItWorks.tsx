// components/HowItWorks.js

import { Ticket, ShoppingCart, Clock, Trophy } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: ShoppingCart,
      title: "Elige tu premio",
      description:
        "Explora nuestras rifas y selecciona el premio que quieres ganar.",
    },
    {
      icon: Ticket,
      title: "Compra tu boleto",
      description:
        "Consigue tu boleto por desde solo 2 €. Menos boletos, más probabilidades.",
    },
    {
      icon: Clock,
      title: "Espera el sorteo",
      description:
        "Cuando se vendan todos los boletos o acabe el tiempo, la rifa se cierra.",
    },
    {
      icon: Trophy,
      title: "Gana y celebra",
      description:
        "Elegimos al ganador en vivo y enviamos el premio directamente a tu puerta.",
    },
  ];


  return (
    <section className="py-32 bg-white ">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Como funciona Piyango
        </h2>

        <div className="grid gap-10 md:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-main/10 mb-4">
                <step.icon className="w-8 h-8 text-main" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
