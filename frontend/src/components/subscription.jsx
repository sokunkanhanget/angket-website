import { useState } from "react"
import { useLang } from "@/lib/i18n"
import { IconUser, IconUsers, IconCheck, IconStar } from "./icons"

// Presentational only: prices are demo values, toggles just swap displayed strings via state.
const ANNUAL_DISCOUNT = 0.2
const PREMIUM_MONTHLY = 4.99
const PREMIUM_ANNUAL_TOTAL = Number((PREMIUM_MONTHLY * 12 * (1 - ANNUAL_DISCOUNT)).toFixed(2))
const PREMIUM_ANNUAL_EQ = (PREMIUM_ANNUAL_TOTAL / 12).toFixed(2)
const FAMILY_MONTHLY = 9.99

function FeatureCheck({ children }) {
  return (
    <li className="sub-feature">
      <span className="sub-check" aria-hidden="true">
        <IconCheck />
      </span>
      <span>{children}</span>
    </li>
  )
}

function FamilyArt() {
  return (
    <div className="sub-art" aria-hidden="true">
      <svg viewBox="0 0 340 240" role="presentation">
        <ellipse cx="74" cy="58" rx="64" ry="44" fill="#dbeafe" opacity="0.8" />
        <circle cx="276" cy="52" r="46" fill="#dbeafe" opacity="0.6" />
        <circle cx="150" cy="26" r="10" fill="#bfdbfe" opacity="0.7" />
        <path d="M38 152c15-5 23-21 25-37 17 3 29 17 31 33-13 6-40 12-56 4z" fill="#bfdbfe" opacity="0.9" />
        <path d="M298 158c-13-8-19-24-19-38 16 0 31 10 35 26-9 8-11 12-16 12z" fill="#93c5fd" opacity="0.7" />
        <ellipse cx="170" cy="214" rx="132" ry="16" fill="#dbeafe" opacity="0.5" />
        <circle cx="92" cy="96" r="20" fill="#f5c6a0" />
        <circle cx="92" cy="84" r="8" fill="#7c5a46" />
        <rect x="72" y="118" width="40" height="58" rx="16" fill="#60a5fa" />
        <circle cx="248" cy="92" r="19" fill="#eab08b" />
        <circle cx="248" cy="80" r="8" fill="#4a3728" />
        <rect x="230" y="113" width="36" height="56" rx="15" fill="#34d399" />
        <g>
          <path d="M168 88c14 0 24 6 24 17 0 26-12 44-24 54-12-10-24-28-24-54 0-11 10-17 24-17z" fill="#2563eb" />
          <path d="M158 121l7 7 12-14" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <circle cx="140" cy="140" r="14" fill="#f9cfa5" />
        <circle cx="140" cy="130" r="6" fill="#6b4a32" />
        <rect x="128" y="156" width="24" height="36" rx="11" fill="#fbbf24" />
        <circle cx="196" cy="146" r="12" fill="#fcd0ae" />
        <circle cx="196" cy="137" r="5" fill="#7a5440" />
        <rect x="186" y="160" width="20" height="32" rx="10" fill="#f472b6" />
      </svg>
    </div>
  )
}

export function Subscription() {
  const { t } = useLang()
  const [audience, setAudience] = useState("individual")
  const [annual, setAnnual] = useState(false)
  const individual = audience === "individual"
  const premiumPrice = annual ? PREMIUM_ANNUAL_EQ : PREMIUM_MONTHLY.toFixed(2)

  return (
    <section className="sub" id="subscription" aria-labelledby="sub-title">
      <div className="container">
        <header className="sub-head">
          <h1 id="sub-title">
            {t({ en: "Choose Your Protection Plan", km: "ជ្រើសរើសគម្រោងការពាររបស់អ្នក" })}
          </h1>
          <p>
            {t({
              en: "Stay protected online with a plan that fits your needs or your family's.",
              km: "ស្នាក់នៅប្រកបដោយសុវត្ថិភាពតាមអ៊ីនធឺណិត ជាមួយគម្រោងដែលសមនឹងតម្រូវការរបស់អ្នក ឬគ្រួសាររបស់អ្នក។",
            })}
          </p>
        </header>

        <div className="sub-audience" role="tablist" aria-label={t({ en: "Select plan audience", km: "ជ្រើសរើសក្រុមគម្រោង" })}>
          <button
            type="button"
            role="tab"
            aria-selected={individual}
            aria-pressed={individual}
            className={`sub-seg${individual ? " active" : ""}`}
            onClick={() => setAudience("individual")}
          >
            <IconUser />
            <span>{t({ en: "Individual", km: "បុគ្គល" })}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={!individual}
            aria-pressed={!individual}
            className={`sub-seg${!individual ? " active" : ""}`}
            onClick={() => setAudience("family")}
          >
            <IconUsers />
            <span>{t({ en: "Family", km: "គ្រួសារ" })}</span>
          </button>
        </div>

        {individual && (
          <>
            <div className="sub-billing">
              <span className={`sub-bill-label${!annual ? " on" : ""}`}>
                {t({ en: "Monthly", km: "ប្រចាំខែ" })}
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={annual}
                aria-label={t({ en: "Toggle annual billing", km: "ប្ដូរការគិតប្រចាំឆ្នាំ" })}
                className="sub-switch"
                onClick={() => setAnnual((v) => !v)}
              >
                <span className="sub-knob" />
              </button>
              <span className={`sub-bill-label${annual ? " on" : ""}`}>
                {t({ en: "Annual", km: "ប្រចាំឆ្នាំ" })}
              </span>
              <span className="sub-save">
                {t({ en: "Save 20% with annual billing", km: "សន្សំ 20% ជាមួយការគិតប្រចាំឆ្នាំ" })}
              </span>
            </div>

            <div className="sub-grid">
              <article className="sub-card" aria-labelledby="sub-free-name">
                <div className="sub-card-top">
                  <span className="sub-card-ic sub-card-ic--gray" aria-hidden="true">
                    <IconUser />
                  </span>
                  <div>
                    <h2 className="sub-card-name" id="sub-free-name">
                      {t({ en: "Freemium", km: "Freemium" })}
                    </h2>
                    <p className="sub-card-sub">
                      {t({
                        en: "Basic protection for your online safety.",
                        km: "ការការពារជាមូលដ្ឋានសម្រាប់សុវត្ថិភាពតាមអ៊ីនធឺណិតរបស់អ្នក។",
                      })}
                    </p>
                  </div>
                </div>
                <div className="sub-price">
                  <strong>$0</strong>
                  <span className="sub-per">{t({ en: "/ month", km: "/ ខែ" })}</span>
                </div>
                <hr className="sub-divider" />
                <ul className="sub-features">
                  <FeatureCheck>{t({ en: "Basic scam detection", km: "ការរកឃើញការបោកប្រាស់ជាមូលដ្ឋាន" })}</FeatureCheck>
                  <FeatureCheck>{t({ en: "Check suspicious links and messages", km: "ពិនិត្យតំណ និងសារគួរឱ្យសង្ស័យ" })}</FeatureCheck>
                  <FeatureCheck>{t({ en: "Limited usage and features", km: "ការប្រើប្រាស់ និងមុខងារមានកំណត់" })}</FeatureCheck>
                </ul>
                <button type="button" className="btn btn-outline sub-btn">
                  {t({ en: "Get Started", km: "ចាប់ផ្ដើម" })}
                </button>
              </article>

              <article className="sub-card sub-card--premium" aria-labelledby="sub-premium-name">
                <span className="sub-pop">
                  <IconStar />
                  <span>{t({ en: "Most Popular", km: "ពេញនិយមបំផុត" })}</span>
                </span>
                <div className="sub-card-top">
                  <span className="sub-card-ic sub-card-ic--blue" aria-hidden="true">
                    <IconStar />
                  </span>
                  <div>
                    <h2 className="sub-card-name" id="sub-premium-name">
                      {t({ en: "Premium", km: "ព្រីមីអ៊ឹម" })}
                    </h2>
                    <p className="sub-card-sub">
                      {t({
                        en: "Advanced protection for a safer online experience.",
                        km: "ការការពារកម្រិតខ្ពស់សម្រាប់បទពិសោធន៍តាមអ៊ីនធឺណិតប្រកបដោយសុវត្ថិភាពជាងមុន។",
                      })}
                    </p>
                  </div>
                </div>
                <div className="sub-price">
                  <strong>${premiumPrice}</strong>
                  <span className="sub-per">{t({ en: "/ month", km: "/ ខែ" })}</span>
                </div>
                {annual && (
                  <p className="sub-annual-note">
                    {t({
                      en: `$${PREMIUM_ANNUAL_TOTAL.toFixed(2)} / year (Save 20%) → $${PREMIUM_ANNUAL_EQ} / month equivalent`,
                      km: `$${PREMIUM_ANNUAL_TOTAL.toFixed(2)} / ឆ្នាំ (សន្សំ 20%) → $${PREMIUM_ANNUAL_EQ} / ខែ ប្រហាក់ប្រហែល`,
                    })}
                  </p>
                )}
                <hr className="sub-divider" />
                <ul className="sub-features">
                  <FeatureCheck>{t({ en: "Everything in Freemium", km: "អ្វីគ្រប់យ៉ាងក្នុងកញ្ចប់ Freemium" })}</FeatureCheck>
                  <FeatureCheck>
                    {t({
                      en: "Advanced scam detection (messages, links, files)",
                      km: "ការរកឃើញការបោកប្រាស់កម្រិតខ្ពស់ (សារ តំណ ឯកសារ)",
                    })}
                  </FeatureCheck>
                  <FeatureCheck>{t({ en: "More scans and higher limits", km: "ការពិនិត្យច្រើនជាង និងដែនកំណត់ខ្ពស់ជាង" })}</FeatureCheck>
                  <FeatureCheck>{t({ en: "Enhanced protection features", km: "មុខងារការពារកម្រិតខ្ពស់" })}</FeatureCheck>
                </ul>
                <button type="button" className="btn btn-primary sub-btn">
                  {t({ en: "Upgrade to Premium", km: "ដំឡើងកញ្ចប់ Premium" })}
                </button>
              </article>
            </div>
          </>
        )}

        {!individual && (
          <section className="sub-family" aria-labelledby="sub-family-title">
            <FamilyArt />
            <div className="sub-family-copy">
              <span className="sub-family-badge">
                <IconUsers />
                <span>{t({ en: "Family", km: "គ្រួសារ" })}</span>
              </span>
              <h2 id="sub-family-title">{t({ en: "Premium Family", km: "Premium គ្រួសារ" })}</h2>
              <p className="sub-family-sub">
                {t({ en: "Protect your whole family with one plan.", km: "ការពារគ្រួសារទាំងមូលរបស់អ្នកជាមួយគម្រោងតែមួយ។" })}
              </p>
              <p className="sub-family-desc">
                {t({
                  en: "Get everything in Premium, plus features designed for multiple family members and better family protection.",
                  km: "ទទួលបានអ្វីគ្រប់យ៉ាងក្នុងកញ្ចប់ Premium បូករួមទាំងមុខងារដែលបានរចនាឡើងសម្រាប់សមាជិកគ្រួសារជាច្រើន និងការការពារគ្រួសារកាន់តែប្រសើរ។",
                })}
              </p>
              <ul className="sub-family-features">
                <FeatureCheck>{t({ en: "Everything in Premium", km: "អ្វីគ្រប់យ៉ាងក្នុងកញ្ចប់ Premium" })}</FeatureCheck>
                <FeatureCheck>{t({ en: "Multiple family members", km: "សមាជិកគ្រួសារច្រើននាក់" })}</FeatureCheck>
                <FeatureCheck>{t({ en: "Family protection features", km: "មុខងារការពារគ្រួសារ" })}</FeatureCheck>
                <FeatureCheck>{t({ en: "Manage family accounts", km: "គ្រប់គ្រងគណនីគ្រួសារ" })}</FeatureCheck>
                <FeatureCheck>{t({ en: "Safer online habits together", km: "ទម្លាប់តាមអ៊ីនធឺណិតប្រកបដោយសុវត្ថិភាពរួមគ្នា" })}</FeatureCheck>
                <FeatureCheck>{t({ en: "Peace of mind for your loved ones", km: "ស្ងប់ក្នុងចិត្តសម្រាប់អ្នកជាទីស្រឡាញ់របស់អ្នក" })}</FeatureCheck>
              </ul>
              <div className="sub-family-foot">
                <span className="sub-family-price">
                  ${FAMILY_MONTHLY.toFixed(2)} <small>{t({ en: "/ month", km: "/ ខែ" })}</small>
                </span>
                <button type="button" className="btn btn-primary sub-family-btn">
                  {t({ en: "Get Premium Family", km: "ទទួលកញ្ចប់ Premium គ្រួសារ" })}
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </section>
  )
}