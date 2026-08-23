import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Problems } from "@/components/problems"
import { About } from "@/components/about"
import { HowItWorks } from "@/components/how-it-work"
import { TelegramBand } from "@/components/telegram"
import { ReportsFeed } from "@/components/reports-feed"
import { SafetyTips } from "@/components/safety-tips"
import { WhyAngket } from "@/components/why-angket"
import { TrustNote } from "@/components/trust-note"
import { FinalCta } from "@/components/final-cta"
import { SiteFooter } from "@/components/site-footer"
import { LangProvider, useLang } from "@/lib/i18n"

function SkipLink() {
  const { t } = useLang()
  return (
    <a className="skip-link" href="#main">
      {t({ en: "Skip to main content", km: "រំលងទៅមាតិកាសំខាន់" })}
    </a>
  )
}

export default function App() {
  return (
    <LangProvider>
      <SkipLink />
      <SiteHeader />
      <main id="main">
        <Hero />
        <Problems />
        <About />
        <HowItWorks />
        <TelegramBand />
        <ReportsFeed />
        <SafetyTips />
        <WhyAngket />
        <TrustNote />
        <FinalCta />
      </main>
      <SiteFooter />
    </LangProvider>
  )
}
