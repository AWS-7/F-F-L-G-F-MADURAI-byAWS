import { Shield, Heart, Star, Users } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver.js';
import { useSectionReveal } from '../hooks/useParallaxReveal.js';
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
  const { ref: sectionRef, isVisible } = useIntersectionObserver(0.1);
  const { ref: headingRef, isVisible: headingVisible } = useSectionReveal(0.1);
  const { ref: subtitleRef, isVisible: subtitleVisible } = useSectionReveal(0.1);
  const { ref: textRef, isVisible: textVisible } = useSectionReveal(0.1);
  const { ref: imageRef, isVisible: imageVisible } = useSectionReveal(0.15);
  const { ref: pillarsRef, isVisible: pillarsVisible } = useSectionReveal(0.1);
  const { ref: quoteRef, isVisible: quoteVisible } = useSectionReveal(0.1);
  const [visibleStats, setVisibleStats] = useState([false, false, false]);

  // Typing/fading effect - show stats one by one
  useEffect(() => {
    if (isVisible) {
      setVisibleStats([false, false, false]);
      setTimeout(() => setVisibleStats([true, false, false]), 100);
      setTimeout(() => setVisibleStats([true, true, false]), 900);
      setTimeout(() => setVisibleStats([true, true, true]), 1700);
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
        <div ref={sectionRef} data-aos="fade-up">
          <div className="text-center mb-16">
            <p
              ref={subtitleRef}
              className={`reveal-subtitle gpu-smooth text-xs font-semibold tracking-[0.4em] uppercase mb-4 ${subtitleVisible ? 'is-visible' : ''}`}
              style={{ color: '#800080', transitionDelay: '0.1s' }}
            >
              Our Story
            </p>
            <h2
              ref={headingRef}
              className={`reveal-heading gpu-smooth font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 ${headingVisible ? 'is-visible' : ''}`}
              style={{ transitionDelay: '0s' }}
            >
              Elite Fitness{' '}
              <span className="gold-text">Sanctuary Since 2025</span>
            </h2>
            <div 
              className={`reveal-text gpu-smooth gold-line w-24 mx-auto mb-8 ${headingVisible ? 'is-visible' : ''}`}
              style={{ transitionDelay: '0.2s' }}
            />
            <p 
              ref={textRef}
              className={`reveal-text gpu-smooth text-white/60 text-lg max-w-3xl mx-auto leading-relaxed ${textVisible ? 'is-visible' : ''}`}
              style={{ transitionDelay: '0.3s' }}
            >
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20" data-aos="fade-up" data-aos-delay="200">
          {/* Image with mask reveal */}
          <div
            ref={imageRef}
            className={`image-reveal-container gpu-smooth relative overflow-hidden ${imageVisible ? 'is-revealed' : ''}`}
            style={{ borderRadius: '4px' }}
          >
            <div className="image-reveal-mask" />
            <img
              src={femme4}
              alt="Our Women-Only Gym Facilities at Femme Flex Kadachanenthal Madurai"
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

          {/* Pillar cards with stagger */}
          <div ref={pillarsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar, index) => (
              <div
                key={pillar.title}
                className={`reveal-card gpu-smooth dark-card p-6 card-hover ${pillarsVisible ? 'is-visible' : ''}`}
                style={{ 
                  borderRadius: '4px',
                  transitionDelay: `${0.1 + index * 0.15}s`
                }}
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
          ref={quoteRef}
          data-aos="zoom-in"
          className={`reveal-section gpu-smooth relative overflow-hidden text-center py-12 px-6 ${quoteVisible ? 'is-visible' : ''}`}
          style={{
            background: 'linear-gradient(135deg, rgba(128,0,128,0.2) 0%, rgba(128,0,128,0.05) 100%)',
            border: '1px solid rgba(212,175,55,0.2)',
            borderRadius: '4px',
          }}
        >
          <div className="shimmer-bg absolute inset-0 pointer-events-none" />
          <p 
            className={`reveal-subtitle gpu-smooth text-xs font-semibold tracking-[0.4em] uppercase mb-4 ${quoteVisible ? 'is-visible' : ''}`}
            style={{ color: '#800080', transitionDelay: '0.2s' }}
          >
            The Flex Philosophy
          </p>
          <blockquote 
            className={`reveal-heading gpu-smooth font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white max-w-4xl mx-auto leading-relaxed ${quoteVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0.3s' }}
          >
            "Every woman deserves a space where she is{' '}
            <span className="gold-text">powerful</span>,{' '}
            <span style={{ color: '#800080' }}>supported</span>, and{' '}
            <span className="gold-text">unstoppable</span>."
          </blockquote>
          <p 
            className={`reveal-text gpu-smooth text-white/40 text-sm mt-6 tracking-wider ${quoteVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0.5s' }}
          >
            — The Femme Flex Founding Team
          </p>
        </div>

      </div>
    </section>
  );
}
