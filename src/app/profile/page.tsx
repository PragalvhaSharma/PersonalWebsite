"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import AnimatedSvg from "../components/AnimatedSvg";

// Import section components
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import BlogsSection from "./components/BlogsSection";
import ConnectSection from "./components/ConnectSection";

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const containerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    
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
    
    window.addEventListener("scroll", handleScroll);
    return () => {
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
    name: "Prag",
    title: "Hacker",
    about: "I'm a hacker who likes to build things...",
    projects: [
      {
        title: "NASA/NSS Space Settlement Contest",
        description: "Earned 1st place globally, outperforming 26,725 students across 19 countries, and surpassing 4,567 entries",
        color: "#FF4D4D",
        url: "https://github.com/Mehtab-Cheema26/Space-Settlement"
      },
      {
        title: "Blanc AI ERP Generator",
        description: "An agentic framework for generating custom enterprise software based on a prompt.",
        color: "#0070F3",
        url: "https://drive.google.com/file/d/1jgjvSjjuLevfB16wOxpOCwFEepZ5Xg3C/view"
      },
      {
        title: "Blanc AI Quoting Tool",
        description: "Built a SaaS solution for contractors that automatically sources materials and generates quotes. Used by contractors for 5000+ quotes.",
        color: "#7928CA",
        url: "https://www.youtube.com/watch?v=d_4CJmvCbWo"
      },
      {
        title: "Text to SQL Agent",
        description: "Developed an AI agent that converts natural language queries into SQL for a postgres database. Deployed for a client.",
        color: "#00C7B7",
        url: "https://github.com/PragalvhaSharma/SQL-Agent"
      }
    ],
    links: [
      { name: "GitHub", url: "https://github.com/PragalvhaSharma" },
      { name: "LinkedIn", url: "https://www.linkedin.com/in/pragalvha-sharma-389499204/" },
      { name: "Email", url: "mailto:pragalvhasharma@gmail.com" },
      { name: "X", url: "https://x.com/pragalvha" }
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
        details: "Co-developed an AI agent to generate quotes for contractors, fetching prices from suppliers and optimizing for cost.\nPart of Western Accelerator and Ripple X Fellowship.",
        period: "2023 - Present",
        technologies: "Next JS, Fast API, LLMs"
      },
      {
        company: "Western University - Faculty of Engineering",
        position: "Data Scientist",
        details: "Analyzed student performance data and developed algorithms to extract meaningful insights from educational datasets.",
        period: "2024",
        technologies: "Python, Microsoft Excel, LLMs"
      },
      {
        company: "Infin8",
        position: "Full Stack Engineer",
        details: "Helped develop ERP systems for 3 clients. Built a text to SQL agent for database queries.",
        period: "April 2024 - August 2024",
        technologies: "React, Django, PostgreSQL, AWS, LLMs"
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
      className="min-h-screen text-white overflow-hidden relative"
      ref={containerRef}
    >
      {/* Animated SVG Background */}
      <AnimatedSvg />

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
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00EFCF] via-[#00C16A] to-[#00796B]">
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
              {["about", "projects", "blogs", "connect"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                    activeSection === section
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  {section === "projects" ? "Cool Work" : section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </motion.nav>
        </motion.header>

        <div className="max-w-5xl mx-auto space-y-24">
          {/* Render section components and pass the required props */}
          <AboutSection profile={profile} />
          <ProjectsSection projects={profile.projects} />
          <BlogsSection />
          <ConnectSection links={profile.links} />
        </div>
        
        {/* Footer */}
        <motion.footer 
          className="mt-20 pt-10 pb-8 text-center text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p>© {new Date().getFullYear()} Pragalvha Sharma. All rights reserved.</p>
        </motion.footer>
      </div>
    </div>
  );
}
