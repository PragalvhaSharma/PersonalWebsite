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
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00EFCF] via-[#00C16A] to-[#00796B] mb-8">About Me</h2>
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="w-40 h-40 md:w-52 md:h-52 relative rounded-full overflow-hidden border-2 border-[#00C16A]/30 shadow-2xl shadow-[#00EFCF]/10 mx-auto md:mx-0">
          <Image
            src="/Prag.jpg"
            alt={`${profile.name}'s profile picture`}
            fill
            className="object-cover rounded-full"
            sizes="(max-width: 768px) 160px, 208px"
            priority
          />
        </div>
        <div className="md:flex-1 text-center md:text-left">
          <p className="text-lg md:text-xl leading-relaxed text-gray-300">
            {profile.about}
          </p>
          <p className="mt-4 text-gray-400">
            Currently a second year Computer Science student at Western University with Ivey Business School AEO.
          </p>
        </div>
      </div>
      
      {/* Education Section */}
      <div className="bg-gray-900/40 backdrop-blur-md p-5 md:p-8 rounded-2xl border border-gray-800/80 shadow-xl">
        <h3 className="text-xl font-semibold mb-6 text-[#00EFCF] flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
          </svg>
          Education
        </h3>
        <div className="space-y-6">
          {profile.education.map((edu, index) => (
            <div key={index} className="border-l-2 border-[#00C16A]/30 pl-3 md:pl-5 ml-1 md:ml-2">
              <h4 className="text-base md:text-lg font-medium text-white">{edu.institution}</h4>
              <p className="text-sm md:text-base text-gray-300 font-medium">{edu.degree}</p>
              <p className="text-xs md:text-sm text-gray-400">{edu.details}</p>
              <p className="text-xs text-gray-500 mt-1">{edu.period}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Experience Section */}
      <div className="bg-gray-900/40 backdrop-blur-md p-5 md:p-8 rounded-2xl border border-gray-800/80 shadow-xl">
        <h3 className="text-xl font-semibold mb-6 text-[#00C16A] flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
          Experience
        </h3>
        <div className="space-y-8">
          {profile.experience.map((exp, index) => (
            <div key={index} className="border-l-2 border-[#00EFCF]/30 pl-3 md:pl-5 ml-1 md:ml-2">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <h4 className="text-base md:text-lg font-medium text-white">{exp.company}</h4>
                <span className="text-xs bg-[#00C16A]/20 px-2 md:px-3 py-1 rounded-full text-[#00EFCF]">{exp.period}</span>
              </div>
              <p className="text-sm md:text-base text-gray-300 font-medium">{exp.position}</p>
              <p className="text-xs md:text-sm text-gray-400 mt-1 whitespace-pre-line">{exp.details}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {exp.technologies.split(', ').map((tech, i) => (
                  <span key={i} className="text-xs bg-gray-800/70 px-2 py-0.5 md:px-2.5 md:py-1 rounded-full text-gray-300 border border-gray-700/50">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
} 