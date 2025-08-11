import Footer from '../../components/Footer';
import Header from '../../components/Header';

export default function CookiesPolicyPage() {
  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Política de Cookies</h1>

        <p className="mb-4">
          En <strong>Piyango</strong> utilizamos cookies y tecnologías similares para garantizar el correcto funcionamiento de nuestro sitio web, mejorar la experiencia del usuario y analizar el uso del mismo. La presente política describe qué son las cookies, qué tipos utilizamos, con qué finalidad y cómo puede gestionarlas.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. ¿Qué son las cookies?</h2>
        <p className="mb-4">
          Las cookies son pequeños archivos de texto que se almacenan en su dispositivo (ordenador, tableta o teléfono móvil) cuando visita un sitio web. Permiten que el sitio web recuerde sus acciones y preferencias durante un período de tiempo.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Tipos de cookies que utilizamos</h2>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>Cookies técnicas:</strong> necesarias para el funcionamiento del sitio y para habilitar funciones básicas como la navegación y el acceso a áreas seguras.</li>
          <li><strong>Cookies de personalización:</strong> permiten recordar preferencias como el idioma o la región.</li>
          <li><strong>Cookies analíticas:</strong> nos ayudan a comprender cómo interactúan los usuarios con el sitio, recopilando información de forma anónima.</li>
          <li><strong>Cookies de marketing:</strong> se utilizan para mostrar anuncios relevantes y medir la eficacia de las campañas publicitarias.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Cookies de terceros</h2>
        <p className="mb-4">
          Nuestro sitio puede incluir cookies de terceros, como Google Analytics, para fines estadísticos y publicitarios. Estos terceros son responsables de sus propias políticas de privacidad y cookies.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Consentimiento</h2>
        <p className="mb-4">
          Al acceder a nuestro sitio web por primera vez, se le mostrará un aviso de cookies donde podrá aceptar o rechazar su uso, así como configurar sus preferencias.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Cómo gestionar las cookies</h2>
        <p className="mb-4">
          Puede permitir, bloquear o eliminar las cookies instaladas en su dispositivo configurando las opciones de su navegador. Tenga en cuenta que la desactivación de cookies técnicas puede afectar al funcionamiento del sitio.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Cambios en la política de cookies</h2>
        <p className="mb-4">
          Piyango se reserva el derecho de modificar esta política de cookies en cualquier momento para adaptarla a cambios legislativos o técnicos. Las modificaciones serán publicadas en esta página.
        </p>

        <p className="mt-8">
          <strong>Titular:</strong> RIFFY SOLUTIONS S.L. <br />
          <strong>Nombre Comercial:</strong> Piyango <br />
          <strong>CIF:</strong> B22539944 <br />
          <strong>Domicilio:</strong> Garrofers 46, Teià (Barcelona), España <br />
          <strong>Email:</strong> soporte@piyango.es
        </p>
      </main>
      <Footer />
    </>
  );
}
