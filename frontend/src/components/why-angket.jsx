import { useLang } from "@/lib/i18n"
import { Reveal } from "./reveal"
import { IconChart, IconSearch, IconGlobe } from "./icons"

const REASONS = [
  {
    Icon: IconChart,
    title: { en: "Risk Percentage", km: "ភាគរយហានិភ័យ" },
    desc: {
      en: "Understand the estimated level of scam risk at a glance.",
      km: "យល់បានភ្លាមៗអំពីកម្រិតហានិភ័យនៃការបោកប្រាស់ដែលបានរកឃើញ។",
    },
  },
  {
    Icon: IconSearch,
    title: { en: "Explainable Results", km: "លទ្ធផលដែលអាចយល់បាន" },
    desc: {
      en: "Understand why something may be suspicious instead of receiving only a percentage of risk.",
      km: "យល់ដឹងពីមូលហេតុដែលអាចគួរឲ្យសង្ស័យ ជាជាងទទួលបានតែភាគរយនៃហានិភ័យ។",
    },
  },
  {
    Icon: IconGlobe,
    title: { en: "Community Knowledge", km: "ចំណេះដឹងពីសហគមន៍" },
    desc: {
      en: "Learn from scam experiences reported by other users.",
      km: "រៀនសូត្រពីបទពិសោធន៍នៃបោកប្រាស់ដែលបានរាយការណ៍ដោយអ្នកប្រើប្រាស់ដទៃទៀត។",
    },
  },
]

export function WhyAngket() {
  const { t } = useLang()

  return (
    <section className="border-y border-[#e3e9f3] bg-white" id="why" aria-labelledby="why-title">
      <div className="mx-auto w-full max-w-[1400px] px-6">
        <Reveal className="mb-10">
          <span className="inline-flex items-center gap-[0.45rem] rounded-full border border-blue-100 bg-blue-50 px-[0.85rem] py-[0.3rem] text-[0.78rem] font-bold uppercase tracking-[0.06em] text-blue-700 km:text-[0.85rem]">{t({ en: "Why Angket?", km: "ហេតុអ្វីជ្រើស Angket?" })}</span>
          <h2 className="mt-[0.9rem] mb-[0.6rem] text-[clamp(1.6rem,3.4vw,2.15rem)] font-bold" id="why-title">{t({ en: "More Than Just a Risk Score", km: "មិនត្រឹមតែភាគរយហានិភ័យប៉ុណ្ណោះទេ​" })}</h2>
        </Reveal>
        <Reveal className="grid grid-cols-3 gap-[1.2rem] max-[1020px]:grid-cols-2 max-[720px]:grid-cols-1">
          {REASONS.map((reason) => (
            <article className="rounded-[20px] border border-[#e3e9f3] bg-white px-[1.4rem] py-[1.6rem] text-center shadow-sm transition-[box-shadow,transform] duration-200 hover:-translate-y-[3px] hover:shadow-md" key={reason.title.en}>
              <span className="mx-auto mb-4 grid h-[52px] w-[52px] place-items-center rounded-[15px] border border-blue-100 bg-[linear-gradient(135deg,#eff6ff,#dbeafe)]" aria-hidden="true">
                <reason.Icon style={{ width: 24, height: 24, color: "#1d4ed8" }} />
              </span>
              <h3 className="mb-[0.4rem] text-[1.06rem]">{t(reason.title)}</h3>
              <p className="text-[0.92rem] text-[#56657f]">{t(reason.desc)}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
