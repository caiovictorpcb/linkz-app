import { TabNavigation } from "@/components/tab-navigation"
import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from 'next'
import { Inter } from "next/font/google"
import './globals.css'

export const metadata: Metadata = {
  title: 'ki0.tech',
  description: 'ki0 tools',
}

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Analytics />
      <body className={inter.className}><div className="flex min-h-[calc(100vh-64px)] flex-col bg-gradient-to-b from-slate-50 to-slate-100">
          <TabNavigation />
          {children}
        </div></body>
    </html>
  )
}
