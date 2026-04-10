import { Shield, Heart, Star, Users } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import femme4 from '../images/femme4.webp';

const stats = [
  { value: 'Expert', label: 'Expert Trainers' },
  { value: 'Elite', label: 'Elite Branches' },
  { value: 'Many', label: 'Active Many Members' },
];

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

          <div className="grid grid-cols-3 gap-4 md:gap-8 mb-20 max-w-2xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.value} className="text-center">
                <div
                  className="font-display text-4xl sm:text-5xl md:text-6xl font-black mb-2"
                  style={{ color: '#D4AF37' }}
                >
                  {stat.value}
                </div>
                <div className="text-white/50 text-xs sm:text-sm tracking-wider uppercase">
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
      </div>
    </section>
  );
}
