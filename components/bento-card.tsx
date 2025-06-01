"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface BentoCardProps {
  children: ReactNode
  className?: string
  delay?: number
  hover?: boolean
  size?: "small" | "medium" | "large" | "wide" | "tall"
}

const sizeClasses = {
  small: "col-span-1 row-span-1",
  medium: "col-span-1 md:col-span-2 row-span-1",
  large: "col-span-1 md:col-span-2 lg:col-span-2 row-span-2",
  wide: "col-span-1 md:col-span-2 lg:col-span-3 row-span-1",
  tall: "col-span-1 row-span-2",
}

export function BentoCard({ children, className = "", delay = 0, hover = true, size = "medium" }: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={
        hover
          ? {
              y: 0,
              scale: 1.02,
              transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
            }
          : {}
      }
      className={`
        ${sizeClasses[size]}
        group relative overflow-hidden
        bg-white/80 dark:bg-[#18181b]/90 
        backdrop-blur-xl
        border border-slate-200/50 dark:border-slate-700/50
        rounded-3xl
        shadow-lg shadow-slate-900/5 dark:shadow-slate-900/20
        hover:shadow-2xl hover:shadow-slate-900/10 dark:hover:shadow-slate-900/40
        hover:border-slate-300/60 dark:hover:border-slate-600/60
        transition-all duration-500 ease-out
        cursor-pointer
        ${className}
      `}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-slate-100/20 dark:from-slate-700/20 dark:via-transparent dark:to-slate-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content */}
      <div className="relative z-10 h-full p-6 lg:p-8">{children}</div>

      {/* Subtle border glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/5 group-hover:to-blue-500/10 transition-all duration-500" />
    </motion.div>
  )
}
