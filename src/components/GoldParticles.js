import { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { loadMotionPlugin } from '@tsparticles/plugin-motion';

export default function GoldParticles() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
      await loadMotionPlugin(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: {
        color: {
          value: 'transparent',
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: 'repulse',
          },
          resize: {
            enable: true,
          },
        },
        modes: {
          repulse: {
            distance: 100,
            duration: 0.4,
            factor: 50,
            speed: 1,
          },
        },
      },
      particles: {
        color: {
          value: '#D4AF37',
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: {
            default: 'bounce',
          },
          random: true,
          speed: 0.8,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 60,
        },
        opacity: {
          value: {
            min: 0.2,
            max: 0.8,
          },
          animation: {
            enable: true,
            speed: 0.5,
            minimumValue: 0.1,
          },
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: {
            min: 1,
            max: 3,
          },
          random: true,
        },
        shadow: {
          enable: true,
          color: '#D4AF37',
          blur: 10,
          offset: {
            x: 0,
            y: 0,
          },
        },
        twinkle: {
          lines: { enable: false },
          particles: {
            enable: true,
            frequency: 0.05,
            opacity: 0.8,
          },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  if (!init) {
    return null;
  }

  return (
    <Particles
      id="goldParticles"
      options={options}
      className="absolute inset-0 z-0"
    />
  );
}
