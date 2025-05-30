import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import Faq from '../components/Faq';
import Footer from '../components/Footer';

function Landing() {
  return (
    <>
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <Faq />
      </main>
      <Footer />
    </>
  );
}

export default Landing;