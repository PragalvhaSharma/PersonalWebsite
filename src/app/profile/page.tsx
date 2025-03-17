"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState("about");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animation variants for page elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  // Sample profile data
  const profile = {
    name: "Alex Johnson",
    title: "Creative Developer & Designer",
    about: "I'm a passionate developer with a love for creating beautiful, interactive digital experiences. With expertise in React, Next.js, and modern web technologies, I build applications that are both functional and visually stunning.",
    skills: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "Three.js", level: 75 },
      { name: "GSAP", level: 85 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Node.js", level: 70 },
    ],
    projects: [
      {
        title: "Interactive Portfolio",
        description: "A creative showcase of my work using Three.js and GSAP animations.",
        tags: ["React", "Three.js", "GSAP"],
      },
      {
        title: "E-commerce Platform",
        description: "A modern shopping experience with seamless animations and transitions.",
        tags: ["Next.js", "Tailwind", "Stripe"],
      },
      {
        title: "Data Visualization Dashboard",
        description: "Complex data presented through intuitive and interactive visualizations.",
        tags: ["D3.js", "React", "TypeScript"],
      },
    ],
    contact: {
      email: "hello@example.com",
      github: "github.com/username",
      linkedin: "linkedin.com/in/username",
      twitter: "twitter.com/username",
    },
  };

  if (!mounted) {
    return null; // Prevent hydration errors by not rendering until client-side
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-cyan-500/5 blur-[120px] animate-pulse"></div>
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-teal-500/5 blur-[110px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          className="flex flex-col lg:flex-row gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Sidebar / Profile Card */}
          <motion.div 
            className="lg:w-1/3"
            variants={itemVariants}
          >
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 shadow-xl">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 mb-4 overflow-hidden flex items-center justify-center">
                  <span className="text-4xl font-bold">{profile.name.charAt(0)}</span>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">{profile.name}</h1>
                <p className="text-gray-400 mt-1">{profile.title}</p>
              </div>

              {/* Navigation */}
              <nav className="mb-6">
                <ul className="space-y-2">
                  {["about", "skills", "projects", "contact"].map((section) => (
                    <li key={section}>
                      <button
                        onClick={() => setActiveSection(section)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                          activeSection === section
                            ? "bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-white"
                            : "hover:bg-gray-700/50 text-gray-400"
                        }`}
                      >
                        <span className="capitalize">{section}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Social Links */}
              <div className="pt-6 border-t border-gray-700">
                <div className="flex justify-center space-x-4">
                  <a href={`https://${profile.contact.github}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href={`https://${profile.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a href={`https://${profile.contact.twitter}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href={`mailto:${profile.contact.email}`} className="text-gray-400 hover:text-cyan-400 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div 
            className="lg:w-2/3"
            variants={itemVariants}
          >
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 shadow-xl min-h-[500px]">
              {/* About Section */}
              {activeSection === "about" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">About Me</h2>
                  <p className="text-gray-300 leading-relaxed mb-6">{profile.about}</p>
                  <p className="text-gray-300 leading-relaxed">
                    I specialize in creating immersive web experiences that combine technical excellence with creative design. My approach focuses on performance, accessibility, and user experience, ensuring that every project I build is not only visually impressive but also functionally robust.
                  </p>
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4 text-cyan-300">My Approach</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { title: "Creative", icon: "✨", desc: "Innovative solutions to complex problems" },
                        { title: "Technical", icon: "🔧", desc: "Strong foundation in modern web technologies" },
                        { title: "User-Focused", icon: "👤", desc: "Designing with the end user in mind" },
                      ].map((item) => (
                        <div key={item.title} className="bg-gray-700/30 p-4 rounded-lg border border-gray-700">
                          <div className="text-2xl mb-2">{item.icon}</div>
                          <h4 className="font-medium text-white">{item.title}</h4>
                          <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
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
                >
                  <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Skills & Expertise</h2>
                  <div className="space-y-6">
                    {profile.skills.map((skill) => (
                      <div key={skill.name} className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-300">{skill.name}</span>
                          <span className="text-gray-400">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                          <motion.div
                            className="bg-gradient-to-r from-cyan-500 to-emerald-500 h-2.5 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                          ></motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4 text-cyan-300">Other Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {["HTML5", "CSS3", "JavaScript", "GraphQL", "Firebase", "AWS", "Docker", "Git", "Figma", "Adobe XD"].map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-sm border border-gray-700">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Projects Section */}
              {activeSection === "projects" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Featured Projects</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {profile.projects.map((project, index) => (
                      <motion.div
                        key={project.title}
                        className="bg-gray-700/30 rounded-lg overflow-hidden border border-gray-700 hover:border-cyan-500/50 transition-colors group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="h-40 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center">
                          <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                            {index === 0 ? "🎨" : index === 1 ? "🛒" : "📊"}
                          </span>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-cyan-300 transition-colors">{project.title}</h3>
                          <p className="text-gray-400 mb-4">{project.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                              <span key={tag} className="px-2 py-1 bg-gray-800/80 text-gray-300 rounded text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-8 text-center">
                    <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white rounded-lg hover:opacity-90 transition-opacity">
                      View All Projects
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Contact Section */}
              {activeSection === "contact" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Get In Touch</h2>
                  <p className="text-gray-300 mb-8">
                    I&apos;m always open to discussing new projects, creative ideas or opportunities to be part of your vision.
                  </p>
                  
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-gray-400 mb-2">Name</label>
                        <input
                          type="text"
                          id="name"
                          className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-gray-400 mb-2">Email</label>
                        <input
                          type="email"
                          id="email"
                          className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-gray-400 mb-2">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-gray-400 mb-2">Message</label>
                      <textarea
                        id="message"
                        rows={5}
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      ></textarea>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white py-3 rounded-lg hover:opacity-90 transition-opacity"
                      >
                        Send Message
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
        
        {/* Footer */}
        <motion.footer 
          className="mt-12 text-center text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p>© {new Date().getFullYear()} Alex Johnson. All rights reserved.</p>
          <p className="mt-2">
            <Link href="/" className="text-cyan-400 hover:underline">
              Back to Home
            </Link>
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
