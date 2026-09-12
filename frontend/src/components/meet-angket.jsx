import { useLang } from "@/lib/i18n"
import { Reveal } from "./reveal"
import {
  IconShield,
  IconBot,
  IconEye,
  IconFlag,
  IconInfo,
  IconSearch,
  IconLock,
  IconCheckDouble,
  IconWarning,
  IconBrain,
} from "./icons"

export function MeetAngket() {
  const { t } = useLang()

  return (
    <section id="meet-angket" className="about-solution" aria-labelledby="meet-angket-title">
      <div className="container">
        <Reveal className="about-solution-header">
          <span className="about-kicker">
            {t({ en: "OUR SOLUTION", km: "ដំណោះស្រាយរបស់យើង" })}
          </span>
          <h2 id="meet-angket-title" className="about-section-title">
            {t({
              en: "Meet Angket",
              km: "ស្គាល់ Angket",
            })}
          </h2>
          <p className="about-section-lead">
            {t({
              en: "Angket combines AI-assisted analysis with community awareness to help users better understand potential digital threats. Our platform provides three main solutions:",
              km: "Angket រួមបញ្ចូលការវិភាគដែលជួយដោយ AI ជាមួយការយល់ដឹងរបស់សហគមន៍ដើម្បីជួយអ្នកប្រើប្រាស់យល់ពីការគំរាមកំហែងឌីជីថលដែលអាចកើតមាន។ វេទិការបស់យើងផ្តល់ដំណោះស្រាយសំខាន់ៗបី៖",
            })}
          </p>
        </Reveal>
        <Reveal className="about-solution-grid">
          {/* Telegram Bot */}
          <div className="about-solution-card">
            <div className="about-solution-card-icon">
              <IconBot />
            </div>
            <h3>
              {t({ en: "Telegram Bot", km: "Telegram Bot" })}
            </h3>
            <p className="about-solution-card-desc">
              {t({
                en: "Users can send suspicious content directly to the Angket Telegram Bot, including messages, links and URLs, and files.",
                km: "អ្នកប្រើប្រាស់អាផ្ញើសារសង្ស័យផ្ទាល់ទៅ Angket Telegram Bot រួមទាំងសារ តំណភ្ជាប់ និងឯកសារ។",
              })}
            </p>
            <ul className="about-solution-card-list">
              <li>
                <IconShield className="about-solution-list-icon" />
                {t({ en: "Risk level or risk score", km: "កម្រិតហានិភ័យ ឬពិន្ទុហានិភ័យ" })}
              </li>
              <li>
                <IconInfo className="about-solution-list-icon" />
                {t({ en: "Reasons behind the assessment", km: "ហេតុផលនៃការវាយតម្លៃ" })}
              </li>
              <li>
                <IconSearch className="about-solution-list-icon" />
                {t({ en: "Suspicious patterns detected", km: "លំនាំសង្ស័យដែលរកឃើញ" })}
              </li>
              <li>
                <IconCheckDouble className="about-solution-list-icon" />
                {t({ en: "Recommended next steps", km: "ជំហានបន្ទាប់ដែលអនុសាសន៍" })}
              </li>
            </ul>
          </div>

          {/* Live Scan Mode */}
          <div className="about-solution-card">
            <div className="about-solution-card-icon">
              <IconEye />
            </div>
            <h3>
              {t({ en: "Live Scan Mode", km: "Live Scan Mode" })}
            </h3>
            <p className="about-solution-card-desc">
              {t({
                en: "When enabled, Live Scan Mode helps users monitor incoming messages and identify potentially suspicious activity.",
                km: "នៅពេលបើក Live Scan Mode ជួយអ្នកប្រើប្រាស់ត្រួតពិនិត្យសារចូល និងកំណត់សកម្មភាពសង្ស័យ។",
              })}
            </p>
            <ul className="about-solution-card-list">
              <li>
                <IconEye className="about-solution-list-icon" />
                {t({ en: "Monitor incoming messages automatically", km: "ត្រួតពិនិត្យសារចូលដោយស្វ័យប្រវត្តិ" })}
              </li>
              <li>
                <IconWarning className="about-solution-list-icon" />
                {t({ en: "Receive alerts for suspicious content", km: "ទទួលការជូនដំណឹងសម្រាប់មាតិកាសង្ស័យ" })}
              </li>
              <li>
                <IconSearch className="about-solution-list-icon" />
                {t({ en: "Get instant risk analysis", km: "ទទួលការវិភាគហានិភ័យភ្លាមៗ" })}
              </li>
              <li>
                <IconLock className="about-solution-list-icon" />
                {t({ en: "No manual checking needed", km: "មិនចាំបាច់ពិនិត្យដោយដៃ" })}
              </li>
            </ul>
          </div>

          {/* Community Reporting */}
          <div className="about-solution-card">
            <div className="about-solution-card-icon">
              <IconFlag />
            </div>
            <h3>
              {t({ en: "Community Reporting", km: "របាយការណ៍សហគមន៍" })}
            </h3>
            <p className="about-solution-card-desc">
              {t({
                en: "Through the Angket website, users can report scam experiences and suspicious activities to help others.",
                km: "តាមរយៈគេហទំព័រ Angket អ្នកប្រើប្រាស់អាចរាយការណ៍ពីបទពិសោធន៍បោកប្រាស់ និងសកម្មភាពសង្ស័យដើម្បីជួយអ្នកដទៃ។",
              })}
            </p>
            <ul className="about-solution-card-list">
              <li>
                <IconInfo className="about-solution-list-icon" />
                {t({ en: "Increase awareness of common scams", km: "បង្កើនការយល់ដឹងពីការបោកប្រាស់ជាទូទៅ" })}
              </li>
              <li>
                <IconSearch className="about-solution-list-icon" />
                {t({ en: "Identify threats targeting multiple people", km: "កំណត់ការគំរាមកំហែងដែលកំណត់គោលដៅមនុស្សជាច្រើន" })}
              </li>
              <li>
                <IconFlag className="about-solution-list-icon" />
                {t({ en: "Help others recognize similar activities", km: "ជួយអ្នកដទៃស្គាល់សកម្មភាពដែលដូចគ្នា" })}
              </li>
              <li>
                <IconBrain className="about-solution-list-icon" />
                {t({ en: "Build collective digital awareness", km: "សាងសង់ការយល់ដឹងឌីជីថលរួមគ្នា" })}
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}