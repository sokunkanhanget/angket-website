import { useLang } from "@/lib/i18n"
import { Reveal } from "./reveal"
import { IconLock, IconCard, IconLink, IconClock, IconSearch } from "./icons"

const TIPS = [
  {
    Icon: IconLock,
    title: { en: "Protect Your Information", km: "ការពារព័ត៌មានរបស់អ្នក" },
    desc: {
      en: "Never share passwords, OTPs, or sensitive information with unknown people.",
      km: "កុំចែករំលែកពាក្យសម្ងាត់ លេខកូដ OTP ឬព័ត៌មានសម្ងាត់ជាមួយមនុស្សដែលអ្នកមិនស្គាល់។",
    },
  },
  {
    Icon: IconCard,
    title: { en: "Think Before You Pay", km: "គិតមុនពេលបង់ប្រាក់" },
    desc: {
      en: "Be careful when someone asks for upfront payment or urgent transfers.",
      km: "ប្រុងប្រយ័ត្នពេលមានគេសុំបង់ប្រាក់មុន ឬការផ្ទេរប្រាក់ជាបន្ទាន់។",
    },
  },
  {
    Icon: IconLink,
    title: { en: "Check Before You Click", km: "សូមពិនិត្យមុនពេលចុច" },
    desc: {
      en: "Don’t blindly open unfamiliar links — check where they really lead first.",
      km: "កុំបើកតំណភ្ជាប់មិនស្គាល់ដោយគ្មានការពិនិត្យ — ពិនិត្យជាមុនថាវាបញ្ជូនទៅណាពិតប្រាកដ។",
    },
  },
  {
    Icon: IconClock,
    title: { en: "Don’t Let Urgency Decide", km: "កុំឲ្យការប្រញាប់សម្រេចចិត្តជំនួស" },
    desc: {
      en: "Scammers often pressure people to act immediately. Take a moment to think it through.",
      km: "អ្នកបោកប្រាស់ច្រើនតែដាក់សម្ពាធឲ្យមនុស្សធ្វើសកម្មភាពភ្លាមៗ។ ចំណាយពេលបន្តិចដើម្បីគិតឲ្យច្បាស់។",
    },
  },
  {
    Icon: IconSearch,
    title: { en: "Verify First", km: "ផ្ទៀងផ្ទាត់ជាមុនសិន" },
    desc: {
      en: "Check information through official sources before trusting an offer.",
      km: "ពិនិត្យព័ត៌មានតាមប្រភពផ្លូវការមុនពេលជឿជាក់លើការផ្ដល់ជូនណាមួយ។",
    },
  },
]

export function SafetyTips() {
  const { t } = useLang()

  return (
    <section id="tips" aria-labelledby="tips-title">
      <div className="container">
        <Reveal className="section-head center">
          <span className="eyebrow">{t({ en: "Safety Tips", km: "គន្លឹះសុវត្ថិភាព" })}</span>
          <h2 id="tips-title">
            {t({ en: "Stay One Step Ahead of Scammers", km: "ឈានមួយជំហានមុនអ្នកបោកប្រាស់" })}
          </h2>
        </Reveal>
        <Reveal className="tips-grid">
          {TIPS.map((tip) => (
            <article className="tip-card" key={tip.title.en}>
              <span className="tip-ic" aria-hidden="true">
                <tip.Icon />
              </span>
              <h3>{t(tip.title)}</h3>
              <p>{t(tip.desc)}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
