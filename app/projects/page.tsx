"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, ExternalLink, Github, Calendar, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ParticleBackground } from "@/components/particle-background"
import { BentoCard } from "@/components/bento-card"
const translations = {
  en: {
    title: "Projects",
    viewProject: "View Project",
    sourceCode: "Source Code",
    technologies: "Technologies",
    back: "Back to Home",
  },
  th: {
    title: "โปรเจกต์",
    viewProject: "ดูโปรเจกต์",
    sourceCode: "ซอร์สโค้ด",
    technologies: "เทคโนโลยี",
    back: "กลับหน้าหลัก",
  },
}

const projects = [
  {
    id: 1,
    title: "Parts Inventory Management System Final Project",
    titleTh: "โปรเจกต์ระบบจัดการสินค้าคงคลัง",
    description:
      "Led a team to develop a comprehensive parts inventory management system using Python and SQL. Implemented features for tracking inventory levels, generating reports, and managing user access.",
    descriptionTh:
      "พัฒนาระบบจัดการสินค้าคงคลังที่ครอบคลุมโดยใช้ Python และ SQL ใช้ฟีเจอร์ในการติดตามระดับสินค้าคงคลัง การสร้างรายงาน และการจัดการการเข้าถึงของผู้ใช้",
    image: "/part_inventory.png",
    technologies: ["Python", "Django", "PostgreSQL", "HTML/CSS", "JavaScript", "Bootstrap", "Supabase", "Cloudinary","Vercel"],
    category: "Web Application",
    date: "2024",
    github: "https://github.com/JedsadaSinglor/inventory",
    demo: "https://br-inventory.vercel.app",
  },
  
  {
    id: 2,
    title: "Honeypot Project",
    titleTh: "โครงการฮันนีพอต",
    description:
      "Developed a honeypot system to detect and analyze cyber attacks. Implemented features for logging attack attempts, analyzing patterns, and generating reports. Used Python and Flask for the backend.",
    descriptionTh:
      "พัฒนาระบบฮันนีพอตเพื่อตรวจจับและวิเคราะห์การโจมตีทางไซเบอร์ ใช้ฟีเจอร์ในการบันทึกความพยายามในการโจมตี การวิเคราะห์รูปแบบ และการสร้างรายงาน ใช้ Python และ Flask สำหรับแบ็กเอนด์",
    image: "/honeypot.png",
    technologies: ["Python","OS","Socket"],
    category: "Side Project",
    date: "2024",
    github: "https://github.com/JedsadaSinglor/writeup/tree/main/Project/Honeypot%20Project",
    demo: "#",
  },
  {
    id: 3,
    title:"Malware Analysis Tool",
    titleTh: "เครื่องมือวิเคราะห์มัลแวร์",
    description:
      "This project is a tool for analyzing PE (Portable Executable) files, allowing you to check basic information and specific characteristics of potentially malicious files.",
    descriptionTh:
      "เครื่องมือนี้ถูกสร้างขึ้นเพื่อวิเคราะห์ไฟล์ PE (Portable Executable) โดยไม่ต้องรันไฟล์มัลแวร์จริงๆ โปรแกรมจะให้ข้อมูลสำคัญเกี่ยวกับไฟล์ เช่น ขนาดไฟล์ วันที่สร้าง จุดเริ่มต้นการทำงาน และแฮช SHA-256 ของไฟล์ เพื่อช่วยในการวิเคราะห์ความปลอดภัยของไฟล์",
    image: "/malware_analysis.png",
    technologies: ["Python", "PeFile", "YARA", "Cuckoo Sandbox"],
    category: "Side Project",
    date: "2024",
    github: "https://github.com/JedsadaSinglor/writeup/tree/main/Project/Malware%20Analysis%20Tool",
    demo: "#",
  },
  {
    id: 4,
    title: "Keylogger Project",
    titleTh: "คีย์ล็อกเกอร์",
    description:
      "Developed a keylogger application using Python. The application captures keystrokes and saves them to a log file for later analysis.",
    descriptionTh:
      "พัฒนาแอปพลิเคชันคีย์ล็อกเกอร์โดยใช้ Python แอปพลิเคชันนี้จะจับการกดแป้นพิมพ์และบันทึกลงในไฟล์บันทึกเพื่อการวิเคราะห์ในภายหลัง",

    image: "/keylogger.png",
    technologies: ["Python", "Keylogging", "Data Capture"],
    category: "Side Project",
    date: "2024",
    github: "https://github.com/JedsadaSinglor/writeup/tree/main/Project/Keylogger%20Project",
    demo: "#",
  },
  {
    id: 5,
    title: "Pentest Walkthroughs (Katana, Dawn, DC-1) ",
    titleTh: "การทดสอบเจาะระบบ (Katana, Dawn, DC-1)",
    description:
      "pentest walkthroughs for various platforms. Focused on identifying vulnerabilities, exploiting them, and documenting the process for educational purposes.",
    descriptionTh:
      "คู่มือการทดสอบเจาะระบบสำหรับแพลตฟอร์มต่างๆ มุ่งเน้นไปที่การระบุช่องโหว่ การใช้ประโยชน์จากช่องโหว่เหล่านั้น และการจัดทำเอกสารกระบวนการเพื่อวัตถุประสงค์ในการศึกษา",
    image: "/pentest_walkthr.png",
    technologies: ["Nessus", "Nmap", "Metasploit", "Network Security", "Vulnerability Assessment", "Penetration Testing"],
    category: "Walkthroughs",
    date: "2023",
    github: "https://github.com/JedsadaSinglor/writeup/blob/main/Project/Pentest%20Walkthroughs%20Project/Pentest%20walkthroughs%20Project.pdf",
    demo: "#",
  },
  {
    id: 6,
    title: "System Security Assessment Project",
    titleTh: "โครงการประเมินความปลอดภัยของระบบ",
    description:
      "Security systems assessment project focusing on general cybersecurity tasks. Developed scripts for vulnerability scanning, log analysis, and incident response. Created Python scripts to enhance penetration testing processes.",
    descriptionTh:
      "โครงการประเมินความปลอดภัยของระบบที่มุ่งเน้นงานด้านความปลอดภัยทางไซเบอร์ทั่วไป พัฒนาสคริปต์สำหรับการสแกนช่องโหว่ การวิเคราะห์บันทึก และการตอบสนองต่อเหตุการณ์ สร้างสคริปต์ Python เพื่อปรับปรุงกระบวนการทดสอบเจาะระบบ",
    image: "/SA_VA.png",
    technologies: ["Nessus", "Bash", "Nmap", "Metasploit", "Vulnerability Scanning", "Log Analysis", "Incident Response"],
    category: "Security Assessment",
    date: "2023",
    github: "https://github.com/JedsadaSinglor/writeup/blob/main/Project/System%20Security%20Assessment%20Project/System%20Security%20Assessment%20Project.pdf",
    demo: "#",
  },

]

export default function ProjectsPage() {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 dark:from-slate-900 dark:via-blue-900 dark:to-slate-900 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-500">
      <ParticleBackground />

      <div className="relative z-10 p-4 md:p-6 max-w-7xl mx-auto">
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
            {/* <p className="text-slate-600 dark:text-slate-300 mt-2">{t.subtitle}</p> */}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <BentoCard className="p-6 h-full">
                <div className="flex flex-col h-full">
                  {/* Project Image */}
                  <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={language === "en" ? project.title : project.titleTh}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-500/80 text-white text-xs px-2 py-1 rounded-full">
                        {project.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center gap-1 text-white text-xs">
                      <Calendar className="w-3 h-3" />
                      <span>{project.date}</span>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3">{language === "en" ? project.title : project.titleTh}</h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-4">
                      {language === "en" ? project.description : project.descriptionTh}
                    </p>

                    {/* Technologies */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Tag className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium">{t.technologies}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="text-xs bg-blue-500/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-md border border-blue-500/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-auto">
                    {project.demo === "#" ? (
                      <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => window.open(project.github, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Report
                    </Button>
                    ) : (
                      <><Button
                      variant="default"
                      size="sm"
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      onClick={() => window.open(project.demo, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {t.viewProject}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => window.open(project.github, "_blank")}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      {t.sourceCode}
                    </Button></>
                    )}
                    
                  </div>
                </div>
              </BentoCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
