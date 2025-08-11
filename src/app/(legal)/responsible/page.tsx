import Footer from '../../components/Footer';
import Header from '../../components/Header';

export default function ResponsibleGamingPage() {
  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto p-6 text-gray-800">
        <h1 className="text-3xl font-bold mb-6">Juego Responsable</h1>

        <p className="mb-4">
          En <strong>Piyango</strong> promovemos el entretenimiento seguro y responsable. Nuestras rifas y sorteos están pensados
          para ser una experiencia lúdica y ocasional; nunca deben entenderse como una forma de obtener ingresos ni como sustituto
          de trabajo ni de un proyecto financiero. A continuación exponemos nuestras políticas, recomendaciones y herramientas
          para ayudar a los usuarios a jugar de manera responsable.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">1. Principios</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>El juego debe ser siempre voluntario, ocasional y con fines de ocio.</li>
          <li>No promocionamos el juego para menores de 18 años; el acceso está restringido a personas con capacidad legal.</li>
          <li>Fomentamos la transparencia: probabilidades, precio por papeleta y número máximo de boletos están siempre visibles.</li>
          <li>Proporcionamos herramientas y recursos para prevenir y abordar comportamientos de riesgo.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3">2. Recomendaciones prácticas</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>Establece un presupuesto máximo para ocio y no lo sobrepases.</li>
          <li>No uses dinero destinado a gastos esenciales (vivienda, alimentación, salud, ahorro obligatorio, etc.) para jugar.</li>
          <li>Limita el tiempo dedicado al seguimiento de rifas y sorteos; evita la participación impulsiva.</li>
          <li>No persigas pérdidas: si pierdes, evita apostar más dinero con la idea de recuperar lo perdido.</li>
          <li>Juega sólo por diversión — si deja de serlo, considera tomar una pausa.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3">3. Señales de juego problemático</h2>
        <p className="mb-4">
          Si reconoces varios de los siguientes signos en ti mismo o en alguien cercano, puede ser señal de que el juego está
          dejando de ser sano:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Preocupación constante por jugar o por las rifas próximas.</li>
          <li>Apostar más dinero del que puedes permitirte o aumentar el importe para compensar pérdidas.</li>
          <li>Ocultar la actividad de juego a familiares o amigos.</li>
          <li>Deterioro en el trabajo, estudio o relaciones por el tiempo o dinero gastado en juego.</li>
          <li>Uso del juego como escape emocional (para afrontar estrés, ansiedad, soledad, etc.).</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3">4. Herramientas y medidas preventivas que ofrecemos</h2>
        <p className="mb-4">
          En Piyango implementamos y recomendamos las siguientes medidas para promover un uso responsable:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Verificación de edad:</strong> requisitos para impedir el acceso de menores.
          </li>
          <li>
            <strong>Límites personales:</strong> posibilidad de establecer límites personales de gasto y/o número de boletos.
          </li>
          <li>
            <strong>Autoexclusión temporal o permanente:</strong> opción para solicitar la desactivación de la cuenta por un periodo determinado.
          </li>
          <li>
            <strong>Reality checks / avisos:</strong> mensajes informativos tras cierto tiempo de actividad o gasto acumulado.
          </li>
          <li>
            <strong>Acceso a ayuda:</strong> información y recursos para buscar apoyo profesional si fuera necesario.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3">5. Cómo solicitar límites o autoexclusión</h2>
        <p className="mb-4">
          Si deseas activar límites de depósito, límites de compra de boletos, o solicitar la autoexclusión, contacta con nuestro
          equipo de soporte en <strong>soporte@piyango.es</strong> indicando claramente la medida solicitada y, si procede, el periodo.
          Procesaremos la solicitud lo antes posible y te confirmaremos por correo electrónico. Ten en cuenta que algunas medidas
          (como la autoexclusión) pueden ser irreversibles hasta transcurrido el plazo establecido por el propio usuario o por
          requisitos legales.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">6. Recursos y ayuda profesional</h2>
        <p className="mb-4">
          Si crees que tú o alguien próximo puede tener un problema con el juego, te recomendamos buscar ayuda profesional. Entre las
          opciones están:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Contactar a servicios de salud mental o atención primaria de tu comunidad autónoma.</li>
          <li>Buscar asociaciones especializadas en ludopatía y adicciones al juego.</li>
          <li>Hablar con tu banco sobre opciones para bloquear transacciones o establecer límites en tarjetas.</li>
        </ul>
        <p className="mb-4">
          <em>Si quieres, puedo buscar y añadir aquí los números de teléfono y enlaces oficiales de ayuda en España (DGOJ, asociaciones y líneas de apoyo) para que los tengas visibles en la web.</em>
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">7. Menores de edad</h2>
        <p className="mb-4">
          El acceso y la participación están estrictamente prohibidos a menores de 18 años. Si detectamos que una cuenta pertenece
          a un menor, nos reservamos el derecho de cancelar la cuenta y anular participaciones, y adoptaremos las medidas necesarias
          para impedir futuros accesos, de conformidad con la legislación aplicable.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">8. Confidencialidad y protección de datos</h2>
        <p className="mb-4">
          Cualquier medida relativa a límites, autoexclusión o solicitudes de soporte conllevará el tratamiento de datos personales.
          Estos datos se usarán exclusivamente para la finalidad solicitada y se tratarán conforme a nuestra <strong>Política de Privacidad</strong>.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">9. Responsabilidad del usuario</h2>
        <p className="mb-4">
          El usuario es responsable de jugar dentro de sus posibilidades económicas y de utilizar las herramientas de control ofrecidas.
          Piyango proporciona medios y recomendaciones, pero no puede sustituir la responsabilidad personal de cada usuario.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">10. Contacto</h2>
        <p className="mb-4">
          Si tienes dudas sobre juego responsable, quieres activar límites o solicitar autoexclusión, contacta con:
        </p>
        <p className="mb-4">
          <strong>Email:</strong> soporte@piyango.es
        </p>
        <p className="mb-4 text-sm text-gray-500">
          Por favor indica en el correo tu nombre de usuario y claramente la medida que solicitas (límite de depósito, autoexclusión,
          cancelación de cuenta, etc.). Procesaremos tu solicitud con prioridad y en el menor tiempo posible.
        </p>

        <p className="mt-10 text-sm text-gray-500">
          Última actualización: {new Date().toLocaleDateString("es-ES")}
        </p>
      </main>
      <Footer />
    </>
  );
}
