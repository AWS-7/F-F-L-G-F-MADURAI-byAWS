import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Target, Leaf, DollarSign, ChevronRight, ChevronLeft, Utensils, User } from 'lucide-react';

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

export default function DietPlanModal({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    weight: '',
    height: '',
    age: '',
    gender: '',
    goal: '',
    preference: '',
    allergies: '',
    budget: 'medium',
  });

  const totalSteps = 4;

  const updateField = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to results page with form data
      navigate('/diet-plan-result', { state: { formData } });
      onClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.weight && formData.height && formData.age && formData.gender;
      case 2:
        return formData.goal;
      case 3:
        return formData.preference;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={onClose}
      />

      {/* Modal */}
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        style={{
          background: 'linear-gradient(135deg, #1a0a1a 0%, #111 50%, #0d0d0d 100%)',
          borderRadius: '12px',
          border: '1px solid rgba(212,175,55,0.3)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h3 className="font-display text-xl font-bold text-white">
              Create Your Diet Plan
            </h3>
            <p className="text-white/50 text-sm">Step {currentStep} of {totalSteps}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded transition-colors"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2 p-6 pb-0">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className="h-1 flex-1 rounded"
              style={{
                background: i < currentStep ? '#D4AF37' : 'rgba(255,255,255,0.2)',
              }}
            />
          ))}
        </div>

        {/* Form Content */}
        <div className="p-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(212,175,55,0.1)' }}>
                  <User className="w-6 h-6" style={{ color: '#D4AF37' }} />
                </div>
                <h4 className="text-white font-semibold text-lg">Your Details</h4>
                <p className="text-white/50 text-sm">Help us understand your body composition</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/60 text-sm mb-2 block">Weight (kg)</label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => updateField('weight', e.target.value)}
                    placeholder="e.g., 70"
                    className="w-full p-3 bg-white/5 border border-white/10 rounded text-white placeholder-white/30 focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-white/60 text-sm mb-2 block">Height (cm)</label>
                  <input
                    type="number"
                    value={formData.height}
                    onChange={(e) => updateField('height', e.target.value)}
                    placeholder="e.g., 175"
                    className="w-full p-3 bg-white/5 border border-white/10 rounded text-white placeholder-white/30 focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/60 text-sm mb-2 block">Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => updateField('age', e.target.value)}
                    placeholder="e.g., 25"
                    className="w-full p-3 bg-white/5 border border-white/10 rounded text-white placeholder-white/30 focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-white/60 text-sm mb-2 block">Gender</label>
                  <div className="flex gap-2">
                    {['male', 'female'].map((gender) => (
                      <button
                        key={gender}
                        onClick={() => updateField('gender', gender)}
                        className={`flex-1 p-2 text-sm rounded border transition-all ${
                          formData.gender === gender
                            ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white'
                            : 'border-white/10 text-white/60 hover:border-white/30'
                        }`}
                      >
                        {gender === 'male' ? 'Male' : 'Female'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(128,0,128,0.1)' }}>
                  <Target className="w-6 h-6" style={{ color: '#800080' }} />
                </div>
                <h4 className="text-white font-semibold text-lg">Your Goal</h4>
                <p className="text-white/50 text-sm">What do you want to achieve?</p>
              </div>

              <div className="space-y-3">
                {[
                  { value: 'weight-loss', label: 'Weight Loss', desc: 'Lose fat while maintaining muscle' },
                  { value: 'muscle-gain', label: 'Muscle Gain', desc: 'Build strength and muscle mass' },
                ].map((goal) => (
                  <button
                    key={goal.value}
                    onClick={() => updateField('goal', goal.value)}
                    className={`w-full p-4 text-left rounded border transition-all ${
                      formData.goal === goal.value
                        ? 'border-[#800080] bg-[#800080]/10'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">{goal.label}</p>
                        <p className="text-white/50 text-sm">{goal.desc}</p>
                      </div>
                      {formData.goal === goal.value && (
                        <div className="w-3 h-3 rounded-full" style={{ background: '#800080' }} />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(212,175,37,0.1)' }}>
                  <Leaf className="w-6 h-6" style={{ color: '#D4AF37' }} />
                </div>
                <h4 className="text-white font-semibold text-lg">Dietary Preference</h4>
                <p className="text-white/50 text-sm">Choose your eating style</p>
              </div>

              <div className="space-y-3">
                {[
                  { value: 'veg', label: 'Vegetarian', desc: 'Plant-based + dairy' },
                  { value: 'non-veg', label: 'Non-Vegetarian', desc: 'Includes meat & fish' },
                  { value: 'vegan', label: 'Vegan', desc: '100% plant-based' },
                ].map((pref) => (
                  <button
                    key={pref.value}
                    onClick={() => updateField('preference', pref.value)}
                    className={`w-full p-4 text-left rounded border transition-all ${
                      formData.preference === pref.value
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">{pref.label}</p>
                        <p className="text-white/50 text-sm">{pref.desc}</p>
                      </div>
                      {formData.preference === pref.value && (
                        <div className="w-3 h-3 rounded-full" style={{ background: '#D4AF37' }} />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(128,0,128,0.1)' }}>
                  <DollarSign className="w-6 h-6" style={{ color: '#800080' }} />
                </div>
                <h4 className="text-white font-semibold text-lg">Final Details</h4>
                <p className="text-white/50 text-sm">Budget and restrictions</p>
              </div>

              <div>
                <label className="text-white/60 text-sm mb-3 block flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Budget Level
                </label>
                <div className="flex gap-2">
                  {['low', 'medium', 'high'].map((budget) => (
                    <button
                      key={budget}
                      onClick={() => updateField('budget', budget)}
                      className={`flex-1 p-3 text-sm rounded border transition-all capitalize ${
                        formData.budget === budget
                          ? 'border-[#800080] bg-[#800080]/10 text-white'
                          : 'border-white/10 text-white/60 hover:border-white/30'
                      }`}
                    >
                      {budget}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-white/60 text-sm mb-3 block flex items-center gap-2">
                  <Utensils className="w-4 h-4" />
                  Allergies / Restrictions (Optional)
                </label>
                <input
                  type="text"
                  value={formData.allergies}
                  onChange={(e) => updateField('allergies', e.target.value)}
                  placeholder="e.g., Nuts, Dairy, Gluten"
                  className="w-full p-3 bg-white/5 border border-white/10 rounded text-white placeholder-white/30 focus:border-[#800080] focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-white/10">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-4 py-2 text-sm text-white/60 hover:text-white transition-colors disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex items-center gap-2 px-6 py-3 text-sm font-bold tracking-wider uppercase rounded transition-all disabled:opacity-50"
            style={{
              background: canProceed() ? 'linear-gradient(135deg, #D4AF37, #F2D060)' : 'rgba(255,255,255,0.1)',
              color: canProceed() ? '#111' : 'rgba(255,255,255,0.4)',
            }}
          >
            {currentStep === totalSteps ? 'Generate Plan' : 'Next'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
