import { useLang } from "@/lib/i18n"
import { Reveal } from "./reveal"

const PROBLEMS = [
  {
    emoji: "📩",
    title: { en: "Suspicious Messages", km: "សារគួរឲ្យសង្ស័យ" },
    desc: {
      en: "People receive messages that may look legitimate but contain scam patterns.",
      km: "មនុស្សទទួលបានសារដែលអាចមើលទៅដូចជាកិច្ចការពិត ប៉ុន្តែខាងក្នុងមានលំនាំនៃការបោកប្រាស់។",
    },
  },
  {
    emoji: "🔗",
    title: { en: "Suspicious Links", km: "តំណភ្ជាប់គួរឲ្យសង្ស័យ" },
    desc: {
      en: "Users may click unfamiliar links without knowing where they lead.",
      km: "អ្នកប្រើប្រាស់អាចចុចតំណភ្ជាប់មិនស្គាល់ ដោយមិនដឹងថាវាបញ្ជូនទៅកន្លែងណា។",
    },
  },
  {
    emoji: "💼",
    title: { en: "Fake Opportunities", km: "ឱកាសក្លែងក្លាយ" },
    desc: {
      en: "Job offers, investments, prizes, and other opportunities can be used to deceive people.",
      km: "ការផ្ដល់ការងារធ្វើ ការវិនិយោគ រង្វាន់ និងឱកាសផ្សេងៗ អាចត្រូវបានប្រើដើម្បីបោកបញ្ឆោតមនុស្ស។",
    },
  },
  {
    emoji: "💰",
    title: { en: "Financial Loss", km: "ការបាត់បង់ហិរញ្ញវត្ថុ" },
    desc: {
      en: "Scams can lead to financial loss or stolen personal information.",
      km: "ការបោកប្រាស់អាចបណ្ដាលឲ្យបាត់បង់ប្រាក់ ឬព័ត៌មានផ្ទាល់ខ្លួនត្រូវបានលួច។",
    },
  },
  {
    emoji: "🔄",
    title: { en: "Repeated Scams", km: "ការបោកប្រាស់ដដែលៗ" },
    desc: {
      en: "People may encounter scams that have already affected others without knowing about previous reports.",
      km: "មនុស្សអាចជួបការបោកប្រាស់ដែលបានប៉ះពាល់អ្នកដទៃរួចហើយ ដោយមិនដឹងអំពីរបាយការណ៍ពីមុន។",
    },
  },
]

export function Problems() {
  const { t } = useLang()

  return (
    <section className="problems" id="problem" aria-labelledby="problem-title">
      <div className="container">
        <Reveal className="section-head center">
          <span className="eyebrow">{t({ en: "The problem", km: "បញ្ហា" })}</span>
          <h2 id="problem-title">
            {t({ en: "Scams Are Easier to Encounter Than You Think", km: "ការបោកប្រាស់ងាយជួបប្រទះជាងដែលអ្នកគិត" })}
          </h2>
        </Reveal>
        <Reveal className="prob-grid">
          {PROBLEMS.map((p) => (
            <article className="prob-card" key={p.title.en}>
              <span className="prob-ic" aria-hidden="true">
                {p.emoji}
              </span>
              <h3>{t(p.title)}</h3>
              <p>{t(p.desc)}</p>
            </article>
          ))}
        </Reveal>
        <Reveal as="p" className="problem-note">
          <span>
            {t({
              en: "The problem isn’t only detecting scams. It’s knowing what to look for before making a decision.",
              km: "បញ្ហាមិនមែនត្រឹមតែការរកឃើញការបោកប្រាស់ប៉ុណ្ណោះទេ។ វាគឺជាការដឹងថាត្រូវរកមើលអ្វី មុនពេលធ្វើការសម្រេចចិត្ត។",
            })}
          </span>
        </Reveal>
      </div>
    </section>
  )
}
