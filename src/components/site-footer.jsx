import { ShieldCheck, Send } from "lucide-react"
import { TELEGRAM_BOT_URL } from "@/lib/config"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ShieldCheck className="h-4 w-4" />
          </span>
          <div>
            <p className="font-display text-sm font-bold text-foreground">GuardReport</p>
            <p className="text-xs text-muted-foreground">Community scam reporting platform</p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground" aria-label="Footer">
          <a href="#how-it-works" className="transition-colors hover:text-foreground">How it works</a>
          <a href="#report" className="transition-colors hover:text-foreground">Report a scam</a>
          <a href="#feed" className="transition-colors hover:text-foreground">Recent reports</a>
          <a
            href={TELEGRAM_BOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-medium text-primary transition-colors hover:text-primary/80"
          >
            <Send className="h-3.5 w-3.5" /> Telegram bot
          </a>
        </nav>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} GuardReport. Reports reflect the views of their authors. Always verify independently.
        </p>
      </div>
    </footer>
  )
}
