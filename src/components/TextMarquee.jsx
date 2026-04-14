import { useState } from 'react';

const marqueeWords = [
  'FITNESS',
  'PROGRAM',
  'HEALTH',
  'TRAINING',
  'COACH',
  'CROSSFIT',
  'FITNESS',
  'PROGRAM',
  'HEALTH',
  'TRAINING',
  'COACH',
  'CROSSFIT',
];

function MarqueeRow({
  direction,
  isHovered,
}) {
  // Repeat the words multiple times to ensure seamless loop
  const repeatedWords = [...marqueeWords, ...marqueeWords, ...marqueeWords, ...marqueeWords];

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div
        className={`inline-flex ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`}
        style={{
          animationPlayState: isHovered ? 'paused' : 'running',
        }}
      >
        {repeatedWords.map((word, index) => (
          <span
            key={index}
            className="inline-flex items-center mx-2 md:mx-4"
          >
            <span
              className="font-display text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight"
              style={{ color: '#800080' }}
            >
              {word}
            </span>
            <span
              className="mx-2 md:mx-4 text-lg md:text-xl"
              style={{ color: '#800080', opacity: 0.5 }}
            >
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function TextMarquee() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      className="relative py-3 md:py-4 overflow-hidden cursor-pointer flex flex-col justify-center"
      style={{ backgroundColor: '#000', minHeight: '80px', maxHeight: '100px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle top/bottom borders */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(128,0,128,0.5), transparent)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(128,0,128,0.5), transparent)',
        }}
      />

      {/* Row 1: Right to Left */}
      <div className="mb-2 md:mb-3">
        <MarqueeRow direction="left" isHovered={isHovered} />
      </div>

      {/* Row 2: Left to Right */}
      <div>
        <MarqueeRow direction="right" isHovered={isHovered} />
      </div>
    </section>
  );
}
