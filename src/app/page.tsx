"use client";
// This component uses client-side only features and should not be pre-rendered

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [generatedText, setGeneratedText] = useState("");
  const [thinking, setThinking] = useState(true);
  const [thinkingTokens, setThinkingTokens] = useState("");
  const [progress, setProgress] = useState(0);
  const [highlightedWords, setHighlightedWords] = useState<number[]>([]);
  const [showCursor, setShowCursor] = useState(true);
  const [playTypingSound, setPlayTypingSound] = useState(false);
  const [showContentLoader, setShowContentLoader] = useState(false);
  const [terminalVisible, setTerminalVisible] = useState(false);
  const [animatedBubbles, setAnimatedBubbles] = useState<Array<{width: number, height: number, left: number, top: number, rotation: number}>>([]);
  const [particles, setParticles] = useState<Array<{left: number, top: number, yOffset: number, xOffset: number, duration: number, delay: number, size: number, opacity: number}>>([]);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const totalTextLength = useRef(0);

  // Generate consistent background bubbles on client-side only
  useEffect(() => {
    const bubbles = Array.from({ length: 30 }).map(() => ({
      width: Math.random() * 400 + 100,
      height: Math.random() * 400 + 100,
      left: Math.random() * 100,
      top: Math.random() * 100,
      rotation: Math.random() * 360,
    }));
    setAnimatedBubbles(bubbles);
    
    // Enhanced particle system with more variety
    const particlesData = Array.from({ length: 50 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      yOffset: Math.random() * 150 + 50,
      xOffset: (Math.random() - 0.5) * 100,
      duration: Math.random() * 8 + 4,
      delay: Math.random() * 5,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.3,
    }));
    setParticles(particlesData);
    
    // Smoother terminal appearance with spring animation
    const timer = setTimeout(() => {
      setTerminalVisible(true);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const finalText = `Hello, I'm a creative developer passionate about building unique digital experiences.
My work combines clean code with innovative design to create memorable user journeys.
Let's build something amazing together.`;

  // Store the total text length for progress calculation
  useEffect(() => {
    totalTextLength.current = finalText.length;
  }, [finalText]);

  const thinkingPhrases = [
    "Initializing system...",
    "Loading neural pathways...",
    "Analyzing design patterns...",
    "Generating creative response...",
    "Optimizing visual output...",
  ];

  // Simulate the LLM "thinking" about certain words
  const highlightRandomWord = () => {
    if (generatedText.length > 0) {
      const words = generatedText.split(/\s+/).filter(word => word.length > 0);
      if (words.length > 0) {
        const randomIndex = Math.floor(Math.random() * words.length);
        setHighlightedWords(prev => [...prev.slice(-4), randomIndex]);
        
        // Scroll to bottom of text container
        if (textContainerRef.current) {
          textContainerRef.current.scrollTop = textContainerRef.current.scrollHeight;
        }
      }
    }
  };

  // Play typing sound
  const playTypeSound = () => {
    if (audioRef.current && playTypingSound) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.error("Error playing sound:", e));
    }
  };

  useEffect(() => {
    audioRef.current = new Audio("/typing-sound.mp3");
    audioRef.current.volume = 0.15;
    
    const enableSound = () => {
      setPlayTypingSound(true);
      window.removeEventListener('click', enableSound);
    };
    window.addEventListener('click', enableSound);

    // Enhanced thinking animation with smoother transitions
    const thinkingInterval = setInterval(() => {
      if (thinking) {
        setThinkingTokens(() => {
          const randomPhrase = thinkingPhrases[Math.floor(Math.random() * thinkingPhrases.length)];
          return randomPhrase;
        });
      }
    }, 1200);

    // Improved text generation with dynamic timing
    setTimeout(() => {
      setThinking(false);
      setShowContentLoader(true);
      
      let currentIndex = 0;
      let lastTypingTime = Date.now();
      const totalLength = totalTextLength.current;
      
      const typeNextCharacter = () => {
        if (currentIndex < finalText.length) {
          const now = Date.now();
          const timeSinceLastType = now - lastTypingTime;
          
          // Dynamic typing speed based on punctuation and context
          const char = finalText[currentIndex];
          let delay = 40; // Base typing speed
          
          if ('.!?'.includes(char)) {
            delay = 400; // Longer pause after sentences
          } else if (',;:'.includes(char)) {
            delay = 200; // Medium pause after clauses
          } else if (' '.includes(char)) {
            delay = 60; // Slight pause between words
          }
          
          if (timeSinceLastType >= delay) {
            setGeneratedText(finalText.substring(0, currentIndex + 1));
            currentIndex++;
            setProgress((currentIndex / totalLength) * 100);
            playTypeSound();
            lastTypingTime = now;
          }
          
          requestAnimationFrame(typeNextCharacter);
        } else {
          setProgress(100);
          setTimeout(() => {
            router.push('/profile');
          }, 1000);
        }
      };
      
      requestAnimationFrame(typeNextCharacter);
    }, 2000);

    // Enhanced word highlighting
    const highlightInterval = setInterval(() => {
      if (generatedText.length > 0 && generatedText.length < finalText.length) {
        highlightRandomWord();
      }
    }, 600);

    // Smoother cursor blinking
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => {
      clearInterval(thinkingInterval);
      clearInterval(cursorInterval);
      clearInterval(highlightInterval);
      window.removeEventListener('click', enableSound);
    };
  }, [router]);

  // Function to render text with highlighted words
  const renderGeneratedText = () => {
    if (!generatedText) return null;
    
    const words = generatedText.split(/(\s+)/).filter(segment => segment.length > 0);
    let wordIndex = 0;
    
    return words.map((segment, index) => {
      // If it's a space, just render it
      if (/^\s+$/.test(segment)) {
        return <span key={index}>{segment}</span>;
      }
      
      // It's a word
      const isHighlighted = highlightedWords.includes(wordIndex);
      const wordElement = (
        <span 
          key={index} 
          className={`${isHighlighted ? 'bg-cyan-500/20 text-cyan-300' : ''} ${segment.startsWith('#') ? 'text-emerald-400' : ''} ${segment.includes('(') ? 'text-amber-300' : ''}`}
        >
          {segment}
        </span>
      );
      wordIndex++;
      return wordElement;
    });
  };

  // This page only includes the loading screen
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 relative overflow-hidden">
      {/* Creative background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Animated background elements - Only render on client side */}
      {animatedBubbles.length > 0 && (
        <div className="absolute inset-0 overflow-hidden">
          {animatedBubbles.map((bubble, i) => (
            <motion.div
              key={i}
              className="absolute bg-gradient-to-br from-cyan-500/5 to-emerald-500/5 rounded-full blur-xl"
              style={{
                width: `${bubble.width}px`,
                height: `${bubble.height}px`,
                left: `${bubble.left}%`,
                top: `${bubble.top}%`,
              }}
              initial={{ opacity: 0, scale: 0, rotate: bubble.rotation }}
              animate={{ 
                opacity: [0, 0.15, 0],
                scale: [0, 1, 1.5],
                x: [0, Math.floor(i % 2 === 0 ? 70 : -70)],
                y: [0, Math.floor(i % 2 === 0 ? 70 : -70)],
                rotate: [bubble.rotation, bubble.rotation + (i % 2 === 0 ? 45 : -45)],
              }}
              transition={{
                duration: 12 + (i % 12),
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}
      
      {/* Multiple glow effects for a more dynamic background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[100px] animate-pulse"></div>
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-emerald-500/5 blur-[80px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-teal-500/5 blur-[90px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      {/* Floating particles - Client-side only rendering */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: `rgba(34, 211, 238, ${particle.opacity})`,
              boxShadow: `0 0 ${particle.size * 2}px rgba(34, 211, 238, ${particle.opacity})`,
            }}
            animate={{
              y: [0, -particle.yOffset],
              x: [0, particle.xOffset],
              opacity: [0, particle.opacity, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      <div className="w-full max-w-2xl mx-auto relative z-10">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-emerald-500 mr-2 animate-pulse"></div>
              <span className="text-xs font-mono text-gray-400">live</span>
            </div>
            <button 
              onClick={() => {
                // Navigate to profile page after loading is complete
                router.push('/profile');
              }}
              className="text-xs font-mono text-gray-400 hover:text-white px-2 py-1 rounded border border-gray-700 hover:border-gray-500 transition-colors hover:bg-gray-800/50"
            >
              Skip Animation
            </button>
          </div>
          
          {/* Terminal with smooth entrance animation */}
          <motion.div 
            className="border border-gray-800 rounded-lg overflow-hidden bg-black/60 backdrop-blur-sm shadow-lg shadow-cyan-500/10 relative"
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: terminalVisible ? "auto" : 0, 
              opacity: terminalVisible ? 1 : 0,
            }}
            transition={{ 
              duration: 0.6, 
              ease: [0.16, 1, 0.3, 1], // Custom spring-like easing
              opacity: { delay: 0.1 }
            }}
          >
            <div className="p-6 relative overflow-hidden">
              {/* Subtle animated gradient border */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-emerald-500/10 to-cyan-500/10 opacity-30 pointer-events-none"></div>
              
              {/* Terminal-like header */}
              <motion.div 
                className="flex items-center justify-between mb-4 border-b border-gray-800 pb-2 relative z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
                <div className="text-xs font-mono opacity-70">terminal.tsx</div>
              </motion.div>
              
              {/* Thinking tokens */}
              <AnimatePresence>
                {thinking && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mb-4 font-mono text-gray-400 text-sm relative z-10"
                  >
                    <span className="text-cyan-400">$</span> {thinkingTokens}
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Generated text container with smooth entrance */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div 
                  ref={textContainerRef}
                  className="font-mono text-sm text-gray-200 min-h-[150px] max-h-[250px] overflow-y-auto px-4 py-3 bg-black/50 rounded border border-gray-800 relative z-10"
                >
                  {renderGeneratedText()}
                  {/* Blinking cursor */}
                  {showCursor && <span className="inline-block w-2 h-4 bg-cyan-400 ml-1"></span>}
                </div>
              </motion.div>
              
              {/* Progress bar - only show when content generation starts */}
              {showContentLoader && (
                <motion.div 
                  className="mt-6 relative z-10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-full bg-gray-800/80 rounded-full h-1.5 overflow-hidden backdrop-blur-sm">
                    <motion.div 
                      className="bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 h-1.5 rounded-full relative"
                      initial={{ width: "0%" }}
                      animate={{ width: `${progress}%` }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 100, 
                        damping: 30,
                        mass: 1
                      }}
                    >
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                    </motion.div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs font-mono text-gray-400">Generating content</span>
                    <span className="text-xs font-mono text-cyan-400">{Math.round(progress)}%</span>
                  </div>
                </motion.div>
              )}
              
              {/* Token usage simulation - only show when content generation starts */}
              {showContentLoader && (
                <motion.div 
                  className="mt-6 border-t border-gray-800/50 pt-3 relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="flex justify-between text-xs font-mono text-gray-500">
                    <span>Tokens used: <span className="text-cyan-400">{Math.round(progress * 0.75)}</span></span>
                    <span>Response time: <span className="text-cyan-400">{(progress * 0.05).toFixed(2)}s</span></span>
                  </div>
                </motion.div>
              )}
              
              {/* Simulated model thinking - only show when content generation starts */}
              {showContentLoader && !thinking && progress < 100 && (
                <motion.div 
                  className="mt-4 text-xs font-mono relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="flex flex-wrap gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.span 
                        key={i}
                        className="px-1 py-0.5 rounded bg-gray-800/80 text-gray-400 border border-gray-800/50 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        {["context", "token", "probability", "next", "sequence"][i]}:{" "}
                        <span className="text-cyan-400">{(0.5 + (i * 0.1)).toFixed(2)}</span>
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
        
        {/* Model info */}
        <div className="text-center">
          <motion.p 
            className="text-xs text-gray-500 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span className="pulse-effect inline-block text-cyan-500">●</span> Model: <span className="text-cyan-400 font-semibold">Lite Ultra</span> • Temperature: 0.7 • Max tokens: 1024
          </motion.p>
        </div>
      </div>
    </div>
  );
}
