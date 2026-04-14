import { useEffect, useRef, useState, useCallback } from 'react';

// Hook for section reveal animation (slide up + fade)
export function useSectionReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el); // Once: true - animation plays only first time
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

// Hook for staggered text animation
export function useStaggeredReveal(baseDelay = 0.2) {
  const { ref, isVisible } = useSectionReveal();
  
  const getDelay = useCallback((index) => {
    return isVisible ? index * baseDelay : 0;
  }, [isVisible, baseDelay]);

  return { ref, isVisible, getDelay };
}

// Hook for image mask reveal
export function useImageReveal(threshold = 0.2) {
  const ref = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Intersection Observer for reveal
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);

    // Parallax scroll effect
    const handleScroll = () => {
      if (el) {
        const rect = el.getBoundingClientRect();
        const scrolled = window.scrollY;
        const elementTop = rect.top + scrolled;
        const relativeScroll = scrolled - elementTop + window.innerHeight;
        setScrollY(relativeScroll * 0.1); // 0.1x parallax speed
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return { ref, isRevealed, scrollY };
}

// Hook for parallax movement
export function useParallax(speed = 0.1) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrolled = window.scrollY;
        const elementTop = rect.top + scrolled;
        const relativeScroll = scrolled - elementTop + window.innerHeight;
        setOffset(relativeScroll * speed);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { ref, offset };
}
