import { Droplets, Zap, Apple } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const menuItems = [
  {
    name: 'Natural Protein Shake',
    price: '₹100',
    description: 'Fresh whole-food ingredients blended for clean, natural protein. Zero artificial additives.',
    icon: Apple,
    color: '#D4AF37',
    badge: 'All Natural',
  },
  {
    name: 'Whey Shake',
    price: '₹150',
    description: 'Premium whey protein blend for rapid muscle recovery and optimal post-workout nutrition.',
    icon: Zap,
    color: '#800080',
    badge: 'Best Seller',
  },
  {
    name: 'Protein Bar',
    price: '₹120',
    description: 'High-protein, low-sugar energy bar. Perfect pre or post workout snack to fuel your goals.',
    icon: Droplets,
    color: '#D4AF37',
    badge: 'On The Go',
  },
];

export default function HealthBar() {
  const { ref, isVisible } = useIntersectionObserver(0.1);

  return (
    <section
      id="health-bar"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #111 0%, #0d0a0d 50%, #111 100%)',
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(128,0,128,0.08) 0%, transparent 70%)',
        }}
      />

      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)' }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`text-center mb-16 section-fade ${isVisible ? 'visible' : ''}`}
        >
          <p
            className="text-xs font-semibold tracking-[0.4em] uppercase mb-4"
            style={{ color: '#800080' }}
          >
            Fuel Your Body
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            The{' '}
            <span className="gold-text">Health Bar</span>
          </h2>
          <div className="gold-line w-24 mx-auto mb-8" />
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Premium nutrition crafted to complement your training. Clean ingredients, real results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className="relative dark-card card-hover p-8 text-center group"
              style={{ borderRadius: '4px' }}
            >
              <div className="shimmer-bg absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span
                  className="px-3 py-1 text-xs font-bold tracking-[0.2em] uppercase"
                  style={{
                    background: item.color === '#D4AF37'
                      ? 'linear-gradient(135deg, #D4AF37, #F2D060)'
                      : 'linear-gradient(135deg, #800080, #5a005a)',
                    color: item.color === '#D4AF37' ? '#111' : '#fff',
                    borderRadius: '2px',
                  }}
                >
                  {item.badge}
                </span>
              </div>

              <div
                className="w-16 h-16 flex items-center justify-center mx-auto mb-6"
                style={{
                  background: `rgba(${item.color === '#D4AF37' ? '212,175,55' : '128,0,128'},0.12)`,
                  border: `1px solid ${item.color}30`,
                  borderRadius: '50%',
                }}
              >
                <item.icon size={24} style={{ color: item.color }} />
              </div>

              <h3 className="font-display text-lg font-bold text-white mb-3">{item.name}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6">{item.description}</p>

              <div
                className="font-display text-4xl font-black"
                style={{ color: '#D4AF37' }}
              >
                {item.price}
              </div>
              <p className="text-white/30 text-xs mt-1 tracking-wider uppercase">Per Serving</p>
            </div>
          ))}
        </div>

        <div
          className="mt-12 p-6 text-center max-w-2xl mx-auto"
          style={{
            background: 'rgba(212,175,55,0.05)',
            border: '1px dashed rgba(212,175,55,0.2)',
            borderRadius: '4px',
          }}
        >
          <p className="text-white/50 text-sm">
            Available at both{' '}
            <span style={{ color: '#D4AF37' }}>Kadachanenthal</span>
            {' & '}
            <span style={{ color: '#D4AF37' }}>Othakkadai</span>
            {' branches during gym hours.'}
          </p>
        </div>
      </div>
    </section>
  );
}
