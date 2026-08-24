import { useLang } from "@/lib/i18n"
import { Reveal } from "./reveal"
import { IconInfo } from "./icons"

const FLOW = [
  {
    num: 1,
    emoji: "📩",
    title: { en: "Send", km: "ផ្ញើ" },
    desc: {
      en: "Forward a suspicious message or link to the bot in your chat.",
      km: "បញ្ជូនបន្តសារ ឬតំណគួរឲ្យសង្ស័យទៅ Bot ក្នុងការសន្ទនារបស់អ្នក។",
    },
  },
  {
    num: 2,
    emoji: "🤖",
    title: { en: "Analyze", km: "វិភាគ" },
    desc: {
      en: "Angket scans the content for scam patterns and risk indicators.",
      km: "Angket ពិនិត្យរកលំនាំបោកប្រាស់ និងសញ្ញានៃភាពហានិភ័យក្នុងខ្លឹមសារ។",
    },
  },
  {
    num: 3,
    emoji: "📊",
    title: { en: "Risk + Reasons", km: "ហានិភ័យ + មូលហេតុ" },
    desc: {
      en: "You get an estimated risk percentage and a clear explanation of what was detected.",
      km: "អ្នកទទួលបានការប៉ាន់ស្មាននៃភាគរយហានិភ័យ ជាមួយការពន្យល់ច្បាស់លាស់ពីអ្វីដែលរកឃើញ។",
    },
  },
  {
    num: 4,
    emoji: "🛡️",
    title: { en: "Make a Safer Decision", km: "សម្រេចចិត្តប្រកបដោយសុវត្ថិភាព" },
    desc: {
      en: "Use the results and recommendations to decide your next step — before you pay, click, or share.",
      km: "ប្រើលទ្ធផល និងការណែនាំ ដើម្បីសម្រេចជំហានបន្ទាប់របស់អ្នក — មុនពេលបង់ប្រាក់ ចុច ឬចែករំលែក។",
    },
  },
]

export function HowItWorks() {
  const { t } = useLang()

  return (
    <section className="how" id="how" aria-labelledby="how-title">
      <div className="container">
        <Reveal className="section-head center">
          <span className="eyebrow">{t({ en: "Simple process", km: "ដំណើរការសាមញ្ញ" })}</span>
          <h2 id="how-title">{t({ en: "How Angket Works", km: "របៀបដែល Angket ដំណើរការ" })}</h2>
          <p>
            {t({
              en: "No apps to install, nothing complicated — Angket works entirely inside Telegram in four steps.",
              km: "គ្មានការដំឡើងកម្មវិធីបន្ថែម ហើយក៏មិនស្មុគស្មាញដែរ — Angket ដំណើរការទាំងស្រុងក្នុង Telegram តែ 4 ជំហានប៉ុណ្ណោះ។",
            })}
          </p>
        </Reveal>

        <Reveal as="ol" className="flow">
          {FLOW.map((step) => (
            <li className="flow-step" key={step.num}>
              <span className="step-num" aria-hidden="true">
                {step.num}
              </span>
              <span className="step-emoji" aria-hidden="true">
                {step.emoji}
              </span>
              <h3>{t(step.title)}</h3>
              <p>{t(step.desc)}</p>
              {step.num < FLOW.length && (
                <span className="flow-arrow" aria-hidden="true">
                  →
                </span>
              )}
            </li>
          ))}
        </Reveal>

        <p className="how-note">
          <IconInfo />
          <span>
            {t({
              en: "Results are estimated risk assessments based on detected patterns — not verdicts or guarantees.",
              km: "លទ្ធផលគឺជាការប៉ាន់ស្មានហានិភ័យផ្អែកលើលំនាំដែលរកឃើញ — មិនមែនជាសេចក្ដីសម្រេច ឬការធានាទេ។",
            })}
          </span>
        </p>
      </div>
    </section>
  )
}
