import Footer from '../../components/Footer';
import Header from '../../components/Header';

export default function RefundPolicyPage() {
  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto p-6 text-gray-800">
        <h1 className="text-3xl font-bold mb-6">Política de Devolución y Reembolso</h1>

        <p className="mb-4">
          En <strong>Piyango</strong> (titular: <strong>RIFFY SOLUTIONS S.L.</strong>, CIF <strong>B22539944</strong>, domicilio en
          Garrofers 46, Teià (Barcelona), España) tratamos de ofrecer un servicio claro y transparente. A continuación
          se detalla nuestra política de devoluciones y reembolsos aplicada a la venta de participaciones/papeletas para
          rifas y sorteos.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">1. Naturaleza del producto</h2>
        <p className="mb-4">
          Los productos comercializados en Piyango son participaciones o papeletas para participar en rifas y sorteos.
          Dada la naturaleza de este tipo de producto —prestación de un servicio de ocio con fecha o periodo de ejecución
          determinado—, el derecho de desistimiento previsto en la normativa de consumidores y usuarios no resulta aplicable
          en muchos supuestos. Esta exclusión está basada en la normativa vigente aplicable a contratos de ocio y servicios
          con fecha determinada.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">2. Política general de devoluciones</h2>
        <p className="mb-4">
          Salvo en los casos expresamente indicados en esta política, <strong>no se admiten devoluciones, cambios ni reembolsos</strong>
          de las papeletas adquiridas. Una vez completada la compra y emitida la papeleta, el importe pagado se considera
          definitivo y no reembolsable, por la condición consumible y no reversible del servicio prestado.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">3. Excepciones: errores imputables a Piyango</h2>
        <p className="mb-4">
          Entendemos que pueden producirse errores puntuales. En los siguientes supuestos, y previa verificación, procederemos
          a la corrección o, en su caso, al reembolso:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Cobro duplicado:</strong> si detectas que se ha efectuado más de un cargo por la misma compra, contacta con soporte.
          </li>
          <li>
            <strong>Error en la asignación de la papeleta:</strong> si por error técnico la papeleta no queda registrada a tu favor.
          </li>
          <li>
            <strong>Imposibilidad técnica demostrable de participación:</strong> cuando, por fallo del sistema de Piyango,
            no haya sido posible participar efectivamente en la rifa adquirida.
          </li>
        </ul>
        <p className="mb-4">
          Para que cualquiera de las situaciones anteriores sea considerada válida, el usuario deberá notificar el problema a
          <strong> soporte@piyango.es</strong> en un plazo máximo de <strong>48 horas</strong> desde la fecha de compra, adjuntando
          comprobantes de pago y cualquier información relevante.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">4. Procedimiento de verificación y reembolso</h2>
        <p className="mb-4">
          Tras recibir la reclamación, Piyango realizará las comprobaciones necesarias y, si se confirma que el error es
          imputable a Piyango, procederá a:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Corregir la incidencia técnica o administrativa en la mayor brevedad posible.</li>
          <li>Si procede reembolso, devolver el importe pagado mediante el mismo medio de pago utilizado por el cliente.</li>
        </ul>
        <p className="mb-4">
          El plazo máximo para efectuar el reembolso será de <strong>14 días naturales</strong> desde la confirmación de la
          incidencia. El tiempo que tarde en verse reflejado dependerá del método de pago y la entidad emisora.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">5. Boletos no vendidos y cancelaciones de rifas</h2>
        <p className="mb-4">
          Si una rifa fuera cancelada por causas extraordinarias (fuerza mayor, imposibilidad legal de entrega del premio,
          fraude acreditado, etc.), Piyango comunicará la situación a los participantes y explicará las vías de resolución.
          En estos casos Piyango podrá optar por:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Reprogramar la rifa y notificar nueva fecha.</li>
          <li>Ofrecer la entrega alternativa del premio equivalente.</li>
          <li>Proceder al reembolso proporcional o total cuando la reprogramación o sustitución sea imposible, según la circunstancia concreta.</li>
        </ul>
        <p className="mb-4">
          Las decisiones sobre cancelaciones y reembolsos se tomarán siempre buscando proteger los intereses de los participantes
          y respetando la normativa aplicable.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">6. Datos personales y reembolsos</h2>
        <p className="mb-4">
          Para gestionar cualquier reembolso o incidencia será necesario tratar algunos datos personales (nombre, email,
          datos de pago, etc.). El tratamiento de dichos datos se realizará conforme a nuestra <strong>Política de Privacidad</strong>
          y en base a la normativa aplicable (RGPD y LOPDGDD). Puedes ejercer tus derechos de acceso, rectificación,
          supresión, oposición, limitación del tratamiento y portabilidad en <strong>soporte@piyango.es</strong>.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">7. Aceptación de la política</h2>
        <p className="mb-4">
          La compra de una papeleta en Piyango implica la aceptación expresa de esta Política de Devolución y Reembolso.
          Si no estás conforme con estas condiciones, por favor no completes la compra.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">8. Legislación aplicable</h2>
        <p className="mb-4">
          Esta política se rige por la legislación española, en particular por la normativa de consumidores y usuarios,
          así como por el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD). Para cualquier controversia
          serán competentes los Juzgados y Tribunales de Barcelona, salvo que la ley aplicable disponga otra cosa.
        </p>

        <p className="mt-10 text-sm text-gray-500">
          Última actualización: {new Date().toLocaleDateString("es-ES")}
        </p>
      </main>
      <Footer />
    </>
  );
}
