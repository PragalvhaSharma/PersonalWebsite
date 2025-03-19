"use client";

import React, { useState, useEffect, useRef, RefObject } from "react";
import { motion, AnimatePresence } from "framer-motion";

// TerminalContent Component
interface TerminalContentProps {
  generatedText: string;
  showCursor: boolean;
  textContainerRef: RefObject<HTMLDivElement | null>;
}

function TerminalContent({ 
  generatedText, 
  showCursor, 
  textContainerRef 
}: TerminalContentProps) {
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
}

// ProgressBar Component
interface ProgressBarProps {
  progress: number;
}

function ProgressBar({ progress }: ProgressBarProps) {
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
            type: "spring", 
            stiffness: 70, 
            damping: 20,
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
}

// ModelInfo Component
function ModelInfo() {
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
          <span className="h-3 w-px bg-gray-700"></span>
          <span className="text-xs text-gray-400 font-mono">Tokenizer: 
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
                delay: 1.0 // Further offset animation
              }}
            >
              o200k_base
            </motion.span>
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Main Terminal Component
interface TerminalProps {
  onComplete: () => void;
}

export default function Terminal({ onComplete }: TerminalProps) {
  const [terminalVisible, setTerminalVisible] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [thinking, setThinking] = useState(true);
  const [thinkingTokens, setThinkingTokens] = useState("");
  const [progress, setProgress] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [playTypingSound, setPlayTypingSound] = useState(false);
  const [showContentLoader, setShowContentLoader] = useState(false);
  const textContainerRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const totalTextLength = useRef(0);

  const sentences = [
    "Beep boop Beep boop!",
    "You've arrived at Prag's digital space.",
    "Ready for the tour?"
  ];

  const thinkingPhrases = [
    "Initializing system...",
    "Loading neural pathways...",
    "Analyzing design patterns...",
    "Generating creative response...",
    "Optimizing visual output...",
  ];

  useEffect(() => {
    totalTextLength.current = sentences.reduce((acc, sentence) => acc + sentence.length, 0);
    
    const timer = setTimeout(() => setTerminalVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

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
                if (currentSentenceIndex === sentences.length - 1) {
                  setProgress(100);
                  onComplete();
                  return;
                }
                isDeleting = true;
                delay = 1000;
              }
            } else {
              if (currentText.length > 0) {
                currentText = currentText.slice(0, -1);
              } else {
                isDeleting = false;
                currentSentenceIndex++;
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

    const cursorInterval = setInterval(() => setShowCursor(prev => !prev), 530);

    return () => {
      clearInterval(thinkingInterval);
      clearInterval(cursorInterval);
      window.removeEventListener('click', enableSound);
    };
  }, [onComplete]);

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