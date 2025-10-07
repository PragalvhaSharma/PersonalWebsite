"use client";

import React from "react";
import Image from "next/image";

interface Project {
  title: string;
  description: string;
  color: string;
  url: string;
  githubUrl?: string; // Add githubUrl to the interface
  imageUrl?: string;
}

interface ProjectsSectionProps {
  projects: Project[];
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const isDemo = ["Self Evolving MCP Server", "Blanc AI Quoting Tool", "Blanc AI ERP Generator"].includes(project.title);
  const isIveyBingo = project.title === "Ivey Contribution Bingo";
  
  // Determine button label for main link
  let mainButtonLabel = "GitHub";
  if (isDemo) {
    mainButtonLabel = "Demo";
  } else if (isIveyBingo) {
    mainButtonLabel = "Deployment";
  }
  
  return (
    <div
      key={project.title}
      className="group flex flex-col overflow-hidden rounded-2xl bg-[#111111] border border-gray-800 hover:border-gray-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10"
    >
      {/* Project background image */}
      <div className="relative w-full aspect-video">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            quality={100}
            priority={index === 1}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-8">
            <div className="bg-gray-800/50 p-4 sm:p-8 rounded-2xl border border-gray-700/30">
              <svg className="w-16 h-16 sm:w-24 sm:h-24 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            </div>
          </div>
        )}
      </div>
      
      {/* Dark content area at bottom */}
      <div className="p-4 sm:p-5 flex-grow flex flex-col">
        <h3 className="text-lg sm:text-xl font-bold mb-2 text-white">{project.title}</h3>
        <p className="text-gray-400 mb-4 text-xs sm:text-sm leading-normal flex-grow">{project.description}</p>
        
        {/* Project actions */}
        <div className="flex items-center flex-wrap gap-2 mt-auto">
          {/* Main button (Demo/Deployment/GitHub) */}
          <a 
            href={project.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`px-3 py-1 rounded-full text-xs font-semibold shadow-md transition-colors ${
              isDemo
                ? "bg-purple-600 hover:bg-purple-500 text-white"
                : isIveyBingo
                ? "bg-blue-600 hover:bg-blue-500 text-white"
                : "bg-gray-700 hover:bg-gray-600 text-white"
            }`}
          >
            {mainButtonLabel}
          </a>
          
          {/* GitHub button (for projects with separate githubUrl) */}
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-full text-xs font-semibold text-white shadow-md transition-colors"
            >
              GitHub
            </a>
          )}
          
          {/* "Try it out" button for quoting tool */}
          {project.title === "Blanc AI Quoting Tool" && (
            <a 
              href="https://www.blancai.ca" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded-full text-xs font-semibold text-white shadow-md transition-colors"
            >
              Deployment
            </a>
          )}
          
          {/* News links for NASA project - direct links instead of dropdown */}
          {project.title === "NASA/NSS Space Settlement Contest" && (
            <div className="flex flex-wrap gap-2">
              <a
                href="https://www.insauga.com/brampton-students-win-international-competition-hosted-by-nasa-and-national-space-society/"
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3 py-1 bg-teal-500/80 hover:bg-teal-500 rounded-full text-xs font-semibold text-black shadow-md transition-colors"
              >
                INsauga
              </a>
              <a
                href="https://nss.org/settlement/nasa/Contest/Results/2023/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-teal-500/80 hover:bg-teal-500 rounded-full text-xs font-semibold text-black shadow-md transition-colors"
              >
                NASA/NSS
              </a>
              <a
                href="https://www.bramptonguardian.com/news/2-brampton-student-teams-win-prestigious-science-award/article_159bb547-7aaf-517c-ad5d-ccc43bfbcebe.html"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-teal-500/80 hover:bg-teal-500 rounded-full text-xs font-semibold text-black shadow-md transition-colors"
              >
                Guardian
              </a>
            </div>
          )}

          {/* Extra buttons for LLM Monitoring */}
          {project.title === "LLM Monitoring" && (
            <>
              <a
                href="https://next-js-dashboard-pied-tau.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded-full text-xs font-semibold text-white shadow-md transition-colors"
              >
                Deployment
              </a>
              <a
                href="https://www.loom.com/share/ceb7d97c76e84651beeaebaa69b74c90?sid=95bd9916-806e-4838-b5c1-d20578a6e7ec"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-purple-600 hover:bg-purple-500 rounded-full text-xs font-semibold text-white shadow-md transition-colors"
              >
                Demo
              </a>
            </>
          )}
          
          {/* Extra buttons for M3Drop-PY */}
          {project.title === "M3Drop-PY" && (
            <>
              {!project.url.includes("github.com") && (
                <a
                  href="https://github.com/PragalvhaSharma/M3Drop-PY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-full text-xs font-semibold text-white shadow-md transition-colors"
                >
                  GitHub
                </a>
              )}
              <a
                href="https://academic.oup.com/bioinformatics/article/35/16/2865/5258099"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 rounded-full text-xs font-semibold text-white shadow-md transition-colors"
              >
                Research Paper
              </a>
              <a
                href="https://pypi.org/project/M3Drop/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-orange-600 hover:bg-orange-500 rounded-full text-xs font-semibold text-white shadow-md transition-colors"
              >
                PyPI
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  )
}


export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const topRowProjects = projects.slice(0, 2);
  const bottomRowProjects = projects.slice(2);

  return (
    <section
      id="projects"
      className="space-y-12"
    >
      <h2 className="text-3xl font-bold text-white mb-8">Cool Work</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {topRowProjects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
      
      {bottomRowProjects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {bottomRowProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index + topRowProjects.length} />
          ))}
        </div>
      )}
    </section>
  );
} 