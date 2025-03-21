"use client";

import { motion } from "framer-motion";

interface Skill {
  name: string;
  icon: string;
}

interface SkillsSectionProps {
  skills: Skill[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="space-y-12"
    >
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 mb-8">Skills</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
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
    </motion.section>
  );
} 