import { ReactNode } from 'react';
import { useSectionReveal } from '../hooks/useParallaxReveal';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedSection({ children, className = '', delay = 0 }: AnimatedSectionProps) {
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
interface AnimatedHeadingProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function AnimatedHeading({ children, className = '', delay = 0, as: Component = 'h2' }: AnimatedHeadingProps) {
  const { ref, isVisible } = useSectionReveal(0.1);

  return (
    <Component
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={`reveal-heading gpu-smooth ${className} ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </Component>
  );
}

// Animated Text/Paragraph
interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedText({ children, className = '', delay = 0 }: AnimatedTextProps) {
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
interface AnimatedSubtitleProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedSubtitle({ children, className = '', delay = 0 }: AnimatedSubtitleProps) {
  const { ref, isVisible } = useSectionReveal(0.1);

  return (
    <p
      ref={ref as React.RefObject<HTMLParagraphElement>}
      className={`reveal-subtitle gpu-smooth ${className} ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </p>
  );
}

// Animated Card
interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedCard({ children, className = '', delay = 0 }: AnimatedCardProps) {
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
interface AnimatedButtonProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

export function AnimatedButton({ children, className = '', delay = 0, onClick, type = 'button' }: AnimatedButtonProps) {
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
interface AnimatedImageProps {
  src: string;
  alt: string;
  className?: string;
  maskDirection?: 'top' | 'left';
  parallaxSpeed?: number;
}

export function AnimatedImage({ src, alt, className = '', maskDirection = 'top' }: AnimatedImageProps) {
  const { ref, isVisible } = useSectionReveal(0.2);

  return (
    <div ref={ref} className={`image-reveal-container gpu-smooth ${isVisible ? 'is-revealed' : ''} ${className}`}>
      <div className={maskDirection === 'left' ? 'image-reveal-mask-left' : 'image-reveal-mask'} />
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
}
