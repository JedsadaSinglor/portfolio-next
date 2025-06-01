"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Sun, Moon, Download, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useRouter, usePathname } from "next/navigation"

interface DockProps {
  language: string
  setLanguage?: (lang: string) => void
}

export function Dock({ language, setLanguage }: DockProps) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  const handleDownloadCV = () => {
    // Create a download link for CV
    const link = document.createElement("a")
    link.href = "/jedsada-cv.pdf"
    link.download = "Jedsada_Singlor_CV.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const dockItems = [
    {
      id: "home",
      icon: Home,
      label: "Home",
      action: () => router.push("/"),
      show: pathname !== "/",
    },
    {
      id: "theme",
      icon: mounted && (resolvedTheme === "dark" || theme === "dark") ? Sun : Moon,
      label: mounted && (resolvedTheme === "dark" || theme === "dark") ? "Light Mode" : "Dark Mode",
      action: () => setTheme(theme === "dark" ? "light" : "dark"),
      show: true,
    },
    {
      id: "language",
      icon: null, // remove icon
      label: language === "en" ? "ไทย" : "English",
      action: () => setLanguage && setLanguage(language === "en" ? "th" : "en"),
      show: true,
    },
    {
      id: "download",
      icon: Download,
      label: "Download CV",
      action: handleDownloadCV,
      show: true,
    },
  ].filter((item) => item.show)

  if (!mounted) return null

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50"
    >
      <div className="bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-3xl p-3 border border-white/30 dark:border-white/10 shadow-2xl">
        <div className="flex flex-col items-center gap-3">
          {dockItems.map((item) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                onHoverStart={() => setHoveredItem(item.id)}
                onHoverEnd={() => setHoveredItem(null)}
                className="relative"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={item.action}
                  className="w-12 h-12 rounded-full bg-white/30 dark:bg-white/10 hover:bg-white/50 dark:hover:bg-white/20 transition-all duration-200 border border-white/20 dark:border-white/10 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2"
                  aria-label={item.label}
                >
                  {Icon ? (
                    <Icon className="w-5 h-5" />
                  ) : (
                    <span className="font-bold text-base select-none">{language === "en" ? "EN" : "TH"}</span>
                  )}
                </Button>
                {hoveredItem === item.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute -top-10 left-auto -translate-x-1/2 bg-black/80 dark:bg-white/80 text-white dark:text-black text-xs px-3 py-1 rounded-md shadow-lg whitespace-nowrap z-10"
                  >
                    {item.label}
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
