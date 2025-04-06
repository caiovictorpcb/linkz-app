"use client"

import { cn } from "@/lib/utils"
import { BarChart2, Link2 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const tabs = [
  {
    name: "URL Shortener",
    href: "/url-shortener", 
    icon: Link2,
  },
  {
    name: "Percentage Calculator",
    href: "/pct-calculator",
    icon: BarChart2,
  }, 
]
 
export function TabNavigation() {
  const pathname = usePathname()

  return (
    <div className="border-b bg-white h-[64px] fixed w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-slate-900 mr-8">ki0 tools</h1>
            <nav className="flex space-x-4">
              {tabs.map((tab) => {
                const isActive = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href)

                return (
                  <Link
                    key={tab.name}
                    href={tab.href}
                    className={cn(
                      "inline-flex items-center px-3 py-2 text-sm font-medium rounded-md",
                      "transition-colors duration-150 ease-in-out",
                      isActive
                        ? "bg-slate-100 text-slate-900"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50",
                    )}
                  >
                    <tab.icon className="mr-2 h-4 w-4" />
                    {tab.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

