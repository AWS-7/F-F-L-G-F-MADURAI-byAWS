import SmartLoader from './components/SmartLoader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Programs from './components/Programs';
import DietPlans from './components/DietPlans';
import Gallery from './components/Gallery';
import Pricing from './components/Pricing';
import BMICalculator from './components/BMICalculator';
import HealthBar from './components/HealthBar';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PromoPopup from './components/PromoPopup';
import CTABanner from './components/CTABanner';
import FAQ from './components/FAQ';
import ClassSchedule from './components/ClassSchedule';
import Blog from './components/Blog';

function App() {
  return (
    <>
      <SmartLoader />
      <Navbar />
      <main>
        <Hero />
        <About />
        <BMICalculator />
        <Programs />
        <DietPlans />
        <ClassSchedule />
        <Pricing />
        <Gallery />
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
