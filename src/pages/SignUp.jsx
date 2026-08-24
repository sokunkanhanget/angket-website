import { useRef, useState } from "react"
import { useLang } from "@/lib/i18n"
import { IconCheck, IconLock, IconShield } from "@/components/icons"

export function SignUp() {
  const { t } = useLang()
  const successRef = useRef(null)
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [registered, setRegistered] = useState(false)

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError(t({ en: "Please fill in all fields.", km: "សូមបំពេញវាលទាំងអស់។" }))
      return
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError(t({ en: "Please enter a valid email address.", km: "សូមបញ្ចូលអ៊ីមែលត្រឹមត្រូវ។" }))
      return
    }
    if (form.password.length < 8) {
      setError(
        t({
          en: "Password must be at least 8 characters.",
          km: "ពាក្យសម្ងាត់ត្រូវមានយ៉ាងតិច ៨ តួអក្សរ។",
        }),
      )
      return
    }
    if (form.password !== form.confirm) {
      setError(t({ en: "Passwords do not match.", km: "ពាក្យសម្ងាត់មិនត្រូវគ្នាទេ។" }))
      return
    }
    setError("")
    setRegistered(true)
    requestAnimationFrame(() => successRef.current?.focus())
  }

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-card form-card">
          <span className="brand-mark auth-mark" aria-hidden="true">
            <IconShield check />
          </span>
          <span className="eyebrow">{t({ en: "Join Angket", km: "ចូលរួមជាមួយ Angket" })}</span>
          <h1>{t({ en: "Create your account", km: "បង្កើតគណនីរបស់អ្នក" })}</h1>
          <p className="auth-sub">
            {t({
              en: "Sign up to report scams, save reports, and help keep Cambodia safe online.",
              km: "ចុះឈ្មោះដើម្បីរាយការណ៍ការបោកប្រាស់ រក្សាទុករបាយការណ៍ និងជួយការពារកម្ពុជាឲ្យមានសុវត្ថិភាពលើអ៊ីនធឺណិត។",
            })}
          </p>

          {registered ? (
            <div className="success">
              <span className="s-ic" aria-hidden="true">
                <IconCheck style={{ width: 30, height: 30 }} />
              </span>
              <h3 ref={successRef} tabIndex={-1}>
                {t({ en: "Account created!", km: "គណនីត្រូវបានបង្កើត!" })}
              </h3>
              <p>
                {t({
                  en: "Welcome to Angket. You can now log in with your new account.",
                  km: "សូមស្វាគមន៍មកកាន់ Angket។ អ្នកអាចចូលដោយប្រើគណនីថ្មីរបស់អ្នកបានហើយ។",
                })}
              </p>
              <a className="btn btn-outline" href="#/login">
                {t({ en: "Go to log in", km: "ទៅទំព័រចូលគណនី" })}
              </a>
            </div>
          ) : (
            <form className="f-grid" onSubmit={handleSubmit} noValidate>
              <div>
                <label className="f-label" htmlFor="signup-name">
                  {t({ en: "Full name", km: "ឈ្មោះពេញ" })}{" "}
                  <span className="req" aria-hidden="true">*</span>
                </label>
                <input
                  id="signup-name"
                  name="name"
                  className="control"
                  type="text"
                  autoComplete="name"
                  required
                  value={form.name}
                  onChange={update("name")}
                  placeholder={t({ en: "e.g. Sok Dara", km: "ឧ. សុខ ឌារា" })}
                />
              </div>

              <div>
                <label className="f-label" htmlFor="signup-email">
                  {t({ en: "Email", km: "អ៊ីមែល" })}{" "}
                  <span className="req" aria-hidden="true">*</span>
                </label>
                <input
                  id="signup-email"
                  name="email"
                  className="control"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={update("email")}
                  placeholder={t({ en: "you@example.com", km: "អ្នក@ឧទាហរណ៍.com" })}
                />
              </div>

              <div className="f-row">
                <div>
                  <label className="f-label" htmlFor="signup-password">
                    {t({ en: "Password", km: "ពាក្យសម្ងាត់" })}{" "}
                    <span className="req" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="signup-password"
                    name="password"
                    className="control"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    minLength={8}
                    value={form.password}
                    onChange={update("password")}
                    placeholder={t({ en: "At least 8 characters", km: "យ៉ាងតិច ៨ តួអក្សរ" })}
                  />
                </div>
                <div>
                  <label className="f-label" htmlFor="signup-confirm">
                    {t({ en: "Confirm password", km: "បញ្ជាក់ពាក្យសម្ងាត់" })}{" "}
                    <span className="req" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="signup-confirm"
                    name="confirm"
                    className="control"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    minLength={8}
                    value={form.confirm}
                    onChange={update("confirm")}
                    placeholder={t({ en: "Re-enter your password", km: "បញ្ចូលពាក្យសម្ងាត់ម្តងទៀត" })}
                  />
                </div>
              </div>

              <label className="check-row">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                />
                <span>{t({ en: "Show passwords", km: "បង្ហាញពាក្យសម្ងាត់" })}</span>
              </label>

              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}

              <p className="privacy-note">
                <IconLock />
                <span>
                  {t({
                    en: "We never share your email. Your password is stored securely.",
                    km: "យើងមិនចែករំលែកអ៊ីមែលរបស់អ្នកទេ។ ពាក្យសម្ងាត់របស់អ្នកត្រូវបានរក្សាទុកយ៉ាងសុវត្ថិភាព។",
                  })}
                </span>
              </p>

              <button type="submit" className="btn btn-primary btn-lg">
                <IconShield check />
                <span>{t({ en: "Create Account", km: "បង្កើតគណនី" })}</span>
              </button>

              <p className="auth-alt">
                {t({ en: "Already have an account?", km: "មានគណនីរួចហើយ?" })}{" "}
                <a href="#/login">{t({ en: "Log in", km: "ចូលគណនី" })}</a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default SignUp
