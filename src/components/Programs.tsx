import { ArrowRight, Flame, Dumbbell, Wind, Leaf, X, Clock, Users, Target } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useSectionReveal } from '../hooks/useParallaxReveal';
import { useEffect, useRef, useState } from 'react';
import aerobicsImg from '../images/aerobics.jpg';
import hiitImg from '../images/scada.jpg';
import strengthImg from '../images/squat.jpg';
import yogaImg from '../images/yoga.jpg';

const programs = [
  {
    title: 'Aerobics',
    subtitle: 'High-Energy Cardio',
    description: 'Pump up your heart rate with our signature aerobics classes. Burn calories, boost endurance, and feel alive.',
    image: aerobicsImg,
    icon: Wind,
    tag: 'Cardio',
    color: '#D4AF37',
    details: {
      duration: '45-60 minutes',
      level: 'All Levels',
      calories: '400-600',
      schedule: 'Mon, Wed, Fri - 6:00 AM & 6:00 PM',
      benefits: ['Improved cardiovascular health', 'Increased stamina', 'Weight loss', 'Stress relief', 'Better coordination'],
      includes: ['Warm-up exercises', 'High-energy routines', 'Cool-down stretches', 'Music-driven sessions', 'Certified instructors'],
    },
  },
  {
    title: 'HIIT',
    subtitle: 'High Intensity Training',
    description: 'Push past your limits with explosive interval training. Maximize fat burn in minimal time.',
    image: hiitImg,
    icon: Flame,
    tag: 'Intensity',
    color: '#800080',
    details: {
      duration: '30-45 minutes',
      level: 'Intermediate to Advanced',
      calories: '500-800',
      schedule: 'Tue, Thu, Sat - 7:00 AM & 7:00 PM',
      benefits: ['Maximum fat burn', 'Afterburn effect (EPOC)', 'Improved metabolism', 'Time-efficient workouts', 'Increased endurance'],
      includes: ['Warm-up', 'High-intensity intervals', 'Active recovery periods', 'Strength circuits', 'Cool-down'],
    },
  },
  {
    title: 'Strength Training',
    subtitle: 'Build Your Power',
    description: 'Sculpt lean muscle and build functional strength with guided resistance programs tailored for women.',
    image: strengthImg,
    icon: Dumbbell,
    tag: 'Strength',
    color: '#D4AF37',
    details: {
      duration: '60 minutes',
      level: 'All Levels',
      calories: '300-500',
      schedule: 'Mon-Sat - 8:00 AM, 5:00 PM & 8:00 PM',
      benefits: ['Lean muscle building', 'Increased bone density', 'Better posture', 'Enhanced metabolism', 'Functional strength'],
      includes: ['Personalized workout plans', 'Free weights', 'Resistance machines', 'TRX training', 'Spotting assistance'],
    },
  },
  {
    title: 'Yoga',
    subtitle: 'Mind & Body Balance',
    description: 'Restore, breathe, and realign. Our yoga sessions blend flexibility, mindfulness, and inner strength.',
    image: yogaImg,
    icon: Leaf,
    tag: 'Wellness',
    color: '#800080',
    details: {
      duration: '60-75 minutes',
      level: 'All Levels',
      calories: '200-400',
      schedule: 'Daily - 6:00 AM, 10:00 AM & 7:00 PM',
      benefits: ['Improved flexibility', 'Stress reduction', 'Better sleep', 'Enhanced focus', 'Mind-body connection'],
      includes: ['Meditation', 'Breathing exercises', 'Asanas (poses)', 'Relaxation techniques', ' props (mats, blocks, straps)'],
    },
  },
];

export default function Programs() {
  const { ref: headerRef, isVisible: headerVisible } = useIntersectionObserver(0.1);
  const { ref: cardsRef, isVisible: cardsVisible } = useSectionReveal(0.1);
  const { ref: headingRef, isVisible: headingVisible } = useSectionReveal(0.1);
  const { ref: subtitleRef, isVisible: subtitleVisible } = useSectionReveal(0.1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<typeof programs[0] | null>(null);

  const openProgramModal = (program: typeof programs[0]) => {
    setSelectedProgram(program);
    document.body.style.overflow = 'hidden';
  };

  const closeProgramModal = () => {
    setSelectedProgram(null);
    document.body.style.overflow = '';
  };

  // Auto-scroll effect for mobile - improved to prevent shaking
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPos = 0;
    let lastScrollLeft = 0;
    let isManuallyScrolling = false;
    const scrollSpeed = 0.5; // Slower speed for smoother scroll
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

    // Detect manual scrolling
    const handleScroll = () => {
      if (Math.abs(scrollContainer.scrollLeft - lastScrollLeft) > 2) {
        isManuallyScrolling = true;
        scrollPos = scrollContainer.scrollLeft;
        // Resume auto-scroll after 2 seconds of no manual scroll
        setTimeout(() => {
          isManuallyScrolling = false;
        }, 2000);
      }
      lastScrollLeft = scrollContainer.scrollLeft;
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });

    const scroll = () => {
      if (!isPaused && !isManuallyScrolling && window.innerWidth < 1024) {
        scrollPos += scrollSpeed;
        if (scrollPos >= maxScroll) {
          scrollPos = 0;
        }
        scrollContainer.scrollLeft = scrollPos;
        lastScrollLeft = scrollPos;
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [isPaused]);

  return (
    <section id="programs" className="relative py-24 md:py-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 20% 80%, rgba(128,0,128,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-16" data-aos="fade-down">
          <p
            ref={subtitleRef}
            className={`reveal-subtitle gpu-smooth text-xs font-semibold tracking-[0.4em] uppercase mb-4 ${subtitleVisible ? 'is-visible' : ''}`}
            style={{ color: '#800080', transitionDelay: '0.1s' }}
          >
            The Sanctuary
          </p>
          <h2 
            ref={headingRef}
            className={`reveal-heading gpu-smooth font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 ${headingVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0s' }}
          >
            Elite Ladies Fitness{' '}
            <span className="gold-text">Programs Madurai</span>
          </h2>
          <div 
            className={`reveal-text gpu-smooth gold-line w-24 mx-auto mb-8 ${headingVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0.2s' }}
          />
          <p 
            className={`reveal-text gpu-smooth text-white/60 text-lg max-w-2xl mx-auto ${headerVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0.3s' }}
          >
            Four transformative disciplines. One sacred space. Every session designed to elevate your body, mind, and spirit.
          </p>
        </div>

        {/* Desktop Grid Layout */}
        <div ref={cardsRef} className="hidden lg:grid grid-cols-4 gap-5" data-aos="fade-up" data-aos-delay="200">
          {programs.map((program, index) => (
            <div
              key={program.title}
              className={`reveal-card gpu-smooth program-card dark-card cursor-pointer group ${cardsVisible ? 'is-visible' : ''}`}
              style={{
                borderRadius: '4px',
                transitionDelay: `${index * 0.15}s`,
              }}
            >
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: '16/9' }}
              >
                <img
                  src={program.image}
                  alt={`${program.title} Classes at Femme Flex - Best Women's Gym in Madurai`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="overlay absolute inset-0" />
                <div className="absolute top-3 left-3">
                  <span
                    className="text-xs font-semibold tracking-[0.2em] uppercase px-2 py-1"
                    style={{
                      background: 'rgba(17,17,17,0.7)',
                      border: `1px solid ${program.color}`,
                      color: program.color,
                      borderRadius: '2px',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    {program.tag}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3">
                  <program.icon size={20} style={{ color: program.color }} />
                </div>
              </div>

              <div className="p-5">
                <p
                  className="text-xs font-medium tracking-[0.2em] uppercase mb-1"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  {program.subtitle}
                </p>
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  {program.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  {program.description}
                </p>
                <button
                  onClick={() => openProgramModal(program)}
                  className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase transition-all duration-300 group-hover:gap-3"
                  style={{ color: program.color }}
                >
                  Learn More
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile/Tablet Horizontal Scroll */}
        <div className="lg:hidden relative">
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 px-8"
          style={{
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setTimeout(() => setIsPaused(false), 500)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setTimeout(() => setIsPaused(false), 3000)}
        >
          {programs.map((program) => (
            <div
              key={program.title}
              className="program-card dark-card cursor-pointer group flex-shrink-0"
              style={{
                borderRadius: '4px',
                width: '300px',
                scrollSnapAlign: 'start',
              }}
            >
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: '16/9' }}
              >
                <img
                  src={program.image}
                  alt={`${program.title} Classes at Femme Flex - Best Women's Gym in Madurai`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="overlay absolute inset-0" />
                <div className="absolute top-3 left-3">
                  <span
                    className="text-xs font-semibold tracking-[0.2em] uppercase px-2 py-1"
                    style={{
                      background: 'rgba(17,17,17,0.7)',
                      border: `1px solid ${program.color}`,
                      color: program.color,
                      borderRadius: '2px',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    {program.tag}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3">
                  <program.icon size={20} style={{ color: program.color }} />
                </div>
              </div>

              <div className="p-5">
                <p
                  className="text-xs font-medium tracking-[0.2em] uppercase mb-1"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  {program.subtitle}
                </p>
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  {program.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  {program.description}
                </p>
                <button
                  onClick={() => openProgramModal(program)}
                  className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase transition-all duration-300 group-hover:gap-3"
                  style={{ color: program.color }}
                >
                  Learn More
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center" data-aos="fade-up" data-aos-delay="400">
          {[
            { label: 'Zumba', desc: 'Dance fitness for every woman', available: true },
            { label: 'Personal Training', desc: 'One-on-one expert guidance', available: true },
            { label: 'Online Classes', desc: 'Train from anywhere, anytime', available: true },
          ].map((extra) => (
            <div
              key={extra.label}
              className="dark-card p-6 card-hover"
              style={{ borderRadius: '4px' }}
            >
              <div className="w-2 h-2 rounded-full mx-auto mb-3" style={{ background: '#800080' }} />
              <h4 className="font-display text-base font-bold text-white mb-2">{extra.label}</h4>
              <p className="text-white/40 text-xs">{extra.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Program Detail Modal */}
      {selectedProgram && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)' }}
          onClick={closeProgramModal}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            style={{
              background: 'linear-gradient(135deg, #1a0a1a 0%, #111 50%, #0d0d0d 100%)',
              border: '1px solid rgba(212,175,55,0.3)',
              borderRadius: '8px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeProgramModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                background: 'rgba(128,0,128,0.3)',
                border: '1px solid #D4AF37',
                borderRadius: '4px',
                color: 'white',
              }}
            >
              <X size={20} />
            </button>

            {/* Header Image */}
            <div className="relative h-48 md:h-64">
              <img
                src={selectedProgram.image}
                alt={`${selectedProgram.title} Training at Femme Flex Ladies Gym Kadachanenthal`}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(17,17,17,1) 0%, transparent 60%)',
                }}
              />
              <div className="absolute bottom-4 left-6">
                <span
                  className="text-xs font-semibold tracking-[0.2em] uppercase px-3 py-1"
                  style={{
                    background: selectedProgram.color,
                    color: '#111',
                    borderRadius: '2px',
                  }}
                >
                  {selectedProgram.tag}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              <h2
                className="font-display text-3xl md:text-4xl font-bold mb-2"
                style={{ color: selectedProgram.color }}
              >
                {selectedProgram.title}
              </h2>
              <p className="text-white/60 text-sm mb-6">{selectedProgram.subtitle}</p>
              <p className="text-white/80 text-base leading-relaxed mb-8">
                {selectedProgram.description}
              </p>

              {/* Quick Info */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div
                  className="p-4 text-center"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(212,175,55,0.1)',
                    borderRadius: '4px',
                  }}
                >
                  <Clock size={20} className="mx-auto mb-2" style={{ color: selectedProgram.color }} />
                  <p className="text-white/40 text-xs mb-1">Duration</p>
                  <p className="text-white font-semibold text-sm">{selectedProgram.details.duration}</p>
                </div>
                <div
                  className="p-4 text-center"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(212,175,55,0.1)',
                    borderRadius: '4px',
                  }}
                >
                  <Users size={20} className="mx-auto mb-2" style={{ color: selectedProgram.color }} />
                  <p className="text-white/40 text-xs mb-1">Level</p>
                  <p className="text-white font-semibold text-sm">{selectedProgram.details.level}</p>
                </div>
                <div
                  className="p-4 text-center"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(212,175,55,0.1)',
                    borderRadius: '4px',
                  }}
                >
                  <Target size={20} className="mx-auto mb-2" style={{ color: selectedProgram.color }} />
                  <p className="text-white/40 text-xs mb-1">Calories</p>
                  <p className="text-white font-semibold text-sm">{selectedProgram.details.calories}</p>
                </div>
              </div>

              {/* Schedule */}
              <div className="mb-6">
                <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40 mb-3">
                  Schedule
                </h3>
                <p className="text-white/80 text-sm">{selectedProgram.details.schedule}</p>
              </div>

              {/* Benefits */}
              <div className="mb-6">
                <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40 mb-3">
                  Benefits
                </h3>
                <ul className="space-y-2">
                  {selectedProgram.details.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-3 text-white/70 text-sm">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: selectedProgram.color }}
                      />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Includes */}
              <div className="mb-8">
                <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40 mb-3">
                  Includes
                </h3>
                <ul className="space-y-2">
                  {selectedProgram.details.includes.map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-white/70 text-sm">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: selectedProgram.color }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => {
                  closeProgramModal();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-4 text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37, #F2D060)',
                  color: '#111',
                  borderRadius: '4px',
                }}
              >
                Join This Program
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
