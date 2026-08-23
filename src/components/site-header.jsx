"use client"

import { ShieldCheck, Send } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { TELEGRAM_BOT_URL } from "@/lib/config"

const NAV = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Report", href: "#report" },
  { label: "Recent reports", href: "#feed" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <a href="#top" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-foreground">
            Guard<span className="text-primary">Report</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={TELEGRAM_BOT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ size: "sm" }), "gap-2")}
        >
          <Send className="h-4 w-4" />
          <span className="hidden sm:inline">Telegram Bot</span>
          <span className="sm:hidden">Bot</span>
        </a>
      </div>
    </header>
  )
}
