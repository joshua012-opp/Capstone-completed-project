import React from 'react';
import Header from '../Components/Header';
import Hero from '../Components/Hero';
import HeroImageCarousel from '../Components/HeroImageCarousel';
import Communities from '../Components/Communites';
import VisionSection from '../Components/VisionSection';
import Facilities from '../Components/Facilities';
import Awards from '../Components/Awards';
import Gallery from '../Components/Gallery';
import FAQ from '../Components/FAQ';
import Footer from '../Components/Footer';

export default function Home(): React.JSX.Element {
  return (
    <div className="bg-white text-[#141414] font-sans antialiased">
      <Header />
      <Hero />
      <HeroImageCarousel />
      <Communities />
      <VisionSection />
      <Facilities />
      <Awards />
      <Gallery />
      <FAQ />
      <Footer />
    </div>
  );
}