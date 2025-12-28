import Footer from '../../components/Footer';
import Header from '../../components/Header';

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto p-6 text-gray-800">
        <h1 className="text-3xl font-bold mb-6">Términos y Condiciones</h1>

        <p className="mb-4">
          El presente documento establece los términos y condiciones generales de uso y contratación de los servicios ofrecidos a través de la plataforma <strong>Piyango</strong>, propiedad de <strong>RIFFY SOLUTIONS S.L.</strong>, con CIF <strong>B22539944</strong> y domicilio en Garrofers 46, Teià (Barcelona), España. El uso de esta plataforma implica la aceptación plena de estos términos por parte del usuario.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">1. Objeto</h2>
        <p className="mb-4">
          Regular el uso de la plataforma <strong>Piyango</strong> y la participación en rifas online organizadas por <strong>RIFFY SOLUTIONS S.L.</strong>.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">2. Requisitos para participar</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>Ser mayor de 18 años.</li>
          <li>Tener capacidad legal para contratar.</li>
          <li>Aceptar expresamente los presentes términos y condiciones.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3">3. Proceso de compra</h2>
        <ol className="list-decimal pl-6 mb-4">
          <li>Seleccionar la rifa o sorteo de interés.</li>
          <li>Adquirir uno o más boletos mediante los métodos de pago habilitados.</li>
          <li>Esperar al agotamiento de boletos.</li>
        </ol>

        <h2 className="text-xl font-semibold mt-8 mb-3">4. Celebración del sorteo</h2>
        <p className="mb-4">
          Los sorteos se celebrarán al agotarse el número total de boletos. El sorteo se realizará mediante un sistema aleatorio certificado y el resultado será publicado en la web.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">5. Premios</h2>
        <p className="mb-4">
          El premio será entregado al ganador de forma gratuita y sin costes adicionales. El ganador será contactado en un plazo máximo de 7 días hábiles tras la celebración del sorteo.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">6. Política de devoluciones</h2>
        <p className="mb-4">
          No se admiten devoluciones ni reembolsos de boletos una vez realizada la compra, salvo en caso de error imputable a <strong>Piyango</strong>.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">7. Limitación de responsabilidad</h2>
        <p className="mb-4">
          <strong>Piyango</strong> no será responsable por fallos técnicos, problemas de conexión, o incidencias ajenas a su control que impidan la participación en el sorteo.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">8. Legislación aplicable</h2>
        <p className="mb-4">
          Estos términos se rigen por la legislación española. Cualquier disputa será resuelta por los juzgados y tribunales de Barcelona, salvo que la ley disponga otro fuero.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">9. Soporte</h2>
        <p className="mb-4">
          Todas las preguntas serán respondidas a través de soporte@piyango.es.
        </p>

        <p className="mt-10 text-sm text-gray-500">
          Última actualización: {new Date().toLocaleDateString("es-ES")}
        </p>
      </main>
      <Footer />
    </>
  );
}
