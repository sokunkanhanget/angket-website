import { useLang } from "@/lib/i18n"
import { TELEGRAM_BOT_URL } from "@/lib/data"
import { Reveal } from "./reveal"
import { IconSend, IconSearch, IconBrain, IconBell } from "./icons"
import connectBotImg from "@/assets/livescan/connect_bot.png"
import incomingContentImg from "@/assets/livescan/incoming_message.jpg"
import checkingContentImg from "@/assets/livescan/checking_content.png"
import resultImg from "@/assets/livescan/result.png"

const CONTAINER = "mx-auto w-full max-w-[1400px] px-6"

const BTN =
  "inline-flex items-center justify-center gap-2 rounded-full border cursor-pointer font-semibold whitespace-nowrap transition-[background-color,box-shadow,transform] duration-[180ms] ease-out"
const BTN_LG = "px-[1.7rem] py-[0.88rem] text-[1.03rem] km:pt-[0.62rem] km:pb-[0.62rem]"
const BTN_WHITE = "border-transparent bg-white text-blue-800 shadow-[0_8px_24px_rgba(4,16,46,0.28)] hover:bg-blue-50 hover:-translate-y-px"

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
    <section className="relative overflow-hidden bg-[radial-gradient(640px_340px_at_90%_0%,rgba(56,189,248,0.35),transparent_70%),radial-gradient(520px_320px_at_0%_100%,rgba(37,99,235,0.55),transparent_70%),linear-gradient(135deg,#0d1730,#1e40af)] text-white" id="telegram" aria-labelledby="tg-title">
      <div className={CONTAINER}>
        <Reveal className="text-left">
          <h2 className="mt-[1rem] mb-[0.7rem] text-[clamp(1.7rem,3.6vw,2.3rem)]" id="tg-title">{t({ en: "Angket Bot Usage​ With Live Scan Mode", km: "របៀបប្រើប្រាស់ Bot Angket ជាមួយនឹងមុខងារវិភាគ​ និងជូនដំណឹងដោយស្វ័យប្រវត្តិ" })}</h2>
          <p className="text-[1.04rem] text-[#c9d8f5]">
            {t({
              en: "With Live Scanning feature, the bot automatically scans incoming messages without requiring the user to forward them manually.",
              km: "ជាមួយនឹងមុខងារវិភាគ​ និងជូនដំណឹងដោយស្វ័យប្រវត្តិនេះ បូតនឹងធ្វើការស្កេន​ និងវិភាគមាតិការក្នុងសារដែលចូលមក ដោយអ្នកមិនចាំបាច់ផ្ញើទៅបូតផ្ទាល់នោះទេ។",
            })}
          </p>

          <Reveal
            as="ol"
            className="mt-[2.1rem] mb-[2.2rem] flex list-none flex-nowrap items-stretch gap-2 p-0 max-[1024px]:overflow-x-auto max-[1024px]:[-webkit-overflow-scrolling:touch] max-[1024px]:[scroll-snap-type:x_mandatory] max-[1024px]:[overscroll-behavior-x:contain] max-[640px]:flex-wrap max-[640px]:overflow-x-visible max-[640px]:[scroll-snap-type:none]"
          >
            {FLOW.map((step) => (
              <li className="relative flex min-w-0 flex-col rounded-[20px] border border-[#e3e9f3] bg-surface px-3 pt-3 pb-5 text-left transition-[box-shadow,transform] duration-200 hover:-translate-y-[3px] hover:shadow-md flex-[1_1_0%] max-[1024px]:flex-[0_0_240px] max-[1024px]:[scroll-snap-align:start] max-[640px]:flex-[1_1_100%] max-[640px]:[scroll-snap-align:none]" key={step.num}>
                <span className="absolute -top-[14px] left-0 z-[2] grid h-[30px] w-[30px] place-items-center rounded-full bg-blue-600 text-[0.8rem] font-bold text-white shadow-sm" aria-hidden="true">
                  {String(step.num).padStart(2, "0")}
                </span>
                <div className="relative mb-4 grid aspect-[325/406] w-full flex-none place-items-center overflow-hidden rounded-[8px] border border-[#e3e9f3] bg-blue-50">
                  {step.img ? (
                    <img className="block h-full w-full object-contain" src={step.img} alt={t(step.title)} loading="lazy" />
                  ) : (
                    <span className="text-[0.75rem] font-semibold text-blue-500">
                      {t({ en: "Add screenshot", km: "បន្ថែមរូបថតអេក្រង់" })}
                    </span>
                  )}
                </div>
                <div className="mb-[10px] flex items-center gap-[0.7rem]">
                  <span className="grid h-8 w-8 flex-none place-items-center rounded-[12px] border border-blue-100 bg-blue-50 text-blue-700" aria-hidden="true">
                    <step.Icon style={{ width: 16, height: 16 }} />
                  </span>
                  <h3 className="m-0 text-[1rem] font-bold leading-[1.3] text-ink">{t(step.title)}</h3>
                </div>
                <p className="mb-[6px] text-[0.875rem] font-semibold leading-[1.4] text-blue-700">{t(step.tag)}</p>
                <p className="mt-[6px] text-[0.8125rem] leading-[1.6] text-[#56657f]">{t(step.desc)}</p>
                {step.details && (
                  <ul className="m-0 mt-auto flex list-none flex-wrap gap-[0.35rem_0.5rem] p-0 pt-3">
                    {step.details.map((d) => (
                      <li className="inline-flex items-center gap-[0.35rem] rounded-full border border-blue-100 bg-blue-50 px-[0.5rem] py-[0.25rem] text-[0.68rem] font-semibold text-blue-700 before:content-[''] before:h-[6px] before:w-[6px] before:rounded-full before:bg-blue-500" key={d.en}>{t(d)}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </Reveal>

          <div className="flex flex-wrap justify-start gap-[0.9rem]">
            <a className={`${BTN} ${BTN_WHITE} ${BTN_LG}`} href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer">
              <IconSend />
              <span>{t({ en: "Open Angket on Telegram", km: "បើក Angket នៅលើ Telegram" })}</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}