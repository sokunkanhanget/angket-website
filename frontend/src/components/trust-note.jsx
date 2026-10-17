import { useLang } from "@/lib/i18n"
import { Reveal } from "./reveal"
import { IconCheck, IconShield } from "./icons"

const CONTAINER = "mx-auto w-full max-w-[1440px] px-[clamp(1rem,4vw,3rem)]"

const TRUTH_CHIPS = [
  { en: "Estimates, not verdicts", km: "ការវិភាគដោយផ្អែកលើអ្វីដែលបានរកឃើញ មិនមែនជាសេចក្ដីសម្រេចនោះទេ" },
  { en: "AI can make mistakes", km: "AI អាចបង្កើតកំហុសបាន" },
  { en: "Official sources come first", km: "ប្រភពផ្លូវការសំខាន់ជាងគេ" },
]

export function TrustNote() {
  const { t } = useLang()

  return (
    <section id="trust" aria-labelledby="trust-title">
      <div className={CONTAINER}>
        <Reveal className="mx-auto grid max-w-[860px] grid-cols-[auto_1fr] items-start gap-[1.5rem] rounded-[20px] border border-[#e3e9f3] bg-white p-[2.2rem] shadow-sm max-[720px]:grid-cols-1 max-[720px]:p-[1.6rem]">
          <span className="grid h-[56px] w-[56px] place-items-center rounded-[16px] border border-blue-100 bg-blue-50 text-blue-700" aria-hidden="true">
            <IconShield check style={{ width: 26, height: 26 }} />
          </span>
          <div>
            <h2 className="mb-[0.6rem] text-[clamp(1.35rem,2.6vw,1.7rem)]" id="trust-title">
              {t({ en: "Use Angket as a Safety Guide", km: "ប្រើ Angket ជាមគ្គុទ្ទេសក៍សុវត្ថិភាព" })}
            </h2>
            <p className="text-[0.98rem] text-[#56657f]">
              {t({
                en: "Angket provides an estimated assessment based on detected patterns. It is not a guarantee that information is legitimate or fraudulent.​Our Bot, AI and automated analysis can make mistakes. Always verify important information through trusted and official sources.",
                km: "Angket ផ្ដល់ការវាយតម្លៃផ្អែកលើលំនាំដែលបានរកឃើញ។ វាមិនមែនជាការធានាថាព័ត៌មាននោះពិតប្រាកដ ឬជាការបោកប្រាស់ ​១០០% នោះទេ។ ការវិភាគដោយ Bot, AI និងប្រព័ន្ធស្វ័យប្រវត្តិរបស់ពួកយើងអាចមានកំហុសបាន។ សូមផ្ទៀងផ្ទាត់ព័ត៌មានសំខាន់ៗតាមប្រភពដែលទុកចិត្តបាន និងផ្លូវការជានិច្ច។",
              })}
            </p>
            <div className="mt-[1.1rem] flex flex-wrap gap-2">
              {TRUTH_CHIPS.map((chip) => (
                <span className="inline-flex items-center gap-[0.35rem] rounded-full border border-[#e3e9f3] bg-surface px-[0.8rem] py-[0.32rem] text-[0.8rem] font-semibold text-text" key={chip.en}>
                  <IconCheck style={{ width: 14, height: 14, color: "#14713d" }} />
                  <span>{t(chip)}</span>
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
