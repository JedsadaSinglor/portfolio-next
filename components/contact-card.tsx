"use client"

import { motion } from "framer-motion"
import { BentoCard } from "./bento-card"
import { Mail, Phone, MessageCircle, ArrowRight, Send } from "lucide-react"

interface ContactCardProps {
  language: string
}

const translations = {
  en: {
    title: "Get In Touch",
    subtitle: "Let's discuss opportunities",
    cta: "Contact Me",
  },
  th: {
    title: "ติดต่อฉัน",
    subtitle: "มาคุยกันเรื่องโอกาสใหม่ๆ",
    cta: "ติดต่อฉัน",
  },
}

export function ContactCard({ language }: ContactCardProps) {
  const t = translations[language as keyof typeof translations]

  const contactMethods = [
    { icon: Mail, color: "text-blue-600 dark:text-blue-400", bgColor: "bg-blue-500/10 dark:bg-blue-500/20" },
    { icon: Phone, color: "text-green-600 dark:text-green-400", bgColor: "bg-green-500/10 dark:bg-green-500/20" },
    {
      icon: MessageCircle,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-500/10 dark:bg-purple-500/20",
    },
  ]

  return (
    <BentoCard className="h-full bg-gradient-to-br from-rose-50 to-red-100 dark:from-rose-900 dark:to-red-900 border-rose-200/30 dark:border-rose-800/30">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="p-3 rounded-2xl bg-rose-500/10 dark:bg-rose-500/20 mb-2">
            <Send className="w-12 h-12 text-rose-600 dark:text-rose-400" />
          </div>
          <span className="text-lg font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider text-center">
            {t.title}
          </span>
          <span className="text-sm text-rose-500 dark:text-rose-300 text-center mt-1">
            {t.subtitle}
          </span>
        </div>

        
      </div>
    </BentoCard>
  )
}
