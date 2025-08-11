import Footer from '../../components/Footer';
import Header from '../../components/Header';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Política de Privacidad</h1>

        <p className="mb-4">
          En cumplimiento de lo dispuesto en el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016
          relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos personales y a la libre circulación de estos datos
          (RGPD), así como en la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD),
          se facilita la presente Política de Privacidad.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">1. Datos del responsable del tratamiento</h2>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>Titular:</strong> RIFFY SOLUTIONS S.L.</li>
          <li><strong>Nombre Comercial:</strong> Piyango</li>
          <li><strong>CIF:</strong> B22539944</li>
          <li><strong>Domicilio:</strong> Garrofers 46, Teià (Barcelona), España</li>
          <li><strong>Email:</strong> soporte@piyango.es</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">2. Finalidad del tratamiento de datos</h2>
        <p className="mb-4">
          Los datos personales que el usuario facilite a través de la página web serán tratados para las siguientes finalidades:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Gestionar su registro como usuario y permitir el acceso a las funcionalidades de la plataforma.</li>
          <li>Gestionar la participación en sorteos, rifas o promociones ofrecidas por Piyango.</li>
          <li>Enviar comunicaciones comerciales, newsletters y actualizaciones relacionadas con nuestros servicios, siempre que el usuario lo haya consentido.</li>
          <li>Responder a consultas, solicitudes o reclamaciones realizadas a través de nuestros canales de contacto.</li>
          <li>Cumplir con las obligaciones legales aplicables.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">3. Base jurídica del tratamiento</h2>
        <p className="mb-4">
          El tratamiento de los datos se basa en el consentimiento del interesado, en la ejecución de un contrato en el que el interesado
          es parte, o en el cumplimiento de obligaciones legales aplicables al responsable del tratamiento.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">4. Conservación de los datos</h2>
        <p className="mb-4">
          Los datos personales proporcionados se conservarán mientras sean necesarios para la finalidad para la que fueron recabados,
          y mientras el usuario no solicite su supresión. En todo caso, se conservarán durante los plazos legalmente establecidos.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">5. Comunicación de datos</h2>
        <p className="mb-4">
          Los datos no serán comunicados a terceros, salvo obligación legal o cuando sea necesario para la prestación del servicio,
          en cuyo caso se garantizará que dichos terceros cumplen con las garantías de protección de datos exigidas.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">6. Derechos del usuario</h2>
        <p className="mb-4">
          El usuario tiene derecho a:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Acceder a sus datos personales.</li>
          <li>Rectificar los datos inexactos o incompletos.</li>
          <li>Solicitar la supresión de sus datos cuando, entre otros motivos, ya no sean necesarios para los fines para los que fueron recogidos.</li>
          <li>Solicitar la limitación del tratamiento de sus datos.</li>
          <li>Oponerse al tratamiento de sus datos.</li>
          <li>Solicitar la portabilidad de sus datos a otro responsable del tratamiento.</li>
        </ul>
        <p className="mb-4">
          Para ejercer estos derechos, el usuario deberá enviar una solicitud por escrito a la dirección de correo electrónico
          <strong> soporte@piyango.es</strong>, acompañada de una copia de su documento de identidad.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">7. Seguridad de los datos</h2>
        <p className="mb-4">
          Piyango adopta las medidas técnicas y organizativas necesarias para garantizar la seguridad de los datos personales
          y evitar su alteración, pérdida, tratamiento o acceso no autorizado, teniendo en cuenta el estado de la tecnología,
          la naturaleza de los datos y los riesgos a los que están expuestos.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">8. Cambios en la Política de Privacidad</h2>
        <p className="mb-4">
          Piyango se reserva el derecho a modificar la presente política para adaptarla a novedades legislativas o jurisprudenciales,
          así como a prácticas de la industria. En tales casos, se anunciarán en esta página los cambios introducidos con
          razonable antelación a su puesta en práctica.
        </p>

      </div>
      <Footer />
    </>
  );
}
