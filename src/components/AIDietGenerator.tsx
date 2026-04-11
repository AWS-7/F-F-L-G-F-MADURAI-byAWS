import { useState } from 'react';
import { Sparkles, Utensils, Target, Leaf, DollarSign, ChevronRight, RotateCcw, Download } from 'lucide-react';

interface DietPlan {
  day: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string;
  calories: number;
}

interface MealCategory {
  breakfast: string[];
  lunch: string[];
  dinner: string[];
  snacks: string[];
}

interface MealDatabase {
  [goal: string]: {
    [preference: string]: MealCategory;
  };
}

const mealDatabase: MealDatabase = {
  'weight-loss': {
    veg: {
      breakfast: ['Oats porridge with almonds', 'Idli (2) with sambar', 'Poha with vegetables', 'Ragi dosa', 'Sprouts salad'],
      lunch: ['Brown rice + dal + subzi', 'Quinoa salad', 'Millets with rasam', 'Chapati + palak dal', 'Vegetable khichdi'],
      dinner: ['Grilled paneer salad', 'Soup + sautéed veggies', 'Moong dal chilla', 'Mixed veg stir fry', 'Tofu stir fry'],
      snacks: ['Green tea + almonds', 'Cucumber slices', 'Buttermilk', 'Coconut water', 'Roasted makhana'],
    },
    'non-veg': {
      breakfast: ['Egg whites (4) + toast', 'Omelette with veggies', 'Chicken soup', 'Boiled eggs (2)', 'Grilled fish (small)'],
      lunch: ['Grilled chicken + salad', 'Fish curry + rice (small)', 'Egg curry + chapati', 'Chicken breast + veggies', 'Tandoori chicken (2 pc)'],
      dinner: ['Grilled fish + soup', 'Chicken salad', 'Egg bhurji', 'Fish tikka', 'Chicken clear soup'],
      snacks: ['Boiled egg (1)', 'Grilled chicken strips', 'Buttermilk', 'Protein shake', 'Nuts (handful)'],
    },
    vegan: {
      breakfast: ['Overnight oats (almond milk)', 'Fruit smoothie bowl', 'Chia pudding', 'Tofu scramble', 'Quinoa porridge'],
      lunch: ['Buddha bowl with tahini', 'Lentil curry + brown rice', 'Tofu stir fry + millets', 'Chickpea salad', 'Veg curry + quinoa'],
      dinner: ['Zucchini noodles with pesto', 'Lentil soup', 'Grilled tempeh salad', 'Stuffed bell peppers', 'Cauliflower curry'],
      snacks: ['Hummus + veggies', 'Fruit salad', 'Roasted chickpeas', 'Nut butter + apple', 'Coconut yogurt'],
    },
  },
  'muscle-gain': {
    veg: {
      breakfast: ['Paneer paratha', 'Pesarattu with paneer', 'Oats smoothie with protein', 'Moong dal dosa', 'Greek yogurt bowl'],
      lunch: ['Rajma chawal', 'Chole + chapati (3)', 'Paneer tikka + rice', 'Dal makhani + naan', 'Mushroom curry + rice'],
      dinner: ['Grilled paneer + veggies', 'Tofu curry + roti (2)', 'Cheese omelette alternative', 'Lentil soup + bread', 'Stuffed paratha (paneer)'],
      snacks: ['Protein shake', 'Paneer cubes', 'Dry fruits mix', 'Lassi', 'Sprouts chaat'],
    },
    'non-veg': {
      breakfast: ['4 whole eggs + toast', 'Chicken sandwich', 'Protein pancakes', 'Egg bhurji + paratha', 'Grilled chicken breast'],
      lunch: ['Chicken biryani (small)', 'Fish fry + rice + dal', 'Mutton curry + chapati (3)', 'Chicken tikka + rice', 'Egg curry + rice'],
      dinner: ['Grilled salmon', 'Chicken breast salad', 'Fish curry + chapati (2)', 'Tandoori chicken (4 pc)', 'Egg fried rice (small)'],
      snacks: ['Protein shake', 'Boiled eggs (2)', 'Chicken strips', 'Cottage cheese', 'Nuts + whey'],
    },
    vegan: {
      breakfast: ['Protein smoothie (pea protein)', 'Tofu scramble wrap', 'Quinoa breakfast bowl', 'Hemp seed oatmeal', 'Chickpea flour pancakes'],
      lunch: ['Lentil dal + rice (large)', 'Tofu curry + quinoa', 'Bean burrito bowl', 'Tempeh stir fry + rice', 'Seitan curry + millets'],
      dinner: ['High-protein pasta', 'Lentil shepherd pie', 'Tofu tikka masala', 'Bean chili', 'Quinoa fried rice'],
      snacks: ['Vegan protein shake', 'Roasted soy nuts', 'Hummus + pita', 'Nut mix', 'Edamame beans'],
    },
  },
};

const budgetMultipliers: Record<string, number> = {
  'low': 0.8,
  'medium': 1,
  'high': 1.3,
};

const calorieTargets: Record<string, Record<string, number>> = {
  'weight-loss': {
    veg: 1400,
    'non-veg': 1500,
    vegan: 1400,
  },
  'muscle-gain': {
    veg: 2200,
    'non-veg': 2400,
    vegan: 2200,
  },
};

export default function AIDietGenerator() {
  const [step, setStep] = useState<'form' | 'generating' | 'result'>('form');
  const [formData, setFormData] = useState({
    goal: '',
    preference: '',
    allergies: '',
    budget: 'medium',
  });
  const [dietPlan, setDietPlan] = useState<DietPlan[]>([]);

  const generatePlan = () => {
    setStep('generating');

    // Simulate AI processing
    setTimeout(() => {
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      const goalKey = formData.goal as keyof MealDatabase;
      const prefKey = formData.preference as keyof MealDatabase[keyof MealDatabase];
      const meals = mealDatabase[goalKey][prefKey];
      const baseCalories = calorieTargets[formData.goal as keyof typeof calorieTargets][formData.preference as keyof typeof calorieTargets['weight-loss']];
      const budgetMultiplier = budgetMultipliers[formData.budget as keyof typeof budgetMultipliers];

      const plan: DietPlan[] = days.map((day, index) => ({
        day,
        breakfast: meals.breakfast[index % meals.breakfast.length],
        lunch: meals.lunch[index % meals.lunch.length],
        dinner: meals.dinner[index % meals.dinner.length],
        snacks: meals.snacks[index % meals.snacks.length],
        calories: Math.round(baseCalories * budgetMultiplier),
      }));

      setDietPlan(plan);
      setStep('result');
    }, 2500);
  };

  const resetForm = () => {
    setFormData({
      goal: '',
      preference: '',
      allergies: '',
      budget: 'medium',
    });
    setStep('form');
    setDietPlan([]);
  };

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
            Get a personalized 7-day meal plan tailored to your goals, preferences, and lifestyle. 
            Designed for South Indian cuisine.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          {step === 'form' && (
            <div
              className="dark-card p-8 md:p-12"
              style={{
                borderRadius: '8px',
                border: '1px solid rgba(212,175,55,0.2)',
                background: 'linear-gradient(135deg, #1a0a1a 0%, #111 50%, #0d0d0d 100%)',
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Goal Selection */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-white/60 mb-4">
                    <Target className="w-4 h-4" style={{ color: '#D4AF37' }} />
                    Your Goal
                  </label>
                  <div className="space-y-3">
                    {['weight-loss', 'muscle-gain'].map((goal) => (
                      <button
                        key={goal}
                        onClick={() => setFormData({ ...formData, goal })}
                        className={`w-full p-4 text-left transition-all duration-300 ${
                          formData.goal === goal
                            ? 'border-2'
                            : 'border border-white/10 hover:border-white/30'
                        }`}
                        style={{
                          borderRadius: '4px',
                          borderColor: formData.goal === goal ? '#D4AF37' : undefined,
                          background: formData.goal === goal ? 'rgba(212,175,55,0.1)' : 'rgba(255,255,255,0.03)',
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-white font-medium capitalize">
                            {goal === 'weight-loss' ? 'Weight Loss' : 'Muscle Gain'}
                          </span>
                          {formData.goal === goal && (
                            <div className="w-3 h-3 rounded-full" style={{ background: '#D4AF37' }} />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Food Preference */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-white/60 mb-4">
                    <Leaf className="w-4 h-4" style={{ color: '#800080' }} />
                    Food Preference
                  </label>
                  <div className="space-y-3">
                    {['veg', 'non-veg', 'vegan'].map((pref) => (
                      <button
                        key={pref}
                        onClick={() => setFormData({ ...formData, preference: pref })}
                        className={`w-full p-4 text-left transition-all duration-300 ${
                          formData.preference === pref
                            ? 'border-2'
                            : 'border border-white/10 hover:border-white/30'
                        }`}
                        style={{
                          borderRadius: '4px',
                          borderColor: formData.preference === pref ? '#800080' : undefined,
                          background: formData.preference === pref ? 'rgba(128,0,128,0.1)' : 'rgba(255,255,255,0.03)',
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-white font-medium capitalize">
                            {pref === 'non-veg' ? 'Non-Vegetarian' : pref}
                          </span>
                          {formData.preference === pref && (
                            <div className="w-3 h-3 rounded-full" style={{ background: '#800080' }} />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Allergies */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-white/60 mb-4">
                    <Utensils className="w-4 h-4" style={{ color: '#D4AF37' }} />
                    Allergies / Restrictions
                  </label>
                  <input
                    type="text"
                    value={formData.allergies}
                    onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                    placeholder="e.g., Nuts, Dairy, Gluten (optional)"
                    className="w-full p-4 bg-white/5 border border-white/10 rounded text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>

                {/* Budget */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-white/60 mb-4">
                    <DollarSign className="w-4 h-4" style={{ color: '#800080' }} />
                    Budget Level
                  </label>
                  <div className="flex gap-3">
                    {['low', 'medium', 'high'].map((budget) => (
                      <button
                        key={budget}
                        onClick={() => setFormData({ ...formData, budget })}
                        className={`flex-1 p-3 text-sm font-medium transition-all duration-300 capitalize ${
                          formData.budget === budget
                            ? 'border-2'
                            : 'border border-white/10 hover:border-white/30'
                        }`}
                        style={{
                          borderRadius: '4px',
                          borderColor: formData.budget === budget ? '#800080' : undefined,
                          background: formData.budget === budget ? 'rgba(128,0,128,0.1)' : 'rgba(255,255,255,0.03)',
                          color: formData.budget === budget ? 'white' : 'rgba(255,255,255,0.6)',
                        }}
                      >
                        {budget}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={generatePlan}
                disabled={!formData.goal || !formData.preference}
                className="w-full mt-10 py-4 text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
                style={{
                  background: !formData.goal || !formData.preference
                    ? 'rgba(255,255,255,0.1)'
                    : 'linear-gradient(135deg, #D4AF37, #F2D060)',
                  color: !formData.goal || !formData.preference ? 'rgba(255,255,255,0.4)' : '#111',
                  borderRadius: '4px',
                }}
              >
                <Sparkles className="w-5 h-5" />
                Generate My Diet Plan
              </button>

              {/* Disclaimer */}
              <p className="text-center text-white/30 text-xs mt-4">
                This is a sample AI-generated plan. Consult our nutrition experts for personalized guidance.
              </p>
            </div>
          )}

          {step === 'generating' && (
            <div
              className="dark-card p-16 text-center"
              style={{
                borderRadius: '8px',
                border: '1px solid rgba(212,175,55,0.2)',
              }}
            >
              <div className="relative w-24 h-24 mx-auto mb-8">
                <div
                  className="absolute inset-0 rounded-full animate-ping opacity-20"
                  style={{ background: '#D4AF37' }}
                />
                <div
                  className="relative w-24 h-24 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(128,0,128,0.2))',
                    border: '2px solid #D4AF37',
                  }}
                >
                  <Sparkles className="w-10 h-10 animate-pulse" style={{ color: '#D4AF37' }} />
                </div>
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-2">
                AI is Creating Your Plan
              </h3>
              <p className="text-white/50">
                Analyzing your preferences and generating optimal meal combinations...
              </p>
              <div className="mt-8 flex justify-center gap-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{
                      background: '#D4AF37',
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {step === 'result' && (
            <div data-aos="fade-up">
              {/* Plan Summary */}
              <div
                className="p-6 mb-8 flex flex-wrap items-center justify-between gap-4"
                style={{
                  background: 'linear-gradient(135deg, rgba(212,175,55,0.1), rgba(128,0,128,0.1))',
                  border: '1px solid rgba(212,175,55,0.3)',
                  borderRadius: '8px',
                }}
              >
                <div>
                  <h3 className="font-display text-xl font-bold text-white mb-1">
                    Your 7-Day {formData.goal === 'weight-loss' ? 'Weight Loss' : 'Muscle Gain'} Plan
                  </h3>
                  <p className="text-white/60 text-sm capitalize">
                    {formData.preference} • {formData.budget} budget • ~{dietPlan[0]?.calories} cal/day
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => window.print()}
                    className="p-3 transition-all duration-300 hover:scale-110"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(212,175,55,0.3)',
                      borderRadius: '4px',
                      color: '#D4AF37',
                    }}
                    title="Print Plan"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                  <button
                    onClick={resetForm}
                    className="p-3 transition-all duration-300 hover:scale-110"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(128,0,128,0.3)',
                      borderRadius: '4px',
                      color: '#800080',
                    }}
                    title="Generate New Plan"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Daily Plans */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {dietPlan.map((day, index) => (
                  <div
                    key={day.day}
                    className="dark-card overflow-hidden"
                    style={{
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      animationDelay: `${index * 0.1}s`,
                    }}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    {/* Day Header */}
                    <div
                      className="p-4"
                      style={{
                        background: 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(128,0,128,0.1))',
                        borderBottom: '1px solid rgba(212,175,55,0.2)',
                      }}
                    >
                      <h4 className="font-display text-lg font-bold text-white">{day.day}</h4>
                      <p className="text-xs text-[#D4AF37]">{day.calories} calories</p>
                    </div>

                    {/* Meals */}
                    <div className="p-4 space-y-3">
                      <div className="border-l-2 border-[#D4AF37] pl-3">
                        <p className="text-[10px] font-semibold tracking-wider uppercase text-white/40">Breakfast</p>
                        <p className="text-sm text-white/80 leading-snug">{day.breakfast}</p>
                      </div>
                      <div className="border-l-2 border-[#800080] pl-3">
                        <p className="text-[10px] font-semibold tracking-wider uppercase text-white/40">Lunch</p>
                        <p className="text-sm text-white/80 leading-snug">{day.lunch}</p>
                      </div>
                      <div className="border-l-2 border-[#D4AF37] pl-3">
                        <p className="text-[10px] font-semibold tracking-wider uppercase text-white/40">Dinner</p>
                        <p className="text-sm text-white/80 leading-snug">{day.dinner}</p>
                      </div>
                      <div className="border-l-2 border-white/20 pl-3">
                        <p className="text-[10px] font-semibold tracking-wider uppercase text-white/40">Snacks</p>
                        <p className="text-sm text-white/60 leading-snug">{day.snacks}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-12 text-center">
                <p className="text-white/50 mb-4">
                  Want personalized guidance from our nutrition experts?
                </p>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-8 py-3 text-sm font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37, #F2D060)',
                    color: '#111',
                    borderRadius: '4px',
                  }}
                >
                  Book Nutrition Consultation
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
