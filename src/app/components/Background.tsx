"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface AnimatedBubble {
  width: number;
  height: number;
  left: number;
  top: number;
  rotation: number;
  scale: number;
  speed: number;
}

export default function Background() {
  const [animatedBubbles, setAnimatedBubbles] = useState<AnimatedBubble[]>([]);

  useEffect(() => {
    // Reduce the number of bubbles for better performance
    const bubbles = Array.from({ length: 15 }).map(() => ({
      width: Math.random() * 300 + 200,
      height: Math.random() * 300 + 200,
      left: Math.random() * 100,
      top: Math.random() * 100,
      rotation: Math.random() * 180,
      scale: Math.random() * 0.5 + 0.75,
      speed: Math.random() * 0.3 + 0.75 // Reduced speed variation for more stability
    }));
    setAnimatedBubbles(bubbles);
  }, []);

  return (
    <>
      {/* Grid and noise patterns - using fixed instead of absolute */}
      <div className="fixed inset-0 bg-grid-pattern opacity-8" style={{ transform: 'translateZ(0)' }}></div>
      <div className="fixed inset-0 opacity-[0.05] pointer-events-none" style={{ transform: 'translateZ(0)' }}>
        <div className="w-full h-full bg-noise-pattern animate-noise"></div>
      </div>
      
      {/* Animated background bubbles */}
      {animatedBubbles.length > 0 && (
        <div 
          className="fixed inset-0 overflow-hidden" 
          style={{ 
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            willChange: 'transform'
          }}
        >
          {animatedBubbles.map((bubble, i) => (
            <motion.div
              key={i}
              className="absolute bg-gradient-to-br from-cyan-500/20 via-emerald-500/15 to-purple-500/20 rounded-full blur-xl"
              style={{
                width: `${bubble.width}px`,
                height: `${bubble.height}px`,
                left: `${bubble.left}%`,
                top: `${bubble.top}%`,
                willChange: 'transform, opacity',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
              initial={{ opacity: 0, scale: 0, rotate: bubble.rotation }}
              animate={{ 
                opacity: [0, 0.4 * bubble.scale, 0],
                scale: [0.8, 1.2 * bubble.scale, 1.6],
                x: [0, Math.floor(i % 2 === 0 ? 60 : -60) * bubble.speed],
                y: [0, Math.floor(i % 2 === 0 ? 60 : -60) * bubble.speed],
                rotate: [bubble.rotation, bubble.rotation + (i % 2 === 0 ? 30 : -30)],
              }}
              transition={{
                duration: (15 + (i % 10)) * (1 / bubble.speed),
                repeat: Infinity,
                delay: i * 0.5,
                ease: [0.4, 0.0, 0.6, 1.0],
                opacity: {
                  duration: (15 + (i % 10)) * (1 / bubble.speed),
                  times: [0, 0.5, 1],
                  ease: "easeInOut",
                  repeat: Infinity,
                },
                scale: {
                  duration: (15 + (i % 10)) * (1 / bubble.speed),
                  times: [0, 0.5, 1],
                  ease: [0.4, 0.0, 0.6, 1.0],
                  repeat: Infinity,
                }
              }}
            />
          ))}
        </div>
      )}
      
      {/* Multiple glow effects */}
      <div 
        className="fixed inset-0 overflow-hidden"
        style={{
          willChange: 'transform',
          transform: 'translate3d(0,0,0)',
          backfaceVisibility: 'hidden',
          zIndex: -1
        }}
      >
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full bg-gradient-to-br from-cyan-500/30 via-emerald-500/25 to-purple-500/30 blur-[130px]"
          style={{
            transform: 'translate3d(-50%, -50%, 0)',
            backfaceVisibility: 'hidden'
          }}
          animate={{
            scale: [1, 1.05, 1], // Reduced scale animation
            opacity: [0.8, 0.9, 0.8], // Reduced opacity variation
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute top-1/3 left-1/4 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-emerald-500/30 via-teal-500/25 to-blue-500/30 blur-[120px]"
          style={{
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden'
          }}
          animate={{
            scale: [1.05, 1, 1.05], // Reduced scale animation
            opacity: [0.8, 0.9, 0.8], // Reduced opacity variation
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-[800px] h-[800px] rounded-full bg-gradient-to-bl from-teal-500/30 via-cyan-500/25 to-indigo-500/30 blur-[140px]"
          style={{
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden'
          }}
          animate={{
            scale: [1, 1.1, 1], // Reduced scale animation
            opacity: [0.8, 0.9, 0.8], // Reduced opacity variation
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-purple-500/25 via-pink-500/20 to-cyan-500/25 blur-[110px]"
          style={{
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden'
          }}
          animate={{
            scale: [1.05, 1, 1.05], // Reduced scale animation
            opacity: [0.8, 0.9, 0.8], // Reduced opacity variation
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </div>

      {/* Noise overlay for texture */}
      <div 
        className="fixed inset-0 opacity-[0.2] mix-blend-overlay pointer-events-none bg-noise-pattern"
        style={{
          backgroundSize: '256px 256px',
          willChange: 'transform',
          transform: 'translateZ(0)',
          animation: 'noise 8s steps(8) infinite'
        }}
      />
    </>
  );
} 