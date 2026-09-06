import { useLang } from "@/lib/i18n"
import { Reveal } from "./reveal"
import { IconMail, IconLink, IconFile, IconBell } from "./icons"

const PROBLEMS = [
  {
    Icon: IconMail,
    title: { en: "Suspicious Messages", km: "សារគួរឲ្យសង្ស័យ" },
    desc: {
      en: "People receive messages that may look legitimate but contain scam patterns.",
      km: "អ្នកអាចនឹងទទួលបានសារដែលអាចមើលទៅដូចជាកិច្ចការពិត ប៉ុន្តែខាងក្នុងមានបង្កប់លំនាំនៃការបោកប្រាស់។",
    },
  },
  {
    Icon: IconLink,
    title: { en: "Suspicious Links", km: "តំណភ្ជាប់គួរឲ្យសង្ស័យ" },
    desc: {
      en: "Users may click unfamiliar links without knowing where they lead.",
      km: "អ្នកប្រើប្រាស់អាចចុចតំណភ្ជាប់មិនស្គាល់ ដោយមិនដឹងថាវានឹងបញ្ជូនទៅកន្លែងណា។",
    },
  },
  {
    Icon: IconFile,
    title: { en: "Suspicious Files", km: "ឯកសារគួរឲ្យសង្ស័យ" },
    desc: {
      en: "Attachments and downloads can carry hidden malware or lead to fake forms designed to steal your information.",
      km: "ឯកសារភ្ជាប់ និងការទាញយកអាចផ្ទុកមេរោគដែលលាក់កំបាំង ឬនាំទៅកាន់ទម្រង់ក្លែងក្លាយដែលបង្កើតឡើងដើម្បីលួចព័ត៌មានរបស់អ្នក។",
    },
  },
  {
    Icon: IconBell,
    title: { en: "Fake Notifications", km: "ការជូនដំណឹងក្លែងក្លាយ" },
    desc: {
      en: "Scammers send fake bank or payment alerts that look real, especially through social media apps, tricking people into clicking or confirming transactions that never happened.",
      km: "អ្នកបោកប្រាស់ផ្ញើការជូនដំណឹងក្លែងក្លាយពីធនាគារ ឬការទូទាត់ដែលមើលទៅដូចជាពិត ជាពិសេសតាមរយៈកម្មវិធីបណ្ដាញសង្គម បញ្ឆោតអ្នកឱ្យចុច ឬបញ្ជាក់ប្រតិបត្តិការដែលមិនធ្លាប់កើតឡើងនោះទេ។",
    },
  },
]

export function Problems() {
  const { t } = useLang()

  return (
    <section className="problems" id="problem" aria-labelledby="problem-title">
      <div className="container">
        <Reveal className="section-head">
          <h2 id="problem-title">
            {t({ en: "Scams Can Happen to Anyone", km: "ការបោកប្រាស់អាចកើតឡើងចំពោះអ្នកណាក៏បាន" })}
          </h2>
        </Reveal>
        <Reveal className="prob-grid">
          {PROBLEMS.map((p) => (
            <article className="prob-card" key={p.title.en}>
              <span className="prob-head">
                <span className="prob-ic" aria-hidden="true">
                  <p.Icon />
                </span>
                <h3>{t(p.title)}</h3>
              </span>
              <p>{t(p.desc)}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
