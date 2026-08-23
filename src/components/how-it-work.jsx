import { FileText, Users, Bell } from "lucide-react"

const STEPS = [
  {
    icon: FileText,
    title: "Share your experience",
    body: "Report a scam or fake offer in a minute. Add the platform, contact details, and what happened so others can recognize it.",
  },
  {
    icon: Users,
    title: "We publish it to the community",
    body: "Your report joins a public, searchable feed of scams. No account required, and you can stay completely anonymous.",
  },
  {
    icon: Bell,
    title: "People get warned in time",
    body: "Anyone checking a suspicious offer can find real reports and our Telegram bot before they lose money.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">How it works</p>
        <h2 className="mt-2 text-balance font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Turning your bad experience into someone&apos;s protection
        </h2>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {STEPS.map((step, i) => (
          <div
            key={step.title}
            className="relative rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <step.icon className="h-6 w-6" />
            </div>
            <p className="mt-5 font-display text-sm font-semibold text-primary">Step {i + 1}</p>
            <h3 className="mt-1 font-display text-lg font-bold text-foreground">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
