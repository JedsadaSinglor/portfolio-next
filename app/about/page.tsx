"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, MapPin, Calendar, GraduationCap, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ParticleBackground } from "@/components/particle-background"
import { BentoCard } from "@/components/bento-card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Dock } from "@/components/dock"

const translations = {
  en: {
    title: "About Me",
    name: "Jedsada Singlor",
    role: "Data Science & Cybersecurity",
    bio: "I’m a recent graduate in Computer Science with a focus on Data Science and Cybersecurity. I have a strong interest in ethical hacking and protecting digital systems. I gained practical experience from platforms like TryHackMe and Hack The Box, where I improved my skills in detecting and fixing security issues. I’m now ready to apply my knowledge in a professional work environment.",
    education: "Education",
    university: "Bangkok University",
    degree: "Bachelor of Computer Science (Data Science & Cybersecurity)",
    gpa: "GPA: 3.66",
    period: "2021 - 2025",
    achievements: "Achievements",
    certifications: "Certifications",
    basicCyberSec: "Basic Cyber Security - NCSA Thailand (2023)",
    interests: "Interests & Goals",
    interestsList: [
      "Ethical Hacking & Penetration Testing",
      "Vulnerability Assessment & Management",
      "Data Science & Machine Learning",
      "Cybersecurity Research",
      "Digital Forensics",
    ],
    back: "Back to Home",
    funfact: "Fun Fact",
    funfactText: "I love traveling and exploring new places! 🌏✈️",
  },
  th: {
    title: "เกี่ยวกับฉัน",
    name: "เจษฎา สิงห์ลอ",
    role: "วิทยาศาสตร์ข้อมูลและไซเบอร์ซีเคียวริตี้",
    bio: "ผมสำเร็จการศึกษาด้านวิทยาการคอมพิวเตอร์ โดยมีความเชี่ยวชาญด้าน Data Science และ Cybersecurity มีความสนใจด้านการทดสอบเจาะระบบและการป้องกันความปลอดภัยของระบบดิจิทัล ได้ฝึกฝนทักษะจากแพลตฟอร์มเชิงปฏิบัติ เช่น TryHackMe และ Hack The Box และพร้อมนำความรู้ที่มีไปใช้ในการทำงานจริง",
    education: "การศึกษา",
    university: "มหาวิทยาลัยกรุงเทพ",
    degree: "วิทยาศาสตรบัณฑิต วิทยาการคอมพิวเตอร์ (วิทยาศาสตร์ข้อมูลและไซเบอร์ซีเคียวริตี้)",
    gpa: "เกรดเฉลี่ย: 3.66",
    period: "2564 - 2568",
    achievements: "ผลงาน",
    certifications: "ใบรับรอง",
    basicCyberSec: "ไซเบอร์ซีเคียวริตี้พื้นฐาน - NCSA ประเทศไทย (2566)",
    interests: "ความสนใจและเป้าหมาย",
    interestsList: [
      "การแฮ็กเชิงจริยธรรมและการทดสอบเจาะระบบ",
      "การประเมินและจัดการช่องโหว่",
      "วิทยาศาสตร์ข้อมูลและการเรียนรู้ของเครื่อง",
      "การวิจัยด้านไซเบอร์ซีเคียวริตี้",
      "นิติวิทยาศาสตร์ดิจิทัล",
    ],
    back: "กลับหน้าหลัก",
    funfact: "เกร็ดสนุก ๆ",
    funfactText: "ชอบท่องเที่ยวและสำรวจสถานที่ใหม่ ๆ 🌏✈️",
  },
}

export default function AboutPage() {
  const [language, setLanguage] = useState("en")
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const t = translations[language as keyof typeof translations]

  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  if (!mounted) return null

  // เพิ่ม array รูปท่องเที่ยว
  const travelImages = [
    "/t1.jpg",
    "/t2.jpg",
    "/t3.jpg",
    "/t4.jpg",
  ];

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
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="rounded-full bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t.title}
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Section 1: Profile Info */}
          <section className="bg-white/80 md:col-span-1 flex flex-col items-center   dark:border-slate-700/40 dark:bg-slate-800/80 rounded-2xl shadow-lg p-6 md:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, type: "spring" }}
              className="relative w-60 h-60 md:w-60 md:h-60 mb-4"
            >
              <Image
                src="/BC040D41-7413-443C-8B8E-B123DF239602.png"
                alt="Jedsada Singlor"
                fill
                className="rounded object-cover border-4 border-blue-700/40 shadow-xl"
              />
            </motion.div>
            <h2 className="text-2xl font-bold mb-1 text-blue-800 dark:text-blue-200">{t.name}</h2>
            <p className="text-lg text-blue-600 dark:text-blue-400 font-medium mb-2">{t.role}</p>
            <div className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300 w-full items-center">
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-500" /><span>Bangkok, Thailand</span></div>
              <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-blue-500" /><span>Age: 23</span></div>
            </div>
          </section>

          {/* Right column: All other sections */}
          <div className="md:col-span-2 flex flex-col gap-6">
            {/* Section 2: About Me */}
            <section className="bg-white/80 dark:bg-slate-800/80 rounded-2xl shadow-lg p-6 border border-slate-200/40 dark:border-slate-700/40">
              <div className="mb-3">
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-2">
                  💡 {t.title}
                </h3>
                <hr className="mt-1 border-blue-200 dark:border-blue-800" />
              </div>
              <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                {t.bio}
              </p>
            </section>


            {/* Section 3: Education & Certifications */}

            <section className="bg-white/80 dark:bg-slate-800/80 rounded-2xl shadow-lg p-6 border border-blue-200/20 dark:border-blue-800/30">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-2">
                  🎓 {t.education}
                </h3>
                <div className="ml-6 mt-2 text-base text-blue-800 dark:text-blue-300 font-medium">{t.university}</div>
                <div className="ml-6 text-sm text-slate-700 dark:text-slate-300">{t.degree}</div>
                <div className="flex flex-wrap ml-6 mt-2 gap-2 text-xs">
                  <span className="bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white px-2 py-1 rounded-full">{t.gpa}</span>
                  <span className="bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white px-2 py-1 rounded-full">{t.period}</span>
                </div>
              </div>
              </section>
              <section className="bg-white/80 dark:bg-slate-800/80 rounded-2xl shadow-lg p-6 border border-blue-200/20 dark:border-blue-800/30">

              <div>
                <h3 className="text-xl font-semibold text-yellow-700 dark:text-yellow-300 flex items-center gap-2">
                  🏅 {t.certifications}
                </h3>
                <div className="ml-6 mt-2 text-sm bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full flex items-center gap-2 border border-yellow-400/30 w-fit">
                  <Award className="w-4 h-4" /> {t.basicCyberSec}
                </div>
              </div>
              
            </section>


            {/* Section 4: Interests & Career Goals */}
            <section className="bg-white/80 dark:bg-slate-800/80 rounded-2xl shadow-lg p-6 border border-purple-200/30 dark:border-purple-800/30">
              <div className="mb-3">
                <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-300 flex items-center gap-2">
                  💼 {t.interests}
                </h3>
                <hr className="mt-1 border-purple-200 dark:border-purple-800" />
              </div>
              <div className="flex flex-wrap gap-2">
                {t.interestsList.map((interest, idx) => (
                  <span
                    key={idx}
                    className="bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-100 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </section>

            {/* Section 5: Fun Fact */}
            <section className="bg-white/80 dark:bg-slate-800/80 rounded-2xl shadow-lg p-6 border border-pink-200/30 dark:border-pink-800/30">
              <div className="mb-2">
                <h3 className="text-xl font-semibold text-pink-700 dark:text-pink-300 flex items-center gap-2">
                  🎒 {t.funfact}
                </h3>
                <hr className="mt-1 border-pink-200 dark:border-pink-800" />
              </div>
              <div className="flex flex-col items-center gap-3 w-full">
                {/* <Carousel
                  className="w-full max-w-xs h-48"
                  opts={{ loop: true }}
                  setApi={(api) => {
                    // autoplay effect
                    if (!api) return;
                    let timer: NodeJS.Timeout;
                    const play = () => {
                      timer = setInterval(() => {
                        if (api) api.scrollNext();
                      }, 2500); // ปรับเป็น 2.5 วินาที เพื่อความ smooth
                    };
                    play();
                    api.on("destroy", () => clearInterval(timer));
                  }}
                >
                  <CarouselContent>
                    {travelImages.map((img: string, idx: number) => (
                      <CarouselItem key={img + idx}>
                        <div className="relative w-full h-48">
                          <Image
                            src={img}
                            alt={`Travel Fun Fact ${idx + 1}`}
                            fill
                            className="rounded-xl shadow-md object-cover"
                            priority={idx === 0}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel> */}
                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed text-center">
                  {t.funfactText}
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>
      <Dock
              language={language}
              setLanguage={setLanguage}
            />
    </div>
  )
}
