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
  const [particles, setParticles] = useState<Array<{
    left: number, 
    top: number, 
    yOffset: number, 
    xOffset: number, 
    duration: number, 
    delay: number, 
    symbol: string, 
    size: number, 
    opacity: number,
    rotation: number,
    isVisible: boolean,
    layer: number,
    isPulsing: boolean,
    isHero: boolean
  }>>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const textContainerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const totalTextLength = useRef(0);

  // Track mouse position for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

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
    
    // Enhanced code symbols instead of particles
    const codeSymbols = [
      '{', '}', '()', '[]', '<>', '//', '/*', '*/', '=>', ';;',
      '%', 'legend ??', 'JEPA', '===', '!==', '++', '--', '&&', '||',
      '?.', '??', '₿', '+=', '-=', '*=', '/=', '^', 'ETH', '$$$'
    ];
    
    // Create depth layers - foreground, midground, background
    const particlesData = Array.from({ length: 60 }).map((_, i) => {
      // Determine if this is a "hero" symbol (larger, more prominent)
      const isHero = i < 3;
      
      // Layer determines z-index and movement characteristics
      const layer = isHero ? 1 : (Math.random() > 0.7 ? 2 : (Math.random() > 0.5 ? 1 : 0));
      
      // Scale values based on layer (foreground larger, background smaller)
      const sizeMultiplier = isHero ? 2.5 : (layer === 2 ? 1.2 : (layer === 1 ? 1 : 0.8));
      const opacityMultiplier = isHero ? 1 : (layer === 2 ? 0.9 : (layer === 1 ? 0.7 : 0.5));
      const speedMultiplier = isHero ? 0.7 : (layer === 2 ? 1 : (layer === 1 ? 1.3 : 1.8));
      
      return {
        left: Math.random() * 100,
        top: Math.random() * 100,
        yOffset: (Math.random() * 150 + 50) * speedMultiplier,
        xOffset: ((Math.random() - 0.5) * 100) * speedMultiplier,
        duration: (Math.random() * 15 + 10) / speedMultiplier,
        delay: Math.random() * 2,
        symbol: isHero ? codeSymbols[Math.floor(Math.random() * 5)] : codeSymbols[Math.floor(Math.random() * codeSymbols.length)],
        size: (Math.random() * 16 + 14) * sizeMultiplier,
        opacity: (Math.random() * 0.4 + 0.5) * opacityMultiplier,
        rotation: Math.random() * 180,
        isVisible: true,
        layer,
        isPulsing: Math.random() > 0.7, // Some symbols will pulse
        isHero
      };
    });
    setParticles(particlesData);
    
    // Smoother terminal appearance with spring animation
    const timer = setTimeout(() => {
      setTerminalVisible(true);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const sentences = [
    "Beep boop!",
    "You've arrived at Prag's digital space.",
    "Ready for the tour?"
  ];

  // Store the total text length for progress calculation
  useEffect(() => {
    totalTextLength.current = sentences.reduce((acc, sentence) => acc + sentence.length, 0); // No longer multiply by 2 since we don't count deletion
  }, []);

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

    // Improved text generation with dynamic timing and sentence-by-sentence display
    setTimeout(() => {
      setThinking(false);
      setShowContentLoader(true);
      
      let currentSentenceIndex = 0;
      let isDeleting = false;
      let currentText = "";
      let lastTypingTime = Date.now();
      const totalLength = totalTextLength.current;
      let progress = 0;
      
      const typeNextCharacter = () => {
        const now = Date.now();
        const timeSinceLastType = now - lastTypingTime;
        
        if (currentSentenceIndex < sentences.length) {
          const currentSentence = sentences[currentSentenceIndex];
          
          // Dynamic typing speed based on state and punctuation
          let delay = 40; // Base typing speed
          
          if (isDeleting) {
            delay = 30; // Faster when deleting
          } else if ('.!?'.includes(currentText[currentText.length - 1] || '')) {
            delay = 600; // Longer pause after sentences
          } else if (',;:'.includes(currentText[currentText.length - 1] || '')) {
            delay = 200; // Medium pause after clauses
          } else if (' '.includes(currentText[currentText.length - 1] || '')) {
            delay = 60; // Slight pause between words
          }
          
          if (timeSinceLastType >= delay) {
            if (!isDeleting) {
              // Typing
              if (currentText.length < currentSentence.length) {
                currentText = currentSentence.slice(0, currentText.length + 1);
                progress += 1; // Only increment progress during text generation
              } else {
                // Finished typing current sentence
                isDeleting = true;
                delay = 1000; // Pause before starting to delete
              }
            } else {
              // Deleting
              if (currentText.length > 0) {
                currentText = currentText.slice(0, -1);
                // Removed progress increment during deletion
              } else {
                // Finished deleting
                isDeleting = false;
                currentSentenceIndex++;
                if (currentSentenceIndex === sentences.length) {
                  setProgress(100);
                  setTimeout(() => {
                    router.push('/profile');
                  }, 1000);
                  return;
                }
                delay = 500; // Pause before next sentence
              }
            }
            
            setGeneratedText(currentText);
            setProgress((progress / totalLength) * 100);
            playTypeSound();
            lastTypingTime = now;
          }
          
          requestAnimationFrame(typeNextCharacter);
        }
      };
      
      requestAnimationFrame(typeNextCharacter);
    }, 2000);

    // Enhanced word highlighting
    const highlightInterval = setInterval(() => {
      if (generatedText.length > 0) {
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-foreground p-4 relative overflow-hidden">
      {/* Creative background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Animated noise effect */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="w-full h-full bg-noise-pattern animate-noise"></div>
      </div>
      
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-gradient-to-br from-cyan-500/15 via-emerald-500/10 to-purple-500/15 blur-[150px] animate-pulse"></div>
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-emerald-500/15 via-teal-500/10 to-blue-500/15 blur-[130px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-teal-500/15 via-cyan-500/10 to-indigo-500/15 blur-[140px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      {/* Floating code symbols with depth layers - Client-side only rendering */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-screen">
        {particles.map((particle, i) => {
          // Generate different colors for variety with smoother gradients
          const colors = [
            'rgba(34, 211, 238, 1)',  // bright cyan
            'rgba(52, 211, 153, 1)',  // emerald
            'rgba(124, 58, 237, 1)',  // violet
            'rgba(236, 72, 153, 1)',  // pink
            'rgba(14, 165, 233, 1)'   // sky blue
          ];
          const color = particle.isHero ? colors[i % colors.length] : colors[i % colors.length];
          
          // Calculate subtle movement based on mouse position for interactive effect
          const mouseXInfluence = particle.layer === 2 ? (mousePosition.x / window.innerWidth - 0.5) * 15 : 0;
          const mouseYInfluence = particle.layer === 2 ? (mousePosition.y / window.innerHeight - 0.5) * 15 : 0;
          
          return (
            <motion.div
              key={`code-symbol-${i}`}
              className={`absolute font-mono font-bold tracking-tight select-none`}
              initial={{ 
                opacity: 0.8,
                scale: 0.9,
                x: 0,
                y: 0
              }}
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                fontSize: `${particle.size}px`,
                color: color,
                textShadow: `
                  0 0 ${particle.size/2}px ${color},
                  0 0 ${particle.size}px ${color.replace('1)', '0.5)')},
                  0 0 ${particle.size*1.5}px ${color.replace('1)', '0.3)')}
                `,
                filter: `brightness(1.2) contrast(1.1) blur(${particle.layer === 0 ? '0.4px' : '0.2px'})`,
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
                WebkitFontSmoothing: 'antialiased',
                zIndex: particle.layer
              }}
              animate={{
                y: [0, -particle.yOffset + mouseYInfluence],
                x: [0, particle.xOffset + mouseXInfluence],
                opacity: particle.isVisible ? 
                  (particle.isPulsing ? [0.8 * particle.opacity, particle.opacity, 0.8 * particle.opacity] : [0.8, particle.opacity]) : 
                  [0.8, 0],
                scale: particle.isVisible ? 
                  (particle.isPulsing ? [0.9, 1.1, 0.9] : (particle.isHero ? [0.95, 1.15] : [0.9, 1.1])) : 
                  [0.9, 0],
                rotate: particle.rotation,
                filter: particle.isPulsing ? [
                  `brightness(1.2) contrast(1.1) blur(${particle.layer === 0 ? '0.4px' : '0.2px'})`,
                  `brightness(1.6) contrast(1.2) blur(${particle.layer === 0 ? '0.3px' : '0.1px'})`,
                  `brightness(1.2) contrast(1.1) blur(${particle.layer === 0 ? '0.4px' : '0.2px'})`
                ] : undefined
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: [0.4, 0, 0.2, 1], // Custom easing for smoother motion
                opacity: {
                  duration: particle.isPulsing ? particle.duration / 2 : particle.duration,
                  times: particle.isPulsing ? [0, 0.5, 1] : [0, 1],
                  ease: "easeInOut",
                  repeat: Infinity
                },
                scale: {
                  duration: particle.isPulsing ? particle.duration / 2 : particle.duration,
                  times: particle.isPulsing ? [0, 0.5, 1] : [0, 1],
                  ease: "easeInOut",
                  repeat: Infinity
                },
                rotate: {
                  duration: particle.duration * 1.5,
                  ease: "linear"
                },
                filter: particle.isPulsing ? {
                  duration: particle.duration / 2,
                  times: [0, 0.5, 1],
                  ease: "easeInOut",
                  repeat: Infinity
                } : undefined
              }}
            >
              {particle.symbol}
            </motion.div>
          );
        })}
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
                // Set all particles to fade out before navigation
                setParticles(prev => prev.map(p => ({ ...p, isVisible: false })));
                // Navigate after a short delay to allow fade out animation
                setTimeout(() => {
                  router.push('/profile');
                }, 300);
              }}
              className="text-xs font-mono text-gray-400 hover:text-white px-2 py-1 rounded border border-gray-700 hover:border-gray-500 transition-colors hover:bg-gray-800/50"
            >
              Skip Animation
            </button>
          </div>
          
          {/* Terminal with enhanced entrance animation and glow */}
          <motion.div 
            className="border border-gray-800 rounded-lg overflow-hidden bg-black/70 backdrop-blur-md relative"
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
            style={{
              boxShadow: `
                0 0 10px 0 rgba(34, 211, 238, 0.05),
                0 0 30px 0 rgba(34, 211, 238, 0.05),
                0 0 50px 0 rgba(34, 211, 238, 0.02)
              `
            }}
          >
            {/* Animated border glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 rounded-lg blur-sm opacity-50 group-hover:opacity-100 transition duration-1000 animate-gradient-xy"></div>
            
            <div className="p-6 relative overflow-hidden">
              {/* Subtle animated gradient border */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-emerald-500/10 to-cyan-500/10 opacity-30 pointer-events-none animate-gradient-x"></div>
              
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
                <div className="text-xs font-mono opacity-70">terminal.prag</div>
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