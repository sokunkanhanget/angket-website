import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useLang } from "@/lib/i18n"
import { useAuth } from "@/lib/auth"
import { consumeAuthOrigin, goAuthBack } from "@/lib/authBack"
import { AuthLayout } from "@/components/auth/AuthLayout"
import { AuthTabs } from "@/components/auth/AuthTabs"
import { PasswordInput } from "@/components/auth/PasswordInput"
import { Checkbox } from "@/components/auth/Checkbox"
import { authApi } from "@/lib/services"

export function Login() {
  const { t } = useLang()
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState("email")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [phoneCode, setPhoneCode] = useState("+855")
  const [password, setPassword] = useState("")
  const [keepSignedIn, setKeepSignedIn] = useState(false)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [loginMessage, setLoginMessage] = useState("")
  const [canResend, setCanResend] = useState(false)
  const [resending, setResending] = useState(false)
  const [resendMessage, setResendMessage] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    const errs = {}
    const cleanEmail = email.trim()
    const digits = phone.replace(/\D/g, "")

    if (activeTab === "email") {
      if (!cleanEmail) {
        errs.email = t({ en: "Email is required.", km: "សូមបញ្ចូលអ៊ីមែល" })
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(cleanEmail)) {
        errs.email = t({ en: "Please enter a valid email.", km: "សូមបញ្ចូលអាសយដ្ឋានអ៊ីមែលដែលត្រឹមត្រូវ" })
      }
    } else {
      if (!phone.trim()) {
        errs.phone = t({ en: "Phone number is required.", km: "សូមបញ្ចូលលេខទូរស័ព្ទ" })
      } else if (digits.length < 8 || digits.length > 12) {
        errs.phone = t({
          en: "Please enter a valid phone number (example: 0XX XXX XXX).",
          km: "សូមបញ្ចូលលេខទូរស័ព្ទត្រឹមត្រូវ (ឧទាហរណ៍៖ 0XX XXX XXX)",
        })
      }
    }

    if (!password) {
      errs.password = t({ en: "Password is required.", km: "សូមបញ្ចូលពាក្យសម្ងាត់" })
    }

    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    if (submitting) return

    setLoginMessage("")
    setCanResend(false)
    setResendMessage("")
    setSubmitting(true)
    try {
      const user = await login(
        activeTab === "email"
          ? { email: cleanEmail, password, keepSignedIn }
          : { phone: `${phoneCode}${phone.replace(/\s+/g, "")}`, password, keepSignedIn },
      )
      const fallback = user?.role === "admin" ? "/admin/dashboard" : "/"
      let dest = location.state?.from?.pathname
      if (!dest || dest === "/login" || dest === "/signup") {
        const origin = consumeAuthOrigin()
        dest = origin && origin !== "/" ? origin : fallback
      }
      if (user?.role !== "admin" && dest.startsWith("/admin")) {
        dest = fallback
      }
      if (user?.role === "admin" && !dest.startsWith("/admin") && !location.state?.from) {
        dest = "/admin/dashboard"
      }
      navigate(dest, { replace: true })
    } catch (err) {
      if (err.data?.code === "EMAIL_NOT_VERIFIED") {
        setLoginMessage(t({
          en: "Please verify your email address before signing in.",
          km: "សូមផ្ទៀងផ្ទាត់អាសយដ្ឋានអ៊ីមែលរបស់អ្នក មុនពេលចូលគណនី។",
        }))
        setCanResend(activeTab === "email")
      } else {
        setErrors({ password: err.data?.error || err.message })
      }
    } finally {
      setSubmitting(false)
    }
  }

  const handleResend = async () => {
    setResending(true)
    setResendMessage("")
    try {
      const result = await authApi.resendVerification(email.trim())
      setResendMessage(result.message)
    } catch (err) {
      setResendMessage(err.data?.error || err.message)
    } finally {
      setResending(false)
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
        <h1 className="auth-split__heading auth-split__heading--login">
          {t({ en: "Welcome to Angket!", km: "សូមស្វាគមន៍មកកាន់ Angket!" })}
        </h1>
        {location.state?.passwordReset && (
          <p className="auth-notice" role="status">
            {t({ en: "Your password has been updated. Sign in with your new password.", km: "ពាក្យសម្ងាត់របស់អ្នកត្រូវបានធ្វើបច្ចុប្បន្នភាព។ សូមចូលដោយប្រើពាក្យសម្ងាត់ថ្មី។" })}
          </p>
        )}

        <AuthTabs activeTab={activeTab} onChange={(tab) => {
          setActiveTab(tab)
          setErrors({})
          setLoginMessage("")
          setCanResend(false)
          setResendMessage("")
        }} />

        {loginMessage && (
          <p className="auth-notice" role="alert">
            {loginMessage}
            {canResend && email.trim() && (
              <>
                {" "}
                <button type="button" className="auth-inline-link" onClick={handleResend} disabled={resending}>
                  {resending
                    ? t({ en: "Sending…", km: "កំពុងផ្ញើ…" })
                    : t({ en: "Resend verification email", km: "ផ្ញើអ៊ីមែលផ្ទៀងផ្ទាត់ម្តងទៀត" })}
                </button>
              </>
            )}
          </p>
        )}
        {resendMessage && <p className="auth-notice" role="status">{resendMessage}</p>}

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
                placeholder="sophavortey@gmail.com"
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
                <select
                  className="control auth-phone__code"
                  aria-label="Country code"
                  value={phoneCode}
                  onChange={(event) => setPhoneCode(event.target.value)}
                >
                  <option value="+855">+855</option>
                  <option value="+84">+84</option>
                  <option value="+856">+856</option>
                  <option value="+60">+60</option>
                  <option value="+65">+65</option>
                  <option value="+62">+62</option>
                  <option value="+63">+63</option>
                  <option value="+86">+86</option>
                  <option value="+81">+81</option>
                  <option value="+82">+82</option>
                </select>
                <input
                  id="login-phone"
                  name="phone"
                  className={`control ${errors.phone ? "control--error" : ""}`}
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0XX XXX XXX"
                  aria-describedby={errors.phone ? "login-phone-err" : undefined}
                  aria-invalid={errors.phone ? "true" : undefined}
                />
              </div>
              {errors.phone && (
                <p className="auth-field__error" id="login-phone-err" role="alert">
                  {errors.phone}
                </p>
              )}
            </div>
          )}

          <div className="auth-field">
            <label className="auth-field__label" htmlFor="login-password">
              {t({ en: "Password", km: "ពាក្យសម្ងាត់" })}
            </label>
            <PasswordInput
              id="login-password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t({ en: "Enter your password", km: "សូមបញ្ចូលពាក្យសម្ងាត់របស់អ្នក" })}
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
              {t({ en: "Keep me signed in", km: "រក្សាការចូលរបស់ខ្ញុំ" })}
            </Checkbox>
            <Link className="auth-row__link" to="/forgot-password">
              {t({ en: "Forgot password?", km: "ភ្លេចពាក្យសម្ងាត់?" })}
            </Link>
          </div>

          <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={submitting}>
            {submitting ? t({ en: "Signing in…", km: "កំពុងចូលគណនី…" }) : t({ en: "Sign in", km: "ចូលគណនី" })}
          </button>
        </form>

        <p className="auth-alt">
          {t({ en: "Do not have an account yet?", km: "តើអ្នកមិនទាន់មានគណនីមែនទេ?" })}{" "}
          <Link to="/signup">{t({ en: "Sign up", km: "បង្កើតគណនី" })}</Link>
        </p>
      </>
    </AuthLayout>
  )
}

export default Login