import { useState } from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';
import DietPlanModal from './DietPlanModal.tsx';

export default function AIDietGenerator() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section id="ai-diet" className="relative py-20 md:py-28" style={{ background: '#111' }}>
      {/* Background Effects */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 30% 30%, rgba(128,0,128,0.08) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-down">
          <p
            className="text-xs font-semibold tracking-[0.4em] uppercase mb-4"
            style={{ color: '#D4AF37' }}
          >
            <Sparkles className="inline w-4 h-4 mr-2" />
            AI-Powered
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Smart{' '}
            <span className="gold-text">Diet Generator</span>
          </h2>
          <div className="gold-line w-24 mx-auto mb-8" />
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Get a personalized 7-day meal plan tailored to your fitness goals, dietary preferences, and lifestyle.
            Featuring authentic South Indian cuisine with healthy options.
          </p>
        </div>

        {/* CTA Button Only */}
        <div className="flex justify-center" data-aos="fade-up" data-aos-delay="200">
          <button
            onClick={() => setShowModal(true)}
            className="py-4 px-12 text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:scale-[1.02] flex items-center gap-3"
            style={{
              background: 'linear-gradient(135deg, #D4AF37, #F2D060)',
              color: '#111',
              borderRadius: '4px',
            }}
          >
            <Sparkles className="w-5 h-5" />
            Generate My Diet Plan
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-white/30 text-xs mt-6">
          This is a sample AI-generated plan. Consult our nutrition experts for personalized guidance.
        </p>
      </div>

      {/* Modal */}
      {showModal && <DietPlanModal onClose={() => setShowModal(false)} />}
    </section>
  );
}
