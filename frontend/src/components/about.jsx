import { useLang } from "@/lib/i18n"
import { Reveal } from "./reveal"
import { IconSearch, IconChart, IconBrain, IconShield } from "./icons"

const FUNCTIONS = [
  {
    Icon: IconSearch,
    title: { en: "Detect", km: "ស្វែងរក" },
    tag: {
      en: "Spot potential threats early.",
      km: "កំណត់អត្តសញ្ញាណហានិភ័យបានទាន់ពេលវេលា",
    },
    desc: {
      en: "With Live Scan enabled, Angket can automatically check incoming messages for suspicious patterns and alert you when something appears risky.",
      km: "នៅពេលបើកមុខងារការត្រួតពិនិត្យដោយស្វ័យប្រវត្តិ អាចពិនិត្យសារដែលចូលមកដោយស្វ័យប្រវត្តិ ដើម្បីស្វែងរកលំនាំដែលគួរឱ្យសង្ស័យ និងជូនដំណឹងដល់អ្នក នៅពេលរកឃើញអ្វីមួយដែលអាចមានហានិភ័យ។",
    },
  },
  {
    Icon: IconChart,
    title: { en: "Check", km: "ពិនិត្យ" },
    tag: {
      en: "Know the level of risk.",
      km: "ដឹងពីកម្រិតហានិភ័យ",
    },
    desc: {
      en: "Send a suspicious message, link, URL, or file to the bot and receive an estimated scam risk percentage based on detected warning signs.",
      km: "ផ្ញើសារ តំណភ្ជាប់ឬឯកសារដែលគួរឱ្យសង្ស័យទៅកាន់បូត ដើម្បីទទួលបាន ភាគរយប៉ាន់ស្មាននៃហានិភ័យនៃការបោកប្រាស់ ដោយផ្អែកលើសញ្ញាគួរឱ្យសង្ស័យដែលបានរកឃើញ។",
    },
  },
  {
    Icon: IconBrain,
    title: { en: "Understand", km: "ស្វែងយល់" },
    tag: {
      en: "Know why it may be suspicious.",
      km: "ដឹងថាហេតុអ្វីបានជាវាអាចមានភាពគួរឱ្យសង្ស័យ",
    },
    desc: {
      en: "Angket explains the warning signs and scam patterns detected, helping you understand what makes the content potentially risky.",
      km: "Angket ពន្យល់អំពីសញ្ញាព្រមាន និងលំនាំនៃការបោកប្រាស់ដែលបានរកឃើញ ដើម្បីជួយអ្នកយល់ថា តើអ្វីធ្វើឱ្យមាតិកានោះអាចមានហានិភ័យ។",
    },
  },
  {
    Icon: IconShield,
    title: { en: "Protect", km: "ការពារ" },
    tag: {
      en: "Take the right next step.",
      km: "ចាត់វិធានការបន្ទាប់ឱ្យបានត្រឹមត្រូវ",
    },
    desc: {
      en: "Get practical safety recommendations and learn from community-reported scam experiences to help you avoid similar threats in the future.",
      km: "ទទួលបានការណែនាំជាក់ស្តែងអំពីសុវត្ថិភាព និងស្វែងយល់ពីបទពិសោធន៍នៃការបោកប្រាស់ដែលបានរាយការណ៍ដោយសហគមន៍ ដើម្បីជួយអ្នកជៀសវាងការបោកប្រាស់ដែលមានលក្ខណៈស្រដៀងគ្នានៅពេលអនាគត។",
    },
  },
]

export function About() {
  const { t } = useLang()

  return (
    <section id="about" aria-labelledby="about-title">
      <div className="container">
        <Reveal className="section-head">
          
          <h2 id="about-title">
            {t({ en: "Your Safety Companion on Telegram", km: "ដៃគូការពារសុវត្ថិភាពរបស់អ្នកនៅលើតេលេក្រាម" })}
          </h2>
          <p className="about-lead">
            {t({
              en: "Angket is a digital safety companion that helps you make sense of suspicious content before you take action. Simply send a suspicious message, link, URL, or file to the Angket Telegram Bot and receive an estimated risk assessment with clear reasons and practical safety recommendations.",
              km: "Angket គឺជាឧបករណ៍ជួយការពារសុវត្ថិភាពឌីជីថល ដែលជួយអ្នកស្វែងយល់អំពីមាតិកាដែលគួរឱ្យសង្ស័យ មុនពេលអ្នកធ្វើសកម្មភាពណាមួយ។ គ្រាន់តែផ្ញើសារ តំណភ្ជាប់​ឬឯកសារដែលគួរឱ្យសង្ស័យទៅកាន់ កម្មវិធីជំនួយស្វ័យប្រវត្តិនៅលើតេលេក្រាម​ របស់ Angket ហើយអ្នកនឹងទទួលបានការប៉ាន់ស្មានកម្រិតហានិភ័យ ព្រមទាំងមូលហេតុច្បាស់លាស់ និងការណែនាំជាក់ស្តែងអំពីសុវត្ថិភាព។",
            })}
          </p>
          <p className="about-sub">
            {t({
              en: "Through the Angket website, you can also learn from real scam experiences shared by the community and discover practical tips to help you stay safer online.",
              km: "តាមរយៈគេហទំព័រ Angket អ្នកក៏អាចស្វែងយល់ពី បទពិសោធន៍នៃការបោកប្រាស់ពិតប្រាកដដែលបានចែករំលែកដោយសហគមន៍ និងទទួលបានគន្លឹះជាក់ស្តែង ដើម្បីជួយអ្នកប្រើប្រាស់អ៊ីនធឺណិតប្រកបដោយសុវត្ថិភាពជាងមុន។",
            })}
          </p>
        </Reveal>
        <Reveal className="func-grid">
          {FUNCTIONS.map((f) => (
            <article className="func-card" key={f.title.en}>
              <span className="func-ic" aria-hidden="true">
                <f.Icon />
              </span>
              <h3>{t(f.title)}</h3>
              <p className="func-tag">{t(f.tag)}</p>
              <p>{t(f.desc)}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
