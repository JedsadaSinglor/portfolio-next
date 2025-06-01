"use client"

import { motion } from "framer-motion"
import { BentoCard } from "./bento-card"
import { FileText, Calendar, ArrowRight, BookOpen } from "lucide-react"

interface BlogPreviewCardProps {
  language: string
}

const translations = {
  en: {
    title: "Latest Writeups",
    post1: "TryHackMe: Katana Walkthrough",
    post2: "HackTheBox: Dawn Analysis",
    date1: "2 days ago",
    date2: "1 week ago",
    cta: "Read All Posts",
  },
  th: {
    title: "บทความล่าสุด",
    post1: "TryHackMe: คู่มือ Katana",
    post2: "HackTheBox: การวิเคราะห์ Dawn",
    date1: "2 วันที่แล้ว",
    date2: "1 สัปดาห์ที่แล้ว",
    cta: "อ่านบทความทั้งหมด",
  },
}

export function BlogPreviewCard({ language }: BlogPreviewCardProps) {
  const t = translations[language as keyof typeof translations]

  const posts = [
    { title: t.post1, date: t.date1 },
    { title: t.post2, date: t.date2 },
  ]

  return (
    <BentoCard className="h-full bg-gradient-to-br from-indigo-50/50 to-blue-100/50 dark:from-indigo-950/30 dark:to-blue-950/30 border-indigo-200/30 dark:border-indigo-800/30">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20">
            <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            {t.title}
          </span>
        </div>

        {/* Posts */}
        <div className="space-y-4 flex-1">
          {posts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              className="p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-white/30 dark:border-slate-700/30 hover:bg-white/70 dark:hover:bg-slate-700/50 transition-colors duration-300"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/10 dark:bg-indigo-500/20 flex-shrink-0">
                  <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2 text-sm leading-snug">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <Calendar className="w-3 h-3" />
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="flex items-center justify-between p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-indigo-200/30 dark:border-indigo-700/30 group-hover:bg-white/70 dark:group-hover:bg-slate-700/50 transition-colors duration-300 mt-4"
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t.cta}</span>
          <ArrowRight className="w-4 h-4 text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform duration-300" />
        </motion.div>
      </div>
    </BentoCard>
  )
}
