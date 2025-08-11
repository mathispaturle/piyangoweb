import Footer from '../../components/Footer';
import Header from '../../components/Header';

export default function LegalNoticePage() {
  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto p-6 text-gray-800">
        <h1 className="text-3xl font-bold mb-6">Aviso Legal</h1>

        <p className="mb-4">
          En cumplimiento con lo establecido en la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la
          Información y de Comercio Electrónico (LSSI-CE), se pone en conocimiento de los usuarios de este
          sitio web la siguiente información:
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">1. Datos identificativos</h2>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>Titular:</strong> RIFFY SOLUTIONS S.L.</li>
          <li><strong>Nombre Comercial:</strong> Piyango</li>
          <li><strong>CIF:</strong> B22539944</li>
          <li><strong>Domicilio:</strong> Garrofers 46, Teià (Barcelona), España</li>
          <li><strong>Email:</strong> soporte@piyango.es</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3">2. Objeto del sitio web</h2>
        <p className="mb-4">
          El sitio web <strong>Piyango</strong> tiene como finalidad ofrecer una plataforma de participación en
          rifas y sorteos online, gestionados por <strong>RIFFY SOLUTIONS S.L.</strong>, así como proporcionar
          información sobre los mismos y permitir la adquisición de boletos para participar en ellos.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">3. Condiciones de uso</h2>
        <p className="mb-4">
          El acceso y/o uso de este portal atribuye la condición de usuario, que acepta, desde dicho acceso y/o uso,
          las presentes condiciones de uso. El usuario se compromete a hacer un uso adecuado de los contenidos y
          servicios que <strong>Piyango</strong> ofrece a través de su sitio web y a no emplearlos para:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Incurrir en actividades ilícitas, ilegales o contrarias a la buena fe y al orden público.</li>
          <li>Difundir contenidos o propaganda de carácter racista, xenófobo, pornográfico, de apología del terrorismo o atentatorio contra los derechos humanos.</li>
          <li>Provocar daños en los sistemas físicos y lógicos de <strong>Piyango</strong>, de sus proveedores o de terceras personas.</li>
          <li>Intentar acceder y, en su caso, utilizar las cuentas de correo electrónico de otros usuarios y modificar o manipular sus mensajes.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-3">4. Propiedad intelectual e industrial</h2>
        <p className="mb-4">
          Todos los contenidos del sitio web, entendiendo por estos, a título enunciativo, los textos, fotografías,
          gráficos, imágenes, iconos, tecnología, software, así como su diseño gráfico y códigos fuente,
          constituyen una obra cuya propiedad pertenece a <strong>RIFFY SOLUTIONS S.L.</strong>, sin que puedan
          entenderse cedidos al usuario ninguno de los derechos de explotación sobre los mismos más allá de lo
          estrictamente necesario para el correcto uso del sitio.
        </p>
        <p className="mb-4">
          Las marcas, nombres comerciales o signos distintivos son titularidad de <strong>RIFFY SOLUTIONS S.L.</strong>
          o de terceros, sin que pueda entenderse que el acceso al sitio web atribuya ningún derecho sobre los mismos.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">5. Responsabilidad</h2>
        <p className="mb-4">
          <strong>RIFFY SOLUTIONS S.L.</strong> no se hace responsable, en ningún caso, de los daños y perjuicios
          de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos,
          falta de disponibilidad del portal o la transmisión de virus o programas maliciosos o lesivos en los contenidos,
          a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">6. Enlaces externos</h2>
        <p className="mb-4">
          En el caso de que en el sitio web se dispongan enlaces o hipervínculos hacía otros sitios de Internet,
          <strong>RIFFY SOLUTIONS S.L.</strong> no ejercerá ningún tipo de control sobre dichos sitios y contenidos.
          En ningún caso <strong>RIFFY SOLUTIONS S.L.</strong> asumirá responsabilidad alguna por los contenidos
          de algún enlace perteneciente a un sitio web ajeno, ni garantizará la disponibilidad técnica, calidad,
          fiabilidad, exactitud, amplitud, veracidad, validez y constitucionalidad de cualquier material o
          información contenida en ninguno de dichos hipervínculos u otros sitios de Internet.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-3">7. Legislación aplicable y jurisdicción</h2>
        <p className="mb-4">
          La relación entre <strong>RIFFY SOLUTIONS S.L.</strong> y el usuario se regirá por la normativa
          española vigente y cualquier controversia se someterá a los Juzgados y Tribunales de Barcelona,
          salvo que la ley disponga lo contrario.
        </p>

        <p className="mt-10 text-sm text-gray-500">
          Última actualización: {new Date().toLocaleDateString("es-ES")}
        </p>
      </main>
      <Footer />
    </>
  );
}
