"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState("about");
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
        details: "Top 6 Grade 12 Average: 98%, Advanced Placement Gold Standard",
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
          <p className="text-xl text-gray-400 mt-2">{profile.title}</p>
        </motion.header>

        {/* Navigation */}
        <motion.nav 
          className="mb-16 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex flex-wrap justify-center space-x-1 sm:space-x-2 p-1.5 bg-gray-900/60 backdrop-blur-md rounded-full border border-gray-800/80 shadow-xl">
            {["about", "skills", "projects", "connect"].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
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

        {/* Main content */}
        <div className="max-w-5xl mx-auto">
          {/* About Section */}
          {activeSection === "about" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              <div className="flex flex-col md:flex-row gap-10 items-center">
                <div className="w-52 h-52 relative rounded-2xl overflow-hidden border-2 border-indigo-500/30 shadow-2xl shadow-indigo-500/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-5xl font-bold">
                    {profile.name.charAt(0)}
                  </div>
                </div>
                <div className="md:flex-1">
                  <p className="text-xl leading-relaxed text-gray-300">
                    {profile.about}
                  </p>
                  <p className="mt-4 text-gray-400">
                    Currently pursuing a Bachelor of Science in Computer Science at Western University with Ivey Business School AEO Status, I combine technical prowess with business acumen to create innovative solutions.
                  </p>
                </div>
              </div>
              
              {/* Education Section */}
              <div className="bg-gray-900/40 backdrop-blur-md p-8 rounded-2xl border border-gray-800/80 shadow-xl">
                <h3 className="text-xl font-semibold mb-6 text-blue-400 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
                  </svg>
                  Education
                </h3>
                <div className="space-y-6">
                  {profile.education.map((edu, index) => (
                    <div key={index} className="border-l-2 border-blue-500/30 pl-5 ml-2">
                      <h4 className="text-lg font-medium text-white">{edu.institution}</h4>
                      <p className="text-gray-300 font-medium">{edu.degree}</p>
                      <p className="text-gray-400 text-sm">{edu.details}</p>
                      <p className="text-gray-500 text-xs mt-1">{edu.period}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Experience Section */}
              <div className="bg-gray-900/40 backdrop-blur-md p-8 rounded-2xl border border-gray-800/80 shadow-xl">
                <h3 className="text-xl font-semibold mb-6 text-indigo-400 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  Experience
                </h3>
                <div className="space-y-8">
                  {profile.experience.map((exp, index) => (
                    <div key={index} className="border-l-2 border-indigo-500/30 pl-5 ml-2">
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <h4 className="text-lg font-medium text-white">{exp.company}</h4>
                        <span className="text-xs bg-indigo-500/20 px-3 py-1 rounded-full text-indigo-300">{exp.period}</span>
                      </div>
                      <p className="text-gray-300 font-medium">{exp.position}</p>
                      <p className="text-gray-400 text-sm mt-1">{exp.details}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {exp.technologies.split(', ').map((tech, i) => (
                          <span key={i} className="text-xs bg-gray-800/70 px-2.5 py-1 rounded-full text-gray-300 border border-gray-700/50">{tech}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Skills Section */}
          {activeSection === "skills" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {profile.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-gray-900/80 to-gray-800/30 backdrop-blur-md p-6 rounded-2xl border border-gray-700/30 hover:border-blue-500/30 transition-all duration-300 group shadow-lg"
                  >
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 w-14 h-14 rounded-xl flex items-center justify-center">
                      {skill.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {skill.name}
                    </h3>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="mt-12 bg-gray-900/40 backdrop-blur-md p-8 rounded-2xl border border-gray-800/80 shadow-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                  Technical + Entrepreneurial
                </h3>
                <p className="text-gray-300 mb-6">
                  I blend technical development skills with entrepreneurial vision to create innovative solutions. My focus is on leveraging AI and modern web technologies to build products that solve real-world problems and create value for businesses and users alike.
                </p>
                <div className="flex flex-wrap gap-3">
                  {["Python", "JavaScript", "Java", "C", "React", "Next.js", "Django", "FastAPI", "PostgreSQL", "MongoDB", "AWS", "Git", "Docker", "LangChain", "Vector Databases", "Large Language Models"].map((tech) => (
                    <span key={tech} className="px-3 py-1.5 bg-gradient-to-r from-gray-800/80 to-gray-700/50 text-gray-300 rounded-full text-sm border border-gray-700/30 hover:border-blue-500/30 transition-all duration-300 cursor-default hover:-translate-y-1">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Projects Section */}
          {activeSection === "projects" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {profile.projects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-gradient-to-br from-gray-900/80 to-gray-800/30 border border-gray-800/50 hover:border-blue-500/30 transition-all duration-500 shadow-lg"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br opacity-20"
                      style={{ backgroundImage: `linear-gradient(to bottom right, ${project.color}, transparent)` }}
                    ></div>
                    
                    <div className="absolute inset-0 flex flex-col justify-end p-6 transition-transform duration-300 group-hover:translate-y-0 translate-y-8">
                      <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-blue-300 transition-colors">{project.title}</h3>
                      <p className="text-white/90 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300">{project.description}</p>
                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                        <span className="px-3 py-1 bg-gradient-to-r from-blue-600/70 to-indigo-600/70 backdrop-blur-sm rounded-full text-xs font-medium text-white shadow-lg">View Project</span>
                        <span className="w-8 h-8 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div 
                      className="absolute top-6 right-6 w-16 h-16 rounded-xl flex items-center justify-center text-2xl shadow-xl"
                      style={{ backgroundColor: project.color }}
                    >
                      {index === 0 ? (
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      ) : index === 1 ? (
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                      ) : index === 2 ? (
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <a 
                  href="https://github.com/PragalvhaSharma" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-medium hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg"
                >
                  <span>View All Projects</span>
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </motion.div>
            </motion.div>
          )}

          {/* Connect Section */}
          {activeSection === "connect" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              <div className="bg-gray-900/40 backdrop-blur-md p-8 rounded-2xl border border-gray-800/80 shadow-xl">
                <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                  Let&apos;s Connect
                </h2>
                <p className="text-gray-300 mb-8">
                  I&apos;m always open to exploring new opportunities, collaborations, and discussions about technology and entrepreneurship. Whether you&apos;re interested in my projects, have a potential opportunity, or just want to connect, feel free to reach out.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {profile.links.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center p-5 bg-gradient-to-br from-gray-900/80 to-gray-800/30 rounded-xl border border-gray-700/30 hover:border-blue-500/30 transition-all group shadow-lg transform hover:-translate-y-1"
                    >
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/30 to-indigo-500/30 flex items-center justify-center mr-4 group-hover:from-blue-500/50 group-hover:to-indigo-500/50 transition-all">
                        {link.name === "GitHub" ? (
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                          </svg>
                        ) : link.name === "Portfolio" ? (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                          </svg>
                        ) : link.name === "Email" ? (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                          </svg>
                        ) : link.name === "Twitter" ? (
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                          </svg>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors">{link.name}</h3>
                        <p className="text-sm text-gray-400">{link.url.replace('https://', '').replace('mailto:', '').replace('tel:', '')}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
              
              <motion.div 
                className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 p-8 rounded-2xl border border-blue-500/30 shadow-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Interested in collaborating?</h3>
                    <p className="text-gray-300">Let&apos;s discuss how we can work together on innovative projects.</p>
                  </div>
                  <a 
                    href="mailto:pragalvhasharma@gmail.com" 
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-medium hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    <span>Contact Me</span>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
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
