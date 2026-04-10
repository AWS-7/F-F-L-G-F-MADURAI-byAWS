import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// Import local images
import femme2 from '../images/femme2.webp';
import madurai1 from '../images/madurai1.jpeg';
import madurai2 from '../images/madurai2.jpeg';
import madurai3 from '../images/madurai3.jpeg';
import madurai4 from '../images/madurai4.webp';
import madurai5 from '../images/madurai5.jpeg';
import madurai6 from '../images/madurai6.jpeg';

// Videos in public folder - use relative URLs for GitHub Pages
const videos = [
  { src: 'images/femme_v_2.mp4', label: 'Workout Session 1' },
  { src: 'images/femme_v5.mp4', label: 'Training Highlights' },
  { src: 'images/femme880.mp4', label: 'Fitness Journey' },
  { src: 'images/feeme8880.mp4', label: 'Gym Atmosphere' },
];

const galleryItems = [
  {
    src: femme2,
    alt: 'Femme Flex Training Area',
    label: 'Training Zone',
  },
  {
    src: madurai1,
    alt: 'Madurai Gym Equipment',
    label: 'Equipment Area',
  },
  {
    src: madurai2,
    alt: 'Madurai Workout Space',
    label: 'Workout Space',
  },
  {
    src: madurai3,
    alt: 'Madurai Fitness Center',
    label: 'Fitness Center',
  },
  {
    src: madurai4,
    alt: 'Madurai Gym Interior',
    label: 'Gym Interior',
  },
  {
    src: madurai5,
    alt: 'Madurai Exercise Area',
    label: 'Exercise Area',
  },
  {
    src: madurai6,
    alt: 'Madurai Strength Zone',
    label: 'Strength Zone',
  },
];

function GalleryCard({ src, alt, label, onClick, isMobile = false }: { src: string; alt: string; label: string; onClick?: () => void; isMobile?: boolean }) {
  const [imgError, setImgError] = useState(false);

  const fallbackSrc = 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&dpr=1';

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden group cursor-pointer ${isMobile ? 'flex-shrink-0' : ''}`}
      style={isMobile
        ? { borderRadius: '8px', height: '240px', width: '320px' }
        : { borderRadius: '8px', height: '260px', width: '100%' }
      }
    >
      <img
        src={imgError ? fallbackSrc : src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
        onError={() => setImgError(true)}
        style={{ objectPosition: 'center' }}
      />
      <div
        className="absolute inset-0 transition-all duration-300"
        style={{
          background: 'linear-gradient(to top, rgba(17,17,17,0.9) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center"
        style={{ background: 'rgba(128,0,128,0.5)' }}
      >
        <span
          className="px-4 py-2 text-sm font-semibold tracking-[0.2em] uppercase"
          style={{
            background: '#D4AF37',
            color: '#111',
            borderRadius: '4px',
          }}
        >
          View
        </span>
      </div>
      <div className="absolute bottom-4 left-4 right-4">
        <p className="text-white font-semibold text-sm tracking-wider">{label}</p>
      </div>
    </div>
  );
}

// Video Card Component - Optimized for performance
function VideoCard({ videoSrc, label, isMobile = false, onClick }: { videoSrc: string; label: string; isMobile?: boolean; onClick?: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const card = cardRef.current;
    if (!video || !card) return;

    // Use IntersectionObserver to only play when visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(card);

    const handleTimeUpdate = () => {
      if (video.currentTime >= 30) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className={`relative overflow-hidden group cursor-pointer ${isMobile ? 'flex-shrink-0' : ''}`}
      style={isMobile
        ? { borderRadius: '12px', height: '200px', width: '360px' }
        : { borderRadius: '12px', height: '220px', width: '100%' }
      }
    >
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
        style={{ background: '#111' }}
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center"
        style={{ background: 'rgba(128,0,128,0.6)' }}
      >
        <span
          className="px-4 py-2 text-sm font-semibold tracking-[0.2em] uppercase"
          style={{
            background: '#D4AF37',
            color: '#111',
            borderRadius: '4px',
          }}
        >
          Watch
        </span>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 p-3"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
        }}
      >
        <p className="text-white font-semibold text-sm tracking-wider">{label}</p>
      </div>
    </div>
  );
}

export default function Gallery() {
  const { ref, isVisible } = useIntersectionObserver(0.1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll effect for mobile - optimized performance
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || window.innerWidth >= 768) return;

    const cardWidth = 316;
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    
    let intervalId: ReturnType<typeof setInterval> | null = null;
    
    // Only auto-scroll when gallery is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !intervalId) {
            intervalId = setInterval(() => {
              if (!isPaused) {
                const currentScroll = scrollContainer.scrollLeft;
                const nextScroll = currentScroll + cardWidth;
                if (nextScroll >= maxScroll - 10) {
                  scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                  scrollContainer.scrollTo({ left: nextScroll, behavior: 'smooth' });
                }
              }
            }, 2000);
          } else if (!entry.isIntersecting && intervalId) {
            clearInterval(intervalId);
            intervalId = null;
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(scrollContainer);

    return () => {
      if (intervalId) clearInterval(intervalId);
      observer.disconnect();
    };
  }, [isPaused]);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  return (
    <section id="gallery" className="relative py-24 md:py-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 90% 50%, rgba(212,175,55,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`text-center mb-16 section-fade ${isVisible ? 'visible' : ''}`}
        >
          <p
            className="text-xs font-semibold tracking-[0.4em] uppercase mb-4"
            style={{ color: '#800080' }}
          >
            Inside The Sanctuary
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Our{' '}
            <span className="gold-text">Spaces</span>
          </h2>
          <div className="gold-line w-24 mx-auto mb-8" />
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            World-class facilities designed to inspire and elevate your every workout.
          </p>
        </div>

        {/* Desktop Grid Layout - Equal 3 columns */}
        <div className="hidden md:grid grid-cols-3 gap-4">
          {galleryItems.map((item, index) => (
            <GalleryCard
              key={index}
              src={item.src}
              alt={item.alt}
              label={item.label}
              onClick={() => openLightbox(index)}
            />
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div
          ref={scrollRef}
          className="md:hidden flex gap-4 overflow-x-auto scrollbar-hide pb-4"
          style={{
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setTimeout(() => setIsPaused(false), 1000)}
        >
          {galleryItems.map((item, index) => (
            <div
              key={index}
              style={{ scrollSnapAlign: 'start' }}
              onClick={() => openLightbox(index)}
            >
              <GalleryCard
                src={item.src}
                alt={item.alt}
                label={item.label}
                isMobile={true}
              />
            </div>
          ))}
        </div>

        <div
          className="mt-12 p-8 text-center"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(212,175,55,0.1)',
            borderRadius: '4px',
          }}
        >
          <p className="text-white/40 text-sm tracking-wider uppercase">
            Two Premium Locations &bull; Kadachanenthal &bull; Ottakadai &bull; Madurai
          </p>
        </div>

        {/* Videos Section */}
        <VideoSection />
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(10px)' }}
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 p-2 text-white hover:text-[#D4AF37] transition-colors"
          >
            <X size={32} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white hover:text-[#D4AF37] transition-colors"
          >
            <ChevronLeft size={48} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white hover:text-[#D4AF37] transition-colors"
          >
            <ChevronRight size={48} />
          </button>

          <div
            className="max-w-5xl max-h-[80vh] px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryItems[currentIndex].src}
              alt={galleryItems[currentIndex].alt}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
            />
            <p className="text-white text-center mt-4 text-lg font-semibold tracking-wider">
              {galleryItems[currentIndex].label}
            </p>
            <p className="text-[#D4AF37] text-center mt-2 text-sm">
              {currentIndex + 1} / {galleryItems.length}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

// Video Section Component
function VideoSection() {
  const videoScrollRef = useRef<HTMLDivElement>(null);
  const [videosPaused, setVideosPaused] = useState(false);
  const [videoLightboxOpen, setVideoLightboxOpen] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const lightboxVideoRef = useRef<HTMLVideoElement>(null);

  // Auto-scroll effect for videos - every 2 seconds
  useEffect(() => {
    const scrollContainer = videoScrollRef.current;
    if (!scrollContainer) return;

    const cardWidth = 376; // card + gap (360 + 16)
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

    const intervalId = setInterval(() => {
      if (!videosPaused) {
        const currentScroll = scrollContainer.scrollLeft;
        const nextScroll = currentScroll + cardWidth;
        if (nextScroll >= maxScroll - 10) {
          scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollContainer.scrollTo({ left: nextScroll, behavior: 'smooth' });
        }
      }
    }, 2000); // 2 second interval

    return () => clearInterval(intervalId);
  }, [videosPaused]);

  const openVideoLightbox = (index: number) => {
    setCurrentVideoIndex(index);
    setVideoLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeVideoLightbox = () => {
    setVideoLightboxOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <div className="mt-20">
      <div className="text-center mb-10">
        <p
          className="text-xs font-semibold tracking-[0.4em] uppercase mb-3"
          style={{ color: '#800080' }}
        >
          Watch & Get Inspired
        </p>
        <h3 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
          Our{' '}
          <span className="gold-text">Videos</span>
        </h3>
        <div className="gold-line w-20 mx-auto" />
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-4 gap-4">
        {videos.map((video, index) => (
          <VideoCard 
            key={index} 
            videoSrc={video.src} 
            label={video.label} 
            onClick={() => openVideoLightbox(index)}
          />
        ))}
      </div>

      {/* Mobile Auto-Scroll */}
      <div
        ref={videoScrollRef}
        className="md:hidden flex gap-4 overflow-x-auto scrollbar-hide pb-4"
        style={{
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        onMouseEnter={() => setVideosPaused(true)}
        onMouseLeave={() => setVideosPaused(false)}
        onTouchStart={() => setVideosPaused(true)}
        onTouchEnd={() => setTimeout(() => setVideosPaused(false), 1000)}
      >
        {videos.map((video, index) => (
          <div key={index} style={{ scrollSnapAlign: 'start' }}>
            <VideoCard 
              videoSrc={video.src} 
              label={video.label} 
              isMobile={true} 
              onClick={() => openVideoLightbox(index)}
            />
          </div>
        ))}
      </div>

      {/* Video Lightbox */}
      {videoLightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(10px)' }}
          onClick={closeVideoLightbox}
        >
          <button
            onClick={closeVideoLightbox}
            className="absolute top-4 right-4 z-10 p-2 text-white hover:text-[#D4AF37] transition-colors"
          >
            <X size={32} />
          </button>

          <div
            className="max-w-5xl max-h-[80vh] px-4 w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={lightboxVideoRef}
              src={videos[currentVideoIndex].src}
              controls
              autoPlay
              className="w-full max-h-[70vh] rounded-lg"
              style={{ background: '#111' }}
            />
            <p className="text-white text-center mt-4 text-lg font-semibold tracking-wider">
              {videos[currentVideoIndex].label}
            </p>
            <p className="text-[#D4AF37] text-center mt-2 text-sm">
              {currentVideoIndex + 1} / {videos.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
