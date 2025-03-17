"use client";

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
  const [animatedBubbles, setAnimatedBubbles] = useState<Array<{width: number, height: number, left: number, top: number, rotation: number, scale: number, speed: number}>>([]);
  const [particles, setParticles] = useState<Array<{left: number, top: number, yOffset: number, xOffset: number, duration: number, delay: number, symbol: string, size: number, opacity: number, rotation: number, isVisible: boolean, layer: number, isPulsing: boolean, isHero: boolean}>>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const textContainerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const totalTextLength = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const bubbles = Array.from({ length: 20 }).map(() => ({
      width: Math.random() * 300 + 200,
      height: Math.random() * 300 + 200,
      left: Math.random() * 100,
      top: Math.random() * 100,
      rotation: Math.random() * 180,
      scale: Math.random() * 0.5 + 0.75,
      speed: Math.random() * 0.5 + 0.75
    }));
    setAnimatedBubbles(bubbles);
    
    const codeSymbols = ['{', '}', '()', '[]', '<>', '=>', '++', '--', '&&', '||'];
    
    const particlesData = Array.from({ length: 25 }).map((_, i) => {
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
        size: (Math.random() * 12 + 12) * sizeMultiplier,
        opacity: (Math.random() * 0.2 + 0.4) * opacityMultiplier,
        rotation: Math.random() * 40 - 20,
        layer,
        isHero,
        isVisible: true,
        isPulsing: isHero
      };
    });
    setParticles(particlesData);
    
    const timer = setTimeout(() => setTerminalVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const sentences = [
    "Beep boop Beep boop!",
    "You've arrived at Prag's digital space.",
    "Ready for the tour?"
  ];

  useEffect(() => {
    totalTextLength.current = sentences.reduce((acc, sentence) => acc + sentence.length, 0);
  }, []);

  const thinkingPhrases = [
    "Initializing system...",
    "Loading neural pathways...",
    "Analyzing design patterns...",
    "Generating creative response...",
    "Optimizing visual output...",
  ];

  const highlightRandomWord = () => {
    if (generatedText.length > 0) {
      const words = generatedText.split(/\s+/).filter(word => word.length > 0);
      if (words.length > 0) {
        setHighlightedWords(prev => [...prev.slice(-4), Math.floor(Math.random() * words.length)]);
        if (textContainerRef.current) {
          textContainerRef.current.scrollTop = textContainerRef.current.scrollHeight;
        }
      }
    }
  };

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

    const thinkingInterval = setInterval(() => {
      if (thinking) {
        setThinkingTokens(thinkingPhrases[Math.floor(Math.random() * thinkingPhrases.length)]);
      }
    }, 1200);

    setTimeout(() => {
      setThinking(false);
      setShowContentLoader(true);
      
      let currentSentenceIndex = 0;
      let isDeleting = false;
      let currentText = "";
      let lastTypingTime = Date.now();
      let progress = 0;
      
      const typeNextCharacter = () => {
        const now = Date.now();
        const timeSinceLastType = now - lastTypingTime;
        
        if (currentSentenceIndex < sentences.length) {
          const currentSentence = sentences[currentSentenceIndex];
          let delay = 40;
          
          if (isDeleting) delay = 30;
          else if ('.!?'.includes(currentText[currentText.length - 1] || '')) delay = 600;
          else if (',;:'.includes(currentText[currentText.length - 1] || '')) delay = 200;
          else if (' '.includes(currentText[currentText.length - 1] || '')) delay = 60;
          
          if (timeSinceLastType >= delay) {
            if (!isDeleting) {
              if (currentText.length < currentSentence.length) {
                currentText = currentSentence.slice(0, currentText.length + 1);
                progress += 1;
              } else {
                isDeleting = true;
                delay = 1000;
              }
            } else {
              if (currentText.length > 0) {
                currentText = currentText.slice(0, -1);
              } else {
                isDeleting = false;
                currentSentenceIndex++;
                if (currentSentenceIndex === sentences.length) {
                  setProgress(100);
                  setTimeout(() => router.push('/profile'), 1000);
                  return;
                }
                delay = 500;
              }
            }
            
            setGeneratedText(currentText);
            setProgress((progress / totalTextLength.current) * 100);
            playTypeSound();
            lastTypingTime = now;
          }
          
          requestAnimationFrame(typeNextCharacter);
        }
      };
      
      requestAnimationFrame(typeNextCharacter);
    }, 2000);

    const highlightInterval = setInterval(() => {
      if (generatedText.length > 0) highlightRandomWord();
    }, 600);

    const cursorInterval = setInterval(() => setShowCursor(prev => !prev), 530);

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
      <div className="absolute inset-0 bg-grid-pattern opacity-8"></div>
      
      {/* Animated noise effect */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <div className="w-full h-full bg-noise-pattern animate-noise"></div>
      </div>
      
      {/* Animated background elements - Only render on client side */}
      {animatedBubbles.length > 0 && (
        <div className="absolute inset-0 overflow-hidden">
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
      
      {/* Multiple glow effects for a more dynamic background */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{
          willChange: 'transform',
          transform: 'translate3d(0,0,0)'
        }}
      >
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full bg-gradient-to-br from-cyan-500/30 via-emerald-500/25 to-purple-500/30 blur-[130px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute top-1/3 left-1/4 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-emerald-500/30 via-teal-500/25 to-blue-500/30 blur-[120px]"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.8, 1, 0.8],
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
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.8, 1, 0.8],
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
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.8, 1, 0.8],
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
        className="absolute inset-0 opacity-[0.2] mix-blend-overlay pointer-events-none bg-noise-pattern"
        style={{
          backgroundSize: '256px 256px',
          willChange: 'transform',
          animation: 'noise 8s steps(8) infinite'
        }}
      />
      
      {/* Floating code symbols with depth layers - Client-side only rendering */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ perspective: '1200px' }}>
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
          
          // Reduced mouse influence for more stability but still interactive
          const mouseXInfluence = particle.layer === 1 ? (mousePosition.x / window.innerWidth - 0.5) * 2.5 : 0;
          const mouseYInfluence = particle.layer === 1 ? (mousePosition.y / window.innerHeight - 0.5) * 2.5 : 0;
          
          // Calculate staggered animation start times based on position
          // This creates a wave-like effect in the animation
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
                  ease: [0.4, 0.0, 0.6, 1.0], // Custom cubic bezier for smoother rotation
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
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-cyan-500/30 rounded-lg blur-sm opacity-70 group-hover:opacity-100 transition duration-1000 animate-gradient-xy"></div>
            
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
                  <div className="flex items-center justify-center">
                    <motion.div 
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-900/70 backdrop-blur-sm rounded-full border border-gray-800 shadow-lg"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <span className="pulse-effect inline-block text-cyan-500 animate-pulse">●</span>
                      <span className="text-xs text-gray-400 font-mono">Model: <span className="text-cyan-400 font-semibold">Lite Ultra</span></span>
                      <span className="h-3 w-px bg-gray-700"></span>
                      <span className="text-xs text-gray-400 font-mono">Temperature: 
                        <motion.span 
                          className="text-cyan-400 font-semibold ml-1 inline-block" 
                          style={{ textShadow: '0 0 8px rgba(34, 211, 238, 0.5)' }}
                          whileHover={{ scale: 1.1 }}
                          animate={{ 
                            opacity: [0.85, 1, 0.85],
                            textShadow: [
                              '0 0 8px rgba(34, 211, 238, 0.3)',
                              '0 0 12px rgba(34, 211, 238, 0.6)',
                              '0 0 8px rgba(34, 211, 238, 0.3)'
                            ]
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            ease: "easeInOut" 
                          }}
                        >
                          0.7
                        </motion.span>
                      </span>
                      <span className="h-3 w-px bg-gray-700"></span>
                      <span className="text-xs text-gray-400 font-mono">Max tokens: 
                        <motion.span 
                          className="text-cyan-400 font-semibold ml-1 inline-block" 
                          style={{ textShadow: '0 0 8px rgba(34, 211, 238, 0.5)' }}
                          whileHover={{ scale: 1.1 }}
                          animate={{ 
                            opacity: [0.85, 1, 0.85],
                            textShadow: [
                              '0 0 8px rgba(34, 211, 238, 0.3)',
                              '0 0 12px rgba(34, 211, 238, 0.6)',
                              '0 0 8px rgba(34, 211, 238, 0.3)'
                            ]
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5 // Offset animation from temperature
                          }}
                        >
                          1024
                        </motion.span>
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}