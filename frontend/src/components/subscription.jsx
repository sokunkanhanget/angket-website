import { useLang } from "@/lib/i18n"
import { IconUser, IconUsers, IconCheck, IconStar } from "./icons"

// Presentational only: prices are demo values.
const PREMIUM_MONTHLY = 1.99
const FAMILY_MONTHLY = 5.99

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
                  {t({ en: "Freemium", km: "កញ្ចប់ហ្វ្រី" })}
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
              <FeatureCheck>{t({ en: "Live scam detection (7-day trial)", km: "ការរកឃើញការបោកប្រាស់ផ្ទាល់ (សាកល្បង 7 ថ្ងៃ)" })}</FeatureCheck>
              <FeatureCheck>{t({ en: "Check up to 3 files a day", km: "ពិនិត្យរហូតដល់ 3 ឯកសារក្នុងមួយថ្ងៃ" })}</FeatureCheck>
              <FeatureCheck>{t({ en: "Check up to 10 messages or links a day", km: "ពិនិត្យរហូតដល់ 10 សារ ឬតំណភ្ជាប់ក្នុងមួយថ្ងៃ" })}</FeatureCheck>
              <FeatureCheck>{t({ en: "Group chat protection (7-day trial)", km: "ការការពារការជជែកជាក្រុម (សាកល្បង 7 ថ្ងៃ)" })}</FeatureCheck>
              <FeatureCheck>{t({ en: "Khmer and English support", km: "គាំទ្រទាំងភាសារខ្មែរ និងអង់គ្លេស" })}</FeatureCheck>
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
                  {t({ en: "Premium", km: "កញ្ចប់ព្រីមៀម" })}
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
              <FeatureCheck>{t({ en: "Everything in Freemium, always on", km: "អ្វីគ្រប់យ៉ាងក្នុងកញ្ចប់ Freemium ប្រើបានជាប់ជានិច្ច" })}</FeatureCheck>
              <FeatureCheck>{t({ en: "Check up to 5 files a day", km: "ពិនិត្យរហូតដល់ 5 ឯកសារក្នុងមួយថ្ងៃ" })}</FeatureCheck>
              <FeatureCheck>{t({ en: "Check up to 15 messages or links a day", km: "ពិនិត្យរហូតដល់ 15 សារ ឬតំណភ្ជាប់ក្នុងមួយថ្ងៃ" })}</FeatureCheck>
              <FeatureCheck>{t({ en: "Deeper scam pattern detection", km: "ការរកឃើញលំនាំការបោកប្រាស់កាន់តែស៊ីជម្រៅ" })}</FeatureCheck>
              <FeatureCheck>{t({ en: "Group chat protection included", km: "រួមបញ្ចូលការការពារការជជែកជាក្រុម" })}</FeatureCheck>
              <FeatureCheck>{t({ en: "Khmer and English support", km: "គាំទ្រទាំងភាសារខ្មែរ និងអង់គ្លេស" })}</FeatureCheck>
              <FeatureCheck>{t({ en: "Live Scan mode ", km: "ការផ្ទៀងផ្ទាត់និងជូនដំណឹងដោយស្វ័យប្រវត្តិ" })}</FeatureCheck>
            </ul>
            <button type="button" className="btn btn-primary sub-btn">
              {t({ en: "Upgrade to Premium", km: "ដំឡើងកញ្ចប់ ព្រីមៀម" })}
            </button>
          </article>

          <article className="sub-card" aria-labelledby="sub-family-name">
            <div className="sub-card-top">
              <span className="sub-card-ic sub-card-ic--green" aria-hidden="true">
                <IconUsers />
              </span>
              <div>
                <h2 className="sub-card-name" id="sub-family-name">
                  {t({ en: "Family", km: "កញ្ចប់គ្រួសារ" })}
                </h2>
                <p className="sub-card-sub">
                  {t({ en: "Protect your whole family with one plan.", km: "ការពារគ្រួសារទាំងមូលរបស់អ្នកជាមួយគម្រោងតែមួយ។" })}
                </p>
              </div>
            </div>
            <div className="sub-price">
              <strong>${FAMILY_MONTHLY.toFixed(2)}</strong>
              <span className="sub-per">
                {t({ en: "/ month · up to 5 members", km: "/ ខែ · រហូតដល់ 5 នាក់" })}
              </span>
            </div>
            <hr className="sub-divider" />
            <ul className="sub-features">
              <FeatureCheck>{t({ en: "Everything in Family Subscription, shared with the family", km: "អ្វីគ្រប់យ៉ាងក្នុងកញ្ចប់ គ្រួសារ ចែករំលែកជាមួយគ្រួសារ" })}</FeatureCheck>
              <FeatureCheck>{t({ en: "Up to 15 files a day (shared)", km: "រហូតដល់ 15 ឯកសារក្នុងមួយថ្ងៃ (ចែករំលែក)" })}</FeatureCheck>
              <FeatureCheck>{t({ en: "Up to 50 messages or links a day (shared)", km: "រហូតដល់ 50 សារ ឬតំណភ្ជាប់ក្នុងមួយថ្ងៃ (ចែករំលែក)" })}</FeatureCheck>
              <FeatureCheck>{t({ en: "Deepest scam pattern detection", km: "ការរកឃើញលំនាំការបោកប្រាស់ជ្រៅបំផុត" })}</FeatureCheck>
              <FeatureCheck>{t({ en: "Manage family accounts", km: "គ្រប់គ្រងគណនីគ្រួសារ" })}</FeatureCheck>
              <FeatureCheck>{t({ en: "Khmer and English support", km: "គាំទ្រទាំងភាសារខ្មែរ និងអង់គ្លេស" })}</FeatureCheck>
              <FeatureCheck>{t({ en: "Live Scan mode", km: "ការផ្ទៀងផ្ទាត់និងជូនដំណឹងដោយស្វ័យប្រវត្តិ" })}</FeatureCheck>
            </ul>
            <button type="button" className="btn btn-primary sub-btn">
              {t({ en: "Get Family​ Subscription", km: "ដំឡើងកញ្ចប់ គ្រួសារ" })}
            </button>
          </article>
        </div>
      </div>
    </section>
  )
}