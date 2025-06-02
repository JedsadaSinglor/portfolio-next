import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Dock } from "@/components/dock"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Jedsada Singlor - Data Science & Cybersecurity",
  description:
    "Portfolio of Jedsada Singlor, Data Science and Cybersecurity student specializing in ethical hacking and digital security.",
}

export default function RootLayout({
  children,
  
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          {/* <Dock language="en" /> */}
        </ThemeProvider>
      </body>
    </html>
  )
}
