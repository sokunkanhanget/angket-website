import { useLang } from "@/lib/i18n"
import { Reveal } from "./reveal"
import { Search, BarChart3, Brain, ShieldCheck } from "lucide-react"

const FEATURES = [
  {
    Icon: Search,
    title: { en: "Detect", km: "ស្វែងរកហានិភ័យ" },
    desc: {
      en: "Automatically scan incoming messages for suspicious patterns and alert users when potential scam activity is detected.",
      km: "កម្មវិធីជំនួយស្វ័យប្រវត្តិនៅលើតេលេក្រាម អាចពិនិត្យសារដែលចូលមកដោយស្វ័យប្រវត្តិ ដើម្បីស្វែងរកសញ្ញា ឬលំនាំដែលគួរឱ្យសង្ស័យ ហើយជូនដំណឹងដល់អ្នកប្រើប្រាស់នៅពេលរកឃើញហានិភ័យដែលអាចជាការបោកប្រាស់។",
    },
  },
  {
    Icon: BarChart3,
    title: { en: "Check", km: "ពិនិត្យ" },
    desc: {
      en: "Send a suspicious message, link, URL, or file to Angket and receive an estimated scam risk score with an explanation of the results.",
      km: "អ្នកប្រើប្រាស់អាចផ្ញើសារ តំណភ្ជាប់ ឬឯកសារដែលគួរឱ្យសង្ស័យទៅកាន់កម្មវិធីជំនួយស្វ័យប្រវត្តិនៅលើតេលេក្រាមដើម្បីទទួលបានពិន្ទុប៉ាន់ស្មាននៃហានិភ័យនៃការបោកប្រាស់ព្រមទាំងការពន្យល់អំពីលទ្ធផល។",
    },
  },
  {
    Icon: Brain,
    title: { en: "Understand", km: "ស្វែងយល់" },
    desc: {
      en: "Learn why the content may be suspicious, what scam patterns were detected, and what warning signs to look out for.",
      km: "បង្ហាញពីមូលហេតុដែលមាតិកាអាចមានភាពគួរឱ្យសង្ស័យ លំនាំនៃការបោកប្រាស់ដែលបានរកឃើញ និងសញ្ញាដែលអ្នកប្រើប្រាស់គួរប្រុងប្រយ័ត្ន។",
    },
  },
  {
    Icon: ShieldCheck,
    title: { en: "Protect", km: "ការពារ" },
    desc: {
      en: "Get clear safety recommendations and learn from community-reported scam experiences to help avoid similar threats.",
      km: "ផ្តល់ការណែនាំអំពីវិធីសុវត្ថិភាពដែលអ្នកប្រើប្រាស់គួរអនុវត្តនិងអនុញ្ញាតឱ្យពួកគេស្វែងយល់ពីបទពិសោធន៍នៃការបោកប្រាស់ដែលបានចែករំលែកដោយអ្នកប្រើប្រាស់ផ្សេងៗដើម្បីជួយជៀសវាងការបោកប្រាស់ស្រដៀងគ្នា។",
    },
  },
]

export function Solution() {
  const { t } = useLang()

  return (
    <section id="solution" aria-labelledby="solution-title">
      <div className="container">
        <Reveal className="section-head">
          <h2 id="solution-title">
            {t({ en: "How Angket Helps", km: "របៀបដែល Angket ជួយអ្នក" })}
          </h2>
          <p className="solution-lead">
            {t({
              en: "Angket is a digital safety tool designed to help people identify and understand potential online scams before they take action. Through our Telegram bot, users can check suspicious messages, links, URLs, and files, while the website allows users to report scam experiences and help protect others in the community.",
              km: "Angket គឺជាឧបករណ៍សុវត្ថិភាពឌីជីថល ដែលបង្កើតឡើងដើម្បីជួយអ្នកប្រើប្រាស់កំណត់អត្តសញ្ញាណនិងស្វែងយល់អំពីការបោកប្រាស់ដែលអាចកើតមាននៅលើអ៊ីនធឺណិត មុនពេលធ្វើសកម្មភាពណាមួយ។ តាមរយៈកម្មវិធីជំនួយស្វ័យប្រវត្តិនៅលើតេលេក្រាម អ្នកប្រើប្រាស់អាចពិនិត្យសារ តំណភ្ជាប់ និងឯកសារដែលគួរឱ្យសង្ស័យ ខណៈដែលគេហទំព័ររបស់យើងអនុញ្ញាតឱ្យអ្នកប្រើប្រាស់ចែករំលែកបទពិសោធន៍អំពីការបោកប្រាស់ ដើម្បីជួយព្រមាន និងការពារអ្នកដទៃក្នុងសហគមន៍។",
            })}
          </p>
        </Reveal>
        <Reveal className="func-grid">
          {FEATURES.map((f) => (
            <article className="func-card" key={f.title.en}>
              <span className="func-ic" aria-hidden="true">
                <f.Icon size={24} strokeWidth={2} style={{ color: "var(--blue-700)" }} />
              </span>
              <h3>{t(f.title)}</h3>
              <p>{t(f.desc)}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  )
}