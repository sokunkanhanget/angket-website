import { useLang } from "@/lib/i18n"
import { Reveal } from "./reveal"
import { TelegramBand } from "./telegram"
import { IconInfo, IconSearch, IconSend, IconBot, IconWarning } from "./icons"
import searchingBotImg from "@/assets/telegrambot/searching_bot.jpg"
import sendContentImg from "@/assets/telegrambot/send_content.jpg"
import analyseContentImg from "@/assets/telegrambot/analyse_content.jpg"
import getResultImg from "@/assets/telegrambot/get_result.jpg"

const CONTAINER = "mx-auto w-full max-w-[1400px] px-6"

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
    title: { en: "Send it", km: "ផ្ញើមាតិការ" },
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
    title: { en: "Analyze​ and Evaluate", km: "វិភាគ និង ​វាតម្លៃ" },
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
      km: "អ្នកនឹងឃើញលទ្ធផលងាយយល់ ដែលអាចជាការព្រមានអ្នក ឬបញ្ជាក់ថាមាតិកាមានសុវត្ថិភាពឬអត់។",
    },
  },
]

export function HowItWorks() {
  const { t } = useLang()

  return (
    <>
      <section className="border-y border-[#e3e9f3] bg-white" id="how" aria-labelledby="how-title">
        <div className={CONTAINER}>
          <Reveal className="mb-10">
            <h2 className="mt-[0.9rem] mb-[0.6rem] text-[clamp(1.6rem,3.4vw,2.15rem)] font-bold" id="how-title">{t({ en: "How Angket Works", km: "របៀបដែល Angket ដំណើរការ" })}</h2>
            <p className="text-[1.02rem] text-[#56657f]">
              {t({
                en: "Angket makes it simple to check suspicious content through Telegram. Just send it to the Angket bot, review the results, and decide what to do next.",
                km: "Angket ធ្វើឱ្យការពិនិត្យមាតិកាដែលគួរឱ្យសង្ស័យតាមរយៈ Telegram មានភាពងាយស្រួល។ គ្រាន់តែផ្ញើមាតិកាទៅកាន់ Angket Bot ពិនិត្យលទ្ធផល ហើយអ្នកអាចសម្រេចចិត្តថាតើអ្នកគួរធ្វើអ្វីបន្ទាប់។",
              })}
            </p>
          </Reveal>

          <Reveal
            as="ol"
            className="m-0 flex list-none flex-nowrap items-stretch gap-2 p-0 max-[1024px]:overflow-x-auto max-[1024px]:[-webkit-overflow-scrolling:touch] max-[1024px]:[scroll-snap-type:x_mandatory] max-[1024px]:[overscroll-behavior-x:contain] max-[640px]:flex-wrap max-[640px]:overflow-x-visible max-[640px]:[scroll-snap-type:none]"
          >
            {FLOW.map((step) => (
              <li className="relative flex min-w-0 flex-col rounded-[20px] border border-[#e3e9f3] bg-surface px-3 pt-3 pb-5 text-left transition-[box-shadow,transform] duration-200 hover:-translate-y-[3px] hover:shadow-md flex-[1_1_0%] max-[1024px]:flex-[0_0_240px] max-[1024px]:[scroll-snap-align:start] max-[640px]:flex-[1_1_100%] max-[640px]:[scroll-snap-align:none]" key={step.num}>
                <span className="absolute -top-[14px] left-0 z-[2] grid h-[30px] w-[30px] place-items-center rounded-full bg-blue-600 text-[0.8rem] font-bold text-white shadow-sm" aria-hidden="true">
                  {String(step.num).padStart(2, "0")}
                </span> 
                <div className="relative mb-4 grid aspect-[4/3] w-full flex-none place-items-center overflow-hidden rounded-[8px] border border-[#e3e9f3] bg-blue-50">
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
                  <h3 className="m-0 text-[1rem] font-bold leading-[1.3]">{t(step.title)}</h3>
                </div>
                <p className="mb-[6px] text-[0.875rem] font-semibold leading-[1.4] text-blue-700">{t(step.tag)}</p>
                <p className="mt-[6px] text-[0.8125rem] leading-[1.6] text-[#56657f]">{t(step.desc)}</p>
              </li>
            ))}
          </Reveal>

          <p className="mt-[2.3rem] flex items-baseline justify-start gap-[0.55rem] text-left text-[0.87rem] text-faint">
            <IconInfo className="flex-none text-blue-500 [transform:translateY(2px)]" />
            <span>
              {t({
                en: "Note: Angket provides an estimated risk assessment based on detected patterns.",
                km: "ចំណាំ៖ Angket ផ្តល់ការប៉ាន់ស្មានកម្រិតហានិភ័យ ដោយផ្អែកលើលំនាំ និងសញ្ញាដែលបានរកឃើញ។",
              })}
            </span>
          </p>
        </div>
      </section>
      <TelegramBand />
    </>
  )
}