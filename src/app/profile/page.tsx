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
    name: "Pragalv Sharma",
    title: "Creative Developer & Digital Artist",
    about: "I craft digital experiences where code meets creativity. My work explores the intersection of technology and art, creating interactive spaces that engage and inspire.",
    skills: [
      { name: "Next.js & React", icon: "⚛️" },
      { name: "Three.js & WebGL", icon: "🌐" },
      { name: "Creative Coding", icon: "✨" },
      { name: "UI/UX Design", icon: "🎨" },
      { name: "Animation", icon: "🎬" },
      { name: "TypeScript", icon: "📘" },
    ],
    projects: [
      {
        title: "Dimensional",
        description: "An immersive 3D portfolio experience using Three.js and GSAP",
        color: "#7928CA"
      },
      {
        title: "Wavelength",
        description: "Audio visualization experiment with interactive sound design",
        color: "#FF4D4D"
      },
      {
        title: "Neutrino",
        description: "Data-driven art installation translating physics into visual form",
        color: "#0070F3"
      },
      {
        title: "Prismatic",
        description: "Color theory exploration with generative art components",
        color: "#00C7B7"
      }
    ],
    links: [
      { name: "GitHub", url: "https://github.com/username" },
      { name: "Twitter", url: "https://twitter.com/username" },
      { name: "Instagram", url: "https://instagram.com/username" },
      { name: "Email", url: "mailto:hello@example.com" }
    ]
  };

  if (!mounted) return null;

  return (
    <div 
      className="min-h-screen bg-black text-white overflow-hidden relative"
      ref={containerRef}
    >
      {/* Interactive background */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute w-[50vw] h-[50vw] rounded-full blur-[100px] opacity-20 bg-blue-500"
          style={{ 
            left: `${mousePosition.x * 0.05}px`,
            top: `${mousePosition.y * 0.05}px`,
            transition: "left 1s cubic-bezier(0.075, 0.82, 0.165, 1), top 1s cubic-bezier(0.075, 0.82, 0.165, 1)"
          }}
        />
        <div 
          className="absolute w-[30vw] h-[30vw] rounded-full blur-[120px] opacity-20 bg-purple-500"
          style={{ 
            right: `${(window.innerWidth - mousePosition.x) * 0.05}px`,
            bottom: `${(window.innerHeight - mousePosition.y) * 0.05}px`,
            transition: "right 1.2s cubic-bezier(0.075, 0.82, 0.165, 1), bottom 1.2s cubic-bezier(0.075, 0.82, 0.165, 1)"
          }}
        />
      </div>

      {/* Grain texture overlay */}
      <div className="fixed inset-0 z-10 pointer-events-none opacity-20 bg-[url('/noise.png')] mix-blend-overlay"></div>

      <div className="container mx-auto px-4 py-12 relative z-20">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              {profile.name}
            </span>
          </h1>
          <p className="text-xl text-gray-400">{profile.title}</p>
        </motion.header>

        {/* Navigation */}
        <motion.nav 
          className="mb-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex space-x-2 p-1 bg-gray-900/50 backdrop-blur-sm rounded-full border border-gray-800">
            {["about", "skills", "projects", "connect"].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeSection === section
                    ? "bg-white text-black shadow-lg"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </motion.nav>

        {/* Main content */}
        <div className="max-w-4xl mx-auto">
          {/* About Section */}
          {activeSection === "about" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-48 h-48 relative rounded-full overflow-hidden border-4 border-white/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold">
                    {profile.name.charAt(0)}
                  </div>
                </div>
                <div className="md:flex-1">
                  <p className="text-xl leading-relaxed text-gray-300">
                    {profile.about}
                  </p>
                  <p className="mt-4 text-gray-400">
                    I believe in pushing the boundaries of what&apos;s possible on the web, creating experiences that are both technically impressive and emotionally resonant.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
                  <h3 className="text-xl font-semibold mb-4 text-blue-400">Philosophy</h3>
                  <p className="text-gray-300">
                    My work is guided by the belief that technology should enhance human experience, not detract from it. I strive to create digital spaces that feel intuitive, responsive, and alive.
                  </p>
                </div>
                <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
                  <h3 className="text-xl font-semibold mb-4 text-purple-400">Approach</h3>
                  <p className="text-gray-300">
                    I blend technical precision with artistic sensibility, approaching each project as both an engineering challenge and a creative opportunity to express ideas in new ways.
                  </p>
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {profile.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300 group"
                  >
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {skill.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {skill.name}
                    </h3>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="mt-12 bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Creative + Technical
                </h3>
                <p className="text-gray-300 mb-6">
                  My unique strength lies in bridging the gap between creative vision and technical implementation. I don&apos;t just build websites—I craft experiences that tell stories, evoke emotions, and push the boundaries of what&apos;s possible on the web.
                </p>
                <div className="flex flex-wrap gap-3">
                  {["JavaScript", "TypeScript", "React", "Next.js", "Three.js", "GSAP", "WebGL", "Framer Motion", "Tailwind CSS", "Node.js", "WebAudio API", "Shader Programming"].map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm border border-gray-700">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {profile.projects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative overflow-hidden rounded-xl aspect-[4/3]"
                    style={{ backgroundColor: `${project.color}20` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br opacity-20"
                      style={{ backgroundImage: `linear-gradient(to bottom right, ${project.color}, transparent)` }}
                    ></div>
                    <div className="absolute inset-0 flex flex-col justify-end p-6 transition-transform duration-300 group-hover:translate-y-0 translate-y-8">
                      <h3 className="text-2xl font-bold mb-2 text-white">{project.title}</h3>
                      <p className="text-white/80 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{project.description}</p>
                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs">View Project</span>
                        <span className="w-8 h-8 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div 
                      className="absolute top-6 right-6 w-16 h-16 rounded-full flex items-center justify-center text-2xl"
                      style={{ backgroundColor: project.color }}
                    >
                      {index === 0 ? "3D" : index === 1 ? "🎵" : index === 2 ? "📊" : "🎨"}
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
                <button className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-opacity-90 transition-all">
                  View All Work
                </button>
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
              <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800">
                <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Let&apos;s Create Something Together
                </h2>
                <p className="text-gray-300 mb-8">
                  I&apos;m always interested in hearing about new projects and opportunities. Whether you have a specific project in mind or just want to chat about possibilities, feel free to reach out.
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
                      className="flex items-center p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4 group-hover:bg-blue-500/30 transition-colors">
                        {link.name === "GitHub" ? (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                          </svg>
                        ) : link.name === "Twitter" ? (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        ) : link.name === "Instagram" ? (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                          </svg>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors">{link.name}</h3>
                        <p className="text-sm text-gray-400">{link.url.replace('https://', '').replace('mailto:', '')}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
              
              <motion.div 
                className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-8 rounded-xl border border-blue-500/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Ready to start a project?</h3>
                    <p className="text-gray-300">Let&apos;s discuss how we can bring your vision to life.</p>
                  </div>
                  <a 
                    href="mailto:hello@example.com" 
                    className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-opacity-90 transition-all whitespace-nowrap"
                  >
                    Get in Touch
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
          <p>© {new Date().getFullYear()} Pragalv Sharma. All rights reserved.</p>
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
