import { ShieldCheck, Send, Lock, Users, AlertTriangle } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { TELEGRAM_BOT_URL } from "@/lib/config"

export function Hero({ reportCount }) {
  return (
    <section id="top" className="relative overflow-hidden border-b border-border bg-gradient-to-b from-accent/40 to-background">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:py-24 lg:grid-cols-2">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <ShieldCheck className="h-3.5 w-3.5" />
            Community-powered scam protection
          </div>

          <h1 className="mt-5 text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Expose scams. Protect people. Fight back together.
          </h1>

          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            GuardReport is a trusted community platform where you can report scams and fake offers,
            share your experience, and warn others before they get hurt. Every report helps someone
            avoid a trap.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#report" className={cn(buttonVariants({ size: "lg" }), "gap-2")}>
              <AlertTriangle className="h-4 w-4" />
              Report your experience
            </a>
            <a
              href={TELEGRAM_BOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "lg", variant: "outline" }), "gap-2 bg-transparent")}
            >
              <Send className="h-4 w-4" />
              Report via Telegram
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-primary" /> Anonymous &amp; secure
            </span>
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" /> {reportCount.toLocaleString()}+ reports shared
            </span>
          </div>
        </div>

        <div className="relative">
          <ReportPreviewCard />
        </div>
      </div>
    </section>
  )
}

function ReportPreviewCard() {
  return (
    <div className="relative mx-auto w-full max-w-md rounded-2xl border border-border bg-card p-5 shadow-xl shadow-primary/5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">Verified Report</p>
            <p className="text-xs text-muted-foreground">Community submitted</p>
          </div>
        </div>
        <span className="rounded-full bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive">
          Scam
        </span>
      </div>

      <div className="mt-4 space-y-3">
        <div className="rounded-lg border border-border bg-muted/40 p-3">
          <p className="text-xs font-medium text-muted-foreground">Fake Job Offer</p>
          <p className="mt-1 text-sm font-medium text-foreground">
            "Remote data-entry job asked for a $200 onboarding fee upfront."
          </p>
        </div>
        <div className="flex gap-3">
          <div className="flex-1 rounded-lg border border-border bg-muted/40 p-3">
            <p className="text-xs text-muted-foreground">Platform</p>
            <p className="text-sm font-semibold text-foreground">WhatsApp</p>
          </div>
          <div className="flex-1 rounded-lg border border-border bg-muted/40 p-3">
            <p className="text-xs text-muted-foreground">Reported loss</p>
            <p className="text-sm font-semibold text-foreground">$200</p>
          </div>
        </div>
      </div>
    </div>
  )
}
