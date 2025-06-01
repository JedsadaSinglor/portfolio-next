"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ParticleBackground } from "@/components/particle-background"
import { BentoCard } from "@/components/bento-card"

const translations = {
  en: {
    back: "Back to Blog",
    readTime: "min read",
    share: "Share",
    tags: "Tags",
    relatedPosts: "Related Posts",
    notFound: "Post not found",
  },
  th: {
    back: "กลับไปบล็อก",
    readTime: "นาทีในการอ่าน",
    share: "แชร์",
    tags: "แท็ก",
    relatedPosts: "บทความที่เกี่ยวข้อง",
    notFound: "ไม่พบบทความ",
  },
}

// Mock blog post content
const blogPosts = {
  1: {
    title: "TryHackMe: Katana Walkthrough",
    titleTh: "TryHackMe: คู่มือ Katana",
    content: `
# TryHackMe: Katana Walkthrough

## Introduction

The Katana room on TryHackMe is an excellent intermediate-level challenge that focuses on web application security and privilege escalation techniques. In this walkthrough, I'll guide you through the complete process of compromising this machine.

## Initial Reconnaissance

### Nmap Scan

First, let's start with a comprehensive Nmap scan to identify open ports and services:

\`\`\`bash
nmap -sC -sV -oN katana_scan.txt <target_ip>
\`\`\`

The scan reveals several interesting services:
- Port 22: SSH
- Port 80: HTTP (Apache)
- Port 8088: HTTP (Alternative web service)

### Web Application Analysis

Navigating to the web application on port 80, we find a simple website. Let's use directory enumeration to discover hidden paths:

\`\`\`bash
gobuster dir -u http://<target_ip> -w /usr/share/wordlists/dirb/common.txt
\`\`\`

## Exploitation

### Finding the Vulnerability

After thorough enumeration, we discover a file upload functionality that doesn't properly validate file types. This presents an opportunity for a reverse shell upload.

### Gaining Initial Access

1. Create a PHP reverse shell
2. Upload the malicious file
3. Set up a netcat listener
4. Execute the uploaded file

\`\`\`bash
# Set up listener
nc -lvnp 4444

# Upload and execute reverse shell
curl http://<target_ip>/uploads/shell.php
\`\`\`

## Privilege Escalation

Once we have initial access, we need to escalate our privileges to root.

### Enumeration

Using LinPEAS or manual enumeration, we discover:
- SUID binaries
- Cron jobs
- Writable directories

### Exploitation Vector

The privilege escalation involves exploiting a misconfigured service that runs with elevated privileges.

## Conclusion

This machine teaches valuable lessons about:
- Web application security
- File upload vulnerabilities
- Linux privilege escalation
- Proper enumeration techniques

Remember to always follow responsible disclosure practices and only test on systems you own or have explicit permission to test.
    `,
    contentTh: `
# TryHackMe: คู่มือ Katana

## บทนำ

ห้อง Katana บน TryHackMe เป็นความท้าทายระดับกลางที่ยอดเยี่ยมซึ่งเน้นไปที่ความปลอดภัยของเว็บแอปพลิเคชันและเทคนิคการยกระดับสิทธิ์ ในคู่มือนี้ ฉันจะแนะนำคุณผ่านกระบวนการโจมตีเครื่องนี้อย่างสมบูรณ์

## การสำรวจเบื้องต้น

### การสแกน Nmap

ก่อนอื่น เริ่มต้นด้วยการสแกน Nmap อย่างครอบคลุมเพื่อระบุพอร์ตและบริการที่เปิดอยู่:

\`\`\`bash
nmap -sC -sV -oN katana_scan.txt <target_ip>
\`\`\`

การสแกนเผยให้เห็นบริการที่น่าสนใจหลายอย่าง:
- พอร์ต 22: SSH
- พอร์ต 80: HTTP (Apache)
- พอร์ต 8088: HTTP (บริการเว็บทางเลือก)

### การวิเคราะห์เว็บแอปพลิเคชัน

เมื่อไปที่เว็บแอปพลิเคชันบนพอร์ต 80 เราพบเว็บไซต์ธรรมดา มาใช้การแจกแจงไดเรกทอรีเพื่อค้นหาเส้นทางที่ซ่อนอยู่:

\`\`\`bash
gobuster dir -u http://<target_ip> -w /usr/share/wordlists/dirb/common.txt
\`\`\`

## การโจมตี

### การค้นหาช่องโหว่

หลังจากการแจกแจงอย่างละเอียด เราค้นพบฟังก์ชันการอัปโหลดไฟล์ที่ไม่ตรวจสอบประเภทไฟล์อย่างถูกต้อง สิ่งนี้เป็นโอกาสสำหรับการอัปโหลด reverse shell

### การเข้าถึงเบื้องต้น

1. สร้าง PHP reverse shell
2. อัปโหลดไฟล์ที่เป็นอันตราย
3. ตั้งค่า netcat listener
4. เรียกใช้ไฟล์ที่อัปโหลด

\`\`\`bash
# ตั้งค่า listener
nc -lvnp 4444

# อัปโหลดและเรียกใช้ reverse shell
curl http://<target_ip>/uploads/shell.php
\`\`\`

## การยกระดับสิทธิ์

เมื่อเราได้รับการเข้าถึงเบื้องต้นแล้ว เราต้องยกระดับสิทธิ์ของเราเป็น root

### การแจกแจง

การใช้ LinPEAS หรือการแจกแจงด้วยตนเอง เราค้นพบ:
- SUID binaries
- Cron jobs
- ไดเรกทอรีที่เขียนได้

### เวกเตอร์การโจมตี

การยกระดับสิทธิ์เกี่ยวข้องกับการใช้ประโยชน์จากบริการที่กำหนดค่าผิดซึ่งทำงานด้วยสิทธิ์ที่สูงขึ้น

## บทสรุป

เครื่องนี้สอนบทเรียนที่มีค่าเกี่ยวกับ:
- ความปลอดภัยของเว็บแอปพลิเคชัน
- ช่องโหว่การอัปโหลดไฟล์
- การยกระดับสิทธิ์ Linux
- เทคนิคการแจกแจงที่เหมาะสม

จำไว้ว่าต้องปฏิบัติตามแนวทางการเปิดเผยอย่างมีความรับผิดชอบและทดสอบเฉพาะในระบบที่คุณเป็นเจ้าของหรือได้รับอนุญาตอย่างชัดเจนให้ทดสอบเท่านั้น
    `,
    date: "2024-01-15",
    readTime: 8,
    tags: ["TryHackMe", "Penetration Testing", "Linux", "Web Security"],
    category: "Walkthrough",
    github: "https://github.com/yourusername/katana-walkthrough", // Add GitHub link for this post
  },
  2: {
    title: "Kali คืออะไร",
    titleTh: "Kali คืออะไร",
    content: `
# Kali คืออะไร

Kali Linux เป็นดิสโทร Linux ที่ออกแบบมาสำหรับการทดสอบเจาะระบบ (penetration testing) และการตรวจสอบความปลอดภัย (security auditing) โดยเฉพาะ พัฒนาโดย Offensive Security และมีเครื่องมือสำหรับการทดสอบความปลอดภัยมากกว่า 600 รายการ เช่น Nmap, Wireshark, Metasploit, Burp Suite ฯลฯ

## จุดเด่นของ Kali Linux
- ฟรีและโอเพ่นซอร์ส
- มีเครื่องมือสำหรับ pentest ครบถ้วน
- รองรับการใช้งานทั้งแบบ Live USB, VM และติดตั้งลงเครื่องจริง
- มีการอัปเดตเครื่องมือด้านความปลอดภัยอย่างต่อเนื่อง

## เหมาะกับใคร
- นักทดสอบเจาะระบบ (Penetration Tester)
- นักวิจัยด้านความปลอดภัย
- ผู้ที่สนใจด้าน cybersecurity

## ข้อควรระวัง
Kali Linux มีเครื่องมือที่สามารถใช้โจมตีระบบได้ ควรใช้งานอย่างมีจริยธรรมและถูกกฎหมายเท่านั้น
    `,
    contentTh: `
# Kali คืออะไร

Kali Linux เป็นดิสโทร Linux ที่ออกแบบมาสำหรับการทดสอบเจาะระบบ (penetration testing) และการตรวจสอบความปลอดภัย (security auditing) โดยเฉพาะ พัฒนาโดย Offensive Security และมีเครื่องมือสำหรับการทดสอบความปลอดภัยมากกว่า 600 รายการ เช่น Nmap, Wireshark, Metasploit, Burp Suite ฯลฯ

## จุดเด่นของ Kali Linux
- ฟรีและโอเพ่นซอร์ส
- มีเครื่องมือสำหรับ pentest ครบถ้วน
- รองรับการใช้งานทั้งแบบ Live USB, VM และติดตั้งลงเครื่องจริง
- มีการอัปเดตเครื่องมือด้านความปลอดภัยอย่างต่อเนื่อง

## เหมาะกับใคร
- นักทดสอบเจาะระบบ (Penetration Tester)
- นักวิจัยด้านความปลอดภัย
- ผู้ที่สนใจด้าน cybersecurity

## ข้อควรระวัง
Kali Linux มีเครื่องมือที่สามารถใช้โจมตีระบบได้ ควรใช้งานอย่างมีจริยธรรมและถูกกฎหมายเท่านั้น
    `,
    date: "2024-05-20",
    readTime: 4,
    tags: ["Kali Linux", "Penetration Testing", "Security"],
    category: "Linux",
    github: "https://github.com/yourusername/kali-intro"
  },
  3: {
    title: "Linux Distro คืออะไร มีอะไรบ้าง",
    titleTh: "Linux Distro คืออะไร มีอะไรบ้าง",
    content: `
# Linux Distro คืออะไร มีอะไรบ้าง

Linux Distro (Linux Distribution) คือระบบปฏิบัติการที่สร้างขึ้นจาก Linux Kernel และรวมซอฟต์แวร์ต่าง ๆ เพื่อให้ใช้งานได้สะดวก โดยแต่ละดิสโทรจะมีจุดเด่นและกลุ่มเป้าหมายที่แตกต่างกัน

## ตัวอย่าง Linux Distro ที่นิยม
- **Ubuntu**: เหมาะกับผู้เริ่มต้น ใช้งานง่าย มี community ใหญ่
- **Debian**: เสถียร เหมาะกับ server
- **Fedora**: ทันสมัย อัปเดตไว
- **Arch Linux**: ปรับแต่งได้สูง เหมาะกับผู้มีประสบการณ์
- **Kali Linux**: สำหรับ pentest และ security
- **CentOS/AlmaLinux/Rocky Linux**: เหมาะกับ server

## เลือก Distro อย่างไรดี
- ดูวัตถุประสงค์การใช้งาน (desktop, server, pentest ฯลฯ)
- ความง่ายในการติดตั้งและใช้งาน
- การสนับสนุนจาก community
    `,
    contentTh: `
# Linux Distro คืออะไร มีอะไรบ้าง

Linux Distro (Linux Distribution) คือระบบปฏิบัติการที่สร้างขึ้นจาก Linux Kernel และรวมซอฟต์แวร์ต่าง ๆ เพื่อให้ใช้งานได้สะดวก โดยแต่ละดิสโทรจะมีจุดเด่นและกลุ่มเป้าหมายที่แตกต่างกัน

## ตัวอย่าง Linux Distro ที่นิยม
- **Ubuntu**: เหมาะกับผู้เริ่มต้น ใช้งานง่าย มี community ใหญ่
- **Debian**: เสถียร เหมาะกับ server
- **Fedora**: ทันสมัย อัปเดตไว
- **Arch Linux**: ปรับแต่งได้สูง เหมาะกับผู้มีประสบการณ์
- **Kali Linux**: สำหรับ pentest และ security
- **CentOS/AlmaLinux/Rocky Linux**: เหมาะกับ server

## เลือก Distro อย่างไรดี
- ดูวัตถุประสงค์การใช้งาน (desktop, server, pentest ฯลฯ)
- ความง่ายในการติดตั้งและใช้งาน
- การสนับสนุนจาก community
    `,
    date: "2024-05-22",
    readTime: 5,
    tags: ["Linux", "Distro", "Beginner"],
    category: "Linux",
    github: "https://github.com/yourusername/linux-distros"
  },
  4: {
    title: "Linux/OS อื่นๆ ที่น่าสนใจ",
    titleTh: "Linux/OS อื่นๆ ที่น่าสนใจ",
    content: `
# Linux/OS อื่นๆ ที่น่าสนใจ

นอกจาก Linux Distro ที่นิยม ยังมีระบบปฏิบัติการและดิสโทรอื่น ๆ ที่น่าสนใจ เช่น

- **Tails**: เน้นความเป็นส่วนตัวและความปลอดภัย ใช้งานแบบ Live
- **Parrot OS**: สำหรับ pentest และ privacy
- **Zorin OS**: เหมาะกับผู้ย้ายจาก Windows
- **elementary OS**: ดีไซน์สวย ใช้งานง่าย
- **Qubes OS**: เน้นความปลอดภัยสูงสุด ใช้ virtualization แยกแต่ละแอป

## สรุป
การเลือกใช้ Linux/OS ขึ้นอยู่กับความต้องการและลักษณะการใช้งานของแต่ละคน ลองใช้งานหลาย ๆ ตัวเพื่อค้นหาที่เหมาะสมกับตัวเอง
    `,
    contentTh: `
# Linux/OS อื่นๆ ที่น่าสนใจ

นอกจาก Linux Distro ที่นิยม ยังมีระบบปฏิบัติการและดิสโทรอื่น ๆ ที่น่าสนใจ เช่น

- **Tails**: เน้นความเป็นส่วนตัวและความปลอดภัย ใช้งานแบบ Live
- **Parrot OS**: สำหรับ pentest และ privacy
- **Zorin OS**: เหมาะกับผู้ย้ายจาก Windows
- **elementary OS**: ดีไซน์สวย ใช้งานง่าย
- **Qubes OS**: เน้นความปลอดภัยสูงสุด ใช้ virtualization แยกแต่ละแอป

## สรุป
การเลือกใช้ Linux/OS ขึ้นอยู่กับความต้องการและลักษณะการใช้งานของแต่ละคน ลองใช้งานหลาย ๆ ตัวเพื่อค้นหาที่เหมาะสมกับตัวเอง
    `,
    date: "2024-05-25",
    readTime: 3,
    tags: ["Linux", "OS", "Privacy"],
    category: "Linux",
    github: "https://github.com/yourusername/other-os"
  },
}

export default function BlogPostPage() {
  const [language, setLanguage] = useState("en")
  const [mounted, setMounted] = useState(false)
  const [scroll, setScroll] = useState(0)
  const router = useRouter()
  const params = useParams()
  const t = translations[language as keyof typeof translations]

  const postId = Number.parseInt(params.id as string)
  const post = blogPosts[postId as keyof typeof blogPosts]

  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    function onScroll() {
      if (!contentRef.current) return
      const el = contentRef.current
      const scrollTop = window.scrollY
      const docHeight = document.body.scrollHeight - window.innerHeight
      setScroll(docHeight > 0 ? scrollTop / docHeight : 0)
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: language === "en" ? post.title : post.titleTh,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  if (!mounted) return null

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 dark:from-slate-900 dark:via-blue-900 dark:to-slate-900 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-500">
        <ParticleBackground />
        <div className="relative z-10 p-4 md:p-6 max-w-4xl mx-auto">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold mb-4">{t.notFound}</h1>
            <Button onClick={() => router.push("/blog")}>{t.back}</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 dark:from-slate-900 dark:via-blue-900 dark:to-slate-900 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-500">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div style={{ width: `${scroll * 100}%` }} className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-200" />
      </div>
      <ParticleBackground />
      <div className="relative z-10 p-4 md:p-6 max-w-3xl mx-auto flex flex-col gap-8" ref={contentRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-2"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/blog")}
            className="rounded-full bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <span className="text-base text-slate-600 dark:text-slate-300 font-medium">{t.back}</span>
        </motion.div>

        {/* Article Card */}
        <BentoCard className="p-8 md:p-12 flex flex-col gap-8 shadow-xl rounded-3xl bg-white/90 dark:bg-[#18181b]/90 border-0 relative overflow-hidden">
          {/* Subtle pattern bg */}
          {/* Article Header */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-2 flex flex-col gap-2 relative z-10">
            <div className="flex flex-wrap items-center gap-4 mb-2">
              <span className="bg-blue-500/20 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                {post.category}
              </span>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
                <Clock className="w-4 h-4 ml-4" />
                <span>{post.readTime} {t.readTime}</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2 animate-fade-in">
              <span role="img" aria-label="article">📝</span>
              {language === "en" ? post.title : post.titleTh}
            </h1>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Tag className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{t.tags}:</span>
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-blue-500/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-md border border-blue-500/30 hover:bg-blue-500/40 hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
              <Button variant="ghost" size="sm" onClick={handleShare} className="flex items-center gap-2 ml-auto">
                <Share2 className="w-4 h-4" />
                {t.share}
              </Button>
              {post.github && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 ml-2"
                >
                  <a href={post.github} target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1"><path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.304-5.466-1.334-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.047.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.624-5.475 5.92.43.372.823 1.104.823 2.225 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.796 24 17.298 24 12c0-6.627-5.373-12-12-12z"/></svg>
                    GitHub
                  </a>
                </Button>
              )}
            </div>
          </motion.div>
          <hr className="border-blue-200 dark:border-blue-800 my-2" />

          {/* Article Content */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="prose prose-slate dark:prose-invert max-w-none text-lg leading-relaxed relative z-10">
            <div
              className="markdown-content"
              dangerouslySetInnerHTML={{
                __html: (language === "en" ? post.content : post.contentTh)
                  .replace(/\n/g, "<br>")
                  .replace(
                    /```bash\n([\s\S]*?)\n```/g,
                    '<pre class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-blue-900 p-4 rounded-xl overflow-x-auto mb-4 border border-blue-200 dark:border-blue-800 shadow-lg"><code class="text-sm">$1</code></pre>',
                  )
                  .replace(
                    /```([\s\S]*?)\n([\s\S]*?)\n```/g,
                    '<pre class="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 p-4 rounded-xl overflow-x-auto mb-4 border border-slate-200 dark:border-slate-700 shadow-lg"><code class="text-sm">$2</code></pre>',
                  )
                  .replace(
                    /`([^`]+)`/g,
                    '<code class="bg-blue-100 dark:bg-slate-800 px-2 py-1 rounded text-sm text-blue-700 dark:text-blue-200">$1</code>',
                  )
                  .replace(/### (.*?)<br>/g, '<h3 class="text-xl font-bold mt-8 mb-4 animate-fade-in">$1</h3>')
                  .replace(/## (.*?)<br>/g, '<h2 class="text-2xl font-bold mt-8 mb-6 animate-fade-in">$1</h2>')
                  .replace(/# (.*?)<br>/g, '<h1 class="text-3xl font-bold mt-8 mb-6 animate-fade-in">$1</h1>')
                  .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                  .replace(/\*(.*?)\*/g, "<em>$1</em>")
                  .replace(/- (.*?)<br>/g, '<li class="ml-4">$1</li>')
                  .replace(/<blockquote>([\s\S]*?)<\/blockquote>/g, '<blockquote class="border-l-4 border-blue-400 pl-4 italic bg-blue-50 dark:bg-slate-800 py-2 my-4">$1</blockquote>'),
              }}
            />
          </motion.div>
        </BentoCard>
      </div>
    </div>
  )
}
