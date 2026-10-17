import { useLang } from "@/lib/i18n"
import { IconMail, IconLink, IconFile, IconBell } from "./icons"

const CONTAINER = "mx-auto w-full max-w-[1440px] px-[clamp(1rem,4vw,3rem)]"

const TR_TINT = {
  blue: "bg-[#e7f0ff]",
  lav: "bg-[#eef0ff]",
  green: "bg-[#e7f7ef]",
  violet: "bg-[#f3edff]",
}

const THREATS = [
  {
    Icon: IconMail,
    tint: "blue",
    ill: "https://uk.norton.com/content/dam/blogs/images/norton/am/romance-scams-06-UK.jpg",
    title: { en: "Suspicious Messages", km: "សារគួរឲ្យសង្ស័យ" },
    desc: {
      en: "Fake messages can look real, but hide harmful links or requests.",
      km: "សារក្លែងក្លាយអាចមើលទៅដូចជាពិត ប៉ុន្តែការពិតគឺជាការបោកបញ្ឆោត។",
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
      km: "ឯកសារភ្ជាប់ និងការទាញយកអាចផ្ទុកការគំរាមកំហែងដែលអ្នកមើលមិនឃើញ។",
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
    <section className="bg-white" id="real-threats" aria-labelledby="threats-title">
      <div className={CONTAINER}>
        <div className="grid grid-cols-1 items-start gap-[2.6rem]">
          <div>
            <h2 className="mt-[1.1rem] mb-[0.9rem] text-[clamp(1.85rem,3vw,2.5rem)] font-bold leading-[1.16] tracking-[-0.03em] text-navy-900" id="threats-title">
              {t({ en: "Scams Can Happen to Anyone", km: "ការបោកប្រាស់អាចកើតឡើងចំពោះមនុស្សគ្រប់គ្នា" })}
            </h2>
            <p className="text-[1.05rem] leading-[1.7] text-[#56657f]">
              {t({ en: "Scammers use", km: "អ្នកបោកប្រាស់ប្រើ" })}{" "}
              <strong className="font-bold text-ink">{t({ en: "clever tricks,", km: "ល្បិចឈ្លាសវៃ" })}</strong>{" "}
              {t({
                en: "and they don't just target one type of person. It can happen to anyone at any time.",
                km: "និងមិនកំណត់គោលដៅត្រឹមមនុស្សប្រភេទនោះទេ។ វាអាចកើតឡើងចំពោះមនុស្សគ្រប់គ្នា គ្រប់ពេលវេលា។",
              })}
            </p>
          </div>

          <div className="grid grid-cols-4 gap-[1.2rem] max-[1020px]:grid-cols-2 max-[720px]:grid-cols-1">
            {THREATS.map((card) => (
              <article className="flex flex-col overflow-hidden rounded-[16px] border border-[#e3e9f3] bg-white shadow-sm transition-[box-shadow,transform] duration-200 hover:-translate-y-[3px] hover:shadow-md" key={card.title.en}>
                {/* placeholder illustrations — swap real artwork into /public/images/placeholder-*.png */}
                <div className={`h-[190px] ${TR_TINT[card.tint] ?? ""}`}>
                  <img className="block h-full w-full object-cover object-[center_22%]" src={card.ill} alt="" loading="lazy" />
                </div>
                <div className="flex flex-1 flex-col px-[1.35rem] pt-[1.4rem] pb-[1.5rem]">
                  <div className="flex items-center gap-[0.7rem]">
                    <span className="grid h-[44px] w-[44px] flex-none place-items-center rounded-[12px] border border-blue-100 bg-blue-50 text-blue-700" aria-hidden="true">
                      <card.Icon style={{ width: 22, height: 22 }} />
                    </span>
                    <h3 className="m-0 text-[1.18rem] font-bold leading-[1.3] text-ink">{t(card.title)}</h3>
                  </div>
                  <p className="mt-[0.4rem] flex-grow text-[0.95rem] leading-[1.6] text-[#56657f]">{t(card.desc)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}