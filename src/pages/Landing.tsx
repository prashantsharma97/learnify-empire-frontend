import React from 'react';
import Navbar from '../landingPageComponents/Navbar';
import HeroSection from '../landingPageComponents/HeroSection';
import FeaturesSection from '../landingPageComponents/FeaturesSection';
import HowItWorks from '../landingPageComponents/HowItWorks';
import Testimonials from '../landingPageComponents/Testimonials';
import Pricing from '../landingPageComponents/Pricing';
import Faq from '../landingPageComponents/Faq';
import Footer from '../landingPageComponents/Footer';

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