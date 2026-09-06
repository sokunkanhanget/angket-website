import { useLang } from "@/lib/i18n"
import onlineScamsImg from "@/assets/online-scams.png"
import logoImg from "@/assets/logo.png"

export function AuthLayout({ children }) {
  const { t } = useLang()
  return (
    <div className="auth-split">
      <div className="auth-split__left">
        <div className="auth-split__glow" aria-hidden="true" />

        <div className="auth-split__logo" aria-hidden="true">
          <span className="auth-split__logo-mark">
            <img src={logoImg} alt="" />
          </span>
          <span className="auth-split__wordmark">ANGKET</span>
        </div>

        <div className="auth-split__main">
          <div className="auth-split__copy">
            <h2 className="auth-split__copy-title">
              {t({
                en: "Scams are everywhere. We help you see them coming.",
                km: "ការបោកប្រាស់មាននៅគ្រប់ទីកន្លែង។ យើងជួយអ្នកឱ្យឃើញវាមុន។",
              })}
            </h2>
            <p className="auth-split__copy-sub">
              {t({
                en: "Angket scans messages, links, and files — powered by Bot detection and real reports from the community.",
                km: "Angket ពិនិត្យសារ តំណ និងឯកសារ — ដោយប្រើបច្ចេកវិទ្យារកឃើញ Bot និងរបាយការណ៍ពិតពីសហគមន៍។",
              })}
            </p>
          </div>

          <figure className="auth-split__art">
            <img
              src={onlineScamsImg}
              alt="Illustration about how to avoid online scams"
              loading="lazy"
            />
          </figure>
        </div>
      </div>

      <div className="auth-split__right">
        <div className="auth-split__form-wrap">
          {children}
        </div>
      </div>
    </div>
  )
}