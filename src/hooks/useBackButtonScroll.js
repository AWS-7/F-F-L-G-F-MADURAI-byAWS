import { useEffect, useRef } from 'react';

export function useBackButtonScroll() {
  const isAtTop = useRef(true);
  const hasPushedState = useRef(false);

  useEffect(() => {
    // Track scroll position
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const atTop = scrollY < 100; // Consider "at top" if within 100px

      // If scrolled down and haven't pushed state yet, add a fake history entry
      if (!atTop && !hasPushedState.current) {
        window.history.pushState({ scrollTop: true }, '', window.location.href);
        hasPushedState.current = true;
      }

      isAtTop.current = atTop;
    };

    // Handle back button press
    const handlePopState = (event) => {
      // Check if we have our custom state or if we're not at the top
      if (event.state?.scrollTop || !isAtTop.current) {
        // Prevent default back action
        event.preventDefault();

        // Smooth scroll to top
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });

        // Reset the flag after scrolling
        hasPushedState.current = false;

        // Push another state so back button works normally next time
        setTimeout(() => {
          if (window.scrollY < 100) {
            window.history.pushState({ atTop: true }, '', window.location.href);
          }
        }, 100);
      }
      // If at top and no custom state, let default behavior happen (exit site)
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('popstate', handlePopState);

    // Check initial scroll position
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
}
