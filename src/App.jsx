import { useEffect, useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { Login } from "@/pages/Login"
import { SignUp } from "@/pages/SignUp"
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

export default function App() {
  const route = useHashRoute()
  const isLoginPage = route.startsWith("#/login")
  const isSignupPage = route.startsWith("#/signup")

  useEffect(() => {
    if (isLoginPage || isSignupPage) {
      window.scrollTo({ top: 0 })
    } else if (route && !route.startsWith("#/")) {
      const el = document.getElementById(route.slice(1))
      if (el) el.scrollIntoView()
    }
  }, [route, isLoginPage, isSignupPage])

  return (
    <LangProvider>
      <SkipLink />
      <SiteHeader />
      <main id="main">
        {isLoginPage ? (
          <Login />
        ) : isSignupPage ? (
          <SignUp />
        ) : (
          <>
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
          </>
        )}
      </main>
      <SiteFooter />
    </LangProvider>
  )
}
