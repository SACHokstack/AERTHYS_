import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import WhyMicrogreens from './components/WhyMicrogreens';
import WhatWeSolve from './components/WhatWeSolve';
import WhoWeSupply from './components/WhoWeSupply';
import AboutUs from './components/AboutUs';
import FounderStory from './components/FounderStory';
import HowItWorks from './components/HowItWorks';
import Mission from './components/Mission';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <Navbar />
      <HeroSection />
      <WhyMicrogreens />
      <WhatWeSolve />
      <WhoWeSupply />
      <AboutUs />
      <FounderStory />
      <HowItWorks />
      <Mission />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
