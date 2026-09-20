import { useLang } from "@/lib/i18n"
import { TELEGRAM_BOT_URL } from "@/lib/data"
import { Reveal } from "./reveal"
import { IconSend, IconSearch, IconBrain, IconBell } from "./icons"
import connectBotImg from "@/assets/livescan/connect_bot.png"
import incomingContentImg from "@/assets/livescan/incoming_message.jpg"
import checkingContentImg from "@/assets/livescan/checking_content.png"
import resultImg from "@/assets/livescan/result.png"

const FLOW = [
  {
    num: 1,
    img: connectBotImg,
    Icon: IconSearch,
    title: { en: "Connect the bot with chat automation", km: "ភ្ជាប់បូតទៅនឹងមុខងារឆាតអូតូ" },
    tag: {
      en: "Find and connect bot with chat automation in Telegram.",
      km: "ស្វែងរក និងភ្ជាប់បូតជាមួយមុខងារឆាតដោយស្វ័យប្រវត្តិក្នុង Telegram។",
    },
    desc: {
      en: "Search the bot's username directly in Telegram, or open the Angket website and tap through to the bot. Then connect with its chat automation.",
      km: "ស្វែងរកឈ្មោះបូតនៅក្នុង Telegram ដោយផ្ទាល់ ឬចូលទៅកាន់គេហទំព័រ Angket ហើយចុចភ្ជាប់ទៅបូត។ បន្ទាប់មកភ្ជាប់ជាមួយមុខងារឆាតដោយស្វ័យប្រវត្តិ។",
    },
  },
  {
    num: 2,
    img: incomingContentImg,
    Icon: IconSend,
    title: { en: "Incoming message", km: "មាតិការសារដែលចូលមក" },
    tag: {
      en: "Someone Send or forward suspicious content​ to you.",
      km: "នរណាម្នាក់ផ្ញើ ឬបញ្ជូនបន្តមាតិកាគួរឱ្យសង្ស័យមកអ្នក។",
    },
    desc: {
      en: "The live scan mode will check them manually without you forward them to the bot.",
      km: "ជាមួយមុខងារវិភាគ​ឆាត និងជូនដំណឹងដោយស្វ័យប្រវត្តិនេះកាន់តែមានភាពងាយស្រួល​​ ដោយអ្នកមិនចាំបាច់ផ្ញើមាតិការនោះដោយខ្លួនឯងឡើយ។",
    },
  },
  {
    num: 3,
    img: checkingContentImg,
    Icon: IconBrain,
    title: { en: "Automatic analysis", km: "ការវិភាគស្វ័យប្រវត្តិ" },
    tag: {
      en: "The bot analyzes instantly.",
      km: "បូតនឹងវិភាគមាតិការដែលចូលមកនោះភ្លាមៗ",
    },
    desc: {
      en: "The bot automatically analyzes the message, link, or file it receives - no waiting around.",
      km: "បូតនឹងវិភាគសារ តំណភ្ជាប់ ឬឯកសារដែលទទួលបានដោយស្វ័យប្រវត្តិ ដោយមិនចាំបាច់រង់ចាំ។",
    },
  },
  {
    num: 4,
    img: resultImg,
    Icon: IconBell,
    title: { en: "User alert", km: "ការជូនដំណឹងដល់អ្នកប្រើប្រាស់" },
    tag: {
      en: "A clear alert with everything you need.",
      km: "ការជូនដំណឹងច្បាស់លាស់ជាមួយអ្វីដែលអ្នកត្រូវការ",
    },
    desc: {
      en: "You get an easy-to-understand alert so you can decide what to do next. You will get result with",
      km: "អ្នកនឹងទទួលបានការជូនដំណឹងងាយយល់ ដូចនេះអ្នកអាចសម្រេចចិត្តថាត្រូវធ្វើអ្វីបន្ទាប់។ ការជូនដំណឹងនឹងភ្ជាប់មកជាមួយ៖",
    },
    details: [
      { en: "Sender", km: "អ្នកផ្ញើ" },
      { en: "Date/time", km: "កាលបរិច្ឆេទ/ពេលវេលា" },
      { en: "Risk score", km: "ភាគរយហានិភ័យ" },
      { en: "Reasons", km: "មូលហេតុ" },
      { en: "Recommended actions", km: "សកម្មភាពដែលណែនាំគួរធ្វើបន្ទាប់" },
    ],
  },
]

export function TelegramBand() {
  const { t } = useLang()

  return (
    <section className="tg-band" id="telegram" aria-labelledby="tg-title">
      <div className="container">
        <Reveal className="tg-inner">
          <h2 id="tg-title">{t({ en: "Angket Bot Usage​ With Live Scan Mode", km: "របៀបប្រើប្រាស់ Bot Angket ជាមួយនឹងមុខងារវិភាគ​ និងជូនដំណឹងដោយស្វ័យប្រវត្តិ" })}</h2>
          <p className="tg-copy">
            {t({
              en: "With Live Scanning feature, the bot automatically scans incoming messages without requiring the user to forward them manually.",
              km: "ជាមួយនឹងមុខងារវិភាគ​ និងជូនដំណឹងដោយស្វ័យប្រវត្តិនេះ បូតនឹងធ្វើការស្កេន​ និងវិភាគមាតិការក្នុងសារដែលចូលមក ដោយអ្នកមិនចាំបាច់ផ្ញើទៅបូតផ្ទាល់នោះទេ។",
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