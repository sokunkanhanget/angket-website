import { useEffect } from "react"
import { BrowserRouter, Routes, Route, Outlet, useLocation } from "react-router-dom"
import { SiteHeader } from "@/components/site-header"
import { Login } from "@/pages/Login"
import { SignUp } from "@/pages/SignUp"
import { Hero } from "@/components/hero"
import { Pricing } from "@/components/pricing"
import { Problems } from "@/components/problems"
import { About } from "@/components/about"
import { HowItWorks } from "@/components/how-it-work"
import { ReportsFeed } from "@/components/reports-feed"
import { SafetyTips } from "@/components/safety-tips"
import { WhyAngket } from "@/components/why-angket"
import { TrustNote } from "@/components/trust-note"
import { FinalCta } from "@/components/final-cta"
import { SiteFooter } from "@/components/site-footer"
import { LangProvider, useLang } from "@/lib/i18n"
import { AuthProvider } from "@/lib/auth"
import ProtectedAdminRoute from "@/admin/ProtectedAdminRoute"
import AdminLayout from "@/admin/AdminLayout"
import DashboardPage from "@/admin/pages/DashboardPage"
import UsersPage from "@/admin/pages/UsersPage"
import VerificationsPage from "@/admin/pages/VerificationsPage"
import ReportsPage from "@/admin/pages/ReportsPage"
import CategoriesPage from "@/admin/pages/CategoriesPage"
import SubscriptionsPage from "@/admin/pages/SubscriptionsPage"

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])
  return null
}

function SkipLink() {
  const { t } = useLang()
  return (
    <a className="skip-link" href="#main">
      {t({ en: "Skip to main content", km: "រំលងទៅមាតិកាសំខាន់" })}
    </a>
  )
}

function PublicLayout() {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main id="main">
        <Outlet />
      </main>
      <SiteFooter />
    </>
  )
}

function HomePage() {
  return (
    <>
      <Hero />
      <Pricing />
      <Problems />
      <FinalCta />
    </>
  )
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
  return (
    <AuthProvider>
      <LangProvider>
        <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<ProtectedAdminRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="verifications" element={<VerificationsPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="categories" element={<CategoriesPage />} />
              <Route path="subscriptions" element={<SubscriptionsPage />} />
            </Route>
          </Route>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/safety-tips" element={<SafetyTips />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/report" element={<ReportsFeed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </LangProvider>
    </AuthProvider>
  )
}
