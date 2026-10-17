import { Link } from "react-router-dom"
import { useLang } from "@/lib/i18n"
import { TELEGRAM_BOT_URL } from "@/lib/data"
import { IconSend, IconShield, IconWarning, IconCheckDouble, IconFlag } from "./icons"
import HeroHomepage from "@/assets/Hero-Homepage.png"
import HeroImg from "@/assets/HeroImg.jpg"

const CONTAINER = "mx-auto w-full max-w-[1440px] px-[clamp(1rem,4vw,3rem)]"
const BTN_LG =
  "inline-flex items-center justify-center gap-2 rounded-full border cursor-pointer px-[1.7rem] py-[0.88rem] text-[1.03rem] font-semibold whitespace-nowrap transition-[background-color,box-shadow,transform] duration-[180ms] ease-out km:pt-[0.62rem] km:pb-[0.62rem] max-[600px]:flex-[1_1_100%] max-[600px]:justify-center"

export function Hero() {
  const { lang, t } = useLang()

  return (
    <section
      className="relative overflow-hidden bg-surface pt-[4.75rem] pb-[5.25rem] max-[600px]:pt-[3.2rem] max-[600px]:pb-[3.8rem]"
      id="home"
      aria-labelledby="hero-title"
      style={{ backgroundImage: `url(${HeroHomepage})` }}
    >
      <div
        className={`relative z-[1] ${CONTAINER} grid grid-cols-[1.04fr_0.96fr] items-center gap-[3.25rem] max-[1020px]:grid-cols-1 max-[1020px]:gap-[2.6rem]`}
      >
        <div>
          <h1
            id="hero-title"
            className="rise d1 text-[clamp(2.05rem,4.6vw,3.15rem)] font-bold leading-[1.13] tracking-[-0.03em] my-4"
          >
            {lang === "en" ? (
              <>
                Not Sure If It is a <span className="text-red-600">Scam</span>? Check Before You Trust.
              </>
            ) : (
              <>
                {t({ km: "មិនច្បាស់ថាវាជា" })}
                <span className="text-red-600">{t({ km: "ការបោកប្រាស់" })}</span>
                {t({ km: "មែនដែរឬទេ? ពិនិត្យមុនពេលធ្វើការសម្រេចចិត្ត" })}
              </>
            )}
          </h1>
          <p className="rise d2 text-[#111] text-[clamp(1rem,1.6vw,1.11rem)]">
            {t({
              en: "Angket helps you find and identify suspicious messages, documents, links, and online information through our automated assistant on Telegram. You can get risk review and analysis, understand suspicious patterns or signs to help you assess the situation and make safer decisions.",
              km: "Angket ជួយអ្នកស្វែងរក និងកំណត់អត្តសញ្ញាណសារ ឯកសារ តំណភ្ជាប់ និងព័ត៌មានដែលគួរឱ្យសង្ស័យនៅលើអ៊ីនធឺណិត តាមរយៈ កម្មវិធីជំនួយស្វ័យប្រវត្តិនៅលើតេលេក្រាមរបស់យើង។ អ្នកអាចទទួលបានការពិនិត្យ និងវិភាគកម្រិតហានិភ័យ ព្រមទាំងស្វែងយល់ពីលំនាំ ឬសញ្ញាដែលគួរឱ្យសង្ស័យ ដើម្បីជួយអ្នកវាយតម្លៃស្ថានភាព និងសម្រេចចិត្តបានកាន់តែមានសុវត្ថិភាព។",
            })}
          </p>
          <div className="rise d3 flex flex-wrap gap-[0.8rem] mt-[1.8rem]">
            <a
              className={`${BTN_LG} border-transparent bg-blue-800 text-white shadow-sm hover:bg-blue-700 hover:-translate-y-px`}
              href={TELEGRAM_BOT_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconSend />
              <span>{t({ en: "Check with Telegram", km: "ពិនិត្យតាម Telegram" })}</span>
            </a>
            <Link
              className={`${BTN_LG} border-blue-200 bg-white text-blue-700 hover:bg-blue-50`}
              to="/report"
            >
              <IconFlag />
              <span>{t({ en: "Scam Report", km: "រាយការណ៍ការបោកប្រាស់" })}</span>
            </Link>
          </div>
        </div>

        <div className="rise d3 relative isolate grid w-full max-w-[430px] mx-auto place-items-center pt-4 pb-6">
          <span
            aria-hidden="true"
            className="absolute top-10 bottom-3 left-1/2 -z-10 w-[min(290px,82%)] -translate-x-[45%] rotate-[4deg] rounded-[32px] border border-white/70 bg-white shadow-[0_20px_45px_rgba(15,23,42,0.12)] max-[600px]:top-8 max-[600px]:bottom-2 max-[600px]:w-[min(250px,82%)]"
          />
          <img
            className="block w-[min(100%,290px)] max-h-[610px] object-contain border-[9px] border-[#171923] rounded-[30px] shadow-[0_28px_60px_rgba(15,23,42,0.3),0_0_0_1px_rgba(255,255,255,0.28)] max-[600px]:w-[min(100%,250px)] max-[600px]:border-[7px] max-[600px]:rounded-[24px]"
            src={HeroImg}
            alt={t({
              en: "Angket Bot reviewing a suspicious file in a Telegram conversation.",
              km: "Angket Bot ពិនិត្យឯកសារគួរឱ្យសង្ស័យនៅក្នុងការសន្ទនា Telegram។",
            })}
          />
          <div
            className="hidden"
            role="img"
            aria-label={t({
              en: "Example conversation: a forwarded prize message, and Angket replying with an estimated scam risk of 86 percent, the reasons it may be suspicious, and a safety recommendation.",
              km: "គំរូការសន្ទនា៖ សាររង្វាន់ដែលបានបញ្ជូនបន្ត ហើយ Angket ឆ្លើយតបដោយប៉ាន់ស្មានហានិភ័យបោកប្រាស់ ៨៦ ភាគរយ ជាមួយមូលហេតុ និងអនុសាសន៍សុវត្ថិភាព។",
            })}
          >
            <div
              className="bg-white border border-[#e3e9f3] rounded-[26px] shadow-lg p-[0.7rem]"
              aria-hidden="true"
            >
              <div className="flex items-center gap-[0.65rem] bg-[linear-gradient(135deg,#38bdf8,#0369a1)] text-white rounded-t-[18px] rounded-b-[6px] px-[0.9rem] py-[0.7rem]">
                <span className="grid w-[34px] h-[34px] place-items-center rounded-full bg-white/20">
                  <IconShield check style={{ width: 18, height: 18 }} />
                </span>
                <div>
                  <strong className="block text-[0.92rem] leading-[1.2]">Angket Bot</strong>
                  <small className="text-[0.72rem] opacity-85">{t({ en: "online", km: "លើបណ្ដាញ" })}</small>
                </div>
              </div>
              <div className="grid gap-[0.6rem] mt-0.5 bg-[#eef3f9] rounded-t-[6px] rounded-b-[18px] p-[0.85rem]">
                <div className="ml-auto max-w-[94%] rounded-[14px] rounded-br-[4px] bg-blue-600 px-[0.8rem] py-[0.6rem] text-[0.85rem] leading-[1.5] text-white">
                  <span className="mb-1 block text-[0.68rem] font-bold uppercase tracking-[0.05em] opacity-75">
                    {t({ en: "Forwarded message", km: "សារបញ្ជូនបន្ត" })}
                  </span>
                  <span>
                    {t({
                      en: "Congratulations! You won a $500 cash prize. Pay a $15 processing fee​ now to claim your reward.",
                      km: "អបអរសាទរ! អ្នកបានទទួលរង្វាន់ជាសាច់ប្រាក់ 500 ដុល្លារ។ សូមបង់ថ្លៃ 15 ដុល្លារឥឡូវនេះ​ ដើម្បីទទួលបានរង្វាន់ភ្លាមៗ",
                    })}
                  </span>
                  <span className="mt-[0.3rem] block text-right text-[0.68rem] opacity-55">12:03</span>
                </div>
                <div className="max-w-[94%] rounded-[14px] rounded-bl-[4px] border border-[#e3e9f3] bg-white px-[0.8rem] py-[0.6rem] text-[0.85rem] leading-[1.5]">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <h3 className="flex items-center gap-[0.4rem] text-[0.9rem] tracking-[-0.01em]">
                      <IconWarning style={{ width: 15, height: 15, color: "#b45309" }} />
                      <span>{t({ en: "Percentage of scam", km: "ភាគរយនៃការបោកប្រាស់" })}</span>
                    </h3>
                    <span className="rounded-full border border-amber-border bg-amber-bg px-[0.6rem] py-[0.14rem] text-[0.72rem] font-bold text-amber-text">
                      {t({ en: "Potentially risky", km: "អាចមានហានិភ័យ" })}
                    </span>
                  </div>
                  <div className="flex items-center gap-[0.9rem] pt-[0.15rem] pb-[0.4rem]">
                    <div className="relative h-[76px] w-[76px] flex-none">
                      <svg viewBox="0 0 80 80" className="h-full w-full">
                        <circle className="fill-none stroke-blue-100 stroke-[8]" cx="40" cy="40" r="34" />
                        <circle
                          className="fill-none stroke-red-600 stroke-[8] [stroke-linecap:round] [stroke-dasharray:213.6] [stroke-dashoffset:29.9]"
                          cx="40"
                          cy="40"
                          r="34"
                          transform="rotate(-90 40 40)"
                        />
                      </svg>
                      <div className="absolute inset-0 grid place-content-center text-center">
                        <strong className="font-display text-[1.28rem] leading-none text-red-600">86%</strong>
                        <span className="text-[0.56rem] font-bold uppercase tracking-[0.07em] text-faint">
                          {t({ en: "estimate", km: "ប៉ាន់ស្មាន" })}
                        </span>
                      </div>
                    </div>
                    <p className="text-[0.78rem] text-[#56657f]">
                      <span>
                        {t({
                          en: "This message shows several scam patterns.",
                          km: "ចំណុចចំនួននៃសារនេះបង្ហាញពីលំនាំនៃការបោកប្រាស់",
                        })}
                      </span>
                    </p>
                  </div>
                  <p className="mt-[0.35rem] mb-[0.25rem] text-[0.78rem] font-bold text-ink">
                    {t({ en: "Why it may be suspicious", km: "មូលហេតុដែលវាគួរឲ្យសង្ស័យ" })}
                  </p>
                  <ul>
                    <li className="flex items-baseline gap-[0.4rem] py-[0.1rem] text-[0.79rem] text-text">
                      <span className="font-extrabold text-red-600">•</span>
                      {t({ en: "Urgency pressure (“pay now”)", km: "សូមបង់ប្រាក់ឥឡូវនេះ" })}
                    </li>
                    <li className="flex items-baseline gap-[0.4rem] py-[0.1rem] text-[0.79rem] text-text">
                      <span className="font-extrabold text-red-600">•</span>
                      {t({ en: "Asks for an upfront payment", km: "ទាមទារឲបង់ប្រាក់មុន" })}
                    </li>
                    <li className="flex items-baseline gap-[0.4rem] py-[0.1rem] text-[0.79rem] text-text">
                      <span className="font-extrabold text-red-600">•</span>
                      {t({ en: "Rewards from Unknown Sources ​​​​​​​​​", km: "រង្វាន់ដែលគ្មានប្រភពច្បាស់លាស់" })}
                    </li>
                  </ul>
                  <p className="mt-[0.55rem] flex items-start gap-2 rounded-[10px] border border-green-border bg-green-bg px-[0.7rem] py-[0.55rem] text-[0.78rem] leading-[1.5] text-green-text">
                    <IconShield check className="mt-[0.12rem]" />
                    <span>
                      {t({
                        en: "Suggested next step: don’t pay or share personal information. Verify first.",
                        km: "ជំហានបន្ទាប់ដែលផ្ដល់យោបល់៖ កុំបង់ប្រាក់ ឬចែករំលែកព័ត៌មានផ្ទាល់ខ្លួន។ ផ្ទៀងផ្ទាត់ជាមុនសិន។",
                      })}
                    </span>
                  </p>
                  <span className="mt-[0.3rem] block text-right text-[0.68rem] opacity-55">
                    12:04 <IconCheckDouble style={{ width: 11, height: 11 }} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
