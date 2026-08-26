import { useLang } from "@/lib/i18n"
import { Reveal } from "./reveal"
import { IconChart, IconSearch, IconGlobe } from "./icons"

const REASONS = [
  {
    Icon: IconChart,
    title: { en: "Risk Percentage", km: "ភាគរយហានិភ័យ" },
    desc: {
      en: "Understand the estimated level of scam risk at a glance.",
      km: "យល់បានភ្លាមៗអំពីកម្រិតហានិភ័យនៃការបោកប្រាស់ដែលបានរកឃើញ។",
    },
  },
  {
    Icon: IconSearch,
    title: { en: "Explainable Results", km: "លទ្ធផលដែលអាចយល់បាន" },
    desc: {
      en: "Understand why something may be suspicious instead of receiving only a percentage of risk.",
      km: "យល់ដឹងពីមូលហេតុដែលអាចគួរឲ្យសង្ស័យ ជាជាងទទួលបានតែភាគរយនៃហានិភ័យ។",
    },
  },
  {
    Icon: IconGlobe,
    title: { en: "Community Knowledge", km: "ចំណេះដឹងពីសហគមន៍" },
    desc: {
      en: "Learn from scam experiences reported by other users.",
      km: "រៀនសូត្រពីបទពិសោធន៍នៃបោកប្រាស់ដែលបានរាយការណ៍ដោយអ្នកប្រើប្រាស់ដទៃទៀត។",
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
          <h2 id="why-title">{t({ en: "More Than Just a Risk Score", km: "មិនត្រឹមតែភាគរយហានិភ័យប៉ុណ្ណោះទេ​" })}</h2>
        </Reveal>
        <Reveal className="why-grid">
          {REASONS.map((reason) => (
            <article className="why-card" key={reason.title.en}>
              <span className="why-ic" aria-hidden="true">
                <reason.Icon />
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
