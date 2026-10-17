import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useLang } from "@/lib/i18n"
import { useAuth } from "@/lib/auth"
import { consumeAuthOrigin, goAuthBack } from "@/lib/authBack"
import { AuthLayout } from "@/components/auth/AuthLayout"
import { AuthTabs } from "@/components/auth/AuthTabs"
import { PasswordInput } from "@/components/auth/PasswordInput"
import { Checkbox } from "@/components/auth/Checkbox"

const CONTROL =
  "rounded-[10px] border border-[#e3e9f3] bg-white px-[0.9rem] py-[0.68rem] text-ink transition-[border-color,box-shadow] duration-150 placeholder:text-faint focus:border-blue-500 focus:shadow-[0_0_0_3px_var(--color-blue-100)] focus:outline-none"
const BTN_LG =
  "inline-flex items-center justify-center gap-2 rounded-full border cursor-pointer px-[1.7rem] py-[0.88rem] text-[1.03rem] font-semibold whitespace-nowrap transition-[background-color,box-shadow,transform] duration-[180ms] ease-out km:pt-[0.62rem] km:pb-[0.62rem]"

const LOGIN_ERRORS = {
  "No account found for this phone number": {
    en: "No account found for this phone number",
    km: "រកមិនឃើញគណនីសម្រាប់លេខទូរស័ព្ទនេះទេ",
  },
  "Incorrect password.": {
    en: "Incorrect password.",
    km: "ពាក្យសម្ងាត់មិនត្រឹមត្រូវ",
  },
  "No account found with this email address": {
    en: "No account found with this email address",
    km: "រកមិនឃើញគណនីសម្រាប់អាសយដ្ឋានអ៊ីមែលនេះទេ",
  },
}

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
  const [keepSignedIn, setKeepSignedIn] = useState(true)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

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

    setSubmitting(true)
    try {
      const user = await login(
        activeTab === "email"
          ? { email: cleanEmail, password }
          : { phone: `${phoneCode}${phone.replace(/\s+/g, "")}`, password },
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
      if (user?.role === "admin" && !dest.startsWith("/admin")) {
        dest = "/admin/dashboard"
      }
      navigate(dest, { replace: true })
    } catch (err) {
      const raw = err.message || "Login failed"
      const translated = LOGIN_ERRORS[raw]
        ? t(LOGIN_ERRORS[raw])
        : t({ en: raw, km: raw })
      if (activeTab === "email") {
        setErrors(/email/i.test(raw) ? { email: translated } : { password: translated })
      } else {
        setErrors(/phone/i.test(raw) ? { phone: translated } : { password: translated })
      }
    } finally {
      setSubmitting(false)
    }
  }

  const goBack = () => goAuthBack(navigate)

  return (
    <AuthLayout>
      <>
        <button
          type="button"
          className="mb-[1.3rem] inline-flex cursor-pointer items-center gap-[0.45rem] border-none bg-transparent px-0 py-[0.3rem] text-[0.88rem] font-semibold text-blue-700 transition-colors duration-150 hover:text-blue-600"
          onClick={goBack}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4">
            <path d="m15 18-6-6 6-6" />
          </svg>
          {t({ en: "Back", km: "ត្រឡប់ក្រោយ" })}
        </button>
        <h1 className="mb-4 font-display text-[1.6rem] font-bold leading-[1.3] text-ink max-[480px]:text-[1.35rem]">
          {t({ en: "Welcome to Angket!", km: "សូមស្វាគមន៍មកកាន់ Angket!" })}
        </h1>

        <AuthTabs activeTab={activeTab} onChange={(tab) => { setActiveTab(tab); setErrors({}) }} />

        <form className="flex flex-col gap-[1.15rem]" onSubmit={handleLogin} noValidate>
          {activeTab === "email" ? (
            <div className="flex flex-col gap-[0.4rem]">
              <label className="text-[0.88rem] font-semibold text-ink" htmlFor="login-email">
                {t({ en: "Email address", km: "អាសយដ្ឋានអ៊ីមែល" })}
              </label>
              <input
                id="login-email"
                name="email"
                className={`w-full ${CONTROL}${errors.email ? " !border-red-600" : ""}`}
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sophavortey@gmail.com"
                aria-describedby={errors.email ? "login-email-err" : undefined}
                aria-invalid={errors.email ? "true" : undefined}
              />
              {errors.email && (
                <p className="mt-[0.15rem] text-[0.82rem] font-medium text-red-600" id="login-email-err" role="alert">
                  {errors.email}
                </p>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-[0.4rem]">
              <label className="text-[0.88rem] font-semibold text-ink" htmlFor="login-phone">
                {t({ en: "Phone number", km: "លេខទូរស័ព្ទ" })}
              </label>
              <div className="flex gap-2">
                <select
                  className={`min-w-[175px] shrink-0 ${CONTROL}`}
                  aria-label="Country code"
                  value={phoneCode}
                  onChange={(e) => setPhoneCode(e.target.value)}
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
                  className={`w-full ${CONTROL}${errors.phone ? " !border-red-600" : ""}`}
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
                <p className="mt-[0.15rem] text-[0.82rem] font-medium text-red-600" id="login-phone-err" role="alert">
                  {errors.phone}
                </p>
              )}
            </div>
          )}

          <div className="flex flex-col gap-[0.4rem]">
            <label className="text-[0.88rem] font-semibold text-ink" htmlFor="login-password">
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
              <p className="mt-[0.15rem] text-[0.82rem] font-medium text-red-600" id="login-password-err" role="alert">
                {errors.password}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between text-[0.88rem]">
            <Checkbox
              id="login-keep"
              checked={keepSignedIn}
              onChange={(e) => setKeepSignedIn(e.target.checked)}
            >
              {t({ en: "Keep me signed in", km: "រក្សាការចូលរបស់ខ្ញុំ" })}
            </Checkbox>
            <Link className="text-[0.88rem] font-semibold text-blue-700 hover:underline" to="/login">
              {t({ en: "Forgot password?", km: "ភ្លេចពាក្យសម្ងាត់?" })}
            </Link>
          </div>

          <button
            type="submit"
            className={`${BTN_LG} mt-2 w-full border-transparent bg-blue-800 text-white shadow-sm hover:bg-blue-700 hover:-translate-y-px`}
            disabled={submitting}
          >
            {submitting ? t({ en: "Signing in…", km: "កំពុងចូលគណនី…" }) : t({ en: "Sign in", km: "ចូលគណនី" })}
          </button>
        </form>

        <p className="mt-[1.2rem] text-center text-[0.92rem] text-[#56657f]">
          {t({ en: "Do not have an account yet?", km: "តើអ្នកមិនទាន់មានគណនីមែនទេ?" })}{" "}
          <Link className="font-semibold text-blue-700 hover:underline" to="/signup">{t({ en: "Sign up", km: "បង្កើតគណនី" })}</Link>
        </p>
      </>
    </AuthLayout>
  )
}

export default Login
