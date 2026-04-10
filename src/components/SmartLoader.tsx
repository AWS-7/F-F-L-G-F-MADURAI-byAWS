import { useEffect, useState } from 'react';
import { Wifi } from 'lucide-react';

export default function SmartLoader() {
  const [show, setShow] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [networkType, setNetworkType] = useState<string>('4G');
  const [signalStrength, setSignalStrength] = useState(4);

  useEffect(() => {
    // Detect network speed - works on Chrome/Android, fallback for iOS/Safari
    const connection = (navigator as Navigator & { 
      connection?: { 
        effectiveType?: string;
        type?: string;
      } 
    }).connection;
    
    // Try different properties for network detection
    let detectedType = connection?.effectiveType || connection?.type;
    
    // If no network API available, detect based on device
    if (!detectedType) {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      // Default to 4G for modern mobile devices
      detectedType = isMobile ? '4g' : '4g';
    }
    
    // Normalize to lowercase for mapping
    detectedType = detectedType.toLowerCase();
    
    // Map network type
    const networkMap: Record<string, string> = {
      'slow-2g': '2G',
      '2g': '2G',
      '3g': '3G',
      '4g': '4G',
      '5g': '5G',
      'wifi': 'WiFi',
      'ethernet': 'LAN',
      'cellular': '4G',
    };
    
    // Get display type (default to 4G if unknown)
    const displayType = networkMap[detectedType] || '4G';
    setNetworkType(displayType);
    
    // Set signal strength based on network
    const strengthMap: Record<string, number> = {
      'slow-2g': 1,
      '2g': 2,
      '3g': 3,
      '4g': 4,
      '5g': 4,
      'wifi': 4,
    };
    setSignalStrength(strengthMap[detectedType] || 4);

    // Always show loader on mobile for better UX
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isSlowNetwork = detectedType === '2g' || detectedType === 'slow-2g' || detectedType === '3g';

    if (isMobile || isSlowNetwork || document.readyState !== 'complete') {
      setShow(true);
    }

    const handleLoad = () => {
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => setShow(false), 700);
      }, isMobile ? 2500 : 1500);
    };

    if (document.readyState === 'complete') {
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => setShow(false), 700);
      }, isMobile ? 3000 : 2000);
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => window.removeEventListener('load', handleLoad);
  }, []);

  if (!show) return null;

  // Animate signal bars
  const bars = [1, 2, 3, 4];

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ 
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a1a 50%, #111 100%)',
        opacity: fadeOut ? 0 : 1, 
        transition: 'opacity 0.7s ease' 
      }}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Network Signal Indicator */}
        <div className="relative flex flex-col items-center gap-4">
          {/* Signal Bars */}
          <div className="flex items-end gap-1 h-16">
            {bars.map((bar, index) => (
              <div
                key={bar}
                className="w-3 md:w-4 rounded-sm transition-all duration-300"
                style={{
                  height: `${(index + 1) * 12}px`,
                  backgroundColor: index < signalStrength ? '#D4AF37' : 'rgba(212,175,55,0.2)',
                  animation: index < signalStrength ? `pulseSignal 0.8s ease-in-out infinite` : 'none',
                  animationDelay: `${index * 0.1}s`,
                  boxShadow: index < signalStrength ? '0 0 10px rgba(212,175,55,0.5)' : 'none',
                }}
              />
            ))}
          </div>
          
          {/* Network Type Badge */}
          <div 
            className="px-4 py-1 rounded-full text-sm font-bold tracking-wider"
            style={{
              background: 'linear-gradient(135deg, #800080, #6a006a)',
              color: '#fff',
              border: '1px solid rgba(212,175,55,0.5)',
              boxShadow: '0 4px 15px rgba(128,0,128,0.4)',
            }}
          >
            {networkType}
          </div>
        </div>

        {/* Logo */}
        <div className="flex flex-col items-center">
          <div
            className="text-4xl md:text-6xl font-display font-black tracking-widest"
            style={{ 
              color: '#D4AF37',
              textShadow: '0 0 30px rgba(212,175,55,0.4)',
              animation: 'fadeInUp 0.8s ease-out',
            }}
          >
            FEMME
          </div>
          <div
            className="text-4xl md:text-6xl font-display font-black tracking-widest -mt-2"
            style={{ 
              color: '#800080',
              textShadow: '0 0 30px rgba(128,0,128,0.4)',
              animation: 'fadeInUp 0.8s ease-out 0.2s both',
            }}
          >
            FLEX
          </div>
        </div>

        {/* Loading Text with Wifi Icon */}
        <div className="flex items-center gap-3">
          <Wifi size={18} style={{ color: '#D4AF37' }} />
          <p className="text-white/60 text-sm tracking-[0.2em] uppercase">
            Connecting to {networkType}...
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex gap-1">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: '#800080',
                animation: `pulseDot 0.6s ease-in-out infinite`,
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulseSignal {
          0%, 100% { opacity: 1; transform: scaleY(1); }
          50% { opacity: 0.7; transform: scaleY(0.9); }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
