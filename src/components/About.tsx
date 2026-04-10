import { Shield, Heart, Star, Users, Instagram, Facebook } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useState, useEffect } from 'react';
import femme4 from '../images/femme4.webp';

const stats = [
  { value: '', label: '' },
  { value: '', label: '' },
  { value: '', label: '' },
];

// Cycling Text Component
function CyclingText() {
  const phrases = ['Expert Trainers', 'Elite Branches', 'Active Many Members'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setIsVisible(false);
      
      // Change text and fade in after transition
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % phrases.length);
        setIsVisible(true);
      }, 500); // Wait for fade out
    }, 2500); // Total time per phrase (2s visible + 0.5s transition)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-4 md:py-6 flex items-center justify-center">
      <div className="text-center">
        <h3
          className={`font-display font-bold transition-all duration-500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            color: '#D4AF37',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            textShadow: '0 0 30px rgba(212,175,55,0.3)',
            minHeight: '1.2em',
          }}
        >
          {phrases[currentIndex]}
        </h3>
      </div>
    </div>
  );
}

// Our Videos Section Component
function OurVideos() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(17,17,17,0) 0%, rgba(212,175,55,0.05) 50%, rgba(17,17,17,0) 100%)',
        }}
      />
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-10">
          <h2
            className="font-display font-bold text-4xl sm:text-5xl md:text-6xl tracking-wide"
            style={{
              color: '#D4AF37',
              textShadow: '0 0 40px rgba(212,175,55,0.3)',
            }}
          >
            Our Videos
          </h2>
          <div className="gold-line w-20 mx-auto mt-4" />
        </div>

        {/* Social Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          {/* Instagram Button */}
          <a
            href="https://www.instagram.com/femme_flexmdu59?igsh=YmlodGZvMGdodHRx"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-8 py-4 text-base font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0.05) 100%)',
              border: '2px solid #D4AF37',
              color: '#D4AF37',
              borderRadius: '8px',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Instagram size={22} />
            <span>Follow on Instagram</span>
          </a>

          {/* Facebook Button */}
          <a
            href="https://www.facebook.com/share/18EeaQWTW1/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-8 py-4 text-base font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0.05) 100%)',
              border: '2px solid #D4AF37',
              color: '#D4AF37',
              borderRadius: '8px',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Facebook size={22} />
            <span>Follow on Facebook</span>
          </a>
        </div>

        {/* Subtitle */}
        <p className="text-center text-white/40 text-sm mt-8 tracking-wider">
          Watch our latest workout videos and success stories
        </p>
      </div>
    </section>
  );
}

const pillars = [
  {
    icon: Shield,
    title: '100% Women-Only',
    desc: 'A safe, judgment-free space exclusively for women to thrive at every fitness level.',
  },
  {
    icon: Heart,
    title: 'Flex Philosophy',
    desc: 'We believe strength is beautiful. Our philosophy fuses empowerment, wellness, and community.',
  },
  {
    icon: Star,
    title: 'Elite Guidance',
    desc: 'World-class certified trainers who personalize every session to your body and goals.',
  },
  {
    icon: Users,
    title: 'Sacred Sanctuary',
    desc: 'More than a gym — a community of women lifting each other up, every single day.',
  },
];

export default function About() {
  const { ref, isVisible } = useIntersectionObserver(0.1);
  const [visibleStats, setVisibleStats] = useState([false, false, false]);

  // Typing/fading effect - show stats one by one
  useEffect(() => {
    if (isVisible) {
      // Reset and start animation
      setVisibleStats([false, false, false]);
      
      // Show first stat immediately
      setTimeout(() => {
        setVisibleStats([true, false, false]);
      }, 100);
      
      // Show second stat after 800ms
      setTimeout(() => {
        setVisibleStats([true, true, false]);
      }, 900);
      
      // Show third stat after 1600ms
      setTimeout(() => {
        setVisibleStats([true, true, true]);
      }, 1700);
    }
  }, [isVisible]);

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 80% 20%, rgba(128,0,128,0.08) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`section-fade ${isVisible ? 'visible' : ''}`}
        >
          <div className="text-center mb-16">
            <p
              className="text-xs font-semibold tracking-[0.4em] uppercase mb-4"
              style={{ color: '#800080' }}
            >
              Our Story
            </p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Born on{' '}
              <span
                className="gold-text"
              >
                April 11, 2025
              </span>
            </h2>
            <div className="gold-line w-24 mx-auto mb-8" />
            <p className="text-white/60 text-lg max-w-3xl mx-auto leading-relaxed">
              Femme Flex was founded with a singular vision: to create Madurai's most empowering
              women-only fitness sanctuary. From our opening day, we set out to redefine what it
              means to train — combining elite programming, luxurious spaces, and an unbreakable
              sisterhood that pushes every woman beyond her limits.
            </p>
          </div>

          {/* Cycling Hero Text */}
          <CyclingText />

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2 md:gap-8 mb-20 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div key={stat.value} className="text-center px-1">
                <div
                  className={`font-display text-sm sm:text-xl md:text-3xl lg:text-4xl font-black mb-1 md:mb-2 leading-tight transition-all duration-700 ${
                    visibleStats[index] 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-4'
                  }`}
                  style={{ color: '#D4AF37' }}
                >
                  {stat.value}
                </div>
                <div className={`text-white/50 text-[10px] sm:text-xs md:text-sm tracking-wider uppercase transition-all duration-700 delay-200 ${
                  visibleStats[index] 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4'
                }`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          <div
            className="relative overflow-hidden"
            style={{ borderRadius: '4px' }}
          >
            <img
              src={femme4}
              alt="Femme Flex Gym Interior"
              className="w-full h-72 md:h-96 object-cover"
              loading="lazy"
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, rgba(128,0,128,0.3) 0%, transparent 60%)',
              }}
            />
            <div className="absolute bottom-6 left-6">
              <p className="text-xs text-white/60 tracking-[0.2em] uppercase mb-1">Est.</p>
              <p className="font-display text-2xl font-bold text-white">April 11, 2025</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="dark-card p-6 card-hover"
                style={{ borderRadius: '4px' }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center mb-4"
                  style={{
                    background: 'rgba(128,0,128,0.15)',
                    border: '1px solid rgba(128,0,128,0.4)',
                    borderRadius: '50%',
                  }}
                >
                  <pillar.icon size={18} style={{ color: '#D4AF37' }} />
                </div>
                <h3 className="font-display text-sm font-bold text-white mb-2">{pillar.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="relative overflow-hidden text-center py-12 px-6"
          style={{
            background: 'linear-gradient(135deg, rgba(128,0,128,0.2) 0%, rgba(128,0,128,0.05) 100%)',
            border: '1px solid rgba(212,175,55,0.2)',
            borderRadius: '4px',
          }}
        >
          <div className="shimmer-bg absolute inset-0 pointer-events-none" />
          <p className="text-xs font-semibold tracking-[0.4em] uppercase mb-4" style={{ color: '#800080' }}>
            The Flex Philosophy
          </p>
          <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white max-w-4xl mx-auto leading-relaxed">
            "Every woman deserves a space where she is{' '}
            <span className="gold-text">powerful</span>,{' '}
            <span style={{ color: '#800080' }}>supported</span>, and{' '}
            <span className="gold-text">unstoppable</span>."
          </blockquote>
          <p className="text-white/40 text-sm mt-6 tracking-wider">— The Femme Flex Founding Team</p>
        </div>

        {/* Our Videos Section */}
        <OurVideos />
      </div>
    </section>
  );
}
