"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay - in a real app you would check for actual data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative w-full h-screen flex flex-col items-center justify-center bg-background overflow-hidden">
      <AnimatePresence>
        {loading ? (
          <motion.div 
            key="loader"
            className="fixed inset-0 flex flex-col items-center justify-center z-50"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.8, ease: [0.65, 0, 0.35, 1] }
            }}
          >
            {/* Cool 3D cube loading animation */}
            <div className="perspective-[800px] w-40 h-40 relative">
              <motion.div
                className="w-40 h-40 absolute"
                animate={{ 
                  rotateY: [0, 360],
                  rotateX: [0, 360]
                }}
                transition={{ 
                  duration: 3, 
                  ease: "linear", 
                  repeat: Infinity 
                }}
              >
                {/* Front */}
                <motion.div 
                  className="w-40 h-40 absolute bg-gradient-to-br from-indigo-500 to-purple-500 opacity-80"
                  style={{ 
                    transform: "translateZ(80px)",
                    backfaceVisibility: "hidden"
                  }}
                />
                
                {/* Back */}
                <motion.div 
                  className="w-40 h-40 absolute bg-gradient-to-br from-cyan-500 to-blue-500 opacity-80"
                  style={{ 
                    transform: "rotateY(180deg) translateZ(80px)",
                    backfaceVisibility: "hidden"
                  }}
                />
                
                {/* Left */}
                <motion.div 
                  className="w-40 h-40 absolute bg-gradient-to-br from-emerald-500 to-teal-500 opacity-80"
                  style={{ 
                    transform: "rotateY(-90deg) translateZ(80px)",
                    backfaceVisibility: "hidden"
                  }}
                />
                
                {/* Right */}
                <motion.div 
                  className="w-40 h-40 absolute bg-gradient-to-br from-pink-500 to-rose-500 opacity-80"
                  style={{ 
                    transform: "rotateY(90deg) translateZ(80px)",
                    backfaceVisibility: "hidden"
                  }}
                />
                
                {/* Top */}
                <motion.div 
                  className="w-40 h-40 absolute bg-gradient-to-br from-amber-500 to-orange-500 opacity-80"
                  style={{ 
                    transform: "rotateX(90deg) translateZ(80px)",
                    backfaceVisibility: "hidden"
                  }}
                />
                
                {/* Bottom */}
                <motion.div 
                  className="w-40 h-40 absolute bg-gradient-to-br from-violet-500 to-fuchsia-500 opacity-80"
                  style={{ 
                    transform: "rotateX(-90deg) translateZ(80px)",
                    backfaceVisibility: "hidden"
                  }}
                />
              </motion.div>
            </div>
            
            {/* Loading text with letter animation */}
            <motion.div 
              className="mt-16 font-mono tracking-widest text-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {["L", "O", "A", "D", "I", "N", "G"].map((letter, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  animate={{ 
                    y: [0, -10, 0],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.1,
                    ease: "easeInOut"
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            className="w-full h-full flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Your actual page content goes here */}
            <h1 className="text-5xl font-bold font-sans">Welcome to My Website</h1>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
