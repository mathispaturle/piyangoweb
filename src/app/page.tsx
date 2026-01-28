
import Footer from './components/Footer';
import Header from './components/Header';
import HowItWorks from './components/HowItWorks';
import FeaturedRaffles from './components/FeaturedRaffles';
import FAQ from './components/FAQ';
import Download from './components/Download';
import Hero from './components/Hero';

export default function Home() {

  return (
    <>
      <Header />
      <Hero />
      <FeaturedRaffles />
      <HowItWorks />
      <FAQ />
      {/* <Download /> */}
      <Footer />
    </>
  );
}
