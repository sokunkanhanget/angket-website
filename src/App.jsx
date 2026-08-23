import { useCallback, useEffect, useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { HowItWorks } from "@/components/how-it-work"
import { ReportForm } from "@/components/report-form"
import { ReportsFeed } from "@/components/reports-feed"
import { TelegramCta } from "@/components/telegram"
import { SiteFooter } from "@/components/site-footer"
import { Toaster } from "@/components/ui/sonner"
import { getReports } from "@/actions/reports"

export default function App() {
  const [reports, setReports] = useState([])

  const refreshReports = useCallback(async () => {
    try {
      setReports(await getReports())
    } catch (e) {
      console.log("[v0] DB unavailable, rendering without reports:", e.message)
    }
  }, [])

  useEffect(() => {
    refreshReports()
  }, [refreshReports])

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero reportCount={Math.max(reports.length, 1240)} />
        <HowItWorks />
        <ReportForm onCreated={() => refreshReports()} />
        <ReportsFeed reports={reports} />
        <TelegramCta />
      </main>
      <SiteFooter />
      <Toaster position="top-center" />
    </div>
  )
}
