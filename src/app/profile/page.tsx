"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import AnimatedSvg from "../components/AnimatedSvg";
import Image from "next/image";

// Import section components
import ProjectsSection from "./components/ProjectsSection";

const UnderlinedLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="underline decoration-gray-500 hover:decoration-white transition-colors"
  >
    {children}
  </a>
);

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const containerRef = useRef(null);

  // Personal data - updated to match the new design
  const profile = {
    projects: [
      {
        title: "Self Evolving MCP Server",
        description: "A self-evolving server that can adapt and enhance its own capabilities autonomously. This demo showcases its dynamic functionality.",
        color: "#9333ea",
        url: "https://www.loom.com/share/edccf270519d4a47bb0b23e0ff23f0c6?sid=254bb5a9-ca00-453d-8011-50342875b783#Activity",
        imageUrl: "/MCP Server.avif"
      },
      {
        title: "NASA/NSS Space Settlement Contest",
        description: "Earned 1st place globally, outperforming 26,725 students across 19 countries, and surpassing 4,567 entries",
        color: "#FF4D4D",
        url: "https://github.com/Mehtab-Cheema26/Space-Settlement",
        imageUrl: "/NASA.png"
      },
      {
        title: "M3Drop-PY",
        description: "Using AI to convert the M3Drop package into a Python implementation; updated package to be published in December 2025.",
        color: "#24292F",
        url: "https://github.com/PragalvhaSharma/M3Drop-PY",
        imageUrl: "/M3Drop.png"
      },
      {
        title: "LLM Monitoring",
        description: "A monitoring and observability platform for AI agents, featuring ingest, metrics, and a dashboard. Built with Node.js, TypeScript, and Next.js.",
        color: "#24292F",
        url: "https://github.com/PragalvhaSharma/LLMmonitoring",
        imageUrl: "/LLmMonitoring.png"
      },
      {
        title: "Blanc AI ERP Generator",
        description: "An agentic framework for generating custom enterprise software based on a prompt.",
        color: "#0070F3",
        url: "https://drive.google.com/file/d/1jgjvSjjuLevfB16wOxpOCwFEepZ5Xg3C/view",
        imageUrl: "/erpPrev.png"
      },
      {
        title: "Blanc AI Quoting Tool",
        description: "Built a SaaS solution for contractors that automatically sources materials and generates quotes. Used by contractors for 5000+ quotes.",
        color: "#7928CA",
        url: "https://www.youtube.com/watch?v=d_4CJmvCbWo",
        imageUrl: "/quoting.png"
      },
      {
        title: "Text to SQL Agent",
        description: "Developed an AI agent that converts natural language queries into SQL for a postgres database. Deployed for a client.",
        color: "#00C7B7",
        url: "https://github.com/PragalvhaSharma/SQL-Agent",
        imageUrl: "/TextToSql.png"
      }
    ],
    links: [
      { name: "GitHub", url: "https://github.com/PragalvhaSharma" },
      { name: "LinkedIn", url: "https://www.linkedin.com/in/pragalvha-sharma-389499204/" },
      { name: "Twitter", url: "https://x.com/pragalvha" },
      { name: "Substack", url: "https://substack.com/@pragalvha?utm_source=user-menu" }
    ]
  };

  if (!mounted) return null;

  return (
    <div 
      className="min-h-screen text-white overflow-hidden relative bg-black"
      ref={containerRef}
    >
      {/* Animated SVG Background */}
      <AnimatedSvg />

      {/* Grain texture overlay */}
      <div className="fixed inset-0 z-10 pointer-events-none opacity-20 bg-[url('/noise.png')] mix-blend-overlay"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 relative z-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 max-w-5xl mx-auto">
          <div className="md:w-2/3">
            <motion.header
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <h1 className="text-5xl font-bold tracking-tight text-white">
                Hey, I&apos;m Prag.
              </h1>
            </motion.header>
            
            <motion.div 
              className="text-gray-300 space-y-6 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p>
                I&apos;m a CS student at <UnderlinedLink href="https://www.linkedin.com/school/westernuniversity/posts/?feedView=all">Western</UnderlinedLink> and study Business at <UnderlinedLink href="https://www.linkedin.com/school/ivey-business-school/posts/?feedView=all">Ivey</UnderlinedLink>.
              </p>
              <p>
                Previously co-founded <UnderlinedLink href="https://blancai.ca/">Blanc AI</UnderlinedLink>, an agentic AI that generated quotes for contractors. I&apos;ve also built <UnderlinedLink href="https://drive.google.com/file/d/1jgjvSjjuLevfB16wOxpOCwFEepZ5Xg3C/view">ERP generators</UnderlinedLink> and LLM pipelines for enterprise workflows.
              </p>
              <p>
                I have won an <UnderlinedLink href="https://www.insauga.com/brampton-students-win-international-competition-hosted-by-nasa-and-national-space-society/">international NASA competition</UnderlinedLink>, outperforming 26,725 students across 19 countries.
              </p>
              <p>
                I&apos;m currently at Mely.ai working as a full-stack engineer, shipping full-stack AI features.
              </p>
              <p>
                Deeply interested in the application and user interaction of AI — especially how we design systems that feel intuitive and actually get used.
              </p>
              <p>
                Always down to meet interesting people.
              </p>
            </motion.div>

            <motion.div 
              className="flex space-x-6 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <a href={profile.links.find(l => l.name === 'GitHub')?.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href={profile.links.find(l => l.name === 'LinkedIn')?.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href={profile.links.find(l => l.name === 'Twitter')?.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href={profile.links.find(l => l.name === 'Substack')?.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Substack</title><path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24l10.54-9.656L22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/></svg>
              </a>
            </motion.div>
          </div>
          <div className="w-full md:w-1/3 flex justify-center mt-8 md:mt-0">
            <motion.div
              className="relative w-48 h-48 sm:w-56 sm:h-56"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Image
                src="/Prag.jpg"
                alt="Prag Sharma"
                layout="fill"
                objectFit="cover"
                className="rounded-full shadow-lg"
              />
            </motion.div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto w-full mt-32">
          <ProjectsSection projects={profile.projects} />
        </div>
      </div>
    </div>
  );
}
