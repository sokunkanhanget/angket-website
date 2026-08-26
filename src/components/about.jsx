import { useLang } from "@/lib/i18n"
import { Reveal } from "./reveal"
import { IconSearch, IconChart, IconBrain, IconShield } from "./icons"

const FUNCTIONS = [
  {
    Icon: IconSearch,
    title: { en: "Detect", km: "រកឃើញ" },
    desc: {
      en: "Automatically detect suspicious patterns in incoming messages and alert users when something appears risky.",
      km: "រកឃើញលំនាំគួរឲ្យសង្ស័យក្នុងសារដែលទទួលបានដោយស្វ័យប្រវត្តិ និងជូនដំណឹងអ្នកប្រើប្រាស់ពេលមានអ្វីមួយបង្ហាញភាពហានិភ័យ។",
    },
  },
  {
    Icon: IconChart,
    title: { en: "Check", km: "ពិនិត្យ" },
    desc: {
      en: "Send suspicious messages, links, or URLs to the bot and get an estimated scam risk percentage.",
      km: "ផ្ញើសារ តំណភ្ជាប់ ឬ URL គួរឲ្យសង្ស័យទៅ Bot ហើយទទួលបានការវិភាគពីភាគរយហានិភ័យ​នៃបោកប្រាស់។",
    },
  },
  {
    Icon: IconBrain,
    title: { en: "Understand", km: "យល់ដឹង" },
    desc: {
      en: "Explains why the content may be suspicious and highlights the detected scam patterns.",
      km: "ពន្យល់ពីមូលហេតុដែលខ្លឹមសារអាចគួរឲ្យសង្ស័យ និងបង្ហាញលំនាំបោកប្រាស់ដែលរកឃើញ។",
    },
  },
  {
    Icon: IconShield,
    title: { en: "Protect", km: "ការពារ" },
    desc: {
      en: "Provides safety recommendations and lets users learn from reported scam experiences to avoid similar scams.",
      km: "ផ្ដល់អនុសាសន៍សុវត្ថិភាព និងឲ្យអ្នកប្រើប្រាស់រៀនពីបទពិសោធន៍បោកប្រាស់ដែលបានរាយការណ៍ ដើម្បីចៀសវាងការបោកប្រាស់ប្រភេទដូចគ្នា។",
    },
  },
]

export function About() {
  const { t } = useLang()

  return (
    <section id="about" aria-labelledby="about-title">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">{t({ en: "Meet Angket", km: "ស្គាល់ពី Angket" })}</span>
          <h2 id="about-title">
            {t({ en: "Your Safety Companion on Telegram", km: "មិត្តរួមសុវត្ថិភាពរបស់អ្នកនៅលើ Telegram" })}
          </h2>
          <p className="solution-lead">
            {t({
              en: "Angket is your safety companion on Telegram. Instead of guessing whether a message is trustworthy, send it to the bot and get an estimated risk assessment with clear reasons — helping you pause, understand, and decide with confidence. This website adds community knowledge on top: real scam experiences and practical safety tips.",
              km: "Angket គឺជាមិត្តរួមសុវត្ថិភាពរបស់អ្នកនៅលើ Telegram។ ជាជាងការស្មានថាតើសារណាមួយអាចជឿបានឬអត់ អ្នកអាចផ្ញើវាទៅ Bot ហើយទទួលបានការវាយតម្លៃពីហានិភ័យ ជាមួយមូលហេតុច្បាស់លាស់ — ដើម្បីជួយអ្នកគិត យល់ដឹង និងសម្រេចចិត្តដោយទំនុកចិត្ត។ គេហទំព័រនេះបន្ថែមចំណេះដឹងពីសហគមន៍ ដូចជាបទពិសោធន៍បោកប្រាស់ជាក់ស្ដែង និងគន្លឹះសុវត្ថិភាពជាក់ស្ដែង។",
            })}
          </p>
        </Reveal>
        <Reveal className="func-grid">
          {FUNCTIONS.map((f) => (
            <article className="func-card" key={f.title.en}>
              <span className="func-ic" aria-hidden="true">
                <f.Icon />
              </span>
              <h3>{t(f.title)}</h3>
              <p>{t(f.desc)}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
