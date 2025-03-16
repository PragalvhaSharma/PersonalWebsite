"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useAnimation, useInView } from "framer-motion";

// Particle component for the explosion effect
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Particle = ({ index }: { index: number }) => {
  // index is used as a key in the parent component's map function
  const randomX = Math.random() * 2 - 1;
  const randomY = Math.random() * 2 - 1;
  const randomDelay = Math.random() * 0.5;
  const randomDuration = 1.5 + Math.random() * 1;
  const randomSize = 5 + Math.random() * 15;
  const randomRotation = Math.random() * 360;
  const randomColor = [
    "#FF5E5B", "#D8D8F6", "#00CECB", "#FFED66", "#8F3985", 
    "#E84855", "#5EB1BF", "#F9DC5C", "#3185FC", "#E84855"
  ][Math.floor(Math.random() * 10)];

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: randomSize,
        height: randomSize,
        backgroundColor: randomColor,
        top: "50%",
        left: "50%",
        x: "-50%",
        y: "-50%",
      }}
      initial={{ scale: 0, rotate: 0 }}
      animate={{
        scale: [0, 1, 0],
        rotate: [0, randomRotation],
        x: ["-50%", `calc(-50% + ${randomX * 150}px)`],
        y: ["-50%", `calc(-50% + ${randomY * 150}px)`],
      }}
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        ease: [0.2, 0.8, 0.2, 1],
      }}
    />
  );
};

// Glitch text effect
const GlitchText = ({ text }: { text: string }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref);
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const child = {
    hidden: { 
      opacity: 0,
      y: 20,
      x: -10,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={controls}
      className="flex flex-wrap justify-center"
    >
      {text.split("").map((char: string, index: number) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block text-6xl md:text-8xl font-bold relative"
          style={{ 
            textShadow: "0 0 8px rgba(255,255,255,0.4)",
            fontFamily: "var(--font-geist-sans)"
          }}
          whileHover={{
            scale: 1.2,
            rotate: Math.random() * 10 - 5,
            color: ["#FF5E5B", "#00CECB", "#FFED66", "#3185FC"][Math.floor(Math.random() * 4)],
            transition: { duration: 0.2 }
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showParticles, setShowParticles] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState(0);
  const particles = Array.from({ length: 100 }, (_, i) => i);

  useEffect(() => {
    // Phase 1: Initial loading
    const timer1 = setTimeout(() => {
      setLoadingPhase(1);
    }, 1500);
    
    // Phase 2: Particle explosion
    const timer2 = setTimeout(() => {
      setShowParticles(true);
      setLoadingPhase(2);
    }, 3000);
    
    // Phase 3: Complete loading
    const timer3 = setTimeout(() => {
      setLoading(false);
    }, 5000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <main className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="loader"
            className="fixed inset-0 flex flex-col items-center justify-center z-50"
            exit={{ 
              opacity: 0,
              scale: 1.2,
              filter: "blur(20px)",
              transition: { duration: 1, ease: [0.65, 0, 0.35, 1] }
            }}
          >
            {/* Animated background */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-black via-purple-900 to-black"
              animate={{ 
                background: [
                  "linear-gradient(to bottom right, #000000, #1a0033, #000000)",
                  "linear-gradient(to bottom right, #000000, #330033, #000000)",
                  "linear-gradient(to bottom right, #000000, #003333, #000000)",
                  "linear-gradient(to bottom right, #000000, #1a0033, #000000)"
                ]
              }}
              transition={{ 
                duration: 8, 
                ease: "easeInOut", 
                repeat: Infinity 
              }}
            />
            
            {/* Grid lines */}
            <motion.div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
                backgroundSize: "40px 40px"
              }}
              animate={{
                backgroundPosition: ["0px 0px", "40px 40px"]
              }}
              transition={{
                duration: 4,
                ease: "linear",
                repeat: Infinity
              }}
            />
            
            {/* Central circle */}
            <motion.div
              className="relative w-40 h-40 rounded-full flex items-center justify-center"
              style={{
                background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)"
              }}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ 
                duration: 3, 
                ease: "easeInOut", 
                repeat: Infinity 
              }}
            >
              {/* Orbiting circles */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-full h-full rounded-full border border-white opacity-30"
                  style={{ borderRadius: "50%" }}
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 8 - i * 2, 
                    ease: "linear", 
                    repeat: Infinity,
                    delay: i * 0.5
                  }}
                />
              ))}
              
              {/* Pulsing core */}
              <motion.div
                className="w-20 h-20 rounded-full bg-white"
                animate={{ 
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.7, 1, 0.7],
                  boxShadow: [
                    "0 0 20px 0px rgba(255,255,255,0.5)",
                    "0 0 40px 10px rgba(255,255,255,0.8)",
                    "0 0 20px 0px rgba(255,255,255,0.5)"
                  ]
                }}
                transition={{ 
                  duration: 2, 
                  ease: "easeInOut", 
                  repeat: Infinity 
                }}
              />
            </motion.div>
            
            {/* Particle explosion */}
            {showParticles && (
              <div className="absolute inset-0 overflow-hidden">
                {particles.map((i) => (
                  <Particle key={i} index={i} />
                ))}
              </div>
            )}
            
            {/* Loading text based on phase */}
            <div className="absolute bottom-1/4 left-0 right-0 flex flex-col items-center">
              {loadingPhase === 0 && (
                <motion.div
                  className="text-white text-2xl font-mono"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Initializing...
                </motion.div>
              )}
              
              {loadingPhase === 1 && (
                <motion.div
                  className="text-white text-2xl font-mono"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Preparing Experience...
                </motion.div>
              )}
              
              {loadingPhase === 2 && (
                <motion.div
                  className="text-white text-2xl font-mono"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Almost Ready...
                </motion.div>
              )}
              
              {/* Progress bar */}
              <motion.div 
                className="w-64 h-1 bg-gray-800 mt-4 rounded-full overflow-hidden"
              >
                <motion.div 
                  className="h-full bg-white"
                  initial={{ width: "0%" }}
                  animate={{ 
                    width: loadingPhase === 0 ? "30%" : 
                           loadingPhase === 1 ? "60%" : "100%" 
                  }}
                  transition={{ 
                    duration: loadingPhase === 0 ? 1.5 : 
                              loadingPhase === 1 ? 1.5 : 2,
                    ease: "easeInOut" 
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            className="w-full h-full flex items-center justify-center p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <GlitchText text="WELCOME" />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
