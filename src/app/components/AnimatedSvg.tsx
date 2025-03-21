"use client";

import { useRef, useEffect } from 'react';

// Define a more specific type for SVG animation elements
interface SVGAnimationElement extends SVGElement {
  beginElement(): void;
}

export default function AnimatedSvg() {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    // Function to ensure animations restart properly for looping
    const restartAnimations = () => {
      const animatedElements = svgRef.current?.querySelectorAll('animate, animateTransform, animateMotion');
      animatedElements?.forEach(el => {
        // Cast to our interface that includes beginElement
        (el as SVGAnimationElement).beginElement();
      });
    };

    // Handle animation end to ensure proper looping
    const handleAnimEnd = (e: Event) => {
      const target = e.target as SVGElement;
      if (target.getAttributeNS(null, 'repeatCount') !== 'indefinite') {
        restartAnimations();
      }
    };
    
    // Add event listeners for animation completion
    const animatedElements = svgRef.current?.querySelectorAll('animate, animateTransform, animateMotion');
    animatedElements?.forEach(el => {
      el.addEventListener('endEvent', handleAnimEnd);
    });
    
    return () => {
      // Clean up event listeners
      animatedElements?.forEach(el => {
        el.removeEventListener('endEvent', handleAnimEnd);
      });
    };
  }, []);

  return (
    <div className="w-full h-full fixed inset-0 overflow-hidden pointer-events-none bg-[#050510]">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Define gradients with enhanced tech-inspired colors */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 222, 255, 0.15)" />
            <stop offset="50%" stopColor="rgba(0, 136, 119, 0.1)" />
            <stop offset="100%" stopColor="rgba(105, 0, 204, 0.15)" />
            <animate attributeName="x1" values="0%;100%;0%" dur="10s" repeatCount="indefinite" />
            <animate attributeName="y1" values="0%;100%;0%" dur="12s" repeatCount="indefinite" />
            <animate attributeName="x2" values="100%;0%;100%" dur="11s" repeatCount="indefinite" />
            <animate attributeName="y2" values="100%;0%;100%" dur="11.5s" repeatCount="indefinite" />
          </linearGradient>
          
          <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(158, 0, 170, 0.15)" />
            <stop offset="50%" stopColor="rgba(0, 69, 158, 0.1)" />
            <stop offset="100%" stopColor="rgba(0, 151, 132, 0.15)" />
            <animate attributeName="x1" values="100%;0%;100%" dur="9s" repeatCount="indefinite" />
            <animate attributeName="y1" values="0%;100%;0%" dur="12s" repeatCount="indefinite" />
            <animate attributeName="x2" values="0%;100%;0%" dur="10.5s" repeatCount="indefinite" />
            <animate attributeName="y2" values="100%;0%;100%" dur="9.5s" repeatCount="indefinite" />
          </linearGradient>
          
          {/* Create filter for glow effect - enhanced glow */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="techGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feFlood floodColor="#00DDFF" floodOpacity="0.5" result="glowColor" />
            <feComposite in="glowColor" in2="blur" operator="in" result="softGlow" />
            <feComposite in="softGlow" in2="SourceGraphic" operator="over" />
          </filter>
          
          {/* More pronounced noise pattern for tech feel */}
          <filter id="noise" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" seed="5" />
            <feColorMatrix type="matrix" values="0 0 0 0 0
                                                0 0 0 0 0.7
                                                0 0 0 0 1
                                                0 0 0 0.05 0" />
          </filter>

          <filter id="scanlines" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.06 0.5" numOctaves="1" seed="1" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="0 0 0 0 0
                                                0 0 0 0 0.7
                                                0 0 0 0 1
                                                0 0 0 0.03 0" />
          </filter>
          
          {/* Grid pattern for tech feel */}
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="none" />
            <path d="M 40 0 L 0 0 0 40" stroke="rgba(0, 222, 255, 0.07)" fill="none" strokeWidth="0.5" />
            <path d="M 0 0 L 40 0 40 40" stroke="rgba(0, 222, 255, 0.05)" fill="none" strokeWidth="0.5" />
          </pattern>
          
          {/* Enhanced digital circuit pattern */}
          <pattern id="circuit" width="200" height="200" patternUnits="userSpaceOnUse">
            <rect width="200" height="200" fill="none" />
            <path d="M10,10 L50,10 L50,50 L90,50 L90,90 L130,90 L130,130 L170,130 L170,170" 
                  stroke="rgba(0, 222, 255, 0.1)" strokeWidth="1" fill="none" />
            <path d="M190,10 L150,10 L150,50 L110,50 L110,90 L70,90 L70,130 L30,130 L30,170" 
                  stroke="rgba(0, 184, 222, 0.08)" strokeWidth="1" fill="none" />
            <path d="M10,190 L10,150 L50,150 L50,110 L90,110 L90,70 L130,70 L130,30 L170,30"
                  stroke="rgba(0, 149, 255, 0.08)" strokeWidth="1" fill="none" />
          </pattern>

          {/* Hexagonal pattern for tech feel */}
          <pattern id="hexGrid" width="60" height="104" patternUnits="userSpaceOnUse" patternTransform="scale(0.5)">
            <path d="M0,26 L30,0 L90,0 L120,26 L120,78 L90,104 L30,104 L0,78 Z" 
                 stroke="rgba(0, 222, 255, 0.05)" fill="none" transform="translate(-30, 0)" />
            <path d="M0,26 L30,0 L90,0 L120,26 L120,78 L90,104 L30,104 L0,78 Z" 
                 stroke="rgba(0, 222, 255, 0.05)" fill="none" transform="translate(30, 52)" />
          </pattern>
        </defs>
        
        {/* Background base */}
        <rect x="0" y="0" width="100%" height="100%" fill="#050510" />
        
        {/* Tech background elements - in order of depth */}
        <rect x="0" y="0" width="100%" height="100%" fill="url(#hexGrid)" opacity="0.5" />
        <rect x="0" y="0" width="100%" height="100%" fill="url(#grid)" opacity="0.5" />
        <rect x="0" y="0" width="100%" height="100%" fill="url(#circuit)" opacity="0.7" />
        <rect x="0" y="0" width="100%" height="100%" filter="url(#scanlines)" opacity="0.3" />
        
        {/* Digital pulse lines for tech feel - enhanced */}
        <g className="digital-lines">
          {[...Array(10)].map((_, index) => {
            const y = 100 + index * 100;
            const duration = 8 + index;
            const delay = index * 0.7;
            
            return (
              <g key={`line-${index}`} opacity="0.4">
                <line 
                  x1="0" 
                  y1={y} 
                  x2="1000" 
                  y2={y} 
                  stroke="rgba(0, 222, 255, 0.3)" 
                  strokeWidth="1"
                  strokeDasharray="5,15,30,15,10,5" 
                >
                  <animate 
                    attributeName="stroke-dashoffset" 
                    from="0" 
                    to="80" 
                    dur={`${duration/2}s`} 
                    begin={`${delay/2}s`}
                    repeatCount="indefinite" 
                  />
                  <animate 
                    attributeName="opacity" 
                    values="0.3;0.5;0.3" 
                    dur={`${duration * 0.25}s`} 
                    begin={`${delay/2}s`}
                    repeatCount="indefinite" 
                  />
                </line>
                {index % 2 === 0 && (
                  <line 
                    x1="0" 
                    y1={y+2} 
                    x2="1000" 
                    y2={y+2} 
                    stroke="rgba(0, 222, 255, 0.15)" 
                    strokeWidth="1"
                    strokeDasharray="10,15" 
                  >
                    <animate 
                      attributeName="stroke-dashoffset" 
                      from="0" 
                      to="-80" 
                      dur={`${duration * 0.6}s`} 
                      begin={`${delay/2 + 0.25}s`}
                      repeatCount="indefinite" 
                    />
                  </line>
                )}
              </g>
            );
          })}
        </g>
        
        {/* Vertical tech lines */}
        <g className="vertical-lines">
          {[...Array(10)].map((_, index) => {
            const x = 100 + index * 100;
            const duration = 10 + index % 3;
            const delay = index * 0.5;
            
            return (
              <g key={`vline-${index}`} opacity="0.3">
                <line 
                  x1={x} 
                  y1="0" 
                  x2={x} 
                  y2="1000" 
                  stroke="rgba(0, 222, 255, 0.2)" 
                  strokeWidth="1"
                  strokeDasharray="15,25" 
                >
                  <animate 
                    attributeName="stroke-dashoffset" 
                    from="0" 
                    to="100" 
                    dur={`${duration/2}s`} 
                    begin={`${delay/2}s`}
                    repeatCount="indefinite" 
                  />
                </line>
              </g>
            );
          })}
        </g>
        
        {/* Floating code symbols - enhanced tech symbols */}
        <g className="code-symbols">
          {["{}","<>","()","[]","=>","||","+=","/=","++","--","&&","0x","$_","#!","/*","*/","fn","::","..",">>"].map((symbol, index) => {
            const x = 200 + (index * 80) % 600;
            const y = 1000 + (index * 50);
            const duration = 15 + (index % 5);
            const delay = index * 0.5;
            const size = 14 + (index % 4) * 2;
            const rotate = index % 2 === 0 ? "20" : "-20";
            
            return (
              <g key={index} opacity="0">
                <text 
                  x={x} 
                  y={y} 
                  fontFamily="monospace" 
                  fontSize={size} 
                  fill={`rgba(0, ${200 + index * 5}, ${240 - index * 5}, 0.85)`}
                  filter="url(#techGlow)"
                  textAnchor="middle"
                >
                  {symbol}
                  
                  <animate 
                    attributeName="y" 
                    from={y} 
                    to={y - 800} 
                    dur={`${duration/2}s`} 
                    begin={`${delay/2}s`}
                    repeatCount="indefinite" 
                    calcMode="spline"
                    keySplines="0.4 0 0.6 1" 
                  />
                  
                  <animate 
                    attributeName="x" 
                    from={x} 
                    to={x + (index % 2 === 0 ? 50 : -50)} 
                    dur={`${duration * 0.6}s`} 
                    begin={`${delay/2}s`}
                    repeatCount="indefinite" 
                    calcMode="spline"
                    keySplines="0.4 0 0.6 1" 
                  />
                  
                  <animate 
                    attributeName="opacity" 
                    values="0;0.85;0.85;0" 
                    keyTimes="0;0.1;0.9;1"
                    dur={`${duration/2}s`} 
                    begin={`${delay/2}s`}
                    repeatCount="indefinite" 
                  />
                  
                  <animateTransform 
                    attributeName="transform"
                    type="rotate"
                    from="0"
                    to={rotate}
                    dur={`${duration * 0.75}s`}
                    begin={`${delay/2}s`}
                    repeatCount="indefinite"
                    additive="sum"
                  />
                </text>
              </g>
            );
          })}
        </g>
        
        {/* Binary data visuals for tech theme - enhanced */}
        <g className="binary-data">
          {[...Array(30)].map((_, index) => {
            const x = 30 + (index * 40) % 950;
            const y = 60 + Math.floor((index * 40) / 950) * 50;
            const binary = index % 8 === 0 ? "01" : index % 5 === 0 ? "10" : Math.random() > 0.5 ? "1" : "0";
            const delay = index * 0.2;
            const duration = 2 + (index % 5);
            
            return (
              <text 
                key={`binary-${index}`}
                x={x}
                y={y}
                fontFamily="monospace"
                fontSize="10"
                fill={`rgba(0, ${200 + index % 50}, 255, 0.3)`}
                opacity="0"
              >
                {binary}
                <animate
                  attributeName="opacity"
                  values="0;0.3;0"
                  dur={`${duration/2}s`}
                  begin={`${delay/2}s`}
                  repeatCount="indefinite"
                />
              </text>
            );
          })}
        </g>

        {/* Digital edge highlights */}
        <g className="edge-highlights">
          <line x1="0" y1="0" x2="1000" y2="0" stroke="rgba(0, 222, 255, 0.5)" strokeWidth="1.5" />
          <line x1="0" y1="0" x2="0" y2="1000" stroke="rgba(0, 222, 255, 0.5)" strokeWidth="1.5" />
          <line x1="1000" y1="0" x2="1000" y2="1000" stroke="rgba(0, 222, 255, 0.3)" strokeWidth="1" />
          <line x1="0" y1="1000" x2="1000" y2="1000" stroke="rgba(0, 222, 255, 0.3)" strokeWidth="1" />
        </g>
        
        {/* HUD-like corner elements */}
        <g className="hud-corners">
          <path d="M0,30 L0,0 L30,0" stroke="rgba(0, 222, 255, 0.8)" strokeWidth="1.5" fill="none" />
          <path d="M970,0 L1000,0 L1000,30" stroke="rgba(0, 222, 255, 0.8)" strokeWidth="1.5" fill="none" />
          <path d="M0,970 L0,1000 L30,1000" stroke="rgba(0, 222, 255, 0.8)" strokeWidth="1.5" fill="none" />
          <path d="M970,1000 L1000,1000 L1000,970" stroke="rgba(0, 222, 255, 0.8)" strokeWidth="1.5" fill="none" />
        </g>
        
        {/* Tech grid intersections */}
        <g className="grid-intersections">
          {[...Array(20)].map((_, index) => {
            const x = 50 + (index * 50) % 900;
            const y = 50 + Math.floor((index * 50) / 900) * 50;
            
            return (
              <g key={`intersection-${index}`}>
                <path 
                  d={`M${x-5},${y} L${x+5},${y} M${x},${y-5} L${x},${y+5}`}
                  stroke="rgba(0, 222, 255, 0.6)"
                  strokeWidth="1"
                  opacity="0.4"
                />
              </g>
            );
          })}
        </g>
        
        {/* Noise overlay with higher contrast for tech feel */}
        <rect x="0" y="0" width="100%" height="100%" filter="url(#noise)" opacity="0.1" />
        
        {/* Scanline effect */}
        <rect x="0" y="0" width="100%" height="100%" fill="url(#scanlineGradient)" opacity="0.08">
          <animate
            attributeName="y"
            from="-100%"
            to="100%"
            dur="3.5s"
            repeatCount="indefinite"
          />
        </rect>
      </svg>
    </div>
  );
}