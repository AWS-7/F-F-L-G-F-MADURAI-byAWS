import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import DietPlanResult from './pages/DietPlanResult';

function HomePage() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });

    // Handle hash-based scrolling (e.g., when returning from Diet Plan Result page)
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500); // Wait for AOS animations to initialize
    }
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

function AppContent() {
  // Initialize back button scroll behavior
  useBackButtonScroll();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/diet-plan-result" element={<DietPlanResult />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter basename="/F-F-L-G-F-MADURAI-byAWS/">
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
