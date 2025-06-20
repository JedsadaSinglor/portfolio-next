"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, MapPin, Calendar, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ParticleBackground } from "@/components/particle-background"
import { Dock } from "@/components/dock"

// ✨ 1. นำเข้าข้อมูลจากไฟล์ใหม่
import { aboutData } from "@/data/aboutData"

// ✨ (แนะนำ) สร้างคอมโพเนนต์ย่อยเพื่อลดโค้ดซ้ำซ้อน
const ContentSection = ({ title, icon, children, className }: { title: string, icon: string, children: React.ReactNode, className?: string }) => (
  <section className={`bg-white/80 dark:bg-slate-800/80 rounded-2xl shadow-lg p-6 border dark:border-slate-700/40 ${className}`}>
    <div className="mb-3">
      <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-2">
        {icon} {title}
      </h3>
      <hr className="mt-1 border-blue-200 dark:border-blue-800" />
    </div>
    {children}
  </section>
);


export default function AboutPage() {
  const [language, setLanguage] = useState<"en" | "th">("en")
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  
  // ✨ 2. ดึงข้อมูลที่แปลแล้วตามภาษาที่เลือก
  const t = aboutData[language]

  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'th')) {
      setLanguage(savedLanguage)
    }
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 dark:from-slate-900 dark:via-blue-900 dark:to-slate-900 text-slate-900 dark:text-white font-sans transition-colors duration-500">
      <ParticleBackground />
      <div className="relative z-10 px-4 py-8 md:px-8 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-10"
        >
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t.pageTitle}
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Section 1: Profile Info */}
          <section className="bg-white/80 md:col-span-1 flex flex-col items-center text-center dark:border-slate-700/40 dark:bg-slate-800/80 rounded-2xl shadow-lg p-6 md:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, type: "spring" }}
              className="relative w-48 h-48 md:w-52 md:h-52 mb-4"
            >
              <Image
                src={t.profile.image}
                alt={t.profile.name}
                fill
                className="rounded-full object-cover border-4 border-blue-500/50 shadow-xl"
                priority
              />
            </motion.div>
            <h2 className="text-2xl font-bold mb-1 text-slate-800 dark:text-slate-100">{t.profile.name}</h2>
            <p className="text-base text-blue-600 dark:text-blue-400 font-medium mb-4 max-w-xs">{t.profile.role}</p>
            <div className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300 w-full items-center">
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-500" /><span>{t.profile.location}</span></div>
              <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-blue-500" /><span>Age: {t.profile.age}</span></div>
            </div>
          </section>

          {/* Right column: All other sections */}
          <div className="md:col-span-2 flex flex-col gap-6">
            
            {/* ✨ Section 2: Bio - ใช้คอมโพเนนต์ย่อย */}
            <ContentSection title={t.bio.title} icon={t.bio.icon} className="border-slate-200/40">
              <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                {t.bio.content}
              </p>
            </ContentSection>

            {/* ✨ Section 3: Education & Certs - รวมอยู่ใน div เดียวกัน */}
            <div className="flex flex-col gap-6">
              <ContentSection title={t.education.title} icon={t.education.icon} className="border-blue-200/20">
                 <div className="ml-7">
                    <div className="text-base text-slate-800 dark:text-slate-200 font-medium">{t.education.university}</div>
                    <div className="text-sm text-slate-700 dark:text-slate-300">{t.education.degree}</div>
                    <div className="flex flex-wrap mt-2 gap-2 text-xs">
                      <span className="bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white px-2 py-1 rounded-full">{t.education.gpa}</span>
                      <span className="bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white px-2 py-1 rounded-full">{t.education.period}</span>
                    </div>
                 </div>
              </ContentSection>
              
              <ContentSection title={t.certifications.title} icon={t.certifications.icon} className="border-yellow-400/30">
                <div className="ml-7 space-y-2">
                  {t.certifications.list.map((cert, idx) => (
                    <div key={idx} className="text-sm bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200 px-3 py-1.5 rounded-full flex items-center gap-2 w-fit">
                       <Award className="w-4 h-4" /> {cert.name} - {cert.issuer} ({cert.year})
                    </div>
                  ))}
                </div>
              </ContentSection>
            </div>
            
            {/* ✨ Section 4: Interests */}
            <ContentSection title={t.interests.title} icon={t.interests.icon} className="border-purple-200/30">
               <div className="flex flex-wrap gap-2">
                  {t.interests.list.map((interest, idx) => (
                    <span key={idx} className="bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-100 px-3 py-1 rounded-full text-sm font-medium">
                      {interest}
                    </span>
                  ))}
                </div>
            </ContentSection>

            {/* ✨ Section 5: Fun Fact */}
            <ContentSection title={t.funFact.title} icon={t.funFact.icon} className="border-pink-200/30">
              <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed text-center">
                {t.funFact.text}
              </p>
              {/* Carousel logic remains the same if you uncomment it, but now gets images from data file */}
            </ContentSection>
            
          </div>
        </div>
      </div>
      <Dock language={language} setLanguage={setLanguage} />
    </div>
  )
}