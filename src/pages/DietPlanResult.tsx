import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Download, RotateCcw, ChevronLeft, Sparkles, Utensils } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface DietPlan {
  day: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string;
  calories: number;
}

interface FormData {
  weight: string;
  height: string;
  age: string;
  gender: 'male' | 'female' | '';
  goal: 'weight-loss' | 'muscle-gain' | '';
  preference: 'veg' | 'non-veg' | 'vegan' | '';
  allergies: string;
  budget: 'low' | 'medium' | 'high';
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

export default function DietPlanResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const planRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [dietPlan, setDietPlan] = useState<DietPlan[]>([]);
  
  const formData = (location.state?.formData as FormData) || {
    goal: 'weight-loss',
    preference: 'veg',
    budget: 'medium',
    allergies: '',
  };

  useEffect(() => {
    // Simulate AI processing
    const timer = setTimeout(() => {
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
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [formData]);

  const handleDownloadPDF = async () => {
    if (!planRef.current) return;

    try {
      const canvas = await html2canvas(planRef.current, {
        backgroundColor: '#111',
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`diet-plan-${formData.goal}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handleBackToGenerator = () => {
    navigate('/#ai-diet');
    // Scroll to diet generator section after navigation
    setTimeout(() => {
      const element = document.getElementById('ai-diet');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#111' }}>
        <div className="text-center">
          {/* Animated Spinner */}
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full border-4 border-[#D4AF37]/20" />
            <div 
              className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#D4AF37] animate-spin"
              style={{ animationDuration: '1s' }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Utensils className="w-10 h-10 text-[#D4AF37] animate-pulse" />
            </div>
          </div>
          
          <h2 className="font-display text-2xl font-bold text-white mb-3">
            Creating Your Diet Plan
          </h2>
          <p className="text-white/50 max-w-md mx-auto">
            Our AI is analyzing your {formData.weight}kg body composition and {formData.preference} preferences to create the perfect meal plan...
          </p>
          
          {/* Loading Dots */}
          <div className="mt-8 flex justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8" style={{ background: '#111' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <button
            onClick={handleBackToGenerator}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Diet Generator
          </button>
          
          <div className="flex gap-3">
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #F2D060)',
                color: '#111',
              }}
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            <button
              onClick={handleBackToGenerator}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded border transition-all hover:scale-105"
              style={{
                borderColor: 'rgba(128,0,128,0.5)',
                color: '#800080',
              }}
            >
              <RotateCcw className="w-4 h-4" />
              New Plan
            </button>
          </div>
        </div>

        {/* Plan Summary */}
        <div 
          className="p-6 mb-8 rounded-lg"
          style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.1), rgba(128,0,128,0.1))',
            border: '1px solid rgba(212,175,55,0.3)',
          }}
        >
          <div className="flex flex-wrap items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(212,175,55,0.2)' }}>
              <Sparkles className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-white">
                Your 7-Day {formData.goal === 'weight-loss' ? 'Weight Loss' : 'Muscle Gain'} Plan
              </h1>
              <p className="text-white/60 text-sm capitalize">
                {formData.gender} • {formData.age} years • {formData.weight}kg • {formData.height}cm • {formData.preference} • {formData.budget} budget • ~{dietPlan[0]?.calories} cal/day
              </p>
              {formData.allergies && (
                <p className="text-[#D4AF37] text-xs mt-1">
                  Allergies excluded: {formData.allergies}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Diet Plan Content - PDF Capture Area */}
        <div ref={planRef} className="bg-[#111] p-8 rounded-lg">
          {/* PDF Header (visible only in PDF) */}
          <div className="text-center mb-8 pb-6 border-b border-white/10">
            <h2 className="font-display text-3xl font-bold text-white mb-2">
              <span className="text-[#D4AF37]">F-F-L-G-F</span> Diet Plan
            </h2>
            <p className="text-white/50 text-sm">
              {formData.goal === 'weight-loss' ? 'Weight Loss' : 'Muscle Gain'} • {formData.preference} • 7 Days
            </p>
          </div>

          {/* Daily Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {dietPlan.map((day) => (
              <div
                key={day.day}
                className="overflow-hidden rounded-lg"
                style={{
                  background: 'linear-gradient(135deg, #1a0a1a 0%, #111 100%)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
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

          {/* PDF Footer */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-white/30 text-xs">
              Generated by F-F-L-G-F Madurai AI Diet Generator • Consult a nutritionist for personalized advice
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-white/50 mb-4">
            Want personalized guidance from our nutrition experts?
          </p>
          <a
            href="/#contact"
            onClick={(e) => {
              e.preventDefault();
              navigate('/#contact');
              setTimeout(() => {
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="inline-flex items-center gap-2 px-8 py-3 text-sm font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #D4AF37, #F2D060)',
              color: '#111',
              borderRadius: '4px',
            }}
          >
            Book Nutrition Consultation
          </a>
        </div>
      </div>
    </div>
  );
}
