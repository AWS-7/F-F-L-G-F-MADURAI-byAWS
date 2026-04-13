import { useState, useEffect, useRef } from 'react';
import { Clock, MapPin, Users, ChevronRight, BookOpen, X, Check, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useSectionReveal } from '../hooks/useParallaxReveal';

const locations = ['All', 'Kadachanenthal', 'Othakkadai'];
const classTypes = ['All', 'Yoga', 'Zumba', 'Aerobics', 'Personal Training', 'Strength Training'];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface ClassSession {
  id: number;
  name: string;
  type: string;
  time: string;
  duration: string;
  location: string;
  instructor: string;
  capacity: number;
  day: string;
}

// Generate comprehensive schedule - all classes available at both branches all days
const generateFullSchedule = (): ClassSession[] => {
  const schedule: ClassSession[] = [];
  let id = 1;
  
  const branches = ['Kadachanenthal', 'Othakkadai'];
  const allDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const classTemplates = [
    { name: 'Yoga', type: 'Yoga', time: '6:00 AM', duration: '1 hour', instructor: 'P. Niraimathi', capacity: 15 },
    { name: 'Zumba Fitness', type: 'Zumba', time: '10:00 AM', duration: '45 min', instructor: 'M. Ashwitha', capacity: 20 },
    { name: 'Aerobics', type: 'Aerobics', time: '8:00 AM', duration: '1 hour', instructor: 'Hema', capacity: 25 },
    { name: 'Cardio Blast', type: 'Aerobics', time: '11:00 AM', duration: '45 min', instructor: 'M. Ashwitha', capacity: 20 },
    { name: 'Core Strength', type: 'Strength Training', time: '12:00 PM', duration: '45 min', instructor: 'J. Madhubala', capacity: 10 },
    { name: 'Personal Training', type: 'Personal Training', time: '10:00 AM', duration: '1 hour', instructor: 'J. Madhubala', capacity: 5 },
  ];
  
  allDays.forEach((day) => {
    branches.forEach((branch) => {
      classTemplates.forEach((template) => {
        schedule.push({
          id: id++,
          name: template.name,
          type: template.type,
          time: template.time,
          duration: template.duration,
          location: branch,
          instructor: template.instructor,
          capacity: template.capacity,
          day: day,
        });
      });
    });
  });
  
  return schedule;
};

const classSchedule: ClassSession[] = generateFullSchedule();

const typeColors: Record<string, string> = {
  'Yoga': '#800080',
  'Zumba': '#D4AF37',
  'Aerobics': '#FF6B6B',
  'Strength Training': '#4ECDC4',
  'Personal Training': '#95E1D3',
};

// Mobile Carousel Component
function MobileClassCarousel({ 
  classes, 
  typeColors, 
  onBookClass 
}: { 
  classes: ClassSession[]; 
  typeColors: Record<string, string>; 
  onBookClass: (cls: ClassSession) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll every 3 seconds (slower for readability)
  useEffect(() => {
    if (classes.length === 0 || isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % classes.length;
        scrollRef.current?.scrollTo({
          left: next * 300,
          behavior: 'smooth'
        });
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [classes.length, isPaused]);

  const scrollToIndex = (index: number) => {
    const newIndex = Math.max(0, Math.min(index, classes.length - 1));
    setCurrentIndex(newIndex);
    scrollRef.current?.scrollTo({
      left: newIndex * 300,
      behavior: 'smooth'
    });
  };

  const handleManualScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const newIndex = Math.round(scrollLeft / 300);
      setCurrentIndex(newIndex);
    }
  };

  if (classes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white/50">No classes found for selected filters.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div
        ref={scrollRef}
        onScroll={handleManualScroll}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setTimeout(() => setIsPaused(false), 3000)}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {classes.map((cls) => (
          <div
            key={cls.id}
            className="flex-shrink-0 w-[280px] snap-center"
          >
            <div
              className="dark-card p-5 relative overflow-hidden h-full"
              style={{
                borderRadius: '8px',
                border: '1px solid rgba(212,175,55,0.2)',
              }}
            >
              {/* Type Badge */}
              <div
                className="absolute top-3 right-3 px-2 py-1 text-xs font-bold uppercase"
                style={{
                  background: `${typeColors[cls.type]}20`,
                  color: typeColors[cls.type],
                  borderRadius: '2px',
                }}
              >
                {cls.type}
              </div>

              <div className="mb-3">
                <h3 className="font-display text-lg font-bold text-white mb-1 pr-16">{cls.name}</h3>
                <p className="text-white/50 text-xs">with {cls.instructor}</p>
              </div>

              <div className="space-y-1.5 mb-4">
                <div className="flex items-center gap-2 text-white/70">
                  <Clock size={14} style={{ color: '#D4AF37' }} />
                  <span className="text-xs">{cls.time} ({cls.duration})</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <MapPin size={14} style={{ color: '#800080' }} />
                  <span className="text-xs">{cls.location}</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <Users size={14} style={{ color: '#4ECDC4' }} />
                  <span className="text-xs">{cls.capacity} spots</span>
                </div>
              </div>

              <button
                onClick={() => onBookClass(cls)}
                className="w-full py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 flex items-center justify-center gap-1"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37, #F2D060)',
                  color: '#111',
                  borderRadius: '2px',
                }}
              >
                <BookOpen size={14} />
                Book Class
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {classes.length > 1 && (
        <>
          <button
            onClick={() => scrollToIndex(currentIndex - 1)}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-8 h-8 rounded-full flex items-center justify-center transition-all"
            style={{
              background: 'rgba(0,0,0,0.7)',
              border: '1px solid rgba(212,175,55,0.3)',
              opacity: currentIndex === 0 ? 0.3 : 1,
            }}
          >
            <ChevronLeft size={18} style={{ color: '#D4AF37' }} />
          </button>
          <button
            onClick={() => scrollToIndex(currentIndex + 1)}
            disabled={currentIndex === classes.length - 1}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-8 h-8 rounded-full flex items-center justify-center transition-all"
            style={{
              background: 'rgba(0,0,0,0.7)',
              border: '1px solid rgba(212,175,55,0.3)',
              opacity: currentIndex === classes.length - 1 ? 0.3 : 1,
            }}
          >
            <ChevronRightIcon size={18} style={{ color: '#D4AF37' }} />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {classes.length > 1 && (
        <div className="flex justify-center gap-2 mt-2">
          {classes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              className="w-2 h-2 rounded-full transition-all"
              style={{
                background: currentIndex === idx ? '#D4AF37' : 'rgba(212,175,55,0.3)',
                transform: currentIndex === idx ? 'scale(1.2)' : 'scale(1)',
              }}
            />
          ))}
        </div>
      )}

      {/* Swipe hint */}
      <p className="text-center text-white/30 text-xs mt-2">← Swipe to see more →</p>
    </div>
  );
}

// Desktop Card Component
function ClassCard({ 
  cls, 
  typeColors, 
  onBookClass 
}: { 
  cls: ClassSession; 
  typeColors: Record<string, string>; 
  onBookClass: (cls: ClassSession) => void;
}) {
  return (
    <div
      className="dark-card p-6 card-hover relative overflow-hidden"
      style={{
        borderRadius: '4px',
        border: '1px solid rgba(212,175,55,0.1)',
      }}
    >
      {/* Type Badge */}
      <div
        className="absolute top-4 right-4 px-3 py-1 text-xs font-bold uppercase"
        style={{
          background: `${typeColors[cls.type]}20`,
          color: typeColors[cls.type],
          borderRadius: '2px',
        }}
      >
        {cls.type}
      </div>

      <div className="mb-4">
        <h3 className="font-display text-xl font-bold text-white mb-1">{cls.name}</h3>
        <p className="text-white/50 text-sm">with {cls.instructor}</p>
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-2 text-white/70">
          <Clock size={16} style={{ color: '#D4AF37' }} />
          <span className="text-sm">{cls.time} ({cls.duration})</span>
        </div>
        <div className="flex items-center gap-2 text-white/70">
          <MapPin size={16} style={{ color: '#800080' }} />
          <span className="text-sm">{cls.location}</span>
        </div>
        <div className="flex items-center gap-2 text-white/70">
          <Users size={16} style={{ color: '#4ECDC4' }} />
          <span className="text-sm">{cls.capacity} spots available</span>
        </div>
      </div>

      <button
        onClick={() => onBookClass(cls)}
        className="w-full py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
        style={{
          background: 'linear-gradient(135deg, #D4AF37, #F2D060)',
          color: '#111',
          borderRadius: '2px',
        }}
      >
        <BookOpen size={16} />
        Book This Class
      </button>
    </div>
  );
}

// Mobile Locations Carousel with Auto-scroll
function MobileLocationsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const locations = [
    {
      name: 'Femmeflex Ladies GYM Fitness Studio',
      address: 'No 1/281-A, Alagar Kovil Main Road, Anthony Church Opposite, Kadhakinaru, Madurai - 625 104',
      phone: '93442 49843',
      hours: 'Mon–Sat: 5:30 AM – 9:00 PM',
      status: 'Open Now',
      mapUrl: 'https://maps.google.com/?q=No+1/281-A+Alagar+Kovil+Main+Road+Anthony+Church+Opposite+Kadhakinaru+Madurai+625104',
    },
    {
      name: 'Femmeflex Ladies GYM Fitness Studio',
      address: '1st Floor, Aysha Complex, 2/252, Rajeev Nagar, Otthakadai, Madurai, Near Mohan Hospital, Anbu Nagar, Thirumogur Road, Neelamega Nagar, Madurai-625107, Tamil Nadu',
      phone: '90808 82873',
      hours: 'Mon–Sat: 5:30 AM – 9:00 PM',
      status: 'Open Now',
      mapUrl: 'https://maps.google.com/?q=Aysha+Complex+2/252+Rajeev+Nagar+Otthakadai+Madurai+625107',
    },
  ];

  // Auto-scroll every 4 seconds
  useEffect(() => {
    if (locations.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % locations.length;
        scrollRef.current?.scrollTo({
          left: next * 320,
          behavior: 'smooth',
        });
        return next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [locations.length, isPaused]);

  const scrollToIndex = (index: number) => {
    const newIndex = Math.max(0, Math.min(index, locations.length - 1));
    setCurrentIndex(newIndex);
    scrollRef.current?.scrollTo({
      left: newIndex * 320,
      behavior: 'smooth',
    });
  };

  const handleManualScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const newIndex = Math.round(scrollLeft / 320);
      setCurrentIndex(newIndex);
    }
  };

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div
        ref={scrollRef}
        onScroll={handleManualScroll}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setTimeout(() => setIsPaused(false), 3000)}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {locations.map((loc, idx) => (
          <div key={idx} className="flex-shrink-0 w-[300px] snap-center">
            <div
              className="p-5 rounded-lg transition-all duration-300 cursor-pointer group h-full"
              style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(128,0,128,0.05) 100%)',
                border: '1px solid rgba(212,175,55,0.3)',
              }}
              onClick={() => window.open(loc.mapUrl, '_blank')}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(212,175,55,0.2)' }}
                >
                  <MapPin size={20} style={{ color: '#D4AF37' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-white text-sm mb-1">{loc.name}</h4>
                  <p className="text-white/60 text-xs mb-2 leading-relaxed">{loc.address}</p>
                  <div className="flex items-center gap-1 text-xs" style={{ color: '#D4AF37' }}>
                    <span>📞 {loc.phone}</span>
                  </div>
                  <p className="text-white/40 text-xs mt-1">{loc.hours}</p>
                  <p className="text-white/60 text-xs mt-1 flex items-center gap-1">
                    <span style={{ color: '#00C853' }}>●</span> {loc.status}
                  </p>
                </div>
              </div>
              {/* Mini Map Placeholder */}
              <div
                className="mt-3 h-24 rounded-lg overflow-hidden relative"
                style={{ background: 'rgba(0,0,0,0.3)' }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={24} style={{ color: '#D4AF37' }} className="mx-auto mb-1" />
                    <p className="text-white/60 text-xs">Tap for Google Maps</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {locations.length > 1 && (
        <>
          <button
            onClick={() => scrollToIndex(currentIndex - 1)}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-8 h-8 rounded-full flex items-center justify-center transition-all"
            style={{
              background: 'rgba(0,0,0,0.7)',
              border: '1px solid rgba(212,175,55,0.3)',
              opacity: currentIndex === 0 ? 0.3 : 1,
            }}
          >
            <ChevronLeft size={18} style={{ color: '#D4AF37' }} />
          </button>
          <button
            onClick={() => scrollToIndex(currentIndex + 1)}
            disabled={currentIndex === locations.length - 1}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-8 h-8 rounded-full flex items-center justify-center transition-all"
            style={{
              background: 'rgba(0,0,0,0.7)',
              border: '1px solid rgba(212,175,55,0.3)',
              opacity: currentIndex === locations.length - 1 ? 0.3 : 1,
            }}
          >
            <ChevronRightIcon size={18} style={{ color: '#D4AF37' }} />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {locations.length > 1 && (
        <div className="flex justify-center gap-2 mt-2">
          {locations.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              className="w-2 h-2 rounded-full transition-all"
              style={{
                background: currentIndex === idx ? '#D4AF37' : 'rgba(212,175,55,0.3)',
                transform: currentIndex === idx ? 'scale(1.2)' : 'scale(1)',
              }}
            />
          ))}
        </div>
      )}

      {/* Swipe hint */}
      <p className="text-center text-white/30 text-xs mt-2">← Swipe to see other branch →</p>
    </div>
  );
}

export default function ClassSchedule() {
  const { ref: headerRef, isVisible: headerVisible } = useIntersectionObserver(0.1);
  const { ref: headingRef, isVisible: headingVisible } = useSectionReveal(0.1);
  const { ref: subtitleRef, isVisible: subtitleVisible } = useSectionReveal(0.1);
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [bookingModal, setBookingModal] = useState<ClassSession | null>(null);
  const [bookingForm, setBookingForm] = useState({ name: '', phone: '' });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const filteredClasses = classSchedule.filter(c => {
    const locationMatch = selectedLocation === 'All' || c.location === selectedLocation;
    const typeMatch = selectedType === 'All' || c.type === selectedType;
    const dayMatch = c.day === selectedDay;
    return locationMatch && typeMatch && dayMatch;
  });

  const handleBookClass = (classSession: ClassSession) => {
    setBookingModal(classSession);
    setBookingSuccess(false);
    setBookingForm({ name: '', phone: '' });
  };

  const submitBooking = () => {
    if (!bookingModal) return;
    const message = `Hello! I'd like to book a class at Femme Flex.%0A%0A*Class:* ${bookingModal.name}%0A*Day:* ${bookingModal.day}%0A*Time:* ${bookingModal.time}%0A*Location:* ${bookingModal.location}%0A*Instructor:* ${bookingModal.instructor}%0A%0A*My Details:*%0AName: ${bookingForm.name}%0APhone: ${bookingForm.phone}`;
    window.open(`https://wa.me/919080882873?text=${message}`, '_blank');
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingModal(null);
    }, 2000);
  };

  return (
    <section id="schedule" className="relative py-24 md:py-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={headerRef} className="text-center mb-12">
          <p 
            ref={subtitleRef}
            className={`reveal-subtitle gpu-smooth text-xs font-semibold tracking-[0.4em] uppercase mb-4 ${subtitleVisible ? 'is-visible' : ''}`}
            style={{ color: '#800080', transitionDelay: '0.1s' }}
          >
            All Classes Available Daily
          </p>
          <h2 
            ref={headingRef}
            className={`reveal-heading gpu-smooth font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 ${headingVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0s' }}
          >
            Weekly <span className="gold-text">Timetable</span>
          </h2>
          <div 
            className={`reveal-text gpu-smooth gold-line w-24 mx-auto mb-8 ${headingVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0.2s' }}
          />
          <p 
            className={`reveal-text gpu-smooth text-white/60 text-lg max-w-2xl mx-auto ${headerVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0.3s' }}
          >
            Find the perfect class for your fitness goals. Filter by location, class type, and day.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Day Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {days.map(day => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className="px-4 py-2 text-sm font-semibold transition-all duration-300"
                style={{
                  background: selectedDay === day ? 'linear-gradient(135deg, #800080, #a020a0)' : 'rgba(255,255,255,0.05)',
                  color: selectedDay === day ? '#fff' : 'rgba(255,255,255,0.6)',
                  borderRadius: '4px',
                  border: `1px solid ${selectedDay === day ? '#D4AF37' : 'rgba(212,175,55,0.2)'}`,
                }}
              >
                {day.slice(0, 3)}
              </button>
            ))}
          </div>

          {/* Location & Type Filters */}
          <div className="flex flex-wrap justify-center gap-4">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-2 text-sm rounded cursor-pointer"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(212,175,55,0.2)',
                color: '#fff',
              }}
            >
              {locations.map(l => <option key={l} value={l} style={{ background: '#111' }}>{l === 'All' ? 'All Locations' : l}</option>)}
            </select>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 text-sm rounded cursor-pointer"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(212,175,55,0.2)',
                color: '#fff',
              }}
            >
              {classTypes.map(t => <option key={t} value={t} style={{ background: '#111' }}>{t}</option>)}
            </select>
          </div>
        </div>

        {/* Mobile Auto-Scroll Carousel */}
        <div className="md:hidden">
          <MobileClassCarousel 
            classes={filteredClasses} 
            typeColors={typeColors} 
            onBookClass={handleBookClass} 
          />
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-white/50">No classes found for selected filters.</p>
            </div>
          ) : (
            filteredClasses.map((cls) => (
              <ClassCard 
                key={cls.id} 
                cls={cls} 
                typeColors={typeColors} 
                onBookClass={handleBookClass} 
              />
            ))
          )}
        </div>

        {/* Legend */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {Object.entries(typeColors).map(([type, color]) => (
            <div key={type} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ background: color }} />
              <span className="text-white/60 text-sm">{type}</span>
            </div>
          ))}
        </div>

        {/* Branch Locations Map Section */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold tracking-[0.4em] uppercase mb-2" style={{ color: '#800080' }}>
              Our Locations
            </p>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
              Branch <span className="gold-text">Locations</span>
            </h3>
            <div className="gold-line w-16 mx-auto" />
          </div>

          {/* Mobile: Horizontal Scroll Carousel with Auto-scroll */}
          <div className="md:hidden">
            <MobileLocationsCarousel />
          </div>

          {/* Desktop: Grid Layout */}
          <div className="hidden md:grid grid-cols-2 gap-6">
            {/* Kadachanenthal Branch */}
            <div 
              className="p-6 rounded-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
              style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(128,0,128,0.05) 100%)',
                border: '1px solid rgba(212,175,55,0.3)',
              }}
              onClick={() => window.open('https://maps.google.com/?q=No+1/281-A+Alagar+Kovil+Main+Road+Anthony+Church+Opposite+Kadhakinaru+Madurai+625104', '_blank')}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                  style={{ background: 'rgba(212,175,55,0.2)' }}
                >
                  <MapPin size={24} style={{ color: '#D4AF37' }} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white mb-1">Femmeflex Ladies GYM Fitness Studio</h4>
                  <p className="text-white/60 text-sm mb-2">No 1/281-A, Alagar Kovil Main Road,<br/>Anthony Church Opposite, Kadhakinaru,<br/>Madurai - 625 104</p>
                  <div className="flex items-center gap-2 text-sm" style={{ color: '#D4AF37' }}>
                    <span>📞 93442 49843</span>
                  </div>
                  <p className="text-white/40 text-xs mt-2">Mon–Sat: 5:30 AM – 9:00 PM</p>
                  <p className="text-white/60 text-xs mt-2 flex items-center gap-1">
                    <span style={{ color: '#00C853' }}>●</span> Open Now
                  </p>
                </div>
              </div>
              {/* Mini Map Placeholder */}
              <div 
                className="mt-4 h-32 rounded-lg overflow-hidden relative"
                style={{ background: 'rgba(0,0,0,0.3)' }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={32} style={{ color: '#D4AF37' }} className="mx-auto mb-2" />
                    <p className="text-white/60 text-xs">Click to view on Google Maps</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </div>

            {/* Othakkadai Branch */}
            <div 
              className="p-6 rounded-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
              style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(128,0,128,0.05) 100%)',
                border: '1px solid rgba(212,175,55,0.3)',
              }}
              onClick={() => window.open('https://maps.google.com/?q=Ayisha+complex+1st+floor+thirumogur+road+Y.othakadai+Madurai+625107', '_blank')}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                  style={{ background: 'rgba(212,175,55,0.2)' }}
                >
                  <MapPin size={24} style={{ color: '#D4AF37' }} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white mb-1">Femmeflex Ladies GYM Fitness Studio</h4>
                  <p className="text-white/60 text-sm mb-2">1st Floor, Aysha Complex, 2/252,<br/>Rajeev Nagar, Otthakadai, Madurai,<br/>Near Mohan Hospital, Anbu Nagar,<br/>Thirumogur Road, Neelamega Nagar,<br/>Madurai-625107, Tamil Nadu</p>
                  <div className="flex items-center gap-2 text-sm" style={{ color: '#D4AF37' }}>
                    <span>📞 90808 82873</span>
                  </div>
                  <p className="text-white/40 text-xs mt-2">Mon–Sat: 5:30 AM – 9:00 PM</p>
                  <p className="text-white/60 text-xs mt-2 flex items-center gap-1">
                    <span style={{ color: '#00C853' }}>●</span> Open Now
                  </p>
                </div>
              </div>
              {/* Mini Map Placeholder */}
              <div 
                className="mt-4 h-32 rounded-lg overflow-hidden relative"
                style={{ background: 'rgba(0,0,0,0.3)' }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={32} style={{ color: '#D4AF37' }} className="mx-auto mb-2" />
                    <p className="text-white/60 text-xs">Click to view on Google Maps</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {bookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.8)' }}>
          <div className="dark-card p-8 max-w-md w-full relative" style={{ borderRadius: '8px', border: '1px solid rgba(212,175,55,0.3)' }}>
            <button
              onClick={() => setBookingModal(null)}
              className="absolute top-4 right-4 text-white/50 hover:text-white"
            >
              <X size={24} />
            </button>

            {bookingSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,200,83,0.2)' }}>
                  <Check size={32} style={{ color: '#00C853' }} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Booking Request Sent!</h3>
                <p className="text-white/60">We'll contact you shortly to confirm.</p>
              </div>
            ) : (
              <>
                <h3 className="font-display text-2xl font-bold text-white mb-2">Book Your Class</h3>
                <div className="mb-6 p-4 rounded" style={{ background: 'rgba(212,175,55,0.1)' }}>
                  <p className="text-white font-semibold">{bookingModal.name}</p>
                  <p className="text-white/60 text-sm">{bookingModal.day} at {bookingModal.time} • {bookingModal.location}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#D4AF37' }}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                      className="w-full px-4 py-3 rounded"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(212,175,55,0.2)',
                        color: '#fff',
                      }}
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#D4AF37' }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(212,175,55,0.2)',
                        color: '#fff',
                      }}
                      placeholder="Enter your phone"
                    />
                  </div>

                  <button
                    onClick={submitBooking}
                    disabled={!bookingForm.name || !bookingForm.phone}
                    className="w-full py-4 text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
                    style={{
                      background: !bookingForm.name || !bookingForm.phone ? 'rgba(128,0,128,0.3)' : 'linear-gradient(135deg, #800080, #a020a0)',
                      color: '#fff',
                      borderRadius: '4px',
                      cursor: !bookingForm.name || !bookingForm.phone ? 'not-allowed' : 'pointer',
                    }}
                  >
                    <ChevronRight size={18} />
                    Send Booking Request
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
