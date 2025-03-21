"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Project {
  title: string;
  description: string;
  color: string;
  url: string;
}

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="space-y-12"
    >
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 mb-8">Cool Work</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-gradient-to-br from-gray-800/50 to-gray-900/50 shadow-xl"
            style={{
              background: 'linear-gradient(169deg, rgba(17,17,17,0.9) 0%, rgba(0,0,0,0.9) 100%)',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.05), 0 4px 20px rgba(0,0,0,0.4), inset 0 0 0 4px rgba(0,0,0,0.9)',
            }}
          >
            {/* Project background image */}
            <div className="absolute inset-0 w-full h-full">
              {index === 0 && (
                <Image 
                  src="/NASA.png" 
                  alt="NASA project"
                  fill
                  style={{ objectFit: 'cover' }}
                  quality={100}
                  priority
                />
              )}
              {index === 1 && (
                <Image 
                  src="/erpPrev.png" 
                  alt="ERP Generator"
                  fill
                  style={{ objectFit: 'cover' }}
                  quality={100}
                />
              )}
              {index === 2 && (
                <Image 
                  src="/quoting.png" 
                  alt="Quoting project"
                  fill
                  style={{ objectFit: 'cover' }}
                  quality={100}
                />
              )}
              {index === 3 && (
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-8">
                  <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700/30 -mt-44">
                    <svg className="w-24 h-24 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
            
            {/* Dark content area at bottom - less dark for NASA project */}
            <div className={`absolute bottom-0 left-0 right-0 ${index === 0 ? 'bg-black/70' : 'bg-black/85'} backdrop-blur-sm p-6`}>
              <h3 className="text-2xl font-bold mb-2 text-white">{project.title}</h3>
              <p className="text-white/90 mb-4 text-sm leading-relaxed">{project.description}</p>
              
              {/* Project actions */}
              <div className="flex items-center flex-wrap gap-3">
                {/* View Project button */}
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 rounded-full text-xs font-semibold text-white shadow-md transition-colors"
                >
                  View Project
                </a>
                
                {/* "Try it out" button for quoting tool */}
                {index === 2 && (
                  <a 
                    href="https://www.blancai.ca" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-1.5 bg-green-600 hover:bg-green-500 rounded-full text-xs font-semibold text-white shadow-md transition-colors"
                  >
                    Try it out
                  </a>
                )}
                
                {/* News links for NASA project - direct links instead of dropdown */}
                {index === 0 && (
                  <>
                    <a
                      href="https://www.insauga.com/brampton-students-win-international-competition-hosted-by-nasa-and-national-space-society/"
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 rounded-full text-xs font-semibold text-white shadow-md transition-colors"
                    >
                      INsauga
                    </a>
                    <a
                      href="https://nss.org/settlement/nasa/Contest/Results/2023/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 rounded-full text-xs font-semibold text-white shadow-md transition-colors"
                    >
                      NASA/NSS
                    </a>
                    <a
                      href="https://www.bramptonguardian.com/news/2-brampton-student-teams-win-prestigious-science-award/article_159bb547-7aaf-517c-ad5d-ccc43bfbcebe.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 rounded-full text-xs font-semibold text-white shadow-md transition-colors"
                    >
                      Guardian
                    </a>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
} 