"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Particle {
  left: number;
  top: number;
  yOffset: number;
  xOffset: number;
  duration: number;
  delay: number;
  symbol: string;
  size: number;
  opacity: number;
  rotation: number;
  isVisible: boolean;
  layer: number;
  isPulsing: boolean;
  isHero: boolean;
}

export default function CodeParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Throttled mouse move handler for better performance
    let lastRun = 0;
    const throttleDelay = 20; // ms between updates
    
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastRun >= throttleDelay) {
        lastRun = now;
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    const codeSymbols = ['{', '}', '()', '[]', '<>', '=>', '++', '--', '&&', '||'];
    
    // Reduce particle count on mobile
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 15 : 25;
    
    const particlesData = Array.from({ length: particleCount }).map((_, i) => {
      const isHero = i < 3;
      const layer = isHero ? 1 : (Math.random() > 0.6 ? 1 : 0);
      const sizeMultiplier = isHero ? 2.0 : (layer === 1 ? 1.4 : 1.0);
      const opacityMultiplier = isHero ? 0.9 : (layer === 1 ? 0.7 : 0.5);
      const speedMultiplier = isHero ? 0.45 : (layer === 1 ? 0.65 : 0.85);
      
      return {
        left: Math.random() * 100,
        top: Math.random() * 100,
        yOffset: (Math.random() * 80 + 40) * speedMultiplier,
        xOffset: ((Math.random() - 0.5) * 40) * speedMultiplier,
        duration: 28 + (i % 4) * 4,
        delay: i * 0.35,
        symbol: isHero ? codeSymbols[Math.floor(Math.random() * 3)] : codeSymbols[Math.floor(Math.random() * codeSymbols.length)],
        size: (Math.random() * (isMobile ? 8 : 12) + (isMobile ? 8 : 12)) * sizeMultiplier,
        opacity: (Math.random() * 0.2 + 0.4) * opacityMultiplier,
        rotation: Math.random() * 40 - 20,
        layer,
        isHero,
        isVisible: true,
        isPulsing: isHero
      };
    });
    setParticles(particlesData);
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="fixed inset-0 overflow-hidden pointer-events-none" 
      style={{ 
        perspective: '1200px', 
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)',
        willChange: 'transform',
      }}
    >
      {particles.map((particle, i) => {
        // Generate different colors for variety with smoother gradients
        const colors = [
          'rgba(34, 211, 238, 0.95)',  // bright cyan
          'rgba(52, 211, 153, 0.95)',  // emerald
          'rgba(14, 165, 247, 0.95)',  // sky blue
          'rgba(168, 85, 247, 0.95)',  // purple
          'rgba(236, 72, 153, 0.95)'   // pink
        ];
        const color = colors[i % colors.length];
        
        // Significantly reduced mouse influence for more stability
        const mouseXInfluence = particle.layer === 1 && particle.isHero ? 
          (mousePosition.x / window.innerWidth - 0.5) * 1.2 : 0;
        const mouseYInfluence = particle.layer === 1 && particle.isHero ? 
          (mousePosition.y / window.innerHeight - 0.5) * 1.2 : 0;
        
        // Calculate staggered animation start times
        const staggerDelay = (particle.left / 100) * 1.2;
        
        return (
          <motion.div
            key={`code-symbol-${i}`}
            className="absolute font-mono font-bold tracking-tight select-none"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              fontSize: `${particle.size}px`,
              color: color,
              textShadow: `0 0 ${particle.size/2}px ${color.replace('0.95)', '0.7)')}`,
              willChange: 'transform, opacity',
              zIndex: particle.layer,
              transform: 'translate3d(0,0,0)',
              WebkitFontSmoothing: 'subpixel-antialiased',
              opacity: 0,
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              filter: particle.isHero ? 'drop-shadow(0 0 8px ' + color.replace('0.95)', '0.5)') + ')' : 'none'
            }}
            animate={{
              y: particle.layer === 1 ? 
                [-5, -particle.yOffset + mouseYInfluence] : 
                [-5, -particle.yOffset],
              x: particle.layer === 1 ? 
                [0, particle.xOffset + mouseXInfluence] : 
                [0, particle.xOffset],
              opacity: [0, particle.opacity, particle.opacity, 0],
              rotate: [0, particle.rotation],
              scale: particle.isPulsing ? [1, 1.05, 1] : 1
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay + staggerDelay,
              y: {
                duration: particle.duration,
                ease: "easeInOut",
                repeat: Infinity,
              },
              x: {
                duration: particle.duration,
                ease: "easeInOut", 
                repeat: Infinity,
              },
              opacity: {
                duration: particle.duration,
                times: [0, 0.1, 0.9, 1],
                ease: "easeInOut",
                repeat: Infinity
              },
              rotate: {
                duration: particle.duration * 1.2,
                ease: [0.4, 0.0, 0.6, 1.0],
                repeat: Infinity
              },
              scale: particle.isPulsing ? {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              } : undefined
            }}
          >
            {particle.symbol}
          </motion.div>
        );
      })}
    </div>
  );
} 