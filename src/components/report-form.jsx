import { useState, useTransition } from "react"
import { toast } from "sonner"
import { Send, ShieldCheck, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { submitReport } from "@/actions/reports"
import { SCAM_TYPES, TELEGRAM_BOT_URL } from "@/lib/config"

export function ReportForm({ onCreated }) {
  const [scamType, setScamType] = useState("")
  const [pending, startTransition] = useTransition()

  function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    formData.set("scamType", scamType)

    startTransition(async () => {
      const result = await submitReport(formData)
      if (result.ok) {
        toast.success("Thank you. Your report was published to the community feed.")
        form.reset()
        setScamType("")
        onCreated?.(result.report)
      } else {
        toast.error(result.error)
      }
    })
  }

  return (
    <section id="report" className="border-y border-border bg-accent/30">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:py-24 lg:grid-cols-[1fr_1.2fr]">
        <div className="lg:pt-4">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Report a scam</p>
          <h2 className="mt-2 text-balance font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Tell us what happened
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Your report is anonymous by default and published to help others. Include as much detail
            as you can so people can recognize the same scam.
          </p>

          <div className="mt-6 flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <p className="text-sm text-foreground">
              Prefer to report on your phone? Use our{" "}
              <a
                href={TELEGRAM_BOT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary underline underline-offset-4"
              >
                Telegram bot
              </a>{" "}
              to submit in seconds.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8"
        >
          <div className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="title">Report title *</Label>
              <Input id="title" name="title" placeholder="e.g. Fake investment app stole my deposit" required />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="scamType">Type of scam *</Label>
                <Select value={scamType} onValueChange={setScamType} required>
                  <SelectTrigger id="scamType">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    {SCAM_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="platform">Where did it happen?</Label>
                <Input id="platform" name="platform" placeholder="e.g. Instagram, WhatsApp, email" />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">What happened? *</Label>
              <Textarea
                id="description"
                name="description"
                rows={5}
                placeholder="Describe the scam or fake offer, how they contacted you, and what they asked for."
                required
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="scammerContact">Scammer contact / link</Label>
                <Input id="scammerContact" name="scammerContact" placeholder="Phone, @handle, or URL" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="amountLost">Amount lost (optional)</Label>
                <Input id="amountLost" name="amountLost" placeholder="e.g. $200" />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="reporterName">Your name (optional)</Label>
              <Input id="reporterName" name="reporterName" placeholder="Leave blank to stay anonymous" />
            </div>

            <Button type="submit" size="lg" disabled={pending} className="mt-1 gap-2">
              {pending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> Publish report
                </>
              )}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              By submitting, you confirm this report is truthful to the best of your knowledge.
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}
