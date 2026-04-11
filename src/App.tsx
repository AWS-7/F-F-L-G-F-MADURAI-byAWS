import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useBackButtonScroll } from './hooks/useBackButtonScroll';
import SmartLoader from './components/SmartLoader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Programs from './components/Programs';
import DietPlans from './components/DietPlans';
import Gallery from './components/Gallery';
import Pricing from './components/Pricing';
import BMICalculator from './components/BMICalculator';
import AIDietGenerator from './components/AIDietGenerator';
import HealthBar from './components/HealthBar';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PromoPopup from './components/PromoPopup';
import CTABanner from './components/CTABanner';
import FAQ from './components/FAQ';
import ClassSchedule from './components/ClassSchedule';
import Blog from './components/Blog';
import TextMarquee from './components/TextMarquee';

function App() {
  // Initialize back button scroll behavior
  useBackButtonScroll();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  }, []);
  return (
    <>
      <SmartLoader />
      <Navbar />
      <main>
        <Hero />
        <TextMarquee />
        <About />
        <BMICalculator />
        <Programs />
        <DietPlans />
        <Gallery />
        <Pricing />
        <AIDietGenerator />
        <ClassSchedule />
        <CTABanner />
        <HealthBar />
        <Blog />
        <Reviews />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <PromoPopup />
    </>
  );
}

export default App;
