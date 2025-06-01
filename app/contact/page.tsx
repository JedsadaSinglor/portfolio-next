"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowLeft, Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ParticleBackground } from "@/components/particle-background"
import { BentoCard } from "@/components/bento-card"

const translations = {
  en: {
    title: "Get In Touch",
    subtitle: "Let's discuss opportunities and collaborations",
    contactInfo: "Contact Information",
    quickContact: "Quick Contact",
    name: "Your Name",
    email: "Your Email",
    subject: "Subject",
    message: "Message",
    send: "Send Message",
    back: "Back to Home",
    socialMedia: "Social Media",
    availability: "Availability",
    availabilityText: "Available for internships, freelance projects, and full-time opportunities",
    location: "Location",
    locationText: "Bangkok, Thailand",
    response: "Response Time",
    responseText: "Usually responds within 24 hours",
  },
  th: {
    title: "ติดต่อฉัน",
    subtitle: "มาคุยกันเรื่องโอกาสและการร่วมมือ",
    contactInfo: "ข้อมูลการติดต่อ",
    quickContact: "ติดต่อด่วน",
    name: "ชื่อของคุณ",
    email: "อีเมลของคุณ",
    subject: "หัวข้อ",
    message: "ข้อความ",
    send: "ส่งข้อความ",
    back: "กลับหน้าหลัก",
    socialMedia: "โซเชียลมีเดีย",
    availability: "ความพร้อม",
    availabilityText: "พร้อมสำหรับการฝึกงาน โปรเจกต์ฟรีแลนซ์ และโอกาสงานเต็มเวลา",
    location: "ที่ตั้ง",
    locationText: "กรุงเทพฯ ประเทศไทย",
    response: "เวลาตอบกลับ",
    responseText: "มักจะตอบกลับภายใน 24 ชั่วโมง",
  },
}

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "singlor.jedsada@yahoo.com",
    href: "mailto:singlor.jedsada@yahoo.com",
    color: "text-blue-500",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+66 86-404-3201",
    href: "tel:+66864043201",
    color: "text-green-500",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "jedsadasinglor",
    href: "https://jedsadasinglor.github.io/portfolio/",
    color: "text-gray-600 dark:text-gray-400",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "jedsada-singlor",
    href: "https://www.linkedin.com/in/jedsada-singlor",
    color: "text-blue-600",
  },
]

export default function ContactPage() {
  const [language, setLanguage] = useState("en")
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const router = useRouter()
  const t = translations[language as keyof typeof translations]

  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Create mailto link with form data
    const subject = encodeURIComponent(formData.subject || "Contact from Portfolio")
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)
    window.location.href = `mailto:singlor.jedsada@yahoo.com?subject=${subject}&body=${body}`
  }

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Contact Methods */}
            <BentoCard className="p-6">
              <h2 className="text-2xl font-bold mb-6">{t.contactInfo}</h2>
              <div className="space-y-4">
                {contactMethods.map((method, index) => {
                  const Icon = method.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-4 p-3 rounded-lg bg-white/50 dark:bg-white/10 hover:bg-white/70 dark:hover:bg-white/20 transition-colors group cursor-pointer"
                      onClick={() => window.open(method.href, "_blank")}
                    >
                      <div className="p-2 rounded-lg bg-white/50 dark:bg-white/10">
                        <Icon className={`w-5 h-5 ${method.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{method.label}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{method.value}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  )
                })}
              </div>
            </BentoCard>

            {/* Additional Info */}
            <BentoCard className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    {t.location}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{t.locationText}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{t.availability}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{t.availabilityText}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{t.response}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{t.responseText}</p>
                </div>
              </div>
            </BentoCard>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <BentoCard className="p-6 h-fit">
              <h2 className="text-2xl font-bold mb-6">{t.quickContact}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    name="name"
                    placeholder={t.name}
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="bg-white/50 dark:bg-white/10 border-white/20 dark:border-white/20"
                  />
                </div>
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder={t.email}
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-white/50 dark:bg-white/10 border-white/20 dark:border-white/20"
                  />
                </div>
                <div>
                  <Input
                    name="subject"
                    placeholder={t.subject}
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="bg-white/50 dark:bg-white/10 border-white/20 dark:border-white/20"
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder={t.message}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="bg-white/50 dark:bg-white/10 border-white/20 dark:border-white/20 resize-none"
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  <Send className="w-4 h-4 mr-2" />
                  {t.send}
                </Button>
              </form>
            </BentoCard>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
