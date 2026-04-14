import { Star, Quote } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const reviews = [
  {
    name: 'Priya S.',
    rating: 5,
    text: 'Femme Flex completely transformed my approach to fitness. The trainers are incredible and the all-women environment makes me feel so comfortable.',
    branch: 'Kadachanenthal',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1',
  },
  {
    name: 'Anitha R.',
    rating: 5,
    text: 'I have tried many gyms but nothing compares to Femme Flex. The HIIT classes are challenging and the instructors push you to be your best self.',
    branch: 'Othakkadai',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1',
  },
  {
    name: 'Kavitha M.',
    rating: 5,
    text: 'The yoga sessions here are pure magic. The space feels sacred and the teacher is phenomenal. Best decision I made for my health.',
    branch: 'Kadachanenthal',
    avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1',
  },
  {
    name: 'Deepa V.',
    rating: 5,
    text: 'Lost 8 kgs in 3 months with the 90-Day Transformation program. The coaches are motivating and the nutrition guidance was spot on!',
    branch: 'Othakkadai',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1',
  },
  {
    name: 'Lakshmi T.',
    rating: 5,
    text: 'The Zumba classes are SO fun! I dance my way to fitness every single session. The energy in this gym is unmatched. Love every minute.',
    branch: 'Kadachanenthal',
    avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1',
  },
  {
    name: 'Saranya K.',
    rating: 5,
    text: 'Strength training program here is elite. In just two months my confidence skyrocketed. This place really does redefine women\'s fitness!',
    branch: 'Othakkadai',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1',
  },
  {
    name: 'Meena A.',
    rating: 5,
    text: 'The health bar protein shakes are absolutely delicious! After my workouts I look forward to my natural protein shake. Pure fuel, pure flavor.',
    branch: 'Kadachanenthal',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1',
  },
  {
    name: 'Vijaya N.',
    rating: 5,
    text: 'From beginner to advanced — this gym has grown with me. The team genuinely cares about every member\'s progress. It is a true sanctuary.',
    branch: 'Othakkadai',
    avatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1',
  },
];

function ReviewCard({ review }) {
  return (
    <div
      className="flex-shrink-0 w-72 sm:w-80 dark-card p-6 mx-3"
      style={{ borderRadius: '4px' }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-8 h-8 flex items-center justify-center"
          style={{
            background: 'rgba(212,175,55,0.1)',
            borderRadius: '50%',
          }}
        >
          <Quote size={14} style={{ color: '#D4AF37' }} />
        </div>
        <span
          className="text-xs font-medium tracking-wider px-2 py-1"
          style={{
            background: 'rgba(128,0,128,0.15)',
            color: '#800080',
            borderRadius: '2px',
            border: '1px solid rgba(128,0,128,0.3)',
          }}
        >
          {review.branch}
        </span>
      </div>

      <div className="flex gap-1 mb-4">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} size={12} fill="#D4AF37" style={{ color: '#D4AF37' }} />
        ))}
      </div>

      <p className="text-white/70 text-sm leading-relaxed mb-5 line-clamp-4">
        "{review.text}"
      </p>

      <div className="flex items-center gap-3">
        <img
          src={review.avatar}
          alt={review.name}
          className="w-10 h-10 rounded-full object-cover"
          style={{ border: '1px solid rgba(212,175,55,0.3)' }}
          loading="lazy"
        />
        <div>
          <p className="text-white text-sm font-semibold">{review.name}</p>
          <p className="text-white/30 text-xs">Verified Member</p>
        </div>
      </div>
    </div>
  );
}

export default function Reviews() {
  const { ref, isVisible } = useIntersectionObserver(0.1);
  const doubled = [...reviews, ...reviews];

  return (
    <section id="reviews" className="relative py-24 md:py-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(128,0,128,0.07) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div
          ref={ref}
          className={`text-center mb-16 section-fade ${isVisible ? 'visible' : ''}`}
          data-aos="fade-down"
        >
          <p
            className="text-xs font-semibold tracking-[0.4em] uppercase mb-4"
            style={{ color: '#800080' }}
          >
            What Our Members Say
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Real{' '}
            <span className="gold-text">Stories & Results</span>
          </h2>
          <div className="gold-line w-24 mx-auto mb-6" />
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            See why we're the best ladies gym in Madurai. Real transformations from our members at Kadachanenthal.
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #111, transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #111, transparent)' }}
        />

        <div className="review-track py-4">
          {doubled.map((review, i) => (
            <ReviewCard key={`${review.name}-${i}`} review={review} />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12" data-aos="fade-up" data-aos-delay="300">
        <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto text-center">
          {[
            { value: '4.9', label: 'Average Rating' },
            { value: '100+', label: 'Happy Members' },
            { value: '98%', label: 'Would Recommend' },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                className="font-display text-3xl sm:text-4xl font-black"
                style={{ color: '#D4AF37' }}
              >
                {stat.value}
              </div>
              <div className="text-white/40 text-xs mt-1 tracking-wider uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
