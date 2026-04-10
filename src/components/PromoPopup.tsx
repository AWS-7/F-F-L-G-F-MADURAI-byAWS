import { useEffect, useState } from 'react';
import { X, Zap } from 'lucide-react';

export default function PromoPopup() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      setVisible(true);
      const autoClose = setTimeout(() => handleClose(), 10000);
      return () => clearTimeout(autoClose);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setVisible(false);
      setClosing(false);
    }, 400);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-md"
        style={{
          animation: closing ? 'none' : 'scaleIn 0.5s ease-out forwards',
          opacity: closing ? 0 : 1,
          transition: closing ? 'opacity 0.4s ease' : 'none',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1a0a1a 0%, #111 50%, #0d0d0d 100%)',
            border: '1px solid rgba(212,175,55,0.5)',
            borderRadius: '4px',
            boxShadow: '0 25px 80px rgba(128,0,128,0.4), 0 0 0 1px rgba(212,175,55,0.1)',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(128,0,128,0.15) 0%, transparent 60%)',
            }}
          />

          <div className="shimmer-bg absolute inset-0 pointer-events-none" />

          <button
            onClick={handleClose}
            className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{
              background: '#800080',
              border: '1px solid #D4AF37',
              borderRadius: '2px',
              color: 'white',
            }}
          >
            <X size={14} />
          </button>

          <div className="p-8 text-center relative">
            <div className="flex justify-center mb-4">
              <div
                className="w-12 h-12 flex items-center justify-center"
                style={{
                  background: 'rgba(212,175,55,0.15)',
                  border: '1px solid rgba(212,175,55,0.4)',
                  borderRadius: '50%',
                }}
              >
                <Zap size={22} style={{ color: '#D4AF37' }} />
              </div>
            </div>

            <p
              className="text-xs font-semibold tracking-[0.3em] uppercase mb-2"
              style={{ color: '#800080' }}
            >
              Limited Time Offer
            </p>

            <h2
              className="font-display text-5xl font-black mb-1"
              style={{ color: '#D4AF37' }}
            >
              25% OFF
            </h2>
            <p
              className="font-display text-xl font-bold mb-1"
              style={{ color: '#D4AF37' }}
            >
              ALL MEMBERSHIPS
            </p>

            <div className="gold-line my-4" />

            <p className="text-white/80 text-sm mb-1">
              Use Code:
              <span
                className="ml-2 font-black text-base tracking-widest px-3 py-1"
                style={{
                  color: '#D4AF37',
                  background: 'rgba(212,175,55,0.1)',
                  border: '1px dashed rgba(212,175,55,0.5)',
                  borderRadius: '2px',
                }}
              >
                FEEMEFLEX25
              </span>
            </p>

            <p className="text-white/40 text-xs mt-4 tracking-wider">
              Valid at both Kadachanenthal & Ottakadai branches
            </p>

            <button
              onClick={handleClose}
              className="mt-6 w-full py-3 text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #F2D060)',
                color: '#111',
                borderRadius: '2px',
              }}
            >
              Claim Your Offer
            </button>

            <p className="text-white/25 text-xs mt-3">
              Offer expires soon. T&C apply.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
