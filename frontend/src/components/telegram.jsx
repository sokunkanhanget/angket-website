import { useLang } from "@/lib/i18n"
import { TELEGRAM_BOT_URL } from "@/lib/data"
import { Reveal } from "./reveal"
import { IconSend, IconSearch, IconBrain, IconBell } from "./icons"
import connectBotImg from "@/assets/livescan/connect_bot.jpg"

const FLOW = [
  {
    num: 1,
    img: connectBotImg,
    Icon: IconSearch,
    title: { en: "Get the bot", km: "ទទួលបានបូត" },
    tag: {
      en: "Find and connect in Telegram.",
      km: "ស្វែងរក និងភ្ជាប់ក្នុង Telegram",
    },
    desc: {
      en: "Search the bot's username directly in Telegram, or open the Angket website and tap through to the bot. Then connect with its chat automation.",
      km: "ស្វែងរកឈ្មោះបូតនៅក្នុង Telegram ដោយផ្ទាល់ ឬចូលទៅកាន់គេហទំព័រ Angket ហើយចុចភ្ជាប់ទៅបូត។ បន្ទាប់មកភ្ជាប់ជាមួយការឆ្លើយតបដោយស្វ័យប្រវត្តិ។",
    },
  },
  {
    num: 2,
    Icon: IconSend,
    title: { en: "Incoming message", km: "សារចូល" },
    tag: {
      en: "Send or forward suspicious content.",
      km: "ផ្ញើ ឬបញ្ជូនបន្តមាតិកាគួរឱ្យសង្ស័យ",
    },
    desc: {
      en: "Send or forward a suspicious message, link, or file so it reaches the bot conversation.",
      km: "ផ្ញើ ឬបញ្ជូនបន្តសារ តំណភ្ជាប់ ឬឯកសារដែលគួរឱ្យសង្ស័យ ដើម្បីឱ្យវាមកដល់ការសន្ទនាជាមួយបូត។",
    },
  },
  {
    num: 3,
    Icon: IconBrain,
    title: { en: "Automatic analysis", km: "ការវិភាគស្វ័យប្រវត្តិ" },
    tag: {
      en: "The bot analyzes instantly.",
      km: "បូតវិភាគភ្លាមៗ",
    },
    desc: {
      en: "The bot automatically analyzes the message, link, or file it receives - no waiting around.",
      km: "បូតនឹងវិភាគសារ តំណភ្ជាប់ ឬឯកសារដែលទទួលបានដោយស្វ័យប្រវត្តិ ដោយមិនចាំបាច់រង់ចាំ។",
    },
  },
  {
    num: 4,
    Icon: IconBell,
    title: { en: "User alert", km: "ការជូនដំណឹងដល់អ្នកប្រើ" },
    tag: {
      en: "A clear alert with everything you need.",
      km: "ការជូនដំណឹងច្បាស់លាស់ជាមួយអ្វីដែលអ្នកត្រូវការ",
    },
    desc: {
      en: "You get an easy-to-understand alert so you can decide what to do next.",
      km: "អ្នកនឹងទទួលបានការជូនដំណឹងងាយយល់ ដើម្បីសម្រេចចិត្តថាត្រូវធ្វើអ្វីបន្ទាប់។",
    },
    details: [
      { en: "Sender", km: "អ្នកផ្ញើ" },
      { en: "Date/time", km: "កាលបរិច្ឆេទ/ពេលវេលា" },
      { en: "Risk score", km: "ពិន្ទុហានិភ័យ" },
      { en: "Reasons", km: "មូលហេតុ" },
      { en: "Recommended actions", km: "សកម្មភាពដែលណែនាំ" },
    ],
  },
]

export function TelegramBand() {
  const { t } = useLang()

  return (
    <section className="tg-band" id="telegram" aria-labelledby="tg-title">
      <div className="container">
        <Reveal className="tg-inner">
          <h2 id="tg-title">{t({ en: "Angket Bot Usage", km: "របៀបប្រើប្រាស់ Bot Angket" })}</h2>
          <p className="tg-copy">
            {t({
              en: "This website is the front door - the bot is where your messages actually get checked. Send anything suspicious and receive an estimated risk assessment with clear reasons, right inside Telegram.",
              km: "គេហទំព័រនេះគ្រាន់តែជាទ្វារមុខ - Bot គឺជាកន្លែងពិតដែលសាររបស់អ្នកត្រូវបានពិនិត្យ។ ផ្ញើអ្វីៗដែលគួរឲ្យសង្ស័យទៅកាន់ Bot ហើយអ្នកនឹងទទួលបានការវិភាគពីហានិភ័យ ជាមួយមូលហេតុច្បាស់លាស់ ក្នុង Telegram ផ្ទាល់។",
            })}
          </p>

          <Reveal as="ol" className="flow tg-flow">
            {FLOW.map((step) => (
              <li className="flow-step" key={step.num}>
                <span className="step-num" aria-hidden="true">
                  {String(step.num).padStart(2, "0")}
                </span>
                <div className="step-shot">
                  {step.img ? (
                    <img src={step.img} alt={t(step.title)} loading="lazy" />
                  ) : (
                    <span className="step-shot-ph">
                      {t({ en: "Add screenshot", km: "បន្ថែមរូបថតអេក្រង់" })}
                    </span>
                  )}
                </div>
                <div className="step-head">
                  <span className="step-ic" aria-hidden="true">
                    <step.Icon />
                  </span>
                  <h3>{t(step.title)}</h3>
                </div>
                <p className="step-tag">{t(step.tag)}</p>
                <p>{t(step.desc)}</p>
                {step.details && (
                  <ul className="flow-details">
                    {step.details.map((d) => (
                      <li key={d.en}>{t(d)}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </Reveal>

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