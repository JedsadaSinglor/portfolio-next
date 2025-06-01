"use client"

import { motion } from "framer-motion"
import { BentoCard } from "./bento-card"
import { Trophy, Star, Target, TrendingUp } from "lucide-react"

interface QuickStatsCardProps {
  language: string
}

const translations = {
  en: {
    title: "Achievements",
    gpa: "3.66",
    gpaLabel: "GPA",
    rank: "Top 10%",
    rankLabel: "Class Rank",
    projects: "5+",
    projectsLabel: "Projects",
    cta: "View Details",
  },
  th: {
    title: "ผลงาน",
    gpa: "3.66",
    gpaLabel: "เกรดเฉลี่ย",
    rank: "ท็อป 10%",
    rankLabel: "อันดับในชั้น",
    projects: "5+",
    projectsLabel: "โปรเจกต์",
    cta: "ดูรายละเอียด",
  },
}

export function QuickStatsCard({ language }: QuickStatsCardProps) {
  const t = translations[language as keyof typeof translations]

  const stats = [
    {
      icon: Trophy,
      value: t.gpa,
      label: t.gpaLabel,
      color: "text-yellow-600 dark:text-yellow-400",
      bgColor: "bg-yellow-500/10 dark:bg-yellow-500/20",
    },
    {
      icon: Star,
      value: t.rank,
      label: t.rankLabel,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-500/10 dark:bg-blue-500/20",
    },
    {
      icon: Target,
      value: t.projects,
      label: t.projectsLabel,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-500/10 dark:bg-green-500/20",
    },
  ]

  return (
    <BentoCard className="h-full bg-gradient-to-br from-amber-50/50 to-orange-100/50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200/30 dark:border-amber-800/30">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-amber-500/10 dark:bg-amber-500/20">
            <TrendingUp className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <span className="text-sm font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            {t.title}
          </span>
        </div>

        {/* Stats */}
        <div className="space-y-4 flex-1">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                className="flex items-center gap-4 p-3 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-white/30 dark:border-slate-700/30"
              >
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <div className="flex-1">
                  <div className="text-lg font-bold text-slate-900 dark:text-slate-100">{stat.value}</div>
                  <div className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-4 text-center">
          <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            {t.cta}
          </span>
        </div>
      </div>
    </BentoCard>
  )
}
