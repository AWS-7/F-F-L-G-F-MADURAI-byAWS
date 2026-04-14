import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useBackButtonScroll } from './hooks/useBackButtonScroll.js';
import SmartLoader from './components/SmartLoader.js';
import Navbar from './components/Navbar.js';
import Hero from './components/Hero.js';
import About from './components/About.js';
import Programs from './components/Programs.js';
import DietPlans from './components/DietPlans.js';
import Gallery from './components/Gallery.js';
import Pricing from './components/Pricing.js';
import BMICalculator from './components/BMICalculator.js';
import AIDietGenerator from './components/AIDietGenerator.js';
import HealthBar from './components/HealthBar.js';
import Reviews from './components/Reviews.js';
import Contact from './components/Contact.js';
import Footer from './components/Footer.js';
import PromoPopup from './components/PromoPopup.js';
import CTABanner from './components/CTABanner.js';
import FAQ from './components/FAQ.js';
import ClassSchedule from './components/ClassSchedule.js';
import Blog from './components/Blog.js';
import TextMarquee from './components/TextMarquee.js';
import DietPlanResult from './pages/DietPlanResult.js';

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
