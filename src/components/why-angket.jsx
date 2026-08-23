import { useLang } from "@/lib/i18n"
import { Reveal } from "./reveal"

const REASONS = [
  {
    emoji: "📊",
    title: { en: "Risk Percentage", km: "ភាគរយហានិភ័យ" },
    desc: {
      en: "Understand the estimated level of scam risk at a glance.",
      km: "យល់បានភ្លាមៗអំពីកម្រិតហានិភ័យបោកប្រាស់ដែលបានប៉ាន់ស្មាន។",
    },
  },
  {
    emoji: "🔎",
    title: { en: "Explainable Results", km: "លទ្ធផលពន្យល់បាន" },
    desc: {
      en: "Understand why something may be suspicious instead of receiving only a score.",
      km: "យល់ដឹងពីមូលហេតុដែលអ្វីមួយអាចគួរឲ្យសង្ស័យ ជាជាងទទួលតែពិន្ទុប៉ុណ្ណោះ។",
    },
  },
  {
    emoji: "🌐",
    title: { en: "Community Knowledge", km: "ចំណេះដឹងពីសហគមន៍" },
    desc: {
      en: "Learn from scam experiences reported by other users.",
      km: "រៀនសូត្រពីបទពិសោធន៍បោកប្រាស់ដែលបានរាយការណ៍ដោយអ្នកប្រើប្រាស់ដទៃទៀត។",
    },
  },
]

export function WhyAngket() {
  const { t } = useLang()

  return (
    <section className="how" id="why" aria-labelledby="why-title">
      <div className="container">
        <Reveal className="section-head center">
          <span className="eyebrow">{t({ en: "Why Angket?", km: "ហេតុអ្វីជ្រើស Angket?" })}</span>
          <h2 id="why-title">{t({ en: "More Than Just a Risk Score", km: "ច្រើនជាងត្រឹមពិន្ទុហានិភ័យ" })}</h2>
        </Reveal>
        <Reveal className="why-grid">
          {REASONS.map((reason) => (
            <article className="why-card" key={reason.title.en}>
              <span className="why-ic" aria-hidden="true">
                {reason.emoji}
              </span>
              <h3>{t(reason.title)}</h3>
              <p>{t(reason.desc)}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
