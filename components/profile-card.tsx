"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { BentoCard } from "./bento-card"
import { MapPin, ArrowRight, User } from "lucide-react"

interface ProfileCardProps {
  language: string
}

const translations = {
  en: {
    name: "Jedsada Singlor",
    title: "Data Science & Cybersecurity",
    location: "Bangkok, Thailand",
    // status: "Available for opportunities",
    cta: "Learn More About Me",
  },
  th: {
    name: "เจษฎา สิงห์ลอ",
    title: "วิทยาศาสตร์ข้อมูลและไซเบอร์ซีเคียวริตี้",
    location: "กรุงเทพฯ ประเทศไทย",
    // status: "พร้อมรับโอกาสใหม่",
    cta: "เรียนรู้เพิ่มเติมเกี่ยวกับฉัน",
  },
}

export function ProfileCard({ language }: ProfileCardProps) {
  const t = translations[language as keyof typeof translations]

  return (
    <BentoCard className="h-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 border-blue-200/30 dark:border-blue-800/30 p-3 md:p-4">
      <div className="flex flex-col h-full">
        {/* Header with Icon */}
        <div className="flex items-center gap-2 mb-3 md:mb-4">
          <div className="p-1.5 rounded-xl bg-blue-500/10 dark:bg-blue-500/20">
            <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <span className="text-xs md:text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Profile
          </span>
        </div>

        {/* Profile Content */}
        <div className="flex items-start gap-6 md:gap-8 mb-3 md:mb-4 flex-1 min-h-0">
          <motion.div
            className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src="/BC040D41-7413-443C-8B8E-B123DF239602.png"
              alt="Jedsada Singlor"
              fill
              className="rounded-2xl object-cover border border-blue-200/50 dark:border-blue-700/50"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-500/10 to-transparent" />
          </motion.div>

          <div className="flex-1 min-w-0 my-auto">
            <h2 className="text-xl md:text-2xl font-bold mb-1 text-slate-900 dark:text-slate-100 truncate">{t.name}</h2>
            <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm md:text-base mb-2 leading-snug truncate">
              {t.title}
            </p>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span className="text-sm font-medium truncate">{t.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="flex items-center justify-between mt-auto p-2 md:p-3 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-blue-200/30 dark:border-blue-700/30 group-hover:bg-white/70 dark:group-hover:bg-slate-700/50 transition-colors duration-300"
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <span className="text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300 truncate">{t.cta}</span>
          <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform duration-300" />
        </motion.div>
      </div>
    </BentoCard>
  )
}
