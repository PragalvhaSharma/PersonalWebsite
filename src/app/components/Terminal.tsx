"use client";

import React, { useState, useEffect, useRef, RefObject, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// TerminalContent Component - Memoized to prevent unnecessary re-renders
interface TerminalContentProps {
  generatedText: string;
  showCursor: boolean;
  textContainerRef: RefObject<HTMLDivElement | null>;
}

const TerminalContent = React.memo(({ 
  generatedText, 
  showCursor, 
  textContainerRef 
}: TerminalContentProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div 
        ref={textContainerRef}
        className="font-mono text-sm text-gray-200 h-[150px] bg-black/50 rounded border border-gray-800 relative z-10 overflow-hidden"
      >
        <div 
          className="absolute top-3 left-4 right-4" 
          style={{ 
            position: 'absolute',
            top: '12px',
            left: '16px',
            right: '16px',
            transform: 'translateZ(0)',
            willChange: 'transform'
          }}
        >
          <span>{generatedText}</span>
          {showCursor && <span className="inline-block w-2 h-4 bg-cyan-400 ml-1" style={{verticalAlign: 'middle'}}></span>}
        </div>
      </div>
    </motion.div>
  );
});

TerminalContent.displayName = 'TerminalContent';

// ProgressBar Component - Memoized to prevent unnecessary re-renders
interface ProgressBarProps {
  progress: number;
}

const ProgressBar = React.memo(({ progress }: ProgressBarProps) => {
  return (
    <motion.div 
      className="mt-6 relative z-10"
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ 
        duration: 0.7, 
        ease: [0.16, 1, 0.3, 1],
        exit: { duration: 0.5 }
      }}
    >
      <div className="w-full bg-gray-800/80 rounded-full h-1.5 overflow-hidden backdrop-blur-sm">
        <motion.div 
          className="bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 h-1.5 rounded-full relative"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ 
            type: "tween", 
            duration: 0.3,
            ease: "easeOut"
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
      
      {/* Token usage simulation */}
      <motion.div 
        className="mt-6 border-t border-gray-800/50 pt-3 relative z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ 
          duration: 0.6, 
          delay: 0.2,
          ease: "easeOut",
          exit: { duration: 0.4, delay: 0 }
        }}
      >
        <div className="flex justify-between text-xs font-mono text-gray-500">
          <span>Tokens used: <span className="text-cyan-400">{Math.round(progress * 0.75)}</span></span>
          <span>Response time: <span className="text-cyan-400">{(progress * 0.05).toFixed(2)}s</span></span>
        </div>
      </motion.div>
    </motion.div>
  );
});

ProgressBar.displayName = 'ProgressBar';

// ModelInfo Component - Memoized to prevent unnecessary re-renders
const ModelInfo = React.memo(() => {
  return (
    <motion.div 
      className="mt-4 text-xs font-mono relative z-10"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ 
        duration: 0.6, 
        delay: 0.3, 
        ease: [0.16, 1, 0.3, 1],
        exit: { duration: 0.5, delay: 0.1 }
      }}
    >
      <div className="flex items-center justify-center">
        <motion.div 
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-900/70 backdrop-blur-sm rounded-full border border-gray-800 shadow-lg"
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -5 }}
          transition={{ 
            duration: 0.6, 
            ease: "easeOut",
            exit: { duration: 0.5 }
          }}
        >
          <span className="pulse-effect inline-block text-cyan-500 animate-pulse">●</span>
          <span className="text-xs text-gray-400 font-mono">Model: <span className="text-cyan-400 font-semibold">Lite Ultra</span></span>
          <span className="h-3 w-px bg-gray-700"></span>
          
          {/* Simplified animations to improve performance */}
          <span className="text-xs text-gray-400 font-mono">Temperature: 
            <span className="text-cyan-400 font-semibold ml-1 inline-block">0.7</span>
          </span>
          <span className="h-3 w-px bg-gray-700"></span>
          <span className="text-xs text-gray-400 font-mono">Max tokens: 
            <span className="text-cyan-400 font-semibold ml-1 inline-block">1024</span>
          </span>
          <span className="h-3 w-px bg-gray-700"></span>
          <span className="text-xs text-gray-400 font-mono">Tokenizer: 
            <span className="text-cyan-400 font-semibold ml-1 inline-block">o200k_base</span>
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
});

ModelInfo.displayName = 'ModelInfo';

// Main Terminal Component
interface TerminalProps {
  onComplete: () => void;
}

export default function Terminal({ onComplete }: TerminalProps) {
  const [terminalVisible, setTerminalVisible] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [thinking, setThinking] = useState(true);
  const [thinkingTokens, setThinkingTokens] = useState("Initializing system...");
  const [progress, setProgress] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [playTypingSound, setPlayTypingSound] = useState(false);
  const [showContentLoader, setShowContentLoader] = useState(false);
  const textContainerRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastUpdateTimeRef = useRef<number>(0);
  const typingStateRef = useRef({
    currentSentenceIndex: 0,
    isDeleting: false,
    currentText: "",
    progress: 0,
    lastTypingTime: 0
  });

  // Memoize sentences to prevent recreating on each render
  const sentences = useMemo(() => [
    "Beep boop Beep boop!",
    "You've arrived at Prag's digital space.",
    "Ready for the tour?"
  ], []);

  const thinkingPhrases = useMemo(() => [
    "Initializing system...",
    "Loading neural pathways...",
    "Analyzing design patterns...",
    "Generating creative response...",
    "Optimizing visual output...",
  ], []);

  // Calculate total text length only once
  const totalTextLength = useMemo(() => 
    sentences.reduce((acc, sentence) => acc + sentence.length, 0),
  [sentences]);

  // Optimized audio playing logic with throttling
  const playTypeSound = () => {
    if (!audioRef.current || !playTypingSound) return;
    
    const now = Date.now();
    // Only play sound at most every 40ms to prevent audio stacking
    if (now - lastUpdateTimeRef.current > 40) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.error("Error playing sound:", e));
      lastUpdateTimeRef.current = now;
    }
  };

  // Simple typing animation - falls back to this if RAF approach fails
  const startSimpleTypingAnimation = () => {
    let sentenceIndex = 0;
    let charIndex = 0;
    let totalProgress = 0;
    
    const typeChar = () => {
      if (sentenceIndex < sentences.length) {
        const sentence = sentences[sentenceIndex];
        
        if (charIndex <= sentence.length) {
          setGeneratedText(sentence.substring(0, charIndex));
          charIndex++;
          totalProgress++;
          setProgress((totalProgress / totalTextLength) * 100);
          
          // Random typing speed between 40-80ms
          setTimeout(typeChar, Math.floor(Math.random() * 40) + 40);
        } else {
          // Move to next sentence after a pause
          setTimeout(() => {
            sentenceIndex++;
            charIndex = 0;
            if (sentenceIndex >= sentences.length) {
              setProgress(100);
              setTimeout(() => onComplete(), 500);
            } else {
              typeChar();
            }
          }, 1000);
        }
      }
    };
    
    typeChar();
  };

  useEffect(() => {
    // Initial setup
    const timer = setTimeout(() => setTerminalVisible(true), 600);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Audio setup
    audioRef.current = new Audio("/typing-sound.mp3");
    audioRef.current.volume = 0.15;
    
    const enableSound = () => {
      setPlayTypingSound(true);
      window.removeEventListener('click', enableSound);
    };
    window.addEventListener('click', enableSound);

    // Thinking animation with reduced frequency
    const thinkingInterval = setInterval(() => {
      if (thinking) {
        setThinkingTokens(thinkingPhrases[Math.floor(Math.random() * thinkingPhrases.length)]);
      }
    }, 1200);

    // Cursor blinking
    const cursorInterval = setInterval(() => setShowCursor(prev => !prev), 530);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      clearInterval(thinkingInterval);
      clearInterval(cursorInterval);
      window.removeEventListener('click', enableSound);
    };
  }, [thinkingPhrases, thinking]);

  // Separate useEffect for starting animation sequence
  useEffect(() => {
    // Start animation after initial delay - shorter delay for better UX
    const animationTimer = setTimeout(() => {
      setThinking(false);
      setShowContentLoader(true);
      
      try {
        // Initialize state for typing animation
        typingStateRef.current = {
          currentSentenceIndex: 0,
          isDeleting: false,
          currentText: "",
          progress: 0,
          lastTypingTime: Date.now()
        };
        
        // Optimized animation function that batches state updates
        const typeNextCharacter = () => {
          const state = typingStateRef.current;
          const now = Date.now();
          const timeSinceLastType = now - state.lastTypingTime;
          
          if (state.currentSentenceIndex < sentences.length) {
            const currentSentence = sentences[state.currentSentenceIndex];
            let delay = 40;
            
            // Determine delay based on character context
            if (state.isDeleting) delay = 30;
            else if ('.!?'.includes(state.currentText[state.currentText.length - 1] || '')) delay = 600;
            else if (',;:'.includes(state.currentText[state.currentText.length - 1] || '')) delay = 200;
            else if (' '.includes(state.currentText[state.currentText.length - 1] || '')) delay = 60;
            
            // Process typing logic
            if (timeSinceLastType >= delay) {
              let shouldUpdateState = false;
              
              if (!state.isDeleting) {
                if (state.currentText.length < currentSentence.length) {
                  state.currentText = currentSentence.slice(0, state.currentText.length + 1);
                  state.progress += 1;
                  shouldUpdateState = true;
                } else {
                  if (state.currentSentenceIndex === sentences.length - 1) {
                    // Complete animation
                    setProgress(100);
                    onComplete();
                    return;
                  }
                  state.isDeleting = true;
                  delay = 1000;
                }
              } else {
                if (state.currentText.length > 0) {
                  state.currentText = state.currentText.slice(0, -1);
                  shouldUpdateState = true;
                } else {
                  state.isDeleting = false;
                  state.currentSentenceIndex++;
                  delay = 500;
                }
              }
              
              // Batch state updates for better performance
              if (shouldUpdateState) {
                setGeneratedText(state.currentText);
                setProgress((state.progress / totalTextLength) * 100);
                // Only play sound occasionally to reduce load
                if (Math.random() > 0.7) {
                  playTypeSound();
                }
              }
              
              state.lastTypingTime = now;
            }
            
            // Continue animation loop
            animationFrameRef.current = requestAnimationFrame(typeNextCharacter);
          }
        };
        
        // Start animation loop
        animationFrameRef.current = requestAnimationFrame(typeNextCharacter);
        
        // Fallback if animation doesn't start within 500ms
        setTimeout(() => {
          if (generatedText.length <= 1) {
            // Cancel RAF and use simpler approach
            if (animationFrameRef.current) {
              cancelAnimationFrame(animationFrameRef.current);
            }
            startSimpleTypingAnimation();
          }
        }, 500);
      } catch (error) {
        console.error("Animation error, using fallback:", error);
        startSimpleTypingAnimation();
      }
    }, 1500); // Reduced to 1500ms from 2000ms

    return () => {
      clearTimeout(animationTimer);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [sentences, totalTextLength, onComplete]);

  return (
    <div className="w-full max-w-2xl mx-auto relative z-10">
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-emerald-500 mr-2 animate-pulse"></div>
            <span className="text-xs font-mono text-gray-400">live</span>
          </div>
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
            ease: [0.16, 1, 0.3, 1], 
            opacity: { delay: 0.1 }
          }}
          style={{
            boxShadow: `
              0 0 10px 0 rgba(34, 211, 238, 0.05),
              0 0 30px 0 rgba(34, 211, 238, 0.05)
            `
          }}
        >
          {/* Simplified animated border to reduce GPU load */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg blur-sm opacity-60"></div>
          
          <div className="p-6 relative overflow-hidden">
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
            
            {/* Terminal content component */}
            <TerminalContent 
              generatedText={generatedText} 
              showCursor={showCursor} 
              textContainerRef={textContainerRef} 
            />
            
            {/* Fixed height container for progress bar and model info to prevent layout shifts */}
            <div className="min-h-[140px]">
              {/* Progress bar - only show when content generation starts */}
              <AnimatePresence mode="popLayout">
                {showContentLoader && (
                  <ProgressBar progress={progress} />
                )}
              </AnimatePresence>
              
              {/* Model info - only show when content generation starts */}
              <AnimatePresence mode="popLayout">
                {showContentLoader && !thinking && progress < 100 && (
                  <ModelInfo />
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
} 