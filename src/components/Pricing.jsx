import { useState, useEffect, useRef } from 'react';
import { Check, Crown, Star, Leaf, Music2, Layers } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useSectionReveal } from '../hooks/useParallaxReveal';
import confetti from 'canvas-confetti';

const branches = {
  kadachanenthal: {
    plans: [
      {
        name: 'Monthly',
        price: '₹1,500',
        duration: '1 Month',
        perks: ['All equipment access', 'Group classes', '+₹300 Jersey (optional)', 'Locker access'],
      },
      {
        name: 'Quarterly',
        price: '₹4,000',
        duration: '3 Months',
        perks: ['All equipment access', 'Group classes', 'Priority booking', 'Locker access'],
      },
      {
        name: 'Half Yearly',
        price: '₹6,000',
        duration: '6 Months',
        perks: ['All equipment access', 'Group classes', 'Priority booking', 'Diet consultation'],
        highlight: true,
        tag: 'Best Value',
      },
      {
        name: 'Annual',
        price: '₹12,000',
        duration: '1 Year',
        perks: ['All equipment access', 'All group classes', 'Personal assessment', 'Diet consultation'],
        tag: 'Most Popular',
      },
      {
        name: 'Personal Training',
        price: '₹6,000',
        duration: 'Monthly',
        perks: ['1-on-1 sessions', 'Custom program', 'Progress tracking', 'Nutrition advice'],
      },
      {
        name: '90-Day Transformation',
        price: '₹8,000',
        duration: '3 Months',
        perks: ['Intensive program', 'Daily check-ins', 'Body composition tracking', 'Meal planning'],
        tag: 'Elite',
      },
    ],
    note: '+₹300 for optional branded jersey',
  },
  othakkadai: {
    plans: [
      {
        name: 'Monthly',
        price: '₹1,200',
        duration: '1 Month',
        perks: ['All equipment access', 'Group classes', 'Locker access', 'Towel service'],
      },
      {
        name: 'Quarterly',
        price: '₹3,000',
        duration: '3 Months',
        perks: ['All equipment access', 'Group classes', 'Priority booking', 'Locker access'],
      },
      {
        name: 'Half Yearly',
        price: '₹6,000',
        duration: '6 Months',
        perks: ['All equipment access', 'Group classes', 'Priority booking', 'Diet consultation'],
        highlight: true,
        tag: 'Best Value',
      },
      {
        name: 'Annual',
        price: '₹12,000',
        duration: '1 Year',
        perks: ['All equipment access', 'All group classes', 'Personal assessment', 'Diet consultation'],
        tag: 'Most Popular',
      },
      {
        name: 'Personal Training',
        price: '₹5,000',
        duration: 'Monthly',
        perks: ['1-on-1 sessions', 'Custom program', 'Progress tracking', 'Nutrition advice'],
      },
      {
        name: '3M Transformation',
        price: '₹6,000',
        duration: '3 Months',
        perks: ['Intensive program', 'Daily check-ins', 'Body composition tracking', 'Meal planning'],
        tag: 'Elite',
      },
    ],
  },
};

const specialties = [
  { name: 'Yoga', price: '₹3,000', duration: 'Monthly', Icon: Leaf, desc: 'Mind & body harmony' },
  { name: 'Zumba', price: '₹3,000', duration: 'Monthly', Icon: Music2, desc: 'Dance your way fit' },
  { name: 'Combo', price: '₹5,000', duration: 'Monthly', Icon: Layers, desc: 'Yoga + Zumba package' },
];

export default function Pricing() {
  const [branch, setBranch] = useState('kadachanenthal');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { ref: headerRef, isVisible: headerVisible } = useIntersectionObserver(0.05);
  const { ref: headingRef, isVisible: headingVisible } = useSectionReveal(0.1);
  const { ref: subtitleRef, isVisible: subtitleVisible } = useSectionReveal(0.1);
  const { ref: plansRef, isVisible: plansVisible } = useSectionReveal(0.1);
  const [confettiTriggered, setConfettiTriggered] = useState(false);
  
  const plansScrollRef = useRef(null);
  const addonsScrollRef = useRef(null);
  const [plansPaused, setPlansPaused] = useState(false);
  const [addonsPaused, setAddonsPaused] = useState(false);

  // Handle branch change with smooth transition
  const handleBranchChange = (newBranch) => {
    if (newBranch === branch) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setBranch(newBranch);
      setIsTransitioning(false);
    }, 200);
  };

  // Confetti effect - trigger once when section becomes visible
  useEffect(() => {
    if (headerVisible && !confettiTriggered) {
      setConfettiTriggered(true);
      
      // Play burst sound at 50% volume using Web Audio API
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        const audioContext = new AudioContextClass();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Create a "pop" sound
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.15);
      }
      
      // Trigger Gold and Purple confetti - optimized for performance
      const duration = 1500;
      const end = Date.now() + duration;

      const colors = ['#D4AF37', '#800080']; // Gold and Purple

      const frame = () => {
        // Reduce particle count for better performance
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 50,
          origin: { x: 0 },
          colors: colors,
          disableForReducedMotion: true,
          scalar: 0.8,
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 50,
          origin: { x: 1 },
          colors: colors,
          disableForReducedMotion: true,
          scalar: 0.8,
        });

        if (Date.now() < end) {
          // Throttle to 30fps instead of 60fps for better performance
          setTimeout(() => requestAnimationFrame(frame), 33);
        }
      };

      frame();
    }
  }, [headerVisible, confettiTriggered]);

  // Auto-scroll effect for plans on mobile - optimized performance
  useEffect(() => {
    const scrollContainer = plansScrollRef.current;
    if (!scrollContainer || window.innerWidth >= 1024) return;

    const cardWidth = 320;
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    
    // Use IntersectionObserver to only scroll when visible
    let intervalId = null;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !intervalId) {
            intervalId = setInterval(() => {
              if (!plansPaused) {
                const currentScroll = scrollContainer.scrollLeft;
                const nextScroll = currentScroll + cardWidth;
                if (nextScroll >= maxScroll) {
                  scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                  scrollContainer.scrollTo({ left: nextScroll, behavior: 'smooth' });
                }
              }
            }, 2000); // Increased to 2 seconds for better performance
          } else if (!entry.isIntersecting && intervalId) {
            clearInterval(intervalId);
            intervalId = null;
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(scrollContainer);

    return () => {
      if (intervalId) clearInterval(intervalId);
      observer.disconnect();
    };
  }, [plansPaused]);

  // Auto-scroll effect for add-ons on mobile - optimized performance
  useEffect(() => {
    const scrollContainer = addonsScrollRef.current;
    if (!scrollContainer || window.innerWidth >= 768) return;

    const cardWidth = 280;
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    
    let intervalId = null;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !intervalId) {
            intervalId = setInterval(() => {
              if (!addonsPaused) {
                const currentScroll = scrollContainer.scrollLeft;
                const nextScroll = currentScroll + cardWidth;
                if (nextScroll >= maxScroll) {
                  scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                  scrollContainer.scrollTo({ left: nextScroll, behavior: 'smooth' });
                }
              }
            }, 2000); // Increased to 2 seconds
          } else if (!entry.isIntersecting && intervalId) {
            clearInterval(intervalId);
            intervalId = null;
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(scrollContainer);

    return () => {
      if (intervalId) clearInterval(intervalId);
      observer.disconnect();
    };
  }, [addonsPaused]);

  const currentBranch = branches[branch];

  return (
    <section id="pricing" className="relative py-24 md:py-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(128,0,128,0.1) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-12" data-aos="fade-down">
          <p
            ref={subtitleRef}
            className={`reveal-subtitle gpu-smooth text-xs font-semibold tracking-[0.4em] uppercase mb-4 ${subtitleVisible ? 'is-visible' : ''}`}
            style={{ color: '#800080', transitionDelay: '0.1s' }}
          >
            Membership Plans
          </p>
          <h2
            ref={headingRef}
            className={`reveal-heading gpu-smooth font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 ${headingVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0s' }}
          >
            Choose Your{' '}
            <span className="gold-text">Membership Plans</span>
          </h2>
          <div
            className={`reveal-text gpu-smooth gold-line w-24 mx-auto mb-8 ${headingVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0.2s' }}
          />
          <p
            className={`reveal-text gpu-smooth text-white/60 text-lg max-w-2xl mx-auto mb-10 ${headerVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0.3s' }}
          >
            Affordable ladies gym membership at Kadachanenthal & Othakkadai. Premium facilities with no hidden fees.
          </p>

          <div
            className="inline-flex items-center p-1 mx-auto relative z-10"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(212,175,55,0.2)',
              borderRadius: '4px',
            }}
          >
            {['kadachanenthal', 'othakkadai'].map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => handleBranchChange(id)}
                className="px-5 sm:px-8 py-3 text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase cursor-pointer hover:opacity-90 transition-all duration-200"
                style={{
                  borderRadius: '2px',
                  background: branch === id
                    ? 'linear-gradient(135deg, #800080, #5a005a)'
                    : 'transparent',
                  color: branch === id ? '#fff' : 'rgba(255,255,255,0.5)',
                  border: branch === id ? '1px solid rgba(212,175,55,0.4)' : '1px solid transparent',
                  boxShadow: branch === id ? '0 4px 20px rgba(128,0,128,0.3)' : 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  zIndex: 20,
                }}
              >
                {id === 'kadachanenthal' ? 'Kadachanenthal' : 'Othakkadai'}
              </button>
            ))}
          </div>

          {currentBranch.note && (
            <p className="text-white/40 text-xs mt-4 tracking-wider">{currentBranch.note}</p>
          )}
        </div>

        {/* Desktop Plans Grid */}
        <div 
          ref={plansRef} 
          className={`hidden lg:grid grid-cols-3 gap-5 mb-16 transition-opacity duration-200 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {currentBranch.plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`reveal-card gpu-smooth relative dark-card card-hover p-6 flex flex-col ${plan.highlight ? 'pricing-card-active' : ''} ${plansVisible ? 'is-visible' : ''}`}
              style={{ 
                borderRadius: '4px',
                transitionDelay: `${index * 0.1}s`
              }}
            >
              {plan.tag && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span
                    className="px-4 py-1 text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-1"
                    style={{
                      background: plan.highlight
                        ? 'linear-gradient(135deg, #800080, #5a005a)'
                        : 'linear-gradient(135deg, #D4AF37, #F2D060)',
                      color: plan.highlight ? '#fff' : '#111',
                      borderRadius: '2px',
                    }}
                  >
                    {plan.tag === 'Elite' || plan.tag === 'Most Popular' ? (
                      <Crown size={10} />
                    ) : (
                      <Star size={10} />
                    )}
                    {plan.tag}
                  </span>
                </div>
              )}

              <div className="mb-5">
                <p className="text-white/40 text-xs tracking-[0.2em] uppercase mb-1">{plan.duration}</p>
                <h3 className="font-display text-lg font-bold text-white mb-3">{plan.name}</h3>
                <div
                  className="font-display text-4xl font-black"
                  style={{ color: '#D4AF37' }}
                >
                  {plan.price}
                </div>
              </div>

              <div className="gold-line mb-5" />

              <ul className="space-y-3 flex-1 mb-6">
                {plan.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-3 text-sm text-white/70">
                    <Check
                      size={14}
                      className="mt-0.5 flex-shrink-0"
                      style={{ color: '#D4AF37' }}
                    />
                    {perk}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full py-3 text-sm font-semibold tracking-[0.15em] uppercase transition-all duration-300 hover:scale-105"
                style={
                  plan.highlight
                    ? {
                        background: 'linear-gradient(135deg, #800080, #5a005a)',
                        color: '#fff',
                        border: '1px solid rgba(212,175,55,0.4)',
                        borderRadius: '2px',
                      }
                    : {
                        background: 'transparent',
                        color: '#D4AF37',
                        border: '1px solid rgba(212,175,55,0.4)',
                        borderRadius: '2px',
                      }
                }
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        {/* Mobile/Tablet Plans Horizontal Scroll */}
        <div
          ref={plansScrollRef}
          className={`lg:hidden flex gap-4 overflow-x-auto scrollbar-hide pb-4 px-4 transition-opacity duration-200 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
          style={{
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          onMouseEnter={() => setPlansPaused(true)}
          onMouseLeave={() => setPlansPaused(false)}
          onTouchStart={() => setPlansPaused(true)}
          onTouchEnd={() => setTimeout(() => setPlansPaused(false), 1000)}
        >
          {currentBranch.plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative dark-card card-hover p-6 flex flex-col flex-shrink-0 ${plan.highlight ? 'pricing-card-active' : ''}`}
              style={{ 
                borderRadius: '4px',
                width: '300px',
                scrollSnapAlign: 'start',
              }}
            >
              {plan.tag && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span
                    className="px-4 py-1 text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-1"
                    style={{
                      background: plan.highlight
                        ? 'linear-gradient(135deg, #800080, #5a005a)'
                        : 'linear-gradient(135deg, #D4AF37, #F2D060)',
                      color: plan.highlight ? '#fff' : '#111',
                      borderRadius: '2px',
                    }}
                  >
                    {plan.tag === 'Elite' || plan.tag === 'Most Popular' ? (
                      <Crown size={10} />
                    ) : (
                      <Star size={10} />
                    )}
                    {plan.tag}
                  </span>
                </div>
              )}

              <div className="mb-5">
                <p className="text-white/40 text-xs tracking-[0.2em] uppercase mb-1">{plan.duration}</p>
                <h3 className="font-display text-lg font-bold text-white mb-3">{plan.name}</h3>
                <div
                  className="font-display text-4xl font-black"
                  style={{ color: '#D4AF37' }}
                >
                  {plan.price}
                </div>
              </div>

              <div className="gold-line mb-5" />

              <ul className="space-y-3 flex-1 mb-6">
                {plan.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-3 text-sm text-white/70">
                    <Check
                      size={14}
                      className="mt-0.5 flex-shrink-0"
                      style={{ color: '#D4AF37' }}
                    />
                    {perk}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full py-3 text-sm font-semibold tracking-[0.15em] uppercase transition-all duration-300 hover:scale-105"
                style={
                  plan.highlight
                    ? {
                        background: 'linear-gradient(135deg, #800080, #5a005a)',
                        color: '#fff',
                        border: '1px solid rgba(212,175,55,0.4)',
                        borderRadius: '2px',
                      }
                    : {
                        background: 'transparent',
                        color: '#D4AF37',
                        border: '1px solid rgba(212,175,55,0.4)',
                        borderRadius: '2px',
                      }
                }
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        <div className="mb-6" data-aos="fade-up" data-aos-delay="400">
          <div className="text-center mb-8">
            <p
              className="text-xs font-semibold tracking-[0.4em] uppercase mb-3"
              style={{ color: '#800080' }}
            >
              Specialty Classes
            </p>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Premium <span className="gold-text">Add-Ons</span>
            </h3>
            <p className="text-white/40 text-sm mt-2 tracking-wider">Available at both branches & online</p>
          </div>

          {/* Desktop Add-ons Grid */}
          <div className="hidden sm:grid grid-cols-3 gap-5">
            {specialties.map((spec) => (
              <div
                key={spec.name}
                className="dark-card card-hover p-6 text-center"
                style={{ borderRadius: '4px' }}
              >
                <div className="flex justify-center mb-4">
                  <div
                    className="w-12 h-12 flex items-center justify-center"
                    style={{
                      background: 'rgba(212,175,55,0.1)',
                      border: '1px solid rgba(212,175,55,0.3)',
                      borderRadius: '50%',
                    }}
                  >
                    <spec.Icon size={20} style={{ color: '#D4AF37' }} />
                  </div>
                </div>
                <h4 className="font-display text-lg font-bold text-white mb-1">{spec.name}</h4>
                <p className="text-white/40 text-xs mb-4">{spec.desc}</p>
                <div className="font-display text-3xl font-black mb-1" style={{ color: '#D4AF37' }}>
                  {spec.price}
                </div>
                <p className="text-white/30 text-xs tracking-wider uppercase">{spec.duration}</p>
                <p
                  className="text-xs mt-3 tracking-wider"
                  style={{ color: '#800080' }}
                >
                  Online rate same as in-person
                </p>
              </div>
            ))}
          </div>

          {/* Mobile Add-ons Horizontal Scroll */}
          <div
            ref={addonsScrollRef}
            className="sm:hidden flex gap-5 overflow-x-auto scrollbar-hide pb-4"
            style={{
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            onMouseEnter={() => setAddonsPaused(true)}
            onMouseLeave={() => setAddonsPaused(false)}
            onTouchStart={() => setAddonsPaused(true)}
            onTouchEnd={() => setTimeout(() => setAddonsPaused(false), 1000)}
          >
            {specialties.map((spec) => (
              <div
                key={spec.name}
                className="dark-card card-hover p-6 text-center flex-shrink-0"
                style={{ 
                  borderRadius: '4px',
                  width: '280px',
                  scrollSnapAlign: 'start',
                }}
              >
                <div className="flex justify-center mb-4">
                  <div
                    className="w-12 h-12 flex items-center justify-center"
                    style={{
                      background: 'rgba(212,175,55,0.1)',
                      border: '1px solid rgba(212,175,55,0.3)',
                      borderRadius: '50%',
                    }}
                  >
                    <spec.Icon size={20} style={{ color: '#D4AF37' }} />
                  </div>
                </div>
                <h4 className="font-display text-lg font-bold text-white mb-1">{spec.name}</h4>
                <p className="text-white/40 text-xs mb-4">{spec.desc}</p>
                <div className="font-display text-3xl font-black mb-1" style={{ color: '#D4AF37' }}>
                  {spec.price}
                </div>
                <p className="text-white/30 text-xs tracking-wider uppercase">{spec.duration}</p>
                <p
                  className="text-xs mt-3 tracking-wider"
                  style={{ color: '#800080' }}
                >
                  Online rate same as in-person
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
