import { useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Calculator, ArrowRight, Info, CheckCircle } from 'lucide-react';

export default function BMICalculator() {
  const { ref, isVisible } = useIntersectionObserver(0.1);
  const [clientName, setClientName] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState('');
  const [showResult, setShowResult] = useState(false);

  const calculateBMI = () => {
    const h = parseFloat(height) / 100; // convert cm to meters
    const w = parseFloat(weight);

    if (h > 0 && w > 0) {
      const bmiValue = w / (h * h);
      const roundedBMI = Math.round(bmiValue * 10) / 10;
      setBmi(roundedBMI);

      let cat = '';
      if (bmiValue < 18.5) cat = 'Underweight';
      else if (bmiValue < 25) cat = 'Normal Weight';
      else if (bmiValue < 30) cat = 'Overweight';
      else cat = 'Obese';

      setCategory(cat);
      setShowResult(true);
    }
  };

  const getCategoryColor = () => {
    if (!bmi) return '#D4AF37';
    if (bmi < 18.5) return '#FFD700'; // Yellow for underweight
    if (bmi < 25) return '#00C853'; // Green for normal
    if (bmi < 30) return '#FF9800'; // Orange for overweight
    return '#FF1744'; // Red for obese
  };

  const getCategoryBg = () => {
    if (!bmi) return 'rgba(212,175,55,0.1)';
    if (bmi < 18.5) return 'rgba(255,215,0,0.1)';
    if (bmi < 25) return 'rgba(0,200,83,0.1)';
    if (bmi < 30) return 'rgba(255,152,0,0.1)';
    return 'rgba(255,23,68,0.1)';
  };

  const resetCalculator = () => {
    setClientName('');
    setHeight('');
    setWeight('');
    setBmi(null);
    setCategory('');
    setShowResult(false);
  };

  return (
    <section id="bmi-calculator" className="relative py-24 md:py-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(128,0,128,0.08) 0%, transparent 60%)',
        }}
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
            Health Metrics
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            BMI{' '}
            <span className="gold-text">Calculator</span>
          </h2>
          <div className="gold-line w-24 mx-auto mb-8" />
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Calculate your Body Mass Index and discover your ideal fitness journey at Femme Flex.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div
            className="dark-card p-8 md:p-12"
            style={{
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #1a0a1a 0%, #111 50%, #0d0d0d 100%)',
              border: '1px solid rgba(212,175,55,0.2)',
            }}
          >
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {/* Input Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #800080, #6a006a)',
                      border: '1px solid #D4AF37',
                    }}
                  >
                    <Calculator size={24} style={{ color: '#D4AF37' }} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">Enter Details</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold tracking-wider uppercase text-white/40 mb-2">
                      Client Name *
                    </label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 text-white bg-white/5 border border-white/10 rounded focus:outline-none focus:border-[#D4AF37] transition-colors"
                      style={{ borderRadius: '4px' }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold tracking-wider uppercase text-white/40 mb-2">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="e.g., 165"
                      className="w-full px-4 py-3 text-white bg-white/5 border border-white/10 rounded focus:outline-none focus:border-[#D4AF37] transition-colors"
                      style={{ borderRadius: '4px' }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold tracking-wider uppercase text-white/40 mb-2">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="e.g., 60"
                      className="w-full px-4 py-3 text-white bg-white/5 border border-white/10 rounded focus:outline-none focus:border-[#D4AF37] transition-colors"
                      style={{ borderRadius: '4px' }}
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={calculateBMI}
                    disabled={!height || !weight}
                    className="flex-1 py-3 text-sm font-bold tracking-[0.15em] uppercase transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: 'linear-gradient(135deg, #D4AF37, #F2D060)',
                      color: '#111',
                      borderRadius: '4px',
                    }}
                  >
                    Calculate
                  </button>
                  <button
                    onClick={resetCalculator}
                    className="px-6 py-3 text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:scale-105 text-white/60"
                    style={{
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '4px',
                      background: 'rgba(255,255,255,0.05)',
                    }}
                  >
                    Reset
                  </button>
                </div>

              </div>

              {/* Result Section */}
              <div className="space-y-6">
                {showResult && bmi ? (
                  <div
                    className="h-full flex flex-col justify-center p-6 rounded"
                    style={{
                      background: getCategoryBg(),
                      border: `1px solid ${getCategoryColor()}`,
                      borderRadius: '4px',
                    }}
                  >
                    <div className="text-center mb-4">
                      <p className="text-white/40 text-xs tracking-wider uppercase mb-2">Your BMI</p>
                      <div
                        className="font-display text-5xl md:text-6xl font-bold"
                        style={{ color: getCategoryColor() }}
                      >
                        {bmi}
                      </div>
                    </div>

                    <div className="text-center mb-6">
                      <p className="text-white/40 text-xs tracking-wider uppercase mb-2">Category</p>
                      <div
                        className="text-xl font-bold tracking-wider"
                        style={{ color: getCategoryColor() }}
                      >
                        {category}
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-white/60">
                        <Info size={16} style={{ color: getCategoryColor() }} />
                        <span>Healthy BMI range: 18.5 - 24.9</span>
                      </div>
                    </div>

                    {bmi >= 18.5 && bmi < 25 ? (
                      <div className="mt-4 p-3 rounded text-center" style={{ background: 'rgba(0,200,83,0.15)' }}>
                        <div className="flex items-center justify-center gap-2 text-[#00C853]">
                          <CheckCircle size={16} />
                          <span className="text-sm font-semibold">Great! You're in a healthy range.</span>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-4">
                        <button
                          onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                          className="w-full py-3 text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                          style={{
                            background: 'linear-gradient(135deg, #800080, #6a006a)',
                            color: '#fff',
                            borderRadius: '4px',
                            border: '1px solid #D4AF37',
                          }}
                        >
                          Get Personalized Plan
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                      style={{
                        background: 'rgba(128,0,128,0.2)',
                        border: '2px solid rgba(212,175,55,0.3)',
                      }}
                    >
                      <Calculator size={36} style={{ color: '#D4AF37', opacity: 0.5 }} />
                    </div>
                    <p className="text-white/40 text-sm">
                      Enter your height and weight to calculate your BMI and get personalized fitness recommendations.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* BMI Scale Reference */}
            <div className="mt-8 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <p className="text-white/40 text-xs tracking-wider uppercase mb-4 text-center">BMI Categories Reference</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { range: '< 18.5', label: 'Underweight', color: '#FFD700' },
                  { range: '18.5 - 24.9', label: 'Normal', color: '#00C853' },
                  { range: '25 - 29.9', label: 'Overweight', color: '#FF9800' },
                  { range: '≥ 30', label: 'Obese', color: '#FF1744' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-3 text-center rounded"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: `1px solid ${item.color}30`,
                      borderRadius: '4px',
                    }}
                  >
                    <p className="text-xs font-bold" style={{ color: item.color }}>{item.range}</p>
                    <p className="text-white/60 text-xs mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
