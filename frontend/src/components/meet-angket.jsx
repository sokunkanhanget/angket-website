import { useLang } from "@/lib/i18n"
import { Reveal } from "./reveal"
import {
  IconShield,
  IconBot,
  IconEye,
  IconFlag,
  IconFile,
  IconSearch,
  IconCheckDouble,
  IconBell,
  IconZap,
  IconUsers,
  IconGlobe,
  IconArrowRight,
  IconBrain,
} from "./icons"

const CONTAINER = "mx-auto w-full max-w-[1440px] px-[clamp(1rem,4vw,3rem)]"

const ICON_BASE = "grid h-[54px] w-[54px] flex-none place-items-center rounded-[15px] border"
const ICON_BLUE = `${ICON_BASE} border-blue-100 bg-blue-50 text-blue-600`
const ICON_ORANGE = `${ICON_BASE} border-[#fce3b5] bg-[#fef3e2] text-[#c2701b]`
const ICON_GREEN = `${ICON_BASE} border-[#c9eeda] bg-[#eafaf2] text-[#14713d]`

const LIST_BASE = "h-[19px] w-[19px] shrink-0 mt-[2px]"
const LIST_BLUE = `${LIST_BASE} text-blue-600`
const LIST_ORANGE = `${LIST_BASE} text-[#c2701b]`
const LIST_GREEN = `${LIST_BASE} text-[#14713d]`

export function MeetAngket() {
  const { t } = useLang()

  return (
    <section id="meet-angket" className="relative overflow-hidden border-y border-[#e3e9f3] bg-[radial-gradient(600px_320px_at_92%_0%,rgba(147,197,253,0.2),transparent_70%),linear-gradient(180deg,#ffffff_0%,#eef4ff_100%)] py-[clamp(4rem,7vw,6rem)]" aria-labelledby="meet-angket-title">
      <div className={CONTAINER}>
        <Reveal className="mb-[3rem]">
          <h2 id="meet-angket-title" className="m-0 mb-[1rem] text-[clamp(1.7rem,3.4vw,2.35rem)] font-bold leading-[1.2] tracking-[-0.02em] text-ink">
            {t({
              en: "Meet Angket",
              km: "ស្គាល់ Angket",
            })}
          </h2>
          <p className="text-[1.05rem] leading-[1.75] text-[#56657f]">
            {t({
              en: "Angket combines AI-assisted analysis with community awareness to help users better understand potential digital threats. Our platform provides three main features:",
              km: "Angket រួមបញ្ចូលការវិភាគដែលជួយដោយ AI ជាមួយការយល់ដឹងរបស់សហគមន៍ដើម្បីជួយអ្នកប្រើប្រាស់យល់ពីការគំរាមកំហែងឌីជីថលដែលអាចកើតមាន។ វេទិការបស់យើងផ្តល់មុខងារសំខាន់ៗបី៖",
            })}
          </p>
        </Reveal>
        <Reveal className="grid grid-cols-3 gap-[1.5rem] max-[1020px]:grid-cols-2 max-[720px]:grid-cols-1">
          {/* Telegram Bot */}
          <div className="rounded-[20px] border border-[#e3e9f3] bg-white px-[1.6rem] py-[1.9rem] shadow-sm transition-[box-shadow,transform] duration-200 hover:-translate-y-[4px] hover:shadow-md">
            <div className="mb-[1.2rem] flex items-center gap-[0.95rem]">
              <div className={ICON_BLUE}>
                <IconBot style={{ width: 26, height: 26 }} />
              </div>
              <h3 className="m-0 text-[1.2rem] font-bold text-ink">
                {t({ en: "Telegram Bot", km: "Telegram Bot" })}
              </h3>
            </div>
            <p className="mb-[1.2rem] text-[0.94rem] leading-[1.7] text-[#56657f]">
              {t({
                en: "Users can send suspicious content directly to the Angket Telegram Bot, including messages, links and URLs, and files.",
                km: "អ្នកប្រើប្រាស់អាចផ្ញើសារសង្ស័យផ្ទាល់ទៅ Angket Telegram Bot រួមទាំងសារ តំណភ្ជាប់ និងឯកសារ។",
              })}
            </p>
            <ul className="m-0 flex list-none flex-col gap-[0.65rem] p-0">
              <li className="flex items-start gap-[0.6rem] text-[0.9rem] leading-[1.5] text-text">
                <IconShield className={LIST_BLUE} />
                {t({ en: "Risk level or risk score", km: "កម្រិតហានិភ័យ ឬពិន្ទុហានិភ័យ" })}
              </li>
              <li className="flex items-start gap-[0.6rem] text-[0.9rem] leading-[1.5] text-text">
                <IconFile className={LIST_BLUE} />
                {t({ en: "Reasons behind the assessment", km: "ហេតុផលនៃការវាយតម្លៃ" })}
              </li>
              <li className="flex items-start gap-[0.6rem] text-[0.9rem] leading-[1.5] text-text">
                <IconSearch className={LIST_BLUE} />
                {t({ en: "Suspicious patterns detected", km: "លំនាំសង្ស័យដែលរកឃើញ" })}
              </li>
              <li className="flex items-start gap-[0.6rem] text-[0.9rem] leading-[1.5] text-text">
                <IconArrowRight className={LIST_BLUE} />
                {t({ en: "Recommended next steps", km: "ណែនាំជំហានបន្ទាប់ដែលគួរអនុវត្ត" })}
              </li>
            </ul>
          </div>

          {/* Live Scan Mode */}
          <div className="rounded-[20px] border border-[#e3e9f3] bg-white px-[1.6rem] py-[1.9rem] shadow-sm transition-[box-shadow,transform] duration-200 hover:-translate-y-[4px] hover:shadow-md">
            <div className="mb-[1.2rem] flex items-center gap-[0.95rem]">
              <div className={ICON_ORANGE}>
                <IconEye style={{ width: 26, height: 26 }} />
              </div>
              <h3 className="m-0 text-[1.2rem] font-bold text-ink">
                {t({ en: "Live Scan Mode", km: "Live Scan Mode" })}
              </h3>
            </div>
            <p className="mb-[1.2rem] text-[0.94rem] leading-[1.7] text-[#56657f]">
              {t({
                en: "When enabled, Live Scan Mode helps users monitor incoming messages and identify potentially suspicious activity.",
                km: "នៅពេលបើក Live Scan Mode ជួយឲអ្នកប្រើប្រាស់ត្រួតពិនិត្យសារចូល និងកំណត់សកម្មភាពសង្ស័យបានលឿនជាងមុន។",
              })}
            </p>
            <ul className="m-0 flex list-none flex-col gap-[0.65rem] p-0">
              <li className="flex items-start gap-[0.6rem] text-[0.9rem] leading-[1.5] text-text">
                <IconEye className={LIST_ORANGE} />
                {t({ en: "Monitor incoming messages automatically", km: "ត្រួតពិនិត្យសារចូលដោយស្វ័យប្រវត្តិ" })}
              </li>
              <li className="flex items-start gap-[0.6rem] text-[0.9rem] leading-[1.5] text-text">
                <IconBell className={LIST_ORANGE} />
                {t({ en: "Receive alerts for suspicious content", km: "ទទួលការជូនដំណឹងសម្រាប់មាតិកាសង្ស័យ" })}
              </li>
              <li className="flex items-start gap-[0.6rem] text-[0.9rem] leading-[1.5] text-text">
                <IconZap className={LIST_ORANGE} />
                {t({ en: "Get instant risk analysis", km: "ទទួលការវិភាគហានិភ័យភ្លាមៗ" })}
              </li>
              <li className="flex items-start gap-[0.6rem] text-[0.9rem] leading-[1.5] text-text">
                <IconCheckDouble className={LIST_ORANGE} />
                {t({ en: "No manual checking needed", km: "មិនចាំបាច់ពិនិត្យដោយដៃ" })}
              </li>
            </ul>
          </div>

          {/* Community Reporting */}
          <div className="rounded-[20px] border border-[#e3e9f3] bg-white px-[1.6rem] py-[1.9rem] shadow-sm transition-[box-shadow,transform] duration-200 hover:-translate-y-[4px] hover:shadow-md">
            <div className="mb-[1.2rem] flex items-center gap-[0.95rem]">
              <div className={ICON_GREEN}>
                <IconFlag style={{ width: 26, height: 26 }} />
              </div>
              <h3 className="m-0 text-[1.2rem] font-bold text-ink">
                {t({ en: "Community Reporting", km: "របាយការណ៍សហគមន៍" })}
              </h3>
            </div>
            <p className="mb-[1.2rem] text-[0.94rem] leading-[1.7] text-[#56657f]">
              {t({
                en: "Through the Angket website, users can report scam experiences and suspicious activities to help others.",
                km: "តាមរយៈគេហទំព័រ Angket អ្នកប្រើប្រាស់អាចរាយការណ៍ពីបទពិសោធន៍បោកប្រាស់ និងសកម្មភាពសង្ស័យដើម្បីជួយអ្នកដទៃ។",
              })}
            </p>
            <ul className="m-0 flex list-none flex-col gap-[0.65rem] p-0">
              <li className="flex items-start gap-[0.6rem] text-[0.9rem] leading-[1.5] text-text">
                <IconEye className={LIST_GREEN} />
                {t({ en: "Increase awareness of common scams", km: "បង្កើនការយល់ដឹងពីការបោកប្រាស់ជាទូទៅ" })}
              </li>
              <li className="flex items-start gap-[0.6rem] text-[0.9rem] leading-[1.5] text-text">
                <IconUsers className={LIST_GREEN} />
                {t({ en: "Identify threats targeting multiple people", km: "កំណត់ការគំរាមកំហែងដែលកំណត់គោលដៅមនុស្សជាច្រើន" })}
              </li>
              <li className="flex items-start gap-[0.6rem] text-[0.9rem] leading-[1.5] text-text">
                <IconGlobe className={LIST_GREEN} />
                {t({ en: "Help others recognize similar activities", km: "ជួយអ្នកដទៃស្គាល់សកម្មភាពដែលដូចគ្នា" })}
              </li>
              <li className="flex items-start gap-[0.6rem] text-[0.9rem] leading-[1.5] text-text">
                <IconBrain className={LIST_GREEN} />
                {t({ en: "Build collective digital awareness", km: "សាងសង់ការយល់ដឹងឌីជីថលរួមគ្នា" })}
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}