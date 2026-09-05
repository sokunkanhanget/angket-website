import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useLang } from "@/lib/i18n"
import { IconCheck } from "@/components/icons"
import { goAuthBack } from "@/lib/authBack"
import { AuthLayout } from "@/components/auth/AuthLayout"
import { PasswordInput } from "@/components/auth/PasswordInput"
import { Checkbox } from "@/components/auth/Checkbox"
import { authApi } from "@/lib/services"

export function SignUp() {
  const { t } = useLang()
  const navigate = useNavigate()
  const successRef = useRef(null)
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" })
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [errors, setErrors] = useState({})
  const [registered, setRegistered] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const goBack = () => goAuthBack(navigate)

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) {
      errs.name = t({ en: "Full name is required.", km: "ត្រូវការឈ្មោះពេញ។" })
    }
    if (!form.email.trim()) {
      errs.email = t({ en: "Email is required.", km: "ត្រូវការអ៊ីមែល។" })
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      errs.email = t({ en: "Please enter a valid email.", km: "សូមបញ្ចូលអ៊ីមែលត្រឹមត្រូវ។" })
    }
    if (!form.phone.trim()) {
      errs.phone = t({ en: "Phone number is required.", km: "ត្រូវការលេខទូរស័ព្ទ។" })
    }
    if (!form.password) {
      errs.password = t({ en: "Password is required.", km: "ត្រូវការពាក្យសម្ងាត់។" })
    } else if (form.password.length < 8) {
      errs.password = t({ en: "Password must be at least 8 characters.", km: "ពាក្យសម្ងាត់ត្រូវមានយ៉ាងតិច ៨ តួអក្សរ។" })
    }
    if (!form.confirm) {
      errs.confirm = t({ en: "Please confirm your password.", km: "សូមបញ្ជាក់ពាក្យសម្ងាត់។" })
    } else if (form.password !== form.confirm) {
      errs.confirm = t({ en: "Passwords do not match.", km: "ពាក្យសម្ងាត់មិនត្រូវគ្នាទេ។" })
    }
    if (!agreeTerms) {
      errs.terms = t({ en: "You must agree to the terms.", km: "អ្នកត្រូវឯកភាពនឹងលក្ខខណ្ឌ។" })
    }
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setSubmitting(true)
    try {
      await authApi.signup({
        full_name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
      })
      setRegistered(true)
      requestAnimationFrame(() => successRef.current?.focus())
    } catch (err) {
      setErrors({ email: err.message })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout>
      <>
        <button type="button" className="auth-back" onClick={goBack}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m15 18-6-6 6-6" />
          </svg>
          {t({ en: "Back", km: "ត្រឡប់ក្រោយ" })}
        </button>
        {registered ? (
        <div className="auth-success">
          <span className="auth-success__icon" aria-hidden="true">
            <IconCheck style={{ width: 32, height: 32 }} />
          </span>
          <h2 ref={successRef} tabIndex={-1}>
            {t({ en: "Account created!", km: "គណនីត្រូវបានបង្កើត!" })}
          </h2>
          <p>
            {t({
              en: "Welcome to Angket. You can now sign in with your new account.",
              km: "សូមស្វាគមន៍មកកាន់ Angket។ អ្នកអាចចូលដោយប្រើគណនីថ្មីរបស់អ្នកបានហើយ។",
            })}
          </p>
          <Link className="btn btn-outline" to="/login">
            {t({ en: "Go to sign in", km: "ទៅទំព័រចូលគណនី" })}
          </Link>
        </div>
      ) : (
        <>
          <h1 className="auth-split__heading">
            {t({ en: "Create your Angket account", km: "បង្កើតគណនី Angket របស់អ្នក" })}
          </h1>
          <p className="auth-split__sub">
            {t({
              en: "A community-powered platform to report scams and protect others.",
              km: "វេទិកាដែលជួយរាយការណ៍ការបោកប្រាស់ និងការពារអ្នកដទៃ។",
            })}
          </p>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="auth-field">
              <label className="auth-field__label" htmlFor="signup-name">
                {t({ en: "Full name", km: "ឈ្មោះពេញ" })}
              </label>
              <input
                id="signup-name"
                name="name"
                className={`control ${errors.name ? "control--error" : ""}`}
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={update("name")}
                placeholder={t({ en: "e.g. Sok Dara", km: "ឧ. សុខ ដារា" })}
                aria-describedby={errors.name ? "signup-name-err" : undefined}
                aria-invalid={errors.name ? "true" : undefined}
              />
              {errors.name && (
                <p className="auth-field__error" id="signup-name-err" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="auth-field">
              <label className="auth-field__label" htmlFor="signup-email">
                {t({ en: "Email address", km: "អាសយដ្ឋានអ៊ីមែល" })}
              </label>
              <input
                id="signup-email"
                name="email"
                className={`control ${errors.email ? "control--error" : ""}`}
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={update("email")}
                placeholder="abc@angket.kh"
                aria-describedby={errors.email ? "signup-email-err" : undefined}
                aria-invalid={errors.email ? "true" : undefined}
              />
              {errors.email && (
                <p className="auth-field__error" id="signup-email-err" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="auth-field">
              <label className="auth-field__label" htmlFor="signup-phone">
                {t({ en: "Phone number", km: "លេខទូរស័ព្ទ" })}
              </label>
              <div className="auth-phone">
                <select className="control auth-phone__code" aria-label="Country code">
                  <option>+855</option>
                  <option>+1</option>
                  <option>+44</option>
                </select>
                <input
                  id="signup-phone"
                  name="phone"
                  className={`control ${errors.phone ? "control--error" : ""}`}
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={update("phone")}
                  placeholder="012 345 678"
                  aria-describedby={errors.phone ? "signup-phone-err" : undefined}
                  aria-invalid={errors.phone ? "true" : undefined}
                />
              </div>
              {errors.phone && (
                <p className="auth-field__error" id="signup-phone-err" role="alert">
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="auth-field">
              <label className="auth-field__label" htmlFor="signup-password">
                {t({ en: "Password", km: "ពាក្យសម្ងាត់" })}
              </label>
              <PasswordInput
                id="signup-password"
                name="password"
                value={form.password}
                onChange={update("password")}
                placeholder={t({ en: "At least 8 characters", km: "យ៉ាងតិច ៨ តួអក្សរ" })}
                autoComplete="new-password"
                required
                minLength={8}
                errorId={errors.password ? "signup-password-err" : undefined}
              />
              {errors.password && (
                <p className="auth-field__error" id="signup-password-err" role="alert">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="auth-field">
              <label className="auth-field__label" htmlFor="signup-confirm">
                {t({ en: "Confirm password", km: "បញ្ជាក់ពាក្យសម្ងាត់" })}
              </label>
              <PasswordInput
                id="signup-confirm"
                name="confirm"
                value={form.confirm}
                onChange={update("confirm")}
                placeholder={t({ en: "Re-enter your password", km: "បញ្ចូលពាក្យសម្ងាត់ម្តងទៀត" })}
                autoComplete="new-password"
                required
                minLength={8}
                errorId={errors.confirm ? "signup-confirm-err" : undefined}
              />
              {errors.confirm && (
                <p className="auth-field__error" id="signup-confirm-err" role="alert">
                  {errors.confirm}
                </p>
              )}
            </div>

            <div className="auth-field">
              <Checkbox
                id="signup-terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              >
                {t({
                  en: "I agree to the Terms of Service and Privacy Policy",
                  km: "ខ្ញុំឯកភាពនឹងលក្ខខណ្ឌសេវាកម្ម និងគោលនយោបាយឯកជនភាព",
                })}
              </Checkbox>
              {errors.terms && (
                <p className="auth-field__error" id="signup-terms-err" role="alert">
                  {errors.terms}
                </p>
              )}
            </div>

            <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={submitting}>
              {t({ en: "Create account", km: "បង្កើតគណនី" })}
            </button>
          </form>

          <p className="auth-alt">
            {t({ en: "Already have an account?", km: "មានគណនីរួចហើយ?" })}{" "}
            <Link to="/login">{t({ en: "Sign in", km: "ចូលគណនី" })}</Link>
          </p>
        </>
        )}
      </>
    </AuthLayout>
  )
}

export default SignUp
