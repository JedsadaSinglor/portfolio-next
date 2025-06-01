"use client"

import { motion } from "framer-motion"
import { BentoCard } from "./bento-card"
import { Award, Star, ArrowRight, Trophy } from "lucide-react"

interface ExperienceCardProps {
  language: string
}

const translations = {
  en: {
    title: "Experience",
    tryhackme: "TryHackMe",
    hackthebox: "HackTheBox",
    rank: "Top 10%",
    level: "Script Kiddie",
    cta: "View Timeline",
  },
  th: {
    title: "ประสบการณ์",
    tryhackme: "TryHackMe",
    hackthebox: "HackTheBox",
    rank: "ท็อป 10%",
    level: "Script Kiddie",
    cta: "ดูไทม์ไลน์",
  },
}

export function ExperienceCard({ language }: ExperienceCardProps) {
  const t = translations[language as keyof typeof translations]

  const experiences = [
    {
      platform: t.tryhackme,
      achievement: t.rank,
      icon: Star,
      color: "text-yellow-600 dark:text-yellow-400",
      bgColor: "bg-yellow-500/10 dark:bg-yellow-500/20",
    },
    {
      platform: t.hackthebox,
      achievement: t.level,
      icon: Award,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-500/10 dark:bg-green-500/20",
    },
  ]

  return (
    <BentoCard className="h-full bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-900 dark:to-amber-900 border-orange-200/30 dark:border-orange-800/30">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-4 mt-2">
          <div className="p-3 rounded-2xl bg-orange-500/10 dark:bg-orange-500/20 mb-2">
            <Trophy className="w-12 h-12 text-orange-600 dark:text-orange-400" />
          </div>
          
          <span className="text-lg font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider text-center">
            {t.title}
          </span>
        </div>

        {/* Experience Items */}
        {/* <div className="space-y-4 flex-1">
          {experiences.map((exp, index) => {
            const Icon = exp.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                className="p-3 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-white/30 dark:border-slate-700/30"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${exp.bgColor}`}>
                    <Icon className={`w-4 h-4 ${exp.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-slate-900 dark:text-slate-100 text-sm">{exp.platform}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">{exp.achievement}</div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div> */}

        {/* CTA */}
        {/* <motion.div
          className="flex items-center justify-between p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-orange-200/30 dark:border-orange-700/30 group-hover:bg-white/70 dark:group-hover:bg-slate-700/50 transition-colors duration-300 mt-4"
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t.cta}</span>
          <ArrowRight className="w-4 h-4 text-orange-600 dark:text-orange-400 group-hover:translate-x-1 transition-transform duration-300" />
        </motion.div> */}
      </div>
    </BentoCard>
  )
}
