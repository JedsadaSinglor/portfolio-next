"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowLeft, Code, Shield, Database, Server, Globe, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ParticleBackground } from "@/components/particle-background"
import { BentoCard } from "@/components/bento-card"
import { SkillBadge } from "@/components/skill-badge"
import { SiPython, SiJavascript, SiMysql, SiLinux, SiDocker, SiReact, SiDjango, SiMetasploit, SiCplusplus, SiTypescript, SiGnubash,SiBurpsuite,SiOwasp,SiWireshark, SiGit,SiVmware     } from "react-icons/si"
import { FaJava } from "react-icons/fa";

const translations = {
  en: {
    title: "Skills & Technologies",
    subtitle: "Technical expertise and tools I work with",
    programming: "Programming Languages",
    cybersecurity: "Cybersecurity Tools",
    database: "Database & Data Science",
    frameworks: "Frameworks & Libraries",
    platforms: "Platforms & OS",
    softSkills: "Soft Skills",
    back: "Back to Home",
  },
  th: {
    title: "ทักษะและเทคโนโลยี",
    subtitle: "ความเชี่ยวชาญทางเทคนิคและเครื่องมือที่ใช้งาน",
    programming: "ภาษาโปรแกรมมิ่ง",
    cybersecurity: "เครื่องมือไซเบอร์ซีเคียวริตี้",
    database: "ฐานข้อมูลและวิทยาศาสตร์ข้อมูล",
    frameworks: "เฟรมเวิร์กและไลบรารี",
    platforms: "แพลตฟอร์มและระบบปฏิบัติการ",
    softSkills: "ทักษะด้านบุคลิกภาพ",
    back: "กลับหน้าหลัก",
  },
}

const skillCategories = [
  {
    id: "programming",
    icon: Code,
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30",
    iconColor: "text-green-500",
    skills: ["Python", "JavaScript", "Java", "TypeScript", "C++", "Bash/Shell", "PowerShell", "SQL"],
  },
  {
    id: "cybersecurity",
    icon: Shield,
    color: "from-red-500/20 to-rose-500/20",
    borderColor: "border-red-500/30",
    iconColor: "text-red-500",
    skills: [
      "Nmap",
      "Burp Suite",
      "Metasploit",
      "Nessus",
      "SQLmap",
      "LinPEAS",
      "OWASP ZAP",
      "Wireshark",
      "John the Ripper",
      "Hashcat",
    ],
  },
  {
    id: "database",
    icon: Database,
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
    iconColor: "text-blue-500",
    skills: ["MySQL", "SQLite", "PostgreSQL", "MongoDB", "Pandas", "NumPy", "Scikit-learn", "Matplotlib"],
  },
  {
    id: "frameworks",
    icon: Globe,
    color: "from-purple-500/20 to-violet-500/20",
    borderColor: "border-purple-500/30",
    iconColor: "text-purple-500",
    skills: ["Django", "React", "Next.js", "Flask", "FastAPI", "Node.js", "Express.js", "TailwindCSS"],
  },
  {
    id: "platforms",
    icon: Server,
    color: "from-orange-500/20 to-amber-500/20",
    borderColor: "border-orange-500/30",
    iconColor: "text-orange-500",
    skills: ["Windows", "Linux (Kali, Ubuntu)", "macOS", "Docker", "Git", "GitHub", "AWS", "VirtualBox"],
  },
  {
    id: "softSkills",
    icon: Brain,
    color: "from-pink-500/20 to-rose-500/20",
    borderColor: "border-pink-500/30",
    iconColor: "text-pink-500",
    skills: [
      "Time Management",
      "Flexibility and Adaptability",
      "Analytic and Critical Thinking",
      "Decision Making",
      "Curiosity and Lifelong Learning",
      "Problem Solving",
      "Team Collaboration",
    ],
  },
]

// Icon mapping for all skills
const skillIcons: Record<string, React.ReactNode> = {
  Python: <SiPython className="text-yellow-500" />,
  JavaScript: <SiJavascript className="text-yellow-400" />,
  Java: <FaJava className="text-orange-600" />,
  TypeScript: <SiTypescript className="text-blue-500" />,
  "C++": <SiCplusplus className="text-blue-700" />,
  "Bash/Shell": <SiGnubash  className="text-black" />,
  SQL: <SiMysql className="text-blue-700" />,
  "Burp Suite": <SiBurpsuite className="text-orange-500" />,
  Metasploit: <SiMetasploit className="text-red-500" />,
  SQLmap: <SiMysql className="text-blue-700" />,
  "OWASP ZAP": <SiOwasp className="text-orange-400" />,
  Wireshark: <SiWireshark className="text-blue-400" />,
  Django: <SiDjango className="text-green-700" />,
  React: <SiReact className="text-cyan-400" />,
  "Next.js": <SiReact className="text-black" />,
  Git: <SiGit className="text-orange-500" />,
  Vmware : <SiVmware  className="text-blue-500" />,
}

// 1. เพิ่ม mapping skill → icon/emoji สำหรับ marquee
const marqueeSkillIcons: Record<string, React.ReactNode> = {
  Python: <SiPython className="text-yellow-500 text-2xl" />,
  JavaScript: <SiJavascript className="text-yellow-400 text-2xl" />,
  "Burp Suite": <SiBurpsuite className="text-orange-500 text-2xl" />,
  MySQL: <SiMysql className="text-blue-700 text-2xl" />,
  Linux: <SiLinux className="text-black text-2xl" />,
  Docker: <SiDocker className="text-blue-400 text-2xl" />,
  React: <SiReact className="text-cyan-400 text-2xl" />,
  Django: <SiDjango className="text-green-700 text-2xl" />,
  Metasploit: <SiMetasploit className="text-red-500 text-2xl" />,
}

export default function SkillsPage() {
  const [language, setLanguage] = useState("en")
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const t = translations[language as keyof typeof translations]

  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 dark:from-slate-900 dark:via-blue-900 dark:to-slate-900 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-500">
      <ParticleBackground />

      <div className="relative z-10 p-4 md:p-6 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-8"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="rounded-full bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t.title}
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mt-2">{t.subtitle}</p>
          </div>
        </motion.div>

        {/* Core Skills Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
            <Code className="w-6 h-6 text-blue-500 animate-bounce" /> Core Technologies
          </h2>
          <div className="relative overflow-hidden">
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="flex gap-6 whitespace-nowrap"
            >
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex gap-6">
                  {[
                    "Python",
                    "JavaScript",
                    "Nmap",
                    "Burp Suite",
                    "MySQL",
                    "Linux",
                    "Docker",
                    "React",
                    "Django",
                    "Metasploit",
                  ].map((skill, index) => (
                    <div
                      key={`${setIndex}-${index}`}
                      className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl px-6 py-3 border border-blue-500/30 flex-shrink-0 flex items-center gap-2 shadow-md hover:scale-105 transition-transform duration-200"
                    >
                      <span className="text-2xl animate-wiggle-slow">{marqueeSkillIcons[skill] ?? <Code className="w-5 h-5" />}</span>
                      <span className="text-lg font-semibold">{skill}</span>
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Skills Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = category.icon
            const categoryTitle = t[category.id as keyof typeof t] as string

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + categoryIndex * 0.1 }}
              >
                <BentoCard className={`p-8 h-full bg-gradient-to-br ${category.color} ${category.borderColor} shadow-xl hover:shadow-2xl transition-shadow duration-300`}> {/* เพิ่ม padding, shadow */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-4 rounded-2xl bg-white/30 dark:bg-white/10 shadow-inner animate-bounce-slow`}>
                      <Icon className={`w-8 h-8 ${category.iconColor}`} />
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight">{categoryTitle}</h3>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * skillIndex, duration: 0.4, type: "spring" }}
                        whileHover={{ scale: 1.12, rotate: 3, boxShadow: "0 4px 24px 0 rgba(0,0,0,0.10)" }}
                        whileTap={{ scale: 0.96, rotate: -3 }}
                        className="cursor-pointer group"
                      >
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 shadow-sm group-hover:shadow-lg transition-all duration-200">
                          <span className="text-xl md:text-2xl">{skillIcons[skill] ?? <Code className="w-5 h-5" />}</span>
                          <span className="font-medium text-base md:text-lg select-none">{skill}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </BentoCard>
              </motion.div>
            )
          })}
        </div>

        {/* Proficiency Levels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12"
        >
          <BentoCard className="p-6">
            <h3 className="text-2xl font-bold mb-6 text-center">Proficiency Levels</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">90%</span>
                </div>
                <h4 className="font-semibold mb-2">Expert</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">Python, Cybersecurity Tools, Linux</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">80%</span>
                </div>
                <h4 className="font-semibold mb-2">Advanced</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">JavaScript, SQL, Network Security</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">70%</span>
                </div>
                <h4 className="font-semibold mb-2">Intermediate</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">React, Django, Data Science</p>
              </div>
            </div>
          </BentoCard>
        </motion.div>
      </div>
    </div>
  )
}
