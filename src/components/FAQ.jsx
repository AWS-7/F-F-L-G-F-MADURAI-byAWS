import { ChevronDown, HelpCircle } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useState } from 'react';

const faqs = [
  {
    question: 'What are your gym hours?',
    answer: 'We are open Monday to Saturday from 5:00 AM to 10:00 PM, and Sunday from 6:00 AM to 8:00 PM. Both branches follow the same schedule.',
  },
  {
    question: 'Do you offer trial sessions?',
    answer: 'Yes! We offer a complimentary 3-day trial pass so you can experience our facilities, classes, and community before committing. Book your trial through the contact form or visit us directly.',
  },
  {
    question: 'What should I bring for my first visit?',
    answer: 'Bring a water bottle, comfortable workout clothes, sports shoes, and a small towel. We provide locker facilities with keys. Don\'t forget your ID for registration!',
  },
  {
    question: 'Are your trainers certified?',
    answer: 'Absolutely. All our trainers hold nationally recognized certifications and specialize in women\'s fitness. Many have additional certifications in yoga, nutrition, and specialized training modalities.',
  },
  {
    question: 'Can I freeze my membership?',
    answer: 'Yes, you can freeze your membership for up to 1 month per year for medical reasons or travel. Just inform us 7 days in advance with valid documentation.',
  },
  {
    question: 'Do you provide diet consultations?',
    answer: 'Yes! Diet consultations are included with Half Yearly and Annual memberships. We also offer standalone nutrition coaching packages tailored to your fitness goals.',
  },
  {
    question: 'Is there parking available?',
    answer: 'Yes, both our Kadachanenthal and Othakkadai branches have dedicated parking spaces for members. Safety and convenience are our priorities.',
  },
  {
    question: 'What makes Femme Flex different from other gyms?',
    answer: 'We are Madurai\'s premier 100% women-only fitness sanctuary. Our unique combination of elite trainers, luxurious facilities, women-centric equipment, and a supportive sisterhood community sets us apart.',
  },
];

export default function FAQ() {
  const { ref, isVisible } = useIntersectionObserver(0.1);
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-24 md:py-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(128,0,128,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`text-center mb-16 section-fade ${isVisible ? 'visible' : ''}`}
          data-aos="fade-down"
        >
          <p
            className="text-xs font-semibold tracking-[0.4em] uppercase mb-4"
            style={{ color: '#800080' }}
          >
            Got Questions?
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Frequently{' '}
            <span className="gold-text">Asked</span>
          </h2>
          <div className="gold-line w-24 mx-auto mb-8" />
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Everything you need to know before starting your fitness journey with us. Can't find your answer? Contact us directly.
          </p>
        </div>

        <div className="space-y-4" data-aos="fade-up" data-aos-delay="200">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="dark-card overflow-hidden"
              style={{
                borderRadius: '4px',
                border: '1px solid rgba(212,175,55,0.1)',
              }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 text-left transition-all duration-300 hover:bg-white/5"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-8 h-8 flex items-center justify-center flex-shrink-0"
                    style={{
                      background: openIndex === index ? 'rgba(212,175,55,0.2)' : 'rgba(128,0,128,0.15)',
                      borderRadius: '50%',
                      border: `1px solid ${openIndex === index ? '#D4AF37' : 'rgba(128,0,128,0.4)'}`,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <HelpCircle
                      size={16}
                      style={{ color: openIndex === index ? '#D4AF37' : '#800080' }}
                    />
                  </div>
                  <span className="font-display text-base md:text-lg font-semibold text-white">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  size={20}
                  className="flex-shrink-0 ml-4 transition-transform duration-300"
                  style={{
                    color: '#D4AF37',
                    transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>
              <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{
                  maxHeight: openIndex === index ? '200px' : '0',
                  opacity: openIndex === index ? 1 : 0,
                }}
              >
                <div className="px-5 pb-5 pt-0">
                  <p className="text-white/60 text-sm md:text-base leading-relaxed pl-12">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
