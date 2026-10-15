import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AuthLayout } from "@/components/auth/AuthLayout"
import { useAuth } from "@/lib/auth"
import { useLang } from "@/lib/i18n"
import { authApi } from "@/lib/services"

const RESEND_DELAY_MS = 60_000

export function VerifyEmail() {
  const { t } = useLang()
  const { completeSession } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [email] = useState(() => (
    location.state?.email || sessionStorage.getItem("angket_pending_email") || ""
  ))
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [notice, setNotice] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [resending, setResending] = useState(false)
  const [resendAt, setResendAt] = useState(() => (
    Number(sessionStorage.getItem("angket_otp_sent_at")) + RESEND_DELAY_MS
  ))
  const [now, setNow] = useState(() => Date.now())
  const secondsRemaining = Math.max(0, Math.ceil((resendAt - now) / 1000))

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(interval)
  }, [])

  const submit = async (event) => {
    event.preventDefault()
    setError("")
    setNotice("")
    const trimmedCode = code.trim()
    if (!email) {
      setError(t({
        en: "Sign up first to request a verification code.",
        km: "សូមបង្កើតគណនីជាមុន ដើម្បីស្នើសុំលេខកូដផ្ទៀងផ្ទាត់។",
      }))
      return
    }
    if (!/^\d{6}$/.test(trimmedCode)) {
      setError(t({
        en: "Enter the 6-digit code from your email.",
        km: "បញ្ចូលលេខកូដ ៦ ខ្ទង់ពីអ៊ីមែលរបស់អ្នក។",
      }))
      return
    }

    setSubmitting(true)
    try {
      const session = await authApi.verifySignupOtp({ email, token: trimmedCode })
      sessionStorage.removeItem("angket_pending_email")
      sessionStorage.removeItem("angket_otp_sent_at")
      await completeSession(session)
      navigate("/", { replace: true })
    } catch (verifyError) {
      setError(verifyError.data?.error || verifyError.message)
    } finally {
      setSubmitting(false)
    }
  }

  const resendCode = async () => {
    if (!email || secondsRemaining > 0 || resending) return
    setError("")
    setNotice("")
    setResending(true)
    try {
      const result = await authApi.resendVerification(email)
      const sentAt = Date.now()
      sessionStorage.setItem("angket_otp_sent_at", String(sentAt))
      setResendAt(sentAt + RESEND_DELAY_MS)
      setNow(sentAt)
      setNotice(result.message)
    } catch (resendError) {
      setError(resendError.data?.error || resendError.message)
    } finally {
      setResending(false)
    }
  }

  return (
    <AuthLayout>
      <>
        <h1 className="auth-split__heading">
          {t({ en: "Verify your email", km: "ផ្ទៀងផ្ទាត់អ៊ីមែលរបស់អ្នក" })}
        </h1>
        <p className="auth-split__sub">
          {email
            ? t({
              en: `Enter the 6-digit verification code sent to ${email}.`,
              km: `បញ្ចូលលេខកូដផ្ទៀងផ្ទាត់ ៦ ខ្ទង់ដែលបានផ្ញើទៅ ${email}។`,
            })
            : t({
              en: "Enter your email verification code to continue.",
              km: "បញ្ចូលលេខកូដផ្ទៀងផ្ទាត់អ៊ីមែល ដើម្បីបន្ត។",
            })}
        </p>
        <form className="auth-form" onSubmit={submit} noValidate>
          <div className="auth-field">
            <label className="auth-field__label" htmlFor="signup-otp">
              {t({ en: "Verification code", km: "លេខកូដផ្ទៀងផ្ទាត់" })}
            </label>
            <input
              id="signup-otp"
              className={`control ${error ? "control--error" : ""}`}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]{6}"
              maxLength={6}
              required
              value={code}
              onChange={(event) => {
                setCode(event.target.value.replace(/\D/g, "").slice(0, 6))
                setError("")
              }}
              aria-describedby={error ? "signup-otp-error" : undefined}
              aria-invalid={error ? "true" : undefined}
            />
            {error && <p className="auth-field__error" id="signup-otp-error" role="alert">{error}</p>}
            {notice && <p className="auth-notice" role="status">{notice}</p>}
          </div>
          <button className="btn btn-primary btn-lg auth-submit" type="submit" disabled={submitting || !email}>
            {submitting
              ? t({ en: "Verifying…", km: "កំពុងផ្ទៀងផ្ទាត់…" })
              : t({ en: "Verify email", km: "ផ្ទៀងផ្ទាត់អ៊ីមែល" })}
          </button>
        </form>
        <p className="auth-alt">
          {resending
            ? t({ en: "Sending code…", km: "កំពុងផ្ញើលេខកូដ…" })
            : secondsRemaining > 0
              ? t({
                en: `Resend code in ${secondsRemaining}s`,
                km: `ផ្ញើលេខកូដម្តងទៀតក្នុងរយៈពេល ${secondsRemaining} វិនាទី`,
              })
              : (
                <button type="button" className="auth-inline-link" onClick={resendCode} disabled={!email}>
                  {t({ en: "Resend verification code", km: "ផ្ញើលេខកូដផ្ទៀងផ្ទាត់ម្តងទៀត" })}
                </button>
              )}
        </p>
        <p className="auth-alt">
          <Link to="/signup">{t({ en: "Back to sign up", km: "ត្រឡប់ទៅបង្កើតគណនី" })}</Link>
          {" · "}
          <Link to="/login">{t({ en: "Sign in", km: "ចូលគណនី" })}</Link>
        </p>
      </>
    </AuthLayout>
  )
}
