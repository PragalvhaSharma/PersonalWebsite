"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// Import section components
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import BlogsSection from "./components/BlogsSection";
import ConnectSection from "./components/ConnectSection";

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      
      sections.forEach(section => {
        const sectionElement = section as HTMLElement;
        const sectionTop = sectionElement.offsetTop;
        const sectionHeight = sectionElement.clientHeight;
        const scrollY = window.scrollY;
        
        if (scrollY >= sectionTop - 300 && scrollY < sectionTop + sectionHeight - 300) {
          setActiveSection(sectionElement.id);
        }
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  // Personal data - replace with your own
  const profile = {
    name: "Pragalvha Sharma",
    title: "Software Engineer & Entrepreneur",
    about: "I'm a Computer Science student at Western University with a passion for building innovative software solutions. My work combines technical expertise with entrepreneurial vision, focusing on AI-powered applications that solve real business problems.",
    skills: [
      { name: "React & Next.js", icon: "⚛️" },
      { name: "Python & Django", icon: "🐍" },
      { name: "AI & LLMs", icon: "🤖" },
      { name: "Full Stack Dev", icon: "💻" },
      { name: "Database Design", icon: "🛢️" },
      { name: "Cloud Services", icon: "☁️" },
    ],
    projects: [
      {
        title: "Blanc AI",
        description: "Co-founded an AI startup that generates enterprise software using LLMs. Backed by Western Accelerator ($12,000) and Ripple Ventures.",
        color: "#0070F3"
      },
      {
        title: "Blanc AI Quoting Tool",
        description: "Built a SaaS solution for contractors that automatically calculates materials and generates quotes. Used by contractors for 5000+ quotes.",
        color: "#7928CA"
      },
      {
        title: "NASA Space Settlement",
        description: "1st place globally in the NASA/NSS Space Settlement Contest, securing $20,000 in grants for conference participation.",
        color: "#FF4D4D"
      },
      {
        title: "Text to SQL Agent",
        description: "Developed an AI agent that converts natural language queries into SQL for database interactions in business environments.",
        color: "#00C7B7"
      }
    ],
    links: [
      { name: "GitHub", url: "https://github.com/PragalvhaSharma" },
      { name: "Portfolio", url: "https://www.pragalvha.com" },
      { name: "Email", url: "mailto:pragalvhasharma@gmail.com" },
      { name: "Twitter", url: "https://twitter.com/pragalvha" }
    ],
    education: [
      {
        institution: "University of Western Ontario",
        degree: "Bachelor of Science in Computer Science",
        details: "Ivey Business School AEO Status",
        period: "September 2023 - April 2027"
      },
      {
        institution: "Central Peel Secondary School",
        degree: "Ontario Secondary School Diploma (Scholar)",
        details: "Average: 98%, Advanced Placement Gold Standard",
        period: "September 2019 - June 2023"
      }
    ],
    experience: [
      {
        company: "Blanc AI",
        position: "Cofounder",
        details: "Co-developed an agentic architecture with LLMs to generate enterprise software. Wrote code for React Frontend and Django Backend.",
        period: "2023 - Present",
        technologies: "React, Django, LLMs"
      },
      {
        company: "Infin8",
        position: "Remote Full Stack Engineer",
        details: "Developed and maintained ERP systems for 3+ clients. Built a text to SQL agent for database queries.",
        period: "April 2024 - August 2024",
        technologies: "React, Django, PostgreSQL, AWS, LLMs"
      },
      {
        company: "Western University Faculty of Engineering",
        position: "Data Scientist",
        details: "Analyzed student performance data and developed algorithms to extract meaningful insights from educational datasets.",
        period: "2024",
        technologies: "Python, MATLAB, LLMs"
      },
      {
        company: "Mustang Capital",
        position: "Quantitative Analyst",
        details: "Developed an algorithm to identify arbitrage opportunities between Polymarket and sports betting sites.",
        period: "February 2024 - Present",
        technologies: "APIs, Flask"
      }
    ]
  };

  if (!mounted) return null;

  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white overflow-hidden relative"
      ref={containerRef}
    >
      {/* Technical SVG Pattern Background */}
      <div className="fixed inset-0 z-0 opacity-[0.05]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="techGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#22D3EE', stopOpacity: 0.3 }} />
              <stop offset="50%" style={{ stopColor: '#34D399', stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: '#A855F7', stopOpacity: 0.3 }} />
            </linearGradient>
            <pattern id="techGrid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="url(#techGradient)" strokeWidth="0.5" />
              <circle cx="0" cy="0" r="1" fill="currentColor" className="text-cyan-500/30" />
              <circle cx="50" cy="50" r="1" fill="currentColor" className="text-emerald-500/30" />
            </pattern>
            <pattern id="circuitPattern" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1.5" fill="currentColor" className="text-cyan-500/40" />
              <circle cx="90" cy="90" r="1.5" fill="currentColor" className="text-emerald-500/40" />
              <circle cx="90" cy="10" r="1.5" fill="currentColor" className="text-purple-500/40" />
              <circle cx="10" cy="90" r="1.5" fill="currentColor" className="text-blue-500/40" />
              <path d="M 10 10 Q 50 10, 90 90" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-cyan-500/20" />
              <path d="M 90 10 Q 50 50, 10 90" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-emerald-500/20" />
              <path d="M 50 0 Q 50 50, 50 100" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-purple-500/20" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#techGrid)" />
          <rect width="100%" height="100%" fill="url(#circuitPattern)" style={{ mixBlendMode: 'plus-lighter' }} />
        </svg>
      </div>

      {/* Subtle gradient background */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute w-[60vw] h-[60vw] rounded-full blur-[120px] opacity-10 bg-blue-600"
          style={{ 
            left: `${mousePosition.x * 0.05}px`,
            top: `${mousePosition.y * 0.05}px`,
            transition: "left 1s cubic-bezier(0.075, 0.82, 0.165, 1), top 1s cubic-bezier(0.075, 0.82, 0.165, 1)"
          }}
        />
        <div 
          className="absolute w-[40vw] h-[40vw] rounded-full blur-[140px] opacity-10 bg-indigo-600"
          style={{ 
            right: `${(window.innerWidth - mousePosition.x) * 0.05}px`,
            bottom: `${(window.innerHeight - mousePosition.y) * 0.05}px`,
            transition: "right 1.2s cubic-bezier(0.075, 0.82, 0.165, 1), bottom 1.2s cubic-bezier(0.075, 0.82, 0.165, 1)"
          }}
        />
      </div>

      {/* Grain texture overlay */}
      <div className="fixed inset-0 z-10 pointer-events-none opacity-20 bg-[url('/noise.png')] mix-blend-overlay"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-20">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
              {profile.name}
            </span>
          </h1>
          <p className="text-xl text-gray-400 mt-2 mb-8">{profile.title}</p>
          
          {/* Navigation */}
          <motion.nav 
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex flex-wrap justify-center space-x-1 sm:space-x-2 p-1.5 bg-gray-900/60 backdrop-blur-md rounded-full border border-gray-800/80 shadow-xl">
              {["about", "skills", "projects", "blogs", "connect"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeSection === section
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </motion.nav>
        </motion.header>

        <div className="max-w-5xl mx-auto space-y-24">
          {/* Render section components and pass the required props */}
          <AboutSection profile={profile} />
          <SkillsSection skills={profile.skills} />
          <ProjectsSection projects={profile.projects} />
          <BlogsSection />
          <ConnectSection links={profile.links} />
        </div>
        
        {/* Footer */}
        <motion.footer 
          className="mt-20 text-center text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p>© {new Date().getFullYear()} Pragalvha Sharma. All rights reserved.</p>
          <p className="mt-2">
            <Link href="/" className="text-blue-400 hover:underline transition-colors">
              Back to Home
            </Link>
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
