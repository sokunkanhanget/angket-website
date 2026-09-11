import { useLang } from "@/lib/i18n"
import { IconMail, IconLink, IconFile, IconBell } from "./icons"

const THREATS = [
  {
    Icon: IconMail,
    tint: "blue",
    ill: "https://uk.norton.com/content/dam/blogs/images/norton/am/romance-scams-06-UK.jpg",
    title: { en: "Suspicious Messages", km: "សារគួរឲ្យសង្ស័យ" },
    desc: {
      en: "Fake messages can look real, but hide harmful links or requests.",
      km: "សារក្លែងក្លាយអាចមើលទៅដូចជាពិត ប៉ុន្តែលាក់បាំងតំណ ឬការស្នើសុំដែលមានគ្រោះថ្នាក់។",
    },
  },
  {
    Icon: IconLink,
    tint: "lav",
    ill: "https://lifelock.norton.com/content/dam/lifelock/learn/article-main/spam-texts-01.jpg",
    title: { en: "Suspicious Links", km: "តំណភ្ជាប់គួរឲ្យសង្ស័យ" },
    desc: {
      en: "One wrong click can lead to data theft, malware, or scams.",
      km: "ការចុចខុសមួយដងអាចនាំទៅរកការលួចទិន្នន័យ មេរោគ ឬការបោកប្រាស់។",
    },
  },
  {
    Icon: IconFile,
    tint: "green",
    ill: "https://preview.redd.it/random-files-being-sent-to-telegram-v0-8uofuj8amo9h1.jpeg?width=1080&crop=smart&auto=webp&s=d81a51039ab403e3fc7193ac081cd5808388d136",
    title: { en: "Suspicious Files", km: "ឯកសារគួរឲ្យសង្ស័យ" },
    desc: {
      en: "Attachments and downloads can carry hidden threats you can't see.",
      km: "ឯកសារភ្ជាប់ និងការទាញយកអាចផ្ទុកការគំរាមកំហែងដែលលាក់កំបាំង ដែលអ្នកមើលមិនឃើញ។",
    },
  },
  {
    Icon: IconBell,
    tint: "violet",
    ill: "https://www.idtheftcenter.org/wp-content/uploads/2016/11/USPS-705x501.png",
    title: { en: "Fake Notifications", km: "ការជូនដំណឹងក្លែងក្លាយ" },
    desc: {
      en: "Scammers can pretend to be banks, services, or friends, tricking you into taking action.",
      km: "អ្នកបោកប្រាស់អាចក្លែងបន្លំជាធនាគារ អាជីវកម្ម ឬមិត្តភក្តិបញ្ឆោតអ្នកឱ្យធ្វើសកម្មភាពណាមួយ។",
    },
  },
]

export function Problems() {
  const { t } = useLang()

  return (
    <section className="threats" id="real-threats" aria-labelledby="threats-title">
      <div className="container">
        <div className="threats-grid">
          <div className="threats-copy">
            <h2 id="threats-title">
              {t({ en: "Scams Can Happen to Anyone", km: "ការបោកប្រាស់អាចកើតឡើងចំពោះអ្នកណាក៏បាន" })}
            </h2>
            <p className="threats-body">
              {t({ en: "Scammers use", km: "អ្នកបោកប្រាស់ប្រើ" })}{" "}
              <strong>{t({ en: "clever tricks,", km: "ល្បិចឆ្លាត" })}</strong>{" "}
              {t({
                en: "and they don't just target one type of person. It can happen to anyone at any time, through any channel.",
                km: "ហើយពួកគេមិនត្រឹមតែកំណត់គោលដៅមនុស្សប្រភេទណាមួយនោះទេ។ វាអាចកើតឡើងចំពោះអ្នកណាក៏បានគ្រប់ពេលវេលា តាមគ្រប់ប៉ុស្តិ៍។",
              })}
            </p>
          </div>

          <div className="tr-grid">
            {THREATS.map((card) => (
              <article className="tr-card" key={card.title.en}>
                {/* placeholder illustrations — swap real artwork into /public/images/placeholder-*.png */}
                <div className={`tr-ill tr-ill--${card.tint}`}>
                  <img src={card.ill} alt="" loading="lazy" />
                </div>
                <div className="tr-body">
                  <div className="tr-head">
                    <span className="tr-ic" aria-hidden="true">
                      <card.Icon />
                    </span>
                    <h3>{t(card.title)}</h3>
                  </div>
                  <p className="tr-desc">{t(card.desc)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}