import { useLang } from "@/lib/i18n"
import { Reveal } from "./reveal"
import { TelegramBand } from "./telegram"
import { IconInfo, IconSearch, IconSend, IconBot, IconWarning } from "./icons"
import searchingBotImg from "@/assets/telegrambot/searching_bot.jpg"
import sendContentImg from "@/assets/telegrambot/send_content.jpg"
import analyseContentImg from "@/assets/telegrambot/analyse_content.jpg"
import getResultImg from "@/assets/telegrambot/get_result.jpg"

const FLOW = [
  {
    num: 1,
    img: searchingBotImg,
    Icon: IconSearch,
    title: { en: "Find the bot", km: "ស្វែងរកបូត" },
    tag: {
      en: "Get the bot on Telegram.",
      km: "ទទួលបានបូត Angket លើ Telegram",
    },
    desc: {
      en: "Search for the bot's username directly in Telegram, or open the Angket website and tap through to the bot.",
      km: "ស្វែងរកឈ្មោះបូតនៅក្នុង Telegram ដោយផ្ទាល់ ឬចូលទៅកាន់គេហទំព័រ Angket ហើយចុចភ្ជាប់ទៅបូតដោយផ្ទាល់។",
    },
  },
  {
    num: 2,
    img: sendContentImg,
    Icon: IconSend,
    title: { en: "Send it", km: "ផ្ញើវា" },
    tag: {
      en: "Send something suspicious.",
      km: "ផ្ញើអ្វីដែលអ្នកសង្ស័យ",
    },
    desc: {
      en: "Send or forward a suspicious message, link, or file to the bot.",
      km: "ផ្ញើ ឬបញ្ជូនបន្តសារ តំណភ្ជាប់ ឬឯកសារដែលគួរឱ្យសង្ស័យទៅកាន់បូត។",
    },
  },
  {
    num: 3,
    img: analyseContentImg,
    Icon: IconBot,
    title: { en: "Analyze", km: "វិភាគ" },
    tag: {
      en: "The bot analyzes your content.",
      km: "បូតវិភាគមាតិការបស់អ្នក",
    },
    desc: {
      en: "After you send the content, the bot analyzes the message, link, or file.",
      km: "បន្ទាប់ពីអ្នកផ្ញើរួច បូតនឹងវិភាគសារ តំណភ្ជាប់ ឬឯកសារនោះ។",
    },
  },
  {
    num: 4,
    img: getResultImg,
    Icon: IconWarning,
    title: { en: "Get the result", km: "ទទួលលទ្ធផល" },
    tag: {
      en: "Get a clear warning or confirmation.",
      km: "ទទួលបានការព្រមាន ឬការបញ្ជាក់ច្បាស់លាស់",
    },
    desc: {
      en: "You'll see an easy-to-understand result that warns you or confirms the content is safe.",
      km: "អ្នកនឹងឃើញលទ្ធផលងាយយល់ ដែលព្រមានអ្នក ឬបញ្ជាក់ថាមាតិកាមានសុវត្ថិភាព។",
    },
  },
]

export function HowItWorks() {
  const { t } = useLang()

  return (
    <>
      <section className="how" id="how" aria-labelledby="how-title">
        <div className="container">
          <Reveal className="section-head">
            <h2 id="how-title">{t({ en: "How Angket Works", km: "របៀបដែល Angket ដំណើរការ" })}</h2>
            <p>
              {t({
                en: "Angket makes it simple to check suspicious content through Telegram. Just send it to the Angket bot, review the results, and decide what to do next.",
                km: "Angket ធ្វើឱ្យការពិនិត្យមាតិកាដែលគួរឱ្យសង្ស័យតាមរយៈ Telegram មានភាពងាយស្រួល។ គ្រាន់តែផ្ញើមាតិកាទៅកាន់បូត Angket ពិនិត្យលទ្ធផល ហើយសម្រេចចិត្តថាតើអ្នកគួរធ្វើអ្វីបន្ទាប់។",
              })}
            </p>
          </Reveal>

          <Reveal as="ol" className="flow">
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
              </li>
            ))}
          </Reveal>

          <p className="how-note">
            <IconInfo />
            <span>
              {t({
                en: "Note: Angket provides an estimated risk assessment based on detected patterns. It does not guarantee that content is safe or fraudulent.",
                km: "ចំណាំ៖ Angket ផ្តល់ការប៉ាន់ស្មានកម្រិតហានិភ័យ ដោយផ្អែកលើលំនាំ និងសញ្ញាដែលបានរកឃើញ។ លទ្ធផលនេះមិនមែនជាការធានាថាមាតិកានោះមានសុវត្ថិភាព ឬជាការបោកប្រាស់ជាក់លាក់នោះទេ។",
              })}
            </span>
          </p>
        </div>
      </section>
      <TelegramBand />
    </>
  )
}