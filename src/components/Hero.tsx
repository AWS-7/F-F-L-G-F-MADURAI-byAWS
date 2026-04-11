import { ChevronDown } from 'lucide-react';
import heroImage from '../images/aiiii.jpg';
import GoldParticles from './GoldParticles';

export default function Hero() {
  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background layers - particles at very back */}
      <GoldParticles />
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Femme Flex Fitness"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        <div className="hero-overlay absolute inset-0" />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 30% 50%, rgba(128,0,128,0.15) 0%, transparent 60%)',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p
          className="text-xs sm:text-sm font-semibold tracking-[0.4em] uppercase mb-6 animate-fadeIn"
          style={{ color: '#800080', animationFillMode: 'both' }}
        >
          Madurai's Elite Wellness Sanctuary
        </p>

        <div className="overflow-hidden mb-2">
          <h1
            className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-none"
            style={{
              color: '#D4AF37',
              textShadow: '0 0 60px rgba(212,175,55,0.3)',
              animation: 'fadeInUp 1s ease-out 0.2s both',
            }}
          >
            FEMME
          </h1>
        </div>
        <div className="overflow-hidden mb-6">
          <h1
            className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-none"
            style={{
              color: '#800080',
              textShadow: '0 0 60px rgba(128,0,128,0.4)',
              animation: 'fadeInUp 1s ease-out 0.4s both',
            }}
          >
            FLEX
          </h1>
        </div>

        <div className="gold-line w-32 mx-auto mb-8" style={{ animation: 'fadeIn 1s ease-out 0.6s both' }} />

        <p
          className="text-lg sm:text-xl md:text-2xl text-white/90 font-light tracking-wide leading-relaxed max-w-2xl mx-auto mb-4"
          style={{ animation: 'fadeInUp 1s ease-out 0.7s both' }}
        >
          Redefining modern fitness for the modern woman
        </p>
        <p
          className="text-sm text-white/50 tracking-[0.2em] uppercase mb-10"
          style={{ animation: 'fadeIn 1s ease-out 0.9s both', color: '#D4AF37' }}
        >
          Since April 11, 2025
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          style={{ animation: 'fadeInUp 1s ease-out 1s both' }}
        >
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #D4AF37, #F2D060)',
              color: '#111',
              borderRadius: '2px',
              boxShadow: '0 8px 30px rgba(212,175,55,0.3)',
            }}
          >
            Start Your Journey
          </button>
          <button
            onClick={() => document.querySelector('#programs')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 text-sm font-medium tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105 text-white"
            style={{
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '2px',
              backdropFilter: 'blur(8px)',
              background: 'rgba(255,255,255,0.05)',
            }}
          >
            Explore Programs
          </button>
        </div>
      </div>

      <div className="absolute bottom-4 md:bottom-8 left-0 right-0 flex justify-center">
        <button
          onClick={scrollToAbout}
          className="flex flex-col items-center gap-2 text-white/40 hover:text-metallic-gold transition-colors duration-300 animate-bounce"
        >
          <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
          <ChevronDown size={16} />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end px-6 pb-6 hidden md:flex">
        <div className="text-left">
          <p className="text-xs text-white/30 tracking-wider uppercase">Kadachanenthal Branch</p>
          <p className="text-xs text-white/50">Madurai, Tamil Nadu</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-white/30 tracking-wider uppercase">Othakkadai Branch</p>
          <p className="text-xs text-white/50">Madurai, Tamil Nadu</p>
        </div>
      </div>
    </section>
  );
}
