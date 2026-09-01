import { useEffect, useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { Login } from "@/pages/Login"
import { SignUp } from "@/pages/SignUp"
import { Hero } from "@/components/hero"
import { Pricing } from "@/components/pricing"
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

function useHashRoute() {
  const [route, setRoute] = useState(() => window.location.hash)
  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash)
    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [])
  return route
}

function SkipLink() {
  const { t } = useLang()
  return (
    <a className="skip-link" href="#main">
      {t({ en: "Skip to main content", km: "រំលងទៅមាតិកាសំខាន់" })}
    </a>
  )
}

function HomePage() {
  return (
    <>
      <Hero />
      <Pricing />
      <Problems />
      <TelegramBand />
      <FinalCta />
    </>
  )
}

function SafetyTipsPage() {
  return <SafetyTips />
}

function ReportPage() {
  return <ReportsFeed />
}

function HowItWorksPage() {
  return <HowItWorks />
}

function AboutPage() {
  return (
    <>
      <About />
      <WhyAngket />
      <TrustNote />
    </>
  )
}

export default function App() {
  const route = useHashRoute()
  const isTipsPage = route.startsWith("#/safety-tips")
  const tipsSection = isTipsPage ? route.slice("#/safety-tips".length).replace(/^\//, "") : ""
  const isHowPage = route.startsWith("#/how-it-works")
  const isAboutPage = route.startsWith("#/about")
  const isReportPage = route.startsWith("#/report")
  const isUsagePage = route.startsWith("#/usage")
  const isLoginPage = route.startsWith("#/login")
  const isSignupPage = route.startsWith("#/signup")

  useEffect(() => {
    if (isUsagePage) {
      const el = document.getElementById("telegram")
      if (el) el.scrollIntoView()
    } else if (isTipsPage || isHowPage || isAboutPage || isReportPage || isLoginPage || isSignupPage) {
      if (tipsSection) {
        const el = document.getElementById(tipsSection)
        if (el) el.scrollIntoView()
      } else {
        window.scrollTo({ top: 0 })
      }
    } else if (route.startsWith("#/") || route === "#") {
      window.scrollTo({ top: 0 })
    } else if (route) {
      const el = document.getElementById(route.slice(1))
      if (el) el.scrollIntoView()
    }
  }, [route, isTipsPage, tipsSection, isHowPage, isAboutPage, isReportPage, isUsagePage, isLoginPage, isSignupPage])

  return (
    <LangProvider>
      <SkipLink />
      <SiteHeader />
      <main id="main">
        {isTipsPage ? (
          <SafetyTipsPage />
        ) : isHowPage ? (
          <HowItWorksPage />
        ) : isAboutPage ? (
          <AboutPage />
        ) : isReportPage ? (
          <ReportPage />
        ) : isLoginPage ? (
          <Login />
        ) : isSignupPage ? (
          <SignUp />
        ) : isUsagePage ? (
          <HomePage />
        ) : (
          <HomePage />
        )}
      </main>
      <SiteFooter />
    </LangProvider>
  )
}
