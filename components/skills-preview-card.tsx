"use client"

import { motion } from "framer-motion"
import { BentoCard } from "./bento-card"
import { Code, Database, Shield, ArrowRight, Zap } from "lucide-react"
import { useState } from "react"
import { SiPython, SiJavascript, SiBurpsuite, SiMetasploit, SiMysql, SiSqlite, SiMongodb } from "react-icons/si"
import { FaJava } from "react-icons/fa"

interface SkillsPreviewCardProps {
  language: string
}

const translations = {
  en: {
    title: "Skills",
    programming: "Programming",
    programmingSkills: ["Python", "JavaScript", "Java"],
    security: "Cybersecurity",
    securitySkills: ["Nmap", "Burp Suite", "Metasploit"],
    database: "Database",
    databaseSkills: ["MySQL", "SQLite", "MongoDB"],
    cta: "View All Skills",
  },
  th: {
    title: "ทักษะ",
    programming: "การเขียนโปรแกรม",
    programmingSkills: ["Python", "JavaScript", "Java"],
    security: "ไซเบอร์ซีเคียวริตี้",
    securitySkills: ["Nmap", "Burp Suite", "Metasploit"],
    database: "ฐานข้อมูล",
    databaseSkills: ["MySQL", "SQLite", "MongoDB"],
    cta: "ดูทักษะทั้งหมด",
  },
}

// marquee icon mapping (เฉพาะ skill ที่ใช้ใน preview)
const marqueeSkillIcons: Record<string, React.ReactNode> = {
  Python: <SiPython className="text-yellow-500 text-xl" />,
  JavaScript: <SiJavascript className="text-yellow-400 text-xl" />,
  Java: <FaJava className="text-orange-500 text-xl" />,
  Nmap: <Shield className="w-5 h-5 text-blue-500" />,
  "Burp Suite": <SiBurpsuite className="text-orange-500 text-xl" />,
  Metasploit: <SiMetasploit className="text-red-500 text-xl" />,
  MySQL: <SiMysql className="text-blue-700 text-xl" />,
  SQLite: <SiSqlite className="text-blue-400 text-xl" />,
  MongoDB: <SiMongodb className="text-green-700 text-xl" />,
}

export function SkillsPreviewCard({ language }: SkillsPreviewCardProps) {
  const t = translations[language as keyof typeof translations]
  const [isHovered, setIsHovered] = useState(false)

  const skillCategories = [
    {
      name: "Programming",
      icon: Code,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-500/10 dark:bg-green-500/20",
      skills: t.programmingSkills,
    },
    {
      name: "Security",
      icon: Shield,
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-500/10 dark:bg-red-500/20",
      skills: t.securitySkills,
    },
    {
      name: "Database",
      icon: Database,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-500/10 dark:bg-blue-500/20",
      skills: t.databaseSkills,
    },
  ]

  // รวม skill ทั้งหมดสำหรับ marquee
  const allSkills = skillCategories.flatMap(cat => cat.skills)

  return (
    <BentoCard
      className="h-full bg-gradient-to-br from-sky-100 to-cyan-100 dark:from-sky-900 dark:to-cyan-900 border-cyan-200/30 dark:border-cyan-800/30 cursor-pointer"
    >
      <div
        className="h-full flex flex-col items-center justify-center relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Preview Mode */}
        <motion.div
          initial={false}
          animate={{ opacity: isHovered ? 0 : 1, y: isHovered ? -10 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ pointerEvents: isHovered ? "none" : "auto" }}
        >
          <div className="p-3 rounded-2xl bg-sky-200/40 dark:bg-cyan-800/30">
            <Zap className="w-12 h-12 text-sky-600 dark:text-cyan-300" />
          </div>
          <span className="text-lg font-bold text-sky-700 dark:text-cyan-200 uppercase tracking-wider text-center mt-2">
            {t.title}
          </span>
        </motion.div>
        {/* Marquee Mode */}
        <motion.div
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ pointerEvents: isHovered ? "auto" : "none" }}
        >
          <div className="w-full overflow-hidden">
            <motion.div
              animate={{ x: [0, -320] }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="flex gap-6 whitespace-nowrap"
            >
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex gap-6">
                  {allSkills.map((skill, idx) => (
                    <div
                      key={`${setIndex}-${idx}`}
                      className="bg-gradient-to-r from-sky-100/60 to-cyan-100/60 dark:from-sky-900/40 dark:to-cyan-900/40 rounded-xl px-4 py-2 border border-cyan-400/20 flex-shrink-0 flex items-center gap-2 shadow-sm hover:scale-105 transition-transform duration-200"
                    >
                      <span className="text-xl animate-wiggle-slow">{marqueeSkillIcons[skill] ?? <Code className="w-5 h-5" />}</span>
                      <span className="text-base font-semibold">{skill}</span>
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </BentoCard>
  )
}
