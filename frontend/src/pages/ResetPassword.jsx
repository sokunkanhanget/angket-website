import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthLayout } from "@/components/auth/AuthLayout"
import { PasswordInput } from "@/components/auth/PasswordInput"
import { useAuth } from "@/lib/auth"
import { useLang } from "@/lib/i18n"
import { authApi } from "@/lib/services"

export function ResetPassword() {
  const { t } = useLang()
  const { admin, logout } = useAuth()
  const navigate = useNavigate()
  const [resetGrant] = useState(() => sessionStorage.getItem("angket_reset_grant"))
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    setError("")
    if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password)
      || !/[0-9]/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
      setError(t({
        en: "Use at least 8 characters with uppercase, lowercase, a number, and a special character.",
        km: "ប្រើយ៉ាងតិច ៨ តួអក្សរ រួមមានអក្សរធំ អក្សរតូច លេខ និងតួអក្សរពិសេស។",
      }))
      return
    }
    if (password !== confirm) {
      setError(t({ en: "Passwords do not match.", km: "ពាក្យសម្ងាត់មិនត្រូវគ្នាទេ។" }))
      return
    }

    setSubmitting(true)
    try {
      await authApi.resetPassword(password, resetGrant)
      sessionStorage.removeItem("angket_reset_grant")
      logout()
      navigate("/login", { replace: true, state: { passwordReset: true } })
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
          {t({ en: "Choose a new password", km: "ជ្រើសរើសពាក្យសម្ងាត់ថ្មី" })}
        </h1>
        {admin && resetGrant ? (
          <form className="auth-form" onSubmit={submit} noValidate>
            <div className="auth-field">
              <label className="auth-field__label" htmlFor="reset-password">
                {t({ en: "New password", km: "ពាក្យសម្ងាត់ថ្មី" })}
              </label>
              <PasswordInput
                id="reset-password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="new-password"
                required
                minLength={8}
              />
            </div>
            <div className="auth-field">
              <label className="auth-field__label" htmlFor="reset-confirm">
                {t({ en: "Confirm new password", km: "បញ្ជាក់ពាក្យសម្ងាត់ថ្មី" })}
              </label>
              <PasswordInput
                id="reset-confirm"
                name="confirm"
                value={confirm}
                onChange={(event) => setConfirm(event.target.value)}
                autoComplete="new-password"
                required
                minLength={8}
              />
            </div>
            {error && <p className="auth-field__error" role="alert">{error}</p>}
            <button className="btn btn-primary btn-lg auth-submit" type="submit" disabled={submitting}>
              {submitting
                ? t({ en: "Updating…", km: "កំពុងធ្វើបច្ចុប្បន្នភាព…" })
                : t({ en: "Update password", km: "ធ្វើបច្ចុប្បន្នភាពពាក្យសម្ងាត់" })}
            </button>
          </form>
        ) : (
          <div className="auth-success">
            <p className="auth-notice" role="alert">
              {t({
                en: "This password reset link is missing or has expired. Request a new one to continue.",
                km: "តំណកំណត់ពាក្យសម្ងាត់នេះមិនត្រឹមត្រូវ ឬផុតកំណត់ហើយ។ សូមស្នើសុំតំណថ្មី។",
              })}
            </p>
            <Link className="btn btn-primary btn-lg auth-submit" to="/forgot-password">
              {t({ en: "Request a new reset link", km: "ស្នើសុំតំណកំណត់ថ្មី" })}
            </Link>
          </div>
        )}
        <p className="auth-alt">
          <Link to="/login">{t({ en: "Return to sign in", km: "ត្រឡប់ទៅចូលគណនី" })}</Link>
        </p>
      </>
    </AuthLayout>
  )
}
