"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ProfileData {
  name: string;
  about: string;
  education: {
    institution: string;
    degree: string;
    details: string;
    period: string;
  }[];
  experience: {
    company: string;
    position: string;
    details: string;
    period: string;
    technologies: string;
  }[];
}

interface AboutSectionProps {
  profile: ProfileData;
}

export default function AboutSection({ profile }: AboutSectionProps) {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="space-y-12"
    >
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 mb-8">About Me</h2>
      <div className="flex flex-col md:flex-row gap-10 items-center">
        <div className="w-52 h-52 relative rounded-full overflow-hidden border-2 border-indigo-500/30 shadow-2xl shadow-indigo-500/10">
          <Image
            src="/prag.jpg"
            alt={`${profile.name}'s profile picture`}
            fill
            className="object-cover rounded-full"
            sizes="(max-width: 208px) 100vw, 208px"
            priority
          />
        </div>
        <div className="md:flex-1">
          <p className="text-xl leading-relaxed text-gray-300">
            {profile.about}
          </p>
          <p className="mt-4 text-gray-400">
            Currently pursuing a Bachelor of Science in Computer Science at Western University with Ivey Business School AEO.
          </p>
        </div>
      </div>
      
      {/* Education Section */}
      <div className="bg-gray-900/40 backdrop-blur-md p-8 rounded-2xl border border-gray-800/80 shadow-xl">
        <h3 className="text-xl font-semibold mb-6 text-blue-400 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
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
              <p className="text-gray-400 text-sm mt-1 whitespace-pre-line">{exp.details}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {exp.technologies.split(', ').map((tech, i) => (
                  <span key={i} className="text-xs bg-gray-800/70 px-2.5 py-1 rounded-full text-gray-300 border border-gray-700/50">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
} 