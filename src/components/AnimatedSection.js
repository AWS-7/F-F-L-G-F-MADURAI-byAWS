import { useSectionReveal } from '../hooks/useParallaxReveal.js';

export function AnimatedSection({ children, className = '', delay = 0 }) {
  const { ref, isVisible } = useSectionReveal();

  return (
    <div
      ref={ref}
      className={`reveal-section gpu-smooth ${className} ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

// Animated Heading with stagger
export function AnimatedHeading({ children, className = '', delay = 0, as: Component = 'h2' }) {
  const { ref, isVisible } = useSectionReveal(0.1);

  return (
    <Component
      ref={ref}
      className={`reveal-heading gpu-smooth ${className} ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </Component>
  );
}

// Animated Text/Paragraph
export function AnimatedText({ children, className = '', delay = 0 }) {
  const { ref, isVisible } = useSectionReveal(0.1);

  return (
    <div
      ref={ref}
      className={`reveal-text gpu-smooth ${className} ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

// Animated Subtitle
export function AnimatedSubtitle({ children, className = '', delay = 0 }) {
  const { ref, isVisible } = useSectionReveal(0.1);

  return (
    <p
      ref={ref}
      className={`reveal-subtitle gpu-smooth ${className} ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </p>
  );
}

// Animated Card
export function AnimatedCard({ children, className = '', delay = 0 }) {
  const { ref, isVisible } = useSectionReveal(0.15);

  return (
    <div
      ref={ref}
      className={`reveal-card gpu-smooth ${className} ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

// Animated Button
export function AnimatedButton({ children, className = '', delay = 0, onClick, type = 'button' }) {
  const { ref, isVisible } = useSectionReveal(0.1);

  return (
    <div ref={ref} className={`reveal-button gpu-smooth ${isVisible ? 'is-visible' : ''} inline-block`} style={{ transitionDelay: `${delay}s` }}>
      <button
        type={type}
        onClick={onClick}
        className={className}
      >
        {children}
      </button>
    </div>
  );
}

// Image with mask reveal effect
export function AnimatedImage({ src, alt, className = '', maskDirection = 'top' }) {
  const { ref, isVisible } = useSectionReveal(0.2);

  return (
    <div ref={ref} className={`image-reveal-container gpu-smooth ${isVisible ? 'is-revealed' : ''} ${className}`}>
      <div className={maskDirection === 'left' ? 'image-reveal-mask-left' : 'image-reveal-mask'} />
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
}
