import { useLang } from "@/lib/i18n"
import { Reveal } from "./reveal"
import { TelegramBand } from "./telegram"
import { IconInfo, IconSend, IconBot, IconChart, IconShield, IconArrowRight } from "./icons"

const FLOW = [
  {
    num: 1,
    Icon: IconSend,
    title: { en: "Send", km: "ផ្ញើ" },
    tag: {
      en: "Send something suspicious.",
      km: "ផ្ញើអ្វីដែលអ្នកសង្ស័យ",
    },
    desc: {
      en: "Forward a suspicious message, link, URL, or file to the Angket Telegram Bot.",
      km: "បញ្ជូនបន្តសារ តំណភ្ជាប់ URL ឬឯកសារដែលគួរឱ្យសង្ស័យទៅកាន់ បូត Telegram របស់ Angket។",
    },
  },
  {
    num: 2,
    Icon: IconBot,
    title: { en: "Check", km: "ពិនិត្យ" },
    tag: {
      en: "Angket looks for warning signs.",
      km: "Angket ស្វែងរកសញ្ញាគួរឱ្យសង្ស័យ",
    },
    desc: {
      en: "Angket analyzes the content and checks for patterns and indicators commonly associated with online scams.",
      km: "Angket វិភាគមាតិកា និងពិនិត្យរកលំនាំ ឬសញ្ញាដែលជាទូទៅអាចពាក់ព័ន្ធនឹងការបោកប្រាស់តាមអ៊ីនធឺណិត។",
    },
  },
  {
    num: 3,
    Icon: IconChart,
    title: { en: "Understand", km: "ស្វែងយល់" },
    tag: {
      en: "See the risk and why it was flagged.",
      km: "មើលកម្រិតហានិភ័យ និងមូលហេតុ",
    },
    desc: {
      en: "Get an estimated scam risk percentage together with a clear explanation of the warning signs detected.",
      km: "ទទួលបាន ភាគរយប៉ាន់ស្មាននៃហានិភ័យនៃការបោកប្រាស់ ព្រមទាំងការពន្យល់ច្បាស់លាស់អំពីសញ្ញាគួរឱ្យសង្ស័យដែលបានរកឃើញ។",
    },
  },
  {
    num: 4,
    Icon: IconShield,
    title: { en: "Stay Safe", km: "ការពារ" },
    tag: {
      en: "Decide what to do next.",
      km: "សម្រេចចិត្តថាតើត្រូវធ្វើអ្វីបន្ទាប់",
    },
    desc: {
      en: "Use the results and safety recommendations to make a more informed decision before you click, reply, send money, or share personal information.",
      km: "ប្រើប្រាស់លទ្ធផល និងការណែនាំអំពីសុវត្ថិភាព ដើម្បីសម្រេចចិត្តបានកាន់តែច្បាស់ មុនពេលអ្នកចុច តបសារ ផ្ញើប្រាក់ ឬចែករំលែកព័ត៌មានផ្ទាល់ខ្លួន។",
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
                <div className="step-head">
                  <span className="step-ic" aria-hidden="true">
                    <step.Icon />
                  </span>
                  <h3>{t(step.title)}</h3>
                </div>
                <p className="step-tag">{t(step.tag)}</p>
                <p>{t(step.desc)}</p>
                {step.num < FLOW.length && (
                  <span className="flow-arrow" aria-hidden="true">
                    <IconArrowRight />
                  </span>
                )}
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
