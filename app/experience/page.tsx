"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowLeft, Award, Calendar, MapPin, ExternalLink, Activity, GraduationCap, Laptop, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ParticleBackground } from "@/components/particle-background"
import { BentoCard } from "@/components/bento-card"
import { Dock } from "@/components/dock"
import { allExperiences, Experience } from "@/data/experienceData"
const translations = {
  en: {
    title: "Experience & Achievements",
    subtitle: "My journey in cybersecurity and technology",
    education: "Education",
    platforms: "Learning Platforms",
    competitions: "Competitions",
    certifications: "Certifications",
    activities: "Activities",
    back: "Back to Home",
  },
  th: {
    title: "ประสบการณ์และผลงาน",
    subtitle: "การเดินทางของฉันในด้านไซเบอร์ซีเคียวริตี้และเทคโนโลยี",
    education: "การศึกษา",
    platforms: "แพลตฟอร์มการเรียนรู้",
    competitions: "การแข่งขัน",
    certifications: "ใบรับรอง",
    activities: "กิจกรรม",
    back: "กลับหน้าหลัก",
  },
}

// เพิ่ม array สำหรับกิจกรรมที่เข้าร่วม


// Section Header Component เพื่อลดโค้ดซ้ำซ้อน
const SectionHeader = ({ icon, title }: { icon: React.ReactNode, title: string }) => (
  <h2 className="text-3xl md:text-4xl font-extrabold mb-6 flex items-center gap-3 tracking-tight">
    {icon} {title}
  </h2>
);

// Experience Card Component เพื่อแสดงผลข้อมูลแต่ละชิ้น
const ExperienceCard = ({ experience, language, t }: { experience: Experience, language: "en" | "th", t: any }) => (
  <BentoCard className="overflow-hidden shadow-xl rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col h-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-0">
    {experience.image && (
      <div className="w-full h-48 sm:h-56 md:h-64 flex items-center justify-center bg-slate-800 overflow-hidden">
        <img
          src={experience.image}
          alt={`${experience.title} logo`}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>
    )}
    <div className="p-6 md:p-8 flex flex-col flex-1">
      <div className="mb-2 text-sm font-semibold text-slate-500 uppercase tracking-wider">
        {language === "en" ? experience.role : experience.roleTh}
      </div>
      <h3 className="text-2xl font-extrabold mb-3 text-slate-900 dark:text-white">
        {language === "en" ? experience.title : experience.titleTh}
      </h3>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-slate-600 dark:text-slate-300">
        <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /><span>{experience.period}</span></div>
        <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /><span>{experience.location}</span></div>
      </div>
      <p className="text-slate-700 dark:text-slate-300 mb-4 flex-1">
        {language === "en" ? experience.description : experience.descriptionTh}
      </p>
      <div>
        <h4 className="font-bold mb-2 text-slate-800 dark:text-slate-200">{t.keyAchievements}</h4>
        <ul className="space-y-1.5">
          {(language === "en" ? experience.achievements : experience.achievementsTh).map((achievement, i) => (
            <li key={i} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <span className="text-slate-600 dark:text-slate-300">{achievement}</span>
            </li>
          ))}
        </ul>
      </div>
      {experience.link && (
        <div className="mt-auto pt-4">
          <Button
            variant="link"
            size="sm"
            onClick={() => window.open(experience.link, "_blank")}
            className="p-0 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-bold"
          >
            <ExternalLink className="w-4 h-4 mr-1.5" />
            {t.view}
          </Button>
        </div>
      )}
    </div>
  </BentoCard>
);


export default function ExperiencePage() {
  const [language, setLanguage] = useState<"en" | "th">("en")
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const t = translations[language]

  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "th")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // จัดกลุ่มข้อมูลตาม category โดยใช้ useMemo เพื่อประสิทธิภาพ
  const groupedExperiences = useMemo(() => {
    return allExperiences.reduce((acc, exp) => {
      const category = exp.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(exp);
      return acc;
    }, {} as Record<string, Experience[]>);
  }, [allExperiences]); // ทำงานใหม่เมื่อ allExperiences เปลี่ยนแปลง (ซึ่งในที่นี้คือไม่เปลี่ยน)

  if (!mounted) return null

  const sections = [
    { key: "education", title: t.education, icon: <GraduationCap className="w-7 h-7 text-blue-500" /> },
    { key: "certifications", title: t.certifications, icon: <Award className="w-7 h-7 text-green-500" /> },
    { key: "competitions", title: t.competitions, icon: <Trophy className="w-7 h-7 text-amber-500" /> },
    { key: "platforms", title: t.platforms, icon: <Laptop className="w-7 h-7 text-purple-500" /> },
    { key: "activities", title: t.activities, icon: <Activity className="w-7 h-7 text-red-500" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 dark:from-slate-900 dark:via-blue-900/50 dark:to-slate-900 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-500">
      <ParticleBackground />

      <div className="relative z-10 p-4 md:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-10"
        >
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full bg-white/50 dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/20">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t.title}
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mt-1">{t.subtitle}</p>
          </div>
        </motion.div>

        {/* Dynamic Experience Sections */}
        <div className="space-y-16">
          {sections.map(section => (
            groupedExperiences[section.key] && (
              <section key={section.key}>
                <SectionHeader icon={section.icon} title={section.title} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {groupedExperiences[section.key].map((experience, index) => (
                    <motion.div
                      key={`${section.key}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                    >
                      <ExperienceCard experience={experience} language={language} t={t} />
                    </motion.div>
                  ))}
                </div>
              </section>
            )
          ))}
        </div>
      </div>
      
      <div >
                <Dock
                    language={language}
                    setLanguage={(lang: string) => {
                      if (lang === "en" || lang === "th") setLanguage(lang)
                    }}
                  />
      </div>
    </div>
  )
}