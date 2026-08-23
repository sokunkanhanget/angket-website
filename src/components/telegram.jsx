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
          <span className="eyebrow on-dark">
            {t({ en: "Everything happens in Telegram", km: "អ្វីៗទាំងអស់ធ្វើនៅក្នុង Telegram" })}
          </span>
          <h2 id="tg-title">{t({ en: "Talk to the Angket Bot", km: "សន្ទនាជាមួយ Bot Angket" })}</h2>
          <p className="tg-copy">
            {t({
              en: "This website is the front door — the bot is where your messages actually get checked. Send anything suspicious and receive an estimated risk assessment with clear reasons, right inside Telegram.",
              km: "គេហទំព័រនេះគ្រាន់តែជាទ្វារមុខ — Bot គឺជាកន្លែងពិតដែលសាររបស់អ្នកត្រូវបានពិនិត្យ។ ផ្ញើអ្វីៗគួរឲ្យសង្ស័យ ហើយទទួលបានការប៉ាន់ស្មានហានិភ័យ ជាមួយមូលហេតុច្បាស់លាស់ ក្នុង Telegram ផ្ទាល់។",
            })}
          </p>
          <div className="tg-steps-row">
            {STEPS.map((step, i) => (
              <span className="tg-pill" key={step.en}>
                <i>{i + 1}</i>
                <span>{t(step)}</span>
              </span>
            ))}
          </div>
          <div className="tg-ctas">
            <a className="btn btn-white btn-lg" href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer">
              <IconSend />
              <span>🛡️ {t({ en: "Open Angket on Telegram", km: "បើក Angket នៅលើ Telegram" })}</span>
            </a>
          </div>
          <p className="tg-free">
            {t({
              en: "Free to use — all you need is a Telegram account.",
              km: "ប្រើឥតគិតថ្លៃ — គ្រាន់តែត្រូវការគណនី Telegram ប៉ុណ្ណោះ។",
            })}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
