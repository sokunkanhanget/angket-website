import { useRef, useState } from "react"
import { useLang } from "@/lib/i18n"
import { IconCheck, IconLock, IconShield } from "@/components/icons"

export function Login() {
  const { t } = useLang()
  const successRef = useRef(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError(t({ en: "Please fill in both fields.", km: "សូមបំពេញវាលទាំងពីរ។" }))
      return
    }
    setError("")
    setLoggedIn(true)
    requestAnimationFrame(() => successRef.current?.focus())
  }

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-card form-card">
          <span className="brand-mark auth-mark" aria-hidden="true">
            <IconShield check />
          </span>
          <span className="eyebrow">{t({ en: "Welcome back", km: "សូមស្វាគមន៍ត្រឡប់មកវិញ" })}</span>
          <h1>{t({ en: "Log in to Angket", km: "ចូលគណនី Angket" })}</h1>
          <p className="auth-sub">
            {t({
              en: "Access your account to report scams and track your reports.",
              km: "ចូលប្រើគណនីរបស់អ្នកដើម្បីរាយការណ៍ការបោកប្រាស់ និងតាមដានរបាយការណ៍របស់អ្នក។",
            })}
          </p>

          {loggedIn ? (
            <div className="success">
              <span className="s-ic" aria-hidden="true">
                <IconCheck style={{ width: 30, height: 30 }} />
              </span>
              <h3 ref={successRef} tabIndex={-1}>
                {t({ en: "Logged in!", km: "បានចូលជោគជ័យ!" })}
              </h3>
              <p>
                {t({
                  en: "You are now signed in to your Angket account.",
                  km: "អ្នកបានចូលគណនី Angket របស់អ្នកហើយ។",
                })}
              </p>
            </div>
          ) : (
            <form className="f-grid" onSubmit={handleSubmit} noValidate>
              <div>
                <label className="f-label" htmlFor="login-email">
                  {t({ en: "Email", km: "អ៊ីមែល" })}{" "}
                  <span className="req" aria-hidden="true">*</span>
                </label>
                <input
                  id="login-email"
                  name="email"
                  className="control"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t({ en: "you@example.com", km: "អ្នក@ឧទាហរណ៍.com" })}
                />
              </div>

              <div>
                <label className="f-label" htmlFor="login-password">
                  {t({ en: "Password", km: "ពាក្យសម្ងាត់" })}{" "}
                  <span className="req" aria-hidden="true">*</span>
                </label>
                <div className="pass-wrap">
                  <input
                    id="login-password"
                    name="password"
                    className="control"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t({ en: "Enter your password", km: "បញ្ចូលពាក្យសម្ងាត់របស់អ្នក" })}
                  />
                  <button
                    type="button"
                    className="pass-toggle"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-pressed={showPassword}
                  >
                    {showPassword
                      ? t({ en: "Hide", km: "លាក់" })
                      : t({ en: "Show", km: "បង្ហាញ" })}
                  </button>
                </div>
              </div>

              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}

              <button type="submit" className="btn btn-primary btn-lg">
                <IconLock />
                <span>{t({ en: "Log In", km: "ចូលគណនី" })}</span>
              </button>

              <p className="auth-alt">
                {t({ en: "Don’t have an account?", km: "មិនមានគណនីទេ?" })}{" "}
                <a href="#/signup">{t({ en: "Sign up", km: "ចុះឈ្មោះ" })}</a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
