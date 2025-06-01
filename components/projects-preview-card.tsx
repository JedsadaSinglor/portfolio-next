"use client"

import { motion } from "framer-motion"
import { BentoCard } from "./bento-card"
import { Code, Shield, ArrowRight, FolderOpen } from "lucide-react"

interface ProjectsPreviewCardProps {
  language: string
}

const translations = {
  en: {
    title: "Projects",
    project1: "Pentest Walkthroughs",
    project1Desc: "Comprehensive security testing documentation",
    project2: "Security Assessment Tools",
    project2Desc: "Automated vulnerability scanning solutions",
    project3: "Web Security Testing",
    project3Desc: "OWASP Top 10 vulnerability analysis",
    cta: "Explore All Projects",
  },
  th: {
    title: "โปรเจกต์",
    project1: "คู่มือการทดสอบเจาะระบบ",
    project1Desc: "เอกสารการทดสอบความปลอดภัยอย่างครอบคลุม",
    project2: "เครื่องมือประเมินความปลอดภัย",
    project2Desc: "โซลูชันการสแกนช่องโหว่อัตโนมัติ",
    project3: "การทดสอบความปลอดภัยเว็บ",
    project3Desc: "การวิเคราะห์ช่องโหว่ OWASP Top 10",
    cta: "สำรวจโปรเจกต์ทั้งหมด",
  },
}

export function ProjectsPreviewCard({ language }: ProjectsPreviewCardProps) {
  const t = translations[language as keyof typeof translations]

  const projects = [
    {
      name: t.project1,
      desc: t.project1Desc,
      icon: Shield,
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-500/10 dark:bg-red-500/20",
    },
    {
      name: t.project2,
      desc: t.project2Desc,
      icon: Code,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-500/10 dark:bg-blue-500/20",
    },
    {
      name: t.project3,
      desc: t.project3Desc,
      icon: Shield,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-500/10 dark:bg-purple-500/20",
    },
  ]

  return (
    <BentoCard className="h-full bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900 dark:to-violet-900 border-purple-200/30 dark:border-purple-800/30">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-4 mt-2">
          <div className="p-3 rounded-2xl bg-purple-500/10 dark:bg-purple-500/20">
            <FolderOpen className="w-12 h-12 text-purple-600 dark:text-purple-400" />
          </div>
          <span className="text-lg font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
            {t.title}
          </span>
        </div>
        
      </div>
    </BentoCard>
  )
}
