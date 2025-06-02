"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowLeft, Award, Calendar, MapPin, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ParticleBackground } from "@/components/particle-background"
import { BentoCard } from "@/components/bento-card"
import { Dock } from "@/components/dock"

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

// แยก array ของแต่ละ section
const education = [
  {
    category: "education",
    title: "Bangkok University",
    titleTh: "มหาวิทยาลัยกรุงเทพ",
    role: "Bachelor of Computer Science (Data Science & Cybersecurity)",
    roleTh: "วิทยาศาสตรบัณฑิต วิทยาการคอมพิวเตอร์ (วิทยาศาสตร์ข้อมูลและไซเบอร์ซีเคียวริตี้)",
    period: "2021 - 2025",
    location: "Bangkok, Thailand",
    description: "Cum GPA 3.66",
    descriptionTh: "เกรดเฉลี่ย 3.66",
    achievements: [
      "Specialized in Data Science and Cybersecurity",
      "Hands-on experience with penetration testing",
      "Strong foundation in programming and security",
    ],
    achievementsTh: [
      "เชี่ยวชาญด้านวิทยาศาสตร์ข้อมูลและไซเบอร์ซีเคียวริตี้",
      "ประสบการณ์ปฏิบัติจริงในการทดสอบเจาะระบบ",
      "พื้นฐานที่แข็งแกร่งในการเขียนโปรแกรมและความปลอดภัย",
    ],
    link: undefined
  }
];


const competitions = [
  {
    category: "competitions",
    title: "Thailand  Cyber Top Talent 2024",
    titleTh: "การแข่งขัน Thailand Cyber Top Talent 2024",
    role: "Participant",
    roleTh: "ผู้เข้าร่วม",
    period: "2024",
    location: "Home",
    description: "Participated in the Thailand Cyber Top Talent competition organized by the National Cyber Security Agency (NCSA) in collaboration with Huawei Technologies (Thailand) Co., Ltd.",
    descriptionTh: "เข้าร่วมการแข่งขัน Thailand Cyber Top Talent ที่จัดโดยสำนักงานคณะกรรมการการรักษาความมั่นคงปลอดภัยไซเบอร์แห่งชาติ ร่วมกับบริษัท หัวเว่ย เทคโนโลยี่ (ประเทศไทย) จำกัด",
    achievements: [
      "Gained practical experience in cybersecurity challenges",
      "Collaborated with team members to solve complex problems",
      "Developed skills in penetration testing and vulnerability assessment"
    ],
    achievementsTh: [
      "ได้รับประสบการณ์จริงในการท้าทายด้านไซเบอร์ซีเคียวริตี้",
      "ทำงานร่วมกับสมาชิกทีมเพื่อแก้ปัญหาที่ซับซ้อน",
      "พัฒนาทักษะในการทดสอบเจาะระบบและการประเมินช่องโหว่"
    ],
    image: "/individual_rank.jpg",
    link: undefined,
  },
  {
    category: "competitions",
    title: "BU MINI CTF (Internal Competition)",
    titleTh: "BU MINI CTF (การแข่งขันภายใน)",
    role: "Participant",
    roleTh: "ผู้เข้าร่วม",
    period: "2024",
    location: "Bangkok University",
    description: "Participated in Capture the Flag competition organized by Bangkok University Cybersecurity group",
    descriptionTh: "เข้าร่วมการแข่งขัน Capture the Flag ที่จัดโดยกลุ่มไซเบอร์ซีเคียวริตี้มหาวิทยาลัยกรุงเทพ",
    achievements: [
      "Solved challenges related to web vulnerabilities",
      "Applied steganography and exploitation techniques",
      "Enhanced teamwork and problem-solving abilities"
    ],
    achievementsTh: [
      "แก้ความท้าทายที่เกี่ยวข้องกับช่องโหว่เว็บ",
      "ใช้เทคนิคสเตกาโนกราฟีและการโจมตี",
      "เพิ่มความสามารถในการทำงานเป็นทีมและการแก้ปัญหา"
    ],
    image: "/buctf.jpg",
    link: undefined,
  }
];
const certifications = [
  {
    category: "certifications",
    title: "Basic Cyber Security",
    titleTh: "ไซเบอร์ซีเคียวริตี้พื้นฐาน",
    role: "Certificate of Complete",
    roleTh: "ใบรับรองการสำเร็จการศึกษา",
    period: "2023",
    location: "NCSA Thailand",
    description: "Comprehensive cybersecurity fundamentals certification",
    descriptionTh: "ใบรับรองพื้นฐานไซเบอร์ซีเคียวริตี้อย่างครอบคลุม",
    achievements: [
      "Learned cybersecurity fundamentals",
      "Understanding of threat landscape",
      "Security best practices"
    ],
    achievementsTh: [
      "เรียนรู้พื้นฐานไซเบอร์ซีเคียวริตี้",
      "ความเข้าใจเกี่ยวกับภูมิทัศน์ภัยคุกคาม",
      "แนวปฏิบัติที่ดีด้านความปลอดภัย"
    ],
    image: "/mooc.png",
    link: undefined,
  }
];
  const platforms = [
  {
    category: "platforms",
    title: "TryHackMe",
    titleTh: "TryHackMe",
    role: "Active Learner",
    roleTh: "ผู้เรียนรู้อย่างต่อเนื่อง",
    period: "2023 - Present",
    location: "Online Platform",
    description: "Top 10% rank with over 25 rooms completed and a 90+ active-day streak",
    descriptionTh: "อันดับท็อป 10% ด้วยการทำห้องมากกว่า 25 ห้องและสถิติการใช้งานต่อเนื่อง 90+ วัน",
    achievements: [
      "Completed 25+ cybersecurity challenges",
      "Maintained 90+ day active streak",
      "Top 10% global ranking"
    ],
    achievementsTh: [
      "ทำความท้าทายด้านไซเบอร์ซีเคียวริตี้มากกว่า 25 ครั้ง",
      "รักษาสถิติการใช้งานต่อเนื่อง 90+ วัน",
      "อันดับท็อป 10% ระดับโลก"
    ],
    link: "https://tryhackme.com/p/jedsada"
  },
  {
    category: "platforms",
    title: "HackTheBox",
    titleTh: "HackTheBox",
    role: "Script Kiddie",
    roleTh: "Script Kiddie",
    period: "2023 - Present",
    location: "Online Platform",
    description: "Completed multiple machines including Sea, Green Horn, and others",
    descriptionTh: "ทำเครื่องหลายเครื่องสำเร็จรวมถึง Sea, Green Horn และอื่นๆ",
    achievements: [
      "Completed multiple machine challenges",
      "Gained practical penetration testing experience",
      "Improved problem-solving skills"
    ],
    achievementsTh: [
      "ทำความท้าทายเครื่องหลายเครื่องสำเร็จ",
      "ได้รับประสบการณ์การทดสอบเจาะระบบจริง",
      "พัฒนาทักษะการแก้ปัญหา"
    ],
    link: "https://app.hackthebox.com/profile/jedsada"
  }
];
const activities = [
  {
    image: "/secpro.jpg",
    type: "กิจกรรม",
    title: "Cyber Sec Pro 2: The cybersecurity bridge between digital world and human",
    period: "2024",
    location: "อีสติน แกรนด์ พญาไท",
    description: "อัปเดตเทรนด์ภัยคุกคามทางไซเบอร์และเทคโนโลยี AI ในปัจจุบัน ",
    keyActivities: [
      "แนวทางในการรับมือกับภัยคุกคามทางไซเบอร์ เพื่อรับมือกับภัยคุกคามที่ซับซ้อนเหล่านี้ ที่องค์กรจำเป็นต้องมีกลยุทธ์ในการป้องกันภัยคุกคามที่ครอบคลุม โดยอาศัยเทคโนโลยีที่ทันสมัย",
    ],
  },
  // เพิ่มกิจกรรมใหม่ได้ที่นี่
];
// รวมทั้งหมดเป็น experiences
const experiences = [
  ...education,
  ...platforms,
  ...competitions,
  ...certifications
];

// เพิ่ม array สำหรับกิจกรรมที่เข้าร่วม


export default function ExperiencePage() {
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

  const groupedExperiences = experiences.reduce(
    (acc, exp) => {
      if (!acc[exp.category]) {
        acc[exp.category] = []
      }
      acc[exp.category].push(exp)
      return acc
    },
    {} as Record<string, typeof experiences>,
  )

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
            onClick={() => router.back()}
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

        {/* Experience Sections */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          {/* Row 1: Education and Certifications */}
          <div className="flex flex-col h-full">
            <div className="col-span-full mt-2 mb-2">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 flex items-center gap-3 tracking-tight">
                <Award className="w-7 h-7 text-blue-500" />
                {t.education}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-8 md:gap-10 px-2 md:px-0 h-full">
              {groupedExperiences.education.map((experience, index) => (
                <motion.div
                  key={"education-" + index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="h-full"
                >
                  <BentoCard className="overflow-hidden shadow-xl rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col h-full bg-white dark:bg-slate-900 p-0 md:p-0">
                    {("image" in experience && experience.image) ? (
                      <div className="w-full h-32 sm:h-36 md:h-40 lg:h-44 xl:h-48 flex items-center justify-center bg-slate-800 rounded-xl overflow-hidden">
                        <img
                          src={typeof experience.image === "string" ? experience.image : ""}
                          alt={experience.title + " logo"}
                          className="object-contain w-full h-full"
                          loading="lazy"
                        />
                      </div>
                    ) : null}
                    <div className="p-6 md:p-8 flex flex-col flex-1">
                      <div className="mb-2 text-sm md:text-base font-semibold text-slate-500 uppercase tracking-wider">
                        <span className="align-middle">{language === "en" ? experience.role : experience.roleTh}</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-extrabold mb-2 text-slate-900 dark:text-white leading-tight">
                        {language === "en" ? experience.title : experience.titleTh}
                      </h3>
                      <div className="flex flex-wrap gap-4 mb-4 text-base md:text-lg text-slate-600 dark:text-slate-300">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-5 h-5" />
                          <span>{experience.period}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-5 h-5" />
                          <span>{experience.location}</span>
                        </div>
                        {experience.link && (
                          <Button
                            variant="link"
                            size="sm"
                            onClick={() => window.open(experience.link, "_blank")}
                            className="flex-shrink-0 ml-auto underline text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-bold"
                          >
                            <ExternalLink className="w-4 h-4 mr-1 inline" />
                            <span>View</span>
                          </Button>
                        )}
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 mb-4 text-base md:text-lg">
                        {language === "en" ? experience.description : experience.descriptionTh}
                      </p>
                      <div>
                        <h4 className="font-bold mb-2 text-slate-800 dark:text-slate-200 text-base md:text-lg">Key Achievements:</h4>
                        <ul className="space-y-1">
                          {(language === "en" ? experience.achievements : experience.achievementsTh).map(
                            (achievement, achIndex) => (
                              <li key={achIndex} className="flex items-start gap-2 text-base md:text-lg">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                <span className="text-slate-600 dark:text-slate-300 font-medium">{achievement}</span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>
                  </BentoCard>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="flex flex-col h-full">
            <div className="col-span-full mt-2 mb-2">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 flex items-center gap-3 tracking-tight">
                <Award className="w-7 h-7 text-blue-500" />
                {t.certifications}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-8 md:gap-10 px-2 md:px-0 h-full">
              {groupedExperiences.certifications.map((experience, index) => (
                <motion.div
                  key={"certifications-" + index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="h-full"
                >
                  <BentoCard className="overflow-hidden shadow-xl rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col h-full bg-white dark:bg-slate-900 p-0 md:p-0">
                    {("image" in experience && experience.image) ? (
                      <div className="w-full h-32 sm:h-36 md:h-40 lg:h-44 xl:h-48 flex items-center justify-center bg-slate-800 rounded-xl overflow-hidden">
                        <img
                          src={typeof experience.image === "string" ? experience.image : ""}
                          alt={experience.title + " logo"}
                          className="object-contain w-full h-full"
                          loading="lazy"
                        />
                      </div>
                    ) : null}
                    <div className="p-6 md:p-8 flex flex-col flex-1">
                      <div className="mb-2 text-sm md:text-base font-semibold text-slate-500 uppercase tracking-wider">
                        <span className="align-middle">{language === "en" ? experience.role : experience.roleTh}</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-extrabold mb-2 text-slate-900 dark:text-white leading-tight">
                        {language === "en" ? experience.title : experience.titleTh}
                      </h3>
                      <div className="flex flex-wrap gap-4 mb-4 text-base md:text-lg text-slate-600 dark:text-slate-300">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-5 h-5" />
                          <span>{experience.period}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-5 h-5" />
                          <span>{experience.location}</span>
                        </div>
                        {experience.link && (
                          <Button
                            variant="link"
                            size="sm"
                            onClick={() => window.open(experience.link, "_blank")}
                            className="flex-shrink-0 ml-auto underline text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-bold"
                          >
                            <ExternalLink className="w-4 h-4 mr-1 inline" />
                            <span>View</span>
                          </Button>
                        )}
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 mb-4 text-base md:text-lg">
                        {language === "en" ? experience.description : experience.descriptionTh}
                      </p>
                      <div>
                        <h4 className="font-bold mb-2 text-slate-800 dark:text-slate-200 text-base md:text-lg">Key Achievements:</h4>
                        <ul className="space-y-1">
                          {(language === "en" ? experience.achievements : experience.achievementsTh).map(
                            (achievement, achIndex) => (
                              <li key={achIndex} className="flex items-start gap-2 text-base md:text-lg">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                <span className="text-slate-600 dark:text-slate-300 font-medium">{achievement}</span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>
                  </BentoCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Row 2: TryHackMe and HackTheBox */}
          <div className="flex flex-col h-full">
            <div className="col-span-full mt-2 mb-2">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 flex items-center gap-3 tracking-tight">
                <Award className="w-7 h-7 text-blue-500" />
                TryHackMe
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-8 md:gap-10 px-2 md:px-0 h-full">
              {groupedExperiences.platforms.filter(p => p.title === "TryHackMe").map((experience, index) => (
                <motion.div
                  key={"tryhackme-" + index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="h-full"
                >
                  <BentoCard className="overflow-hidden shadow-xl rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col h-full bg-white dark:bg-slate-900 p-0 md:p-0">
                    {("image" in experience && experience.image) ? (
                      <div className="w-full h-32 sm:h-36 md:h-40 lg:h-44 xl:h-48 flex items-center justify-center bg-slate-800 rounded-xl overflow-hidden">
                        <img
                          src={typeof experience.image === "string" ? experience.image : ""}
                          alt={experience.title + " logo"}
                          className="object-contain w-full h-full"
                          loading="lazy"
                        />
                      </div>
                    ) : null}
                    <div className="p-6 md:p-8 flex flex-col flex-1">
                      <div className="mb-2 text-sm md:text-base font-semibold text-slate-500 uppercase tracking-wider">
                        <span className="align-middle">{language === "en" ? experience.role : experience.roleTh}</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-extrabold mb-2 text-slate-900 dark:text-white leading-tight">
                        {language === "en" ? experience.title : experience.titleTh}
                      </h3>
                      <div className="flex flex-wrap gap-4 mb-4 text-base md:text-lg text-slate-600 dark:text-slate-300">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-5 h-5" />
                          <span>{experience.period}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-5 h-5" />
                          <span>{experience.location}</span>
                        </div>
                        {experience.link && (
                          <Button
                            variant="link"
                            size="sm"
                            onClick={() => window.open(experience.link, "_blank")}
                            className="flex-shrink-0 ml-auto underline text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-bold"
                          >
                            <ExternalLink className="w-4 h-4 mr-1 inline" />
                            <span>View</span>
                          </Button>
                        )}
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 mb-4 text-base md:text-lg">
                        {language === "en" ? experience.description : experience.descriptionTh}
                      </p>
                      <div>
                        <h4 className="font-bold mb-2 text-slate-800 dark:text-slate-200 text-base md:text-lg">Key Achievements:</h4>
                        <ul className="space-y-1">
                          {(language === "en" ? experience.achievements : experience.achievementsTh).map(
                            (achievement, achIndex) => (
                              <li key={achIndex} className="flex items-start gap-2 text-base md:text-lg">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                <span className="text-slate-600 dark:text-slate-300 font-medium">{achievement}</span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>
                  </BentoCard>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="flex flex-col h-full">
            <div className="col-span-full mt-2 mb-2">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 flex items-center gap-3 tracking-tight">
                <Award className="w-7 h-7 text-blue-500" />
                HackTheBox
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-8 md:gap-10 px-2 md:px-0 h-full">
              {groupedExperiences.platforms.filter(p => p.title === "HackTheBox").map((experience, index) => (
                <motion.div
                  key={"hackthebox-" + index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="h-full"
                >
                  <BentoCard className="overflow-hidden shadow-xl rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col h-full bg-white dark:bg-slate-900 p-0 md:p-0">
                    {("image" in experience && experience.image) ? (
                      <div className="w-full h-32 sm:h-36 md:h-40 lg:h-44 xl:h-48 flex items-center justify-center bg-slate-800 rounded-xl overflow-hidden">
                        <img
                          src={typeof experience.image === "string" ? experience.image : ""}
                          alt={experience.title + " logo"}
                          className="object-contain w-full h-full"
                          loading="lazy"
                        />
                      </div>
                    ) : null}
                    <div className="p-6 md:p-8 flex flex-col flex-1">
                      <div className="mb-2 text-sm md:text-base font-semibold text-slate-500 uppercase tracking-wider">
                        <span className="align-middle">{language === "en" ? experience.role : experience.roleTh}</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-extrabold mb-2 text-slate-900 dark:text-white leading-tight">
                        {language === "en" ? experience.title : experience.titleTh}
                      </h3>
                      <div className="flex flex-wrap gap-4 mb-4 text-base md:text-lg text-slate-600 dark:text-slate-300">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-5 h-5" />
                          <span>{experience.period}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-5 h-5" />
                          <span>{experience.location}</span>
                        </div>
                        {experience.link && (
                          <Button
                            variant="link"
                            size="sm"
                            onClick={() => window.open(experience.link, "_blank")}
                            className="flex-shrink-0 ml-auto underline text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-bold"
                          >
                            <ExternalLink className="w-4 h-4 mr-1 inline" />
                            <span>View</span>
                          </Button>
                        )}
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 mb-4 text-base md:text-lg">
                        {language === "en" ? experience.description : experience.descriptionTh}
                      </p>
                      <div>
                        <h4 className="font-bold mb-2 text-slate-800 dark:text-slate-200 text-base md:text-lg">Key Achievements:</h4>
                        <ul className="space-y-1">
                          {(language === "en" ? experience.achievements : experience.achievementsTh).map(
                            (achievement, achIndex) => (
                              <li key={achIndex} className="flex items-start gap-2 text-base md:text-lg">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                <span className="text-slate-600 dark:text-slate-300 font-medium">{achievement}</span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>
                  </BentoCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Row 3: Competitions and Activities */}
          <div className="flex flex-col h-full">
            <div className="col-span-full mt-2 mb-2">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 flex items-center gap-3 tracking-tight">
                <Award className="w-7 h-7 text-blue-500" />
                {t.competitions}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-8 md:gap-10 px-2 md:px-0 h-full">
              {groupedExperiences.competitions.map((experience, index) => (
                <motion.div
                  key={"competitions-" + index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="h-full"
                >
                  <BentoCard className="overflow-hidden shadow-xl rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col h-full bg-white dark:bg-slate-900 p-0 md:p-0">
                    {("image" in experience && experience.image) ? (
                      <div className="w-full h-32 sm:h-36 md:h-40 lg:h-44 xl:h-48 flex items-center justify-center bg-slate-800 rounded-xl overflow-hidden">
                        <img
                          src={typeof experience.image === "string" ? experience.image : ""}
                          alt={experience.title + " logo"}
                          className="object-contain w-full h-full"
                          loading="lazy"
                        />
                      </div>
                    ) : null}
                    <div className="p-6 md:p-8 flex flex-col flex-1">
                      <div className="mb-2 text-sm md:text-base font-semibold text-slate-500 uppercase tracking-wider">
                        <span className="align-middle">{language === "en" ? experience.role : experience.roleTh}</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-extrabold mb-2 text-slate-900 dark:text-white leading-tight">
                        {language === "en" ? experience.title : experience.titleTh}
                      </h3>
                      <div className="flex flex-wrap gap-4 mb-4 text-base md:text-lg text-slate-600 dark:text-slate-300">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-5 h-5" />
                          <span>{experience.period}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-5 h-5" />
                          <span>{experience.location}</span>
                        </div>
                        {experience.link && (
                          <Button
                            variant="link"
                            size="sm"
                            onClick={() => window.open(experience.link, "_blank")}
                            className="flex-shrink-0 ml-auto underline text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-bold"
                          >
                            <ExternalLink className="w-4 h-4 mr-1 inline" />
                            <span>View</span>
                          </Button>
                        )}
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 mb-4 text-base md:text-lg">
                        {language === "en" ? experience.description : experience.descriptionTh}
                      </p>
                      <div>
                        <h4 className="font-bold mb-2 text-slate-800 dark:text-slate-200 text-base md:text-lg">Key Achievements:</h4>
                        <ul className="space-y-1">
                          {(language === "en" ? experience.achievements : experience.achievementsTh).map(
                            (achievement, achIndex) => (
                              <li key={achIndex} className="flex items-start gap-2 text-base md:text-lg">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                <span className="text-slate-600 dark:text-slate-300 font-medium">{achievement}</span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>
                  </BentoCard>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="flex flex-col h-full">
            <div className="col-span-full mt-2 mb-2">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 flex items-center gap-3 tracking-tight">
                <Award className="w-7 h-7 text-green-500" />
                {t.activities}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-8 md:gap-10 px-2 md:px-0 h-full">
              {activities.map((activity, idx) => (
                <BentoCard key={activity.title + idx} className="overflow-hidden shadow-xl rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col h-full bg-white dark:bg-slate-900 p-0 md:p-0">
                  <div className="w-full h-32 sm:h-36 md:h-40 lg:h-44 xl:h-48 flex items-center justify-center bg-slate-800 rounded-xl overflow-hidden">
                    <img src={activity.image} alt={activity.title + ' logo'} className="object-contain w-full h-full" loading="lazy" />
                  </div>
                  <div className="p-6 md:p-8 flex flex-col flex-1">
                    <div className="mb-2 text-sm md:text-base font-semibold text-slate-500 uppercase tracking-wider">{activity.type}</div>
                    <h3 className="text-2xl md:text-3xl font-extrabold mb-2 text-slate-900 dark:text-white leading-tight">{activity.title}</h3>
                    <div className="flex flex-wrap gap-4 mb-4 text-base md:text-lg text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-5 h-5" />
                        <span>{activity.period}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-5 h-5" />
                        <span>{activity.location}</span>
                      </div>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 mb-4 text-base md:text-lg">{activity.description}</p>
                    <div>
                      <h4 className="font-bold mb-2 text-slate-800 dark:text-slate-200 text-base md:text-lg">Key Activities:</h4>
                      <ul className="space-y-1">
                        {activity.keyActivities.map((act, i) => (
                          <li key={i} className="flex items-start gap-2 text-base md:text-lg">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-slate-600 dark:text-slate-300 font-medium">{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </BentoCard>
              ))}
            </div>
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
