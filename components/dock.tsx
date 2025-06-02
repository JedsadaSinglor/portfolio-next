"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Sun, Moon, Download, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useRouter, usePathname } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

interface DockProps {
  language: string
  setLanguage?: (lang: string) => void
}

export function Dock({ language, setLanguage }: DockProps) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  const handleDownloadCV = (lang: string) => {
    const link = document.createElement("a")
    link.href = lang === "en" ? "/Eng.pdf" : "/Thai.pdf"
    link.download = lang === "en" ? "Jedsada_Singlor_CV_English.pdf" : "Jedsada_Singlor_CV_Thai.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setIsModalOpen(false)
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
      action: () => setIsModalOpen(true),
      show: true,
    },
  ].filter((item) => item.show)

  if (!mounted) return null

  return (
    <>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="fixed right-1 top-1/3 -translate-y-1/2 z-50"
      >
        <div className="bg-gray-100 dark:bg-gray-900 backdrop-blur-md rounded-3xl p-4 border border-gray-300 dark:border-gray-700 shadow-lg">
          <div className="flex flex-col items-center gap-4">
            {dockItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => setHoveredItem(item.id)}
                  onHoverEnd={() => setHoveredItem(null)}
                  className="relative group"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={item.action}
                    className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 border border-gray-300 dark:border-gray-600 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label={item.label}
                  >
                    {Icon ? (
                      <Icon className="w-6 h-6 text-gray-800 dark:text-gray-200" />
                    ) : (
                      <span className="font-bold text-sm text-gray-800 dark:text-gray-200 select-none">{language === "en" ? "EN" : "TH"}</span>
                    )}
                  </Button>
                  {hoveredItem === item.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded-lg shadow-md whitespace-nowrap z-10 dark:bg-gray-200 dark:text-gray-800"
                    >
                      {item.label}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Modal for CV Language Selection */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 shadow-lg rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">Select CV Language</DialogTitle>
          </DialogHeader>
          <DialogFooter className="flex justify-center gap-4">
            <Button
              onClick={() => handleDownloadCV("en")}
              className="px-6 py-2 border border-gray-800 dark:border-gray-200 text-gray-800 dark:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 focus:ring-offset-2"
            >
              <span className="text-sm md:text-base">English</span>
            </Button>
            <Button
              onClick={() => handleDownloadCV("th")}
              className="px-6 py-2 border border-gray-800 dark:border-gray-200 text-gray-800 dark:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 focus:ring-offset-2"
            >
              <span className="text-sm md:text-base">Thai</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
