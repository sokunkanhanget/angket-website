import { useLang } from "@/lib/i18n"
import { IconUser, IconUsers, IconCheck, IconStar } from "./icons"

const CONTAINER = "mx-auto w-full max-w-[1440px] px-[clamp(1rem,4vw,3rem)]"

const BTN =
  "inline-flex items-center justify-center gap-2 rounded-full border cursor-pointer font-semibold whitespace-nowrap transition-[background-color,box-shadow,transform] duration-[180ms] ease-out"
const BTN_OUTLINE = "border-blue-200 bg-white text-blue-700 hover:bg-blue-50"
const BTN_PRIMARY = "border-transparent bg-blue-800 text-white shadow-sm hover:bg-blue-700 hover:-translate-y-px"
const SUB_PAD = "px-[1.25rem] py-[0.62rem] text-[0.95rem]"
const SUB_BTN = "mt-auto w-full"

const CARD =
  "relative flex flex-col rounded-[20px] border border-[#e3e9f3] bg-white px-[1.5rem] pt-[1.6rem] pb-[1.5rem] shadow-sm transition-[box-shadow,transform] duration-200 hover:-translate-y-[3px] hover:shadow-md max-[600px]:px-[1.1rem] max-[600px]:pt-[1.3rem] max-[600px]:pb-[1.2rem] max-[380px]:px-[1rem] max-[380px]:pt-[1.1rem] max-[380px]:pb-[1rem]"

const IC_GRAY =
  "grid h-[46px] w-[46px] flex-none place-items-center rounded-full bg-[#edf0f6] text-faint"
const IC_BLUE =
  "grid h-[46px] w-[46px] flex-none place-items-center rounded-full bg-blue-600 text-white shadow-[0_6px_14px_rgba(37,99,235,0.3)]"
const IC_GREEN =
  "grid h-[46px] w-[46px] flex-none place-items-center rounded-full border border-[#c9efd9] bg-[#ebfdf3] text-[#14713d]"

const FEATURE = "flex items-center gap-[0.55rem] text-[0.9rem] text-text"
const CHECK = "grid h-5 w-5 flex-none place-items-center rounded-full border border-[#c9efd9] bg-[#ebfdf3] text-[#14713d]"

// Presentational only: prices are demo values.
const PREMIUM_MONTHLY = 1.99
const FAMILY_MONTHLY = 5.99

function FeatureCheck({ children }) {
  return (
    <li className={FEATURE}>
      <span className={CHECK} aria-hidden="true">
        <IconCheck style={{ width: 11, height: 11 }} />
      </span>
      <span>{children}</span>
    </li>
  )
}

export function Subscription() {
  const { t } = useLang()

  return (
    <section className="bg-surface pb-[4.5rem] pt-[3.5rem]" id="subscription" aria-labelledby="sub-title">
      <div className={CONTAINER}>
        <header className="mx-auto mb-[2rem] max-w-none text-center">
          <h1 className="text-[clamp(1.9rem,4vw,2.6rem)] font-bold leading-[1.15] tracking-[-0.03em] text-navy-900" id="sub-title">
            {t({ en: "Choose Your Protection Plan", km: "ជ្រើសរើសគម្រោងការពាររបស់អ្នក" })}
          </h1>
          <p className="mt-[0.6rem] text-[1.02rem] text-[#56657f]">
            {t({
              en: "Stay protected online with a plan that fits your needs or your family's.",
              km: "ស្នាក់នៅប្រកបដោយសុវត្ថិភាពតាមអ៊ីនធឺណិត ជាមួយគម្រោងដែលសមនឹងតម្រូវការរបស់អ្នក ឬគ្រួសាររបស់អ្នក។",
            })}
          </p>
        </header>

        <div className="mx-auto mt-[2rem] grid w-full max-w-[1120px] grid-cols-3 items-stretch gap-[1.4rem] max-[1024px]:max-w-[900px] max-[1024px]:grid-cols-2 max-[720px]:max-w-[420px] max-[720px]:grid-cols-1">
          <article className={CARD} aria-labelledby="sub-free-name">
            <div className="mb-[1.05rem] flex items-start gap-[0.85rem] pr-[1.4rem]">
              <span className={IC_GRAY} aria-hidden="true">
                <IconUser style={{ width: 22, height: 22 }} />
              </span>
              <div>
                <h2 className="text-[1.18rem] font-bold text-ink" id="sub-free-name">
                  {t({ en: "Freemium", km: "កញ្ចប់ហ្វ្រី" })}
                </h2>
                <p className="mt-[0.15rem] text-[0.88rem] leading-[1.45] text-[#56657f]">
                  {t({
                    en: "Basic protection for your online safety.",
                    km: "ការការពារជាមូលដ្ឋានសម្រាប់សុវត្ថិភាពតាមអ៊ីនធឺណិតរបស់អ្នក។",
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-baseline gap-[0.35rem]">
              <strong className="font-display text-[2.3rem] font-bold leading-none text-ink km:font-km">$0</strong>
              <span className="text-[0.92rem] font-semibold text-faint">{t({ en: "/ month", km: "/ ខែ" })}</span>
            </div>
            <hr className="my-[0.95rem] border-0 border-t border-[#e3e9f3]" />
            <ul className="m-0 mb-[1.3rem] grid list-none gap-2 p-0">
              <FeatureCheck>{t({ en: "Live scam detection (7-day trial)", km: "ការរកឃើញការបោកប្រាស់ផ្ទាល់ (សាកល្បង 7 ថ្ងៃ)" })}</FeatureCheck>
              <FeatureCheck>{t({ en: "Check up to 3 files a day", km: "ពិនិត្យរហូតដល់ 3 ឯកសារក្នុងមួយថ្ងៃ" })}</FeatureCheck>
              <FeatureCheck>{t({ en: "Check up to 10 messages or links a day", km: "ពិនិត្យរហូតដល់ 10 សារ ឬតំណភ្ជាប់ក្នុងមួយថ្ងៃ" })}</FeatureCheck>
              <FeatureCheck>{t({ en: "Group chat protection (7-day trial)", km: "ការការពារការជជែកជាក្រុម (សាកល្បង 7 ថ្ងៃ)" })}</FeatureCheck>
              <FeatureCheck>{t({ en: "Khmer and English support", km: "គាំទ្រទាំងភាសារខ្មែរ និងអង់គ្លេស" })}</FeatureCheck>
            </ul>
            <button type="button" className={`${BTN} ${BTN_OUTLINE} ${SUB_PAD} ${SUB_BTN}`}>
              {t({ en: "Get Started", km: "ចាប់ផ្ដើម" })}
            </button>
          </article>

          <article className={`${CARD} border-2 border-blue-600 shadow-[0_14px_36px_rgba(37,99,235,0.14)] hover:shadow-[0_20px_46px_rgba(37,99,235,0.18)]`} aria-labelledby="sub-premium-name">
            <span className="absolute right-4 top-4 inline-flex items-center gap-[0.3rem] rounded-full bg-blue-600 px-[0.75rem] py-[0.3rem] text-[0.72rem] font-bold text-white shadow-sm">
              <IconStar style={{ width: 12, height: 12 }} />
              <span>{t({ en: "Most Popular", km: "ពេញនិយមបំផុត" })}</span>
            </span>
            <div className="mb-[1.05rem] flex items-start gap-[0.85rem] pr-[1.4rem]">
              <span className={IC_BLUE} aria-hidden="true">
                <IconStar style={{ width: 22, height: 22 }} />
              </span>
              <div>
                <h2 className="text-[1.18rem] font-bold text-ink" id="sub-premium-name">
                  {t({ en: "Premium", km: "កញ្ចប់ព្រីមៀម" })}
                </h2>
            <p className="mt-[0.15rem] text-[0.88rem] leading-[1.45] text-[#56657f]">
                  {t({
                    en: "Advanced protection for a safer online experience.",
                    km: "ការការពារកម្រិតខ្ពស់សម្រាប់បទពិសោធន៍តាមអ៊ីនធឺណិតប្រកបដោយសុវត្ថិភាពជាងមុន។",
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-baseline gap-[0.35rem]">
              <strong className="font-display text-[2.3rem] font-bold leading-none text-ink km:font-km">${PREMIUM_MONTHLY.toFixed(2)}</strong>
              <span className="text-[0.92rem] font-semibold text-faint">{t({ en: "/ month", km: "/ ខែ" })}</span>
            </div>
            <hr className="my-[0.95rem] border-0 border-t border-[#e3e9f3]" />
            <ul className="m-0 mb-[1.3rem] grid list-none gap-2 p-0">
              <FeatureCheck>{t({ en: "Everything in Freemium, always on", km: "អ្វីគ្រប់យ៉ាងក្នុងកញ្ចប់ Freemium ប្រើបានជាប់ជានិច្ច" })}</FeatureCheck>
              <FeatureCheck>{t({ en: "Check up to 5 files a day", km: "ពិនិត្យរហូតដល់ 5 ឯកសារក្នុងមួយថ្ងៃ" })}</FeatureCheck>
              <FeatureCheck>{t({ en: "Check up to 15 messages or links a day", km: "ពិនិត្យរហូតដល់ 15 សារ ឬតំណភ្ជាប់ក្នុងមួយថ្ងៃ" })}</FeatureCheck>
              <FeatureCheck>{t({ en: "Deeper scam pattern detection", km: "ការរកឃើញលំនាំការបោកប្រាស់កាន់តែស៊ីជម្រៅ" })}</FeatureCheck>
              <FeatureCheck>{t({ en: "Group chat protection included", km: "រួមបញ្ចូលការការពារការជជែកជាក្រុម" })}</FeatureCheck>
              <FeatureCheck>{t({ en: "Khmer and English support", km: "គាំទ្រទាំងភាសារខ្មែរ និងអង់គ្លេស" })}</FeatureCheck>
              <FeatureCheck>{t({ en: "Live Scan mode ", km: "ការផ្ទៀងផ្ទាត់និងជូនដំណឹងដោយស្វ័យប្រវត្តិ" })}</FeatureCheck>
            </ul>
            <button type="button" className={`${BTN} ${BTN_PRIMARY} ${SUB_PAD} ${SUB_BTN}`}>
              {t({ en: "Upgrade to Premium", km: "ដំឡើងកញ្ចប់ ព្រីមៀម" })}
            </button>
          </article>

          <article className={CARD} aria-labelledby="sub-family-name">
            <div className="mb-[1.05rem] flex items-start gap-[0.85rem] pr-[1.4rem]">
              <span className={IC_GREEN} aria-hidden="true">
                <IconUsers style={{ width: 22, height: 22 }} />
              </span>
              <div>
                <h2 className="text-[1.18rem] font-bold text-ink" id="sub-family-name">
                  {t({ en: "Family", km: "កញ្ចប់គ្រួសារ" })}
                </h2>
                <p className="mt-[0.15rem] text-[0.88rem] leading-[1.45] text-[#56657f]">
                  {t({ en: "Protect your whole family with one plan.", km: "ការពារគ្រួសារទាំងមូលរបស់អ្នកជាមួយគម្រោងតែមួយ។" })}
                </p>
              </div>
            </div>
            <div className="flex items-baseline gap-[0.35rem]">
              <strong className="font-display text-[2.3rem] font-bold leading-none text-ink km:font-km">${FAMILY_MONTHLY.toFixed(2)}</strong>
              <span className="text-[0.92rem] font-semibold text-faint">
                {t({ en: "/ month · up to 5 members", km: "/ ខែ · រហូតដល់ 5 នាក់" })}
              </span>
            </div>
            <hr className="my-[0.95rem] border-0 border-t border-[#e3e9f3]" />
            <ul className="m-0 mb-[1.3rem] grid list-none gap-2 p-0">
              <FeatureCheck>{t({ en: "Everything in Family Subscription, shared with the family", km: "អ្វីគ្រប់យ៉ាងក្នុងកញ្ចប់ គ្រួសារ ចែករំលែកជាមួយគ្រួសារ" })}</FeatureCheck>
              <FeatureCheck>{t({ en: "Up to 15 files a day (shared)", km: "រហូតដល់ 15 ឯកសារក្នុងមួយថ្ងៃ (ចែករំលែក)" })}</FeatureCheck>
              <FeatureCheck>{t({ en: "Up to 50 messages or links a day (shared)", km: "រហូតដល់ 50 សារ ឬតំណភ្ជាប់ក្នុងមួយថ្ងៃ (ចែករំលែក)" })}</FeatureCheck>
              <FeatureCheck>{t({ en: "Deepest scam pattern detection", km: "ការរកឃើញលំនាំការបោកប្រាស់ជ្រៅបំផុត" })}</FeatureCheck>
              <FeatureCheck>{t({ en: "Manage family accounts", km: "គ្រប់គ្រងគណនីគ្រួសារ" })}</FeatureCheck>
              <FeatureCheck>{t({ en: "Khmer and English support", km: "គាំទ្រទាំងភាសារខ្មែរ និងអង់គ្លេស" })}</FeatureCheck>
              <FeatureCheck>{t({ en: "Live Scan mode", km: "ការផ្ទៀងផ្ទាត់និងជូនដំណឹងដោយស្វ័យប្រវត្តិ" })}</FeatureCheck>
            </ul>
            <button type="button" className={`${BTN} ${BTN_PRIMARY} ${SUB_PAD} ${SUB_BTN}`}>
              {t({ en: "Get Family​ Subscription", km: "ដំឡើងកញ្ចប់ គ្រួសារ" })}
            </button>
          </article>
        </div>
      </div>
    </section>
  )
}
