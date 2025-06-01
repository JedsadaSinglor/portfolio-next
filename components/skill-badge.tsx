"use client"

import { motion } from "framer-motion"

interface SkillBadgeProps {
  skill: string
  index: number
}

export function SkillBadge({ skill, index }: SkillBadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      className="inline-block bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium border border-blue-500/30 hover:bg-blue-500/30 transition-all duration-200"
    >
      {skill}
    </motion.span>
  )
}
