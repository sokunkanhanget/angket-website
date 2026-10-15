import { useState } from "react"
import { Link } from "react-router-dom"
import { AuthLayout } from "@/components/auth/AuthLayout"
import { useLang } from "@/lib/i18n"
import { authApi } from "@/lib/services"

export function ForgotPassword() {
  const { t } = useLang()
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    setError("")
    setMessage("")
    setSubmitting(true)
    try {
      const result = await authApi.forgotPassword(email.trim())
      setMessage(result.message)
    } catch (err) {
      setError(err.data?.error || err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout>
      <>
        <h1 className="auth-split__heading">
          {t({ en: "Reset your password", km: "កំណត់ពាក្យសម្ងាត់របស់អ្នកឡើងវិញ" })}
        </h1>
        <p className="auth-split__sub">
          {t({ en: "Enter your email and we’ll send a password reset link.", km: "បញ្ចូលអ៊ីមែល ដើម្បីទទួលតំណកំណត់ពាក្យសម្ងាត់ឡើងវិញ។" })}
        </p>
        {message ? (
          <p className="auth-notice" role="status">{message}</p>
        ) : (
          <form className="auth-form" onSubmit={submit} noValidate>
            <div className="auth-field">
              <label className="auth-field__label" htmlFor="forgot-email">
                {t({ en: "Email address", km: "អាសយដ្ឋានអ៊ីមែល" })}
              </label>
              <input
                id="forgot-email"
                className={`control ${error ? "control--error" : ""}`}
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-invalid={error ? "true" : undefined}
              />
              {error && <p className="auth-field__error" role="alert">{error}</p>}
            </div>
            <button className="btn btn-primary btn-lg auth-submit" type="submit" disabled={submitting}>
              {submitting
                ? t({ en: "Sending…", km: "កំពុងផ្ញើ…" })
                : t({ en: "Send reset link", km: "ផ្ញើតំណកំណត់ឡើងវិញ" })}
            </button>
          </form>
        )}
        <p className="auth-alt">
          <Link to="/login">{t({ en: "Return to sign in", km: "ត្រឡប់ទៅចូលគណនី" })}</Link>
        </p>
      </>
    </AuthLayout>
  )
}
