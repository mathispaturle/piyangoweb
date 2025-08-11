
import Link from 'next/link';
import Footer from './components/Footer';
import Header from './components/Header';

import HowItWorks from './components/HowItWorks';
import FeaturedRaffles from './components/FeaturedRaffles';
import FAQ from './components/FAQ';
import Download from './components/Download';
import Hero from './components/Hero';

export default function Home() {

  const showBanner = true;



  return (
    <>
      {
        showBanner && (
          <div className="bg-black text-white p-2 font-semibold text-center text-sm">
            Nuevos sorteos cada semana! <Link href={"/signup"} className="underline">Únete a Piyango</Link>
          </div>
        )
      }

      <Header />
      <Hero />
      <HowItWorks />
      <FeaturedRaffles />
      <FAQ />
      <Download />
      <Footer />
    </>
  );
}
