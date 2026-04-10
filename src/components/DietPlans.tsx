import { ArrowRight, Utensils, Scale, Flame, Heart, X, Clock, Users, Target } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useEffect, useRef, useState } from 'react';
import weightLossImg from '../images/weight Loss Plan.jpg';
import muscleGainImg from '../images/muscle Gain Plan.jpg';
import balancedImg from '../images/balanced Lifestyl.jpg';
import performanceImg from '../images/performance Fuel.jpg';

const dietPlans = [
  {
    title: 'Weight Loss Plan',
    subtitle: 'Shed Pounds Smartly',
    description: 'Calorie-controlled meals designed for sustainable fat loss while preserving muscle mass and energy levels.',
    image: weightLossImg,
    icon: Scale,
    tag: 'Fat Loss',
    color: '#D4AF37',
    calories: '1200-1500',
    details: {
      duration: '4-12 weeks',
      level: 'All Levels',
      meals: '3 main + 2 snacks',
      schedule: 'Daily meal plans with weekly rotation',
      benefits: ['Sustainable weight loss', 'Improved metabolism', 'Better energy levels', 'Reduced cravings', 'Portion control education'],
      includes: ['Personalized meal plans', 'Calorie tracking guide', 'Healthy recipes', 'Grocery shopping list', 'Weekly check-ins'],
    },
  },
  {
    title: 'Muscle Gain Plan',
    subtitle: 'Build Lean Muscle',
    description: 'High-protein nutrition plans optimized for muscle growth, recovery, and strength gains.',
    image: muscleGainImg,
    icon: Flame,
    tag: 'Muscle Building',
    color: '#800080',
    calories: '2500-3000',
    details: {
      duration: '8-16 weeks',
      level: 'Intermediate to Advanced',
      meals: '4-5 main + snacks',
      schedule: 'Pre/post workout nutrition included',
      benefits: ['Lean muscle growth', 'Faster recovery', 'Increased strength', 'Better protein synthesis', 'Enhanced performance'],
      includes: ['High-protein meal plans', 'Supplement guidance', 'Meal timing strategy', 'Macro tracking', 'Progress monitoring'],
    },
  },
  {
    title: 'Balanced Lifestyle',
    subtitle: 'Healthy Living',
    description: 'Well-rounded nutrition for overall wellness, maintaining weight while feeling your best every day.',
    image: balancedImg,
    icon: Heart,
    tag: 'Maintenance',
    color: '#D4AF37',
    calories: '1800-2200',
    details: {
      duration: 'Ongoing',
      level: 'All Levels',
      meals: '3 main + 2 snacks',
      schedule: 'Flexible daily plans',
      benefits: ['Sustained energy', 'Improved digestion', 'Better skin health', 'Mental clarity', 'Long-term wellness'],
      includes: ['Balanced meal plans', 'Nutritional education', 'Healthy swaps guide', 'Dining out tips', 'Lifestyle coaching'],
    },
  },
  {
    title: 'Performance Fuel',
    subtitle: 'Athlete Nutrition',
    description: 'Elite nutrition programming for maximum athletic performance and endurance training support.',
    image: performanceImg,
    icon: Utensils,
    tag: 'Athletic',
    color: '#800080',
    calories: '2200-2800',
    details: {
      duration: 'Customizable',
      level: 'All Levels',
      meals: '4-6 meals daily',
      schedule: 'Training day specific plans',
      benefits: ['Peak performance', 'Enhanced endurance', 'Quick recovery', 'Optimal hydration', 'Competition ready'],
      includes: ['Sport-specific plans', 'Hydration protocols', 'Race day nutrition', 'Recovery meals', 'Performance tracking'],
    },
  },
];

export default function DietPlans() {
  const { ref, isVisible } = useIntersectionObserver(0.1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<typeof dietPlans[0] | null>(null);

  const openPlanModal = (plan: typeof dietPlans[0]) => {
    setSelectedPlan(plan);
    document.body.style.overflow = 'hidden';
  };

  const closePlanModal = () => {
    setSelectedPlan(null);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPos = 0;
    const scrollSpeed = 0.5;
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

    const scroll = () => {
      if (!isPaused && window.innerWidth < 1024) {
        scrollPos += scrollSpeed;
        if (scrollPos >= maxScroll) {
          scrollPos = 0;
        }
        scrollContainer.scrollLeft = scrollPos;
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  return (
    <section id="diet-plans" className="relative py-24 md:py-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 80% 20%, rgba(212,175,55,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`text-center mb-16 section-fade ${isVisible ? 'visible' : ''}`}
        >
          <p
            className="text-xs font-semibold tracking-[0.4em] uppercase mb-4"
            style={{ color: '#D4AF37' }}
          >
            Nutrition Excellence
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Diet{' '}
            <span className="gold-text">Plans</span>
          </h2>
          <div className="gold-line w-24 mx-auto mb-8" />
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Fuel your fitness journey with personalized nutrition plans. Expert-designed meals that complement your workouts and accelerate results.
          </p>
        </div>

        {/* Desktop Grid Layout */}
        <div className="hidden lg:grid grid-cols-4 gap-5">
          {dietPlans.map((plan, index) => (
            <div
              key={plan.title}
              className="program-card dark-card cursor-pointer group"
              style={{
                borderRadius: '4px',
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: '16/9' }}
              >
                <img
                  src={plan.image}
                  alt={plan.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="overlay absolute inset-0" />
                <div className="absolute top-3 left-3">
                  <span
                    className="text-xs font-semibold tracking-[0.2em] uppercase px-2 py-1"
                    style={{
                      background: 'rgba(17,17,17,0.7)',
                      border: `1px solid ${plan.color}`,
                      color: plan.color,
                      borderRadius: '2px',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    {plan.tag}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3">
                  <plan.icon size={20} style={{ color: plan.color }} />
                </div>
                <div className="absolute top-3 right-3">
                  <span
                    className="text-xs font-semibold px-2 py-1"
                    style={{
                      background: 'rgba(17,17,17,0.8)',
                      color: 'white',
                      borderRadius: '2px',
                    }}
                  >
                    {plan.calories} cal
                  </span>
                </div>
              </div>

              <div className="p-5">
                <p
                  className="text-xs font-medium tracking-[0.2em] uppercase mb-1"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  {plan.subtitle}
                </p>
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  {plan.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  {plan.description}
                </p>
                <button
                  onClick={() => openPlanModal(plan)}
                  className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase transition-all duration-300 group-hover:gap-3"
                  style={{ color: plan.color }}
                >
                  View Plan
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
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setTimeout(() => setIsPaused(false), 1000)}
          >
            {dietPlans.map((plan) => (
              <div
                key={plan.title}
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
                    src={plan.image}
                    alt={plan.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="overlay absolute inset-0" />
                  <div className="absolute top-3 left-3">
                    <span
                      className="text-xs font-semibold tracking-[0.2em] uppercase px-2 py-1"
                      style={{
                        background: 'rgba(17,17,17,0.7)',
                        border: `1px solid ${plan.color}`,
                        color: plan.color,
                        borderRadius: '2px',
                        backdropFilter: 'blur(4px)',
                      }}
                    >
                      {plan.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <plan.icon size={20} style={{ color: plan.color }} />
                  </div>
                  <div className="absolute top-3 right-3">
                    <span
                      className="text-xs font-semibold px-2 py-1"
                      style={{
                        background: 'rgba(17,17,17,0.8)',
                        color: 'white',
                        borderRadius: '2px',
                      }}
                    >
                      {plan.calories} cal
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <p
                    className="text-xs font-medium tracking-[0.2em] uppercase mb-1"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                  >
                    {plan.subtitle}
                  </p>
                  <h3 className="font-display text-xl font-bold text-white mb-3">
                    {plan.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-4">
                    {plan.description}
                  </p>
                  <button
                    onClick={() => openPlanModal(plan)}
                    className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase transition-all duration-300 group-hover:gap-3"
                    style={{ color: plan.color }}
                  >
                    View Plan
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          {[
            { label: 'Custom Plans', desc: 'Tailored to your specific goals', available: true },
            { label: 'Nutrition Coaching', desc: 'Expert guidance and support', available: true },
            { label: 'Meal Prep Guides', desc: 'Save time with batch cooking', available: true },
          ].map((extra) => (
            <div
              key={extra.label}
              className="dark-card p-6 card-hover"
              style={{ borderRadius: '4px' }}
            >
              <div className="w-2 h-2 rounded-full mx-auto mb-3" style={{ background: '#D4AF37' }} />
              <h4 className="font-display text-base font-bold text-white mb-2">{extra.label}</h4>
              <p className="text-white/40 text-xs">{extra.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Plan Detail Modal */}
      {selectedPlan && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)' }}
          onClick={closePlanModal}
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
              onClick={closePlanModal}
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
                src={selectedPlan.image}
                alt={selectedPlan.title}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(17,17,17,1) 0%, transparent 60%)',
                }}
              />
              <div className="absolute bottom-4 left-6 flex gap-2">
                <span
                  className="text-xs font-semibold tracking-[0.2em] uppercase px-3 py-1"
                  style={{
                    background: selectedPlan.color,
                    color: '#111',
                    borderRadius: '2px',
                  }}
                >
                  {selectedPlan.tag}
                </span>
                <span
                  className="text-xs font-semibold px-3 py-1"
                  style={{
                    background: 'rgba(17,17,17,0.8)',
                    color: 'white',
                    borderRadius: '2px',
                  }}
                >
                  {selectedPlan.calories} cal/day
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              <h2
                className="font-display text-3xl md:text-4xl font-bold mb-2"
                style={{ color: selectedPlan.color }}
              >
                {selectedPlan.title}
              </h2>
              <p className="text-white/60 text-sm mb-6">{selectedPlan.subtitle}</p>
              <p className="text-white/80 text-base leading-relaxed mb-8">
                {selectedPlan.description}
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
                  <Clock size={20} className="mx-auto mb-2" style={{ color: selectedPlan.color }} />
                  <p className="text-white/40 text-xs mb-1">Duration</p>
                  <p className="text-white font-semibold text-sm">{selectedPlan.details.duration}</p>
                </div>
                <div
                  className="p-4 text-center"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(212,175,55,0.1)',
                    borderRadius: '4px',
                  }}
                >
                  <Users size={20} className="mx-auto mb-2" style={{ color: selectedPlan.color }} />
                  <p className="text-white/40 text-xs mb-1">Level</p>
                  <p className="text-white font-semibold text-sm">{selectedPlan.details.level}</p>
                </div>
                <div
                  className="p-4 text-center"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(212,175,55,0.1)',
                    borderRadius: '4px',
                  }}
                >
                  <Target size={20} className="mx-auto mb-2" style={{ color: selectedPlan.color }} />
                  <p className="text-white/40 text-xs mb-1">Meals</p>
                  <p className="text-white font-semibold text-sm">{selectedPlan.details.meals}</p>
                </div>
              </div>

              {/* Schedule */}
              <div className="mb-6">
                <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40 mb-3">
                  Schedule
                </h3>
                <p className="text-white/80 text-sm">{selectedPlan.details.schedule}</p>
              </div>

              {/* Benefits */}
              <div className="mb-6">
                <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40 mb-3">
                  Benefits
                </h3>
                <ul className="space-y-2">
                  {selectedPlan.details.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-3 text-white/70 text-sm">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: selectedPlan.color }}
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
                  {selectedPlan.details.includes.map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-white/70 text-sm">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: selectedPlan.color }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => {
                  closePlanModal();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-4 text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37, #F2D060)',
                  color: '#111',
                  borderRadius: '4px',
                }}
              >
                Get This Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
