import Footer from "../components/Footer";
import Header from "../components/Header";


export default function TicketsScreen() {
    return (<>
        <Header />

        <div>

            <section className="py-24 bg-gray-50">
                <div className="max-w-screen-xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3 text-left">
                        Mis boletos
                    </h2>
                    <p className='mb-12 text-left text-lg text-gray-600'>Accede a la lista de todos los boletos que has adquirido en Piyango</p>

                    <hr />

                </div>
            </section>
        </div>

        <Footer />

    </>)
}