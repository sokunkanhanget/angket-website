import { useLang } from "@/lib/i18n"
import { IconUser, IconUsers, IconCheck, IconStar } from "./icons"

// Presentational only: prices are demo values.
const PREMIUM_MONTHLY = 4.99
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

export function Subscription() {
  const { t } = useLang()

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
              <strong>${PREMIUM_MONTHLY.toFixed(2)}</strong>
              <span className="sub-per">{t({ en: "/ month", km: "/ ខែ" })}</span>
            </div>
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

          <article className="sub-card" aria-labelledby="sub-family-name">
            <div className="sub-card-top">
              <span className="sub-card-ic sub-card-ic--green" aria-hidden="true">
                <IconUsers />
              </span>
              <div>
                <h2 className="sub-card-name" id="sub-family-name">
                  {t({ en: "Premium Family", km: "Premium គ្រួសារ" })}
                </h2>
                <p className="sub-card-sub">
                  {t({ en: "Protect your whole family with one plan.", km: "ការពារគ្រួសារទាំងមូលរបស់អ្នកជាមួយគម្រោងតែមួយ។" })}
                </p>
              </div>
            </div>
            <div className="sub-price">
              <strong>${FAMILY_MONTHLY.toFixed(2)}</strong>
              <span className="sub-per">{t({ en: "/ month", km: "/ ខែ" })}</span>
            </div>
            <hr className="sub-divider" />
            <ul className="sub-features">
              <FeatureCheck>{t({ en: "Everything in Premium", km: "អ្វីគ្រប់យ៉ាងក្នុងកញ្ចប់ Premium" })}</FeatureCheck>
              <FeatureCheck>{t({ en: "Family protection features", km: "មុខងារការពារគ្រួសារ" })}</FeatureCheck>
              <FeatureCheck>{t({ en: "Manage family accounts", km: "គ្រប់គ្រងគណនីគ្រួសារ" })}</FeatureCheck>
              <FeatureCheck>{t({ en: "Safer online habits together", km: "ទម្លាប់តាមអ៊ីនធឺណិតប្រកបដោយសុវត្ថិភាពរួមគ្នា" })}</FeatureCheck>
            </ul>
            <button type="button" className="btn btn-primary sub-btn">
              {t({ en: "Get Premium Family", km: "ទទួលកញ្ចប់ Premium គ្រួសារ" })}
            </button>
          </article>
        </div>
      </div>
    </section>
  )
}