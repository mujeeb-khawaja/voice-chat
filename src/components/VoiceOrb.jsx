import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function VoiceOrb({ state, volume, theme = 'purple', onClick }) {
  const [proceduralVolume, setProceduralVolume] = useState(0);

  // Procedural speaking animation
  useEffect(() => {
    if (state !== 'speaking') {
      setProceduralVolume(0);
      return;
    }

    let animationFrameId;
    let time = 0;

    const animate = () => {
      time += 0.15;
      // Synthesize human speech-like waves (a combination of sine waves)
      const baseWave = Math.sin(time) * 0.4 + Math.sin(time * 2.3) * 0.3 + Math.sin(time * 0.7) * 0.2;
      const amplitude = Math.max(0.05, Math.abs(baseWave));
      setProceduralVolume(amplitude);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [state]);

  // Compute active scale based on state and inputs
  let currentScale = 1.0;
  if (state === 'listening') {
    currentScale = 1.0 + volume * 0.9;
  } else if (state === 'speaking') {
    currentScale = 1.05 + proceduralVolume * 0.35;
  } else if (state === 'thinking') {
    currentScale = 0.95;
  }

  // Get color schemes based on selected theme
  const getGradientClasses = () => {
    switch (theme) {
      case 'blue':
        return {
          bg: 'from-cyan-500 via-blue-500 to-indigo-600',
          glow: 'rgba(6, 182, 212, 0.4)',
          glowOuter: 'rgba(6, 182, 212, 0.15)',
          ringColor: 'border-cyan-500/30'
        };
      case 'green':
        return {
          bg: 'from-emerald-400 via-green-500 to-teal-600',
          glow: 'rgba(16, 185, 129, 0.4)',
          glowOuter: 'rgba(16, 185, 129, 0.15)',
          ringColor: 'border-emerald-500/30'
        };
      case 'red':
        return {
          bg: 'from-rose-500 via-red-600 to-orange-600',
          glow: 'rgba(239, 68, 68, 0.4)',
          glowOuter: 'rgba(239, 68, 68, 0.15)',
          ringColor: 'border-red-500/30'
        };
      case 'gold':
        return {
          bg: 'from-amber-400 via-yellow-500 to-orange-500',
          glow: 'rgba(245, 158, 11, 0.4)',
          glowOuter: 'rgba(245, 158, 11, 0.15)',
          ringColor: 'border-amber-500/30'
        };
      case 'pink':
        return {
          bg: 'from-pink-500 via-fuchsia-600 to-rose-400',
          glow: 'rgba(236, 72, 153, 0.4)',
          glowOuter: 'rgba(236, 72, 153, 0.15)',
          ringColor: 'border-pink-500/30'
        };
      case 'purple':
      default:
        return {
          bg: 'from-indigo-600 via-purple-600 to-pink-500',
          glow: 'rgba(147, 51, 234, 0.4)',
          glowOuter: 'rgba(147, 51, 234, 0.15)',
          ringColor: 'border-purple-500/30'
        };
    }
  };

  const currentThemeColors = getGradientClasses();

  // Outer ambient ring count
  const ringCount = state === 'listening' ? 3 : state === 'speaking' ? 2 : 1;

  return (
    <div className="relative flex items-center justify-center w-full max-w-sm aspect-square select-none">
      
      {/* Dynamic Concentric Ripple Rings */}
      <AnimatePresence>
        {state !== 'idle' && (
          <>
            {Array.from({ length: ringCount }).map((_, i) => {
              const activeVolume = state === 'listening' ? volume : proceduralVolume;
              return (
                <motion.div
                  key={`ring-${state}-${i}`}
                  className={`absolute rounded-full border-2 ${currentThemeColors.ringColor} pointer-events-none`}
                  initial={{
                    width: 256,
                    height: 256,
                    opacity: 0.5,
                  }}
                  animate={{
                    width: 256 + (i + 1) * 90 + (activeVolume * 150),
                    height: 256 + (i + 1) * 90 + (activeVolume * 150),
                    opacity: 0,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    delay: i * 0.7,
                    ease: 'easeOut',
                  }}
                />
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* Glow outer canvas/shadow */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '280px',
          height: '280px',
          background: `radial-gradient(circle, ${currentThemeColors.glow} 0%, rgba(0,0,0,0) 70%)`,
        }}
        animate={{
          scale: currentScale * 1.1,
          opacity: state === 'idle' ? 0.35 : state === 'thinking' ? 0.5 : 0.85,
        }}
        transition={{
          type: 'spring',
          stiffness: 80,
          damping: 15,
        }}
      />

      {/* Main Interactive Orb */}
      <motion.div
        role="button"
        aria-label="Toggle voice assistant mode"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
        className={`relative z-10 w-64 h-64 rounded-full bg-gradient-to-br ${currentThemeColors.bg} cursor-pointer flex items-center justify-center shadow-2xl border border-white/10 overflow-hidden`}
        style={{
          boxShadow: `0 0 50px 10px ${currentThemeColors.glowOuter}, inset 0 0 25px 2px rgba(255, 255, 255, 0.25)`,
        }}
        animate={{
          scale: currentScale,
          y: state === 'idle' ? [0, -10, 0] : 0,
        }}
        transition={{
          y: {
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          },
          scale: {
            type: 'spring',
            stiffness: state === 'thinking' ? 120 : 180,
            damping: state === 'thinking' ? 18 : 12,
          },
        }}
      >
        {/* Glassmorphic sheen effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20 pointer-events-none" />

        {/* Dynamic inner details */}
        {state === 'thinking' && (
          <motion.div
            className="absolute inset-0 rounded-full border border-white/20"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 80%)',
            }}
          />
        )}

        {state === 'listening' && (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Dynamic Soundwave Rings Inside */}
            <motion.div
              className="w-48 h-48 rounded-full border border-white/30"
              animate={{
                scale: [0.95, 1.05, 0.95],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        )}

        {/* Core Center Pulse */}
        <motion.div
          className="w-16 h-16 rounded-full bg-white/20 blur-md"
          animate={{
            scale: state === 'idle' ? [1, 1.2, 1] : [1.1, 1.4, 1.1],
            opacity: state === 'thinking' ? 0.8 : [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: state === 'idle' ? 3 : 1.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Small mic icon inside if idle */}
        {state === 'idle' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white/95">
            <svg
              className="w-10 h-10 animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
            <span className="text-[11px] font-medium tracking-widest mt-2 uppercase opacity-65">
              Tap to Start
            </span>
          </div>
        )}
      </motion.div>
    </div>
  );
}
