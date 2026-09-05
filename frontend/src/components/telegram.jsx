import { useLang } from "@/lib/i18n"
import { TELEGRAM_BOT_URL } from "@/lib/data"
import { Reveal } from "./reveal"
import { IconSend } from "./icons"

const STEPS = [
  { en: "Open Telegram", km: "បើក Telegram" },
  { en: "Start the bot", km: "ចាប់ផ្ដើម Bot" },
  { en: "Send or forward a message", km: "ផ្ញើ ឬបញ្ជូនបន្តសារ" },
  { en: "Get your estimate", km: "ទទួលការប៉ាន់ស្មាន" },
]

export function TelegramBand() {
  const { t } = useLang()

  return (
    <section className="tg-band" id="telegram" aria-labelledby="tg-title">
      <div className="container">
        <Reveal className="tg-inner">
          <h2 id="tg-title">{t({ en: "Angket Bot​ Usage", km: "របៀបប្រើប្រាស់ Bot Angket" })}</h2>
          <p className="tg-copy">
            {t({
              en: "This website is the front door - the bot is where your messages actually get checked. Send anything suspicious and receive an estimated risk assessment with clear reasons, right inside Telegram.",
              km: "គេហទំព័រនេះគ្រាន់តែជាទ្វារមុខ - Bot គឺជាកន្លែងពិតដែលសាររបស់អ្នកត្រូវបានពិនិត្យ។ ផ្ញើអ្វីៗដែលគួរឲ្យសង្ស័យទៅកាន់​​ Bot ហើយអ្នកនឹងទទួលបានការវិភាគពីហានិភ័យ ជាមួយមូលហេតុច្បាស់លាស់ ក្នុង Telegram ផ្ទាល់។",
            })}
          </p>
          <div className="tg-steps">
            {STEPS.map((step, i) => (
              <span className="tg-step-card" key={step.en}>
                <i aria-hidden="true">{i + 1}</i>
                <span>{t(step)}</span>
              </span>
            ))}
          </div>
          <div className="tg-ctas">
            <a className="btn btn-white btn-lg" href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer">
              <IconSend />
              <span>{t({ en: "Open Angket on Telegram", km: "បើក Angket នៅលើ Telegram" })}</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
