// components/FAQ.js
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      question: "¿Cómo funciona Piyango?",
      answer:
        "Piyango organiza rifas con un número limitado de boletos, por ejemplo 2.000, a un precio fijo. Compras uno o varios boletos, y cuando se venden todos o llega la fecha límite, hacemos el sorteo y entregamos el premio al ganador.",
    },
    {
      question: "¿Por qué tengo más probabilidades de ganar aquí?",
      answer:
        "Porque limitamos el número de boletos. Si hay 2.000 boletos, tu probabilidad es mucho mayor que en rifas o loterías tradicionales con millones de participaciones.",
    },
    {
      question: "¿Qué pasa si no se venden todos los boletos?",
      answer:
        "El sorteo se realiza igualmente en la fecha establecida, con todos los boletos vendidos hasta ese momento.",
    },
    {
      question: "¿Cómo se elige al ganador?",
      answer:
        "Usamos un sistema de sorteo certificado y aleatorio, auditado para garantizar total transparencia.",
    },
    {
      question: "¿Puedo comprar más de un boleto?",
      answer:
        "Sí, puedes comprar tantos como quieras, siempre que queden disponibles.",
    },
    {
      question: "¿Cómo recibo el premio si gano?",
      answer:
        "Te contactamos directamente y coordinamos el envío gratuito y seguro a tu domicilio.",
    },
    {
      question: "¿Es seguro comprar en Piyango?",
      answer:
        "Sí. Usamos pagos seguros con proveedores de confianza y cumplimos con la normativa vigente de sorteos.",
    },
    {
      question: "¿Qué métodos de pago aceptan?",
      answer:
        "Tarjeta de crédito/débito, PayPal y otros métodos locales dependiendo de tu país.",
    },
    {
      question: "¿Puedo participar desde cualquier país?",
      answer:
        "En general sí, pero algunos premios pueden tener restricciones de envío según tu ubicación. Esto se indicará en la página de la rifa.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Preguntas Frecuentes</h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg shadow-sm cursor-pointer"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full p-4 text-left"
              >
                <span className="font-medium text-gray-800">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                    }`}
                />
              </button>
              {openIndex === index && (
                <div className="p-4 border-t border-gray-200 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
