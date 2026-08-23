import { Send, Zap, Bell, Search } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { TELEGRAM_BOT_URL } from "@/lib/config"

const FEATURES = [
  { icon: Zap, text: "Report a scam in seconds" },
  { icon: Search, text: "Check if a number or link is flagged" },
  { icon: Bell, text: "Get alerts on trending scams" },
]

export function TelegramCta() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:py-20 lg:grid-cols-2">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-medium">
            <Send className="h-3.5 w-3.5" /> Telegram Bot
          </div>
          <h2 className="mt-4 text-balance font-display text-3xl font-bold tracking-tight md:text-4xl">
            Report and check scams right from Telegram
          </h2>
          <p className="mt-4 max-w-lg text-pretty leading-relaxed text-primary-foreground/80">
            Our bot lets you report scams, verify suspicious offers, and stay updated on the latest
            threats — all without leaving your chat app.
          </p>
          <a
            href={TELEGRAM_BOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "lg", variant: "secondary" }), "mt-8 gap-2")}
          >
            <Send className="h-4 w-4" /> Open the Telegram bot
          </a>
        </div>

        <ul className="grid gap-3">
          {FEATURES.map((f) => (
            <li
              key={f.text}
              className="flex items-center gap-3 rounded-xl bg-primary-foreground/10 p-4 backdrop-blur-sm"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/15">
                <f.icon className="h-5 w-5" />
              </span>
              <span className="font-medium">{f.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
