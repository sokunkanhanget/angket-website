import { useLang } from "@/lib/i18n"
import { Reveal } from "./reveal"
import { IconMail, IconLink } from "./icons"

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
  }
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
              <span className="prob-ic" aria-hidden="true">
                <p.Icon />
              </span>
              <h3>{t(p.title)}</h3>
              <p>{t(p.desc)}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
