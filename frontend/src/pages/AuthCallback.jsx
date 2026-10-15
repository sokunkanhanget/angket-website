import { useEffect, useRef, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AuthLayout } from "@/components/auth/AuthLayout"
import { useAuth } from "@/lib/auth"
import { useLang } from "@/lib/i18n"
import { authApi } from "@/lib/services"

export function AuthCallback() {
  const { t } = useLang()
  const { completeSession } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const started = useRef(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (started.current) return
    started.current = true

    const query = new URLSearchParams(location.search)
    const fragment = new URLSearchParams(location.hash.slice(1))
    const next = query.get("next") === "/reset-password" ? "/reset-password" : "/"
    const errorDescription = query.get("error_description") || fragment.get("error_description")
    const tokenHash = query.get("token_hash")
    const type = query.get("type")

    window.history.replaceState({}, document.title, location.pathname)
    sessionStorage.removeItem("angket_reset_grant")

    async function finish() {
      try {
        if (errorDescription) throw new Error(errorDescription.replace(/\+/g, " "))

        let session
        if (tokenHash && (type === "email" || type === "recovery")) {
          session = await authApi.verifyEmailLink({ token_hash: tokenHash, type })
          if (type === "recovery") {
            if (!session.resetGrant) throw new Error("This reset link is invalid or has expired. Request a new one.")
            sessionStorage.setItem("angket_reset_grant", session.resetGrant)
            await completeSession(session)
            navigate("/reset-password", { replace: true })
            return
          }
        } else {
          const accessToken = fragment.get("access_token")
          const refreshToken = fragment.get("refresh_token")
          if (!accessToken || !refreshToken) {
            throw new Error("This link is invalid or has expired. Request a new link and try again.")
          }
          session = { token: accessToken, refreshToken }
          if (fragment.get("type") === "recovery" || next === "/reset-password") {
            if (fragment.get("type") === "recovery") {
              throw new Error("This reset link is invalid or has expired. Request a new one.")
            }
            await completeSession(session)
            navigate("/reset-password", { replace: true })
            return
          }
        }

        await completeSession(session)
        navigate(next, { replace: true })
      } catch (callbackError) {
        setError(callbackError.data?.error || callbackError.message)
      }
    }

    finish()
  }, [completeSession, location.hash, location.pathname, location.search, navigate])

  return (
    <AuthLayout>
      <div className="auth-success">
        {error ? (
          <>
            <h1>{t({ en: "Link could not be verified", km: "មិនអាចផ្ទៀងផ្ទាត់តំណបានទេ" })}</h1>
            <p className="auth-notice" role="alert">{error}</p>
            <p>
              <Link to="/forgot-password">{t({ en: "Request a password reset link", km: "ស្នើសុំតំណកំណត់ពាក្យសម្ងាត់" })}</Link>
              {" · "}
              <Link to="/login">{t({ en: "Sign in", km: "ចូលគណនី" })}</Link>
            </p>
          </>
        ) : (
          <p role="status">{t({ en: "Verifying your email…", km: "កំពុងផ្ទៀងផ្ទាត់អ៊ីមែលរបស់អ្នក…" })}</p>
        )}
      </div>
    </AuthLayout>
  )
}
