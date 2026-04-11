import { useState } from 'react';
import { Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { createEnquiry } from '../services/api';

const plans = [
  { name: 'Monthly (Kadachanenthal)', price: '₹1,500', duration: '1 Month', location: 'Kadachanenthal' },
  { name: 'Quarterly (Kadachanenthal)', price: '₹4,000', duration: '3 Months', location: 'Kadachanenthal' },
  { name: 'Half Yearly (Kadachanenthal)', price: '₹6,000', duration: '6 Months', location: 'Kadachanenthal', popular: true },
  { name: 'Annual (Kadachanenthal)', price: '₹12,000', duration: '1 Year', location: 'Kadachanenthal' },
  { name: 'Personal Training (Kadachanenthal)', price: '₹6,000', duration: 'Monthly', location: 'Kadachanenthal' },
  { name: '90-Day Transformation (Kadachanenthal)', price: '₹8,000', duration: '3 Months', location: 'Kadachanenthal' },
  { name: 'Monthly (Othakkadai)', price: '₹1,200', duration: '1 Month', location: 'Othakkadai' },
  { name: 'Quarterly (Othakkadai)', price: '₹3,000', duration: '3 Months', location: 'Othakkadai' },
  { name: 'Half Yearly (Othakkadai)', price: '₹6,000', duration: '6 Months', location: 'Othakkadai', popular: true },
  { name: 'Annual (Othakkadai)', price: '₹12,000', duration: '1 Year', location: 'Othakkadai' },
  { name: 'Personal Training (Othakkadai)', price: '₹5,000', duration: 'Monthly', location: 'Othakkadai' },
  { name: '3M Transformation (Othakkadai)', price: '₹6,000', duration: '3 Months', location: 'Othakkadai' },
  { name: 'Yoga Classes', price: '₹2,500', duration: 'Monthly', location: 'Both' },
  { name: 'Zumba Classes', price: '₹3,000', duration: 'Monthly', location: 'Both' },
  { name: 'Combo (Yoga + Zumba)', price: '₹6,000', duration: 'Monthly', location: 'Both' },
];

const branches = [
  {
    name: 'Kadachanenthal Branch',
    address: 'Kadachanenthal, Madurai, Tamil Nadu',
    phone: '90808 82873',
    hours: 'Mon–Sat: 5:30 AM – 9:00 PM',
  },
  {
    name: 'Othakkadai Branch',
    address: 'Othakkadai, Madurai, Tamil Nadu',
    phone: '93442 49843',
    hours: 'Mon–Sat: 5:30 AM – 9:00 PM',
  },
];

export default function Contact() {
  const { ref, isVisible } = useIntersectionObserver(0.1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    plan: '',
    notes: '',
  });
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handlePlanChange = (planName: string) => {
    const plan = plans.find(p => p.name === planName) || null;
    setSelectedPlan(plan);
    setFormData({ ...formData, plan: planName });
  };

  const saveToDatabase = async () => {
    if (!formData.name || !formData.phone || !formData.plan) return;

    setIsSaving(true);
    setSaveStatus('idle');

    try {
      await createEnquiry({
        client_name: formData.name,
        phone: formData.phone,
        email: formData.email,
        selected_plan: formData.plan,
        plan_price: selectedPlan?.price,
        plan_duration: selectedPlan?.duration,
        plan_location: selectedPlan?.location,
        notes: formData.notes,
      });
      setSaveStatus('success');
    } catch (error) {
      // Silently fail - form still works via WhatsApp/SMS
      console.log('Database save failed (backend may be offline):', error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async (viaWhatsApp: boolean) => {
    // Save to database first
    await saveToDatabase();

    const message = `Hello Femme Flex!\n\nI'm interested in joining your gym.\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email || 'N/A'}\n*Selected Plan:* ${formData.plan || 'Not selected'}\n*Plan Rate:* ${selectedPlan?.price || 'N/A'}\n*Duration:* ${selectedPlan?.duration || 'N/A'}\n*Location:* ${selectedPlan?.location || 'N/A'}\n\n*Additional Notes:*\n${formData.notes || 'None'}\n\nPlease contact me for more details. Thank you!`;

    if (viaWhatsApp) {
      const encodedMsg = encodeURIComponent(message);
      window.open(`https://wa.me/919080882873?text=${encodedMsg}`, '_blank');
    } else {
      const encodedMsg = encodeURIComponent(message);
      window.open(`sms:9080882873?body=${encodedMsg}`, '_blank');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(212,175,55,0.2)',
    borderRadius: '4px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.3s ease',
  };

  const labelStyle = {
    display: 'block' as const,
    marginBottom: '8px',
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    color: '#D4AF37',
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
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
          data-aos="fade-down"
        >
          <p
            className="text-xs font-semibold tracking-[0.4em] uppercase mb-4"
            style={{ color: '#800080' }}
          >
            Get In Touch
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Join The{' '}
            <span className="gold-text">Femme Flex Sanctuary</span>
          </h2>
          <div className="gold-line w-24 mx-auto mb-8" />
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Ready to transform? Contact Femme Flex at Kadachanenthal, Madurai. Book your free trial today!
          </p>
        </div>

        {/* Contact Form */}
        <div id="enquiry-form" className="max-w-2xl mx-auto mb-16">
          <div
            className="dark-card p-8 md:p-10"
            style={{
              borderRadius: '4px',
              border: '1px solid rgba(212,175,55,0.2)',
            }}
          >
            <h3
              className="font-display text-xl font-bold text-white mb-6 text-center"
              style={{ color: '#D4AF37' }}
            >
              Enquiry Form
            </h3>

            <div className="space-y-5">
              {/* Name */}
              <div>
                <label style={labelStyle}>Your Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                  style={inputStyle}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#D4AF37';
                    e.currentTarget.style.background = 'rgba(212,175,55,0.05)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212,175,55,0.2)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  }}
                />
              </div>

              {/* Phone */}
              <div>
                <label style={labelStyle}>Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter your phone number"
                  style={inputStyle}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#D4AF37';
                    e.currentTarget.style.background = 'rgba(212,175,55,0.05)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212,175,55,0.2)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  }}
                />
              </div>

              {/* Email */}
              <div>
                <label style={labelStyle}>Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email (optional)"
                  style={inputStyle}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#D4AF37';
                    e.currentTarget.style.background = 'rgba(212,175,55,0.05)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212,175,55,0.2)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  }}
                />
              </div>

              {/* Plan Selection */}
              <div>
                <label style={labelStyle}>Select Plan *</label>
                <select
                  value={formData.plan}
                  onChange={(e) => handlePlanChange(e.target.value)}
                  style={{
                    ...inputStyle,
                    cursor: 'pointer',
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23D4AF37' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 16px center',
                    paddingRight: '40px',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#D4AF37';
                    e.currentTarget.style.background = 'rgba(212,175,55,0.05)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212,175,55,0.2)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  }}
                >
                  <option value="" style={{ background: '#111', color: '#fff' }}>-- Choose a Plan --</option>
                  <optgroup label="Kadachanenthal Plans" style={{ background: '#111' }}>
                    {plans.filter(p => p.location === 'Kadachanenthal').map(plan => (
                      <option key={plan.name} value={plan.name} style={{ background: '#111', color: '#fff' }}>
                        {plan.name.replace(' (Kadachanenthal)', '')} - {plan.price}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Othakkadai Plans" style={{ background: '#111' }}>
                    {plans.filter(p => p.location === 'Othakkadai').map(plan => (
                      <option key={plan.name} value={plan.name} style={{ background: '#111', color: '#fff' }}>
                        {plan.name.replace(' (Othakkadai)', '')} - {plan.price}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Specialty Classes" style={{ background: '#111' }}>
                    {plans.filter(p => p.location === 'Both').map(plan => (
                      <option key={plan.name} value={plan.name} style={{ background: '#111', color: '#fff' }}>
                        {plan.name} - {plan.price}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Auto-display Rate */}
              {selectedPlan && (
                <div
                  className="p-4"
                  style={{
                    background: 'rgba(212,175,55,0.1)',
                    border: '1px solid rgba(212,175,55,0.3)',
                    borderRadius: '4px',
                  }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white/60 text-xs uppercase tracking-wider">Selected Plan Rate</p>
                      <p className="text-white font-bold text-lg">{selectedPlan.price}</p>
                      <p className="text-white/50 text-xs">{selectedPlan.duration}</p>
                    </div>
                    <div
                      className="px-3 py-1 text-xs font-semibold uppercase"
                      style={{
                        background: 'linear-gradient(135deg, #800080, #5a005a)',
                        color: '#fff',
                        borderRadius: '2px',
                      }}
                    >
                      {selectedPlan.location}
                    </div>
                  </div>
                </div>
              )}

              {/* Notes */}
              <div>
                <label style={labelStyle}>Additional Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any specific requirements or questions..."
                  rows={3}
                  style={{
                    ...inputStyle,
                    resize: 'vertical',
                    minHeight: '80px',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#D4AF37';
                    e.currentTarget.style.background = 'rgba(212,175,55,0.05)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212,175,55,0.2)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  }}
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => handleSubmit(true)}
                  disabled={!formData.name || !formData.phone || !formData.plan}
                  className="flex-1 py-4 text-sm font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #25D366, #128C7E)',
                    color: '#fff',
                    borderRadius: '2px',
                    boxShadow: '0 8px 30px rgba(37,211,102,0.3)',
                    opacity: !formData.name || !formData.phone || !formData.plan ? 0.5 : 1,
                    cursor: !formData.name || !formData.phone || !formData.plan ? 'not-allowed' : 'pointer',
                  }}
                >
                  <MessageCircle size={18} />
                  Send via WhatsApp
                </button>
                <button
                  onClick={() => handleSubmit(false)}
                  disabled={!formData.name || !formData.phone || !formData.plan || isSaving}
                  className="flex-1 py-4 text-sm font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37, #F2D060)',
                    color: '#111',
                    borderRadius: '2px',
                    boxShadow: '0 8px 30px rgba(212,175,55,0.3)',
                    opacity: !formData.name || !formData.phone || !formData.plan || isSaving ? 0.5 : 1,
                    cursor: !formData.name || !formData.phone || !formData.plan || isSaving ? 'not-allowed' : 'pointer',
                  }}
                >
                  <Send size={18} />
                  {isSaving ? 'Saving...' : 'Send via SMS'}
                </button>
              </div>

              {/* Save Status */}
              {saveStatus === 'success' && (
                <div className="mt-4 p-3 rounded text-center" style={{ background: 'rgba(0,200,83,0.15)', border: '1px solid rgba(0,200,83,0.3)' }}>
                  <span style={{ color: '#00C853', fontSize: '14px' }}>✓ Enquiry saved to database</span>
                </div>
              )}
              {saveStatus === 'error' && (
                <div className="mt-4 p-3 rounded text-center" style={{ background: 'rgba(255,193,7,0.15)', border: '1px solid rgba(255,193,7,0.3)' }}>
                  <span style={{ color: '#FFC107', fontSize: '14px' }}>⚠ Will send via WhatsApp/SMS (database offline)</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Branch Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {branches.map((branch) => (
            <div
              key={branch.name}
              className="dark-card p-6 card-hover"
              style={{ borderRadius: '4px' }}
            >
              <h3
                className="font-display text-lg font-bold text-white mb-4"
                style={{ color: '#D4AF37' }}
              >
                {branch.name}
              </h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin size={16} style={{ color: '#800080', marginTop: '2px' }} />
                  <p className="text-white/60 text-sm">{branch.address}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} style={{ color: '#800080' }} />
                  <a
                    href={`tel:${branch.phone.replace(/\s/g, '')}`}
                    className="text-white/80 text-sm hover:text-white transition-colors"
                    style={{ color: '#D4AF37' }}
                  >
                    {branch.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={16} style={{ color: '#800080' }} />
                  <p className="text-white/60 text-sm">{branch.hours}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
