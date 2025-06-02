"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ParticleBackground } from "@/components/particle-background"
import { BentoCard } from "@/components/bento-card"
import { Dock } from "@/components/dock"

const translations = {
  en: {
    title: "Blog & Writeups",
    subtitle: "Cybersecurity insights and walkthroughs",
    search: "Search posts...",
    readTime: "min read",
    back: "Back to Home",
    noResults: "No posts found",
  },
  th: {
    title: "บล็อกและบทความ",
    subtitle: "ข้อมูลเชิงลึกและคู่มือด้านไซเบอร์ซีเคียวริตี้",
    search: "ค้นหาบทความ...",
    readTime: "นาทีในการอ่าน",
    back: "กลับหน้าหลัก",
    noResults: "ไม่พบบทความ",
  },
}

// Mock blog posts data
const blogPosts = [
  {
    id: 1,
    title: "Katana Walkthrough",
    titleTh: "คู่มือ Katana",
    excerpt:
      "A detailed walkthrough of the Katana room on TryHackMe, covering enumeration, exploitation, and privilege escalation techniques.",
    excerptTh: "คู่มือโดยละเอียดของห้อง Katana บน TryHackMe ครอบคลุมเทคนิคการสำรวจ การโจมตี และการยกระดับสิทธิ์",
    date: "2024-01-15",
    readTime: 8,
    tags: ["TryHackMe", "Penetration Testing", "Linux"],
    category: "Walkthrough",
  },
  {
    id: 2,
    title: "what is Kali Linux?",
    titleTh: "Kali คืออะไร",
    excerpt:
      "An introduction to Kali Linux, its features, and how it is used in penetration testing and security assessments.",
    excerptTh: "แนะนำ Kali Linux คุณสมบัติ และวิธีการใช้ในการทดสอบเจาะระบบและการประเมินความปลอดภัย",
    date: "2024-05-20",
    readTime: 4,
    tags: ["Kali Linux", "Penetration Testing", "Security"],
    category: "Linux",
    github: "https://github.com/yourusername/kali-intro"
  },
  {
    id: 3,
    title: "Linux Distro คืออะไร มีอะไรบ้าง",
    titleTh: "Linux Distro คืออะไร มีอะไรบ้าง",
    excerpt:
      "Exploring various Linux distributions, their purposes, and how to choose the right one for your needs.",
    excerptTh: "สำรวจดิสโทร Linux ต่างๆ วัตถุประสงค์ และวิธีการเลือกดิสโทรที่เหมาะกับความต้องการของคุณ",
    date: "2024-05-22",
    readTime: 5,
    tags: ["Linux", "Distro", "Beginner"],
    category: "Linux",
    github: "https://github.com/yourusername/linux-distros"
  },
  {
    id: 4,
    title: "Linux/OS อื่นๆ ที่น่าสนใจ",
    titleTh: "Linux/OS อื่นๆ ที่น่าสนใจ",
    excerpt:
      "A look at interesting Linux distributions and operating systems beyond the mainstream options, including their unique features and use cases.",
    excerptTh: "มองไปที่ดิสโทร Linux และระบบปฏิบัติการที่น่าสนใจนอกเหนือจากตัวเลือกหลัก รวมถึงคุณสมบัติและกรณีการใช้งานที่ไม่เหมือนใคร",
    date: "2024-05-25",
    readTime: 3,
    tags: ["Linux", "OS", "Privacy"],
    category: "Linux",
    github: "https://github.com/yourusername/other-os"
  },
]

export default function BlogPage() {
  const [language, setLanguage] = useState("en")
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredPosts, setFilteredPosts] = useState(blogPosts)
  const router = useRouter()
  const t = translations[language as keyof typeof translations]

  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    const filtered = blogPosts.filter((post) => {
      const title = language === "en" ? post.title : post.titleTh
      const excerpt = language === "en" ? post.excerpt : post.excerptTh
      const searchLower = searchTerm.toLowerCase()

      return (
        title.toLowerCase().includes(searchLower) ||
        (excerpt && excerpt.toLowerCase().includes(searchLower)) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
        post.category.toLowerCase().includes(searchLower)
      )
    })
    setFilteredPosts(filtered)
  }, [searchTerm, language])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 dark:from-slate-900 dark:via-blue-900 dark:to-slate-900 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-500">
      <ParticleBackground />

      <div className="relative z-10 p-4 md:p-6 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-8"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/')}
            aria-label={t.back}
            className="rounded-full bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t.title}
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mt-2">{t.subtitle}</p>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder={t.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/50 dark:bg-white/10 border-white/20 dark:border-white/20"
            />
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Link href={`/blog/${post.id}`}>
                  <BentoCard className="p-6 h-full cursor-pointer hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs bg-blue-500/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                          {post.category}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold mb-3 line-clamp-2">
                        {language === "en" ? post.title : post.titleTh}
                      </h3>

                      <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 flex-1 line-clamp-3">
                        {language === "en" ? post.excerpt : post.excerptTh}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                          <Clock className="w-3 h-3" />
                          <span>
                            {post.readTime} {t.readTime}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 2).map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="text-xs bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-md"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </BentoCard>
                </Link>
              </motion.div>
            ))
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full text-center py-12">
              <p className="text-slate-500 dark:text-slate-400">{t.noResults}</p>
            </motion.div>
          )}
        </div>
      </div>
      <Dock language={language} setLanguage={setLanguage} />
    </div>
  )
}
