import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useLang } from "@/lib/i18n"
import { useAuth } from "@/lib/auth"
import { goAuthBack } from "@/lib/authBack"
import { AuthLayout } from "@/components/auth/AuthLayout"
import { AuthTabs } from "@/components/auth/AuthTabs"
import { PasswordInput } from "@/components/auth/PasswordInput"
import { Checkbox } from "@/components/auth/Checkbox"

export function Login() {
  const { t } = useLang()
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState("email")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [keepSignedIn, setKeepSignedIn] = useState(true)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    const errs = {}
    const cleanEmail = email.trim()
    const digits = phone.replace(/\D/g, "")

    if (!fullName.trim()) {
      errs.fullName = t({ en: "Full name is required.", km: "ត្រូវការឈ្មោះពេញ។" })
    }

    if (activeTab === "email") {
      if (!cleanEmail) {
        errs.email = t({ en: "Email is required.", km: "ត្រូវការអ៊ីមែល។" })
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(cleanEmail)) {
        errs.email = t({ en: "Please enter a valid email.", km: "សូមបញ្ចូលអ៊ីមែលត្រឹមត្រូវ។" })
      }
    } else {
      if (!phone.trim()) {
        errs.phone = t({ en: "Phone number is required.", km: "ត្រូវការលេខទូរស័ព្ទ។" })
      } else if (digits.length < 8 || digits.length > 12) {
        errs.phone = t({
          en: "Please enter a valid phone number (e.g. 012 345 678).",
          km: "សូមបញ្ចូលលេខទូរស័ព្ទត្រឹមត្រូវ (ឧ. ០១២ ៣៤៥ ៦៧៨)។",
        })
      }
    }

    if (!password) {
      errs.password = t({ en: "Password is required.", km: "ត្រូវការពាក្យសម្ងាត់។" })
    }

    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    if (submitting) return

    setSubmitting(true)
    try {
      const from = location.state?.from?.pathname || "/admin/dashboard"
      await login({ email: activeTab === "email" ? cleanEmail : phone, password })
      navigate(from, { replace: true })
    } catch (err) {
      setErrors({ password: err.message })
    } finally {
      setSubmitting(false)
    }
  }

  const goBack = () => goAuthBack(navigate)

  return (
    <AuthLayout>
      <>
        <button type="button" className="auth-back" onClick={goBack}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m15 18-6-6 6-6" />
          </svg>
          {t({ en: "Back", km: "ត្រឡប់ក្រោយ" })}
        </button>
        <h1 className="auth-split__heading">
          {t({ en: "Welcome to Angket !!", km: "សូមស្វាគមន៍មកកាន់ Angket !!" })}
        </h1>
        <p className="auth-split__sub">
          {t({
            en: "A community-powered platform to report scams and protect others.",
            km: "វេទិកាដែលជួយរាយការណ៍ការបោកប្រាស់ និងការពារអ្នកដទៃ។",
          })}
        </p>

        <AuthTabs activeTab={activeTab} onChange={(tab) => { setActiveTab(tab); setErrors({}) }} />

        <form className="auth-form" onSubmit={handleLogin} noValidate>
          {activeTab === "email" ? (
            <div className="auth-field">
              <label className="auth-field__label" htmlFor="login-email">
                {t({ en: "Email address", km: "អាសយដ្ឋានអ៊ីមែល" })}
              </label>
              <input
                id="login-email"
                name="email"
                className={`control ${errors.email ? "control--error" : ""}`}
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="abc@angket.kh"
                aria-describedby={errors.email ? "login-email-err" : undefined}
                aria-invalid={errors.email ? "true" : undefined}
              />
              {errors.email && (
                <p className="auth-field__error" id="login-email-err" role="alert">
                  {errors.email}
                </p>
              )}
            </div>
          ) : (
            <div className="auth-field">
              <label className="auth-field__label" htmlFor="login-phone">
                {t({ en: "Phone number", km: "លេខទូរស័ព្ទ" })}
              </label>
              <div className="auth-phone">
                <select className="control auth-phone__code" aria-label="Country code">
                  <option>+855</option>
                  <option>+1</option>
                  <option>+44</option>
                </select>
                <input
                  id="login-phone"
                  name="phone"
                  className={`control ${errors.phone ? "control--error" : ""}`}
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="012 345 678"
                  aria-describedby={errors.phone ? "login-phone-err" : undefined}
                  aria-invalid={errors.phone ? "true" : undefined}
                />
              </div>
              <p className="f-hint">
                {t({
                  en: "Enter a valid number between 8 and 12 digits.",
                  km: "បញ្ចូលលេខទូរស័ព្ទត្រឹមត្រូវ ដែលមានពី ៨ ទៅ ១២ ខ្ទង់។",
                })}
              </p>
              {errors.phone && (
                <p className="auth-field__error" id="login-phone-err" role="alert">
                  {errors.phone}
                </p>
              )}
            </div>
          )}

          <div className="auth-field">
            <label className="auth-field__label" htmlFor="login-name">
              {t({ en: "Full name", km: "ឈ្មោះពេញ" })}
            </label>
            <input
              id="login-name"
              name="fullName"
              className={`control ${errors.fullName ? "control--error" : ""}`}
              type="text"
              autoComplete="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={t({ en: "e.g. Sok Dara", km: "ឧ. សុខ ដារា" })}
              aria-describedby={errors.fullName ? "login-name-err" : undefined}
              aria-invalid={errors.fullName ? "true" : undefined}
            />
            {errors.fullName && (
              <p className="auth-field__error" id="login-name-err" role="alert">
                {errors.fullName}
              </p>
            )}
          </div>

          <div className="auth-field">
            <label className="auth-field__label" htmlFor="login-password">
              {t({ en: "Password", km: "ពាក្យសម្ងាត់" })}
            </label>
            <PasswordInput
              id="login-password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t({ en: "Enter your password", km: "បញ្ចូលពាក្យសម្ងាត់របស់អ្នក" })}
              autoComplete="current-password"
              required
              errorId={errors.password ? "login-password-err" : undefined}
            />
            {errors.password && (
              <p className="auth-field__error" id="login-password-err" role="alert">
                {errors.password}
              </p>
            )}
          </div>

          <div className="auth-row">
            <Checkbox
              id="login-keep"
              checked={keepSignedIn}
              onChange={(e) => setKeepSignedIn(e.target.checked)}
            >
              {t({ en: "Keep me signed in", km: "រក្សាទុកការចូល" })}
            </Checkbox>
            <Link className="auth-row__link" to="/login">
              {t({ en: "Forgot password?", km: "ភ្លេចពាក្យសម្ងាត់?" })}
            </Link>
          </div>

          <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={submitting}>
            {submitting ? t({ en: "Signing in…", km: "កំពុងចូលគណនី…" }) : t({ en: "Sign in", km: "ចូលគណនី" })}
          </button>
        </form>

        <p className="auth-alt">
          {t({ en: "First time here?", km: "ទើបមកដល់?" })}{" "}
          <Link to="/signup">{t({ en: "Sign up", km: "ចុះឈ្មោះ" })}</Link>
        </p>
      </>
    </AuthLayout>
  )
}

export default Login