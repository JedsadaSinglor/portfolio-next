"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ParticleBackground } from "@/components/particle-background"
import { Dock } from "@/components/dock"
import { ProfileCard } from "@/components/profile-card"
import { QuickStatsCard } from "@/components/quick-stats-card"
import { ProjectsPreviewCard } from "@/components/projects-preview-card"
import { SkillsPreviewCard } from "@/components/skills-preview-card"
import { BlogPreviewCard } from "@/components/blog-preview-card"
import { ContactCard } from "@/components/contact-card"
import { ExperienceCard } from "@/components/experience-card"
import { StatusCard } from "@/components/status-card"

const translations = {
  en: {
    welcome: "Welcome to my portfolio",
  },
  th: {
    welcome: "ยินดีต้อนรับสู่พอร์ตโฟลิโอของฉัน",
  },
}

export default function HomePage() {
  const [language, setLanguage] = useState("en")
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const t = translations[language as keyof typeof translations]

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const handleCardClick = (route: string) => {
    router.push(route)
  }

  return (
    <div className="min-h-dvh w-full bg-gradient-to-br from-[#f8fafc] via-[#e9e9f7] to-[#e0e7ef] dark:from-[#18181b] dark:via-[#232336] dark:to-[#1a1a2e] text-slate-900 dark:text-slate-100 relative overflow-hidden transition-colors duration-700 font-sans">
      <ParticleBackground />
      <div className="relative z-10 min-h-dvh w-full flex flex-col items-center justify-center">
        {/* Hero Title Section */}



        {/* Main Grid Layout */}
        <div className="w-full max-w-7xl px-2 md:px-8 pb-14 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-8 gap-4 md:gap-7 auto-rows-[170px] md:auto-rows-[210px] lg:auto-rows-[230px] xl:auto-rows-[180px]">
            {/* Profile - Large Modern Card */}
            <motion.div
              className="sm:col-span-4 row-span-2 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 border-0 rounded-[2.2rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.18)] flex flex-col items-stretch p-0 overflow-hidden transition-transform duration-200 backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/20 cursor-pointer group"
              onClick={() => handleCardClick("/about")}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.6, type: "spring" }}
              whileHover={{ scale: 1.04, rotate: -1 }}
            >
              <span className="absolute inset-0 pointer-events-none group-hover:animate-ripple bg-gradient-to-br from-blue-400/10 to-indigo-400/10" />
              <ProfileCard language={language} />
            </motion.div>
            {/* Experience */}
            <motion.div
              className="sm:col-span-2 row-span-1 bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-900 dark:to-amber-900 border-0 rounded-[2.2rem] shadow-[0_4px_16px_0_rgba(31,38,135,0.10)] flex flex-col items-stretch p-0 overflow-hidden transition-transform duration-200 backdrop-blur-lg ring-1 ring-black/5 dark:ring-orange-900/20 cursor-pointer group"
              onClick={() => handleCardClick("/experience")}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.6, type: "spring" }}
              whileHover={{ scale: 1.06, rotate: 1 }}
            >
              <span className="absolute inset-0 pointer-events-none group-hover:animate-ripple bg-gradient-to-br from-orange-400/10 to-amber-400/10" />
              <ExperienceCard language={language} />
            </motion.div>
            {/* Status */}
            <motion.div
              className="sm:col-span-2 row-span-1 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900 dark:to-emerald-900 border-0 rounded-[2.2rem] shadow-[0_4px_16px_0_rgba(31,38,135,0.10)] flex flex-col items-stretch p-0 overflow-hidden transition-transform duration-200 backdrop-blur-lg ring-1 ring-black/5 dark:ring-green-900/20 cursor-pointer group"
              onClick={() => handleCardClick("/contact")}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.19, duration: 0.6, type: "spring" }}
              whileHover={{ scale: 1.06, rotate: -1 }}
            >
              <span className="absolute inset-0 pointer-events-none group-hover:animate-ripple bg-gradient-to-br from-green-400/10 to-emerald-400/10" />
              <StatusCard language={language} />
            </motion.div>
            {/* Featured Projects */}
            <motion.div
              className="sm:col-span-2 row-span-1 bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900 dark:to-violet-900 border-0 rounded-[2.2rem] shadow-[0_4px_16px_0_rgba(31,38,135,0.10)] flex flex-col items-stretch p-0 overflow-hidden transition-transform duration-200 backdrop-blur-lg ring-1 ring-black/5 dark:ring-violet-900/20 cursor-pointer group"
              onClick={() => handleCardClick("/projects")}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.26, duration: 0.6, type: "spring" }}
              whileHover={{ scale: 1.06, rotate: 1 }}
            >
              <span className="absolute inset-0 pointer-events-none group-hover:animate-ripple bg-gradient-to-br from-purple-400/10 to-violet-400/10" />
              <ProjectsPreviewCard language={language} />
            </motion.div>
            {/* Blog */}
            <motion.div
              className="sm:col-span-2 row-span-2 bg-gradient-to-br from-pink-50 to-fuchsia-100 dark:from-pink-900 dark:to-fuchsia-900 border-0 rounded-[2.2rem] shadow-[0_4px_16px_0_rgba(31,38,135,0.10)] flex flex-col items-stretch p-0 overflow-hidden transition-transform duration-200 backdrop-blur-lg ring-1 ring-black/5 dark:ring-fuchsia-900/20 cursor-pointer group"
              onClick={() => handleCardClick("/blog")}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.33, duration: 0.6, type: "spring" }}
              whileHover={{ scale: 1.06, rotate: -2 }}
            >
              <span className="absolute inset-0 pointer-events-none group-hover:animate-ripple bg-gradient-to-br from-pink-400/10 to-fuchsia-400/10" />
              <BlogPreviewCard language={language} />
            </motion.div>
            {/* Contact */}
            <motion.div
              className="sm:col-span-2 row-span-1 bg-gradient-to-br from-rose-50 to-red-100 dark:from-rose-900 dark:to-red-900 border-0 rounded-[2.2rem] shadow-[0_4px_16px_0_rgba(31,38,135,0.10)] flex flex-col items-stretch p-0 overflow-hidden transition-transform duration-200 backdrop-blur-lg ring-1 ring-black/5 dark:ring-rose-900/20 cursor-pointer group"
              onClick={() => handleCardClick("/contact")}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.40, duration: 0.6, type: "spring" }}
              whileHover={{ scale: 1.06, rotate: 2 }}
            >
              <span className="absolute inset-0 pointer-events-none group-hover:animate-ripple bg-gradient-to-br from-rose-400/10 to-red-400/10" />
              <ContactCard language={language} />
            </motion.div>
            {/* Skill */}
            <motion.div
              className="sm:col-span-4 row-span-1 bg-gradient-to-br from-sky-100 to-cyan-100 dark:from-sky-900 dark:to-cyan-900 border-0 rounded-[2.2rem] shadow-[0_4px_16px_0_rgba(31,38,135,0.10)] flex flex-col items-stretch p-0 overflow-hidden transition-transform duration-200 backdrop-blur-lg ring-1 ring-black/5 dark:ring-cyan-900/20 cursor-pointer group"
              onClick={() => handleCardClick("/skills")}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.47, duration: 0.6, type: "spring" }}
              whileHover={{ scale: 1.06, rotate: -2 }}
            >
              <span className="absolute inset-0 pointer-events-none group-hover:animate-ripple bg-gradient-to-br from-sky-400/10 to-cyan-400/10" />
              <SkillsPreviewCard language={language} />
            </motion.div>
            
          </div>
        </div>
      </div>
      <Dock
        language={language}
        setLanguage={setLanguage}
      />
    </div>
  )
}
