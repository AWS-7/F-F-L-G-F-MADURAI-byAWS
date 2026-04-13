import { ArrowRight, Phone, MapPin, Sparkles } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import confetti from 'canvas-confetti';

export default function CTABanner() {
  const { ref, isVisible } = useIntersectionObserver(0.2);

  const handleJoinClick = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#800080', '#F2D060'],
    });
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTrialClick = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background Effects */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(128,0,128,0.25) 0%, rgba(17,17,17,0.95) 50%, rgba(212,175,55,0.15) 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(212,175,55,0.1) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(128,0,128,0.2) 0%, transparent 50%)`,
        }}
      />

      {/* Animated border lines */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, #800080, transparent)',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`text-center section-fade ${isVisible ? 'visible' : ''}`}
          data-aos="zoom-in"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full"
            style={{
              background: 'rgba(212,175,55,0.1)',
              border: '1px solid rgba(212,175,55,0.3)',
            }}
          >
            <Sparkles size={14} style={{ color: '#D4AF37' }} />
            <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: '#D4AF37' }}>
              Limited Time Offer
            </span>
            <Sparkles size={14} style={{ color: '#D4AF37' }} />
          </div>

          {/* Main Headline */}
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Ready to{' '}
            <span className="gold-text">Transform</span>
            <br />
            <span style={{ color: '#800080' }}>Your Life?</span>
          </h2>

          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Join 100+ women who have already started their journey at Madurai's premier women-only fitness sanctuary.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={handleJoinClick}
              className="group flex items-center gap-3 px-10 py-5 text-base font-bold tracking-[0.15em] uppercase transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #F2D060)',
                color: '#111',
                borderRadius: '4px',
              }}
            >
              Join Now
              <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              onClick={handleTrialClick}
              className="flex items-center gap-3 px-10 py-5 text-base font-bold tracking-[0.15em] uppercase transition-all duration-300 hover:scale-105"
              style={{
                background: 'transparent',
                color: 'white',
                border: '2px solid rgba(255,255,255,0.3)',
                borderRadius: '4px',
              }}
            >
              Book Free Trial
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-white/40 text-sm">
            <div className="flex items-center gap-2">
              <Phone size={14} style={{ color: '#D4AF37' }} />
              <span>93442 49843</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-white/20" />
            <div className="flex items-center gap-2">
              <Phone size={14} style={{ color: '#D4AF37' }} />
              <span>90808 82873</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-white/20" />
            <div className="flex items-center gap-2">
              <MapPin size={14} style={{ color: '#D4AF37' }} />
              <span>Kadachanenthal & Othakkadai</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-white/20" />
            <div className="flex items-center gap-2">
              <span style={{ color: '#D4AF37' }}>★★★★★</span>
              <span>4.9/5 Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
